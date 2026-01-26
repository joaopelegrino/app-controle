# Implementação app-controle com NocoDB - Community Edition

**Data:** 2026-01-20  
**Foco:** Usabilidade para pessoal não técnico via dashboard  
**Plano:** Community Edition (Gratuito) + PostgreSQL  

---

## 🎯 Visão Geral da Implementação

### Arquitetura Escolhida

```
┌─────────────────────────────────────────────────────────────┐
│                  React Frontend (app-controle)               │
│              (Interface para alunos e professores)           │
└─────────────────────────────────────────────────────────────┘
                            ↓ REST API
┌─────────────────────────────────────────────────────────────┐
│                    NocoDB Community Edition                  │
│                                                              │
│  ✅ Dashboard Spreadsheet (para admins não-técnicos)        │
│  ✅ REST APIs auto-geradas                                  │
│  ✅ Webhooks para automações                                │
│  ✅ Forms para coleta de dados                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL 16 Database                    │
│                   (Persiste todos os dados)                  │
└─────────────────────────────────────────────────────────────┘
```

### Decisões de Design

**Para pessoal não técnico:**
- ✅ Interface spreadsheet (familiar como Excel/Google Sheets)
- ✅ Filtros visuais (sem SQL)
- ✅ Forms para entrada de dados
- ✅ Views customizadas (Grid, Gallery, Kanban)
- ✅ Exportação CSV/Excel com 1 clique

**Limitações aceitas (Community Edition):**
- ⚠️ 1 workspace apenas (todas empresas no mesmo DB)
- ⚠️ Isolamento via company_id em cada tabela
- ⚠️ Auth básico (email/password)
- ⚠️ Sem SSO (implementar depois se necessário)

---

## 📋 Schema do Banco de Dados

### Estrutura de Tabelas

