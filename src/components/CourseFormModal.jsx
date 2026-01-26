import React, { useState, useEffect } from 'react';
import { X, BookOpen, FileText, Clock, Layers, BarChart3, Award, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../services/apiService';
import { useToast } from '../contexts/ToastContext';
import { ConfirmModal } from './ConfirmModal';
import { usePermissions } from '../hooks/usePermissions';

/**
 * CourseFormModal - Modal para criar/editar cursos
 *
 * US-125: CRUD de Cursos (Sprint 14)
 *
 * @param {boolean} isOpen - Controla visibilidade do modal
 * @param {function} onClose - Callback para fechar
 * @param {object|null} course - Curso para edição (null = criação)
 * @param {function} onSuccess - Callback após sucesso
 */
export function CourseFormModal({ isOpen, onClose, course, onSuccess }) {
  const isEditing = !!course;
  const toast = useToast();
  const { t } = useTranslation(['dashboard', 'common']);
  const { canDeleteCourses } = usePermissions();

  // Estado do formulário
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📚',
    difficulty: 'beginner',
    duration_hours: '',
    total_modules: '',
    status: 'in-development',
    badge: '',
  });

  // Estados de UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  // Opções de dificuldade
  const difficulties = [
    { value: 'beginner', label: t('dashboard:courses.difficulty.beginner', 'Iniciante'), color: 'text-green-600' },
    { value: 'intermediate', label: t('dashboard:courses.difficulty.intermediate', 'Intermediário'), color: 'text-yellow-600' },
    { value: 'advanced', label: t('dashboard:courses.difficulty.advanced', 'Avançado'), color: 'text-red-600' },
  ];

  // Opções de status
  const statuses = [
    { value: 'active', label: t('dashboard:courses.status.active', 'Ativo') },
    { value: 'in-development', label: t('dashboard:courses.status.inDevelopment', 'Em Desenvolvimento') },
  ];

  // Opções de badge
  const badges = [
    { value: '', label: t('dashboard:courses.badge.none', 'Nenhum') },
    { value: 'new', label: t('dashboard:courses.badge.new', 'Novo') },
    { value: 'integrated', label: t('dashboard:courses.badge.integrated', 'Integrado') },
  ];

  // Emojis comuns para cursos
  const commonIcons = ['📚', '💻', '🐧', '🔧', '🎯', '📊', '🔐', '☁️', '🐍', '⚙️', '🌐', '📱'];

  // Preenche form quando editando
  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        description: course.description || '',
        icon: course.icon || '📚',
        difficulty: course.difficulty || 'beginner',
        duration_hours: course.duration_hours?.toString() || '',
        total_modules: course.total_modules?.toString() || '',
        status: course.status || 'in-development',
        badge: course.badge || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: '📚',
        difficulty: 'beginner',
        duration_hours: '',
        total_modules: '',
        status: 'in-development',
        badge: '',
      });
    }
    setError(null);
    setShowArchiveConfirm(false);
  }, [course, isOpen]);

  // Validação do formulário
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError(t('dashboard:courses.errors.nameRequired', 'Nome do curso é obrigatório'));
      return false;
    }

    if (formData.name.trim().length < 3) {
      setError(t('dashboard:courses.errors.nameMinLength', 'Nome deve ter pelo menos 3 caracteres'));
      return false;
    }

    if (formData.duration_hours && (isNaN(formData.duration_hours) || Number(formData.duration_hours) < 0)) {
      setError(t('dashboard:courses.errors.invalidDuration', 'Duração deve ser um número positivo'));
      return false;
    }

    if (formData.total_modules && (isNaN(formData.total_modules) || Number(formData.total_modules) < 0)) {
      setError(t('dashboard:courses.errors.invalidModules', 'Total de módulos deve ser um número positivo'));
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
      const courseData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        icon: formData.icon,
        difficulty: formData.difficulty,
        duration_hours: formData.duration_hours ? Number(formData.duration_hours) : null,
        total_modules: formData.total_modules ? Number(formData.total_modules) : 0,
        status: formData.status,
        badge: formData.badge || null,
      };

      if (isEditing) {
        await apiService.updateCourse(course.id, courseData);
        toast.success(
          t('dashboard:courses.messages.updated', { name: formData.name }),
          t('dashboard:courses.messages.updatedTitle', 'Curso Atualizado')
        );
      } else {
        await apiService.createCourse(courseData);
        toast.success(
          t('dashboard:courses.messages.created', { name: formData.name }),
          t('dashboard:courses.messages.createdTitle', 'Curso Criado')
        );
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      const errorMessage = err.message || t('dashboard:courses.errors.saveFailed', 'Erro ao salvar curso');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Arquivar curso
  const handleArchive = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await apiService.deleteCourse(course.id);
      toast.success(
        t('dashboard:courses.messages.archived', { name: course.name }),
        t('dashboard:courses.messages.archivedTitle', 'Curso Arquivado')
      );
      onSuccess?.();
      onClose();
    } catch (err) {
      const errorMessage = err.message || t('dashboard:courses.errors.archiveFailed', 'Erro ao arquivar curso');
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-200 z-10">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditing
                ? t('dashboard:courses.edit', 'Editar Curso')
                : t('dashboard:courses.create', 'Novo Curso')
              }
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
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Modal de Confirmação de Arquivamento */}
          <ConfirmModal
            isOpen={showArchiveConfirm}
            onClose={() => setShowArchiveConfirm(false)}
            onConfirm={handleArchive}
            title={t('dashboard:courses.archiveTitle', 'Arquivar Curso')}
            message={t('dashboard:courses.archiveMessage', {
              name: course?.name,
              defaultValue: `Tem certeza que deseja arquivar "${course?.name}"? O curso não aparecerá mais para os usuários, mas os dados de progresso serão mantidos.`
            })}
            confirmLabel={t('dashboard:courses.archiveConfirm', 'Arquivar')}
            cancelLabel={t('common:buttons.cancel', 'Cancelar')}
            type="warning"
            isLoading={isSubmitting}
          />

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            {/* Nome do Curso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BookOpen className="w-4 h-4 inline mr-1" />
                {t('dashboard:courses.fields.name', 'Nome do Curso')} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('dashboard:courses.placeholders.name', 'Ex: Fundamentos de Linux')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4 inline mr-1" />
                {t('dashboard:courses.fields.description', 'Descrição')}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('dashboard:courses.placeholders.description', 'Descrição do curso...')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Ícone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('dashboard:courses.fields.icon', 'Ícone')}
              </label>
              <div className="flex flex-wrap gap-2">
                {commonIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, icon }))}
                    className={`w-10 h-10 text-xl rounded-lg border-2 transition-all ${
                      formData.icon === icon
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Dificuldade e Status */}
            <div className="grid grid-cols-2 gap-4">
              {/* Dificuldade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <BarChart3 className="w-4 h-4 inline mr-1" />
                  {t('dashboard:courses.fields.difficulty', 'Dificuldade')} *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  {difficulties.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('dashboard:courses.fields.status', 'Status')}
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duração e Módulos */}
            <div className="grid grid-cols-2 gap-4">
              {/* Duração */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {t('dashboard:courses.fields.duration', 'Duração (horas)')}
                </label>
                <input
                  type="number"
                  name="duration_hours"
                  value={formData.duration_hours}
                  onChange={handleChange}
                  placeholder="8"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Total de Módulos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Layers className="w-4 h-4 inline mr-1" />
                  {t('dashboard:courses.fields.modules', 'Total de Módulos')}
                </label>
                <input
                  type="number"
                  name="total_modules"
                  value={formData.total_modules}
                  onChange={handleChange}
                  placeholder="16"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Badge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Award className="w-4 h-4 inline mr-1" />
                {t('dashboard:courses.fields.badge', 'Badge')}
              </label>
              <select
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              >
                {badges.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Footer com botões */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {isEditing && canDeleteCourses && (
                <button
                  type="button"
                  onClick={() => setShowArchiveConfirm(true)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {t('dashboard:courses.archive', 'Arquivar')}
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                {t('common:buttons.cancel', 'Cancelar')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('common:buttons.saving', 'Salvando...')}
                  </>
                ) : (
                  isEditing
                    ? t('common:buttons.save', 'Salvar')
                    : t('dashboard:courses.createButton', 'Criar Curso')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseFormModal;
