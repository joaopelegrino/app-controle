# CLI Reference

Referencia completa de todos os comandos disponiveis via `mise` no projeto app-controle.

## Uso Geral

```sh
mise <task>           # Executar task
mise run <task>       # Formato explicito
mise tasks            # Listar todas as tasks
mise help             # Ajuda
```

---

## Desenvolvimento

### dev

Inicia servidor de desenvolvimento.

```sh
mise dev
```

| Opcao | Padrao | Descricao |
|-------|--------|-----------|
| - | - | Sem opcoes |

**Variaveis de Ambiente:**
- `VITE_PORT` - Porta do servidor (default: 3001)

**Output:** http://localhost:3001

---

### build

Compila para producao.

```sh
mise build
```

**Output:** `dist/`

---

### test

Executa testes unitarios.

```sh
mise test
```

**Framework:** Vitest

---

### lint

Verifica codigo com ESLint.

```sh
mise lint
```

**Auto-fix:** `bun run lint --fix`

---

### install

Instala dependencias.

```sh
mise install
```

**Runtime:** Bun

---

### preview

Preview do build de producao.

```sh
mise preview
```

**Output:** http://localhost:4173

---

### clean

Limpa cache e node_modules.

```sh
mise clean
```

**Remove:** `node_modules/`, `dist/`, `.vite/`

---

### fresh

Reinstala tudo do zero.

```sh
mise fresh
```

**Executa:** clean + install

---

## Backend (NocoDB)

### nocodb:setup

Setup completo do backend.

```sh
mise nocodb:setup
```

**Executa:**
1. Copia `.env.nocodb.example` para `.env.nocodb`
2. Inicia containers Docker
3. Aguarda servicos

---

### nocodb:start

Inicia containers.

```sh
mise nocodb:start
```

**Services:**
- PostgreSQL: localhost:5432
- NocoDB: http://localhost:8081

---

### nocodb:stop

Para containers.

```sh
mise nocodb:stop
```

---

### nocodb:restart

Reinicia containers.

```sh
mise nocodb:restart
```

---

### nocodb:logs

Logs em tempo real.

```sh
mise nocodb:logs
```

**Sair:** Ctrl+C

---

### nocodb:health

Verifica status dos servicos.

```sh
mise nocodb:health
```

**Output:**
```
✅ Containers rodando
✅ PostgreSQL: OK
✅ NocoDB: OK
✅ Dados seed: 13 usuarios
```

---

### nocodb:reset

Reseta banco de dados.

```sh
mise nocodb:reset
```

::: warning Destrutivo
Deleta TODOS os dados. Pede confirmacao.
:::

---

### db:verify

Verifica dados no PostgreSQL.

```sh
mise db:verify
```

**Output:** Contagem de registros por tabela

---

## Testes E2E

### e2e:ui

Testes E2E com interface grafica.

```sh
mise e2e:ui
```

**Requisitos:**
- Dev server rodando
- NocoDB rodando

---

### e2e:headless

Testes E2E headless.

```sh
mise e2e:headless
```

**Uso:** CI/CD

---

### e2e:install

Instala browsers Playwright.

```sh
mise e2e:install
```

**Browsers:** Chromium, Firefox, WebKit

---

## Workflows

### full-stack

Inicia frontend + backend.

```sh
mise full-stack
```

**Services:**
- Frontend: http://localhost:3001
- Backend: http://localhost:8081

---

### setup

Setup completo do projeto.

```sh
mise setup
```

**Executa:**
1. `mise install`
2. `mise nocodb:setup`
3. `mise e2e:install`

---

### check

Verifica ambiente completo.

```sh
mise check
```

**Verifica:**
- Ferramentas instaladas
- Dev server
- NocoDB
- Dependencias

---

### test:all

Todos os testes.

```sh
mise test:all
```

**Executa:** lint → unit → e2e

---

## Seguranca

### security:scan

Scan de secrets com gitleaks.

```sh
mise security:scan
```

**Escopo:** Todo o repositorio

---

### security:scan-staged

Scan apenas arquivos staged.

```sh
mise security:scan-staged
```

**Uso:** Pre-commit

---

## Deploy

### deploy:check

Verifica pre-requisitos.

```sh
mise deploy:check
```

**Verifica:**
- flyctl instalado
- Autenticacao Fly.io
- App existe

---

### deploy:prod

Deploy para Fly.io.

```sh
mise deploy:prod
```

**Dependencias:** build, test

---

### deploy:logs

Logs da aplicacao em producao.

```sh
mise deploy:logs
```

---

### deploy:status

Status da aplicacao.

```sh
mise deploy:status
```

---

### deploy:open

Abre no browser.

```sh
mise deploy:open
```

**URL:** https://trainb2b-demo.fly.dev

---

### deploy:suspend

Pausa aplicacao.

```sh
mise deploy:suspend
```

**Uso:** Economia de custos

---

### deploy:resume

Reativa aplicacao.

```sh
mise deploy:resume
```

---

## Utilitarios

### docs

Links de documentacao.

```sh
mise docs
```

---

### help

Lista todas as tasks.

```sh
mise help
```

Equivalente a `mise tasks`.

---

### chrome-debug

Chrome com remote debugging.

```sh
mise chrome-debug
```

**Uso:** Testes MCP

---

## Variaveis de Ambiente

Variaveis configuradas no `.mise.toml`:

| Variavel | Valor | Descricao |
|----------|-------|-----------|
| `PROJECT_NAME` | ultrathink | Nome do projeto |
| `PROJECT_TYPE` | react-vite-bun | Stack |
| `NODE_ENV` | development | Ambiente |
| `VITE_PORT` | 3001 | Porta dev server |
| `NOCODB_URL` | http://localhost:8081 | URL backend |
| `VITE_API_URL` | http://localhost:3001 | URL API |
| `BAT_THEME` | Catppuccin Mocha | Tema do bat |
| `MISE_YES` | true | Auto-confirm |

---

## Aliases

```sh
# Versoes de ferramentas
bun@latest     → 1.3.3
node@lts       → 24.11.1
python@default → 3.12
```

---

## Exit Codes

| Codigo | Significado |
|--------|-------------|
| 0 | Sucesso |
| 1 | Erro generico |
| 2 | Requisito nao atendido |
| 130 | Interrompido (Ctrl+C) |

---

## Ver Tambem

- [Tasks](/docs/development/tasks.md) - Documentacao detalhada
- [Tools](/docs/development/tools.md) - Ferramentas instaladas
- [Configuration](/docs/development/configuration.md) - Configuracao
