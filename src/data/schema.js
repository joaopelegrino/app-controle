/**
 * Schema de Dados - Definição de tipos e validação
 *
 * US-004: Refatorar Estrutura de Dados
 *
 * Este arquivo define os tipos padronizados para dados de cursos,
 * fases e módulos. Serve como documentação e validação em runtime.
 *
 * @module data/schema
 */

// ============================================
// TIPOS JSDoc
// ============================================

/**
 * @typedef {Object} Phase
 * @property {number} id - ID numérico único da fase (1, 2, 3...)
 * @property {string} nome - Nome da fase (ex: "Seção 1: Fundamentos")
 * @property {string} semanas - Range de semanas (ex: "1-4")
 * @property {string} cor - Classe Tailwind para cor de fundo (ex: "bg-green-500")
 * @property {string} corClara - Classe Tailwind para cor clara (ex: "bg-green-50")
 * @property {import('lucide-react').LucideIcon} icone - Componente de ícone Lucide
 * @property {string} descricao - Descrição curta da fase
 */

/**
 * @typedef {Object} Module
 * @property {string} id - ID único do módulo (ex: "1.1", "2.3")
 * @property {string} nome - Nome do módulo
 * @property {number} semana - Número da semana (1-based)
 * @property {number} fase - ID da fase à qual pertence
 * @property {string} duracao - Duração estimada (ex: "1 semana")
 * @property {string} entregavel - Descrição do entregável esperado
 * @property {boolean} [temNotas] - Se tem conteúdo de notas disponível (opcional)
 * @property {string} [videoUrl] - URL do vídeo associado (opcional)
 * @property {string[]} [recursos] - Lista de recursos externos (opcional)
 */

/**
 * @typedef {Object} CourseData
 * @property {string} id - ID único do curso (ex: "bash", "clang")
 * @property {Phase[]} fases - Array de fases do curso
 * @property {Module[]} modulos - Array de módulos do curso
 * @property {Date} startDate - Data de início do curso
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Se os dados são válidos
 * @property {string[]} errors - Lista de erros encontrados
 * @property {string[]} warnings - Lista de avisos (não bloqueantes)
 */

// ============================================
// CONSTANTES DE VALIDAÇÃO
// ============================================

/**
 * Cores válidas para fases (Tailwind)
 * @type {string[]}
 */
export const VALID_PHASE_COLORS = [
  'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500',
  'bg-red-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-pink-500',
  'bg-teal-500', 'bg-cyan-500', 'bg-gray-500'
];

/**
 * Cores claras válidas para fases (Tailwind)
 * @type {string[]}
 */
export const VALID_PHASE_LIGHT_COLORS = [
  'bg-green-50', 'bg-blue-50', 'bg-purple-50', 'bg-orange-50',
  'bg-red-50', 'bg-indigo-50', 'bg-yellow-50', 'bg-pink-50',
  'bg-teal-50', 'bg-cyan-50', 'bg-gray-50'
];

/**
 * Padrão regex para ID de módulo (ex: "1.1", "2.3", "10.15")
 * @type {RegExp}
 */
export const MODULE_ID_PATTERN = /^\d+\.\d+$/;

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

/**
 * Valida uma fase
 * @param {Phase} phase - Fase a validar
 * @param {number} index - Índice no array (para mensagens de erro)
 * @returns {string[]} - Lista de erros (vazia se válido)
 */
export function validatePhase(phase, index) {
  const errors = [];
  const prefix = `Fase[${index}]`;

  if (typeof phase.id !== 'number' || phase.id < 1) {
    errors.push(`${prefix}: id deve ser número positivo`);
  }
  if (typeof phase.nome !== 'string' || phase.nome.trim() === '') {
    errors.push(`${prefix}: nome é obrigatório`);
  }
  if (typeof phase.semanas !== 'string' || !/^\d+-\d+$/.test(phase.semanas)) {
    errors.push(`${prefix}: semanas deve ser formato "X-Y"`);
  }
  if (!VALID_PHASE_COLORS.includes(phase.cor)) {
    errors.push(`${prefix}: cor inválida (${phase.cor})`);
  }
  if (!VALID_PHASE_LIGHT_COLORS.includes(phase.corClara)) {
    errors.push(`${prefix}: corClara inválida (${phase.corClara})`);
  }
  if (phase.icone === undefined || phase.icone === null) {
    errors.push(`${prefix}: icone é obrigatório`);
  }
  if (typeof phase.descricao !== 'string' || phase.descricao.trim() === '') {
    errors.push(`${prefix}: descricao é obrigatória`);
  }

  return errors;
}

