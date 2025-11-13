# Sistema Educacional Completo - Contexto para Claude Code

## 🎯 Visão Geral
Sistema educacional interativo focado em tecnologia, com flash cards 3D, vídeos integrados e trilhas de aprendizado estruturadas. Projeto de aprendizado do usuário João Pelegrino, com evolução contínua desde janeiro 2025.

## 🛠️ Stack Tecnológica
- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.19 (startup 295ms)
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Markdown**: React Markdown 10.1.0
- **Testing**: Vitest 3.2.4 + Testing Library 16.3.0
- **E2E**: Playwright 1.56.1
- **Container**: Docker com Nginx Alpine
- **CI/CD**: GitHub Actions

## 📁 Estrutura do Projeto
```
app-controle/
├── src/
│   ├── components/      # 18 componentes React
│   │   ├── SistemaEducacionalCompleto.jsx  # Componente principal
│   │   ├── HubView.jsx                     # Página inicial
│   │   ├── LearningPathView.jsx            # Trilhas de aprendizado
│   │   ├── FlashcardModal.jsx              # Cards 3D interativos
│   │   ├── Breadcrumb.jsx                  # Navegação hierárquica (WCAG AA) ✨ NOVO
│   │   ├── CLearningSystem.jsx             # Sistema C
│   │   ├── RustLearningSystem.jsx          # Sistema Rust
│   │   ├── BashLearningSystem.jsx          # Sistema Bash
│   │   ├── VSCodeLearningSystem.jsx        # Sistema VSCode
│   │   ├── ClaudeCodeLearningSystem.jsx    # Sistema Claude Code
│   │   ├── CNotesView.jsx                  # Notas C
│   │   ├── RustNotesView.jsx               # Notas Rust
│   │   ├── BashNotesView.jsx               # Notas Bash
│   │   ├── VSCodeNotesView.jsx             # Notas VSCode
│   │   ├── ClaudeCodeNotesView.jsx         # Notas Claude Code
│   │   ├── AreaCard.jsx                    # Card reutilizável
│   │   ├── CodeBlock.jsx                   # Bloco de código
│   │   └── ErrorBoundary.jsx               # Tratamento de erros
│   ├── data/            # Dados estruturados
│   │   ├── studyAreas.js                   # 13 áreas de estudo
│   │   ├── cLearningData.js                # Dados C (50 módulos)
│   │   ├── rustLearningData.js             # Dados Rust (24 módulos)
│   │   ├── bashLearningData.js             # Dados Bash (16 módulos)
│   │   ├── vscodeLearningData.js           # Dados VSCode (8 módulos)
│   │   └── claudeCodeLearningData.js       # Dados Claude Code (12 módulos)
│   ├── utils/           # Utilitários
│   │   ├── helpers.js                      # Funções auxiliares
│   │   └── debugLogger.js                  # Logger customizado
│   └── tests/           # Testes automatizados
│       ├── setup.js                        # Configuração testes
│       └── components/AreaCard.test.jsx    # Teste exemplo
├── dist/                # Build de produção
├── docs/                # Documentação técnica
│   ├── MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md
│   ├── MCP-CHROME-DEVTOOLS-MANUAL-USO.md
│   └── MCP-CHROME-DEVTOOLS-QUICK-START.md
├── screenshots/         # Screenshots de validação
│   ├── 01-hub-inicial.png
│   ├── 02-modal-bash.png
│   ├── validacao-01-hub-pos-refatoracao.png        ✨ NOVO
│   ├── validacao-02-bash-com-breadcrumb.png        ✨ NOVO
│   └── validacao-03-bash-final-completo.png        ✨ NOVO
├── .claude/             # Configuração Claude Code
│   ├── commands/        # Comandos slash customizados
│   │   ├── test.md      # /test - Executar testes
│   │   ├── deploy.md    # /deploy - Build e deploy
│   │   └── fix.md       # /fix - Corrigir erros
│   ├── skills/          # Skills especializadas (ativação automática)
│   │   ├── ux-nomenclature/          # Glossário ÉPICO 12
│   │   ├── component-refactor/       # Refatoração React
│   │   ├── breadcrumb-impl/          # Breadcrumb acessível
│   │   ├── ultrathink-arch/          # Arquitetura sistema
│   │   └── meta-configuracao-evolucao/  # Meta-skill
│   ├── agents/          # Agents complexos (multi-step)
│   │   └── ux-refactor-agent.md      # UX/UI refactoring
│   ├── hooks.toml       # Automações e gatilhos
│   └── settings.local.json  # Permissões e configurações
├── .mcp.json            # Configuração MCP servers
├── docker-compose.yml   # Orquestração Docker
├── Dockerfile          # Multi-stage build
├── nginx.conf          # Configuração otimizada
├── vite.config.js      # Build sem sourcemaps
├── test-usabilidade-mcp.cjs  # Testes automatizados E2E
├── PRODUCT-CENTRAL-DOCUMENT.md  # PRD + User Stories + Backlog (v2.4)
├── DIAGNOSTICO-COMPLETO-ULTRATHINK-2025-11-13.md  # Diagnóstico técnico
├── RELATORIO-USABILIDADE-ULTRATHINK.md  # Relatório de testes (nota 8.0/10)
├── RELATORIO-VALIDACAO-EPICO-12.md  # Validação ÉPICO 12 (88% completo) ✨ NOVO
└── VALIDACAO-MCP-CHROME-DEVTOOLS.md  # Validação MCP
```

