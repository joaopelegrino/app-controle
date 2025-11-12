import React from 'react';
import { ArrowLeft, Target, Play, BookOpen, Award, Clock } from 'lucide-react';

export const LearningPathView = ({ pathData, pathKey, onBack, onAreaClick, onNavigateToIntegrated }) => {
  if (!pathData) return null;

  const pathAreas = Object.entries(pathData.flashcards);
  const totalCards = pathAreas.reduce((sum, [key, area]) => sum + area.cards.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
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
                    <span>{pathAreas.length} áreas</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    <span>{totalCards} flashcards</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{pathData.hours}h totais</span>
                  </div>
                </div>
              </div>
            </div>
            
            {pathData.badge && (
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-bold">
                {pathData.badge === 'new' ? 'Novo' : pathData.badge}
              </div>
            )}
          </div>
        </div>

        {/* Seção de áreas de estudo */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🗺️ Áreas de Estudo do Caminho
          </h3>
          <p className="text-gray-600 text-center mb-8">
            Clique em cada área para estudar com flashcards interativos
          </p>
        </div>

        {/* Grid de áreas - Padrão consistente com página inicial */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathAreas.map(([areaKey, area], index) => (
            <div
              key={areaKey}
              onClick={() => {
                // Se for o card "Linguagem Rust", navega para o sistema integrado
                if (areaKey === 'rustLang' && onNavigateToIntegrated) {
                  onNavigateToIntegrated('rustprogramming');
                } else {
                  // Caso contrário, abre flashcards normalmente
                  onAreaClick(areaKey, area);
                }
              }}
              className={`${
                areaKey === 'rustLang' 
                  ? 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200' 
                  : 'bg-white'
              } rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden`}
            >
              {/* Número da sequência - único diferencial */}
              <div className="absolute top-4 right-4">
                {areaKey === 'rustLang' ? (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                    🚀 Sistema
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {index + 1}
                  </div>
                )}
              </div>
              
              {/* Header padrão - ícone + título */}
              <div className="flex items-center mb-4 pr-10">
                <span className="text-4xl mr-4">📚</span>
                <h3 className="text-xl font-bold text-gray-800">{area.name}</h3>
              </div>
              
              {/* Descrição - preview dos flashcards */}
              <div className="text-gray-600 mb-4">
                <div className="text-sm mb-2">Preview dos flashcards:</div>
                <div className="space-y-1">
                  {area.cards.slice(0, 2).map((card, cardIndex) => (
                    <div key={cardIndex} className="text-xs text-gray-500">
                      • {card.question.length > 45 
                        ? `${card.question.substring(0, 45)}...` 
                        : card.question
                      }
                    </div>
                  ))}
                  {area.cards.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{area.cards.length - 2} flashcards adicionais
                    </div>
                  )}
                </div>
              </div>
              
              {/* Footer padrão - estatísticas */}
              <div className="flex justify-between text-sm text-gray-500">
                <span>{area.cards.length} cards</span>
                <span>
                  {areaKey === 'rustLang' ? '🚀 Sistema Integrado' : '⏱️ Estudar'}
                </span>
                <span>Área {index + 1}</span>
              </div>
            </div>
          ))}
        </div>


        {/* Resumo final */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Sobre este Caminho de Aprendizado
          </h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Este caminho foi estruturado para te guiar através de {pathAreas.length} áreas essenciais 
            de desenvolvimento. Cada área contém flashcards cuidadosamente elaborados para 
            maximizar seu aprendizado de forma progressiva e interativa.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{pathAreas.length}</div>
              <div className="text-sm text-gray-600">Áreas</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{totalCards}</div>
              <div className="text-sm text-gray-600">Flashcards</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{pathData.modules}</div>
              <div className="text-sm text-gray-600">Módulos</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">{pathData.hours}h</div>
              <div className="text-sm text-gray-600">Duração</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathView;