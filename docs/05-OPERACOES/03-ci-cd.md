# CI/CD

O app-controle usa GitHub Actions para integracao e deploy continuo.

## Visao Geral

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Push      │────▶│   Tests     │────▶│   Build     │────▶│   Deploy    │
│   to Git    │     │   & Lint    │     │             │     │   Fly.io    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

---

## Workflow Principal

### Arquivo

`.github/workflows/fly-deploy.yml`

### Triggers

```yaml
on:
  push:
    branches: [main, desenvolvimento]
  workflow_dispatch:  # Manual
```

### Jobs

1. **Setup** - Instala mise e dependencias
2. **Lint** - Verifica codigo com ESLint
3. **Test** - Executa testes unitarios
4. **Security** - Scan de secrets com gitleaks
5. **Build** - Compila para producao
6. **Deploy** - Envia para Fly.io

---

## Configuracao Completa

```yaml
name: Deploy to Fly.io

on:
  push:
    branches: [main, desenvolvimento]
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy app
    runs-on: ubuntu-latest
    concurrency: deploy-group

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup mise
        uses: jdx/mise-action@v2

      - name: Install dependencies
        run: mise run install

      - name: Run lint
        run: mise run lint

      - name: Run tests
        run: mise run test

      - name: Security scan
        run: mise run security:scan
        continue-on-error: true

      - name: Build
        run: mise run build
        env:
          VITE_PLATFORM_NAME: ${{ vars.VITE_PLATFORM_NAME }}

      - name: Setup Fly.io CLI
        uses: superfly/flyctl-actions/setup-flyctl@master

      - name: Deploy to Fly.io
        run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

---

## Secrets e Variables

### Secrets (Dados Sensiveis)

Configurados em: Settings > Secrets > Actions

| Secret | Descricao | Obrigatorio |
|--------|-----------|-------------|
| `FLY_API_TOKEN` | Token de deploy Fly.io | Sim |
| `VITE_API_BASE_URL` | URL da API (se sensivel) | Nao |

### Variables (Publicas)

Configurados em: Settings > Variables > Actions

| Variable | Descricao | Exemplo |
|----------|-----------|---------|
| `VITE_PLATFORM_NAME` | Nome da plataforma | Sulical Demo |
| `VITE_PLATFORM_SHORT_NAME` | Nome curto | Sulical |
| `VITE_STORAGE_PREFIX` | Prefixo localStorage | sulical |

---

## Configurar Secrets

### Via GitHub CLI

```sh
# Gerar token Fly.io
flyctl tokens create deploy -x 999999h

# Configurar no GitHub
gh secret set FLY_API_TOKEN
# Cole o token quando solicitado

# Verificar
gh secret list
```

### Via Interface Web

1. Acesse: `https://github.com/<user>/<repo>/settings/secrets/actions`
2. Clique em "New repository secret"
3. Nome: `FLY_API_TOKEN`
4. Valor: Token gerado pelo flyctl

---

## Configurar Variables

### Via GitHub CLI

```sh
gh variable set VITE_PLATFORM_NAME --body "Sulical Demo"
gh variable set VITE_PLATFORM_SHORT_NAME --body "Sulical"
gh variable set VITE_STORAGE_PREFIX --body "sulical"

# Verificar
gh variable list
```

---

## Execucao Manual

### Disparar Workflow

```sh
gh workflow run fly-deploy.yml
```

### Acompanhar

```sh
gh run watch
```

### Ver Logs

```sh
gh run list
gh run view <run-id> --log
```

---

## Monitoramento

### Status das Execucoes

```sh
gh run list
```

### Detalhes de uma Execucao

```sh
gh run view <run-id>
```

### Logs em Tempo Real

```sh
gh run watch
```

---

## Branches e Ambientes

### Estrategia Atual

| Branch | Deploy | Ambiente |
|--------|--------|----------|
| `main` | Automatico | Producao |
| `desenvolvimento` | Automatico | Staging |
| `feature/*` | Nenhum | - |

### Configurar Ambientes

Para deploys condicionais por ambiente:

```yaml
jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/desenvolvimento'
    environment: staging
    # ...

  deploy-production:
    if: github.ref == 'refs/heads/main'
    environment: production
    # ...
```

---

## Cache

### Cache de Dependencias

O mise-action ja gerencia cache automaticamente.

### Cache Manual (Opcional)

```yaml
- name: Cache bun modules
  uses: actions/cache@v4
  with:
    path: ~/.bun/install/cache
    key: ${{ runner.os }}-bun-${{ hashFiles('bun.lock') }}
```

---

## Notificacoes

### Slack (Exemplo)

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    fields: repo,message,commit,author
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Discord (Exemplo)

```yaml
- name: Notify Discord
  if: failure()
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    status: ${{ job.status }}
```

---

## Troubleshooting

### Build Falha

```sh
# Ver logs detalhados
gh run view <run-id> --log-failed

# Re-executar
gh run rerun <run-id>
```

### Token Expirado

```sh
# Gerar novo token
flyctl tokens create deploy -x 999999h

# Atualizar secret
gh secret set FLY_API_TOKEN
```

### Testes Falhando no CI

```sh
# Rodar localmente para comparar
mise test:all
```

### Deploy Trava

Verifique concurrency:

```yaml
concurrency:
  group: deploy-group
  cancel-in-progress: false  # Nao cancela deploys em andamento
```

---

## Boas Praticas

1. **Nunca commite secrets** - Use GitHub Secrets
2. **Teste localmente antes de push** - `mise test:all`
3. **Use branches para features** - Merge para `desenvolvimento` para testar
4. **Monitore custos** - Configure alertas no Fly.io
5. **Revise logs de falha** - `gh run view --log-failed`

---

## Referencias

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [mise-action](https://github.com/jdx/mise-action)
- [flyctl-actions](https://github.com/superfly/flyctl-actions)
