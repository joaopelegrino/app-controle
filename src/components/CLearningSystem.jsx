import React, { useState } from 'react';
import { CheckCircle, Circle, BookOpen, Home, Play, StickyNote, Save } from 'lucide-react';
import { CNotesView } from './CNotesView';

export const CLearningSystem = ({ 
  currentSubView, 
  setCurrentSubView, 
  setCurrentView, 
  completedModules, 
  setCompletedModules, 
  selectedSection, 
  setSelectedSection, 
  fasesC, 
  modulosC, 
  startDateC, 
  getWeekDate, 
  formatDate, 
  openFlashcardsFromNotes, 
  CodeBlock, 
  showCode, 
  toggleCodeVisibility, 
  copyToClipboard, 
  copiedCode 
}) => {
  const progressPercentage = Math.round((completedModules.size / modulosC.length) * 100);
  
  // Estados para notas rápidas
  const [quickNotes, setQuickNotes] = useState(localStorage.getItem('c-learning-notes') || '');
  const [notesSaved, setNotesSaved] = useState(false);
  
  // Função para salvar notas
  const saveNotes = () => {
    localStorage.setItem('c-learning-notes', quickNotes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };
  
  if (currentSubView === 'notes') {
    return (
      <CNotesView 
        setCurrentSubView={setCurrentSubView}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        openFlashcardsFromNotes={openFlashcardsFromNotes}
        CodeBlock={CodeBlock}
        showCode={showCode}
        toggleCodeVisibility={toggleCodeVisibility}
        copyToClipboard={copyToClipboard}
        copiedCode={copiedCode}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={() => setCurrentView('hub')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
              >
                <Home className="w-4 h-4" />
                Voltar ao Hub
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Aprendizado C</h1>
              <p className="text-gray-600 mt-1">C99 Programming → Clay UI → Agência Marketing → SaaS Healthcare</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
              <div className="text-sm text-gray-500">{completedModules.size}/{modulosC.length} módulos</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Vídeo do YouTube e Notas Rápidas */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Vídeo YouTube */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Vídeo de Apoio - C Programming</h3>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/xND0t1pr3KY"
                title="C Programming Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          
          {/* Notas Rápidas */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Notas Rápidas</h3>
              </div>
              <button
                onClick={saveNotes}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                  notesSaved 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <Save className="w-4 h-4" />
                {notesSaved ? 'Salvo!' : 'Salvar'}
              </button>
            </div>
            <textarea
              value={quickNotes}
              onChange={(e) => setQuickNotes(e.target.value)}
              placeholder="Digite suas anotações rápidas aqui...

• Conceitos importantes
• Dúvidas para revisar
• Ideias de projetos
• Links úteis"
              className="w-full h-80 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="mt-3 text-xs text-gray-500">
              💡 Suas notas são salvas automaticamente no navegador
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {fasesC.map(fase => {
            const faseModulos = modulosC.filter(m => m.fase === fase.id);
            const IconeComponent = fase.icone;
            
            return (
              <div key={fase.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className={`${fase.cor} text-white p-4`}>
                  <div className="flex items-center gap-3">
                    <IconeComponent className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold text-lg">{fase.nome}</h3>
                      <p className="text-white/90 text-sm">{fase.descricao}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid gap-3">
                    {faseModulos.map(modulo => {
                      const isCompleted = completedModules.has(modulo.id);
                      const weekDate = getWeekDate(modulo.semana, startDateC);
                      
                      return (
                        <div 
                          key={modulo.id}
                          className={`border rounded-lg p-4 transition-all ${
                            modulo.temNotas ? 'cursor-pointer hover:shadow-md' : ''
                          } ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                          onClick={() => {
                            if (modulo.temNotas) {
                              setCurrentSubView('notes');
                              setSelectedSection('hello-world');
                            } else if (!isCompleted) {
                              setCompletedModules(prev => new Set([...prev, modulo.id]));
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {isCompleted ? 
                                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                                <Circle className="w-5 h-5 text-gray-400" />
                              }
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">
                                  {modulo.nome}
                                  {modulo.temNotas && (
                                    <span className="ml-2 inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      <BookOpen className="w-3 h-3" />
                                      Ver Notas
                                    </span>
                                  )}
                                </h4>
                                <div className="text-right text-sm">
                                  <div className="text-gray-600">Semana {modulo.semana}</div>
                                  <div className="text-gray-500 text-xs">{formatDate(weekDate)}</div>
                                </div>
                              </div>
                              
                              <div className="text-sm text-gray-700">
                                <strong>Entregável:</strong> {modulo.entregavel}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};