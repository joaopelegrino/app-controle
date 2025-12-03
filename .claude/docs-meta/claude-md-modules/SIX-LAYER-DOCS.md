# Metodologia Six-Layer Docs

**Módulo:** SIX-LAYER-DOCS.md
**Parte de:** CLAUDE.md modularizado
**Última atualização:** 2025-11-17

---

## 📚 Metodologia Six-Layer Docs (Camadas de Documentação)

### Visão Geral

O projeto implementa a **metodologia Six-Layer** para organizar todo conhecimento técnico e treinamento em 6 camadas especializadas. **Camadas 1 e 4 estão em implementação ativa.**

```
┌────────────────────────────────────────────────────────────┐
│ CAMADA 1: Contexto Técnico Unificado (.claude/skills/)    │ ✅ EM IMPLEMENTAÇÃO
├────────────────────────────────────────────────────────────┤
│ CAMADA 2: API Documentation (não aplicável sem backend)   │ ❌ N/A
├────────────────────────────────────────────────────────────┤
│ CAMADA 3: User Documentation (PRODUCT-CENTRAL-DOCUMENT)   │ ✅ COMPLETA
├────────────────────────────────────────────────────────────┤
│ CAMADA 4: Treinamento Interno (docs/treinamento-interno/) │ ✅ EM IMPLEMENTAÇÃO
├────────────────────────────────────────────────────────────┤
│ CAMADA 5: Training External (não aplicável)               │ ❌ N/A
├────────────────────────────────────────────────────────────┤
│ CAMADA 6: Training User (foco dev, não usuários finais)   │ ❌ N/A
└────────────────────────────────────────────────────────────┘
```

---

### Camada 1: Contexto Técnico Unificado

**Localização:** `.claude/skills/`

**Propósito:** Skills técnicas que ativam automaticamente quando Claude Code trabalha em contextos específicos.

**SSOT (Single Source of Truth):** `.claude/skills/SKILLS-BACKLOG.md`

**Skills Implementadas (5/13):**
- ✅ `system-architecture` - Arquitetura completa do sistema (4 camadas)
- ✅ `breadcrumb-impl` - Implementação de breadcrumb WCAG AA
- ✅ `component-refactor` - Padrões de refatoração React
- ✅ `ux-nomenclature` - Glossário ÉPICO 12 (nomenclatura consistente)
- ✅ `meta-configuracao-evolucao` - Meta-skill para evoluir configuração

**Skills Planejadas - P0 (Stack Principal):**
- ⚪ `react-components-patterns` - Padrões de componentes React (functional, hooks, composition)
- ⚪ `vite-build-optimization` - Otimização de build e performance
- ⚪ `tailwind-design-system` - Sistema de design Tailwind CSS

**Skills Planejadas - P1 (Quality & Advanced):**
- ⚪ `testing-strategy-vitest` - Testes com Vitest e Playwright
- ⚪ `localStorage-patterns` - Padrões de persistência local
- ⚪ `react-hooks-custom` - Hooks customizados (useAutoSaveNotes, useModuleProgress)
- ⚪ `docker-deployment` - Deploy com Docker e CI/CD
- ⚪ `system-state-management` - Gerenciamento de estado React

**Quando Skills Ativam:**
- ✅ **Automaticamente** quando contexto é detectado (ex: editando componente React → `react-components-patterns` ativa)
- ✅ **Ao criar novos componentes** (guia padrões de código)
- ✅ **Ao refatorar código** (sugere extrair hooks, criar componentes genéricos)
- ✅ **Ao debugar problemas** (troubleshooting com soluções do projeto)

**Estrutura de Skill:**
```
.claude/skills/react-components-patterns/
├── SKILL.md                # Skill principal (frontmatter YAML + conteúdo)
└── auxiliary/              # Arquivos auxiliares para tópicos complexos
    ├── functional-components.md
    ├── hooks-guide.md
    └── composition-patterns.md
```

**Checklist de Qualidade:**
- [ ] Description >200 palavras (target: 250-300)
- [ ] Keywords 8-15 items
- [ ] Auto-discovery >90%
- [ ] Exemplos reais do código do projeto
- [ ] Troubleshooting com 3+ problemas comuns
- [ ] Cross-references para docs/tecnico/ e docs/conceitual/

