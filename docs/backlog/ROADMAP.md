# Roadmap - Plataforma TrainB2B (White-Label)

**Versão:** 9.0.0
**Data:** 2026-01-26
**Branch:** `feature/white-label-refactor`
**Status:** Sprint 13 COMPLETO (6/6 USs) + White-Label COMPLETO

---

## Visão Geral

Plataforma B2B de treinamento técnico corporativo com:
- ✅ Autenticação multi-tenant (4 roles)
- ✅ Sistema RBAC (21 permissões, 81% implementado)
- ✅ Dashboards por role (Admin, Executive, Instructor, User)
- ✅ CRUD completo de usuários
- ✅ Visualização de notas de alunos
- ✅ Matrículas em cursos
- ✅ Exportação Excel/JSON
- ✅ Analytics avançados (módulos difíceis)
- ✅ Toast notifications
- ✅ Loading states com skeletons
- ✅ Onboarding wizard
- ✅ Empty states reutilizáveis
- ✅ Modal de confirmação
- ✅ Responsividade mobile
- ✅ Autenticação NocoDB JWT
- ✅ Internacionalização i18n (pt-BR, en-US, es-ES)
- ✅ Arquitetura White-Label (Sprint 13)

---

## Sprints Completos

### Sprint 6: Base B2B ✅ (19/19 USs)

```
FASE 1: Autenticação
├── US-060: Schema PostgreSQL RBAC ✅
├── US-061: Seed dados demo ✅
├── US-062: AuthContext.jsx ✅
└── US-063: LoginView.jsx ✅

FASE 2: RBAC
├── US-064: usePermissions.js (21 permissões) ✅
├── US-065: PrivateRoute.jsx ✅
├── US-066: RoleBasedAccess.jsx ✅
└── US-067: UserHeader.jsx ✅

FASE 3: API Integration
├── US-068: apiService.js ✅
├── US-069: Progresso via API ✅
├── US-070: Notas via API ✅
└── US-071: TenantContext.jsx ✅

FASE 4: Dashboards
├── US-072: UserDashboard.jsx ✅
├── US-073: AdminDashboard.jsx ✅
├── US-074: ExecutiveDashboard.jsx ✅
└── US-075: Analytics views ✅

FASE 5: Polish
├── US-076: Conectar dashboards às views ✅
├── US-077: NotFoundPage.jsx ✅
└── US-078: Redirect por role ✅
```

---

### Sprint 7: CRUD Usuários ✅ (3/3 USs)

```
US-091: API CRUD usuários ✅
├── apiService.createUser(userData)
├── apiService.updateUser(userId, data)
├── apiService.deleteUser(userId) [soft delete]
└── apiService.reactivateUser(userId)

US-092: Modal criar usuário ✅
└── src/components/UserFormModal.jsx

US-093: Modal editar/excluir ✅
└── AdminDashboard.jsx integrado com modal
```

---

### Sprint 8: Dashboard Instrutor ✅ (3/3 USs)

```
US-094: InstructorDashboard.jsx ✅
├── Estatísticas do time
├── Tabela de alunos
├── Progresso individual
└── Card "Alunos que precisam de atenção"

US-095: StudentNotesModal.jsx ✅
├── Seletor de curso
├── Visualização de notas
└── Metadados (data, tamanho)

US-096: Rota /instructor ✅
└── SistemaEducacionalCompleto.jsx atualizado
```

---

### Sprint 9: Matrículas e Exportação ✅ (4/4 USs)

```
US-097: Schema matrículas ✅
└── database/migration-002-enrollments.sql
    ├── Tabela user_courses
    ├── View v_user_enrollments
    ├── Funções enroll_user(), unenroll_user()
    └── Dados de demo

US-098: API matrículas ✅
└── src/services/apiService.js
    ├── enrollUser(enrollmentData)
    ├── unenrollUser(userId, courseId)
    ├── getUserEnrollments(userId)
    ├── getCourseEnrollments(courseId, companyId)
    └── updateEnrollment(id, data)

US-099: UI atribuir curso ✅
└── src/components/EnrollUserModal.jsx
    ├── Seleção múltipla de usuários
    ├── Busca/filtro
    ├── Data limite opcional
    └── Integrado no AdminDashboard

US-100: Exportação relatórios ✅
├── src/utils/exportUtils.js
│   ├── exportToExcel()
│   ├── exportToJSON()
│   └── Formatadores de relatório
└── src/components/ExportButton.jsx
    ├── Dropdown Excel/JSON
    ├── ExportAllButton
    └── Integrado nos 3 dashboards
```

