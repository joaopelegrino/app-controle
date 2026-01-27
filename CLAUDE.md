# app-controle (Plataforma B2B) - Configuração Claude Code

**Version:** 10.0.0 | **Date:** 2026-01-26 | **Status:** Production + i18n + White-Label + CRUD Cursos
**Project Type:** Plataforma B2B de treinamento técnico corporativo
**Sprint Atual:** 14 - CRUD de Cursos ✅ COMPLETO (1 US)
**Sprints Completos:** 6, 7, 8, 9, 10, 11, 12, 13, 14 ✅
**Feature Branch:** `feature/white-label-refactor`
**Última US:** US-125: CRUD de Cursos (createCourse, updateCourse, deleteCourse)

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
| NocoDB | 8081 | Para dados reais |
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
│   │   ├── LanguageSelector.jsx     → Seletor de idioma (Sprint 12) ✅
│   │   ├── CourseFormModal.jsx      → Modal criar/editar curso (Sprint 14) ✅
│   │   └── BashLearningSystem.jsx   → Curso Bash
│   ├── config/                      → ✅ SPRINT 13 (White-Label)
│   │   ├── platform.js              → Configuração centralizada (US-119) ✅
│   │   └── index.js                 → Re-exports ✅
│   ├── i18n/
│   │   ├── config.js                → Configuração i18next (Sprint 12) ✅
│   │   └── index.js                 → Exports do módulo
│   ├── contexts/
│   │   ├── AuthContext.jsx          → Estado de autenticação
│   │   ├── TenantContext.jsx        → Multi-tenancy
│   │   ├── ToastContext.jsx         → Sistema de toasts (Sprint 10) ✅
│   │   ├── LoadingContext.jsx       → Loading states globais (Sprint 10) ✅
│   │   └── OnboardingContext.jsx    → Onboarding wizard state (Sprint 10) ✅
│   ├── hooks/
│   │   ├── useAuth.js               → Hook de autenticação
│   │   ├── usePermissions.js        → Hook RBAC (22 permissões, +courses.delete)
│   │   ├── useTenant.js             → Hook de tenant
│   │   └── useMediaQuery.js         → Hook media queries (Sprint 11) ✅
│   ├── services/
│   │   └── apiService.js            → API NocoDB + Matrículas (Sprint 9) ✅
│   ├── utils/
│   │   ├── exportUtils.js           → Funções exportação Excel (Sprint 9) ✅
│   │   └── storageMigration.js      → Migração localStorage (US-123) ✅
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

Sprint 12: Internacionalização (i18n) ✅ COMPLETO
├── US-109: Infraestrutura i18next ✅
├── US-110: Traduções common/auth/errors (pt-BR, en-US, es-ES) ✅
├── US-111: LanguageSelector.jsx ✅
├── US-112: LoginView.jsx migrado para i18n ✅
├── US-113: HubView.jsx + UserHeader.jsx migrado para i18n ✅
├── US-114: Dashboards migrados para i18n (4 dashboards) ✅
└── Status: ✅ COMPLETO (6/6 USs)

Sprint 13: White-Label Refactor ✅ COMPLETO (6/6 USs)
├── US-119: Criar src/config/platform.js (configuração centralizada) ✅
├── US-120: Migrar storage keys (6 arquivos) para config central ✅
├── US-121: Atualizar traduções i18n para nome configurável ✅
├── US-122: Remover credenciais hardcoded do docker-compose ✅
├── US-123: Script de migração de localStorage ✅
├── US-124: Atualizar documentação principal ✅
└── Status: ✅ COMPLETO

Sprint 14: CRUD de Cursos ✅ COMPLETO (1/1 USs)
├── US-125: CRUD completo de cursos
│   ├── usePermissions.js: +courses.delete, canCreateCourses, canDeleteCourses
│   ├── apiService.js: createCourse, updateCourse, deleteCourse, reactivateCourse, getAllCourses
│   ├── CourseFormModal.jsx: Modal criar/editar/arquivar cursos
│   ├── AdminDashboard.jsx: Integração com botão "Novo" e edição
│   └── i18n: ~55 strings em pt-BR, en-US, es-ES
└── Status: ✅ COMPLETO
```

### RBAC Progress

```
Permissões implementadas: 18/22 (82%)
MVP B2B Demo: ✅ COMPLETO
Analytics Avançado: ✅ COMPLETO (Sprint 10)
UX Polish: ✅ COMPLETO (Sprint 11)
Internacionalização: ✅ COMPLETO (Sprint 12)
White-Label: ✅ COMPLETO (Sprint 13)
CRUD Cursos: ✅ COMPLETO (Sprint 14)
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

