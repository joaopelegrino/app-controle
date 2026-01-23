# Backlog Sessão 2026-01-23 - Sprint 9: Matrículas e Exportação

**Status:** ✅ COMPLETO
**Branch:** demo-nocodb-simple

---

## Resumo

Sprint 9 implementado com sucesso. Todas as 4 User Stories foram concluídas:

| US | Descrição | Arquivos | Status |
|----|-----------|----------|--------|
| US-097 | Schema tabela user_courses | `database/migration-002-enrollments.sql` | ✅ |
| US-098 | API matrículas | `src/services/apiService.js` | ✅ |
| US-099 | UI atribuir curso | `src/components/EnrollUserModal.jsx` | ✅ |
| US-100 | Exportação Excel | `src/utils/exportUtils.js`, `src/components/ExportButton.jsx` | ✅ |

---

## Arquivos Criados/Modificados

### Novos Arquivos

1. **`database/migration-002-enrollments.sql`**
   - Tabela `user_courses` para matrículas
   - Índices para performance
   - View `v_user_enrollments` com detalhes
   - Funções `enroll_user()` e `unenroll_user()`
   - Dados de demonstração

2. **`src/components/EnrollUserModal.jsx`**
   - Modal para matricular múltiplos usuários
   - Seleção de curso e data limite
   - Busca/filtro de usuários
   - Integração com apiService

3. **`src/utils/exportUtils.js`**
   - `exportToExcel()` - Exporta para CSV UTF-8
   - `exportToJSON()` - Exporta para JSON
   - Formatadores de relatório:
     - `formatUsersProgressReport()`
     - `formatCompanyAnalyticsReport()`
     - `formatEnrollmentsReport()`
     - `formatCourseStatsReport()`

4. **`src/components/ExportButton.jsx`**
   - Botão de exportação com dropdown
   - Suporte a múltiplos tipos de relatório
   - `ExportAllButton` para exportação em lote

### Arquivos Modificados

1. **`src/services/apiService.js`**
   - `enrollUser(enrollmentData)` - Matricular usuário
   - `unenrollUser(userId, courseId)` - Cancelar matrícula
   - `getUserEnrollments(userId)` - Buscar matrículas do usuário
   - `getCourseEnrollments(courseId, companyId)` - Buscar matriculados em curso
   - `updateEnrollment(id, data)` - Atualizar matrícula

2. **`CLAUDE.md`**
   - Versão atualizada para 6.0.0
   - Sprint 9 marcado como completo
   - Estrutura de projeto atualizada
   - API Methods atualizados
   - RBAC atualizado para 76%

---

## Schema user_courses

```sql
CREATE TABLE user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER NOT NULL REFERENCES users(id),
  course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
  assigned_by INTEGER REFERENCES users(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  due_date DATE,
  status VARCHAR(20) DEFAULT 'enrolled',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);
```

**Status possíveis:** enrolled, in_progress, completed, cancelled

---

## Próximos Passos (Sprint 10)

| US | Descrição | Prioridade |
|----|-----------|------------|
| US-101 | Analytics módulos difíceis | Alta |
| US-102 | Toast notifications | Média |
| US-103 | Loading states globais | Média |
| US-104 | Onboarding wizard | Baixa |

---

## Comando de Retomada

```
Continue com Sprint 10 - US-101 (Analytics módulos difíceis)
```

---

## Checklist de Integração

Componentes integrados nos dashboards:

- [x] Adicionar `<EnrollUserModal>` no AdminDashboard ✅
- [x] Adicionar `<ExportButton>` no AdminDashboard ✅
- [x] Adicionar `<ExportAllButton>` no ExecutiveDashboard ✅
- [x] Adicionar `<ExportButton>` no InstructorDashboard ✅

Pendente (ambiente):

- [ ] Executar migration-002 no banco de dados
- [ ] Testar fluxo completo de matrícula
- [ ] Testar exportação de relatórios

---

**Criado:** 2026-01-23
**Sprint:** 9 - Matrículas e Exportação
**RBAC:** 76% implementado
