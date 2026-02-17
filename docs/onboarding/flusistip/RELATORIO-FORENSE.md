# Diagnostico Forense: FluSisTip

> **Projeto:** FluSisTip - Hub de Workflows de LLMs Assistidas para Healthcare
> **Path Fonte:** `/home/notebook/workspace/flusistip/`
> **Data Analise:** 2026-02-17
> **Analista:** Claude Opus 4.6 (Diagnostico Forense TrainB2B)
> **Versao:** 1.0.0

---

## Contexto LLM (Zero-Context Resume)

Este documento e o relatorio forense completo do projeto FluSisTip, gerado para
criar trilhas de onboarding na plataforma TrainB2B (app-controle). Ele contem
TODAS as informacoes necessarias para uma sessao LLM sem contexto previo
retomar o trabalho de geracao de cursos, modulos e conteudo pedagogico.

**Artefatos relacionados neste mesmo commit:**
- `docs/onboarding/flusistip/TRILHA-ONBOARDING.md` - Visao geral da trilha
- `src/data/flusistipOnboardingData.js` - Dados de aprendizagem (fases + modulos)
- `src/data/flusistipFlashCards.js` - Flash cards com rastreabilidade
- `src/data/flusistipOnboardingChecklist.js` - Checklists por persona
- `database/seed-onboarding-flusistip.sql` - Seed SQL para NocoDB

---

## 1. Sumario Executivo

| Metrica | Valor |
|---------|-------|
| **Stack Principal** | Clojure 1.12 + ClojureScript + Datomic Local + React 18 (Reagent/Re-frame) |
| **Complexidade Geral** | 8/10 (MUITO ALTA) |
| **LOC Backend** | 35.047 (86 namespaces) |
| **LOC Frontend** | 8.687 (30 namespaces) |
| **LOC Testes** | 3.656 (11 namespaces) |
| **LOC Total** | 47.390 fonte + 96.862 docs = 144.252 |
| **Arquivos Rastreados** | 686 |
| **Idade** | ~2.5 meses (Nov 2025 - Fev 2026) |
| **Commits** | 345 |
| **Contribuidores** | 1 (bus factor critico) |
| **Status MVP** | 89% completo (151/170 tarefas) |
| **E2E Validacao** | 91% (24.5/27 cenarios) |
| **Bugs Corrigidos** | 43/43 (100%) |
| **API Endpoints** | 98 REST |
| **Schemas Datomic** | 12 arquivos EDN (3.282 LOC) |
| **Feature Flags** | 4 ativas |
| **Personas RBAC** | 8 perfis |

---

## 2. Mapa Arquitetural

### Camadas (7 niveis)

```
┌─────────────────────────────────────────┐
│  FRONTEND (ClojureScript 1.12.42)       │  React 18 + Reagent + Re-frame
│  30 namespaces | 8.687 LOC              │  120 events | 70 subscriptions
│  Tailwind CSS 4.0 | Shadow-cljs 3.2     │
└────────────────┬────────────────────────┘
                 │ HTTP/JSON (cljs-ajax)
┌────────────────▼────────────────────────┐
│  API GATEWAY (Ring 1.12 + Reitit 0.7)   │  98 endpoints | 4 middleware layers
│  Auth (JWT) → Tenant → RBAC → Handler   │  Coercion via spec
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  DOMAIN LAYER (Clojure 1.12)            │  DDD | 21 entidades | Pure functions
│  Approval Workflows | State Machine     │  Placeholder resolution
│  Compliance (LGPD/CFM/CRP)             │  Component versioning (SHA-256)
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  WORKFLOW ENGINE                        │  7-state machine | Unanimidade
│  Decision Points (GAP-002)              │  External triggers | SLA monitoring
│  HITL Checkpoints                       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  LLM INTEGRATION                        │  Gemini 2.5 Flash + Claude
│  Provider fallback chain                │  Token counting | Cost tracking
│  4 tipos: A(Pure) B(+DB) C(+Web) D(All)│
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  DATABASE (Datomic Local 1.0.277)       │  Imutavel | Event sourcing nativo
│  12 schemas | 25+ entity types          │  Audit trail temporal
│  + PostgreSQL 16 | + Redis (Carmine)    │
└─────────────────────────────────────────┘
```

### Padroes Identificados

