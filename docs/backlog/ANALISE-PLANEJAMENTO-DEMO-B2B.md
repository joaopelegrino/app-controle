# Análise e Planejamento - Demo B2B Completa

**Branch:** demo-nocodb-simple
**Data:** 2026-01-22
**Objetivo:** Transformar branch em repositório demonstrativo completo

---

## 1. Análise do Estado Atual

### 1.1 Schema PostgreSQL (Existente)

```
╔══════════════════════════════════════════════════════════════════╗
║  TABELAS EXISTENTES                                              ║
╠══════════════════════════════════════════════════════════════════╣
║  companies     │ Multi-tenancy (id, name, slug, plan)            ║
║  users         │ Usuários (id, company_id, role*, email)         ║
║  courses       │ Cursos (id, name, icon, modules, hours)         ║
║  phases        │ Fases/Seções (id, course_id, name)              ║
║  modules       │ Aulas (id, course_id, phase_id, name)           ║
║  user_progress │ Progresso (user_id, module_id, completed)       ║
║  study_notes   │ Notas (user_id, course_id, content)             ║
║  audit_logs    │ Auditoria (action, entity_type, metadata)       ║
╠══════════════════════════════════════════════════════════════════╣
║  * role: student | teacher | admin (falta c_level)               ║
╚══════════════════════════════════════════════════════════════════╝
```

### 1.2 Dados Seed Existentes

| Entidade | Quantidade | Observação |
|----------|------------|------------|
| Companies | 2 | Acme Tech, DevCorp |
| Users | 7 | 2 admin, 1 teacher, 4 students |
| Courses | 1 | Bash Shell Scripting |
| Phases | 4 | 4 seções do Bash |
| Modules | 16 | 16 aulas completas |
| Progress | 12 | Progresso de exemplo |
| Notes | 2 | Notas de exemplo |

### 1.3 Frontend (Existente)

```
╔══════════════════════════════════════════════════════════════════╗
║  COMPONENTES EXISTENTES                                          ║
╠══════════════════════════════════════════════════════════════════╣
║  HubView.jsx              │ Hub principal (Caminhos + Áreas)     ║
║  LearningPathView.jsx     │ Display de trilhas                   ║
║  GenericLearningSystem.jsx│ Sistema de curso unificado           ║
║  UserDashboard.jsx        │ Dashboard usuário (localStorage)     ║
║  AdminDashboard.jsx       │ Dashboard admin (localStorage)       ║
╠══════════════════════════════════════════════════════════════════╣
║  DADOS FRONTEND (src/data/)                                      ║
╠══════════════════════════════════════════════════════════════════╣
║  studyAreas.js            │ Apenas Bash ativo                    ║
║  bashLearningData.js      │ 4 fases, 16 módulos                  ║
║  caminhoExemploData.js    │ Caminho "Desenvolvedor Backend"      ║
╠══════════════════════════════════════════════════════════════════╣
║  ⚠️ PROBLEMA: Frontend usa localStorage, não conecta ao backend ║
╚══════════════════════════════════════════════════════════════════╝
```

### 1.4 Gap Analysis

