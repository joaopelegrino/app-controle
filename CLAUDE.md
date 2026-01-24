# app-controle (UltraThink) - Configuração Claude Code

**Version:** 7.5.0 | **Date:** 2026-01-24 | **Status:** Production + Sprint 11 COMPLETO
**Project Type:** Plataforma B2B de treinamento técnico corporativo
**Sprint Atual:** 11 - UX Polish (4/4 USs implementadas) ✅
**Sprints Completos:** 6, 7, 8, 9, 10, 11 ✅

---

## Quick Start

```bash
# Desenvolvimento (Frontend apenas - dados mock)
bun run dev          # Servidor local porta 3001 (ou 3000 se livre)
bun run build        # Build de produção
bun run test         # Rodar testes com Vitest

# Com Backend (requer Docker Desktop + WSL2 Integration)
# 1. Ativar Docker Desktop com "Use WSL 2 based engine"
# 2. Habilitar integração WSL em Settings > Resources > WSL Integration
docker compose up -d           # Inicia PostgreSQL + NocoDB
bun run dev                    # Frontend conecta ao backend

# Alternativa com mise
mise nocodb:start              # Backend (PostgreSQL + NocoDB)
mise full-stack                # Frontend + Backend
```

### Requisitos para Testes Completos

| Componente | Porta | Obrigatório |
|------------|-------|-------------|
| Frontend (Vite) | 3001 | Sim |
| NocoDB | 8080 | Para dados reais |
| PostgreSQL | 5432 | Para dados reais |
| Docker Desktop | - | Para backend |

---

## Estrutura do Projeto

```
app-controle/
├── src/
│   ├── components/
│   │   ├── HubView.jsx              → Hub principal
│   │   ├── LoginView.jsx            → Tela de login
│   │   ├── PrivateRoute.jsx         → Proteção de rotas
│   │   ├── AdminDashboard.jsx       → Dashboard admin + CRUD usuários
│   │   ├── ExecutiveDashboard.jsx   → Dashboard C-Level
│   │   ├── InstructorDashboard.jsx  → Dashboard instrutor (Sprint 8) ✅
│   │   ├── UserDashboard.jsx        → Dashboard do aluno
│   │   ├── UserFormModal.jsx        → Modal criar/editar usuário (Sprint 7) ✅
│   │   ├── StudentNotesModal.jsx    → Modal ver notas aluno (Sprint 8) ✅
│   │   ├── EnrollUserModal.jsx      → Modal matricular usuário (Sprint 9) ✅
│   │   ├── ExportButton.jsx         → Botão exportar relatórios (Sprint 9) ✅
│   │   ├── ModuleDifficultyCard.jsx → Analytics módulos difíceis (Sprint 10) ✅
│   │   ├── ToastContainer.jsx       → Container de toasts (Sprint 10) ✅
│   │   ├── LoadingComponents.jsx    → Spinner, Skeletons, Overlays (Sprint 10) ✅
│   │   ├── OnboardingWizard.jsx     → Wizard de onboarding (Sprint 10) ✅
│   │   ├── EmptyState.jsx           → Empty states reutilizáveis (Sprint 11) ✅
│   │   ├── ConfirmModal.jsx         → Modal confirmação (Sprint 11) ✅
│   │   ├── MobileMenu.jsx           → Menu hamburger mobile (Sprint 11) ✅
│   │   └── BashLearningSystem.jsx   → Curso Bash
│   ├── contexts/
│   │   ├── AuthContext.jsx          → Estado de autenticação
│   │   ├── TenantContext.jsx        → Multi-tenancy
│   │   ├── ToastContext.jsx         → Sistema de toasts (Sprint 10) ✅
│   │   ├── LoadingContext.jsx       → Loading states globais (Sprint 10) ✅
│   │   └── OnboardingContext.jsx    → Onboarding wizard state (Sprint 10) ✅
│   ├── hooks/
│   │   ├── useAuth.js               → Hook de autenticação
│   │   ├── usePermissions.js        → Hook RBAC (21 permissões)
│   │   ├── useTenant.js             → Hook de tenant
│   │   └── useMediaQuery.js         → Hook media queries (Sprint 11) ✅
│   ├── services/
│   │   └── apiService.js            → API NocoDB + Matrículas (Sprint 9) ✅
│   ├── utils/
│   │   └── exportUtils.js           → Funções exportação Excel (Sprint 9) ✅
│   └── tests/
│       └── apiService.users.test.js → Testes CRUD usuários ✅
├── database/
│   ├── migration-001-rbac.sql       → Schema RBAC
│   ├── migration-002-enrollments.sql→ Schema Matrículas (Sprint 9) ✅
│   └── seed-demo-completo.sql       → Dados de demo
└── docs/backlog/
    └── GAPS-DEMO-B2B.md             → Análise gaps v4.0.0 ✅
```

