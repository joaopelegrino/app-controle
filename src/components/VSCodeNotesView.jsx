import React from 'react';
import { Terminal, FileText, Zap, ExternalLink, ArrowLeft, FileJson, AlertTriangle } from 'lucide-react';

export const VSCodeNotesView = ({ 
  setCurrentSubView, 
  selectedSection, 
  setSelectedSection, 
  openFlashcardsFromNotes, 
  CodeBlock, 
  showCode, 
  toggleCodeVisibility, 
  copyToClipboard, 
  copiedCode 
}) => {
  const sections = [
    {
      id: 'tasks-automacao',
      title: 'Tasks e Automação',
      subtitle: 'Configurando múltiplos terminais automáticos',
      icon: Zap,
      color: 'bg-blue-500'
    },
    {
      id: 'json-config',
      title: 'Arquivo tasks.json',
      subtitle: 'Estrutura e configuração detalhada',
      icon: FileJson,
      color: 'bg-green-500'
    },
    {
      id: 'troubleshooting',
      title: 'Resolução de Problemas',
      subtitle: 'Erros comuns e soluções',
      icon: AlertTriangle,
      color: 'bg-orange-500'
    }
  ];
  
  const tasksJsonCode = `{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🚀 Abrir Terminais Workspace",
      "type": "shell",
      "command": "echo",
      "args": ["Iniciando terminais..."],
      "dependsOn": [
        "Terminal: Workspace Raiz",
        "Terminal: Site WM"
      ],
      "dependsOrder": "parallel"
    }
  ]
}`;
  
  const renderContent = () => {
    if (selectedSection === 'tasks-automacao') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Configuração de Terminais Automáticos
            </h2>
            
            <p className="text-blue-800 mb-4">
              VSCode Tasks permite automatizar a abertura de múltiplos terminais com configurações específicas.
            </p>
          </div>
        </div>
      );
    } else if (selectedSection === 'json-config') {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <FileJson className="w-6 h-6" />
              Estrutura do arquivo tasks.json
            </h2>
            
            <CodeBlock 
              code={tasksJsonCode} 
              id="tasks-json-code" 
              title="tasks.json"
              language="json"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Resolução de Problemas Comuns
            </h2>
            
            <p className="text-orange-800">
              Aqui estão os problemas mais comuns e suas soluções.
            </p>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Terminal className="w-8 h-8 text-blue-600" />
              Sessão de Aprendizado: VSCode WSL2
            </h1>
            <p className="text-gray-600 mt-1">
              Configuração de Terminais Automáticos no VSCode
            </p>
          </div>
          
          <button
            onClick={() => setCurrentSubView('calendar')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Calendário
          </button>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="w-80 space-y-2">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Conteúdo da Sessão
            </h3>
            
            {sections.map(section => {
              const IconComponent = section.icon;
              const isSelected = selectedSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all mb-2 ${
                    isSelected 
                      ? `${section.color} text-white shadow-md` 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                        {section.subtitle}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Flash Cards
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              Pratique com cartões sobre VSCode e WSL.
            </p>
            <button
              onClick={openFlashcardsFromNotes}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Praticar Flash Cards
            </button>
          </div>
        </div>
        
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};