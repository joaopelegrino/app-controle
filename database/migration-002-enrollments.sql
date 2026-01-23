-- ===============================
-- MIGRATION 002 - User Enrollments (Matrículas)
-- Branch: demo-nocodb-simple
-- Data: 2026-01-23
-- Sprint: 9 - US-097
-- ===============================

-- ==================================
-- 1. CRIAR TABELA USER_COURSES (Matrículas)
-- ==================================

CREATE TABLE IF NOT EXISTS user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  due_date DATE,
  status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'completed', 'cancelled')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

COMMENT ON TABLE user_courses IS 'Matrículas de usuários em cursos (atribuições admin/instructor)';
COMMENT ON COLUMN user_courses.user_id IS 'Aluno matriculado';
COMMENT ON COLUMN user_courses.course_id IS 'Curso atribuído';
COMMENT ON COLUMN user_courses.assigned_by IS 'Admin/Instructor que fez a atribuição';
COMMENT ON COLUMN user_courses.due_date IS 'Data limite para conclusão (opcional)';
COMMENT ON COLUMN user_courses.status IS 'Status: enrolled (aguardando), in_progress, completed, cancelled';

-- ==================================
-- 2. ÍNDICES PARA PERFORMANCE
-- ==================================

CREATE INDEX IF NOT EXISTS idx_user_courses_user ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course ON user_courses(course_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_status ON user_courses(status);
CREATE INDEX IF NOT EXISTS idx_user_courses_assigned_by ON user_courses(assigned_by);
CREATE INDEX IF NOT EXISTS idx_user_courses_due_date ON user_courses(due_date) WHERE due_date IS NOT NULL;

-- ==================================
-- 3. TRIGGER PARA UPDATED_AT
-- ==================================

CREATE OR REPLACE FUNCTION update_user_courses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_user_courses_updated_at ON user_courses;
CREATE TRIGGER trigger_user_courses_updated_at
  BEFORE UPDATE ON user_courses
  FOR EACH ROW
  EXECUTE FUNCTION update_user_courses_updated_at();

-- ==================================
-- 4. VIEW PARA MATRÍCULAS COM DETALHES
-- ==================================

CREATE OR REPLACE VIEW v_user_enrollments AS
SELECT
  uc.id AS enrollment_id,
  uc.user_id,
  u.full_name AS user_name,
  u.email AS user_email,
  u.company_id,
  uc.course_id,
  c.name AS course_name,
  c.icon AS course_icon,
  c.total_modules,
  c.duration_hours,
  uc.assigned_by,
  ab.full_name AS assigned_by_name,
  uc.assigned_at,
  uc.due_date,
  uc.status,
  uc.started_at,
  uc.completed_at,
  -- Calcular progresso baseado em user_progress
  COALESCE(
    (SELECT COUNT(*) FROM user_progress up
     WHERE up.user_id = uc.user_id
     AND up.course_id = uc.course_id
     AND up.completed = true),
    0
  ) AS completed_modules,
  -- Verificar se está atrasado
  CASE
    WHEN uc.status = 'completed' THEN false
    WHEN uc.due_date IS NULL THEN false
    WHEN uc.due_date < CURRENT_DATE THEN true
    ELSE false
  END AS is_overdue
FROM user_courses uc
JOIN users u ON u.id = uc.user_id
JOIN courses c ON c.id = uc.course_id
LEFT JOIN users ab ON ab.id = uc.assigned_by
WHERE u.active = true;

COMMENT ON VIEW v_user_enrollments IS 'Visão detalhada das matrículas com progresso e status de atraso';

-- ==================================
-- 5. FUNÇÃO PARA MATRICULAR USUÁRIO
-- ==================================

CREATE OR REPLACE FUNCTION enroll_user(
  p_user_id UUID,
  p_course_id VARCHAR(50),
  p_assigned_by UUID,
  p_due_date DATE DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_enrollment_id UUID;
BEGIN
  INSERT INTO user_courses (user_id, course_id, assigned_by, due_date)
  VALUES (p_user_id, p_course_id, p_assigned_by, p_due_date)
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET
    status = 'enrolled',
    assigned_by = p_assigned_by,
    due_date = COALESCE(p_due_date, user_courses.due_date),
    updated_at = NOW()
  RETURNING id INTO v_enrollment_id;

  RETURN v_enrollment_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION enroll_user IS 'Matricula usuário em curso ou reativa matrícula cancelada';

-- ==================================
-- 6. FUNÇÃO PARA CANCELAR MATRÍCULA
-- ==================================

CREATE OR REPLACE FUNCTION unenroll_user(
  p_user_id UUID,
  p_course_id VARCHAR(50)
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE user_courses
  SET status = 'cancelled', updated_at = NOW()
  WHERE user_id = p_user_id AND course_id = p_course_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION unenroll_user IS 'Cancela matrícula de usuário em curso (soft delete)';

-- ==================================
-- 7. DADOS DE DEMONSTRAÇÃO
-- ==================================

-- Matricular alunos existentes no curso Bash
-- ACME Tech Solutions
INSERT INTO user_courses (user_id, course_id, assigned_by, status)
SELECT
  u.id,
  'bash',
  (SELECT id FROM users WHERE email = 'admin@acmetech.com' LIMIT 1),
  CASE
    WHEN EXISTS (SELECT 1 FROM user_progress up WHERE up.user_id = u.id AND up.course_id = 'bash' AND up.completed = true)
    THEN 'in_progress'
    ELSE 'enrolled'
  END
FROM users u
WHERE u.company_id = '550e8400-e29b-41d4-a716-446655440001'
  AND u.role = 'student'
  AND u.active = true
ON CONFLICT (user_id, course_id) DO NOTHING;

-- DevCorp Consulting
INSERT INTO user_courses (user_id, course_id, assigned_by, status)
SELECT
  u.id,
  'bash',
  (SELECT id FROM users WHERE email = 'admin@devcorp.com' LIMIT 1),
  CASE
    WHEN EXISTS (SELECT 1 FROM user_progress up WHERE up.user_id = u.id AND up.course_id = 'bash' AND up.completed = true)
    THEN 'in_progress'
    ELSE 'enrolled'
  END
FROM users u
WHERE u.company_id = '550e8400-e29b-41d4-a716-446655440002'
  AND u.role = 'student'
  AND u.active = true
ON CONFLICT (user_id, course_id) DO NOTHING;

-- ==================================
-- VERIFICAÇÃO
-- ==================================

DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'MIGRATION 002 - User Enrollments';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Tabela user_courses criada';
  RAISE NOTICE 'Índices criados: 5';
  RAISE NOTICE 'View v_user_enrollments criada';
  RAISE NOTICE 'Funções: enroll_user, unenroll_user';
  RAISE NOTICE 'Total matrículas: %', (SELECT COUNT(*) FROM user_courses);
  RAISE NOTICE '===========================================';
END $$;
