import React from 'react';
import { ArrowRight, Target } from 'lucide-react';

export const HubView = ({ studyAreas, calculateStats, openArea }) => {
  const stats = calculateStats(studyAreas);
  
  // Separar caminhos de aprendizado das áreas normais
  const learningPaths = Object.entries(studyAreas).filter(([key, area]) => area.isLearningPath);
  const regularAreas = Object.entries(studyAreas).filter(([key, area]) => !area.isLearningPath && area.status !== 'in-development');
  const inDevelopmentAreas = Object.entries(studyAreas).filter(([key, area]) => area.status === 'in-development');
  
  const LearningPathCard = ({ pathKey, path }) => {
    const pathAreas = Object.entries(path.flashcards);
    
    return (
      <div 
        onClick={() => openArea(pathKey)}
        className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 text-white relative overflow-hidden"
      >
        <div className="absolute top-2 right-2">
          <Target className="w-6 h-6 text-purple-200" />
        </div>
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{path.icon}</span>
          <div>
            <h3 className="text-2xl font-bold">{path.name}</h3>
            <p className="text-purple-100 text-sm">Caminho de Aprendizado</p>
          </div>
        </div>
        <p className="text-purple-100 mb-4">{path.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {pathAreas.slice(0, 4).map(([areaKey, area], index) => (
            <div key={areaKey} className="bg-white bg-opacity-20 rounded px-2 py-1 text-xs">
              {index + 1}. {area.name}
            </div>
          ))}
        </div>
        
        {pathAreas.length > 4 && (
          <div className="text-center text-purple-200 text-xs mb-2">
            +{pathAreas.length - 4} áreas adicionais
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm">
          <span>{path.modules} módulos</span>
          <span>{path.hours}h total</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 Hub de Aprendizado</h1>
          <p className="text-xl text-gray-600">Sistema Integrado de Educação em Tecnologia</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.totalAreas}</div>
            <div className="text-gray-500">Áreas</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.totalCards}</div>
            <div className="text-gray-500">Flash Cards</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.totalModules}</div>
            <div className="text-gray-500">Módulos</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.totalHours}+</div>
            <div className="text-gray-500">Horas</div>
          </div>
        </div>
        
        {/* Seção Caminhos Propostos */}
        {learningPaths.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Caminhos Propostos</h2>
              <p className="text-gray-600">Trilhas estruturadas de aprendizado para desenvolvimento completo</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
              {learningPaths.map(([key, path]) => (
                <LearningPathCard key={key} pathKey={key} path={path} />
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📚 Áreas de Estudo</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularAreas.map(([key, area]) => {
            const cardCount = area.flashcards ? 
              Object.values(area.flashcards).reduce((sum, cat) => sum + cat.cards.length, 0) : 0;
            
            return (
              <div 
                key={key}
                onClick={() => openArea(key)}
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
          })}
        </div>

        {/* Seção Em Desenvolvimento */}
        {inDevelopmentAreas.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">🚧 Em Desenvolvimento</h2>
            <p className="text-gray-600 text-center mb-6">Novos cursos completos em breve</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inDevelopmentAreas.map(([key, area]) => {
                const cardCount = area.flashcards ?
                  Object.values(area.flashcards).reduce((sum, cat) => sum + cat.cards.length, 0) : 0;

                return (
                  <div
                    key={key}
                    className="bg-gray-100 rounded-lg shadow-lg p-6 cursor-not-allowed opacity-50 relative overflow-hidden"
                    title={`Em desenvolvimento - Disponível na Release 3.0`}
                  >
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-orange-500">
                      Em Breve
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4 grayscale">{area.icon}</span>
                      <h3 className="text-xl font-bold text-gray-600">{area.name}</h3>
                    </div>
                    <p className="text-gray-500 mb-4">{area.description}</p>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{area.modules} módulos</span>
                      <span>{cardCount} cards</span>
                      <span>{area.hours}h</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};