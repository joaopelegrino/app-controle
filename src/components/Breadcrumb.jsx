import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Componente de Breadcrumb - Navegação Hierárquica Acessível
 *
 * Implementado seguindo WCAG 2.1 AA e skill breadcrumb-impl
 *
 * @param {Array} items - Lista de itens do breadcrumb
 * @param {string} items[].label - Texto exibido
 * @param {string} items[].icon - Emoji ou ícone (opcional)
 * @param {Function} items[].onClick - Callback ao clicar (opcional)
 * @param {boolean} items[].current - Se é o item atual (último)
 */
export const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current || isLast;

          return (
            <li key={index} className="flex items-center gap-2">
              {/* Item do Breadcrumb */}
              {item.onClick && !isCurrent ? (
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  aria-label={`Navegar para ${item.label}`}
                >
                  {item.icon && <span aria-hidden="true">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ) : (
                <span
                  className={`flex items-center gap-1.5 ${
                    isCurrent
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-600'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.icon && <span aria-hidden="true">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}

              {/* Separador (exceto no último item) */}
              {!isLast && (
                <ChevronRight
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Versão mobile responsiva implementada via Tailwind (classes acima) */}
    </nav>
  );
};