// Cursos (Sprint 14)
apiService.getCourses()
apiService.getCourse(id)
apiService.getCourseModules(id)
apiService.createCourse(courseData)      ✅
apiService.updateCourse(courseId, data)  ✅
apiService.deleteCourse(courseId)        ✅ // Soft delete (archived)
apiService.reactivateCourse(courseId)    ✅
apiService.getAllCourses()               ✅ // Inclui arquivados

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
| `courses.delete` | ✅ (Sprint 14) |

**Total: 18/22 (82%)**

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

## GitHub CLI (gh) - Integração

### Status da Integração

| Item | Valor |
|------|-------|
| **Conta** | joaopelegrino |
| **Repositório** | joaopelegrino/app-controle |
| **Branch padrão** | desenvolvimento |
| **Scopes** | repo, gist, read:org |

### Comandos Disponíveis

```bash
# === SECRETS (variáveis sensíveis para CI/CD) ===
gh secret set FLY_API_TOKEN              # Configurar token Fly.io
gh secret set VITE_API_BASE_URL          # URL da API (se sensível)
gh secret list                           # Listar secrets configurados
gh secret delete SECRET_NAME             # Remover secret

# === VARIABLES (variáveis públicas de build) ===
gh variable set VITE_PLATFORM_NAME --body "TrainB2B"
gh variable set VITE_STORAGE_PREFIX --body "trainb2b"
gh variable list                         # Listar variáveis
gh variable delete VAR_NAME              # Remover variável

# === WORKFLOWS (CI/CD) ===
gh workflow list                         # Listar workflows
gh workflow view fly-deploy.yml          # Ver detalhes do workflow
gh workflow run fly-deploy.yml           # Disparar manualmente
gh run list                              # Ver execuções recentes
gh run view [run-id]                     # Ver detalhes de execução
gh run watch                             # Acompanhar execução em tempo real

# === PULL REQUESTS ===
gh pr create --title "feat: ..." --body "..."
gh pr list                               # Listar PRs abertas
gh pr view [number]                      # Ver detalhes
gh pr merge [number]                     # Fazer merge
gh pr checkout [number]                  # Checkout local

# === ISSUES ===
gh issue create --title "..." --body "..."
gh issue list                            # Listar issues
gh issue close [number]                  # Fechar issue

# === REPOSITÓRIO ===
gh repo view                             # Ver detalhes do repo
gh repo clone                            # Clonar
gh browse                                # Abrir no browser
```

### Configuração de Secrets para Deploy Fly.io

```bash
# 1. Gerar token no Fly.io (executar localmente)
flyctl tokens create deploy -x 999999h
# Copiar token COMPLETO (incluindo "FlyV1 ")

# 2. Configurar secret no GitHub
gh secret set FLY_API_TOKEN
# Cole o token quando solicitado

# 3. Verificar
gh secret list
# Deve mostrar: FLY_API_TOKEN
```

### Configuração de Variables para Build

```bash
# Variáveis de ambiente para Vite (públicas)
gh variable set VITE_PLATFORM_NAME --body "TrainB2B Demo"
gh variable set VITE_PLATFORM_SHORT_NAME --body "TrainB2B"
gh variable set VITE_STORAGE_PREFIX --body "trainb2b"

# Verificar
gh variable list
```

### Diretrizes de Uso

#### SEMPRE
- Usar `gh secret` para tokens, senhas e dados sensíveis
- Usar `gh variable` para configurações públicas de build
- Verificar `gh run list` após push para confirmar CI/CD
- Usar `gh pr create` para PRs (gera template automático)

#### NUNCA
- Commitar secrets diretamente no código
- Usar `gh secret` para variáveis que precisam ser públicas no build
- Ignorar falhas de workflow sem investigar (`gh run view`)

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
lsof -i :3001 && lsof -i :8081 && lsof -i :5432

# Testar conexão NocoDB
curl http://localhost:8081/api/v1/health
```

---

## Comando de Retomada

Para continuar o desenvolvimento na próxima sessão:

```bash
# Com Docker Desktop ativo:
docker compose -f docker-compose.nocodb.yml up -d && bun run dev