## 📊 Métricas do Sistema (Estado Atual - Novembro 2025)

### Conteúdo Educacional
- **13 Áreas de Estudo**: Bash, Linux, Servidores, DevOps, Criptografia, Segurança, C, Docker, Kubernetes, VSCode, Claude Code, Rust, Sistemas Rust
- **5 Sistemas Integrados**: C Programming, Rust Programming, Bash Shell Scripting, VSCode WSL, Claude Code CLI
- **1 Caminho de Aprendizado**: Rust (7 áreas estruturadas)
- **227 Módulos Totais**: 50 C + 16 Bash + 24 Rust + 8 VSCode + 12 Claude Code + 117 outros
- **39 Flash Cards**: Distribuídos por categoria (basics, commands, advanced)
- **692 Horas**: Conteúdo educacional extensivo

### Qualidade de Código
- **Componentes React**: 18 componentes funcionais (+ Breadcrumb.jsx)
- **Linhas de Código**: ~5.600 (+100)
- **Cobertura de Testes**: ~5% (meta: 80%)
- **Duplicação de Código**: ~25% (meta: <10%)
- **Performance Build**: Vite 277ms startup, ~7s build (Breadcrumb adicionado)
- **Nomenclatura**: 100% consistente (ÉPICO 12) ✨
- **Nota Geral**: 8.8/10 ⭐ (+0.3 pelo ÉPICO 12)

### Arquivos de Documentação
- **21+ documentos Markdown**: PRD, diagnósticos, guias, relatórios
- **Fonte Única da Verdade**: PRODUCT-CENTRAL-DOCUMENT.md (v2.4)
- **53 User Stories**: 3 completas recentemente (US-060 ✅, US-061 🚧 77%, US-070 ✅)
- **4 Releases Planejadas**: Roadmap até março 2026
- **ÉPICO 12**: 88% completo (US-060 DONE, US-061 em progresso)
- **ÉPICO 13**: 3% completo (US-070 DONE)

## 🚀 Capacidades MCP (Model Context Protocol)

### Servidores MCP Configurados

