# ROADMAP - Implementação Demo B2B Completa

**Branch:** demo-nocodb-simple
**Data Início:** 2026-01-22
**Objetivo:** Demo B2B com autenticação, RBAC e integração FE↔BE

---

## Visão Geral do Roadmap

```
╔══════════════════════════════════════════════════════════════════╗
║  SPRINT 6: AUTENTICAÇÃO E RBAC                                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  FASE 1: Schema & Dados         ████████░░░░░░░░  [4 tasks]      ║
║  FASE 2: Autenticação Frontend  ████████░░░░░░░░  [4 tasks]      ║
║  FASE 3: Integração API         ████████░░░░░░░░  [4 tasks]      ║
║  FASE 4: RBAC & Permissões      ████████░░░░░░░░  [4 tasks]      ║
║  FASE 5: Dashboard & Polish     ████░░░░░░░░░░░░  [3 tasks]      ║
║                                                                   ║
║  Total: 19 tasks | Status: TODO                                  ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## FASE 1: Schema & Dados de Demo

### US-060: Atualizar Schema para RBAC
**Complexidade:** [L]

**Descrição:**
Como desenvolvedor, preciso atualizar o schema do PostgreSQL para suportar o role `c_level` e criar as tabelas de Learning Paths.

**Critérios de Aceite:**
- [ ] Campo `role` aceita: student, instructor, admin, c_level
- [ ] Tabela `learning_paths` criada
- [ ] Tabela `learning_path_courses` criada
- [ ] Índices apropriados criados

**Arquivos:**
- `database/migration-001-rbac.sql` (criar)

---

### US-061: Criar Cursos Placeholder
**Complexidade:** [L]

**Descrição:**
Como desenvolvedor, preciso criar os cursos placeholder (Linux, Docker, DevOps) no banco para o caminho "Desenvolvedor Backend".

**Critérios de Aceite:**
- [ ] Curso `linux` criado (status: in-development)
- [ ] Curso `docker` criado (status: in-development)
- [ ] Curso `devops` criado (status: in-development)
- [ ] Learning Path `backend-developer` criado com 4 cursos

**Arquivos:**
- `database/migration-001-rbac.sql` (adicionar)

---

### US-062: Popular Dados de Demo
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso popular o banco com usuários de todos os roles para demonstração.

**Critérios de Aceite:**
- [ ] 2 empresas: Acme Tech, DevCorp
- [ ] 6 usuários por empresa (1 c_level, 1 admin, 1 instructor, 3 students)
- [ ] Progresso variado para demonstração
- [ ] Notas de exemplo em alguns usuários
- [ ] Logs de auditoria de exemplo

**Usuários Demo:**
```
Acme Tech:
  ceo@acmetech.com       (c_level)   - Roberto Mendes
  admin@acmetech.com     (admin)     - João Silva
  prof@acmetech.com      (instructor)- Fernanda Lima
  maria@acmetech.com     (student)   - Maria Santos
  pedro@acmetech.com     (student)   - Pedro Costa
  ana@acmetech.com       (student)   - Ana Ferreira

DevCorp:
  cto@devcorp.com        (c_level)   - Carla Souza
  admin@devcorp.com      (admin)     - Lucas Oliveira
  prof@devcorp.com       (instructor)- Carlos Santos
  julia@devcorp.com      (student)   - Julia Almeida
  bruno@devcorp.com      (student)   - Bruno Costa
  camila@devcorp.com     (student)   - Camila Rocha
