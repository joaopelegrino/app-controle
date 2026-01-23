import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/apiService';

/**
 * TenantContext - Gerenciamento de multi-tenancy
 *
 * US-075: Filtrar dados por tenant (empresa)
 *
 * Fornece:
 * - Dados da empresa atual
 * - Filtros automáticos para queries
 * - Validação de acesso a recursos
 */
const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  const { user, company, isAuthenticated } = useAuth();

  /**
   * ID da empresa atual (para filtros)
   */
  const tenantId = useMemo(() => {
    return user?.companyId || null;
  }, [user?.companyId]);

  /**
   * Dados completos da empresa
   */
  const tenant = useMemo(() => {
    if (!company) return null;
    return {
      id: company.id,
      name: company.name,
      slug: company.slug,
      plan: company.plan,
    };
  }, [company]);

  /**
   * Adiciona filtro de tenant a um objeto de query
   * @param {object} query - Query original
   * @returns {object} - Query com filtro de tenant
   */
  const withTenantFilter = useCallback((query = {}) => {
    if (!tenantId) return query;
    return {
      ...query,
      company_id: tenantId,
    };
  }, [tenantId]);

  /**
   * Gera cláusula WHERE para NocoDB com filtro de tenant
   * @param {string} existingWhere - Cláusula WHERE existente
   * @returns {string} - WHERE com filtro de tenant
   */
  const getTenantWhere = useCallback((existingWhere = '') => {
    if (!tenantId) return existingWhere;

    const tenantFilter = `(company_id,eq,${tenantId})`;
    if (!existingWhere) return tenantFilter;
    return `${existingWhere}~and${tenantFilter}`;
  }, [tenantId]);

  /**
   * Verifica se um recurso pertence ao tenant atual
   * @param {object} resource - Recurso com company_id
   * @returns {boolean}
   */
  const belongsToTenant = useCallback((resource) => {
    if (!tenantId || !resource) return false;
    return resource.company_id === tenantId;
  }, [tenantId]);

  /**
   * Busca usuários da empresa atual
   * @returns {Promise<array>}
   */
  const getCompanyUsers = useCallback(async () => {
    if (!tenantId) return [];
    try {
      return await apiService.getCompanyUsers(tenantId);
    } catch (error) {
      console.error('[TenantContext] Erro ao buscar usuários:', error);
      return [];
    }
  }, [tenantId]);

  /**
   * Busca estatísticas da empresa
   * @returns {Promise<object>}
   */
  const getCompanyStats = useCallback(async () => {
    if (!tenantId) return null;
    try {
      // Buscar da view v_company_progress
      const response = await apiService.getCompany(tenantId);
      return response;
    } catch (error) {
      console.error('[TenantContext] Erro ao buscar stats:', error);
      return null;
    }
  }, [tenantId]);

  const value = useMemo(() => ({
    // Dados
    tenantId,
    tenant,
    isMultiTenant: false, // Por enquanto, single-tenant por sessão

    // Helpers para queries
    withTenantFilter,
    getTenantWhere,
    belongsToTenant,

    // API helpers
    getCompanyUsers,
    getCompanyStats,
  }), [
    tenantId,
    tenant,
    withTenantFilter,
    getTenantWhere,
    belongsToTenant,
    getCompanyUsers,
    getCompanyStats,
  ]);

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}

/**
 * Hook para acessar o contexto de tenant
 * @returns {object}
 */
export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant deve ser usado dentro de TenantProvider');
  }
  return context;
}

export default TenantContext;