---

## Estrutura de Rotas

| Rota | Componente | Acesso |
|------|------------|--------|
| `/login` | LoginView | Público |
| `/` | HubView | Todos autenticados |
| `/curso/:id` | CourseRoute | Todos autenticados |
| `/dashboard` | UserDashboard | Todos autenticados |
| `/instructor` | **InstructorDashboard** | instructor, admin, c_level ✅ |
| `/admin` | AdminDashboard | admin, c_level |
| `/admin/executive` | ExecutiveDashboard | c_level |

---

## Status Atual

### Sprints Completos ✅

```
Sprint 6: Base B2B (19/19 USs)
├── Auth + RBAC + API Integration
├── Multi-tenancy + Dashboards
└── Status: ✅ COMPLETO

Sprint 7: CRUD Usuários (3/3 USs)
├── US-091: apiService CRUD ✅ (createUser, updateUser, deleteUser, reactivateUser)
├── US-092: UserFormModal criar ✅
├── US-093: UserFormModal editar/excluir ✅
└── Status: ✅ COMPLETO

Sprint 8: Dashboard Instrutor (3/3 USs)
├── US-094: InstructorDashboard.jsx ✅
├── US-095: StudentNotesModal.jsx ✅
├── US-096: Rota /instructor ✅
└── Status: ✅ COMPLETO

Sprint 9: Matrículas e Exportação (4/4 USs)
├── US-097: migration-002-enrollments.sql ✅
├── US-098: API matrículas (enroll/unenroll) ✅
├── US-099: EnrollUserModal.jsx ✅
├── US-100: exportUtils.js + ExportButton.jsx ✅
└── Status: ✅ COMPLETO

Sprint 10: Analytics + Polish (4/4 USs)
├── US-101: ModuleDifficultyCard.jsx + getModuleStats() ✅
├── US-102: ToastContext + ToastContainer ✅
├── US-103: LoadingContext + LoadingComponents (Skeletons) ✅
├── US-104: OnboardingContext + OnboardingWizard ✅
└── Status: ✅ COMPLETO

Sprint 11: UX Polish (4/4 USs) ✅ COMPLETO
├── US-105: EmptyState.jsx + EmptyStateInline ✅
├── US-106: ConfirmModal.jsx + useConfirmModal ✅
├── US-107: MobileMenu + useMediaQuery + Headers responsivos ✅
├── US-108: Auth NocoDB JWT (loginUser + validateToken) ✅
└── Status: ✅ COMPLETO
```

### RBAC Progress

```
Permissões implementadas: 17/21 (81%)
MVP B2B Demo: ✅ COMPLETO
Analytics Avançado: ✅ COMPLETO (Sprint 10)
UX Polish: 🔄 EM PROGRESSO (Sprint 11)
```

---

## Credenciais de Demo

```
Senha padrão: Demo@2026

ACME TECH SOLUTIONS:
  ceo@acmetech.com       (c_level)   → /admin/executive
  admin@acmetech.com     (admin)     → /admin
  prof@acmetech.com      (instructor)→ /instructor ✅
  maria@acmetech.com     (student)   → /dashboard

DEVCORP CONSULTING:
  cto@devcorp.com        (c_level)   → /admin/executive
  admin@devcorp.com      (admin)     → /admin
  prof@devcorp.com       (instructor)→ /instructor ✅
  julia@devcorp.com      (student)   → /dashboard
```

**Backend NocoDB:**
- URL: http://localhost:8081
- Email: admin@ultrathink.com
- Senha: UltraThink@Admin2026!

---

## Sprint 11: UX Polish ✅ COMPLETO (4/4)

**Objetivo:** Melhorias de UX, empty states, confirmações, responsividade e autenticação real

| US | Descrição | Status |
|----|-----------|--------|
| **US-105** | Empty states reutilizáveis | ✅ COMPLETO |
| **US-106** | Modal de confirmação | ✅ COMPLETO |
| **US-107** | Responsividade mobile | ✅ COMPLETO |
| **US-108** | Auth NocoDB JWT | ✅ COMPLETO |

### Componentes Criados (Sprint 11)

