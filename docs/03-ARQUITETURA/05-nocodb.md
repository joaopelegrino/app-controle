# NocoDB

[NocoDB](https://nocodb.com) e a camada de API e administracao do app-controle. Fornece API REST auto-gerada e interface visual para gerenciar dados.

## Acesso

| Campo | Valor |
|-------|-------|
| URL | http://localhost:8081 |
| Email | admin@trainb2b.local |
| Senha | Admin@TrainB2B2026! |

> **Nota:** Estas são as credenciais do admin NocoDB (backend), não dos usuários da aplicação.

---

## Interface Visual

### Dashboard

Ao fazer login, voce vera o dashboard com todas as tabelas:

- **companies** - Empresas clientes
- **users** - Usuarios do sistema
- **courses** - Cursos disponiveis
- **modules** - Modulos dos cursos
- **user_progress** - Progresso
- **enrollments** - Matriculas
- **user_notes** - Notas
- **specialists** - Especialistas do Hub
- **hub_courses** - Cursos do marketplace
- **course_reviews** - Avaliacoes de cursos

### Navegacao

1. **Sidebar esquerda** - Lista de tabelas
2. **Area central** - Dados em formato planilha
3. **Toolbar** - Filtros, ordenacao, views
4. **Forms** - Criar/editar registros

---

## API REST

### Autenticacao

#### Login

```sh
curl -X POST http://localhost:8081/api/v1/auth/user/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@trainb2b.local", "password": "Admin@TrainB2B2026!"}'
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Usar Token

```sh
curl http://localhost:8081/api/v1/db/data/noco/app_controle/users \
  -H "xc-auth: <token>"
```

### Endpoints

#### Listar Registros

```sh
GET /api/v1/db/data/noco/<workspace>/<table>
```

Exemplo:
```sh
curl http://localhost:8081/api/v1/db/data/noco/app_controle/users \
  -H "xc-auth: <token>"
```

#### Obter Registro

```sh
GET /api/v1/db/data/noco/<workspace>/<table>/<id>
```

#### Criar Registro

```sh
POST /api/v1/db/data/noco/<workspace>/<table>
Content-Type: application/json

{
  "name": "Novo Usuario",
  "email": "novo@email.com"
}
```

#### Atualizar Registro

```sh
PATCH /api/v1/db/data/noco/<workspace>/<table>/<id>
Content-Type: application/json

{
  "name": "Nome Atualizado"
}
```

#### Deletar Registro

```sh
DELETE /api/v1/db/data/noco/<workspace>/<table>/<id>
```

---

## Filtros e Ordenacao

### Filtrar

```sh
GET /api/v1/db/data/noco/app_controle/users?where=(role,eq,admin)
```

Operadores:
- `eq` - Igual
- `neq` - Diferente
- `gt` - Maior que
- `lt` - Menor que
- `like` - Contem

### Ordenar

```sh
GET /api/v1/db/data/noco/app_controle/users?sort=-created_at
```

- `sort=name` - Ascendente
- `sort=-name` - Descendente

### Paginar

```sh
GET /api/v1/db/data/noco/app_controle/users?limit=10&offset=20
```

---

## Table IDs

O apiService.js usa IDs de tabela para acessar a API v2:

```javascript
// Base ID (projeto NocoDB)
const API_CONFIG = {
  baseId: 'por8gk2phpp2pfk',
};

// Table IDs (atualizados 2026-02-02)
const TABLE_IDS = {
  users: 'm9tvgm5rx70qh3i',
  companies: 'mvw5muqhbzrmkuv',
  courses: 'mfrp5ndkje59e7r',
  modules: 'mu3cf9gd3ujxrg2',
  user_progress: 'mr79vxvc3urqofj',
  study_notes: 'mdqow9zj683tqiu',
  phases: 'meloqodvz6diwmz',
  audit_logs: 'mnbw235k9rntjky',
  // Views
  v_company_progress: 'me2shk8zc27r3li',
  v_user_dashboard: 'mduzpssgu2bckae',
  v_course_stats: 'mkbi3w6kk7j73mb',
  // Hub de Especialistas (Sprint 15 - IDs pendentes sync)
  specialists: 'pending_nocodb_sync_specialists',
  hub_courses: 'pending_nocodb_sync_hub_courses',
  course_reviews: 'pending_nocodb_sync_course_reviews',
  // Hub Views
  v_specialist_dashboard: 'pending_nocodb_sync_v_specialist_dashboard',
  v_hub_catalog: 'pending_nocodb_sync_v_hub_catalog',
};
```

### Como encontrar IDs atualizados

```bash
# 1. Obter token
TOKEN=$(curl -s -X POST http://localhost:8081/api/v1/auth/user/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trainb2b.local","password":"Admin@TrainB2B2026!"}' | jq -r '.token')

# 2. Listar bases
curl -s "http://localhost:8081/api/v2/meta/bases" -H "xc-auth: $TOKEN" | jq '.list[] | {id, title}'

# 3. Listar tabelas de uma base
BASE_ID="por8gk2phpp2pfk"
curl -s "http://localhost:8081/api/v1/db/meta/projects/$BASE_ID/tables" \
  -H "xc-auth: $TOKEN" | jq '.list[] | {id: .id, title: .title}'
```

> **⚠️ IMPORTANTE:** Se os IDs mudarem (após reset), atualize `src/services/apiService.js`.
> Veja [NOCODB-TROUBLESHOOTING.md](./NOCODB-TROUBLESHOOTING.md) para mais detalhes.

---

## Configuracao

### Variaveis de Ambiente

No `.env.nocodb`:

```env
# PostgreSQL
POSTGRES_USER=nocodb_user
POSTGRES_PASSWORD=SenhaSegura123!
POSTGRES_DB=app_controle

# NocoDB
NC_AUTH_JWT_SECRET=jwt-secret-muito-longo-e-seguro
NC_PUBLIC_URL=http://localhost:8081
```

### JWT Secret

O `NC_AUTH_JWT_SECRET` deve ser:
- Minimo 32 caracteres
- Unico por ambiente
- Mantido em segredo

---

## Backup e Restore

### Backup

```sh
# Dump do PostgreSQL
docker exec app-controle-db pg_dump -U nocodb_user app_controle > backup.sql
```

### Restore

```sh
# Restore
docker exec -i app-controle-db psql -U nocodb_user app_controle < backup.sql
```

---

## Troubleshooting

> **📖 Guia completo:** [NOCODB-TROUBLESHOOTING.md](./NOCODB-TROUBLESHOOTING.md)

### Quick Fixes

| Problema | Solução Rápida |
|----------|----------------|
| NocoDB não inicia | `mise nocodb:restart` |
| Erro de conexão | `docker logs app-controle-db` |
| Token inválido | Limpar localStorage + relogin |
| Login HTTP 400 | Ver [Troubleshooting Guide](./NOCODB-TROUBLESHOOTING.md#problema-login-http-400--usuários-não-encontrados) |
| TABLE_IDs incorretos | Atualizar `apiService.js` |
| Dados sumiram | `mise nocodb:reset` (⚠️ deleta tudo) |

### Verificação Rápida

```bash
# Status completo
mise nocodb:health

# Ou manualmente
docker ps | grep app-controle
curl -s http://localhost:8081/api/v1/health | jq .
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "SELECT COUNT(*) FROM users;"
```

---

## Integracao com Frontend

O `src/services/apiService.js` encapsula todas as chamadas:

```javascript
// Login
const { user, token } = await apiService.loginUser(email, password);

// CRUD Usuarios
const users = await apiService.getCompanyUsers(companyId);
const user = await apiService.createUser(userData);
await apiService.updateUser(userId, data);
await apiService.deleteUser(userId);

// Cursos
const courses = await apiService.getCourses();
const course = await apiService.createCourse(courseData);
```

---

## Acesso Hub de Especialistas

### Endpoints Publicos (sem autenticacao)

Catálogo de cursos do Hub é acessível publicamente:

```sh
# Listar cursos publicados
GET /api/v1/db/data/noco/app_controle/hub_courses?where=(status,eq,published)
```

### Endpoints Autenticados (specialist)

Dashboard e gestao de cursos requerem autenticacao:

```sh
# Meus cursos (specialist autenticado)
GET /api/v1/db/data/noco/app_controle/hub_courses?where=(specialist_id,eq,<id>)

# Minhas reviews
GET /api/v1/db/data/noco/app_controle/course_reviews?where=(hub_course_id,eq,<course_id>)
```

> **⚠️ IMPORTANTE:** Os Table IDs do Hub usam placeholders `pending_nocodb_sync_*`.
> Após rodar `database/migration-003-hub.sql`, execute o script de sync para obter os IDs reais.
> Veja a seção "Como encontrar IDs atualizados" acima.

---

## Referencias

- [NocoDB Documentation](https://docs.nocodb.com)
- [NocoDB REST API](https://docs.nocodb.com/developer-resources/rest-apis)
- [NocoDB GitHub](https://github.com/nocodb/nocodb)