```

**Arquivos:**
- `database/seed-demo-completo.sql` (criar)

---

### US-063: Aplicar Migrations no Banco
**Complexidade:** [L]

**Descrição:**
Como desenvolvedor, preciso executar as migrations e seed no PostgreSQL em execução.

**Critérios de Aceite:**
- [ ] Migration executada sem erros
- [ ] Seed executado sem erros
- [ ] Dados visíveis no NocoDB
- [ ] Views funcionando corretamente

**Comandos:**
```bash
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/seed-demo-completo.sql
```

---

## FASE 2: Autenticação Frontend

### US-064: Criar AuthContext
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso criar o contexto de autenticação para gerenciar estado de login em toda a aplicação.

**Critérios de Aceite:**
- [ ] AuthContext.jsx criado em `src/contexts/`
- [ ] Gerencia: user, token, company, isAuthenticated
- [ ] Persiste token em localStorage
- [ ] Fornece: login(), logout(), isLoading

**Interface:**
```javascript
const {
  user,           // { id, email, fullName, role, companyId }
  company,        // { id, name, slug, plan }
  token,          // JWT token
  isAuthenticated,// boolean
  isLoading,      // boolean
  login,          // (email, password) => Promise
  logout,         // () => void
  checkAuth       // () => Promise<boolean>
} = useAuth();
```

**Arquivos:**
- `src/contexts/AuthContext.jsx` (criar)
- `src/hooks/useAuth.js` (criar)

---

### US-065: Criar LoginView
**Complexidade:** [M]

**Descrição:**
Como usuário, preciso de uma tela de login para acessar a plataforma com minhas credenciais.

**Critérios de Aceite:**
- [ ] Tela de login com email e senha
- [ ] Validação de campos obrigatórios
- [ ] Mensagem de erro para credenciais inválidas
- [ ] Loading state durante autenticação
- [ ] Redireciona para rota apropriada após login
- [ ] Design consistente com o restante da aplicação

**UI:**
```
╔══════════════════════════════════════════════════╗
║                                                   ║
║          🎓 UltraThink                           ║
║     Plataforma de Treinamento Corporativo        ║
║                                                   ║
║     ┌────────────────────────────────┐           ║
║     │ Email                          │           ║
║     └────────────────────────────────┘           ║
║                                                   ║
║     ┌────────────────────────────────┐           ║
║     │ Senha                          │           ║
║     └────────────────────────────────┘           ║
║                                                   ║
║     ┌────────────────────────────────┐           ║
║     │          ENTRAR                │           ║
║     └────────────────────────────────┘           ║
║                                                   ║
║     Esqueceu a senha? (link futuro)              ║
║                                                   ║
╚══════════════════════════════════════════════════╝
```

**Arquivos:**
- `src/components/LoginView.jsx` (criar)

---

### US-066: Criar PrivateRoute
**Complexidade:** [L]

**Descrição:**
Como desenvolvedor, preciso de um componente para proteger rotas que requerem autenticação.

**Critérios de Aceite:**
- [ ] Redireciona para /login se não autenticado
- [ ] Mostra loading enquanto verifica auth
- [ ] Preserva URL original para redirect após login
- [ ] Suporta verificação de roles específicos

**Uso:**
```jsx
<Route path="/hub" element={
  <PrivateRoute>
    <HubView />
  </PrivateRoute>
} />

<Route path="/admin" element={
  <PrivateRoute roles={['admin', 'c_level']}>
    <AdminDashboard />
  </PrivateRoute>
} />
```

**Arquivos:**
- `src/components/PrivateRoute.jsx` (criar)

---

### US-067: Integrar Auth no App
**Complexidade:** [L]

**Descrição:**
Como desenvolvedor, preciso integrar o sistema de autenticação no App.jsx principal.

**Critérios de Aceite:**
- [ ] AuthProvider envolve toda a aplicação
- [ ] Rota /login adicionada
- [ ] Todas rotas protegidas com PrivateRoute
- [ ] Redirecionamento correto por role

**Arquivos:**
- `src/App.jsx` (modificar)

---

## FASE 3: Integração API

### US-068: Criar apiService
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso de um serviço centralizado para comunicação com a API do NocoDB.

**Critérios de Aceite:**
- [ ] Base URL configurável
- [ ] Interceptor para adicionar token JWT
- [ ] Tratamento de erros (401, 403, 500)
- [ ] Refresh token automático
- [ ] Métodos para todas entidades

**Interface:**
```javascript
// Autenticação
apiService.auth.login(email, password)
apiService.auth.logout()
apiService.auth.me()

// Cursos
apiService.courses.list()
apiService.courses.get(id)
apiService.courses.getPhases(courseId)
apiService.courses.getModules(courseId)

// Learning Paths
apiService.paths.list()
apiService.paths.get(id)
apiService.paths.getCourses(pathId)

// Progresso
apiService.progress.list(userId)
apiService.progress.save(data)
apiService.progress.update(id, data)

