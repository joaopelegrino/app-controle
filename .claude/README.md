# Configuração Claude Code - app-controle

Este diretório contém a configuração do Claude Code para o projeto app-controle (Plataforma B2B TrainB2B).

## Estrutura

```
.claude/
├── README.md                 # Este arquivo
├── settings.local.json       # Configurações locais
├── hooks.toml                # Hooks de automação
├── agents/                   # Agents especializados
│   ├── code-reviewer.md      # Revisão de código
│   ├── security-auditor.md   # Auditoria de segurança
│   ├── test-generator.md     # Geração de testes
│   ├── docs-engineer.md      # Documentação técnica
│   ├── dev-environment-specialist.md  # Ambiente de dev
│   └── config-optimizer.md   # Otimização de config
├── commands/                 # Slash commands customizados
│   ├── quick-audit.md        # Verificação rápida de saúde
│   ├── full-coverage.md      # Relatório de cobertura
│   ├── pr-ready.md           # Checklist pré-PR
│   └── browser-testing.md    # Testes E2E com MCP
├── skills/                   # Skills customizados (transcrever-video-para-curso, etc.)
└── docs-meta/               # Meta-documentação
    └── claude-md-modules/   # Módulos do CLAUDE.md
```

## Agents

### code-reviewer
**Propósito:** Revisar mudanças de código verificando correção, testes, segurança e convenções.
**Quando usar:** Antes de PRs, após implementar features, durante code review.

### security-auditor
**Propósito:** Realizar auditorias de segurança focando em secrets, vulnerabilidades e boas práticas.
**Quando usar:** Scans periódicos, antes de releases, após adicionar dependências.

### test-generator
**Propósito:** Criar, revisar e melhorar cobertura de testes usando Vitest.
**Quando usar:** Criar testes para novas features, melhorar cobertura, revisar qualidade.

### docs-engineer
**Propósito:** Gerar documentação técnica interna LLM-friendly.
**Quando usar:** Documentar componentes, criar contexto, gerar docs de arquitetura.

### dev-environment-specialist
**Propósito:** Configurar e manter ambiente de desenvolvimento com mise.
**Quando usar:** Setup inicial, troubleshooting, adicionar tasks mise.

### config-optimizer
**Propósito:** Diagnosticar, otimizar e evoluir configurações Claude Code.
**Quando usar:** Análise de configuração, adicionar agents/skills, otimizar settings.

## Slash Commands

### /quick-audit
Verificação rápida de saúde do projeto (lint, test, audit, git status).

### /full-coverage
Gerar relatório completo de cobertura de testes com análise.

### /pr-ready
Checklist abrangente pré-PR com verificações de qualidade e segurança.

### /browser-testing
Guia de testes E2E usando MCP Chrome DevTools.

## Uso

### Invocar Agents
```
"Use code-reviewer agent para revisar minhas mudanças"
"Use test-generator agent para criar testes para [arquivo]"
"Use security-auditor agent para fazer scan do codebase"
```

### Rodar Commands
```
/quick-audit
/full-coverage
/pr-ready
```

## Relação com .factory/

Este diretório `.claude/` é complementar ao `.factory/`:

| Ferramenta | .claude/ | .factory/ |
|------------|----------|-----------|
| Target | Claude Code CLI | Factory Droid CLI |
| Config Principal | CLAUDE.md (raiz) | AGENTS.md |
| Agents/Droids | agents/ | droids/ |
| Commands | commands/ | commands/ |

Ambos podem coexistir e servem ferramentas diferentes.

## Manutenção

### Adicionar Novo Agent
1. Criar arquivo em `agents/[nome].md`
2. Seguir formato dos agents existentes
3. Documentar propósito e quando usar
4. Atualizar este README

### Adicionar Novo Command
1. Criar arquivo em `commands/[nome].md`
2. Documentar o que faz, como usar, output esperado
3. Atualizar CLAUDE.md com a referência
4. Atualizar este README

### Atualizar Settings
1. Editar `settings.local.json`
2. Manter JSON válido
3. Testar permissões atualizadas

---

**Migrado de:** `.factory/` (Factory Droid)
**Data:** 2026-01-22 | **Atualizado:** 2026-02-10
**Versão:** 2.0.0 (Sprint 15 - Hub de Especialistas)
**Roles:** 5 (c_level, admin, instructor, student, specialist)
