# NocoDB

[NocoDB](https://nocodb.com) e a camada de API e administracao do app-controle. Fornece API REST auto-gerada e interface visual para gerenciar dados.

## Acesso

| Campo | Valor |
|-------|-------|
| URL | http://localhost:8081 |
| Email | admin@ultrathink.com |
| Senha | UltraThink@Admin2026! |

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
  -d '{"email": "admin@ultrathink.com", "password": "UltraThink@Admin2026!"}'
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

O apiService.js usa IDs de tabela para acessar a API:

```javascript
const TABLE_IDS = {
  users: 'm0mivs1xdccrvhz',
  companies: 'ms1ga42h4tiyzyq',
  courses: 'mt3gmx6ze7b2cov',
  modules: 'm79311ib9eppvc7',
};
```

Para encontrar o ID de uma tabela:
1. Abra a tabela no NocoDB
2. Veja a URL: `http://localhost:8081/dashboard/#/nc/<workspace>/<table_id>`

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

### NocoDB nao inicia

```sh
# Verificar logs
mise nocodb:logs

# Reiniciar
mise nocodb:restart
```

### Erro de conexao com banco

```sh
# Verificar PostgreSQL
docker exec app-controle-db pg_isready -U nocodb_user

# Ver logs do banco
docker logs app-controle-db
```

### Token invalido

```sh
# Limpar localStorage no browser
localStorage.clear()

# Fazer login novamente
```

### Dados sumiram

```sh
# Resetar banco (recarrega dados demo)
mise nocodb:reset
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

## Referencias

- [NocoDB Documentation](https://docs.nocodb.com)
- [NocoDB REST API](https://docs.nocodb.com/developer-resources/rest-apis)
- [NocoDB GitHub](https://github.com/nocodb/nocodb)
