/**
 * API Service - Camada de comunicação com NocoDB
 *
 * US-068: Criar apiService.js para NocoDB
 *
 * Esta camada encapsula todas as operações de comunicação com o backend NocoDB:
 * - Autenticação via JWT
 * - CRUD para progresso de usuários
 * - CRUD para notas de estudo
 * - Fallback para localStorage quando offline
 *
 * @module services/apiService
 */

// ============================================
// CONFIGURAÇÃO
// ============================================

const API_CONFIG = {
  // Em dev, usa proxy do Vite (/api -> localhost:8080)
  // Em prod, usa URL direta ou variável de ambiente
  baseUrl: import.meta.env.VITE_API_URL || '',
  baseId: import.meta.env.VITE_API_BASE_ID || 'phzot4i2zcjwgif',
  timeout: 10000,
};

const STORAGE_KEYS = {
  token: 'ultrathink_api_token',
  refreshToken: 'ultrathink_refresh_token',
  user: 'ultrathink_user',
  tableIds: 'ultrathink_table_ids',
};

// Cache de table IDs (nome -> id)
let tableIdsCache = null;

// Credenciais do admin NocoDB (para demo)
const NOCODB_ADMIN = {
  email: 'admin@ultrathink.com',
  password: 'UltraThink@Admin2026!',
};

// Flag de inicialização
let isInitialized = false;

// ============================================
// HELPERS
// ============================================

/**
 * Recupera o token JWT do localStorage
 * @returns {string|null}
 */
function getToken() {
  try {
    return localStorage.getItem(STORAGE_KEYS.token);
  } catch {
    return null;
  }
}

/**
 * Salva o token JWT no localStorage
 * @param {string} token
 */
function setToken(token) {
  try {
    localStorage.setItem(STORAGE_KEYS.token, token);
  } catch (error) {
    console.error('[apiService] Erro ao salvar token:', error);
  }
}

/**
 * Remove o token JWT do localStorage
 */
function clearToken() {
  try {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.user);
  } catch (error) {
    console.error('[apiService] Erro ao limpar token:', error);
  }
}

/**
 * Monta headers padrão para requisições
 * @param {boolean} authenticated - Se deve incluir token
 * @returns {HeadersInit}
 */
function getHeaders(authenticated = true) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (authenticated) {
    const token = getToken();
    if (token) {
      headers['xc-auth'] = token;
    }
  }

  return headers;
}

/**
 * Executa uma requisição HTTP com timeout e tratamento de erros
 * @param {string} endpoint - Endpoint relativo
 * @param {RequestInit} options - Opções do fetch
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...getHeaders(options.authenticated !== false),
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(
        error.message || `HTTP ${response.status}`,
        response.status,
        error
      );
    }

    // Algumas respostas não têm body (204 No Content)
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new ApiError('Timeout na requisição', 408);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    // Erro de rede (offline)
    throw new ApiError('Erro de conexão com o servidor', 0, { offline: true });
  }
}

/**
 * Classe de erro customizada para API
 */
class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.isOffline = data.offline === true;
  }
}

// ============================================
// AUTENTICAÇÃO
// ============================================

/**
 * Realiza login no NocoDB
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function login(email, password) {
  const response = await request('/api/v1/auth/user/signin', {
    method: 'POST',
    authenticated: false,
    body: JSON.stringify({ email, password }),
  });

  if (response.token) {
    setToken(response.token);
  }

  return response;
}

/**
 * Busca dados do usuário autenticado
 * @returns {Promise<object>}
 */
export async function getCurrentUser() {
  return await request('/api/v1/auth/user/me');
}

/**
 * Realiza logout
 */
export function logout() {
  clearToken();
  tableIdsCache = null;
}

/**
 * Verifica se usuário está autenticado (tem token válido)
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}

// ============================================
// NOCODB TABLE ID MANAGEMENT
// ============================================

/**
 * Busca e cacheia os IDs das tabelas do NocoDB
 * @returns {Promise<object>}
 */
