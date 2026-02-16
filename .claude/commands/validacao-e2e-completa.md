# Validação E2E Completa - App-Controle

**Comando:** `/validacao-e2e-completa`
**Versão:** 1.0.0
**Stack:** React 18 + Vite + NocoDB + PostgreSQL
**MCP:** Chrome DevTools

---

## 🎯 Objetivo

Validação End-to-End **completa** em 3 camadas usando MCP Chrome DevTools:

1. **L1 - Foundation** (Auth + RBAC + Multi-Tenant)
2. **L2 - Features** (CRUD + Hub Especialistas)
3. **L3 - Quality** (i18n + White-Label + Performance)

---

## 📋 Pre-requisitos

```bash
# 1. Backend rodando
docker-compose up -d

# 2. Frontend rodando
mise dev

# 3. Chrome Debug Mode
mise chrome-debug

# 4. Verificar MCP
curl http://127.0.0.1:9222/json/version
```

---

## 🔄 Execução

### Modo Automático (Recomendado)

```
Claude, execute a validação E2E completa seguindo o guia em .claude/commands/validacao-e2e-completa.md
```

### Modo Manual (Layer por layer)

```
Claude, execute apenas L1 (Foundation) da validação E2E
Claude, execute L2 (Features) da validação E2E
Claude, execute L3 (Quality) da validação E2E
```

---

## 🧪 L1 - FOUNDATION (12 Cenários)

### Categoria: Auth (4 cenários)

#### TC-L1-001: Login Student
```
1. navigate_page(url="http://localhost:3001")
2. take_snapshot() → validar página login
3. fill(uid="email", value="maria@acmetech.com")
4. fill(uid="password", value="Demo@2026")
5. click(uid="login-button")
6. wait_for(text="Bem-vindo")
7. take_snapshot() → validar dashboard student
8. list_console_messages(types=["error"]) → 0 erros
```

**Resultado esperado:**
- ✅ Redirect para `/dashboard`
- ✅ Exibe nome "Maria Silva"
- ✅ Mostra cursos matriculados
- ✅ 0 erros no console

#### TC-L1-002: Login Instructor
```
1. navigate_page(url="http://localhost:3001")
2. fill(uid="email", value="prof@acmetech.com")
3. fill(uid="password", value="Demo@2026")
4. click(uid="login-button")
5. wait_for(text="Bem-vindo")
6. take_snapshot() → validar dashboard instructor
7. Verificar elementos visíveis:
   - "Criar Curso"
   - "Meus Cursos"
   - Lista de cursos criados
```

**Resultado esperado:**
- ✅ Dashboard instructor carregado
- ✅ Botão "Criar Curso" visível
- ✅ Lista de cursos criados exibida

#### TC-L1-003: Login Admin
```
1. navigate_page(url="http://localhost:3001")
2. fill(uid="email", value="admin@acmetech.com")
3. fill(uid="password", value="Demo@2026")
4. click(uid="login-button")
5. wait_for(text="Bem-vindo")
6. navigate_page(url="http://localhost:3001/admin")
7. take_snapshot() → validar painel admin
8. Verificar elementos:
   - "Gerenciar Usuários"
   - "Adicionar Usuário"
   - Tabela de usuários
```

**Resultado esperado:**
- ✅ Painel admin completo visível
- ✅ Todas funcionalidades admin disponíveis

#### TC-L1-004: Logout Flow
```
1. Login como maria@acmetech.com
2. click(uid="user-menu")
3. click(uid="logout-button")
4. wait_for(text="Login")
5. take_snapshot() → validar volta à tela login
6. navigate_page(url="http://localhost:3001/dashboard")
7. take_snapshot() → validar redirect para login
```

**Resultado esperado:**
- ✅ Logout bem-sucedido
- ✅ Redirect para login ao acessar rota protegida

---

### Categoria: RBAC (4 cenários)

#### TC-L1-005: Admin Access Control
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → painel admin visível
4. Logout
5. Login como maria@acmetech.com (student)
6. navigate_page(url="http://localhost:3001/admin")
7. take_snapshot() → validar acesso negado
8. Verificar texto: "Acesso Negado" ou redirect
```

**Resultado esperado:**
- ✅ Admin vê painel completo
- ✅ Student NÃO vê painel (403 ou redirect)

#### TC-L1-006: Instructor Permissions
```
1. Login como prof@acmetech.com
2. navigate_page(url="http://localhost:3001/instructor")
3. take_snapshot() → painel instructor visível
4. Verificar botões visíveis:
   - "Criar Curso" ✅
   - "Gerenciar Usuários" ❌ (não deve aparecer)
