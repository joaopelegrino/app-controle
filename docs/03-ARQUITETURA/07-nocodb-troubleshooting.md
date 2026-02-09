# NocoDB Troubleshooting Guide

> Guia de resolução de problemas comuns do NocoDB no app-controle
> Última atualização: 2026-02-02

---

## Problema: Login HTTP 400 / Usuários não encontrados

### Sintomas
- Login retorna erro HTTP 400
- Mensagem "Usuário não encontrado"
- API retorna lista vazia de usuários

### Diagnóstico

```bash
# 1. Verificar se containers estão rodando
docker ps | grep app-controle

# 2. Verificar dados no PostgreSQL
docker exec app-controle-db psql -U nocodb_user -d app_controle \
  -c "SELECT COUNT(*) FROM users;"

# 3. Verificar dados via NocoDB API
TOKEN=$(curl -s -X POST http://localhost:8081/api/v1/auth/user/signin \
  -H "Content-Type: application/json" \
  -d @- <<< '{"email":"admin@trainb2b.local","password":"Admin@TrainB2B2026!"}' | jq -r '.token')

curl -s "http://localhost:8081/api/v2/tables/m9tvgm5rx70qh3i/records" \
  -H "xc-auth: $TOKEN" | jq '.list | length'
```

### Causa Comum
O NocoDB perdeu a configuração de bases/tabelas. Isso pode ocorrer quando:
- Volumes Docker foram deletados
- NocoDB foi reinstalado
- Banco de dados foi resetado parcialmente

### Solução

#### Opção 1: Reset Completo (Recomendado)

```bash
# 1. Parar e remover volumes
docker-compose -f docker-compose.nocodb.yml down -v

# 2. Reiniciar (seed será recarregado automaticamente)
docker-compose -f docker-compose.nocodb.yml up -d

# 3. Aguardar inicialização (~30s)
sleep 30

# 4. Carregar seed completo (RBAC com 5 perfis)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle \
  < database/seed-demo-completo.sql

# 5. Configurar NocoDB via API (ver seção abaixo)
```

#### Opção 2: Reconfigurar NocoDB Manualmente

Se os dados existem no PostgreSQL mas o NocoDB não os vê:

```bash
# 1. Criar workspace
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
INSERT INTO workspace (id, title, meta, fk_user_id, deleted, plan, created_at, updated_at)
SELECT 'ws_trainb2b', 'TrainB2B', '{}', id, false, 'free', NOW(), NOW()
FROM nc_users_v2 WHERE email='admin@trainb2b.local'
ON CONFLICT (id) DO NOTHING;
"

# 2. Vincular bases ao workspace
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
UPDATE nc_bases_v2 SET fk_workspace_id = 'ws_trainb2b' WHERE fk_workspace_id IS NULL;
"

# 3. Reiniciar NocoDB
docker restart app-controle-nocodb
sleep 10

# 4. Adicionar source PostgreSQL (via API)
TOKEN=$(curl -s -X POST http://localhost:8081/api/v1/auth/user/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trainb2b.local","password":"Admin@TrainB2B2026!"}' | jq -r '.token')

BASE_ID=$(curl -s "http://localhost:8081/api/v2/meta/bases" -H "xc-auth: $TOKEN" | jq -r '.list[0].id')

curl -X POST "http://localhost:8081/api/v1/db/meta/projects/$BASE_ID/bases" \
  -H "Content-Type: application/json" \
  -H "xc-auth: $TOKEN" \
  -d '{
    "alias": "PostgreSQL App",
    "type": "pg",
    "config": {
      "client": "pg",
      "connection": {
        "host": "postgres",
        "port": 5432,
        "user": "nocodb_user",
        "password": "TrainB2B_Secure_2026",
        "database": "app_controle"
      }
    }
  }'
```

---

## Problema: TABLE_IDs desatualizados

### Sintomas
- Erros "Tabela não encontrada"
- API retorna 404
- Console mostra erro em `/api/v2/tables/xxx/records`

