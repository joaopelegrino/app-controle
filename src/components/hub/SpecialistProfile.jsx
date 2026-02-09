import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Star, ExternalLink, Award,
  Users, BookOpen, CheckCircle, AlertCircle
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { SkeletonCard } from '../LoadingComponents';
import { CourseCard } from './CourseCard';

/**
 * SpecialistProfile - Perfil publico do especialista
 *
 * US-148: Pagina de perfil com bio, credenciais, cursos
 */
export function SpecialistProfile() {
  const navigate = useNavigate();
  const { specialistId } = useParams();
  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [courses, setCourses] = useState([]);

  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const specialistData = await apiService.getSpecialist(specialistId);
      if (!specialistData) {
        setError('Especialista nao encontrado');
        return;
      }
      setSpecialist(specialistData);

      const coursesData = await apiService.getHubCoursesBySpecialist(specialistId);
      setCourses((coursesData || []).filter(c => c.status === 'published'));
    } catch (err) {
      console.error('[SpecialistProfile] Erro:', err);
      setError('Erro ao carregar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (specialistId) loadProfile();
  }, [specialistId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !specialist) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-medium">{error || 'Especialista nao encontrado'}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const credentials = (() => {
    try {
      return typeof specialist.credentials === 'string'
        ? JSON.parse(specialist.credentials)
        : specialist.credentials || [];
    } catch {
      return [];
    }
  })();

  const specialties = (() => {
    if (Array.isArray(specialist.specialties)) return specialist.specialties;
    if (typeof specialist.specialties === 'string') {
      try { return JSON.parse(specialist.specialties); } catch { return []; }
    }
    return [];
  })();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </button>

          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold">
                {specialist.specialist_name?.charAt(0) || '?'}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold truncate">
                  {specialist.specialist_name}
                </h1>
                {specialist.verified_at && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    {t('hub.specialists.verified')}
                  </span>
                )}
              </div>

              <p className="text-white/80 mb-3 line-clamp-3">{specialist.bio}</p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {specialist.total_courses || 0} {t('hub.specialists.course', { count: specialist.total_courses || 0 })}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {specialist.total_students || 0} {t('hub.specialists.students')}
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(specialist.rating_avg || 0)}
                  <span className="ml-1">{Number(specialist.rating_avg || 0).toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Especialidades */}
        {specialties.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {t('hub.specialists.specialties')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Credenciais */}
        {credentials.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {t('hub.specialists.credentials')}
            </h2>
            <div className="space-y-3">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{cred.name}</p>
                    <p className="text-xs text-gray-500">
                      {cred.issuer} {cred.year ? `(${cred.year})` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LinkedIn */}
        {specialist.linkedin_url && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <a
              href={specialist.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        )}

        {/* Cursos do Especialista */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Cursos
          </h2>
          {courses.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum curso publicado</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={{
                    ...course,
                    course_name: course.course_id,
                    course_icon: '📚',
                    specialist_name: specialist.specialist_name,
                  }}
                  onClick={() => navigate(`/hub/course/${course.id}/reviews`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecialistProfile;