```
╔══════════════════════════════════════════════════════════════════╗
║  O QUE FALTA PARA DEMO B2B COMPLETA                             ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  BACKEND (PostgreSQL/NocoDB)                                     ║
║  ────────────────────────────                                    ║
║  ❌ Tabela learning_paths (Caminhos Propostos)                   ║
║  ❌ Tabela learning_path_courses (cursos do caminho)             ║
║  ❌ Role 'c_level' na tabela users                               ║
║  ❌ Dados completos para demo (users por role)                   ║
║                                                                   ║
║  FRONTEND (React)                                                ║
║  ────────────────────────────                                    ║
║  ❌ LoginView.jsx (tela de login)                                ║
║  ❌ AuthContext.jsx (estado de autenticação)                     ║
║  ❌ useAuth.js (hook de autenticação)                            ║
║  ❌ apiService.js (conexão com NocoDB)                           ║
║  ❌ PrivateRoute.jsx (proteção de rotas)                         ║
║  ❌ RoleBasedAccess.jsx (controle por role)                      ║
║                                                                   ║
║  INTEGRAÇÃO                                                       ║
║  ────────────────────────────                                    ║
║  ❌ Sincronização de progresso FE ↔ BE                           ║
║  ❌ Sincronização de notas FE ↔ BE                               ║
║  ❌ Dashboard conectado às views do PostgreSQL                   ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 2. Mapeamento de Dados Necessários

### 2.1 Usuários por Role (Demo)

Para demonstrar RBAC completo, precisamos de usuários em cada role:

```sql
-- Matriz de usuários para demo
╔══════════════════════════════════════════════════════════════════╗
║  EMPRESA: ACME TECH SOLUTIONS (Starter - 20 users)               ║
╠════════════════╦═════════════════════╦═══════════════════════════╣
║  Role          ║ Email               ║ Nome                      ║
╠════════════════╬═════════════════════╬═══════════════════════════╣
║  c_level       ║ ceo@acmetech.com    ║ Roberto Mendes (CEO)      ║
║  admin         ║ admin@acmetech.com  ║ João Silva (RH)           ║
║  instructor    ║ prof@acmetech.com   ║ Fernanda Lima (Tech Lead) ║
║  student       ║ maria@acmetech.com  ║ Maria Santos              ║
║  student       ║ pedro@acmetech.com  ║ Pedro Costa               ║
║  student       ║ ana@acmetech.com    ║ Ana Ferreira              ║
╚════════════════╩═════════════════════╩═══════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║  EMPRESA: DEVCORP CONSULTING (Professional - 50 users)           ║
╠════════════════╦═════════════════════╦═══════════════════════════╣
║  Role          ║ Email               ║ Nome                      ║
╠════════════════╬═════════════════════╬═══════════════════════════╣
║  c_level       ║ cto@devcorp.com     ║ Carla Souza (CTO)         ║
║  admin         ║ admin@devcorp.com   ║ Lucas Oliveira (RH)       ║
║  instructor    ║ prof@devcorp.com    ║ Carlos Santos (Arquiteto) ║
║  student       ║ julia@devcorp.com   ║ Julia Almeida             ║
║  student       ║ bruno@devcorp.com   ║ Bruno Costa               ║
║  student       ║ camila@devcorp.com  ║ Camila Rocha              ║
╚════════════════╩═════════════════════╩═══════════════════════════╝
```

### 2.2 Credenciais de Demo

```
╔══════════════════════════════════════════════════════════════════╗
║  CREDENCIAIS PARA DEMONSTRAÇÃO                                   ║
╠══════════════════════════════════════════════════════════════════╣
║  Todos os usuários usam a mesma senha: Demo@2026                 ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Para demonstrar cada perfil:                                    ║
║                                                                   ║
║  C-Level (Visão executiva):                                      ║
║    Email: ceo@acmetech.com                                       ║
║    Vê: KPIs, ROI, métricas globais                              ║
║                                                                   ║
║  Admin (Gestão RH/T&D):                                          ║
║    Email: admin@acmetech.com                                     ║
║    Vê: Todos usuários, progresso, relatórios                    ║
║                                                                   ║
║  Instructor (Tech Lead):                                         ║
║    Email: prof@acmetech.com                                      ║
║    Vê: Alunos da turma, pode criar conteúdo                     ║
║                                                                   ║
║  Student (Desenvolvedor):                                        ║
║    Email: maria@acmetech.com                                     ║
║    Vê: Seus cursos, seu progresso, suas notas                   ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

### 2.3 Caminho Proposto (Learning Path)

Estrutura de dados para o caminho "Desenvolvedor Backend":