5. navigate_page(url="http://localhost:3001/admin")
6. take_snapshot() → validar acesso negado
```

**Resultado esperado:**
- ✅ Instructor vê apenas funcionalidades de curso
- ✅ Instructor NÃO vê funcionalidades admin

#### TC-L1-007: C-Level Access
```
1. Login como ceo@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → painel admin visível
4. navigate_page(url="http://localhost:3001/instructor")
5. take_snapshot() → painel instructor visível
6. Verificar: C-Level tem acesso a TODOS painéis
```

**Resultado esperado:**
- ✅ C-Level vê admin + instructor + student views

#### TC-L1-008: Specialist Permissions
```
1. Login como joao.silva.specialist@plataformab2b.com
2. navigate_page(url="http://localhost:3001/specialist")
3. take_snapshot() → dashboard specialist visível
4. Verificar elementos:
   - Total de cursos publicados
   - Média de avaliação
   - Total de alunos
5. navigate_page(url="http://localhost:3001/admin")
6. take_snapshot() → validar acesso negado
```

**Resultado esperado:**
- ✅ Specialist vê apenas hub dashboard
- ✅ Specialist NÃO vê admin/instructor views

---

### Categoria: Multi-Tenant (4 cenários)

#### TC-L1-009: Company Isolation - Courses
```
1. Login como maria@acmetech.com (company-1)
2. navigate_page(url="http://localhost:3001/dashboard")
3. take_snapshot() → anotar cursos visíveis
4. list_network_requests(resourceTypes=["fetch"])
5. get_network_request() → verificar filtro company_id
6. Validar WHERE: (company_id,eq,company-1)
7. Logout
8. Login como julia@devcorp.com (company-2)
9. take_snapshot() → validar cursos DIFERENTES
10. Verificar: 0 cursos em comum (isolamento)
```

**Resultado esperado:**
- ✅ Usuários de company-1 veem apenas cursos de company-1
- ✅ Usuários de company-2 veem apenas cursos de company-2
- ✅ 0 vazamento de dados entre tenants

#### TC-L1-010: Company Isolation - Users
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → anotar usuários visíveis
4. Contar usuários de company-1 (esperado: 6)
5. Logout
6. Login como admin@devcorp.com
7. take_snapshot() → anotar usuários visíveis
8. Contar usuários de company-2 (esperado: 3)
9. Verificar: ZERO usuários em comum
```

**Resultado esperado:**
- ✅ Admin vê apenas usuários da própria empresa
- ✅ Isolamento perfeito de dados

#### TC-L1-011: Company Isolation - Enrollments
```
1. Login como maria@acmetech.com
2. navigate_page(url="http://localhost:3001/dashboard")
3. list_network_requests(resourceTypes=["fetch"])
4. Verificar request a v_enrollments_courses
5. Validar filtro: WHERE (company_id,eq,company-1)
6. Logout
7. Login como julia@devcorp.com
8. Verificar filtro: WHERE (company_id,eq,company-2)
```

**Resultado esperado:**
- ✅ Todas queries incluem company_id filter
- ✅ Impossível acessar enrollments de outra empresa

#### TC-L1-012: Cross-Tenant Access Attempt
```
1. Login como admin@acmetech.com
2. evaluate_script(function="() => {
     localStorage.setItem('plataformab2b_company_id', 'company-2');
     location.reload();
   }")
3. Aguardar reload
4. take_snapshot() → validar comportamento
5. Verificar:
   - Logout forçado OU
   - Erro "Company mismatch" OU
   - Fallback para company-1
```

**Resultado esperado:**
- ✅ Sistema detecta manipulação de company_id
- ✅ Logout ou erro de segurança

---

## 🚀 L2 - FEATURES (15 Cenários)

### Categoria: CRUD - Courses (5 cenários)

#### TC-L2-001: Create Course
```
1. Login como prof@acmetech.com
2. navigate_page(url="http://localhost:3001/instructor")
3. click(uid="create-course-button")
4. fill_form([
     {uid: "course-title", value: "Teste E2E Course"},
     {uid: "course-description", value: "Descrição teste"},
     {uid: "course-category", value: "tecnologia"}
   ])
5. click(uid="submit-course")
6. wait_for(text="Curso criado com sucesso")
7. take_snapshot() → validar curso na lista
8. list_network_requests(resourceTypes=["fetch"])
9. get_network_request() → validar POST /api/v2/tables/courses/records
10. Verificar body: company_id = company-1
```

**Resultado esperado:**
- ✅ Curso criado com company_id correto
- ✅ Aparece na lista de cursos
- ✅ Toast de sucesso exibido

#### TC-L2-002: Edit Course
```
1. Login como prof@acmetech.com
2. navigate_page(url="http://localhost:3001/instructor")
3. click(uid="edit-course-button-1")
4. fill(uid="course-title", value="Título Editado E2E")
5. click(uid="save-course")
6. wait_for(text="Curso atualizado")
7. take_snapshot() → validar título atualizado
8. get_network_request() → validar PATCH request
```

**Resultado esperado:**
- ✅ Curso editado com sucesso
- ✅ Mudanças refletidas na UI

