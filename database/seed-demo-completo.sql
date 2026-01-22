-- ===============================
-- SEED DEMO COMPLETO - RBAC Demo
-- Branch: demo-nocodb-simple
-- Data: 2026-01-22
-- Senha padrão: Demo@2026
-- ===============================

-- ==================================
-- LIMPAR DADOS EXISTENTES (CUIDADO!)
-- ==================================

-- Limpar progresso e notas existentes para recriar
DELETE FROM audit_logs;
DELETE FROM study_notes;
DELETE FROM user_progress;
DELETE FROM users;
DELETE FROM companies;

-- ==================================
-- 1. EMPRESAS
-- ==================================

INSERT INTO companies (id, name, slug, logo_url, primary_color, plan, max_users, active) VALUES
-- Empresa 1: Startup Tech (Starter Plan)
('550e8400-e29b-41d4-a716-446655440001', 'Acme Tech Solutions', 'acme-tech', NULL, '#FF6B35', 'starter', 20, true),

-- Empresa 2: Consultoria (Professional Plan)
('550e8400-e29b-41d4-a716-446655440002', 'DevCorp Consulting', 'devcorp', NULL, '#4ECDC4', 'professional', 50, true);

-- ==================================
-- 2. USUÁRIOS - ACME TECH SOLUTIONS
-- ==================================

-- Senha: Demo@2026 (bcrypt hash)
-- Em produção, usar bcrypt real. Este é um placeholder.

INSERT INTO users (id, company_id, email, password_hash, full_name, role, active) VALUES
-- C-Level
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001',
 'ceo@acmetech.com', '$2b$10$demo_hash_placeholder', 'Roberto Mendes', 'c_level', true),

-- Admin (RH/T&D)
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001',
 'admin@acmetech.com', '$2b$10$demo_hash_placeholder', 'João Silva', 'admin', true),

-- Instructor (Tech Lead)
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001',
 'prof@acmetech.com', '$2b$10$demo_hash_placeholder', 'Fernanda Lima', 'instructor', true),

-- Students
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001',
 'maria@acmetech.com', '$2b$10$demo_hash_placeholder', 'Maria Santos', 'student', true),

('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001',
 'pedro@acmetech.com', '$2b$10$demo_hash_placeholder', 'Pedro Costa', 'student', true),

('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001',
 'ana@acmetech.com', '$2b$10$demo_hash_placeholder', 'Ana Ferreira', 'student', true);

-- ==================================
-- 3. USUÁRIOS - DEVCORP CONSULTING
-- ==================================

INSERT INTO users (id, company_id, email, password_hash, full_name, role, active) VALUES
-- C-Level (CTO)
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002',
 'cto@devcorp.com', '$2b$10$demo_hash_placeholder', 'Carla Souza', 'c_level', true),

-- Admin (RH)
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002',
 'admin@devcorp.com', '$2b$10$demo_hash_placeholder', 'Lucas Oliveira', 'admin', true),

-- Instructor (Arquiteto)
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440002',
 'prof@devcorp.com', '$2b$10$demo_hash_placeholder', 'Carlos Santos', 'instructor', true),

-- Students
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002',
 'julia@devcorp.com', '$2b$10$demo_hash_placeholder', 'Julia Almeida', 'student', true),

('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002',
 'bruno@devcorp.com', '$2b$10$demo_hash_placeholder', 'Bruno Costa', 'student', true),

('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002',
 'camila@devcorp.com', '$2b$10$demo_hash_placeholder', 'Camila Rocha', 'student', true);

-- ==================================
-- 4. PROGRESSO - ACME TECH
-- ==================================

-- Maria Santos: 8 módulos completados (50% do curso)
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.1', true, NOW() - INTERVAL '20 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.2', true, NOW() - INTERVAL '18 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.3', true, NOW() - INTERVAL '16 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.4', true, NOW() - INTERVAL '14 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-2.1', true, NOW() - INTERVAL '12 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-2.2', true, NOW() - INTERVAL '10 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-2.3', true, NOW() - INTERVAL '8 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-2.4', true, NOW() - INTERVAL '6 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-3.1', false, NULL);

-- Pedro Costa: 4 módulos completados (25% do curso)
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.1', true, NOW() - INTERVAL '10 days'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.2', true, NOW() - INTERVAL '8 days'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.3', true, NOW() - INTERVAL '6 days'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.4', true, NOW() - INTERVAL '4 days'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-2.1', false, NULL);

-- Ana Ferreira: 2 módulos completados (12.5% do curso)
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.1', true, NOW() - INTERVAL '5 days'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.2', true, NOW() - INTERVAL '3 days'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'bash', 'bash-1.3', false, NULL);

-- ==================================
-- 5. PROGRESSO - DEVCORP
-- ==================================