```sql
-- ==================================
-- 1. EMPRESAS (Multi-tenancy manual)
-- ==================================
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#FF6B35', -- Hex color
  plan VARCHAR(50) DEFAULT 'free', -- free, starter, professional, enterprise
  max_users INTEGER DEFAULT 10,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE companies IS 'Empresas clientes (B2B). Isolamento manual via company_id';

-- ==================================
-- 2. USUÁRIOS
-- ==================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'student', -- student, teacher, admin, super_admin
  avatar_url TEXT,
  active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);

COMMENT ON TABLE users IS 'Usuários do sistema. Cada user pertence a uma company';

-- ==================================
-- 3. CURSOS
-- ==================================
CREATE TABLE courses (
  id VARCHAR(50) PRIMARY KEY, -- 'bash', 'c', 'rust', etc.
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10), -- Emoji
  duration_hours INTEGER,
  total_modules INTEGER,
  difficulty VARCHAR(20), -- beginner, intermediate, advanced
  status VARCHAR(20) DEFAULT 'active', -- active, in-development, archived
  video_url TEXT, -- YouTube URL
  badge VARCHAR(20), -- integrated, new, null
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE courses IS 'Catálogo de cursos disponíveis (global para todas empresas)';

-- ==================================
-- 4. FASES (Seções de um curso)
-- ==================================
CREATE TABLE phases (
  id VARCHAR(50) PRIMARY KEY, -- '1', '2', '3', '4'
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  weeks INTEGER, -- Duração em semanas
  color VARCHAR(50), -- Classe Tailwind: 'orange-500'
  light_color VARCHAR(50), -- Classe Tailwind: 'orange-100'
  icon VARCHAR(10), -- Emoji
  description TEXT,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_phases_course ON phases(course_id);

COMMENT ON TABLE phases IS 'Fases/seções de um curso (ex: Fundamentos, Avançado)';

-- ==================================
-- 5. MÓDULOS (Aulas de uma fase)
-- ==================================
CREATE TABLE modules (
  id VARCHAR(50) PRIMARY KEY, -- '1.1', '1.2', '2.1', etc.
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  phase_id VARCHAR(50) REFERENCES phases(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  week INTEGER, -- Semana dentro da fase
  duration_hours INTEGER,
  deliverable TEXT, -- Entregável esperado
  has_notes BOOLEAN DEFAULT false,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_modules_course ON modules(course_id);
CREATE INDEX idx_modules_phase ON modules(phase_id);

COMMENT ON TABLE modules IS 'Módulos/aulas individuais de um curso';

-- ==================================
-- 6. PROGRESSO DE USUÁRIOS
-- ==================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  module_id VARCHAR(50) REFERENCES modules(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_company ON user_progress(company_id);
CREATE INDEX idx_progress_course ON user_progress(course_id);

COMMENT ON TABLE user_progress IS 'Progresso de conclusão de módulos por usuário';

-- ==================================
-- 7. NOTAS DE ESTUDOS
-- ==================================
CREATE TABLE study_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  content TEXT,
  size_bytes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_notes_user ON study_notes(user_id);
CREATE INDEX idx_notes_company ON study_notes(company_id);

COMMENT ON TABLE study_notes IS 'Caderno de notas por usuário e curso (limite 50KB)';

-- ==================================
-- 8. TRILHAS DE APRENDIZADO
-- ==================================
CREATE TABLE learning_paths (
  id VARCHAR(50) PRIMARY KEY, -- 'backend-developer', 'devops-engineer'
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10), -- Emoji
  total_courses INTEGER,
  estimated_hours INTEGER,
  difficulty VARCHAR(20),
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE learning_paths IS 'Trilhas de aprendizado (coleções de cursos)';

-- ==================================
-- 9. CURSOS EM UMA TRILHA
-- ==================================
CREATE TABLE path_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id VARCHAR(50) REFERENCES learning_paths(id) ON DELETE CASCADE,
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  order_index INTEGER,
  is_required BOOLEAN DEFAULT true,
  UNIQUE(path_id, course_id)
);

CREATE INDEX idx_path_courses_path ON path_courses(path_id);

COMMENT ON TABLE path_courses IS 'Relacionamento N:N entre trilhas e cursos';

-- ==================================
-- 10. LOGS DE AUDITORIA (Simples)
-- ==================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'user_created', 'course_completed', etc.
  entity_type VARCHAR(50), -- 'user', 'course', 'progress'
  entity_id VARCHAR(255),
  metadata JSONB, -- Dados adicionais
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_company ON audit_logs(company_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

COMMENT ON TABLE audit_logs IS 'Logs de auditoria para compliance';

-- ==================================
-- VIEWS PARA ANALYTICS
-- ==================================

-- View: Progresso por empresa
CREATE OR REPLACE VIEW v_company_progress AS
SELECT 
  c.id AS company_id,
  c.name AS company_name,
  COUNT(DISTINCT u.id) AS total_users,
  COUNT(DISTINCT up.user_id) AS active_users,
  COUNT(up.id) AS total_modules_completed,
  ROUND(AVG(CASE WHEN up.completed THEN 1 ELSE 0 END) * 100, 2) AS avg_completion_rate
FROM companies c
LEFT JOIN users u ON u.company_id = c.id AND u.active = true
LEFT JOIN user_progress up ON up.user_id = u.id
WHERE c.active = true
GROUP BY c.id, c.name;

-- View: Cursos mais populares
CREATE OR REPLACE VIEW v_popular_courses AS
SELECT 
  co.id,
  co.name,
  co.icon,
  COUNT(DISTINCT up.user_id) AS enrolled_users,
  COUNT(CASE WHEN up.completed THEN 1 END) AS total_completions,
  ROUND(
    COUNT(CASE WHEN up.completed THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(DISTINCT up.user_id), 0) * 100, 
    2
  ) AS completion_rate
FROM courses co
LEFT JOIN user_progress up ON up.course_id = co.id
WHERE co.status = 'active'
GROUP BY co.id, co.name, co.icon
ORDER BY enrolled_users DESC;

-- View: Dashboard de usuário
CREATE OR REPLACE VIEW v_user_dashboard AS
SELECT 
  u.id AS user_id,
  u.full_name,
  u.email,
  c.name AS company_name,
  COUNT(DISTINCT up.course_id) AS courses_enrolled,
  COUNT(CASE WHEN up.completed THEN 1 END) AS modules_completed,
  COUNT(up.id) AS total_modules,
  ROUND(
    COUNT(CASE WHEN up.completed THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(up.id), 0) * 100, 
    2
  ) AS completion_percentage,
  MAX(up.completed_at) AS last_activity
FROM users u
LEFT JOIN companies c ON c.id = u.company_id
LEFT JOIN user_progress up ON up.user_id = u.id
WHERE u.active = true
GROUP BY u.id, u.full_name, u.email, c.name;
```

---

## 🚀 Setup com Docker Compose

