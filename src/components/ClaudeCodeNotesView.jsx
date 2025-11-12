import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  Terminal, 
  Code, 
  Zap, 
  Shield, 
  Users,
  FileText,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Settings,
  GitBranch,
  Key,
  Clock,
  Target,
  Award
} from 'lucide-react';

const ClaudeCodeNotesView = ({ moduleId, onBack, onOpenFlashcards }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);
  const [codeVisibility, setCodeVisibility] = useState({});

  // Função para copiar código
  const copyToClipboard = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(index);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  // Função para alternar visibilidade do código
  const toggleCodeVisibility = (index) => {
    setCodeVisibility(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Dados dos módulos
  const modulesData = {
    'claudecode-1': {
      title: 'Setup e Conceitos Básicos',
      description: 'Instalação, configuração e primeiros passos com Claude Code',
      sections: [
        {
          id: 'intro',
          title: 'Introdução ao Claude Code',
          subtitle: 'O que é e como funciona',
          icon: BookOpen,
          color: 'bg-purple-500'
        },
        {
          id: 'instalacao',
          title: 'Instalação e Configuração',
          subtitle: 'Setup inicial e autenticação',
          icon: Settings,
          color: 'bg-blue-500'
        },
        {
          id: 'primeiros-passos',
          title: 'Primeiros Passos',
          subtitle: 'Interface e comandos básicos',
          icon: Zap,
          color: 'bg-green-500'
        },
        {
          id: 'projeto-pratico',
          title: 'Projeto Prático',
          subtitle: 'Hello World Plus',
          icon: Code,
          color: 'bg-orange-500'
        }
      ]
    },
    'claudecode-2': {
      title: 'Comandos Básicos e Navegação',
      description: 'Dominando comandos fundamentais e contexto de projeto',
      sections: [
        {
          id: 'comandos-essenciais',
          title: 'Comandos Essenciais',
          subtitle: 'Análise, geração e refatoração',
          icon: Terminal,
          color: 'bg-purple-500'
        },
        {
          id: 'contexto-navegacao',
          title: 'Contexto e Navegação',
          subtitle: 'Como Claude entende seu projeto',
          icon: GitBranch,
          color: 'bg-blue-500'
        },
        {
          id: 'manipulacao-arquivos',
          title: 'Manipulação de Arquivos',
          subtitle: 'Leitura, edição e criação',
          icon: FileText,
          color: 'bg-green-500'
        },
        {
          id: 'calculadora-avancada',
          title: 'Projeto: Calculadora',
          subtitle: 'Projeto prático completo',
          icon: Target,
          color: 'bg-orange-500'
        }
      ]
    },
    'claudecode-3': {
      title: 'Comandos Personalizados',
      description: 'Criando comandos customizados e organizando biblioteca',
      sections: [
        {
          id: 'comandos-custom',
          title: 'Comandos Personalizados',
          subtitle: 'Estrutura YAML e criação',
          icon: Code,
          color: 'bg-purple-500'
        }
      ]
    },
    // Adicionar mais módulos conforme necessário
  };

  const currentModule = modulesData[moduleId];
  
  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Módulo não encontrado</h2>
          <p className="text-gray-300 mb-6">ID do módulo: {moduleId}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const [selectedSectionId, setSelectedSectionId] = useState(currentModule.sections[0]?.id || '');

  const renderContent = () => {
    if (selectedSectionId === 'intro') {
      return (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Introdução ao Claude Code
            </h2>
            
            <div className="space-y-4 text-purple-800">
              <p>
                <strong>Claude Code</strong> é a ferramenta CLI oficial da Anthropic que permite 
                integrar o poder do Claude diretamente no seu workflow de desenvolvimento.
              </p>
              
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">🚀 Principais Características:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Contextual:</strong> Entende seu projeto inteiro</li>
                  <li><strong>Rápido:</strong> Respostas instantâneas no terminal</li>
                  <li><strong>Extensível:</strong> Comandos personalizados</li>
                  <li><strong>Seguro:</strong> Controle total sobre dados</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">💡 Casos de Uso:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Análise de Código:</strong>
                    <code className="block bg-gray-800 text-green-400 p-2 rounded mt-1 text-xs">
                      claude "analise este arquivo"
                    </code>
                  </div>
                  <div>
                    <strong>Geração de Testes:</strong>
                    <code className="block bg-gray-800 text-green-400 p-2 rounded mt-1 text-xs">
                      claude "crie testes para main.py"
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSectionId === 'instalacao') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Instalação e Configuração
            </h2>
            
            <div className="space-y-4 text-blue-800">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">📋 Pré-requisitos:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                  <li>Node.js versão 18 ou superior</li>
                  <li>NPM ou Yarn</li>
                  <li>Conta ativa na Anthropic</li>
                  <li>API Key configurada</li>
                </ul>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">⚡ Instalação Rápida:</h3>
                <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm">
                  # Instalar globalmente<br/>
                  npm install -g @anthropic-ai/claude-code<br/><br/>
                  # Verificar instalação<br/>
                  claude --version<br/><br/>
                  # Configurar autenticação<br/>
                  claude auth login
                </code>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSectionId === 'comandos-essenciais') {
      return (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              Comandos Essenciais do Claude Code
            </h2>
            
            <div className="space-y-4 text-purple-800">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">🔍 Análise de Código</h3>
                  <code className="block bg-gray-800 text-green-400 p-2 rounded text-xs mb-2">
                    claude "analise main.py"
                  </code>
                  <p className="text-sm">Analisa arquivos e sugere melhorias</p>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">⚡ Geração de Código</h3>
                  <code className="block bg-gray-800 text-green-400 p-2 rounded text-xs mb-2">
                    claude "crie função validar email"
                  </code>
                  <p className="text-sm">Gera código do zero</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conteúdo em Desenvolvimento</h2>
        <p className="text-gray-600">Este módulo está sendo preparado. Em breve teremos conteúdo completo!</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{currentModule.title}</h1>
                <p className="text-purple-200">{currentModule.description}</p>
              </div>
            </div>
            
            <button
              onClick={() => onOpenFlashcards('claudecode', 'Claude Code')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              📚 Flashcards
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar - seguindo padrão do Bash */}
          <div className="w-80 space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="font-semibold text-white mb-4">Seções</h3>
              {currentModule.sections.map((section) => {
                const IconComponent = section.icon;
                const isSelected = selectedSectionId === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSectionId(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all mb-2 ${
                      isSelected 
                        ? `${section.color} text-white shadow-md` 
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{section.title}</div>
                        <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                          {section.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Flash Cards Claude Code
              </h3>
              <p className="text-sm text-purple-800 mb-3">
                Pratique comandos, conceitos e técnicas avançadas.
              </p>
              <button
                onClick={() => onOpenFlashcards('claudecode', 'Claude Code')}
                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Praticar Flash Cards
              </button>
            </div>
          </div>
          
          {/* Conteúdo Principal */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaudeCodeNotesView;