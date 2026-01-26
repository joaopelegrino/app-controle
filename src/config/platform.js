/**
 * Configuração da Plataforma - White Label
 *
 * Este arquivo centraliza todas as configurações de branding
 * e pode ser sobrescrito por variáveis de ambiente.
 *
 * @version 1.0.0
 * @since Sprint 13 (White-Label Refactor)
 */

// Configuração base (pode ser sobrescrita por .env)
const DEFAULT_CONFIG = {
  // Identidade da plataforma
  platform: {
    name: import.meta.env.VITE_PLATFORM_NAME || 'Plataforma de Treinamento B2B',
    shortName: import.meta.env.VITE_PLATFORM_SHORT_NAME || 'TrainB2B',
    tagline: import.meta.env.VITE_PLATFORM_TAGLINE || 'Treinamento Corporativo Inteligente',
    copyright: import.meta.env.VITE_PLATFORM_COPYRIGHT || '© 2026 - Treinamento Corporativo',
    version: import.meta.env.VITE_PLATFORM_VERSION || '1.0.0',
  },

  // Prefixos para storage (localStorage/sessionStorage)
  storage: {
    prefix: import.meta.env.VITE_STORAGE_PREFIX || 'trainb2b',
    keys: {
      auth: 'auth',
      user: 'user',
      token: 'api_token',
      refreshToken: 'refresh_token',
      tableIds: 'table_ids',
      language: 'language',
      onboarding: 'onboarding',
      progress: (courseId) => `progress_${courseId}`,
      notes: (courseId) => `notes_${courseId}`,
    }
  },

  // URLs e endpoints
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },

  // Configurações de UI
  ui: {
    defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'pt-BR',
    supportedLanguages: ['pt-BR', 'en-US', 'es-ES'],
  },
};

/**
 * Helper para construir chaves de storage com prefixo
 * @param {string} key - Nome da chave (sem prefixo)
 * @returns {string} Chave completa com prefixo (ex: trainb2b_auth)
 */
export const getStorageKey = (key) => {
  const prefix = DEFAULT_CONFIG.storage.prefix;
  return `${prefix}_${key}`;
};

/**
 * Helper para chave de progresso de curso
 * @param {string} courseId - ID do curso
 * @returns {string} Chave completa (ex: trainb2b_progress_bash)
 */
export const getProgressKey = (courseId) => {
  return getStorageKey(DEFAULT_CONFIG.storage.keys.progress(courseId));
};

/**
 * Helper para chave de notas de curso
 * @param {string} courseId - ID do curso
 * @returns {string} Chave completa (ex: trainb2b_notes_bash)
 */
export const getNotesKey = (courseId) => {
  return getStorageKey(DEFAULT_CONFIG.storage.keys.notes(courseId));
};

/**
 * Obter configuração específica
 * @param {string} path - Caminho dot notation (ex: 'platform.name')
 * @param {*} defaultValue - Valor default se não encontrado
 * @returns {*} Valor da configuração
 */
export const getConfig = (path, defaultValue = null) => {
  const keys = path.split('.');
  let value = DEFAULT_CONFIG;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value;
};

// Exportar configuração completa
export const platformConfig = DEFAULT_CONFIG;
export default platformConfig;
