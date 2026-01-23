import React, { createContext, useContext, useReducer, useCallback } from 'react';

/**
 * ToastContext - Sistema de notificações toast
 *
 * US-102: Toast notifications
 *
 * Tipos de toast:
 * - success: Operação bem-sucedida (verde)
 * - error: Erro na operação (vermelho)
 * - warning: Aviso (amarelo)
 * - info: Informação (azul)
 */

// Tipos de ação
const TOAST_ACTIONS = {
  ADD: 'ADD_TOAST',
  REMOVE: 'REMOVE_TOAST',
  CLEAR_ALL: 'CLEAR_ALL_TOASTS',
};

// Estado inicial
const initialState = {
  toasts: [],
};

// Reducer para gerenciar toasts
function toastReducer(state, action) {
  switch (action.type) {
    case TOAST_ACTIONS.ADD:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    case TOAST_ACTIONS.REMOVE:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };

    case TOAST_ACTIONS.CLEAR_ALL:
      return {
        ...state,
        toasts: [],
      };

    default:
      return state;
  }
}

// Contexto
const ToastContext = createContext(null);

// Provider
export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  /**
   * Adiciona um novo toast
   * @param {object} options - { type, title, message, duration }
   */
  const addToast = useCallback((options) => {
    const id = Date.now() + Math.random();
    const duration = options.duration ?? 5000;

    const toast = {
      id,
      type: options.type || 'info',
      title: options.title || '',
      message: options.message || '',
      duration,
      createdAt: Date.now(),
    };

    dispatch({ type: TOAST_ACTIONS.ADD, payload: toast });

    // Auto-remove após duration (se não for 0)
    if (duration > 0) {
      setTimeout(() => {
        dispatch({ type: TOAST_ACTIONS.REMOVE, payload: id });
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remove um toast específico
   * @param {number} id - ID do toast
   */
  const removeToast = useCallback((id) => {
    dispatch({ type: TOAST_ACTIONS.REMOVE, payload: id });
  }, []);

  /**
   * Remove todos os toasts
   */
  const clearAll = useCallback(() => {
    dispatch({ type: TOAST_ACTIONS.CLEAR_ALL });
  }, []);

  // Helpers para tipos específicos
  const success = useCallback(
    (message, title = 'Sucesso') => addToast({ type: 'success', title, message }),
    [addToast]
  );

  const error = useCallback(
    (message, title = 'Erro') => addToast({ type: 'error', title, message }),
    [addToast]
  );

  const warning = useCallback(
    (message, title = 'Atenção') => addToast({ type: 'warning', title, message }),
    [addToast]
  );

  const info = useCallback(
    (message, title = 'Informação') => addToast({ type: 'info', title, message }),
    [addToast]
  );

  const value = {
    toasts: state.toasts,
    addToast,
    removeToast,
    clearAll,
    // Helpers
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook para usar o sistema de toasts
 * @returns {object} { toasts, addToast, removeToast, clearAll, success, error, warning, info }
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }

  return context;
}

export default ToastContext;
