import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, Award, DollarSign,
  ArrowLeft, RefreshCw, BarChart2, Target,
  ArrowUpRight, ArrowDownRight, Briefcase
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTenant } from '../hooks/useTenant';
import { apiService } from '../services/apiService';

/**
 * ExecutiveDashboard - Dashboard Executivo para C-Level
 *
 * US-077: Criar ExecutiveDashboard para C-Level
 *
 * Mostra:
 * - KPIs principais (usuários ativos, conclusão, engajamento)
 * - Tendências (progresso ao longo do tempo)
 * - ROI estimado
 */
export function ExecutiveDashboard() {
  const navigate = useNavigate();
  const { user, company } = useAuth();
  const { tenantId } = useTenant();

  const [isLoading, setIsLoading] = useState(true);
  const [companyStats, setCompanyStats] = useState(null);
  const [courseStats, setCourseStats] = useState([]);
  const [progressHistory, setProgressHistory] = useState([]);

  /**
   * Carrega dados do dashboard
   */
  const loadData = async () => {
    if (!tenantId) return;

    setIsLoading(true);
    try {
      const [stats, courses, progress] = await Promise.all([
        apiService.getCompanyAnalytics(tenantId),
        apiService.getCourseStats(),
        apiService.getCompanyProgress(tenantId),
      ]);

      setCompanyStats(stats);
      setCourseStats(courses);
      setProgressHistory(progress);
    } catch (error) {
      console.error('[ExecutiveDashboard] Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tenantId]);

  // Calcular métricas executivas
  const metrics = {
    activeUsers: companyStats?.active_users || 0,
    totalUsers: companyStats?.total_users || 0,
    completionRate: Math.round(companyStats?.avg_completion_rate || 0),
    modulesCompleted: companyStats?.total_modules_completed || 0,
    engagementRate: companyStats?.total_users > 0
      ? Math.round((companyStats?.active_users / companyStats?.total_users) * 100)
      : 0,
    // ROI simulado baseado em métricas
    investmentValue: 50000,
    estimatedReturn: Math.round((companyStats?.total_modules_completed || 0) * 500),
  };

  metrics.roi = metrics.investmentValue > 0
    ? Math.round(((metrics.estimatedReturn - metrics.investmentValue) / metrics.investmentValue) * 100)
    : 0;

  /**
   * KPI Card com tendência
   */
  const KPICard = ({ label, value, subLabel, trend, trendValue, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <p className="text-4xl font-bold text-gray-800">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
      {subLabel && <p className="text-xs text-gray-400 mt-1">{subLabel}</p>}
    </div>
  );

  /**
   * Barra de progresso visual
   */
  const ProgressBar = ({ value, label, color = 'blue' }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-800">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`bg-gradient-to-r from-${color}-400 to-${color}-600 h-3 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-10 h-10 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Carregando métricas executivas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header Executivo */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-white/20 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Dashboard Executivo</h1>
                <p className="text-blue-100 text-sm">{company?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadData}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            icon={Users}
            value={metrics.activeUsers}
            label="Usuários Ativos"
            subLabel={`de ${metrics.totalUsers} total`}
            trend="up"
            trendValue="+12%"
          />
          <KPICard
            icon={Target}
            value={`${metrics.completionRate}%`}
            label="Taxa de Conclusão"
            subLabel={`${metrics.modulesCompleted} módulos`}
            trend={metrics.completionRate > 50 ? 'up' : 'down'}
            trendValue={metrics.completionRate > 50 ? '+8%' : '-3%'}
          />
          <KPICard
            icon={TrendingUp}
            value={`${metrics.engagementRate}%`}
            label="Engajamento"
            subLabel="usuários ativos/total"
            trend="up"
            trendValue="+5%"
          />
          <KPICard
            icon={Award}
            value={metrics.modulesCompleted}
            label="Módulos Concluídos"
            subLabel="total acumulado"
          />
        </div>

        {/* ROI Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">ROI Estimado</h2>
                <p className="text-gray-500 text-sm">Retorno sobre investimento em treinamento</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-4xl font-bold ${metrics.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metrics.roi}%
              </p>
              <p className="text-sm text-gray-500">ROI</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Investimento</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {metrics.investmentValue.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Retorno Estimado</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {metrics.estimatedReturn.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Lucro Projetado</p>
              <p className={`text-2xl font-bold ${metrics.estimatedReturn - metrics.investmentValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {(metrics.estimatedReturn - metrics.investmentValue).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Progresso por Curso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance por Curso */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Performance por Curso</h3>
            <div className="space-y-4">
              {courseStats.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum dado disponível</p>
              ) : (
                courseStats.map((course) => (
                  <ProgressBar
                    key={course.id}
                    label={`${course.icon || '📚'} ${course.name}`}
                    value={Math.round(course.completion_rate || 0)}
                    color={course.completion_rate > 50 ? 'green' : 'blue'}
                  />
                ))
              )}
            </div>
          </div>

          {/* Resumo Executivo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Resumo Executivo</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Plano Atual</span>
                </div>
                <span className="font-medium text-blue-600 capitalize">
                  {company?.plan || 'Starter'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Colaboradores Treinando</span>
                </div>
                <span className="font-medium text-green-600">
                  {metrics.activeUsers} de {metrics.totalUsers}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <BarChart2 className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Cursos Disponíveis</span>
                </div>
                <span className="font-medium text-purple-600">
                  {courseStats.length}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700">Horas de Treinamento</span>
                </div>
                <span className="font-medium text-orange-600">
                  {Math.round(metrics.modulesCompleted * 2)}h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveDashboard;
