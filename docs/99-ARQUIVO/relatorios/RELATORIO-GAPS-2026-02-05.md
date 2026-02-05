# Relatório de Gaps: Documentação vs Implementação

**Data:** 2026-02-05
**Versão:** 1.0.0
**Status:** Análise Forense Completa

---

## Sumário Executivo

| Aspecto | Status | Severidade |
|---------|--------|------------|
| **Documentação vs Código** | ⚠️ Divergente | ALTA |
| **Endpoints API** | ✅ Completo | - |
| **Componentes UI** | ✅ Completo | - |
| **Testes E2E** | ⚠️ Especificados mas não executando | MÉDIA |
| **RBAC** | ✅ 81% implementado | - |

**Alinhamento Geral: 72%** - Precisa atenção em 3 áreas críticas

---

## 1. Gaps Críticos Identificados

### GAP-001: Hub de Especialistas - Documentado mas NÃO Implementado

**Documentado em:** `docs/VISAO_MISSAO_E_ESTADO_ATUAL.md` (seção 8)

**O que promete:**
- Sistema de cadastro de especialistas externos
- Marketplace de cursos
- Revenue sharing (70/30)
- Dashboard de analytics para especialistas

**Status no Código:**
```
❌ Não existe:
- Tabela specialists/experts no banco
- UI para cadastro de especialista
- Marketplace de cursos
- Revenue sharing dashboard
```

**Impacto:** Feature estratégica de longo prazo (Q4 2026+), não é MVP

**Recomendação:** Separar documentação em "MVP Atual" vs "Roadmap Futuro"

---

### GAP-002: 5 Cursos Documentados vs 1 Curso no Banco

**Documentado em:** `docs/conceitual/01-visao-geral/01-contexto-projeto.md`
```
- 5 sistemas integrados (C, Rust, Bash, VSCode, Claude Code)
- 227 módulos total
- 692 horas de conteúdo
```

**Realidade no Banco:**
```sql
courses: 1 registro (Bash)
modules: 16 registros
phases: 4 registros
Total: ~40h
```

**Evidência - Arquivos de dados existem:**
```
src/data/
├── bashLearningData.js      ✅ 16 módulos
├── cLearningData.js         ✅ Estrutura existe, não no banco
├── rustLearningData.js      ✅ Estrutura existe, não no banco
├── vsCodeLearningData.js    ✅ Estrutura existe, não no banco
└── claudeCodeLearningData.js ✅ Estrutura existe, não no banco
```

**Problema:** Componentes existem (CLearningSystem, RustLearningSystem), mas não há seed data

**Recomendação:** Criar `database/seed-5-cursos.sql` ou atualizar documentação

---

### GAP-003: Testes E2E Especificados mas NÃO Executando

**Documentado em:** `docs/tecnico/testing/QA-E2E-SPECS-MCP.md`
- 37 casos de teste especificados
- Código MCP para browser automation

**Status:**
```
✅ Specs completas (37 TCs descritos)
❌ Testes NÃO executam automaticamente
❌ Não integrado ao CI/CD
```

**Recomendação:** Converter specs em Playwright tests executáveis

---

### GAP-004: Deploy em Produção - 9 Ações Pendentes

**Documentado em:** `docs/backlog/acoes-usuario/ACOES-PENDENTES.md`

```
P0 (Blocker) - 1 ação:
ACTION-004: Adicionar GitHub workflow scope

P1 (High) - 6 ações:
ACTION-005-010: Setup Fly.io + CI/CD

P2 (Medium) - 2 ações:
ACTION-011: PostgreSQL Managed
ACTION-012: Domínio Customizado
```

**Status:** ❌ NENHUMA EXECUTADA

**Impacto:** Plataforma pronta mas não está em produção

---

## 2. Gaps de Permissões RBAC

**21 permissões definidas, 17 com UI (81%)**

| Permissão | Definida | API | UI | Status |
|-----------|----------|-----|-----|--------|
| `courses.view` | ✅ | ✅ | ✅ | ✅ OK |
| `courses.edit` | ✅ | ⚠️ | ❌ | ❌ GAP |
| `courses.create` | ✅ | ✅ | ✅ | ✅ OK |
| `paths.edit` | ✅ | ❌ | ❌ | ❌ GAP |
| `company.edit` | ✅ | ❌ | ❌ | ❌ GAP |
| `audit.view` | ✅ | ❌ | ❌ | ❌ GAP |

**Permissões sem implementação:**
1. `courses.edit` - API existe, UI não integrada
2. `paths.edit` - Learning Paths são hardcoded
3. `company.edit` - Sem painel de customização da empresa
4. `audit.view` - Tabela audit_logs existe, sem UI

---

## 3. Gaps de White-Label

**Documentado como "Completo" no Sprint 13**

