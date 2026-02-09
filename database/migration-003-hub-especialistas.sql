-- ===============================
-- MIGRATION 003 - Hub de Especialistas
-- Branch: dev
-- Data: 2026-02-09
-- Sprint: 15 - US-142/US-143
-- ===============================

-- ==================================
-- 1. ATUALIZAR ROLE EM USERS
-- ==================================

ALTER TABLE users
DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE users
ADD CONSTRAINT users_role_check
CHECK (role IN ('student', 'instructor', 'admin', 'c_level', 'specialist'));

COMMENT ON COLUMN users.role IS 'Roles: student, instructor, admin, c_level, specialist';

-- ==================================
-- 2. ADICIONAR COLUNAS EM COURSES
-- ==================================

ALTER TABLE courses
ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'internal';

ALTER TABLE courses
ADD COLUMN IF NOT EXISTS specialist_id UUID;

COMMENT ON COLUMN courses.source IS 'Origem do curso: internal (empresa) ou hub (especialista externo)';
COMMENT ON COLUMN courses.specialist_id IS 'ID do especialista criador (quando source=hub)';

-- ==================================
-- 3. CRIAR TABELA SPECIALISTS
-- ==================================

CREATE TABLE IF NOT EXISTS specialists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  linkedin_url VARCHAR(500),
  bio TEXT,
  specialties TEXT[] DEFAULT '{}',
  credentials JSONB DEFAULT '[]',
  portfolio_url VARCHAR(500),
  verified_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'removed')),
  rating_avg NUMERIC(3,2) DEFAULT 0.00,
  total_courses INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  total_revenue NUMERIC(12,2) DEFAULT 0.00,
  revenue_share_percent INTEGER DEFAULT 70,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_specialists_user ON specialists(user_id);
CREATE INDEX IF NOT EXISTS idx_specialists_status ON specialists(status);
CREATE INDEX IF NOT EXISTS idx_specialists_rating ON specialists(rating_avg DESC);

COMMENT ON TABLE specialists IS 'Perfil de especialistas do Hub - Revenue share 70/30';

-- ==================================
-- 4. CRIAR TABELA HUB_COURSES
-- ==================================

CREATE TABLE IF NOT EXISTS hub_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  specialist_id UUID NOT NULL REFERENCES specialists(id) ON DELETE CASCADE,
  price_monthly NUMERIC(10,2) NOT NULL,
  price_suggested_min NUMERIC(10,2) DEFAULT 50.00,
  price_suggested_max NUMERIC(10,2) DEFAULT 200.00,
  visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'unlisted')),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'suspended', 'archived')),
  total_enrollments INTEGER DEFAULT 0,
  rating_avg NUMERIC(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, specialist_id)
);

CREATE INDEX IF NOT EXISTS idx_hub_courses_specialist ON hub_courses(specialist_id);
CREATE INDEX IF NOT EXISTS idx_hub_courses_status ON hub_courses(status);
CREATE INDEX IF NOT EXISTS idx_hub_courses_visibility ON hub_courses(visibility);
CREATE INDEX IF NOT EXISTS idx_hub_courses_rating ON hub_courses(rating_avg DESC);

COMMENT ON TABLE hub_courses IS 'Cursos publicados no Hub de Especialistas com precificacao';

-- ==================================
-- 5. CRIAR TABELA COURSE_REVIEWS
-- ==================================

