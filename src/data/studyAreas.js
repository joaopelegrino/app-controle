/**
 * Áreas de Estudo - MVP Simplificado (US-044)
 *
 * Este arquivo contém apenas as áreas que seguem o padrão estabelecido.
 * No MVP, apenas BASH está ativo como referência de implementação correta.
 *
 * PADRÃO DE ÁREA DE ESTUDO:
 * - name: Nome do curso
 * - icon: Emoji representativo
 * - description: Descrição curta
 * - status: 'active' | 'in-development'
 * - badge: 'integrated' | 'new' | null
 * - modules: Número de módulos
 * - hours: Horas estimadas
 * - hasIntegratedApp: true se tem sistema integrado (LearningSystem)
 * - flashcards: Objeto com categorias de flashcards
 *
 * @see docs/backlog/ROADMAP.md - US-044
 * @see bashLearningData.js - Padrão de referência para módulos
 */

export const studyAreas = {
  // ============================================
  // ÁREA ATIVA - PADRÃO DE REFERÊNCIA
  // ============================================

  bash: {
    name: 'Bash',
    icon: '🐚',
    description: 'Shell scripting, automação e linha de comando',
    status: 'active',
    badge: 'integrated',
    modules: 16,
    hours: 32,
    hasIntegratedApp: true,
    flashcards: {
      basics: {
        name: 'Fundamentos',
        cards: [
          {
            question: 'Como criar uma variável em Bash?',
            answer: 'VARIAVEL="valor" (sem espaços ao redor do =)',
            code: 'NAME="Developer"\necho $NAME\n# ou\necho ${NAME}',
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
  }

  // ============================================
  // ÁREAS COMENTADAS - NÃO SEGUEM PADRÃO BASH
  // Serão reativadas após padronização (US-043)
  // ============================================

  /*
  linux: {
    name: 'Linux',
    icon: '🐧',
    description: 'Sistema operacional, comandos e administração',
    status: 'in-development',
    modules: 12,
    hours: 24,
    flashcards: { ... }
  },

  servers: {
    name: 'Servidores',
    icon: '🖥️',
    description: 'Web servers, configuração e otimização',
    status: 'in-development',
    modules: 10,
    hours: 20,
    flashcards: { ... }
  },

  devops: {
    name: 'DevOps',
    icon: '⚙️',
    description: 'CI/CD, automação e práticas modernas',
    status: 'in-development',
    modules: 15,
    hours: 30,
    flashcards: { ... }
  },

  cryptography: {
    name: 'Criptografia',
    icon: '🔐',
    description: 'Algoritmos, protocolos e segurança de dados',
    status: 'in-development',
    modules: 8,
    hours: 16,
    flashcards: { ... }
  },

  security: {
    name: 'Segurança',
    icon: '🛡️',
    description: 'Pentest, hardening e proteção de sistemas',
    status: 'in-development',
    modules: 12,
    hours: 24,
    flashcards: { ... }
  },

  clang: {
    name: 'Linguagem C',
    icon: '🔨',
    description: 'Programação em C do básico ao avançado',
    status: 'active',
    badge: 'integrated',
    modules: 50,
    hours: 100,
    hasIntegratedApp: true,
    // NOTA: Não segue padrão Bash - precisa refatoração
    flashcards: { ... }
  },

  docker: {
    name: 'Docker',
    icon: '🐳',
    description: 'Containers, imagens e orquestração',
    status: 'in-development',
    modules: 10,
    hours: 20,
    flashcards: { ... }
  },

  kubernetes: {
    name: 'Kubernetes',
    icon: '☸️',
    description: 'Orquestração de containers em escala',
    status: 'in-development',
    modules: 15,
    hours: 30,
    flashcards: { ... }
  },

  vscode: {
    name: 'VS Code WSL',
    icon: '💻',
    description: 'Desenvolvimento integrado com WSL2',
    status: 'active',
    badge: 'integrated',
    modules: 8,
    hours: 16,
    hasIntegratedApp: true,
    // NOTA: Não segue padrão Bash - precisa refatoração
    flashcards: { ... }
  },

  claudecode: {
    name: 'Claude Code',
    icon: '🤖',
    description: 'Ferramenta CLI da Anthropic para desenvolvimento assistido por IA',
    status: 'active',
    badge: 'new',
    modules: 12,
    hours: 120,
    hasIntegratedApp: true,
    // NOTA: Não segue padrão Bash - precisa refatoração
    flashcards: { ... }
  },

  rustprogramming: {
    name: 'Sistemas de Aprendizado Rust',
    icon: '🦀',
    description: 'Curso completo de Rust Programming',
    status: 'active',
    badge: 'integrated',
    modules: 24,
    hours: 120,
    hasIntegratedApp: true,
    // NOTA: Não segue padrão Bash - precisa refatoração
    flashcards: { ... }
  },

  rust: {
    name: 'Rust',
    icon: '🦀',
    description: 'Caminho completo de aprendizado em desenvolvimento moderno',
    status: 'active',
    badge: 'new',
    modules: 35,
    hours: 140,
    isLearningPath: true,
    // NOTA: Modelo antigo de Learning Path com flashcards soltos
    // Substituído pelo novo modelo em caminhoExemploData.js
    flashcards: { ... }
  }
  */
};
