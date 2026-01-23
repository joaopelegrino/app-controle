import React from 'react';
import { X, AlertTriangle, Trash2, AlertCircle, Info } from 'lucide-react';

/**
 * ConfirmModal - Modal de confirmação reutilizável
 *
 * US-106: Modal confirmação antes de deletar
 *
 * Uso:
 * <ConfirmModal
 *   isOpen={isConfirmOpen}
 *   onClose={() => setIsConfirmOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Excluir usuário"
 *   message="Tem certeza que deseja excluir João Silva?"
 *   type="danger"
 * />
 */

// Configurações de tipo
const TYPE_CONFIG = {
  danger: {
    icon: Trash2,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    confirmBg: 'bg-red-500 hover:bg-red-600',
    confirmText: 'text-white',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    confirmBg: 'bg-amber-500 hover:bg-amber-600',
    confirmText: 'text-white',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    confirmBg: 'bg-blue-500 hover:bg-blue-600',
    confirmText: 'text-white',
  },
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  type = 'danger',
  isLoading = false,
  children,
}) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.danger;
  const Icon = config.icon;

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onKeyDown={handleKeyDown}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={!isLoading ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-full ${config.iconBg}`}>
                <Icon className={`w-8 h-8 ${config.iconColor}`} />
              </div>
            </div>

            {/* Title */}
            <h3
              id="confirm-modal-title"
              className="text-lg font-semibold text-gray-900 text-center mb-2"
            >
              {title}
            </h3>

            {/* Message */}
            <p className="text-sm text-gray-600 text-center mb-4">
              {message}
            </p>

            {/* Custom content (optional) */}
            {children && (
              <div className="mb-4">
                {children}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${config.confirmBg} ${config.confirmText}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processando...
                  </span>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * useConfirmModal - Hook para facilitar uso do ConfirmModal
 *
 * Uso:
 * const { showConfirm, ConfirmModalComponent } = useConfirmModal();
 *
 * const handleDelete = async (user) => {
 *   const confirmed = await showConfirm({
 *     title: 'Excluir usuário',
 *     message: `Deseja excluir ${user.name}?`,
 *   });
 *   if (confirmed) {
 *     await deleteUser(user.id);
 *   }
 * };
 */
export function useConfirmModal() {
  const [state, setState] = React.useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    confirmLabel: 'Confirmar',
    cancelLabel: 'Cancelar',
    resolve: null,
  });

  const showConfirm = React.useCallback((options) => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title: options.title || 'Confirmar ação',
        message: options.message || 'Tem certeza que deseja continuar?',
        type: options.type || 'danger',
        confirmLabel: options.confirmLabel || 'Confirmar',
        cancelLabel: options.cancelLabel || 'Cancelar',
        resolve,
      });
    });
  }, []);

  const handleConfirm = React.useCallback(() => {
    state.resolve?.(true);
    setState((prev) => ({ ...prev, isOpen: false }));
  }, [state.resolve]);

  const handleClose = React.useCallback(() => {
    state.resolve?.(false);
    setState((prev) => ({ ...prev, isOpen: false }));
  }, [state.resolve]);

  const ConfirmModalComponent = React.useMemo(
    () => (
      <ConfirmModal
        isOpen={state.isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={state.title}
        message={state.message}
        type={state.type}
        confirmLabel={state.confirmLabel}
        cancelLabel={state.cancelLabel}
      />
    ),
    [state, handleClose, handleConfirm]
  );

  return { showConfirm, ConfirmModalComponent };
}

export default ConfirmModal;