# Sprint 14 COMPLETO - Próximo passo:
Revisar gaps em docs/backlog/GAPS-DEMO-B2B.md ou iniciar Sprint 15
```

**Contexto:** Sprint 14 completo (1/1 USs). CRUD de Cursos implementado.

**Estado atual (2026-01-26):**
- Frontend: http://localhost:3001
- Backend: http://localhost:8081 (NocoDB) + PostgreSQL 5432
- Usuarios: 13 no banco (12 demo + 1 teste CRUD)
- CRUD usuarios: Completo (Sprint 7) ✅
- CRUD cursos: Completo (Sprint 14) ✅
- Responsividade: MobileMenu, useMediaQuery, Headers responsivos ✅
- Autenticação: loginUser via NocoDB + validateToken ✅
- i18n: pt-BR, en-US, es-ES completo ✅
- White-label: Configuração centralizada ✅

**Containers Docker:**
```bash
docker compose -f docker-compose.nocodb.yml up -d
```

**TABLE_IDS NocoDB (ja configurados em apiService.js):**
- users: m0mivs1xdccrvhz
- companies: ms1ga42h4tiyzyq
- courses: mt3gmx6ze7b2cov
- modules: m79311ib9eppvc7

**Sprint 11 (4/4 USs) - COMPLETO:**
- US-105: Empty states para listas vazias ✅
- US-106: Modal confirmacao antes de deletar ✅
- US-107: Responsividade mobile (MobileMenu, useMediaQuery, Headers) ✅
- US-108: Autenticacao real NocoDB JWT (loginUser, validateToken, getSavedUser) ✅

**Novos Componentes (Sprint 11):**
- `src/components/EmptyState.jsx` - Estados vazios reutilizaveis
- `src/components/ConfirmModal.jsx` - Modal confirmacao reutilizavel
- `src/components/MobileMenu.jsx` - Menu hamburger slide-over
- `src/hooks/useMediaQuery.js` - Hook media queries (useIsMobile, useIsTablet, useIsDesktop)

**Arquivos modificados (US-108):**
- `src/services/apiService.js` - loginUser(), validateToken(), getSavedUser()
- `src/contexts/AuthContext.jsx` - Refatorado para usar API real
- `src/services/__tests__/apiService.auth.test.js` - 20 testes unitários

**Documentacao sessao:**
- `docs/backlog/BACKLOG-2026-01-23-TESTES-E2E-BACKEND.md`
- `docs/backlog/BACKLOG-2026-01-23-TESTES-PERFIS-SPRINT11.md`
- `docs/backlog/ROADMAP.md` v6.0.0

---

## Ambiente de Desenvolvimento (WSL2 + Windows + Docker)

### Informações do Sistema

| Item | Valor |
|------|-------|
| **Distro** | Ubuntu 24.04.3 LTS (Noble Numbat) |
| **Kernel** | WSL2 (Windows Subsystem for Linux) |
| **Shell** | Zsh 5.9 |
| **Usuario WSL** | notebook |
| **Usuario Windows** | valor (em `/mnt/c/Users/valor`) |

### Paths Críticos

| Tipo | Path |
|------|------|
| **Projeto** | `/home/notebook/workspace/app-controle` |
| **Home WSL** | `/home/notebook` |
| **Home Windows** | `/mnt/c/Users/valor` |
| **Chezmoi source** | `/home/notebook/.local/share/chezmoi` |
| **Mise installs** | `/home/notebook/.local/share/mise/installs` |

### Ferramentas via mise

| Ferramenta | Versão | Uso no Projeto |
|------------|--------|----------------|
| mise | 2025.12.0 | Gerenciador de versões |
| chezmoi | 2.66.0 | Dotfiles SSOT |
| Node.js | 24.11.1 (LTS) | Runtime alternativo |
| **Bun** | 1.3.3 | **Runtime principal** |
| Docker Desktop | 29.1.3 | Backend containers |

### Docker Desktop + WSL2

#### Configuração Obrigatória

1. **Settings > General**: ✅ "Use WSL 2 based engine"
2. **Settings > Resources > WSL Integration**: ✅ Habilitar "Ubuntu-24.04"

#### Arquivo de Configuração Docker

**Path WSL**: `/mnt/c/Users/valor/AppData/Roaming/Docker/settings-store.json`

```json
{
  "EnableIntegrationWithDefaultWslDistro": true,
  "IntegratedWslDistros": ["Ubuntu-24.04"]
}
```

#### Troubleshooting Docker

| Problema | Causa | Solução |
|----------|-------|---------|
| Socket não existe | Integração WSL desabilitada | Habilitar em Docker Desktop |
| Permission denied | Grupo docker | `sudo usermod -aG docker $USER` |
| Containers não iniciam | Docker Desktop parado | Iniciar Docker Desktop no Windows |

```bash
# Verificar Docker funcionando
docker ps

# Se socket não existe
ls -la /var/run/docker.sock

