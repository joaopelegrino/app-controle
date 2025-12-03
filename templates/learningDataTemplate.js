/**
 * TEMPLATE: Dados de Aprendizado
 *
 * COMO USAR:
 * 1. Copiar este arquivo: cp templates/learningDataTemplate.js src/data/[nome]LearningData.js
 * 2. Substituir todos os placeholders:
 *    - [NOME_MAIUSCULO] → LINUX, DOCKER, etc.
 *    - [Nome] → Linux, Docker, etc.
 *    - [nome] → linux, docker, etc.
 * 3. Ajustar número de seções (3-4 recomendado)
 * 4. Criar módulos (8-16 recomendado)
 * 5. Validar estrutura JSON
 *
 * PADRÃO BASH: Este template segue 100% a estrutura validada do Bash
 */

import { BookOpen, Terminal, Zap, Shield } from 'lucide-react';

/**
 * FASES/SEÇÕES DO CURSO
 *
 * Estrutura:
 * - id: número único (1, 2, 3, 4...)
 * - nome: "Seção X: Título Descritivo"
 * - semanas: "1-3" (duração estimada)
 * - cor: classe Tailwind (bg-blue-500, bg-green-500, etc.)
 * - icone: componente Lucide React
 * - descricao: texto curto (~50 chars)
 *
 * CORES SUGERIDAS:
 * - Seção 1: bg-blue-500 (Fundamentos)
 * - Seção 2: bg-green-500 (Prática)
 * - Seção 3: bg-purple-500 (Avançado)
 * - Seção 4: bg-red-500 (Expert)
 */
export const fases[Nome] = [
  {
    id: 1,
    nome: "Seção 1: Fundamentos de [NOME_MAIUSCULO]",
    semanas: "1-3",
    cor: "bg-blue-500",
    icone: BookOpen,
    descricao: "Conceitos básicos, instalação e primeiros passos"
  },
  {
    id: 2,
    nome: "Seção 2: Comandos e Ferramentas",
    semanas: "4-6",
    cor: "bg-green-500",
    icone: Terminal,
    descricao: "Principais comandos e ferramentas do dia a dia"
  },
  {
    id: 3,
    nome: "Seção 3: Configuração Avançada",
    semanas: "7-9",
    cor: "bg-purple-500",
    icone: Zap,
    descricao: "Otimização, scripts e automação"
  },
  {
    id: 4,
    nome: "Seção 4: Segurança e Boas Práticas",
    semanas: "10-12",
    cor: "bg-red-500",
    icone: Shield,
    descricao: "Hardening, auditoria e produção"
  }
];

/**
 * MÓDULOS/AULAS DO CURSO
 *
 * Estrutura:
 * - id: número único global (1, 2, 3...)
 * - faseId: ID da seção pai (1, 2, 3, 4)
 * - titulo: "Aula X.Y: Título Descritivo"
 * - duracao: "2h" (duração estimada)
 * - temNotas: true/false (tem página de aula detalhada?)
 * - topicos: array de strings (principais tópicos abordados)
 *
 * NOMENCLATURA:
 * - Sempre "Aula X.Y" (não "Módulo")
 * - X = número da seção
 * - Y = número dentro da seção
 * - Título claro e descritivo
 *
 * RECOMENDAÇÕES:
 * - 3-5 aulas por seção
 * - Duração: 1-3h por aula
 * - 3-5 tópicos por aula
 * - Primeiras aulas: temNotas = true (conteúdo detalhado)
 */
