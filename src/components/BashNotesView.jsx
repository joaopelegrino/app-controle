import React from 'react';
import { BookOpen, FileText, Zap, ExternalLink, ArrowLeft, Terminal, History, Code } from 'lucide-react';

export const BashNotesView = ({ 
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
      id: 'course-intro',
      title: 'Introdução ao Curso',
      subtitle: 'Objetivos e estrutura do curso',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      id: 'unix-history',
      title: 'História Unix/Linux',
      subtitle: 'Bell Labs, PDP-11 e evolução dos shells',
      icon: History,
      color: 'bg-green-500'
    },
    {
      id: 'shell-evolution',
      title: 'Evolução dos Shells',
      subtitle: 'Thompson → Bourne → Bash',
      icon: Terminal,
      color: 'bg-purple-500'
    },
    {
      id: 'first-script',
      title: 'Primeiro Script',
      subtitle: 'who | wc -l example',
      icon: Code,
      color: 'bg-orange-500'
    }
  ];
  
  const firstScriptCode = `#!/bin/bash
# Conta o número de sessões de login
who > /tmp/sessions.txt
wc -l < /tmp/sessions.txt`;

  const pipelineExampleCode = `# Pipeline simples: lista usuários únicos
who | awk '{print $1}' | sort | uniq

# Versão com sed e regex
who | sed 's/[^[:alnum:]].*//' | sort | uniq`;

  const softwareToolsCode = `# Princípio: Uma ferramenta, uma função
# ❌ VMS style (faz muitas coisas)
# COPY file1.txt file2.txt /CONCATENATE/OUTPUT=result.txt

# ✅ Unix style (ferramentas especializadas)
cat file1.txt file2.txt > result.txt`;
  
  const renderContent = () => {
    if (selectedSection === 'course-intro') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Bem-vindo ao Curso Shell Scripting
            </h2>
            
            <div className="space-y-4 text-blue-800">
              <p>
                <strong>Objetivo:</strong> Aprender scripting portável e robusto com POSIX shell, 
                cobrindo a caixa de ferramentas Unix e abordagem de scripting.
              </p>
              
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">📚 O que você vai aprender:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Sintaxe e comportamento do shell</li>
                  <li>Conjunto básico de ferramentas Unix</li>
                  <li>Expressões regulares (regex)</li>
                  <li>Como conectar componentes em pipelines</li>
                  <li>Comando da linha de comando sem medo!</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Pré-requisitos:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                  <li>Saber abrir um terminal</li>
                  <li>Usar um editor de texto</li>
                  <li>Comando chmod para tornar scripts executáveis</li>
                  <li>Navegação básica em diretórios</li>
                  <li>Compreensão de permissões de arquivo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSection === 'unix-history') {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <History className="w-6 h-6" />
              História do Unix e Shell Scripting
            </h2>
            
            <div className="space-y-4 text-green-800">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">🏢 Bell Labs (1970s)</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Ambiente orientado à pesquisa</li>
                    <li>• Sem pressão para lançar produtos</li>
                    <li>• Desenvolvedores eram os próprios usuários</li>
                    <li>• Tempo para experimentar e refinar</li>
                  </ul>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">💻 PDP-11 Constraints</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Apenas 64KB de espaço de endereçamento</li>
                    <li>• Memória física ainda menor</li>
                    <li>• Sistemas pequenos = filosofia ferramentas</li>
                    <li>• Cada byte importava!</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">✨ Inovações do Unix</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Positivas:</strong>
                    <ul className="list-disc list-inside mt-1">
                      <li>Shell não integrado ao OS</li>
                      <li>Espaços em branco separam argumentos</li>
                      <li>Lowercase por padrão</li>
                      <li>Quoting simples</li>
                      <li>Search paths personalizáveis</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Desafios:</strong>
                    <ul className="list-disc list-inside mt-1">
                      <li>Utilitários inconsistentes</li>
                      <li>Sintaxes regex diferentes</li>
                      <li>Limites fixos (512 chars/linha)</li>
                      <li>Documentação concisa demais</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSection === 'shell-evolution') {
      return (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              Evolução dos Shells Unix
            </h2>
            
            <div className="space-y-4">
              <div className="timeline space-y-4">
                <div className="flex gap-4">
                  <div className="w-20 text-sm font-bold text-purple-600">1970-76</div>
                  <div className="flex-1 bg-gray-100 p-3 rounded">
                    <strong>Thompson Shell</strong> - Primeiro shell Unix por Ken Thompson
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 text-sm font-bold text-purple-600">1975</div>
                  <div className="flex-1 bg-gray-100 p-3 rounded">
                    <strong>Mashey Shell</strong> - Para Programmer's Workbench Unix
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 text-sm font-bold text-purple-600">1977</div>
                  <div className="flex-1 bg-blue-100 p-3 rounded">
                    <strong>Bourne Shell (sh)</strong> - V7 Unix, pai de todos os shells modernos
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 text-sm font-bold text-purple-600">1979</div>
                  <div className="flex-1 bg-green-100 p-3 rounded">
                    <strong>C Shell (csh)</strong> - Berkeley, história e job control
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 text-sm font-bold text-purple-600">1986-93</div>
                  <div className="flex-1 bg-yellow-100 p-3 rounded">
                    <strong>Korn Shell (ksh)</strong> - David Korn, KSH86 → KSH88 → KSH93
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 text-sm font-bold text-purple-600">1989</div>
                  <div className="flex-1 bg-orange-100 p-3 rounded">
                    <strong>Bash</strong> - Born Again Shell, GNU Project, ainda em desenvolvimento
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 text-sm font-bold text-purple-600">1992</div>
                  <div className="flex-1 bg-indigo-100 p-3 rounded">
                    <strong>POSIX Shell</strong> - Padrão para portabilidade, projeto contínuo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6" />
              Primeiro Script: Contando Sessões de Login
            </h2>
            
            <p className="text-orange-800 mb-4">
              Exemplo prático do curso: como contar quantos usuários estão logados no sistema.
            </p>
            
            <CodeBlock 
              code={firstScriptCode} 
              id="first-script-code" 
              title="count_sessions.sh"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
            
            <div className="mt-4 space-y-4">
              <div className="bg-orange-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">📝 Versão Pipeline (Mais Elegante)</h3>
                <CodeBlock 
                  code={pipelineExampleCode} 
                  id="pipeline-example-code" 
                  title="Pipeline Examples"
                  showCode={showCode}
                  toggleCodeVisibility={toggleCodeVisibility}
                  copyToClipboard={copyToClipboard}
                  copiedCode={copiedCode}
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">⚡ Software Tools Philosophy</h3>
                <CodeBlock 
                  code={softwareToolsCode} 
                  id="software-tools-code" 
                  title="Philosophy Comparison"
                  showCode={showCode}
                  toggleCodeVisibility={toggleCodeVisibility}
                  copyToClipboard={copyToClipboard}
                  copiedCode={copiedCode}
                />
              </div>
            </div>
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
              <Terminal className="w-8 h-8 text-green-600" />
              Notas de Aprendizado Bash
            </h1>
            <p className="text-gray-600 mt-1">
              Módulo 1.1: Introdução ao Shell Scripting + História Unix
            </p>
          </div>
          
          <button
            onClick={() => setCurrentSubView('calendar')}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Cronograma
          </button>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="w-80 space-y-2">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Conteúdo da Aula
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
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Flash Cards Bash
            </h3>
            <p className="text-sm text-green-800 mb-3">
              Pratique comandos, pipelines e conceitos fundamentais do shell scripting.
            </p>
            <button
              onClick={openFlashcardsFromNotes}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
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