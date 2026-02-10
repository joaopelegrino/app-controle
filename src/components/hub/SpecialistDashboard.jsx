import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DollarSign, Users, Star, BookOpen,
  ArrowLeft, RefreshCw, AlertCircle, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { apiService } from '../../services/apiService';
import { SkeletonCard, SkeletonTable } from '../LoadingComponents';
import { EmptyState } from '../EmptyState';

/**
 * SpecialistDashboard - Dashboard do Especialista
 *
 * US-147: Painel do especialista seguindo padrao InstructorDashboard
 *
 * Mostra:
 * - Stats: Receita, Matriculas, Rating, Cursos Publicados
 * - Tabela "Meus Cursos" com nome, alunos, rating, status
 * - Secao "Avaliacoes Recentes"
 */
export function SpecialistDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();
  const { isSpecialist, isAdmin, isCLevel } = usePermissions();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Buscar perfil do especialista
      const specialistData = await apiService.getSpecialistByUserId(user.id);
      if (!specialistData) {
        setError(t('specialist.error'));
        return;
      }
      setSpecialist(specialistData);

      // Buscar cursos do especialista
      const coursesData = await apiService.getHubCoursesBySpecialist(specialistData.specialist_id);
      setCourses(coursesData || []);

      // Buscar reviews dos cursos
      const allReviews = [];
      for (const course of (coursesData || []).slice(0, 5)) {
        const courseReviews = await apiService.getCourseReviews(course.id);
        allReviews.push(...(courseReviews || []).map(r => ({
          ...r,
          course_name: course.course_id
        })));
      }
      setReviews(allReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5));
    } catch (err) {
      console.error('[SpecialistDashboard] Erro ao carregar dados:', err);
      setError(t('specialist.error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSpecialist && !isAdmin && !isCLevel) {
      navigate('/dashboard');
      return;
    }
    loadDashboardData();
  }, [user?.id]);

  const StatCard = ({ icon: Icon, label, value, subValue, color = 'indigo' }) => (
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const getStatusBadge = (status) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      pending_review: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
      archived: 'bg-gray-100 text-gray-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-lg mr-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-56 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
          <SkeletonTable rows={3} columns={4} />
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
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            {t('common:tryAgain', 'Tentar novamente')}
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-3 sm:mr-4 p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                  {t('specialist.title')}
                </h1>
                <p className="text-sm text-gray-500 truncate">
                  {specialist?.specialist_name || user?.fullName} - {t('specialist.subtitle')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={loadDashboardData}
                className="flex items-center px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg whitespace-nowrap"
              >
                <RefreshCw className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('common:refresh', 'Atualizar')}</span>
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
            icon={DollarSign}
            label={t('specialist.stats.revenue')}
            value={`R$ ${Number(specialist?.total_revenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            subValue={`${t('specialist.revenueShare')}: ${specialist?.revenue_share_percent || 70}%`}
            color="green"
          />
          <StatCard
            icon={Users}
            label={t('specialist.stats.enrollments')}
            value={specialist?.total_students || 0}
            color="blue"
          />
          <StatCard
            icon={Star}
            label={t('specialist.stats.avgRating')}
            value={Number(specialist?.rating_avg || 0).toFixed(1)}
            color="yellow"
          />
          <StatCard
            icon={BookOpen}
            label={t('specialist.stats.publishedCourses')}
            value={specialist?.total_courses || 0}
            color="indigo"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meus Cursos - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">{t('specialist.myCourses')}</h3>
              </div>
              {courses.length === 0 ? (
                <EmptyState
                  type="courses"
                  title={t('specialist.myCourses')}
                  description={t('specialist.noReviewsDescription')}
                  compact
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t('common:hub.specialists.dashboard.courseHeader', 'Curso')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t('common:hub.specialists.dashboard.studentsHeader', 'Alunos')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t('common:hub.specialists.dashboard.ratingHeader', 'Rating')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t('common:hub.specialists.dashboard.statusHeader', 'Status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                              {course.course_id}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {course.total_enrollments || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {renderStars(course.rating_avg || 0)}
                              <span className="text-sm text-gray-600 ml-1">
                                {Number(course.rating_avg || 0).toFixed(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(course.status)}`}>
                              {course.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Avaliacoes Recentes - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />
                {t('specialist.recentReviews')}
              </h3>
              {reviews.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{t('specialist.noReviews')}</p>
                  <p className="text-xs mt-1">{t('specialist.noReviewsDescription')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(review.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                      {review.specialist_reply && (
                        <div className="mt-2 pl-3 border-l-2 border-indigo-200">
                          <p className="text-xs text-indigo-600 font-medium">{t('common:hub.specialists.dashboard.yourReply', 'Sua resposta:')}</p>
                          <p className="text-sm text-gray-600">{review.specialist_reply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialistDashboard;
