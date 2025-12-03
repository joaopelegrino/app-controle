# Skills Backlog - Plataforma B2B de treinamento técnico corporativo

> **Single Source of Truth (SSOT) - Inventário Centralizado de Skills**
>
> **Versão:** 1.0.0
> **Última Atualização:** 2025-11-16
> **Responsável:** João Pelegrino
> **Projeto:** Plataforma B2B de treinamento técnico corporativo (Plataforma B2B de treinamento técnico corporativo)

---

## 📋 Índice

1. [Métricas Gerais](#métricas-gerais)
2. [Priorização Global](#priorização-global)
3. [Inventário de Skills](#inventário-de-skills)
4. [Roadmap de Skills](#roadmap-de-skills)
5. [Análise de Cobertura](#análise-de-cobertura)
6. [Skills com Problemas](#skills-com-problemas)
7. [Checklist de Qualidade](#checklist-de-qualidade)
8. [Workflow de Atualização](#workflow-de-atualização)
9. [Relacionamentos com Outras Camadas](#relacionamentos-com-outras-camadas)

---

## 📊 Métricas Gerais

| Métrica | Valor | Target | Status |
|---------|-------|--------|--------|
| **Total Skills** | 8 | 15 | 53% 🟡 |
| **Meta-Skills (cc-)** | 0 | 2 | 0% 🔴 |
| **Domain-Skills** | 7 | 13 | 54% 🟡 |
| **Cobertura de Features** | 100% | 100% | 🟢 |
| **Description >200 palavras** | 100% | 100% | 🟢 |
| **Auto-Discovery Success** | 92% | >90% | 🟢 |
| **Skills com Auxiliares** | 7 | 8 | 88% 🟢 |
| **Skills Deprecated** | 0 | 0 | ✅ |
| **Última Auditoria** | 2025-11-19 | Semanal | ✅ |

**Legenda de Status:**
- 🟢 **Excelente** (≥90%)
- 🟡 **Adequado** (70-89%)
- 🔴 **Necessita Atenção** (<70%)

---

## 🎯 Priorização Global

### Critérios de Prioridade

**P0 (Crítica)** - Bloqueia desenvolvimento
- Stack principal obrigatório (React, Vite, Tailwind)
- Arquitetura do sistema
- Ferramentas essenciais de desenvolvimento

**P1 (Alta)** - Impacta qualidade significativamente
- Testing, deployment, state management
- Padrões de código e refatoração
- UX e nomenclatura consistente

**P2 (Média)** - Melhoria incremental
- Patterns avançados
- Otimizações
- Meta-skills de evolução

**P3 (Baixa)** - Nice to have
- Ferramentas auxiliares
- Integrações experimentais

---

## 📚 Inventário de Skills

### Domain-Skills (Projeto)

#### ✅ IMPLEMENTADAS (8 skills)

| ID | Nome | Feature Coberta | Description Words | Keywords | Auto-Discovery | Auxiliares | Última Atualização | Prioridade |
|----|------|----------------|-------------------|----------|----------------|------------|--------------------|-----------|
| DS-005 | localStorage-patterns | localStorage errors + quota | 320+ | 14 | 92% | 3 files | 2025-11-19 | **P1** |
| DS-009 | system-architecture | Arquitetura completa | 320 | 12 | 95% | 4 files | 2025-11-13 | **P0** |
| DS-010 | breadcrumb-impl | Breadcrumb WCAG | 285 | 10 | 92% | 3 files | 2025-11-13 | **P1** |
| DS-011 | component-refactor | Refatoração React | 290 | 11 | 90% | 3 files | 2025-11-13 | **P2** |
| DS-012 | ux-nomenclature | Glossário ÉPICO 12 | 275 | 9 | 88% | 2 files | 2025-11-13 | **P1** |
| DS-013 | meta-configuracao-evolucao | Meta-skill evolução | 310 | 13 | 94% | 4 files | 2025-11-16 | **P2** |
| CS-001 | cliente:criar-a-partir-video | Criar cursos de vídeos | 450+ | 18 | 95% | 3 files | 2025-11-24 | **P1** |

**Status:** ✅ 8 skills funcionais e validadas

**Notas:**
- Todas skills com frontmatter YAML completo
- Auto-discovery testado manualmente (média: 92.0%)
- Cross-references para docs/tecnico/ e docs/conceitual/
- DS-005 criada em 2025-11-19 para US-041 (localStorage error handling)

---

#### ⚪ PLANEJADAS (7 skills - Fase 1 e 2)

| ID | Nome | Feature Coberta | Description Words | Keywords | Auxiliares | Prioridade | ETA |
|----|------|----------------|-------------------|----------|------------|-----------|-----|
| DS-001 | react-components-patterns | React UI | 280 | 11 | 3 files | **P0** | Semana 3 |
| DS-002 | vite-build-optimization | Vite Build | 265 | 11 | 3 files | **P0** | Semana 3 |
| DS-003 | tailwind-design-system | Tailwind CSS | 270 | 11 | 3 files | **P0** | Semana 3 |
| DS-004 | testing-strategy-vitest | Testing | 275 | 10 | 3 files | **P1** | Semana 4 |
| DS-006 | react-hooks-custom | Custom hooks | 268 | 9 | 3 files | **P1** | Semana 4 |
| DS-007 | docker-deployment | Deployment | 272 | 10 | 3 files | **P1** | Semana 4 |
| DS-008 | system-state-management | State mgmt | 265 | 8 | 3 files | **P1** | Semana 4 |

**Status:** ⚪ Aguardando criação (Roadmap Fase 1-2)

**Templates Prontos:**
- Descrições completas documentadas em PLANEJAMENTO-SIX-LAYER-SISTEMA.md
- Estrutura de auxiliares definida
- Keywords estratégicos selecionados

---

### Meta-Skills (Evolução do Sistema)

#### ⚪ PLANEJADAS (2 skills - Fase 3)

| ID | Nome | Propósito | Prioridade | ETA |
|----|------|-----------|-----------|-----|
| MS-001 | cc-workflows-automation | Automações Claude Code específicas do projeto | **P2** | Semana 9 |
| MS-002 | cc-best-practices | Padrões e convenções do projeto | **P2** | Semana 9 |

**Status:** ⚪ Planejadas para Fase 3 (após skills técnicas estarem maduras)

---

## 📈 Roadmap de Skills

### Fase 1: Core Stack (v1.0) - 🟡 EM PROGRESSO (38%)

**Objetivo:** Cobrir 100% das tecnologias principais do stack

**Skills Implementadas (5/13):**
- ✅ DS-009: system-architecture
- ✅ DS-010: breadcrumb-impl
- ✅ DS-011: component-refactor
- ✅ DS-012: ux-nomenclature
- ✅ DS-013: meta-configuracao-evolucao

**Skills Planejadas - P0 (3/13):**
- ⚪ DS-001: react-components-patterns
- ⚪ DS-002: vite-build-optimization
- ⚪ DS-003: tailwind-design-system

**ETA:** Semana 3-4 (Novembro 2025)

**Critérios de Conclusão:**
- [x] 5 skills existentes documentadas
- [ ] 3 skills P0 criadas
- [ ] Auto-discovery >90% em todas
- [ ] Cross-references completos
- [ ] Auxiliares criados (3 files cada)

---

### Fase 2: Quality & Advanced (v1.1) - ⚪ PLANEJADO (0%)

**Objetivo:** Testing, state management, deployment

**Skills Planejadas - P1 (5/13):**
- ⚪ DS-004: testing-strategy-vitest
- ⚪ DS-005: localStorage-patterns
- ⚪ DS-006: react-hooks-custom
- ⚪ DS-007: docker-deployment
- ⚪ DS-008: system-state-management

**ETA:** Semana 5-8 (Dezembro 2025)

**Critérios de Conclusão:**
- [ ] 5 skills P1 criadas
- [ ] Integração com docs/tecnico/testing/
- [ ] Exemplos práticos do código do projeto
- [ ] Troubleshooting com 3+ problemas comuns

---

### Fase 3: Meta-Skills (v1.2) - ⚪ PLANEJADO

**Objetivo:** Automações e padrões específicos do Claude Code

**Skills Planejadas - P2 (2/15):**
- ⚪ MS-001: cc-workflows-automation
- ⚪ MS-002: cc-best-practices

**ETA:** Semana 9-10 (Janeiro 2026)

**Critérios de Conclusão:**
- [ ] 2 meta-skills criadas
- [ ] Hooks e automações documentados
- [ ] Workflows de desenvolvimento otimizados

---

## 🔍 Análise de Cobertura

### Por Categoria Técnica

| Categoria | Skills | Status | Gap | Ação |
|-----------|--------|--------|-----|------|
| **Frontend (React)** | 3 | ⚪ Planejado | Criar DS-001, DS-006, DS-008 | Fase 1-2 |
| **Build Tools (Vite)** | 1 | ⚪ Planejado | Criar DS-002 | Fase 1 |
| **Styling (Tailwind)** | 1 | ⚪ Planejado | Criar DS-003 | Fase 1 |
| **Testing** | 1 | ⚪ Planejado | Criar DS-004 | Fase 2 |
| **State Mgmt** | 2 | ⚪ Planejado | Criar DS-005, DS-008 | Fase 2 |
| **DevOps** | 1 | ⚪ Planejado | Criar DS-007 | Fase 2 |
| **Arquitetura** | 1 | ✅ Adequado | Nenhum | - |
| **UX/UI** | 2 | ✅ Adequado | Nenhum | - |
| **Meta-config** | 1 | ✅ Adequado | Expandir para 3 | Fase 3 |

**Análise:**
- 🟢 Arquitetura, UX/UI e Meta-config cobertos (38%)
- 🟡 Frontend, Build e DevOps aguardando implementação (62%)
- ✅ Cobertura planejada: 100% do stack principal

---

### Por Linguagem/Framework

| Tech Stack | Skills Cobrindo | Status | Gap |
|------------|----------------|--------|-----|
| **React** | 3 (DS-001, DS-006, DS-008) | ⚪ | Criar todas 3 skills |
| **Vite** | 1 (DS-002) | ⚪ | Criar skill |
| **Tailwind** | 1 (DS-003) | ⚪ | Criar skill |
| **Vitest** | 1 (DS-004) | ⚪ | Criar skill |
| **Playwright** | 1 (DS-004) | ⚪ | Incluir em testing skill |
| **Docker** | 1 (DS-007) | ⚪ | Criar skill |
| **localStorage** | 1 (DS-005) | ⚪ | Criar skill |
| **Nginx** | 1 (DS-007) | ⚪ | Incluir em deployment skill |
| **GitHub Actions** | 1 (DS-007) | ⚪ | Incluir em deployment skill |

**Gap Total:** 8 skills técnicas (todas planejadas em Fase 1-2)

---

### Por Tipo de Conhecimento

| Tipo | Skills | Percentual | Status |
|------|--------|-----------|--------|
| **Conceitual** (arquitetura, padrões) | 3 | 23% | ✅ |
| **Procedural** (como fazer X) | 7 | 54% | 🟡 |
| **Troubleshooting** (debug, erros) | 2 | 15% | 🟡 |
| **Meta-conhecimento** (evolução, automação) | 1 | 8% | 🟡 |

**Recomendação:** Priorizar skills procedurais (Fase 1-2) antes de meta-skills (Fase 3)

---

## 🚨 Skills com Problemas

### Nenhum Problema Crítico Identificado ✅

**Última Auditoria:** 2025-11-16

**Skills Auditadas:** 5/5 (100%)

**Problemas Encontrados:** 0

**Notas:**
- Todas skills existentes com YAML válido
- Frontmatter completo
- Auto-discovery funcional (média 91.8%)
- Cross-references corretos

---

### Alertas Preventivos 🟡

| Alerta | Skill | Severidade | Ação Recomendada |
|--------|-------|-----------|------------------|
| Auto-discovery pode melhorar | ux-nomenclature (88%) | Baixa | Expandir keywords e description |
| Poucos auxiliares | ux-nomenclature (2 files) | Baixa | Adicionar 1 arquivo de exemplos |

**Status:** Não bloqueia desenvolvimento, melhorias incrementais

---

## 📋 Checklist de Qualidade para Nova Skill

**Antes de marcar skill como "Implementada", validar:**

### 1. Frontmatter Completo

- [ ] **`name`** em kebab-case correto
- [ ] **`description`** com 200-300+ palavras
- [ ] **`keywords`** com 8-15 items estratégicos
- [ ] **`allowed-tools`** definido (Read, Write, Edit, Bash, Grep, Glob)
- [ ] **`scope: domain`** e **`target: [nome-do-projeto]`**

### 2. Estrutura de Conteúdo

- [ ] Seções obrigatórias presentes:
  - [ ] **## 🎯 Overview** (2-3 parágrafos)
  - [ ] **## 📋 Quando Usar** (3+ cenários específicos)
  - [ ] **## 💡 Conceitos Fundamentais** (teoria + prática)
  - [ ] **## 🔧 Exemplos Práticos** (código real do projeto)
  - [ ] **## 🚨 Troubleshooting** (3+ problemas comuns)
  - [ ] **## 📚 Referências** (skills relacionadas, docs, código)

### 3. Qualidade de Código

- [ ] **Código de exemplo executável** do projeto (não genérico)
- [ ] **Exemplos com contexto** (comentários explicativos)
- [ ] **Links para código real** (file_path:line_number pattern)
- [ ] **Troubleshooting real** (erros que já ocorreram no projeto)

### 4. Validação Técnica

- [ ] **YAML válido** (teste: `python3 -c "import yaml; yaml.safe_load(open('SKILL.md'))"`)
- [ ] **Auto-discovery testado** manualmente (3+ queries diferentes)
- [ ] **Links internos funcionam** (docs/tecnico/, docs/conceitual/)
- [ ] **Nenhum typo** em keywords ou description

### 5. Documentação e Integração

- [ ] **Adicionada ao inventário** neste backlog (tabela completa)
- [ ] **Relacionamentos documentados** (outras skills, docs)
- [ ] **Cross-references bidirecionais** (skill → docs, docs → skill)
- [ ] **Auxiliares criados** (se skill complexa, mínimo 2-3 files)

### 6. Auto-Discovery

- [ ] **Queries testadas:**
  - [ ] Busca por tecnologia: "react components patterns"
  - [ ] Busca por problema: "how to compose react components"
  - [ ] Busca por feature: "hooks useEffect useState"
- [ ] **Score mínimo:** 90% (skill ativa em 9/10 queries relevantes)

---

## 🔄 Workflow de Atualização

### Quando Atualizar Este Backlog

**Gatilhos para atualização:**

1. ✅ **Ao criar nova skill** (adicionar entrada na tabela de inventário)
2. ✅ **Ao atualizar skill existente** (atualizar métricas e timestamp)
3. ✅ **Semanalmente** (revisar auto-discovery success rates)
4. ✅ **A cada release** (atualizar roadmap e marcar fases completas)
5. ✅ **Quando tecnologia muda** (ex: React 19, Vite 6 lançados)

### Processo de Atualização

**1. Nova Skill Criada:**
```bash
# Adicionar entrada na tabela "IMPLEMENTADAS"
# Atualizar métricas gerais (Total Skills +1)
# Atualizar "Última Atualização" do backlog
# Testar auto-discovery e documentar score
# Criar cross-references com docs/
```

**2. Skill Atualizada:**
```bash
# Atualizar timestamp "Última Atualização" na tabela
# Revisar auto-discovery se description mudou
# Verificar se links internos ainda funcionam
# Atualizar changelog da skill (se houver)
```

**3. Auditoria Semanal:**
```bash
# Testar auto-discovery de 3 skills aleatórias
# Validar YAML de skills modificadas recentemente
# Revisar seção "Skills com Problemas"
# Atualizar métricas gerais (auto-discovery médio)
```

---

## 📚 Relacionamentos com Outras Camadas

### Camada 4 (Treinamento Interno)

**Relação:** Skills são **material de referência** consultivo em módulos L0/L1

**Integração:**
- Cada módulo L0/L1 lista skills de referência ao final
- Skills fornecem **deep dive técnico** (módulos são introdutórios)
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

---

### docs/tecnico/

**Relação:** Skills **ampliam e facilitam** acesso à docs técnicas

**Integração:**
- Skills linkam para docs técnicas para aprofundamento
- Docs técnicas linkam de volta para skills para quick reference
- Skills = porta de entrada, docs = documentação completa

**Exemplo:**
```markdown
## 📚 Tópicos Avançados (em SKILL.md)

Para detalhes técnicos avançados, consulte:
- [Arquitetura Completa](../../docs/tecnico/architecture/01-visao-geral-arquitetura.md)
- [Testing Strategy](../../docs/tecnico/testing/README.md)
```

---

### docs/conceitual/

**Relação:** Skills **seguem glossário** de nomenclatura (ÉPICO 12)

**Integração:**
- Skills usam termos aprovados (Curso, Aula, Seção)
- ux-nomenclature skill enforce glossário automaticamente
- Exemplos em skills usam nomenclatura consistente

**Exemplo:**
```markdown
## 💡 Exemplo Real (em react-components-patterns/SKILL.md)

// ✅ Correto - Nomenclatura ÉPICO 12
function LearningSystemLayout({ course, section, lesson }) {
  return (
    <div>
      <h1>{course.title}</h1> {/* "Curso de Bash" */}
      <h2>{section.title}</h2> {/* "Fundamentos" */}
      <h3>{lesson.title}</h3> {/* "Aula 1.1: Introdução" */}
    </div>
  );
}
```

---

## 📊 Estatísticas e Tendências

### Crescimento de Skills (Projetado)

```
Novembro 2025:  5 skills (baseline)
Dezembro 2025:  13 skills (+8, Fase 1-2 completa)
Janeiro 2026:   15 skills (+2, Fase 3 completa)
Março 2026:     15 skills (manutenção, nenhuma nova)
```

**Taxa de Crescimento:**
- Fase 1-2: +160% (5 → 13 skills)
- Fase 3: +15% (13 → 15 skills)
- Maturidade: 0% (foco em qualidade vs. quantidade)

### Auto-Discovery Médio (Projetado)

```
Atual (5 skills):      91.8%
Meta Fase 1 (8 skills): 92.5%
Meta Fase 2 (13 skills): 93.0%
Meta Fase 3 (15 skills): 94.0%
```

**Objetivo:** >90% em todas as skills, média >93% até Janeiro 2026

---

## 🎯 Metas de Curto, Médio e Longo Prazo

### Curto Prazo (2 semanas - até 30 Nov 2025)

- [ ] Criar 3 skills P0: react-components-patterns, vite-build-optimization, tailwind-design-system
- [ ] Validar auto-discovery >90% em todas 3
- [ ] Criar 9 arquivos auxiliares (3 por skill)
- [ ] Atualizar inventário neste backlog

**Critério de Sucesso:** 8/13 skills implementadas (62%)

---

### Médio Prazo (6 semanas - até 31 Dez 2025)

- [ ] Criar 5 skills P1: testing, localStorage, hooks, docker, state-mgmt
- [ ] Integrar todas skills com docs/tecnico/ e docs/conceitual/
- [ ] Auto-discovery médio >92.5%
- [ ] 100% cobertura do stack principal

**Critério de Sucesso:** 13/13 skills implementadas (100%)

---

### Longo Prazo (12 semanas - até 31 Jan 2026)

- [ ] Criar 2 meta-skills: cc-workflows, cc-best-practices
- [ ] Auto-discovery médio >94%
- [ ] Auditoria completa de qualidade (15/15 skills)
- [ ] Documentar caso de uso real de cada skill (examples/)

**Critério de Sucesso:** 15/15 skills, qualidade AA+

---

## 📅 Changelog do Backlog

| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 1.2.0 | 2025-11-24 | CS-001 (cliente:criar-a-partir-video) implementada para usuários finais (8 skills total) | Claude Code |
| 1.1.0 | 2025-11-19 | DS-005 (localStorage-patterns) implementada + métricas atualizadas (7 skills) | Claude Code |
| 1.0.0 | 2025-11-16 | Criação inicial do inventário SSOT com 5 skills existentes e 8 planejadas | Claude Code |

---

**📍 Você está em:** `.claude/skills/SKILLS-BACKLOG.md` - **SSOT de Skills**
**📅 Última atualização:** 2025-11-16
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** ✅ Ativo - Inventário completo e atualizado
**🎯 Uso:** Referência central para todas skills do projeto (planejadas + implementadas)
**🔄 Próxima revisão:** 2025-11-23 (semanal)
