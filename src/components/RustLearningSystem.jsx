import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, BookOpen, Home, Play, StickyNote, AlertTriangle } from 'lucide-react';
import { useAutoSaveNotes } from '../hooks/useAutoSaveNotes';
import { RustNotesView } from './RustNotesView';
import { Breadcrumb } from './Breadcrumb';

export const RustLearningSystem = ({ 
  currentSubView, 
  setCurrentSubView, 
  setCurrentView, 
  completedModules, 
  setCompletedModules, 
  selectedSection, 
  setSelectedSection, 
  fasesRust, 
  modulosRust, 
  startDateRust, 
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
  const progressPercentage = Math.round((completedModules.size / modulosRust.length) * 100);

  // Hook de auto-save com tratamento de erros localStorage
  const [quickNotes, setQuickNotes, saveStatus, sizeInfo] = useAutoSaveNotes('rust');
  
  if (currentSubView === 'notes') {
    return (
      <RustNotesView 
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
            { label: 'Curso de Rust Programming', icon: '🦀', current: true }
          ]}
        />
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={() => setCurrentView('hub')}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-4"
              >
                <Home className="w-4 h-4" />
                Voltar ao Hub
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Curso de Rust Programming</h1>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">2 Sistemas Integrados:</span> 
                <span className="text-orange-600"> Seção 1: Fundamentos Rust Programming</span> → 
                <span className="text-red-600"> Seção 2: Projeto Avançado Rust + Sistemas</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">{progressPercentage}%</div>
              <div className="text-sm text-gray-500">{completedModules.size}/{modulosRust.length} módulos</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        
        <div className="space-y-4">
          {fasesRust.map(fase => {
            const faseModulos = modulosRust.filter(m => m.fase === fase.id);
            const IconeComponent = fase.icone;
            
            return (
              <div key={fase.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className={`${fase.cor} text-white p-4 relative`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconeComponent className="w-6 h-6" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{fase.nome}</h3>
                          {fase.id === 1 && (
                            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                              🎥 Com Vídeo
                            </span>
                          )}
                          {fase.id === 2 && (
                            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                              🚀 Projetos Avançados
                            </span>
                          )}
                        </div>
                        <p className="text-white/90 text-sm">{fase.descricao}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/80">Sistema {fase.id}/2</div>
                      <div className="text-sm font-medium">Semanas {fase.semanas}</div>
                    </div>
                  </div>
                </div>
                
                {/* Vídeo YouTube - Apenas para Seção 1 */}
                {fase.id === 1 && (
                  <div className="bg-orange-50 border-t border-orange-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Play className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Vídeo de Apoio - Fundamentos Rust Programming</h3>
                    </div>
                    <div className="bg-white border border-orange-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-orange-700">
                        📚 Este vídeo complementa os estudos da <strong>Seção 1: Fundamentos Rust Programming</strong> (semanas 1-12)
                      </p>
                    </div>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/BpPEoZW5IiY"
                        title="Rust Programming Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    
                    {/* Meu Caderno de Notas - Específicas para Seção 1 */}
                    <div className="mt-6 bg-white border border-orange-200 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <StickyNote className="w-5 h-5 text-orange-600" />
                        <h3 className="text-lg font-semibold text-gray-900">📒 Meu Caderno de Notas - Fundamentos Rust</h3>
                      </div>
                      <textarea
                        value={quickNotes}
                        onChange={(e) => setQuickNotes(e.target.value)}
                        placeholder="Digite suas anotações sobre os fundamentos de Rust Programming...

• Conceitos importantes do vídeo
• Dúvidas sobre ownership e borrowing
• Exemplos de códigos interessantes
• Diferenças entre Rust e outras linguagens
• Links úteis para Rust Programming"
                        className="w-full h-80 p-3 border border-orange-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                      <div className="mt-3 space-y-1">
                        <div className="text-sm">
                          {saveStatus === 'saving' && (
                            <span className="text-blue-600">💾 Salvando automaticamente...</span>
                          )}
                          {saveStatus === 'saved' && (
                            <span className="text-green-600">🦀 Suas notas de Rust são salvas automaticamente</span>
                          )}
                          {saveStatus === 'error' && (
                            <span className="text-red-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" />
                              Erro ao salvar notas
                            </span>
                          )}
                          {saveStatus === 'quota_exceeded' && (
                            <span className="text-orange-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" />
                              Limite de 50KB excedido
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          📊 {sizeInfo.sizeKB} KB / 50 KB ({sizeInfo.percentage}%)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-4">
                  <div className="grid gap-3">
                    {faseModulos.map(modulo => {
                      const isCompleted = completedModules.has(modulo.id);
                      const weekDate = getWeekDate(modulo.semana, startDateRust);
                      
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
                              navigate(`/curso/rust/aula/${modulo.id}`);
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
                                    <span className="ml-2 inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
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