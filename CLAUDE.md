# app-controle (UltraThink) - Configuração Claude Code

**Version:** 4.0.0 | **Date:** 2026-01-22 | **Status:** Production
**Project Type:** Plataforma B2B de treinamento técnico corporativo
**Sprint:** 6 - Demo B2B COMPLETO (Auth + RBAC + API + Dashboards)

---

## Quick Start

```bash
# Desenvolvimento
bun run dev          # Servidor local porta 3000
bun run build        # Build de produção
bun run test         # Rodar testes com Vitest

# Com mise (se configurado)
mise dev             # Servidor dev
mise nocodb:start    # Backend (PostgreSQL + NocoDB)
mise full-stack      # Frontend + Backend
mise check           # Verificar ambiente

# Slash Commands (Claude Code)
/quick-audit         # Verificação rápida de saúde
/full-coverage       # Relatório de cobertura
/pr-ready            # Checklist pré-PR
```

---

## Estrutura do Projeto

```
app-controle/
├── src/
│   ├── components/         → Componentes React
│   │   ├── HubView.jsx     → Hub principal
│   │   ├── LoginView.jsx   → Tela de login
│   │   ├── PrivateRoute.jsx → Proteção de rotas
│   │   ├── RoleBasedAccess.jsx → Controle por role
│   │   ├── UserHeader.jsx  → Header com usuário
│   │   ├── AdminDashboard.jsx → Dashboard admin
│   │   ├── ExecutiveDashboard.jsx → Dashboard C-Level
│   │   ├── UserDashboard.jsx → Dashboard do aluno
│   │   ├── LearningPathView.jsx → Display de trilhas
│   │   └── BashLearningSystem.jsx → Curso Bash
│   ├── contexts/           → React Contexts
│   │   ├── AuthContext.jsx → Estado de autenticação
│   │   └── TenantContext.jsx → Multi-tenancy
│   ├── hooks/              → Custom React hooks
│   │   ├── useAuth.js      → Hook de autenticação
│   │   ├── usePermissions.js → Hook RBAC
│   │   ├── useTenant.js    → Hook de tenant
│   │   ├── useCourses.js   → Hook para cursos API
│   │   └── useModuleProgress.js → Persistência de progresso
│   ├── services/           → Camadas de abstração
│   │   ├── apiService.js   → Comunicação NocoDB API
│   │   └── dataService.js  → Operações de dados
│   ├── data/               → Definições e conteúdo
│   │   ├── studyAreas.js   → Configuração de cursos
│   │   └── *LearningData.js → Conteúdo de curso
│   └── tests/              → Arquivos de teste Vitest
├── database/               → Scripts SQL
│   ├── migration-001-rbac.sql → Schema RBAC
│   └── seed-demo-completo.sql → Dados de demo
├── docs/backlog/           → Documentação do projeto
└── dist/                   → Output de build
```

---

## Stack Tecnológica

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| **Frontend** | React | 18.3 |
| **Build** | Vite | 5.4 |
| **Styling** | Tailwind CSS | 3.4 |
| **Routing** | React Router | 6 |
| **Runtime** | Bun | 1.3.3 |
| **Backend** | NocoDB | latest |
| **Database** | PostgreSQL | 16 |
| **Testing** | Vitest | latest |

---

## Estrutura de Rotas

| Rota | Componente | Acesso |
|------|------------|--------|
| `/login` | LoginView | Público |
| `/` | HubView | Todos autenticados |
| `/curso/:id` | CourseRoute | Todos autenticados |
| `/curso/:id/aula/:n` | ModuleNotesRoute | Todos autenticados |
| `/trilha/:id` | LearningPathView | Todos autenticados |
| `/dashboard` | UserDashboard | Todos autenticados |
| `/admin` | AdminDashboard | admin, c_level |
| `/admin/executive` | ExecutiveDashboard | c_level |

---

## Sistema Atual (Branch: demo-nocodb-simple)

**Status:**
```
✅ Frontend :3000  → React + Vite (Hub + Bash course)
✅ NocoDB :8080    → Dashboard visual (PostgreSQL 16)
✅ Docker          → WSL2 integration active
✅ mise v2         → Hooks + 22 tasks
✅ Auth            → Login funcional com 4 roles
✅ RBAC            → Matriz de permissões (20+)
✅ API Integration → apiService.js completo
✅ Multi-tenancy   → TenantContext implementado
✅ Dashboards      → Admin, Executive, User
```

**Acesso Backend (NocoDB Admin):**
- URL: http://localhost:8080
- Email: admin@ultrathink.com
- Senha: UltraThink@Admin2026!

---

## Sprint 6: Demo B2B - COMPLETO

**ROADMAP:** `docs/backlog/ROADMAP-DEMO-B2B.md`
**Retomada:** `docs/backlog/RETOMADA-2026-01-22-API-SERVICE.md`

### Progresso das Fases

| Fase | Descrição | Status |
|------|-----------|--------|
| **FASE 1** | Schema & Dados de Demo | ✅ DONE |
| **FASE 2** | Autenticação Frontend | ✅ DONE |
| **FASE 3** | Integração API | ✅ DONE |
| **FASE 4** | RBAC & Permissões | ✅ DONE |
| **FASE 5** | Dashboard & Polish | ✅ DONE |