CREATE TABLE IF NOT EXISTS course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hub_course_id UUID NOT NULL REFERENCES hub_courses(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  specialist_reply TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hub_course_id, company_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_hub_course ON course_reviews(hub_course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_company ON course_reviews(company_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON course_reviews(rating);

COMMENT ON TABLE course_reviews IS 'Avaliacoes de cursos do Hub (1 review por empresa por curso)';

-- ==================================
-- 6. TRIGGER PARA UPDATED_AT
-- ==================================

CREATE OR REPLACE FUNCTION update_specialists_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_specialists_updated_at ON specialists;
CREATE TRIGGER trigger_specialists_updated_at
  BEFORE UPDATE ON specialists
  FOR EACH ROW
  EXECUTE FUNCTION update_specialists_updated_at();

CREATE OR REPLACE FUNCTION update_hub_courses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_hub_courses_updated_at ON hub_courses;
CREATE TRIGGER trigger_hub_courses_updated_at
  BEFORE UPDATE ON hub_courses
  FOR EACH ROW
  EXECUTE FUNCTION update_hub_courses_updated_at();

CREATE OR REPLACE FUNCTION update_course_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_course_reviews_updated_at ON course_reviews;
CREATE TRIGGER trigger_course_reviews_updated_at
  BEFORE UPDATE ON course_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_course_reviews_updated_at();

-- ==================================
-- 7. VIEW: SPECIALIST DASHBOARD
-- ==================================

CREATE OR REPLACE VIEW v_specialist_dashboard AS
SELECT
  s.id AS specialist_id,
  s.user_id,
  u.full_name AS specialist_name,
  u.email AS specialist_email,
  s.linkedin_url,
  s.bio,
  s.specialties,
  s.credentials,
  s.portfolio_url,
  s.verified_at,
  s.status,
  s.rating_avg,
  s.total_courses,
  s.total_students,
  s.total_revenue,
  s.revenue_share_percent,
  COUNT(hc.id) AS published_courses,
  COALESCE(SUM(hc.total_enrollments), 0) AS total_enrollments,
  COALESCE(AVG(hc.rating_avg) FILTER (WHERE hc.rating_avg > 0), 0) AS avg_course_rating,
  COALESCE(SUM(hc.total_reviews), 0) AS total_reviews
FROM specialists s
JOIN users u ON u.id = s.user_id
LEFT JOIN hub_courses hc ON hc.specialist_id = s.id AND hc.status = 'published'
WHERE s.status = 'active'
GROUP BY s.id, s.user_id, u.full_name, u.email, s.linkedin_url, s.bio,
         s.specialties, s.credentials, s.portfolio_url, s.verified_at,
         s.status, s.rating_avg, s.total_courses, s.total_students,
         s.total_revenue, s.revenue_share_percent;

COMMENT ON VIEW v_specialist_dashboard IS 'Dashboard: Metricas agregadas do especialista';

-- ==================================
-- 8. VIEW: HUB CATALOG
-- ==================================

CREATE OR REPLACE VIEW v_hub_catalog AS
SELECT
  hc.id AS hub_course_id,
  hc.course_id,
  c.name AS course_name,
  c.description AS course_description,
  c.icon AS course_icon,
  c.duration_hours,
  c.total_modules,
  c.difficulty,
  hc.specialist_id,
  s.id AS specialist_profile_id,
  u.full_name AS specialist_name,
  s.linkedin_url,
  s.verified_at IS NOT NULL AS specialist_verified,
  s.specialties,
  s.rating_avg AS specialist_rating,
  hc.price_monthly,
  hc.visibility,
  hc.status,
  hc.total_enrollments,
  hc.rating_avg AS course_rating,
  hc.total_reviews,
  hc.approved_at,
  hc.created_at
FROM hub_courses hc
JOIN courses c ON c.id = hc.course_id
JOIN specialists s ON s.id = hc.specialist_id
JOIN users u ON u.id = s.user_id
WHERE hc.status = 'published'
  AND hc.visibility = 'public'
  AND s.status = 'active';

COMMENT ON VIEW v_hub_catalog IS 'Catalogo publico do Hub de Especialistas';

-- ==================================
-- 9. SEED: EMPRESA HUB DE ESPECIALISTAS
-- ==================================

INSERT INTO companies (id, name, slug, logo_url, primary_color, plan, max_users, active)
VALUES (
  '550e8400-e29b-41d4-a716-446655440099',
  'Hub de Especialistas',
  'hub-especialistas',
  NULL,
  '#6366F1',
  'enterprise',
  1000,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug;

-- ==================================
-- 10. SEED: USUARIO JOAO SILVA (Specialist)
-- ==================================

INSERT INTO users (id, company_id, email, password_hash, full_name, role, active)
VALUES (
  '650e8400-e29b-41d4-a716-446655440099',
  '550e8400-e29b-41d4-a716-446655440099',
  'joao.silva.specialist@plataformab2b.com',
  '$2b$10$placeholder_hash',
  'Joao Silva',
  'specialist',
  true
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;

-- ==================================
-- 11. SEED: PERFIL SPECIALIST
-- ==================================

INSERT INTO specialists (id, user_id, linkedin_url, bio, specialties, credentials, portfolio_url, verified_at, status, rating_avg, total_courses, total_students, total_revenue, revenue_share_percent)
VALUES (
  '750e8400-e29b-41d4-a716-446655440001',
  '650e8400-e29b-41d4-a716-446655440099',
  'https://linkedin.com/in/joaosilva-devops',
  'Engenheiro DevOps Senior com 15 anos de experiencia em infraestrutura, automacao e shell scripting. Especialista em ambientes Unix/Linux e praticas DevOps modernas. Ja treinou mais de 500 profissionais em empresas como Globo, Nubank e iFood.',
  ARRAY['bash', 'devops', 'linux', 'docker', 'kubernetes'],
  '[{"name": "AWS Solutions Architect", "issuer": "Amazon Web Services", "year": 2020}, {"name": "CKA - Certified Kubernetes Administrator", "issuer": "CNCF", "year": 2021}, {"name": "LFCS - Linux Foundation Certified Sysadmin", "issuer": "Linux Foundation", "year": 2019}]'::JSONB,
  'https://github.com/joaosilva-devops',
  NOW() - INTERVAL '30 days',
  'active',
  4.80,
  1,
  156,
  4200.00,
  70
)
ON CONFLICT (user_id) DO UPDATE SET
  linkedin_url = EXCLUDED.linkedin_url,
  bio = EXCLUDED.bio,
  specialties = EXCLUDED.specialties,
  credentials = EXCLUDED.credentials,
  status = EXCLUDED.status,
  rating_avg = EXCLUDED.rating_avg;

-- ==================================
-- 12. SEED: CURSO BASH NO HUB
-- ==================================

-- Marcar curso bash como vindo do hub
UPDATE courses SET source = 'hub', specialist_id = '650e8400-e29b-41d4-a716-446655440099' WHERE id = 'bash';

INSERT INTO hub_courses (id, course_id, specialist_id, price_monthly, price_suggested_min, price_suggested_max, visibility, approved_at, approved_by, status, total_enrollments, rating_avg, total_reviews)
VALUES (
  '850e8400-e29b-41d4-a716-446655440001',
  'bash',
  '750e8400-e29b-41d4-a716-446655440001',
  89.90,
  50.00,
  200.00,
  'public',
  NOW() - INTERVAL '25 days',
  NULL,
  'published',
  156,
  4.80,
  2
)
ON CONFLICT (course_id, specialist_id) DO UPDATE SET
  price_monthly = EXCLUDED.price_monthly,
  status = EXCLUDED.status,
  total_enrollments = EXCLUDED.total_enrollments,
  rating_avg = EXCLUDED.rating_avg;

-- ==================================
-- 13. SEED: REVIEWS DE EXEMPLO
-- ==================================

-- Review da ACME Tech Solutions
INSERT INTO course_reviews (id, hub_course_id, company_id, user_id, rating, comment, created_at)
VALUES (
  '950e8400-e29b-41d4-a716-446655440001',
  '850e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '650e8400-e29b-41d4-a716-446655440001',
  5,
  'Excelente curso! Muito pratico e bem estruturado. Nossos devs juniores aprenderam rapido.',
  NOW() - INTERVAL '15 days'
)
ON CONFLICT (hub_course_id, company_id) DO UPDATE SET
  rating = EXCLUDED.rating,
  comment = EXCLUDED.comment;

-- Review da DevCorp Consulting
INSERT INTO course_reviews (id, hub_course_id, company_id, user_id, rating, comment, created_at)
VALUES (
  '950e8400-e29b-41d4-a716-446655440002',
  '850e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  '650e8400-e29b-41d4-a716-446655440004',
  5,
  'Conteudo atualizado e com otimos exemplos reais. Recomendo!',
  NOW() - INTERVAL '10 days'
)
ON CONFLICT (hub_course_id, company_id) DO UPDATE SET
  rating = EXCLUDED.rating,
  comment = EXCLUDED.comment;

-- ==================================
-- VERIFICACAO
-- ==================================

DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'MIGRATION 003 - Hub de Especialistas';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Tabela specialists criada';
  RAISE NOTICE 'Tabela hub_courses criada';
  RAISE NOTICE 'Tabela course_reviews criada';
  RAISE NOTICE 'Views: v_specialist_dashboard, v_hub_catalog';
  RAISE NOTICE 'Triggers: updated_at para 3 tabelas';
  RAISE NOTICE '-------------------------------------------';
  RAISE NOTICE 'Roles suportados: student, instructor, admin, c_level, specialist';
  RAISE NOTICE 'Especialistas: %', (SELECT COUNT(*) FROM specialists);
  RAISE NOTICE 'Hub Courses: %', (SELECT COUNT(*) FROM hub_courses);
  RAISE NOTICE 'Reviews: %', (SELECT COUNT(*) FROM course_reviews);
  RAISE NOTICE '===========================================';
END $$;