// Notas
apiService.notes.get(userId, courseId)
apiService.notes.save(data)
apiService.notes.update(id, data)

// Analytics
apiService.analytics.company(companyId)
apiService.analytics.user(userId)
apiService.analytics.course(courseId)
```

**Arquivos:**
- `src/services/apiService.js` (criar)

---

### US-069: Refatorar useModuleProgress
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso refatorar o hook useModuleProgress para usar a API em vez de localStorage.

**Critérios de Aceite:**
- [ ] Carrega progresso da API ao inicializar
- [ ] Salva progresso na API ao atualizar
- [ ] Fallback para localStorage se API falhar
- [ ] Sincronização em background
- [ ] Cache local para performance

**Comportamento:**
```javascript
const {
  completedModules,    // Array de IDs
  isLoading,           // boolean
  error,               // Error | null
  completeModule,      // (moduleId) => Promise
  uncompleteModule,    // (moduleId) => Promise
  syncProgress         // () => Promise (force sync)
} = useModuleProgress(courseId);
```

**Arquivos:**
- `src/hooks/useModuleProgress.js` (modificar)

---

### US-070: Refatorar dataService
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso refatorar o dataService para usar API com fallback para localStorage.

**Critérios de Aceite:**
- [ ] Notas salvam na API
- [ ] Notas carregam da API
- [ ] Fallback para localStorage se offline
- [ ] Sincronização quando voltar online
- [ ] Limite de 50KB mantido

**Arquivos:**
- `src/services/dataService.js` (modificar)

---

### US-071: Carregar Cursos da API
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso que os cursos e learning paths sejam carregados da API em vez de arquivos estáticos.

**Critérios de Aceite:**
- [ ] HubView carrega cursos da API
- [ ] LearningPathView carrega paths da API
- [ ] GenericLearningSystem carrega módulos da API
- [ ] Cache local para performance
- [ ] Fallback para dados estáticos se API falhar

**Arquivos:**
- `src/components/HubView.jsx` (modificar)
- `src/components/LearningPathView.jsx` (modificar)
- `src/components/GenericLearningSystem.jsx` (modificar)

---

## FASE 4: RBAC & Permissões

### US-072: Criar usePermissions
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso de um hook para verificar permissões do usuário atual.

**Critérios de Aceite:**
- [ ] Retorna permissões baseadas no role
- [ ] Métodos para verificar permissões específicas
- [ ] Integrado com AuthContext
- [ ] Memoizado para performance

**Interface:**
```javascript
const {
  role,                  // 'student' | 'instructor' | 'admin' | 'c_level'
  can,                   // (action, resource) => boolean
  canAccess,             // (route) => boolean
  canView,               // (dataType) => boolean
  canEdit,               // (dataType) => boolean
  isAdmin,               // boolean
  isInstructor,          // boolean
  isStudent,             // boolean
  isCLevel               // boolean
} = usePermissions();

// Exemplos de uso:
can('create', 'course')      // true para instructor, admin
can('view', 'all_users')     // true para admin, c_level
canAccess('/admin')          // true para admin, c_level
canView('company_analytics') // true para admin, c_level
```

**Arquivos:**
- `src/hooks/usePermissions.js` (criar)
- `src/utils/permissions.js` (criar - matriz de permissões)

---

### US-073: Criar RoleBasedAccess
**Complexidade:** [L]

**Descrição:**
Como desenvolvedor, preciso de um componente para renderização condicional baseada em role.

**Critérios de Aceite:**
- [ ] Renderiza children apenas se role permitido
- [ ] Suporta múltiplos roles
- [ ] Suporta fallback component
- [ ] Integrado com usePermissions

**Uso:**
```jsx
<RoleBasedAccess roles={['admin', 'c_level']} fallback={<AccessDenied />}>
  <AdminPanel />
</RoleBasedAccess>

<RoleBasedAccess roles={['instructor', 'admin']}>
  <CreateCourseButton />
