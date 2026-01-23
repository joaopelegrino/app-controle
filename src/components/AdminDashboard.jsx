import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, TrendingUp, Award,
  ArrowLeft, RefreshCw, BarChart2, Clock,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTenant } from '../hooks/useTenant';
import { apiService } from '../services/apiService';

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
  const { user, company } = useAuth();
  const { tenantId } = useTenant();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyStats, setCompanyStats] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [courseStats, setCourseStats] = useState([]);

  /**
   * Carrega todos os dados do dashboard
   */
  const loadDashboardData = async () => {
    if (!tenantId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Carregar dados em paralelo
      const [stats, users, courses] = await Promise.all([
        apiService.getCompanyAnalytics(tenantId),
        apiService.getUsersDashboard(tenantId),
        apiService.getCourseStats(),
      ]);

      setCompanyStats(stats);
      setUsersData(users);
      setCourseStats(courses);
    } catch (err) {
      console.error('[AdminDashboard] Erro ao carregar dados:', err);
      setError('Erro ao carregar dados do dashboard');
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
        <h3 className="text-lg font-semibold text-gray-800">Usuários da Empresa</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progresso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Atividade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Nenhum usuário encontrado
                </td>
              </tr>
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
                      {userData.modules_completed || 0} de {userData.total_modules_tracked || 0} módulos
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {userData.last_activity
                      ? formatDate(userData.last_activity)
                      : 'Sem atividade'}
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
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas por Curso</h3>
      <div className="space-y-4">
        {courseStats.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhum curso disponível</p>
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando dashboard...</p>
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
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Administrativo</h1>
                <p className="text-sm text-gray-500">{company?.name}</p>
              </div>
            </div>
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total de Usuários"
            value={companyStats?.total_users || 0}
            subValue={`${companyStats?.active_users || 0} ativos`}
            color="blue"
          />
          <StatCard
            icon={CheckCircle}
            label="Módulos Concluídos"
            value={companyStats?.total_modules_completed || 0}
            color="green"
          />
          <StatCard
            icon={TrendingUp}
            label="Taxa de Conclusão"
            value={`${Math.round(companyStats?.avg_completion_rate || 0)}%`}
            color="purple"
          />
          <StatCard
            icon={BookOpen}
            label="Cursos Disponíveis"
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

          {/* Course Stats - 1 column */}
          <div className="lg:col-span-1">
            <CourseCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
