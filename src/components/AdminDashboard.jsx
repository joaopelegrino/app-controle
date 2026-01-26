import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Users, BookOpen, TrendingUp, Award,
  ArrowLeft, RefreshCw, BarChart2, Clock,
  CheckCircle, AlertCircle, Plus, Pencil, GraduationCap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTenant } from '../hooks/useTenant';
import { apiService } from '../services/apiService';
import { UserFormModal } from './UserFormModal';
import { EnrollUserModal } from './EnrollUserModal';
import { ExportButton } from './ExportButton';
import { ModuleDifficultyCard } from './ModuleDifficultyCard';
import {
  SkeletonCard,
  SkeletonTable,
  SkeletonCourseCard,
} from './LoadingComponents';
import { EmptyState, EmptyStateInline } from './EmptyState';

/**
 * AdminDashboard - Dashboard administrativo
 *
 * US-076: Conectar AdminDashboard às Views do PostgreSQL
 *
 * Mostra:
 * - Estatísticas da empresa (v_company_progress)
 * - Lista de usuários com progresso (v_user_dashboard)
 * - Estatísticas de cursos (v_course_stats)
 */
export function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');
  const { user, company } = useAuth();
  const { tenantId } = useTenant();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyStats, setCompanyStats] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [moduleStats, setModuleStats] = useState({ difficultModules: [], summary: {} });

  // Estados do modal de usuário (US-092/093)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Estados do modal de matrícula (US-099)
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollPreselectedUser, setEnrollPreselectedUser] = useState(null);

  /**
   * Carrega todos os dados do dashboard
   */
  const loadDashboardData = async () => {
    if (!tenantId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Carregar dados em paralelo
      const [stats, users, courses, modules] = await Promise.all([
        apiService.getCompanyAnalytics(tenantId),
        apiService.getUsersDashboard(tenantId),
        apiService.getCourseStats(),
        apiService.getModuleStats(tenantId),
      ]);

      setCompanyStats(stats);
      setUsersData(users);
      setCourseStats(courses);
      setModuleStats(modules);
    } catch (err) {
      console.error('[AdminDashboard] Erro ao carregar dados:', err);
      setError(t('admin.error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [tenantId]);

  /**
   * Card de estatística
   */
  const StatCard = ({ icon: Icon, label, value, subValue, color = 'blue' }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {subValue && (
            <p className="text-sm text-gray-500 mt-1">{subValue}</p>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-full`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  /**
   * Tabela de usuários
   */
  const UsersTable = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{t('admin.usersTable.title')}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.usersTable.user')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.usersTable.role')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.progress')}
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
            {usersData.length === 0 ? (
              <EmptyStateInline
                colSpan={5}
                type="users"
                title={t('admin.usersTable.empty')}
                description={t('admin.usersTable.emptyDescription')}
              />
            ) : (
              usersData.map((userData) => (
                <tr key={userData.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {userData.full_name?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {userData.full_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {userData.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(userData.role)}`}>
                      {getRoleLabel(userData.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ maxWidth: '100px' }}>
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${userData.completion_percentage || 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round(userData.completion_percentage || 0)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {userData.modules_completed || 0} {t('common.ofModules', { total: userData.total_modules_tracked || 0 })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {userData.last_activity
                      ? formatDate(userData.last_activity)
                      : t('common.noActivity')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      {userData.role === 'student' && (
                        <button
                          onClick={() => {
                            setEnrollPreselectedUser({
                              id: userData.user_id,
                              full_name: userData.full_name,
                            });
                            setIsEnrollModalOpen(true);
                          }}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={t('admin.usersTable.enrollTooltip')}
                        >
                          <GraduationCap className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedUser({
                            id: userData.user_id,
                            email: userData.email,
                            full_name: userData.full_name,
                            role: userData.role,
                          });
                          setIsUserModalOpen(true);
                        }}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title={t('admin.usersTable.editTooltip')}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
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
   * Cards de cursos
   */
  const CourseCards = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('admin.courseStats.title')}</h3>
      <div className="space-y-4">
        {courseStats.length === 0 ? (
          <EmptyState
            type="courses"
            title={t('admin.courseStats.empty')}
            description={t('admin.courseStats.emptyDescription')}
            compact={true}
          />
        ) : (
          courseStats.map((course) => (
            <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{course.icon || '📚'}</span>
                <div>
                  <p className="font-medium text-gray-800">{course.name}</p>
                  <p className="text-sm text-gray-500">
                    {course.total_modules} módulos
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="font-medium">{course.enrolled_users || 0}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {Math.round(course.completion_rate || 0)}% conclusão
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Helpers
  const getRoleLabel = (role) => {
    const labels = {
      c_level: 'C-Level',
      admin: 'Admin',
      instructor: 'Instrutor',
      student: 'Aluno',
    };
    return labels[role] || role;
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      c_level: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800',
      instructor: 'bg-green-100 text-green-800',
      student: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /**
   * Skeleton loading para stats cards
   */
  const SkeletonStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  /**
   * Skeleton loading para cards de curso
   */
  const SkeletonCourses = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCourseCard key={i} />
        ))}
      </div>
    </div>
  );

  // Loading state com skeletons (US-103)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg mr-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-28 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SkeletonTable rows={5} columns={5} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <SkeletonCourses />
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
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
          {/* Desktop: single row | Mobile: stack */}
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
                  {t('admin.title')}
                </h1>
                <p className="text-sm text-gray-500 truncate">{company?.name}</p>
              </div>
            </div>

            {/* Actions section - scrollable on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setIsUserModalOpen(true);
                }}
                className="flex items-center px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap text-sm sm:text-base flex-shrink-0"
              >
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('admin.newUser')}</span>
              </button>
              <button
                onClick={() => {
                  setEnrollPreselectedUser(null);
                  setIsEnrollModalOpen(true);
                }}
                className="flex items-center px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 whitespace-nowrap text-sm sm:text-base flex-shrink-0"
              >
                <GraduationCap className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('admin.enroll')}</span>
              </button>
              <ExportButton
                type="users"
                companyId={tenantId}
                label={t('common.export')}
                showDropdown={true}
              />
              <button
                onClick={loadDashboardData}
                className="flex items-center px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg whitespace-nowrap text-sm sm:text-base flex-shrink-0"
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
            label={t('admin.stats.totalUsers')}
            value={companyStats?.total_users || 0}
            subValue={`${companyStats?.active_users || 0} ${t('common.active')}`}
            color="blue"
          />
          <StatCard
            icon={CheckCircle}
            label={t('admin.stats.modulesCompleted')}
            value={companyStats?.total_modules_completed || 0}
            color="green"
          />
          <StatCard
            icon={TrendingUp}
            label={t('admin.stats.completionRate')}
            value={`${Math.round(companyStats?.avg_completion_rate || 0)}%`}
            color="purple"
          />
          <StatCard
            icon={BookOpen}
            label={t('admin.stats.availableCourses')}
            value={courseStats.length}
            color="orange"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users Table - 2 columns */}
          <div className="lg:col-span-2">
            <UsersTable />
          </div>

          {/* Course Stats + Module Difficulty - 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <CourseCards />

            {/* Módulos Difíceis (US-101) */}
            <ModuleDifficultyCard
              difficultModules={moduleStats.difficultModules}
              summary={moduleStats.summary}
              isLoading={isLoading}
              compact={false}
            />
          </div>
        </div>
      </div>

      {/* Modal de criação/edição de usuário (US-092/093) */}
      <UserFormModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        companyId={tenantId}
        onSuccess={loadDashboardData}
      />

      {/* Modal de matrícula em curso (US-099) */}
      <EnrollUserModal
        isOpen={isEnrollModalOpen}
        onClose={() => {
          setIsEnrollModalOpen(false);
          setEnrollPreselectedUser(null);
        }}
        companyId={tenantId}
        assignedBy={user?.id}
        preselectedUser={enrollPreselectedUser}
        onSuccess={loadDashboardData}
      />
    </div>
  );
}

export default AdminDashboard;