---

### Sprint 10: Analytics + Polish ✅ (4/4 USs)

```
US-101: Analytics Módulos Difíceis ✅
└── src/components/ModuleDifficultyCard.jsx
    ├── apiService.getModuleStats(companyId)
    ├── Classificação: hard/medium/easy
    ├── Integrado AdminDashboard
    └── Integrado ExecutiveDashboard

US-102: Toast Notifications ✅
├── src/contexts/ToastContext.jsx
│   └── success(), error(), warning(), info()
└── src/components/ToastContainer.jsx
    ├── Animações de entrada/saída
    ├── Barra de progresso
    └── Auto-dismiss 5s

US-103: Loading States Globais ✅
├── src/contexts/LoadingContext.jsx
│   └── startLoading(), stopLoading(), withLoading()
└── src/components/LoadingComponents.jsx
    ├── Spinner, SkeletonCard, SkeletonTable
    ├── SkeletonList, SkeletonCourseCard
    ├── LoadingOverlay, LoadingButton
    └── Integrado em todos dashboards

US-104: Onboarding Wizard ✅
├── src/contexts/OnboardingContext.jsx
│   └── Detecção primeiro acesso, persistência
└── src/components/OnboardingWizard.jsx
    ├── Step 1: Welcome (saudação personalizada)
    ├── Step 2: Objetivo (Backend/DevOps/FullStack/Data)
    ├── Step 3: Tour (opcional)
    └── Step 4: Complete (recomendações)
```

**Arquivos criados no Sprint 10:**
- `src/contexts/ToastContext.jsx`
- `src/contexts/LoadingContext.jsx`
- `src/contexts/OnboardingContext.jsx`
- `src/components/ToastContainer.jsx`
- `src/components/LoadingComponents.jsx`
- `src/components/ModuleDifficultyCard.jsx`
- `src/components/OnboardingWizard.jsx`

---

## Métricas de Progresso

```
Total de User Stories: 43
Completas: 43 (100%)
Em Progresso: 0

RBAC:
- Permissões definidas: 21
- Permissões com UI: 17 (81%)

i18n:
- Idiomas: 3 (pt-BR, en-US, es-ES)
- Namespaces: 4 (common, auth, errors, dashboard)
- Strings totais: ~250

Sprints:
- Sprint 6:  ✅ 19/19 (100%)
- Sprint 7:  ✅ 3/3 (100%)
- Sprint 8:  ✅ 3/3 (100%)
- Sprint 9:  ✅ 4/4 (100%)
- Sprint 10: ✅ 4/4 (100%)
- Sprint 11: ✅ 4/4 (100%)
- Sprint 12: ✅ 6/6 (100%)

Status: PRONTO PARA DEMO B2B ✅ + Auth NocoDB JWT + i18n COMPLETO
```

---

## Sprint 11: UX Polish ✅ COMPLETO (4/4 USs)

```
US-105: Empty States ✅
└── src/components/EmptyState.jsx
    ├── Componente reutilizável
    ├── 8 tipos: users, students, courses, notes, search, files, inbox, error
    ├── Modo compact para cards
    ├── EmptyStateInline para tabelas
    └── Integrado: AdminDashboard, InstructorDashboard, StudentNotesModal

US-106: Modal de Confirmação ✅
└── src/components/ConfirmModal.jsx
    ├── 3 tipos: danger (vermelho), warning (amarelo), info (azul)
    ├── Loading state com spinner
    ├── Hook useConfirmModal() para uso programático
    └── Integrado: UserFormModal (exclusão de usuário)

US-107: Responsividade Mobile ✅
├── Menu hamburger < 768px (MobileMenu + MobileMenuButton)
├── useMediaQuery hook com breakpoints Tailwind
├── Headers responsivos (stack vertical em mobile)
├── Botões com ícones apenas em mobile
└── Scroll horizontal para ações

US-108: Autenticação NocoDB JWT ✅
├── apiService.loginUser() - Login via tabela users
├── apiService.validateToken() - Validação de token
├── apiService.getSavedUser() - Recuperar sessão
├── AuthContext refatorado para API real
└── Testes unitários (20 testes)
```