```sql
-- Tabela: learning_paths
╔═══════════════════════════════════════════════════════════════════╗
║  id              │ 'backend-developer'                            ║
║  name            │ 'Desenvolvedor Backend'                        ║
║  icon            │ '🛤️'                                           ║
║  description     │ 'Caminho para dominar desenvolvimento backend' ║
║  badge           │ 'exemplo'                                      ║
║  order_index     │ 1                                              ║
║  active          │ true                                           ║
╚═══════════════════════════════════════════════════════════════════╝

-- Tabela: learning_path_courses
╔═══════════════════════════════════════════════════════════════════╗
║  path_id         │ course_id │ order │ available │ highlight      ║
╠═══════════════════════════════════════════════════════════════════╣
║  backend-dev     │ bash      │ 1     │ true      │ 'Referência'   ║
║  backend-dev     │ linux     │ 2     │ false     │ null           ║
║  backend-dev     │ docker    │ 3     │ false     │ null           ║
║  backend-dev     │ devops    │ 4     │ false     │ null           ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 2.4 Curso Bash - Módulo 1.1 Detalhado

Para comunicação FE↔BE, o módulo 1.1 precisa de dados ricos:

```sql
-- Estrutura completa do módulo 1.1
╔═══════════════════════════════════════════════════════════════════╗
║  MÓDULO: bash-1.1 - Introdução ao Shell Scripting                ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  Metadados:                                                        ║
║    id: 'bash-1.1'                                                 ║
║    course_id: 'bash'                                              ║
║    phase_id: 'bash-1'                                             ║
║    name: 'Introdução ao Curso + História Unix/Linux'              ║
║    week: 1                                                         ║
║    duration: '1 semana'                                           ║
║    order_index: 1                                                  ║
║    has_notes: true                                                 ║
║                                                                    ║
║  Conteúdo (para tabela module_content - futura):                  ║
║    video_url: 'https://...'                                       ║
║    transcript: '...'                                              ║
║    resources: [{...}]                                             ║
║    objectives: ['Compreender história Unix', 'Conhecer Bash']     ║
║                                                                    ║
║  Entregável:                                                       ║
║    'Compreensão da história e contexto do shell scripting'        ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## 3. Alterações de Schema Necessárias

### 3.1 Atualizar campo role em users

```sql
-- Alterar constraint de role para incluir c_level
ALTER TABLE users
DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE users
ADD CONSTRAINT users_role_check
CHECK (role IN ('student', 'instructor', 'admin', 'c_level'));

-- Atualizar default
COMMENT ON COLUMN users.role IS 'Roles: student, instructor, admin, c_level';
```

### 3.2 Criar tabela learning_paths

```sql
-- Tabela para Caminhos Propostos
CREATE TABLE learning_paths (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(10),
  description TEXT,
  badge VARCHAR(50),
  order_index INTEGER,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE learning_paths IS 'Caminhos de aprendizado (trilhas de cursos)';
```

### 3.3 Criar tabela learning_path_courses

```sql
-- Relação N:N entre paths e courses
CREATE TABLE learning_path_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id VARCHAR(50) REFERENCES learning_paths(id) ON DELETE CASCADE,
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  available BOOLEAN DEFAULT false,
  highlight VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(path_id, course_id)
);

CREATE INDEX idx_lpc_path ON learning_path_courses(path_id);
CREATE INDEX idx_lpc_course ON learning_path_courses(course_id);

COMMENT ON TABLE learning_path_courses IS 'Cursos que compõem cada caminho de aprendizado';
```

### 3.4 Criar cursos placeholder

```sql
-- Cursos planejados (não disponíveis ainda)
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, order_index) VALUES
('linux', 'Linux Fundamentals', 'Sistema operacional, comandos e administração', '🐧', 24, 12, 'beginner', 'in-development', 2),
('docker', 'Docker & Containers', 'Containerização, imagens e orquestração', '🐳', 20, 10, 'intermediate', 'in-development', 3),
('devops', 'DevOps Essentials', 'CI/CD, automação e práticas modernas', '⚙️', 30, 15, 'intermediate', 'in-development', 4);
```

