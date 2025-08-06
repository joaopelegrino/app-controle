import { Zap, Building } from 'lucide-react';

export const fasesRust = [
  {
    id: 1,
    nome: "FASE 1: FUNDAMENTOS RUST PROGRAMMING",
    semanas: "1-12",
    cor: "bg-orange-500",
    corClara: "bg-orange-50",
    icone: Zap,
    descricao: "Curso completo Rust - Do básico aos conceitos avançados (34 módulos)"
  },
  {
    id: 2,
    nome: "FASE 2: PROJETO AVANÇADO RUST + SISTEMAS",
    semanas: "13-24",
    cor: "bg-red-500", 
    corClara: "bg-red-50",
    icone: Building,
    descricao: "Desenvolvimento de sistemas completos e projetos práticos"
  }
];

export const modulosRust = [
  // FASE 1 - Semana 1-2: Fundamentos Básicos
  { 
    id: '1.1', 
    nome: 'Introduction & Learning Resources + Variables', 
    semana: 1, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Setup Rust + rustup + primeiro programa "Hello World" + variáveis',
    temNotas: true 
  },
  { 
    id: '1.2', 
    nome: 'Numbers & Binary System + Chars & Bools', 
    semana: 2, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Programas usando tipos numéricos + chars + booleanos' 
  },
  
  // FASE 1 - Semana 3: Estruturas Básicas
  { 
    id: '1.3', 
    nome: 'Statements & Expressions + Functions', 
    semana: 3, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Funções modulares + diferenciação statements/expressions' 
  },
  
  // FASE 1 - Semana 4-5: Sistema de Memória
  { 
    id: '1.4', 
    nome: 'Ownership + Move Semantics', 
    semana: 4, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Programas demonstrando ownership + move semantics' 
  },
  { 
    id: '1.5', 
    nome: 'Borrowing + References', 
    semana: 5, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Referencias imutáveis/mutáveis + regras de borrowing' 
  },
  
  // FASE 1 - Semana 6: Strings e Slices  
  { 
    id: '1.6', 
    nome: 'String vs &str + Slices', 
    semana: 6, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Manipulação de strings + array/vector slices' 
  },
  
  // FASE 1 - Semana 7-8: Estruturas de Dados
  { 
    id: '1.7', 
    nome: 'Tuples + Structs + Methods', 
    semana: 7, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Structs com methods + associated functions' 
  },
  { 
    id: '1.8', 
    nome: 'Enums + Option + Pattern Matching', 
    semana: 8, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Enums customizados + match expressions + Option' 
  },
  
  // FASE 1 - Semana 9: Controle de Fluxo
  { 
    id: '1.9', 
    nome: 'Flow Control + Pattern Match Advanced', 
    semana: 9, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Loops + guards + if let + while let' 
  },
  
  // FASE 1 - Semana 10-11: Generics e Traits
  { 
    id: '1.10', 
    nome: 'Generics + Type Parameters', 
    semana: 10, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Generic functions + structs + enums' 
  },
  { 
    id: '1.11', 
    nome: 'Traits + Trait Objects + Associated Types', 
    semana: 11, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Traits customizados + dynamic dispatch + associated types' 
  },
  
  // FASE 1 - Semana 12: Collections e Erros
  { 
    id: '1.12', 
    nome: 'Collections + Error Handling + Result', 
    semana: 12, 
    fase: 1, 
    duracao: '1 semana', 
    entregavel: 'Vec + HashMap + Result<T,E> + ? operator' 
  },
  
  // FASE 2 - Semana 13-14: Tipos Avançados
  { 
    id: '2.1', 
    nome: 'Type Coercion + From/Into + String Manipulation', 
    semana: 13, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Conversões customizadas + manipulação avançada de strings' 
  },
  { 
    id: '2.2', 
    nome: 'panic! + Advanced Error Handling', 
    semana: 14, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Estratégias de error handling + custom error types' 
  },
  
  // FASE 2 - Semana 15-16: Módulos e Debug
  { 
    id: '2.3', 
    nome: 'Cargo + Crates + Modules + pub', 
    semana: 15, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Projeto multi-módulo + external crates + biblioteca' 
  },
  { 
    id: '2.4', 
    nome: 'Debug + Display + Formatting', 
    semana: 16, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Traits Debug/Display + macros fmt customizados' 
  },
  
  // FASE 2 - Semana 17-19: Lifetimes
  { 
    id: '2.5', 
    nome: 'Lifetimes + Lifetime Annotations', 
    semana: 17, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Funções com lifetime parameters + structs com refs' 
  },
  { 
    id: '2.6', 
    nome: 'Lifetime Elision + Advanced Lifetimes', 
    semana: 18, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Lifetime elision rules + casos complexos' 
  },
  { 
    id: '2.7', 
    nome: 'Closures + Capturing Environment', 
    semana: 19, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Closures + Fn/FnMut/FnOnce traits + capturing modes' 
  },
  
  // FASE 2 - Semana 20-21: Iterators e Concorrência
  { 
    id: '2.8', 
    nome: 'Iterators + Iterator Adaptors + collect()', 
    semana: 20, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Iterator trait + adaptors customizados + performance' 
  },
  { 
    id: '2.9', 
    nome: 'Threads + Arc + Mutex + Channels', 
    semana: 21, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Programas concurrent + shared state + message passing' 
  },
  
  // FASE 2 - Semana 22-24: Projetos Avançados
  { 
    id: '2.10', 
    nome: 'Async/Await + Futures + Tokio', 
    semana: 22, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Aplicação async + HTTP client/server + runtime' 
  },
  { 
    id: '2.11', 
    nome: 'WebAssembly + FFI + Unsafe Rust', 
    semana: 23, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Módulo WASM + integração C + unsafe blocks' 
  },
  { 
    id: '2.12', 
    nome: 'Projeto Final: Sistema Completo', 
    semana: 24, 
    fase: 2, 
    duracao: '1 semana', 
    entregavel: 'Aplicação completa integrando todos os conceitos' 
  }
];

export const startDateRust = new Date(2025, 8, 1); // September 1, 2025