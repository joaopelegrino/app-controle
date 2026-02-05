# RBAC - Sistema de Permissoes

O app-controle implementa um sistema de controle de acesso baseado em roles (RBAC - Role-Based Access Control).

## Visao Geral

O sistema define **4 perfis** com permissoes crescentes:

```
student < instructor < admin < c_level
```

---

## Perfis (Roles)

### Student (Aluno)

Usuario padrao com acesso aos cursos.

**Uso:** Colaboradores em treinamento

**Permissoes:**
- Ver cursos matriculados
- Completar modulos
- Fazer anotacoes
- Ver progresso proprio

### Instructor (Instrutor)

Lider tecnico que acompanha equipe.

**Uso:** Tech leads, mentores, gerentes de equipe

**Permissoes:**
- Todas de student
- Ver dashboard da equipe
- Ver progresso dos alunos
- Ver notas dos alunos
- Analytics basico

### Admin (Administrador)

Gestor da plataforma.

**Uso:** RH, T&D, coordenadores

**Permissoes:**
- Todas de instructor
- Criar/editar/desativar usuarios
- Criar/editar/arquivar cursos
- Matricular usuarios
- Exportar dados
- Analytics completo

### C-Level (Executivo)

Acesso completo com visao estrategica.

**Uso:** CEO, CTO, Diretores

**Permissoes:**
- Todas de admin
- Dashboard executivo
- Metricas de ROI
- Comparativos entre equipes

---

## Matriz de Permissoes

### Cursos

| Permissao | Student | Instructor | Admin | C-Level |
|-----------|---------|------------|-------|---------|
| courses.view | ✅ | ✅ | ✅ | ✅ |
| courses.progress | ✅ | ✅ | ✅ | ✅ |
| courses.notes | ✅ | ✅ | ✅ | ✅ |
| courses.assign | ❌ | ❌ | ✅ | ✅ |
| courses.create | ❌ | ❌ | ✅ | ✅ |
| courses.edit | ❌ | ✅ | ✅ | ✅ |
| courses.delete | ❌ | ❌ | ✅ | ✅ |

### Dashboard

| Permissao | Student | Instructor | Admin | C-Level |
|-----------|---------|------------|-------|---------|
| dashboard.own | ✅ | ✅ | ✅ | ✅ |
| dashboard.team | ❌ | ✅ | ✅ | ✅ |
| dashboard.company | ❌ | ❌ | ✅ | ✅ |

### Usuarios

| Permissao | Student | Instructor | Admin | C-Level |
|-----------|---------|------------|-------|---------|
| users.view | ❌ | ❌ | ✅ | ✅ |
| users.create | ❌ | ❌ | ✅ | ✅ |
| users.edit | ❌ | ❌ | ✅ | ✅ |
| users.delete | ❌ | ❌ | ✅ | ✅ |

### Analytics

| Permissao | Student | Instructor | Admin | C-Level |
|-----------|---------|------------|-------|---------|
| analytics.basic | ❌ | ✅ | ✅ | ✅ |
| analytics.export | ❌ | ❌ | ✅ | ✅ |
| analytics.advanced | ❌ | ❌ | ✅ | ✅ |

### Admin

| Permissao | Student | Instructor | Admin | C-Level |
|-----------|---------|------------|-------|---------|
| admin.access | ❌ | ❌ | ✅ | ✅ |

---

## Implementacao

### Hook usePermissions

```javascript
import { usePermissions } from '../hooks/usePermissions';

function MyComponent() {
  const {
    role,
    roleLabel,
    roleColor,
    hasPermission,
    canViewCourses,
    canManageUsers,
    canExport,
  } = usePermissions();

  // Verificar permissao especifica
  if (hasPermission('users.create')) {
    return <CreateUserButton />;
  }

  // Verificar role
  if (role === 'admin' || role === 'c_level') {
    return <AdminDashboard />;
  }

  // Usar helpers
  if (canManageUsers) {
    return <UsersList />;
  }
}
```

### Helpers Disponiveis

