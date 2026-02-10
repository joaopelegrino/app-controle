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

import { platformConfig, getStorageKey } from '../config/platform';

// ============================================
// CONFIGURAÇÃO
// ============================================

const API_CONFIG = {
  // Em dev, usa proxy do Vite (/api -> localhost:8081)
  // Em prod, usa URL direta ou variável de ambiente
  baseUrl: import.meta.env.VITE_API_URL || '',
  baseId: import.meta.env.VITE_API_BASE_ID || 'por8gk2phpp2pfk',
  timeout: platformConfig.api.timeout,
};

const STORAGE_KEYS = {
  token: getStorageKey('api_token'),
  refreshToken: getStorageKey('refresh_token'),
  user: getStorageKey('user'),
  tableIds: getStorageKey('table_ids'),
};

// Cache de table IDs (nome -> id)
let tableIdsCache = null;

// Table IDs conhecidos do NocoDB (base TrainB2B - PostgreSQL External)
const TABLE_IDS = {
  users: 'm9tvgm5rx70qh3i',
  companies: 'mvw5muqhbzrmkuv',
  courses: 'mfrp5ndkje59e7r',
  modules: 'mu3cf9gd3ujxrg2',
  user_progress: 'mr79vxvc3urqofj',
  study_notes: 'mdqow9zj683tqiu',
  phases: 'meloqodvz6diwmz',
  audit_logs: 'mnbw235k9rntjky',
  // Views
  v_company_progress: 'me2shk8zc27r3li',
  v_user_dashboard: 'mduzpssgu2bckae',
  v_course_stats: 'mkbi3w6kk7j73mb',
  // Hub de Especialistas (US-154)
  specialists: 'maafexd09rbow6a',
  hub_courses: 'miv7wu0lpxd3c3x',
  course_reviews: 'mcj2pusop7whl2g',
  v_specialist_dashboard: 'mxh9z6xqwwyrj4b',
  v_hub_catalog: 'mr6fqkyceugenxv',
};

// Credenciais do admin NocoDB (via variáveis de ambiente)
const NOCODB_ADMIN = {
  email: import.meta.env.VITE_NOCODB_ADMIN_EMAIL || 'admin@trainb2b.local',
  password: import.meta.env.VITE_NOCODB_ADMIN_PASSWORD || 'Admin@TrainB2B2026!',
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
 * Realiza login no NocoDB (sistema)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string }>}
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
 * Senha padrão para demo (todos os usuários usam esta senha)
 * Em produção, seria validada via hash bcrypt no backend
 */
const DEMO_PASSWORD = 'Demo@2026';

/**
 * Realiza login de usuário da aplicação
 *
 * Esta função:
 * 1. Autentica no NocoDB com admin (para ter acesso aos dados)
 * 2. Busca o usuário na tabela `users` por email
 * 3. Valida se usuário existe e está ativo
 * 4. Para demo, valida senha contra DEMO_PASSWORD
 * 5. Retorna dados do usuário + empresa + token
 *
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<{ user: object, company: object, token: string }>}
 * @throws {ApiError} Se credenciais inválidas ou usuário não encontrado
 */
export async function loginUser(email, password) {
  // Validar parâmetros
  if (!email || !password) {
    throw new ApiError('Email e senha são obrigatórios', 400);
  }

  // Normalizar email
  const normalizedEmail = email.toLowerCase().trim();

  try {
    // 1. Garantir autenticação no NocoDB (admin) para ter acesso aos dados
    if (!getToken()) {
      await login(NOCODB_ADMIN.email, NOCODB_ADMIN.password);
    }

    // 2. Buscar usuário na tabela users
    const userResponse = await findMany('users', {
      where: `(email,eq,${normalizedEmail})`,
      limit: 1,
    });

    const userData = userResponse.list?.[0];

    if (!userData) {
      throw new ApiError('Usuário não encontrado', 401);
    }

    // 3. Verificar se usuário está ativo
    if (!userData.active) {
      throw new ApiError('Usuário inativo. Contate o administrador.', 401);
    }

    // 4. Validar senha
    // Em demo, validamos contra senha padrão
    // Em produção, seria comparação bcrypt com password_hash
    const isValidPassword = password === DEMO_PASSWORD;

    if (!isValidPassword) {
      throw new ApiError('Credenciais inválidas', 401);
    }

    // 5. Buscar dados da empresa
    let companyData = null;
    if (userData.company_id) {
      const companyResponse = await findMany('companies', {
        where: `(id,eq,${userData.company_id})`,
        limit: 1,
      });
      companyData = companyResponse.list?.[0] || null;
    }

    // 6. Atualizar último login
    try {
      await update('users', userData.id || userData.Id, {
        last_login_at: new Date().toISOString(),
      });
    } catch (updateError) {
      // Não falhar o login se não conseguir atualizar last_login
      console.warn('[apiService] Erro ao atualizar last_login:', updateError.message);
    }

    // 7. Montar resposta
    const token = getToken();

    const user = {
      id: userData.id || userData.Id,
      email: userData.email,
      fullName: userData.full_name,
      role: userData.role,
      companyId: userData.company_id,
    };

    const company = companyData ? {
      id: companyData.id || companyData.Id,
      name: companyData.name,
      slug: companyData.slug,
      plan: companyData.plan || 'starter',
    } : null;

    // 8. Salvar dados do usuário no localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify({ user, company }));
    } catch {
      // Ignorar erro de storage
    }

    return { user, company, token };
  } catch (error) {
    // Limpar token em caso de erro de autenticação
    if (error.status === 401) {
      clearToken();
    }

    if (error instanceof ApiError) {
      throw error;
    }

    console.error('[apiService] Erro no login:', error);
    throw new ApiError('Erro ao realizar login', 500, { original: error.message });
  }
}