**Roadmap:**
- **Fase 1** (Semanas 3-4): 3 skills P0 (React, Vite, Tailwind)
- **Fase 2** (Semanas 5-8): 5 skills P1 (Testing, State, Hooks, Docker, localStorage)
- **Fase 3** (Semanas 9-10): 2 meta-skills (cc-workflows, cc-best-practices)

---

### Camada 4: Treinamento Técnico Interno

**Localização:** `docs/treinamento-interno/`

**Propósito:** Onboarding e nivelamento de desenvolvedores iniciantes no projeto (4 semanas estruturadas).

**SSOT (Single Source of Truth):** `docs/treinamento-interno/TRAINING-INTERNAL-BACKLOG.md`

**Estrutura:**
```
docs/treinamento-interno/
├── TRAINING-INTERNAL-BACKLOG.md  # Inventário de módulos e assessments
│
├── _meta/
│   ├── onboarding-program.md      # Programa completo 4 semanas
│   ├── learning-paths.md          # Trilhas por nível (L0, L1, L2)
│   └── assessment-criteria.md     # Critérios de avaliação
│
├── fundamentals/ (L0)              # Nível L0: Fundamentals (24h)
│   ├── environment-setup/          # WSL2, Node, Git, Docker
│   ├── react-basics/               # JSX, Components, Hooks (useState, useEffect)
│   ├── vite-build-tools/           # Dev server, HMR, Build otimizado
│   ├── tailwind-css/               # Utility-first, Responsividade
│   └── git-workflow/               # Branches, PRs, Code Review
│
├── core-concepts/ (L1)             # Nível L1: Core Concepts (36h)
│   ├── system-architecture/        # 4 camadas, fluxo de dados
│   ├── learning-system-pattern/    # Anatomia de LearningSystem
│   ├── state-management/           # localStorage, custom hooks
│   ├── testing/                    # Vitest, Playwright, Testing Library
│   └── deployment/                 # Docker, CI/CD, Nginx
│
├── workshops/                      # Hands-On Workshops
│   ├── week-1-setup/
│   ├── week-2-first-component/
│   ├── week-3-integration/
│   └── week-4-deployment/
│
└── assessments/                    # Avaliações
    ├── fundamentals-quiz.md        # Quiz L0 (30 min, 80%+ pass)
    ├── core-concepts-quiz.md       # Quiz L1 (30 min, 85%+ pass)
    └── hands-on-challenges/        # Projeto final (8h, 80%+ pass)
```

**Programa de Onboarding (4 Semanas):**

**Semana 1: Fundamentals + Setup**
- Environment setup (WSL2, Node, Git)
- React Basics (JSX, Components, Hooks)
- Vite e Tailwind fundamentals
- **Checkpoint:** Aplicação rodando localmente, primeiro PR aberto

**Semana 2: Core Concepts**
- Arquitetura do sistema (4 camadas)
- Padrões de LearningSystem
- State management (localStorage, hooks)
- **Checkpoint:** Primeiro componente criado (code review aprovado)

**Semana 3: Integration + Advanced**
- Testing (Vitest, Playwright)
- Feature completa end-to-end
- **Checkpoint:** Feature integrada + testes (PR aprovado)

**Semana 4: Deployment + Production**
- Docker e CI/CD
- Deploy em staging
- **Checkpoint Final:** Certificação interna (assessment final 80%+)

**Módulos Implementados (0/15):**
- ⚪ L0-01: Environment Setup (4h)
- ⚪ L0-02: React Basics (8h)
- ⚪ L0-03: Vite & Build Tools (4h)
- ⚪ L0-04: Tailwind CSS (4h)
- ⚪ L0-05: Git Workflow (4h)
- ⚪ L1-01: Arquitetura do Sistema (6h)
- ⚪ L1-02: Learning System Pattern (8h)
- ⚪ L1-03: State Management (8h)
- ⚪ L1-04: Testing (8h)
- ⚪ L1-05: Deployment (6h)

**Integração com Skills (Camada 1):**
- Cada módulo lista skills de referência ao final
- Skills fornecem deep dive técnico (módulos são introdutórios)
- Troubleshooting de skills complementa exercícios de módulos

**Exemplo:**
```markdown
## 📚 Referências (em L0-02-react-basics.md)

**Skills Claude Code (para consulta):**
- `.claude/skills/react-components-patterns/` - Padrões completos
- `.claude/skills/react-hooks-custom/` - Hooks customizados

**Quando consultar:**
- Dúvidas sobre composition vs inheritance
- Exemplos de custom hooks do projeto
- Antipadrões a evitar
```