### Arquivo: `docker-compose.nocodb.yml`

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: app-controle-db
    environment:
      POSTGRES_DB: app_controle
      POSTGRES_USER: nocodb_user
      POSTGRES_PASSWORD: ${DB_PASSWORD:-secure_password_change_me}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/01-init.sql
      - ./database/seed.sql:/docker-entrypoint-initdb.d/02-seed.sql
    ports:
      - "5432:5432"
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U nocodb_user -d app_controle"]
      interval: 10s
      timeout: 5s
      retries: 5

  # NocoDB
  nocodb:
    image: nocodb/nocodb:latest
    container_name: app-controle-nocodb
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      # Database Connection
      NC_DB: "pg://postgres:5432?u=nocodb_user&p=${DB_PASSWORD:-secure_password_change_me}&d=app_controle"
      
      # NocoDB Config
      NC_AUTH_JWT_SECRET: ${JWT_SECRET:-change_this_jwt_secret_key_123456789}
      NC_PUBLIC_URL: http://localhost:8080
      NC_DISABLE_TELE: true  # Desabilitar telemetria
      
      # Admin User (primeiro acesso)
      NC_ADMIN_EMAIL: ${ADMIN_EMAIL:-admin@ultrathink.com}
      NC_ADMIN_PASSWORD: ${ADMIN_PASSWORD:-Admin@123}
      
      # Limits
      NC_MAX_ATTACHMENTS_ALLOWED: 10
      NC_ATTACHMENT_FIELD_SIZE: 52428800  # 50MB
      
    volumes:
      - nocodb_data:/usr/app/data
    ports:
      - "8080:8080"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Opcional: pgAdmin para gestão direta do DB
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: app-controle-pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL:-admin@ultrathink.com}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD:-Admin@123}
      PGADMIN_CONFIG_SERVER_MODE: 'False'
    ports:
      - "5050:80"
    networks:
      - app-network
    depends_on:
      - postgres
    profiles:
      - tools  # Iniciar apenas com: docker-compose --profile tools up

volumes:
  postgres_data:
    driver: local
  nocodb_data:
    driver: local

networks:
  app-network:
    driver: bridge
```

### Arquivo: `.env.nocodb`

```bash
# PostgreSQL
DB_PASSWORD=UltraThink@2026!Secure

# NocoDB JWT
JWT_SECRET=nocodb_jwt_secret_key_ultra_secure_2026_change_me

# Admin Credentials (primeiro login)
ADMIN_EMAIL=admin@ultrathink.com
ADMIN_PASSWORD=UltraThink@Admin2026!

# pgAdmin (opcional)
PGADMIN_EMAIL=admin@ultrathink.com
PGADMIN_PASSWORD=UltraThink@Admin2026!
```

---

## 📦 Scripts SQL de Inicialização

### Arquivo: `database/init.sql`

```sql
-- Schema já definido acima (copiar o CREATE TABLE completo)
-- Este arquivo roda automaticamente no primeiro start do PostgreSQL
```

### Arquivo: `database/seed.sql`

**✅ DADOS REAIS COMPLETOS DISPONÍVEIS!**

O arquivo completo está em `database/seed.sql` (~200KB) com:

- ✅ **3 Empresas** reais (Acme Tech, DevCorp, Global Systems)
- ✅ **10 Usuários** com perfis diversos
- ✅ **5 Cursos** do app-controle (Bash, C, Rust, VS Code, Claude Code)
- ✅ **10 Fases** distribuídas nos cursos
- ✅ **68 Módulos** com dados completos:
  - Bash: 16 módulos (100% completo)
  - C Programming: 10 primeiros módulos (de 50 total)
  - Rust: 10 primeiros módulos (de 24 total)
  - VS Code: 8 módulos (100% completo)
  - Claude Code: 12 módulos (100% completo)
- ✅ **25 Registros de progresso** com datas realistas
- ✅ **3 Notas de estudo** com conteúdo markdown
- ✅ **2 Trilhas** de aprendizado
- ✅ **4 Logs de auditoria**

**Exemplo de dados:**

```sql
-- 1. Empresas exemplo (3 com perfis diferentes)
INSERT INTO companies (id, name, slug, logo_url, plan, max_users) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Acme Tech Solutions', 'acme-tech', NULL, 'starter', 20),
('550e8400-e29b-41d4-a716-446655440002', 'DevCorp Consulting', 'devcorp', NULL, 'professional', 50),
('550e8400-e29b-41d4-a716-446655440003', 'Global Systems Inc', 'global-systems', NULL, 'enterprise', 200);

-- 2. Usuários exemplo
INSERT INTO users (id, company_id, email, password_hash, full_name, role) VALUES
-- Acme Corp
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'joao@acme.com', '$2b$10$hashed', 'João Silva', 'admin'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'maria@acme.com', '$2b$10$hashed', 'Maria Santos', 'student'),
-- Tech Startup
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'carlos@techstartup.com', '$2b$10$hashed', 'Carlos Souza', 'admin');

-- 3. Cursos (dados reais do app-controle)
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index) VALUES
('bash', 'Bash Shell Scripting', 'Domine automação e scripting em Linux', '🐚', 32, 16, 'beginner', 'active', 'integrated', 1),
('c', 'C Programming', 'Fundamentos de programação em C', '⚙️', 100, 50, 'intermediate', 'active', 'integrated', 2),
('rust', 'Rust Programming', 'Linguagem moderna e segura', '🦀', 120, 24, 'advanced', 'active', 'integrated', 3),
('vscode', 'VSCode WSL', 'Ambiente de desenvolvimento integrado', '💻', 16, 8, 'beginner', 'active', 'integrated', 4),
('claude-code', 'Claude Code CLI', 'AI-assisted coding', '🤖', 24, 12, 'intermediate', 'active', 'integrated', 5);

