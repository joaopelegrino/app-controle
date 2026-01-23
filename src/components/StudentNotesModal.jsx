import React, { useState, useEffect } from 'react';
import { X, FileText, Loader2, AlertCircle, Calendar, BookOpen } from 'lucide-react';
import { apiService } from '../services/apiService';
import { EmptyState } from './EmptyState';

/**
 * StudentNotesModal - Modal para visualizar notas de um aluno
 *
 * US-095: Modal ver notas de aluno
 *
 * Permite que instrutores e admins visualizem as notas de estudo
 * de um aluno específico.
 *
 * @param {boolean} isOpen - Controla visibilidade do modal
 * @param {function} onClose - Callback para fechar
 * @param {object} student - Dados do aluno selecionado
 */
export function StudentNotesModal({ isOpen, onClose, student }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('bash');

  // Cursos disponíveis
  const courses = [
    { id: 'bash', name: 'Bash/Shell', icon: '🖥️' },
    { id: 'clang', name: 'Linguagem C', icon: '⚙️' },
    { id: 'rust', name: 'Rust', icon: '🦀' },
    { id: 'vscode', name: 'VS Code', icon: '💻' },
  ];

  /**
   * Carrega notas do aluno
   */
  const loadNotes = async () => {
    if (!student?.user_id || !selectedCourse) return;

    setIsLoading(true);
    setError(null);

    try {
      const notesData = await apiService.getNotes(student.user_id, selectedCourse);
      setNotes(notesData);
    } catch (err) {
      console.error('[StudentNotesModal] Erro ao carregar notas:', err);
      setError('Erro ao carregar notas do aluno');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar notas quando aluno ou curso mudar
  useEffect(() => {
    if (isOpen && student) {
      loadNotes();
    }
  }, [isOpen, student, selectedCourse]);

  // Reset ao fechar
  useEffect(() => {
    if (!isOpen) {
      setNotes(null);
      setError(null);
      setSelectedCourse('bash');
    }
  }, [isOpen]);

  /**
   * Formata tamanho em bytes
   */
  const formatSize = (bytes) => {
    if (!bytes) return '0 bytes';
    if (bytes < 1024) return `${bytes} bytes`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  /**
   * Formata data
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Notas de {student?.full_name || 'Aluno'}
              </h3>
              <p className="text-sm text-gray-500">{student?.email}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Course Selector */}
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 mr-2">Curso:</span>
              <div className="flex gap-2">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedCourse === course.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="mr-1">{course.icon}</span>
                    {course.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Loading */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            )}

            {/* Error */}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-gray-700">{error}</p>
                <button
                  onClick={loadNotes}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Notes Content */}
            {!isLoading && !error && (
              <>
                {/* Metadata */}
                {notes?.updatedAt && (
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Última atualização: {formatDate(notes.updatedAt)}
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Tamanho: {formatSize(notes?.sizeBytes)}
                    </div>
                  </div>
                )}

                {/* Notes Text */}
                {notes?.content ? (
                  <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                      {notes.content}
                    </pre>
                  </div>
                ) : (
                  <EmptyState
                    type="notes"
                    title="Sem anotações neste curso"
                    description={`${student?.full_name || 'O aluno'} ainda não fez anotações no curso selecionado.`}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Progresso do aluno:{' '}
                <span className="font-medium text-gray-700">
                  {student?.completion_percentage || 0}%
                </span>{' '}
                ({student?.modules_completed || 0} módulos concluídos)
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentNotesModal;
