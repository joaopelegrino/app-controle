# app-controle (UltraThink) - Configuração Claude Code

**Version:** 8.0.0 | **Date:** 2026-01-26 | **Status:** Production + i18n Implementado
**Project Type:** Plataforma B2B de treinamento técnico corporativo
**Sprint Atual:** 12 - i18n (em progresso)
**Sprints Completos:** 6, 7, 8, 9, 10, 11 ✅
**Feature Branch:** `feature/i18n-internacionalizacao`

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
│   │   └── BashLearningSystem.jsx   → Curso Bash
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

Sprint 12: Internacionalização (i18n) 🔄 EM PROGRESSO
├── US-109: Infraestrutura i18next ✅
├── US-110: Traduções common/auth/errors (pt-BR, en-US, es-ES) ✅
├── US-111: LanguageSelector.jsx ✅
├── US-112: LoginView.jsx migrado para i18n ✅
├── US-113: HubView.jsx migrado para i18n (pendente)
├── US-114: Dashboards migrados para i18n (pendente)
└── Status: 🔄 EM PROGRESSO (4/6 USs)
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
- Autenticação: loginUser via NocoDB + validateToken OK

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

## Internacionalização (i18n) - IMPLEMENTADO ✅

### Status: Sprint 12 em Progresso

| Componente | Status | Idiomas |
|------------|--------|---------|
| Infraestrutura i18next | ✅ | - |
| LoginView.jsx | ✅ | pt-BR, en-US, es-ES |
| LanguageSelector | ✅ | 3 variantes |
| HubView.jsx | Pendente | - |
| Dashboards | Pendente | - |

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
│   ├── common.json        # app, navigation, buttons, status, time, table, modal, toast ✅
│   ├── auth.json          # login, errors, roles, permissions, logout, accessDenied ✅
│   └── errors.json        # validation, network, auth, crud, generic ✅
├── en-US/
│   ├── common.json ✅
│   ├── auth.json ✅
│   └── errors.json ✅
└── es-ES/
    ├── common.json ✅
    ├── auth.json ✅
    └── errors.json ✅
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
| `common` | app, navigation, buttons, status, time, table, modal, toast, language | ~50 | Não |
| `auth` | login, errors, roles, roleDescriptions, permissions, logout, accessDenied | ~45 | Não |
| `errors` | validation, network, auth, crud, generic | ~20 | Não |
| `dashboard` | (futuro) | - | Sim |
| `courses` | (futuro) | - | Sim |

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

**Ultima atualizacao:** 2026-01-26
**Versao:** 8.0.0 (+ i18n Implementado)
**Status:** Backend + Frontend + Auth NocoDB JWT + i18n (3 idiomas)
**RBAC:** 81% implementado (17/21 permissoes)
**i18n:** pt-BR, en-US, es-ES (LoginView migrado)
