import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Users,
  Calendar,
  Loader2,
  AlertCircle,
  Search,
  Check,
} from 'lucide-react';
import { apiService } from '../services/apiService';
import { useToast } from '../contexts/ToastContext';

/**
 * EnrollUserModal - Modal para matricular usuários em cursos
 *
 * US-099: UI atribuir curso a aluno
 *
 * @param {boolean} isOpen - Controla visibilidade do modal
 * @param {function} onClose - Callback para fechar
 * @param {string} companyId - ID da empresa
 * @param {number} assignedBy - ID do admin/instructor que está atribuindo
 * @param {object|null} preselectedUser - Usuário pré-selecionado (opcional)
 * @param {string|null} preselectedCourse - Curso pré-selecionado (opcional)
 * @param {function} onSuccess - Callback após sucesso
 */
export function EnrollUserModal({
  isOpen,
  onClose,
  companyId,
  assignedBy,
  preselectedUser = null,
  preselectedCourse = null,
  onSuccess,
}) {
  const toast = useToast();

  // Dados carregados
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Estado do formulário
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados de UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Carrega dados ao abrir
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, companyId]);

  // Pré-seleciona usuário se fornecido
  useEffect(() => {
    if (preselectedUser) {
      setSelectedUsers([preselectedUser.id]);
    }
    if (preselectedCourse) {
      setSelectedCourse(preselectedCourse);
    }
  }, [preselectedUser, preselectedCourse, isOpen]);

  // Reseta ao fechar
  useEffect(() => {
    if (!isOpen) {
      setSelectedUsers([]);
      setSelectedCourse('');
      setDueDate('');
      setSearchTerm('');
      setError(null);
    }
  }, [isOpen]);

  // Carrega usuários e cursos
  const loadData = async () => {
    setLoadingData(true);
    setError(null);

    try {
      const [usersData, coursesData] = await Promise.all([
        apiService.getCompanyUsers(companyId),
        apiService.getCourses(),
      ]);

      // Filtrar apenas alunos para matrícula
      const students = usersData.filter(
        (u) => u.role === 'student' || u.role === 'instructor'
      );
      setUsers(students);
      setCourses(coursesData);
    } catch (err) {
      console.error('[EnrollUserModal] Erro ao carregar dados:', err);
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setLoadingData(false);
    }
  };

  // Filtra usuários pela busca
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  // Toggle seleção de usuário
  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
    setError(null);
  };

  // Selecionar todos filtrados
  const selectAll = () => {
    const filteredIds = filteredUsers.map((u) => u.id);
    setSelectedUsers((prev) => {
      const newSelection = new Set([...prev, ...filteredIds]);
      return Array.from(newSelection);
    });
  };

  // Desmarcar todos
  const clearSelection = () => {
    setSelectedUsers([]);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (selectedUsers.length === 0) {
      setError('Selecione pelo menos um usuário');
      return;
    }

    if (!selectedCourse) {
      setError('Selecione um curso');
      return;
    }

    setIsSubmitting(true);
    let successCount = 0;
    let failedCount = 0;

    // Matricular cada usuário selecionado
    for (const userId of selectedUsers) {
      try {
        await apiService.enrollUser({
          userId,
          courseId: selectedCourse,
          assignedBy,
          dueDate: dueDate || null,
        });
        successCount++;
      } catch (err) {
        console.error(`[EnrollUserModal] Erro ao matricular ${userId}:`, err);
        failedCount++;
      }
    }

    setIsSubmitting(false);

    if (failedCount === 0) {
      const courseName = courses.find(c => c.id === selectedCourse)?.name || selectedCourse;
      toast.success(
        `${successCount} usuário(s) matriculado(s) em ${courseName}`,
        'Matrícula Realizada'
      );
      onSuccess?.();
      onClose();
    } else if (successCount > 0) {
      toast.warning(
        `${successCount} matrícula(s) ok, ${failedCount} falharam`,
        'Matrícula Parcial'
      );
      setError(`${failedCount} matrícula(s) falharam.`);
    } else {
      toast.error('Erro ao realizar matrículas');
      setError('Todas as matrículas falharam. Verifique se os usuários já não estão matriculados.');
    }
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              Matricular em Curso
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Loading */}
          {loadingData && (
            <div className="flex-1 flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Formulário */}
          {!loadingData && (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {/* Seleção de Curso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    Curso
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting || !!preselectedCourse}
                    required
                  >
                    <option value="">Selecione um curso</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.icon} {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Data Limite (opcional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Data Limite (opcional)
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Se definida, o sistema alertará sobre atrasos
                  </p>
                </div>

                {/* Seleção de Usuários */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <Users className="w-4 h-4 inline mr-1" />
                      Usuários ({selectedUsers.length} selecionado
                      {selectedUsers.length !== 1 ? 's' : ''})
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={selectAll}
                        className="text-xs text-blue-600 hover:text-blue-800"
                        disabled={isSubmitting}
                      >
                        Selecionar todos
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="text-xs text-gray-600 hover:text-gray-800"
                        disabled={isSubmitting}
                      >
                        Limpar
                      </button>
                    </div>
                  </div>

                  {/* Campo de busca */}
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por nome ou email..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Lista de usuários */}
                  <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        {searchTerm
                          ? 'Nenhum usuário encontrado'
                          : 'Nenhum usuário disponível'}
                      </div>
                    ) : (
                      filteredUsers.map((user) => {
                        const isSelected = selectedUsers.includes(user.id);
                        return (
                          <div
                            key={user.id}
                            onClick={() => !isSubmitting && toggleUser(user.id)}
                            className={`flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                              isSelected
                                ? 'bg-blue-50'
                                : 'hover:bg-gray-50'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">
                                {user.full_name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {user.email}
                              </p>
                            </div>
                            <span
                              className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                user.role === 'instructor'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {user.role === 'instructor' ? 'Instrutor' : 'Aluno'}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedUsers.length === 0 || !selectedCourse}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Matriculando...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Matricular {selectedUsers.length > 0 && `(${selectedUsers.length})`}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnrollUserModal;
