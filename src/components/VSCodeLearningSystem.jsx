import React from 'react';
import { CheckCircle, Circle, BookOpen, Home } from 'lucide-react';
import { VSCodeNotesView } from './VSCodeNotesView';
import { Breadcrumb } from './Breadcrumb';

export const VSCodeLearningSystem = ({ 
  currentSubView, 
  setCurrentSubView, 
  setCurrentView, 
  completedVSCodeModules, 
  setCompletedVSCodeModules, 
  selectedSection, 
  setSelectedSection, 
  topicosVSCode, 
  modulosVSCode, 
  startDateVSCode, 
  getWeekDate, 
  formatDate, 
  openFlashcardsFromNotes, 
  CodeBlock, 
  showCode, 
  toggleCodeVisibility, 
  copyToClipboard, 
  copiedCode 
}) => {
  const progressPercentage = Math.round((completedVSCodeModules.size / modulosVSCode.length) * 100);
  
  if (currentSubView === 'notes') {
    return (
      <VSCodeNotesView 
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
        <Breadcrumb
          items={[
            { label: 'Hub', icon: '🏠', onClick: () => setCurrentView('hub') },
            { label: 'Curso de VSCode WSL', icon: '💻', current: true }
          ]}
        />
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
              <h1 className="text-3xl font-bold text-gray-900">Curso de VSCode WSL</h1>
              <p className="text-gray-600 mt-1">Tasks → JSON → Shell Scripting → Workspace Management</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
              <div className="text-sm text-gray-500">{completedVSCodeModules.size}/{modulosVSCode.length} módulos</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {topicosVSCode.map(topico => {
            const topicoModulos = modulosVSCode.filter(m => m.topico === topico.id);
            const IconeComponent = topico.icone;
            
            return (
              <div key={topico.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className={`${topico.cor} text-white p-4`}>
                  <div className="flex items-center gap-3">
                    <IconeComponent className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold text-lg">{topico.nome}</h3>
                      <p className="text-white/90 text-sm">{topico.descricao}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid gap-3">
                    {topicoModulos.map(modulo => {
                      const isCompleted = completedVSCodeModules.has(modulo.id);
                      const weekDate = getWeekDate(modulo.semana, startDateVSCode);
                      
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
                              setSelectedSection('tasks-automacao');
                            } else if (!isCompleted) {
                              setCompletedVSCodeModules(prev => new Set([...prev, modulo.id]));
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
                                      Ver Sessão
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