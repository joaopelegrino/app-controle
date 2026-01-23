/**
 * Export Utils - Utilitários para exportação de dados
 *
 * US-100: Exportar relatórios Excel
 *
 * Suporta exportação para CSV (compatível com Excel) e JSON.
 * CSV usa separador ponto-e-vírgula para melhor compatibilidade com Excel PT-BR.
 */

/**
 * Converte um array de objetos para CSV
 * @param {array} data - Array de objetos
 * @param {object} options - { columns, headers, separator }
 * @returns {string} CSV string
 */
export function arrayToCSV(data, options = {}) {
  if (!data || data.length === 0) {
    return '';
  }

  const {
    columns = Object.keys(data[0]),
    headers = null,
    separator = ';', // Ponto-e-vírgula para Excel PT-BR
  } = options;

  // Header row
  const headerRow = headers
    ? columns.map((col) => headers[col] || col)
    : columns;

  // Escape função para valores CSV
  const escapeCSV = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    const str = String(value);
    // Se contém separador, aspas ou quebra de linha, envolver em aspas
    if (str.includes(separator) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Build CSV
  const rows = [
    headerRow.map(escapeCSV).join(separator),
    ...data.map((row) =>
      columns.map((col) => escapeCSV(row[col])).join(separator)
    ),
  ];

  // Add BOM for Excel UTF-8 compatibility
  return '\uFEFF' + rows.join('\r\n');
}

/**
 * Faz download de um arquivo
 * @param {string} content - Conteúdo do arquivo
 * @param {string} filename - Nome do arquivo
 * @param {string} mimeType - Tipo MIME
 */
export function downloadFile(content, filename, mimeType = 'text/csv;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Exporta dados para Excel (CSV)
 * @param {array} data - Array de objetos
 * @param {string} filename - Nome do arquivo (sem extensão)
 * @param {object} options - Opções de formatação
 */
export function exportToExcel(data, filename, options = {}) {
  const csv = arrayToCSV(data, options);
  const fullFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  downloadFile(csv, fullFilename, 'text/csv;charset=utf-8');
}

/**
 * Exporta dados para JSON
 * @param {array} data - Array de objetos
 * @param {string} filename - Nome do arquivo (sem extensão)
 */
export function exportToJSON(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const fullFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
  downloadFile(json, fullFilename, 'application/json');
}

// ============================================
// FORMATADORES DE RELATÓRIO
// ============================================

/**
 * Formata relatório de progresso de usuários
 * @param {array} users - Dados de getUsersDashboard
 * @returns {object} { data, columns, headers }
 */
export function formatUsersProgressReport(users) {
  const columns = [
    'full_name',
    'email',
    'role',
    'modules_completed',
    'total_modules_tracked',
    'completion_percentage',
    'last_activity',
  ];

  const headers = {
    full_name: 'Nome Completo',
    email: 'Email',
    role: 'Função',
    modules_completed: 'Módulos Completos',
    total_modules_tracked: 'Total Módulos',
    completion_percentage: 'Progresso (%)',
    last_activity: 'Última Atividade',
  };

  // Formatar dados
  const data = users.map((user) => ({
    ...user,
    role: formatRole(user.role),
    completion_percentage: `${user.completion_percentage}%`,
    last_activity: user.last_activity
      ? formatDate(user.last_activity)
      : 'Sem atividade',
  }));

  return { data, columns, headers };
}

/**
 * Formata relatório de analytics da empresa
 * @param {object} analytics - Dados de getCompanyAnalytics
 * @param {array} users - Dados de getUsersDashboard
 * @returns {object} { data, columns, headers }
 */
export function formatCompanyAnalyticsReport(analytics, users) {
  const columns = [
    'metric',
    'value',
  ];

  const headers = {
    metric: 'Métrica',
    value: 'Valor',
  };

  // Calcular métricas adicionais
  const activeUsers = users.filter((u) => u.modules_completed > 0).length;
  const avgProgress = users.length > 0
    ? Math.round(users.reduce((acc, u) => acc + u.completion_percentage, 0) / users.length)
    : 0;

  const data = [
    { metric: 'Total de Usuários', value: analytics.total_users },
    { metric: 'Usuários Ativos', value: analytics.active_users },
    { metric: 'Usuários com Progresso', value: activeUsers },
    { metric: 'Total Módulos Completados', value: analytics.total_modules_completed },
    { metric: 'Taxa Média de Conclusão', value: `${analytics.avg_completion_rate}%` },
    { metric: 'Progresso Médio', value: `${avgProgress}%` },
  ];

  return { data, columns, headers };
}

/**
 * Formata relatório de matrículas
 * @param {array} enrollments - Dados de getCourseEnrollments
 * @returns {object} { data, columns, headers }
 */
export function formatEnrollmentsReport(enrollments) {
  const columns = [
    'user_name',
    'user_email',
    'course_id',
    'status',
    'assigned_at',
    'due_date',
    'is_overdue',
  ];

  const headers = {
    user_name: 'Nome',
    user_email: 'Email',
    course_id: 'Curso',
    status: 'Status',
    assigned_at: 'Data Matrícula',
    due_date: 'Data Limite',
    is_overdue: 'Atrasado',
  };

  const data = enrollments.map((e) => ({
    ...e,
    status: formatEnrollmentStatus(e.status),
    assigned_at: formatDate(e.assigned_at),
    due_date: e.due_date ? formatDate(e.due_date) : '-',
    is_overdue: e.is_overdue ? 'Sim' : 'Não',
  }));

  return { data, columns, headers };
}

/**
 * Formata relatório de estatísticas de cursos
 * @param {array} stats - Dados de getCourseStats
 * @returns {object} { data, columns, headers }
 */
export function formatCourseStatsReport(stats) {
  const columns = [
    'name',
    'total_modules',
    'enrolled_users',
    'total_completions',
    'completion_rate',
  ];

  const headers = {
    name: 'Curso',
    total_modules: 'Total Módulos',
    enrolled_users: 'Usuários Inscritos',
    total_completions: 'Conclusões',
    completion_rate: 'Taxa Conclusão (%)',
  };

  const data = stats.map((s) => ({
    ...s,
    completion_rate: `${s.completion_rate}%`,
  }));

  return { data, columns, headers };
}

// ============================================
// HELPERS
// ============================================

/**
 * Formata role para português
 */
function formatRole(role) {
  const roles = {
    student: 'Aluno',
    instructor: 'Instrutor',
    admin: 'Administrador',
    c_level: 'C-Level',
  };
  return roles[role] || role;
}

/**
 * Formata status de matrícula
 */
function formatEnrollmentStatus(status) {
  const statuses = {
    enrolled: 'Matriculado',
    in_progress: 'Em Progresso',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  };
  return statuses[status] || status;
}

/**
 * Formata data para exibição
 */
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Gera nome de arquivo com timestamp
 * @param {string} prefix - Prefixo do arquivo
 * @returns {string}
 */
export function generateFilename(prefix) {
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  return `${prefix}_${timestamp}`;
}

// ============================================
// EXPORTAÇÃO
// ============================================

export const exportUtils = {
  arrayToCSV,
  downloadFile,
  exportToExcel,
  exportToJSON,
  formatUsersProgressReport,
  formatCompanyAnalyticsReport,
  formatEnrollmentsReport,
  formatCourseStatsReport,
  generateFilename,
};

export default exportUtils;
