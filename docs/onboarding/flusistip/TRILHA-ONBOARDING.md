# Trilha de Onboarding: FluSisTip

> **Gerado por:** Diagnostico Forense TrainB2B v1.0
> **Data:** 2026-02-17
> **Projeto Fonte:** FluSisTip (Healthcare LLM Workflow Platform)
> **Prazo Onboarding:** 6-8 semanas
> **Perfil Alvo:** Dev Pleno Full-Stack

---

## Contexto LLM (Zero-Context Resume)

Esta trilha de onboarding foi gerada automaticamente a partir do diagnostico
forense do projeto FluSisTip. Ela transforma 47.390 LOC de codigo-fonte em
5 cursos com 35 modulos para a plataforma TrainB2B.

**Para retomar trabalho neste arquivo:**
1. Ler este documento (visao geral)
2. Ler `RELATORIO-FORENSE.md` (dados brutos)
3. Editar `src/data/flusistipOnboardingData.js` (dados de aprendizagem)
4. Editar `src/data/flusistipFlashCards.js` (flash cards)

---

## Mapa da Trilha (DAG de Prerequisitos)

```
[Curso 0: Fundamentos] ──→ [Curso 1: Dominio] ──→ [Curso 2: Workflow]
         │                         │                        │
         │                         └──→ [Curso 3: LLM] ←───┘
         │
         └──→ [Curso 4: Frontend Re-frame]
```

**Regras:**
- Curso 0 e obrigatorio para TODOS
- Cursos 1-3 sao sequenciais para backend
- Curso 4 e independente (precisa apenas do Curso 0)
- Cursos 2 e 3 podem ser feitos em paralelo apos Curso 1

---

## Curso 0: FluSisTip - Fundamentos e Ambiente

**Dificuldade:** Beginner | **Duracao:** 1 semana | **Modulos:** 5

| Fase | Modulos | Foco |
|------|---------|------|
| Ambiente de Desenvolvimento | 1.1 Clojure Essencial, 1.2 Setup Local, 1.3 Estrutura do Projeto | Instalar, rodar, navegar |
| REPL-First Workflow | 2.1 REPL (6 passos), 2.2 Testes e Validacao L1-L4 | Fluxo de trabalho core |

**Entregavel Final:** Ambiente rodando + primeiro PR mergeado (typo/doc fix)

---

## Curso 1: FluSisTip - Dominio Healthcare e Multi-Tenant

**Dificuldade:** Intermediate | **Duracao:** 1.5 semanas | **Modulos:** 8

| Fase | Modulos | Foco |
|------|---------|------|
| Modelo de Dominio | 1.1 Hierarquia Entidades, 1.2 Datomic Schemas, 1.3 Componentes (TextoBase/Contexto/ConfigLLM) | Entender o que existe |
| Multi-Tenant e RBAC | 2.1 Isolamento Tenant, 2.2 RBAC 8 Personas, 2.3 Middleware Auth+Tenant | Seguranca |
| Compliance Healthcare | 3.1 LGPD/CFM/CRP, 3.2 Audit Trail via Datomic | Regulatorio |

**Entregavel Final:** Diagrama de entidades + explicar fluxo request→domain→db

---

## Curso 2: FluSisTip - Workflow Engine e HITL

**Dificuldade:** Advanced | **Duracao:** 2 semanas | **Modulos:** 9

| Fase | Modulos | Foco |
|------|---------|------|
| State Machine | 1.1 Estados e Transicoes, 1.2 Orchestrator, 1.3 Decision Points (GAP-002) | Motor de estados |
| HITL Checkpoints | 2.1 Tipos de Checkpoint, 2.2 Aprovacao Unanime, 2.3 Validacao Externa | Humano no loop |
| Kanban e SLA | 3.1 Board 7 Colunas, 3.2 SLA Monitoring, 3.3 Comments e Colaboracao | Gestao visual |

**Entregavel Final:** Implementar novo tipo de checkpoint ou modificar transicao

---

## Curso 3: FluSisTip - Integracao LLM

**Dificuldade:** Advanced | **Duracao:** 1.5 semanas | **Modulos:** 6

| Fase | Modulos | Foco |
|------|---------|------|
| Provider Abstraction | 1.1 Executor e Fallback Chain, 1.2 Gemini Client (auth+retry) | Arquitetura LLM |
| Composicao de Prompts | 2.1 Placeholders {{var}}, 2.2 Sistemas A/B/C/D | Como montar prompts |
| Custo e Metricas | 3.1 Token Counting, 3.2 Cost Tracking | Otimizacao |

**Entregavel Final:** Adicionar novo provider mock ou modificar fallback chain

---

## Curso 4: FluSisTip - Frontend Re-frame

**Dificuldade:** Intermediate | **Duracao:** 1.5 semanas | **Modulos:** 7

| Fase | Modulos | Foco |
|------|---------|------|
| Re-frame Fundamentals | 1.1 Events/Subs/Views, 1.2 App-db e Estado, 1.3 Auth Flow | Padrao Re-frame |
| Componentes UI | 2.1 Playground Editor, 2.2 Kanban Board, 2.3 HITL Interface | Componentes core |
| Rotas e Integracao | 3.1 Routing RBAC | Navegacao |

**Entregavel Final:** Criar novo componente UI com events+subs+views

---

## Metricas de Sucesso do Onboarding

| Semana | Marco | Verificacao |
|--------|-------|-------------|
| 1 | Ambiente funcional + REPL | `mise run dev:all` sem erros |
| 2 | Entender dominio | Apresentar diagrama para equipe |
| 3 | Primeiro PR substancial | PR aprovado em code review |
| 4 | Feature independente | Implementar task do roadmap |
| 5-6 | Autonomia | Resolver bug em area desconhecida |
| 7-8 | Contribuicao real | Feature em producao |

---

*Trilha gerada por Diagnostico Forense TrainB2B v1.0 | 2026-02-17*