```javascript
const {
  // Informacoes do role
  role,           // 'student' | 'instructor' | 'admin' | 'c_level'
  roleLabel,      // 'Aluno' | 'Instrutor' | 'Administrador' | 'Executivo'
  roleColor,      // Cor Tailwind para badges

  // Verificacao de permissao
  hasPermission,  // (permission: string) => boolean

  // Helpers de cursos
  canViewCourses,    // courses.view
  canEditCourses,    // courses.edit
  canCreateCourses,  // courses.create
  canDeleteCourses,  // courses.delete
  canAssignCourses,  // courses.assign

  // Helpers de usuarios
  canManageUsers,    // users.view + create + edit + delete

  // Helpers de analytics
  canViewAnalytics,  // analytics.basic
  canExport,         // analytics.export

  // Helpers de admin
  isAdmin,           // admin.access
  isExecutive,       // c_level
} = usePermissions();
```

### PrivateRoute

```jsx
import { PrivateRoute } from '../components/PrivateRoute';

// Rota protegida por autenticacao
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <UserDashboard />
    </PrivateRoute>
  }
/>

// Rota protegida por role
<Route
  path="/admin"
  element={
    <PrivateRoute requiredRole="admin">
      <AdminDashboard />
    </PrivateRoute>
  }
/>

// Rota protegida por permissao
<Route
  path="/reports"
  element={
    <PrivateRoute requiredPermission="analytics.export">
      <Reports />
    </PrivateRoute>
  }
/>
```

---

## Rotas por Perfil

| Rota | Componente | Perfis Permitidos |
|------|------------|-------------------|
| `/login` | LoginView | Publico |
| `/` | HubView | Todos autenticados |
| `/dashboard` | UserDashboard | Todos autenticados |
| `/curso/:id` | CourseView | Todos autenticados |
| `/instructor` | InstructorDashboard | instructor, admin, c_level |
| `/admin` | AdminDashboard | admin, c_level |
| `/admin/executive` | ExecutiveDashboard | c_level |

---

## Banco de Dados

### Coluna role

```sql
CREATE TYPE user_role AS ENUM (
  'student',
  'instructor',
  'admin',
  'c_level'
);

ALTER TABLE users ADD COLUMN role user_role DEFAULT 'student';
```

### Query de Permissao

```sql
-- Usuarios admin ou superior
SELECT * FROM users
WHERE role IN ('admin', 'c_level');

-- Usuarios com acesso a dashboard de equipe
SELECT * FROM users
WHERE role IN ('instructor', 'admin', 'c_level');
```

---

## Multi-Tenancy

O sistema tambem implementa isolamento por empresa:

- Usuarios so veem dados da propria empresa
- Company_id e filtrado automaticamente
- Admin/C-Level veem apenas sua empresa

```javascript
const { companyId } = useAuth();

// API filtra automaticamente
const users = await apiService.getCompanyUsers(companyId);
```

---

## Auditoria

Acoes sensíveis sao logadas:

| Acao | Dados Logados |
|------|---------------|
| Criar usuario | user_id, created_by, timestamp |
| Editar usuario | user_id, changes, edited_by, timestamp |
| Desativar usuario | user_id, deactivated_by, timestamp |
| Login | user_id, ip, timestamp, success |
| Logout | user_id, timestamp |

---

## Boas Praticas

### Principio do Menor Privilegio

- Atribua o role minimo necessario
- Student para quem so precisa treinar
- Instructor para quem acompanha equipe
- Admin para quem gerencia plataforma

### Revisao Periodica

- Revise roles trimestralmente
- Remova acessos de usuarios inativos
- Audite acoes de admins

### Segregacao de Funcoes

- Evite que uma pessoa acumule todos os acessos
- Separe criacao de aprovacao
- Mantenha logs de auditoria

---

## Troubleshooting

### Usuario sem acesso esperado

1. Verificar role no banco:
```sql
SELECT email, role FROM users WHERE email = 'user@email.com';
```

2. Verificar token JWT:
```javascript
const decoded = jwt.decode(token);
console.log(decoded.role);
```

3. Limpar localStorage e relogar

### Permissao nao reconhecida

1. Verificar se permissao existe em `usePermissions.js`
2. Verificar mapeamento role → permissoes
3. Verificar se componente usa o hook corretamente

---

## Referencias

- [NIST RBAC](https://csrc.nist.gov/projects/role-based-access-control)
- [OWASP Access Control](https://owasp.org/www-community/Access_Control)
