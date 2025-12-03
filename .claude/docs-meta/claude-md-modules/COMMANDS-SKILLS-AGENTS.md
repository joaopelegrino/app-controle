# Comandos Slash, Skills e Agents

**Módulo:** COMMANDS-SKILLS-AGENTS.md
**Parte de:** CLAUDE.md modularizado
**Última atualização:** 2025-11-17

---

## 🔧 Comandos Slash Customizados

### /test - Executar e Analisar Testes
```bash
npm test
# Analisa resultados e sugere correções
```

### /deploy - Build e Deploy
```bash
# Opções: local | staging | production
npm run build
docker-compose up -d
```

### /fix - Corrigir Erros
```bash
# Recebe descrição de erro
# Diagnostica e aplica correção
```

---

## 🧠 Skills e Agents Especializados

### Estrutura do Sistema de Conhecimento

O Plataforma B2B de treinamento técnico corporativo utiliza **Skills e Agents** para automatizar tarefas complexas e garantir consistência:

```
.claude/
├── skills/                    # Conhecimento declarativo (ativa automaticamente)
│   ├── ux-nomenclature/      # Garante glossário do ÉPICO 12
│   ├── component-refactor/   # Padrões de refatoração React
│   ├── breadcrumb-impl/      # Implementação de breadcrumb
│   ├── platform-architecture/      # Arquitetura completa do sistema
│   └── meta-configuracao-evolucao/  # Meta-skill para evoluir skills
│
└── agents/                    # Tarefas complexas multi-step
    └── ux-refactor-agent.md  # Agent UX/UI especializado
```

### Skills Disponíveis (Ativação Automática)

#### 1. **ux-nomenclature** 🎨

**O que faz:**
- Garante nomenclatura consistente seguindo glossário do ÉPICO 12
- Substitui termos antigos (ex: "Sistema de Aprendizado" → "Curso")
- Valida botões de navegação (`← Voltar ao [Nível Pai]`)
- Aplica breadcrumb pattern: `Hub > Curso > Aula`