---

## 4. Fluxo de Comunicação FE ↔ BE

### 4.1 Arquitetura de Integração

```
╔══════════════════════════════════════════════════════════════════╗
║                    FLUXO DE DADOS                                ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐   ║
║  │   Frontend  │────▶│  apiService  │────▶│  NocoDB REST    │   ║
║  │   (React)   │◀────│    .js       │◀────│     API         │   ║
║  └─────────────┘     └──────────────┘     └────────┬────────┘   ║
║        │                                           │             ║
║        │                                           ▼             ║
║        │                                    ┌─────────────┐      ║
║        │                                    │ PostgreSQL  │      ║
║        │                                    │   + Views   │      ║
║        │                                    └─────────────┘      ║
║        │                                                         ║
║        ▼                                                         ║
║  ┌─────────────┐                                                 ║
║  │ localStorage│  (Cache offline / fallback)                     ║
║  └─────────────┘                                                 ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

### 4.2 Endpoints NocoDB

```javascript
// Endpoints que serão usados pelo apiService.js
const NOCODB_ENDPOINTS = {
  // Autenticação
  auth: {
    login: 'POST /api/v1/db/auth/user/signin',
    signup: 'POST /api/v1/db/auth/user/signup',
    me: 'GET /api/v1/db/auth/user/me',
    refresh: 'POST /api/v1/db/auth/token/refresh'
  },

  // Cursos
  courses: {
    list: 'GET /api/v1/db/data/v1/app-controle/courses',
    get: 'GET /api/v1/db/data/v1/app-controle/courses/:id',
    phases: 'GET /api/v1/db/data/v1/app-controle/phases?where=(course_id,eq,:id)',
    modules: 'GET /api/v1/db/data/v1/app-controle/modules?where=(course_id,eq,:id)'
  },

  // Learning Paths
  paths: {
    list: 'GET /api/v1/db/data/v1/app-controle/learning_paths',
    get: 'GET /api/v1/db/data/v1/app-controle/learning_paths/:id',
    courses: 'GET /api/v1/db/data/v1/app-controle/learning_path_courses?where=(path_id,eq,:id)'
  },

  // Progresso
  progress: {
    list: 'GET /api/v1/db/data/v1/app-controle/user_progress?where=(user_id,eq,:userId)',
    save: 'POST /api/v1/db/data/v1/app-controle/user_progress',
    update: 'PATCH /api/v1/db/data/v1/app-controle/user_progress/:id'
  },

  // Notas
  notes: {
    get: 'GET /api/v1/db/data/v1/app-controle/study_notes?where=(user_id,eq,:userId)~and(course_id,eq,:courseId)',
    save: 'POST /api/v1/db/data/v1/app-controle/study_notes',
    update: 'PATCH /api/v1/db/data/v1/app-controle/study_notes/:id'
  },

  // Analytics (Views)
  analytics: {
    company: 'GET /api/v1/db/data/v1/app-controle/v_company_progress',
    user: 'GET /api/v1/db/data/v1/app-controle/v_user_dashboard?where=(user_id,eq,:userId)',
    course: 'GET /api/v1/db/data/v1/app-controle/v_course_stats'
  }
};
```

### 4.3 Fluxo de Login

```
╔══════════════════════════════════════════════════════════════════╗
║                    FLUXO DE LOGIN                                ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  1. Usuário acessa http://localhost:3000                         ║
║     │                                                             ║
║     ▼                                                             ║
║  2. App verifica AuthContext (token em localStorage?)            ║
║     │                                                             ║
║     ├── SIM ──▶ Valida token com GET /auth/user/me              ║
║     │           │                                                 ║
║     │           ├── Válido ──▶ Redireciona para /hub            ║
║     │           └── Inválido ──▶ Limpa token, vai para /login   ║
║     │                                                             ║
║     └── NÃO ──▶ Redireciona para /login                         ║
║                 │                                                 ║
║                 ▼                                                 ║
║  3. Usuário preenche email + senha                               ║
║     │                                                             ║
║     ▼                                                             ║
║  4. POST /auth/user/signin { email, password }                   ║
║     │                                                             ║
║     ├── 200 OK ──▶ Salva token, user, company em localStorage   ║
║     │              │                                              ║
║     │              ▼                                              ║
║     │              Redireciona baseado em role:                  ║
║     │                c_level   → /admin/executive                ║
║     │                admin     → /admin                          ║
║     │                instructor→ /admin/turmas                   ║
║     │                student   → /hub                            ║
║     │                                                             ║
║     └── 401 ──▶ Mostra erro "Credenciais inválidas"             ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 5. Permissões por Role (RBAC)

