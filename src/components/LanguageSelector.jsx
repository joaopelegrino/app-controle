/**
 * LanguageSelector - Seletor de Idioma
 *
 * @description Componente para troca de idioma da aplicação
 * @version 1.0.0
 * @date 2026-01-26
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n';

/**
 * Seletor de idioma com dropdown
 * @param {Object} props
 * @param {string} props.variant - 'dropdown' | 'buttons' | 'minimal'
 * @param {string} props.className - Classes CSS adicionais
 */
export function LanguageSelector({ variant = 'dropdown', className = '' }) {
  const { i18n, t } = useTranslation('common');

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  // Variante minimal (apenas ícone + código)
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Globe className="w-4 h-4 text-gray-400" />
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent text-gray-300 text-sm border-none focus:outline-none cursor-pointer"
          aria-label={t('language.select')}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-gray-800">
              {lang.code.split('-')[0].toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Variante buttons (botões lado a lado)
  if (variant === 'buttons') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              i18n.language === lang.code
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    );
  }

  // Variante dropdown (padrão)
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-400" />
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none pr-8"
          aria-label={t('language.select')}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
        {/* Seta customizada */}
        <svg
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Hook para obter informações do idioma atual
 */
export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === i18n.language);

  return {
    currentCode: i18n.language,
    currentName: currentLanguage?.name || 'Unknown',
    currentFlag: currentLanguage?.flag || '🌐',
    supportedLanguages: SUPPORTED_LANGUAGES,
    changeLanguage: (code) => i18n.changeLanguage(code),
    isRTL: i18n.dir() === 'rtl',
  };
}

export default LanguageSelector;
