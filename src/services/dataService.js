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
import { apiService } from './apiService';
import { getProgressKey, getNotesKey } from '../config/platform';

// ============================================
// CONSTANTES E CONFIGURAÇÃO
// ============================================

const MAX_NOTE_SIZE_BYTES = 50 * 1024; // 50KB

/**
 * Chaves de storage por tipo de dado
 * @type {Object}
 */
const STORAGE_KEYS = {
  progress: (courseId) => getProgressKey(courseId),
  notes: (courseId) => getNotesKey(courseId),
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
 * Retorna módulos de um curso específico (versão síncrona)
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
// API PÚBLICA - CURSOS (ASYNC COM API)
// ============================================

/**
 * Retorna lista de cursos da API com fallback para dados estáticos
 * US-071: Carregar cursos da API
 * @returns {Promise<Course[]>}
 */
export async function getCoursesAsync() {
  try {
    const apiCourses = await apiService.getCourses();
    if (apiCourses && apiCourses.length > 0) {
      return apiCourses.map((course) => ({
        id: course.id,
        name: course.name,
        icon: course.icon || studyAreas[course.id]?.icon || '📚',
        description: course.description || studyAreas[course.id]?.description || '',
        status: course.status || 'active',
        badge: course.badge || studyAreas[course.id]?.badge || null,
        modules: course.total_modules || studyAreas[course.id]?.modules || 0,
        hours: course.duration_hours || studyAreas[course.id]?.hours || 0,
        hasIntegratedApp: course.status === 'active',
        flashcards: studyAreas[course.id]?.flashcards || {},
      }));
    }
  } catch (error) {
    console.warn('[dataService] API indisponível para cursos:', error.message);
  }

  // Fallback: dados estáticos
  return getCourses();
}

/**
 * Retorna dados de um curso da API com fallback
 * @param {string} courseId - ID do curso
 * @returns {Promise<Course|null>}
 */
export async function getCourseAsync(courseId) {
  try {
    const apiCourse = await apiService.getCourse(courseId);
    if (apiCourse) {
      const staticData = studyAreas[courseId] || {};
      return {
        id: apiCourse.id,
        name: apiCourse.name,
        icon: apiCourse.icon || staticData.icon || '📚',
        description: apiCourse.description || staticData.description || '',
        status: apiCourse.status || 'active',
        badge: apiCourse.badge || staticData.badge || null,
        modules: apiCourse.total_modules || staticData.modules || 0,
        hours: apiCourse.duration_hours || staticData.hours || 0,
        hasIntegratedApp: apiCourse.status === 'active',
        flashcards: staticData.flashcards || {},
      };
    }
  } catch (error) {
    console.warn('[dataService] API indisponível para curso:', error.message);
  }

  // Fallback
  return getCourse(courseId);
}

/**
 * Retorna módulos e fases de um curso da API com fallback
 * @param {string} courseId - ID do curso
 * @returns {Promise<Object|null>} - { fases, modulos }
 */
export async function getCourseModulesAsync(courseId) {
  try {
    const [apiModules, apiPhases] = await Promise.all([
      apiService.getCourseModules(courseId),
      apiService.getCoursePhases(courseId),
    ]);

    if (apiModules?.length > 0 || apiPhases?.length > 0) {
      // Mapear módulos da API para formato local
      const modulos = (apiModules || []).map((mod, index) => ({
        id: mod.id,
        titulo: mod.name,
        semana: mod.week || index + 1,
        duracao: mod.duration || '2h',
        entregavel: mod.deliverable || '',
        temCaderno: mod.has_notes || false,
        fase: mod.phase_id || null,
      }));

      // Mapear fases da API para formato local
      const fases = (apiPhases || []).map((phase, index) => ({
        id: phase.id,
        titulo: phase.name,
        semanas: phase.weeks || '',
        cor: phase.color || 'gray-500',
        corClara: phase.light_color || 'gray-100',
        icone: phase.icon || '📚',
        descricao: phase.description || '',
      }));

      return { fases, modulos };
    }
  } catch (error) {
    console.warn('[dataService] API indisponível para módulos:', error.message);
  }

  // Fallback
  return getCourseModules(courseId);
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
 * Retorna notas de um curso (API + fallback localStorage)
 * @param {string} courseId - ID do curso
 * @param {string} [userId] - ID do usuário (opcional, para API)
 * @returns {Promise<NoteData>}
 */
export async function getNotes(courseId, userId = null) {
  const key = STORAGE_KEYS.notes(courseId);

  // Se tiver userId, tentar API primeiro
  if (userId) {
    try {
      const apiData = await apiService.getNotes(userId, courseId);
      if (apiData.content) {
        const size = calculateSize(apiData.content);
        // Salvar no localStorage como cache
        safeSetItem(key, apiData.content);
        return { content: apiData.content, ...size };
      }
    } catch (error) {
      console.warn('[dataService] API indisponível para notas, usando localStorage:', error.message);
    }
  }

  // Fallback: localStorage
  const content = safeGetItem(key) || '';
  const size = calculateSize(content);
  return { content, ...size };
}

/**
 * Versão síncrona para compatibilidade (apenas localStorage)
 * @param {string} courseId - ID do curso
 * @returns {NoteData}
 */
export function getNotesSync(courseId) {
  const key = STORAGE_KEYS.notes(courseId);
  const content = safeGetItem(key) || '';
  const size = calculateSize(content);
  return { content, ...size };
}

/**
 * Salva notas de um curso (API + localStorage)
 * @param {string} courseId - ID do curso
 * @param {string} content - Conteúdo da nota
 * @param {string} [userId] - ID do usuário (opcional, para API)
 * @param {string} [companyId] - ID da empresa (opcional, para API)
 * @returns {Promise<SaveResult & { sizeInfo: object }>}
 */
export async function saveNotes(courseId, content, userId = null, companyId = null) {
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

  // Sempre salvar no localStorage (offline-first)
  const localResult = safeSetItem(key, content);

  // Se tiver userId e companyId, salvar na API também
  if (userId && companyId) {
    try {
      await apiService.saveNotes(userId, companyId, courseId, content);
      return { ...localResult, sizeInfo, syncedToApi: true };
    } catch (error) {
      console.warn('[dataService] Erro ao sincronizar notas com API:', error.message);
      return { ...localResult, sizeInfo, syncedToApi: false, syncError: error.message };
    }
  }

  return { ...localResult, sizeInfo, syncedToApi: false };
}

/**
 * Versão síncrona para compatibilidade (apenas localStorage)
 * @param {string} courseId - ID do curso
 * @param {string} content - Conteúdo da nota
 * @returns {SaveResult & { sizeInfo: object }}
 */
export function saveNotesSync(courseId, content) {
  const key = STORAGE_KEYS.notes(courseId);
  const sizeInfo = calculateSize(content);

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
  // Cursos (sync - dados estáticos)
  getCourses,
  getCourse,
  getCourseModules,

  // Cursos (async - API + fallback)
  getCoursesAsync,
  getCourseAsync,
  getCourseModulesAsync,

  // Progresso
  getProgress,
  saveProgress,
  clearProgress,

  // Notas (async com API)
  getNotes,
  saveNotes,
  clearNotes,

  // Notas (sync apenas localStorage)
  getNotesSync,
  saveNotesSync,

  // Utilitários
  checkStorageAvailable,
  getStorageStats,
};

export default dataService;
