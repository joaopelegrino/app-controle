import React from 'react';
import { usePermissions } from '../hooks/usePermissions';

/**
 * Componente para renderização condicional baseada em permissões/roles
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo a renderizar se autorizado
 * @param {string} [props.permission] - Permissão necessária (ex: 'users.view')
 * @param {string[]} [props.permissions] - Lista de permissões (qualquer uma)
 * @param {string[]} [props.roles] - Lista de roles permitidos
 * @param {boolean} [props.requireAll] - Se true, requer todas as permissões
 * @param {React.ReactNode} [props.fallback] - Conteúdo alternativo se não autorizado
 * @param {boolean} [props.showFallback] - Se deve mostrar fallback (default: false)
 */
export function RoleBasedAccess({
  children,
  permission,
  permissions,
  roles,
  requireAll = false,
  fallback = null,
  showFallback = false
}) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, role } = usePermissions();

  // Verificar autorização
  let isAuthorized = false;

  if (permission) {
    // Verificar permissão única
    isAuthorized = hasPermission(permission);
  } else if (permissions && permissions.length > 0) {
    // Verificar múltiplas permissões
    isAuthorized = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  } else if (roles && roles.length > 0) {
    // Verificar roles diretamente
    isAuthorized = role ? roles.includes(role) : false;
  } else {
    // Se nenhum critério especificado, autoriza por padrão
    isAuthorized = true;
  }

  // Renderizar
  if (isAuthorized) {
    return <>{children}</>;
  }

  if (showFallback && fallback) {
    return <>{fallback}</>;
  }

  return null;
}

/**
 * Componente para mostrar conteúdo apenas para admins
 */
export function AdminOnly({ children, fallback = null }) {
  return (
    <RoleBasedAccess roles={['admin', 'c_level']} fallback={fallback} showFallback={!!fallback}>
      {children}
    </RoleBasedAccess>
  );
}

/**
 * Componente para mostrar conteúdo apenas para instrutores+
 */
export function InstructorOrAbove({ children, fallback = null }) {
  return (
    <RoleBasedAccess roles={['instructor', 'admin', 'c_level']} fallback={fallback} showFallback={!!fallback}>
      {children}
    </RoleBasedAccess>
  );
}

/**
 * Componente para mostrar conteúdo apenas para alunos
 */
export function StudentOnly({ children, fallback = null }) {
  return (
    <RoleBasedAccess roles={['student']} fallback={fallback} showFallback={!!fallback}>
      {children}
    </RoleBasedAccess>
  );
}

/**
 * Componente para mostrar conteúdo apenas para C-Level
 */
export function CLevelOnly({ children, fallback = null }) {
  return (
    <RoleBasedAccess roles={['c_level']} fallback={fallback} showFallback={!!fallback}>
      {children}
    </RoleBasedAccess>
  );
}

export default RoleBasedAccess;