```javascript
// EmptyState.jsx - Estados vazios reutilizáveis
<EmptyState type="users" title="..." actionLabel="..." onAction={...} />
<EmptyStateInline colSpan={5} type="students" />  // Para tabelas

// ConfirmModal.jsx - Modal de confirmação
<ConfirmModal
  isOpen={show}
  onClose={handleClose}
  onConfirm={handleDelete}
  title="Excluir usuário"
  message="Tem certeza?"
  type="danger"  // danger | warning | info
/>

// Hook para uso programático
const { showConfirm, ConfirmModalComponent } = useConfirmModal();
const confirmed = await showConfirm({ title: '...', message: '...' });

// MobileMenu.jsx - Menu hamburger (US-107)
<MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
<MobileMenuButton onClick={() => setIsOpen(true)} />

// useMediaQuery.js - Detecção de tela (US-107)
const isMobile = useIsMobile();     // < 768px
const isTablet = useIsTablet();     // 768-1023px
const isDesktop = useIsDesktop();   // >= 1024px

// Auth NocoDB JWT (US-108)
// apiService.loginUser() - Login real via NocoDB
const { user, company, token } = await apiService.loginUser(email, password);

// apiService.validateToken() - Valida token existente
const isValid = await apiService.validateToken();

// apiService.getSavedUser() - Recupera usuário do localStorage
const savedData = apiService.getSavedUser();
```

---

## API Service - Métodos

### Implementados ✅

```javascript
// Auth (US-108)
apiService.login(email, password)       // Login sistema NocoDB
apiService.loginUser(email, password)   // Login usuário da aplicação ✅
apiService.logout()
apiService.isAuthenticated()
apiService.validateToken()              // Valida token JWT ✅
apiService.getSavedUser()               // Recupera usuário salvo ✅

// Usuários (Sprint 7)
apiService.getUserByEmail(email)
apiService.getCompanyUsers(companyId)
apiService.createUser(userData)      ✅
apiService.updateUser(userId, data)  ✅
apiService.deleteUser(userId)        ✅
apiService.reactivateUser(userId)    ✅

// Matrículas (Sprint 9)
apiService.enrollUser(enrollmentData)     ✅
apiService.unenrollUser(userId, courseId) ✅
apiService.getUserEnrollments(userId)     ✅
apiService.getCourseEnrollments(courseId) ✅
apiService.updateEnrollment(id, data)     ✅

// Cursos
apiService.getCourses()
apiService.getCourse(id)
apiService.getCourseModules(id)

// Progresso
apiService.getProgress(userId, courseId)
apiService.completeModule(userId, companyId, courseId, moduleId)

// Notas
apiService.getNotes(userId, courseId)
apiService.saveNotes(userId, companyId, courseId, content)

// Analytics
apiService.getCompanyAnalytics(companyId)
apiService.getUsersDashboard(companyId)
apiService.getCourseStats()
apiService.getModuleStats(companyId)     ✅ (Sprint 10)
```

### Exportação (Sprint 9) ✅

```javascript
// src/utils/exportUtils.js
exportToExcel(data, filename, options)
exportToJSON(data, filename)
formatUsersProgressReport(users)
formatCompanyAnalyticsReport(analytics, users)
formatCourseStatsReport(stats)
```

---

## RBAC - Matriz de Permissões

| Permissão | UI Implementado |
|-----------|-----------------|
| `courses.view` | ✅ |
| `courses.progress` | ✅ |
| `courses.notes` | ✅ |
| `courses.assign` | ✅ (Sprint 9) |
| `dashboard.own` | ✅ |
| `dashboard.team` | ✅ (Sprint 8) |
| `dashboard.company` | ✅ |
| `analytics.basic` | ✅ |
| `analytics.export` | ✅ (Sprint 9) |
| `users.view` | ✅ |
| `users.create` | ✅ (Sprint 7) |
| `users.edit` | ✅ (Sprint 7) |
| `users.delete` | ✅ (Sprint 7) |
| `admin.access` | ✅ |
| `analytics.advanced` | ✅ (Sprint 10) |

**Total: 17/21 (81%)**

---

## Regras

### SEMPRE
- Verificar `GAPS-DEMO-B2B.md` antes de implementar
- Usar `bun` para build/test
- Rodar testes antes de commit
- Seguir padrões Tailwind existentes

### NUNCA
- Usar npm/yarn (somente Bun)
- Commitar sem rodar testes
- Implementar sem verificar permissão RBAC

---

## Referências

