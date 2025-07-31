import { Zap, FileJson } from 'lucide-react';

export const topicosVSCode = [
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

export const modulosVSCode = [
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

export const startDateVSCode = new Date(2025, 6, 30); // July 30, 2025