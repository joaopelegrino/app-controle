# app-controle (UltraThink) - Configuração Claude Code

**Version:** 3.0.0 | **Date:** 2026-01-22 | **Status:** Production
**Project Type:** Plataforma B2B de treinamento técnico corporativo

---

## 🎯 Quick Start

```bash
# Desenvolvimento
bun run dev          # Servidor local porta 3000
bun run build        # Build de produção
bun run test         # Rodar testes com Vitest

# Com mise (se configurado)
mise dev             # Servidor dev
mise test            # Testes
mise full-stack      # Frontend + Backend

# Slash Commands (Claude Code)
/quick-audit         # Verificação rápida de saúde
/full-coverage       # Relatório de cobertura
/pr-ready            # Checklist pré-PR
```

---

## 📁 Estrutura do Projeto

```
app-controle/
├── src/
│   ├── components/         → Componentes React (hierarquia de 4 níveis)
│   │   ├── HubView.jsx     → Hub principal para cursos e trilhas
│   │   ├── LearningPathView.jsx → Display de trilhas de aprendizado
│   │   ├── GenericLearningSystem.jsx → Componente unificado de curso
│   │   ├── UserDashboard.jsx → Dashboard de progresso do usuário
│   │   └── AdminDashboard.jsx → Dashboard de analytics admin
│   ├── data/               → Definições e conteúdo de cursos
│   │   ├── studyAreas.js   → Configuração de cursos ativos (SSOT)
│   │   └── *LearningData.js → Conteúdo de curso (estrutura flat)
│   ├── hooks/              → Custom React hooks
│   │   └── useModuleProgress.js → Persistência de progresso
│   ├── services/           → Camadas de abstração
│   │   └── dataService.js  → Operações localStorage
│   └── tests/              → Arquivos de teste Vitest
├── docs/                   → Documentação do projeto
│   └── backlog/ROADMAP.md  → Status atual do sprint (SSOT)
├── .claude/                → Configuração Claude Code
│   ├── agents/             → Agents especializados
│   ├── commands/           → Slash commands customizados
│   ├── settings.local.json → Configurações locais
│   └── hooks.toml          → Hooks de automação
├── .factory/               → Configuração Factory Droid CLI
└── dist/                   → Output de build de produção
```

---

## 🤖 Agents Disponíveis

Agents especializados em `.claude/agents/`:

| Agent | Propósito | Quando Usar |
|-------|-----------|-------------|
| `code-reviewer` | Revisão de código | Antes de PRs, validar mudanças |
| `security-auditor` | Auditoria de segurança | Scans periódicos, antes de releases |
| `test-generator` | Criar/melhorar testes | Aumentar cobertura, novas features |
| `docs-engineer` | Documentação técnica | Documentar componentes, criar contexto |
| `dev-environment-specialist` | Ambiente de desenvolvimento | Setup, troubleshooting mise |
| `config-optimizer` | Otimização de configuração | Análise e melhoria de .claude/ |

**Uso:**
```
"Use code-reviewer agent para revisar minhas mudanças staged"
"Use test-generator agent para criar testes para src/hooks/useModuleProgress.js"
"Use security-auditor agent para fazer scan do codebase"
```

---

## 📝 Slash Commands

Commands customizados em `.claude/commands/`:

| Command | Descrição | Uso |
|---------|-----------|-----|
| `/quick-audit` | Verificação rápida de saúde | Antes de features, PRs, diariamente |
| `/full-coverage` | Relatório de cobertura detalhado | Antes de releases, semanalmente |
| `/pr-ready` | Checklist pré-PR completo | Antes de criar PRs |
| `/browser-testing` | Testes E2E com MCP | Testes de interface |

---

## 🔧 Stack Tecnológica

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| **Frontend** | React | 18.3 |
| **Build** | Vite | 5.4 |
| **Styling** | Tailwind CSS | 3.4 |
| **Routing** | React Router | 6 |
| **Runtime** | Bun | 1.3.3 |
| **Node (fallback)** | Node.js | 24+ |
| **Testing** | Vitest | latest |
| **Package Manager** | Bun | (NUNCA use npm/yarn) |

---

## 📋 Padrões de Desenvolvimento

### Hierarquia de Componentes (4 níveis)

```
1. Root: SistemaEducacionalCompleto.jsx (Routes + State)
   └─ 2. Views: HubView, LearningPathView, etc.
      └─ 3. Systems: GenericLearningSystem
         └─ 4. Subcomponents: NotesView, etc.
```

### Fluxo de Dados

```
studyAreas.js (config)
    ↓
GenericLearningSystem (component)
    ↓
*LearningData.js (content)
    ↓
useModuleProgress (state)
    ↓
dataService (persistence)
    ↓
localStorage (storage)
```

### Padrões localStorage

- Todas operações wrapped em try/catch
- Fallback para sessionStorage em QuotaExceededError
- Tratar SecurityError (modo navegação privada)
- Limite de 50KB por notas de curso
- Formato de chave: `{courseId}-learning-notes` para notas
- Formato de chave: `ultrathink_progress_{courseId}` para progresso

