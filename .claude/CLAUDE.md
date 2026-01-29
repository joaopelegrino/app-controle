---
Tipo: Contexto de Projeto
Nome: app-controle
Descricao: Plataforma B2B de treinamento tecnico corporativo
Versao: v10.0.2
Data: 2026-01-29
Stack: React + Vite + Bun + NocoDB + PostgreSQL
Healthcare: false
Changelog: |
  v10.0.2 - Secao Deploy Fly.io, tasks mise deploy:*, conformidade acoes-usuario
  v10.0.1 - Conformidade com ambiente-centralizado, frontmatter padrao
  v10.0.0 - Sprint 14 CRUD Cursos completo
  v9.0.0 - Sprint 13 White-Label refactor
Diretrizes: contextos/globais/SISTEMA_PROGRAMACAO/metodo-agent/ambiente-centralizado/
---

# app-controle (Plataforma B2B) - Configuracao Claude Code

> **Version:** 10.0.2 | **Date:** 2026-01-29 | **Status:** Production + i18n + White-Label + CRUD Cursos + Deploy
> **Project Type:** Plataforma B2B de treinamento tecnico corporativo
> **Sprint Atual:** 14 - CRUD de Cursos COMPLETO (1 US)
> **Sprints Completos:** 6, 7, 8, 9, 10, 11, 12, 13, 14

---

## Diretrizes de Ambiente (Conformidade)

> **Fonte:** `estrutura-padrao/contextos/globais/SISTEMA_PROGRAMACAO/metodo-agent/ambiente-centralizado/`

| Diretriz | Arquivo | Aplicacao neste Projeto |
|----------|---------|------------------------|
| Principios | `01-principios.md` | SSOT, Declarativo, Idempotencia |
| Mise Config | `02-mise-config.md` | Tasks, Hooks, Templates |
| Chezmoi | `03-chezmoi-config.md` | Dotfiles (ambiente global) |
| Seguranca | `04-enriquecimento-seguranca.md` | gitleaks RECOMENDADO |

### Conformidade Atual

| Criterio | Status | Observacao |
|----------|--------|------------|
| `.mise.toml` presente | ✅ SIM | 600+ linhas, 53+ tasks |
| Hooks enter/leave | ✅ SIM | Menu interativo |
| bun como runtime | ✅ SIM | Nao usa npm |
| Security Tools | ✅ SIM | gitleaks configurado |
| Tasks deploy:* | ✅ SIM | 7 tasks Fly.io |
| Tasks security:* | ✅ SIM | 2 tasks gitleaks |
| Lockfile mise | ✅ SIM | `lockfile = true` |
| Feature Flags | NAO | Implementar |
| CLAUDE.md em .claude/ | ✅ SIM | Este arquivo |
| Docs deploy alinhados | ✅ SIM | Conformidade acoes-usuario |

### Proximas Acoes (Opcional)

| Acao | Prioridade | Descricao |
|------|------------|-----------|
| Feature Flags | P3 | Implementar sistema de feature flags |
| Paranoid Mode | P3 | Habilitar para producao |

---

## Quick Start

```bash
# Desenvolvimento (Frontend apenas - dados mock)
bun run dev          # Servidor local porta 3001 (ou 3000 se livre)
bun run build        # Build de producao
bun run test         # Rodar testes com Vitest

# Com Backend (requer Docker Desktop + WSL2 Integration)
# 1. Ativar Docker Desktop com "Use WSL 2 based engine"
# 2. Habilitar integracao WSL em Settings > Resources > WSL Integration
docker compose up -d           # Inicia PostgreSQL + NocoDB
bun run dev                    # Frontend conecta ao backend

# Alternativa com mise
mise nocodb:start              # Backend (PostgreSQL + NocoDB)
mise full-stack                # Frontend + Backend
```

---

## Principios do Projeto (Conformidade ambiente-centralizado)

### SSOT (Single Source of Truth)

| Tipo | SSOT | Localizacao |
|------|------|-------------|
| Ferramentas | `.mise.toml` | Raiz do projeto |
| Configuracao | `src/config/platform.js` | Centralizado |
| Traducoes | `public/locales/` | i18n |
| Backend | NocoDB + PostgreSQL | Docker |

### Declarativo sobre Imperativo

```bash
# BOM: Declarativo via mise
mise run dev
mise run nocodb:start

# RUIM: Imperativo
# npm run dev (usar bun)
# docker-compose up (usar mise task)
```

