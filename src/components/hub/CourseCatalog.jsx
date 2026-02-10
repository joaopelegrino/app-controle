import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Search, Star, SlidersHorizontal,
  AlertCircle, RefreshCw
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { SkeletonCard } from '../LoadingComponents';
import { EmptyState } from '../EmptyState';
import { CourseCard } from './CourseCard';
import UserHeader from '../UserHeader';

/**
 * CourseCatalog - Marketplace/Catalogo do Hub de Especialistas
 *
 * US-149: Catalogo publico com busca e filtros
 */
export function CourseCatalog() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const loadCatalog = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const catalogData = await apiService.getHubCatalog();
      setCourses(catalogData || []);
      setFilteredCourses(catalogData || []);
    } catch (err) {
      console.error('[CourseCatalog] Erro:', err);
      setError(t('hub.specialists.errors.loadCatalog', 'Erro ao carregar catálogo'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let result = [...courses];

    // Busca por texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          (c.course_name || '').toLowerCase().includes(query) ||
          (c.course_description || '').toLowerCase().includes(query) ||
          (c.specialist_name || '').toLowerCase().includes(query)
      );
    }

    // Filtro por rating
    if (minRating > 0) {
      result = result.filter((c) => (c.course_rating || 0) >= minRating);
    }

    // Filtro por preco
    if (maxPrice > 0) {
      result = result.filter((c) => (c.price_monthly || 0) <= maxPrice);
    }

    setFilteredCourses(result);
  }, [searchQuery, minRating, maxPrice, courses]);

  const clearFilters = () => {
    setSearchQuery('');
    setMinRating(0);
    setMaxPrice(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserHeader />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-full mb-8 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
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
              onClick={loadCatalog}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              {t('hub.specialists.actions.tryAgain', 'Tentar novamente')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('hub.specialists.sectionTitle')}
              </h1>
              <p className="text-sm text-gray-500">
                {t('hub.specialists.sectionDescription')}
              </p>
            </div>
          </div>
          <button
            onClick={loadCatalog}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            title="Atualizar"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Busca e Filtros */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('hub.specialists.catalog.searchPlaceholder', 'Buscar por curso, especialista...')}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
                showFilters ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('hub.specialists.catalog.filters', 'Filtros')}
            </button>
          </div>

          {/* Painel de filtros */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Rating minimo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('hub.specialists.rating')} {t('hub.specialists.catalog.minRating', 'mínimo')}
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value={0}>{t('hub.specialists.catalog.allRatings', 'Todos')}</option>
                    <option value={3}>{t('hub.specialists.catalog.stars3', '3+ estrelas')}</option>
                    <option value={4}>{t('hub.specialists.catalog.stars4', '4+ estrelas')}</option>
                    <option value={4.5}>{t('hub.specialists.catalog.stars45', '4.5+ estrelas')}</option>
                  </select>
                </div>

                {/* Preco maximo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('hub.specialists.catalog.maxPrice', 'Preço máximo')}
                  </label>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value={0}>{t('hub.specialists.catalog.noLimit', 'Sem limite')}</option>
                    <option value={50}>{t('hub.specialists.catalog.upTo50', 'Até R$ 50')}</option>
                    <option value={100}>{t('hub.specialists.catalog.upTo100', 'Até R$ 100')}</option>
                    <option value={150}>{t('hub.specialists.catalog.upTo150', 'Até R$ 150')}</option>
                    <option value={200}>{t('hub.specialists.catalog.upTo200', 'Até R$ 200')}</option>
                  </select>
                </div>

                {/* Limpar */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    {t('hub.specialists.actions.clearFilters', 'Limpar filtros')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resultados */}
        {filteredCourses.length === 0 ? (
          <EmptyState
            type="search"
            title={t('hub.specialists.catalog.noCoursesFound', 'Nenhum curso encontrado')}
            description={t('hub.specialists.catalog.adjustFilters', 'Tente ajustar os filtros ou termos de busca.')}
            actionLabel={t('hub.specialists.actions.clearFilters', 'Limpar filtros')}
            onAction={clearFilters}
          />
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.hub_course_id}
                  course={course}
                  onClick={() => navigate(`/hub/course/${course.hub_course_id}/reviews`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CourseCatalog;
