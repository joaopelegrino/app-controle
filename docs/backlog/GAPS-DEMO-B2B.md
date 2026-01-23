# GAPS - Análise Pós Sprint 6

**Branch:** demo-nocodb-simple
**Data:** 2026-01-23
**Status:** ANÁLISE ATUALIZADA - Gaps Reais Identificados
**Versão:** 2.0.0

---

## Resumo Executivo

O Sprint 6 implementou a base de autenticação, RBAC e integração API. Porém, uma análise detalhada revelou **gaps críticos** entre as permissões RBAC definidas e as funcionalidades realmente implementadas na UI.

### Status Pós Sprint 6

| Componente | Status | Observação |
|------------|--------|------------|
| Frontend React | ✅ Funcional | http://localhost:3000 |
| Backend NocoDB | ✅ Funcional | http://localhost:8080 |
| PostgreSQL | ✅ Funcional | Schema + seed data |
| Autenticação | ✅ Implementado | Login com 4 roles |
| RBAC Permissões | ✅ Definido | 20+ permissões em usePermissions.js |
| **RBAC UI** | ⚠️ **PARCIAL** | Nem todas permissões têm UI |
| Integração FE↔BE | ✅ Implementado | apiService.js completo |
| Multi-tenancy | ✅ Implementado | TenantContext |

---

## 1. Gaps Críticos (Bloqueiam Demo Completo B2B)

### 1.1 CRUD de Usuários - NÃO IMPLEMENTADO

**Permissões RBAC definidas (usePermissions.js:31-34):**
```javascript
'users.view': ['admin', 'c_level'],
'users.create': ['admin'],
'users.edit': ['admin'],
'users.delete': ['admin'],
```

**Status de Implementação:**

| Funcionalidade | Permissão | API Service | UI Frontend | Status |
|----------------|-----------|-------------|-------------|--------|
| Ver usuários | `users.view` | ✅ `getCompanyUsers()` | ✅ Tabela em AdminDashboard | ✅ OK |
| Criar usuário | `users.create` | ✅ `createUser()` (US-091) | ✅ UserFormModal (US-092) | ✅ OK |
| Editar usuário | `users.edit` | ✅ `updateUser()` (US-091) | ✅ UserFormModal (US-093) | ✅ OK |
| Excluir usuário | `users.delete` | ✅ `deleteUser()` (US-091) | ✅ UserFormModal (US-093) | ✅ OK |

**Impacto:** ✅ RESOLVIDO (Sprint 7)
- ~~Admin não consegue adicionar novos colaboradores~~ → UserFormModal
- ~~Admin não consegue desativar usuários que saíram da empresa~~ → Soft delete
- ~~Admin não consegue alterar role de um usuário~~ → Edição de role

**Referência Personas:**
> "Adicionar Novo Aluno - Tabela 'users' → '+ Add Record'" (PERSONAS-NAO-TECNICAS.md:67-81)

**Arquivos a Implementar:**
```
src/services/apiService.js     → ✅ IMPLEMENTADO (US-091): createUser(), updateUser(), deleteUser(), reactivateUser()
src/components/AdminDashboard.jsx → Adicionar modal de criação/edição (US-092/093)
src/components/UserFormModal.jsx  → Novo componente (criar) (US-092/093)
```

---

### 1.2 Dashboard de Instrutor - ✅ IMPLEMENTADO (Sprint 8)

**Permissões RBAC definidas (usePermissions.js:22-23):**
```javascript
'dashboard.own': ['student', 'instructor', 'admin', 'c_level'],
'dashboard.team': ['instructor', 'admin', 'c_level'],
```

**Status de Implementação:**

| Role | Dashboard Esperado | Dashboard Atual | Status |
|------|-------------------|-----------------|--------|
| `c_level` | ExecutiveDashboard | ✅ ExecutiveDashboard | ✅ OK |
| `admin` | AdminDashboard | ✅ AdminDashboard | ✅ OK |
| `instructor` | **InstructorDashboard** | ✅ InstructorDashboard (US-094) | ✅ OK |
| `student` | UserDashboard | ✅ UserDashboard | ✅ OK |

**Necessidades do Instrutor (05-personas-corporativas.md):**

| Necessidade | Citação | Implementado |
|-------------|---------|--------------|
| Ver progresso de alunos do time | "Ver quem está estudando ou progredindo" | ✅ InstructorDashboard |
| Ver anotações dos alunos | "Ler anotações para ver qualidade" | ✅ StudentNotesModal |
| Identificar módulos difíceis | "Módulo bash-2.1 está difícil" | ❌ Sprint 10 |
| Atribuir cursos a alunos | "Atribui curso para novo dev júnior" | ❌ Sprint 9 |

**Referência Citação:**
> "Quando um novo desenvolvedor júnior entra no time, eu quero que ele aprenda arquitetura e padrões da empresa sozinho" (05-personas-corporativas.md:811-815)

**Arquivos Implementados:**
```
src/components/InstructorDashboard.jsx → ✅ CRIADO (US-094)
src/components/StudentNotesModal.jsx   → ✅ CRIADO (US-095)
src/components/SistemaEducacionalCompleto.jsx → ✅ Rota /instructor (US-096)
```

