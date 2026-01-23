# Backlog - Testes E2E com Backend NocoDB

**Data:** 2026-01-23
**Sprint:** 10 - Analytics + Polish
**Status:** Testes concluídos

---

## Resumo da Sessao

Configuracao e execucao de testes E2E com backend real (PostgreSQL + NocoDB).

## Infraestrutura Configurada

### Containers Docker
```bash
docker compose -f docker-compose.nocodb.yml up -d
```

| Container | Porta | Status |
|-----------|-------|--------|
| app-controle-db | 5432 | Healthy |
| app-controle-nocodb | 8080 | Healthy |

### Migrations Aplicadas
- `migration-001-rbac.sql` - Schema RBAC completo
- `migration-002-enrollments.sql` - Matriculas (corrigido tipos UUID)

### Correcoes Realizadas

1. **migration-002-enrollments.sql**
   - `user_id`: INTEGER -> UUID
   - `assigned_by`: INTEGER -> UUID
   - `u.name` -> `u.full_name`
   - `company_id`: hardcoded -> UUID dinamico

2. **.env**
   - `VITE_PORT`: 3000 -> 3001
   - `VITE_API_URL`: adicionado http://localhost:8080

---

## Resultados dos Testes

### 1. Login com Perfis
| Perfil | Resultado | Redirecionamento |
|--------|-----------|------------------|
| Admin | OK | /admin |
| Instrutor | OK | / (Hub) |
| Aluno | Nao testado | - |
| C-Level | Nao testado | - |

### 2. Dashboard Admin
- Total usuarios: 6 (6 ativos)
- Modulos concluidos: 14
- Taxa conclusao: 15%
- Cursos disponiveis: 1
- Analytics modulos dificeis: funcionando

### 3. CRUD Usuarios
| Operacao | Status | Observacao |
|----------|--------|------------|
| Read | OK | Lista 13 usuarios |
| Create | OK | Via API NocoDB + SQL para company_id |
| Update | Nao testado | - |
| Delete | Nao testado | - |

**Nota:** O NocoDB trata `company_id` como coluna de sistema (ForeignKey). A vinculacao precisa ser feita via SQL direto no PostgreSQL.

### 4. Dashboard Instrutor
- Total alunos: 3
- Media conclusao: 29%
- Modal Ver Notas: funcionando com Markdown

### 5. Sistema Matriculas
- EnrollUserModal: funcionando
- Lista usuarios: 4
- Cursos disponiveis: 1
- Selecao multipla: OK

### 6. Exportacao
- Excel (CSV): OK
- JSON: OK
- Toast de sucesso: funcionando

---

## Dados de Teste no Banco

### Usuarios (13 total)
```
ACME Tech Solutions:
- ceo@acmetech.com (c_level)
- admin@acmetech.com (admin)
- prof@acmetech.com (instructor)
- maria@acmetech.com (student) - 50% progresso
- pedro@acmetech.com (student) - 25% progresso
- ana@acmetech.com (student) - 13% progresso

DevCorp Consulting:
- cto@devcorp.com (c_level)
- admin@devcorp.com (admin)
- prof@devcorp.com (instructor)
- julia@devcorp.com (student) - 75% progresso
- bruno@devcorp.com (student) - 38% progresso
- camila@devcorp.com (student) - 19% progresso
```

### Matriculas (6 total)
- 3 alunos ACME matriculados em Bash
- 3 alunos DevCorp matriculados em Bash

---

## Proximos Passos

### Prioridade Alta
1. Configurar tableIds no NocoDB para CRUD completo
2. Testar login como aluno e C-Level
3. Validar fluxo de curso e progresso

### Prioridade Media
4. Implementar autenticacao real via NocoDB JWT
5. Adicionar mais cursos ao sistema
6. Testar exportacao com dados reais

### Prioridade Baixa
7. Configurar CI/CD para testes automatizados
8. Documentar processo de deploy

---

## Comando de Retomada

```
# Iniciar backend
docker compose -f docker-compose.nocodb.yml up -d

# Verificar containers
docker ps

# Iniciar frontend
bun run dev

# Acessar aplicacao
http://localhost:3001
```

**Credenciais:** Senha padrao Demo@2026

---

## Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| database/migration-002-enrollments.sql | Tipos UUID corrigidos |
| .env | VITE_PORT e VITE_API_URL |
| src/services/apiService.js | TABLE_IDS hardcoded + fallback |

## Table IDs NocoDB (Base UltraThink)

```javascript
const TABLE_IDS = {
  users: 'm0mivs1xdccrvhz',
  companies: 'ms1ga42h4tiyzyq',
  courses: 'mt3gmx6ze7b2cov',
  modules: 'm79311ib9eppvc7',
  user_progress: 'm3dat99drhj7w23',
  study_notes: 'mh6nb1luq09i9uy',
  learning_paths: 'ml2inf2c1jvviga',
  phases: 'mdbq55cll60lxto',
};
```

---

**Versao:** 7.0.0
**RBAC:** 17/21 permissoes (81%)