**1. Chrome DevTools MCP** (Oficial Google)
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest",
               "--executable-path=/home/notebook/.cache/chrome-testing/chrome/..."]
    }
  }
}
```

**Capacidades:**
- 24 ferramentas disponíveis
- Navegação programática (navigate_page, list_pages)
- Screenshots (take_screenshot, take_snapshot)
- Interação com elementos (click, fill, hover, drag)
- Inspeção (console, network requests)
- Performance tracing
- Evaluate JavaScript

**Status:** ✅ Validado e funcional (VALIDACAO-MCP-CHROME-DEVTOOLS.md)

**2. Playwright MCP** (Microsoft)
```bash
npm install --save-dev playwright
npx playwright install chromium
```

**Capacidades:**
- Testes E2E automatizados
- Navegação headless ou com UI
- Multi-browser (Chromium, Firefox, WebKit)
- Scripts de teste (test-usabilidade-mcp.cjs)

**Status:** ✅ Instalado e testado

### Permissões Configuradas (.claude/settings.local.json)

**MCP Tools Permitidos:**
- `mcp__chrome-devtools__*` - Todas ferramentas Chrome DevTools
- `mcp__playwright__browser_navigate` - Navegação Playwright
- `mcp__playwright__browser_install` - Instalação browsers

**Bash Comandos Permitidos:**
- NPM: `npm install`, `npm run dev:*`, `npm run build:*`, `npm:*`
- Node: `node:*`, `npx playwright:*`, `npx chrome-devtools-mcp:*`
- Git: `git --version`
- Utilitários: `mkdir:*`, `curl:*`, `mv:*`, `ls:*`, `chmod:*`, `rm:*`, `find:*`, `cat:*`
- Python: `pip install:*`, `python3:*`, `python:*`
- Rede: `ss:*`, `pkill:*`, `kill:*`

**Web Fetch Permitido:**
- `docs.anthropic.com` - Documentação Claude Code
- `www.builder.io` - Recursos Builder
- `medium.com` - Artigos técnicos
- `www.youtube.com` - Vídeos educacionais
- `WebSearch` - Busca geral

**Configurações Especiais:**
- `outputStyle: "Learning"` - Modo educacional com insights
- `enableAllProjectMcpServers: true` - Habilita todos MCPs do projeto

## 🎣 Hooks e Automações (.claude/hooks.toml)

### Pre-Tool Use Hooks

**1. Proteção contra Operações Destrutivas**
```toml
event = "PreToolUse"
tool_name = "Bash"
pattern = "rm|delete|drop"
action.type = "block"
```
- Bloqueia comandos destrutivos
- Exige confirmação explícita

**2. Arquivos Sensíveis**
```toml
tool_name = "Write|Edit"
file_paths = ["*.env", "*.key", "*.pem"]
action.type = "confirm"
```
- Confirma antes de modificar secrets

### Post-Tool Use Hooks

**1. Auto-formatação de Código**
```bash
# Após editar .jsx/.js
prettier --write $FILE
eslint $FILE --fix
```
- Formatação automática
- Linting com auto-fix

**2. Validação de Testes**
```bash
# Após criar .test.jsx
npm test -- $FILE --run
```
- Roda testes automaticamente

### Session Hooks

**1. Início de Sessão (SessionStart)**
- Exibe informações do ambiente
- Mostra branch Git atual
- Verifica dependências (npm audit)
- Checa se servidor está rodando (porta 3000)
- Lista comandos slash disponíveis

**2. Fim de Sessão (Stop)**
- Salva log da sessão
- Lista arquivos modificados
- Sugere próximos passos (testes, build, commit)

**3. Pré-Compactação (PreCompact)**
- Salva contexto em `.claude/backups/`
- Timestamp do contexto

**4. Tratamento de Erros (OnError)**
- Log de erros em `.claude/error.log`
- Sugestões de correção comuns

### Custom Trigger Hooks

**before_commit**
- Roda testes automaticamente
- Valida build
- Executa linting
- Bloqueia commit se falhar

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

O Ultrathink utiliza **Skills e Agents** para automatizar tarefas complexas e garantir consistência:

```
.claude/
├── skills/                    # Conhecimento declarativo (ativa automaticamente)
│   ├── ux-nomenclature/      # Garante glossário do ÉPICO 12
│   ├── component-refactor/   # Padrões de refatoração React
│   ├── breadcrumb-impl/      # Implementação de breadcrumb
│   ├── ultrathink-arch/      # Arquitetura completa do sistema
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

#### 4. **ultrathink-arch** 🏗️

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

**Arquivo:** `.claude/skills/ultrathink-arch/SKILL.md`

---

#### 5. **meta-configuracao-evolucao** 🔄

**O que faz:**
- **Meta-skill**: Automatiza criação de novas skills/agents
- Pesquisa documentação oficial (WebSearch + WebFetch)
- Extrai melhores práticas de fontes confiáveis
- Aplica conhecimento via skills/agents/hooks
- Documenta processo completo