# Iniciar Docker Desktop via PowerShell
powershell.exe -Command 'Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"'
```

### WSL Interop - Comandos Windows

```bash
# PowerShell
powershell.exe -Command "Get-Process | Select -First 5"

# Clipboard
echo "texto" | clip.exe

# Abrir no Explorer
explorer.exe .

# Browser padrão
explorer.exe "https://localhost:3001"
```

### Regras de Ambiente

#### SEMPRE
- Usar **bun** (não npm/yarn)
- Usar paths absolutos em documentação
- Verificar Docker Desktop ativo antes de `docker compose`

#### NUNCA
- Usar `~` em documentação (substituir por `/home/notebook/`)
- Commitar credentials ou `.env` files
- Usar comandos destrutivos git (force push, hard reset)

### Comandos de Diagnóstico

```bash
# Mise
mise --version && mise list

# Chezmoi
chezmoi --version && chezmoi status

# Docker
docker ps && docker compose -f docker-compose.nocodb.yml ps

# Portas do projeto
lsof -i :3001 -i :5432 -i :8081

# WSL Distros
wsl.exe -l -v
```

### Checklist Pré-Desenvolvimento

- [ ] Docker Desktop rodando (verificar ícone na bandeja Windows)
- [ ] Containers ativos: `docker compose -f docker-compose.nocodb.yml up -d`
- [ ] PostgreSQL acessível: porta 5432
- [ ] NocoDB acessível: http://localhost:8081
- [ ] Frontend: `bun run dev` (porta 3001)

---

## Ativação Automatizada do Ambiente (mise)

### Comando Único de Ativação

```bash
# 1. Se Docker Desktop não estiver rodando (WSL2):
powershell.exe -Command "Start-Process 'C:\Program Files\Docker\Docker\Docker Desktop.exe'"
sleep 30  # Aguardar inicialização

# 2. Iniciar ambiente completo via mise:
mise run nocodb:start && bun run dev
```

### Sequência Recomendada

| Passo | Comando | Verificação |
|-------|---------|-------------|
| 1. Docker Desktop | `powershell.exe -Command "Start-Process..."` | `docker --version` |
| 2. Backend | `mise run nocodb:start` | `mise run nocodb:health` |
| 3. Frontend | `bun run dev` | `curl http://localhost:3001` |
| 4. Verificar tudo | `mise run check` | Status completo |

### MCP Chrome DevTools para Testes E2E

O projeto está configurado com MCP Chrome DevTools (`.factory/settings.json`):

```javascript
// Navegação
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001" })

// Snapshot da página (acessibilidade)
mcp__chrome-devtools__take_snapshot()

// Screenshot
mcp__chrome-devtools__take_screenshot({ filePath: "/tmp/test.png" })

// Clicar em elemento (usar uid do snapshot)
mcp__chrome-devtools__click({ uid: "1_5" })

// Preencher formulário
mcp__chrome-devtools__fill({ uid: "1_3", value: "admin@acmetech.com" })

// Console logs (erros)
mcp__chrome-devtools__list_console_messages({ types: ["error"] })

// Executar JavaScript
mcp__chrome-devtools__evaluate_script({ function: "() => localStorage.clear()" })
```

### Troubleshooting Comum

| Problema | Causa | Solução |
|----------|-------|---------|
| `docker: command not found` | Docker Desktop offline | Iniciar via PowerShell |
| `401 Unauthorized` no login | Token NocoDB expirado | Limpar localStorage: `localStorage.clear()` |
| `can is not a function` | Bug no MobileMenu.jsx | Usar `hasPermission` em vez de `can` |
| Senha com `!` no curl | Bash interpreta `!` | Usar heredoc: `cat << 'EOF' \| curl...` |

### Bug Fix Documentado (2026-01-26)

**Arquivo:** `src/components/MobileMenu.jsx`
**Problema:** Usava `can()` mas hook exporta `hasPermission()`
**Correção:**
```diff
- const { role, roleLabel, roleColor, can } = usePermissions();
+ const { role, roleLabel, roleColor, hasPermission } = usePermissions();
- show: can('dashboard.team'),
+ show: hasPermission('dashboard.team'),
```

### Screenshots de Referência

```
.factory/relatorios/
├── ambiente-completo-2026-01-26.png    # Hub logado como Admin
├── login-sucesso-admin-2026-01-26.png  # Tela pós-login
├── hub-funcionando-2026-01-26.png      # Hub antes do login
└── status-ambiente-2026-01-26.png      # Estado inicial
```

---

## Internacionalização (i18n) - COMPLETO ✅

### Status: Sprint 12 COMPLETO (6/6 USs)

