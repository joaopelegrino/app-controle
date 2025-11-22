import React from 'react';
import { ArrowRight, Target, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { caminhosPropostos } from '../data/caminhoExemploData';

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
            <p className="text-purple-100 text-sm">Caminho de Aprendizado</p>
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
                <span className="text-xs text-purple-200">Em breve</span>
              )}
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="flex justify-between items-center text-sm border-t border-purple-400 pt-3">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{path.cursosDisponiveis}/{path.totalCursos} cursos</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{path.hoursDisponiveis}h disponíveis</span>
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
            {area.badge === 'integrated' ? 'Integrado' : 'Novo'}
          </div>
        )}

        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{area.icon}</span>
          <h3 className="text-xl font-bold text-gray-800">{area.name}</h3>
        </div>

        <p className="text-gray-600 mb-4">{area.description}</p>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{area.modules} módulos</span>
          <span>{cardCount} cards</span>
          <span>{area.hours}h</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 Hub de Aprendizado</h1>
          <p className="text-xl text-gray-600">Sistema Integrado de Educação em Tecnologia</p>
          <p className="text-sm text-gray-400 mt-2">MVP - Padrão de Referência</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.totalAreas}</div>
            <div className="text-gray-500">Área de Estudo</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-500">{stats.totalPaths}</div>
            <div className="text-gray-500">Caminho Proposto</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.totalModules}</div>
            <div className="text-gray-500">Módulos</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-500">{stats.totalHours}h</div>
            <div className="text-gray-500">Conteúdo</div>
          </div>
        </div>

        {/* Seção Caminhos Propostos */}
        {learningPaths.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Caminhos Propostos</h2>
              <p className="text-gray-600">Trilhas estruturadas com sequência de cursos recomendada</p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-2xl mx-auto">
              {learningPaths.map(([key, path]) => (
                <LearningPathCard key={key} pathKey={key} path={path} />
              ))}
            </div>
          </div>
        )}

        {/* Seção Áreas de Estudo */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Áreas de Estudo</h2>
            <p className="text-gray-600">Cursos completos com vídeo, módulos e caderno de notas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularAreas.map(([key, area]) => (
              <AreaCard key={key} areaKey={key} area={area} />
            ))}
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>
            Este é o MVP do Ultrathink. Novos cursos seguindo o padrão Bash serão adicionados em breve.
          </p>
          <p className="mt-1">
            Consulte o <strong>Caminho Proposto</strong> para ver a sequência recomendada de aprendizado.
          </p>
        </div>
      </div>
    </div>
  );
};