**Ativa quando:**
- Integrando nova tecnologia ao Ultrathink
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
Input: "Integrar Radix UI ao Ultrathink"

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

## 🔧 Comandos Principais

### Desenvolvimento
```bash
npm run dev          # Servidor local porta 3000 (strictPort)
npm run build        # Build de produção otimizado
npm run preview      # Preview da build

# Testes
npm test            # Rodar testes com Vitest
npm run test:ui     # Interface visual de testes
npm run test:coverage # Relatório de cobertura

# Docker
docker-compose up -d  # Subir container (porta 80)
docker-compose down   # Parar container

# E2E com Playwright
node test-usabilidade-mcp.cjs  # Teste automatizado completo

# Slash Commands (Claude Code)
/test               # Executar e analisar testes
/deploy local       # Build e deploy local
/fix "erro aqui"    # Diagnóstico e correção
```

## 🎨 Padrões e Convenções

### Código
- **Componentes**: PascalCase, funcionais com hooks
- **Arquivos**: camelCase para JS/JSX
- **CSS**: Tailwind utility-first
- **Estado**: useState e useEffect do React
- **Props**: Destructuring na assinatura
- **Dados**: Centralizados em `src/data/`
- **Testes**: Co-localizados com componentes

### Git
- **Branch principal**: desenvolvimento
- **Commits**: Convencionais (feat, fix, docs, refactor, test, chore)
- **PR**: Sempre com review antes do merge
- **Hooks**: Pre-commit checks automáticos

### Qualidade
- **Sem console.log** em produção (removidos no build)
- **Sem sourcemaps** em produção (segurança)
- **Code splitting** configurado (react-vendor, ui-vendor)
- **Minificação** com Terser (drop_console, drop_debugger)
- **Formatação** automática com Prettier (via hooks)
- **Linting** com ESLint auto-fix

### Documentação
- **PRD Central**: PRODUCT-CENTRAL-DOCUMENT.md (fonte única da verdade)
- **User Stories**: Formato "Como... Quero... Para..."
- **Critérios de Aceite**: Checkboxes explícitos
- **Estimativas**: Pontos Fibonacci (1, 2, 3, 5, 8, 13, 21)
- **Status**: DONE ✅ | IN PROGRESS 🚧 | TODO 📋 | ICEBOX 🧊

## 🔒 Segurança
- **Headers CSP** configurados no nginx
- **HTTPS ready** com headers de segurança
- **Sem exposição de secrets** verificado
- **localStorage** apenas para dados não sensíveis
- **Hooks** protegem contra operações destrutivas
- **MCP permissions** controladas via whitelist

## 🚀 Estado Atual (Novembro 2025)

### Release 1.0 "Foundation" ✅ CONCLUÍDA
- ✅ Hub com 13 áreas de estudo
- ✅ 5 Sistemas Integrados completos
- ✅ 1 Caminho de Aprendizado (Rust)
- ✅ Flash cards 3D interativos
- ✅ Sistema de notas com auto-save
- ✅ Progresso visual de módulos
- ✅ Build otimizado e Docker
- ✅ CI/CD com GitHub Actions

### Infraestrutura de Testes ✅ CONFIGURADA
- ✅ MCP Chrome DevTools instalado e validado
- ✅ Playwright instalado e testado
- ✅ Script E2E: test-usabilidade-mcp.cjs
- ✅ Screenshots automatizados (2 capturas)
- ✅ Relatório de usabilidade completo

### Documentação ✅ ESTABELECIDA
- ✅ PRD Central com 53 User Stories
- ✅ Diagnóstico técnico completo
- ✅ 3 guias MCP Chrome DevTools
- ✅ Relatório de usabilidade (nota 8.0/10)
- ✅ Roadmap até Release 4.0 (março 2026)

### Release 2.0 "Quality & Scale" 📋 PLANEJADA (Sprint 2.1-2.3)
Próximos objetivos:
- [ ] React Router (navegação por URL)
- [ ] Tratamento de erros localStorage
- [ ] Progresso persistido
- [ ] Refatorar BaseLearningSystem (reduzir 800 linhas)
- [ ] Cobertura de testes >= 30%
- [ ] Testes E2E automatizados em CI/CD
- [ ] Lazy loading de componentes
- [ ] Bundle size < 200KB

