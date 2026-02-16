# Próximos Passos - Alinhamento com Estrutura .claude/

**Data:** 2026-02-16  
**Fonte:** Roadmaps + QA + Ações Pendentes  
**Status:** ✅ Estrutura .claude/ alinhada com roadmap

---

## 📋 Resumo dos Próximos Passos (Roadmaps)

### **Sprint 16 - Certificados Automáticos** (Próximo)

| Feature | Status | Alinhamento .claude/ |
|---------|--------|---------------------|
| **Certificados automáticos** | 📋 Planejado | ✅ Pronto para implementar |
| Auto-geração ao completar curso | P0 | `.claude/rules/testing.md` cobre patterns |
| Template PDF customizável | P1 | `.claude/rules/white-label.md` patterns |
| QR Code de validação | P2 | `.claude/rules/security.md` guidelines |

**Rules que ajudarão:**
- `testing.md` - TDD para feature de certificados
- `white-label.md` - Logo/branding no certificado
- `security.md` - Validação QR Code, anti-falsificação
- `api-integration.md` - Endpoint NocoDB para certificates table

---

### **Deploy Produção Fly.io** (Paralelo ao Sprint 16)

| Ação | Status | Documentação .claude/ |
|------|--------|----------------------|
| Criar conta Fly.io | ⬜ Pendente | ✅ `.claude/QUICK_START.md` referencia `mise deploy:*` |
| Adicionar cartão de crédito | ⬜ Pendente | ✅ `docs/05-OPERACOES/04-flyio-billing.md` |
| Configurar spending limits | ⬜ Pendente | ✅ Documentado em acoes-pendentes |
| Criar app Fly.io | ⬜ Pendente | ✅ `mise deploy:prod` automatizado |
| Gerar token CI/CD | ⬜ Pendente | ✅ `.claude/rules/security.md` secrets management |

**Alinhamento:**
- ✅ `QUICK_START.md` já referencia comandos `mise deploy:*`
- ✅ `METACLAUDE.md` documenta deploy como próximo passo
- ✅ `rules/security.md` cobre secrets management
- ⚠️ **GAP:** Falta rule específica para deploy (sugestão: criar `rules/deploy-flyio.md`)

---

### **Sprint 17 - Gamificação** (Planejado)

| Feature | Status | Rules Aplicáveis |
|---------|--------|------------------|
| Badges de conquista | 📋 Backlog | `react-components.md` + `testing.md` |
| Sistema de pontos | 📋 Backlog | `api-integration.md` (nova table) |
| Leaderboard por empresa | 📋 Backlog | `multi-tenant.md` (isolamento) |
| Notificações de conquista | 📋 Backlog | `react-components.md` (Toast) |

**Alinhamento:**
- ✅ `rules/multi-tenant.md` garante isolamento de leaderboard por company_id
- ✅ `rules/react-components.md` tem patterns para badges/toasts
- ✅ `rules/testing.md` cobre TDD para nova feature
- ✅ `rules/i18n-translations.md` para tradução de conquistas

---

### **Sprint 18 - Integração LMS** (Backlog)

| Feature | Status | Rules Aplicáveis |
|---------|--------|------------------|
| Importar SCORM | 📋 Backlog | `api-integration.md` (upload files) |
| Exportar SCORM | 📋 Backlog | `api-integration.md` |
| Integração xAPI | 📋 Backlog | `security.md` (auth externa) |

**Alinhamento:**
- ✅ `rules/security.md` cobre integração com APIs externas
- ✅ `rules/api-integration.md` cobre upload/download patterns
- ⚠️ **GAP:** Considerar criar `rules/integrations.md` para padrões de integração

---

## 🐛 Bugs Pendentes (do QA E2E)

| Bug | Status | Rule Aplicável |
|-----|--------|----------------|
| **BUG-001:** Instructor vê "Admin" no dropdown | ✅ Corrigido | `rules/rbac-permissions.md` |
| **BUG-002:** Docs desatualizados (email specialist) | ✅ Corrigido | `METACLAUDE.md` atualizado |
| **BUG-004:** validateDOMNesting (SkeletonTableRow) | ✅ Corrigido | `rules/react-components.md` |

**Todos os 8 bugs foram corrigidos no re-run QA.**

---

## 📊 Métricas de Qualidade (Próximos Passos)

### Coverage Target: >70%