### 5.1 Matriz de Acesso a Rotas

```
╔═════════════════════════════════════════════════════════════════════╗
║  ROTA                  │ student │ instructor │ admin │ c_level    ║
╠═════════════════════════════════════════════════════════════════════╣
║  /login                │    ✓    │     ✓      │   ✓   │    ✓       ║
║  /                     │    ✓    │     ✓      │   ✓   │    ✓       ║
║  /hub                  │    ✓    │     ✓      │   ✓   │    ✓       ║
║  /trilha/:id           │    ✓    │     ✓      │   ✓   │    ✓       ║
║  /curso/:id            │    ✓    │     ✓      │   ✓   │    -       ║
║  /curso/:id/aula/:n    │    ✓    │     ✓      │   ✓   │    -       ║
║  /curso/:id/caderno    │    ✓    │     ✓      │   ✓   │    -       ║
║  /dashboard            │  Próprio│   Turma    │ Todos │  Global    ║
║  /admin                │    -    │     -      │   ✓   │    ✓       ║
║  /admin/users          │    -    │     -      │   ✓   │    ✓       ║
║  /admin/courses        │    -    │     ✓      │   ✓   │    -       ║
║  /admin/turmas         │    -    │     ✓      │   ✓   │    -       ║
║  /admin/reports        │    -    │   Turma    │ Empresa│  Global   ║
║  /admin/executive      │    -    │     -      │   -   │    ✓       ║
╚═════════════════════════════════════════════════════════════════════╝
```

### 5.2 Matriz de Acesso a Dados

```
╔═════════════════════════════════════════════════════════════════════╗
║  DADO                  │ student │ instructor │ admin │ c_level    ║
╠═════════════════════════════════════════════════════════════════════╣
║  Próprio progresso     │    ✓    │     ✓      │   ✓   │    ✓       ║
║  Próprias notas        │    ✓    │     ✓      │   ✓   │    -       ║
║  Progresso de alunos   │    -    │   Turma    │ Empresa│  Global   ║
║  Lista de usuários     │    -    │   Turma    │ Empresa│  Global   ║
║  Criar usuário         │    -    │     -      │   ✓   │    -       ║
║  Editar usuário        │  Próprio│     -      │   ✓   │    -       ║
║  Analytics empresa     │    -    │     -      │   ✓   │    ✓       ║
║  Analytics global      │    -    │     -      │   -   │    ✓       ║
║  Criar curso           │    -    │     ✓      │   ✓   │    -       ║
║  Editar curso          │    -    │  Próprios  │ Todos │    -       ║
║  Exportar relatórios   │    -    │     -      │   ✓   │    ✓       ║
╚═════════════════════════════════════════════════════════════════════╝
```

---

## 6. Dependências de Implementação

### 6.1 Grafo de Dependências

