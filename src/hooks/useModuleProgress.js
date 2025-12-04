import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook para persistência de progresso de módulos em localStorage
 *
 * Implementa padrões da skill DS-005 (localStorage-patterns):
 * - Try/catch em todas operações localStorage
 * - Tratamento de QuotaExceededError
 * - Graceful degradation (fallback para sessionStorage)
 * - User-friendly error messages
 * - Sincronização bidirecional React ↔ localStorage
 *
 * @param {string} courseId - ID do curso ('bash', 'clang', 'rust', 'vscode', 'claudecode')
 * @returns {[Set, function, object]} [completedModules, toggleModule, progressInfo]
 *
 * @example
 * ```jsx
 * function BashLearningSystem() {
 *   const [completedModules, toggleModule, progressInfo] = useModuleProgress('bash');
 *
 *   return (
 *     <div>
 *       <span>{progressInfo.completed}/{progressInfo.total} módulos</span>
 *       <button onClick={() => toggleModule('1.1')}>
 *         {completedModules.has('1.1') ? '✅' : '⬜'} Módulo 1.1
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useModuleProgress(courseId) {
  const key = `ultrathink_progress_${courseId}`;

  // Lazy initialization: carrega do localStorage no primeiro render
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.completedModules && Array.isArray(data.completedModules)) {
          return new Set(data.completedModules);
        }
      }
    } catch (error) {
      console.error(`[useModuleProgress] Erro ao carregar progresso (${key}):`, error);
    }
    return new Set();
  });

  const [storageAvailable, setStorageAvailable] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        return data.lastUpdated || null;
      }
    } catch {
      // Ignora erro - já tratado acima
    }
    return null;
  });

  // Track if user has made changes (not just initial load)
  const hasUserChanges = useRef(false);

  // Salvar progresso quando completedModules mudar (apenas após interação do usuário)
  useEffect(() => {
    // Só salva se o usuário fez mudanças (não no carregamento inicial)
    if (!hasUserChanges.current) {
      return;
    }

    if (!storageAvailable) {
      console.warn('[useModuleProgress] Storage indisponível, skip save');
      return;
    }

    const timestamp = new Date().toISOString();
    const data = {
      completedModules: Array.from(completedModules),
      lastUpdated: timestamp,
      totalModules: completedModules.size
    };

    try {
      localStorage.setItem(key, JSON.stringify(data));
      setLastUpdated(timestamp);
    } catch (error) {
      console.error(`[useModuleProgress] Erro ao salvar progresso (${key}):`, error);

      if (error.name === 'QuotaExceededError') {
        console.error('[useModuleProgress] QuotaExceededError: Storage cheio');

        // Fallback: Tentar salvar em sessionStorage
        try {
          sessionStorage.setItem(`${key}_temp`, JSON.stringify(data));
          console.log('[useModuleProgress] Fallback: Progresso salvo em sessionStorage');
        } catch (sessionError) {
          console.error('[useModuleProgress] Fallback falhou');
        }
      } else if (error.name === 'SecurityError') {
        setStorageAvailable(false);
        console.error('[useModuleProgress] SecurityError: Modo privado detectado');
      }
    }
  }, [completedModules, key, storageAvailable]);

  /**
   * Toggle module completion status
   * @param {string} moduleId - ID do módulo (ex: '1.1', '2.3')
   */
  const toggleModule = useCallback((moduleId) => {
    hasUserChanges.current = true;
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  }, []);

  /**
   * Mark module as completed
   * @param {string} moduleId - ID do módulo
   */
  const markCompleted = useCallback((moduleId) => {
    hasUserChanges.current = true;
    setCompletedModules(prev => {
      if (prev.has(moduleId)) return prev;
      const newSet = new Set(prev);
      newSet.add(moduleId);
      return newSet;
    });
  }, []);

  /**
   * Mark module as incomplete
   * @param {string} moduleId - ID do módulo
   */
  const markIncomplete = useCallback((moduleId) => {
    hasUserChanges.current = true;
    setCompletedModules(prev => {
      if (!prev.has(moduleId)) return prev;
      const newSet = new Set(prev);
      newSet.delete(moduleId);
      return newSet;
    });
  }, []);

  /**
   * Reset all progress for this course
   */
  const resetProgress = useCallback(() => {
    hasUserChanges.current = true;
    setCompletedModules(new Set());
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('[useModuleProgress] Erro ao resetar progresso:', error);
    }
  }, [key]);

  // Wrapper para setCompletedModules que marca como mudança do usuário
  const setCompletedModulesWithSave = useCallback((valueOrUpdater) => {
    hasUserChanges.current = true;
    setCompletedModules(valueOrUpdater);
  }, []);

  // Info object for UI
  const progressInfo = {
    completed: completedModules.size,
    lastUpdated,
    storageAvailable,
    key
  };

  return [completedModules, setCompletedModulesWithSave, { toggleModule, markCompleted, markIncomplete, resetProgress, ...progressInfo }];
}
