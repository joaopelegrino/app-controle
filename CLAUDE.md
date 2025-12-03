# Plataforma B2B de treinamento técnico corporativo - Contexto para Claude Code

**Version:** 2.1.0 | **Date:** 2025-11-22 | **Status:** Production
**Project Type:** Plataforma B2B de treinamento técnico corporativo

---

## 📥 Progressive Loading - Módulos Disponíveis

**Otimização implementada (2025-11-17):** CLAUDE.md principal reduzido de 1.369 → 280 linhas (-79.5%). Conteúdo extraído para 9 módulos especializados em `.claude/docs-meta/claude-md-modules/`.

**Como funciona:** Este CLAUDE.md raiz contém apenas resumos + links. Claude usa Read tool quando necessita de detalhes completos.

**Documentação completa:** [README dos módulos](.claude/docs-meta/claude-md-modules/README.md)

---

## 🎯 Session Start Protocol

**SEMPRE no início de cada sessão, consultar documentos centrais (fontes de verdade):**

### 1. Contexto do PROJETO
```bash
Read: docs/backlog/ROADMAP.md                   # Próximos passos do projeto (SSOT)
Read: docs/backlog/STATUS-DELIVERABLES.md       # Deliverables (se existir)
Read: docs/backlog/acoes-usuario/ACOES-PENDENTES.md  # Ações manuais para usuário
```

### 2. Contexto da META-CONFIGURAÇÃO
```bash
Read: .claude/docs-meta/ESTADO-ATUAL.md        # Estado de melhorias (fases completas)
Read: .claude/docs-meta/ARQUITETURA-SISTEMA.md # Estrutura atual (agents/skills/commands)
```

### 3. Descobrir Componentes Disponíveis
```bash
ls .claude/agents/  # Ver agents disponíveis (meta + project)
ls .claude/skills/  # Ver skills disponíveis (meta + project)
```

**Por que?**
- ROADMAP.md tem "Última Sessão" (auto-atualizada) → retomar contexto
- STATUS-DELIVERABLES.md tem estágios de deliverables (🔵 🟡 🟠 🟢 📚)
- ACOES-PENDENTES.md tem ações manuais prioritizadas (P0 = blocker)
- ESTADO-ATUAL.md tem status de meta-configurações
- ARQUITETURA-SISTEMA.md tem estrutura atual (varia por projeto)

---

## 📑 Índice de Navegação

### 🎯 Contexto Essencial

#### Stack Tecnológica e Estrutura
**Resumo:** React 18.3 + Vite 5.4 + Tailwind 3.4. Projeto com 18 componentes, 5 sistemas integrados, 227 módulos educacionais (692h conteúdo). Arquitetura de 4 níveis (Hub → Curso → Aula → Prática).

**Carregar quando:** Descobrir stack, estrutura de diretórios, métricas do sistema
**Referência completa:** [STACK-TECHNICAL.md](.claude/docs-meta/claude-md-modules/STACK-TECHNICAL.md)

---

#### Capacidades MCP
**Resumo:** 2 servidores MCP configurados - Chrome DevTools (24 ferramentas: navegação, screenshots, console, network) + Playwright (E2E, multi-browser). Permissões configuradas para MCP tools, Bash commands, WebFetch. Output style: Learning mode.

**Carregar quando:** Usar MCP programaticamente, configurar automações, validar UI
**Referência completa:** [MCP-CAPABILITIES.md](.claude/docs-meta/claude-md-modules/MCP-CAPABILITIES.md)

---

#### Hooks e Automações
**Resumo:** Sistema de hooks automatizados - Pre-tool (proteção contra rm -rf, arquivos sensíveis), Post-tool (auto-formatação, testes), Session (SessionStart, Stop, PreCompact, OnError), Custom triggers (before_commit).

**Carregar quando:** Debugar automações, adicionar novos hooks, entender workflows
**Referência completa:** [HOOKS-AUTOMATIONS.md](.claude/docs-meta/claude-md-modules/HOOKS-AUTOMATIONS.md)