#### TC-L2-003: Delete Course
```
1. Login como prof@acmetech.com
2. navigate_page(url="http://localhost:3001/instructor")
3. click(uid="delete-course-button-1")
4. handle_dialog(action="accept")
5. wait_for(text="Curso deletado")
6. take_snapshot() → validar curso removido da lista
7. get_network_request() → validar DELETE request
```

**Resultado esperado:**
- ✅ Curso deletado
- ✅ Removido da lista

#### TC-L2-004: Enroll in Course
```
1. Login como maria@acmetech.com
2. navigate_page(url="http://localhost:3001/courses")
3. click(uid="enroll-course-button-1")
4. wait_for(text="Matrícula realizada")
5. navigate_page(url="http://localhost:3001/dashboard")
6. take_snapshot() → validar curso aparece em "Meus Cursos"
7. get_network_request() → validar POST /api/v2/tables/enrollments/records
```

**Resultado esperado:**
- ✅ Matrícula criada
- ✅ Curso aparece no dashboard

#### TC-L2-005: Complete Module
```
1. Login como maria@acmetech.com
2. navigate_page(url="http://localhost:3001/courses/course-1/modules/module-1")
3. click(uid="mark-complete-button")
4. wait_for(text="Módulo concluído")
5. take_snapshot() → validar progresso atualizado
6. navigate_page(url="http://localhost:3001/dashboard")
7. Verificar: barra de progresso > 0%
```

**Resultado esperado:**
- ✅ Módulo marcado como completo
- ✅ Progresso refletido no dashboard

---

### Categoria: Hub de Especialistas (5 cenários)

#### TC-L2-006: Specialist Dashboard
```
1. Login como joao.silva.specialist@plataformab2b.com
2. navigate_page(url="http://localhost:3001/specialist")
3. take_snapshot() → validar dashboard specialist
4. Verificar elementos:
   - Total de cursos publicados: 2
   - Média de avaliação: 4.8
   - Total de alunos: 15
5. list_network_requests(resourceTypes=["fetch"])
6. Verificar request: v_specialist_dashboard
```

**Resultado esperado:**
- ✅ Dashboard carrega métricas corretas
- ✅ Usa view v_specialist_dashboard

#### TC-L2-007: Hub Catalog
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/hub")
3. take_snapshot() → validar catálogo hub
4. Verificar elementos:
   - Lista de cursos hub
   - Filtros de categoria
   - Search bar
   - Cards de especialistas
5. Contar cursos hub: >= 2
```

**Resultado esperado:**
- ✅ Catálogo exibe cursos hub
- ✅ Filtros funcionam

#### TC-L2-008: Course Details Hub
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/hub/courses/hub-course-1")
3. take_snapshot() → validar página detalhes
4. Verificar elementos:
   - Título do curso
   - Descrição
   - Avaliação (estrelas)
   - Botão "Adquirir"
   - Informações do especialista
```

**Resultado esperado:**
- ✅ Página de detalhes completa
- ✅ Dados do especialista exibidos

#### TC-L2-009: Specialist Reviews
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/hub/specialists/specialist-1")
3. take_snapshot() → validar perfil especialista
4. Verificar elementos:
   - Foto do especialista
   - Bio
   - Lista de cursos
   - Reviews de alunos
5. Contar reviews: >= 1
```

**Resultado esperado:**
- ✅ Perfil especialista completo
- ✅ Reviews exibidas

#### TC-L2-010: Hub Search
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/hub")
3. fill(uid="search-input", value="React")
4. press_key(key="Enter")
5. take_snapshot() → validar resultados filtrados
6. Verificar: apenas cursos com "React" no título/descrição
```

**Resultado esperado:**
- ✅ Search funciona
- ✅ Resultados filtrados corretamente

---

### Categoria: User Management (5 cenários)

#### TC-L2-011: Create User (Admin)
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. click(uid="add-user-button")
4. fill_form([
     {uid: "user-name", value: "Teste E2E User"},
     {uid: "user-email", value: "teste@acmetech.com"},
     {uid: "user-role", value: "student"}
   ])
5. click(uid="submit-user")
6. wait_for(text="Usuário criado")
7. take_snapshot() → validar usuário na lista
8. Verificar: company_id = company-1 no body
```

**Resultado esperado:**
- ✅ Usuário criado com company_id correto
- ✅ Aparece na lista

#### TC-L2-012: Edit User
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. click(uid="edit-user-button-1")
4. fill(uid="user-name", value="Nome Editado E2E")
5. click(uid="save-user")
6. wait_for(text="Usuário atualizado")
7. take_snapshot() → validar nome atualizado
```

**Resultado esperado:**
- ✅ Usuário editado
- ✅ Mudanças refletidas

