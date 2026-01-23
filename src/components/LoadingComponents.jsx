import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * LoadingComponents - Componentes de loading reutilizáveis
 *
 * US-103: Loading states globais
 *
 * Inclui:
 * - Spinner: Indicador de loading circular
 * - SkeletonCard: Skeleton para cards
 * - SkeletonTable: Skeleton para tabelas
 * - SkeletonText: Skeleton para texto
 * - LoadingOverlay: Overlay de loading para tela/seção
 * - LoadingButton: Botão com estado de loading
 */

/**
 * Spinner - Indicador de loading circular
 */
export function Spinner({ size = 'md', color = 'blue', className = '' }) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    blue: 'text-blue-500',
    gray: 'text-gray-500',
    white: 'text-white',
    green: 'text-green-500',
    red: 'text-red-500',
  };

  return (
    <Loader2
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    />
  );
}

/**
 * SkeletonPulse - Base de animação para skeletons
 */
function SkeletonPulse({ className = '', children }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
}

/**
 * SkeletonText - Skeleton para linhas de texto
 */
export function SkeletonText({ lines = 1, className = '' }) {
  const lineWidths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3'];

  return (
    <SkeletonPulse className={className}>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-gray-200 rounded ${lineWidths[i % lineWidths.length]}`}
          />
        ))}
      </div>
    </SkeletonPulse>
  );
}

/**
 * SkeletonCard - Skeleton para cards de estatística
 */
export function SkeletonCard({ className = '' }) {
  return (
    <SkeletonPulse className={className}>
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-16" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
        </div>
      </div>
    </SkeletonPulse>
  );
}

/**
 * SkeletonTableRow - Skeleton para linha de tabela
 */
export function SkeletonTableRow({ columns = 5, className = '' }) {
  return (
    <SkeletonPulse className={className}>
      <tr>
        {Array.from({ length: columns }).map((_, i) => (
          <td key={i} className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
          </td>
        ))}
      </tr>
    </SkeletonPulse>
  );
}

/**
 * SkeletonTable - Skeleton para tabela completa
 */
export function SkeletonTable({ rows = 5, columns = 5, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <SkeletonPulse>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-48" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Array.from({ length: columns }).map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: rows }).map((_, i) => (
                <SkeletonTableRow key={i} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>
      </SkeletonPulse>
    </div>
  );
}

/**
 * SkeletonList - Skeleton para lista de itens
 */
export function SkeletonList({ items = 3, className = '' }) {
  return (
    <SkeletonPulse className={className}>
      <div className="space-y-4">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonPulse>
  );
}

/**
 * SkeletonCourseCard - Skeleton para card de curso
 */
export function SkeletonCourseCard({ className = '' }) {
  return (
    <SkeletonPulse className={className}>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded mr-3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <div className="h-4 bg-gray-200 rounded w-12 ml-auto" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </SkeletonPulse>
  );
}

/**
 * SkeletonDashboard - Skeleton para layout de dashboard completo
 */
export function SkeletonDashboard({ className = '' }) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header skeleton */}
      <SkeletonPulse>
        <div className="bg-white shadow-sm px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded mr-4" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 rounded w-32" />
              <div className="h-10 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
      </SkeletonPulse>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8">
        <div className="lg:col-span-2">
          <SkeletonTable rows={5} columns={5} />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCourseCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * LoadingOverlay - Overlay de loading para tela inteira ou seção
 */
export function LoadingOverlay({
  show = false,
  message = 'Carregando...',
  fullScreen = false,
  blur = true,
  className = '',
}) {
  if (!show) return null;

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50'
    : 'absolute inset-0 z-10';

  return (
    <div
      className={`${containerClasses} flex items-center justify-center ${
        blur ? 'bg-white/70 backdrop-blur-sm' : 'bg-white/90'
      } ${className}`}
    >
      <div className="text-center">
        <Spinner size="xl" color="blue" className="mx-auto mb-4" />
        {message && (
          <p className="text-gray-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

/**
 * LoadingButton - Botão com estado de loading
 */
export function LoadingButton({
  isLoading = false,
  loadingText = 'Carregando...',
  children,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`relative ${className} ${
        isLoading ? 'cursor-wait' : ''
      } ${disabled || isLoading ? 'opacity-75' : ''}`}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" color="white" />
          {loadingText && <span className="ml-2">{loadingText}</span>}
        </span>
      )}
      <span className={isLoading ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  );
}

/**
 * InlineLoading - Loading inline para uso em listas/itens
 */
export function InlineLoading({ message = '', className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-gray-500 ${className}`}>
      <Spinner size="sm" color="gray" />
      {message && <span className="text-sm">{message}</span>}
    </div>
  );
}

/**
 * PageLoading - Loading para página inteira (substituição de conteúdo)
 */
export function PageLoading({ message = 'Carregando...', className = '' }) {
  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <Spinner size="xl" color="blue" className="mx-auto mb-4" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

export default {
  Spinner,
  SkeletonText,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonTable,
  SkeletonList,
  SkeletonCourseCard,
  SkeletonDashboard,
  LoadingOverlay,
  LoadingButton,
  InlineLoading,
  PageLoading,
};
