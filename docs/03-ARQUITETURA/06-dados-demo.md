# Dados de Demonstração

> Documentação dos dados seed carregados no ambiente de desenvolvimento
> Última atualização: 2026-02-02

---

## Resumo

| Entidade | Quantidade |
|----------|------------|
| Empresas | 3 |
| Usuários | 13 |
| Cursos | 1 |
| Fases | 4 |
| Módulos | 16 |
| Registros de Progresso | 41 |

---

## Empresas

| ID | Nome | Slug | Plano |
|----|------|------|-------|
| 550e8400-...440001 | Acme Tech Solutions | acme-tech | starter |
| 550e8400-...440002 | DevCorp Consulting | devcorp | professional |
| 550e8400-...440003 | Hub de Especialistas | hub-especialistas | enterprise |

---

## Usuários

### Acme Tech Solutions (6 usuários)

| Email | Nome | Role | Rota |
|-------|------|------|------|
| ceo@acmetech.com | Roberto Mendes | c_level | /admin/executive |
| admin@acmetech.com | João Silva | admin | /admin |
| prof@acmetech.com | Fernanda Lima | instructor | /instructor |
| maria@acmetech.com | Maria Santos | student | /dashboard |
| pedro@acmetech.com | Pedro Costa | student | /dashboard |
| ana@acmetech.com | Ana Ferreira | student | /dashboard |

### DevCorp Consulting (6 usuários)

| Email | Nome | Role | Rota |
|-------|------|------|------|
| cto@devcorp.com | Carla Souza | c_level | /admin/executive |
| admin@devcorp.com | Lucas Oliveira | admin | /admin |
| prof@devcorp.com | Carlos Santos | instructor | /instructor |
| julia@devcorp.com | Julia Almeida | student | /dashboard |
| bruno@devcorp.com | Bruno Costa | student | /dashboard |
| camila@devcorp.com | Camila Rocha | student | /dashboard |

### Hub de Especialistas (1 usuário)

| Email | Nome | Role | Rota |
|-------|------|------|------|
| joao.silva.specialist@plataformab2b.com | João Silva | specialist | /specialist |

**Senha padrão:** `Demo@2026`

### Empresa Hub de Especialistas

| ID | Nome | Slug | Plano |
|----|------|------|-------|
| 550e8400-...440003 | Hub de Especialistas | hub-especialistas | enterprise |

---

## Curso: Bash Shell Scripting

### Metadados

| Campo | Valor |
|-------|-------|
| ID | `bash` |
| Nome | Bash Shell Scripting |
| Descrição | Shell scripting, automação e linha de comando |
| Ícone | 🐚 |
| Duração | 32 horas |
| Módulos | 16 |
| Dificuldade | beginner |
| Status | active |

### Estrutura do Curso

```
📚 Bash Shell Scripting (16 semanas)
│
├── 📁 Seção 1: Fundamentos Shell Scripting (Semanas 1-4)
│   ├── 1.1 Introdução ao Curso + História Unix/Linux
│   ├── 1.2 Filosofia Software Tools - Parte 1
│   ├── 1.3 Filosofia Software Tools - Parte 2
│   └── 1.4 Scripts Auto-Contidos (#!) + Primeiros Scripts
│
├── 📁 Seção 2: Processamento de Texto (Semanas 5-8)
│   ├── 2.1 Redirecionamento I/O + Variáveis Básicas
│   ├── 2.2 Processamento de Texto Simples
│   ├── 2.3 Expressões Regulares (Regex)
│   └── 2.4 Processamento Avançado: sed + awk
│
├── 📁 Seção 3: Recursos Avançados (Semanas 9-12)
│   ├── 3.1 Estruturas de Controle + Loops
│   ├── 3.2 Funções + Parâmetros
│   ├── 3.3 Arrays + Debugging
│   └── 3.4 Programação Defensiva + Robustez
│
└── 📁 Seção 4: Ferramentas e Práticas (Semanas 13-16)
    ├── 4.1 Sinais + Job Control
    ├── 4.2 Subshells + Substituição de Comandos
    ├── 4.3 find + xargs + Arquivos
    └── 4.4 Projeto Final: Script de Automação
```