#### TC-L2-013: Delete User
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. click(uid="delete-user-button-1")
4. handle_dialog(action="accept")
5. wait_for(text="Usuário deletado")
6. take_snapshot() → validar usuário removido
```

**Resultado esperado:**
- ✅ Usuário deletado
- ✅ Removido da lista

#### TC-L2-014: User Role Change
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. click(uid="edit-user-button-1")
4. fill(uid="user-role", value="instructor")
5. click(uid="save-user")
6. wait_for(text="Usuário atualizado")
7. Logout
8. Login com usuário modificado
9. take_snapshot() → validar dashboard instructor
```

**Resultado esperado:**
- ✅ Role atualizado
- ✅ Usuário vê dashboard correspondente

#### TC-L2-015: Bulk User Import (Future)
```
# Funcionalidade futura - Sprint 18
# Importar CSV com múltiplos usuários
```

---

## ✨ L3 - QUALITY (13 Cenários)

### Categoria: i18n (4 cenários)

#### TC-L3-001: Language Switch pt-BR → en-US
```
1. Login como maria@acmetech.com
2. take_snapshot() → validar textos em pt-BR
3. Anotar textos:
   - "Bem-vindo"
   - "Meus Cursos"
   - "Sair"
4. click(uid="language-selector")
5. click(uid="language-en-US")
6. take_snapshot() → validar textos em en-US
7. Verificar traduções:
   - "Welcome"
   - "My Courses"
   - "Logout"
```

**Resultado esperado:**
- ✅ Todos textos traduzidos
- ✅ Sem hardcoded text

#### TC-L3-002: Language Switch pt-BR → es-ES
```
1. Login como maria@acmetech.com
2. click(uid="language-selector")
3. click(uid="language-es-ES")
4. take_snapshot() → validar textos em es-ES
5. Verificar traduções:
   - "Bienvenido"
   - "Mis Cursos"
   - "Salir"
```

**Resultado esperado:**
- ✅ Todos textos traduzidos para espanhol

#### TC-L3-003: Persistence of Language
```
1. Login como maria@acmetech.com
2. click(uid="language-selector")
3. click(uid="language-en-US")
4. navigate_page(type="reload")
5. take_snapshot() → validar idioma persistido (en-US)
6. Logout
7. Login novamente
8. take_snapshot() → validar idioma ainda en-US
```

**Resultado esperado:**
- ✅ Idioma persiste após reload
- ✅ Idioma persiste entre sessões

#### TC-L3-004: All Pages i18n Coverage
```
1. Login como maria@acmetech.com
2. Trocar para en-US
3. Navegar todas páginas principais:
   - /dashboard
   - /courses
   - /profile
   - /settings
4. Para cada página:
   take_snapshot() → validar 100% traduzido
5. Verificar: ZERO textos em pt-BR
```

**Resultado esperado:**
- ✅ 100% das páginas traduzidas
- ✅ 0 hardcoded text

---

### Categoria: White-Label (3 cenários)

#### TC-L3-005: Company Branding - AcmeTech
```
1. Login como maria@acmetech.com
2. take_screenshot() → validar branding AcmeTech
3. Verificar elementos:
   - Logo: Acme logo
   - Cor primária: #1E40AF (blue)
   - Nome da empresa no header
4. evaluate_script(function="() => {
     const logo = document.querySelector('[data-testid=\"company-logo\"]');
     return logo.src;
   }")
5. Validar: logo contém "acme"
```

**Resultado esperado:**
- ✅ Logo AcmeTech exibido
- ✅ Cores do tema AcmeTech

#### TC-L3-006: Company Branding - DevCorp
```
1. Login como julia@devcorp.com
2. take_screenshot() → validar branding DevCorp
3. Verificar elementos:
   - Logo: DevCorp logo
   - Cor primária: #059669 (green)
   - Nome da empresa no header
4. Validar: logo DIFERENTE de AcmeTech
```

**Resultado esperado:**
- ✅ Logo DevCorp exibido
- ✅ Cores DIFERENTES de AcmeTech

#### TC-L3-007: Theme Customization
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/settings")
3. click(uid="theme-settings")
4. take_screenshot() → validar opções de personalização
5. Verificar campos disponíveis:
   - Upload logo
   - Cor primária
   - Cor secundária
6. (Não alterar - apenas validar UI)
```

**Resultado esperado:**
- ✅ UI de customização acessível
- ✅ Campos de branding disponíveis

---

### Categoria: Performance (3 cenários)

#### TC-L3-008: Core Web Vitals - Dashboard
```
1. navigate_page(url="http://localhost:3001")
2. Login como maria@acmetech.com
3. performance_start_trace(reload=true, autoStop=true)
4. Aguardar trace completo
5. performance_stop_trace(filePath="./trace-dashboard.json")
6. Analisar métricas:
   - First Paint (FP)
   - Largest Contentful Paint (LCP)
   - Total Blocking Time (TBT)
7. Validar:
   - FP < 1.5s
   - LCP < 2.5s
   - TBT < 300ms
