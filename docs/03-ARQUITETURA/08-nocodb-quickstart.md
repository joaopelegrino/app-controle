# NocoDB QuickStart - MVP Simplificado

**Tempo de setup:** ~10 minutos  
**Curso incluído:** Bash Shell Scripting (16 módulos)  
**Requisitos:** Docker + Docker Compose  

---

## 🎯 O Que é Isso?

Este setup adiciona um **dashboard visual** (estilo Excel) para **personas não técnicas** (Gestores de RH, Tech Leads, C-Level) acompanharem:

- 📊 Progresso dos alunos em tempo real
- 👥 Gerenciar usuários e empresas
- 📈 Exportar relatórios para Excel
- 🎓 Ver estatísticas de conclusão

**Tudo sem precisar escrever código ou SQL!**

---

## 🚀 Setup Rápido (3 Passos)

### 1. Preparar Credenciais

```bash
# No diretório do projeto
cd ~/workspace/app-controle

# Copiar exemplo de .env
cp .env.nocodb.example .env.nocodb

# Proteger arquivo
chmod 600 .env.nocodb
```

**💡 Dica:** As credenciais padrão já funcionam. Altere se for para produção.

### 2. Iniciar Serviços

```bash
# Carregar variáveis
source .env.nocodb

# Iniciar PostgreSQL + NocoDB
docker-compose -f docker-compose.nocodb.yml up -d

# Ver logs (aguardar "Application started successfully")
docker-compose -f docker-compose.nocodb.yml logs -f nocodb
```

**Aguardar ~30 segundos** para todos os serviços iniciarem.

### 3. Acessar Dashboard

```
URL:   http://localhost:8080
Email: admin@ultrathink.com
Senha: UltraThink@Admin2026!
```

**✅ Primeiro login:** Todas as tabelas estarão visíveis COM DADOS JÁ CARREGADOS!

---

## 📊 O Que Você Verá

### Dashboard Principal

```
┌─────────────────────────────────────────────┐
│  [☰] NocoDB                    [🔔] [👤]    │
├─────────────────────────────────────────────┤
│  📁 app_controle (COM DADOS!)               │
│    ├── 📊 companies      (2 empresas)       │
│    ├── 👥 users          (7 usuários)       │
│    ├── 📚 courses        (1 curso: Bash)    │
│    ├── 📖 phases         (4 fases)          │
│    ├── 📄 modules        (16 módulos)       │
│    ├── ✅ user_progress  (17 registros)     │
│    ├── 📝 study_notes    (2 notas)          │
│    ├── 📋 audit_logs     (4 logs)           │
│    │                                         │
│    └── 📊 Views (Analytics)                 │
│        ├── v_company_progress               │
│        ├── v_user_dashboard                 │
│        └── v_course_stats                   │
└─────────────────────────────────────────────┘
```

### 📦 Dados Incluídos

**2 Empresas:**
- Acme Tech Solutions (Starter - 20 users)
- DevCorp Consulting (Professional - 50 users)

**7 Usuários:**
- 2 admins (João, Ana)
- 1 teacher (Carlos)
- 4 students (Maria, Pedro, Julia, Lucas)

**1 Curso:**
- 🐚 Bash Shell Scripting (16 módulos, 32h)

**Progresso Realista:**
- Maria Santos: 5 módulos completados
- Pedro Costa: 2 módulos completados
- Julia Oliveira: 3 módulos completados
- Lucas Almeida: 2 módulos completados

---

## 👤 Para Personas Não Técnicas

### 🎯 Gestor de RH / T&D

**Tarefa:** Ver progresso de todos os alunos da minha empresa

```
1. Abrir NocoDB (http://localhost:8080)
2. Sidebar → "v_company_progress" (view)
3. Ver:
   - Total de usuários
   - Usuários ativos
   - Módulos completados
   - Taxa de conclusão média
4. Exportar: "..." → Download → Excel
5. Enviar para CFO/Board
```

**✅ Resultado:** Relatório executivo em 30 segundos.

---

### 👨‍💼 Tech Lead / Instrutor

**Tarefa:** Acompanhar progresso individual de um aluno

```
1. Tabela "user_progress"
2. Filtrar: user_id = "Maria Santos"
3. Ver:
   - Quais módulos completou
   - Quando completou (datas)
   - O que falta fazer
4. Abrir "study_notes" para ver anotações dela
```

**✅ Resultado:** Visibilidade completa da jornada do aluno.

---

### 📊 C-Level / Tomador de Decisão

**Tarefa:** Ver ROI de treinamento para justificar budget

```
1. View "v_course_stats"
2. Ver:
   - Usuários inscritos: 7
   - Taxa de conclusão: ~40%
   - Total de módulos completados: 12
3. View "v_company_progress"
4. Ver progresso por empresa (Acme vs DevCorp)
5. Exportar para Excel → Criar apresentação
```

**✅ Resultado:** Dados concretos para apresentar ao board.

---

## 🎓 Tarefas Comuns (Sem Código!)