**Arquivos criados no Sprint 11:**
- `src/components/EmptyState.jsx`
- `src/components/ConfirmModal.jsx`
- `src/components/MobileMenu.jsx`
- `src/hooks/useMediaQuery.js`
- `src/services/__tests__/apiService.auth.test.js`

**Arquivos modificados no Sprint 11:**
- `src/services/apiService.js` - loginUser(), validateToken(), getSavedUser()
- `src/contexts/AuthContext.jsx` - Refatorado para usar API real

---

## Sprint 12: Internacionalização (i18n) ✅ COMPLETO (6/6 USs)

```
US-109: Infraestrutura i18next ✅
└── src/i18n/config.js
    ├── i18next + react-i18next
    ├── Detecção de idioma (localStorage/browser)
    ├── Fallback para pt-BR
    └── Configuração de namespaces

US-110: Traduções base (common/auth/errors) ✅
└── public/locales/{pt-BR,en-US,es-ES}/
    ├── common.json (~85 strings)
    ├── auth.json (~45 strings)
    └── errors.json (~20 strings)

US-111: LanguageSelector.jsx ✅
└── src/components/LanguageSelector.jsx
    ├── Variante dropdown (select)
    ├── Variante buttons (bandeiras)
    └── Variante minimal (código)

US-112: LoginView.jsx migrado ✅
└── src/components/LoginView.jsx
    ├── useTranslation('auth')
    └── Todos os textos traduzidos

US-113: HubView.jsx + UserHeader.jsx migrado ✅
├── src/components/HubView.jsx
│   ├── useTranslation('common')
│   └── Seção hub em common.json
└── src/components/UserHeader.jsx
    ├── LanguageSelector integrado
    └── Menu traduzido

US-114: Dashboards migrados ✅
├── src/components/UserDashboard.jsx
├── src/components/AdminDashboard.jsx
├── src/components/InstructorDashboard.jsx
└── src/components/ExecutiveDashboard.jsx
    └── public/locales/{pt-BR,en-US,es-ES}/dashboard.json (~100 strings)
```

**Arquivos criados no Sprint 12:**
- `src/i18n/config.js`
- `src/i18n/index.js`
- `src/components/LanguageSelector.jsx`
- `public/locales/pt-BR/common.json`
- `public/locales/pt-BR/auth.json`
- `public/locales/pt-BR/errors.json`
- `public/locales/pt-BR/dashboard.json`
- `public/locales/en-US/*.json` (4 arquivos)
- `public/locales/es-ES/*.json` (4 arquivos)

**Arquivos modificados no Sprint 12:**
- `src/components/LoginView.jsx` - useTranslation('auth')
- `src/components/HubView.jsx` - useTranslation('common')
- `src/components/UserHeader.jsx` - LanguageSelector + traduções
- `src/components/UserDashboard.jsx` - useTranslation('dashboard')
- `src/components/AdminDashboard.jsx` - useTranslation('dashboard')
- `src/components/InstructorDashboard.jsx` - useTranslation('dashboard')
- `src/components/ExecutiveDashboard.jsx` - useTranslation('dashboard')

---

## Sprint 13: White-Label ✅ COMPLETO (6/6 USs)

```
US-119: Criar src/config/platform.js (configuração centralizada) ✅
US-120: Migrar storage keys (6 arquivos) para config central ✅
US-121: Atualizar traduções i18n para nome configurável ✅
US-122: Remover hardcoded do docker-compose ✅
US-123: Script de migração de localStorage ✅
US-124: Atualizar documentação principal ✅
```

