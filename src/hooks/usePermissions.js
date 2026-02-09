import { useMemo } from 'react';
import { useAuth } from './useAuth';

/**
 * Matriz RBAC - Define permissões por role
 * Roles: student, instructor, admin, c_level, specialist
 */
const PERMISSIONS = {
  // Acesso a cursos
  'courses.view': ['student', 'instructor', 'admin', 'c_level', 'specialist'],
  'courses.progress': ['student', 'instructor', 'admin', 'c_level', 'specialist'],
  'courses.notes': ['student', 'instructor', 'admin', 'c_level', 'specialist'],
  'courses.edit': ['instructor', 'admin'],
  'courses.create': ['admin'],
  'courses.delete': ['admin'],

  // Trilhas de aprendizado
  'paths.view': ['student', 'instructor', 'admin', 'c_level'],
  'paths.edit': ['admin'],

  // Dashboard de progresso
  'dashboard.own': ['student', 'instructor', 'admin', 'c_level', 'specialist'],
  'dashboard.team': ['instructor', 'admin', 'c_level'],
  'dashboard.company': ['admin', 'c_level'],

  // Analytics
  'analytics.basic': ['instructor', 'admin', 'c_level'],
  'analytics.advanced': ['admin', 'c_level'],
  'analytics.export': ['admin', 'c_level'],

  // Gestão de usuários
  'users.view': ['admin', 'c_level'],
  'users.create': ['admin'],
  'users.edit': ['admin'],
  'users.delete': ['admin'],

  // Configurações da empresa
  'company.view': ['admin', 'c_level'],
  'company.edit': ['c_level'],

  // Auditoria
  'audit.view': ['admin', 'c_level'],

  // Admin do sistema
  'admin.access': ['admin', 'c_level'],
  'admin.full': ['c_level'],

  // Hub de Especialistas - Cursos
  'hub_courses.create': ['specialist'],
  'hub_courses.edit_own': ['specialist'],
  'hub_courses.delete_own': ['specialist'],
  'hub_courses.view_own': ['specialist'],
  'hub_courses.approve': ['admin', 'c_level'],

  // Hub de Especialistas - Analytics e Revenue
  'hub_analytics.view_own': ['specialist'],
  'hub_revenue.view_own': ['specialist'],

  // Hub de Especialistas - Catálogo
  'hub_catalog.view': ['student', 'instructor', 'admin', 'c_level', 'specialist'],

  // Reviews
  'reviews.create': ['student', 'instructor', 'admin'],
  'reviews.reply_own': ['specialist'],

  // Gestão de especialistas
  'specialists.approve': ['admin', 'c_level'],
};

/**
 * Labels amigáveis para roles
 */
const ROLE_LABELS = {
  student: 'Aluno',
  instructor: 'Instrutor',
  admin: 'Administrador',
  c_level: 'C-Level',
  specialist: 'Especialista'
};

/**
 * Cores para badges de roles
 */
const ROLE_COLORS = {
  student: 'bg-blue-100 text-blue-800',
  instructor: 'bg-green-100 text-green-800',
  admin: 'bg-purple-100 text-purple-800',
  c_level: 'bg-amber-100 text-amber-800',
  specialist: 'bg-indigo-100 text-indigo-800'
};

/**
 * Hook para gerenciar permissões baseadas em role
 *
 * @returns {{
 *   hasPermission: (permission: string) => boolean,
 *   hasAnyPermission: (permissions: string[]) => boolean,
 *   hasAllPermissions: (permissions: string[]) => boolean,
 *   role: string | null,
 *   roleLabel: string,
 *   roleColor: string,
 *   isStudent: boolean,
 *   isInstructor: boolean,
 *   isAdmin: boolean,
 *   isCLevel: boolean,
 *   isSpecialist: boolean,
 *   canManageUsers: boolean,
 *   canViewAnalytics: boolean,
 *   canEditCourses: boolean,
 *   canCreateCourses: boolean,
 *   canDeleteCourses: boolean,
 *   canManageHubCourses: boolean,
 *   canViewCatalog: boolean,
 *   canApproveSpecialists: boolean
 * }}
 */
export function usePermissions() {
  const { user } = useAuth();
  const role = user?.role || null;

  // Memoizar permissões
  const permissions = useMemo(() => {
    // Verificar se usuário tem uma permissão específica
    const hasPermission = (permission) => {
      if (!role) return false;
      const allowedRoles = PERMISSIONS[permission];
      if (!allowedRoles) return false;
      return allowedRoles.includes(role);
    };

    // Verificar se tem pelo menos uma das permissões
    const hasAnyPermission = (permissionList) => {
      return permissionList.some(p => hasPermission(p));
    };

    // Verificar se tem todas as permissões
    const hasAllPermissions = (permissionList) => {
      return permissionList.every(p => hasPermission(p));
    };

    // Labels e cores
    const roleLabel = role ? ROLE_LABELS[role] || role : 'Visitante';
    const roleColor = role ? ROLE_COLORS[role] || 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800';

    // Verificações de role diretas
    const isStudent = role === 'student';
    const isInstructor = role === 'instructor';
    const isAdmin = role === 'admin';
    const isCLevel = role === 'c_level';
    const isSpecialist = role === 'specialist';

    // Permissões comuns pré-calculadas
    const canManageUsers = hasPermission('users.view');
    const canViewAnalytics = hasPermission('analytics.basic');
    const canEditCourses = hasPermission('courses.edit');
    const canCreateCourses = hasPermission('courses.create');
    const canDeleteCourses = hasPermission('courses.delete');

    // Permissões Hub de Especialistas
    const canManageHubCourses = hasPermission('hub_courses.create');
    const canViewCatalog = hasPermission('hub_catalog.view');
    const canApproveSpecialists = hasPermission('specialists.approve');

    return {
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      role,
      roleLabel,
      roleColor,
      isStudent,
      isInstructor,
      isAdmin,
      isCLevel,
      isSpecialist,
      canManageUsers,
      canViewAnalytics,
      canEditCourses,
      canCreateCourses,
      canDeleteCourses,
      canManageHubCourses,
      canViewCatalog,
      canApproveSpecialists
    };
  }, [role]);

  return permissions;
}

export default usePermissions;
