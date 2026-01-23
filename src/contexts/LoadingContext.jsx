import React, { createContext, useContext, useReducer, useCallback } from 'react';

/**
 * LoadingContext - Sistema de loading states globais
 *
 * US-103: Loading states globais
 *
 * Permite gerenciar múltiplos loading states por chave,
 * útil para operações simultâneas em diferentes partes da UI.
 *
 * Exemplo de uso:
 * const { startLoading, stopLoading, isLoading } = useLoading();
 *
 * // Iniciar loading
 * startLoading('users');
 *
 * // Verificar se está carregando
 * if (isLoading('users')) { ... }
 *
 * // Parar loading
 * stopLoading('users');
 */

// Tipos de ação
const LOADING_ACTIONS = {
  START: 'START_LOADING',
  STOP: 'STOP_LOADING',
  CLEAR_ALL: 'CLEAR_ALL_LOADING',
  SET_MESSAGE: 'SET_LOADING_MESSAGE',
};

// Estado inicial
const initialState = {
  loadingKeys: {}, // { [key]: { active: boolean, message: string, startedAt: number } }
  globalLoading: false,
};

// Reducer para gerenciar loading states
function loadingReducer(state, action) {
  switch (action.type) {
    case LOADING_ACTIONS.START: {
      const { key, message } = action.payload;
      return {
        ...state,
        loadingKeys: {
          ...state.loadingKeys,
          [key]: {
            active: true,
            message: message || '',
            startedAt: Date.now(),
          },
        },
        globalLoading: true,
      };
    }

    case LOADING_ACTIONS.STOP: {
      const { key } = action.payload;
      const newLoadingKeys = { ...state.loadingKeys };
      delete newLoadingKeys[key];

      return {
        ...state,
        loadingKeys: newLoadingKeys,
        globalLoading: Object.keys(newLoadingKeys).length > 0,
      };
    }

    case LOADING_ACTIONS.CLEAR_ALL:
      return {
        ...state,
        loadingKeys: {},
        globalLoading: false,
      };

    case LOADING_ACTIONS.SET_MESSAGE: {
      const { key, message } = action.payload;
      if (!state.loadingKeys[key]) return state;

      return {
        ...state,
        loadingKeys: {
          ...state.loadingKeys,
          [key]: {
            ...state.loadingKeys[key],
            message,
          },
        },
      };
    }

    default:
      return state;
  }
}

// Contexto
const LoadingContext = createContext(null);

// Provider
export function LoadingProvider({ children }) {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  /**
   * Inicia um loading state
   * @param {string} key - Identificador único do loading
   * @param {string} message - Mensagem opcional a exibir
   */
  const startLoading = useCallback((key, message = '') => {
    dispatch({
      type: LOADING_ACTIONS.START,
      payload: { key, message },
    });
  }, []);

  /**
   * Para um loading state
   * @param {string} key - Identificador único do loading
   */
  const stopLoading = useCallback((key) => {
    dispatch({
      type: LOADING_ACTIONS.STOP,
      payload: { key },
    });
  }, []);

  /**
   * Limpa todos os loading states
   */
  const clearAll = useCallback(() => {
    dispatch({ type: LOADING_ACTIONS.CLEAR_ALL });
  }, []);

  /**
   * Atualiza a mensagem de um loading
   * @param {string} key - Identificador único do loading
   * @param {string} message - Nova mensagem
   */
  const setMessage = useCallback((key, message) => {
    dispatch({
      type: LOADING_ACTIONS.SET_MESSAGE,
      payload: { key, message },
    });
  }, []);

  /**
   * Verifica se uma chave específica está em loading
   * @param {string} key - Identificador único do loading
   * @returns {boolean}
   */
  const isLoading = useCallback(
    (key) => {
      if (!key) return state.globalLoading;
      return !!state.loadingKeys[key]?.active;
    },
    [state.loadingKeys, state.globalLoading]
  );

  /**
   * Obtém a mensagem de loading para uma chave
   * @param {string} key - Identificador único do loading
   * @returns {string}
   */
  const getMessage = useCallback(
    (key) => {
      return state.loadingKeys[key]?.message || '';
    },
    [state.loadingKeys]
  );

  /**
   * Wrapper para executar função com loading automático
   * @param {string} key - Identificador único do loading
   * @param {Function} fn - Função async a executar
   * @param {string} message - Mensagem opcional
   */
  const withLoading = useCallback(
    async (key, fn, message = '') => {
      startLoading(key, message);
      try {
        return await fn();
      } finally {
        stopLoading(key);
      }
    },
    [startLoading, stopLoading]
  );

  const value = {
    // Estado
    loadingKeys: state.loadingKeys,
    globalLoading: state.globalLoading,
    // Métodos
    startLoading,
    stopLoading,
    clearAll,
    setMessage,
    isLoading,
    getMessage,
    withLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * Hook para usar o sistema de loading
 * @returns {object} { loadingKeys, globalLoading, startLoading, stopLoading, clearAll, setMessage, isLoading, getMessage, withLoading }
 */
export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading deve ser usado dentro de um LoadingProvider');
  }

  return context;
}

export default LoadingContext;
