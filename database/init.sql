-- ===============================
-- INIT SCHEMA - app-controle MVP
-- Estrutura simplificada para 1 curso (Bash)
-- Para uso com NocoDB + PostgreSQL
-- ===============================

-- ==================================
-- 1. EMPRESAS (Multi-tenancy manual)
-- ==================================
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#FF6B35',
  plan VARCHAR(50) DEFAULT 'free', -- free, starter, professional, enterprise
  max_users INTEGER DEFAULT 10,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE companies IS 'Empresas clientes B2B - Isolamento via company_id';

-- ==================================
-- 2. USUÁRIOS
-- ==================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'student', -- student, teacher, admin
  avatar_url TEXT,
  active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);

COMMENT ON TABLE users IS 'Usuários do sistema - Cada user pertence a uma company';

-- ==================================
-- 3. CURSOS
-- ==================================
CREATE TABLE courses (
  id VARCHAR(50) PRIMARY KEY, -- 'bash'
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10), -- Emoji
  duration_hours INTEGER,
  total_modules INTEGER,
  difficulty VARCHAR(20), -- beginner, intermediate, advanced
  status VARCHAR(20) DEFAULT 'active', -- active, in-development, archived
  video_url TEXT,
  badge VARCHAR(20), -- integrated, new, null
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE courses IS 'Catálogo de cursos (global para todas empresas)';

-- ==================================
-- 4. FASES (Seções de um curso)
-- ==================================
CREATE TABLE phases (
  id VARCHAR(50) PRIMARY KEY, -- '1', '2', '3', '4'
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  weeks VARCHAR(10), -- '1-4', '5-8'
  color VARCHAR(50), -- 'orange-500'
  light_color VARCHAR(50), -- 'orange-100'
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
  id VARCHAR(50) PRIMARY KEY, -- '1.1', '1.2', '2.1'
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  phase_id VARCHAR(50) REFERENCES phases(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  week INTEGER,
  duration VARCHAR(50), -- '1 semana'
  deliverable TEXT,
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
-- 8. LOGS DE AUDITORIA
-- ==================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'user_created', 'module_completed', etc.
  entity_type VARCHAR(50), -- 'user', 'course', 'progress'
  entity_id VARCHAR(255),
  metadata JSONB,
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
  c.plan,
  COUNT(DISTINCT u.id) AS total_users,
  COUNT(DISTINCT CASE WHEN u.active THEN u.id END) AS active_users,
  COUNT(up.id) FILTER (WHERE up.completed) AS total_modules_completed,
  ROUND(
    COUNT(CASE WHEN up.completed THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(up.id), 0) * 100, 
    2
  ) AS avg_completion_rate
FROM companies c
LEFT JOIN users u ON u.company_id = c.id
LEFT JOIN user_progress up ON up.user_id = u.id
WHERE c.active = true
GROUP BY c.id, c.name, c.plan;

COMMENT ON VIEW v_company_progress IS 'Dashboard: Progresso agregado por empresa';

-- View: Dashboard de usuário
CREATE OR REPLACE VIEW v_user_dashboard AS
SELECT 
  u.id AS user_id,
  u.full_name,
  u.email,
  u.role,
  c.name AS company_name,
  c.plan AS company_plan,
  COUNT(DISTINCT up.course_id) AS courses_enrolled,
  COUNT(up.id) FILTER (WHERE up.completed) AS modules_completed,
  COUNT(up.id) AS total_modules_tracked,
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
GROUP BY u.id, u.full_name, u.email, u.role, c.name, c.plan;

COMMENT ON VIEW v_user_dashboard IS 'Dashboard: Progresso individual de cada usuário';

-- View: Estatísticas do curso
CREATE OR REPLACE VIEW v_course_stats AS
SELECT 
  co.id,
  co.name,
  co.icon,
  co.total_modules,
  COUNT(DISTINCT up.user_id) AS enrolled_users,
  COUNT(up.id) FILTER (WHERE up.completed) AS total_completions,
  ROUND(
    COUNT(CASE WHEN up.completed THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(up.id), 0) * 100, 
    2
  ) AS completion_rate
FROM courses co
LEFT JOIN user_progress up ON up.course_id = co.id
WHERE co.status = 'active'
GROUP BY co.id, co.name, co.icon, co.total_modules;

COMMENT ON VIEW v_course_stats IS 'Dashboard: Estatísticas de adoção e conclusão por curso';
