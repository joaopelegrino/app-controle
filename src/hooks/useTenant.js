/**
 * Hook useTenant - Acesso ao contexto de multi-tenancy
 *
 * US-075: Filtrar dados por tenant
 *
 * Re-exporta o hook do TenantContext para facilitar imports
 */

import { useTenant } from '../contexts/TenantContext';

export { useTenant };
export default useTenant;
