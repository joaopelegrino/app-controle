# Deploy Overview

O app-controle pode ser deployado em diferentes ambientes. Esta documentacao cobre as opcoes disponiveis e as melhores praticas.

## Ambientes

| Ambiente | Uso | URL |
|----------|-----|-----|
| Local | Desenvolvimento | http://localhost:3001 |
| Fly.io | Demo/Producao | https://plataformab2b-demo.fly.dev |

---

## Arquitetura de Deploy

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Fly.io Edge                             │
│                    (SSL/TLS, CDN)                           │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│    Frontend (nginx)      │   │    Backend (NocoDB)     │
│    trainb2b-demo         │   │    trainb2b-api         │
│    256MB / shared-cpu    │   │    512MB / shared-cpu   │
└─────────────────────────┘   └─────────────────────────┘
                                          │
                                          ▼
                              ┌─────────────────────────┐
                              │    PostgreSQL           │
                              │    trainb2b-db          │
                              │    1GB / Development    │
                              └─────────────────────────┘
```

---

## Stack de Deploy

| Componente | Tecnologia | Descricao |
|------------|------------|-----------|
| Frontend | nginx + React | SPA servida via nginx |
| Backend | NocoDB | API REST auto-gerada |
| Database | PostgreSQL | Banco relacional |
| Platform | Fly.io | PaaS com scale to zero |
| CI/CD | GitHub Actions | Deploy automatico |

---

## Opcoes de Deploy

### 1. Fly.io (Recomendado)

**Vantagens:**
- Deploy direto de Docker
- SSL automatico
- Scale to zero (economia)
- Rede privada entre servicos
- Regiao Sao Paulo (baixa latencia)

**Custo:** ~$5-10/mes (dentro do free tier para demos)

[Documentacao completa: Fly.io](/docs/deploy-docs/flyio.md)

### 2. Docker Local

Para demonstracoes em ambiente controlado:

```sh
# Build da imagem
docker build -t trainb2b .

# Executar
docker run -p 8080:80 trainb2b
```

### 3. Vercel/Netlify

Para frontend estatico apenas (sem backend):

```sh
# Build
mise build

# Deploy via CLI
vercel deploy dist/
# ou
netlify deploy --prod --dir=dist
```

::: warning Sem Backend
Essas plataformas nao suportam o backend NocoDB. Use apenas para demos frontend-only com dados mock.
:::

---

## Pre-requisitos

### Para Fly.io

1. **Conta Fly.io**: https://fly.io/signup
2. **flyctl instalado**:
```sh
curl -L https://fly.io/install.sh | sh
```
3. **Autenticacao**:
```sh
flyctl auth login
```

### Para GitHub Actions

1. **Token Fly.io**:
```sh
flyctl tokens create deploy -x 999999h
```
2. **Configurar secret**:
```sh
gh secret set FLY_API_TOKEN
```

---

## Tasks de Deploy

O projeto inclui tasks mise para deploy:

```sh
# Verificar pre-requisitos
mise deploy:check

# Deploy para producao
mise deploy:prod

# Ver logs
mise deploy:logs

# Status da app
mise deploy:status

# Abrir no browser
mise deploy:open

# Pausar (economia)
mise deploy:suspend

# Reativar
mise deploy:resume
```

---

## Workflow de Deploy

### Manual

```sh
# 1. Testar localmente
mise test
mise build

# 2. Verificar pre-requisitos
mise deploy:check

# 3. Deploy
mise deploy:prod

# 4. Verificar
mise deploy:status
mise deploy:open
```

### Automatico (CI/CD)

O GitHub Actions executa automaticamente em cada push:

1. Instala dependencias
2. Executa testes
3. Faz build
4. Deploy para Fly.io

[Documentacao completa: CI/CD](/docs/deploy-docs/ci-cd.md)

---

## Monitoramento

### Logs

```sh
mise deploy:logs
```

### Status

```sh
mise deploy:status
```

### Health Check

A aplicacao tem endpoint de health check:

```
GET https://trainb2b-demo.fly.dev/
```

Retorna 200 OK se operacional.

---

## Custos

### Fly.io Free Tier

| Recurso | Incluido |
|---------|----------|
| VMs shared-cpu-1x | 3 unidades |
| Storage | 3GB |
| Bandwidth | 160GB/mes |

### Custo Estimado (Demo)

| Recurso | Custo |
|---------|-------|
| Frontend (256MB) | ~$2/mes |
| Backend (512MB) | ~$4/mes |
| PostgreSQL (1GB) | ~$2/mes |
| **Total** | **~$8/mes** |

::: tip Scale to Zero
Com `auto_stop_machines = "stop"`, a app para quando inativa, reduzindo custos.
:::

---

## Proximos Passos

- [Deploy Fly.io](/docs/deploy-docs/flyio.md) - Guia detalhado
- [CI/CD](/docs/deploy-docs/ci-cd.md) - Integracao continua
- [Troubleshooting](/docs/guide/faq.md#deploy) - Problemas comuns
