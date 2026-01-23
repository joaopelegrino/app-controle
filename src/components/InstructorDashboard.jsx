import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      setError('Erro ao carregar dados do time');
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
        <h3 className="text-lg font-semibold text-gray-800">Alunos do Time</h3>
        <p className="text-sm text-gray-500">Acompanhe o progresso de cada aluno</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aluno
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progresso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Módulos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Atividade
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length === 0 ? (
              <EmptyStateInline
                colSpan={5}
                type="students"
                title="Nenhum aluno no seu time"
                description="Quando alunos forem matriculados, eles aparecerão aqui para acompanhamento."
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
                      title="Ver notas do aluno"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Notas
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
          Alunos que Precisam de Atenção
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
                      ? 'Nunca acessou'
                      : `${student.completion_percentage || 0}% concluído`}
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
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard do Instrutor</h1>
                <p className="text-sm text-gray-500">
                  {company?.name} - Acompanhamento do Time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ExportButton
                type="users"
                companyId={tenantId}
                label="Exportar"
              />
              <button
                onClick={loadDashboardData}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
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
            label="Total de Alunos"
            value={teamStats?.totalStudents || 0}
            subValue={`${teamStats?.activeStudents || 0} ativos`}
            color="green"
          />
          <StatCard
            icon={CheckCircle}
            label="Módulos Concluídos"
            value={teamStats?.totalModulesCompleted || 0}
            subValue="pelo time"
            color="blue"
          />
          <StatCard
            icon={TrendingUp}
            label="Média de Conclusão"
            value={`${teamStats?.avgCompletion || 0}%`}
            color="purple"
          />
          <StatCard
            icon={Award}
            label="Engajamento"
            value={
              teamStats?.totalStudents > 0
                ? `${Math.round((teamStats.activeStudents / teamStats.totalStudents) * 100)}%`
                : '0%'
            }
            subValue="alunos ativos"
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Dicas</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Clique em "Ver Notas" para acompanhar as anotações de cada aluno
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Alunos com menos de 25% de progresso aparecem em destaque
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Use a última atividade para identificar alunos inativos
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