```

**Resultado esperado:**
- ✅ FP < 1.5s
- ✅ LCP < 2.5s
- ✅ TBT < 300ms

#### TC-L3-009: Network Requests Count
```
1. navigate_page(url="http://localhost:3001")
2. Login como maria@acmetech.com
3. list_network_requests()
4. Contar total de requests
5. Validar: < 50 requests iniciais
6. Filtrar por tipo:
   - fetch/xhr: < 10
   - script: < 15
   - stylesheet: < 5
   - image: < 20
```

**Resultado esperado:**
- ✅ < 50 requests totais
- ✅ Distribuição otimizada

#### TC-L3-010: Console Errors - Full Scan
```
1. navigate_page(url="http://localhost:3001")
2. Login como admin@acmetech.com
3. Navegar todas páginas principais:
   - /dashboard
   - /admin
   - /instructor
   - /courses
   - /hub
   - /specialist
   - /profile
   - /settings
4. Para cada página:
   list_console_messages(types=["error", "warn"])
5. Consolidar: total de erros + warnings
6. Validar:
   - ZERO erros (error)
   - < 5 warnings aceitáveis
```

**Resultado esperado:**
- ✅ 0 erros no console
- ✅ < 5 warnings (deprecation notices OK)

---

### Categoria: Security (3 cenários)

#### TC-L3-011: XSS Prevention
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. click(uid="add-user-button")
4. fill(uid="user-name", value="<script>alert('XSS')</script>")
5. fill(uid="user-email", value="test@test.com")
6. click(uid="submit-user")
7. wait_for(text="Usuário criado")
8. take_snapshot() → validar nome do usuário
9. Verificar: script NÃO executado, texto escapado
10. evaluate_script(function="() => {
      const userCard = document.querySelector('[data-testid=\"user-1\"]');
      return userCard.innerHTML;
    }")
11. Validar: HTML escapado (&lt;script&gt;)
```

**Resultado esperado:**
- ✅ Script NÃO executado
- ✅ HTML escapado corretamente

#### TC-L3-012: SQL Injection Prevention
```
1. Login como maria@acmetech.com
2. navigate_page(url="http://localhost:3001/courses")
3. fill(uid="search-input", value="' OR '1'='1")
4. press_key(key="Enter")
5. list_network_requests(resourceTypes=["fetch"])
6. get_network_request() → analisar query params
7. Validar: query escapada ou parametrizada
8. take_snapshot() → validar ZERO cursos ou erro seguro
```

**Resultado esperado:**
- ✅ Query escapada
- ✅ Sem vazamento de dados

#### TC-L3-013: CSRF Token Validation
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. click(uid="add-user-button")
4. fill_form([...])
5. list_network_requests(resourceTypes=["fetch"])
6. get_network_request() → verificar headers
7. Validar headers:
   - xc-auth: presente
   - Content-Type: application/json
8. Verificar: token presente e válido
```

**Resultado esperado:**
- ✅ Token presente em requests
- ✅ Requests autenticados

---

## 📊 Relatório Final

### Template de Output

```markdown
# QA E2E Completo - App-Controle
**Data:** YYYY-MM-DD
**Executor:** Claude Opus 4.6
**MCP:** chrome-devtools-mcp@latest

---

## Ambiente

- **Frontend:** http://localhost:3001
- **Backend:** http://localhost:8081 (NocoDB)
- **Database:** PostgreSQL 16 (Docker)
- **Chrome:** v121.x (Debug Mode)

---

## Resultados

### L1 - FOUNDATION

| TC | Categoria | Descrição | Status | Observações |
|----|-----------|-----------|--------|-------------|
| TC-L1-001 | Auth | Login Student | ✅ PASS | - |
| TC-L1-002 | Auth | Login Instructor | ✅ PASS | - |
| TC-L1-003 | Auth | Login Admin | ✅ PASS | - |
| TC-L1-004 | Auth | Logout Flow | ✅ PASS | - |
| TC-L1-005 | RBAC | Admin Access Control | ✅ PASS | - |
| TC-L1-006 | RBAC | Instructor Permissions | ✅ PASS | - |
| TC-L1-007 | RBAC | C-Level Access | ✅ PASS | - |
| TC-L1-008 | RBAC | Specialist Permissions | ✅ PASS | - |
| TC-L1-009 | Multi-Tenant | Company Isolation - Courses | ✅ PASS | - |
| TC-L1-010 | Multi-Tenant | Company Isolation - Users | ✅ PASS | - |
| TC-L1-011 | Multi-Tenant | Company Isolation - Enrollments | ✅ PASS | - |
| TC-L1-012 | Multi-Tenant | Cross-Tenant Access Attempt | ✅ PASS | - |

**L1 Total:** 12/12 PASS (100%)

---

### L2 - FEATURES

