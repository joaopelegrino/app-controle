import React from 'react';
import { ArrowLeft, Target, BookOpen, Clock, CheckCircle, Lock, ArrowRight } from 'lucide-react';

/**
 * LearningPathView - Visualização de Caminho Proposto (Novo Modelo)
 *
 * US-044: Caminho = sequência ordenada de CURSOS (não flashcards)
 *
 * CONCEITO:
 * - Mostra lista de cursos na ordem recomendada
 * - Cursos disponíveis são clicáveis (navegam para /curso/:id)
 * - Cursos indisponíveis mostram "Em breve"
 *
 * @param {Object} pathData - Dados do caminho (de caminhoExemploData.js)
 * @param {string} pathKey - Chave do caminho
 * @param {Function} onBack - Voltar ao Hub
 * @param {Function} onNavigateToCourse - Navegar para curso específico
 */
export const LearningPathView = ({ pathData, pathKey, onBack, onNavigateToCourse }) => {
  if (!pathData) return null;

  const { cursos } = pathData;
  const cursosDisponiveis = cursos.filter(c => c.disponivel);
  const cursosEmBreve = cursos.filter(c => !c.disponivel);

  /**
   * Card de Curso dentro do Caminho
   */
  const CursoCard = ({ curso, isFirst }) => {
    const isDisponivel = curso.disponivel;

    return (
      <div
        onClick={() => isDisponivel && onNavigateToCourse && onNavigateToCourse(curso.areaId)}
        className={`
          relative rounded-lg shadow-lg p-6 transition-all
          ${isDisponivel
            ? 'bg-white cursor-pointer hover:shadow-xl hover:-translate-y-1'
            : 'bg-gray-100 cursor-not-allowed opacity-60'
          }
          ${isFirst && isDisponivel ? 'ring-2 ring-green-500 ring-offset-2' : ''}
        `}
      >
        {/* Badge de status */}
        <div className="absolute top-4 right-4">
          {isDisponivel ? (
            <div className="flex items-center text-green-600 text-xs font-bold">
              <CheckCircle className="w-4 h-4 mr-1" />
              Disponível
            </div>
          ) : (
            <div className="flex items-center text-gray-400 text-xs">
              <Lock className="w-4 h-4 mr-1" />
              Em breve
            </div>
          )}
        </div>

        {/* Número da ordem */}
        <div className={`
          absolute -left-3 top-1/2 -translate-y-1/2
          w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
          ${isDisponivel ? 'bg-purple-600' : 'bg-gray-400'}
        `}>
          {curso.ordem}
        </div>

        {/* Conteúdo */}
        <div className="ml-4">
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-3">{curso.icone}</span>
            <div>
              <h3 className={`text-xl font-bold ${isDisponivel ? 'text-gray-800' : 'text-gray-500'}`}>
                {curso.nome}
              </h3>
              {curso.destaque && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {curso.destaque}
                </span>
              )}
            </div>
          </div>

          <p className={`mb-4 ${isDisponivel ? 'text-gray-600' : 'text-gray-400'}`}>
            {curso.descricao}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className={isDisponivel ? 'text-gray-500' : 'text-gray-400'}>
                <BookOpen className="w-4 h-4 inline mr-1" />
                {curso.modules} módulos
              </span>
              <span className={isDisponivel ? 'text-gray-500' : 'text-gray-400'}>
                <Clock className="w-4 h-4 inline mr-1" />
                {curso.hours}h
              </span>
            </div>

            {isDisponivel && (
              <div className="flex items-center text-purple-600 font-medium">
                Começar <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com botão voltar */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Hub
          </button>

          <div className="flex items-center">
            <Target className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Caminho de Aprendizado</h1>
              <p className="text-purple-600">Trilha estruturada e progressiva</p>
            </div>
          </div>
        </div>

        {/* Card principal do caminho */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-xl p-8 mb-12 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center mb-6">
              <span className="text-6xl mr-6">{pathData.icon}</span>
              <div>
                <h2 className="text-4xl font-bold mb-2">{pathData.name}</h2>
                <p className="text-xl text-purple-100 mb-4">{pathData.description}</p>

                <div className="flex items-center space-x-6 text-purple-100">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span>{pathData.totalCursos} cursos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>{pathData.cursosDisponiveis} disponíveis</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{pathData.totalHours}h totais</span>
                  </div>
                </div>
              </div>
            </div>

            {pathData.badge && (
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-bold">
                {pathData.badge === 'exemplo' ? 'Exemplo' : pathData.badge}
              </div>
            )}
          </div>
        </div>

        {/* Seção de cursos */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            🗺️ Sequência de Cursos
          </h3>
          <p className="text-gray-600 text-center mb-8">
            Siga a ordem recomendada para melhor aproveitamento
          </p>
        </div>

        {/* Lista de cursos */}
        <div className="space-y-6 relative">
          {/* Linha conectora */}
          <div className="absolute left-1 top-8 bottom-8 w-0.5 bg-purple-200" />

          {cursos.map((curso, index) => (
            <CursoCard
              key={curso.areaId}
              curso={curso}
              isFirst={index === 0}
            />
          ))}
        </div>

        {/* Resumo */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Sobre este Caminho
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Este caminho foi estruturado para te guiar do básico ao avançado em desenvolvimento backend.
            Comece pelo primeiro curso disponível e avance na ordem recomendada.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{pathData.totalCursos}</div>
              <div className="text-sm text-gray-600">Cursos</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{pathData.cursosDisponiveis}</div>
              <div className="text-sm text-gray-600">Disponíveis</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{pathData.totalModules}</div>
              <div className="text-sm text-gray-600">Módulos</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">{pathData.totalHours}h</div>
              <div className="text-sm text-gray-600">Duração</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathView;