async function loadTableIds() {
  if (tableIdsCache) {
    return tableIdsCache;
  }

  // Tentar carregar do localStorage primeiro
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.tableIds);
    if (cached) {
      const parsed = JSON.parse(cached);
      // Cache válido por 1 hora
      if (parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
        tableIdsCache = parsed.ids;
        return tableIdsCache;
      }
    }
  } catch {
    // Ignorar erro de parse
  }

  // Garantir que está autenticado no NocoDB
  if (!getToken()) {
    console.log('[apiService] Autenticando no NocoDB...');
    await login(NOCODB_ADMIN.email, NOCODB_ADMIN.password);
  }

  // Buscar da API
  try {
    const response = await request(
      `/api/v1/db/meta/projects/${API_CONFIG.baseId}/tables`
    );

    const ids = {};
    for (const table of response.list || []) {
      ids[table.title] = table.id;
    }

    tableIdsCache = ids;

    // Salvar no localStorage
    try {
      localStorage.setItem(
        STORAGE_KEYS.tableIds,
        JSON.stringify({ ids, timestamp: Date.now() })
      );
    } catch {
      // Ignorar erro de storage
    }

    return tableIdsCache;
  } catch (error) {
    console.error('[apiService] Erro ao carregar table IDs:', error);
    throw error;
  }
}

/**
 * Obtém o ID de uma tabela pelo nome
 * @param {string} tableName
 * @returns {Promise<string>}
 */
async function getTableId(tableName) {
  const ids = await loadTableIds();
  const id = ids[tableName];
  if (!id) {
    throw new ApiError(`Tabela '${tableName}' não encontrada`, 404);
  }
  return id;
}

// ============================================
// NOCODB DATA API v2 HELPERS
// ============================================

/**
 * Busca registros de uma tabela com filtros (API v2)
 * @param {string} tableName
 * @param {object} options - { where, sort, limit, offset, fields }
 * @returns {Promise<{ list: array, pageInfo: object }>}
 */
async function findMany(tableName, options = {}) {
  const tableId = await getTableId(tableName);
  const params = new URLSearchParams();

  if (options.where) {
    params.set('where', options.where);
  }
  if (options.sort) {
    params.set('sort', options.sort);
  }
  if (options.limit) {
    params.set('limit', String(options.limit));
  }
  if (options.offset) {
    params.set('offset', String(options.offset));
  }
  if (options.fields) {
    params.set('fields', options.fields);
  }

  const queryString = params.toString();
  const url = `/api/v2/tables/${tableId}/records${queryString ? `?${queryString}` : ''}`;

  return await request(url);
}

/**
 * Busca um registro por ID (API v2)
 * @param {string} tableName
 * @param {string} recordId
 * @returns {Promise<object>}
 */
async function findOne(tableName, recordId) {
  const tableId = await getTableId(tableName);
  return await request(`/api/v2/tables/${tableId}/records/${recordId}`);
}

/**
 * Cria um novo registro (API v2)
 * @param {string} tableName
 * @param {object} data
 * @returns {Promise<object>}
 */