/**
 * Valida um módulo
 * @param {Module} module - Módulo a validar
 * @param {number} index - Índice no array
 * @param {number[]} validPhaseIds - IDs de fases válidas
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function validateModule(module, index, validPhaseIds = []) {
  const errors = [];
  const warnings = [];
  const prefix = `Módulo[${index}]`;

  // Validações obrigatórias
  if (typeof module.id !== 'string' || !MODULE_ID_PATTERN.test(module.id)) {
    errors.push(`${prefix}: id deve ser string formato "X.Y" (ex: "1.1")`);
  }
  if (typeof module.nome !== 'string' || module.nome.trim() === '') {
    errors.push(`${prefix}: nome é obrigatório`);
  }
  if (typeof module.semana !== 'number' || module.semana < 1) {
    errors.push(`${prefix}: semana deve ser número positivo`);
  }
  if (typeof module.fase !== 'number' || module.fase < 1) {
    errors.push(`${prefix}: fase deve ser número positivo`);
  }
  if (validPhaseIds.length > 0 && !validPhaseIds.includes(module.fase)) {
    errors.push(`${prefix}: fase ${module.fase} não existe`);
  }
  if (typeof module.duracao !== 'string' || module.duracao.trim() === '') {
    errors.push(`${prefix}: duracao é obrigatória`);
  }
  if (typeof module.entregavel !== 'string' || module.entregavel.trim() === '') {
    errors.push(`${prefix}: entregavel é obrigatório`);
  }

  // Validações de campos opcionais (warnings)
  if (module.temNotas !== undefined && typeof module.temNotas !== 'boolean') {
    warnings.push(`${prefix}: temNotas deveria ser boolean`);
  }
  if (module.videoUrl !== undefined && typeof module.videoUrl !== 'string') {
    warnings.push(`${prefix}: videoUrl deveria ser string`);
  }
  if (module.recursos !== undefined && !Array.isArray(module.recursos)) {
    warnings.push(`${prefix}: recursos deveria ser array`);
  }

  return { errors, warnings };
}

/**
 * Valida dados completos de um curso
 * @param {Object} data - Objeto com { fases, modulos, startDate }
 * @param {string} courseId - ID do curso (para mensagens)
 * @returns {ValidationResult}
 */
export function validateCourseData(data, courseId = 'unknown') {
  const errors = [];
  const warnings = [];

  // Validar estrutura básica
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Dados inválidos ou nulos'], warnings: [] };
  }

  if (!Array.isArray(data.fases)) {
    errors.push(`[${courseId}] fases deve ser array`);
  }
  if (!Array.isArray(data.modulos)) {
    errors.push(`[${courseId}] modulos deve ser array`);
  }
  if (!(data.startDate instanceof Date) || isNaN(data.startDate)) {
    errors.push(`[${courseId}] startDate deve ser Date válido`);
  }

  // Se estrutura básica inválida, retornar cedo
  if (errors.length > 0) {
    return { valid: false, errors, warnings };
  }

  // Validar fases
  const phaseIds = [];
  data.fases.forEach((phase, i) => {
    const phaseErrors = validatePhase(phase, i);
    errors.push(...phaseErrors);
    if (phase.id) phaseIds.push(phase.id);
  });

  // Validar módulos
  const moduleIds = new Set();
  data.modulos.forEach((module, i) => {
    const { errors: modErrors, warnings: modWarnings } = validateModule(module, i, phaseIds);
    errors.push(...modErrors);
    warnings.push(...modWarnings);

    // Verificar IDs duplicados
    if (module.id && moduleIds.has(module.id)) {
      errors.push(`Módulo[${i}]: ID duplicado "${module.id}"`);
    }
    moduleIds.add(module.id);
  });

  // Verificações de consistência
  const modulePhases = new Set(data.modulos.map(m => m.fase));
  phaseIds.forEach(phaseId => {
    if (!modulePhases.has(phaseId)) {
      warnings.push(`Fase ${phaseId} não tem módulos associados`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// ============================================
// EXEMPLO DE USO
// ============================================

/**
 * Exemplo de estrutura de dados válida
 * @type {Object}
 */
export const EXAMPLE_COURSE_DATA = {
  fases: [
    {
      id: 1,
      nome: "Fase 1: Fundamentos",
      semanas: "1-4",
      cor: "bg-green-500",
      corClara: "bg-green-50",
      icone: null, // Substituir por componente Lucide
      descricao: "Conceitos básicos e fundamentos"
    }
  ],
  modulos: [
    {
      id: "1.1",
      nome: "Introdução ao Curso",
      semana: 1,
      fase: 1,
      duracao: "1 semana",
      entregavel: "Compreensão inicial do tema",
      temNotas: true
    },
    {
      id: "1.2",
      nome: "Conceitos Básicos",
      semana: 2,
      fase: 1,
      duracao: "1 semana",
      entregavel: "Aplicação dos conceitos básicos"
    }
  ],
  startDate: new Date(2025, 1, 3)
};

export default {
  validatePhase,
  validateModule,
  validateCourseData,
  VALID_PHASE_COLORS,
  VALID_PHASE_LIGHT_COLORS,
  MODULE_ID_PATTERN,
  EXAMPLE_COURSE_DATA
};