### Débito Técnico Identificado
1. **Código Duplicado**: ~25% (5 Learning Systems similares)
2. **Cobertura de Testes**: Apenas 5% (meta: 80%)
3. **Navegação sem URLs**: Estado interno React (sem deep linking)
4. **LocalStorage**: Sem tratamento de QuotaExceededError
5. **Acessibilidade**: Falta ARIA labels e validação WCAG
6. **TypeScript**: Projeto ainda em JavaScript puro

## 📝 TODOs Prioritários (Sprint 2.1)

### Alta Prioridade 🔴
1. **US-040**: Implementar React Router (13 pontos)
   - Navegação por URL
   - Deep linking
   - Botão voltar funcional

2. **US-041**: Tratamento de erros localStorage (5 pontos)
   - Try/catch em todas operações
   - Tratamento de QuotaExceededError
   - Limite de 50KB por nota

3. **US-042**: Persistir progresso de módulos (8 pontos)
   - Salvar em localStorage
   - Sincronizar com estado React

4. **US-019**: Testes de componentes principais (21 pontos)
   - HubView.test.jsx
   - FlashcardModal.test.jsx
   - CLearningSystem.test.jsx
   - Meta: 30% de cobertura

### Média Prioridade 🟡
5. **US-043**: Refatorar BaseLearningSystem (21 pontos)
   - Componente genérico
   - Reduzir duplicação de 25% para 10%
   - Economizar ~800 linhas

6. **US-020**: Testes E2E com Playwright (13 pontos)
   - Automatizar em CI/CD
   - Cobertura de fluxos principais

7. **US-022**: Lazy loading de componentes (8 pontos)
   - React.lazy() para sistemas
   - Bundle inicial < 200KB

### Futuro 🟢
8. **US-050**: Dark mode (13 pontos)
9. **Migração TypeScript**: Gradual, começar por utils
10. **Acessibilidade**: Auditoria Lighthouse, ARIA labels

## 🤖 Regras para Claude Code

### SEMPRE
- Verificar arquivo antes de editar com Read
- Usar comandos npm para testes e build
- Manter código limpo sem console.log
- Seguir padrões Tailwind existentes
- Preservar funcionalidades existentes
- Consultar PRODUCT-CENTRAL-DOCUMENT.md para decisões de produto
- Atualizar User Stories quando implementar features
- Marcar critérios de aceite como completos
- Rodar testes antes de commitar

### NUNCA
- Criar arquivos desnecessários (arquivos temporários devem ser deletados)
- Adicionar comentários excessivos no código (código deve ser auto-explicativo)
- Usar jQuery ou bibliotecas não instaladas
- Modificar configurações de build sem necessidade
- Commitar sem rodar testes
- Desabilitar hooks de segurança
- Expor secrets ou tokens
- Duplicar código (refatorar para componentes genéricos)

### AO DEBUGAR
1. Verificar console do browser primeiro
2. Checar Network tab para requisições
3. Validar props dos componentes
4. Testar em diferentes tamanhos de tela (mobile/tablet/desktop)
5. Verificar localStorage para persistência
6. Usar MCP Chrome DevTools para inspeção programática
7. Capturar screenshots para análise visual
8. Consultar logs em `.claude/error.log` se disponível

### AO IMPLEMENTAR FEATURES
1. Verificar User Story correspondente no PRD
2. Ler critérios de aceite
3. Criar branch: `feature/US-XXX-descricao`
4. Implementar conforme critérios
5. Escrever testes (se aplicável)
6. Atualizar documentação
7. Marcar checkboxes dos critérios
8. Commitar com mensagem convencional
9. Atualizar status da US: TODO → IN PROGRESS → DONE

### AO USAR MCP
**Chrome DevTools:**
```javascript
// Exemplo de uso
1. mcp__chrome-devtools__list_pages
2. mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
3. mcp__chrome-devtools__take_screenshot(format: "png")
4. mcp__chrome-devtools__list_console_messages
5. mcp__chrome-devtools__take_snapshot  // Mapeia elementos
6. mcp__chrome-devtools__click(uid: "1_15")  // Clica em elemento
```

