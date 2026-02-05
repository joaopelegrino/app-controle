# 📋 Planejamento Six-Layer Docs - Plataforma B2B de treinamento técnico corporativo

> **Implementação das Camadas 1 (Skills) e 4 (Treinamento Interno)**
>
> **Versão:** 1.0.1
> **Data:** 2025-11-16
> **Base:** Metodologia Six-Layer Claude Code (Padrão Oficial)
> **Responsável:** João Pelegrino
> **Status:** 🚧 Em Planejamento

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Objetivos](#objetivos)
3. [Escopo](#escopo)
4. [Camada 1: Skills Claude Code](#camada-1-skills-claude-code)
5. [Camada 4: Treinamento Interno](#camada-4-treinamento-interno)
6. [Integração com Docs Existentes](#integração-com-docs-existentes)
7. [Roadmap de Implementação](#roadmap-de-implementação)
8. [Métricas de Sucesso](#métricas-de-sucesso)
9. [Riscos e Mitigações](#riscos-e-mitigações)

---

## 🎯 Visão Geral

### Contexto

O **Plataforma B2B de treinamento técnico corporativo** é um sistema educacional interativo com:
- 227 módulos de conteúdo educacional
- 5 sistemas integrados (C, Rust, Bash, VSCode, Claude Code)
- 17 componentes React
- Stack: React 18.3, Vite 5.4, Tailwind 3.4

### Problema

Atualmente, o projeto possui:
- ✅ **Documentação conceitual** (`docs/conceitual/`) - 4 documentos
- ✅ **Documentação técnica** (`docs/tecnico/`) - 5 documentos
- ✅ **Skills existentes** (`.claude/skills/`) - 5 skills
- ❌ **Sem estrutura de onboarding** para novos desenvolvedores
- ❌ **Sem inventário centralizado** de skills técnicas
- ❌ **Sem trilhas de aprendizado** para nivelamento de equipe

### Solução: Metodologia Six-Layer

Implementar **Camada 1 (Skills)** e **Camada 4 (Treinamento Interno)** seguindo padrões oficiais do Claude Code:

| Camada | Nome | Implementação | Prioridade |
|--------|------|---------------|-----------|
| **1** | Contexto Técnico Unificado | `.claude/skills/` + SKILLS-BACKLOG.md | ✅ **P0** |
| **4** | Treinamento Técnico Interno | `docs/treinamento-interno/` + TRAINING-INTERNAL-BACKLOG.md | ✅ **P0** |

---

## 🎯 Objetivos

### Objetivo Geral

**Criar infraestrutura completa de documentação técnica e treinamento para desenvolvedores iniciantes no projeto.**

### Objetivos Específicos

#### Camada 1: Skills
1. ✅ Criar inventário centralizado de skills (`SKILLS-BACKLOG.md`)
2. ✅ Documentar skills técnicas essenciais (React, Vite, Tailwind, Testing)
3. ✅ Garantir auto-discovery effectiveness > 90%
4. ✅ Cobrir 100% das tecnologias principais do stack

#### Camada 4: Treinamento Interno
1. ✅ Criar estrutura de onboarding de 4 semanas
2. ✅ Desenvolver módulos L0 (Fundamentals) para stack do sistema
3. ✅ Desenvolver módulos L1 (Core Concepts) de arquitetura
4. ✅ Criar trilhas de aprendizado para diferentes níveis
5. ✅ Integrar com documentação técnica existente

---

## 📦 Escopo

### Incluído

**Camada 1 (Skills):**
- ✅ Arquivo SSOT: `SKILLS-BACKLOG.md`
- ✅ 8-10 domain skills sobre stack do sistema:
  - `react-components-patterns`
  - `vite-build-optimization`
  - `tailwind-design-system`
  - `testing-strategy-vitest`
  - `system-architecture` (atualizar existente)
  - `localStorage-patterns`
  - `react-hooks-custom`
  - `docker-deployment`
- ✅ Frontmatter completo (200+ palavras em description)
- ✅ Keywords estratégicos (8-15 por skill)
- ✅ Auxiliar files para skills complexas

**Camada 4 (Treinamento Interno):**
- ✅ Estrutura base: `docs/treinamento-interno/`
- ✅ Arquivo SSOT: `TRAINING-INTERNAL-BACKLOG.md`
- ✅ Módulos L0 (Fundamentals):
  - `L0-01`: Environment Setup (WSL2, Git, Node, Docker)
  - `L0-02`: React Basics (JSX, Components, Hooks)
  - `L0-03`: Vite & Build Tools
  - `L0-04`: Tailwind CSS
  - `L0-05`: Git Workflow & PRs
- ✅ Módulos L1 (Core Concepts):
  - `L1-01`: Arquitetura do Sistema (4 camadas)
  - `L1-02`: Sistema de Cursos (LearningSystem pattern)
  - `L1-03`: localStorage & State Management
  - `L1-04`: Breadcrumb & Navigation
  - `L1-05`: Testing Strategy
- ✅ Programa de onboarding estruturado (4 semanas)
- ✅ Assessments e exercícios práticos

### Excluído (Futuro)

- ❌ Camada 2 (API Docs) - não aplicável (sem backend API)
- ❌ Camada 3 (User Docs) - já coberto por PRODUCT-CENTRAL-DOCUMENT.md
- ❌ Camada 5 (Training External) - sem programa de parceiros
- ❌ Camada 6 (Training User) - foco em desenvolvedores, não usuários finais

---

## 📚 CAMADA 1: Skills Claude Code

### Estrutura Proposta

```
.claude/skills/
├── SKILLS-BACKLOG.md                    # ✅ SSOT - Inventário completo
│
├── react-components-patterns/           # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── functional-components.md
│       ├── hooks-guide.md
│       └── composition-patterns.md
│
├── vite-build-optimization/             # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── code-splitting.md
│       ├── bundle-analysis.md
│       └── performance-tips.md
│
├── tailwind-design-system/              # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── utility-first.md
│       ├── responsive-design.md
│       └── custom-components.md
│
├── testing-strategy-vitest/             # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── unit-testing.md
│       ├── component-testing.md
│       └── e2e-playwright.md
│
├── localStorage-patterns/               # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── error-handling.md
│       ├── quota-management.md
│       └── data-schema.md
│
├── react-hooks-custom/                  # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── useAutoSaveNotes.md
│       ├── useModuleProgress.md
│       └── best-practices.md
│
├── docker-deployment/                   # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── multi-stage-build.md
│       ├── nginx-config.md
│       └── github-actions.md
│
├── system-state-management/             # ✅ NOVA
│   ├── SKILL.md
│   └── auxiliary/
│       ├── state-patterns.md
│       ├── data-flow.md
│       └── context-api.md
│
├── breadcrumb-impl/                     # ✅ EXISTENTE (atualizar)
├── component-refactor/                  # ✅ EXISTENTE (atualizar)
├── meta-configuracao-evolucao/          # ✅ EXISTENTE (manter)
├── system-architecture/                 # ✅ EXISTENTE (expandir - renomear de platform-architecture)
└── ux-nomenclature/                     # ✅ EXISTENTE (manter)
```

### Skills a Criar (Prioridade P0)

#### 1. react-components-patterns

**Propósito:** Documentar padrões de componentes React usados no sistema

**Conteúdo:**
- Functional components vs class components
- Hooks (useState, useEffect, custom hooks)
- Composition over inheritance
- Props drilling vs Context API
- Controlled vs uncontrolled components
- Error boundaries

**Description (resumo):**
> Comprehensive guide to React component patterns used in the system. Covers functional components with hooks, composition patterns, state management, props flow, and error handling. Learn how to create reusable components following React best practices, avoiding common antipatterns like prop drilling and unnecessary class components. Includes real examples from CLearningSystem, BashLearningSystem, and Breadcrumb components. Essential for understanding the system's component architecture and contributing to the codebase.

**Keywords:**
```
react, components, hooks, useState, useEffect,
functional-components, composition, props,
context-api, error-boundary, patterns
```

**Allowed Tools:**
```
Read, Write, Edit, Grep, Glob, Bash
```

---

#### 2. vite-build-optimization

**Propósito:** Configuração e otimização do Vite para performance

**Conteúdo:**
- Vite config structure
- Code splitting (manual chunks)
- Minification (Terser options)
- Sourcemaps (security considerations)
- HMR (Hot Module Replacement)
- Build time optimization
- Bundle size analysis

**Description (resumo):**
> Complete guide to Vite build optimization for the educational platform. Learn how to configure vite.config.js for optimal performance, security, and developer experience. Covers code splitting with manual chunks (react-vendor, ui-vendor), Terser minification (drop_console, drop_debugger), sourcemap management, and build time optimization. Understand the tradeoffs between bundle size and performance, how to analyze bundles with rollup-plugin-visualizer, and debugging strategies in production. Essential for maintaining the 295ms startup time and sub-2s build performance.

**Keywords:**
```
vite, build-tool, optimization, code-splitting,
minification, terser, HMR, bundle-size,
performance, rollup, esbuild
```

---

#### 3. tailwind-design-system

**Propósito:** Sistema de design com Tailwind CSS no projeto

**Conteúdo:**
- Utility-first philosophy
- Responsive design (breakpoints)
- Custom colors and theme
- Component extraction
- JIT compiler
- PurgeCSS integration

**Description (resumo):**
> Guide to Tailwind CSS design system implementation in the educational platform. Master utility-first CSS methodology, responsive design patterns, and custom theming. Learn how the system uses Tailwind for consistent spacing, typography, and colors across 17+ components. Covers JIT compiler for optimized builds, PurgeCSS integration to remove unused classes, and strategies for extracting reusable component classes. Includes real examples from HubView, AreaCard, and Breadcrumb components. Essential for maintaining visual consistency and rapid UI development.

**Keywords:**
```
tailwind, css, utility-first, design-system,
responsive, JIT, purgeCSS, styling,
theme, components, customization
```

---

#### 4. testing-strategy-vitest

**Propósito:** Estratégia de testes com Vitest e Playwright

**Conteúdo:**
- Vitest setup and config
- Unit testing components
- Testing Library patterns
- Mocking localStorage
- E2E with Playwright
- Coverage targets (80%)

**Description (resumo):**
> Complete testing strategy guide for the system using Vitest and Playwright. Learn how to write unit tests for React components, test hooks and utilities, mock localStorage for state management tests, and create E2E flows with Playwright. Covers Vitest configuration, Testing Library best practices (query methods, user events, accessibility), test organization, and CI/CD integration. Understand the current 5% coverage state and roadmap to 80% target. Essential for maintaining code quality and preventing regressions in the 5,500+ lines codebase.

**Keywords:**
```
testing, vitest, playwright, unit-tests,
e2e, testing-library, mocking, coverage,
ci-cd, quality-assurance
```

---

#### 5. localStorage-patterns

**Propósito:** Padrões de uso do localStorage no sistema

**Conteúdo:**
- Schema design (progresso, notas)
- Error handling (QuotaExceededError)
- Data validation
- Migration strategies
- Size limits (5-10MB)
- Backup and export

**Description (resumo):**
> Comprehensive guide to localStorage patterns in the educational system for state persistence without backend. Learn the localStorage schema for course progress and notes, error handling for quota exceeded scenarios, data validation, and migration strategies. Covers size limits (50KB per course notes, 5-10MB total), backup strategies, and future migration to backend API. Includes real examples from CLearningSystem and BashNotesView components. Essential for understanding how the system persists user data and handling edge cases.

**Keywords:**
```
localStorage, persistence, state-management,
error-handling, quota, schema-design,
validation, migration, backup
```

**Exemplo Técnico:**
```javascript
// Schema progresso
localStorage.setItem('plataforma-b2b_progress_bash', JSON.stringify({
  completedLessons: ['bash-1-1', 'bash-1-2'],
  lastUpdated: Date.now()
}));

// Schema notas
localStorage.setItem('plataforma-b2b_notes_bash', JSON.stringify({
  content: "# Minhas anotações...",
  lastSaved: Date.now()
}));
```

**Nota:** Os prefixos `plataforma-b2b_` são nomenclatura técnica de chaves localStorage, não relacionados ao nome do produto.

---

#### 6. react-hooks-custom

**Propósito:** Hooks customizados do sistema

**Conteúdo:**
- useAutoSaveNotes pattern
- useModuleProgress pattern
- useCourseData pattern
- Hook composition
- Testing custom hooks

**Description (resumo):**
> Guide to custom React hooks developed for the educational platform to encapsulate reusable logic. Learn patterns for creating hooks like useAutoSaveNotes (auto-save user notes to localStorage), useModuleProgress (track lesson completion), and useCourseData (load course data with caching). Covers hook composition, dependency management, testing strategies, and avoiding common pitfalls (infinite loops, stale closures). Includes roadmap for refactoring 800+ lines of duplicated code from 5 LearningSystem components into reusable hooks. Essential for understanding the system's stateful logic patterns.

**Keywords:**
```
hooks, custom-hooks, react-hooks, useState,
useEffect, composition, reusable-logic,
auto-save, progress-tracking
```

---

#### 7. docker-deployment

**Propósito:** Deployment com Docker e CI/CD

**Conteúdo:**
- Multi-stage Dockerfile
- Nginx configuration
- Security headers
- GitHub Actions workflow
- Build optimization

**Description (resumo):**
> Complete deployment guide for the system using Docker and GitHub Actions CI/CD. Learn multi-stage Dockerfile pattern (build stage with Node 22 Alpine, runtime stage with Nginx Alpine) for ~50MB final image. Covers Nginx configuration for security headers (CSP, X-Frame-Options), gzip compression, and static file serving. Includes GitHub Actions workflow for automated build, test, and deployment. Understand tradeoffs between self-hosted and managed deployment, cost considerations, and scaling strategies. Essential for deploying and maintaining the platform in production.

**Keywords:**
```
docker, deployment, nginx, ci-cd,
github-actions, multi-stage-build, alpine,
security, devops, containerization
```

---

#### 8. system-state-management

**Propósito:** Gerenciamento de estado no sistema

**Conteúdo:**
- Unidirectional data flow
- State lifting patterns
- Props vs Context API
- localStorage integration
- Future: Backend sync

**Description (resumo):**
> Guide to state management architecture in the educational platform following React unidirectional data flow. Learn how state flows from parent to child via props, events bubble up via callbacks, and when to use Context API vs props drilling. Covers localStorage integration for persistence, state lifting patterns to share data between components, and roadmap for backend API sync in Release 3.0. Includes real examples from SistemaEducacionalCompleto (root), LearningSystem components, and Breadcrumb. Essential for maintaining predictable state flow across 17+ components.

**Keywords:**
```
state-management, react-state, data-flow,
props, context-api, localStorage,
unidirectional, lifting-state
```

---

### SKILLS-BACKLOG.md (Template Resumido)

```markdown
# Skills Backlog - Plataforma B2B de treinamento técnico corporativo

**Versão:** 1.0.0
**Última Atualização:** 2025-11-16
**Responsável:** João Pelegrino

---

## 📊 Métricas Gerais

| Métrica | Valor | Target | Status |
|---------|-------|--------|--------|
| **Total Skills** | 13 | 15 | 87% |
| **Domain-Skills** | 13 | 13 | 100% |
| **Cobertura de Features** | 100% | 100% | 🟢 |
| **Description >200 palavras** | 100% | 100% | 🟢 |
| **Auto-Discovery Success** | TBD | >90% | 🟡 |

---

## 📚 Inventário de Skills

### Domain-Skills (Projeto)

#### ✅ IMPLEMENTADAS

| ID | Nome | Feature Coberta | Prioridade |
|----|------|----------------|-----------|
| DS-001 | react-components-patterns | React UI | P0 |
| DS-002 | vite-build-optimization | Vite Build | P0 |
| DS-003 | tailwind-design-system | Tailwind CSS | P0 |
| DS-004 | testing-strategy-vitest | Testing | P1 |
| DS-005 | localStorage-patterns | State persistence | P1 |
| DS-006 | react-hooks-custom | Custom hooks | P1 |
| DS-007 | docker-deployment | Deployment | P1 |
| DS-008 | system-state-management | State mgmt | P1 |
| DS-009 | system-architecture | Arquitetura completa | P0 |
| DS-010 | breadcrumb-impl | Breadcrumb WCAG | P1 |
| DS-011 | component-refactor | Refatoração React | P2 |
| DS-012 | ux-nomenclature | Glossário ÉPICO 12 | P1 |
| DS-013 | meta-configuracao-evolucao | Meta-skill evolução | P2 |

---

## 📈 Roadmap de Skills

### Fase 1: Core Stack (v1.0) - 🟡 EM PROGRESSO (62%)

- ✅ DS-009: system-architecture
- ✅ DS-010: breadcrumb-impl
- ✅ DS-011: component-refactor
- ✅ DS-012: ux-nomenclature
- ✅ DS-013: meta-configuracao-evolucao
- ⚪ DS-001: react-components-patterns (NOVO)
- ⚪ DS-002: vite-build-optimization (NOVO)
- ⚪ DS-003: tailwind-design-system (NOVO)

### Fase 2: Quality & Advanced (v1.1) - ⚪ PLANEJADO (0%)

- ⚪ DS-004: testing-strategy-vitest
- ⚪ DS-005: localStorage-patterns
- ⚪ DS-006: react-hooks-custom
- ⚪ DS-007: docker-deployment
- ⚪ DS-008: system-state-management

---

**Última Revisão:** 2025-11-16
**Responsável:** João Pelegrino
```

---

## 📖 CAMADA 4: Treinamento Técnico Interno

### Estrutura Proposta

```
docs/treinamento-interno/
├── TRAINING-INTERNAL-BACKLOG.md         # ✅ SSOT - Inventário completo
│
├── _meta/
│   ├── onboarding-program.md            # ✅ Programa completo 4 semanas
│   ├── learning-paths.md                # ✅ Trilhas por nível
│   └── assessment-criteria.md           # ✅ Critérios avaliação
│
├── fundamentals/                        # Nível L0
│   ├── react-basics/
│   ├── vite-build-tools/
│   ├── tailwind-css/
│   ├── environment-setup/
│   └── git-workflow/
│
├── core-concepts/                       # Nível L1
│   ├── system-architecture/
│   ├── learning-system-pattern/
│   ├── state-management/
│   ├── testing/
│   └── deployment/
│
├── workshops/                           # Workshops Hands-On
│   ├── week-1-setup/
│   ├── week-2-first-component/
│   ├── week-3-integration/
│   └── week-4-deployment/
│
└── assessments/                         # Avaliações
    ├── fundamentals-quiz.md
    ├── core-concepts-quiz.md
    └── hands-on-challenges/
```

### Programa de Onboarding (4 Semanas)

#### Semana 1: Fundamentals + Environment Setup

**Objetivo:** Nivelamento técnico e setup completo

**Leituras:**
- [ ] `fundamentals/environment-setup/` (2 arquivos)
- [ ] `fundamentals/react-basics/` (3 arquivos)
- [ ] `fundamentals/vite-build-tools/` (3 arquivos)
- [ ] `fundamentals/tailwind-css/` (3 arquivos)
- [ ] `fundamentals/git-workflow/` (2 arquivos)

**Exercícios:**
- [ ] 5 exercícios React (mínimo 4/5 corretos)
- [ ] 2 exercícios Tailwind (mínimo 2/2)
- [ ] 1 exercício Git workflow

**Workshop:**
- [ ] `workshops/week-1-setup/` (completo)

**Checkpoint:**
- [ ] Quiz fundamentals (80%+ acertos)
- [ ] Ambiente funcionando (aplicação rodando localmente)
- [ ] Primeiro PR aberto (pequena modificação)

**Skills de Referência (consulta):**
- `.claude/skills/react-components-patterns/`
- `.claude/skills/vite-build-optimization/`
- `.claude/skills/tailwind-design-system/`

---

#### Semana 2: Core Concepts

**Objetivo:** Compreender arquitetura do sistema e features principais

**Leituras:**
- [ ] `core-concepts/system-architecture/` (3 arquivos)
- [ ] `core-concepts/learning-system-pattern/` (3 arquivos)
- [ ] `core-concepts/state-management/` (3 arquivos)
- [ ] `docs/tecnico/architecture/01-visao-geral-arquitetura.md` (referência)

**Exercícios:**
- [ ] 3 exercícios arquitetura (mínimo 3/3)
- [ ] 2 exercícios state management (mínimo 2/2)
- [ ] 1 exercício custom hooks

**Workshop:**
- [ ] `workshops/week-2-first-component/` (completo)
- [ ] Desafio: Criar componente FlashCard customizado

**Checkpoint:**
- [ ] Quiz core concepts (85%+)
- [ ] Primeiro componente criado (code review aprovado)
- [ ] Entendimento de fluxo de dados (diagrama aprovado)

**Skills de Referência:**
- `.claude/skills/system-architecture/`
- `.claude/skills/system-state-management/`
- `.claude/skills/react-hooks-custom/`

---

#### Semana 3: Integration + Advanced

**Objetivo:** Integrar feature completa end-to-end

**Leituras:**
- [ ] `core-concepts/testing/` (3 arquivos)
- [ ] Review de código existente (CLearningSystem.jsx, BashLearningSystem.jsx)

**Workshop:**
- [ ] `workshops/week-3-integration/` (completo)
- [ ] Desafio: Criar novo sistema de aprendizado (Python Programming)

**Checkpoint:**
- [ ] Feature integrada + testes (PR aprovado)
- [ ] Cobertura de testes >= 60% no componente novo
- [ ] Documentação da feature (docs/tecnico/)

**Skills de Referência:**
- `.claude/skills/testing-strategy-vitest/`
- `.claude/skills/localStorage-patterns/`

---

#### Semana 4: Deployment + Production

**Objetivo:** Deploy, monitoring, troubleshooting

**Leituras:**
- [ ] `core-concepts/deployment/` (2 arquivos)
- [ ] Review de `Dockerfile`, `nginx.conf`, `.github/workflows/`

**Workshop:**
- [ ] `workshops/week-4-deployment/` (completo)
- [ ] Desafio: Deploy em staging (AWS EC2 ou similar)

**Checkpoint Final:**
- [ ] Deploy em staging funcionando
- [ ] Certificação interna (assessment final)
- [ ] Primeira on-call (shadowing tech lead)
- [ ] Apresentação: "O que aprendi em 4 semanas"

**Skills de Referência:**
- `.claude/skills/docker-deployment/`

---

### Módulos Detalhados

#### L0-01: Environment Setup

**Arquivo:** `fundamentals/environment-setup/01-wsl2-node-git.md`

```markdown
# L0-01: Environment Setup - WSL2, Node, Git

**Duração:** 4 horas
**Pré-requisitos:** Windows 10/11 com WSL2 instalado
**Nível:** Fundamentals

---

## 🎯 Objetivos de Aprendizado

Ao final deste módulo, você será capaz de:
- ✅ Configurar ambiente de desenvolvimento WSL2 + Ubuntu
- ✅ Instalar Node.js 22 via NVM
- ✅ Configurar Git com chaves SSH
- ✅ Clonar e rodar o projeto localmente

---

## 🔧 Passo 4: Clonar Projeto

```bash
# Criar diretório de projetos
mkdir -p ~/workspace
cd ~/workspace

# Clonar projeto
git clone git@github.com:usuario/app-controle.git sistema-educacional
cd sistema-educacional

# Instalar dependências
npm install

# Rodar desenvolvimento
npm run dev

# Deve abrir em http://localhost:3000
```

---

## ✅ Exercício 1: Setup Completo

**Objetivo:** Validar ambiente configurado

**Checklist:**
- [ ] WSL2 rodando Ubuntu 24.04
- [ ] Node 22+ e npm 10+
- [ ] Git configurado com SSH
- [ ] Projeto clonado
- [ ] `npm install` sem erros
- [ ] `npm run dev` abrindo aplicação

**Entrega:** Screenshot do navegador mostrando aplicação rodando

---

**Última atualização:** 2025-11-16
**Próximo módulo:** L0-02 React Basics
```

---

#### L1-01: Arquitetura do Sistema

**Arquivo:** `core-concepts/system-architecture/01-visao-geral-4-camadas.md`

```markdown
# L1-01: Arquitetura do Sistema - Visão Geral 4 Camadas

**Duração:** 6 horas
**Pré-requisitos:** L0-01 a L0-05 (Fundamentals)
**Nível:** Core Concepts

---

## 🎯 Objetivos de Aprendizado

- ✅ Entender as 4 camadas da arquitetura
- ✅ Mapear componentes às camadas
- ✅ Entender fluxo de dados unidirecional
- ✅ Identificar responsabilidades de cada camada

---

## 🏗️ As 4 Camadas

```
┌─────────────────────────────────────────────────────┐
│        Camada 1: Presentation (Componentes)         │
│   HubView, *LearningSystem, Breadcrumb, AreaCard   │
└────────┬────────────────────────────────────────────┘
         │ Props, State, Callbacks
         ▼
┌─────────────────────────────────────────────────────┐
│      Camada 2: Business Logic (Hooks & Utils)       │
│   useAutoSaveNotes, useModuleProgress, helpers.js   │
└────────┬────────────────────────────────────────────┘
         │ API calls (localStorage, futuro: backend)
         ▼
┌─────────────────────────────────────────────────────┐
│       Camada 3: Data Layer (Dados & Persistência)   │
│     studyAreas.js, *LearningData.js, localStorage   │
└────────┬────────────────────────────────────────────┘
         │ Deployment
         ▼
┌─────────────────────────────────────────────────────┐
│    Camada 4: Infrastructure (Hosting & CI/CD)       │
│        Docker + Nginx, GitHub Actions, AWS          │
└─────────────────────────────────────────────────────┘
```

---

## 📚 Referências

**Skills Claude Code:**
- `.claude/skills/system-architecture/` - Arquitetura completa
- `.claude/skills/system-state-management/` - State patterns

**Docs Técnicas:**
- `docs/tecnico/architecture/01-visao-geral-arquitetura.md`

**Código:**
- `src/components/SistemaEducacionalCompleto.jsx` - Raiz
- `src/components/BashLearningSystem.jsx` - Exemplo LearningSystem

---

**Última atualização:** 2025-11-16
**Próximo:** L1-02 Learning System Pattern
```

---

### TRAINING-INTERNAL-BACKLOG.md (Resumido)

```markdown
# Internal Training Backlog - Plataforma B2B de treinamento técnico corporativo

**Versão:** 1.0.0
**Última Atualização:** 2025-11-16
**Target Audience:** Desenvolvedores iniciantes/intermediários
**Responsável:** João Pelegrino

---

## 📊 Métricas Gerais

| Métrica | Valor | Target | Status |
|---------|-------|--------|--------|
| **Total Módulos** | 15 | 20 | 75% |
| **Exercícios Práticos** | 12 | 15 | 80% |
| **Workshops** | 4 | 4 | 100% |
| **Assessments** | 2 | 3 | 67% |
| **Avg Onboarding Time** | TBD | 28 dias | - |

---

## 📚 Inventário de Módulos

### L0: Fundamentals (5 módulos)

| ID | Módulo | Duração | Exercícios | Status |
|----|--------|---------|------------|--------|
| L0-01 | Environment Setup | 4h | 1 | ⚪ |
| L0-02 | React Basics | 8h | 3 | ⚪ |
| L0-03 | Vite & Build Tools | 4h | 1 | ⚪ |
| L0-04 | Tailwind CSS | 4h | 2 | ⚪ |
| L0-05 | Git Workflow | 4h | 1 | ⚪ |

---

### L1: Core Concepts (5 módulos)

| ID | Módulo | Duração | Exercícios | Status |
|----|--------|---------|------------|--------|
| L1-01 | Arquitetura do Sistema | 6h | 1 | ⚪ |
| L1-02 | Learning System Pattern | 8h | 1 | ⚪ |
| L1-03 | State Management | 8h | 2 | ⚪ |
| L1-04 | Testing | 8h | 1 | ⚪ |
| L1-05 | Deployment | 6h | 1 | ⚪ |

---

**Última Revisão:** 2025-11-16
**Responsável:** João Pelegrino
```

---

## 🔗 Integração com Docs Existentes

### Mapa de Integração

```
Six-Layer (Camadas 1 + 4)
├── CAMADA 1: .claude/skills/
│   │
│   ├─> docs/tecnico/architecture/
│   │   └── 01-visao-geral-arquitetura.md (REFERÊNCIA)
│   │
│   └─> docs/tecnico/testing/
│       └── README.md, MCP-CHROME-DEVTOOLS-*.md (REFERÊNCIA)
│
└── CAMADA 4: docs/treinamento-interno/
    │
    ├─> docs/conceitual/01-visao-geral/
    │   ├── 00-definicoes-principais.md (GLOSSÁRIO)
    │   ├── 01-contexto-projeto.md (CONTEXTO)
    │   ├── 04-modelo-dominio.md (DOMÍNIO)
    │   └── 05-personas-corporativas.md (AUDIÊNCIA)
    │
    ├─> docs/tecnico/architecture/
    │   └── 01-visao-geral-arquitetura.md (DEEP DIVE)
    │
    ├─> .claude/skills/ (TODAS)
    │   └── (material de referência em cada módulo)
    │
    └─> PRODUCT-CENTRAL-DOCUMENT.md
        └── (PRD para entender produto)
```

---

## 📅 Roadmap de Implementação (12 semanas)

### Fase 1: Fundação (Semanas 1-2) - 🟡 ALTA PRIORIDADE
- Criar estruturas de diretórios
- Criar arquivos SSOT (backlogs)
- Documentar integração entre camadas

### Fase 2: Skills Essenciais (Semanas 3-4) - 🟢 MÉDIA PRIORIDADE
- Criar 8 skills técnicas com auxiliares
- Validar auto-discovery >90%
- Cross-reference com docs/tecnico/

### Fase 3: Módulos L0 (Semanas 5-6) - 🟢 MÉDIA PRIORIDADE
- Criar 5 módulos Fundamentals
- Criar 8 exercícios práticos
- Linkar skills de referência

### Fase 4: Módulos L1 (Semanas 7-8) - 🔵 BAIXA PRIORIDADE
- Criar 5 módulos Core Concepts
- Criar 4 exercícios práticos
- Integrar com docs/tecnico/

### Fase 5: Workshops (Semanas 9-10) - 🔵 BAIXA PRIORIDADE
- Criar 4 workshops (1 por semana de onboarding)
- Criar 3 assessments
- Documentar programa completo

### Fase 6: Validação (Semanas 11-12) - 🔵 FUTURO
- Teste piloto com desenvolvedor real
- Coletar feedback e iterar
- Medir métricas de sucesso

---

## 📊 Métricas de Sucesso

### Camada 1 (Skills)
- ✅ 13 skills totais (5 existentes + 8 novas)
- ✅ Description >200 palavras (100% das skills)
- ✅ Auto-Discovery Success >90%
- ✅ 8 skills com arquivos auxiliares

### Camada 4 (Treinamento)
- ✅ 15 módulos (L0 + L1)
- ✅ 12+ exercícios práticos
- ✅ 4 workshops hands-on
- ✅ 3 assessments
- ✅ Onboarding time <28 dias
- ✅ Pass rate >85%

---

## ⚠️ Riscos e Mitigações

### Risco 1: Auto-Discovery Baixo (<90%)

**Mitigação:**
- Testar keywords com queries reais de desenvolvedor
- Expandir descriptions para 250-300 palavras
- Adicionar sinônimos e termos alternativos
- Revisar semanalmente métricas de auto-discovery

---

### Risco 2: Conteúdo Muito Denso (Feedback Negativo)

**Mitigação:**
- Teste piloto com desenvolvedor real
- Coletar feedback a cada módulo
- Adicionar mais exemplos práticos
- Dividir módulos longos (>10 páginas) em 2+

---

### Risco 3: Falta de Tempo para Completar Roadmap

**Mitigação:**
- Priorizar Fases 1-3 (skills + L0)
- Fases 4-6 podem ser entregues depois
- Lançar v1.0 com L0 completo, L1 parcial
- Iterar baseado em feedback

---

## 📝 Próximos Passos

### Ação Imediata (Esta Semana)

1. ✅ **Criar estruturas de diretórios**
   ```bash
   mkdir -p .claude/skills/{react-components-patterns,vite-build-optimization,tailwind-design-system}/{auxiliary}
   mkdir -p docs/treinamento-interno/{_meta,fundamentals,core-concepts,workshops,assessments}
   ```

2. ✅ **Criar arquivos SSOT**
   - `.claude/skills/SKILLS-BACKLOG.md`
   - `docs/treinamento-interno/TRAINING-INTERNAL-BACKLOG.md`

3. ✅ **Priorizar primeira skill**
   - Começar por `react-components-patterns/`
   - Criar SKILL.md com frontmatter completo
   - Testar auto-discovery

---

**📍 Você está em:** `docs/PLANEJAMENTO-SIX-LAYER-SISTEMA.md`
**📅 Criado em:** 2025-11-16
**👤 Responsável:** João Pelegrino
**🎯 Uso:** Guia de implementação das Camadas 1 e 4 da metodologia Six-Layer
**📦 Status:** 🚧 Planejamento completo - Pronto para execução (v1.0.1 - nomenclatura corrigida)
