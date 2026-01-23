# Roadmap - Plataforma UltraThink B2B

**Versão:** 6.0.0
**Data:** 2026-01-23
**Branch:** `demo-nocodb-simple`
**Status:** Sprint 11 em Progresso (2/4 USs) + Testes E2E OK

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
Total de User Stories: 35
Completas: 35 (100%)
Em Progresso: 2 (Sprint 11)

RBAC:
- Permissões definidas: 21
- Permissões com UI: 17 (81%)

Sprints:
- Sprint 6:  ✅ 19/19 (100%)
- Sprint 7:  ✅ 3/3 (100%)
- Sprint 8:  ✅ 3/3 (100%)
- Sprint 9:  ✅ 4/4 (100%)
- Sprint 10: ✅ 4/4 (100%)
- Sprint 11: 🔄 2/4 (50%)

Status: PRONTO PARA DEMO B2B ✅ + UX Polish em progresso
```

---

## Sprint 11: UX Polish (Em Progresso - 2/4 USs)

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

US-107: Responsividade Mobile ⏳
├── Menu hamburger < 768px
├── Cards em coluna única mobile
└── Tabelas com scroll horizontal

US-108: Autenticação NocoDB JWT ⏳
├── Login via API NocoDB real
├── Token JWT em localStorage
└── Refresh automático
```

**Arquivos criados no Sprint 11:**
- `src/components/EmptyState.jsx`
- `src/components/ConfirmModal.jsx`

---

## Sugestões Sprint 12 (Futuro)

| US | Descrição | Complexidade | Prioridade |
|----|-----------|--------------|------------|
| US-109 | CRUD de cursos (courses.create/edit) | H | Alta |
| US-110 | Certificados de conclusão | M | Média |
| US-111 | Tour guiado real (highlight UI) | M | Baixa |
| US-112 | Notificações push/email | H | Baixa |

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

# Opção 3: Continuar Sprint 11
Implementar US-107 (Responsividade) e US-108 (Auth JWT)
```

**Estado atual (2026-01-23):**
- Sprint 10: COMPLETO (4/4 USs)
- Sprint 11: EM PROGRESSO (2/4 USs)
  - ✅ US-105: EmptyState.jsx
  - ✅ US-106: ConfirmModal.jsx
  - ⏳ US-107: Responsividade Mobile
  - ⏳ US-108: Auth NocoDB JWT
- Testes E2E: CONCLUIDOS (4/4 perfis validados)
- Frontend: http://localhost:3001
- Backend: http://localhost:8080 (NocoDB + PostgreSQL)
- Usuarios: 13 no banco (12 demo + 1 teste)

**Pendencias identificadas:**
- company_id no NocoDB é coluna sistema (ForeignKey) - precisa SQL direto
- MCP Chrome DevTools pode desconectar - reiniciar se necessario

**Documentacao sessao:**
- `docs/backlog/BACKLOG-2026-01-23-TESTES-E2E-BACKEND.md`
- `docs/backlog/BACKLOG-2026-01-23-TESTES-PERFIS-SPRINT11.md`

---

**Última atualização:** 2026-01-23
**Versão:** 6.0.0 (Sprint 11 - 2/4 USs)
**Status:** Backend + Frontend + Empty States + ConfirmModal
**Próxima revisão:** Completar Sprint 11 (US-107/108)
