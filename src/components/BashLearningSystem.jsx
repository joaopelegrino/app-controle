import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, BookOpen, Home, Play, StickyNote, Save, AlertTriangle } from 'lucide-react';
import { BashNotesView } from './BashNotesView';
import { Breadcrumb } from './Breadcrumb';
import { useAutoSaveNotes } from '../hooks/useAutoSaveNotes';

export const BashLearningSystem = ({ 
  currentSubView, 
  setCurrentSubView, 
  setCurrentView, 
  completedBashModules, 
  setCompletedBashModules, 
  selectedSection, 
  setSelectedSection, 
  fasesBash, 
  modulosBash, 
  startDateBash, 
  getWeekDate, 
  formatDate, 
  openFlashcardsFromNotes, 
  CodeBlock, 
  showCode, 
  toggleCodeVisibility, 
  copyToClipboard, 
  copiedCode 
}) => {
  const navigate = useNavigate();
  const progressPercentage = Math.round((completedBashModules.size / modulosBash.length) * 100);

  // Auto-save de notas com error handling robusto (US-041)
  const [quickNotes, setQuickNotes, saveStatus, sizeInfo] = useAutoSaveNotes('bash');
  
  if (currentSubView === 'notes') {
    return (
      <BashNotesView
        setCurrentSubView={setCurrentSubView}
        setCurrentView={setCurrentView}
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
            { label: 'Curso de Bash', icon: '📖', current: true }
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
              <h1 className="text-3xl font-bold text-gray-900">Curso de Bash Shell Scripting</h1>
              <p className="text-gray-600 mt-1">Shell Scripting Robusto → Unix Tools → Pipelines Poderosos</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{progressPercentage}%</div>
              <div className="text-sm text-gray-500">{completedBashModules.size}/{modulosBash.length} módulos</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Vídeo do YouTube e Meu Caderno de Notas */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Vídeo YouTube */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Vídeo do Curso - Shell Scripting</h3>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/fAgz66M4aNc?start=415"
                title="Shell Scripting Course"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          
          {/* Meu Caderno de Notas (US-041: Auto-save com error handling) */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">📒 Meu Caderno de Notas</h3>
              </div>

              {/* Indicador de Status de Salvamento (Auto-save) */}
              <div className="flex items-center gap-3">
                {saveStatus === 'saving' && (
                  <span className="flex items-center gap-2 text-sm text-blue-600">
                    <Save className="w-4 h-4 animate-pulse" />
                    Salvando...
                  </span>
                )}
                {saveStatus === 'saved' && (
                  <span className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Salvo automaticamente
                  </span>
                )}
                {saveStatus === 'error' && (
                  <span className="flex items-center gap-2 text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    Erro ao salvar
                  </span>
                )}
                {saveStatus === 'quota_exceeded' && (
                  <span className="flex items-center gap-2 text-sm text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    Limite excedido (50KB)
                  </span>
                )}
              </div>
            </div>

            <textarea
              value={quickNotes}
              onChange={(e) => setQuickNotes(e.target.value)}
              placeholder="Digite suas anotações sobre Bash...

• Comandos importantes
• Pipelines úteis
• Regex patterns
• Scripts personalizados
• Dúvidas para revisar"
              className="w-full h-80 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              disabled={saveStatus === 'quota_exceeded'}
            />

            {/* Indicador de Tamanho e Avisos */}
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                🐚 Suas notas de Bash são salvas automaticamente
              </span>
              <span className={`font-mono ${
                parseFloat(sizeInfo.percentage) >= 80
                  ? 'text-orange-600 font-semibold'
                  : 'text-gray-500'
              }`}>
                {sizeInfo.sizeKB} KB / 50 KB ({sizeInfo.percentage}%)
              </span>
            </div>

            {/* Alerta quando atingir 80% do limite */}
            {parseFloat(sizeInfo.percentage) >= 80 && parseFloat(sizeInfo.percentage) < 100 && (
              <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Nota grande:</strong> Você está usando {sizeInfo.percentage}% do limite.
                    Considere dividir em notas menores para melhor organização.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {fasesBash.map(fase => {
            const faseModulos = modulosBash.filter(m => m.fase === fase.id);
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
                      const isCompleted = completedBashModules.has(modulo.id);
                      const weekDate = getWeekDate(modulo.semana, startDateBash);
                      
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
                              // US-040: React Router navigation (deep linking para aulas)
                              navigate(`/curso/bash/aula/${modulo.id}`);
                            } else if (!isCompleted) {
                              setCompletedBashModules(prev => new Set([...prev, modulo.id]));
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
                                    <span className="ml-2 inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                      <BookOpen className="w-3 h-3" />
                                      📖 Estudar
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