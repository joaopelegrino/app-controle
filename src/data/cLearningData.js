import { Code, BookOpen } from 'lucide-react';

export const fasesC = [
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

export const modulosC = [
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
  },
  // FASE 2 - Módulos
  { 
    id: '2.1', 
    nome: 'HTTP/3 Protocol + Performance Optimization', 
    semana: 9, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'HTTP/3 server setup + benchmark tests' 
  },
  { 
    id: '2.2', 
    nome: 'Zero Trust Architecture + Security Implementation', 
    semana: 10, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Zero trust security model + authentication' 
  },
  { 
    id: '2.3', 
    nome: 'Frontend Framework + Responsive Design', 
    semana: 11, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Modern frontend with responsive layouts' 
  },
  { 
    id: '2.4', 
    nome: 'Database Integration + API Development', 
    semana: 12, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'RESTful API + database connection' 
  },
  { 
    id: '2.5', 
    nome: 'Content Management + Dynamic Pages', 
    semana: 13, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'CMS implementation + dynamic content' 
  },
  { 
    id: '2.6', 
    nome: 'SEO Optimization + Analytics Integration', 
    semana: 14, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'SEO-optimized site + analytics tracking' 
  },
  { 
    id: '2.7', 
    nome: 'Performance Testing + Load Balancing', 
    semana: 15, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Performance tests + load balancer setup' 
  },
  { 
    id: '2.8', 
    nome: 'Deployment + Monitoring + Maintenance', 
    semana: 16, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Production deployment + monitoring dashboard' 
  }
];

export const startDateC = new Date(2025, 6, 28); // July 28, 2025