| Métrica | Atual | Target | Gap | Rule Aplicável |
|---------|-------|--------|-----|----------------|
| Statements | ~60% | 70% | +10% | `rules/testing.md` |
| Branches | ~55% | 70% | +15% | `rules/testing.md` |
| Functions | ~58% | 70% | +12% | `rules/testing.md` |

**Plano:**
1. Usar `rules/testing.md` patterns para todos novos componentes
2. Adicionar testes para componentes Hub (prioridade)
3. Cobrir edge cases de RBAC

---

## 🔧 Ações Manuais Pendentes

### P0 - BLOCKER

| Ação | Status | Documentação |
|------|--------|--------------|
| Adicionar scope `workflow` no GitHub CLI | ⬜ Pendente | `docs/07-GESTAO/03-acoes-pendentes.md` |

### P1 - HIGH (Deploy)

| Ação | Status | Estimativa |
|------|--------|------------|
| Criar conta Fly.io | ⬜ Pendente | 10 min |
| Adicionar cartão de crédito | ⬜ Pendente | 5 min |
| Configurar spending limits | ⬜ Pendente | 5 min |
| Criar app Fly.io | ⬜ Pendente | 5 min |
| Gerar token deploy CI/CD | ⬜ Pendente | 5 min |

**Total estimado:** ~35 minutos de ações manuais

---

## ✅ Validação: Estrutura .claude/ x Próximos Passos

### 🟢 **TOTALMENTE ALINHADO**

| Próximo Passo | Rules Aplicáveis | Docs Aplicáveis |
|---------------|------------------|-----------------|
| **Certificados (Sprint 16)** | testing, white-label, security, api-integration | QUICK_START, METACLAUDE |
| **Gamificação (Sprint 17)** | multi-tenant, react-components, testing, i18n | METACLAUDE |
| **Coverage >70%** | testing | METACLAUDE, E2E_TESTING |
| **Deploy Fly.io** | security (secrets) | QUICK_START, METACLAUDE |

### 🟡 **GAPS IDENTIFICADOS (Opcionais)**

1. **deploy-flyio.md** (rule específica)
   - Patterns de deploy
   - Troubleshooting Fly.io
   - Secrets management específico

2. **integrations.md** (rule futura)
   - Patterns de integração com APIs externas
   - SCORM import/export
   - xAPI integration

3. **gamification.md** (rule futura - Sprint 17)
   - Patterns de badges/points
   - Leaderboard multi-tenant
   - Notificações de conquista

---

## 📝 Recomendações

### 1️⃣ **Para Sprint 16 (Certificados)**

**Antes de começar:**
```bash
# 1. Revisar rules aplicáveis
cat .claude/rules/testing.md         # TDD patterns
cat .claude/rules/white-label.md     # Branding no certificado
cat .claude/rules/security.md        # QR Code validation
cat .claude/rules/api-integration.md # NocoDB table

# 2. Criar test cases primeiro (TDD)
# 3. Implementar com rules ativadas automaticamente
```

**Rules que ativarão automaticamente:**
- Editar `src/components/Certificate.jsx` → `react-components.md`
- Editar `src/services/apiService.js` → `api-integration.md`
- Criar testes → `testing.md`
- Adicionar tradução → `i18n-translations.md`

### 2️⃣ **Para Deploy Fly.io**

**Criar rule opcional:**
```bash
# .claude/rules/deploy-flyio.md
paths:
  - "fly.toml"
  - "Dockerfile"
  - ".dockerignore"
  - "docs/05-OPERACOES/**"
```

Conteúdo: Patterns de deploy, troubleshooting, secrets Fly.io

### 3️⃣ **Para Coverage >70%**

**Usar `testing.md` sistematicamente:**
- Todos novos componentes = testes primeiro (TDD)
- Priorizar Hub components (baixa cobertura)
- Usar mocks documentados na rule

---

## 🎯 Conclusão

✅ **Estrutura `.claude/` está 100% alinhada com próximos passos do roadmap**

**Justificativa:**
1. ✅ **10 rules** cobrem todas features planejadas (Sprints 16-18)
2. ✅ **METACLAUDE.md** documenta roadmap completo
3. ✅ **QUICK_START.md** referencia comandos de deploy
4. ✅ **E2E_TESTING.md** guia completo para validação
5. ✅ **Testing.md** cobre TDD para novas features

**Gaps identificados são opcionais** e podem ser criados conforme necessidade específica de cada Sprint.

---

**Próxima ação sugerida:** Iniciar Sprint 16 (Certificados) com TDD usando `testing.md` patterns.