### Diagnóstico

```bash
# Verificar IDs atuais das tabelas
TOKEN=$(curl -s -X POST http://localhost:8081/api/v1/auth/user/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trainb2b.local","password":"Admin@TrainB2B2026!"}' | jq -r '.token')

BASE_ID=$(curl -s "http://localhost:8081/api/v2/meta/bases" -H "xc-auth: $TOKEN" | jq -r '.list[0].id')

curl -s "http://localhost:8081/api/v1/db/meta/projects/$BASE_ID/tables" \
  -H "xc-auth: $TOKEN" | jq '.list[] | select(.title | test("^(users|companies|courses|modules|phases|user_progress|study_notes|audit_logs|v_)")) | {id: .id, title: .title}'
```

### Solução

Atualizar `src/services/apiService.js` com os novos IDs:

```javascript
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  baseId: import.meta.env.VITE_API_BASE_ID || '<NOVO_BASE_ID>',
  timeout: platformConfig.api.timeout,
};

const TABLE_IDS = {
  users: '<NOVO_ID>',
  companies: '<NOVO_ID>',
  courses: '<NOVO_ID>',
  modules: '<NOVO_ID>',
  user_progress: '<NOVO_ID>',
  study_notes: '<NOVO_ID>',
  phases: '<NOVO_ID>',
  audit_logs: '<NOVO_ID>',
  // Views
  v_company_progress: '<NOVO_ID>',
  v_user_dashboard: '<NOVO_ID>',
  v_course_stats: '<NOVO_ID>',
};
```

---

## Problema: Workspace ID Required

### Sintomas
- Erro "Workspace ID is required" nos logs
- API retorna 500 Internal Server Error
- Bases existem mas não são acessíveis

### Causa
NocoDB v0.301+ requer que todas as bases estejam vinculadas a um workspace.

### Solução

```bash
# Verificar se workspace existe
docker exec app-controle-db psql -U nocodb_user -d app_controle \
  -c "SELECT id, title FROM workspace;"

# Se vazio, criar workspace
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
INSERT INTO workspace (id, title, meta, deleted, plan, created_at, updated_at)
VALUES ('ws_trainb2b', 'TrainB2B', '{}', false, 'free', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
"

# Vincular bases
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
UPDATE nc_bases_v2 SET fk_workspace_id = 'ws_trainb2b' WHERE fk_workspace_id IS NULL;
"

# Reiniciar NocoDB
docker restart app-controle-nocodb
```

---

## Problema: Forbidden / Unauthorized

### Sintomas
- API retorna "Forbidden - Unauthorized access"
- Mesmo com token válido

### Causa
Usuário admin não tem permissão nas bases criadas.

### Solução

```bash
# Obter IDs
USER_ID=$(docker exec app-controle-db psql -U nocodb_user -d app_controle -t \
  -c "SELECT id FROM nc_users_v2 WHERE email='admin@trainb2b.local';" | tr -d ' ')

# Adicionar permissão nas bases
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
INSERT INTO nc_base_users_v2 (base_id, fk_user_id, roles, starred, pinned)
SELECT id, '$USER_ID', 'owner', false, false FROM nc_bases_v2
ON CONFLICT DO NOTHING;
"

# Adicionar ao workspace
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
INSERT INTO workspace_user (fk_workspace_id, fk_user_id, roles, deleted, created_at, updated_at)
VALUES ('ws_trainb2b', '$USER_ID', 'workspace-level-owner', false, NOW(), NOW())
ON CONFLICT DO NOTHING;
"
```

---

## Verificação Completa do Sistema

Script para verificar todo o sistema:

