/**
 * Data Service - Camada de abstração para persistência de dados
 *
 * US-003: API de Dados Local
 *
 * Esta camada encapsula todas as operações de persistência, permitindo:
 * - Trocar implementação (localStorage -> API) sem alterar componentes
 * - Centralizar tratamento de erros
 * - Padronizar formato de dados
 * - Facilitar testes unitários
 *
 * Padrões implementados:
 * - Try/catch em todas operações
 * - Graceful degradation (fallback para sessionStorage)
 * - Validação de dados no load/save
 * - Timestamps automáticos
 *
 * @module services/dataService
 */

import { studyAreas } from '../data/studyAreas';
import { fasesBash, modulosBash, startDateBash } from '../data/bashLearningData';

// ============================================
// CONSTANTES E CONFIGURAÇÃO
// ============================================

const STORAGE_PREFIX = 'ultrathink';
const MAX_NOTE_SIZE_BYTES = 50 * 1024; // 50KB

/**
 * Chaves de storage por tipo de dado
 * @type {Object}
 */
const STORAGE_KEYS = {
  progress: (courseId) => `${STORAGE_PREFIX}_progress_${courseId}`,
  notes: (courseId) => `${courseId}-learning-notes`, // Compatibilidade com formato antigo
};

// ============================================
// TIPOS (JSDoc)
// ============================================

/**
 * @typedef {Object} Course
 * @property {string} id - ID único do curso
 * @property {string} name - Nome do curso
 * @property {string} icon - Emoji do curso
 * @property {string} description - Descrição curta
 * @property {'active'|'in-development'} status - Status do curso
 * @property {'integrated'|'new'|null} badge - Badge de destaque
 * @property {number} modules - Número de módulos
 * @property {number} hours - Horas estimadas
 * @property {boolean} hasIntegratedApp - Se tem sistema integrado
 */

/**
 * @typedef {Object} CourseProgress
 * @property {string[]} completedModules - IDs dos módulos completos
 * @property {string} lastUpdated - ISO timestamp da última atualização
 * @property {number} totalModules - Total de módulos no curso
 */

/**
 * @typedef {Object} NoteData
 * @property {string} content - Conteúdo da nota
 * @property {number} sizeBytes - Tamanho em bytes
 * @property {string} sizeKB - Tamanho formatado em KB
 * @property {string} percentage - Porcentagem do limite usado
 */

/**
 * @typedef {Object} SaveResult
 * @property {boolean} success - Se a operação foi bem-sucedida
 * @property {string|null} error - Mensagem de erro (se houver)
 * @property {'localStorage'|'sessionStorage'|null} storage - Onde foi salvo
 */

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Verifica se localStorage está disponível
 * @returns {boolean}
 */
function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Calcula tamanho de uma string em bytes
 * @param {string} str - String para calcular
 * @returns {{ sizeBytes: number, sizeKB: string, percentage: string }}
 */
function calculateSize(str) {
  const sizeBytes = new Blob([str]).size;
  const sizeKB = (sizeBytes / 1024).toFixed(2);
  const percentage = ((sizeBytes / MAX_NOTE_SIZE_BYTES) * 100).toFixed(1);
  return { sizeBytes, sizeKB, percentage };
}

/**
 * Tenta salvar em localStorage com fallback para sessionStorage
 * @param {string} key - Chave do storage
 * @param {string} value - Valor a salvar
 * @returns {SaveResult}
 */
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return { success: true, error: null, storage: 'localStorage' };
  } catch (error) {
    console.error(`[dataService] Erro ao salvar (${key}):`, error);

    if (error.name === 'QuotaExceededError') {
      try {
        sessionStorage.setItem(`${key}_temp`, value);
        console.warn('[dataService] Fallback: Salvo em sessionStorage');
        return { success: true, error: 'QuotaExceeded - usando sessionStorage temporário', storage: 'sessionStorage' };
      } catch (sessionError) {
        return { success: false, error: 'Storage cheio (localStorage e sessionStorage)', storage: null };
      }
    }

    if (error.name === 'SecurityError') {
      return { success: false, error: 'Modo privado - storage bloqueado', storage: null };
    }

    return { success: false, error: error.message, storage: null };
  }
}

/**
 * Tenta ler do localStorage com fallback para sessionStorage
 * @param {string} key - Chave do storage
 * @returns {string|null}
 */
function safeGetItem(key) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;

    // Tentar fallback do sessionStorage
    return sessionStorage.getItem(`${key}_temp`);
  } catch (error) {
    console.error(`[dataService] Erro ao ler (${key}):`, error);
    return null;
  }
}

// ============================================
// API PÚBLICA - CURSOS
// ============================================

/**
 * Retorna lista de todos os cursos disponíveis
 * @returns {Course[]}
 */
export function getCourses() {
  return Object.entries(studyAreas).map(([id, area]) => ({
    id,
    name: area.name,
    icon: area.icon,
    description: area.description,
    status: area.status,
    badge: area.badge || null,
    modules: area.modules,
    hours: area.hours,
    hasIntegratedApp: area.hasIntegratedApp || false,
  }));
}

/**
 * Retorna dados de um curso específico
 * @param {string} courseId - ID do curso
 * @returns {Course|null}
 */
