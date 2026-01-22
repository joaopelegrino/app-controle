import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Building2, ChevronDown, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';

/**
 * Header com informações do usuário logado
 */
export function UserHeader() {
  const navigate = useNavigate();
  const { user, company, logout } = useAuth();
  const { roleLabel, roleColor, canViewAnalytics } = usePermissions();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo e Empresa */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-5 h-5" />
              <span className="font-medium">{company?.name || 'Empresa'}</span>
            </div>
            {company?.plan && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                {company.plan}
              </span>
            )}
          </div>

          {/* Menu do Usuário */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded ${roleColor}`}>
                {roleLabel}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  {canViewAnalytics && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/admin');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Painel Admin
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