| Padrao | Evidencia | Complexidade |
|--------|-----------|:------------:|
| DDD (Domain-Driven Design) | `src/hub/domain/` 21 entidades ricas | 8/10 |
| Event Sourcing | Datomic imutavel nativo | 7/10 |
| CQRS (parcial) | Queries separadas de transactions | 5/10 |
| Multi-Tenant | `tenant-id` em TODAS as queries | 7/10 |
| State Machine (7 estados) | `workflow/transitions.clj` | 8/10 |
| RBAC (8 personas) | `middleware/auth.clj` | 6/10 |
| Feature Flags | 4 flags em `config.clj` | 3/10 |
| HITL (Human-in-the-Loop) | Checkpoints obrigatorios | 7/10 |
| Provider Abstraction | LLM fallback chain | 6/10 |
| Placeholder Resolution | `{{variavel}}` em prompts | 5/10 |

---

## 3. Entidades de Dominio

### Hierarquia

```
TENANT (Organizacao - isolamento top-level)
  ├── APLICACAO (Container funcional)
  │   └── FUNCAO (Agrupamento de features)
  │       └── FLUXO (Pipeline de sistemas - ordenado)
  │           └── SISTEMA (Unidade atomica - Tipos A/B/C/D)
  │               ├── TEXTO_BASE (Template/prompt)
  │               ├── CONTEXTO (Dados externos)
  │               └── CONFIG_LLM (Parametros modelo)
  │
  ├── WORKFLOW (Maquina de estados)
  │   ├── APPROVAL_STEP (Etapa de aprovacao)
  │   ├── HITL_CHECKPOINT (Ponto de validacao humana)
  │   └── DECISION_POINT (Branching condicional)
  │
  ├── KANBAN (Board de revisao)
  │   ├── CARD (Tarefa no board)
  │   ├── COMMENT (Discussao)
  │   └── SLA (Monitoramento prazo)
  │
  └── USUARIO (com role: 8 tipos)
      ├── ASSINATURA (Consentimento/audit)
      ├── CERTIFICADO (Completude)
      └── NOTIFICACAO (In-app/SLA alerts)
```

### Cardinalidade

- 1 TENANT → N USUARIOS, N FLUXOS, N SISTEMAS
- 1 FLUXO → N SISTEMAS (ordenados por `:fluxo-sistema/ordem`)
- 1 SISTEMA → 1 TEXTO_BASE + N CONTEXTOS + 0..1 CONFIG_LLM
- 1 WORKFLOW → N APPROVAL_STEPS → N VOTOS (unanimidade)
- 1 KANBAN_CARD → 1 WORKFLOW + N COMMENTS + 1 SLA

---

## 4. State Machine (7 Estados)

```
:draft ──────────────→ :technical-review
                              │
                              ▼
                       :legal-review ──→ :external-validation (se LGPD score >= 70)
                              │                   │
                              ▼                   │
                         :revision ←──────────────┘
                              │
                              ▼
                         :approved
                              │
                              ▼
                         :published
                              │
                              ▼
                         :archived (final)
```

**Regras:**
- `:legal-review → :approved` = UNANIMIDADE obrigatoria (3 votos, todos aprovam)
- `:legal-review → :external-validation` = Ativado por Decision Point (LGPD score >= 70)
- `:archived` = Estado final, sem transicoes de saida
- `:revision` = Estado intermediario (nao existe rollback direto)

---

## 5. Matriz de Complexidade por Modulo

### Backend (Top 15 por complexidade)

| Namespace | LOC | Conceitual | Tecnico | Dominio | Integracao | **TOTAL** |
|-----------|----:|:----------:|:-------:|:-------:|:----------:|:---------:|
| workflow/orchestrator.clj | 820 | 7 | 7 | 8 | 6 | **7.1** |
| domain/approval_workflow.clj | 613 | 7 | 6 | 8 | 5 | **6.6** |
| workflow/unanimous.clj | ~300 | 6 | 5 | 8 | 5 | **6.1** |
| llm/gemini.clj | 287 | 5 | 8 | 3 | 7 | **5.7** |
| api/execution/fluxo.clj | 984 | 6 | 6 | 6 | 5 | **5.8** |
| agent/hitl.clj | 593 | 6 | 5 | 7 | 5 | **5.8** |
| domain/compliance_checklist.clj | ~427 | 5 | 4 | 8 | 4 | **5.4** |
| api/routes.clj | 501 | 5 | 6 | 4 | 6 | **5.2** |
| domain/kanban_card.clj | 556 | 5 | 5 | 6 | 4 | **5.1** |
| api/middleware/auth.clj | ~250 | 5 | 6 | 4 | 5 | **5.0** |
| llm/executor.clj | 472 | 5 | 6 | 3 | 6 | **5.0** |
| domain/sistema.clj | 548 | 5 | 5 | 5 | 4 | **4.8** |
| db/queries.clj | 595 | 4 | 6 | 4 | 4 | **4.5** |
| domain/fluxo.clj | 481 | 4 | 5 | 5 | 4 | **4.5** |
| domain/componente.clj | 427 | 4 | 5 | 4 | 3 | **4.1** |

