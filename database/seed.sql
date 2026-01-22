-- ===============================
-- SEED DATA - app-controle MVP
-- Dados simplificados para 1 curso (Bash)
-- ===============================

-- ==================================
-- 1. EMPRESAS EXEMPLO
-- ==================================

INSERT INTO companies (id, name, slug, logo_url, primary_color, plan, max_users, active) VALUES
-- Empresa 1: Startup (Starter)
('550e8400-e29b-41d4-a716-446655440001', 'Acme Tech Solutions', 'acme-tech', NULL, '#FF6B35', 'starter', 20, true),

-- Empresa 2: Empresa Média (Professional)
('550e8400-e29b-41d4-a716-446655440002', 'DevCorp Consulting', 'devcorp', NULL, '#4ECDC4', 'professional', 50, true);

-- ==================================
-- 2. USUÁRIOS EXEMPLO
-- ==================================

-- Senha exemplo: "Demo@2026" (usar bcrypt em produção)
INSERT INTO users (id, company_id, email, password_hash, full_name, role, active) VALUES
-- Acme Tech (2 admins + 3 students)
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'admin@acmetech.com', '$2b$10$placeholder_hash', 'João Silva', 'admin', true),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'maria@acmetech.com', '$2b$10$placeholder_hash', 'Maria Santos', 'student', true),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'pedro@acmetech.com', '$2b$10$placeholder_hash', 'Pedro Costa', 'student', true),

-- DevCorp (1 admin + 1 teacher + 2 students)
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'admin@devcorp.com', '$2b$10$placeholder_hash', 'Ana Ferreira', 'admin', true),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'carlos@devcorp.com', '$2b$10$placeholder_hash', 'Carlos Souza', 'teacher', true),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'julia@devcorp.com', '$2b$10$placeholder_hash', 'Julia Oliveira', 'student', true),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'lucas@devcorp.com', '$2b$10$placeholder_hash', 'Lucas Almeida', 'student', true);

-- ==================================
-- 3. CURSO (Bash - Único curso ativo)
-- ==================================

INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index) VALUES
('bash', 'Bash Shell Scripting', 'Shell scripting, automação e linha de comando', '🐚', 32, 16, 'beginner', 'active', 'integrated', 1);

-- ==================================
-- 4. FASES DO BASH (4 fases)
-- ==================================

INSERT INTO phases (id, course_id, name, weeks, color, light_color, icon, description, order_index) VALUES
('bash-1', 'bash', 'Seção 1: Fundamentos Shell Scripting', '1-4', 'green-500', 'green-50', '📚', 'História, filosofia software tools e scripts básicos', 1),
('bash-2', 'bash', 'Seção 2: Processamento de Texto', '5-8', 'blue-500', 'blue-50', '📝', 'Regex, manipulação de texto e pipelines avançados', 2),
('bash-3', 'bash', 'Seção 3: Recursos Avançados', '9-12', 'purple-500', 'purple-50', '⚡', 'Variáveis, loops, funções e scripting robusto', 3),
('bash-4', 'bash', 'Seção 4: Ferramentas e Práticas', '13-16', 'orange-500', 'orange-50', '🛠️', 'Sinais, subshells, ferramentas de arquivos', 4);

-- ==================================
-- 5. MÓDULOS DO BASH (16 módulos)
-- ==================================

INSERT INTO modules (id, course_id, phase_id, name, week, duration, deliverable, has_notes, order_index) VALUES
-- Seção 1: Fundamentos (4 módulos)
('bash-1.1', 'bash', 'bash-1', 'Introdução ao Curso + História Unix/Linux', 1, '1 semana', 'Compreensão da história e contexto do shell scripting', true, 1),
('bash-1.2', 'bash', 'bash-1', 'Filosofia Software Tools - Parte 1', 2, '1 semana', 'Aplicação dos princípios: fazer uma coisa bem, processar texto', false, 2),
('bash-1.3', 'bash', 'bash-1', 'Filosofia Software Tools - Parte 2', 3, '1 semana', 'Domínio de pipelines e combinação de ferramentas', false, 3),
('bash-1.4', 'bash', 'bash-1', 'Scripts Auto-Contidos (#!) + Primeiros Scripts', 4, '1 semana', 'Criação de scripts executáveis com shebang', false, 4),

-- Seção 2: Processamento de Texto (4 módulos)
('bash-2.1', 'bash', 'bash-2', 'Redirecionamento I/O + Variáveis Básicas', 5, '1 semana', 'Scripts com redirecionamento e variáveis', false, 5),
('bash-2.2', 'bash', 'bash-2', 'Processamento de Texto Simples', 6, '1 semana', 'Manipulação básica com cut, sort, uniq', false, 6),
('bash-2.3', 'bash', 'bash-2', 'Expressões Regulares (Regex)', 7, '1 semana', 'Domínio de regex para padrões complexos', false, 7),
('bash-2.4', 'bash', 'bash-2', 'Processamento Avançado: sed + awk', 8, '1 semana', 'Manipulação avançada de texto com sed e awk', false, 8),

-- Seção 3: Recursos Avançados (4 módulos)
('bash-3.1', 'bash', 'bash-3', 'Estruturas de Controle + Loops', 9, '1 semana', 'Scripts com if/else, for, while', false, 9),
('bash-3.2', 'bash', 'bash-3', 'Funções + Parâmetros', 10, '1 semana', 'Funções reutilizáveis com parâmetros', false, 10),
('bash-3.3', 'bash', 'bash-3', 'Arrays + Debugging', 11, '1 semana', 'Uso de arrays e técnicas de debug', false, 11),
('bash-3.4', 'bash', 'bash-3', 'Programação Defensiva + Robustez', 12, '1 semana', 'Scripts robustos com tratamento de erros', false, 12),