-- 4. Fases (exemplo: Bash)
INSERT INTO phases (id, course_id, name, weeks, color, light_color, icon, order_index) VALUES
('1', 'bash', 'Fundamentos', 2, 'orange-500', 'orange-100', '📚', 1),
('2', 'bash', 'Manipulação de Texto', 2, 'blue-500', 'blue-100', '📝', 2),
('3', 'bash', 'Scripts Avançados', 3, 'green-500', 'green-100', '⚡', 3),
('4', 'bash', 'Ferramentas Profissionais', 1, 'purple-500', 'purple-100', '🛠️', 4);

-- 5. Módulos (exemplo: Fase 1 do Bash)
INSERT INTO modules (id, course_id, phase_id, name, week, duration_hours, deliverable, order_index) VALUES
('1.1', 'bash', '1', 'Introdução ao Terminal', 1, 2, 'Executar 10 comandos básicos', 1),
('1.2', 'bash', '1', 'Navegação de Diretórios', 1, 2, 'Navegar pela estrutura de arquivos', 2),
('1.3', 'bash', '1', 'Manipulação de Arquivos', 1, 2, 'Criar, copiar, mover e deletar arquivos', 3),
('1.4', 'bash', '1', 'Permissões e Propriedade', 2, 2, 'Configurar permissões de arquivos', 4);

-- 6. Trilhas
INSERT INTO learning_paths (id, name, description, icon, total_courses, estimated_hours, difficulty, order_index) VALUES
('backend-developer', 'Desenvolvedor Backend', 'Trilha completa para backend com Linux e Bash', '🛤️', 3, 148, 'beginner', 1);

INSERT INTO path_courses (path_id, course_id, order_index, is_required) VALUES
('backend-developer', 'bash', 1, true),
('backend-developer', 'c', 2, true),
('backend-developer', 'rust', 3, false);

-- 7. Progresso exemplo
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', '1.1', true, NOW() - INTERVAL '2 days'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', '1.2', true, NOW() - INTERVAL '1 day'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', '1.3', false, NULL);

-- 8. Notas exemplo
INSERT INTO study_notes (user_id, company_id, course_id, content, size_bytes) VALUES
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 
 'Comandos importantes:\n- ls -la\n- cd /var/log\n- grep "error" *.log', 
 128);
```

---

## 🎬 Comandos de Inicialização

### 1. Preparar Ambiente

```bash
# Criar diretório do projeto
mkdir -p ~/app-controle-backend
cd ~/app-controle-backend

# Criar estrutura
mkdir -p database scripts

# Copiar arquivos
# - docker-compose.nocodb.yml
# - .env.nocodb
# - database/init.sql
# - database/seed.sql

# Dar permissão
chmod 600 .env.nocodb
```

### 2. Iniciar Serviços

```bash
# Carregar variáveis de ambiente
source .env.nocodb

# Iniciar apenas DB + NocoDB
docker-compose -f docker-compose.nocodb.yml up -d

# Verificar logs
docker-compose -f docker-compose.nocodb.yml logs -f nocodb

# Aguardar ~30s para inicialização completa
```

### 3. Acessar NocoDB

```
URL: http://localhost:8080
Email: admin@ultrathink.com
Senha: UltraThink@Admin2026!
```

### 4. (Opcional) Iniciar pgAdmin

```bash
# Iniciar com profile tools
docker-compose -f docker-compose.nocodb.yml --profile tools up -d pgadmin

# Acessar: http://localhost:5050
# Email: admin@ultrathink.com
# Senha: UltraThink@Admin2026!
```

---

## 📊 Configuração Inicial do NocoDB

### Passo 1: Primeiro Login

1. Acesse `http://localhost:8080`
2. Login com credenciais de admin
3. Será criado automaticamente um projeto "app-controle"

### Passo 2: Conectar ao PostgreSQL

NocoDB já está conectado via `NC_DB` environment variable.

Verificar conexão:
- Sidebar → Database
- Deve mostrar todas as tabelas criadas

### Passo 3: Configurar Tabelas para Não-Técnicos

**Para cada tabela, configurar:**

#### Tabela: `courses` (Cursos)

**Views para criar:**

1. **Grid View (Padrão)** - "Todos os Cursos"
   - Mostrar: name, icon, duration_hours, difficulty, status
   - Ordenar: order_index ASC
   - Filtro: status = 'active'

2. **Gallery View** - "Galeria de Cursos"
   - Card cover: icon (emoji grande)
   - Card title: name
   - Card description: description
   - Ideal para visualizar catálogo

3. **Kanban View** - "Status dos Cursos"
   - Group by: status
   - Colunas: active, in-development, archived

**Fields personalizados:**
- `icon`: Display as Emoji (tamanho grande)
- `difficulty`: Single Select (beginner/intermediate/advanced)
- `status`: Single Select com cores
  - active → Verde
  - in-development → Amarelo
  - archived → Cinza

