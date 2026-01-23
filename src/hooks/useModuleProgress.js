import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { apiService } from '../services/apiService';

/**
 * Hook para persistência de progresso de módulos
 *
 * US-069: Integração com API NocoDB + fallback localStorage
 *
 * Estratégia de sincronização:
 * - Carregamento: API primeiro, fallback para localStorage
 * - Salvamento: API + localStorage (para offline)
 * - Offline: usa localStorage e sincroniza quando online
 *
 * @param {string} courseId - ID do curso ('bash', 'linux', etc.)
 * @returns {[Set, function, object]} [completedModules, setCompletedModules, helpers]
 */
export function useModuleProgress(courseId) {
  const { user, isAuthenticated } = useAuth();
  const localStorageKey = `ultrathink_progress_${courseId}`;

  const [completedModules, setCompletedModules] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [syncError, setSyncError] = useState(null);

  // Track user changes vs initial load
  const hasUserChanges = useRef(false);
  const pendingSync = useRef(new Set()); // Módulos pendentes de sync

  // ============================================
  // CARREGAR PROGRESSO (INICIAL)
  // ============================================

  useEffect(() => {
    loadProgress();
  }, [courseId, user?.id]);

  /**
   * Carrega progresso da API ou localStorage
   */
  const loadProgress = useCallback(async () => {
    setIsLoading(true);
    setSyncError(null);
    hasUserChanges.current = false;

    // Se autenticado, tentar API primeiro
    if (isAuthenticated && user?.id) {
      try {
        const { completedModules: apiModules, lastUpdated: apiLastUpdated } =
          await apiService.getProgress(user.id, courseId);

        setCompletedModules(new Set(apiModules));
        setLastUpdated(apiLastUpdated);

        // Salvar no localStorage como cache
        saveToLocalStorage(apiModules, apiLastUpdated);

        setIsLoading(false);
        return;
      } catch (error) {
        console.warn('[useModuleProgress] API indisponível, usando localStorage:', error.message);
        setSyncError('offline');
      }
    }

    // Fallback: localStorage
    const localData = loadFromLocalStorage();
    setCompletedModules(new Set(localData.completedModules));
    setLastUpdated(localData.lastUpdated);
    setIsLoading(false);
  }, [courseId, user?.id, isAuthenticated]);

  // ============================================
  // SALVAR PROGRESSO
  // ============================================

  /**
   * Efeito para salvar mudanças do usuário
   */
  useEffect(() => {
    if (!hasUserChanges.current) return;
    if (!storageAvailable) return;

    const modulesArray = Array.from(completedModules);
    const timestamp = new Date().toISOString();

    // Sempre salvar no localStorage (offline-first)
    saveToLocalStorage(modulesArray, timestamp);
    setLastUpdated(timestamp);

    // Se autenticado, sincronizar com API
    if (isAuthenticated && user?.id) {
      syncWithApi();
    }
  }, [completedModules]);

  /**
   * Sincroniza mudanças pendentes com a API
   */
  const syncWithApi = useCallback(async () => {
    if (!user?.id || !user?.companyId) return;
    if (isSyncing) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      // Buscar estado atual da API
      const { completedModules: apiModules } = await apiService.getProgress(user.id, courseId);
      const apiSet = new Set(apiModules);
      const localSet = completedModules;

      // Módulos para marcar como completo (local tem, API não)
      const toComplete = [...localSet].filter(m => !apiSet.has(m));

      // Módulos para desmarcar (API tem, local não)
      const toUncomplete = [...apiSet].filter(m => !localSet.has(m));

      // Executar operações
      for (const moduleId of toComplete) {
        await apiService.completeModule(user.id, user.companyId, courseId, moduleId);
      }

      for (const moduleId of toUncomplete) {
        await apiService.uncompleteModule(user.id, moduleId);
      }

      pendingSync.current.clear();
    } catch (error) {
      console.error('[useModuleProgress] Erro ao sincronizar:', error);
      setSyncError('sync_failed');
    } finally {
      setIsSyncing(false);
    }
  }, [user?.id, user?.companyId, courseId, completedModules, isSyncing]);

  // ============================================
  // HELPERS LOCALSTORAGE
  // ============================================

  /**
   * Salva no localStorage
   */
  const saveToLocalStorage = useCallback((modules, timestamp) => {
    try {
      const data = {
        completedModules: Array.isArray(modules) ? modules : Array.from(modules),
        lastUpdated: timestamp,
        totalModules: modules.length
      };
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    } catch (error) {
      console.error('[useModuleProgress] Erro ao salvar localStorage:', error);

      if (error.name === 'QuotaExceededError') {
        try {
          sessionStorage.setItem(`${localStorageKey}_temp`, JSON.stringify({
            completedModules: modules,
            lastUpdated: timestamp
          }));
        } catch {
          // Ignorar
        }
      } else if (error.name === 'SecurityError') {
        setStorageAvailable(false);
      }
    }
  }, [localStorageKey]);

  /**
   * Carrega do localStorage
   */
  const loadFromLocalStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const data = JSON.parse(saved);
        return {
          completedModules: data.completedModules || [],
          lastUpdated: data.lastUpdated || null
        };
      }

      // Tentar sessionStorage (fallback)
      const tempSaved = sessionStorage.getItem(`${localStorageKey}_temp`);
      if (tempSaved) {
        const data = JSON.parse(tempSaved);
        return {
          completedModules: data.completedModules || [],
          lastUpdated: data.lastUpdated || null
        };
      }
    } catch (error) {
      console.error('[useModuleProgress] Erro ao ler localStorage:', error);
    }

    return { completedModules: [], lastUpdated: null };
  }, [localStorageKey]);

  // ============================================
  // AÇÕES DO USUÁRIO
  // ============================================

  /**
   * Toggle module completion
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
   * Marca módulo como completo
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
   * Marca módulo como incompleto
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
   * Reseta todo o progresso
   */
  const resetProgress = useCallback(async () => {
    hasUserChanges.current = true;
    setCompletedModules(new Set());

    try {
      localStorage.removeItem(localStorageKey);
      sessionStorage.removeItem(`${localStorageKey}_temp`);
    } catch (error) {
      console.error('[useModuleProgress] Erro ao resetar:', error);
    }

    // Se autenticado, resetar na API também
    if (isAuthenticated && user?.id) {
      try {
        const { completedModules: apiModules } = await apiService.getProgress(user.id, courseId);
        for (const moduleId of apiModules) {
          await apiService.uncompleteModule(user.id, moduleId);
        }
      } catch (error) {
        console.error('[useModuleProgress] Erro ao resetar na API:', error);
      }
    }
  }, [localStorageKey, courseId, user?.id, isAuthenticated]);

  /**
   * Força sincronização com API
   */
  const forceSync = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      return { success: false, error: 'not_authenticated' };
    }

    try {
      await syncWithApi();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, user?.id, syncWithApi]);

  // Wrapper para setCompletedModules que marca como mudança do usuário
  const setCompletedModulesWithSave = useCallback((valueOrUpdater) => {
    hasUserChanges.current = true;
    setCompletedModules(valueOrUpdater);
  }, []);

  // ============================================
  // RETORNO
  // ============================================

  const progressInfo = {
    completed: completedModules.size,
    lastUpdated,
    storageAvailable,
    isLoading,
    isSyncing,
    syncError,
    isOnline: !syncError || syncError !== 'offline',
    key: localStorageKey
  };

  const helpers = {
    toggleModule,
    markCompleted,
    markIncomplete,
    resetProgress,
    forceSync,
    reload: loadProgress,
    ...progressInfo
  };

  return [completedModules, setCompletedModulesWithSave, helpers];
}

export default useModuleProgress;