**Ativa quando:**
- Editando componentes React (*.jsx)
- Modificando arquivos de dados (src/data/*.js)
- Implementando US-060, US-061, US-062, US-063
- Trabalhando com sistemas de aprendizado

**Glossário Enforçado:**
```
❌ PROIBIDO              → ✅ USAR
Sistema de Aprendizado  → Curso
Notas Rápidas           → Meu Caderno de Notas
Módulo                  → Aula
FASE                    → Seção
Ver Notas               → 📖 Estudar
Cronograma (contexto)   → Curso
```

**Arquivo:** `.claude/skills/ux-nomenclature/SKILL.md`

---

#### 2. **component-refactor** ⚙️

**O que faz:**
- Guia refatoração de componentes React duplicados
- Extrai hooks customizados (`useAutoSaveNotes`, `useModuleProgress`)
- Cria componentes genéricos (BaseLearningSystem)
- Reduz duplicação de código (meta: 25% → <10%)

**Ativa quando:**
- Refatorando componentes React
- Implementando US-043 (BaseLearningSystem)
- Criando hooks customizados
- Extraindo lógica comum de 5 Learning Systems

**Padrões de Refatoração:**
- Hook Pattern: `const [notes, handleChange, status] = useAutoSaveNotes('bash')`
- Component Composition: Props drilling → Context API
- DRY Principle: 800 linhas duplicadas → componente genérico

**Meta:** Reduzir ~800 linhas de código duplicado em 5 sistemas

**Arquivo:** `.claude/skills/component-refactor/SKILL.md`

---

#### 3. **breadcrumb-impl** 🧭

**O que faz:**
- Guia implementação de breadcrumb hierárquico
- Garante acessibilidade (WCAG 2.1 AA)
- Estrutura semântica correta (`<nav aria-label="Breadcrumb">`)
- Responsividade (colapsa em mobile: `... > Aula 1.1`)

**Ativa quando:**
- Implementando US-061 (Sistema de Breadcrumb)
- Criando componente `Breadcrumb.jsx`
- Trabalhando com navegação hierárquica
- Adicionando breadcrumb a Learning Systems

**Padrão de Uso:**
```jsx
<Breadcrumb items={[
  { label: 'Hub', icon: '🏠', onClick: handleHome },
  { label: 'Curso de Bash', icon: '📖', onClick: handleCourse },
  { label: 'Aula 1.1', icon: '📝', current: true }
]} />
```

**Acessibilidade:**
- `aria-label="Breadcrumb"` em `<nav>`
- `aria-current="page"` no item atual
- `aria-hidden="true"` nos separadores
- Navegação por teclado (Tab, Enter)

**Arquivo:** `.claude/skills/breadcrumb-impl/SKILL.md`

---

#### 4. **platform-architecture** 🏗️

**O que faz:**
- Conhecimento completo da arquitetura do sistema
- Hierarquia de 4 níveis (Hub → Curso → Aula → Prática)
- Fluxo de dados (estado, localStorage, props drilling)
- Padrões de código (Tailwind, React, Vite)

**Ativa quando:**
- Navegando entre componentes
- Tomando decisões arquiteturais
- Implementando novas features
- Refatorando código existente
- Escrevendo documentação técnica

**Conhecimento Inclui:**
- Stack completo (React 18.3, Vite 5.4, Tailwind 3.4)
- 17 componentes e suas relações
- 227 módulos em 5 sistemas integrados
- Estrutura de dados (studyAreas.js, *LearningData.js)
- Padrões de estilo (cores, spacing, components)
- Débito técnico conhecido

**Arquivo:** `.claude/skills/platform-architecture/SKILL.md`

---

#### 5. **meta-configuracao-evolucao** 🔄

**O que faz:**
- **Meta-skill**: Automatiza criação de novas skills/agents
- Pesquisa documentação oficial (WebSearch + WebFetch)
- Extrai melhores práticas de fontes confiáveis
- Aplica conhecimento via skills/agents/hooks
- Documenta processo completo

**Ativa quando:**
- Integrando nova tecnologia ao Plataforma B2B de treinamento técnico corporativo
- Atualizando configurações baseado em nova versão
- Criando skills/agents para novo domínio
- Automatizando workflow recorrente
- Evoluindo arquitetura do sistema

**Workflow Automatizado:**
1. 🔍 **Research**: Buscar documentação oficial
2. 📚 **Learning**: Extrair padrões e exemplos
3. 🛠️ **Implementation**: Criar skill/agent/hook
4. 📝 **Documentation**: Documentar conhecimento
5. ✅ **Validation**: Testar em cenário real
6. 🔄 **Maintenance**: Plano de atualização

**Exemplo de Uso:**
```
Input: "Integrar Radix UI ao Plataforma B2B de treinamento técnico corporativo"

Processo:
1. WebSearch("Radix UI React documentation 2025")
2. WebFetch(radix-ui.com, "Extract patterns, accessibility")
3. Criar: .claude/skills/radix-ui-integration/SKILL.md
4. Testar: Implementar Dialog component
5. Documentar: docs/integrations/radix-ui.md
```

**Arquivo:** `.claude/skills/meta-configuracao-evolucao/SKILL.md`

---

### Agents Especializados (Invocação Manual ou Automática)

#### **ux-refactor-agent** 🎨

**Tipo:** Agent complexo multi-phase

**O que faz:**
- Análise profunda de UX/UI usando MCP Chrome DevTools
- Coleta de evidências (screenshots, snapshots, flows)
- Identificação de problemas (nomenclatura, navegação, a11y)
- Proposta de soluções baseadas em best practices
- Implementação de refatoração seguindo patterns
- Validação com métricas (before/after)
- Documentação completa (US, guides, PRD updates)

**Workflow (5 Fases):**

```
Phase 1: Analysis (Evidence-Based)
├── Navigate com mcp__chrome-devtools
├── Capture screenshots em cada nível
├── Take snapshots da estrutura
├── Identify problems (vs glossário)
└── Document findings (report estruturado)

Phase 2: Solution Design
├── Reference best practices (ÉPICO 12, WCAG, Udemy/Coursera)
├── Propose solutions (wireframes text-based)
├── Create user stories (formato padrão)
└── Define success metrics

Phase 3: Implementation
├── Refactor with precision (Read → Edit → Validate)
├── Follow refactoring checklist
├── Create reusable components
└── Preserve functionality

Phase 4: Validation
├── Automated testing (unit + E2E)
├── Manual testing via MCP
└── Metrics validation (before vs after)

Phase 5: Documentation
├── Update PRD (mark US as DONE)
├── Create implementation guide
└── Update CLAUDE.md with new patterns
```

**Ativa quando:**
- User solicita: "Analisar UX/UI"
- Implementando US-060/061/062/063/064
- Refatorando nomenclatura
- Melhorando navegação
- Corrigindo usabilidade

**Ferramentas:**
- `mcp__chrome-devtools__*` - Inspeção programática
- `Read`, `Edit`, `Write` - Refatoração de código
- `Grep`, `Bash` - Validação e testes

**Quality Criteria:**
- ✅ Código: ESLint passa, Prettier formatado, build sucede
- ✅ UX: Glossário 100%, design system consistente, WCAG AA
- ✅ Docs: Screenshots before/after, métricas medidas, PRD atualizado

**Arquivo:** `.claude/agents/ux-refactor-agent.md`

---

### Como Usar Skills e Agents

**📖 Documentação Completa:**
- [README-SKILLS-AGENTS.md](/.claude/skills/meta-configuracao-evolucao/README-SKILLS-AGENTS.md) - Guia completo
- [QUICK-START.md](/.claude/skills/meta-configuracao-evolucao/QUICK-START.md) - Início rápido (5 min)

#### Skills (Ativação Automática)

Skills ativam **automaticamente** quando você trabalha em contextos relacionados:

```
✅ Você edita BashLearningSystem.jsx
→ ux-nomenclature skill ativa
→ Valida que "Ver Notas" → "📖 Estudar"
→ Alerta se encontrar termo proibido

✅ Você refatora componentes duplicados
→ component-refactor skill ativa
→ Sugere extrair hook useAutoSaveNotes
→ Propõe criar BaseLearningSystem

✅ Você implementa breadcrumb
→ breadcrumb-impl skill ativa
→ Guia estrutura HTML semântica
→ Valida acessibilidade WCAG
```

**Não precisa invocar manualmente** - Claude Code detecta contexto e aplica conhecimento.

#### Agents (Invocação Manual ou Triggering)

Agents são invocados quando você solicita tarefas complexas:

```
User: "Analisar usabilidade do sistema Bash e propor melhorias"

→ ux-refactor-agent ativa
→ Executa 5 fases completas
→ Entrega: análise + refatoração + validação + documentação
```

**Ou trigger automático** quando user stories específicas são mencionadas:

```
User: "Implementar US-061"

→ ux-refactor-agent reconhece
→ Breadcrumb implementation workflow
→ Usa breadcrumb-impl skill como referência
```

---

### Manutenção de Skills e Agents

**Atualizar Skills:**
```bash
# Listar todas as skills
ls -la .claude/skills/

# Ver última atualização
stat -c '%y %n' .claude/skills/*/SKILL.md

# Buscar skills que referenciam tecnologia
grep -r "React" .claude/skills/

# Validar frontmatter
for skill in .claude/skills/*/SKILL.md; do
  head -5 "$skill" | grep -E "^(name|description|allowed-tools):"
done
```

**Criar Nova Skill:**
1. Usar `meta-configuracao-evolucao` skill
2. Pesquisar documentação oficial
3. Criar `.claude/skills/{nome}/SKILL.md`
4. Testar em contexto real
5. Documentar em CLAUDE.md

**Métricas de Sucesso:**
- Tempo de integração: -50% com meta-skill
- Qualidade: Seguir padrões oficiais
- Documentação: 100% das integrações
- Reutilização: 3+ usos por skill

---

**Última atualização:** 2025-11-17
**Responsável:** Modularização CLAUDE.md v1.0
**Status:** ✅ Completo
