import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'ultrathink_auth';

// Demo: senha padrão para todos os usuários
const DEMO_PASSWORD = 'Demo@2026';

// Dados de demo espelhando o banco PostgreSQL (seed-demo-completo.sql)
const DEMO_COMPANIES = {
  '550e8400-e29b-41d4-a716-446655440001': {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Acme Tech Solutions',
    slug: 'acme-tech',
    plan: 'starter'
  },
  '550e8400-e29b-41d4-a716-446655440002': {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'DevCorp Consulting',
    slug: 'devcorp',
    plan: 'professional'
  }
};

const DEMO_USERS = {
  // ACME TECH SOLUTIONS
  'ceo@acmetech.com': {
    id: '650e8400-e29b-41d4-a716-446655440001',
    email: 'ceo@acmetech.com',
    fullName: 'Roberto Mendes',
    role: 'c_level',
    companyId: '550e8400-e29b-41d4-a716-446655440001',
    active: true
  },
  'admin@acmetech.com': {
    id: '650e8400-e29b-41d4-a716-446655440002',
    email: 'admin@acmetech.com',
    fullName: 'João Silva',
    role: 'admin',
    companyId: '550e8400-e29b-41d4-a716-446655440001',
    active: true
  },
  'prof@acmetech.com': {
    id: '650e8400-e29b-41d4-a716-446655440003',
    email: 'prof@acmetech.com',
    fullName: 'Fernanda Lima',
    role: 'instructor',
    companyId: '550e8400-e29b-41d4-a716-446655440001',
    active: true
  },
  'maria@acmetech.com': {
    id: '650e8400-e29b-41d4-a716-446655440004',
    email: 'maria@acmetech.com',
    fullName: 'Maria Santos',
    role: 'student',
    companyId: '550e8400-e29b-41d4-a716-446655440001',
    active: true
  },
  'pedro@acmetech.com': {
    id: '650e8400-e29b-41d4-a716-446655440005',
    email: 'pedro@acmetech.com',
    fullName: 'Pedro Costa',
    role: 'student',
    companyId: '550e8400-e29b-41d4-a716-446655440001',
    active: true
  },
  'ana@acmetech.com': {
    id: '650e8400-e29b-41d4-a716-446655440006',
    email: 'ana@acmetech.com',
    fullName: 'Ana Ferreira',
    role: 'student',
    companyId: '550e8400-e29b-41d4-a716-446655440001',
    active: true
  },
  // DEVCORP CONSULTING
  'cto@devcorp.com': {
    id: '650e8400-e29b-41d4-a716-446655440007',
    email: 'cto@devcorp.com',
    fullName: 'Carla Souza',
    role: 'c_level',
    companyId: '550e8400-e29b-41d4-a716-446655440002',
    active: true
  },
  'admin@devcorp.com': {
    id: '650e8400-e29b-41d4-a716-446655440008',
    email: 'admin@devcorp.com',
    fullName: 'Lucas Oliveira',
    role: 'admin',
    companyId: '550e8400-e29b-41d4-a716-446655440002',
    active: true
  },
  'prof@devcorp.com': {
    id: '650e8400-e29b-41d4-a716-446655440009',
    email: 'prof@devcorp.com',
    fullName: 'Carlos Santos',
    role: 'instructor',
    companyId: '550e8400-e29b-41d4-a716-446655440002',
    active: true
  },
  'julia@devcorp.com': {
    id: '650e8400-e29b-41d4-a716-446655440010',
    email: 'julia@devcorp.com',
    fullName: 'Julia Almeida',
    role: 'student',
    companyId: '550e8400-e29b-41d4-a716-446655440002',
    active: true
  },
  'bruno@devcorp.com': {
    id: '650e8400-e29b-41d4-a716-446655440011',
    email: 'bruno@devcorp.com',
    fullName: 'Bruno Costa',
    role: 'student',
    companyId: '550e8400-e29b-41d4-a716-446655440002',
    active: true
  },
  'camila@devcorp.com': {
    id: '650e8400-e29b-41d4-a716-446655440012',
    email: 'camila@devcorp.com',
    fullName: 'Camila Rocha',
    role: 'student',
    companyId: '550e8400-e29b-41d4-a716-446655440002',
    active: true
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação ao iniciar
  useEffect(() => {
    checkAuth();
  }, []);

  // Verificar se há sessão salva
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { user: storedUser, company: storedCompany, token: storedToken } = JSON.parse(stored);
        setUser(storedUser);
        setCompany(storedCompany);
        setToken(storedToken);
      }
    } catch (error) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
    return !!user;
  }, [user]);

  // Login com email e senha
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      // Simular latência de rede
      await new Promise(resolve => setTimeout(resolve, 500));

      // Verificar senha padrão da demo
      if (password !== DEMO_PASSWORD) {
        throw new Error('Credenciais inválidas');
      }

      // Buscar usuário nos dados mock
      const userData = DEMO_USERS[email.toLowerCase()];

      if (!userData) {
        throw new Error('Usuário não encontrado');
      }

      if (!userData.active) {
        throw new Error('Usuário inativo');
      }

      // Buscar empresa do usuário
      const companyData = DEMO_COMPANIES[userData.companyId];

      // Criar token simulado para demo
      const demoToken = btoa(JSON.stringify({
        userId: userData.id,
        email: userData.email,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
      }));

      const userPayload = {
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role,
        companyId: userData.companyId
      };

      const companyPayload = companyData ? {
        id: companyData.id,
        name: companyData.name,
        slug: companyData.slug,
        plan: companyData.plan
      } : null;

      // Salvar no state
      setUser(userPayload);
      setCompany(companyPayload);
      setToken(demoToken);

      // Persistir no localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user: userPayload,
        company: companyPayload,
        token: demoToken
      }));

      return { user: userPayload, company: companyPayload };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setCompany(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  // Valor do contexto memoizado
  const value = useMemo(() => ({
    user,
    company,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth
  }), [user, company, token, isLoading, login, logout, checkAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthContext;
