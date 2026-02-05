# Database

O app-controle usa PostgreSQL 15 como banco de dados, gerenciado via Docker.

## Conexao

| Campo | Valor |
|-------|-------|
| Host | localhost |
| Port | 5432 |
| User | nocodb_user |
| Password | (ver .env.nocodb) |
| Database | app_controle |

### String de Conexao

```
postgresql://nocodb_user:<password>@localhost:5432/app_controle
```

---

## Schema

### Diagrama ER

```
┌─────────────┐       ┌─────────────┐
│  companies  │       │   courses   │
├─────────────┤       ├─────────────┤
│ id          │       │ id          │
│ name        │       │ name        │
│ domain      │       │ description │
│ logo_url    │       │ icon        │
│ status      │       │ difficulty  │
└──────┬──────┘       │ duration    │
       │              │ status      │
       │              └──────┬──────┘
       │                     │
       ▼                     ▼
┌─────────────┐       ┌─────────────┐
│    users    │       │   modules   │
├─────────────┤       ├─────────────┤
│ id          │       │ id          │
│ name        │       │ course_id   │──┐
│ email       │       │ title       │  │
│ role        │       │ order_num   │  │
│ company_id  │──┐    │ content     │  │
│ status      │  │    └─────────────┘  │
└──────┬──────┘  │                     │
       │         │                     │
       │         │    ┌────────────────┘
       ▼         │    │
┌─────────────┐  │    │  ┌─────────────┐
│ enrollments │  │    │  │user_progress│
├─────────────┤  │    │  ├─────────────┤
│ id          │  │    │  │ id          │
│ user_id     │──┤    └─▶│ module_id   │
│ course_id   │──┼───────│ user_id     │
│ enrolled_at │  │       │ completed   │
│ status      │  │       │ completed_at│
└─────────────┘  │       └─────────────┘
                 │
                 │       ┌─────────────┐
                 │       │ user_notes  │
                 │       ├─────────────┤
                 │       │ id          │
                 │       │ user_id     │
                 └──────▶│ course_id   │
                         │ content     │
                         └─────────────┘
```

---

## Tabelas

### companies

Empresas clientes da plataforma.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | SERIAL | PK |
| name | VARCHAR(255) | Nome da empresa |
| domain | VARCHAR(255) | Dominio do email |
| logo_url | TEXT | URL do logo |
| status | VARCHAR(50) | active, inactive |
| created_at | TIMESTAMP | Data criacao |

### users

Usuarios do sistema.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | SERIAL | PK |
| name | VARCHAR(255) | Nome completo |
| email | VARCHAR(255) | Email unico |
| password_hash | VARCHAR(255) | Senha hasheada |
| role | VARCHAR(50) | student, instructor, admin, c_level |
| company_id | INT | FK companies |
| status | VARCHAR(50) | active, inactive |
| created_at | TIMESTAMP | Data criacao |

### courses

Cursos disponiveis.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | SERIAL | PK |
| name | VARCHAR(255) | Nome do curso |
| description | TEXT | Descricao |
| icon | VARCHAR(10) | Emoji do curso |
| difficulty | VARCHAR(50) | beginner, intermediate, advanced |
| duration_hours | INT | Duracao em horas |
| total_modules | INT | Total de modulos |
| badge | VARCHAR(50) | new, integrated, null |
| status | VARCHAR(50) | active, archived |
| created_at | TIMESTAMP | Data criacao |

### modules

Modulos dos cursos.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | SERIAL | PK |
| course_id | INT | FK courses |
| title | VARCHAR(255) | Titulo do modulo |
| order_num | INT | Ordem no curso |
| content | TEXT | Conteudo markdown |
| duration_minutes | INT | Duracao estimada |

### enrollments

Matriculas de usuarios em cursos.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | SERIAL | PK |
| user_id | INT | FK users |
| course_id | INT | FK courses |
| enrolled_at | TIMESTAMP | Data matricula |
| completed_at | TIMESTAMP | Data conclusao |
| status | VARCHAR(50) | active, completed, cancelled |

