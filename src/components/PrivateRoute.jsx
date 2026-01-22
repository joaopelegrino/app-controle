import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, BookOpen } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/**
 * Componente para proteger rotas que requerem autenticação
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente a ser renderizado se autenticado
 * @param {string[]} [props.roles] - Lista de roles permitidos (opcional)
 * @param {React.ReactNode} [props.fallback] - Componente a mostrar se acesso negado
 */
export function PrivateRoute({ children, roles, fallback }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Verificando autenticação...</span>
          </div>
        </div>
      </div>
    );
  }

  // Redireciona para login se não autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica roles se especificados
  if (roles && roles.length > 0) {
    const hasRequiredRole = roles.includes(user?.role);

    if (!hasRequiredRole) {
      // Se há fallback definido, mostra ele
      if (fallback) {
        return fallback;
      }

      // Senão, mostra página de acesso negado
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-2xl mb-4">
              <span className="text-4xl">🚫</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Acesso Negado</h1>
            <p className="text-gray-400 mb-6">
              Você não tem permissão para acessar esta página.
              Seu perfil atual é <strong className="text-gray-300">{user?.role}</strong>.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Voltar ao início
            </a>
          </div>
        </div>
      );
    }
  }

  // Renderiza o conteúdo protegido
  return children;
}

export default PrivateRoute;