</RoleBasedAccess>
```

**Arquivos:**
- `src/components/RoleBasedAccess.jsx` (criar)

---

### US-074: Aplicar RBAC nas Rotas
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso aplicar controle de acesso baseado em role em todas as rotas.

**Critérios de Aceite:**
- [ ] /hub - todos autenticados
- [ ] /curso/* - student, instructor, admin
- [ ] /dashboard - todos (filtrado por permissão)
- [ ] /admin - admin, c_level
- [ ] /admin/executive - c_level apenas
- [ ] Redirect para 403 se acesso negado

**Mapa de Rotas:**
```jsx
// Públicas
<Route path="/login" element={<LoginView />} />

// Autenticadas (qualquer role)
<Route path="/" element={<PrivateRoute><HubView /></PrivateRoute>} />
<Route path="/hub" element={<PrivateRoute><HubView /></PrivateRoute>} />
<Route path="/trilha/:id" element={<PrivateRoute><LearningPathView /></PrivateRoute>} />

// Student, Instructor, Admin
<Route path="/curso/:id/*" element={
  <PrivateRoute roles={['student', 'instructor', 'admin']}>
    <GenericLearningSystem />
  </PrivateRoute>
} />

// Admin, C-Level
<Route path="/admin" element={
  <PrivateRoute roles={['admin', 'c_level']}>
    <AdminDashboard />
  </PrivateRoute>
} />

// C-Level apenas
<Route path="/admin/executive" element={
  <PrivateRoute roles={['c_level']}>
    <ExecutiveDashboard />
  </PrivateRoute>
} />
```

**Arquivos:**
- `src/App.jsx` (modificar)

---

### US-075: Filtrar Dados por Tenant
**Complexidade:** [M]

**Descrição:**
Como desenvolvedor, preciso garantir que cada empresa veja apenas seus próprios dados.

**Critérios de Aceite:**
- [ ] Usuários veem apenas dados da sua empresa
- [ ] Admin vê todos usuários da empresa
- [ ] Analytics filtrado por company_id
- [ ] API calls incluem company_id quando necessário

**Arquivos:**
- `src/hooks/useTenant.js` (criar)
- `src/contexts/TenantContext.jsx` (criar)

---

## FASE 5: Dashboard & Polish

### US-076: Conectar AdminDashboard às Views
**Complexidade:** [M]

**Descrição:**
Como admin, preciso que o dashboard mostre dados reais do PostgreSQL.

**Critérios de Aceite:**
- [ ] Carrega v_company_progress
- [ ] Carrega v_user_dashboard (filtrado por empresa)
- [ ] Carrega v_course_stats
- [ ] Gráficos com dados reais
- [ ] Tabela de usuários com progresso

**Arquivos:**
- `src/components/AdminDashboard.jsx` (modificar)

---

### US-077: Criar ExecutiveDashboard
**Complexidade:** [M]

**Descrição:**
Como C-Level, preciso de um dashboard executivo com visão de alto nível.

**Critérios de Aceite:**
- [ ] KPIs principais (usuários ativos, conclusão, engajamento)
- [ ] Tendências (gráfico de linha)
- [ ] Comparativo entre empresas (se multi-tenant admin)
- [ ] ROI estimado
- [ ] Design executivo (clean, poucos detalhes)

**UI:**
```
╔══════════════════════════════════════════════════════════════════╗
║  Dashboard Executivo                               [Exportar PDF]║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────┐║
║  │    85%      │  │    12       │  │   156h      │  │   +23%   │║
║  │  Conclusão  │  │   Ativos    │  │   Estudo    │  │   MoM    │║
║  └─────────────┘  └─────────────┘  └─────────────┘  └──────────┘║
║                                                                   ║
║  ┌────────────────────────────────────────────────────────────┐ ║
║  │  Tendência de Conclusão (últimos 6 meses)                  │ ║
║  │  [Gráfico de linha]                                        │ ║
║  └────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌────────────────────────────────────────────────────────────┐ ║
║  │  ROI Estimado                                               │ ║
║  │  Investimento: R$ 50.000  │  Retorno: R$ 150.000           │ ║
║  │  ROI: 200%                                                  │ ║
║  └────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

**Arquivos:**
- `src/components/ExecutiveDashboard.jsx` (criar)

---

### US-078: Conectar UserDashboard ao Backend
**Complexidade:** [L]

**Descrição:**
Como aluno, preciso que meu dashboard pessoal mostre dados reais do backend.

