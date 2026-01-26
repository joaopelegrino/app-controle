/**
 * i18n - Módulo de Internacionalização
 *
 * @usage
 * // No main.jsx (entry point)
 * import './i18n';
 *
 * // Nos componentes
 * import { useTranslation } from 'react-i18next';
 * const { t } = useTranslation('auth');
 * <h1>{t('login.title')}</h1>
 */
import i18n, { SUPPORTED_LANGUAGES, NAMESPACES } from './config';

export { SUPPORTED_LANGUAGES, NAMESPACES };
export default i18n;
