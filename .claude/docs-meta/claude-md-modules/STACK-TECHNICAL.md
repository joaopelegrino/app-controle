# Stack Tecnológica e Estrutura do Projeto

**Módulo:** STACK-TECHNICAL.md
**Parte de:** CLAUDE.md modularizado
**Última atualização:** 2025-11-17

---

## 🎯 Visão Geral do Projeto

**Plataforma B2B de treinamento técnico corporativo** é uma plataforma B2B de treinamento técnico corporativo que estrutura, organiza e mensura o conhecimento interno de empresas de tecnologia. Sistema desenvolvido e testado por João Pelegrino, com evolução contínua desde janeiro 2025.

**Contexto B2B:** Resolve o problema de empresas que gastam R$150k-200k/ano em plataformas genéricas (Udemy Business) mas enfrentam baixa taxa de engajamento (10-15%), conteúdo não customizável e impossibilidade de medir ROI. Plataforma B2B de treinamento técnico corporativo oferece trilhas customizáveis, progresso rastreável e analytics corporativo.

---

## 🛠️ Stack Tecnológica

### Frontend
- **React**: 18.3.1 (componentes funcionais + hooks)
- **Build Tool**: Vite 5.4.19 (startup 295ms, HMR <100ms)
- **Styling**: Tailwind CSS 3.4.1 (utility-first)
- **Icons**: Lucide React 0.344.0
- **Markdown**: React Markdown 10.1.0

### Testing & Quality
- **Unit Tests**: Vitest 3.2.4 + Testing Library 16.3.0
- **E2E Tests**: Playwright 1.56.1
- **Cobertura Atual**: ~5% (meta: 80%)

### Deploy & Infrastructure
- **Container**: Docker com Nginx Alpine
- **CI/CD**: GitHub Actions
- **Port**: 3000 (dev), 80 (produção)

### Development Tools
- **MCP Servers**: Chrome DevTools MCP + Playwright
- **Hooks**: Pre/Post/Session automations
- **Skills**: 5 skills ativas + 1 agent UX

---

## 📁 Estrutura do Projeto

