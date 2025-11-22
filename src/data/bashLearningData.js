import { Terminal, FileText, Settings, Zap } from 'lucide-react';

export const fasesBash = [
  {
    id: 1,
    nome: "Seção 1: Fundamentos Shell Scripting",
    semanas: "1-4",
    cor: "bg-green-500",
    corClara: "bg-green-50",
    icone: Terminal,
    descricao: "História, filosofia software tools e scripts básicos"
  },
  {
    id: 2,
    nome: "Seção 2: Processamento de Texto",
    semanas: "5-8",
    cor: "bg-blue-500",
    corClara: "bg-blue-50",
    icone: FileText,
    descricao: "Regex, manipulação de texto e pipelines avançados"
  },
  {
    id: 3,
    nome: "Seção 3: Recursos Avançados",
    semanas: "9-12",
    cor: "bg-purple-500",
    corClara: "bg-purple-50",
    icone: Settings,
    descricao: "Variáveis, loops, funções e scripting robusto"
  },
  {
    id: 4,
    nome: "Seção 4: Ferramentas e Práticas",
    semanas: "13-16",
    cor: "bg-orange-500",
    corClara: "bg-orange-50",
    icone: Zap,
    descricao: "Sinais, subshells, ferramentas de arquivos"
  }
];

export const modulosBash = [
  // Seção 1 - Fundamentos
  { 
    id: '1.1', 
    nome: 'Introdução ao Curso + História Unix/Linux', 
    semana: 1, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Compreensão da história e contexto do shell scripting',
    temNotas: true 
  },
  { 
    id: '1.2', 
    nome: 'Filosofia Software Tools - Parte 1', 
    semana: 2, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Aplicação dos princípios: fazer uma coisa bem, processar texto' 
  },
  { 
    id: '1.3', 
    nome: 'Filosofia Software Tools - Parte 2', 
    semana: 3, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Domínio de pipelines e combinação de ferramentas' 
  },
  { 
    id: '1.4', 
    nome: 'Scripts Auto-Contidos (#!) + Primeiros Scripts', 
    semana: 4, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Criação de scripts executáveis com shebang' 
  },
  
  // FASE 2 - Processamento de Texto
  { 
    id: '2.1', 
    nome: 'Redirecionamento I/O + Variáveis Básicas', 
    semana: 5, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Scripts com redirecionamento e variáveis' 
  },
  { 
    id: '2.2', 
    nome: 'Processamento de Texto Simples', 
    semana: 6, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Manipulação básica com cut, sort, uniq' 
  },
  { 
    id: '2.3', 
    nome: 'Expressões Regulares (Regex)', 
    semana: 7, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Scripts usando grep, sed com regex básicas e estendidas' 
  },
  { 
    id: '2.4', 
    nome: 'Substituições + Expansão de Nomes (Globbing)', 
    semana: 8, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Scripts com wildcards e substituições avançadas' 
  },
  
  // FASE 3 - Recursos Avançados
  { 
    id: '3.1', 
    nome: 'Campos + Ordenação (sort)', 
    semana: 9, 
    fase: 3, 
    duracao: '1 semana', 
    entregavel: 'Scripts de processamento estruturado de dados' 
  },
  { 
    id: '3.2', 
    nome: 'Pipeline Avançado (Projeto Prático)', 
    semana: 10, 
    fase: 3, 
    duracao: '1 semana', 
    entregavel: 'Pipeline complexo integrando todas as ferramentas' 
  },
  { 
    id: '3.3', 
    nome: 'Variáveis + Aritmética', 
    semana: 11, 
    fase: 3, 
    duracao: '1 semana', 
    entregavel: 'Scripts com cálculos e manipulação de variáveis' 
  },
  { 
    id: '3.4', 
    nome: 'Status de Saída + Tomada de Decisões', 
    semana: 12, 
    fase: 3, 
    duracao: '1 semana', 
    entregavel: 'Scripts com estruturas condicionais robustas' 
  },
  
  // FASE 4 - Ferramentas e Práticas
  { 
    id: '4.1', 
    nome: 'Loops (while, until, for)', 
    semana: 13, 
    fase: 4, 
    duracao: '1 semana', 
    entregavel: 'Scripts com estruturas de repetição' 
  },
  { 
    id: '4.2', 
    nome: 'I/O com read + Manipulação File Descriptors', 
    semana: 14, 
    fase: 4, 
    duracao: '1 semana', 
    entregavel: 'Scripts interativos com entrada do usuário' 
  },
  { 
    id: '4.3', 
    nome: 'Substituição de Comando + Subshells + Funções', 
    semana: 15, 
    fase: 4, 
    duracao: '1 semana', 
    entregavel: 'Scripts modulares com funções reutilizáveis' 
  },
  { 
    id: '4.4', 
    nome: 'Sinais + Ferramentas de Arquivos + Projeto Final', 
    semana: 16, 
    fase: 4, 
    duracao: '1 semana', 
    entregavel: 'Script robusto com tratamento de erros e sinais' 
  }
];

export const startDateBash = new Date(2025, 1, 3); // February 3, 2025