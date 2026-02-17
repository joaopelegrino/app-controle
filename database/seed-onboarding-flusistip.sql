-- ============================================================================
-- Seed: Trilha de Onboarding FluSisTip
-- ============================================================================
-- Gerado por: Diagnostico Forense TrainB2B v1.0
-- Data: 2026-02-17
-- Projeto Fonte: FluSisTip (Healthcare LLM Workflow Platform)
--
-- CONTEXTO LLM (zero-context resume):
-- Este SQL cria 5 cursos na tabela 'courses' do NocoDB/PostgreSQL
-- para a trilha de onboarding do projeto FluSisTip.
-- Os cursos foram gerados a partir de analise forense do codebase.
--
-- Executar com:
--   docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/seed-onboarding-flusistip.sql
--
-- Artefatos relacionados:
--   docs/onboarding/flusistip/RELATORIO-FORENSE.md
--   src/data/flusistipOnboardingData.js
--   src/data/flusistipFlashCards.js
-- ============================================================================

-- Curso 0: Fundamentos e Ambiente
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-fundamentos',
  'FluSisTip - Fundamentos e Ambiente',
  'Setup completo: Clojure 1.12, Java 21, Datomic Local, Bun, mise. REPL-first workflow e validacao L1-L4.',
  '🔧',
  8,
  5,
  'beginner',
  'in-development',
  'onboarding',
  20
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_hours = EXCLUDED.duration_hours,
  total_modules = EXCLUDED.total_modules;

-- Curso 1: Dominio Healthcare e Multi-Tenant
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-dominio',
  'FluSisTip - Dominio Healthcare e Multi-Tenant',
  'Entidades DDD, Datomic schemas (12 EDN), multi-tenant isolation, RBAC 8 personas, compliance LGPD/CFM/CRP.',
  '🏥',
  12,
  8,
  'intermediate',
  'in-development',
  'onboarding',
  21
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_hours = EXCLUDED.duration_hours,
  total_modules = EXCLUDED.total_modules;

-- Curso 2: Workflow Engine e HITL
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-workflow',
  'FluSisTip - Workflow Engine e HITL',
  'State machine 7 estados, aprovacao unanime, Decision Points (LGPD), HITL checkpoints, Kanban SLA monitoring.',
  '⚙️',
  15,
  9,
  'advanced',
  'in-development',
  'onboarding',
  22
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_hours = EXCLUDED.duration_hours,
  total_modules = EXCLUDED.total_modules;

-- Curso 3: Integracao LLM
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-llm',
  'FluSisTip - Integracao LLM',
  'Gemini/Claude via Vertex AI, provider fallback chain, placeholders {{var}}, sistemas A/B/C/D, cost tracking.',
  '🤖',
  10,
  6,
  'advanced',
  'in-development',
  'onboarding',
  23
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_hours = EXCLUDED.duration_hours,
  total_modules = EXCLUDED.total_modules;

-- Curso 4: Frontend Re-frame
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-frontend',
  'FluSisTip - Frontend ClojureScript/Re-frame',
  'Reagent (React 18), Re-frame (events/subs/fx), Playground editor, Kanban board, HITL interface, routing RBAC.',
  '🎨',
  12,
  7,
  'intermediate',
  'in-development',
  'onboarding',
  24
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_hours = EXCLUDED.duration_hours,
  total_modules = EXCLUDED.total_modules;

-- ============================================================================
-- Verificacao
-- ============================================================================
SELECT id, name, difficulty, total_modules, duration_hours, badge
FROM courses
WHERE badge = 'onboarding'
ORDER BY order_index;