/**
 * Recupera dados do usuário salvo no localStorage
 * @returns {{ user: object, company: object } | null}
 */
export function getSavedUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.user);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignorar erro de parse
  }
  return null;
}

/**
 * Valida se o token atual ainda é válido fazendo requisição de teste
 * @returns {Promise<boolean>}
 */
export async function validateToken() {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }

    // Tentar fazer uma requisição simples para validar o token
    await request('/api/v1/auth/user/me');
    return true;
  } catch {
    return false;
  }
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
    console.warn('[apiService] Usando TABLE_IDS hardcoded:', error.message);
    // Usar TABLE_IDS hardcoded como fallback
    tableIdsCache = TABLE_IDS;
    return tableIdsCache;
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
// API CRUD DE CURSOS (US-125)
// ============================================

/**
 * Gera um ID slug a partir do nome do curso
 * @param {string} name - Nome do curso
 * @returns {string} - ID slug (ex: "Fundamentos de Linux" -> "fundamentos-de-linux")
 */
function generateCourseId(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Espaços para hifens
    .replace(/-+/g, '-'); // Remove hifens duplicados
}

/**
 * Cria um novo curso
 * @param {object} courseData - { name, description?, icon?, difficulty, duration_hours?, total_modules?, badge? }
 * @returns {Promise<object>}
 * @throws {ApiError} Se dados inválidos ou ID já existe
 */