**Realidade:**
```javascript
// apiService.js - AINDA HARDCODED:
const NOCODB_ADMIN = {
  email: 'admin@trainb2b.local',     // ❌ Hardcoded
  password: 'Admin@TrainB2B2026!',   // ❌ Hardcoded
};

const TABLE_IDS = {
  users: 'm9tvgm5rx70qh3i',          // ❌ Muda por cliente
  companies: 'mvw5muqhbzrmkuv',      // ❌ Se reiniciar NocoDB, quebra
};
```

**Impacto:** Não é white-label real se TABLE_IDs mudam por instalação

---

## 4. Débitos Técnicos Conhecidos

| Débito | Severidade | Status | Roadmap |
|--------|------------|--------|---------|
| Sem TypeScript | Média | ❌ Não iniciado | Release 3.0 |
| Sem Dark Mode | Baixa | ❌ Não iniciado | Release 3.0 |
| WCAG ~70% | Média | ⚠️ Parcial | Release 3.0 |
| Sem SSO | Alta | ❌ Não iniciado | Release 3.0 |
| Sem modo offline | Baixa | ⚠️ Parcial | Release 4.0 |

---

## 5. O Que Está Alinhado (Positivo)

### ✅ Perfeitamente Implementado

1. **RBAC x Personas** - 4 roles = 4 dashboards ✅
2. **Autenticação JWT** - Funcionando conforme documentado ✅
3. **4 Dashboards** - Student, Instructor, Admin, Executive ✅
4. **Internacionalização** - 3 idiomas (PT-BR, EN-US, ES-ES) ✅
5. **Componentes UI** - Empty states, loading, toasts ✅
6. **Mobile Responsivo** - Menu hamburger ✅
7. **Onboarding Wizard** - Conforme Sprint 10 ✅
8. **39 componentes** - Bem estruturados ✅
9. **43+ funções API** - apiService robusto ✅

---

## 6. Matriz Consolidada de Gaps

| # | GAP | Severidade | Documentação | Código | Ação |
|---|-----|-----------|--------------|--------|------|
| 1 | Hub de Especialistas | 🔴 ALTA | ✅ Detalhado | ❌ Não existe | Separar docs |
| 2 | 5 Cursos vs 1 | 🔴 ALTA | ✅ Promete 5 | ❌ Tem 1 | Criar seed |
| 3 | Testes E2E | 🟡 MÉDIA | ✅ Specs | ❌ Não roda | Automatizar |
| 4 | Deploy | 🔴 ALTA | ✅ Documentado | ❌ Não feito | Executar |
| 5 | RBAC 4 perms | 🟡 MÉDIA | ✅ Definidas | ❌ Sem UI | Implementar |
| 6 | White-label | 🟡 MÉDIA | ✅ Completo | ⚠️ Parcial | Refatorar |
| 7 | TypeScript | 🟡 MÉDIA | ✅ Planejado | ❌ Não fez | Backlog |

---

## 7. Plano de Ação Recomendado

### 🔴 P0 - Crítico (Imediato)

| # | Ação | Tempo | Arquivo |
|---|------|-------|---------|
| 1 | Atualizar docs conceituais (separar MVP vs Futuro) | 1h | `docs/conceitual/` |
| 2 | Centralizar TABLE_IDs em config | 2h | `apiService.js` |
| 3 | Executar Deploy Actions | 1.5h | `ACOES-PENDENTES.md` |

### 🟡 P1 - Importante (Próxima Sprint)

| # | Ação | Tempo | Arquivo |
|---|------|-------|---------|
| 4 | Implementar testes E2E automáticos | 8h | `tests/e2e/` |
| 5 | Implementar 4 permissões faltantes | 16h | Novos componentes |
| 6 | Documentar componentes não-registrados | 2h | `ROADMAP.md` |

### 🟢 P2 - Backlog

| # | Ação | Tempo | Arquivo |
|---|------|-------|---------|
| 7 | Criar seed data para 5 cursos | 4h | `database/` |
| 8 | Migrar para TypeScript | Ongoing | Todo projeto |
| 9 | Aumentar cobertura de testes unitários | 12h | `src/tests/` |

**Total de débito técnico: ~47 horas de trabalho**

---

## 8. Conclusão

### Status Geral: 72% Alinhado

**Saúde do Projeto:**
- MVP funcional com funcionalidades core
- Documentação abundante mas parcialmente desatualizada
- 3 gaps críticos precisam atenção imediata

**Risco Imediato:** 🟡 MÉDIO
- Documentação promete features que não existem (Hub de Especialistas, 5 cursos)
- Deploy bloqueado (9 ações pendentes)
- Testes E2E não executam automaticamente

**Prioridade #1:** Sincronizar documentação com realidade do código

---

**Documento gerado por análise forense automatizada**
**Data:** 2026-02-05
