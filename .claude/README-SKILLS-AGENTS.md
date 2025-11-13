# 🧠 Skills e Agents - Ultrathink

**Versão:** 1.0
**Data:** 2025-11-13
**Status:** ✅ Configurado e Funcional

---

## 📋 Índice

1. [O Que São Skills e Agents](#o-que-são-skills-e-agents)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [Skills Disponíveis](#skills-disponíveis)
4. [Agents Disponíveis](#agents-disponíveis)
5. [Como Usar](#como-usar)
6. [Criar Novas Skills](#criar-novas-skills)
7. [Manutenção e Evolução](#manutenção-e-evolução)
8. [Referências](#referências)

---

## O Que São Skills e Agents

### Skills (Conhecimento Automático)

**Skills** são pacotes de conhecimento declarativo que o Claude Code **ativa automaticamente** quando detecta contexto relevante.

**Características:**
- ✅ **Ativação Automática**: Sem comando manual
- ✅ **Conhecimento Declarativo**: Padrões, exemplos, best practices
- ✅ **Contexto-Driven**: Ativa baseado em arquivos/tarefas
- ✅ **Sempre Disponível**: Parte do contexto contínuo

**Quando Usar:**
- Garantir padrões consistentes (nomenclatura, estilo)
- Fornecer exemplos práticos (código, configuração)
- Guiar implementação (breadcrumb, refatoração)
- Conhecimento sobre arquitetura do sistema

### Agents (Tarefas Complexas)

**Agents** são workflows estruturados que executam tarefas multi-step de forma autônoma.

**Características:**
- ✅ **Multi-Phase**: Várias etapas conectadas
- ✅ **System Prompt**: Instruções detalhadas de comportamento
- ✅ **Context Window Isolado**: Não polui conversa principal
- ✅ **Ferramentas Especializadas**: Subset de tools permitidas

**Quando Usar:**
- Análise profunda (UX audit com screenshots + relatório)
- Refatoração complexa (múltiplos arquivos + validação)
- Geração de código (templates + testes + docs)
- Processos com validação (implementar → testar → documentar)

---

## Estrutura de Arquivos

```
.claude/
├── skills/                        # 5 skills configuradas
│   ├── ux-nomenclature/          # Glossário ÉPICO 12
│   │   └── SKILL.md
│   ├── component-refactor/       # Refatoração React
│   │   └── SKILL.md
│   ├── breadcrumb-impl/          # Breadcrumb WCAG AA
│   │   └── SKILL.md
│   ├── ultrathink-arch/          # Arquitetura completa
│   │   └── SKILL.md
│   └── meta-configuracao-evolucao/  # Meta-skill
│       └── SKILL.md
│
├── agents/                        # 1 agent configurado
│   └── ux-refactor-agent.md      # UX/UI multi-phase
│
├── commands/                      # 3 slash commands
│   ├── test.md
│   ├── deploy.md
│   └── fix.md
│
├── hooks.toml                     # Automações (8 hooks)
├── settings.local.json            # Configurações e permissões
└── README-SKILLS-AGENTS.md        # Este documento
```

---

## Skills Disponíveis

### 1. ux-nomenclature 🎨

**Propósito:** Garante nomenclatura 100% consistente com glossário do ÉPICO 12

**Ativa Quando:**
- Editando `*LearningSystem.jsx` ou `*NotesView.jsx`
- Modificando arquivos em `src/data/`
- Implementando US-060, US-061, US-062, US-063

**Glossário Enforçado:**
| Termo Proibido | Termo Correto |
|----------------|---------------|
| Sistema de Aprendizado | **Curso** |
| Notas Rápidas | **Meu Caderno de Notas** |
| Módulo | **Aula** |
| FASE | **Seção** |
| Ver Notas | **📖 Estudar** |
| Cronograma | **Curso** (contexto) |

**Exemplo de Uso:**
```jsx
// Claude detecta automaticamente e alerta:
<h1>Sistema de Aprendizado Bash</h1>  // ❌ Termo proibido!
// Sugestão automática:
<h1>Curso de Bash Shell Scripting</h1>  // ✅ Correto
```

**Arquivo:** [.claude/skills/ux-nomenclature/SKILL.md](skills/ux-nomenclature/SKILL.md)

---

### 2. component-refactor ⚙️

**Propósito:** Guia refatoração de componentes React para reduzir duplicação

**Ativa Quando:**
- Refatorando componentes com código duplicado
- Criando hooks customizados
- Implementando US-043 (BaseLearningSystem)
- Extraindo lógica comum

**Padrões Fornecidos:**
- Hook `useAutoSaveNotes(key)` - Auto-save em localStorage
- Hook `useModuleProgress(key, total)` - Gerenciamento de progresso
- Componente `BaseLearningSystem` - Template genérico
- Subcomponentes (`Breadcrumb`, `ProgressBar`, `VideoSection`)

**Meta:** Reduzir 800 linhas de código duplicado (25% → <10%)

**Arquivo:** [.claude/skills/component-refactor/SKILL.md](skills/component-refactor/SKILL.md)

---

### 3. breadcrumb-impl 🧭

**Propósito:** Implementação de breadcrumb acessível (WCAG 2.1 AA)

**Ativa Quando:**
- Criando componente `Breadcrumb.jsx`
- Implementando US-061
- Trabalhando com navegação hierárquica
- Adicionando breadcrumb a sistemas de aprendizado

**Fornece:**
- Estrutura HTML semântica (`<nav>`, `<ol>`, `<li>`)
- Atributos ARIA (`aria-label`, `aria-current`)
- Código React completo e testado
- Responsividade (colapso mobile)
- Exemplos de uso

**Padrão Visual:**
```
Desktop: 🏠 Hub > 📖 Curso de Bash > 📝 Aula 1.1
Mobile:  ... > 📝 Aula 1.1
```

**Arquivo:** [.claude/skills/breadcrumb-impl/SKILL.md](skills/breadcrumb-impl/SKILL.md)

---

### 4. ultrathink-arch 🏗️

**Propósito:** Conhecimento completo da arquitetura do Ultrathink

**Ativa Quando:**
- Navegando entre componentes
- Tomando decisões arquiteturais
- Implementando novas features
- Refatorando código existente

**Conhecimento Inclui:**
- Stack completo (React 18.3, Vite 5.4, Tailwind 3.4)
- Hierarquia de navegação (4 níveis)
- Fluxo de dados (estado, localStorage, props)
- 17 componentes e relações
- 227 módulos em 5 sistemas
- Padrões de código (Tailwind, convenções)
- Débito técnico conhecido
- Comandos úteis (grep, find, wc)

**Arquivo:** [.claude/skills/ultrathink-arch/SKILL.md](skills/ultrathink-arch/SKILL.md)

---

### 5. meta-configuracao-evolucao 🔄

**Propósito:** Meta-skill para criar novas skills/agents automaticamente

**Ativa Quando:**
- Integrando nova tecnologia ao projeto
- Atualizando configurações baseado em nova versão
- Criando skills/agents para novo domínio
- Automatizando workflows recorrentes

**Workflow Automatizado:**
1. 🔍 **Research**: WebSearch + WebFetch na documentação oficial
2. 📚 **Learning**: Extrair padrões, exemplos, best practices
3. 🛠️ **Implementation**: Criar skill/agent/hook estruturado
4. 📝 **Documentation**: Documentar processo e conhecimento
5. ✅ **Validation**: Testar em cenário real
6. 🔄 **Maintenance**: Plano de atualização definido

**Exemplo Real:**
```
Input: "Integrar Radix UI ao Ultrathink"

Output:
1. Busca: "Radix UI React documentation best practices 2025"
2. Extrai: Padrões de composição, acessibilidade automática
3. Cria: .claude/skills/radix-ui-integration/SKILL.md
4. Testa: Implementa Dialog component
5. Documenta: docs/integrations/radix-ui.md
```

**Arquivo:** [.claude/skills/meta-configuracao-evolucao/SKILL.md](skills/meta-configuracao-evolucao/SKILL.md)

---

## Agents Disponíveis

### ux-refactor-agent 🎨

**Tipo:** Agent multi-phase complexo

**Propósito:** Análise profunda de UX/UI com coleta de evidências, refatoração e validação

**Workflow (5 Fases):**

#### Phase 1: Analysis (Evidence-Based)
- Navegar com `mcp__chrome-devtools__navigate_page`
- Capturar screenshots em cada nível
- Mapear estrutura com `take_snapshot`
- Identificar problemas vs glossário
- Documentar findings em report estruturado

#### Phase 2: Solution Design
- Consultar ÉPICO 12, WCAG, padrões da indústria
- Criar wireframes textuais (ANTES vs DEPOIS)
- Propor User Stories com critérios de aceite
- Definir métricas de sucesso

#### Phase 3: Implementation
- Refatorar com precisão (Read → Edit → Validate)
- Seguir checklist de refatoração
- Criar componentes reutilizáveis
- Preservar funcionalidade existente

#### Phase 4: Validation
- Testes automatizados (unit + E2E)
- Testes manuais via MCP Chrome DevTools
- Validação de métricas (before vs after)

#### Phase 5: Documentation
- Atualizar PRD (marcar US como DONE)
- Criar implementation guide
- Atualizar CLAUDE.md com novos padrões

**Ferramentas Usadas:**
- `mcp__chrome-devtools__*` - Inspeção programática
- `Read`, `Edit`, `Write` - Refatoração de código
- `Grep`, `Bash` - Validação e testes

**Quality Criteria:**
- ✅ Código: ESLint passa, Prettier formatado, build sucede
- ✅ UX: Glossário 100%, design system consistente, WCAG AA
- ✅ Docs: Screenshots before/after, métricas, PRD atualizado

**Como Ativar:**
```
User: "Analisar usabilidade do sistema Bash e propor melhorias"
User: "Implementar US-061"
User: "Refatorar nomenclatura seguindo ÉPICO 12"
```

**Arquivo:** [.claude/agents/ux-refactor-agent.md](agents/ux-refactor-agent.md)

---

## Como Usar

### Skills (Automático)

Skills **NÃO precisam ser invocadas manualmente**. Claude Code detecta contexto e aplica automaticamente:

**Exemplo 1: Editando Componente**
```
1. Você abre: src/components/BashLearningSystem.jsx
2. ux-nomenclature skill ativa automaticamente
3. Você digita: <button>Ver Notas</button>
4. Claude alerta: "Termo proibido! Use '📖 Estudar'"
```

**Exemplo 2: Refatorando Código**
```
1. Você identifica código duplicado em 5 componentes
2. component-refactor skill ativa automaticamente
3. Claude sugere: "Extrair hook useAutoSaveNotes"
4. Fornece código completo do hook
```

**Exemplo 3: Implementando Breadcrumb**
```
1. Você diz: "Criar breadcrumb de navegação"
2. breadcrumb-impl skill ativa automaticamente
3. Claude fornece: Código React + ARIA + exemplos
4. Guia implementação passo a passo
```

### Agents (Manual ou Trigger)

Agents são invocados quando você **solicita tarefas complexas**:

**Invocação Manual:**
```
User: "Usar ux-refactor-agent para analisar Sistema Bash"

→ Agent ativa
→ Executa 5 fases completas
→ Entrega análise + refatoração + validação + docs
```

**Trigger Automático (por keyword):**
```
User: "Implementar US-061"

→ ux-refactor-agent detecta User Story
→ Reconhece que é breadcrumb implementation
→ Usa breadcrumb-impl skill como referência
→ Executa workflow completo
```

---

## Criar Novas Skills

### Método 1: Usando Meta-Skill (Recomendado)

1. Solicitar ao Claude:
   ```
   User: "Usar meta-configuracao-evolucao skill para integrar Radix UI"
   ```

2. Meta-skill executa:
   - WebSearch documentação oficial
   - WebFetch para extrair padrões
   - Cria `.claude/skills/radix-ui/SKILL.md`
   - Testa implementação
   - Documenta em `docs/integrations/`

### Método 2: Manual

1. **Criar pasta:**
   ```bash
   mkdir -p .claude/skills/nome-da-skill
   ```

2. **Criar SKILL.md:**
   ```markdown
   ---
   name: nome-da-skill
   description: Descrição concisa (1 linha) do que a skill faz
   allowed-tools: [Read, Edit, Grep, Bash]
   ---

   # Título da Skill

   ## Objetivo
   [O que esta skill faz]

   ## Conceitos-Chave
   [Conhecimento declarativo]

   ## Padrões de Código
   [Exemplos práticos com código]

   ## Integração com Ultrathink
   [Como usar no contexto do projeto]

   ## Comandos Úteis
   [Bash commands para aplicar]

   ## Referências
   [Links para docs oficiais]

   ## Ativação Automática
   Esta skill ativa quando você:
   - [Condição 1]
   - [Condição 2]
   ```

3. **Testar:**
   - Trabalhar em contexto relevante
   - Verificar se skill ativa automaticamente
   - Validar que conhecimento é aplicado

4. **Documentar:**
   - Adicionar seção em CLAUDE.md
   - Atualizar este README
   - Commitar com mensagem descritiva

---

## Manutenção e Evolução

### Comandos de Manutenção

```bash
# Listar todas as skills
ls -la .claude/skills/

# Ver última atualização de cada skill
stat -c '%y %n' .claude/skills/*/SKILL.md

# Buscar skills que referenciam tecnologia
grep -r "React" .claude/skills/

# Validar frontmatter de todas as skills
for skill in .claude/skills/*/SKILL.md; do
  echo "Checking $skill"
  head -5 "$skill" | grep -E "^(name|description|allowed-tools):"
done

# Contar linhas de documentação
wc -l .claude/skills/*/SKILL.md

# Encontrar skills não atualizadas (30+ dias)
find .claude/skills/ -name "SKILL.md" -mtime +30
```

### Atualizar Skill Existente

1. **Identificar necessidade** (nova versão, novo padrão)
2. **Pesquisar** documentação atualizada
3. **Editar** SKILL.md correspondente
4. **Testar** em contexto real
5. **Validar** retrocompatibilidade
6. **Commitar** com changelog

### Remover Skill Obsoleta

1. **Verificar** se skill ainda é usada (`grep -r "skill-name"`)
2. **Documentar** razão da remoção
3. **Deletar** pasta da skill
4. **Atualizar** CLAUDE.md e README
5. **Commitar** com nota de deprecation

---

## Métricas de Sucesso

| Métrica | Meta | Como Medir |
|---------|------|------------|
| **Tempo de Integração** | -50% | Antes vs Depois de skills |
| **Consistência de Código** | 100% | Lint + Nomenclature checks |
| **Qualidade de Refatoração** | Padrões oficiais | Code review + Tests |
| **Documentação** | 100% skills | Verificar README + CLAUDE.md |
| **Reutilização** | 3+ usos/skill | Logs de ativação (manual) |
| **Manutenção** | <2h/tech update | Time tracking |

---

## Referências

### Documentação Anthropic

- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)
- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Skills Best Practices](https://alexop.dev/posts/understanding-claude-code-full-stack/)

### Documentação do Projeto

- **CLAUDE.md**: Seção "🧠 Skills e Agents Especializados"
- **PRODUCT-CENTRAL-DOCUMENT.md**: ÉPICO 12 (Arquitetura de Informação)
- **Cada SKILL.md**: Documentação interna da skill

### Comunidade

- [GitHub: disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)
- [Medium: Supercharge Tech Writing](https://medium.com/google-cloud/supercharge-tech-writing-with-claude-code-subagents-and-agent-skills-44eb43e5a9b7)
- [Blog: GitButler - Claude Code Hooks](https://blog.gitbutler.com/automate-your-ai-workflows-with-claude-code-hooks)

---

## 📊 Status Atual

```
═══════════════════════════════════════════════════════════
✅ SISTEMA DE SKILLS E AGENTS COMPLETO E FUNCIONAL
═══════════════════════════════════════════════════════════

Skills Configuradas: 5
  ✅ ux-nomenclature          # Glossário ÉPICO 12
  ✅ component-refactor       # Refatoração React
  ✅ breadcrumb-impl          # Breadcrumb WCAG AA
  ✅ ultrathink-arch          # Arquitetura completa
  ✅ meta-configuracao-evolucao  # Meta-skill

Agents Configurados: 1
  ✅ ux-refactor-agent        # UX/UI multi-phase

Documentação:
  ✅ CLAUDE.md atualizado
  ✅ README-SKILLS-AGENTS.md criado
  ✅ Cada skill documentada individualmente

Status: PRONTO PARA USO! 🚀
═══════════════════════════════════════════════════════════
```

---

**📅 Criado:** 2025-11-13
**👤 Responsável:** João Pelegrino
**🤖 Assistente:** Claude Code
**📦 Projeto:** Ultrathink v2.0
**🎯 Nota:** 8.5/10 ⭐ | Meta: 9.5/10 ⭐