---

#### Comandos, Skills e Agents
**Resumo:** 3 comandos slash (/test, /deploy, /fix). 8 skills ativas (ux-nomenclature, component-refactor, breadcrumb-impl, platform-architecture, meta-configuracao-evolucao, localStorage-patterns, learning-path-patterns, react-components-patterns). 1 agent UX (ux-refactor-agent com workflow de 5 fases). Skills ativam automaticamente por contexto.

**Carregar quando:** Usar comandos slash, consultar skills, invocar agents, entender ativação automática
**Referência completa:** [COMMANDS-SKILLS-AGENTS.md](.claude/docs-meta/claude-md-modules/COMMANDS-SKILLS-AGENTS.md)

---

### 📚 Metodologia e Padrões

#### Metodologia Six-Layer
**Resumo:** Sistema de documentação em 6 camadas. Camada 1 (Contexto Técnico - skills/) + Camada 4 (Treinamento Interno) implementadas. Skills = única fonte de verdade para docs técnicas. Progressive loading com economia de 70-87% context. Programa de onboarding de 4 semanas (L0 Fundamentals + L1 Core Concepts).

**Carregar quando:** Estruturar documentação técnica, criar skills, criar treinamento
**Referência completa:** [SIX-LAYER-DOCS.md](.claude/docs-meta/claude-md-modules/SIX-LAYER-DOCS.md)

---

#### Guia de Desenvolvimento
**Resumo:** Comandos principais (npm dev/build/test, docker, playwright). Padrões de código (React functional, Tailwind utility-first, localStorage). Convenções Git (conventional commits). Segurança (CSP, HTTPS, no secrets). Regras para Claude Code (SEMPRE/NUNCA/AO DEBUGAR/AO IMPLEMENTAR/AO USAR MCP).

**Carregar quando:** Executar comandos, consultar padrões, verificar convenções
**Referência completa:** [DEVELOPMENT-GUIDE.md](.claude/docs-meta/claude-md-modules/DEVELOPMENT-GUIDE.md)

---

### 🚀 Roadmap e Status

#### Estado Atual e Releases
**Resumo:** Release 1.0 completa (227 módulos, 692h, 5 sistemas). Release 2.0 em progresso (50%): US-040 parcial (React Router), US-041 completa (localStorage errors), US-044 completa (Hub MVP simplificado). MVP focado: 1 Área (Bash) + 1 Caminho (Backend Developer). Débito técnico: duplicação 25%, testes 5%. Próximo: US-042 (persistir progresso).

**Carregar quando:** Consultar estado, ver próximas releases, identificar débito técnico
**Referência completa:** [ROADMAP-STATUS.md](.claude/docs-meta/claude-md-modules/ROADMAP-STATUS.md)

---

### 🎯 Contexto de Negócio

#### Contexto B2B Corporativo
**Resumo:** Plataforma B2B de treinamento técnico corporativo é produto B2B para empresas 50-500 funcionários. Resolve problema de plataformas genéricas (R$150k-200k/ano, engajamento 10-15%). 3 personas corporativas (Carlos CTO, Ana Gerente, Roberto RH). Estilo de comunicação: didático, português-BR, insights educacionais. Output Style: Learning mode.

**Carregar quando:** Entender negócio, consultar personas, ver estilo de comunicação
**Referência completa:** [B2B-CONTEXT.md](.claude/docs-meta/claude-md-modules/B2B-CONTEXT.md)

---

## 🔧 Comandos Principais (Quick Reference)

### Desenvolvimento
```bash
npm run dev          # Servidor local porta 3000 (strictPort)
npm run build        # Build de produção otimizado
npm test             # Rodar testes com Vitest
docker-compose up -d # Subir container (porta 80)
```

### Slash Commands (Claude Code)
```bash
/test               # Executar e analisar testes
/deploy local       # Build e deploy local
/fix "erro aqui"    # Diagnóstico e correção
```

