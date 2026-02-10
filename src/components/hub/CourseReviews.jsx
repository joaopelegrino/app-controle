import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Star, MessageSquare, AlertCircle, User
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { SkeletonCard } from '../LoadingComponents';
import UserHeader from '../UserHeader';

/**
 * CourseReviews - Avaliacoes de um curso do Hub
 *
 * US-150: Reviews com resumo, lista e resposta do especialista
 */
export function CourseReviews() {
  const navigate = useNavigate();
  const { hubCourseId } = useParams();
  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Buscar dados do curso
      const courseData = await apiService.getHubCourse(hubCourseId);
      setCourse(courseData);

      // Buscar reviews
      const reviewsData = await apiService.getCourseReviews(hubCourseId);
      setReviews(reviewsData || []);
    } catch (err) {
      console.error('[CourseReviews] Erro:', err);
      setError(t('hub.specialists.errors.loadReviews', 'Erro ao carregar avaliações'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hubCourseId) loadReviews();
  }, [hubCourseId]);

  const renderStars = (rating, size = 'w-5 h-5') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`${size} ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  // Calcular distribuicao de ratings
  const ratingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rounded = Math.round(r.rating);
      if (dist[rounded] !== undefined) dist[rounded]++;
    });
    return dist;
  };

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserHeader />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-800 font-medium">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              {t('hub.specialists.actions.back', 'Voltar')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dist = ratingDistribution();

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('hub.specialists.reviewsLabel')}
            </h1>
            {course && (
              <p className="text-sm text-gray-500">
                {course.course_id}
              </p>
            )}
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Nota media */}
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-800">
                {avgRating.toFixed(1)}
              </p>
              <div className="flex justify-center mt-2">
                {renderStars(avgRating, 'w-6 h-6')}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {reviews.length} {t('hub.specialists.reviewsLabel')}
              </p>
            </div>

            {/* Distribuicao */}
            <div className="flex-1 w-full">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = dist[stars];
                const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-600 w-6 text-right">{stars}</span>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lista de Reviews */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">{t('hub.specialists.reviews.noReviews', 'Nenhuma avaliação ainda')}</p>
            <p className="text-sm mt-1">{t('hub.specialists.reviews.firstReview', 'Seja o primeiro a avaliar este curso!')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {t('hub.specialists.reviews.companyLabel', 'Empresa')}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {renderStars(review.rating, 'w-4 h-4')}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                {/* Resposta do especialista */}
                {review.specialist_reply && (
                  <div className="mt-3 pl-4 border-l-2 border-indigo-200 bg-indigo-50 rounded-r-lg p-3">
                    <p className="text-xs text-indigo-600 font-medium mb-1">
                      {t('hub.specialists.reviews.specialistReply', 'Resposta do especialista')}
                    </p>
                    <p className="text-sm text-gray-700">{review.specialist_reply}</p>
                    {review.replied_at && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.replied_at).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseReviews;
