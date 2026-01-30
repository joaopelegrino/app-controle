# Deploy Fly.io

Guia completo para fazer deploy do app-controle no [Fly.io](https://fly.io).

## Pre-requisitos

1. **Conta Fly.io**: https://fly.io/signup
2. **flyctl CLI**:
```sh
curl -L https://fly.io/install.sh | sh
```
3. **Autenticacao**:
```sh
flyctl auth login
```

---

## Configuracao Inicial

### Criar App

```sh
flyctl launch --name trainb2b-demo --region gru --no-deploy
```

- **Nome**: trainb2b-demo
- **Regiao**: gru (Sao Paulo)
- **No deploy**: Apenas cria a app

### Arquivo fly.toml

O projeto ja inclui um `fly.toml` configurado:

```toml
app = "trainb2b-demo"
primary_region = "gru"

[build]
  dockerfile = "Dockerfile"

[env]
  VITE_PLATFORM_NAME = "TrainB2B Demo"
  VITE_PLATFORM_SHORT_NAME = "TrainB2B"

[http_service]
  internal_port = 80
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[vm]]
  memory = "256mb"
  cpu_kind = "shared"
  cpus = 1

[checks]
  [checks.health]
    grace_period = "10s"
    interval = "30s"
    method = "GET"
    path = "/"
    port = 80
    timeout = "5s"
    type = "http"
```

---

## Deploy

### Verificar Pre-requisitos

```sh
mise deploy:check
```

### Deploy Manual

```sh
mise deploy:prod
```

Ou diretamente:

```sh
flyctl deploy --remote-only
```

### Verificar Status

```sh
mise deploy:status
```

### Abrir no Browser

```sh
mise deploy:open
```

---

## Secrets e Variaveis

### Secrets (Dados Sensiveis)

```sh
# Configurar via CLI
flyctl secrets set VITE_API_BASE_URL=https://trainb2b-api.fly.dev

# Listar
flyctl secrets list
```

### Variaveis de Build (Publicas)

Configuradas no `fly.toml`:

```toml
[env]
  VITE_PLATFORM_NAME = "TrainB2B Demo"
```

Ou via CLI:

```sh
flyctl config set VITE_PLATFORM_NAME="TrainB2B Demo"
```

---

## Regioes

### Regioes Recomendadas

| Regiao | Codigo | Latencia Brasil |
|--------|--------|-----------------|
| Sao Paulo | `gru` | ~5ms (melhor) |
| Rio de Janeiro | `gig` | ~10ms |
| Miami | `mia` | ~120ms |

### Mudar Regiao

```sh
flyctl regions add gru
flyctl regions remove iad
```

---

## Scale

### Aumentar Memoria

```sh
flyctl scale memory 512
```

### Multiplas Instancias

```sh
flyctl scale count 2
```

### Verificar

```sh
flyctl scale show
```

---

## PostgreSQL

### Criar Cluster

```sh
flyctl postgres create \
  --name trainb2b-db \
  --region gru \
  --initial-cluster-size 1 \
  --vm-size shared-cpu-1x \
  --volume-size 1
```

### Conectar App ao Banco

```sh
flyctl postgres attach trainb2b-db --app trainb2b-demo
```

A string de conexao e adicionada automaticamente como secret `DATABASE_URL`.

### Executar Migrations

```sh
flyctl ssh console -a trainb2b-demo -C "psql \$DATABASE_URL < /app/database/migration-001-rbac.sql"
```

### Acessar psql

```sh
flyctl postgres connect -a trainb2b-db
```

---

## NocoDB no Fly.io

Para backend completo com NocoDB, crie um arquivo `fly.nocodb.toml`:

```toml
app = "trainb2b-api"
primary_region = "gru"

[build]
  image = "nocodb/nocodb:latest"

[env]
  NC_DB = "pg://trainb2b-db.internal:5432/nocodb"
  NC_PUBLIC_URL = "https://trainb2b-api.fly.dev"

[http_service]
  internal_port = 8080
  force_https = true

[[vm]]
  memory = "512mb"
  cpu_kind = "shared"
  cpus = 1

[mounts]
  source = "nocodb_data"
  destination = "/usr/app/data"
```

Deploy:

```sh
flyctl deploy --config fly.nocodb.toml
```

---

## Logs e Debugging

### Logs em Tempo Real

```sh
mise deploy:logs
```

Ou:

```sh
flyctl logs -a trainb2b-demo
```

### SSH na Maquina

```sh
flyctl ssh console -a trainb2b-demo
```

### Verificar Configuracao

```sh
flyctl config show -a trainb2b-demo
```

---

## Economia de Custos

### Pausar App

```sh
mise deploy:suspend
```

A app para completamente, sem custos de compute.

### Reativar

```sh
mise deploy:resume
```

### Scale to Zero Automatico

O `fly.toml` ja configura:

```toml
[http_service]
  auto_stop_machines = "stop"   # Para apos inatividade
  auto_start_machines = true    # Inicia em nova requisicao
  min_machines_running = 0      # Permite parar completamente
```

---

## CI/CD com GitHub Actions

### Gerar Token

```sh
flyctl tokens create deploy -x 999999h
```

Copie o token completo (incluindo `FlyV1 `).

### Configurar Secret no GitHub

```sh
gh secret set FLY_API_TOKEN
# Cole o token quando solicitado
```

### Workflow

O projeto ja inclui `.github/workflows/fly-deploy.yml`:

```yaml
- name: Deploy to Fly.io
  run: flyctl deploy --remote-only
  env:
    FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

---

## Billing

### Verificar Uso

```sh
flyctl billing show
```

### Limites Recomendados

Configure alertas de custo em https://fly.io/dashboard/billing:

| Limite | Valor |
|--------|-------|
| Soft Limit | $5 |
| Hard Limit | $10 |

### Custos Tipicos

| Recurso | Custo/mes |
|---------|-----------|
| VM 256MB | ~$1.94 |
| VM 512MB | ~$3.88 |
| PostgreSQL 1GB | ~$2.00 |
| Bandwidth (160GB) | Gratuito |

---

## Troubleshooting

### Deploy Falha

```sh
# Ver logs de build
flyctl logs -a trainb2b-demo --instance build

# Verificar Dockerfile
docker build -t test .
docker run -p 8080:80 test
```

### App nao Inicia

```sh
# Verificar configuracao
flyctl config show

# Ver logs
flyctl logs

# SSH para debug
flyctl ssh console
```

### 502 Bad Gateway

A app ainda esta iniciando. Aguarde ou aumente timeout:

```toml
[checks.health]
  grace_period = "30s"
```

### Memoria Insuficiente

```sh
flyctl scale memory 512
```

---

## Referencias

- [Fly.io Docs](https://fly.io/docs)
- [Fly.io Pricing](https://fly.io/docs/about/pricing/)
- [flyctl Reference](https://fly.io/docs/flyctl/)