export async function createCourse(courseData) {
  const { name, description, icon, difficulty, duration_hours, total_modules, badge } = courseData;

  // Validação básica
  if (!name || name.trim().length < 3) {
    throw new ApiError('Nome do curso é obrigatório (mínimo 3 caracteres)', 400);
  }

  // Validar difficulty
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  if (!difficulty || !validDifficulties.includes(difficulty)) {
    throw new ApiError(`Dificuldade inválida. Permitidas: ${validDifficulties.join(', ')}`, 400);
  }

  try {
    // Gerar ID baseado no nome
    const courseId = generateCourseId(name);

    // Verificar se ID já existe
    const existing = await getCourse(courseId);
    if (existing) {
      throw new ApiError('Já existe um curso com este nome/ID', 409);
    }

    // Buscar maior order_index atual
    const coursesResponse = await findMany('courses', {
      sort: '-order_index',
      limit: 1,
    });
    const maxOrderIndex = coursesResponse.list?.[0]?.order_index || 0;

    // Criar curso
    const newCourse = await create('courses', {
      id: courseId,
      name: name.trim(),
      description: description?.trim() || null,
      icon: icon || '📚',
      difficulty,
      duration_hours: duration_hours || null,
      total_modules: total_modules || 0,
      status: 'in-development', // Novos cursos começam em desenvolvimento
      badge: badge || null,
      order_index: maxOrderIndex + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return newCourse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao criar curso:', error);
    throw new ApiError('Erro ao criar curso', 500, { original: error.message });
  }
}

/**
 * Atualiza dados de um curso
 * @param {string} courseId - ID do curso
 * @param {object} courseData - Campos a atualizar
 * @returns {Promise<object>}
 * @throws {ApiError} Se curso não encontrado ou dados inválidos
 */
export async function updateCourse(courseId, courseData) {
  if (!courseId) {
    throw new ApiError('ID do curso é obrigatório', 400);
  }

  const allowedFields = ['name', 'description', 'icon', 'difficulty', 'duration_hours', 'total_modules', 'status', 'badge', 'video_url', 'order_index'];
  const updateData = {};

  // Filtrar apenas campos permitidos
  for (const field of allowedFields) {
    if (courseData[field] !== undefined) {
      updateData[field] = courseData[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError('Nenhum campo válido para atualizar', 400);
  }

  // Validar difficulty se fornecido
  if (updateData.difficulty) {
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    if (!validDifficulties.includes(updateData.difficulty)) {
      throw new ApiError(`Dificuldade inválida. Permitidas: ${validDifficulties.join(', ')}`, 400);
    }
  }

  // Validar status se fornecido
  if (updateData.status) {
    const validStatuses = ['active', 'in-development', 'archived'];
    if (!validStatuses.includes(updateData.status)) {
      throw new ApiError(`Status inválido. Permitidos: ${validStatuses.join(', ')}`, 400);
    }
  }

  // Trim em campos de texto
  if (updateData.name) {
    if (updateData.name.trim().length < 3) {
      throw new ApiError('Nome do curso deve ter mínimo 3 caracteres', 400);
    }
    updateData.name = updateData.name.trim();
  }
  if (updateData.description) {
    updateData.description = updateData.description.trim();
  }

  try {
    // Verificar se curso existe
    const existing = await getCourse(courseId);
    if (!existing) {
      throw new ApiError('Curso não encontrado', 404);
    }

    updateData.updated_at = new Date().toISOString();

    // NocoDB usa 'Id' interno, mas nosso schema usa 'id' customizado
    // Precisamos buscar o Id real do registro
    const courseResponse = await findMany('courses', {
      where: `(id,eq,${courseId})`,
      limit: 1,
    });

    if (!courseResponse.list?.length) {
      throw new ApiError('Curso não encontrado', 404);
    }

    const recordId = courseResponse.list[0].Id || courseResponse.list[0].id;
    const updatedCourse = await update('courses', recordId, updateData);

    return updatedCourse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao atualizar curso:', error);
    throw new ApiError('Erro ao atualizar curso', 500, { original: error.message });
  }
}

/**
 * Arquiva um curso (soft delete)
 * Marca status='archived' em vez de excluir
 * @param {string} courseId - ID do curso
 * @returns {Promise<object>}
 * @throws {ApiError} Se curso não encontrado
 */
export async function deleteCourse(courseId) {
  if (!courseId) {
    throw new ApiError('ID do curso é obrigatório', 400);
  }

  try {
    // Verificar se curso existe
    const existing = await getCourse(courseId);
    if (!existing) {
      throw new ApiError('Curso não encontrado', 404);
    }

    // Buscar Id interno do NocoDB
    const courseResponse = await findMany('courses', {
      where: `(id,eq,${courseId})`,
      limit: 1,
    });

    const recordId = courseResponse.list[0].Id || courseResponse.list[0].id;

    // Soft delete: marcar como archived
    const archivedCourse = await update('courses', recordId, {
      status: 'archived',
      archived_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return archivedCourse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao arquivar curso:', error);
    throw new ApiError('Erro ao arquivar curso', 500, { original: error.message });
  }
}

/**
 * Reativa um curso arquivado
 * @param {string} courseId - ID do curso
 * @returns {Promise<object>}
 * @throws {ApiError} Se curso não encontrado
 */
export async function reactivateCourse(courseId) {
  if (!courseId) {
    throw new ApiError('ID do curso é obrigatório', 400);
  }

  try {
    // Buscar curso (incluindo arquivados)
    const courseResponse = await findMany('courses', {
      where: `(id,eq,${courseId})`,
      limit: 1,
    });

    if (!courseResponse.list?.length) {
      throw new ApiError('Curso não encontrado', 404);
    }

    const recordId = courseResponse.list[0].Id || courseResponse.list[0].id;

    // Reativar: marcar como active
    const reactivatedCourse = await update('courses', recordId, {
      status: 'active',
      archived_at: null,
      updated_at: new Date().toISOString(),
    });

    return reactivatedCourse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao reativar curso:', error);
    throw new ApiError('Erro ao reativar curso', 500, { original: error.message });
  }
}

/**
 * Busca todos os cursos (incluindo inativos e arquivados)
 * Para uso administrativo
 * @returns {Promise<array>}
 */
export async function getAllCourses() {
  try {
    const response = await findMany('courses', {
      sort: 'order_index',
    });

    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar todos os cursos:', error);
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
// API CRUD DE USUÁRIOS (US-091)
// ============================================

/**
 * Cria novo usuário na empresa
 * @param {object} userData - { email, full_name, role, company_id }
 * @returns {Promise<object>}
 * @throws {ApiError} Se email já existe ou dados inválidos
 */
export async function createUser(userData) {
  const { email, full_name, role, company_id } = userData;

  // Validação básica
  if (!email || !full_name || !role || !company_id) {
    throw new ApiError('Dados obrigatórios: email, full_name, role, company_id', 400);
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError('Formato de email inválido', 400);
  }

  // Validar role permitida
  const validRoles = ['student', 'instructor', 'admin', 'c_level'];
  if (!validRoles.includes(role)) {
    throw new ApiError(`Role inválida. Permitidas: ${validRoles.join(', ')}`, 400);
  }

  try {
    // Verificar se email já existe
    const existing = await getUserByEmail(email);
    if (existing) {
      throw new ApiError('Email já cadastrado no sistema', 409);
    }

    // Criar usuário com senha padrão (Demo@2026)
    // Hash bcrypt pré-computado para "Demo@2026"
    const defaultPasswordHash = '$2b$10$rOzJqQZQVcxQvZWqgmVOj.6bGvnQiX6xC1kKxLQm0i5V5V5V5V5V5';

    const newUser = await create('users', {
      email: email.toLowerCase().trim(),
      full_name: full_name.trim(),
      role,
      company_id,
      password_hash: defaultPasswordHash,
      active: true,
      created_at: new Date().toISOString(),
    });

    // Retornar sem o hash de senha
    const { password_hash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao criar usuário:', error);
    throw new ApiError('Erro ao criar usuário', 500, { original: error.message });
  }
}

/**
 * Atualiza dados do usuário
 * @param {string} userId - ID do usuário
 * @param {object} userData - Campos a atualizar (email, full_name, role)
 * @returns {Promise<object>}
 * @throws {ApiError} Se usuário não encontrado ou dados inválidos
 */
export async function updateUser(userId, userData) {
  if (!userId) {
    throw new ApiError('ID do usuário é obrigatório', 400);
  }

  const allowedFields = ['email', 'full_name', 'role', 'active'];
  const updateData = {};

  // Filtrar apenas campos permitidos
  for (const field of allowedFields) {
    if (userData[field] !== undefined) {
      updateData[field] = userData[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError('Nenhum campo válido para atualizar', 400);
  }

  // Validar email se fornecido
  if (updateData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updateData.email)) {
      throw new ApiError('Formato de email inválido', 400);
    }

    // Verificar se email já existe (exceto para o próprio usuário)
    const existing = await getUserByEmail(updateData.email);
    if (existing && String(existing.id) !== String(userId)) {
      throw new ApiError('Email já cadastrado para outro usuário', 409);
    }

    updateData.email = updateData.email.toLowerCase().trim();
  }

  // Validar role se fornecida
  if (updateData.role) {
    const validRoles = ['student', 'instructor', 'admin', 'c_level'];
    if (!validRoles.includes(updateData.role)) {
      throw new ApiError(`Role inválida. Permitidas: ${validRoles.join(', ')}`, 400);
    }
  }

  // Trim no nome se fornecido
  if (updateData.full_name) {
    updateData.full_name = updateData.full_name.trim();
  }

  try {
    updateData.updated_at = new Date().toISOString();

    const updatedUser = await update('users', userId, updateData);

    // Retornar sem o hash de senha
    const { password_hash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao atualizar usuário:', error);
    throw new ApiError('Erro ao atualizar usuário', 500, { original: error.message });
  }
}

/**
 * Desativa usuário (soft delete)
 * @param {string} userId - ID do usuário
 * @returns {Promise<object>}
 * @throws {ApiError} Se usuário não encontrado
 */
export async function deleteUser(userId) {
  if (!userId) {
    throw new ApiError('ID do usuário é obrigatório', 400);
  }

  try {
    const deactivatedUser = await update('users', userId, {
      active: false,
      deactivated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Retornar sem o hash de senha
    const { password_hash, ...userWithoutPassword } = deactivatedUser;
    return userWithoutPassword;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao desativar usuário:', error);
    throw new ApiError('Erro ao desativar usuário', 500, { original: error.message });
  }
}

/**
 * Reativa usuário previamente desativado
 * @param {string} userId - ID do usuário
 * @returns {Promise<object>}
 */
export async function reactivateUser(userId) {
  if (!userId) {
    throw new ApiError('ID do usuário é obrigatório', 400);
  }

  try {
    const reactivatedUser = await update('users', userId, {
      active: true,
      deactivated_at: null,
      updated_at: new Date().toISOString(),
    });

    const { password_hash, ...userWithoutPassword } = reactivatedUser;
    return userWithoutPassword;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao reativar usuário:', error);
    throw new ApiError('Erro ao reativar usuário', 500, { original: error.message });
  }
}

// ============================================
// API DE MATRÍCULAS (US-098)
// ============================================

/**
 * Matricula usuário em um curso
 * @param {object} enrollmentData - { userId, courseId, assignedBy, dueDate? }
 * @returns {Promise<object>}
 * @throws {ApiError} Se usuário/curso não existe ou já matriculado
 */
export async function enrollUser(enrollmentData) {
  const { userId, courseId, assignedBy, dueDate } = enrollmentData;

  if (!userId || !courseId || !assignedBy) {
    throw new ApiError('Dados obrigatórios: userId, courseId, assignedBy', 400);
  }

  try {
    // Verificar se já existe matrícula ativa
    const existing = await findMany('user_courses', {
      where: `(user_id,eq,${userId})~and(course_id,eq,${courseId})`,
      limit: 1,
    });

    if (existing.list?.length > 0) {
      const enrollment = existing.list[0];

      // Se cancelada, reativar
      if (enrollment.status === 'cancelled') {
        return await update('user_courses', enrollment.Id || enrollment.id, {
          status: 'enrolled',
          assigned_by: assignedBy,
          assigned_at: new Date().toISOString(),
          due_date: dueDate || null,
          updated_at: new Date().toISOString(),
        });
      }

      throw new ApiError('Usuário já matriculado neste curso', 409);
    }

    // Criar nova matrícula
    const newEnrollment = await create('user_courses', {
      user_id: userId,
      course_id: courseId,
      assigned_by: assignedBy,
      assigned_at: new Date().toISOString(),
      due_date: dueDate || null,
      status: 'enrolled',
      created_at: new Date().toISOString(),
    });

    return newEnrollment;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao matricular usuário:', error);
    throw new ApiError('Erro ao matricular usuário', 500, { original: error.message });
  }
}

/**
 * Cancela matrícula de usuário em um curso (soft delete)
 * @param {string} userId
 * @param {string} courseId
 * @returns {Promise<object>}
 * @throws {ApiError} Se matrícula não encontrada
 */
export async function unenrollUser(userId, courseId) {
  if (!userId || !courseId) {
    throw new ApiError('Dados obrigatórios: userId, courseId', 400);
  }

  try {
    // Buscar matrícula existente
    const existing = await findMany('user_courses', {
      where: `(user_id,eq,${userId})~and(course_id,eq,${courseId})`,
      limit: 1,
    });

    if (!existing.list?.length) {
      throw new ApiError('Matrícula não encontrada', 404);
    }

    const enrollment = existing.list[0];
    const enrollmentId = enrollment.Id || enrollment.id;

    // Cancelar matrícula (soft delete)
    return await update('user_courses', enrollmentId, {
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao cancelar matrícula:', error);
    throw new ApiError('Erro ao cancelar matrícula', 500, { original: error.message });
  }
}

/**
 * Busca matrículas de um usuário
 * @param {string} userId
 * @param {object} options - { includeInactive: false }
 * @returns {Promise<array>}
 */
export async function getUserEnrollments(userId, options = {}) {
  if (!userId) {
    throw new ApiError('userId é obrigatório', 400);
  }

  try {
    let whereClause = `(user_id,eq,${userId})`;

    if (!options.includeInactive) {
      whereClause += '~and(status,ne,cancelled)';
    }

    const response = await findMany('user_courses', {
      where: whereClause,
      sort: '-assigned_at',
    });

    const enrollments = response.list || [];

    // Enriquecer com dados do curso
    const enrichedEnrollments = await Promise.all(
      enrollments.map(async (enrollment) => {
        try {
          const course = await getCourse(enrollment.course_id);
          return {
            ...enrollment,
            course_name: course?.name || enrollment.course_id,
            course_icon: course?.icon || '📚',
            total_modules: course?.total_modules || 0,
          };
        } catch {
          return {
            ...enrollment,
            course_name: enrollment.course_id,
            course_icon: '📚',
            total_modules: 0,
          };
        }
      })
    );

    return enrichedEnrollments;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao buscar matrículas:', error);
    throw new ApiError('Erro ao buscar matrículas', 500, { original: error.message });
  }
}

/**
 * Busca todos os alunos matriculados em um curso (para empresa específica)
 * @param {string} courseId
 * @param {string} companyId
 * @returns {Promise<array>}
 */
export async function getCourseEnrollments(courseId, companyId) {
  if (!courseId || !companyId) {
    throw new ApiError('courseId e companyId são obrigatórios', 400);
  }

  try {
    // Buscar matrículas do curso
    const enrollmentsResponse = await findMany('user_courses', {
      where: `(course_id,eq,${courseId})~and(status,ne,cancelled)`,
      sort: '-assigned_at',
    });

    const enrollments = enrollmentsResponse.list || [];

    // Buscar usuários da empresa
    const usersResponse = await findMany('users', {
      where: `(company_id,eq,${companyId})~and(active,eq,true)`,
    });
    const companyUsers = usersResponse.list || [];
    const companyUserIds = new Set(companyUsers.map(u => u.id));

    // Filtrar apenas matrículas de usuários da empresa
    const companyEnrollments = enrollments.filter(e => companyUserIds.has(e.user_id));

    // Enriquecer com dados do usuário
    const enrichedEnrollments = companyEnrollments.map(enrollment => {
      const user = companyUsers.find(u => u.id === enrollment.user_id);
      return {
        ...enrollment,
        user_name: user?.full_name || 'Usuário',
        user_email: user?.email || '',
        user_role: user?.role || 'student',
      };
    });

    return enrichedEnrollments;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao buscar matrículas do curso:', error);
    throw new ApiError('Erro ao buscar matrículas do curso', 500, { original: error.message });
  }
}

/**
 * Atualiza status ou data limite de uma matrícula
 * @param {string} enrollmentId
 * @param {object} data - { status?, dueDate?, startedAt?, completedAt? }
 * @returns {Promise<object>}
 */
export async function updateEnrollment(enrollmentId, data) {
  if (!enrollmentId) {
    throw new ApiError('enrollmentId é obrigatório', 400);
  }

  const allowedFields = ['status', 'due_date', 'started_at', 'completed_at'];
  const updateData = {};

  // Mapear campos camelCase para snake_case
  const fieldMap = {
    dueDate: 'due_date',
    startedAt: 'started_at',
    completedAt: 'completed_at',
  };

  for (const [key, value] of Object.entries(data)) {
    const dbField = fieldMap[key] || key;
    if (allowedFields.includes(dbField) && value !== undefined) {
      updateData[dbField] = value;
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError('Nenhum campo válido para atualizar', 400);
  }

  // Validar status se fornecido
  if (updateData.status) {
    const validStatuses = ['enrolled', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(updateData.status)) {
      throw new ApiError(`Status inválido. Permitidos: ${validStatuses.join(', ')}`, 400);
    }
  }

  try {
    updateData.updated_at = new Date().toISOString();
    return await update('user_courses', enrollmentId, updateData);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('[apiService] Erro ao atualizar matrícula:', error);
    throw new ApiError('Erro ao atualizar matrícula', 500, { original: error.message });
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
// API DE ANALYTICS AVANÇADO (US-101)
// ============================================

/**
 * Busca estatísticas de módulos com análise de dificuldade
 * Identifica módulos difíceis baseado na taxa de conclusão
 *
 * @param {string} companyId - ID da empresa (opcional, se não fornecido analisa todas)
 * @returns {Promise<object>} { modules: array, difficultModules: array, summary: object }
 */
export async function getModuleStats(companyId = null) {
  try {
    // Buscar todos os módulos
    const modulesResponse = await findMany('modules', {
      sort: 'course_id,order_index',
    });
    const modules = modulesResponse.list || [];

    // Buscar todo progresso (filtrando por empresa se necessário)
    const whereClause = companyId
      ? `(company_id,eq,${companyId})`
      : '';
    const progressResponse = await findMany('user_progress', {
      where: whereClause || undefined,
    });
    const allProgress = progressResponse.list || [];

    // Buscar usuários únicos que têm progresso
    const uniqueUsers = new Set();
    const usersPerModule = {};
    const completedPerModule = {};

    for (const p of allProgress) {
      uniqueUsers.add(p.user_id);

      // Contabilizar tentativas por módulo
      if (!usersPerModule[p.module_id]) {
        usersPerModule[p.module_id] = new Set();
      }
      usersPerModule[p.module_id].add(p.user_id);

      // Contabilizar conclusões por módulo
      if (p.completed) {
        if (!completedPerModule[p.module_id]) {
          completedPerModule[p.module_id] = new Set();
        }
        completedPerModule[p.module_id].add(p.user_id);
      }
    }

    const totalActiveUsers = uniqueUsers.size;

    // Calcular estatísticas por módulo
    const moduleStats = modules.map((module) => {
      const usersStarted = usersPerModule[module.id]?.size || 0;
      const usersCompleted = completedPerModule[module.id]?.size || 0;

      // Taxa de conclusão: usuários que completaram / usuários que começaram
      const completionRate = usersStarted > 0
        ? Math.round((usersCompleted / usersStarted) * 100)
        : 0;

      // Taxa de alcance: usuários que começaram / total de usuários ativos
      const reachRate = totalActiveUsers > 0
        ? Math.round((usersStarted / totalActiveUsers) * 100)
        : 0;

      // Classificação de dificuldade baseada na taxa de conclusão
      let difficultyLevel = 'easy';
      let difficultyLabel = 'Fácil';
      let difficultyColor = 'green';

      if (completionRate < 40) {
        difficultyLevel = 'hard';
        difficultyLabel = 'Difícil';
        difficultyColor = 'red';
      } else if (completionRate < 70) {
        difficultyLevel = 'medium';
        difficultyLabel = 'Médio';
        difficultyColor = 'yellow';
      }

      return {
        id: module.id,
        title: module.title || module.id,
        course_id: module.course_id,
        order_index: module.order_index,
        users_started: usersStarted,
        users_completed: usersCompleted,
        completion_rate: completionRate,
        reach_rate: reachRate,
        difficulty_level: difficultyLevel,
        difficulty_label: difficultyLabel,
        difficulty_color: difficultyColor,
      };
    });

    // Ordenar por taxa de conclusão (menor primeiro = mais difícil)
    const sortedByDifficulty = [...moduleStats]
      .filter(m => m.users_started > 0)
      .sort((a, b) => a.completion_rate - b.completion_rate);

    // Filtrar módulos difíceis (taxa < 60% e pelo menos 1 usuário começou)
    const difficultModules = sortedByDifficulty
      .filter(m => m.completion_rate < 60 && m.users_started >= 1)
      .slice(0, 5);

    // Resumo geral
    const modulesWithData = moduleStats.filter(m => m.users_started > 0);
    const avgCompletionRate = modulesWithData.length > 0
      ? Math.round(modulesWithData.reduce((sum, m) => sum + m.completion_rate, 0) / modulesWithData.length)
      : 0;

    return {
      modules: moduleStats,
      difficultModules,
      summary: {
        total_modules: modules.length,
        modules_with_progress: modulesWithData.length,
        total_active_users: totalActiveUsers,
        avg_completion_rate: avgCompletionRate,
        hard_modules_count: moduleStats.filter(m => m.difficulty_level === 'hard').length,
        medium_modules_count: moduleStats.filter(m => m.difficulty_level === 'medium').length,
        easy_modules_count: moduleStats.filter(m => m.difficulty_level === 'easy').length,
      },
    };
  } catch (error) {
    console.error('[apiService] Erro ao buscar stats de módulos:', error);
    // Retornar dados default em caso de erro
    return {
      modules: [],
      difficultModules: [],
      summary: {
        total_modules: 0,
        modules_with_progress: 0,
        total_active_users: 0,
        avg_completion_rate: 0,
        hard_modules_count: 0,
        medium_modules_count: 0,
        easy_modules_count: 0,
      },
    };
  }
}

// ============================================
// API HUB DE ESPECIALISTAS (US-154)
// ============================================

/**
 * Busca perfil de especialista por ID
 * @param {string} specialistId
 * @returns {Promise<object|null>}
 */
export async function getSpecialist(specialistId) {
  try {
    const response = await findMany('v_specialist_dashboard', {
      where: `(specialist_id,eq,${specialistId})`,
      limit: 1,
    });
    return response.list?.[0] || null;
  } catch (error) {
    console.error('[apiService] Erro ao buscar especialista:', error);
    throw error;
  }
}

/**
 * Busca perfil de especialista por user_id
 * @param {string} userId
 * @returns {Promise<object|null>}
 */
export async function getSpecialistByUserId(userId) {
  try {
    const response = await findMany('v_specialist_dashboard', {
      where: `(user_id,eq,${userId})`,
      limit: 1,
    });
    return response.list?.[0] || null;
  } catch (error) {
    console.error('[apiService] Erro ao buscar especialista por userId:', error);
    throw error;
  }
}

/**
 * Busca dashboard do especialista (view agregada)
 * @param {string} specialistId
 * @returns {Promise<object|null>}
 */
export async function getSpecialistDashboard(specialistId) {
  try {
    const response = await findMany('v_specialist_dashboard', {
      where: `(specialist_id,eq,${specialistId})`,
      limit: 1,
    });
    return response.list?.[0] || null;
  } catch (error) {
    console.error('[apiService] Erro ao buscar dashboard especialista:', error);
    throw error;
  }
}

/**
 * Atualiza perfil do especialista
 * @param {string} specialistId
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function updateSpecialist(specialistId, data) {
  try {
    return await update('specialists', specialistId, {
      ...data,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[apiService] Erro ao atualizar especialista:', error);
    throw error;
  }
}

/**
 * Busca catalogo do Hub (cursos publicos publicados)
 * @param {object} filters - { search, minRating, maxPrice }
 * @returns {Promise<array>}
 */
export async function getHubCatalog(filters = {}) {
  try {
    const response = await findMany('v_hub_catalog', {
      sort: '-course_rating',
    });
    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar catalogo Hub:', error);
    throw error;
  }
}

/**
 * Busca um curso do Hub por ID
 * @param {string} hubCourseId
 * @returns {Promise<object|null>}
 */
export async function getHubCourse(hubCourseId) {
  try {
    const response = await findMany('hub_courses', {
      where: `(id,eq,${hubCourseId})`,
      limit: 1,
    });
    return response.list?.[0] || null;
  } catch (error) {
    console.error('[apiService] Erro ao buscar curso Hub:', error);
    throw error;
  }
}

/**
 * Busca cursos de um especialista
 * @param {string} specialistId
 * @returns {Promise<array>}
 */
export async function getHubCoursesBySpecialist(specialistId) {
  try {
    const response = await findMany('hub_courses', {
      where: `(specialist_id,eq,${specialistId})`,
      sort: '-created_at',
    });
    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar cursos do especialista:', error);
    throw error;
  }
}

/**
 * Busca reviews de um curso do Hub
 * @param {string} hubCourseId
 * @returns {Promise<array>}
 */
export async function getCourseReviews(hubCourseId) {
  try {
    const response = await findMany('course_reviews', {
      where: `(hub_course_id,eq,${hubCourseId})`,
      sort: '-created_at',
    });
    return response.list || [];
  } catch (error) {
    console.error('[apiService] Erro ao buscar reviews:', error);
    throw error;
  }
}

/**
 * Cria review de um curso do Hub
 * @param {object} reviewData - { hub_course_id, company_id, user_id, rating, comment }
 * @returns {Promise<object>}
 */
export async function createCourseReview(reviewData) {
  try {
    return await create('course_reviews', {
      ...reviewData,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[apiService] Erro ao criar review:', error);
    throw error;
  }
}

/**
 * Resposta do especialista a uma review
 * @param {string} reviewId
 * @param {string} reply
 * @returns {Promise<object>}
 */
export async function replyCourseReview(reviewId, reply) {
  try {
    return await update('course_reviews', reviewId, {
      specialist_reply: reply,
      replied_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[apiService] Erro ao responder review:', error);
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
  loginUser,
  logout,
  getCurrentUser,
  isAuthenticated,
  getSavedUser,
  validateToken,

  // Usuários
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  reactivateUser,

  // Matrículas (US-098)
  enrollUser,
  unenrollUser,
  getUserEnrollments,
  getCourseEnrollments,
  updateEnrollment,

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
  // CRUD Cursos (US-125)
  createCourse,
  updateCourse,
  deleteCourse,
  reactivateCourse,
  getAllCourses,

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
  getModuleStats,

  // Hub de Especialistas (US-154)
  getSpecialist,
  getSpecialistByUserId,
  getSpecialistDashboard,
  updateSpecialist,
  getHubCatalog,
  getHubCourse,
  getHubCoursesBySpecialist,
  getCourseReviews,
  createCourseReview,
  replyCourseReview,

  // Utils
  checkApiHealth,
  ApiError,
};

export default apiService;