## Curso Hub: Bash Shell Scripting (Especialista)

### Metadados

| Campo | Valor |
|-------|-------|
| ID | `hub-bash` |
| Nome | Bash Shell Scripting |
| Especialista | João Silva |
| Preço | R$ 89,90/mês |
| Status | published |
| Rating | 5.0 (2 reviews) |

### Reviews Demo

| Empresa | Rating | Comentário |
|---------|--------|------------|
| Acme Tech | ★★★★★ | Excelente curso, muito prático! |
| DevCorp | ★★★★★ | Conteúdo de alta qualidade |

### Fases (Seções)

| ID | Nome | Semanas | Cor |
|----|------|---------|-----|
| bash-1 | Seção 1: Fundamentos Shell Scripting | 1-4 | green-500 |
| bash-2 | Seção 2: Processamento de Texto | 5-8 | blue-500 |
| bash-3 | Seção 3: Recursos Avançados | 9-12 | purple-500 |
| bash-4 | Seção 4: Ferramentas e Práticas | 13-16 | orange-500 |

---

## Progresso de Usuários (Demo)

Progresso pré-carregado para demonstrar o dashboard:

| Usuário | Empresa | Módulos Iniciados | Completados | % |
|---------|---------|-------------------|-------------|---|
| julia@devcorp.com | DevCorp | 13 | 12 | 75% |
| maria@acmetech.com | Acme | 9 | 8 | 50% |
| bruno@devcorp.com | DevCorp | 7 | 6 | 38% |
| pedro@acmetech.com | Acme | 5 | 4 | 25% |
| camila@devcorp.com | DevCorp | 4 | 3 | 19% |
| ana@acmetech.com | Acme | 3 | 2 | 13% |

---

## Arquivos de Seed

### Localização

```
database/
├── init.sql                  # Schema das tabelas
├── seed.sql                  # Dados básicos (7 usuários, roles antigos)
└── seed-demo-completo.sql    # Dados RBAC completos (13 usuários, 5 roles)
```

### Qual usar?

- **seed.sql:** Dados mínimos (legado)
- **seed-demo-completo.sql:** ⭐ Recomendado - inclui 5 roles RBAC

### Recarregar Dados

```bash
# Carregar seed completo (preserva NocoDB config)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle \
  < database/seed-demo-completo.sql

# Reset completo (⚠️ perde NocoDB config)
mise nocodb:reset
```

---

## Verificação

### Verificar via SQL

```bash
docker exec app-controle-db psql -U nocodb_user -d app_controle -c "
SELECT 'Empresas' as tipo, COUNT(*) as total FROM companies
UNION ALL SELECT 'Usuários', COUNT(*) FROM users
UNION ALL SELECT 'Cursos', COUNT(*) FROM courses
UNION ALL SELECT 'Fases', COUNT(*) FROM phases
UNION ALL SELECT 'Módulos', COUNT(*) FROM modules
UNION ALL SELECT 'Progresso', COUNT(*) FROM user_progress;
"
```

### Verificar via mise

```bash
mise db:verify
```

### Resultado Esperado

```
  tipo    | total
----------+-------
 Empresas |     2
 Usuários |    12
 Cursos   |     1
 Fases    |     4
 Módulos  |    16
 Progresso|    41
```

---

## Relacionamentos

```
companies (2)
    └─── users (12) ─────┬─── c_level (2)
                         ├─── admin (2)
                         ├─── instructor (2)
                         ├─── student (6)
                         └─── specialist (1)
                              └─── user_progress (41)
                                   └─── modules (16)
                                        └─── phases (4)
                                             └─── courses (1)
```

---

## Notas

1. **Senha única:** Todos os usuários demo usam `Demo@2026`
2. **RBAC:** 5 roles implementados (c_level, admin, instructor, specialist, student)
3. **Multi-tenant:** Dados isolados por company_id
4. **Progresso:** Apenas students têm progresso registrado
5. **Curso único:** MVP tem apenas o curso Bash

---

*Documento criado em 2026-02-02 para padronização dos dados de demonstração*