---

## Feature Flags

> **TODO:** Implementar feature flags conforme diretrizes

```bash
# Sugestao baseada em flusistip:
export FEATURE_DARK_MODE=true
export FEATURE_EXPORT_PDF=false
export FEATURE_MULTI_TENANT=true
```

---

## Ambiente

| Servico | URL | Comando |
|---------|-----|---------|
| Frontend | http://localhost:3001 | `bun run dev` |
| NocoDB | http://localhost:8081 | `mise nocodb:start` |
| PostgreSQL | localhost:5432 | Via Docker |

---

## Commands Disponiveis

### Desenvolvimento

| Command | Funcao |
|---------|--------|
| `mise run dev` | Start frontend |
| `mise run build` | Build producao |
| `mise run test` | Testes Vitest |
| `mise run lint` | Linting |
| `mise run nocodb:start` | Backend containers |
| `mise run full-stack` | Frontend + Backend |
| `mise run help` | Lista todos comandos |

### Deploy Fly.io

> **Referencia:** `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md`

| Command | Funcao |
|---------|--------|
| `mise run deploy:check` | Verifica pre-requisitos |
| `mise run deploy:prod` | Deploy para Fly.io |
| `mise run deploy:logs` | Logs em tempo real |
| `mise run deploy:status` | Status da aplicacao |
| `mise run deploy:open` | Abrir no browser |
| `mise run deploy:suspend` | Pausar (economia) |
| `mise run deploy:resume` | Reativar app |

### Seguranca

| Command | Funcao |
|---------|--------|
| `mise run security:scan` | Scan gitleaks completo |
| `mise run security:scan-staged` | Scan arquivos staged |

---

## Credenciais de Demo

```
Senha padrao: Demo@2026

ACME TECH SOLUTIONS:
  ceo@acmetech.com       (c_level)   -> /admin/executive
  admin@acmetech.com     (admin)     -> /admin
  prof@acmetech.com      (instructor)-> /instructor
  maria@acmetech.com     (student)   -> /dashboard

DEVCORP CONSULTING:
  cto@devcorp.com        (c_level)   -> /admin/executive
  admin@devcorp.com      (admin)     -> /admin
  prof@devcorp.com       (instructor)-> /instructor
  julia@devcorp.com      (student)   -> /dashboard
```

---

## Regras (Conformidade)

### SEMPRE
- Usar `bun` (nao npm/yarn)
- Verificar `GAPS-DEMO-B2B.md` antes de implementar
- Rodar testes antes de commit
- Seguir padroes Tailwind existentes
- Usar paths absolutos em documentacao

### NUNCA
- Usar npm/yarn (somente Bun)
- Commitar sem rodar testes
- Implementar sem verificar permissao RBAC
- Commitar credentials ou `.env` files
- Usar comandos destrutivos git (force push, hard reset)

---

## Ambiente WSL2/Windows

> Detalhes em arquivo legado: `/home/notebook/workspace/app-controle/CLAUDE.md` (raiz)

| Item | Valor |
|------|-------|
| Distro | Ubuntu 24.04.3 LTS |
| Shell | Zsh 5.9 |
| Projeto | `/home/notebook/workspace/app-controle` |
| Runtime | Bun 1.3.3 via mise |
| Docker | Desktop 29.1.3 com WSL2 Integration |

---

## Referencias

| Documento | Path |
|-----------|------|
| Gaps | `docs/backlog/GAPS-DEMO-B2B.md` v5.0.0 |
| Roadmap | `docs/backlog/ROADMAP.md` v6.0.0 |
| Deploy Fly.io | `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md` v1.1 |
| Acoes Usuario | `docs/backlog/acoes-usuario/ACOES-PENDENTES.md` |
| Diretrizes Ambiente | `estrutura-padrao/.../ambiente-centralizado/` |
| Arquivo Original | `/home/notebook/workspace/app-controle/CLAUDE.md` |

---

*app-controle v10.0.2 | 2026-01-29 | Conformidade ambiente-centralizado + Deploy Fly.io*
*Stack: React + Vite + Bun + NocoDB + PostgreSQL*
*RBAC: 82% (18/22 permissoes) | i18n: pt-BR, en-US, es-ES*
*Tasks: 53+ (dev, deploy:*, security:*, nocodb:*)*