- **Gaps:** `docs/backlog/GAPS-DEMO-B2B.md` v5.0.0
- **Backlog Sprint 10:** `docs/backlog/BACKLOG-2026-01-23-SPRINT10-ANALYTICS.md`
- **Testes E2E:** `docs/backlog/BACKLOG-2026-01-23-TESTES-E2E-BACKEND.md`
- **Personas:** `docs/conceitual/01-visao-geral/05-personas-corporativas.md`

---

## Ativação do Backend (Docker)

Para testes completos com dados reais:

```bash
# 1. Verificar Docker Desktop (Windows)
#    - Ativar "Use WSL 2 based engine" nas configurações
#    - Habilitar integração com sua distro WSL em Settings > Resources > WSL Integration

# 2. Iniciar containers (usar arquivo específico do NocoDB)
docker compose -f docker-compose.nocodb.yml up -d

# 3. Executar migrations (container: app-controle-db, user: nocodb_user, db: app_controle)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-002-enrollments.sql

# 4. Iniciar frontend
bun run dev
```

### Verificar Status

```bash
# Containers
docker ps

# Portas
lsof -i :3001 && lsof -i :8080 && lsof -i :5432

# Testar conexão NocoDB
curl http://localhost:8081/api/v1/health
```

---

## Comando de Retomada

Para continuar o desenvolvimento na próxima sessão:

```bash
# Com Docker Desktop ativo:
docker compose -f docker-compose.nocodb.yml up -d && bun run dev

# Sprint 11 COMPLETO - Próximo passo:
Iniciar Sprint 12 ou revisar gaps em docs/backlog/GAPS-DEMO-B2B.md
```

**Contexto:** Sprint 11 completo (4/4 USs). Auth NocoDB JWT implementado.

**Estado atual (2026-01-24):**
- Frontend: http://localhost:3001
- Backend: http://localhost:8081 (NocoDB) + PostgreSQL 5432
- Usuarios: 13 no banco (12 demo + 1 teste CRUD)
- Testes E2E: Login, Dashboards, Matriculas, Exportacao - TODOS OK
- CRUD usuarios: Leitura OK, escrita OK (company_id via SQL)
- Responsividade: MobileMenu, useMediaQuery, Headers responsivos OK

**Containers Docker:**
```bash
docker compose -f docker-compose.nocodb.yml up -d
```

**TABLE_IDS NocoDB (ja configurados em apiService.js):**
- users: m0mivs1xdccrvhz
- companies: ms1ga42h4tiyzyq
- courses: mt3gmx6ze7b2cov
- modules: m79311ib9eppvc7

**Testes E2E Completos (2026-01-23):**
- Login Aluno: OK (maria@acmetech.com -> Hub, menu so "Sair")
- Login C-Level: OK (ceo@acmetech.com -> Hub, acesso /admin/executive)
- Login Admin: OK (sessao anterior)
- Login Instrutor: OK (sessao anterior)

**Sprint 11 (3/4 USs):**
- US-105: Empty states para listas vazias - COMPLETO
- US-106: Modal confirmacao antes de deletar - COMPLETO
- US-107: Responsividade mobile (MobileMenu, useMediaQuery, Headers) - COMPLETO
- US-108: Autenticacao real NocoDB JWT - Pendente

**Novos Componentes (Sprint 11):**
- `src/components/EmptyState.jsx` - Estados vazios reutilizaveis
- `src/components/ConfirmModal.jsx` - Modal confirmacao reutilizavel
- `src/components/MobileMenu.jsx` - Menu hamburger slide-over
- `src/hooks/useMediaQuery.js` - Hook media queries (useIsMobile, useIsTablet, useIsDesktop)

**Dashboards com headers responsivos:**
- AdminDashboard.jsx - Botoes stack em mobile, icones apenas
- InstructorDashboard.jsx - Layout responsivo
- ExecutiveDashboard.jsx - Layout responsivo com gradiente

**Documentacao sessao:**
- `docs/backlog/BACKLOG-2026-01-23-TESTES-E2E-BACKEND.md`
- `docs/backlog/BACKLOG-2026-01-23-TESTES-PERFIS-SPRINT11.md`
- `docs/backlog/ROADMAP.md` v6.0.0

**Comando de Retomada:**
```
Continuar Sprint 11 - Implementar US-108 (Auth NocoDB JWT).
US-107 (Responsividade) COMPLETA. Backend Docker ativo.
```

---

**Ultima atualizacao:** 2026-01-24
**Versao:** 7.4.0 (Sprint 11 - 3/4 USs)
**Status:** Backend + Frontend + Empty States + ConfirmModal + Responsividade
**RBAC:** 81% implementado (17/21 permissoes)