export const modulos[Nome] = [
  // ========== SEÇÃO 1: FUNDAMENTOS ==========
  {
    id: 1,
    faseId: 1,
    titulo: "Aula 1.1: Introdução ao [NOME_MAIUSCULO]",
    duracao: "2h",
    temNotas: true,
    topicos: [
      "O que é [NOME_MAIUSCULO] e para que serve",
      "História e evolução da tecnologia",
      "Casos de uso reais e empresas que utilizam",
      "Principais vantagens e desvantagens",
      "Instalação e configuração inicial"
    ]
  },
  {
    id: 2,
    faseId: 1,
    titulo: "Aula 1.2: Arquitetura e Conceitos Fundamentais",
    duracao: "2h",
    temNotas: false,
    topicos: [
      "Arquitetura interna do [NOME_MAIUSCULO]",
      "Componentes principais e suas funções",
      "Fluxo de dados e processamento",
      "Terminologia essencial",
      "Comparação com tecnologias similares"
    ]
  },
  {
    id: 3,
    faseId: 1,
    titulo: "Aula 1.3: Ambiente de Desenvolvimento",
    duracao: "1h30",
    temNotas: false,
    topicos: [
      "Ferramentas necessárias",
      "Configuração do ambiente (Linux/macOS/Windows)",
      "IDEs e editores recomendados",
      "Primeiro projeto prático",
      "Troubleshooting comum"
    ]
  },

  // ========== SEÇÃO 2: COMANDOS E FERRAMENTAS ==========
  {
    id: 4,
    faseId: 2,
    titulo: "Aula 2.1: Comandos Básicos",
    duracao: "2h",
    temNotas: false,
    topicos: [
      "Sintaxe básica dos comandos",
      "Flags e opções comuns",
      "Comandos de navegação",
      "Comandos de manipulação de dados",
      "Help e documentação"
    ]
  },
  {
    id: 5,
    faseId: 2,
    titulo: "Aula 2.2: Ferramentas Essenciais",
    duracao: "2h",
    temNotas: false,
    topicos: [
      "Ferramentas de debugging",
      "Ferramentas de monitoramento",
      "Ferramentas de análise de performance",
      "Ferramentas de teste",
      "Integração com CI/CD"
    ]
  },
  {
    id: 6,
    faseId: 2,
    titulo: "Aula 2.3: Workflows e Boas Práticas",
    duracao: "1h30",
    temNotas: false,
    topicos: [
      "Workflow típico de desenvolvimento",
      "Organização de projetos",
      "Versionamento e controle de mudanças",
      "Documentação e comentários",
      "Code review e qualidade"
    ]
  },

  // ========== SEÇÃO 3: CONFIGURAÇÃO AVANÇADA ==========
  {
    id: 7,
    faseId: 3,
    titulo: "Aula 3.1: Otimização de Performance",
    duracao: "2h30",
    temNotas: false,
    topicos: [
      "Profiling e identificação de bottlenecks",
      "Técnicas de otimização",
      "Caching e estratégias de armazenamento",
      "Paralelização e concorrência",
      "Benchmarking e métricas"
    ]
  },
  {
    id: 8,
    faseId: 3,
    titulo: "Aula 3.2: Scripts e Automação",
    duracao: "2h",
    temNotas: false,
    topicos: [
      "Shell scripting para automação",
      "Tasks runners e build systems",
      "Deploy automatizado",
      "Monitoramento e alertas",
      "Backup e recuperação"
    ]
  },
  {
    id: 9,
    faseId: 3,
    titulo: "Aula 3.3: Integração com Outras Tecnologias",
    duracao: "2h",
    temNotas: false,
    topicos: [
      "APIs e comunicação entre serviços",
      "Bancos de dados e persistência",
      "Message queues e event-driven",
      "Containerização e orquestração",
      "Cloud deployment"
    ]
  },

  // ========== SEÇÃO 4: SEGURANÇA E BOAS PRÁTICAS ==========
  {
    id: 10,
    faseId: 4,
    titulo: "Aula 4.1: Segurança Básica",
    duracao: "2h",
    temNotas: false,
    topicos: [
      "Princípios de segurança",
      "Autenticação e autorização",
      "Criptografia de dados",
      "Input validation e sanitização",
      "OWASP Top 10 aplicado"
    ]
  },
  {
    id: 11,
    faseId: 4,
    titulo: "Aula 4.2: Hardening e Produção",
    duracao: "2h",
    temNotas: false,
    topicos: [
      "Configuração segura de produção",
      "Firewall e network security",
      "Log management e auditoria",
      "Incident response",
      "Compliance e regulamentações"
    ]
  },
  {
    id: 12,
    faseId: 4,
    titulo: "Aula 4.3: Projeto Final e Próximos Passos",
    duracao: "3h",
    temNotas: false,
    topicos: [
      "Projeto prático completo",
      "Review de conceitos chave",
      "Recursos para aprendizado contínuo",
      "Comunidade e contribuições open source",
      "Certificações e carreira"
    ]
  }
];

/**
 * DADOS DE INÍCIO DO CURSO
 *
 * Usado para cálculo de semanas decorridas
 * Formato: ISO 8601 (YYYY-MM-DD)
 */
export const startDate[Nome] = '2025-01-01';

/**
 * FUNÇÃO AUXILIAR: Calcular data da semana
 *
 * @param {number} weekNumber - Número da semana (1, 2, 3...)
 * @param {string} startDate - Data de início (ISO 8601)
 * @returns {Date} - Data calculada
 */
export const getWeekDate = (weekNumber, startDate) => {
  const start = new Date(startDate);
  const daysToAdd = (weekNumber - 1) * 7;
  const weekDate = new Date(start);
  weekDate.setDate(start.getDate() + daysToAdd);
  return weekDate;
};

/**
 * FUNÇÃO AUXILIAR: Formatar data
 *
 * @param {Date} date - Data a formatar
 * @returns {string} - Data formatada (DD/MM/YYYY)
 */
export const formatDate = (date) => {
  return date.toLocaleDateString('pt-BR');
};

/**
 * ESTATÍSTICAS DO CURSO
 *
 * Calculadas automaticamente
 */
export const stats[Nome] = {
  totalModulos: modulos[Nome].length,
  totalFases: fases[Nome].length,
  totalHoras: modulos[Nome].reduce((acc, mod) => {
    const hours = parseInt(mod.duracao);
    return acc + (isNaN(hours) ? 0 : hours);
  }, 0),
  totalTopicos: modulos[Nome].reduce((acc, mod) => acc + mod.topicos.length, 0)
};

/*
 * ==========================================
 * INSTRUÇÕES PÓS-CRIAÇÃO
 * ==========================================
 *
 * 1. VALIDAR ESTRUTURA:
 *    - Todos IDs únicos? ✓
 *    - faseId corresponde a fase existente? ✓
 *    - Nomenclatura correta (Aula X.Y)? ✓
 *
 * 2. IMPORTAR NO COMPONENTE:
 *    import { fases[Nome], modulos[Nome], stats[Nome] } from '../data/[nome]LearningData';
 *
 * 3. TESTAR:
 *    - npm run build (deve passar)
 *    - Console sem erros
 *    - Renderização correta no sistema
 *
 * 4. PRÓXIMO ARQUIVO:
 *    - Criar [Nome]LearningSystem.jsx
 *    - Usar template: templates/LearningSystemTemplate.jsx
 */
