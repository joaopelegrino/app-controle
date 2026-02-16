---
paths:
  - "src/hooks/usePermissions.js"
  - "src/components/RoleBasedAccess.jsx"
  - "src/config/platform.js"
  - "**/permissions.js"
---

# RBAC - Role-Based Access Control

## Sistema de Permissões (32 permissions, 5 roles)

### Roles Hierárquicos
1. **c_level** - Dashboard executivo, métricas agregadas
2. **admin** - Gestão de usuários e empresa
3. **instructor** - Criação e gestão de cursos
4. **student** - Consumo de cursos
5. **specialist** - Hub de Especialistas (marketplace)

### Hook usePermissions()

**SEMPRE usar** `usePermissions()` em componentes que precisam verificar acesso:

```jsx
import { usePermissions } from '../hooks/usePermissions';

function MyComponent() {
  const { hasPermission, hasAnyPermission, isAdmin, role } = usePermissions();
  
  // Verificar permissão específica
  if (!hasPermission('courses.create')) return null;
  
  // Verificar múltiplas permissões
  if (!hasAnyPermission(['users.view', 'users.manage'])) return null;
  
  // Verificar role direto
  if (isAdmin || isInstructor) { /* ... */ }
}
```

### Componente <RoleBasedAccess>

**Wrapper declarativo** para controle de acesso:

```jsx
import RoleBasedAccess from './components/RoleBasedAccess';

<RoleBasedAccess 
  requiredPermission="courses.create"
  fallback={<AccessDenied />}
>
  <CreateCourseForm />
</RoleBasedAccess>

// Múltiplas permissões (OR)
<RoleBasedAccess requiredPermissions={['users.view', 'users.manage']}>
  <UserList />
</RoleBasedAccess>

// Role específica
<RoleBasedAccess requiredRole="admin">
  <AdminPanel />
</RoleBasedAccess>
```

### Matriz de Permissões (Referência Rápida)

| Categoria | Permission | Roles com Acesso |
|-----------|------------|------------------|
| **Courses** | courses.view | all |
| | courses.create | instructor, admin, c_level |
| | courses.edit | instructor, admin |
| | courses.delete | admin, c_level |
| **Users** | users.view | admin, c_level |
| | users.manage | admin, c_level |
| | users.enroll | admin, instructor |
| **Hub** | hub.view | all |
| | hub.manage_courses | specialist |
| | hub.moderate_reviews | admin, c_level |

### Regras Críticas

1. **NUNCA** verificar role com string literal: ❌ `if (user.role === 'admin')`
2. **SEMPRE** usar hook: ✅ `if (isAdmin)` ou `hasPermission('permission')`
3. **Testes**: Mock completo de `usePermissions()` com `hasPermission()` function
4. **Multi-tenant**: Permissões SEMPRE isoladas por `company_id`
5. **API calls**: Backend deve validar permissões, frontend é apenas UX

### Testing Pattern

```js
vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: () => ({
    isAdmin: false,
    isSpecialist: false,
    isInstructor: false,
    isStudent: true,
    isCLevel: false,
    hasPermission: () => false,
    hasAnyPermission: () => false,
    hasAllPermissions: () => false,
    role: 'student',
    roleLabel: 'Aluno',
    roleColor: 'blue'
  })
}));
```

### Debugging

```js
// Ver permissões do usuário atual
const { permissions, role } = usePermissions();
console.log('Role:', role, 'Permissions:', permissions);
```

---

**Referência:** `src/config/platform.js` para configuração central de RBAC