### Frontend (Top 5 por complexidade)

| Namespace | LOC | Conceitual | Tecnico | Dominio | Integracao | **TOTAL** |
|-----------|----:|:----------:|:-------:|:-------:|:----------:|:---------:|
| events.cljs | 1.348 | 7 | 7 | 5 | 7 | **6.5** |
| views.cljs | 481 | 5 | 5 | 5 | 5 | **5.0** |
| components/playground/* | 1.197 | 5 | 6 | 4 | 4 | **4.8** |
| components/review/* | 965 | 4 | 5 | 6 | 4 | **4.8** |
| subs.cljs | 499 | 4 | 5 | 4 | 4 | **4.3** |

---

## 6. Hotspots (Arquivos com Maior Rotacao)

| Commits | Arquivo | LOC | Risco |
|--------:|---------|----:|:-----:|
| 21 | frontend/src/hub/events.cljs | 1.348 | ALTO |
| 11 | frontend/src/hub/views.cljs | 481 | MEDIO |
| 10 | src/hub/server.clj | 485 | MEDIO |
| 9 | frontend/src/hub/subs.cljs | 499 | MEDIO |
| 7 | src/hub/api/routes.clj | 501 | MEDIO |
| 7 | src/hub/agent/hitl.clj | 593 | MEDIO |

**Achado principal:** `events.cljs` e o maior arquivo do frontend E o mais modificado.
Candidato a decomposicao em multiplos event namespaces.

---

## 7. Gaps de Conhecimento Identificados

### Criticos (Bloqueiam Producao)

| # | Gap | Impacto | Fonte |
|---|-----|---------|-------|
| 1 | BAA Google Cloud (negociacao compliance) | Bloqueia uso de PHI real | STATUS-EXECUTIVO-MVP.md |
| 2 | Claude Vertex AI (habilitacao Model Garden) | LLM incompleto (67% Layer 3) | PLANO-VALIDACAO-LLM |
| 3 | Feature flags em producao (matriz de interacao) | Flags nao testadas juntas | config.clj |

### Altos (Impactam Desenvolvimento)

| # | Gap | Impacto | Fonte |
|---|-----|---------|-------|
| 4 | ADR-364 Datomic Client API (17 queries) | Bug recorrente query-many | roadmap/05-bugs-gaps.md |
| 5 | Re-frame hot-reload edge cases | Frustacao dev | BUG-003 |
| 6 | Seed provisioning order (dependencias) | 10 bugs na Fase 9.7 | GAP-SEED-001-010 |
| 7 | Auth secret hardcoded (TODO em auth.clj) | Risco seguranca | src/hub/api/auth.clj:31 |

### Tribal Knowledge (Nao Documentado)

| # | Conhecimento | Fonte | Flash Card? |
|---|-------------|-------|:-----------:|
| 8 | query-many descarta colunas > 1 | ADR-364 | SIM |
| 9 | Sempre usar :reload no REPL | CLAUDE.md | SIM |
| 10 | tenant-id esquecido = data leakage | middleware/tenant.clj | SIM |
| 11 | JWT serializa keywords como strings | middleware/auth.clj | SIM |
| 12 | Seeds devem ser 100% idempotentes | ADR-364 | SIM |
| 13 | L1→L2→L3→L4 nao pular niveis | CLAUDE.md | SIM |
| 14 | Placeholder deve resolver ANTES de execucao | domain/sistema.clj | SIM |
| 15 | events.cljs e hotspot principal | git log | SIM |

---

## 8. Metricas de Teste

| Metrica | Valor | Status |
|---------|-------|--------|
| Arquivos de teste | 11 | |
| LOC testes | 3.656 | |
| deftest declarations | 93 | |
| Assertions (is) | 0 | CRITICO |
| Ratio teste:fonte | 1:12 (8.4%) | |
| Backend coverage (namespace) | 11.6% | |
| Frontend coverage (namespace) | 3.3% | |

**ALERTA:** 93 `deftest` sem nenhuma assertion `(is ...)`. Testes podem ser no-ops.

---

## 9. Stack de Dependencias

### Backend (Clojure)

| Categoria | Dependencia | Versao |
|-----------|-------------|--------|
| Runtime | Clojure | 1.12.0 |
| Database | Datomic Local | 1.0.277 |
| HTTP | Ring + Jetty | 1.12.2 |
| Routing | Reitit | 0.7.2 |
| Auth | buddy-hashers/sign | 2.0.167/3.5.351 |
| HTTP Client | clj-http | 3.12.3 |
| JSON | Cheshire | 5.13.0 |
| Logging | Timbre | 6.5.0 |
| Cache | Carmine (Redis) | 3.3.2 |

### Frontend (ClojureScript)

| Categoria | Dependencia | Versao |
|-----------|-------------|--------|
| React | react/react-dom | 18.2.0 |
| Wrapper | Reagent | 1.3.0 |
| State | Re-frame | 1.4.3 |
| Build | Shadow-cljs | 3.2.0 |
| CSS | Tailwind CSS | 4.0.0 |
| Routing | Reitit Frontend | 0.7.2 |
| HTTP | cljs-ajax | 0.8.4 |

### Tooling

| Ferramenta | Versao | Uso |
|------------|--------|-----|
| Bun | 1.3.3 | Runtime JS |
| mise | latest | Task runner (37 tasks) |
| Kaocha | 1.91.1392 | Test runner |
| clj-kondo | latest | Linting |
| Trivy | latest | Vulnerability scan |
| gitleaks | latest | Secret detection |

---

## 10. Personas RBAC (8 Perfis)

| Persona | Role | Acesso Principal | Credenciais Demo |
|---------|------|-------------------|------------------|
| P5 Admin SaaS | admin-saas | Plataforma global | admin@flusistip.com |
| P4 Admin Tenant | admin-tenant | Organizacao | admin@clinica-nova.com |
| P1 Dev Team | dev-team | Execucao workflows | devteam@clinica-nova.com |
| P2 Dev Components | dev-componentes | CRUD componentes | ana@clinica-nova.com |
| P3 Reviewer | revisor | Kanban + HITL | carlos@clinica-nova.com |
| P6 External Validator | validador-externo | Portal externo | (token JWT) |
| P7 Data Analyst | analista | Metricas | (nao implementado) |
| P8 Support | suporte | Help desk | (nao implementado) |

---

## 11. Feature Flags

| Flag | Default | Proposito |
|------|:-------:|-----------|
| `:parallel-execution` | false | GAP-001: Execucao paralela de sistemas |
| `:decision-point-lgpd` | false | GAP-002: Routing condicional por score LGPD |
| `:drag-drop-kanban` | false | GAP-003: Drag-drop no Kanban UI |
| `:real-llm-execution` | false | Usar Gemini/Claude real vs mock |

---

## 12. Comandos Essenciais (mise)

```bash
# Desenvolvimento
mise run dev              # Backend porta 3000
mise run dev:frontend     # Frontend porta 8080
mise run dev:all          # Ambos
mise run dev:e2e          # Full stack + Chrome debug

# REPL
mise run repl             # nREPL interativo
mise run repl:eval        # Avaliar expressao

# Testes
mise run test             # Todos os testes
mise run lint             # clj-kondo

# QA
mise run qa:status        # Status completo
mise run qa:llm-on        # Ativar feature flags LLM

# Seguranca
mise run security:scan    # Trivy + gitleaks + grype
```

---

## 13. Trilha de Onboarding Recomendada

Baseado neste diagnostico, a trilha de onboarding para FluSisTip contém **5 cursos**:

| # | Curso | Dificuldade | Semanas | Modulos | Persona Alvo |
|---|-------|:-----------:|:-------:|:-------:|-------------|
| 0 | Fundamentos e Ambiente | Beginner | 1 | 5 | Todos |
| 1 | Dominio Healthcare e Multi-Tenant | Intermediate | 1.5 | 8 | Backend, Full-stack |
| 2 | Workflow Engine e HITL | Advanced | 2 | 9 | Backend, Full-stack |
| 3 | Integracao LLM | Advanced | 1.5 | 6 | Backend, ML/AI |
| 4 | Frontend Re-frame | Intermediate | 1.5 | 7 | Frontend, Full-stack |
| **TOTAL** | | | **7.5** | **35** | |

---

*Relatorio gerado por Diagnostico Forense TrainB2B v1.0 | 2026-02-17*
*Projeto fonte: FluSisTip @ /home/notebook/workspace/flusistip/*
