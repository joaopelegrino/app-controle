import React from 'react';

export const HubView = ({ studyAreas, calculateStats, openArea }) => {
  const stats = calculateStats(studyAreas);
  
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(studyAreas).map(([key, area]) => {
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
      </div>
    </div>
  );
};