| TC | Categoria | Descrição | Status | Observações |
|----|-----------|-----------|--------|-------------|
| TC-L2-001 | CRUD | Create Course | ✅ PASS | - |
| TC-L2-002 | CRUD | Edit Course | ✅ PASS | - |
| TC-L2-003 | CRUD | Delete Course | ✅ PASS | - |
| TC-L2-004 | CRUD | Enroll in Course | ✅ PASS | - |
| TC-L2-005 | CRUD | Complete Module | ✅ PASS | - |
| TC-L2-006 | Hub | Specialist Dashboard | ✅ PASS | - |
| TC-L2-007 | Hub | Hub Catalog | ✅ PASS | - |
| TC-L2-008 | Hub | Course Details Hub | ✅ PASS | - |
| TC-L2-009 | Hub | Specialist Reviews | ✅ PASS | - |
| TC-L2-010 | Hub | Hub Search | ✅ PASS | - |
| TC-L2-011 | User Mgmt | Create User | ✅ PASS | - |
| TC-L2-012 | User Mgmt | Edit User | ✅ PASS | - |
| TC-L2-013 | User Mgmt | Delete User | ✅ PASS | - |
| TC-L2-014 | User Mgmt | User Role Change | ✅ PASS | - |
| TC-L2-015 | User Mgmt | Bulk Import | ⏭️ SKIP | Futura |

**L2 Total:** 14/14 PASS (100%)

---

### L3 - QUALITY

| TC | Categoria | Descrição | Status | Observações |
|----|-----------|-----------|--------|-------------|
| TC-L3-001 | i18n | pt-BR → en-US | ✅ PASS | - |
| TC-L3-002 | i18n | pt-BR → es-ES | ✅ PASS | - |
| TC-L3-003 | i18n | Persistence | ✅ PASS | - |
| TC-L3-004 | i18n | All Pages Coverage | ✅ PASS | - |
| TC-L3-005 | White-Label | AcmeTech Branding | ✅ PASS | - |
| TC-L3-006 | White-Label | DevCorp Branding | ✅ PASS | - |
| TC-L3-007 | White-Label | Theme Customization | ✅ PASS | - |
| TC-L3-008 | Performance | Core Web Vitals | ✅ PASS | FP 1.2s, LCP 2.1s |
| TC-L3-009 | Performance | Network Requests | ✅ PASS | 42 requests |
| TC-L3-010 | Performance | Console Errors | ✅ PASS | 0 erros |
| TC-L3-011 | Security | XSS Prevention | ✅ PASS | - |
| TC-L3-012 | Security | SQL Injection | ✅ PASS | - |
| TC-L3-013 | Security | CSRF Token | ✅ PASS | - |

**L3 Total:** 13/13 PASS (100%)

---

## Métricas Consolidadas

### Cobertura por Layer

| Layer | Cenários | PASS | FAIL | SKIP | Taxa Sucesso |
|-------|----------|------|------|------|--------------|
| **L1 - Foundation** | 12 | 12 | 0 | 0 | 100% |
| **L2 - Features** | 15 | 14 | 0 | 1 | 93.3% |
| **L3 - Quality** | 13 | 13 | 0 | 0 | 100% |
| **TOTAL** | 40 | 39 | 0 | 1 | **97.5%** |

### Cobertura por Categoria

| Categoria | Cenários | Taxa Sucesso |
|-----------|----------|--------------|
| Auth | 4 | 100% |
| RBAC | 4 | 100% |
| Multi-Tenant | 4 | 100% |
| CRUD | 5 | 100% |
| Hub | 5 | 100% |
| User Management | 5 | 93.3% |
| i18n | 4 | 100% |
| White-Label | 3 | 100% |
| Performance | 3 | 100% |
| Security | 3 | 100% |

### Performance Metrics

| Métrica | Valor | Target | Status |
|---------|-------|--------|--------|
| First Paint | 1.2s | < 1.5s | ✅ |
| LCP | 2.1s | < 2.5s | ✅ |
| TBT | 280ms | < 300ms | ✅ |
| Total Requests | 42 | < 50 | ✅ |
| Console Errors | 0 | 0 | ✅ |

---

## Bugs Encontrados

### 🐛 BUG-XXX: [Título do Bug]

- **Severidade:** LOW/MEDIUM/HIGH/CRITICAL
- **Layer:** L1/L2/L3
- **TC:** TC-LX-XXX
- **Steps to Reproduce:**
  1. ...
  2. ...
- **Expected:** ...
- **Actual:** ...
- **Screenshot:** `./screenshots/bug-xxx.png`

---

## Conclusão

✅ **Sistema APROVADO para produção**

**Justificativa:**
- 97.5% taxa de sucesso (39/40)
- 0 bugs críticos/high
- Performance dentro dos targets
- Segurança validada (XSS, SQLi, CSRF)
- Multi-tenant 100% isolado
- RBAC 100% funcional

**Próximos Passos:**
1. Deploy para staging
2. Re-run QA E2E em staging
3. Smoke tests em produção

---