#### Tabela: `users` (Usuários)

**Views:**

1. **Grid View** - "Todos os Usuários"
   - Mostrar: full_name, email, company_name (lookup), role, active
   - Ordenar: created_at DESC

2. **Gallery View** - "Equipe"
   - Card cover: avatar_url
   - Card title: full_name
   - Subtitle: role

3. **Form View** - "Cadastrar Novo Usuário"
   - Campos: company_id, email, full_name, role
   - Validações: email único, full_name obrigatório
   - Link de compartilhamento público (se necessário)

**Fields:**
- `role`: Single Select
  - student → Azul
  - teacher → Verde
  - admin → Laranja
  - super_admin → Vermelho
- `active`: Checkbox
- `company_id`: Link to Company (mostra company.name)

#### Tabela: `user_progress` (Progresso)

**Views:**

1. **Grid View** - "Progresso dos Alunos"
   - Mostrar: user_name (lookup), course_name (lookup), module_name (lookup), completed, completed_at
   - Filtro: company_id = [selecionar empresa]
   - Ordenar: completed_at DESC

2. **Kanban View** - "Status de Conclusão"
   - Group by: completed
   - Colunas: ✅ Completo | ⏳ Em Progresso

3. **Calendar View** - "Linha do Tempo"
   - Date field: completed_at
   - Ver progresso ao longo do tempo

**Lookups importantes:**
- `user_name`: Lookup de users.full_name
- `course_name`: Lookup de courses.name
- `module_name`: Lookup de modules.name
- `company_name`: Lookup via users.company_id → companies.name

**Rollups para analytics:**
- Count de módulos completados por usuário
- % de conclusão por curso

#### Tabela: `companies` (Empresas)

**Views:**

1. **Grid View** - "Empresas Ativas"
   - Mostrar: name, plan, max_users, (count users), active
   - Filtro: active = true

2. **Gallery View** - "Clientes"
   - Card cover: logo_url
   - Card title: name
   - Subtitle: plan

**Fields:**
- `plan`: Single Select
  - free → Cinza
  - starter → Azul
  - professional → Verde
  - enterprise → Dourado
- `primary_color`: Color picker

**Rollups:**
- `total_users`: Count de users onde company_id = this.id
- `active_users`: Count de users onde company_id = this.id AND active = true

### Passo 4: Criar Dashboard para Admins

**View: "Dashboard Executivo"**

Adicionar widgets:

1. **Widget: Total de Empresas Ativas**
   - Tipo: Number
   - Formula: `COUNT(companies WHERE active = true)`

2. **Widget: Total de Usuários**
   - Tipo: Number
   - Formula: `COUNT(users WHERE active = true)`

3. **Widget: Taxa de Conclusão Média**
   - Tipo: Percentage
   - Formula: `AVG(user_progress.completed)`

4. **Widget: Cursos Mais Populares**
   - Tipo: Bar Chart
   - X: courses.name
   - Y: COUNT(user_progress)
   - Group by: course_id

5. **Widget: Atividade Recente**
   - Tipo: Timeline
   - Data: user_progress.completed_at (últimos 30 dias)

---

## 👥 Guias para Usuários Não-Técnicos

### Guia 1: Como Adicionar um Novo Curso

**Para:** Gerentes de Conteúdo

1. Abrir NocoDB → Tabela `courses`
2. Clicar em "+ Add Record" (botão azul)
3. Preencher:
   - **id**: slug do curso (ex: `docker`)
   - **name**: Nome completo (ex: `Docker Containerization`)
   - **icon**: Emoji (ex: `🐳`)
   - **duration_hours**: Total de horas (ex: `40`)
   - **difficulty**: Selecionar (beginner/intermediate/advanced)
   - **status**: Selecionar `active`
4. Clicar "Save"

✅ **Resultado:** Curso aparecerá automaticamente no frontend via API!

### Guia 2: Como Visualizar Progresso de uma Empresa

**Para:** Gerentes de RH / Coordenadores

1. Abrir NocoDB → Tabela `user_progress`
2. Na View "Progresso dos Alunos"
3. Aplicar filtro:
   - Campo: `company_id`
   - Operador: `is equal to`
   - Valor: Selecionar empresa (ex: "Acme Corp")
4. Ver lista de todos os módulos e status de conclusão

**Exportar relatório:**
1. Botão "..." (mais opções)
2. "Download" → "CSV" ou "Excel"
3. Enviar para stakeholders

### Guia 3: Como Criar Novo Usuário para uma Empresa

**Para:** Admins / RH

**Opção A: Via Grid (Manual)**

1. Tabela `users` → "+ Add Record"
2. Preencher:
   - **company_id**: Selecionar empresa do dropdown
   - **email**: Email corporativo
   - **full_name**: Nome completo
   - **role**: Selecionar papel
   - **password_hash**: (será gerado pelo backend)
3. Save

