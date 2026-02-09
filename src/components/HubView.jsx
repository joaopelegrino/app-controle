import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Target, BookOpen, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { caminhosPropostos } from '../data/caminhoExemploData';
import UserHeader from './UserHeader';

/**
 * HubView - Página inicial do Hub de Aprendizado (MVP Simplificado)
 *
 * US-044: Mostra apenas conteúdo padronizado:
 * - 1 Área de Estudo: Bash (padrão de referência)
 * - 1 Caminho Proposto: Exemplo com novo modelo de cursos
 *
 * @param {Object} studyAreas - Áreas de estudo (filtrado para MVP)
 * @param {Function} calculateStats - Função para calcular estatísticas
 * @param {Function} openArea - Função para abrir área de estudo
 * @param {Function} openLearningPath - Função para abrir caminho proposto
 */
export const HubView = ({ studyAreas, calculateStats, openArea, openLearningPath }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  // Filtrar apenas áreas ativas (não learning paths)
  const regularAreas = Object.entries(studyAreas).filter(
    ([key, area]) => !area.isLearningPath && area.status === 'active'
  );

  // Usar novo modelo de caminhos propostos
  const learningPaths = Object.entries(caminhosPropostos);

  // Calcular estatísticas do MVP
  const stats = {
    totalAreas: regularAreas.length,
    totalPaths: learningPaths.length,
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
   * Card de Caminho Proposto (novo modelo)
   * Mostra lista de cursos na ordem recomendada
   */
  const LearningPathCard = ({ pathKey, path }) => {
    return (
      <div
        onClick={() => openLearningPath && openLearningPath(pathKey)}
        className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 text-white relative overflow-hidden"
      >
        <div className="absolute top-2 right-2">
          <Target className="w-6 h-6 text-purple-200" />
        </div>

        {/* Header */}
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{path.icon}</span>
          <div>
            <h3 className="text-2xl font-bold">{path.name}</h3>
            <p className="text-purple-100 text-sm">{t('hub.learningPaths.cardLabel')}</p>
          </div>
        </div>

        <p className="text-purple-100 mb-4">{path.description}</p>

        {/* Lista de cursos do caminho */}
        <div className="space-y-2 mb-4">
          {path.cursos.slice(0, 4).map((curso) => (
            <div
              key={curso.areaId}
              className={`flex items-center rounded px-3 py-2 text-sm ${
                curso.disponivel
                  ? 'bg-white bg-opacity-20'
                  : 'bg-white bg-opacity-10 opacity-60'
              }`}
            >
              <span className="mr-2">{curso.icone}</span>
              <span className="flex-1">{curso.ordem}. {curso.nome}</span>
              {curso.disponivel ? (
                <CheckCircle className="w-4 h-4 text-green-300" />
              ) : (
                <span className="text-xs text-purple-200">{t('hub.learningPaths.comingSoon')}</span>
              )}
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="flex justify-between items-center text-sm border-t border-purple-400 pt-3">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{path.cursosDisponiveis}/{path.totalCursos} {t('hub.stats.courses')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{path.hoursDisponiveis}{t('hub.stats.hours')} {t('hub.stats.hoursAvailable')}</span>
          </div>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    );
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
            area.badge === 'integrated' ? 'bg-blue-500' : 'bg-green-500'
          }`}>
            {area.badge === 'integrated' ? t('hub.studyAreas.badges.integrated') : t('hub.studyAreas.badges.new')}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.totalAreas}</div>
            <div className="text-gray-500">{stats.totalAreas === 1 ? t('hub.stats.studyAreas') : t('hub.stats.studyAreasPlural')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-500">{stats.totalPaths}</div>
            <div className="text-gray-500">{stats.totalPaths === 1 ? t('hub.stats.learningPaths') : t('hub.stats.learningPathsPlural')}</div>
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

        {/* Seção Caminhos Propostos */}
        {learningPaths.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 {t('hub.learningPaths.sectionTitle')}</h2>
              <p className="text-gray-600">{t('hub.learningPaths.sectionDescription')}</p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-2xl mx-auto">
              {learningPaths.map(([key, path]) => (
                <LearningPathCard key={key} pathKey={key} path={path} />
              ))}
            </div>
          </div>
        )}

        {/* Seção Hub de Especialistas (US-153) */}
        <div className="mb-12">
          <div
            onClick={() => navigate('/hub/catalog')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 text-white relative overflow-hidden max-w-2xl mx-auto"
          >
            <div className="absolute top-4 right-4 opacity-20">
              <Sparkles className="w-16 h-16" />
            </div>
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">🎓</span>
              <div>
                <h2 className="text-2xl font-bold">{t('hub.specialists.sectionTitle', 'Hub de Especialistas')}</h2>
                <p className="text-indigo-200 text-sm">{t('hub.specialists.sectionDescription', 'Cursos de especialistas externos para sua equipe')}</p>
              </div>
            </div>
            <p className="text-indigo-100 mb-4">
              {t('hub.specialists.catalogCTA', 'Explore cursos criados por profissionais certificados do mercado. Capacite sua equipe com conteudo especializado.')}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-indigo-200">
                <span>1 {t('hub.specialists.specialist', 'especialista')}</span>
                <span>1 {t('hub.specialists.course', 'curso')}</span>
                <span>⭐ 4.8</span>
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                {t('hub.specialists.viewCatalog', 'Explorar Catalogo')}
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
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