**Métricas de Sucesso:**
- Onboarding time <28 dias
- Pass rate assessments >85%
- 12+ exercícios práticos
- 4 workshops hands-on

**Roadmap:**
- **Fase 3** (Semanas 5-6): 5 módulos L0 (Fundamentals)
- **Fase 4** (Semanas 7-8): 5 módulos L1 (Core Concepts)
- **Fase 5** (Semanas 9-10): 4 workshops + 3 assessments

---

### Integração Entre Camadas

**Camada 1 ↔ Camada 4:**
- Skills = referência consultiva em módulos de treinamento
- Módulos = introdução, Skills = deep dive técnico
- Troubleshooting unificado

**Camada 1 ↔ docs/tecnico/:**
- Skills linkam para docs técnicas para aprofundamento
- Docs técnicas linkam de volta para skills (quick reference)

**Camada 4 ↔ docs/conceitual/:**
- Módulos usam glossário ÉPICO 12 (00-definicoes-principais.md)
- Nomenclatura consistente (Curso, Aula, Seção)

**Camada 4 ↔ docs/backlog/ROADMAP.md:**
- Módulos referenciam ROADMAP.md (SSOT) para entender produto B2B
- User Stories fornecem contexto de negócio corporativo

**Cross-References Bidirecionais:**
```markdown
# Em skill (Camada 1)
## 📚 Para Iniciantes
Se você é novo no projeto, comece pelo módulo:
- [L0-02: React Basics](../../docs/treinamento-interno/fundamentals/react-basics/)

# Em módulo (Camada 4)
## 📚 Referência Avançada
Para padrões avançados:
- [react-components-patterns skill](../../../../.claude/skills/react-components-patterns/)
```

---

### Como Claude Code Deve Usar as Camadas

**Ao Trabalhar em Código (Skills - Camada 1):**
1. ✅ Skills ativam automaticamente quando contexto é detectado
2. ✅ Consultar `SKILLS-BACKLOG.md` para inventário completo
3. ✅ Seguir padrões documentados em skills
4. ✅ Usar exemplos reais do projeto (não código genérico)
5. ✅ Atualizar skills quando tecnologia ou padrões mudam

**Ao Onboarding de Desenvolvedores (Treinamento - Camada 4):**
1. ✅ Seguir programa de 4 semanas estruturado
2. ✅ Consultar `TRAINING-INTERNAL-BACKLOG.md` para inventário de módulos
3. ✅ Usar skills como material de referência complementar
4. ✅ Validar conhecimento com assessments (80%+ pass rate)
5. ✅ Criar exercícios práticos baseados em código real do projeto

**Ao Criar Nova Feature:**
1. ✅ Consultar skill relevante (ex: `react-components-patterns`)
2. ✅ Seguir padrões de código documentados
3. ✅ Atualizar skill se novo padrão for introduzido
4. ✅ Considerar se feature merece módulo L1 novo

**Ao Refatorar Código:**
1. ✅ Consultar `component-refactor` skill
2. ✅ Reduzir duplicação (meta: 25% → <10%)
3. ✅ Extrair hooks customizados (useAutoSaveNotes, useModuleProgress)
4. ✅ Documentar padrão de refatoração em skill

**Ao Debugar Problema:**
1. ✅ Consultar seção Troubleshooting da skill relevante
2. ✅ Verificar se problema é comum (já documentado)
3. ✅ Se novo problema, adicionar a Troubleshooting da skill
4. ✅ Compartilhar solução via módulo de treinamento (se aplicável)

---

### Documentação de Planejamento

**Arquivo Principal:** [`docs/PLANEJAMENTO-SIX-LAYER-SISTEMA.md`](/home/notebook/workspace/app-controle/docs/PLANEJAMENTO-SIX-LAYER-SISTEMA.md)

**Conteúdo:**
- Visão geral completa das Camadas 1 e 4
- Templates de skills e módulos
- Roadmap de implementação (12 semanas)
- Métricas de sucesso
- Riscos e mitigações

**Consultar quando:**
- Planejar criação de novas skills
- Estruturar módulos de treinamento
- Validar cobertura de tecnologias
- Medir progresso de implementação

---

**Última atualização:** 2025-11-17
**Responsável:** Modularização CLAUDE.md v1.0
**Status:** ✅ Completo
