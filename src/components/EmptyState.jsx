import React from 'react';
import {
  Users, BookOpen, FileText, GraduationCap,
  Search, FolderOpen, Inbox, AlertCircle
} from 'lucide-react';

/**
 * EmptyState - Componente reutilizável para estados vazios
 *
 * US-105: Empty states para listas vazias
 *
 * Uso:
 * <EmptyState
 *   type="users"
 *   title="Nenhum usuário encontrado"
 *   description="Adicione usuários para começar"
 *   actionLabel="Adicionar Usuário"
 *   onAction={() => {}}
 * />
 */

// Configurações de ícones por tipo
const ICON_CONFIG = {
  users: { icon: Users, color: 'blue' },
  students: { icon: GraduationCap, color: 'green' },
  courses: { icon: BookOpen, color: 'purple' },
  notes: { icon: FileText, color: 'amber' },
  search: { icon: Search, color: 'gray' },
  files: { icon: FolderOpen, color: 'orange' },
  inbox: { icon: Inbox, color: 'slate' },
  error: { icon: AlertCircle, color: 'red' },
};

// Mensagens padrão por tipo
const DEFAULT_MESSAGES = {
  users: {
    title: 'Nenhum usuário encontrado',
    description: 'Adicione novos usuários para que apareçam aqui.',
  },
  students: {
    title: 'Nenhum aluno no time',
    description: 'Os alunos matriculados aparecerão aqui.',
  },
  courses: {
    title: 'Nenhum curso disponível',
    description: 'Os cursos ativos aparecerão aqui.',
  },
  notes: {
    title: 'Sem anotações',
    description: 'Este aluno ainda não fez anotações neste curso.',
  },
  search: {
    title: 'Nenhum resultado encontrado',
    description: 'Tente ajustar os filtros de busca.',
  },
  files: {
    title: 'Pasta vazia',
    description: 'Não há arquivos nesta pasta.',
  },
  inbox: {
    title: 'Caixa vazia',
    description: 'Você está em dia!',
  },
  error: {
    title: 'Erro ao carregar',
    description: 'Não foi possível carregar os dados.',
  },
};

export function EmptyState({
  type = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
  compact = false,
}) {
  const config = ICON_CONFIG[type] || ICON_CONFIG.inbox;
  const defaults = DEFAULT_MESSAGES[type] || DEFAULT_MESSAGES.inbox;
  const Icon = config.icon;
  const color = config.color;

  const displayTitle = title || defaults.title;
  const displayDescription = description || defaults.description;

  // Tamanhos baseados no modo compact
  const iconSize = compact ? 'w-10 h-10' : 'w-16 h-16';
  const containerPadding = compact ? 'py-6 px-4' : 'py-12 px-6';
  const titleSize = compact ? 'text-base' : 'text-lg';
  const descriptionSize = compact ? 'text-xs' : 'text-sm';

  // Classes de cor dinâmicas
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-400',
      button: 'bg-blue-500 hover:bg-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-400',
      button: 'bg-green-500 hover:bg-green-600',
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-400',
      button: 'bg-purple-500 hover:bg-purple-600',
    },
    amber: {
      bg: 'bg-amber-50',
      icon: 'text-amber-400',
      button: 'bg-amber-500 hover:bg-amber-600',
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-400',
      button: 'bg-orange-500 hover:bg-orange-600',
    },
    gray: {
      bg: 'bg-gray-50',
      icon: 'text-gray-400',
      button: 'bg-gray-500 hover:bg-gray-600',
    },
    slate: {
      bg: 'bg-slate-50',
      icon: 'text-slate-400',
      button: 'bg-slate-500 hover:bg-slate-600',
    },
    red: {
      bg: 'bg-red-50',
      icon: 'text-red-400',
      button: 'bg-red-500 hover:bg-red-600',
    },
  };

  const colors = colorClasses[color] || colorClasses.gray;

  return (
    <div className={`flex flex-col items-center justify-center text-center ${containerPadding} ${className}`}>
      {/* Ícone com fundo circular */}
      <div className={`${colors.bg} rounded-full p-4 mb-4`}>
        <Icon className={`${iconSize} ${colors.icon}`} />
      </div>

      {/* Título */}
      <h3 className={`${titleSize} font-medium text-gray-900 mb-1`}>
        {displayTitle}
      </h3>

      {/* Descrição */}
      <p className={`${descriptionSize} text-gray-500 max-w-sm mb-4`}>
        {displayDescription}
      </p>

      {/* Ações */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex items-center gap-3">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${colors.button}`}
            >
              {actionLabel}
            </button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * EmptyStateInline - Versão inline para uso em tabelas
 *
 * Uso:
 * <EmptyStateInline colSpan={5} type="users" />
 */
export function EmptyStateInline({
  colSpan = 1,
  type = 'inbox',
  title,
  description,
}) {
  const config = ICON_CONFIG[type] || ICON_CONFIG.inbox;
  const defaults = DEFAULT_MESSAGES[type] || DEFAULT_MESSAGES.inbox;
  const Icon = config.icon;

  const displayTitle = title || defaults.title;
  const displayDescription = description || defaults.description;

  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <Icon className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-600 mb-1">{displayTitle}</p>
          <p className="text-xs text-gray-400">{displayDescription}</p>
        </div>
      </td>
    </tr>
  );
}

export default EmptyState;
