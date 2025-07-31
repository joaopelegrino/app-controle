import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Circle, BookOpen, Code, Shield, Server, TrendingUp, ChevronLeft, ChevronRight, Target, Award, FileText, Eye, EyeOff, Copy, Lightbulb, AlertTriangle, Terminal, ArrowLeft, ExternalLink, FileJson, Folder, Settings, Zap, Home, X } from 'lucide-react';

const SistemaEducacionalCompleto = () => {
  // Global States
  const [currentView, setCurrentView] = useState('hub');
  const [currentArea, setCurrentArea] = useState(null);
  const [currentSubView, setCurrentSubView] = useState('calendar');
  const [selectedSection, setSelectedSection] = useState('');
  const [showCode, setShowCode] = useState({});
  const [copiedCode, setCopiedCode] = useState('');
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [currentCards, setCurrentCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // C Learning States
  const [completedModules, setCompletedModules] = useState(new Set());
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  // VSCode Learning States
  const [completedVSCodeModules, setCompletedVSCodeModules] = useState(new Set());
  
  // Start dates
  const startDateC = new Date(2025, 6, 28); // July 28, 2025
  const startDateVSCode = new Date(2025, 6, 30); // July 30, 2025
  
  // Study Areas Data
  const studyAreas = {
    bash: {
      name: 'Bash',
      icon: '🐚',
      description: 'Shell scripting, automação e linha de comando',
      badge: 'new',
      modules: 8,
      hours: 16,
      flashcards: {
        basics: {
          name: 'Fundamentos',
          cards: [
            {
              question: 'Como criar uma variável em Bash?',
              answer: 'VARIAVEL="valor" (sem espaços ao redor do =)',
              code: 'NAME="João"\necho $NAME\n# ou\necho ${NAME}',
              details: 'Em Bash, não use espaços ao redor do =\nUse $ para acessar o valor\nUse ${} para delimitar claramente a variável'
            },
            {
              question: 'Como fazer um loop for em Bash?',
              answer: 'Use for item in lista; do comandos; done',
              code: 'for i in 1 2 3 4 5; do\n    echo "Número: $i"\ndone\n\n# Ou com range\nfor i in {1..5}; do\n    echo "Número: $i"\ndone',
              details: 'Sintaxe: for VAR in LISTA; do COMANDOS; done\n{1..5} expande para 1 2 3 4 5\nPode iterar sobre arquivos: for file in *.txt'
            }
          ]
        }
      }
    },
    linux: {
      name: 'Linux',
      icon: '🐧',
      description: 'Sistema operacional, comandos e administração',
      modules: 12,
      hours: 24,
      flashcards: {
        commands: {
          name: 'Comandos Essenciais',
          cards: [
            {
              question: 'Como encontrar arquivos por nome?',
              answer: 'Use o comando find',
              code: 'find /caminho -name "*.txt"\nfind . -name "arquivo*"',
              details: 'find [caminho] -name [padrão]\n.: diretório atual\n-iname: busca case-insensitive'
            }
          ]
        }
      }
    },
    servers: {
      name: 'Servidores',
      icon: '🖥️',
      description: 'Web servers, configuração e otimização',
      modules: 10,
      hours: 20,
      flashcards: {
        nginx: {
          name: 'Nginx',
          cards: [
            {
              question: 'Como configurar um virtual host no Nginx?',
              answer: 'Criar arquivo em sites-available e linkar em sites-enabled',
              code: 'server {\n    listen 80;\n    server_name exemplo.com;\n    root /var/www/exemplo;\n}',
              details: 'Salve em /etc/nginx/sites-available/\nTeste: nginx -t\nRecarregue: systemctl reload nginx'
            }
          ]
        }
      }
    },
    devops: {
      name: 'DevOps',
      icon: '⚙️',
      description: 'CI/CD, automação e práticas modernas',
      modules: 15,
      hours: 30,
      flashcards: {
        cicd: {
          name: 'CI/CD',
          cards: [
            {
              question: 'O que é CI/CD?',
              answer: 'Continuous Integration e Continuous Deployment/Delivery',
              details: 'CI: Integração contínua de código\nCD: Entrega/Deploy contínuo'
            }
          ]
        }
      }
    },
    cryptography: {
      name: 'Criptografia',
      icon: '🔐',
      description: 'Algoritmos, protocolos e segurança de dados',
      badge: 'new',
      modules: 8,
      hours: 16,
      flashcards: {
        basics: {
          name: 'Fundamentos',
          cards: [
            {
              question: 'Qual a diferença entre criptografia simétrica e assimétrica?',
              answer: 'Simétrica usa uma chave, assimétrica usa par de chaves',
              details: 'Simétrica: mesma chave\nAssimétrica: par de chaves pública/privada'
            }
          ]
        }
      }
    },
    security: {
      name: 'Segurança',
      icon: '🛡️',
      description: 'Pentest, hardening e proteção de sistemas',
      modules: 12,
      hours: 24,
      flashcards: {
        web: {
          name: 'Segurança Web',
          cards: [
            {
              question: 'O que é SQL Injection?',
              answer: 'Injeção de SQL malicioso',
              code: '# Vulnerável:\nquery = f"SELECT * FROM users WHERE id = {user_id}"',
              details: 'Use prepared statements para prevenir'
            }
          ]
        }
      }
    },
    clang: {
      name: 'Linguagem C',
      icon: '🔨',
      description: 'Programação em C do básico ao avançado',
      badge: 'integrated',
      modules: 50,
      hours: 100,
      hasIntegratedApp: true,
      flashcards: {
        basics: {
          name: 'Fundamentos',
          cards: [
            {
              question: 'Como criar um "Olá Mundo" em C?',
              answer: 'Programa básico que imprime uma mensagem',
              code: '#include <stdio.h>\n\nint main() {\n    printf("Olá C!");\n    return 0;\n}',
              details: '#include <stdio.h>: biblioteca padrão\nint main(): função principal\nprintf(): imprime texto\nreturn 0: sucesso'
            },
            {
              question: 'Qual a diferença na declaração de variáveis char e bool?',
              answer: 'char precisa de [] para strings, bool precisa de <stdbool.h>',
              code: 'char nome[50];\nchar letra = \'A\';\n\n#include <stdbool.h>\nbool ativo = true;',
              details: 'char: tipo nativo\nbool: requer stdbool.h'
            },
            {
              question: 'Como usar variável bool em C?',
              answer: 'Incluir stdbool.h e usar em condicionais',
              code: '#include <stdbool.h>\n\nbool estudante = false;\nif (estudante) {\n    printf("Estudante");\n}',
              details: 'bool: true/false ou 1/0'
            }
          ]
        }
      }
    },
    docker: {
      name: 'Docker',
      icon: '🐳',
      description: 'Containers, imagens e orquestração',
      modules: 10,
      hours: 20,
      flashcards: {
        basics: {
          name: 'Fundamentos',
          cards: [
            {
              question: 'Como criar uma imagem Docker?',
              answer: 'Use um Dockerfile e docker build',
              code: 'FROM node:14\nWORKDIR /app\nCOPY . .\nCMD ["npm", "start"]',
              details: 'FROM: imagem base\nWORKDIR: diretório\nCOPY: copia arquivos\nCMD: comando padrão'
            }
          ]
        }
      }
    },
    kubernetes: {
      name: 'Kubernetes',
      icon: '☸️',
      description: 'Orquestração de containers em escala',
      badge: 'new',
      modules: 15,
      hours: 30,
      flashcards: {
        concepts: {
          name: 'Conceitos',
          cards: [
            {
              question: 'O que é um Pod?',
              answer: 'Menor unidade deployável',
              code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-pod',
              details: 'Pod = 1+ containers\nCompartilham rede e storage'
            }
          ]
        }
      }
    },
    vscode: {
      name: 'VS Code WSL',
      icon: '💻',
      description: 'Desenvolvimento integrado com WSL2',
      badge: 'integrated',
      modules: 8,
      hours: 16,
      hasIntegratedApp: true,
      flashcards: {
        wsl: {
          name: 'WSL Integration',
          cards: [
            {
              question: 'Como abrir projeto WSL no VS Code?',
              answer: 'Use code . no terminal WSL',
              code: 'cd /home/user/projeto\ncode .',
              details: 'Instale Remote-WSL\nVS Code no Windows, edita no Linux'
            },
            {
              question: 'Como configurar tasks.json?',
              answer: 'Tasks executam no WSL automaticamente',
              code: '{\n  "version": "2.0.0",\n  "tasks": [{\n    "label": "Build",\n    "command": "gcc"\n  }]\n}',
              details: 'Shell padrão é o WSL\nCaminhos são do Linux'
            }
          ]
        }
      }
    }
  };
  
  // C Learning Data
  const fasesC = [
    {
      id: 1,
      nome: "FASE 1: FUNDAMENTOS C PROGRAMMING",
      semanas: "1-8",
      cor: "bg-indigo-500",
      corClara: "bg-indigo-50",
      icone: Code,
      descricao: "Curso completo C Programming - Do básico aos conceitos avançados"
    },
    {
      id: 2,
      nome: "FASE 2: SITE DA AGÊNCIA HTTP/3 + ZERO TRUST",
      semanas: "9-16",
      cor: "bg-blue-500",
      corClara: "bg-blue-50",
      icone: BookOpen,
      descricao: "Site profissional HTTP/3 nativo com zero trust e qualidade enterprise"
    }
  ];
  
  const modulosC = [
    { 
      id: '1.1', 
      nome: 'Introdução C + Variáveis + Format Specifiers + Operadores', 
      semana: 1, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Setup VSCode + GCC + primeiro programa + variáveis básicas',
      temNotas: true 
    },
    { 
      id: '1.2', 
      nome: 'User Input + Shopping Cart + Mad Libs + Math Functions', 
      semana: 2, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Shopping cart program + Mad libs game' 
    },
    { 
      id: '1.3', 
      nome: 'If Statements + Converters + Calculator', 
      semana: 3, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Weight converter + Temperature program + Calculator' 
    },
    { 
      id: '1.4', 
      nome: 'Logical Operators + Functions + Prototypes', 
      semana: 4, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Funções modulares + function prototypes' 
    },
    { 
      id: '1.5', 
      nome: 'Loops + Random Numbers + Games', 
      semana: 5, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Number guessing game + Rock paper scissors' 
    },
    { 
      id: '1.6', 
      nome: 'Banking Program + Arrays + Quiz Game', 
      semana: 6, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Banking program + Quiz game interativo' 
    },
    { 
      id: '1.7', 
      nome: 'Ternary + Typedef + Enums + Structs', 
      semana: 7, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Structs + arrays of structs' 
    },
    { 
      id: '1.8', 
      nome: 'Pointers + File I/O + Memory + Digital Clock', 
      semana: 8, 
      fase: 1, 
      duracao: '1 semana', 
      entregavel: 'Pointers + file I/O + Digital clock' 
    }
  ];
  
  // VSCode Learning Data
  const topicosVSCode = [
    {
      id: 1,
      nome: "TÓPICO 1: VSCODE TASKS - AUTOMAÇÃO",
      semanas: "1-2",
      cor: "bg-blue-500",
      corClara: "bg-blue-50",
      icone: Zap,
      descricao: "Automatizar tarefas com VSCode Tasks"
    },
    {
      id: 2,
      nome: "TÓPICO 2: JSON CONFIGURATION",
      semanas: "3-4",
      cor: "bg-green-500",
      corClara: "bg-green-50",
      icone: FileJson,
      descricao: "Domine o formato JSON"
    }
  ];
  
  const modulosVSCode = [
    { 
      id: '1.1', 
      nome: 'Introdução a VSCode Tasks + Primeiro Task', 
      semana: 1, 
      topico: 1, 
      duracao: '3-4 horas', 
      entregavel: 'Criar tasks.json + automatizar compilação',
      temNotas: true 
    },
    { 
      id: '1.2', 
      nome: 'Tasks Avançados + Múltiplos Terminais', 
      semana: 2, 
      topico: 1, 
      duracao: '4-5 horas', 
      entregavel: 'Tasks dependentes + múltiplos terminais' 
    }
  ];
  
  // Helper Functions
  const toggleCodeVisibility = (sectionId) => {
    setShowCode(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Erro ao copiar código:', err);
    }
  };
  
  const getWeekDate = (weekNumber, startDate) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (weekNumber - 1) * 7);
    return date;
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };
  
  const getCurrentWeek = (startDate) => {
    const now = new Date();
    const diffTime = now - startDate;
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(1, diffWeeks);
  };
  
  const calculateStats = () => {
    let totalCards = 0;
    let totalModules = 0;
    let totalHours = 0;
    
    Object.values(studyAreas).forEach(area => {
      totalModules += area.modules || 0;
      totalHours += area.hours || 0;
      
      if (area.flashcards) {
        Object.values(area.flashcards).forEach(category => {
          totalCards += category.cards.length;
        });
      }
    });
    
    return { 
      totalAreas: Object.keys(studyAreas).length, 
      totalCards, 
      totalModules, 
      totalHours 
    };
  };
  
  const openArea = (areaKey) => {
    setCurrentArea(areaKey);
    const area = studyAreas[areaKey];
    
    if (area.hasIntegratedApp) {
      setCurrentView('integrated');
      setCurrentSubView('calendar');
    } else {
      // Open flashcards directly
      const cards = [];
      Object.values(area.flashcards).forEach(category => {
        cards.push(...category.cards);
      });
      setCurrentCards(cards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setFlashcardModalOpen(true);
    }
  };
  
  const openFlashcardsFromNotes = () => {
    const area = studyAreas[currentArea];
    const cards = [];
    Object.values(area.flashcards).forEach(category => {
      cards.push(...category.cards);
    });
    setCurrentCards(cards.sort(() => Math.random() - 0.5));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setFlashcardModalOpen(true);
  };
  
  // Components
  const CodeBlock = ({ code, language = 'c', id, title }) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <span className="text-gray-300 text-sm font-medium">{title}</span>
        <div className="flex gap-2">
          <button
            onClick={() => toggleCodeVisibility(id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showCode[id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => copyToClipboard(code, id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {copiedCode === id ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {(showCode[id] !== false) && (
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      )}
    </div>
  );
  
  // Hub View
  const HubView = () => {
    const stats = calculateStats();
    
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
  
  // Integrated App View (C or VSCode)
  const IntegratedAppView = () => {
    const area = studyAreas[currentArea];
    
    if (currentArea === 'clang') {
      return <CLearningSystem />;
    } else if (currentArea === 'vscode') {
      return <VSCodeLearningSystem />;
    }
    
    return null;
  };
  
  // C Learning System
  const CLearningSystem = () => {
    const progressPercentage = Math.round((completedModules.size / modulosC.length) * 100);
    
    if (currentSubView === 'notes') {
      return <CNotesView />;
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
  
  // C Notes View
  const CNotesView = () => {
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
              />
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
                <BookOpen className="w-8 h-8 text-blue-600" />
                Notas de Aprendizado
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
              Voltar ao Calendário
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
  
  // VSCode Learning System
  const VSCodeLearningSystem = () => {
    const progressPercentage = Math.round((completedVSCodeModules.size / modulosVSCode.length) * 100);
    
    if (currentSubView === 'notes') {
      return <VSCodeNotesView />;
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
                <h1 className="text-3xl font-bold text-gray-900">Sistema de Aprendizado VSCode</h1>
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
  
  // VSCode Notes View
  const VSCodeNotesView = () => {
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
  
  // Flashcard Modal
  const FlashcardModal = () => {
    if (!flashcardModalOpen || currentCards.length === 0) return null;
    
    const card = currentCards[currentCardIndex];
    
    const flipCard = () => setIsFlipped(!isFlipped);
    const nextCard = () => {
      setCurrentCardIndex((currentCardIndex + 1) % currentCards.length);
      setIsFlipped(false);
    };
    const previousCard = () => {
      setCurrentCardIndex((currentCardIndex - 1 + currentCards.length) % currentCards.length);
      setIsFlipped(false);
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setFlashcardModalOpen(false)}
              className="text-white hover:text-red-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div 
            className="relative h-96 cursor-pointer preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={flipCard}
          >
            <div className={`absolute inset-0 transition-transform duration-700 ${
              isFlipped ? 'rotate-y-180' : ''
            }`} style={{ transformStyle: 'preserve-3d' }}>
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                  {card.question}
                </h2>
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 rotate-y-180 backface-hidden bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-2xl p-8 overflow-auto"
                   style={{ transform: 'rotateY(180deg)' }}>
                <h3 className="text-xl font-bold text-orange-400 mb-4">{card.answer}</h3>
                
                {card.code && (
                  <pre className="bg-black bg-opacity-50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <code className="text-green-400 text-sm">{card.code}</code>
                  </pre>
                )}
                
                {card.details && (
                  <div className="bg-orange-900 bg-opacity-30 border-l-4 border-orange-500 p-4 rounded">
                    <p className="text-orange-100 whitespace-pre-line">{card.details}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={previousCard}
              className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all"
            >
              ← Anterior
            </button>
            <button
              onClick={flipCard}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all"
            >
              🔄 Virar
            </button>
            <button
              onClick={nextCard}
              className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all"
            >
              Próximo →
            </button>
          </div>
          
          <div className="text-center mt-4 text-white">
            Cartão {currentCardIndex + 1} de {currentCards.length}
          </div>
        </div>
      </div>
    );
  };
  
  // Main Render
  return (
    <div>
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      
      {currentView === 'hub' && <HubView />}
      {currentView === 'integrated' && <IntegratedAppView />}
      <FlashcardModal />
    </div>
  );
};

export default SistemaEducacionalCompleto;