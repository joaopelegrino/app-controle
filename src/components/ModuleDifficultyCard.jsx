import React from 'react';
import { AlertTriangle, TrendingDown, Users, Target } from 'lucide-react';

/**
 * ModuleDifficultyCard - Exibe módulos difíceis identificados por analytics
 *
 * US-101: Analytics módulos difíceis
 *
 * Mostra:
 * - Lista de módulos com baixa taxa de conclusão
 * - Indicador visual de dificuldade
 * - Estatísticas de usuários por módulo
 *
 * @param {object} props
 * @param {array} props.difficultModules - Lista de módulos difíceis
 * @param {object} props.summary - Resumo das estatísticas
 * @param {boolean} props.isLoading - Estado de carregamento
 * @param {boolean} props.compact - Versão compacta para sidebars
 */
export function ModuleDifficultyCard({
  difficultModules = [],
  summary = {},
  isLoading = false,
  compact = false,
}) {
  /**
   * Retorna cor baseada na dificuldade
   */
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'hard':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-800',
          bar: 'bg-red-500',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800',
          bar: 'bg-yellow-500',
        };
      default:
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-800',
          bar: 'bg-green-500',
        };
    }
  };

  /**
   * Formata ID do módulo para título legível
   */
  const formatModuleTitle = (module) => {
    if (module.title && module.title !== module.id) {
      return module.title;
    }
    // Converter IDs como "bash-2.1" para "Bash 2.1"
    return module.id
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-md ${compact ? 'p-4' : 'p-6'}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (difficultModules.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className={`font-semibold text-gray-800 ${compact ? 'text-base' : 'text-lg'}`}>
            Módulos que Precisam Atenção
          </h3>
        </div>
        <div className="text-center py-6">
          <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <p className="text-gray-600">Nenhum módulo com dificuldade identificada</p>
          <p className="text-sm text-gray-400 mt-1">
            Todos os módulos têm boas taxas de conclusão
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${compact ? 'p-4' : 'p-6'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className={`font-semibold text-gray-800 ${compact ? 'text-base' : 'text-lg'}`}>
            Módulos que Precisam Atenção
          </h3>
        </div>
        {summary.hard_modules_count > 0 && (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            {summary.hard_modules_count} crítico{summary.hard_modules_count > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Summary Stats - apenas versão não compacta */}
      {!compact && summary.total_modules > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-red-600">{summary.hard_modules_count || 0}</p>
            <p className="text-xs text-red-700">Difíceis</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600">{summary.medium_modules_count || 0}</p>
            <p className="text-xs text-yellow-700">Médios</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{summary.easy_modules_count || 0}</p>
            <p className="text-xs text-green-700">Fáceis</p>
          </div>
        </div>
      )}

      {/* Module List */}
      <div className="space-y-3">
        {difficultModules.map((module) => {
          const colors = getDifficultyColor(module.difficulty_level);

          return (
            <div
              key={module.id}
              className={`${colors.bg} rounded-lg p-3 border border-gray-100`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${colors.text} truncate`}>
                    {formatModuleTitle(module)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Curso: {module.course_id}
                  </p>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors.badge} ml-2 whitespace-nowrap`}>
                  {module.difficulty_label}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Taxa de conclusão</span>
                  <span className="font-medium">{module.completion_rate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${colors.bar} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${module.completion_rate}%` }}
                  />
                </div>
              </div>

              {/* Users info */}
              <div className="flex items-center text-xs text-gray-500">
                <Users className="w-3 h-3 mr-1" />
                <span>
                  {module.users_completed} de {module.users_started} usuários concluíram
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer tip */}
      {!compact && difficultModules.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start">
            <TrendingDown className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500">
              Módulos com baixa taxa de conclusão podem indicar conteúdo complexo
              ou necessidade de material de suporte adicional.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuleDifficultyCard;