| Componente | Status | Idiomas |
|------------|--------|---------|
| Infraestrutura i18next | ✅ | - |
| LoginView.jsx | ✅ | pt-BR, en-US, es-ES |
| LanguageSelector | ✅ | 3 variantes |
| HubView.jsx | ✅ | pt-BR, en-US, es-ES |
| UserHeader.jsx | ✅ | pt-BR, en-US, es-ES |
| UserDashboard.jsx | ✅ | pt-BR, en-US, es-ES |
| AdminDashboard.jsx | ✅ | pt-BR, en-US, es-ES |
| InstructorDashboard.jsx | ✅ | pt-BR, en-US, es-ES |
| ExecutiveDashboard.jsx | ✅ | pt-BR, en-US, es-ES |

### Dependências Instaladas

```bash
bun add i18next react-i18next i18next-http-backend i18next-browser-languagedetector
```

### Estrutura de Arquivos (Implementada)

```
src/i18n/
├── config.js              # Configuração i18next ✅
└── index.js               # Exports do módulo ✅

public/locales/
├── pt-BR/
│   ├── common.json        # app, navigation, buttons, status, time, table, modal, toast, hub ✅
│   ├── auth.json          # login, errors, roles, permissions, logout, accessDenied ✅
│   ├── errors.json        # validation, network, auth, crud, generic ✅
│   └── dashboard.json     # user, admin, instructor, executive (Sprint 12) ✅
├── en-US/
│   ├── common.json ✅
│   ├── auth.json ✅
│   ├── errors.json ✅
│   └── dashboard.json ✅
└── es-ES/
    ├── common.json ✅
    ├── auth.json ✅
    ├── errors.json ✅
    └── dashboard.json ✅
```

### Componentes i18n

```jsx
// LanguageSelector.jsx - 3 variantes
<LanguageSelector variant="dropdown" />  // Select com bandeiras
<LanguageSelector variant="buttons" />   // Botões lado a lado (usado no Login)
<LanguageSelector variant="minimal" />   // Apenas código do idioma

// Hook useLanguage
const { currentCode, currentName, currentFlag, changeLanguage, isRTL } = useLanguage();
```

### Uso nos Componentes

```jsx
import { useTranslation } from 'react-i18next';

function LoginView() {
  const { t } = useTranslation(['auth', 'common']);

  return (
    <>
      <h1>{t('common:app.name')}</h1>
      <h2>{t('auth:login.title')}</h2>
      <button>{t('auth:login.submitButton')}</button>
    </>
  );
}
```

### Namespaces Implementados

| Namespace | Conteúdo | Strings | Lazy Load |
|-----------|----------|---------|-----------|
| `common` | app, navigation, buttons, status, time, table, modal, toast, language, hub | ~85 | Não |
| `auth` | login, errors, roles, roleDescriptions, permissions, logout, accessDenied | ~45 | Não |
| `errors` | validation, network, auth, crud, generic | ~20 | Não |
| `dashboard` | user, admin, instructor, executive, common, courses (Sprint 14) | ~155 | Não |

### Teste i18n via MCP

```javascript
// Navegar para login
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/login" })

// Clicar no botão de inglês (🇺🇸)
mcp__chrome-devtools__click({ uid: "1_2" })  // uid do snapshot

// Verificar tradução
mcp__chrome-devtools__take_snapshot()
// "Access your account" em vez de "Acesse sua conta"
```

### Referências