```
╔══════════════════════════════════════════════════════════════════╗
║                    ORDEM DE IMPLEMENTAÇÃO                        ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  FASE 1: Backend (Banco de Dados)                                ║
║  ─────────────────────────────────                               ║
║  [1] Alterar schema users (add c_level)                          ║
║   │                                                               ║
║  [2] Criar tabelas learning_paths + learning_path_courses        ║
║   │                                                               ║
║  [3] Criar cursos placeholder (linux, docker, devops)            ║
║   │                                                               ║
║  [4] Popular dados demo (users por role, progress, notes)        ║
║   │                                                               ║
║   ▼                                                               ║
║  FASE 2: Frontend (Autenticação)                                 ║
║  ───────────────────────────────                                 ║
║  [5] Criar AuthContext.jsx ◀── depende de [4]                   ║
║   │                                                               ║
║  [6] Criar useAuth.js hook                                       ║
║   │                                                               ║
║  [7] Criar LoginView.jsx                                         ║
║   │                                                               ║
║  [8] Criar PrivateRoute.jsx                                      ║
║   │                                                               ║
║   ▼                                                               ║
║  FASE 3: Frontend (Integração API)                               ║
║  ─────────────────────────────────                               ║
║  [9] Criar apiService.js ◀── depende de [5]                     ║
║   │                                                               ║
║  [10] Refatorar useModuleProgress (usar API)                     ║
║   │                                                               ║
║  [11] Refatorar dataService (usar API)                           ║
║   │                                                               ║
║   ▼                                                               ║
║  FASE 4: Frontend (RBAC)                                         ║
║  ───────────────────────                                         ║
║  [12] Criar usePermissions.js ◀── depende de [5]                ║
║   │                                                               ║
║  [13] Criar RoleBasedAccess.jsx                                  ║
║   │                                                               ║
║  [14] Aplicar RBAC nas rotas                                     ║
║   │                                                               ║
║   ▼                                                               ║
║  FASE 5: Frontend (Dashboard)                                    ║
║  ────────────────────────────                                    ║
║  [15] Conectar AdminDashboard às views ◀── depende de [9]       ║
║   │                                                               ║
║  [16] Criar ExecutiveDashboard (c_level)                         ║
║   │                                                               ║
║  [17] Conectar UserDashboard ao backend                          ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

### 6.2 Arquivos a Criar/Modificar

```
╔══════════════════════════════════════════════════════════════════╗
║  CRIAR (novos arquivos)                                          ║
╠══════════════════════════════════════════════════════════════════╣
║  database/                                                        ║
║    migration-001-rbac.sql        │ Alterações de schema          ║
║    seed-demo-completo.sql        │ Dados para demo               ║
║                                                                   ║
║  src/contexts/                                                    ║
║    AuthContext.jsx               │ Estado de autenticação        ║
║    TenantContext.jsx             │ Estado multi-tenant           ║
║                                                                   ║
║  src/hooks/                                                       ║
║    useAuth.js                    │ Hook de autenticação          ║
║    usePermissions.js             │ Hook de permissões            ║
║    useTenant.js                  │ Hook de tenant                ║
║                                                                   ║
║  src/services/                                                    ║
║    apiService.js                 │ Comunicação com NocoDB        ║
║    authService.js                │ Serviço de autenticação       ║
║                                                                   ║
║  src/components/                                                  ║
║    LoginView.jsx                 │ Tela de login                 ║
║    PrivateRoute.jsx              │ Proteção de rotas             ║
║    RoleBasedAccess.jsx           │ Controle por role             ║
║    ExecutiveDashboard.jsx        │ Dashboard C-Level             ║
╠══════════════════════════════════════════════════════════════════╣
║  MODIFICAR (arquivos existentes)                                 ║
╠══════════════════════════════════════════════════════════════════╣
║  src/                                                             ║
║    App.jsx                       │ Adicionar AuthProvider        ║
║    hooks/useModuleProgress.js    │ Integrar com API              ║
║    services/dataService.js       │ Integrar com API              ║
║    components/AdminDashboard.jsx │ Conectar views                ║
║    components/UserDashboard.jsx  │ Conectar API                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 7. Cenários de Demonstração

### 7.1 Demo 1: Login Multi-Role