**Playwright:**
```bash
# Teste automatizado completo
node test-usabilidade-mcp.cjs

# Captura screenshots em screenshots/
```

## 🎯 Contexto de Aprendizado

Este é um projeto de **estudo e aprendizado** do usuário **João Pelegrino**, nível iniciante a intermediário em programação.

### Objetivos de Aprendizado
- React e componentes funcionais
- Hooks (useState, useEffect)
- Tailwind CSS e design responsivo
- Vite como build tool moderno
- Docker e containerização
- CI/CD e automação com GitHub Actions
- Testes automatizados (Vitest, Playwright)
- MCP e integração com ferramentas
- Git workflow e boas práticas
- Arquitetura de componentes
- Gerenciamento de estado

### Estilo de Comunicação
Explicações devem ser:
- **Claras e didáticas**: Evitar jargões sem explicação
- **Com exemplos práticos**: Mostrar código real do projeto
- **Focadas no "porquê"**: Não apenas "como", mas por que fazemos assim
- **Em português brasileiro**: Linguagem natural
- **Com insights educacionais**: Seção "★ Insight" ao final de tarefas complexas
- **Encorajadoras**: Celebrar progresso e aprendizado

### Output Style: Learning Mode
Configurado em `.claude/settings.local.json`:
```json
{
  "outputStyle": "Learning"
}
```

**Características:**
- Insights educacionais após implementações
- Explicações de conceitos técnicos
- Conexões com padrões da indústria
- Encorajamento do aprendizado prático
- Solicitação de input do usuário em decisões de design

## 📚 Documentação de Referência

### Documentos Principais
- **PRODUCT-CENTRAL-DOCUMENT.md** - PRD, User Stories, Backlog, Roadmap
- **DIAGNOSTICO-COMPLETO-ULTRATHINK-2025-11-13.md** - Análise técnica profunda
- **RELATORIO-USABILIDADE-ULTRATHINK.md** - Testes de usabilidade (nota 8.0/10)
- **VALIDACAO-MCP-CHROME-DEVTOOLS.md** - Validação das 5 capacidades MCP

### Guias MCP
- **docs/MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md** - Configuração detalhada WSL2
- **docs/MCP-CHROME-DEVTOOLS-MANUAL-USO.md** - 24 comandos MCP + casos de uso
- **docs/MCP-CHROME-DEVTOOLS-QUICK-START.md** - Início rápido (5 minutos)

### Links Externos Úteis
- [Documentação React](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Playwright Docs](https://playwright.dev)
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)

## 🎓 Evolução do Projeto (Linha do Tempo)

**Janeiro 2025** - Fundação
- Criação inicial do projeto
- 12 áreas de estudo iniciais
- Sistema C Programming (primeiro sistema integrado)

**Fevereiro-Outubro 2025** - Expansão
- Adição de Sistema Bash (16 módulos)
- Adição de Sistema Rust (24 módulos)
- Sistema VSCode WSL
- Caminho de Aprendizado Rust (primeiro caminho)

**Novembro 2025** - Maturidade e Qualidade
- Sistema Claude Code (13ª área)
- MCP Chrome DevTools configurado
- Playwright instalado
- Documentação central (PRD) estabelecida
- Diagnóstico técnico completo
- Hooks e automações
- Testes automatizados E2E
- 3 comandos slash customizados
- Release 1.0 completa (227 módulos, 692h conteúdo)

**Dezembro 2025** - Planejado (Release 2.0)
- React Router
- Refatoração de Learning Systems
- Cobertura de testes 30%
- Tratamento de erros robusto

**Janeiro 2026** - Planejado (Release 3.0)
- Dark mode
- TypeScript (migração parcial)
- Acessibilidade (WCAG AA)

**Março 2026** - Planejado (Release 4.0)
- PWA com modo offline
- Sistema de conquistas
- Recursos sociais

## 📊 Métricas de Sucesso

