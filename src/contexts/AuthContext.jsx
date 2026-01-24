/**
 * AuthContext - Contexto de Autenticação
 *
 * US-108: Autenticação real via NocoDB JWT
 *
 * Este contexto gerencia o estado de autenticação da aplicação:
 * - Login via API NocoDB (busca usuário na tabela users)
 * - Token JWT armazenado em localStorage
 * - Validação automática de token na inicialização
 * - Logout limpa tokens e estado
 *
 * @module contexts/AuthContext
 */

import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'ultrathink_auth';

/**
 * Provider de autenticação
 *
 * Gerencia estado de usuário, empresa e token.
 * Persiste sessão no localStorage.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Verifica autenticação ao iniciar
   * Recupera sessão do localStorage e valida token
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verifica se há sessão salva e se o token ainda é válido
   */
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      // 1. Tentar recuperar sessão do localStorage
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);

      if (!stored) {
        setIsLoading(false);
        return false;
      }

      const { user: storedUser, company: storedCompany, token: storedToken } = JSON.parse(stored);

      // 2. Validar se o token ainda funciona
      const isValid = await apiService.validateToken();

      if (!isValid) {
        // Token expirado ou inválido - limpar sessão
        console.log('[AuthContext] Token inválido, limpando sessão');
        localStorage.removeItem(AUTH_STORAGE_KEY);
        apiService.logout();
        setIsLoading(false);
        return false;
      }

      // 3. Sessão válida - restaurar estado
      setUser(storedUser);
      setCompany(storedCompany);
      setToken(storedToken);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('[AuthContext] Erro ao verificar autenticação:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsLoading(false);
      return false;
    }
  }, []);

  /**
   * Login com email e senha
   *
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<{ user: object, company: object }>}
   * @throws {Error} Se credenciais inválidas
   */
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Chamar API de login
      const result = await apiService.loginUser(email, password);

      const { user: userData, company: companyData, token: authToken } = result;

      // Salvar no state
      setUser(userData);
      setCompany(companyData);
      setToken(authToken);

      // Persistir no localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user: userData,
        company: companyData,
        token: authToken,
      }));

      console.log('[AuthContext] Login realizado:', userData.email);
      return { user: userData, company: companyData };
    } catch (error) {
      // Tratar erros específicos
      let errorMessage = 'Erro ao realizar login';

      if (error.status === 401) {
        errorMessage = error.message || 'Credenciais inválidas';
      } else if (error.status === 400) {
        errorMessage = error.message || 'Dados de login inválidos';
      } else if (error.isOffline) {
        errorMessage = 'Sem conexão com o servidor';
      }

      setAuthError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout - limpa estado e localStorage
   */
  const logout = useCallback(() => {
    console.log('[AuthContext] Logout realizado');

    // Limpar state
    setUser(null);
    setCompany(null);
    setToken(null);
    setAuthError(null);

    // Limpar localStorage
    localStorage.removeItem(AUTH_STORAGE_KEY);

    // Limpar tokens do apiService
    apiService.logout();
  }, []);

  /**
   * Limpa erro de autenticação
   */
  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  /**
   * Atualiza dados do usuário no contexto
   * Usado após edição de perfil, por exemplo
   */
  const updateUserData = useCallback((newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);

    // Atualizar localStorage
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        ...parsed,
        user: updatedUser,
      }));
    }
  }, [user]);

  // Valor do contexto memoizado
  const value = useMemo(() => ({
    // Estado
    user,
    company,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    authError,

    // Ações
    login,
    logout,
    checkAuth,
    clearError,
    updateUserData,
  }), [user, company, token, isLoading, authError, login, logout, checkAuth, clearError, updateUserData]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthContext;