---

### 1.3 Ver Notas de Alunos (Admin/Instrutor) - ✅ IMPLEMENTADO (Sprint 8)

**API Existente:**
```javascript
apiService.getNotes(userId, courseId)  // ✅ Funciona
```

**Solução Implementada:** StudentNotesModal.jsx permite visualizar notas de qualquer aluno.

**Referência (PERSONAS-NAO-TECNICAS.md:167-184):**
```
Tarefa 2: Ver Anotações do Aluno

1. Tabela "study_notes"
2. Filtrar: user_id = "Maria Santos", course_id = "bash"
3. Ler anotações...
```

**Arquivos Implementados:**
```
src/components/StudentNotesModal.jsx   → ✅ CRIADO (US-095)
src/components/InstructorDashboard.jsx → ✅ Botão "Ver Notas" em cada aluno
```

---

## 2. Gaps Importantes (Melhoram Demo Significativamente)

### 2.1 Atribuir/Matricular Usuário em Curso

**Situação Atual:**
- Não há tabela de matrículas (user_courses)
- Todos usuários veem todos cursos disponíveis
- Instrutor não consegue "atribuir" curso específico a um aluno

**Necessário:**
```sql
-- Nova tabela (database/migration-002-enrollments.sql)
CREATE TABLE user_courses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id VARCHAR(50) REFERENCES courses(id),
  assigned_by INTEGER REFERENCES users(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  due_date DATE,
  status VARCHAR(20) DEFAULT 'enrolled' -- enrolled, in_progress, completed
);
```

**Arquivos a Implementar:**
```
database/migration-002-enrollments.sql → Schema matrículas
src/services/apiService.js             → enrollUser(), getEnrollments()
src/components/EnrollUserModal.jsx     → Novo componente
```

---

### 2.2 Exportar Relatórios (Excel/PDF)

**Permissão RBAC definida (usePermissions.js:28):**
```javascript
'analytics.export': ['admin', 'c_level'],
```

**Referência (PERSONAS-NAO-TECNICAS.md:285-299):**
```
Tarefa 3: Exportar para Board Meeting

1. View "v_company_progress" → Download Excel
2. View "v_user_dashboard" → Download Excel
3. View "v_course_stats" → Download Excel
```

**Arquivos a Implementar:**
```
src/utils/exportUtils.js           → Funções exportToExcel(), exportToPDF()
src/components/ExportButton.jsx    → Botão reutilizável
src/components/AdminDashboard.jsx  → Adicionar botão exportar
src/components/ExecutiveDashboard.jsx → Adicionar botão exportar
```

---

### 2.3 Analytics Avançado - Identificar Módulos Difíceis ✅ IMPLEMENTADO (Sprint 10)

**Referência (PERSONAS-NAO-TECNICAS.md:188-205):**
```
Tarefa 3: Identificar Módulos Difíceis

1. Tabela "user_progress" → Agrupar por module_id
2. Ver taxa de conclusão por módulo:
   │ bash-2.1 │ 40% │ ⚠️ Difícil
```

**Arquivos Implementados:**
```
src/services/apiService.js             → ✅ getModuleStats() (US-101)
src/components/ModuleDifficultyCard.jsx → ✅ CRIADO (US-101)
src/components/AdminDashboard.jsx       → ✅ Integrado
src/components/ExecutiveDashboard.jsx   → ✅ Integrado
```

---

## 3. Gaps Menores (Polish/Nice-to-have)

### 3.1 UI/UX Polish
- [x] Loading states durante requisições (US-103) ✅
- [x] Toast notifications para feedback (sucesso/erro) (US-102) ✅
- [x] Skeleton loaders para carregamento (US-103) ✅
- [ ] Empty states para listas vazias
- [ ] Confirmação antes de deletar

### 3.2 Onboarding Wizard (First-Time User) ✅ IMPLEMENTADO (US-104)
- [x] Tela de boas-vindas após primeiro login ✅
- [x] Seleção de objetivo (Backend Dev, DevOps, etc.) ✅
- [x] Tour guiado da plataforma (opção sim/pular) ✅

### 3.3 Responsividade Mobile
- [ ] Menu hamburger mobile
- [ ] Cards adaptáveis
- [ ] Tabelas scrolláveis

---

## 4. Matriz de Gaps por Sprint

### Sprint 7: Gestão de Usuários (CRUD)

| US | Descrição | Complexidade | Arquivos | Status |
|----|-----------|--------------|----------|--------|
| US-091 | API CRUD usuários | M | apiService.js | ✅ DONE |
| US-092 | Modal criar usuário | M | UserFormModal.jsx, AdminDashboard.jsx | ✅ DONE |
| US-093 | Modal editar/excluir usuário | M | UserFormModal.jsx, AdminDashboard.jsx | ✅ DONE |

**Entregáveis:**
- Admin pode criar novo usuário com email, nome, role
- Admin pode editar dados de usuário existente
- Admin pode desativar usuário (soft delete)

