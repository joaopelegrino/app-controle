import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Hook para acessar o contexto de autenticação
 *
 * @returns {{
 *   user: { id: string, email: string, fullName: string, role: string, companyId: string } | null,
 *   company: { id: string, name: string, slug: string, plan: string } | null,
 *   token: string | null,
 *   isAuthenticated: boolean,
 *   isLoading: boolean,
 *   login: (email: string, password: string) => Promise<{ user: object, company: object }>,
 *   logout: () => void,
 *   checkAuth: () => Promise<boolean>
 * }}
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}

export default useAuth;
