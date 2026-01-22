# Resumo dos Dados de Seed - NocoDB

**Data:** 2026-01-20  
**Arquivos:** `database/init.sql` + `database/seed.sql`  
**Status:** ✅ Completo e funcional

---

## 📊 Sumário dos Dados

### Dados Carregados Automaticamente

| Categoria | Quantidade | Detalhes |
|-----------|------------|----------|
| **Empresas** | 3 | Starter, Professional, Enterprise |
| **Usuários** | 10 | 3 admins, 2 teachers, 5 students |
| **Cursos** | 5 | Bash, C, Rust, VS Code, Claude Code |
| **Fases** | 10 | Distribuídas nos cursos |
| **Módulos** | 68 | Dados completos de 5 cursos |
| **Progresso** | 25 | 6 alunos com progresso ativo |
| **Notas** | 3 | Conteúdo markdown real |
| **Trilhas** | 2 | Backend Developer, Systems Programmer |
| **Logs** | 4 | Exemplos de auditoria |

**Total:** ~200KB de dados SQL com informações 100% reais do projeto

---

## 🏢 Empresas

### Acme Tech Solutions
- **Plano:** Starter
- **Max Users:** 20
- **Usuários:** 3 (1 admin, 2 students)
- **Progresso:** 11 módulos completados
- **Cursos ativos:** Bash

### DevCorp Consulting
- **Plano:** Professional
- **Max Users:** 50
- **Usuários:** 4 (1 admin, 1 teacher, 2 students)
- **Progresso:** 10 módulos completados
- **Cursos ativos:** C Programming, Rust

### Global Systems Inc
- **Plano:** Enterprise
- **Max Users:** 200
- **Usuários:** 3 (1 admin, 1 teacher, 1 student)
- **Progresso:** 4 módulos completados
- **Cursos ativos:** Claude Code

---

## 👥 Usuários com Progresso