-- Seção 4: Ferramentas e Práticas (4 módulos)
('bash-4.1', 'bash', 'bash-4', 'Sinais + Job Control', 13, '1 semana', 'Gerenciamento de processos e sinais', false, 13),
('bash-4.2', 'bash', 'bash-4', 'Subshells + Substituição de Comandos', 14, '1 semana', 'Uso avançado de subshells', false, 14),
('bash-4.3', 'bash', 'bash-4', 'find + xargs + Arquivos', 15, '1 semana', 'Busca e manipulação em massa de arquivos', false, 15),
('bash-4.4', 'bash', 'bash-4', 'Projeto Final: Script de Automação', 16, '1 semana', 'Script de automação completo aplicando todos conceitos', false, 16);

-- ==================================
-- 6. PROGRESSO DE USUÁRIOS (Exemplo)
-- ==================================

-- Maria Santos (Acme): 5 módulos completados (Seção 1 completa + 1 da Seção 2)
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.1', true, NOW() - INTERVAL '10 days'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.2', true, NOW() - INTERVAL '9 days'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.3', true, NOW() - INTERVAL '8 days'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.4', true, NOW() - INTERVAL '7 days'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-2.1', true, NOW() - INTERVAL '6 days'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-2.2', false, NULL),

-- Pedro Costa (Acme): 2 módulos completados
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.1', true, NOW() - INTERVAL '5 days'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.2', true, NOW() - INTERVAL '4 days'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.3', false, NULL),

-- Julia Oliveira (DevCorp): 3 módulos completados
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.1', true, NOW() - INTERVAL '12 days'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.2', true, NOW() - INTERVAL '11 days'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.3', true, NOW() - INTERVAL '10 days'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.4', false, NULL),

-- Lucas Almeida (DevCorp): 2 módulos completados
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.1', true, NOW() - INTERVAL '3 days'),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.2', true, NOW() - INTERVAL '2 days'),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.3', false, NULL);

-- ==================================
-- 7. NOTAS DE ESTUDO (Exemplo)
-- ==================================

INSERT INTO study_notes (user_id, company_id, course_id, content, size_bytes) VALUES
-- Maria Santos: Notas detalhadas
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'bash', 
E'# Minhas Anotações - Bash\n\n## Módulo 1.1: Introdução\n\n- Unix criado em 1969 no Bell Labs\n- Shell é o interpretador de comandos\n- Bash = Bourne Again Shell (1989)\n\n## Módulo 1.2: Filosofia\n\n**Princípios:**\n1. Fazer uma coisa e fazer bem\n2. Trabalhar junto com outras ferramentas\n3. Processar texto (formato universal)\n\n**Exemplo de pipeline:**\n```bash\ncat dados.txt | grep "erro" | wc -l\n```\n\n## Módulo 2.1: Redirecionamento\n\n- `>` - Redirecionar saída (sobrescreve)\n- `>>` - Redirecionar saída (append)\n- `<` - Redirecionar entrada\n- `2>` - Redirecionar stderr\n\n**Exercício feito:**\n```bash\nls -la > arquivos.txt 2> erros.txt\n```', 850),

-- Julia Oliveira: Notas básicas
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'bash', 
E'# Bash - Anotações\n\n## Comandos importantes\n\n- ls: listar arquivos\n- cd: mudar diretório\n- pwd: mostrar diretório atual\n- mkdir: criar pasta\n- rm: deletar\n\n## Variáveis\n\n```bash\nNOME="Julia"\necho "Olá, $NOME"\n```\n\nLembrar: sem espaços ao redor do =', 350);

-- ==================================
-- 8. LOGS DE AUDITORIA (Exemplo)
-- ==================================

INSERT INTO audit_logs (company_id, user_id, action, entity_type, entity_id, metadata) VALUES
-- Criação de usuários
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'user_created', 'user', '650e8400-e29b-41d4-a716-446655440002', '{"created_by": "admin", "role": "student"}'),
('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440004', 'user_created', 'user', '650e8400-e29b-41d4-a716-446655440006', '{"created_by": "admin", "role": "student"}'),

-- Conclusão de módulos
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', 'module_completed', 'module', 'bash-1.1', '{"course": "bash", "phase": "bash-1"}'),
('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440006', 'module_completed', 'module', 'bash-1.1', '{"course": "bash", "phase": "bash-1"}');

-- ==================================
-- VERIFICAÇÃO DE DADOS
-- ==================================

-- Mostrar resumo dos dados carregados
DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'DADOS CARREGADOS COM SUCESSO!';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Empresas: %', (SELECT COUNT(*) FROM companies);
  RAISE NOTICE 'Usuários: %', (SELECT COUNT(*) FROM users);
  RAISE NOTICE 'Cursos: %', (SELECT COUNT(*) FROM courses);
  RAISE NOTICE 'Fases: %', (SELECT COUNT(*) FROM phases);
  RAISE NOTICE 'Módulos: %', (SELECT COUNT(*) FROM modules);
  RAISE NOTICE 'Progresso: %', (SELECT COUNT(*) FROM user_progress);
  RAISE NOTICE 'Notas: %', (SELECT COUNT(*) FROM study_notes);
  RAISE NOTICE 'Logs: %', (SELECT COUNT(*) FROM audit_logs);
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Use NocoDB para visualizar os dados!';
  RAISE NOTICE 'URL: http://localhost:8080';
  RAISE NOTICE '===========================================';
END $$;