async function create(tableName, data) {
  const tableId = await getTableId(tableName);
  return await request(`/api/v2/tables/${tableId}/records`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Atualiza um registro existente (API v2)
 * @param {string} tableName
 * @param {string} recordId
 * @param {object} data
 * @returns {Promise<object>}
 */
async function update(tableName, recordId, data) {
  const tableId = await getTableId(tableName);
  return await request(`/api/v2/tables/${tableId}/records`, {
    method: 'PATCH',
    body: JSON.stringify({ ...data, Id: recordId }),
  });
}

/**
 * Remove um registro (API v2)
 * @param {string} tableName
 * @param {string} recordId
 * @returns {Promise<void>}
 */
async function remove(tableName, recordId) {
  const tableId = await getTableId(tableName);
  return await request(`/api/v2/tables/${tableId}/records`, {
    method: 'DELETE',
    body: JSON.stringify({ Id: recordId }),
  });
}

// ============================================
// API DE PROGRESSO
// ============================================

/**
 * Busca progresso do usuário em um curso
 * @param {string} userId
 * @param {string} courseId
 * @returns {Promise<{ completedModules: string[], lastUpdated: string|null }>}
 */
export async function getProgress(userId, courseId) {
  try {
    const response = await findMany('user_progress', {
      where: `(user_id,eq,${userId})~and(course_id,eq,${courseId})~and(completed,eq,true)`,
      fields: 'module_id,completed_at',
    });

    const completedModules = (response.list || []).map((r) => r.module_id);
    const lastUpdated =
      response.list?.length > 0
        ? response.list.reduce((latest, r) => {
            if (!latest || new Date(r.completed_at) > new Date(latest)) {
              return r.completed_at;
            }
            return latest;
          }, null)
        : null;

    return { completedModules, lastUpdated };
  } catch (error) {
    console.error('[apiService] Erro ao buscar progresso:', error);
    throw error;
  }
}

/**
 * Marca um módulo como completo
 * @param {string} userId
 * @param {string} companyId
 * @param {string} courseId
 * @param {string} moduleId
 * @returns {Promise<object>}
 */
export async function completeModule(userId, companyId, courseId, moduleId) {
  try {
    // Verificar se já existe registro
    const existing = await findMany('user_progress', {
      where: `(user_id,eq,${userId})~and(module_id,eq,${moduleId})`,
      limit: 1,
    });

    if (existing.list?.length > 0) {
      // Atualizar registro existente
      return await update('user_progress', existing.list[0].id, {
        completed: true,
        completed_at: new Date().toISOString(),
      });
    }

    // Criar novo registro
    return await create('user_progress', {
      user_id: userId,
      company_id: companyId,
      course_id: courseId,
      module_id: moduleId,
      completed: true,
      completed_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[apiService] Erro ao completar módulo:', error);
    throw error;
  }
}

/**
 * Desmarca um módulo como completo
 * @param {string} userId
 * @param {string} moduleId
 * @returns {Promise<void>}
 */
export async function uncompleteModule(userId, moduleId) {
  try {
    const existing = await findMany('user_progress', {
      where: `(user_id,eq,${userId})~and(module_id,eq,${moduleId})`,
      limit: 1,
    });

    if (existing.list?.length > 0) {
      await update('user_progress', existing.list[0].id, {
        completed: false,
        completed_at: null,
      });
    }
  } catch (error) {
    console.error('[apiService] Erro ao desmarcar módulo:', error);
    throw error;
  }
}

// ============================================
// API DE NOTAS
// ============================================

/**
 * Busca notas do usuário em um curso
 * @param {string} userId
 * @param {string} courseId
 * @returns {Promise<{ content: string, sizeBytes: number }>}
 */
export async function getNotes(userId, courseId) {
  try {
    const response = await findMany('study_notes', {
      where: `(user_id,eq,${userId})~and(course_id,eq,${courseId})`,
      fields: 'id,content,size_bytes,updated_at',
      limit: 1,
    });

    if (response.list?.length > 0) {
      const note = response.list[0];
      return {
        id: note.id,
        content: note.content || '',
        sizeBytes: note.size_bytes || 0,
        updatedAt: note.updated_at,
      };
    }

    return { id: null, content: '', sizeBytes: 0, updatedAt: null };
  } catch (error) {
    console.error('[apiService] Erro ao buscar notas:', error);
    throw error;
  }
}

/**
 * Salva notas do usuário
 * @param {string} userId
 * @param {string} companyId
 * @param {string} courseId
 * @param {string} content
 * @returns {Promise<object>}
 */
export async function saveNotes(userId, companyId, courseId, content) {
  const sizeBytes = new Blob([content]).size;

  try {
    // Verificar se já existe
    const existing = await findMany('study_notes', {
      where: `(user_id,eq,${userId})~and(course_id,eq,${courseId})`,
      fields: 'id',
      limit: 1,
    });

    if (existing.list?.length > 0) {
      return await update('study_notes', existing.list[0].id, {
        content,
        size_bytes: sizeBytes,
        updated_at: new Date().toISOString(),
      });
    }

    return await create('study_notes', {
      user_id: userId,
      company_id: companyId,
      course_id: courseId,
      content,
      size_bytes: sizeBytes,
    });
  } catch (error) {
    console.error('[apiService] Erro ao salvar notas:', error);
    throw error;
  }
}

// ============================================
// API DE CURSOS
// ============================================

/**
 * Busca lista de cursos disponíveis
 * @returns {Promise<array>}
 */
export async function getCourses() {
  try {
    const response = await findMany('courses', {
      where: '(status,eq,active)',
      sort: 'order_index',
    });

    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar cursos:', error);
    throw error;
  }
}

/**
 * Busca detalhes de um curso
 * @param {string} courseId
 * @returns {Promise<object>}
 */
export async function getCourse(courseId) {
  try {
    const response = await findMany('courses', {
      where: `(id,eq,${courseId})`,
      limit: 1,
    });
    return response.list?.[0] || null;
  } catch (error) {
    console.error('[apiService] Erro ao buscar curso:', error);
    throw error;
  }
}

/**
 * Busca módulos de um curso
 * @param {string} courseId
 * @returns {Promise<array>}
 */
export async function getCourseModules(courseId) {
  try {
    const response = await findMany('modules', {
      where: `(course_id,eq,${courseId})`,
      sort: 'order_index',
    });

    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar módulos:', error);
    throw error;
  }
}

/**
 * Busca fases de um curso
 * @param {string} courseId
 * @returns {Promise<array>}
 */
export async function getCoursePhases(courseId) {
  try {
    const response = await findMany('phases', {
      where: `(course_id,eq,${courseId})`,
      sort: 'order_index',
    });

    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar fases:', error);
    throw error;
  }
}

// ============================================
// API DE LEARNING PATHS
// ============================================

/**
 * Busca trilhas de aprendizado
 * @returns {Promise<array>}
 */
export async function getLearningPaths() {
  try {
    const response = await findMany('learning_paths', {
      where: '(active,eq,true)',
      sort: 'order_index',
    });

    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar trilhas:', error);
    throw error;
  }
}

/**
 * Busca cursos de uma trilha
 * @param {string} pathId
 * @returns {Promise<array>}
 */
export async function getLearningPathCourses(pathId) {
  try {
    const response = await findMany('learning_path_courses', {
      where: `(path_id,eq,${pathId})`,
      sort: 'order_index',
    });

    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar cursos da trilha:', error);
    throw error;
  }
}

// ============================================
// API DE EMPRESA
// ============================================

/**
 * Busca dados da empresa pelo ID
 * @param {string} companyId
 * @returns {Promise<object>}
 */
export async function getCompany(companyId) {
  try {
    const response = await findMany('companies', {
      where: `(id,eq,${companyId})`,
      limit: 1,
    });
    return response.list?.[0] || null;
  } catch (error) {
    console.error('[apiService] Erro ao buscar empresa:', error);
    throw error;
  }
}

/**
 * Busca usuários da empresa (para admins)
 * @param {string} companyId
 * @returns {Promise<array>}
 */
export async function getCompanyUsers(companyId) {
  try {
    const response = await findMany('users', {
      where: `(company_id,eq,${companyId})~and(active,eq,true)`,
      sort: 'full_name',
      fields: 'id,email,full_name,role,last_login_at',
    });

    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar usuários da empresa:', error);
    throw error;
  }
}

/**
 * Busca usuário por email
 * @param {string} email
 * @returns {Promise<object|null>}
 */
export async function getUserByEmail(email) {
  try {
    const response = await findMany('users', {
      where: `(email,eq,${email})`,
      limit: 1,
    });
    return response.list?.[0] || null;
  } catch (error) {
    console.error('[apiService] Erro ao buscar usuário:', error);
    throw error;
  }
}

// ============================================
// API DE ANALYTICS
// ============================================

/**
 * Busca estatísticas da empresa (calculado a partir de tabelas base)
 * @param {string} companyId
 * @returns {Promise<object>}
 */
export async function getCompanyAnalytics(companyId) {
  try {
    // Buscar usuários da empresa
    const usersResponse = await findMany('users', {
      where: `(company_id,eq,${companyId})`,
    });
    const users = usersResponse.list || [];

    // Buscar progresso da empresa
    const progressResponse = await findMany('user_progress', {
      where: `(company_id,eq,${companyId})~and(completed,eq,true)`,
    });
    const progress = progressResponse.list || [];

    // Calcular estatísticas
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.active).length;
    const totalModulesCompleted = progress.length;

    return {
      company_id: companyId,
      total_users: totalUsers,
      active_users: activeUsers,
      total_modules_completed: totalModulesCompleted,
      avg_completion_rate: totalUsers > 0 ? Math.round((totalModulesCompleted / (totalUsers * 16)) * 100) : 0,
    };
  } catch (error) {
    console.error('[apiService] Erro ao buscar analytics empresa:', error);
    // Retornar dados default em caso de erro
    return {
      total_users: 0,
      active_users: 0,
      total_modules_completed: 0,
      avg_completion_rate: 0,
    };
  }
}

/**
 * Busca dashboard de usuários da empresa (calculado a partir de tabelas base)
 * @param {string} companyId
 * @returns {Promise<array>}
 */
export async function getUsersDashboard(companyId) {
  try {
    // Buscar usuários da empresa
    const usersResponse = await findMany('users', {
      where: `(company_id,eq,${companyId})`,
    });
    const users = usersResponse.list || [];

    // Buscar todo progresso da empresa
    const progressResponse = await findMany('user_progress', {
      where: `(company_id,eq,${companyId})~and(completed,eq,true)`,
    });
    const allProgress = progressResponse.list || [];

    // Agregar progresso por usuário
    const progressByUser = {};
    for (const p of allProgress) {
      if (!progressByUser[p.user_id]) {
        progressByUser[p.user_id] = { count: 0, lastActivity: null };
      }
      progressByUser[p.user_id].count++;
      if (!progressByUser[p.user_id].lastActivity || p.completed_at > progressByUser[p.user_id].lastActivity) {
        progressByUser[p.user_id].lastActivity = p.completed_at;
      }
    }

    // Montar dashboard
    return users.map(user => ({
      user_id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      modules_completed: progressByUser[user.id]?.count || 0,
      total_modules_tracked: 16, // Total de módulos do curso bash
      completion_percentage: Math.round(((progressByUser[user.id]?.count || 0) / 16) * 100),
      last_activity: progressByUser[user.id]?.lastActivity || null,
    })).sort((a, b) => b.modules_completed - a.modules_completed);
  } catch (error) {
    console.error('[apiService] Erro ao buscar dashboard usuários:', error);
    return [];
  }
}

/**
 * Busca estatísticas de cursos (calculado a partir de tabelas base)
 * @returns {Promise<array>}
 */
export async function getCourseStats() {
  try {
    // Buscar cursos
    const coursesResponse = await findMany('courses', {
      where: '(status,eq,active)',
    });
    const courses = coursesResponse.list || [];

    // Buscar todo progresso
    const progressResponse = await findMany('user_progress', {
      where: '(completed,eq,true)',
    });
    const allProgress = progressResponse.list || [];

    // Agregar por curso
    const statsByCourse = {};
    for (const p of allProgress) {
      if (!statsByCourse[p.course_id]) {
        statsByCourse[p.course_id] = { completions: 0, users: new Set() };
      }
      statsByCourse[p.course_id].completions++;
      statsByCourse[p.course_id].users.add(p.user_id);
    }

    return courses.map(course => ({
      id: course.id,
      name: course.name,
      icon: course.icon,
      total_modules: course.total_modules || 16,
      enrolled_users: statsByCourse[course.id]?.users.size || 0,
      total_completions: statsByCourse[course.id]?.completions || 0,
      completion_rate: statsByCourse[course.id]?.users.size > 0
        ? Math.round((statsByCourse[course.id].completions / (statsByCourse[course.id].users.size * (course.total_modules || 16))) * 100)
        : 0,
    }));
  } catch (error) {
    console.error('[apiService] Erro ao buscar stats cursos:', error);
    return [];
  }
}

/**
 * Busca progresso geral de todos usuários da empresa
 * @param {string} companyId
 * @returns {Promise<array>}
 */
export async function getCompanyProgress(companyId) {
  try {
    const response = await findMany('user_progress', {
      where: `(company_id,eq,${companyId})~and(completed,eq,true)`,
      sort: '-completed_at',
      limit: 100,
    });
    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar progresso empresa:', error);
    throw error;
  }
}

// ============================================
// VERIFICAÇÃO DE CONECTIVIDADE
// ============================================

/**
 * Verifica se a API está acessível
 * @returns {Promise<boolean>}
 */
export async function checkApiHealth() {
  try {
    await request('/api/v1/version', { authenticated: false });
    return true;
  } catch {
    return false;
  }
}

/**
 * Inicializa o serviço de API (login NocoDB + carrega table IDs)
 * @returns {Promise<void>}
 */
export async function initialize() {
  if (isInitialized) return;

  try {
    // Se não tem token, fazer login no NocoDB
    if (!getToken()) {
      console.log('[apiService] Fazendo login no NocoDB...');
      await login(NOCODB_ADMIN.email, NOCODB_ADMIN.password);
    }

    // Carregar table IDs
    await loadTableIds();
    isInitialized = true;
    console.log('[apiService] Inicializado com sucesso');
  } catch (error) {
    console.error('[apiService] Erro na inicialização:', error);
    throw error;
  }
}

/**
 * Garante que o serviço está inicializado antes de fazer requisições
 */
async function ensureInitialized() {
  if (!isInitialized) {
    await initialize();
  }
}

// ============================================
// EXPORTAÇÃO
// ============================================

export const apiService = {
  // Inicialização
  initialize,

  // Auth
  login,
  logout,
  getCurrentUser,
  isAuthenticated,

  // Usuários
  getUserByEmail,

  // Progresso
  getProgress,
  completeModule,
  uncompleteModule,

  // Notas
  getNotes,
  saveNotes,

  // Cursos
  getCourses,
  getCourse,
  getCourseModules,
  getCoursePhases,

  // Learning Paths
  getLearningPaths,
  getLearningPathCourses,

  // Empresa
  getCompany,
  getCompanyUsers,

  // Analytics
  getCompanyAnalytics,
  getUsersDashboard,
  getCourseStats,
  getCompanyProgress,

  // Utils
  checkApiHealth,
  ApiError,
};

export default apiService;