### ✅ Adicionar Novo Usuário

```
1. Tabela "users" → "+ Add Record"
2. Preencher:
   - company_id: Selecionar empresa
   - email: novo.aluno@empresa.com
   - full_name: Nome Completo
   - role: "student"
   - password_hash: $2b$10$placeholder (usar hash real em produção)
3. Clicar "Save"
```

**✅ Novo usuário criado!** (Implementar hash de senha real depois)

---

### ✅ Ver Quem Está Progredindo

```
1. Tabela "user_progress"
2. Ordenar por "completed_at" (mais recente primeiro)
3. Ver últimas atividades
4. Filtrar apenas "completed = true"
```

---

### ✅ Exportar Relatório de Empresa

```
1. View "v_company_progress"
2. Selecionar empresa (ex: Acme Tech)
3. Botão "..." → Download → Excel
4. Abrir no Excel → Criar gráfico
```

---

## 🛠️ Comandos Úteis

### Ver Status dos Containers

```bash
docker-compose -f docker-compose.nocodb.yml ps
```

### Ver Logs em Tempo Real

```bash
docker-compose -f docker-compose.nocodb.yml logs -f
```

### Parar Serviços

```bash
docker-compose -f docker-compose.nocodb.yml down
```

### Reiniciar NocoDB

```bash
docker-compose -f docker-compose.nocodb.yml restart nocodb
```

### Verificar Dados no Banco

```bash
docker exec -it app-controle-db psql -U nocodb_user -d app_controle -c "
SELECT 'Empresas' AS tipo, COUNT(*) AS total FROM companies
UNION ALL SELECT 'Usuários', COUNT(*) FROM users
UNION ALL SELECT 'Módulos', COUNT(*) FROM modules
UNION ALL SELECT 'Progresso', COUNT(*) FROM user_progress;"
```

**Resultado esperado:**
```
   tipo    | total
-----------+-------
 Empresas  |     2
 Usuários  |     7
 Módulos   |    16
 Progresso |    17
```

---

## 🔌 Opcional: pgAdmin

Se precisar acessar o banco diretamente (para técnicos):

```bash
# Iniciar com profile tools
docker-compose -f docker-compose.nocodb.yml --profile tools up -d pgadmin

# Acessar: http://localhost:5050
# Email: admin@ultrathink.com
# Senha: UltraThink@Admin2026!
```

---

## ❓ Troubleshooting

### Problema: NocoDB não inicia

```bash
# Ver logs de erro
docker-compose -f docker-compose.nocodb.yml logs nocodb

# Verificar se PostgreSQL está rodando
docker-compose -f docker-compose.nocodb.yml ps postgres
```

**Solução:** Aguardar healthcheck do PostgreSQL (~10s).

---

### Problema: Não consigo fazer login

1. Verificar credenciais em `.env.nocodb`
2. Senha padrão: `UltraThink@Admin2026!`
3. Se esqueceu, recriar containers:
   ```bash
   docker-compose -f docker-compose.nocodb.yml down
   docker-compose -f docker-compose.nocodb.yml up -d
   ```

---

### Problema: Tabelas vazias

```bash
# Verificar se seed.sql rodou
docker exec -it app-controle-db psql -U nocodb_user -d app_controle -c "SELECT COUNT(*) FROM modules;"

# Se retornar 0, rodar seed manualmente:
docker exec -i app-controle-db psql -U nocodb_user app_controle < database/seed.sql
```

---

## 📚 Próximos Passos

1. **Ler:** `docs/backend/PERSONAS-NAO-TECNICAS.md` - Entender quem usa o dashboard
2. **Explorar:** Views de analytics no NocoDB
3. **Customizar:** Criar dashboards personalizados
4. **Integrar:** Conectar React frontend com API do NocoDB (opcional)

---

## 📋 Checklist de Setup

- [ ] Docker e Docker Compose instalados
- [ ] `.env.nocodb` criado e configurado
- [ ] Containers iniciados (`docker-compose up -d`)
- [ ] NocoDB acessível em http://localhost:8080
- [ ] Login realizado com sucesso
- [ ] Tabelas visíveis com dados carregados
- [ ] Verificado: 2 empresas, 7 usuários, 16 módulos
- [ ] Testado: Exportar Excel funciona
- [ ] Testado: Filtrar por empresa funciona

---

## ✅ Pronto para Uso!

**Você agora tem:**
- ✅ Dashboard visual para não-técnicos
- ✅ Dados realistas de 2 empresas + 7 usuários
- ✅ Curso Bash completo (16 módulos)
- ✅ Views de analytics prontas
- ✅ Exportação Excel/CSV funcionando

**Tempo total:** ~10 minutos  
**Próximo:** Explorar dados no NocoDB e criar dashboards customizados!

---

**Documentação completa:** `database/README.md`  
**Personas:** `docs/backend/PERSONAS-NAO-TECNICAS.md`  
**Schema SQL:** `database/init.sql`
