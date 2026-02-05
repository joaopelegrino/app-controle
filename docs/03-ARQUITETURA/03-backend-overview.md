# Backend Overview

O app-controle utiliza uma arquitetura de backend baseada em NocoDB + PostgreSQL, fornecendo uma API REST auto-gerada com interface administrativa.

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend React                          │
│                    (http://localhost:3001)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         NocoDB                               │
│                    (http://localhost:8081)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  REST API   │  │  Admin UI   │  │  Auth JWT   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ SQL
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       PostgreSQL                             │
│                    (localhost:5432)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   users     │  │   courses   │  │  companies  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## Componentes

### NocoDB

[NocoDB](https://nocodb.com) e uma alternativa open-source ao Airtable que:

- Gera API REST automaticamente a partir do schema SQL
- Fornece interface administrativa visual
- Suporta autenticacao JWT
- Permite criar views, filtros e formularios

**URL Local**: http://localhost:8081

### PostgreSQL

Banco de dados relacional que armazena:

- Usuarios e empresas
- Cursos e modulos
- Progresso e notas
- Matriculas

**Porta**: 5432

---

## Tabelas Principais

| Tabela | Descricao | Registros Demo |
|--------|-----------|----------------|
| `companies` | Empresas clientes | 2 |
| `users` | Usuarios do sistema | 13 |
| `courses` | Cursos disponiveis | 2 |
| `modules` | Modulos dos cursos | 17 |
| `user_progress` | Progresso dos usuarios | Dinamico |
| `enrollments` | Matriculas | Dinamico |
| `user_notes` | Notas dos usuarios | Dinamico |

---

## Iniciar Backend

### Primeira Vez

```sh
mise nocodb:setup
```

Isso cria o arquivo `.env.nocodb` e inicia os containers.

### Subsequentes

```sh
mise nocodb:start
```

### Verificar Status

```sh
mise nocodb:health
```

### Parar

```sh
mise nocodb:stop
```

---

## Credenciais

### NocoDB Admin

| Campo | Valor |
|-------|-------|
| URL | http://localhost:8081 |
| Email | admin@ultrathink.com |
| Senha | UltraThink@Admin2026! |

### PostgreSQL

| Campo | Valor |
|-------|-------|
| Host | localhost |
| Port | 5432 |
| User | nocodb_user |
| Password | (ver .env.nocodb) |
| Database | app_controle |

---

## API REST

### Base URL

```
http://localhost:8081/api/v1/db/data/noco/<workspace>/<table>
```

### Endpoints Principais

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/users` | Listar usuarios |
| GET | `/users/:id` | Obter usuario |
| POST | `/users` | Criar usuario |
| PATCH | `/users/:id` | Atualizar usuario |
| DELETE | `/users/:id` | Deletar usuario |

### Autenticacao

Todas as requests precisam do header:

```
xc-auth: <token>
```

Ou via cookie de sessao.

---

## Migrações

### Aplicar Migrations

```sh
# RBAC (usuarios, empresas, permissoes)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql

# Matriculas
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-002-enrollments.sql
```

### Verificar Dados

```sh
mise db:verify
```

---

## Docker Compose

O backend e gerenciado via `docker-compose.nocodb.yml`:

```yaml
services:
  db:
    image: postgres:15
    container_name: app-controle-db
    environment:
      POSTGRES_USER: nocodb_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: app_controle
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  nocodb:
    image: nocodb/nocodb:latest
    container_name: app-controle-nocodb
    environment:
      NC_DB: pg://db:5432?u=nocodb_user&p=${POSTGRES_PASSWORD}&d=app_controle
    ports:
      - "8081:8080"
    depends_on:
      - db
```

---

## Proximos Passos

- [NocoDB](/docs/backend-docs/nocodb.md) - Configuracao detalhada
- [Database](/docs/backend-docs/database.md) - Schema e migrations