**Executado por:** Claude Opus 4.6
**MCP Server:** chrome-devtools-mcp@latest
**Relatório salvo em:** `.factory/relatorios/qa-e2e-YYYY-MM-DD/`
```

---

## 📋 Checklist de Regressão

**Rodar antes de cada release:**

### ✅ Fluxos Críticos de Usuário

- [ ] Login funciona para 5 roles (admin, instructor, student, c_level, specialist)
- [ ] Dashboard Student carrega com progresso
- [ ] Dashboard Admin carrega com métricas
- [ ] Dashboard Instructor carrega
- [ ] Dashboard C-Level carrega
- [ ] Dashboard Especialista carrega com métricas e cursos
- [ ] Catálogo Hub carrega com cursos e filtros
- [ ] Perfil Especialista carrega com dados completos
- [ ] Reviews de curso carregam com distribuição
- [ ] RBAC: Instructor NÃO vê "Administração" no dropdown
- [ ] RBAC: Specialist vê "Painel Especialista" no dropdown
- [ ] Multi-tenant: Usuários veem apenas dados da própria empresa

### ✅ Testes de Viewport

```javascript
// Mobile (375x667)
mcp__chrome-devtools__emulate({ viewport: { width: 375, height: 667, isMobile: true, hasTouch: true } })

// Tablet (768x1024)
mcp__chrome-devtools__emulate({ viewport: { width: 768, height: 1024, isMobile: true, hasTouch: true } })

// Desktop (1920x1080)
mcp__chrome-devtools__emulate({ viewport: { width: 1920, height: 1080, isMobile: false } })
```

**Verificar em cada viewport:**
- [ ] Layout responsivo funciona
- [ ] Navegação mobile (hambúrguer menu)
- [ ] Touch targets suficientes (min 44x44px)
- [ ] Sem scroll horizontal

### ✅ Verificações de Performance

- [ ] Carregamento de página < 2s
- [ ] Sem erros no console
- [ ] Sem erros 404 de rede
- [ ] Tamanho de bundle < 500kb
- [ ] First Paint < 1.5s
- [ ] LCP < 2.5s

### ✅ Verificações de Acessibilidade

```javascript
// Pegar árvore de acessibilidade completa
mcp__chrome-devtools__take_snapshot({ verbose: true })

// Verificar:
// - Todos elementos interativos têm roles
// - Imagens têm alt text
// - Inputs de form têm labels
// - Headings formam hierarquia adequada (h1 > h2 > h3)
```

**Checklist:**
- [ ] Todas imagens têm alt text
- [ ] Navegação por teclado funciona
- [ ] Indicadores de foco visíveis
- [ ] ARIA labels presentes em elementos interativos
- [ ] Contraste de cores adequado (WCAG AA)
- [ ] Formulários têm labels associados

---

## 🚀 Smoke Test Rápido

**Verificação básica de saúde (5-10 minutos):**

```javascript
// 1. Carregar home
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001" })
const home = mcp__chrome-devtools__take_snapshot()

// 2. Login como admin
mcp__chrome-devtools__fill({ uid: "email", value: "admin@acmetech.com" })
mcp__chrome-devtools__fill({ uid: "password", value: "Demo@2026" })
mcp__chrome-devtools__click({ uid: "login-button" })
mcp__chrome-devtools__wait_for({ text: "Bem-vindo" })

// 3. Carregar dashboards principais
const dashboards = ['/dashboard', '/admin', '/instructor', '/hub']
for (const path of dashboards) {
  mcp__chrome-devtools__navigate_page({ url: `http://localhost:3001${path}` })
  mcp__chrome-devtools__take_snapshot()
  // Verificar sem erros
}

// 4. Verificar console
mcp__chrome-devtools__list_console_messages({ types: ["error"] })
// Esperado: 0 erros

// 5. Verificar network
mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch", "xhr"] })
// Esperado: Todas requests com status 200/201
```

**Critérios de Aprovação:**
- ✅ Todas páginas carregam (sem 404/500)
- ✅ 0 erros no console
- ✅ Todas requests API retornam 2xx
- ✅ UI renderiza corretamente (sem componentes quebrados)

---

## 🎯 Boas Práticas de Teste E2E

### 1. **Sempre navegar primeiro**
```javascript
// ❌ NÃO assumir que página está carregada
mcp__chrome-devtools__click({ uid: "button" })

