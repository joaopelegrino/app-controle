import React from 'react';
import { BookOpen, FileText, Zap, ExternalLink, ArrowLeft, Terminal, Code, Lightbulb, Package, Shield, Activity } from 'lucide-react';

export const RustNotesView = ({ 
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
      id: 'hello-world-rust',
      title: 'Hello World em Rust',
      subtitle: 'Primeiro programa e setup do ambiente',
      icon: Terminal,
      color: 'bg-orange-500'
    },
    {
      id: 'variables-rust',
      title: 'Variables & Mutability',
      subtitle: 'let, mut e shadowing',
      icon: Code,
      color: 'bg-red-500'
    },
    {
      id: 'ownership',
      title: 'Ownership System',
      subtitle: 'Sistema único do Rust',
      icon: Shield,
      color: 'bg-purple-500'
    },
    {
      id: 'borrowing',
      title: 'Borrowing & References',
      subtitle: 'Referencias imutáveis e mutáveis',
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      id: 'structs-enums',
      title: 'Structs & Enums',
      subtitle: 'Estruturas de dados customizadas',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      id: 'traits-generics',
      title: 'Traits & Generics',
      subtitle: 'Polimorfismo e reutilização',
      icon: Lightbulb,
      color: 'bg-indigo-500'
    }
  ];
  
  const helloWorldRustCode = `fn main() {
    println!("Hello, world!");
}`;

  const variablesRustCode = `fn main() {
    // Imutável por padrão
    let x = 5;
    println!("The value of x is: {}", x);
    
    // Mutável com 'mut'
    let mut y = 5;
    y = 6;
    println!("The value of y is: {}", y);
    
    // Shadowing
    let spaces = "   ";
    let spaces = spaces.len();
    println!("Number of spaces: {}", spaces);
}`;

  const ownershipCode = `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Move occurs here
    
    // println!("{}", s1); // Error! s1 no longer valid
    println!("{}", s2); // This works
    
    // Clone para deep copy
    let s3 = String::from("world");
    let s4 = s3.clone();
    println!("s3 = {}, s4 = {}", s3, s4); // Both valid
}`;

  const borrowingCode = `fn main() {
    let mut s = String::from("hello");
    
    // Immutable reference
    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2);
    
    // Mutable reference (after immutable refs are done)
    let r3 = &mut s;
    r3.push_str(", world");
    println!("{}", r3);
}`;

  const structEnumCode = `// Struct definition
struct User {
    username: String,
    email: String,
    active: bool,
}

// Enum with data
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let user = User {
        username: String::from("usuario"),
        email: String::from("email@example.com"),
        active: true,
    };
    
    let msg = Message::Write(String::from("hello"));
}`;

  const traitsGenericsCode = `// Generic struct
struct Point<T> {
    x: T,
    y: T,
}

// Trait definition
trait Summary {
    fn summarize(&self) -> String;
}

// Trait implementation
impl<T> Summary for Point<T> 
where T: std::fmt::Display {
    fn summarize(&self) -> String {
        format!("Point at ({}, {})", self.x, self.y)
    }
}

fn main() {
    let point = Point { x: 5, y: 10 };
    println!("{}", point.summarize());
}`;
  
  const renderContent = () => {
    if (selectedSection === 'hello-world-rust') {
      return (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              Primeiro Programa: "Hello, World!" em Rust
            </h2>
            
            <p className="text-orange-800 mb-4">
              O programa "Hello, World!" em Rust é extremamente simples mas demonstra conceitos fundamentais.
              Vamos analisar cada componente:
            </p>
            
            <CodeBlock 
              code={helloWorldRustCode} 
              id="hello-world-rust-code" 
              title="main.rs"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔍 Análise Detalhada</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">fn main()</code>
                </h4>
                <p className="text-gray-700">
                  <strong>Função Principal:</strong> Todo programa Rust inicia na função main().
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">println!</code>
                </h4>
                <p className="text-gray-700">
                  <strong>Macro:</strong> Note o "!" - println! é uma macro, não uma função.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">cargo run</code>
                </h4>
                <p className="text-gray-700">
                  <strong>Execução:</strong> Use <code>cargo run</code> para compilar e executar.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSection === 'variables-rust') {
      return (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6" />
              Variables & Mutability em Rust
            </h2>
            
            <p className="text-red-800 mb-4">
              Rust tem um sistema único de variáveis: são <strong>imutáveis por padrão</strong>.
              Para torná-las mutáveis, é preciso usar a palavra-chave <code>mut</code>.
            </p>
            
            <CodeBlock 
              code={variablesRustCode} 
              id="variables-rust-code" 
              title="variables.rs"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">let</span>
                Imutável
              </h3>
              <div className="bg-blue-50 p-3 rounded">
                <code className="text-sm">let x = 5; // Não pode mudar</code>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">mut</span>
                Mutável
              </h3>
              <div className="bg-green-50 p-3 rounded">
                <code className="text-sm">let mut y = 5; // Pode mudar</code>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">🔄 Shadowing</h3>
            <p className="text-purple-800">
              Shadowing permite redeclarar uma variável com o mesmo nome, podendo até mudar o tipo.
              É diferente de mutabilidade!
            </p>
          </div>
        </div>
      );
    } else if (selectedSection === 'ownership') {
      return (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Sistema de Ownership
            </h2>
            
            <p className="text-purple-800 mb-4">
              O <strong>ownership</strong> é o que torna Rust único: gerenciamento automático de memória
              sem garbage collector. Cada valor tem um "dono" (owner).
            </p>
            
            <CodeBlock 
              code={ownershipCode} 
              id="ownership-code" 
              title="ownership.rs"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Regras de Ownership</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">1</span>
                <p className="text-gray-700">Cada valor em Rust tem uma variável que é seu <strong>owner</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">2</span>
                <p className="text-gray-700">Pode haver apenas <strong>um owner</strong> por vez</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">3</span>
                <p className="text-gray-700">Quando o owner sai de escopo, o valor é <strong>dropado</strong></p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSection === 'borrowing') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Borrowing & References
            </h2>
            
            <p className="text-blue-800 mb-4">
              <strong>Borrowing</strong> permite usar um valor sem tomar ownership dele.
              Criamos referências com <code>&</code>.
            </p>
            
            <CodeBlock 
              code={borrowingCode} 
              id="borrowing-code" 
              title="borrowing.rs"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">&</span>
                Referência Imutável
              </h3>
              <div className="bg-blue-50 p-3 rounded">
                <code className="text-sm">let r = &s; // Pode ler</code>
                <p className="text-sm text-blue-800 mt-2">Múltiplas permitidas</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">&mut</span>
                Referência Mutável
              </h3>
              <div className="bg-red-50 p-3 rounded">
                <code className="text-sm">let r = &mut s; // Pode modificar</code>
                <p className="text-sm text-red-800 mt-2">Apenas uma permitida</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (selectedSection === 'structs-enums') {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Structs & Enums
            </h2>
            
            <p className="text-green-800 mb-4">
              <strong>Structs</strong> agrupam dados relacionados. <strong>Enums</strong> permitem um valor
              ser uma de várias variantes possíveis.
            </p>
            
            <CodeBlock 
              code={structEnumCode} 
              id="struct-enum-code" 
              title="structs_enums.rs"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">struct</span>
                Estruturas
              </h3>
              <p className="text-gray-700">Agrupa campos nomeados</p>
              <div className="bg-green-50 p-3 rounded mt-2">
                <code className="text-sm">struct User {'{'}name: String{'}'}</code>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">enum</span>
                Enumerações
              </h3>
              <p className="text-gray-700">Variantes com dados opcionais</p>
              <div className="bg-purple-50 p-3 rounded mt-2">
                <code className="text-sm">enum Message {'{'}Quit, Move{'{'}x: i32{'}'}{'}'}</code>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Traits & Generics
            </h2>
            
            <p className="text-indigo-800 mb-4">
              <strong>Traits</strong> definem comportamento compartilhado. <strong>Generics</strong>
              permitem escrever código para múltiplos tipos.
            </p>
            
            <CodeBlock 
              code={traitsGenericsCode} 
              id="traits-generics-code" 
              title="traits_generics.rs"
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔧 Conceitos Avançados</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Traits</h4>
                <p className="text-gray-700">Similar a interfaces - definem métodos que tipos devem implementar</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Generics</h4>
                <p className="text-gray-700">Permitem código polimórfico - funciona com diferentes tipos</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Trait Bounds</h4>
                <p className="text-gray-700">Restringem quais tipos podem ser usados com generics</p>
              </div>
            </div>
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
              <BookOpen className="w-8 h-8 text-orange-600" />
              📝 Aula 1.1: Fundamentos Rust
            </h1>
            <p className="text-gray-600 mt-1">
              Módulo 1.1: Fundamentos Rust 🦀 - Introduction & Variables
            </p>
          </div>
          
          <button
            onClick={() => setCurrentSubView('calendar')}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
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
              Flash Cards Rust
            </h3>
            <p className="text-sm text-orange-800 mb-3">
              Reforce o aprendizado com cartões de estudo sobre ownership, borrowing e conceitos de Rust.
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