```
╔══════════════════════════════════════════════════════════════════╗
║  CENÁRIO: Demonstrar diferentes experiências por role            ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Passo 1: Abrir http://localhost:3000                            ║
║           → Redireciona para /login                              ║
║                                                                   ║
║  Passo 2: Login como STUDENT (maria@acmetech.com)                ║
║           → Redireciona para /hub                                ║
║           → Vê: Cursos disponíveis, seu progresso                ║
║           → NÃO vê: Menu Admin                                   ║
║                                                                   ║
║  Passo 3: Logout, login como ADMIN (admin@acmetech.com)          ║
║           → Redireciona para /admin                              ║
║           → Vê: Todos usuários da Acme, todos progressos         ║
║           → NÃO vê: Dados da DevCorp                             ║
║                                                                   ║
║  Passo 4: Logout, login como C_LEVEL (ceo@acmetech.com)          ║
║           → Redireciona para /admin/executive                    ║
║           → Vê: KPIs, métricas globais, ROI                      ║
║           → NÃO vê: Detalhes operacionais                        ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

### 7.2 Demo 2: Progresso Sincronizado

```
╔══════════════════════════════════════════════════════════════════╗
║  CENÁRIO: Demonstrar sincronização FE ↔ BE                       ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Passo 1: Login como maria@acmetech.com                          ║
║           → Verificar progresso atual no Hub                     ║
║                                                                   ║
║  Passo 2: Acessar /curso/bash/aula/1                             ║
║           → Completar módulo 1.1                                 ║
║                                                                   ║
║  Passo 3: Verificar no NocoDB (http://localhost:8080)            ║
║           → Tabela user_progress atualizada                      ║
║           → completed = true, completed_at = NOW()               ║
║                                                                   ║
║  Passo 4: Login como admin@acmetech.com                          ║
║           → Verificar dashboard                                  ║
║           → Progresso de Maria visível em tempo real             ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

### 7.3 Demo 3: Multi-Tenancy

```
╔══════════════════════════════════════════════════════════════════╗
║  CENÁRIO: Demonstrar isolamento entre empresas                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Passo 1: Login como admin@acmetech.com                          ║
║           → Vê apenas: Maria, Pedro, Ana (Acme)                  ║
║           → NÃO vê: Julia, Bruno, Camila (DevCorp)               ║
║                                                                   ║
║  Passo 2: Logout, login como admin@devcorp.com                   ║
║           → Vê apenas: Julia, Bruno, Camila (DevCorp)            ║
║           → NÃO vê: Maria, Pedro, Ana (Acme)                     ║
║                                                                   ║
║  Passo 3: Verificar analytics                                    ║
║           → Cada empresa vê apenas suas métricas                 ║
║           → Progresso, conclusão, engajamento isolados           ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 8. Métricas de Sucesso

### 8.1 Critérios de Aceite - Demo MVP

- [ ] Login funciona com todos os 4 roles
- [ ] Cada role vê apenas o que deve ver (RBAC)
- [ ] Progresso salva no PostgreSQL (não mais localStorage)
- [ ] Admin vê progresso de todos da empresa
- [ ] C-Level vê métricas executivas
- [ ] Multi-tenancy: Acme não vê DevCorp e vice-versa
- [ ] Caminho Proposto carrega do banco
- [ ] Módulo 1.1 do Bash funciona completo

### 8.2 Checklist de Verificação

```bash
# Verificar backend
curl http://localhost:8080/api/v1/db/data/v1/app-controle/users
curl http://localhost:8080/api/v1/db/data/v1/app-controle/courses
curl http://localhost:8080/api/v1/db/data/v1/app-controle/learning_paths

# Verificar frontend
# 1. Acessar http://localhost:3000
# 2. Deve redirecionar para /login
# 3. Login com cada role deve funcionar
# 4. RBAC deve restringir acesso
```

---

**Próximo Passo:** Criar ROADMAP de implementação com User Stories detalhadas.