-- Julia Almeida: 12 módulos completados (75% do curso)
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.1', true, NOW() - INTERVAL '30 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.2', true, NOW() - INTERVAL '28 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.3', true, NOW() - INTERVAL '26 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.4', true, NOW() - INTERVAL '24 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-2.1', true, NOW() - INTERVAL '22 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-2.2', true, NOW() - INTERVAL '20 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-2.3', true, NOW() - INTERVAL '18 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-2.4', true, NOW() - INTERVAL '16 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-3.1', true, NOW() - INTERVAL '14 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-3.2', true, NOW() - INTERVAL '12 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-3.3', true, NOW() - INTERVAL '10 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-3.4', true, NOW() - INTERVAL '8 days'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-4.1', false, NULL);

-- Bruno Costa: 6 módulos completados (37.5% do curso)
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.1', true, NOW() - INTERVAL '15 days'),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.2', true, NOW() - INTERVAL '13 days'),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.3', true, NOW() - INTERVAL '11 days'),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.4', true, NOW() - INTERVAL '9 days'),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-2.1', true, NOW() - INTERVAL '7 days'),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-2.2', true, NOW() - INTERVAL '5 days'),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-2.3', false, NULL);

-- Camila Rocha: 3 módulos completados (18.75% do curso)
INSERT INTO user_progress (user_id, company_id, course_id, module_id, completed, completed_at) VALUES
('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.1', true, NOW() - INTERVAL '7 days'),
('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.2', true, NOW() - INTERVAL '5 days'),
('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.3', true, NOW() - INTERVAL '3 days'),
('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 'bash', 'bash-1.4', false, NULL);

-- ==================================
-- 6. NOTAS DE ESTUDO
-- ==================================

-- Maria Santos (Acme): Notas detalhadas
INSERT INTO study_notes (user_id, company_id, course_id, content, size_bytes) VALUES
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'bash',
E'# Minhas Anotações - Bash Shell Scripting

## Módulo 1.1: Introdução ao Shell Scripting

### História do Unix/Linux
- **1969**: Unix criado no Bell Labs por Ken Thompson e Dennis Ritchie
- **1973**: Unix reescrito em C (portabilidade)
- **1991**: Linus Torvalds cria o Linux
- **1989**: Brian Fox cria o Bash (Bourne Again Shell)

### O que é Shell?
- Interface entre usuário e kernel
- Interpretador de comandos
- Linguagem de programação

### Por que aprender Bash?
1. Automação de tarefas repetitivas
2. Administração de sistemas
3. DevOps e CI/CD
4. Processamento de dados

---

## Módulo 1.2: Filosofia Software Tools

### Os 3 Princípios Fundamentais

1. **Fazer uma coisa e fazer bem**
   - Cada ferramenta tem um propósito específico
   - `ls` lista arquivos, `cat` mostra conteúdo
   - Evitar "canivete suíço"

2. **Trabalhar junto com outras ferramentas**
   - Pipes conectam ferramentas
   - Output de um = input de outro
   - Composição > monolito

3. **Processar texto**
   - Formato universal
   - Humano e máquina leem
   - Fácil de debugar

### Exemplo Prático
```bash
# Contar quantos arquivos .js existem
ls -la *.js | wc -l

# Encontrar erros em logs
cat server.log | grep "ERROR" | wc -l
```

---

## Módulo 2.1: Redirecionamento I/O

### File Descriptors
- `0` = stdin (entrada padrão)
- `1` = stdout (saída padrão)
- `2` = stderr (erros)

### Operadores
```bash
>   # Redireciona stdout (sobrescreve)
>>  # Redireciona stdout (append)
<   # Redireciona stdin
2>  # Redireciona stderr
2>&1 # Redireciona stderr para stdout
```

### Exemplo Prático
```bash
# Salvar lista de arquivos
ls -la > arquivos.txt

# Separar saída e erros
./script.sh > output.txt 2> errors.txt

# Combinar saída e erros
./script.sh > all.txt 2>&1
```

---

## Próximos Passos
- [ ] Praticar redirecionamento
- [ ] Estudar variáveis
- [ ] Fazer exercícios do módulo 2.2
', 2500);

-- Julia Almeida (DevCorp): Notas avançadas
INSERT INTO study_notes (user_id, company_id, course_id, content, size_bytes) VALUES
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'bash',
E'# Caderno de Estudos - Bash Avançado

## Seção 3: Recursos Avançados

### Variáveis e Aritmética

```bash
# Declaração
NAME="Julia"
COUNT=10

# Aritmética
result=$((5 + 3))
((count++))
```

### Estruturas de Controle

```bash
# If-else
if [[ $count -gt 10 ]]; then
    echo "Maior que 10"
elif [[ $count -eq 10 ]]; then
    echo "Igual a 10"
else
    echo "Menor que 10"
fi

# Case
case $option in
    start) start_server ;;
    stop) stop_server ;;
    *) echo "Opção inválida" ;;
esac
```

### Loops

```bash
# For
for file in *.txt; do
    echo "Processando: $file"
done

# While
while read line; do
    echo "Linha: $line"
done < arquivo.txt

# Until
until [[ $count -eq 0 ]]; do
    echo $count
    ((count--))
done
```

### Funções

```bash
# Declaração
function greet() {
    local name=$1
    echo "Olá, $name!"
}

# Chamada
greet "Julia"
```

---

## Dicas Importantes

1. Sempre usar `[[ ]]` em vez de `[ ]` (mais seguro)
2. Usar `local` para variáveis em funções
3. Sempre validar inputs do usuário
4. Usar `set -e` para parar em erros
5. Usar `set -u` para detectar variáveis não definidas

## Recursos Úteis
- Manual: `man bash`
- Shellcheck: https://shellcheck.net
- Guia avançado: tldp.org/LDP/abs/html/
', 1800);

-- Pedro Costa (Acme): Notas básicas
INSERT INTO study_notes (user_id, company_id, course_id, content, size_bytes) VALUES
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'bash',
E'# Notas Rápidas - Bash

## Comandos básicos aprendidos

- `ls` - listar arquivos
- `cd` - mudar diretório
- `pwd` - mostrar diretório atual
- `mkdir` - criar pasta
- `rm` - deletar arquivo
- `cp` - copiar
- `mv` - mover/renomear

## Variáveis

```bash
NOME="Pedro"
echo $NOME
echo ${NOME}
```

**Importante**: Sem espaços ao redor do `=`

## Pipes

```bash
cat arquivo.txt | grep "busca" | wc -l
```

## TODO
- Estudar mais sobre redirecionamento
- Praticar loops
', 550);

-- ==================================
-- 7. LOGS DE AUDITORIA
-- ==================================

-- Logins recentes
INSERT INTO audit_logs (company_id, user_id, action, entity_type, entity_id, metadata) VALUES
-- Acme Tech
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', 'user_login', 'user', '650e8400-e29b-41d4-a716-446655440004', '{"ip": "192.168.1.100", "device": "Chrome/Windows"}'),
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440005', 'user_login', 'user', '650e8400-e29b-41d4-a716-446655440005', '{"ip": "192.168.1.101", "device": "Firefox/Linux"}'),

-- DevCorp
('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440010', 'user_login', 'user', '650e8400-e29b-41d4-a716-446655440010', '{"ip": "10.0.0.50", "device": "Safari/macOS"}'),
('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440011', 'user_login', 'user', '650e8400-e29b-41d4-a716-446655440011', '{"ip": "10.0.0.51", "device": "Chrome/Windows"}');

-- Módulos completados
INSERT INTO audit_logs (company_id, user_id, action, entity_type, entity_id, metadata) VALUES
-- Acme Tech
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', 'module_completed', 'module', 'bash-1.1', '{"course": "bash", "phase": "bash-1", "time_spent": "45min"}'),
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', 'module_completed', 'module', 'bash-2.4', '{"course": "bash", "phase": "bash-2", "time_spent": "1h30min"}'),

-- DevCorp
('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440010', 'module_completed', 'module', 'bash-3.4', '{"course": "bash", "phase": "bash-3", "time_spent": "2h"}');

-- ==================================
-- VERIFICAÇÃO FINAL
-- ==================================

DO $$
DECLARE
  v_companies INTEGER;
  v_users INTEGER;
  v_progress INTEGER;
  v_notes INTEGER;
  v_logs INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_companies FROM companies;
  SELECT COUNT(*) INTO v_users FROM users;
  SELECT COUNT(*) INTO v_progress FROM user_progress;
  SELECT COUNT(*) INTO v_notes FROM study_notes;
  SELECT COUNT(*) INTO v_logs FROM audit_logs;

  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '  SEED DEMO COMPLETO - DADOS CARREGADOS COM SUCESSO!';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '  Empresas:     %', v_companies;
  RAISE NOTICE '  Usuários:     %', v_users;
  RAISE NOTICE '  Progresso:    %', v_progress;
  RAISE NOTICE '  Notas:        %', v_notes;
  RAISE NOTICE '  Logs:         %', v_logs;
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '  CREDENCIAIS DE DEMO (Senha: Demo@2026)';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '  ACME TECH SOLUTIONS:';
  RAISE NOTICE '    C-Level:    ceo@acmetech.com';
  RAISE NOTICE '    Admin:      admin@acmetech.com';
  RAISE NOTICE '    Instructor: prof@acmetech.com';
  RAISE NOTICE '    Student:    maria@acmetech.com';
  RAISE NOTICE '';
  RAISE NOTICE '  DEVCORP CONSULTING:';
  RAISE NOTICE '    C-Level:    cto@devcorp.com';
  RAISE NOTICE '    Admin:      admin@devcorp.com';
  RAISE NOTICE '    Instructor: prof@devcorp.com';
  RAISE NOTICE '    Student:    julia@devcorp.com';
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
  RAISE NOTICE '  Acesse NocoDB: http://localhost:8080';
  RAISE NOTICE '═══════════════════════════════════════════════════════════';
END $$;