### Estrutura de Rotas

```
/                    → Hub
/curso/:id           → Visualização de curso
/curso/:id/aula/:n   → Aula específica
/trilha/:id          → Trilha de aprendizado
/curso/:id/caderno   → Caderno do curso
/dashboard           → Dashboard do usuário
/admin               → Dashboard admin
```

---

## ✅ Regras - SEMPRE

- Usar TodoWrite tool para tarefas multi-step
- Consultar `docs/backlog/ROADMAP.md` no início de cada sessão (SSOT)
- Verificar arquivo antes de editar com Read
- Usar comandos `bun` para testes e build
- Manter código limpo sem console.log em produção
- Seguir padrões Tailwind existentes
- Preservar funcionalidades existentes
- Rodar testes antes de commitar
- Usar conventional commits

---

## 🚫 Regras - NUNCA

- Criar arquivos desnecessários
- Adicionar comentários excessivos
- Usar jQuery ou bibliotecas não instaladas
- Modificar configurações de build sem necessidade
- Commitar sem rodar testes
- Duplicar código (refatorar para componentes genéricos)
- Usar npm ou yarn (somente Bun!)
- Carregar README.md no contexto (é para humanos)

---

## 🔍 Ao Debugar

1. Verificar console do browser primeiro
2. Checar Network tab para requisições
3. Validar props dos componentes
4. Testar em diferentes tamanhos de tela
5. Verificar localStorage para persistência
6. Usar MCP Chrome DevTools para inspeção programática

---

## 🛠️ Ao Implementar Features

1. Verificar User Story correspondente em `docs/backlog/ROADMAP.md`
2. Ler critérios de aceite e contexto B2B
3. Criar branch: `feature/US-XXX-descricao`
4. Implementar conforme critérios
5. Escrever testes (se aplicável)
6. Atualizar documentação
7. Commitar com mensagem convencional
8. Atualizar status da US: TODO → IN PROGRESS → DONE

---

## 🌐 MCP Browser Testing

### Chrome DevTools MCP

```javascript
// Navegar
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Snapshot
mcp__chrome-devtools__take_snapshot()

// Screenshot
mcp__chrome-devtools__take_screenshot({ format: "png" })

// Clicar elemento
mcp__chrome-devtools__click({ uid: "[uid]" })

// Verificar console
mcp__chrome-devtools__list_console_messages()

// Verificar network
mcp__chrome-devtools__list_network_requests()
```

---

## 📊 Sistema Atual (Branch: demo-nocodb-simple)

**Status:**
```
✅ Frontend :3000  → React + Vite (Hub + Bash course)
✅ NocoDB :8080    → Dashboard visual (PostgreSQL 16)
✅ Docker          → WSL2 integration active
✅ mise v2         → Hooks + 22 tasks (91% conformidade)
```

**Acesso Backend:**
- URL: http://localhost:8080
- Email: admin@ultrathink.com
- Senha: UltraThink@Admin2026!

---

## 📚 Documentação de Referência

### Documentos Ativos
- **CLAUDE.md** - Este arquivo (configuração Claude Code)
- **docs/backlog/ROADMAP.md** - SSOT para planejamento
- **.factory/AGENTS.md** - Instruções para Factory Droid

### Configuração Claude Code
- **.claude/agents/** - Agents especializados
- **.claude/commands/** - Slash commands
- **.claude/settings.local.json** - Configurações
- **.claude/hooks.toml** - Hooks de automação

### Configuração Factory Droid
- **.factory/droids/** - Droids (subagents)
- **.factory/commands/** - Commands
- **.factory/settings.json** - Settings

---

## 🔄 Git Workflow

### Branching Strategy
- Main branch: `desenvolvimento`
- Feature branches: `feature/US-XXX-description`
- Bug fixes: `fix/bug-description`
- Refactoring: `refactor/area`

### Commit Conventions
```
feat(scope): descrição      # Nova feature
fix(scope): descrição       # Bug fix
refactor(scope): descrição  # Refatoração
docs(scope): descrição      # Documentação
test(scope): descrição      # Testes
chore(scope): descrição     # Manutenção
```

### Pre-commit Checklist
1. `bun run lint`
2. `bun run test`
3. `git diff` para verificar mudanças
4. Mensagem de commit descritiva
5. Verificar dados sensíveis no diff

---

## 📝 Política de Estimativas de Tempo

- NUNCA usar estimativas de tempo (dias, semanas, meses) em planejamento
- Usar estados de completude de tarefa: [L] [M] [H] [D]
  - [L] Baixa complexidade (tarefa simples, atômica)
  - [M] Média complexidade (requer planejamento)
  - [H] Alta complexidade (multi-step, pesquisa necessária)
  - [D] Done (completado e verificado)

---

**Última atualização:** 2026-01-22
**Versão:** 3.0.0 (migração .factory → .claude)
**Projeto:** app-controle (UltraThink)
**Responsável:** João Pelegrino