```
app-controle/
├── src/                          # Código-fonte da aplicação
│   ├── components/               # 18 componentes React
│   │   ├── SistemaEducacionalCompleto.jsx  # Componente principal
│   │   ├── HubView.jsx                     # Página inicial
│   │   ├── LearningPathView.jsx            # Trilhas de aprendizado
│   │   ├── FlashcardModal.jsx              # Cards 3D interativos
│   │   ├── Breadcrumb.jsx                  # Navegação hierárquica (WCAG AA) ✨
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
│   │
│   ├── data/                     # Dados estruturados
│   │   ├── studyAreas.js                   # 13 áreas de estudo
│   │   ├── cLearningData.js                # Dados C (50 módulos)
│   │   ├── rustLearningData.js             # Dados Rust (24 módulos)
│   │   ├── bashLearningData.js             # Dados Bash (16 módulos)
│   │   ├── vscodeLearningData.js           # Dados VSCode (8 módulos)
│   │   └── claudeCodeLearningData.js       # Dados Claude Code (12 módulos)
│   │
│   ├── utils/                    # Utilitários
│   │   ├── helpers.js                      # Funções auxiliares
│   │   └── debugLogger.js                  # Logger customizado
│   │
│   └── tests/                    # Testes automatizados
│       ├── setup.js                        # Configuração testes
│       └── components/AreaCard.test.jsx    # Teste exemplo
│
├── dist/                         # Build de produção (gerado)
│
├── docs/                         # Documentação técnica ativa
│   ├── MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md
│   ├── MCP-CHROME-DEVTOOLS-MANUAL-USO.md
│   ├── MCP-CHROME-DEVTOOLS-QUICK-START.md
│   └── TEMPLATE-CURSO-PADRAO.md  # Template oficial sistemas
│
├── screenshots/                  # Screenshots de validação
│   ├── 01-hub-inicial.png
│   ├── 02-modal-bash.png
│   ├── validacao-01-hub-pos-refatoracao.png        ✨ NOVO
│   ├── validacao-02-bash-com-breadcrumb.png        ✨ NOVO
│   └── validacao-03-bash-final-completo.png        ✨ NOVO
│
├── .claude/                      # Configuração Claude Code
│   ├── commands/                 # Comandos slash customizados
│   │   ├── test.md               # /test - Executar testes
│   │   ├── deploy.md             # /deploy - Build e deploy
│   │   └── fix.md                # /fix - Corrigir erros
│   │
│   ├── skills/                   # Skills especializadas (ativação automática)
│   │   ├── ux-nomenclature/      # Glossário ÉPICO 12
│   │   ├── component-refactor/   # Refatoração React
│   │   ├── breadcrumb-impl/      # Breadcrumb acessível
│   │   ├── platform-architecture/      # Arquitetura sistema
│   │   └── meta-configuracao-evolucao/  # Meta-skill + docs
│   │       ├── SKILL.md
│   │       ├── README-SKILLS-AGENTS.md
│   │       └── QUICK-START.md
│   │
│   ├── agents/                   # Agents complexos (multi-step)
│   │   └── ux-refactor-agent.md  # UX/UI refactoring
│   │
│   ├── meta-docs/                # Meta-documentação ✨
│   │   ├── README.md             # Propósito e guidelines
│   │   ├── INDEX.md              # Catálogo completo (12 docs)
│   │   ├── sessions/             # Backlogs de sessões
│   │   │   └── 2025-11-13/       # Sprint produtiva (4 backlogs)
│   │   ├── validacoes/           # Validações skills/agents/MCP (3 docs)
│   │   ├── diagnosticos/         # Análises técnicas + guias (5 docs)
│   │   └── claude-md-modules/    # Módulos do CLAUDE.md ✨ NOVO
│   │
│   ├── hooks.toml                # Automações e gatilhos
│   └── settings.local.json       # Permissões e configurações
│
├── .mcp.json                     # Configuração MCP servers
├── docker-compose.yml            # Orquestração Docker
├── Dockerfile                    # Multi-stage build
├── nginx.conf                    # Configuração otimizada
├── vite.config.js                # Build sem sourcemaps
├── test-usabilidade-mcp.cjs      # Testes automatizados E2E
├── CLAUDE.md                     # ✅ Instruções do projeto para Claude Code
├── PRODUCT-CENTRAL-DOCUMENT.md   # ⚠️ DEPRECATED → ROADMAP.md
└── README.md                     # ✅ README principal do projeto
```

---

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
- **Linhas de Código**: ~5.600 (+100 com breadcrumb)
- **Cobertura de Testes**: ~5% (meta: 80%)
- **Duplicação de Código**: ~25% (meta: <10%)
- **Performance Build**: Vite 277ms startup, ~7s build
- **Nomenclatura**: 100% consistente (ÉPICO 12) ✨
- **Nota Geral**: 8.8/10 ⭐ (+0.3 pelo ÉPICO 12)

### Arquivos de Documentação

