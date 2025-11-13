import React from 'react';
import { BookOpen, FileText, Zap, ExternalLink, ArrowLeft, Terminal, Code, Lightbulb } from 'lucide-react';

export const CNotesView = ({ 
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
      id: 'hello-world',
      title: 'Olá Mundo em C',
      subtitle: 'Primeiro programa e componentes básicos',
      icon: Terminal,
      color: 'bg-blue-500'
    },
    {
      id: 'variables',
      title: 'Tipos de Variáveis',
      subtitle: 'char, bool e suas diferenças',
      icon: Code,
      color: 'bg-green-500'
    },
    {
      id: 'bool-example',
      title: 'Exemplo Prático: bool',
      subtitle: 'Implementação com condicionais',
      icon: Lightbulb,
      color: 'bg-purple-500'
    }
  ];
  
  const helloWorldCode = `#include <stdio.h>

int main () {
       
    printf("Ola C!");
    return 0;
}`;
  
  const boolExampleCode = `#include <stdio.h>
#include <stdbool.h>

int main () {
    bool estudante = 0;
    
    if (estudante){
        printf("Resultado: Estudante");
    }
    else{        
        printf("Resultado: Não estudante");
    }
    
    return 0;
}`;
  
  const renderContent = () => {
    if (selectedSection === 'hello-world') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              Primeiro Programa: "Olá Mundo"
            </h2>
            
            <p className="text-blue-800 mb-4">
              O programa "Olá Mundo" é tradicionalmente o primeiro programa que todo programador escreve. 
              Vamos analisar cada componente deste código C básico:
            </p>
            
            <CodeBlock 
              code={helloWorldCode} 
              id="hello-world-code" 
              title="hello_world.c"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔍 Análise Detalhada</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">#include &lt;stdio.h&gt;</code>
                </h4>
                <p className="text-gray-700">
                  <strong>Diretiva de Pré-processador:</strong> Inclui a biblioteca padrão de entrada/saída.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">int main()</code>
                </h4>
                <p className="text-gray-700">
                  <strong>Função Principal:</strong> Todo programa C deve ter uma função main().
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSection === 'variables') {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6" />
              Tipos de Variáveis em C
            </h2>
            
            <p className="text-green-800 mb-4">
              Em C, diferentes tipos de dados requerem declarações específicas e, em alguns casos, 
              bibliotecas adicionais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">char</span>
                Caracteres
              </h3>
              
              <div className="bg-blue-50 p-3 rounded">
                <code className="text-sm">char letra = 'A';</code>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">bool</span>
                Booleano
              </h3>
              
              <div className="bg-red-50 p-3 rounded">
                <code className="text-sm">#include &lt;stdbool.h&gt;</code>
                <p className="text-sm text-red-800 mt-2">⚠️ Biblioteca obrigatória!</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Exemplo Prático: Usando bool
            </h2>
            
            <CodeBlock 
              code={boolExampleCode} 
              id="bool-example-code" 
              title="exemplo_bool.c"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              📝 Aula 1.1: Fundamentos C99
            </h1>
            <p className="text-gray-600 mt-1">
              Módulo 1.1: Fundamentos C99 - Ambiente de Desenvolvimento Moderno
            </p>
          </div>
          
          <button
            onClick={() => setCurrentSubView('calendar')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Curso
          </button>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="w-80 space-y-2">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Conteúdo do Tópico
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
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Flash Cards
            </h3>
            <p className="text-sm text-orange-800 mb-3">
              Reforce o aprendizado com cartões de estudo sobre os conceitos desta aula.
            </p>
            <button
              onClick={openFlashcardsFromNotes}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
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