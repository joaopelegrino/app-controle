/**
 * Configuração i18next - Plataforma de Treinamento B2B
 *
 * @description Internacionalização com lazy loading por namespace
 * @version 1.1.0
 * @date 2026-01-26
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getStorageKey, platformConfig } from '../config/platform';

// Idiomas suportados
export const SUPPORTED_LANGUAGES = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
];

// Namespaces disponíveis
export const NAMESPACES = {
  common: 'common',     // Header, footer, botões genéricos
  auth: 'auth',         // Login, roles, permissões
  dashboard: 'dashboard', // Dashboards por role (lazy)
  courses: 'courses',   // Cursos, módulos (lazy)
  errors: 'errors',     // Mensagens de erro
};

i18n
  // Carrega traduções via HTTP (public/locales)
  .use(Backend)
  // Detecta idioma do navegador/localStorage
  .use(LanguageDetector)
  // Integra com React
  .use(initReactI18next)
  .init({
    // Idioma padrão
    fallbackLng: 'pt-BR',

    // Idiomas suportados (inclui variantes curtas para evitar warnings)
    supportedLngs: ['pt-BR', 'pt', 'en-US', 'en', 'es-ES', 'es'],

    // Carregar apenas idioma exato, não tentar variantes
    load: 'currentOnly',

    // Não usar variantes de idioma (pt -> pt-BR automaticamente)
    nonExplicitSupportedLngs: true,

    // Namespaces carregados inicialmente (não lazy)
    ns: ['common', 'auth', 'errors', 'dashboard'],
    defaultNS: 'common',

    // Configuração do backend HTTP
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Detecção de idioma
    detection: {
      // Ordem de prioridade para detecção
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Onde salvar a preferência
      caches: ['localStorage'],
      // Chave no localStorage (usando config centralizada)
      lookupLocalStorage: getStorageKey('language'),
    },

    // Integração React
    react: {
      // Usar Suspense para loading states
      useSuspense: true,
    },

    // Interpolação
    interpolation: {
      // React já escapa valores, não precisa escapar novamente
      escapeValue: false,
      // Formato de variáveis: {{variavel}}
      format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      },
    },

    // Debug em desenvolvimento
    debug: import.meta.env.DEV,
  });

export default i18n;
