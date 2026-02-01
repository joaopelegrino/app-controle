import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, Home, LayoutDashboard, Users, BarChart2,
  GraduationCap, LogOut, Building2, User, ChevronRight, HelpCircle, ExternalLink
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { getConfig } from '../config/platform';

/**
 * MobileMenu - Menu hamburger para navegação mobile
 *
 * US-107: Responsividade Mobile
 *
 * Uso:
 * <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
 */
export function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, company, logout } = useAuth();
  const { role, roleLabel, roleColor, hasPermission } = usePermissions();
  const menuRef = useRef(null);

  // Fechar menu com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevenir scroll do body quando menu aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Delay para evitar fechar imediatamente ao abrir
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  // Definir itens de navegação baseado em permissões
  const navItems = [
    {
      label: 'Hub',
      path: '/',
      icon: Home,
      show: true,
    },
    {
      label: 'Meu Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      show: true,
    },
    {
      label: 'Meu Time',
      path: '/instructor',
      icon: GraduationCap,
      show: hasPermission('dashboard.team'),
    },
    {
      label: 'Administração',
      path: '/admin',
      icon: Users,
      show: hasPermission('admin.access'),
    },
    {
      label: 'Executivo',
      path: '/admin/executive',
      icon: BarChart2,
      show: role === 'c_level',
    },
  ].filter((item) => item.show);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Header do Menu */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-800 truncate">
              {company?.name || 'Empresa'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Info do Usuário */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="mt-2">
            <span className={`inline-block px-2 py-0.5 text-xs rounded ${roleColor}`}>
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer com Ajuda + Logout */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          {/* Link para Documentação */}
          <a
            href={getConfig('platform.docsUrl', '/docs/')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Ajuda</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}

/**
 * MobileMenuButton - Botão hamburger para abrir o menu
 *
 * Uso:
 * <MobileMenuButton onClick={() => setIsOpen(true)} />
 */
export function MobileMenuButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden ${className}`}
      aria-label="Abrir menu"
    >
      <Menu className="w-6 h-6 text-gray-600" />
    </button>
  );
}

export default MobileMenu;