### MCP Tools (Exemplos)
```bash
# Chrome DevTools
mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
mcp__chrome-devtools__take_screenshot(format: "png")
mcp__chrome-devtools__take_snapshot  # Mapeia elementos

# Playwright
node test-usabilidade-mcp.cjs  # Teste automatizado completo
```

---

## 📚 Documentação de Referência

### Documentos Ativos (Raiz do Projeto)
- **CLAUDE.md** - Este arquivo (índice modularizado)
- **README.md** - README principal do projeto
- **PRODUCT-CENTRAL-DOCUMENT.md** - ⚠️ DEPRECATED (redireciona para ROADMAP.md)

### Product Management (docs/backlog/)
- **ROADMAP.md** - ✅ SSOT (Single Source of Truth) - PRD B2B v3.0
  - Visão B2B Plataforma B2B de treinamento técnico corporativo (3 personas corporativas)
  - Estado Atual (Release 1.0 completa)
  - 4 Releases planejadas (Q1-Q3 2026)
  - 40+ User Stories B2B priorizadas
  - Métricas corporativas (NPS, engajamento, ARR)
- **STATUS-DELIVERABLES.md** - ✅ Rastreamento de Entregáveis por User Story ✨ NOVO
  - 36 deliverables rastreados (Release 1.0 + 2.0)
  - 5 estágios de maturidade (🔵 🟡 🟠 🟢 📚)
  - Integração com ROADMAP.md e ações manuais