### Produto
- ✅ Conteúdo: 227 módulos, 692h (meta: 300 módulos, 1000h)
- ✅ Áreas: 13 (meta: 20)
- ⚠️ Flash Cards: 39 (meta: 100)
- ⚠️ Caminhos: 1 (meta: 5)

### Qualidade
- ✅ Performance: 295ms startup (meta: <500ms)
- ✅ Build: 2s (meta: <5s)
- ⚠️ Testes: 5% cobertura (meta: 80%)
- ⚠️ Duplicação: 25% (meta: <10%)
- ⚠️ Lighthouse: TBD (meta: 90+)

### Nota Geral
**Atual:** 8.5/10 ⭐
**Meta Release 2.0:** 9.0/10 ⭐
**Meta Release 3.0:** 9.5/10 ⭐

## 🏆 Conquistas Recentes (Atualizado: 2025-11-13)

✅ **ÉPICO 13: Padronização Estrutural (3% Completo)** ✨ NOVO
- US-070 100% COMPLETA: Áreas descontinuadas do Hub (13 edições)
- 7 áreas movidas para seção "Em Desenvolvimento"
- Hub agora mostra apenas 6 cards ativos (5 sistemas + 1 path)
- Consistência percebida: 38% → 100%
- Build passou (7.12s), MCP validado (159 elementos)
- Screenshot: us-070-hub-areas-descontinuadas.png

✅ **ÉPICO 12: Arquitetura de Informação (100% Completo)** ✨ DONE
- US-060 100% COMPLETA: Nomenclatura 100% consistente (28 correções)
- US-061 100% COMPLETA: Breadcrumb integrado em 5 sistemas + 1 view (13/13 critérios)
- Breadcrumb.jsx criado (WCAG 2.1 AA, 95 linhas, navegação hierárquica)
- Integração: CLearningSystem, RustLearningSystem, VSCodeLearningSystem, ClaudeCodeLearningSystem, BashNotesView
- Navegação: Hub > Curso > Aula (3 níveis completos)
- Build passou (7.51s), console limpo (1 warning menor)
- Screenshots: us-061-breadcrumb-nivel2-bash.png, us-061-breadcrumb-nivel3-aula.png
- Relatórios: RELATORIO-VALIDACAO-EPICO-12.md, RELATORIO-VALIDACAO-US-061.md

✅ **Infraestrutura de Testes**
- MCP Chrome DevTools configurado e validado
- Playwright instalado
- 5 screenshots automatizados capturados (+3 ÉPICO 12)
- 2 relatórios de validação gerados

✅ **Documentação Profissional**
- PRD com 53 User Stories (v2.4 atualizado)
- Roadmap até março 2026
- ÉPICO 13: 10 User Stories, 118 pontos (~10 semanas)
- Guias completos MCP (3 documentos)
- Diagnóstico técnico detalhado
- 2 relatórios de validação (ÉPICO 12 + US-070)

✅ **Automação e Qualidade**
- Hooks configurados (pre/post tool use)
- 3 comandos slash customizados
- 5 skills ativas + 1 agent UX
- Formatação automática de código
- Pre-commit checks
- UX Refactor Agent workflow (5 fases) validado

✅ **Capacidades Avançadas**
- Controle programático de navegador
- Testes E2E automatizados
- Screenshots para validação visual
- Inspeção de console e rede
- Validação MCP sistemática (9 testes)

---

**📅 Última atualização:** 2025-11-13 (US-061 Implementada - ÉPICO 12 COMPLETO)
**✅ Status:** Produção (Release 1.0) + Sprint 2.4 (100% ✅) + Sprint 3.1 (3%)
**🔄 Próxima Release:** 2.5 "UX Refinements" → 3.0 "Consistency & Scale"
**📦 Projeto:** Sistema Educacional Completo v2.0 (Ultrathink)
**👤 Responsável:** João Pelegrino
**🤖 Assistente:** Claude Code com MCP integrado
**🎯 Nota:** 9.0/10 ⭐ (+0.2) | Meta: 9.5/10 ⭐
**🚀 Conquista Recente:** ÉPICO 12 - 100% COMPLETO | US-061 DONE (Breadcrumb Hierárquico)