```bash
#!/bin/bash
echo "=== Verificação NocoDB ==="

# 1. Containers
echo -e "\n1. Containers:"
docker ps --format "{{.Names}}: {{.Status}}" | grep app-controle

# 2. PostgreSQL
echo -e "\n2. PostgreSQL:"
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
SELECT 'Empresas' as tipo, COUNT(*) as total FROM companies
UNION ALL SELECT 'Usuários', COUNT(*) FROM users
UNION ALL SELECT 'Cursos', COUNT(*) FROM courses
UNION ALL SELECT 'Módulos', COUNT(*) FROM modules;
"

# 3. NocoDB Health
echo -e "\n3. NocoDB Health:"
curl -s http://localhost:8081/api/v1/health | jq -r '.message'

# 4. NocoDB Tables
echo -e "\n4. NocoDB Tables:"
TOKEN=$(curl -s -X POST http://localhost:8081/api/v1/auth/user/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trainb2b.local","password":"Admin@TrainB2B2026!"}' 2>/dev/null | jq -r '.token')

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
  TABLES=$(curl -s "http://localhost:8081/api/v2/tables/m9tvgm5rx70qh3i/records" \
    -H "xc-auth: $TOKEN" 2>/dev/null | jq '.list | length')
  echo "Usuários via NocoDB API: $TABLES"
else
  echo "⚠️  Não foi possível autenticar no NocoDB"
fi

# 5. Frontend
echo -e "\n5. Frontend:"
curl -s http://localhost:3001 > /dev/null && echo "OK (porta 3001)" || echo "OFFLINE"

echo -e "\n=== Verificação concluída ==="
```

---

## Referência Rápida

### Credenciais NocoDB Admin

| Campo | Valor |
|-------|-------|
| Email | admin@trainb2b.local |
| Senha | Admin@TrainB2B2026! |
| URL | http://localhost:8081 |

### IDs Atuais (2026-02-02)

| Recurso | ID |
|---------|---|
| Base ID | por8gk2phpp2pfk |
| Workspace | ws_trainb2b |
| users | m9tvgm5rx70qh3i |
| companies | mvw5muqhbzrmkuv |
| courses | mfrp5ndkje59e7r |
| modules | mu3cf9gd3ujxrg2 |
| phases | meloqodvz6diwmz |
| user_progress | mr79vxvc3urqofj |
| study_notes | mdqow9zj683tqiu |
| audit_logs | mnbw235k9rntjky |
| v_company_progress | me2shk8zc27r3li |
| v_user_dashboard | mduzpssgu2bckae |
| v_course_stats | mkbi3w6kk7j73mb |
| specialists | pending_nocodb_sync_specialists |
| hub_courses | pending_nocodb_sync_hub_courses |
| course_reviews | pending_nocodb_sync_course_reviews |
| v_specialist_dashboard | pending_nocodb_sync_v_specialist |
| v_hub_catalog | pending_nocodb_sync_v_hub_catalog |

### Comandos mise Úteis

```bash
mise nocodb:health   # Verificar status
mise nocodb:logs     # Ver logs
mise nocodb:restart  # Reiniciar
mise nocodb:reset    # Reset completo (⚠️ deleta dados)
mise db:verify       # Verificar dados PostgreSQL
```

---

## Prevenção de Problemas

### Backup Regular

```bash
# Backup PostgreSQL
docker exec app-controle-db pg_dump -U nocodb_user app_controle > backup-$(date +%Y%m%d).sql

# Backup NocoDB config (opcional)
docker cp app-controle-nocodb:/usr/app/data ./nocodb-data-backup
```

### Não Executar

- `docker-compose down -v` sem backup
- `mise nocodb:reset` sem confirmação
- Alterações diretas no banco `nc_*` sem entender impacto

---

---

## Documentação Relacionada

- [nocodb.md](./nocodb.md) - Guia geral do NocoDB
- [database.md](./database.md) - Schema do PostgreSQL
- [DADOS-DEMO.md](./DADOS-DEMO.md) - Dados de demonstração (curso Bash, 13 usuários, Hub specialist)

---

*Documento criado após incidente de 2026-02-02 - Perda de configuração NocoDB*