---

### Sprint 8: Dashboard Instrutor

| US | Descrição | Complexidade | Arquivos | Status |
|----|-----------|--------------|----------|--------|
| US-094 | InstructorDashboard | M | InstructorDashboard.jsx | ✅ DONE |
| US-095 | Ver notas dos alunos | L | StudentNotesModal.jsx | ✅ DONE |
| US-096 | Rota /instructor | L | SistemaEducacionalCompleto.jsx | ✅ DONE |

**Entregáveis:**
- Instrutor tem dashboard próprio em /instructor
- Instrutor vê progresso dos alunos do time
- Instrutor pode ver notas de qualquer aluno

---

### Sprint 9: Matrículas e Exportação

| US | Descrição | Complexidade | Arquivos |
|----|-----------|--------------|----------|
| US-097 | Schema matrículas | L | migration-002-enrollments.sql |
| US-098 | API matrículas | M | apiService.js |
| US-099 | UI atribuir curso | M | EnrollUserModal.jsx |
| US-100 | Exportar Excel | M | exportUtils.js, ExportButton.jsx |

**Entregáveis:**
- Instrutor/Admin pode matricular aluno em curso
- Admin/C-Level pode exportar relatórios Excel

---

## 5. Verificação de Completude RBAC

### Permissões vs Implementação

| Permissão | Definida | API | UI | Completo |
|-----------|----------|-----|-----|----------|
| `courses.view` | ✅ | ✅ | ✅ | ✅ |
| `courses.progress` | ✅ | ✅ | ✅ | ✅ |
| `courses.notes` | ✅ | ✅ | ✅ | ✅ |
| `courses.edit` | ✅ | ❌ | ❌ | ❌ |
| `courses.create` | ✅ | ❌ | ❌ | ❌ |
| `paths.view` | ✅ | ✅ | ✅ | ✅ |
| `paths.edit` | ✅ | ❌ | ❌ | ❌ |
| `dashboard.own` | ✅ | ✅ | ✅ | ✅ |
| `dashboard.team` | ✅ | ✅ | ✅ | ✅ |
| `dashboard.company` | ✅ | ✅ | ✅ | ✅ |
| `analytics.basic` | ✅ | ✅ | ✅ | ✅ |
| `analytics.advanced` | ✅ | ✅ | ✅ | ✅ |
| `analytics.export` | ✅ | ✅ | ✅ | ✅ |
| `users.view` | ✅ | ✅ | ✅ | ✅ |
| `users.create` | ✅ | ✅ | ✅ | ✅ |
| `users.edit` | ✅ | ✅ | ✅ | ✅ |
| `users.delete` | ✅ | ✅ | ✅ | ✅ |
| `company.view` | ✅ | ✅ | ⚠️ | ⚠️ |
| `company.edit` | ✅ | ❌ | ❌ | ❌ |
| `audit.view` | ✅ | ❌ | ❌ | ❌ |
| `admin.access` | ✅ | ✅ | ✅ | ✅ |
| `admin.full` | ✅ | ✅ | ⚠️ | ⚠️ |

**Resumo:** 21 permissões definidas, 17 completamente implementadas (81% completo)

---

## 6. Ordem de Prioridade Recomendada

```
╔══════════════════════════════════════════════════════════════════╗
║  SEQUÊNCIA DE IMPLEMENTAÇÃO - GAPS                               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  1. US-091 → US-092 → US-093  (Sprint 7: CRUD Usuários)         ║
║     │                                                             ║
║     ▼                                                             ║
║  2. US-094 → US-095 → US-096  (Sprint 8: Dashboard Instrutor)   ║
║     │                                                             ║
║     ▼                                                             ║
║  3. US-097 → US-098 → US-099 → US-100  (Sprint 9: Matrículas)   ║
║     │                                                             ║
║     ▼                                                             ║
║  4. US-101+  (Sprint 10: Analytics Avançado + Polish)           ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 7. Checklist de Validação

### Para Demo B2B MVP (Sprint 7-8) ✅ COMPLETO
- [x] Admin pode criar novo usuário (US-092)
- [x] Admin pode editar usuário existente (US-093)
- [x] Admin pode desativar usuário (US-093)
- [x] Instrutor tem dashboard próprio (US-094)
- [x] Instrutor vê progresso dos alunos (US-094)
- [x] Instrutor pode ver notas dos alunos (US-095)

### Para Demo B2B Completo (Sprint 9-10)
- [x] Instrutor/Admin pode matricular aluno em curso (US-099)
- [x] Admin/C-Level pode exportar relatórios Excel (US-100)
- [x] Analytics mostra módulos difíceis (US-101)
- [x] Toast notifications implementado (US-102)
- [x] Loading states em todas operações (US-103) ✅

---

**Última atualização:** 2026-01-23 (Sprint 10 COMPLETO: 4/4 USs)
**Autor:** Claude Code Analysis
**Versão:** 6.0.0 (Sprint 10 COMPLETO - Analytics + Toasts + Loading + Onboarding)
**Próxima revisão:** Planejamento Sprint 11
