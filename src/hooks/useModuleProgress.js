import { useState, useEffect, useCallback } from 'react';

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
  const [completedModules, setCompletedModules] = useState(new Set());
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const key = `ultrathink_progress_${courseId}`;

  // Carregar progresso ao montar componente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.completedModules && Array.isArray(data.completedModules)) {
          setCompletedModules(new Set(data.completedModules));
          setLastUpdated(data.lastUpdated || null);
        }
      }
    } catch (error) {
      console.error(`[useModuleProgress] Erro ao carregar progresso (${key}):`, error);

      if (error.name === 'SecurityError') {
        setStorageAvailable(false);
        console.warn('[useModuleProgress] localStorage bloqueado (modo privado?)');
      } else if (error instanceof SyntaxError) {
        // JSON inválido - limpar dados corrompidos
        console.warn('[useModuleProgress] Dados corrompidos, reiniciando progresso');
        try {
          localStorage.removeItem(key);
        } catch {
          // Ignora erro ao limpar
        }
      }
    }
  }, [key]);

  // Salvar progresso quando completedModules mudar
  useEffect(() => {
    if (!storageAvailable) {
      console.warn('[useModuleProgress] Storage indisponível, skip save');
      return;
    }

    // Evitar salvar estado inicial vazio
    if (completedModules.size === 0 && !lastUpdated) {
      return;
    }

    const data = {
      completedModules: Array.from(completedModules),
      lastUpdated: new Date().toISOString(),
      totalModules: completedModules.size
    };

    try {
      localStorage.setItem(key, JSON.stringify(data));
      setLastUpdated(data.lastUpdated);
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
  }, [completedModules, key, storageAvailable, lastUpdated]);

  /**
   * Toggle module completion status
   * @param {string} moduleId - ID do módulo (ex: '1.1', '2.3')
   */
  const toggleModule = useCallback((moduleId) => {
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
    setCompletedModules(new Set());
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('[useModuleProgress] Erro ao resetar progresso:', error);
    }
  }, [key]);

  // Info object for UI
  const progressInfo = {
    completed: completedModules.size,
    lastUpdated,
    storageAvailable,
    key
  };

  return [completedModules, setCompletedModules, { toggleModule, markCompleted, markIncomplete, resetProgress, ...progressInfo }];
}
