import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Clock, BookOpen, Users } from 'lucide-react';

/**
 * CourseCard - Card reutilizavel para cursos do Hub de Especialistas
 *
 * US-151: Card de curso no marketplace
 *
 * @param {Object} props
 * @param {Object} props.course - Dados do curso do hub
 * @param {Function} props.onClick - Handler de click para navegacao
 */
export function CourseCard({ course, onClick }) {
  const { t } = useTranslation('common');

  const {
    course_name,
    course_icon,
    specialist_name,
    price_monthly,
    course_rating,
    total_reviews,
    duration_hours,
    total_modules,
    total_enrollments,
  } = course;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden border border-gray-100 hover:border-indigo-200"
    >
      {/* Header com icone e preco */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl">{course_icon || '📚'}</span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            R$ {Number(price_monthly).toFixed(2)}{t('hub.specialists.perMonth')}
          </span>
        </div>

        {/* Titulo e especialista */}
        <h3 className="text-lg font-bold text-gray-800 mb-1">{course_name}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {t('hub.specialists.specialist')}: {specialist_name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">{renderStars(course_rating || 0)}</div>
          <span className="text-sm font-medium text-gray-700 ml-1">
            {Number(course_rating || 0).toFixed(1)}
          </span>
          <span className="text-sm text-gray-400">
            ({total_reviews || 0} {t('hub.specialists.reviewsLabel')})
          </span>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {duration_hours && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration_hours}h
            </span>
          )}
          {total_modules && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {total_modules} {t('hub.stats.modules').toLowerCase()}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {total_enrollments || 0} {t('hub.specialists.students')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