**Critérios de Aceite:**
- [ ] Carrega progresso da API
- [ ] Mostra cursos em andamento
- [ ] Mostra módulos completados
- [ ] Mostra notas recentes
- [ ] Estatísticas pessoais

**Arquivos:**
- `src/components/UserDashboard.jsx` (modificar)

---

## Resumo de Arquivos

### Arquivos a Criar

| Arquivo | US | Fase |
|---------|----|----- |
| `database/migration-001-rbac.sql` | US-060, US-061 | 1 |
| `database/seed-demo-completo.sql` | US-062 | 1 |
| `src/contexts/AuthContext.jsx` | US-064 | 2 |
| `src/contexts/TenantContext.jsx` | US-075 | 4 |
| `src/hooks/useAuth.js` | US-064 | 2 |
| `src/hooks/usePermissions.js` | US-072 | 4 |
| `src/hooks/useTenant.js` | US-075 | 4 |
| `src/services/apiService.js` | US-068 | 3 |
| `src/components/LoginView.jsx` | US-065 | 2 |
| `src/components/PrivateRoute.jsx` | US-066 | 2 |
| `src/components/RoleBasedAccess.jsx` | US-073 | 4 |
| `src/components/ExecutiveDashboard.jsx` | US-077 | 5 |
| `src/utils/permissions.js` | US-072 | 4 |

### Arquivos a Modificar

| Arquivo | US | Fase |
|---------|----|----- |
| `src/App.jsx` | US-067, US-074 | 2, 4 |
| `src/hooks/useModuleProgress.js` | US-069 | 3 |
| `src/services/dataService.js` | US-070 | 3 |
| `src/components/HubView.jsx` | US-071 | 3 |
| `src/components/LearningPathView.jsx` | US-071 | 3 |
| `src/components/GenericLearningSystem.jsx` | US-071 | 3 |
| `src/components/AdminDashboard.jsx` | US-076 | 5 |
| `src/components/UserDashboard.jsx` | US-078 | 5 |

---

## Ordem de Execução Recomendada

```
╔══════════════════════════════════════════════════════════════════╗
║  SEQUÊNCIA DE IMPLEMENTAÇÃO                                      ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  1. US-060 → US-061 → US-062 → US-063  (FASE 1: Backend)        ║
║     │                                                             ║
║     ▼                                                             ║
║  2. US-064 → US-065 → US-066 → US-067  (FASE 2: Auth)           ║
║     │                                                             ║
║     ▼                                                             ║
║  3. US-068 → US-069 → US-070 → US-071  (FASE 3: API)            ║
║     │                                                             ║
║     ▼                                                             ║
║  4. US-072 → US-073 → US-074 → US-075  (FASE 4: RBAC)           ║
║     │                                                             ║
║     ▼                                                             ║
║  5. US-076 → US-077 → US-078           (FASE 5: Dashboard)      ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Checklist Final

### Demo MVP Funcional

- [ ] Login funciona com 4 roles diferentes
- [ ] RBAC aplicado em todas as rotas
- [ ] Progresso sincroniza com PostgreSQL
- [ ] Notas sincronizam com PostgreSQL
- [ ] Admin vê todos da empresa
- [ ] C-Level vê métricas executivas
- [ ] Multi-tenancy: isolamento entre empresas
- [ ] Caminho "Desenvolvedor Backend" funciona
- [ ] Curso Bash com 16 módulos funciona
- [ ] Módulo 1.1 com notas funciona

### Credenciais de Demo Documentadas

```
╔══════════════════════════════════════════════════════════════════╗
║  CREDENCIAIS PARA DEMONSTRAÇÃO - Senha: Demo@2026               ║
╠══════════════════════════════════════════════════════════════════╣
║  C-Level:    ceo@acmetech.com    │  cto@devcorp.com             ║
║  Admin:      admin@acmetech.com  │  admin@devcorp.com           ║
║  Instructor: prof@acmetech.com   │  prof@devcorp.com            ║
║  Student:    maria@acmetech.com  │  julia@devcorp.com           ║
╚══════════════════════════════════════════════════════════════════╝
```

---

**Última atualização:** 2026-01-22
**Status:** TODO
**Próximo passo:** Implementar FASE 1 (US-060 a US-063)