// ✅ Navegar antes de interagir
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/page" })
mcp__chrome-devtools__wait_for({ text: "Texto esperado" })
mcp__chrome-devtools__click({ uid: "button" })
```

### 2. **Usar snapshots para verificação**
```javascript
// ✅ Snapshots são mais confiáveis que screenshots
const snapshot = mcp__chrome-devtools__take_snapshot()
// Verificar conteúdo DOM diretamente
```

### 3. **Tratar operações async**
```javascript
// ✅ Esperar network/animações estabilizarem
mcp__chrome-devtools__click({ uid: "submit" })
mcp__chrome-devtools__wait_for({ text: "Sucesso" })
```

### 4. **Limpar localStorage entre testes**
```javascript
// ✅ Resetar estado para evitar flakiness
mcp__chrome-devtools__evaluate_script({
  function: "() => localStorage.clear()"
})
```

### 5. **Usar DevTools para debugging**
```javascript
// ✅ Verificar console e network para diagnóstico
mcp__chrome-devtools__list_console_messages({ types: ["error", "warn"] })
mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch"] })
```

### 6. **Tirar screenshots como evidência**
```javascript
// ✅ Prova visual de issues
mcp__chrome-devtools__take_screenshot({
  filePath: "./screenshots/bug-login.png",
  format: "png"
})
```

### 7. **Testar com dados realistas**
```javascript
// ✅ Usar dados demo reais, não mocks
// Credenciais em .claude/QUICK_START.md
```

### 8. **Verificar estados de erro (unhappy paths)**
```javascript
// ✅ Testar cenários de falha também
mcp__chrome-devtools__fill({ uid: "email", value: "invalido@test.com" })
mcp__chrome-devtools__click({ uid: "login" })
mcp__chrome-devtools__wait_for({ text: "Credenciais inválidas" })
```

---

## 🔧 Troubleshooting

### MCP não conecta

```bash
# Verificar se Chrome está rodando
curl http://127.0.0.1:9222/json/version

# Reiniciar Chrome debug
pkill chrome
mise chrome-debug
```

### Backend offline

```bash
# Verificar containers
docker-compose ps

# Reiniciar backend
docker-compose restart
```

### Frontend não responde

```bash
# Verificar processo
ps aux | grep vite

# Reiniciar frontend
mise dev
```

### Snapshot não mostrando elementos

```javascript
// ❌ Problema: Snapshot vazio ou incompleto
mcp__chrome-devtools__take_snapshot()

// ✅ Solução: Esperar página carregar completamente
mcp__chrome-devtools__wait_for({ text: "Texto chave da página" })
mcp__chrome-devtools__take_snapshot()
```

### Servidor MCP não conectando

```bash
# Verificar se Chrome está rodando em modo debug
curl http://127.0.0.1:9222/json/version

# Se falhar, reiniciar Chrome
pkill chrome
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug

# Verificar porta
lsof -i :9222
```

### Elementos não clicáveis (UID não encontrado)

```javascript
// 1. Tirar snapshot primeiro para ver UIDs disponíveis
const snapshot = mcp__chrome-devtools__take_snapshot()

// 2. Procurar UID correto no snapshot
// 3. Usar UID exato do snapshot
mcp__chrome-devtools__click({ uid: "uid-correto-do-snapshot" })
```

### Testes flaky (falham aleatoriamente)

**Causas comuns:**
1. **Race conditions** - Não esperar async operations
   ```javascript
   // ✅ Adicionar wait_for
   mcp__chrome-devtools__click({ uid: "submit" })
   mcp__chrome-devtools__wait_for({ text: "Sucesso" })
   ```

2. **Estado persistente** - localStorage de teste anterior
   ```javascript
   // ✅ Limpar localStorage antes de cada teste
   mcp__chrome-devtools__evaluate_script({
     function: "() => localStorage.clear()"
   })
   ```

3. **Network timing** - Requests demoram tempo variável
   ```javascript
   // ✅ Aumentar timeout
   mcp__chrome-devtools__wait_for({ text: "Dados carregados", timeout: 5000 })
   ```

---

## 📚 Referências

| Recurso | Path |
|---------|------|
| **E2E Testing Guide** | `.claude/E2E_TESTING.md` |
| **MCP Commands** | `.claude/commands/browser-testing.md` |
| **Test Cases (Detalhado)** | `.factory/relatorios/qa-e2e-*/TEST_CASES.md` |
| **Demo Credentials** | `.claude/QUICK_START.md` |
| **RBAC Reference** | `.claude/rules/rbac-permissions.md` |

---

**Versão:** 1.1.0
**Stack:** React 18 + Vite + NocoDB + PostgreSQL
**Última atualização:** 2026-02-16

---

## 📝 Changelog

### v1.1.0 (2026-02-16)
**Adicionado do `browser-testing.md`:**
- ✅ Checklist de Regressão (fluxos críticos por role)
- ✅ Testes de Viewport (Mobile/Tablet/Desktop)
- ✅ Verificações de Acessibilidade (ARIA, roles, alt text)
- ✅ Smoke Test Rápido (verificação básica 5-10 min)
- ✅ Boas Práticas de Teste E2E (8 práticas)
- ✅ Dicas de Debugging avançadas (testes flaky, race conditions)

### v1.0.0 (2026-02-16)
**Inicial:**
- 40 cenários E2E em 3 layers (L1, L2, L3)
- Adaptado de flusistip para React + NocoDB stack
- Template de relatório consolidado
- Pre-requisitos e setup MCP Chrome DevTools
