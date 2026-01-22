# Prompt de Retomada - Sprint 6: Demo B2B

Ultrathink. Retome o Sprint 6 do projeto @CLAUDE.md seguindo o @docs/backlog/ROADMAP-DEMO-B2B.md

## Contexto da Sessão Anterior

**Branch:** `demo-nocodb-simple`
**Sprint:** 6 - Demo B2B Completa
**Objetivo:** Transformar branch em repositório demonstrativo com autenticação, RBAC e integração FE↔BE

## O Que Foi Feito

1. **Análise completa de gaps** → `docs/backlog/GAPS-DEMO-B2B.md`
2. **Planejamento detalhado** → `docs/backlog/ANALISE-PLANEJAMENTO-DEMO-B2B.md`
3. **ROADMAP com 19 User Stories** → `docs/backlog/ROADMAP-DEMO-B2B.md`
4. **Scripts SQL prontos:**
   - `database/migration-001-rbac.sql` (schema RBAC + Learning Paths)
   - `database/seed-demo-completo.sql` (12 usuários, 4 roles, progresso)
5. **Configuração .claude/ atualizada** para Sprint 6

## Próximo Passo Imediato

### FASE 1: Aplicar Migrations no Banco (US-063)

```bash
# 1. Verificar se containers estão rodando
docker ps | grep app-controle

# 2. Aplicar migration (schema)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql

# 3. Aplicar seed (dados demo)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/seed-demo-completo.sql

# 4. Verificar no NocoDB
# http://localhost:8080 → tabelas users, learning_paths
```

### FASE 2: Autenticação Frontend (US-064 a US-067)

Arquivos a criar:
```
src/contexts/AuthContext.jsx     → Estado de autenticação
src/hooks/useAuth.js             → Hook de autenticação
src/components/LoginView.jsx     → Tela de login
src/components/PrivateRoute.jsx  → Proteção de rotas
```

## Credenciais de Demo (após seed)

```
Senha: Demo@2026

ACME TECH:                    DEVCORP:
  ceo@acmetech.com (c_level)    cto@devcorp.com (c_level)
  admin@acmetech.com (admin)    admin@devcorp.com (admin)
  prof@acmetech.com (instructor) prof@devcorp.com (instructor)
  maria@acmetech.com (student)  julia@devcorp.com (student)
```

## Ambiente

```
Frontend: http://localhost:3000 (bun run dev)
NocoDB:   http://localhost:8080
Docker:   app-controle-db, app-controle-nocodb
```

## Comandos Úteis

```bash
# Iniciar ambiente
docker-compose -f docker-compose.nocodb.yml up -d && bun run dev

# Verificar banco
docker exec -it app-controle-db psql -U nocodb_user -d app_controle -c "SELECT email, role FROM users;"

# Verificar learning paths
docker exec -it app-controle-db psql -U nocodb_user -d app_controle -c "SELECT * FROM learning_paths;"
```

## Decisão Necessária

Começar por:
1. **Opção A:** Aplicar migrations primeiro, depois frontend
2. **Opção B:** Frontend primeiro (mock data), depois integrar

**Recomendado:** Opção A - migrations primeiro para ter dados reais