- **Análise:** `docs/tecnico/arquitetura/ANALISE-I18N-INTERNACIONALIZACAO.md`
- **Screenshot:** `.factory/relatorios/qa-e2e-2026-01-26/13-i18n-espanol.png`
- **Docs:** [react-i18next.com](https://react.i18next.com/)

---

## Sprint 13: White-Label Refactor ✅ COMPLETO

### Objetivo

Remover todas as referências hardcoded ao nome "UltraThink" e implementar arquitetura white-label configurável via variáveis de ambiente.

**Status:** Implementado em 2026-01-26 na branch `feature/white-label-refactor`

### Mapeamento de Ocorrências

```
Total: 154 ocorrências em 62 arquivos
├── Código fonte (src/): 13 ocorrências em 6 arquivos - CRÍTICO
├── Traduções i18n: 6 ocorrências em 3 arquivos - ALTO
├── Configuração: 25 ocorrências em 5 arquivos - MÉDIO
└── Documentação: 110+ ocorrências - BAIXO
```

### Arquivos Críticos

| Arquivo | Variáveis Hardcoded |
|---------|---------------------|
| `src/contexts/AuthContext.jsx` | `ultrathink_auth` |
| `src/contexts/OnboardingContext.jsx` | `ultrathink_onboarding` |
| `src/services/apiService.js` | `ultrathink_api_token`, `ultrathink_user`, credenciais |
| `src/services/dataService.js` | `STORAGE_PREFIX = 'ultrathink'` |
| `src/i18n/config.js` | `ultrathink_language` |
| `src/hooks/useModuleProgress.js` | `ultrathink_progress_*` |

### Arquitetura Proposta

```
src/
├── config/
│   ├── platform.js      # Configuração centralizada (NOVO)
│   └── index.js         # Re-exports (NOVO)
├── utils/
│   └── storageMigration.js  # Script migração localStorage (NOVO)
```

### Variáveis de Ambiente

```bash
# Identidade
VITE_PLATFORM_NAME="Plataforma de Treinamento B2B"
VITE_PLATFORM_SHORT_NAME="TrainB2B"

# Storage
VITE_STORAGE_PREFIX="trainb2b"

# API
VITE_API_BASE_URL="http://localhost:8081"
```

### User Stories

| US | Descrição | Complexidade | Status |
|----|-----------|--------------|--------|
| US-119 | Criar `src/config/platform.js` | L | Pendente |
| US-120 | Migrar storage keys (6 arquivos) | M | Pendente |
| US-121 | Atualizar traduções i18n | L | Pendente |
| US-122 | Remover hardcoded docker-compose | L | Pendente |
| US-123 | Script migração localStorage | M | Pendente |
| US-124 | Atualizar documentação | L | Pendente |

### Branch de Implementação

```bash
# Criar branch
git checkout -b feature/white-label-refactor

# Após implementação
git push -u origin feature/white-label-refactor
```

### Documento de Estudo

- **Path:** `docs/backlog/ESTUDO-REFATORACAO-WHITE-LABEL-2026-01-26.md`
- **Conteúdo:** Mapeamento completo, arquitetura proposta, plano de implementação

---

**Ultima atualizacao:** 2026-01-26
**Versao:** 10.0.0 (Sprint 14 - CRUD Cursos COMPLETO)
**Status:** Backend + Frontend + Auth NocoDB JWT + i18n + White-Label + CRUD Cursos COMPLETO
**RBAC:** 82% implementado (18/22 permissoes)
**i18n:** pt-BR, en-US, es-ES (Login, Hub, 4 Dashboards, CRUD Cursos)
**Namespaces:** common, auth, errors, dashboard (~305 strings total)
**Storage:** Prefixo configuravel via VITE_STORAGE_PREFIX (default: trainb2b)
**Branding:** Nome configuravel via traducoes i18n (default: TrainB2B)

## Sprint 14: CRUD de Cursos (2026-01-26)

### Arquivos Criados/Modificados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/hooks/usePermissions.js` | Modificado | +courses.delete, canCreateCourses, canDeleteCourses |
| `src/services/apiService.js` | Modificado | +createCourse, updateCourse, deleteCourse, reactivateCourse, getAllCourses |
| `src/components/CourseFormModal.jsx` | **Criado** | Modal criar/editar/arquivar cursos |
| `src/components/AdminDashboard.jsx` | Modificado | Integração com CourseFormModal |
| `public/locales/*/dashboard.json` | Modificado | +55 strings de cursos por idioma |

### Componente CourseFormModal

```jsx
import { CourseFormModal } from './CourseFormModal';

// Criar novo curso
<CourseFormModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  course={null}  // null = criação
  onSuccess={reloadData}
/>

// Editar curso existente
<CourseFormModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  course={selectedCourse}  // objeto curso = edição
  onSuccess={reloadData}
/>
```

### API CRUD de Cursos

```javascript
// Criar curso
const newCourse = await apiService.createCourse({
  name: 'Fundamentos de Linux',
  description: 'Introdução ao Linux...',
  icon: '🐧',
  difficulty: 'beginner', // beginner | intermediate | advanced
  duration_hours: 8,
  total_modules: 16,
  badge: 'new', // new | integrated | null
});

// Atualizar curso
await apiService.updateCourse(courseId, { name: 'Novo Nome', status: 'active' });

// Arquivar curso (soft delete)
await apiService.deleteCourse(courseId);

// Reativar curso
await apiService.reactivateCourse(courseId);

// Listar todos (incluindo arquivados)
const allCourses = await apiService.getAllCourses();
```

### Permissões RBAC

| Permissão | Roles | Descrição |
|-----------|-------|-----------|
| `courses.create` | admin | Criar novos cursos |
| `courses.edit` | instructor, admin | Editar cursos existentes |
| `courses.delete` | admin | Arquivar cursos |

## Validacao Sprint 14 (2026-01-26)

| Teste | Resultado |
|-------|-----------|
| Build produção | ✅ Sem erros |
| CourseFormModal renderiza | ✅ Campos corretos |
| Botão "Novo" no AdminDashboard | ✅ Visível para admin |
| Botão edição nos cards | ✅ Aparece no hover |
| Traduções pt-BR | ✅ 55 strings |
| Traduções en-US | ✅ 55 strings |
| Traduções es-ES | ✅ 55 strings |

**Próximo:** Testes E2E completos via MCP ou iniciar Sprint 15

---

## Deploy em Nuvem: Fly.io

### Visão Geral

Fly.io é a plataforma recomendada para deploy de demonstração por:
- Deploy direto de Docker containers
- PostgreSQL managed ou self-hosted
- SSL/HTTPS automático
- Scale to zero (economia de custos)
- Rede privada entre serviços

**Custo estimado:** ~$5-10/mês para demonstração (dentro do free allowance)

### Estrutura de Arquivos para Deploy

```
app-controle/
├── Dockerfile                    # ✅ Já existe (multi-stage nginx)
├── nginx.conf                    # ✅ Já existe (configurado para SPA)
├── fly.toml                      # CRIAR: Configuração Fly.io
├── .github/
│   └── workflows/
│       └── fly-deploy.yml        # CRIAR: CI/CD automático
└── .dockerignore                 # Verificar se existe
```

### Configuração fly.toml

```toml
# fly.toml - Configuração para app-controle
app = "trainb2b-demo"
primary_region = "gru"  # São Paulo (mais próximo)

[build]
  dockerfile = "Dockerfile"

[env]
  VITE_PLATFORM_NAME = "TrainB2B Demo"
  VITE_PLATFORM_SHORT_NAME = "TrainB2B"

[http_service]
  internal_port = 80          # nginx escuta na 80
  force_https = true
  auto_stop_machines = "stop" # Scale to zero após inatividade
  auto_start_machines = true  # Acorda automaticamente
  min_machines_running = 0    # Permite parar completamente
  processes = ["app"]

[http_service.concurrency]
  type = "connections"
  hard_limit = 25
  soft_limit = 20

[[vm]]
  memory = "256mb"            # Suficiente para nginx + React
  cpu_kind = "shared"
  cpus = 1

[checks]
  [checks.health]
    grace_period = "10s"
    interval = "30s"
    method = "GET"
    path = "/"
    port = 80
    timeout = "5s"
    type = "http"
```

### Regiões Fly.io Recomendadas

| Região | Código | Latência Brasil |
|--------|--------|-----------------|
| São Paulo | `gru` | ~5ms (melhor) |
| Rio de Janeiro | `gig` | ~10ms |
| Miami | `mia` | ~120ms |
| Ashburn | `iad` | ~150ms |

### GitHub Actions para Deploy Automático

```yaml
# .github/workflows/fly-deploy.yml
name: Deploy to Fly.io

on:
  push:
    branches: [main, desenvolvimento]
  workflow_dispatch:  # Deploy manual

jobs:
  deploy:
    name: Deploy app
    runs-on: ubuntu-latest
    concurrency: deploy-group  # Evita deploys simultâneos

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Run tests
        run: bun run test --run

      - name: Build
        run: bun run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_PLATFORM_NAME: ${{ vars.VITE_PLATFORM_NAME }}

      - name: Setup Fly.io CLI
        uses: superfly/flyctl-actions/setup-flyctl@master

      - name: Deploy to Fly.io
        run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

### Comandos flyctl Essenciais

```bash
# Instalação (macOS/Linux)
curl -L https://fly.io/install.sh | sh

# Autenticação
flyctl auth login

# Criar app (primeira vez)
flyctl launch --name trainb2b-demo --region gru

# Deploy
flyctl deploy --remote-only

# Ver logs em tempo real
flyctl logs

# Status da aplicação
flyctl status

# Abrir no browser
flyctl open

# Escalar (se necessário)
flyctl scale memory 512  # Aumentar RAM
flyctl scale count 2     # Mais instâncias

# Secrets (variáveis sensíveis)
flyctl secrets set VITE_API_BASE_URL=https://api.trainb2b.com
flyctl secrets list

# SSH na máquina (debug)
flyctl ssh console

# Destruir app (cuidado!)
flyctl apps destroy trainb2b-demo
```

### PostgreSQL no Fly.io

```bash
# Criar cluster PostgreSQL (Development - gratuito)
flyctl postgres create \
  --name trainb2b-db \
  --region gru \
  --initial-cluster-size 1 \
  --vm-size shared-cpu-1x \
  --volume-size 1

# Conectar app ao banco
flyctl postgres attach trainb2b-db --app trainb2b-demo

# String de conexão (adicionada automaticamente como secret)
# DATABASE_URL=postgres://...

# Acessar psql
flyctl postgres connect -a trainb2b-db

# Executar migrations
flyctl ssh console -a trainb2b-demo -C "psql \$DATABASE_URL < /app/database/migration-001-rbac.sql"
```

### Configuração NocoDB no Fly.io

Para backend completo com NocoDB:

```toml
# fly.nocodb.toml
app = "trainb2b-api"
primary_region = "gru"

[build]
  image = "nocodb/nocodb:latest"

[env]
  NC_DB = "pg://trainb2b-db.internal:5432/nocodb"
  NC_PUBLIC_URL = "https://trainb2b-api.fly.dev"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true

[[vm]]
  memory = "512mb"
  cpu_kind = "shared"
  cpus = 1

[mounts]
  source = "nocodb_data"
  destination = "/usr/app/data"
```

### Secrets e Variáveis

```bash
# Gerar token de deploy (CI/CD)
flyctl tokens create deploy -x 999999h
# Copiar token COMPLETO incluindo "FlyV1 " no início

# Adicionar ao GitHub Secrets:
# Settings > Secrets > Actions > New repository secret
# Nome: FLY_API_TOKEN
# Valor: FlyV1 fm2_xxxxx...

# Variáveis de ambiente (não sensíveis) - usar GitHub Variables
# Settings > Variables > Actions > New repository variable
# VITE_PLATFORM_NAME = "TrainB2B Demo"
```

### Troubleshooting Fly.io

| Problema | Causa | Solução |
|----------|-------|---------|
| "Welcome to nginx" | Build não copiou dist | Verificar Dockerfile COPY |
| Página em branco | Assets não carregam | Verificar nginx.conf try_files |
| 502 Bad Gateway | App não iniciou | `flyctl logs` para ver erro |
| Slow cold start | Scale to zero | Aumentar `min_machines_running` |
| Out of memory | 256MB insuficiente | `flyctl scale memory 512` |
| Deploy falha | Token expirado | Gerar novo token |

### Checklist Deploy Fly.io

- [ ] `flyctl auth login` executado
- [ ] `fly.toml` criado na raiz do projeto
- [ ] Dockerfile funciona localmente (`docker build -t test . && docker run -p 8080:80 test`)
- [ ] `.dockerignore` inclui `node_modules`, `.git`, `*.log`
- [ ] Secrets configurados no Fly.io (`flyctl secrets list`)
- [ ] GitHub Actions secret `FLY_API_TOKEN` configurado
- [ ] Variáveis de build configuradas (VITE_*)
- [ ] Região escolhida (`gru` para Brasil)

### URLs de Demonstração (após deploy)

```
Frontend: https://trainb2b-demo.fly.dev
API:      https://trainb2b-api.fly.dev (se NocoDB deployado)
Health:   https://trainb2b-demo.fly.dev/health
```

### Billing e Custos

**Guia completo:** `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md`

| Recurso | Free Allowance | Custo Extra |
|---------|----------------|-------------|
| VMs shared-cpu-1x (256MB) | 3 unidades | ~$1.94/mês cada |
| Volumes | 3GB | $0.15/GB/mês |
| Bandwidth (saída) | 160GB/mês | $0.02/GB |
| PostgreSQL Dev | 1GB storage | ~$2/mês |

**Limites recomendados para demo:**
```
Soft Limit: $5  (alerta por email)
Hard Limit: $10 (para recursos automaticamente)
```

**Comandos de billing:**
```bash
# Ver uso atual
flyctl billing show

# Parar app (economia total)
flyctl apps suspend trainb2b-demo

# Reativar
flyctl apps resume trainb2b-demo
```

### Referências

- [Fly.io Docs - Deploy Docker](https://fly.io/docs/languages-and-frameworks/dockerfile/)
- [Fly.io Docs - fly.toml](https://fly.io/docs/reference/configuration/)
- [Fly.io Docs - PostgreSQL](https://fly.io/docs/postgres/)
- [Fly.io Docs - GitHub Actions](https://fly.io/docs/launch/continuous-deployment-with-github-actions/)
- [Fly.io Docs - Pricing](https://fly.io/docs/about/pricing/)
- [GitHub - flyctl-actions](https://github.com/superfly/flyctl-actions)
- **Ações do Usuário (Billing):** `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md`

---

**Última atualização seção Fly.io:** 2026-01-27
