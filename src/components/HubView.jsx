import React from 'react';
import { useTranslation } from 'react-i18next';
import UserHeader from './UserHeader';

/**
 * HubView - Página inicial do Hub de Aprendizado FluSisTip
 *
 * Mostra 5 áreas de estudo FluSisTip (onboarding forense).
 *
 * @param {Object} studyAreas - Áreas de estudo FluSisTip
 * @param {Function} openArea - Função para abrir área de estudo
 */
export const HubView = ({ studyAreas, openArea }) => {
  const { t } = useTranslation('common');

  // Filtrar apenas áreas ativas (não learning paths)
  const regularAreas = Object.entries(studyAreas).filter(
    ([key, area]) => !area.isLearningPath && area.status === 'active'
  );

  // Calcular estatísticas do MVP
  const stats = {
    totalAreas: regularAreas.length,
    totalModules: regularAreas.reduce((sum, [, area]) => sum + area.modules, 0),
    totalHours: regularAreas.reduce((sum, [, area]) => sum + area.hours, 0),
    totalCards: regularAreas.reduce((sum, [, area]) => {
      if (!area.flashcards) return sum;
      return sum + Object.values(area.flashcards).reduce(
        (catSum, cat) => catSum + cat.cards.length, 0
      );
    }, 0)
  };

  /**
   * Card de Área de Estudo
   */
  const AreaCard = ({ areaKey, area }) => {
    const cardCount = area.flashcards
      ? Object.values(area.flashcards).reduce((sum, cat) => sum + cat.cards.length, 0)
      : 0;

    return (
      <div
        onClick={() => openArea(areaKey)}
        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden"
      >
        {area.badge && (
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
            area.badge === 'integrated' ? 'bg-blue-500' : area.badge === 'onboarding' ? 'bg-orange-500' : 'bg-green-500'
          }`}>
            {area.badge === 'integrated' ? t('hub.studyAreas.badges.integrated') : area.badge === 'onboarding' ? t('hub.studyAreas.badges.onboarding', 'Onboarding') : t('hub.studyAreas.badges.new')}
          </div>
        )}

        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{area.icon}</span>
          <h3 className="text-xl font-bold text-gray-800">{area.name}</h3>
        </div>

        <p className="text-gray-600 mb-4">{area.description}</p>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{area.modules} {t('hub.stats.modules').toLowerCase()}</span>
          <span>{cardCount} {t('hub.stats.cards')}</span>
          <span>{area.hours}{t('hub.stats.hours')}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Header */}
      <UserHeader />

      <div className="max-w-6xl mx-auto p-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 {t('hub.title')}</h1>
          <p className="text-xl text-gray-600">{t('hub.tagline')}</p>
          <p className="text-sm text-gray-400 mt-2">{t('hub.mvpLabel')}</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.totalAreas}</div>
            <div className="text-gray-500">{stats.totalAreas === 1 ? t('hub.stats.studyAreas') : t('hub.stats.studyAreasPlural')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.totalModules}</div>
            <div className="text-gray-500">{t('hub.stats.modules')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-500">{stats.totalHours}{t('hub.stats.hours')}</div>
            <div className="text-gray-500">{t('hub.stats.content')}</div>
          </div>
        </div>

        {/* Seção Áreas de Estudo */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 {t('hub.studyAreas.sectionTitle')}</h2>
            <p className="text-gray-600">{t('hub.studyAreas.sectionDescription')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularAreas.map(([key, area]) => (
              <AreaCard key={key} areaKey={key} area={area} />
            ))}
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>{t('hub.footer.description')}</p>
          <p className="mt-1">{t('hub.footer.tip')}</p>
        </div>
      </div>
    </div>
  );
};
