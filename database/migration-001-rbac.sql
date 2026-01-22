-- ===============================
-- MIGRATION 001 - RBAC & Learning Paths
-- Branch: demo-nocodb-simple
-- Data: 2026-01-22
-- ===============================

-- ==================================
-- 1. ATUALIZAR ROLE EM USERS
-- ==================================

-- Remover constraint existente (se houver)
ALTER TABLE users
DROP CONSTRAINT IF EXISTS users_role_check;

-- Adicionar nova constraint com c_level
ALTER TABLE users
ADD CONSTRAINT users_role_check
CHECK (role IN ('student', 'instructor', 'admin', 'c_level'));

-- Atualizar comentário
COMMENT ON COLUMN users.role IS 'Roles: student, instructor, admin, c_level';

-- ==================================
-- 2. CRIAR TABELA LEARNING_PATHS
-- ==================================

CREATE TABLE IF NOT EXISTS learning_paths (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(10),
  description TEXT,
  badge VARCHAR(50),
  order_index INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE learning_paths IS 'Caminhos de aprendizado (trilhas sequenciadas de cursos)';

-- ==================================
-- 3. CRIAR TABELA LEARNING_PATH_COURSES
-- ==================================

CREATE TABLE IF NOT EXISTS learning_path_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id VARCHAR(50) REFERENCES learning_paths(id) ON DELETE CASCADE,
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  available BOOLEAN DEFAULT false,
  highlight VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(path_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_lpc_path ON learning_path_courses(path_id);
CREATE INDEX IF NOT EXISTS idx_lpc_course ON learning_path_courses(course_id);

COMMENT ON TABLE learning_path_courses IS 'Cursos que compõem cada caminho de aprendizado';

-- ==================================
-- 4. CRIAR CURSOS PLACEHOLDER
-- ==================================

-- Linux Fundamentals
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, order_index)
VALUES ('linux', 'Linux Fundamentals', 'Sistema operacional, comandos e administração essencial', '🐧', 24, 12, 'beginner', 'in-development', 2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  status = EXCLUDED.status;

-- Docker & Containers
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, order_index)
VALUES ('docker', 'Docker & Containers', 'Containerização, imagens, volumes e orquestração básica', '🐳', 20, 10, 'intermediate', 'in-development', 3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  status = EXCLUDED.status;

-- DevOps Essentials
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, order_index)
VALUES ('devops', 'DevOps Essentials', 'CI/CD, automação de deploy e práticas modernas', '⚙️', 30, 15, 'intermediate', 'in-development', 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  status = EXCLUDED.status;

-- ==================================
-- 5. CRIAR LEARNING PATH: DESENVOLVEDOR BACKEND
-- ==================================

INSERT INTO learning_paths (id, name, icon, description, badge, order_index, active)
VALUES (
  'backend-developer',
  'Desenvolvedor Backend',
  '🛤️',
  'Caminho proposto para dominar desenvolvimento backend com foco em automação e infraestrutura',
  'exemplo',
  1,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- ==================================
-- 6. ASSOCIAR CURSOS AO LEARNING PATH
-- ==================================

-- Bash (disponível)
INSERT INTO learning_path_courses (path_id, course_id, order_index, available, highlight)
VALUES ('backend-developer', 'bash', 1, true, 'Padrão de referência')
ON CONFLICT (path_id, course_id) DO UPDATE SET
  order_index = EXCLUDED.order_index,
  available = EXCLUDED.available,
  highlight = EXCLUDED.highlight;

-- Linux (em desenvolvimento)
INSERT INTO learning_path_courses (path_id, course_id, order_index, available, highlight)
VALUES ('backend-developer', 'linux', 2, false, NULL)
ON CONFLICT (path_id, course_id) DO UPDATE SET
  order_index = EXCLUDED.order_index,
  available = EXCLUDED.available;

-- Docker (em desenvolvimento)
INSERT INTO learning_path_courses (path_id, course_id, order_index, available, highlight)
VALUES ('backend-developer', 'docker', 3, false, NULL)
ON CONFLICT (path_id, course_id) DO UPDATE SET
  order_index = EXCLUDED.order_index,
  available = EXCLUDED.available;

-- DevOps (em desenvolvimento)
INSERT INTO learning_path_courses (path_id, course_id, order_index, available, highlight)
VALUES ('backend-developer', 'devops', 4, false, NULL)
ON CONFLICT (path_id, course_id) DO UPDATE SET
  order_index = EXCLUDED.order_index,
  available = EXCLUDED.available;

-- ==================================
-- 7. VIEW PARA LEARNING PATHS
-- ==================================

CREATE OR REPLACE VIEW v_learning_path_details AS
SELECT
  lp.id AS path_id,
  lp.name AS path_name,
  lp.icon AS path_icon,
  lp.description AS path_description,
  lp.badge,
  lp.active,
  COUNT(lpc.id) AS total_courses,
  COUNT(CASE WHEN lpc.available THEN 1 END) AS available_courses,
  SUM(c.duration_hours) AS total_hours,
  SUM(c.total_modules) AS total_modules,
  SUM(CASE WHEN lpc.available THEN c.duration_hours ELSE 0 END) AS available_hours,
  SUM(CASE WHEN lpc.available THEN c.total_modules ELSE 0 END) AS available_modules
FROM learning_paths lp
LEFT JOIN learning_path_courses lpc ON lpc.path_id = lp.id
LEFT JOIN courses c ON c.id = lpc.course_id
WHERE lp.active = true
GROUP BY lp.id, lp.name, lp.icon, lp.description, lp.badge, lp.active;

COMMENT ON VIEW v_learning_path_details IS 'Detalhes agregados dos caminhos de aprendizado';

-- ==================================
-- VERIFICAÇÃO
-- ==================================

DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'MIGRATION 001 - RBAC & Learning Paths';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Learning Paths: %', (SELECT COUNT(*) FROM learning_paths);
  RAISE NOTICE 'Path Courses: %', (SELECT COUNT(*) FROM learning_path_courses);
  RAISE NOTICE 'Total Courses: %', (SELECT COUNT(*) FROM courses);
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Roles suportados: student, instructor, admin, c_level';
  RAISE NOTICE '===========================================';
END $$;
