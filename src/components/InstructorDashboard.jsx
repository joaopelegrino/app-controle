import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Users, BookOpen, TrendingUp, Award,
  ArrowLeft, RefreshCw, Eye, Clock,
  CheckCircle, AlertCircle, GraduationCap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTenant } from '../hooks/useTenant';
import { usePermissions } from '../hooks/usePermissions';
import { apiService } from '../services/apiService';
import { StudentNotesModal } from './StudentNotesModal';
import { ExportButton } from './ExportButton';
import { SkeletonCard, SkeletonTable } from './LoadingComponents';
import { EmptyStateInline } from './EmptyState';

/**
 * InstructorDashboard - Dashboard do Instrutor
 *
 * US-094: Criar InstructorDashboard.jsx
 *
 * Mostra:
 * - Lista de alunos do time
 * - Progresso individual de cada aluno
 * - Botão para ver notas de cada aluno
 * - Métricas de engajamento
 */
export function InstructorDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');
  const { user, company } = useAuth();
  const { tenantId } = useTenant();
  const { hasPermission } = usePermissions();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [teamStats, setTeamStats] = useState(null);

  // Estado do modal de notas (US-095)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  /**
   * Carrega dados do dashboard
   */
  const loadDashboardData = async () => {
    if (!tenantId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Buscar usuários da empresa
      const usersData = await apiService.getUsersDashboard(tenantId);

      // Filtrar apenas alunos (students)
      const studentsOnly = usersData.filter((u) => u.role === 'student');
      setStudents(studentsOnly);

      // Calcular estatísticas do time
      const totalStudents = studentsOnly.length;
      const activeStudents = studentsOnly.filter((s) => s.last_activity).length;
      const totalModulesCompleted = studentsOnly.reduce(
        (sum, s) => sum + (s.modules_completed || 0),
        0
      );
      const avgCompletion =
        totalStudents > 0
          ? Math.round(
              studentsOnly.reduce((sum, s) => sum + (s.completion_percentage || 0), 0) /
                totalStudents
            )
          : 0;

      setTeamStats({
        totalStudents,
        activeStudents,
        totalModulesCompleted,
        avgCompletion,
      });
    } catch (err) {
      console.error('[InstructorDashboard] Erro ao carregar dados:', err);
      setError(t('instructor.error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Verificar permissão
    if (!hasPermission('dashboard.team')) {
      navigate('/dashboard');
      return;
    }
    loadDashboardData();
  }, [tenantId, hasPermission]);

  /**
   * Card de estatística
   */
  const StatCard = ({ icon: Icon, label, value, subValue, color = 'blue' }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-full`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  /**
   * Determina cor do progresso
   */
  const getProgressColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  /**
   * Formata data relativa
   */
  const formatRelativeDate = (dateString) => {
    if (!dateString) return 'Sem atividade';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  /**
   * Tabela de alunos
   */
  const StudentsTable = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{t('instructor.studentsTable.title')}</h3>
        <p className="text-sm text-gray-500">{t('instructor.studentsTable.subtitle')}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('instructor.studentsTable.student')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.progress')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.modules')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.lastActivity')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length === 0 ? (
              <EmptyStateInline
                colSpan={5}
                type="students"
                title={t('instructor.studentsTable.empty')}
                description={t('instructor.studentsTable.emptyDescription')}
              />
            ) : (
              students.map((student) => (
                <tr key={student.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-medium">
                          {student.full_name?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.full_name}
                        </div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-full bg-gray-200 rounded-full h-2.5 mr-2"
                        style={{ maxWidth: '120px' }}
                      >
                        <div
                          className={`h-2.5 rounded-full ${getProgressColor(
                            student.completion_percentage || 0
                          )}`}
                          style={{ width: `${student.completion_percentage || 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {Math.round(student.completion_percentage || 0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      {student.modules_completed || 0} / {student.total_modules_tracked || 16}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm ${
                        student.last_activity ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {formatRelativeDate(student.last_activity)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsNotesModalOpen(true);
                      }}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title={t('instructor.studentsTable.viewNotes')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t('instructor.studentsTable.viewNotes')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  /**
   * Card de alunos que precisam de atenção
   */
  const AttentionCard = () => {
    const needsAttention = students.filter(
      (s) => (s.completion_percentage || 0) < 25 || !s.last_activity
    );

    if (needsAttention.length === 0) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
          {t('instructor.attention.title')}
        </h3>
        <div className="space-y-3">
          {needsAttention.slice(0, 5).map((student) => (
            <div
              key={student.user_id}
              className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-600 text-sm font-medium">
                    {student.full_name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{student.full_name}</p>
                  <p className="text-xs text-gray-500">
                    {!student.last_activity
                      ? t('instructor.attention.neverAccessed')
                      : t('instructor.attention.percentCompleted', { percent: student.completion_percentage || 0 })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedStudent(student);
                  setIsNotesModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * Skeleton para cards de atenção
   */
  const SkeletonAttention = () => (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-gray-200 rounded mr-2" />
        <div className="h-6 bg-gray-200 rounded w-48" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
              <div className="space-y-1">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
            </div>
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );

  // Loading state com skeletons (US-103)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header Skeleton */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg mr-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-56 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-28 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SkeletonTable rows={5} columns={5} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <SkeletonAttention />
              <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-16 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-medium">{error}</p>
          <button
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {t('common.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header (US-107: Responsivo) */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title section */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-3 sm:mr-4 p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                  {t('instructor.title')}
                </h1>
                <p className="text-sm text-gray-500 truncate">
                  {company?.name} - {t('instructor.subtitle')}
                </p>
              </div>
            </div>
            {/* Actions section */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              <ExportButton
                type="users"
                companyId={tenantId}
                label={t('common.export')}
              />
              <button
                onClick={loadDashboardData}
                className="flex items-center px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg whitespace-nowrap flex-shrink-0"
                title={t('common.refresh')}
              >
                <RefreshCw className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('common.refresh')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label={t('instructor.stats.totalStudents')}
            value={teamStats?.totalStudents || 0}
            subValue={`${teamStats?.activeStudents || 0} ${t('common.active')}`}
            color="green"
          />
          <StatCard
            icon={CheckCircle}
            label={t('instructor.stats.modulesCompleted')}
            value={teamStats?.totalModulesCompleted || 0}
            subValue={t('instructor.stats.byTeam')}
            color="blue"
          />
          <StatCard
            icon={TrendingUp}
            label={t('instructor.stats.avgCompletion')}
            value={`${teamStats?.avgCompletion || 0}%`}
            color="purple"
          />
          <StatCard
            icon={Award}
            label={t('instructor.stats.engagement')}
            value={
              teamStats?.totalStudents > 0
                ? `${Math.round((teamStats.activeStudents / teamStats.totalStudents) * 100)}%`
                : '0%'
            }
            subValue={t('instructor.stats.activeStudents')}
            color="orange"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students Table - 2 columns */}
          <div className="lg:col-span-2">
            <StudentsTable />
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <AttentionCard />

            {/* Quick Tips Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('instructor.tips.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('instructor.tips.tip1')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('instructor.tips.tip2')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('instructor.tips.tip3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Notas do Aluno (US-095) */}
      <StudentNotesModal
        isOpen={isNotesModalOpen}
        onClose={() => {
          setIsNotesModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </div>
  );
}

export default InstructorDashboard;