**Arquivos criados:**
- `src/config/platform.js` - Configuração centralizada
- `src/config/index.js` - Re-exports
- `src/utils/storageMigration.js` - Migração ultrathink_* -> trainb2b_*
- `.env.platform.example` - Documentação das variáveis

**Validação E2E:** ✅ 8/8 testes passando (Login, Hub, Dashboards, i18n)

---

## Sugestões Sprint 14 (Futuro)

| US | Descrição | Complexidade | Prioridade |
|----|-----------|--------------|------------|
| US-125 | CRUD de cursos (courses.create/edit) | H | Alta |
| US-126 | Certificados de conclusão | M | Média |
| US-127 | Tour guiado real (highlight UI) | M | Baixa |
| US-128 | Notificações push/email | H | Baixa |

---

## Ambiente de Desenvolvimento

### Modo 1: Frontend Apenas (Dados Mock)

```bash
bun run dev    # http://localhost:3001
```

Funcionalidades disponíveis:
- Login com credenciais demo
- Navegação entre dashboards
- Onboarding wizard
- UI completa (sem dados do backend)

### Modo 2: Full Stack (Docker Required)

**Pré-requisitos:**
- Docker Desktop instalado no Windows
- WSL2 Integration habilitada em Docker Desktop Settings

```bash
# 1. Iniciar containers (PostgreSQL + NocoDB)
docker compose -f docker-compose.nocodb.yml up -d

# 2. Aguardar containers healthy
docker compose -f docker-compose.nocodb.yml ps

# 3. Executar migrations
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-002-enrollments.sql

# 4. Iniciar frontend
bun run dev
```

### Verificar Status

```bash
# Containers ativos
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Testar endpoints
curl http://localhost:3001     # Frontend
curl http://localhost:8080     # NocoDB
```

---

## Credenciais de Teste

```
Senha padrão: Demo@2026

Roles e rotas:
- c_level    → /admin/executive
- admin      → /admin
- instructor → /instructor
- student    → /dashboard

Empresas demo:
- ACME Tech Solutions (id: 1)
- DevCorp Consulting (id: 2)
```

---

## Comando de Retomada

```bash
# Opção 1: Continuar com backend (Docker já configurado)
docker compose -f docker-compose.nocodb.yml up -d && bun run dev

# Opção 2: Desenvolvimento frontend apenas
bun run dev

# Opção 3: Iniciar Sprint 13
Verificar gaps em docs/backlog/GAPS-DEMO-B2B.md
```

**Estado atual (2026-01-26):**
- Sprint 11: COMPLETO (4/4 USs)
- Sprint 12: COMPLETO (6/6 USs) - i18n
  - ✅ US-109: Infraestrutura i18next
  - ✅ US-110: Traduções common/auth/errors (3 idiomas)
  - ✅ US-111: LanguageSelector.jsx (3 variantes)
  - ✅ US-112: LoginView migrado para i18n
  - ✅ US-113: HubView + UserHeader migrado para i18n
  - ✅ US-114: 4 Dashboards migrados para i18n
- Testes E2E: CONCLUIDOS (4/4 perfis validados)
- Frontend: http://localhost:3001
- Backend: http://localhost:8081 (NocoDB + PostgreSQL)
- Usuarios: 13 no banco (12 demo + 1 teste)
- i18n: 3 idiomas, 4 namespaces, ~250 strings

**Observações:**
- company_id no NocoDB é coluna sistema (ForeignKey) - precisa SQL direto
- Docker Desktop deve estar ativo para testes E2E com backend
- Senha demo para todos usuários: Demo@2026
- Troca de idioma instantânea via LanguageSelector no header

**Documentacao sessao:**
- `docs/backlog/BACKLOG-2026-01-23-TESTES-E2E-BACKEND.md`
- `docs/backlog/BACKLOG-2026-01-23-TESTES-PERFIS-SPRINT11.md`

---

**Última atualização:** 2026-01-26
**Versão:** 9.0.0 (Sprint 13 - White-Label COMPLETO)
**Status:** Backend + Frontend + Auth NocoDB JWT + i18n + White-Label
**Próxima revisão:** Merge para desenvolvimento ou iniciar Sprint 14