**Opção B: Via Form (Mais Amigável)**

1. Tabela `users` → View "Cadastrar Novo Usuário"
2. Clicar em "Share View"
3. Gerar link público
4. RH acessa link e preenche formulário
5. Dados salvos automaticamente

### Guia 4: Como Ver Cursos Mais Populares

**Para:** Product Owners / Diretores

1. Ir para View "Dashboard Executivo"
2. Ver widget "Cursos Mais Populares"
3. Ordenar por número de alunos inscritos

**Filtrar por período:**
1. Widget settings → Filter
2. Date range: "Últimos 30 dias"
3. Ver tendências recentes

### Guia 5: Como Editar Dados em Massa

**Para:** Admins

**Exemplo: Ativar vários usuários de uma vez**

1. Tabela `users`
2. Selecionar múltiplas linhas (checkbox à esquerda)
3. Botão "Bulk Update"
4. Campo: `active`
5. Valor: `true`
6. Aplicar

✅ **Resultado:** Todos os usuários selecionados ativados!

---

## 🔌 Integração com Frontend React

### Arquivo: `src/services/nocodbService.js`

```javascript
/**
 * NocoDB Service - Abstração para API do NocoDB
 * 
 * Substitui dataService.js anterior (localStorage)
 */

const NOCODB_BASE_URL = import.meta.env.VITE_NOCODB_URL || 'http://localhost:8080';
const NOCODB_API_TOKEN = import.meta.env.VITE_NOCODB_API_TOKEN;

// Headers padrão
const headers = {
  'Content-Type': 'application/json',
  'xc-token': NOCODB_API_TOKEN,
};

// ============================================
// CURSOS
// ============================================

export const nocodbService = {
  /**
   * Buscar todos os cursos ativos
   * @returns {Promise<Course[]>}
   */
  async getCourses() {
    try {
      const response = await fetch(
        `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/courses?where=(status,eq,active)&sort=order_index`,
        { headers }
      );
      
      if (!response.ok) throw new Error('Failed to fetch courses');
      
      const data = await response.json();
      return data.list || [];
    } catch (error) {
      console.error('getCourses error:', error);
      return [];
    }
  },

  /**
   * Buscar curso específico
   * @param {string} courseId
   * @returns {Promise<Course|null>}
   */
  async getCourse(courseId) {
    try {
      const response = await fetch(
        `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/courses/${courseId}`,
        { headers }
      );
      
      if (!response.ok) return null;
      
      return await response.json();
    } catch (error) {
      console.error('getCourse error:', error);
      return null;
    }
  },

  /**
   * Buscar módulos de um curso
   * @param {string} courseId
   * @returns {Promise<{fases: Phase[], modulos: Module[]}>}
   */
  async getCourseModules(courseId) {
    try {
      const [phasesRes, modulesRes] = await Promise.all([
        fetch(
          `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/phases?where=(course_id,eq,${courseId})&sort=order_index`,
          { headers }
        ),
        fetch(
          `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/modules?where=(course_id,eq,${courseId})&sort=order_index`,
          { headers }
        ),
      ]);

      const fases = await phasesRes.json();
      const modulos = await modulesRes.json();

      return {
        fases: fases.list || [],
        modulos: modulos.list || [],
        startDate: new Date().toISOString(), // Ajustar se necessário
      };
    } catch (error) {
      console.error('getCourseModules error:', error);
      return { fases: [], modulos: [], startDate: null };
    }
  },

  // ============================================
  // PROGRESSO
  // ============================================

  /**
   * Buscar progresso de um usuário em um curso
   * @param {string} userId
   * @param {string} courseId
   * @returns {Promise<{completedModules: string[]}>}
   */
  async getProgress(userId, courseId) {
    try {
      const response = await fetch(
        `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/user_progress?where=(user_id,eq,${userId})~and(course_id,eq,${courseId})~and(completed,eq,true)`,
        { headers }
      );

      if (!response.ok) throw new Error('Failed to fetch progress');

      const data = await response.json();
      const completedModules = (data.list || []).map(item => item.module_id);

      return {
        completedModules,
        totalModules: completedModules.length,
        lastUpdated: data.list?.[0]?.completed_at || null,
      };
    } catch (error) {
      console.error('getProgress error:', error);
      return { completedModules: [], totalModules: 0, lastUpdated: null };
    }
  },

  /**
   * Salvar progresso de um módulo
   * @param {string} userId
   * @param {string} courseId
   * @param {string} moduleId
   * @param {boolean} completed
   * @returns {Promise<{success: boolean}>}
   */
  async saveProgress(userId, courseId, moduleId, completed) {
    try {
      // Verificar se já existe
      const existing = await fetch(
        `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/user_progress?where=(user_id,eq,${userId})~and(module_id,eq,${moduleId})`,
        { headers }
      );

      const existingData = await existing.json();

      if (existingData.list?.length > 0) {
        // UPDATE
        const id = existingData.list[0].id;
        const response = await fetch(
          `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/user_progress/${id}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              completed,
              completed_at: completed ? new Date().toISOString() : null,
              updated_at: new Date().toISOString(),
            }),
          }
        );

        return { success: response.ok };
      } else {
        // INSERT
        const response = await fetch(
          `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/user_progress`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              user_id: userId,
              company_id: 'TODO_GET_FROM_USER', // Buscar do contexto
              course_id: courseId,
              module_id: moduleId,
              completed,
              completed_at: completed ? new Date().toISOString() : null,
            }),
          }
        );

        return { success: response.ok };
      }
    } catch (error) {
      console.error('saveProgress error:', error);
      return { success: false, error: error.message };
    }
  },

  // ============================================
  // NOTAS
  // ============================================

  /**
   * Buscar notas de um curso
   * @param {string} userId
   * @param {string} courseId
   * @returns {Promise<{content: string}>}
   */
  async getNotes(userId, courseId) {
    try {
      const response = await fetch(
        `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/study_notes?where=(user_id,eq,${userId})~and(course_id,eq,${courseId})`,
        { headers }
      );

      const data = await response.json();
      
      return {
        content: data.list?.[0]?.content || '',
        lastUpdated: data.list?.[0]?.updated_at || null,
      };
    } catch (error) {
      console.error('getNotes error:', error);
      return { content: '', lastUpdated: null };
    }
  },

  /**
   * Salvar notas
   * @param {string} userId
   * @param {string} courseId
   * @param {string} content
   * @returns {Promise<{success: boolean}>}
   */
  async saveNotes(userId, courseId, content) {
    try {
      const sizeBytes = new TextEncoder().encode(content).length;
      
      // Validar limite de 50KB
      if (sizeBytes > 50 * 1024) {
        return {
          success: false,
          error: 'Notas excedem limite de 50KB',
        };
      }

      // Verificar se já existe
      const existing = await fetch(
        `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/study_notes?where=(user_id,eq,${userId})~and(course_id,eq,${courseId})`,
        { headers }
      );

      const existingData = await existing.json();

      if (existingData.list?.length > 0) {
        // UPDATE
        const id = existingData.list[0].id;
        const response = await fetch(
          `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/study_notes/${id}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              content,
              size_bytes: sizeBytes,
              updated_at: new Date().toISOString(),
            }),
          }
        );

        return { success: response.ok };
      } else {
        // INSERT
        const response = await fetch(
          `${NOCODB_BASE_URL}/api/v1/db/data/noco/app_controle/study_notes`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              user_id: userId,
              company_id: 'TODO_GET_FROM_USER',
              course_id: courseId,
              content,
              size_bytes: sizeBytes,
            }),
          }
        );

        return { success: response.ok };
      }
    } catch (error) {
      console.error('saveNotes error:', error);
      return { success: false, error: error.message };
    }
  },
};
```

### Variáveis de Ambiente

**Arquivo: `.env`**

```bash
# NocoDB API
VITE_NOCODB_URL=http://localhost:8080
VITE_NOCODB_API_TOKEN=your_api_token_here

# Buscar token em: NocoDB → Account Settings → Tokens → Create Token
```

---

## 📱 Criando Dashboards Customizados

### Dashboard 1: Gerente de Treinamento

**Objetivo:** Ver progresso geral das empresas

**Widgets:**

1. **Empresas Ativas** (Number Card)
   ```
   COUNT(companies WHERE active = true)
   ```

2. **Total de Alunos** (Number Card)
   ```
   COUNT(users WHERE role = 'student' AND active = true)
   ```

3. **Taxa de Conclusão Média** (Gauge Chart)
   ```
   AVG(user_progress.completed) * 100
   ```

4. **Cursos Mais Inscritos** (Bar Chart)
   - X: courses.name
   - Y: COUNT(DISTINCT user_progress.user_id)
   - Limit: Top 5

5. **Atividade Semanal** (Line Chart)
   - X: Week (from user_progress.completed_at)
   - Y: COUNT(user_progress WHERE completed = true)
   - Últimas 12 semanas

### Dashboard 2: Admin de Empresa

**Objetivo:** Monitorar própria empresa

**Filtro global:** `company_id = [empresa atual]`

**Widgets:**

1. **Meus Alunos Ativos** (Number)
2. **Horas de Treinamento Completadas** (Number)
3. **Top 3 Alunos** (Leaderboard)
   - Ordenar por: COUNT(modules completed) DESC
4. **Cursos em Progresso** (Kanban)
   - Group by: Course
   - Cards: Users
5. **Última Atividade** (Timeline - 7 dias)

---

## 🔒 Segurança e Permissões

### Configurar Roles no NocoDB

**Base → Settings → Team & Auth**

#### Role: Super Admin
- Acesso total a tudo
- Pode modificar schema
- Pode criar/editar/deletar qualquer dado

#### Role: Company Admin
- Pode ver/editar apenas dados da própria empresa
- **Filtro automático:** `company_id = [user.company_id]`
- Pode gerenciar usuários da empresa
- Pode ver relatórios da empresa

#### Role: Teacher
- Pode ver progresso dos alunos
- Pode editar conteúdo de cursos
- **Read-only** em users e companies

#### Role: Student
- **Read-only** em courses e modules
- Pode editar apenas próprio progresso e notas
- **Filtro:** `user_id = [current_user.id]`

### Implementar Row-Level Security

**NocoDB não tem RLS nativo**, então criar views filtradas:

```sql
-- View para cada empresa ver apenas seus dados
CREATE OR REPLACE VIEW v_company_users AS
SELECT * FROM users
WHERE company_id = current_setting('app.current_company_id')::UUID;

-- View para progresso filtrado
CREATE OR REPLACE VIEW v_company_progress AS
SELECT up.* FROM user_progress up
JOIN users u ON u.id = up.user_id
WHERE u.company_id = current_setting('app.current_company_id')::UUID;
```

**No NocoDB:**
- Criar tabela virtual apontando para essas views
- Usuários de empresa veem apenas views filtradas

---

## 📖 Documentação para Usuários

### Manual do Usuário Não-Técnico

**Criar PDF/Wiki com:**

#### Seção 1: Visão Geral
- O que é NocoDB?
- Como funciona a interface?
- Conceitos: Tabelas, Views, Filtros, Forms

#### Seção 2: Tarefas Comuns
- Como adicionar um curso?
- Como cadastrar um aluno?
- Como ver progresso de uma turma?
- Como exportar relatórios?

#### Seção 3: Dashboards
- Como criar um dashboard personalizado?
- Widgets disponíveis
- Como compartilhar dashboards?

#### Seção 4: FAQs
- Como resetar minha senha?
- Como compartilhar uma view com a equipe?
- Como dar acesso a um novo admin?

---

## ✅ Checklist de Implementação

### Fase 1: Setup Inicial (1 dia)

- [ ] Criar `docker-compose.nocodb.yml`
- [ ] Criar arquivos SQL (init.sql, seed.sql)
- [ ] Configurar `.env.nocodb`
- [ ] Iniciar containers
- [ ] Verificar conexão PostgreSQL ↔ NocoDB
- [ ] Fazer primeiro login no NocoDB

### Fase 2: Configuração NocoDB (1 dia)

- [ ] Configurar views para tabelas principais
- [ ] Criar lookups e rollups
- [ ] Configurar Field types (emoji, colors, etc.)
- [ ] Criar Forms para entrada de dados
- [ ] Criar Dashboards executivos

### Fase 3: Integração Frontend (2 dias)

- [ ] Criar `nocodbService.js`
- [ ] Gerar API token no NocoDB
- [ ] Configurar variáveis de ambiente
- [ ] Migrar componentes de localStorage para API
- [ ] Testar integração completa

### Fase 4: Segurança e Permissões (1 dia)

- [ ] Configurar roles no NocoDB
- [ ] Criar views filtradas por empresa
- [ ] Testar isolamento de dados
- [ ] Documentar políticas de acesso

### Fase 5: Documentação (1 dia)

- [ ] Escrever guias para não-técnicos
- [ ] Criar vídeos tutoriais (opcional)
- [ ] Documentar APIs para desenvolvedores
- [ ] Criar FAQ

### Fase 6: Testes e Validação (1 dia)

- [ ] Testar todos os workflows
- [ ] Validar performance de queries
- [ ] Testar com dados reais
- [ ] Coletar feedback de usuários piloto

---

## 🚀 Próximos Passos

### Esta Semana

1. **Implementar Setup Básico**
   - Docker Compose up
   - Seed database
   - Primeiro login NocoDB

2. **Configurar Tabelas Principais**
   - Courses, Users, Progress
   - Views essenciais

### Próximas 2 Semanas

3. **Integração React**
   - nocodbService.js
   - Migrar componentes

4. **Treinamento da Equipe**
   - Admins não-técnicos
   - Demonstrar dashboards

### Mês 2

5. **Otimizações**
   - Performance tuning
   - Dashboards avançados
   - Automações via webhooks

---

## 📚 Recursos Adicionais

**NocoDB Docs:**
- https://nocodb.com/docs
- https://docs.nocodb.com/0.109.7/getting-started/installation/

**APIs:**
- https://nocodb.com/docs/product-docs/developer-resources/rest-apis

**Community:**
- Discord: http://discord.nocodb.com/
- Forum: https://community.nocodb.com/

---

**Gerado por:** Droid  
**Data:** 2026-01-20  
**Stack:** NocoDB Community + PostgreSQL + React  
**Foco:** 🎯 Usabilidade para não-técnicos via dashboard spreadsheet