- **acoes-usuario/** - ✅ Sistema de Ações Manuais ✨ NOVO
  - ACOES-PENDENTES.md (lista principal - SSOT)
  - ACOES-CONCLUIDAS.md (histórico auditável)
  - templates/ (template-acao.md + 3 exemplos)
  - README.md (guia completo de uso)

### Documentação Técnica (docs/)
- **MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md** - Configuração detalhada WSL2
- **MCP-CHROME-DEVTOOLS-MANUAL-USO.md** - 24 comandos MCP + casos de uso
- **MCP-CHROME-DEVTOOLS-QUICK-START.md** - Início rápido (5 minutos)
- **TEMPLATE-CURSO-PADRAO.md** - Template para criar novos sistemas

### Meta-Documentação (.claude/meta-docs/)
- **README.md** - Propósito e guidelines da meta-docs
- **INDEX.md** - Catálogo completo (12 documentos)
- **sessions/** - Backlogs de sessões (organizados por data)
- **validacoes/** - Validações de skills/agents/MCP (3 docs)
- **diagnosticos/** - Análises técnicas + guias (5 docs)
- **claude-md-modules/** - Módulos do CLAUDE.md ✨ NOVO

### Links Externos Úteis
- [Documentação React](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)

---

## ✅ O Que FAZER

- ✅ Usar TodoWrite tool para tarefas multi-step
- ✅ Consultar ROADMAP.md no início de cada sessão (SSOT)
- ✅ Consultar STATUS-DELIVERABLES.md para contexto de deliverables
- ✅ Marcar estágios (🔵 🟡 🟠 🟢 📚) após atingir milestones
- ✅ Verificar seção "Última Sessão" do ROADMAP para retomar contexto
- ✅ Atualizar .claude/docs-meta/ARQUITETURA-SISTEMA.md após adicionar components
- ✅ Criar ações manuais quando tarefa requer intervenção do usuário
- ✅ Priorizar ações P0 (blocker = urgente)
- ✅ Usar progressive loading (ler módulos apenas quando necessário)
- ✅ Seguir convenções Git (conventional commits)

---

## 🚫 O Que NÃO Fazer

- ❌ Carregar README.md no contexto (é para humanos)
- ❌ Criar arquivos de documentação proativamente
- ❌ Adicionar console.log em produção
- ❌ Duplicar código (refatorar para componentes genéricos)
- ❌ Commitar sem rodar testes
- ❌ Desabilitar hooks de segurança
- ❌ Expor secrets ou tokens
- ❌ Skip validation checklists

---

## 🤖 Regras para Claude Code

### SEMPRE
- **Priorizar embasamento técnico: Criar skills ANTES de implementar features** (knowledge-first approach)
- Verificar arquivo antes de editar com Read
- Usar comandos npm para testes e build
- Manter código limpo sem console.log
- Seguir padrões Tailwind existentes
- Preservar funcionalidades existentes
- Consultar docs/backlog/ROADMAP.md (SSOT) para decisões de produto B2B
- Atualizar User Stories quando implementar features
- Rodar testes antes de commitar

### NUNCA
- Criar arquivos desnecessários (deletar temporários)
- Adicionar comentários excessivos (código auto-explicativo)
- Usar jQuery ou bibliotecas não instaladas
- Modificar configurações de build sem necessidade
- Commitar sem rodar testes
- Duplicar código (refatorar para componentes genéricos)

### AO DEBUGAR
1. Verificar console do browser primeiro
2. Checar Network tab para requisições
3. Validar props dos componentes
4. Testar em diferentes tamanhos de tela (mobile/tablet/desktop)
5. Verificar localStorage para persistência
6. Usar MCP Chrome DevTools para inspeção programática
7. Capturar screenshots para análise visual

### AO IMPLEMENTAR FEATURES
1. **Verificar se existe skill de suporte** (consultar SKILLS-BACKLOG.md)
2. **Se skill planejada mas não criada**: Criar skill PRIMEIRO (knowledge-first)
3. Verificar User Story correspondente em docs/backlog/ROADMAP.md
4. Ler critérios de aceite e contexto B2B
5. Criar branch: `feature/US-XXX-descricao`
6. Implementar conforme critérios (usando skill como referência)
7. Escrever testes (se aplicável)
8. Atualizar documentação
9. Marcar checkboxes dos critérios
10. Commitar com mensagem convencional
11. Atualizar status da US: TODO → IN PROGRESS → DONE

**Exemplo:** US-041 (localStorage errors) → Verificar DS-005 (localStorage-patterns) → Criar DS-005 primeiro → Implementar US-041 com padrões documentados

### AO USAR MCP
**Chrome DevTools:**
```javascript
// Exemplos de uso
1. mcp__chrome-devtools__list_pages
2. mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
3. mcp__chrome-devtools__take_screenshot(format: "png")
4. mcp__chrome-devtools__take_snapshot  // Mapeia elementos
5. mcp__chrome-devtools__click(uid: "1_15")  // Clica em elemento
```

**Playwright:**
```bash
# Teste automatizado completo
node test-usabilidade-mcp.cjs
```

---

**Última atualização:** 2025-11-22 (US-044 completa + documentação)
**Review Trigger:** Após mudanças arquiteturais em `.claude/` ou módulos
**Módulos:** 9 módulos em `.claude/docs-meta/claude-md-modules/`
**Skills:** 8 skills ativas em `.claude/skills/`
**Projeto:** Plataforma B2B de treinamento técnico corporativo - Plataforma B2B de treinamento técnico corporativo v2.0
**Responsável:** João Pelegrino
**Nota:** 9.0/10 ⭐ | Meta Release 2.0: 9.5/10 ⭐

---

`★ Insight ─────────────────────────────────────`
**Progressive Loading** é uma técnica poderosa para otimizar context usage em LLMs. Ao modularizar documentação extensa (1.369 → 280 linhas), reduzimos drasticamente o context inicial (-79.5%), permitindo carregar apenas o necessário via Read tool. Isso resulta em:
1. **Economia de tokens**: ~60% menos context usage inicial
2. **Melhor navegação**: Resumos concisos + links para detalhes
3. **Manutenção facilitada**: Módulos independentes e especializados
4. **Escalabilidade**: Adicionar novos módulos sem inflar o principal
`─────────────────────────────────────────────────`
