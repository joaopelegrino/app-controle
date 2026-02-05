# Tasks

O app-controle usa [mise tasks](https://mise.jdx.dev/tasks/) para automatizar todas as operacoes de desenvolvimento. Similar ao `make`, mas com sintaxe TOML moderna e integracao com ferramentas de desenvolvimento.

## Visao Geral

Para listar todas as tasks disponiveis:

```sh
mise tasks
```

Para executar uma task:

```sh
mise run <task-name>
# ou simplesmente
mise <task-name>
```

---

## Desenvolvimento

Tasks para desenvolvimento diario do frontend.

### `dev`

Inicia o servidor de desenvolvimento com hot-reload.

```sh
mise dev
```

- **URL**: http://localhost:3001
- **Runtime**: Vite + Bun
- **Hot Reload**: Ativado

### `build`

Compila o projeto para producao.

```sh
mise build
```

- **Output**: `dist/`
- **Otimizacoes**: Minificacao, tree-shaking, code-splitting

### `test`

Executa testes unitarios com Vitest.

```sh
mise test
```

- **Framework**: Vitest
- **Coverage**: Disponivel com `bun run test:coverage`

### `lint`

Verifica codigo com ESLint.

```sh
mise lint
```

- **Regras**: Configuradas em `eslint.config.js`
- **Auto-fix**: `bun run lint --fix`

### `preview`

Preview do build de producao localmente.

```sh
mise preview
```

- **URL**: http://localhost:4173
- **Uso**: Testar build antes de deploy

### `install`

Instala dependencias do projeto.

```sh
mise install
```

- **Runtime**: Bun (35x mais rapido que npm)
- **Lockfile**: `bun.lock`

---

## Backend (NocoDB)

Tasks para gerenciar o backend PostgreSQL + NocoDB.

### `nocodb:setup`

Setup completo do backend (primeira vez).

```sh
mise nocodb:setup
```

Executa:
1. Copia `.env.nocodb.example` para `.env.nocodb`
2. Inicia containers Docker
3. Aguarda servicos iniciarem

### `nocodb:start`

Inicia containers do backend.

```sh
mise nocodb:start
```

- **PostgreSQL**: localhost:5432
- **NocoDB**: http://localhost:8081

### `nocodb:stop`

Para containers do backend.

```sh
mise nocodb:stop
```

### `nocodb:restart`

Reinicia containers.

```sh
mise nocodb:restart
```

### `nocodb:logs`

Mostra logs do NocoDB em tempo real.

```sh
mise nocodb:logs
```

Use `Ctrl+C` para sair.

### `nocodb:health`

Verifica status de todos os servicos.

```sh
mise nocodb:health
```

Output esperado:
```
🔍 Verificando NocoDB...
✅ Containers rodando
✅ PostgreSQL: OK
✅ NocoDB: OK (http://localhost:8081)
✅ Dados seed: 13 usuarios carregados
```

### `nocodb:reset`

Reseta o banco de dados (CUIDADO: deleta todos os dados!).

```sh
mise nocodb:reset
```

::: warning Acao Destrutiva
Esta task deleta TODOS os dados do banco. Sera pedida confirmacao antes de executar.
:::

### `db:verify`

Verifica dados no PostgreSQL.

```sh
mise db:verify
```

Output:
```
  tipo    | total
----------+-------
 Empresas |     2
 Usuarios |    13
 Modulos  |    17
 Progresso|     5
```

---

## Testes E2E

Tasks para testes end-to-end com Playwright.

### `e2e:ui`

Executa testes E2E com interface grafica.

```sh
mise e2e:ui
```

- **Requisitos**: Dev server e NocoDB rodando
- **Interface**: Playwright Test Runner

### `e2e:headless`

Executa testes E2E em modo headless (CI/CD).

```sh
mise e2e:headless
```

- **Modo**: Sem interface grafica
- **Uso**: Integracao continua

### `e2e:install`

Instala browsers para Playwright.

```sh
mise e2e:install
```

Instala Chromium, Firefox e WebKit.

---

## Workflows Completos

Tasks que combinam multiplas operacoes.

### `full-stack`

Inicia frontend + backend em um comando.

```sh
mise full-stack
```

- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:8081
- **Parar**: `Ctrl+C` (frontend) + `mise nocodb:stop`

### `setup`

Setup completo do projeto (primeira vez).

```sh
mise setup
```

Executa:
1. `mise install` - Ferramentas
2. `mise nocodb:setup` - Backend
3. `mise e2e:install` - Browsers Playwright

### `check`

Verifica se todo o ambiente esta funcionando.

```sh
mise check
```

### `test:all`

Executa todos os testes (lint + unit + e2e).

```sh
mise test:all
```

---

## Seguranca

Tasks para verificacao de seguranca.

### `security:scan`

Verifica secrets no codigo com gitleaks.

```sh
mise security:scan
```

- **Ferramenta**: [gitleaks](https://github.com/gitleaks/gitleaks)
- **Escopo**: Todo o repositorio

### `security:scan-staged`

Verifica secrets apenas em arquivos staged.

```sh
mise security:scan-staged
```

- **Uso**: Pre-commit hook
- **Escopo**: Apenas arquivos em `git add`

---

## Deploy (Fly.io)

Tasks para deploy em producao.

### `deploy:check`

Verifica pre-requisitos para deploy.

```sh
mise deploy:check
```

Verifica:
- flyctl instalado
- Autenticacao Fly.io
- App existe
- GitHub CLI configurado

### `deploy:prod`

Deploy para Fly.io.

```sh
mise deploy:prod
```

- **Dependencias**: Executa `build` e `test` antes
- **URL**: https://trainb2b-demo.fly.dev

### `deploy:logs`

Ver logs da aplicacao em producao.

```sh
mise deploy:logs
```

### `deploy:status`

Status da aplicacao no Fly.io.

```sh
mise deploy:status
```

### `deploy:open`

Abre a aplicacao no navegador.

```sh
mise deploy:open
```

### `deploy:suspend`

Pausa a aplicacao (economia de custos).

```sh
mise deploy:suspend
```

::: tip Economia
Apps pausadas nao consomem recursos. Ideal para demos temporarias.
:::

### `deploy:resume`

Reativa aplicacao pausada.

```sh
mise deploy:resume
```

---

## Utilitarios

### `clean`

Limpa cache e node_modules.

```sh
mise clean
```

### `fresh`

Reinstala tudo do zero.

```sh
mise fresh
```

### `docs`

Mostra links de documentacao.

```sh
mise docs
```

### `help`

Lista todas as tasks disponiveis.

```sh
mise help
```

### `chrome-debug`

Inicia Chrome com remote debugging (para MCP).

```sh
mise chrome-debug
```

---

## Variaveis de Ambiente

As tasks tem acesso a estas variaveis:

| Variavel | Valor | Descricao |
|----------|-------|-----------|
| `PROJECT_NAME` | ultrathink | Nome do projeto |
| `PROJECT_TYPE` | react-vite-bun | Stack tecnologica |
| `NODE_ENV` | development | Ambiente |
| `VITE_PORT` | 3001 | Porta do dev server |
| `NOCODB_URL` | http://localhost:8081 | URL do backend |

---

## Criando Novas Tasks

Para adicionar uma task, edite `.mise.toml`:

```toml
[tasks.minha-task]
description = "Descricao da minha task"
run = """
#!/bin/bash
echo "Executando minha task..."
# Seus comandos aqui
"""
```

Para tasks com dependencias:

```toml
[tasks.deploy]
description = "Deploy completo"
depends = ["build", "test"]  # Executa antes
run = "flyctl deploy"
```

::: info Documentacao Oficial
Veja a [documentacao do mise](https://mise.jdx.dev/tasks/) para opcoes avancadas como:
- Tasks paralelas
- Watch mode
- Arguments e flags
- Outputs e caching
:::