export function getCourse(courseId) {
  const area = studyAreas[courseId];
  if (!area) return null;

  return {
    id: courseId,
    name: area.name,
    icon: area.icon,
    description: area.description,
    status: area.status,
    badge: area.badge || null,
    modules: area.modules,
    hours: area.hours,
    hasIntegratedApp: area.hasIntegratedApp || false,
    flashcards: area.flashcards || {},
  };
}

/**
 * Retorna módulos de um curso específico
 * @param {string} courseId - ID do curso
 * @returns {Object|null} - { fases, modulos, startDate }
 */
export function getCourseModules(courseId) {
  // Por enquanto, apenas bash está implementado
  if (courseId === 'bash') {
    return {
      fases: fasesBash,
      modulos: modulosBash,
      startDate: startDateBash,
    };
  }

  // Outros cursos podem ser adicionados aqui
  return null;
}

// ============================================
// API PÚBLICA - PROGRESSO
// ============================================

/**
 * Retorna progresso de um curso
 * @param {string} courseId - ID do curso
 * @returns {CourseProgress|null}
 */
export function getProgress(courseId) {
  const key = STORAGE_KEYS.progress(courseId);
  const saved = safeGetItem(key);

  if (!saved) {
    return {
      completedModules: [],
      lastUpdated: null,
      totalModules: 0,
    };
  }

  try {
    const data = JSON.parse(saved);
    return {
      completedModules: data.completedModules || [],
      lastUpdated: data.lastUpdated || null,
      totalModules: data.totalModules || 0,
    };
  } catch (error) {
    console.error(`[dataService] Erro ao parsear progresso (${courseId}):`, error);
    return {
      completedModules: [],
      lastUpdated: null,
      totalModules: 0,
    };
  }
}

/**
 * Salva progresso de um curso
 * @param {string} courseId - ID do curso
 * @param {string[]} completedModules - Array de IDs de módulos completos
 * @returns {SaveResult}
 */
export function saveProgress(courseId, completedModules) {
  const key = STORAGE_KEYS.progress(courseId);
  const data = {
    completedModules: Array.isArray(completedModules) ? completedModules : Array.from(completedModules),
    lastUpdated: new Date().toISOString(),
    totalModules: completedModules.length,
  };

  return safeSetItem(key, JSON.stringify(data));
}

/**
 * Limpa progresso de um curso
 * @param {string} courseId - ID do curso
 * @returns {boolean} - Se foi removido com sucesso
 */
export function clearProgress(courseId) {
  const key = STORAGE_KEYS.progress(courseId);
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(`${key}_temp`);
    return true;
  } catch (error) {
    console.error(`[dataService] Erro ao limpar progresso (${courseId}):`, error);
    return false;
  }
}

// ============================================
// API PÚBLICA - NOTAS
// ============================================

/**
 * Retorna notas de um curso
 * @param {string} courseId - ID do curso
 * @returns {NoteData}
 */
export function getNotes(courseId) {
  const key = STORAGE_KEYS.notes(courseId);
  const content = safeGetItem(key) || '';
  const size = calculateSize(content);

  return {
    content,
    ...size,
  };
}

/**
 * Salva notas de um curso
 * @param {string} courseId - ID do curso
 * @param {string} content - Conteúdo da nota
 * @returns {SaveResult & { sizeInfo: { sizeBytes: number, sizeKB: string, percentage: string } }}
 */
export function saveNotes(courseId, content) {
  const key = STORAGE_KEYS.notes(courseId);
  const sizeInfo = calculateSize(content);

  // Validar tamanho antes de salvar
  if (sizeInfo.sizeBytes > MAX_NOTE_SIZE_BYTES) {
    return {
      success: false,
      error: `Nota excede limite de 50KB (atual: ${sizeInfo.sizeKB} KB)`,
      storage: null,
      sizeInfo,
    };
  }

  const result = safeSetItem(key, content);
  return { ...result, sizeInfo };
}

/**
 * Limpa notas de um curso
 * @param {string} courseId - ID do curso
 * @returns {boolean}
 */
export function clearNotes(courseId) {
  const key = STORAGE_KEYS.notes(courseId);
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(`${key}_temp`);
    return true;
  } catch (error) {
    console.error(`[dataService] Erro ao limpar notas (${courseId}):`, error);
    return false;
  }
}

// ============================================
// API PÚBLICA - UTILITÁRIOS
// ============================================

/**
 * Verifica se storage está disponível
 * @returns {boolean}
 */
export function checkStorageAvailable() {
  return isStorageAvailable();
}

/**
 * Retorna estatísticas de uso do storage
 * @returns {{ used: number, available: boolean }}
 */
export function getStorageStats() {
  if (!isStorageAvailable()) {
    return { used: 0, available: false };
  }

  let totalSize = 0;
  try {
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage.getItem(key).length * 2; // UTF-16
      }
    }
  } catch (error) {
    console.error('[dataService] Erro ao calcular uso de storage:', error);
  }

  return {
    used: totalSize,
    usedKB: (totalSize / 1024).toFixed(2),
    usedMB: (totalSize / (1024 * 1024)).toFixed(2),
    available: true,
  };
}

// ============================================
// EXPORTAÇÃO COMO OBJETO (alternativa)
// ============================================

export const dataService = {
  // Cursos
  getCourses,
  getCourse,
  getCourseModules,

  // Progresso
  getProgress,
  saveProgress,
  clearProgress,

  // Notas
  getNotes,
  saveNotes,
  clearNotes,

  // Utilitários
  checkStorageAvailable,
  getStorageStats,
};

export default dataService;