### User Stories Implementadas (19/19)

```
FASE 1: US-060 ✅ US-061 ✅ US-062 ✅ US-063 ✅
FASE 2: US-064 ✅ US-065 ✅ US-066 ✅ US-067 ✅
FASE 3: US-068 ✅ US-069 ✅ US-070 ✅ US-071 ✅
FASE 4: US-072 ✅ US-073 ✅ US-074 ✅ US-075 ✅
FASE 5: US-076 ✅ US-077 ✅ US-078 ✅
```

### Credenciais de Demo

```
Senha padrão: Demo@2026

ACME TECH SOLUTIONS:
  ceo@acmetech.com       (c_level)   → /admin/executive
  admin@acmetech.com     (admin)     → /admin
  prof@acmetech.com      (instructor)→ /dashboard
  maria@acmetech.com     (student)   → /dashboard

DEVCORP CONSULTING:
  cto@devcorp.com        (c_level)   → /admin/executive
  admin@devcorp.com      (admin)     → /admin
  prof@devcorp.com       (instructor)→ /dashboard
  julia@devcorp.com      (student)   → /dashboard
```

---

## Arquivos Implementados

### Contexts
```
src/contexts/
  AuthContext.jsx        ✅ Estado de autenticação
  TenantContext.jsx      ✅ Multi-tenancy
```

### Hooks
```
src/hooks/
  useAuth.js             ✅ Hook de autenticação
  usePermissions.js      ✅ Hook RBAC (20+ permissões)
  useTenant.js           ✅ Hook de tenant
  useCourses.js          ✅ Hook para cursos da API
  useModuleProgress.js   ✅ Progresso com API + fallback
```

### Services
```
src/services/
  apiService.js          ✅ Comunicação NocoDB API v2
  dataService.js         ✅ Dados com API + fallback localStorage
```

### Components
```
src/components/
  LoginView.jsx          ✅ Tela de login
  PrivateRoute.jsx       ✅ Proteção de rotas
  RoleBasedAccess.jsx    ✅ Controle por role
  UserHeader.jsx         ✅ Header com usuário + logout
  AdminDashboard.jsx     ✅ Dashboard administrativo
  ExecutiveDashboard.jsx ✅ Dashboard C-Level (KPIs, ROI)
  UserDashboard.jsx      ✅ Dashboard do aluno
```

---

## API Service - Métodos Disponíveis

### Autenticação
```javascript
apiService.initialize()
apiService.login(email, password)
apiService.logout()
apiService.isAuthenticated()
```

### Cursos
```javascript
apiService.getCourses()
apiService.getCourse(id)
apiService.getCourseModules(id)
apiService.getCoursePhases(id)
```

### Progresso
```javascript
apiService.getProgress(userId, courseId)
apiService.completeModule(userId, companyId, courseId, moduleId)
apiService.uncompleteModule(userId, moduleId)
```

### Notas
```javascript
apiService.getNotes(userId, courseId)
apiService.saveNotes(userId, companyId, courseId, content)
```

### Analytics
```javascript
apiService.getCompanyAnalytics(companyId)
apiService.getUsersDashboard(companyId)
apiService.getCourseStats()
apiService.getCompanyProgress(companyId)
```

---

## Regras - SEMPRE

- Usar TodoWrite tool para tarefas multi-step
- Verificar arquivo antes de editar com Read
- Usar comandos `bun` para testes e build
- Manter código limpo sem console.log em produção
- Seguir padrões Tailwind existentes
- Preservar funcionalidades existentes
- Rodar testes antes de commitar
- Usar conventional commits

---

## Regras - NUNCA

- Criar arquivos desnecessários
- Usar jQuery ou bibliotecas não instaladas
- Modificar configurações de build sem necessidade
- Commitar sem rodar testes
- Duplicar código (refatorar para componentes genéricos)
- Usar npm ou yarn (somente Bun!)

---

## MCP Browser Testing

### Chrome DevTools MCP

```javascript
// Navegar
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Snapshot
mcp__chrome-devtools__take_snapshot()

// Screenshot
mcp__chrome-devtools__take_screenshot({ format: "png" })

// Verificar console
mcp__chrome-devtools__list_console_messages()

// Verificar network
mcp__chrome-devtools__list_network_requests()
```

---

## Git Workflow

### Branching Strategy
- Main branch: `desenvolvimento`
- Feature branches: `feature/US-XXX-description`
- Bug fixes: `fix/bug-description`

### Commit Conventions
```
feat(scope): descrição      # Nova feature
fix(scope): descrição       # Bug fix
refactor(scope): descrição  # Refatoração
docs(scope): descrição      # Documentação
test(scope): descrição      # Testes
chore(scope): descrição     # Manutenção
```

---

## Comandos de Verificação

```bash
# Verificar ambiente completo
mise check

# Verificar containers
docker ps

# Verificar dados no PostgreSQL
mise db:verify

# Health check NocoDB
mise nocodb:health
```

---

**Última atualização:** 2026-01-22
**Versão:** 4.0.0 (Sprint 6 Completo)
**Projeto:** app-controle (UltraThink)
**Status:** Demo B2B pronto para apresentação
