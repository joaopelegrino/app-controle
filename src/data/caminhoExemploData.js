/**
 * Caminho de Aprendizado Exemplo
 *
 * Este arquivo define o modelo correto para "Caminhos Propostos".
 *
 * CONCEITO:
 * - Caminho Proposto = sequência ordenada de CURSOS (Áreas de Estudo)
 * - NÃO é um container de flashcards soltos
 * - Cada curso referencia uma Área de Estudo existente (ou planejada)
 * - Cursos têm ordem, disponibilidade e são clicáveis quando disponíveis
 *
 * PADRÃO:
 * - Baseado no modelo Bash (bashLearningData.js) que é a referência
 * - Cada curso tem: ordem, areaId, nome, descricao, modules, hours, disponivel
 *
 * @see docs/backlog/ROADMAP.md - US-044
 */

export const caminhoExemplo = {
  id: 'backend-developer',
  name: 'Desenvolvedor Backend',
  icon: '🛤️',
  description: 'Caminho proposto para dominar desenvolvimento backend com foco em automação e infraestrutura',
  badge: 'exemplo',

  // Sequência ordenada de cursos
  cursos: [
    {
      ordem: 1,
      areaId: 'bash',
      nome: 'Bash Shell Scripting',
      icone: '🐚',
      descricao: 'Fundamentos de linha de comando, automação e scripting robusto',
      modules: 16,
      hours: 32,
      disponivel: true,  // Único curso disponível no MVP
      destaque: 'Padrão de referência'
    },
    {
      ordem: 2,
      areaId: 'linux',
      nome: 'Linux Fundamentals',
      icone: '🐧',
      descricao: 'Sistema operacional, administração e comandos essenciais',
      modules: 12,
      hours: 24,
      disponivel: false,  // Em desenvolvimento
      destaque: null
    },
    {
      ordem: 3,
      areaId: 'docker',
      nome: 'Docker & Containers',
      icone: '🐳',
      descricao: 'Containerização, imagens, volumes e orquestração básica',
      modules: 10,
      hours: 20,
      disponivel: false,  // Em desenvolvimento
      destaque: null
    },
    {
      ordem: 4,
      areaId: 'devops',
      nome: 'DevOps Essentials',
      icone: '⚙️',
      descricao: 'CI/CD, automação de deploy e práticas modernas',
      modules: 15,
      hours: 30,
      disponivel: false,  // Em desenvolvimento
      destaque: null
    }
  ],

  // Estatísticas calculadas
  get totalCursos() {
    return this.cursos.length;
  },

  get cursosDisponiveis() {
    return this.cursos.filter(c => c.disponivel).length;
  },

  get totalModules() {
    return this.cursos.reduce((sum, c) => sum + c.modules, 0);
  },

  get totalHours() {
    return this.cursos.reduce((sum, c) => sum + c.hours, 0);
  },

  get modulesDisponiveis() {
    return this.cursos.filter(c => c.disponivel).reduce((sum, c) => sum + c.modules, 0);
  },

  get hoursDisponiveis() {
    return this.cursos.filter(c => c.disponivel).reduce((sum, c) => sum + c.hours, 0);
  }
};

/**
 * Lista de todos os caminhos disponíveis
 * No MVP, apenas o caminhoExemplo está disponível
 */
export const caminhosPropostos = {
  'backend-developer': caminhoExemplo
};

export default caminhoExemplo;