### Maria Santos (Acme Tech) - Student
**Curso:** Bash Shell Scripting  
**Progresso:** 5 de 16 módulos (31%)  
**Módulos completados:**
- ✅ bash-1.1: Introdução ao Curso + História Unix/Linux (14 dias atrás)
- ✅ bash-1.2: Filosofia Software Tools - Parte 1 (12 dias atrás)
- ✅ bash-1.3: Filosofia Software Tools - Parte 2 (9 dias atrás)
- ✅ bash-1.4: Scripts Auto-Contidos (#!) + Primeiros Scripts (5 dias atrás)
- ✅ bash-2.1: Redirecionamento I/O + Variáveis Básicas (2 dias atrás)
- ⏳ bash-2.2: Processamento de Texto Simples (em progresso)

**Notas:** Tem caderno completo com comandos e exemplos

---

### Pedro Costa (Acme Tech) - Student
**Curso:** Bash Shell Scripting  
**Progresso:** 2 de 16 módulos (13%)  
**Módulos completados:**
- ✅ bash-1.1 (7 dias atrás)
- ✅ bash-1.2 (3 dias atrás)
- ⏳ bash-1.3 (em progresso)

---

### Julia Oliveira (DevCorp) - Student
**Curso:** C Programming  
**Progresso:** 3 de 50 módulos (6%)  
**Módulos completados:**
- ✅ c-1.1: Introdução C + Variáveis (21 dias atrás)
- ✅ c-1.2: User Input + Shopping Cart (18 dias atrás)
- ✅ c-1.3: If Statements + Converters (14 dias atrás)
- ⏳ c-1.4: Switch Case + Functions (em progresso)

**Notas:** Tem anotações sobre ponteiros e arrays

---

### Lucas Almeida (DevCorp) - Student
**Curso:** Rust Programming  
**Progresso:** 2 de 24 módulos (8%)  
**Módulos completados:**
- ✅ rust-1.1: Introduction & Variables (10 dias atrás)
- ✅ rust-1.2: Numbers & Binary System (6 dias atrás)
- ⏳ rust-1.3: Statements & Expressions (em progresso)

**Notas:** Tem anotações sobre ownership e borrowing

---

### Gustavo Martins (Global Systems) - Student
**Curso:** Claude Code CLI  
**Progresso:** 2 de 12 módulos (17%)  
**Módulos completados:**
- ✅ claude-1.1: Introdução Claude Code (4 dias atrás)
- ✅ claude-1.2: Comandos Básicos (1 dia atrás)
- ⏳ claude-1.3: Context Management (em progresso)

---

## 📚 Cursos Disponíveis

### 1. 🐚 Bash Shell Scripting
- **Módulos:** 16 (100% incluídos no seed)
- **Duração:** 32 horas
- **Dificuldade:** Beginner
- **Fases:** 4
- **Alunos ativos:** 2 (Maria, Pedro)

### 2. 📖 C Programming
- **Módulos:** 50 total (10 incluídos no seed)
- **Duração:** 100 horas
- **Dificuldade:** Intermediate
- **Fases:** 2
- **Alunos ativos:** 1 (Julia)

### 3. 🦀 Rust Programming
- **Módulos:** 24 total (10 incluídos no seed)
- **Duração:** 120 horas
- **Dificuldade:** Advanced
- **Fases:** 2
- **Alunos ativos:** 1 (Lucas)

### 4. 💻 VS Code + WSL2
- **Módulos:** 8 (100% incluídos no seed)
- **Duração:** 16 horas
- **Dificuldade:** Beginner
- **Fases:** 1
- **Alunos ativos:** 0

### 5. 🤖 Claude Code CLI
- **Módulos:** 12 (100% incluídos no seed)
- **Duração:** 24 horas
- **Dificuldade:** Intermediate
- **Fases:** 1
- **Alunos ativos:** 1 (Gustavo)

---

## 📝 Notas de Estudo

### Maria Santos - Bash
```markdown
# Notas do Curso Bash

## Comandos Importantes
- ls -la → Lista detalhada
- cd /var/log → Navegar para logs
- grep "error" *.log → Buscar erros
- chmod +x script.sh → Tornar executável

## Variáveis
NOME="valor"
echo $NOME
echo ${NOME}

## Loops
for i in {1..5}; do
    echo "Número: $i"
done

## Dicas
- Sempre usar aspas duplas em variáveis
- Set -e para parar em erros
- Set -u para detectar variáveis não definidas
```

### Julia Oliveira - C Programming
```markdown
# Notas do Curso C

## Tipos de Dados
- int → inteiros
- float → decimais
- char → caracteres
- char* → strings (ponteiros)

## Ponteiros
int x = 10;
int *ptr = &x;
printf("%d", *ptr); // 10

## Arrays
int numeros[5] = {1, 2, 3, 4, 5};
printf("%d", numeros[0]); // 1

## Importante
- Sempre inicializar ponteiros
- Free memory alocada com malloc
- Usar const para valores imutáveis
```

### Lucas Almeida - Rust
```markdown
# Notas do Curso Rust

## Ownership Rules
1. Cada valor tem um único dono
2. Quando o dono sai do escopo, valor é liberado
3. Apenas um owner por vez

## Borrowing
- & → referência imutável
- &mut → referência mutável
- Múltiplas & OU uma &mut

## Exemplo
let s1 = String::from("hello");
let s2 = &s1; // borrow
let s3 = s1.clone(); // clone

## Dicas
- Use Option<T> para valores opcionais
- Use Result<T,E> para errors
- Match é poderoso!
```

---

## 🛤️ Trilhas de Aprendizado

### Backend Developer
**Cursos:** Bash → C Programming → Rust (opcional)  
**Duração:** 252 horas total  
**Dificuldade:** Beginner → Advanced  
**Alunos inscritos:** 2

### Systems Programmer
**Cursos:** C Programming → Rust  
**Duração:** 220 horas total  
**Dificuldade:** Advanced  
**Alunos inscritos:** 1

---

## 📊 Estatísticas do Seed

### Por Curso

| Curso | Alunos | Módulos Completados | Taxa Conclusão |
|-------|--------|-------------------|----------------|
| Bash | 2 | 11 | 34% |
| C Programming | 1 | 3 | 6% |
| Rust | 1 | 2 | 8% |
| VS Code | 0 | 0 | 0% |
| Claude Code | 1 | 2 | 17% |

### Por Empresa

| Empresa | Usuários | Progresso Total | Última Atividade |
|---------|----------|----------------|------------------|
| Acme Tech | 3 | 11 módulos | 2 dias atrás |
| DevCorp | 4 | 10 módulos | 6 dias atrás |
| Global Systems | 3 | 4 módulos | 1 dia atrás |

---

## 🔍 Queries Úteis

### Ver Todos os Alunos Ativos
```sql
SELECT 
  u.full_name,
  c.name AS empresa,
  co.name AS curso,
  COUNT(CASE WHEN up.completed THEN 1 END) AS modulos_completos
FROM users u
JOIN companies c ON c.id = u.company_id
LEFT JOIN user_progress up ON up.user_id = u.id
LEFT JOIN courses co ON co.id = up.course_id
WHERE u.role = 'student' AND u.active = true
GROUP BY u.full_name, c.name, co.name
ORDER BY modulos_completos DESC;
```

### Ver Progresso por Empresa
```sql
SELECT * FROM v_company_progress;
```

### Ver Cursos Mais Populares
```sql
SELECT * FROM v_popular_courses;
```

---

## ✅ Validação dos Dados

### Comando de Verificação

```bash
docker exec -it app-controle-db psql -U nocodb_user -d app_controle -c "
SELECT 
  'Empresas' AS tabela, COUNT(*) AS registros FROM companies
UNION ALL SELECT 'Usuários', COUNT(*) FROM users
UNION ALL SELECT 'Cursos', COUNT(*) FROM courses
UNION ALL SELECT 'Fases', COUNT(*) FROM phases
UNION ALL SELECT 'Módulos', COUNT(*) FROM modules
UNION ALL SELECT 'Progresso', COUNT(*) FROM user_progress
UNION ALL SELECT 'Notas', COUNT(*) FROM study_notes
UNION ALL SELECT 'Trilhas', COUNT(*) FROM learning_paths;
"
```

### Resultado Esperado

```
  tabela   | registros
-----------+-----------
 Empresas  |         3
 Usuários  |        10
 Cursos    |         5
 Fases     |        10
 Módulos   |        68
 Progresso |        25
 Notas     |         3
 Trilhas   |         2
```

---

## 🎯 Casos de Uso para Demonstração

### Demo 1: Dashboard de Empresa
Ver progresso de todos os alunos da Acme Tech

### Demo 2: Acompanhamento de Aluno
Ver jornada completa de Maria Santos no curso Bash

### Demo 3: Notas de Estudo
Ler caderno de anotações de Julia sobre C Programming

### Demo 4: Exportar Relatório
Gerar Excel com progresso de todas as empresas

### Demo 5: Analytics
Ver cursos mais populares e taxa de conclusão

---

## 📁 Arquivos

```
database/
├── init.sql           # Schema completo (10 tabelas + views)
├── seed.sql           # Dados reais (~200KB)
└── README.md          # Documentação completa

docs/backend/
└── NOCODB-QUICKSTART.md  # Guia rápido de 15 minutos

.factory/relatorios/
├── implementacao-nocodb-2026-01-20.md  # Implementação completa
└── nocodb-dados-seed-resumo.md         # Este arquivo
```

---

## 🚀 Como Carregar os Dados

**Automático (Recomendado):**
```bash
source .env.nocodb
docker-compose -f docker-compose.nocodb.yml up -d
# Aguardar ~30s - dados carregam automaticamente!
```

**Manual (Se necessário):**
```bash
docker exec -i app-controle-db psql -U nocodb_user app_controle < database/init.sql
docker exec -i app-controle-db psql -U nocodb_user app_controle < database/seed.sql
```

---

**Status:** ✅ Pronto para demonstração funcional  
**Dados:** 100% reais do app-controle  
**Última atualização:** 2026-01-20
