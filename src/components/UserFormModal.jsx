import React, { useState, useEffect } from 'react';
import { X, User, Mail, Shield, Loader2, AlertCircle } from 'lucide-react';
import { apiService } from '../services/apiService';
import { useToast } from '../contexts/ToastContext';
import { ConfirmModal } from './ConfirmModal';

/**
 * UserFormModal - Modal para criar/editar usuários
 *
 * US-092: Modal criar usuário no AdminDashboard
 * US-093: Modal editar/excluir usuário
 *
 * @param {boolean} isOpen - Controla visibilidade do modal
 * @param {function} onClose - Callback para fechar
 * @param {object|null} user - Usuário para edição (null = criação)
 * @param {string} companyId - ID da empresa
 * @param {function} onSuccess - Callback após sucesso
 */
export function UserFormModal({ isOpen, onClose, user, companyId, onSuccess }) {
  const isEditing = !!user;
  const toast = useToast();

  // Estado do formulário
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    role: 'student',
  });

  // Estados de UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Roles disponíveis
  const roles = [
    { value: 'student', label: 'Aluno', description: 'Acesso aos cursos e progresso pessoal' },
    { value: 'instructor', label: 'Instrutor', description: 'Visualiza progresso da equipe' },
    { value: 'admin', label: 'Administrador', description: 'Gerencia usuários e configurações' },
    { value: 'c_level', label: 'C-Level', description: 'Visão executiva e relatórios' },
  ];

  // Preenche form quando editando
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        full_name: user.full_name || '',
        role: user.role || 'student',
      });
    } else {
      setFormData({
        email: '',
        full_name: '',
        role: 'student',
      });
    }
    setError(null);
    setShowDeleteConfirm(false);
  }, [user, isOpen]);

  // Validação do formulário
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Formato de email inválido');
      return false;
    }

    if (!formData.full_name.trim()) {
      setError('Nome completo é obrigatório');
      return false;
    }

    if (formData.full_name.trim().length < 3) {
      setError('Nome deve ter pelo menos 3 caracteres');
      return false;
    }

    return true;
  };

  // Submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await apiService.updateUser(user.id, formData);
        toast.success(`${formData.full_name} atualizado com sucesso!`, 'Usuário Atualizado');
      } else {
        await apiService.createUser({
          ...formData,
          company_id: companyId,
        });
        toast.success(`${formData.full_name} criado com sucesso!`, 'Usuário Criado');
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      const errorMessage = err.message || 'Erro ao salvar usuário';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Excluir/Desativar usuário
  const handleDelete = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await apiService.deleteUser(user.id);
      toast.success(`${user.full_name} desativado com sucesso`, 'Usuário Desativado');
      onSuccess?.();
      onClose();
    } catch (err) {
      const errorMessage = err.message || 'Erro ao desativar usuário';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler de mudança de campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Modal de Confirmação de Exclusão (US-106) */}
          <ConfirmModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleDelete}
            title="Desativar Usuário"
            message={`Tem certeza que deseja desativar ${user?.full_name || 'este usuário'}? Ele não poderá mais acessar a plataforma, mas seus dados serão mantidos.`}
            confirmLabel="Desativar"
            cancelLabel="Cancelar"
            type="danger"
            isLoading={isSubmitting}
          />

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="colaborador@empresa.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  required
                />
                {!isEditing && (
                  <p className="mt-1 text-xs text-gray-500">
                    Senha inicial: Demo@2026
                  </p>
                )}
              </div>

              {/* Nome Completo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Nome do colaborador"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Função
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {roles.find((r) => r.value === formData.role)?.description}
                </p>
              </div>

              {/* Footer com botões */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Desativar
                  </button>
                )}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    isEditing ? 'Salvar' : 'Criar Usuário'
                  )}
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default UserFormModal;
