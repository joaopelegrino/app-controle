# Database - app-controle MVP

**Estrutura:** PostgreSQL 16 + NocoDB  
**Curso incluído:** Bash Shell Scripting (16 módulos)  
**Empresas:** 2 (Acme Tech, DevCorp)  
**Usuários:** 7 (2 admins, 1 teacher, 4 students)  

---

## 📁 Arquivos

```
database/
├── init.sql       # Schema completo (8 tabelas + 3 views)
├── seed.sql       # Dados de demonstração
└── README.md      # Este arquivo
```

---

## 🗂️ Estrutura do Banco

### Tabelas Principais

```
companies        → Empresas clientes (multi-tenancy)
users            → Usuários (students, teachers, admins)
courses          → Catálogo de cursos
phases           → Fases/seções de um curso
modules          → Módulos/aulas individuais
user_progress    → Progresso de conclusão
study_notes      → Caderno de notas (50KB limite)
audit_logs       → Logs de auditoria
```

### Views de Analytics

```
v_company_progress  → Progresso agregado por empresa
v_user_dashboard    → Dashboard individual de usuário
v_course_stats      → Estatísticas de adoção por curso
```

---

## 📊 Dados Incluídos (seed.sql)

### 2 Empresas

| Nome | Slug | Plan | Max Users |
|------|------|------|-----------|
| Acme Tech Solutions | acme-tech | starter | 20 |
| DevCorp Consulting | devcorp | professional | 50 |

### 7 Usuários

**Acme Tech:**
- João Silva (admin)
- Maria Santos (student) → 5 módulos completados
- Pedro Costa (student) → 2 módulos completados

**DevCorp:**
- Ana Ferreira (admin)
- Carlos Souza (teacher)
- Julia Oliveira (student) → 3 módulos completados
- Lucas Almeida (student) → 2 módulos completados

### 1 Curso: Bash (16 módulos)

**Fases:**
1. Fundamentos (módulos 1.1-1.4)
2. Processamento de Texto (módulos 2.1-2.4)
3. Recursos Avançados (módulos 3.1-3.4)
4. Ferramentas e Práticas (módulos 4.1-4.4)

**Progresso total:** 17 registros distribuídos entre alunos

---

## 🚀 Como Usar

### 1. Iniciar Serviços

```bash
# Copiar .env
cp .env.nocodb.example .env.nocodb

# Iniciar
source .env.nocodb
docker-compose -f docker-compose.nocodb.yml up -d
```

### 2. Verificar Dados

```bash
docker exec -it app-controle-db psql -U nocodb_user -d app_controle -c "
SELECT 'Empresas' AS tipo, COUNT(*) AS total FROM companies
UNION ALL SELECT 'Usuários', COUNT(*) FROM users
UNION ALL SELECT 'Módulos', COUNT(*) FROM modules
UNION ALL SELECT 'Progresso', COUNT(*) FROM user_progress;"
```

**Saída esperada:**
```
   tipo    | total
-----------+-------
 Empresas  |     2
 Usuários  |     7
 Módulos   |    16
 Progresso |    17
```

### 3. Acessar NocoDB

```
URL:   http://localhost:8080
Email: admin@ultrathink.com
Senha: UltraThink@Admin2026!
```

---

## 🔍 Queries Úteis

### Ver Progresso por Usuário

```sql
SELECT 
  u.full_name,
  COUNT(up.id) FILTER (WHERE up.completed) AS completados,
  COUNT(up.id) AS total_rastreado,
  ROUND(
    COUNT(CASE WHEN up.completed THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(up.id), 0) * 100, 
    2
  ) AS taxa_conclusao
FROM users u
LEFT JOIN user_progress up ON up.user_id = u.id
WHERE u.role = 'student'
GROUP BY u.id, u.full_name
ORDER BY completados DESC;
```

### Ver Módulos Mais Completados

```sql
SELECT 
  m.id,
  m.name,
  COUNT(up.id) FILTER (WHERE up.completed) AS total_conclusoes
FROM modules m
LEFT JOIN user_progress up ON up.module_id = m.id
GROUP BY m.id, m.name
ORDER BY total_conclusoes DESC;
```

### Ver Última Atividade por Empresa

```sql
SELECT 
  c.name AS empresa,
  MAX(up.completed_at) AS ultima_atividade,
  COUNT(DISTINCT up.user_id) AS usuarios_ativos
FROM companies c
LEFT JOIN user_progress up ON up.company_id = c.id
WHERE up.completed = true
GROUP BY c.id, c.name;
```

---

## 🛠️ Manutenção

### Backup

```bash
docker exec app-controle-db pg_dump -U nocodb_user app_controle > backup.sql
```

### Restaurar

```bash
docker exec -i app-controle-db psql -U nocodb_user app_controle < backup.sql
```

### Resetar Dados

```bash
# ⚠️ CUIDADO: Deleta tudo!
docker-compose -f docker-compose.nocodb.yml down -v
docker-compose -f docker-compose.nocodb.yml up -d
```

---

## 📚 Documentação Relacionada

- **Setup:** `docs/backend/NOCODB-QUICKSTART.md`
- **Personas:** `docs/backend/PERSONAS-NAO-TECNICAS.md`
- **Docker Compose:** `docker-compose.nocodb.yml`
- **Env:** `.env.nocodb.example`

---

## 🔐 Segurança

### Produção

**IMPORTANTE:** Alterar credenciais em `.env.nocodb`:

```bash
# Gerar senha segura
openssl rand -base64 32

# Gerar JWT secret
openssl rand -hex 32
```

### Notas

- Senhas exemplo usam `$2b$10$placeholder_hash`
- Em produção, usar bcrypt real
- Habilitar SSL para PostgreSQL
- Configurar CORS no NocoDB

---

**Status:** ✅ Pronto para uso  
**Última atualização:** 2026-01-22  
**Branch:** demo-nocodb-simple