### user_progress

Progresso por modulo.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | SERIAL | PK |
| user_id | INT | FK users |
| module_id | INT | FK modules |
| completed | BOOLEAN | Concluido? |
| completed_at | TIMESTAMP | Data conclusao |
| time_spent | INT | Tempo em segundos |

### user_notes

Notas dos usuarios.

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | SERIAL | PK |
| user_id | INT | FK users |
| course_id | INT | FK courses |
| content | TEXT | Conteudo das notas |
| updated_at | TIMESTAMP | Ultima atualizacao |

---

## Migrations

### Estrutura

```
database/
├── migration-001-rbac.sql      # Schema principal
├── migration-002-enrollments.sql # Matriculas
└── seed-demo-completo.sql      # Dados de demo
```

### Aplicar Migrations

```sh
# Migration 1 - RBAC
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql

# Migration 2 - Enrollments
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-002-enrollments.sql
```

### Verificar Aplicacao

```sh
mise db:verify
```

---

## Queries Uteis

### Conectar ao Banco

```sh
docker exec -it app-controle-db psql -U nocodb_user -d app_controle
```

### Listar Tabelas

```sql
\dt
```

### Contar Registros

```sql
SELECT 'Empresas' AS tipo, COUNT(*) FROM companies
UNION ALL SELECT 'Usuarios', COUNT(*) FROM users
UNION ALL SELECT 'Cursos', COUNT(*) FROM courses
UNION ALL SELECT 'Modulos', COUNT(*) FROM modules;
```

### Usuarios por Empresa

```sql
SELECT c.name AS empresa, COUNT(u.id) AS usuarios
FROM companies c
LEFT JOIN users u ON u.company_id = c.id
GROUP BY c.id;
```

### Progresso por Curso

```sql
SELECT
  u.name AS usuario,
  c.name AS curso,
  COUNT(CASE WHEN up.completed THEN 1 END) AS concluidos,
  COUNT(m.id) AS total,
  ROUND(COUNT(CASE WHEN up.completed THEN 1 END) * 100.0 / COUNT(m.id), 2) AS percentual
FROM users u
JOIN enrollments e ON e.user_id = u.id
JOIN courses c ON c.id = e.course_id
JOIN modules m ON m.course_id = c.id
LEFT JOIN user_progress up ON up.user_id = u.id AND up.module_id = m.id
GROUP BY u.id, c.id;
```

---

## Backup e Restore

### Backup Completo

```sh
docker exec app-controle-db pg_dump -U nocodb_user app_controle > backup_$(date +%Y%m%d).sql
```

### Backup Apenas Dados

```sh
docker exec app-controle-db pg_dump -U nocodb_user --data-only app_controle > data_backup.sql
```

### Restore

```sh
docker exec -i app-controle-db psql -U nocodb_user app_controle < backup.sql
```

---

## Indices

Indices criados para performance:

```sql
-- Busca por email
CREATE INDEX idx_users_email ON users(email);

-- Usuarios por empresa
CREATE INDEX idx_users_company ON users(company_id);

-- Progresso por usuario
CREATE INDEX idx_progress_user ON user_progress(user_id);

-- Matriculas
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
```

---

## Troubleshooting

### Conexao Recusada

```sh
# Verificar se container esta rodando
docker ps | grep app-controle-db

# Verificar se PostgreSQL esta pronto
docker exec app-controle-db pg_isready -U nocodb_user
```

### Erro de Permissao

```sh
# Verificar usuario
docker exec app-controle-db psql -U nocodb_user -c "\du"
```

### Dados Corrompidos

```sh
# Resetar banco
mise nocodb:reset
```

---

## Referencias

- [PostgreSQL Documentation](https://www.postgresql.org/docs/15/)
- [Docker PostgreSQL](https://hub.docker.com/_/postgres)
