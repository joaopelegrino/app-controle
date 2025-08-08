import React from 'react';

/**
 * AreaCard - Componente reutilizável para cards de áreas de estudo
 * 
 * @param {Object} props
 * @param {string} props.title - Título da área
 * @param {string} props.icon - Ícone emoji da área
 * @param {string} props.description - Descrição da área
 * @param {number} props.modules - Número de módulos
 * @param {number} props.cards - Número de flash cards
 * @param {number} props.hours - Horas de conteúdo
 * @param {string} props.badge - Tipo de badge ('integrated', 'new', 'path')
 * @param {Function} props.onClick - Função de clique
 * @param {string} props.variant - Variante do card ('default', 'learning-path', 'path-area', 'rust-special')
 * @param {number} props.sequenceNumber - Número sequencial para cards de caminho
 * @param {boolean} props.isSystemIntegrated - Se é um sistema integrado
 */
const AreaCard = ({
  title,
  icon,
  description,
  modules = 0,
  cards = 0,
  hours = 0,
  badge,
  onClick,
  variant = 'default',
  sequenceNumber,
  isSystemIntegrated = false,
  preview = null
}) => {
  // Define estilos baseados na variante
  const getContainerStyles = () => {
    switch (variant) {
      case 'learning-path':
        return 'bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1 text-white';
      
      case 'rust-special':
        return 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-400 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all relative overflow-hidden';
      
      case 'path-area':
        return 'bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden';
      
      default:
        return 'bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden';
    }
  };

  const getBadgeStyles = () => {
    switch (badge) {
      case 'integrated':
        return 'bg-blue-500';
      case 'new':
        return 'bg-green-500';
      case 'path':
        return 'bg-purple-500';
      default:
        return '';
    }
  };

  const renderBadge = () => {
    if (!badge && !sequenceNumber && !isSystemIntegrated) return null;

    if (isSystemIntegrated) {
      return (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-orange-500">
          🚀 Sistema
        </div>
      );
    }

    if (sequenceNumber) {
      return (
        <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
          {sequenceNumber}
        </div>
      );
    }

    if (badge) {
      return (
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${getBadgeStyles()}`}>
          {badge === 'integrated' ? 'Integrado' : badge === 'new' ? 'Novo' : 'Caminho'}
        </div>
      );
    }
  };

  const renderPreview = () => {
    if (!preview || !preview.items || preview.items.length === 0) return null;

    return (
      <div className={`mb-4 ${variant === 'learning-path' ? 'text-white/90' : 'text-gray-600'}`}>
        <p className="text-sm font-medium mb-2">Preview dos primeiros flashcards:</p>
        <ul className="space-y-1">
          {preview.items.slice(0, 2).map((item, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {preview.total > 2 && (
          <p className="text-sm mt-2 opacity-75">
            +{preview.total - 2} flashcards adicionais
          </p>
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (variant === 'learning-path') {
      return (
        <div className="flex justify-between text-sm text-white/80 mt-4">
          <span>{modules} módulos</span>
          <span>{hours}h total</span>
          <span className="text-white font-medium">→</span>
        </div>
      );
    }

    if (isSystemIntegrated) {
      return (
        <div className="flex justify-between text-sm text-gray-500">
          <span>{cards} cards</span>
          <span className="text-orange-600 font-medium">🚀 Sistema Integrado</span>
          <span>Área {sequenceNumber}</span>
        </div>
      );
    }

    if (variant === 'path-area') {
      return (
        <div className="flex justify-between text-sm text-gray-500">
          <span>{cards} flashcards</span>
          <span>⏱️ Estudar</span>
        </div>
      );
    }

    return (
      <div className="flex justify-between text-sm text-gray-500">
        <span>{modules} módulos</span>
        <span>{cards} cards</span>
        <span>{hours}h</span>
      </div>
    );
  };

  return (
    <div 
      onClick={onClick}
      className={getContainerStyles()}
    >
      {renderBadge()}
      
      {/* Header */}
      <div className="flex items-center mb-4">
        <span className={`${variant === 'learning-path' ? 'text-6xl' : 'text-4xl'} mr-4`}>
          {icon}
        </span>
        <h3 className={`text-xl font-bold ${variant === 'learning-path' ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className={`mb-4 ${variant === 'learning-path' ? 'text-white/90' : 'text-gray-600'}`}>
        {description}
      </p>

      {/* Preview (se houver) */}
      {renderPreview()}

      {/* Separator (apenas para cards padrão) */}
      {variant === 'path-area' && (
        <div className="border-t border-gray-200 my-4"></div>
      )}

      {/* Footer */}
      {renderFooter()}
    </div>
  );
};

export default AreaCard;