- **3 Documentos Ativos na Raiz**: CLAUDE.md, README.md, PRODUCT-CENTRAL-DOCUMENT.md (⚠️ DEPRECATED)
- **Fonte Única da Verdade (SSOT)**: docs/backlog/ROADMAP.md (v3.0 B2B) ✨
- **4 Guias Técnicos em docs/**: 3 guias MCP + 1 template oficial
- **12 Documentos Meta**: Organizados em `.claude/meta-docs/` (sessions, validacoes, diagnosticos)
- **40+ User Stories B2B**: Organizadas em 4 Releases (até Q3 2026)
- **4 Releases Planejadas**: Roadmap até setembro 2026
- **ÉPICO 12**: 100% completo ✅ (US-060, US-061 DONE)
- **ÉPICO 13**: 10% completo (US-070 DONE)

---

## 🎯 Arquitetura de 4 Níveis

**Hierarquia de Navegação:**

```
Nível 1: Hub (HubView.jsx)
   ↓
Nível 2: Curso (CLearningSystem.jsx, RustLearningSystem.jsx, etc.)
   ↓
Nível 3: Aula (módulos individuais)
   ↓
Nível 4: Prática (flash cards, notas)
```

**Breadcrumb Navigation:** `Hub > Curso de Bash > Aula 1.1`

---

## 🔧 Padrões de Código

### React Patterns

- **Functional Components** (hooks, não classes)
- **Props Destructuring** na assinatura
- **Estado Local**: `useState` para UI state
- **Efeitos**: `useEffect` para side effects
- **Composição**: Componentes pequenos e reutilizáveis

### Tailwind CSS Patterns

- **Utility-first**: Classes diretas no JSX
- **Responsividade**: `sm:`, `md:`, `lg:` prefixes
- **Design System**: Cores consistentes (blue-600, green-500, etc.)
- **Spacing**: Sistema de 4px (p-4 = 16px, m-8 = 32px)

### Persistência de Dados

- **LocalStorage**: Notas, progresso de módulos
- **Estrutura**: `{area}Notes`, `{area}Progress`
- **Auto-save**: Debouncing (500ms) em notas

---

## 🚀 Performance

### Build Metrics

- **Vite Startup**: 277ms (excelente)
- **Build Time**: ~7s (otimizado)
- **HMR**: <100ms (Hot Module Replacement)
- **Bundle Size**: Target <200KB (atual: validar)

### Optimizations Implementadas

- **Code Splitting**: React vendor + UI vendor
- **Minification**: Terser (drop_console, drop_debugger)
- **No Sourcemaps**: Produção (segurança)
- **Lazy Loading**: Planejado (Sprint 2.0)

---

## 📚 Documentação Técnica

### Documentos Principais

**Raiz do Projeto:**
- **CLAUDE.md** - Instruções completas para Claude Code (este contexto)
- **README.md** - README principal (usuário final)
- **PRODUCT-CENTRAL-DOCUMENT.md** - ⚠️ DEPRECATED (redireciona para ROADMAP.md)

**docs/ (Guias Técnicos):**
- **MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md** - Configuração detalhada WSL2
- **MCP-CHROME-DEVTOOLS-MANUAL-USO.md** - 24 comandos MCP + casos de uso
- **MCP-CHROME-DEVTOOLS-QUICK-START.md** - Início rápido (5 minutos)
- **TEMPLATE-CURSO-PADRAO.md** - Template para criar novos sistemas

**docs/backlog/ (SSOT - Single Source of Truth):**
- **ROADMAP.md** - ✅ PRD B2B v3.0 (40+ User Stories, 4 Releases)
- Visão B2B Plataforma B2B de treinamento técnico corporativo (3 personas corporativas)
- Estado Atual (Release 1.0 completa)
- Métricas corporativas (NPS, engajamento, ARR)
- Matriz RICE de priorização

**.claude/meta-docs/ (Meta-documentação):**
- **README.md** - Propósito e guidelines da meta-docs
- **INDEX.md** - Catálogo completo (12 documentos)
- **sessions/** - Backlogs de sessões (organizados por data)
- **validacoes/** - Validações de skills/agents/MCP (3 docs)
- **diagnosticos/** - Análises técnicas + guias (5 docs)
- **claude-md-modules/** - Módulos do CLAUDE.md ✨ NOVO

---

## 🎓 Evolução do Projeto (Timeline)

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
- ÉPICO 12 completo (100% nomenclatura consistente)
- ÉPICO 13 iniciado (10% - áreas descontinuadas)
- Modularização do CLAUDE.md (-79.5% tamanho)

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

---

**Última atualização:** 2025-11-17
**Responsável:** Modularização CLAUDE.md v1.0
**Status:** ✅ Completo
