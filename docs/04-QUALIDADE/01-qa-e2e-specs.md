# QA E2E - Especificações de Teste via MCP

**Versão:** 2.0.0
**Data:** 2026-02-09
**Branch:** `dev`
**Ferramenta:** MCP Chrome DevTools

---

## Visão Geral

Este documento especifica todos os cenários de teste E2E para validar as funcionalidades da Plataforma B2B, cobrindo todas as histórias de usuário (personas) através da interface web usando MCP Chrome DevTools.

### Personas vs Roles

| Persona (Documentação) | Role (Sistema) | Dashboard Principal | Credencial Demo |
|------------------------|----------------|---------------------|-----------------|
| **C-Level / Tomador de Decisão** | `c_level` | /admin/executive | ceo@acmetech.com |
| **Gestor de RH / Admin** | `admin` | /admin | admin@acmetech.com |
| **Líder Técnico / Instrutor** | `instructor` | /instructor | prof@acmetech.com |
| **Desenvolvedor / Aprendiz** | `student` | /dashboard | maria@acmetech.com |
| **Especialista Hub** | `specialist` | /specialist | joao.silva.specialist@plataformab2b.com |

**Senha padrão:** `Demo@2026`

---

## Matriz de Navegação por Role

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                              MATRIZ DE ACESSO - ROTAS                                  │
├────────────────────────┬─────────┬────────────┬─────────┬─────────┬────────────┬──────┤
│ Rota                   │ student │ instructor │ admin   │ c_level │ specialist │ Pub  │
├────────────────────────┼─────────┼────────────┼─────────┼─────────┼────────────┼──────┤
│ /login                 │    -    │     -      │    -    │    -    │     -      │  ✅  │
│ /                      │   ✅    │    ✅      │   ✅    │   ✅    │    ✅      │   -  │
│ /curso/:id             │   ✅    │    ✅      │   ✅    │   ✅    │    ✅      │   -  │
│ /dashboard             │   ✅    │    ✅      │   ✅    │   ✅    │    ✅      │   -  │
│ /hub/catalog           │   ✅    │    ✅      │   ✅    │   ✅    │    ✅      │   -  │
│ /specialist/:id        │   ✅    │    ✅      │   ✅    │   ✅    │    ✅      │   -  │
│ /hub/course/:id/reviews│   ✅    │    ✅      │   ✅    │   ✅    │    ✅      │   -  │
│ /instructor            │    -    │    ✅      │   ✅    │   ✅    │     -      │   -  │
│ /specialist            │    -    │     -      │   ✅    │   ✅    │    ✅      │   -  │
│ /admin                 │    -    │     -      │   ✅    │   ✅    │     -      │   -  │
│ /admin/executive       │    -    │     -      │    -    │   ✅    │     -      │   -  │
└────────────────────────┴─────────┴────────────┴─────────┴─────────┴────────────┴──────┘
```

---

## Matriz RBAC - Permissões por Funcionalidade

### Permissões Implementadas (28/32)

| Permissão | student | instructor | admin | c_level | UI Componente |
|-----------|---------|------------|-------|---------|---------------|
| `courses.view` | ✅ | ✅ | ✅ | ✅ | HubView |
| `courses.progress` | ✅ | ✅ | ✅ | ✅ | Curso, UserDashboard |
| `courses.notes` | ✅ | ✅ | ✅ | ✅ | Caderno de Notas |
| `paths.view` | ✅ | ✅ | ✅ | ✅ | Trilhas no Hub |
| `dashboard.own` | ✅ | ✅ | ✅ | ✅ | UserDashboard |
| `dashboard.team` | - | ✅ | ✅ | ✅ | InstructorDashboard |
| `dashboard.company` | - | - | ✅ | ✅ | AdminDashboard |
| `analytics.basic` | - | ✅ | ✅ | ✅ | Estatísticas |
| `analytics.advanced` | - | - | ✅ | ✅ | ModuleDifficultyCard |
| `analytics.export` | - | - | ✅ | ✅ | ExportButton |
| `users.view` | - | - | ✅ | ✅ | Tabela usuários |
| `users.create` | - | - | ✅ | - | UserFormModal |
| `users.edit` | - | - | ✅ | - | UserFormModal |
| `users.delete` | - | - | ✅ | - | ConfirmModal |
| `admin.access` | - | - | ✅ | ✅ | /admin |
| `company.view` | - | - | ✅ | ✅ | Header empresa |
| `admin.full` | - | - | - | ✅ | /admin/executive |

---

## SEÇÃO 1: Testes de Autenticação

### TC-AUTH-001: Login com Credenciais Válidas

**Persona:** Todas
**Prioridade:** Crítica

```javascript
// MCP Test Script
// 1. Navegar para login
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/login" })

// 2. Verificar página carregou
mcp__chrome-devtools__wait_for({ text: "Acesse sua conta" })

// 3. Preencher email
mcp__chrome-devtools__fill({ uid: "<email_input_uid>", value: "admin@acmetech.com" })

// 4. Preencher senha
mcp__chrome-devtools__fill({ uid: "<senha_input_uid>", value: "Demo@2026" })

// 5. Clicar em Entrar
mcp__chrome-devtools__click({ uid: "<btn_entrar_uid>" })

// 6. Verificar redirecionamento
mcp__chrome-devtools__wait_for({ text: "Hub de Aprendizado" })

// 7. Screenshot de evidência
mcp__chrome-devtools__take_screenshot({ filePath: "/tmp/qa-e2e/TC-AUTH-001.png" })
```

**Critérios de Aceite:**
- [ ] Página de login carrega sem erros
- [ ] Campos email/senha aceitam input
- [ ] Botão "Entrar" submete formulário
- [ ] Redirecionamento para Hub após sucesso
- [ ] Header mostra nome do usuário logado

### TC-AUTH-002: Login com Credenciais Inválidas

**Persona:** Todas
**Prioridade:** Alta

```javascript
// 1. Navegar para login
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/login" })

// 2. Preencher email inválido
mcp__chrome-devtools__fill({ uid: "<email_uid>", value: "invalido@teste.com" })
mcp__chrome-devtools__fill({ uid: "<senha_uid>", value: "SenhaErrada" })

// 3. Submeter
mcp__chrome-devtools__click({ uid: "<btn_entrar_uid>" })

// 4. Verificar mensagem de erro
mcp__chrome-devtools__wait_for({ text: "Credenciais inválidas" })
```

**Critérios de Aceite:**
- [ ] Mensagem de erro exibida
- [ ] Usuário permanece na tela de login
- [ ] Campos não são limpos

### TC-AUTH-003: Logout

**Persona:** Todas
**Prioridade:** Alta

```javascript
// 1. Após login, clicar no menu do usuário
mcp__chrome-devtools__click({ uid: "<user_menu_uid>" })

// 2. Clicar em "Sair"
mcp__chrome-devtools__click({ uid: "<logout_btn_uid>" })

// 3. Verificar redirecionamento
mcp__chrome-devtools__wait_for({ text: "Acesse sua conta" })
```

---

## SEÇÃO 2: Testes do Hub de Aprendizado

### TC-HUB-001: Visualizar Hub (Todos os Roles)

**Persona:** Todas
**Prioridade:** Crítica

```javascript
// Após login
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/" })
mcp__chrome-devtools__take_snapshot()

// Verificar elementos
// - Título "Hub de Aprendizado"
// - Cards de estatísticas (Áreas, Caminhos, Módulos, Horas)
// - Seção "Caminhos Propostos"
// - Seção "Áreas de Estudo"
// - Card do curso Bash
```

**Critérios de Aceite:**
- [ ] Título "Hub de Aprendizado" visível
- [ ] Estatísticas exibem valores corretos
- [ ] Trilha "Desenvolvedor Backend" exibida
- [ ] Curso "Bash" com 16 módulos
- [ ] Header mostra empresa e usuário

### TC-HUB-002: Navegação para Curso

**Persona:** Todas
**Prioridade:** Alta

```javascript
// 1. No Hub, clicar no card do curso Bash
mcp__chrome-devtools__click({ uid: "<bash_card_uid>" })

// 2. Verificar navegação
mcp__chrome-devtools__wait_for({ text: "Bash Shell Scripting" })
```

---

## SEÇÃO 3: Testes do Dashboard do Aluno (student)

### TC-STUDENT-001: Visualizar Progresso Pessoal

**Credencial:** maria@acmetech.com (student)

```javascript
// 1. Login como student
// 2. Navegar para /dashboard
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/dashboard" })

// 3. Verificar elementos
mcp__chrome-devtools__take_snapshot()
// - Card de progresso geral
// - Lista de cursos em andamento
// - Gráfico de progresso (se houver)
```

**Critérios de Aceite:**
- [ ] Dashboard pessoal carrega
- [ ] Mostra cursos matriculados
- [ ] Exibe % de progresso por curso
- [ ] Sem acesso a funcionalidades de admin

### TC-STUDENT-002: Acessar Notas Pessoais

**Credencial:** maria@acmetech.com

```javascript
// No curso Bash, acessar Caderno de Notas
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/curso/bash" })
mcp__chrome-devtools__click({ uid: "<notas_btn_uid>" })

// Verificar modal ou página de notas
mcp__chrome-devtools__wait_for({ text: "Caderno de Notas" })
```

### TC-STUDENT-003: Completar Módulo

**Credencial:** maria@acmetech.com

```javascript
// 1. Navegar para curso
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/curso/bash" })

// 2. Clicar em "Completar Módulo"
mcp__chrome-devtools__click({ uid: "<complete_module_btn_uid>" })

// 3. Verificar toast de sucesso
mcp__chrome-devtools__wait_for({ text: "Módulo completado" })

// 4. Verificar progresso atualizado
mcp__chrome-devtools__take_snapshot()
```

---

## SEÇÃO 4: Testes do Dashboard do Instrutor (instructor)

### TC-INSTR-001: Acessar Dashboard do Time

**Credencial:** prof@acmetech.com (instructor)

```javascript
// 1. Login como instrutor
// 2. Navegar para /instructor
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/instructor" })

// 3. Verificar elementos
mcp__chrome-devtools__take_snapshot()
// - Estatísticas do time
// - Tabela de alunos
// - Progresso individual
```

**Critérios de Aceite:**
- [ ] Dashboard de instrutor carrega
- [ ] Lista de alunos do time visível
- [ ] Progresso de cada aluno exibido
- [ ] Botão "Ver Notas" disponível

### TC-INSTR-002: Visualizar Notas de Aluno

**Credencial:** prof@acmetech.com

```javascript
// 1. No InstructorDashboard, localizar aluno
// 2. Clicar em "Ver Notas"
mcp__chrome-devtools__click({ uid: "<ver_notas_btn_uid>" })

// 3. Verificar modal StudentNotesModal
mcp__chrome-devtools__wait_for({ text: "Notas do Aluno" })

// 4. Selecionar curso
mcp__chrome-devtools__click({ uid: "<curso_selector_uid>" })

// 5. Verificar notas exibidas
mcp__chrome-devtools__take_snapshot()
```

**Critérios de Aceite:**
- [ ] Modal abre com dados do aluno
- [ ] Seletor de curso funciona
- [ ] Notas do aluno são exibidas
- [ ] Data e tamanho das notas visíveis

### TC-INSTR-003: Acesso Negado ao Admin

**Credencial:** prof@acmetech.com

```javascript
// Tentar acessar /admin diretamente
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/admin" })

// Verificar redirecionamento ou mensagem de acesso negado
mcp__chrome-devtools__take_snapshot()
// Deve redirecionar para /instructor ou mostrar erro
```

---

## SEÇÃO 5: Testes do Dashboard Administrativo (admin)

### TC-ADMIN-001: Visualizar Lista de Usuários

**Credencial:** admin@acmetech.com (admin)

```javascript
// 1. Login como admin
// 2. Navegar para /admin
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/admin" })

// 3. Verificar tabela de usuários
mcp__chrome-devtools__take_snapshot()
```

**Critérios de Aceite:**
- [ ] Tabela de usuários carrega
- [ ] Colunas: Nome, Email, Role, Status
- [ ] Botões de ação visíveis (Editar, Excluir)
- [ ] Filtro de busca funciona

### TC-ADMIN-002: Criar Novo Usuário

**Credencial:** admin@acmetech.com

```javascript
// 1. Clicar em "Novo Usuário"
mcp__chrome-devtools__click({ uid: "<novo_usuario_btn_uid>" })

// 2. Preencher formulário
mcp__chrome-devtools__fill({ uid: "<nome_uid>", value: "Teste QA" })
mcp__chrome-devtools__fill({ uid: "<email_uid>", value: "qa@acmetech.com" })
mcp__chrome-devtools__fill({ uid: "<role_uid>", value: "student" })

// 3. Salvar
mcp__chrome-devtools__click({ uid: "<salvar_btn_uid>" })

// 4. Verificar toast de sucesso
mcp__chrome-devtools__wait_for({ text: "Usuário criado" })
```

**Critérios de Aceite:**
- [ ] Modal UserFormModal abre
- [ ] Campos obrigatórios validados
- [ ] Seletor de role funciona
- [ ] Usuário aparece na lista após criar

### TC-ADMIN-003: Editar Usuário Existente

**Credencial:** admin@acmetech.com

```javascript
// 1. Localizar usuário na tabela
// 2. Clicar no botão Editar
mcp__chrome-devtools__click({ uid: "<edit_btn_uid>" })

// 3. Modificar campo
mcp__chrome-devtools__fill({ uid: "<nome_uid>", value: "Nome Alterado" })

// 4. Salvar
mcp__chrome-devtools__click({ uid: "<salvar_btn_uid>" })

// 5. Verificar atualização
mcp__chrome-devtools__wait_for({ text: "Usuário atualizado" })
```

### TC-ADMIN-004: Excluir Usuário (com Confirmação)

**Credencial:** admin@acmetech.com

```javascript
// 1. Clicar em Excluir no usuário
mcp__chrome-devtools__click({ uid: "<delete_btn_uid>" })

// 2. Verificar modal de confirmação
mcp__chrome-devtools__wait_for({ text: "Tem certeza" })

// 3. Confirmar exclusão
mcp__chrome-devtools__click({ uid: "<confirm_btn_uid>" })

// 4. Verificar remoção da lista
mcp__chrome-devtools__wait_for({ text: "Usuário excluído" })
```

**Critérios de Aceite:**
- [ ] Modal ConfirmModal exibido
- [ ] Tipo "danger" (vermelho)
- [ ] Botões Cancelar e Confirmar
- [ ] Soft delete (usuário fica inativo)

### TC-ADMIN-005: Matricular Usuário em Curso

**Credencial:** admin@acmetech.com

```javascript
// 1. Clicar em "Matricular"
mcp__chrome-devtools__click({ uid: "<matricular_btn_uid>" })

// 2. Selecionar usuário(s)
mcp__chrome-devtools__click({ uid: "<user_checkbox_uid>" })

// 3. Selecionar curso
mcp__chrome-devtools__click({ uid: "<curso_select_uid>" })

// 4. Confirmar matrícula
mcp__chrome-devtools__click({ uid: "<confirmar_matricula_uid>" })

// 5. Verificar sucesso
mcp__chrome-devtools__wait_for({ text: "Matrícula realizada" })
```

### TC-ADMIN-006: Exportar Relatório Excel

**Credencial:** admin@acmetech.com

```javascript
// 1. Localizar botão de exportação
mcp__chrome-devtools__click({ uid: "<export_btn_uid>" })

// 2. Selecionar formato Excel
mcp__chrome-devtools__click({ uid: "<excel_option_uid>" })

// 3. Verificar download iniciado
// (verificar via console ou network)
mcp__chrome-devtools__list_network_requests({ resourceTypes: ["xhr", "fetch"] })
```

### TC-ADMIN-007: Visualizar Analytics de Módulos Difíceis

**Credencial:** admin@acmetech.com

```javascript
// 1. No AdminDashboard, localizar card ModuleDifficultyCard
mcp__chrome-devtools__take_snapshot()

// Verificar elementos:
// - Lista de módulos
// - Taxa de conclusão
// - Classificação (hard/medium/easy)
// - Indicadores visuais
```

---

## SEÇÃO 6: Testes do Dashboard Executivo (c_level)

### TC-EXEC-001: Acessar Dashboard Executivo

**Credencial:** ceo@acmetech.com (c_level)

```javascript
// 1. Login como C-Level
// 2. Navegar para /admin/executive
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/admin/executive" })

// 3. Verificar elementos
mcp__chrome-devtools__take_snapshot()
```

**Critérios de Aceite:**
- [ ] Dashboard executivo carrega
- [ ] KPIs de empresa visíveis
- [ ] Gráficos de analytics
- [ ] Comparativos de times

### TC-EXEC-002: Acesso Exclusivo C-Level

**Credencial:** admin@acmetech.com (admin - NÃO c_level)

```javascript
// Tentar acessar /admin/executive como admin
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/admin/executive" })

// Verificar acesso negado
mcp__chrome-devtools__take_snapshot()
// Deve redirecionar para /admin
```

---

## SEÇÃO 7: Testes de Responsividade Mobile

### TC-MOBILE-001: Menu Hamburger

**Viewport:** 375x667 (mobile)

```javascript
// 1. Redimensionar viewport
mcp__chrome-devtools__resize_page({ width: 375, height: 667 })

// 2. Verificar menu hamburger visível
mcp__chrome-devtools__take_snapshot()

// 3. Clicar no menu
mcp__chrome-devtools__click({ uid: "<hamburger_btn_uid>" })

// 4. Verificar MobileMenu slide-over
mcp__chrome-devtools__wait_for({ text: "Hub" })
```

**Critérios de Aceite:**
- [ ] Menu hamburger aparece em < 768px
- [ ] Header desktop oculto
- [ ] MobileMenu abre com animação
- [ ] Links de navegação funcionam
- [ ] Botão Sair disponível

### TC-MOBILE-002: Cards Adaptáveis

```javascript
// Verificar layout de cards em mobile
mcp__chrome-devtools__resize_page({ width: 375, height: 667 })
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/" })
mcp__chrome-devtools__take_screenshot({ filePath: "/tmp/qa-e2e/TC-MOBILE-002.png" })
```

---

## SEÇÃO 8: Testes de UI/UX (Polish)

### TC-UX-001: Toast Notifications

```javascript
// Executar ação que gera toast (ex: completar módulo)
mcp__chrome-devtools__click({ uid: "<complete_module_uid>" })

// Verificar toast aparece
mcp__chrome-devtools__wait_for({ text: "Módulo completado" })

// Verificar auto-dismiss após 5s
// (aguardar e verificar toast removido)
```

### TC-UX-002: Loading States

```javascript
// Verificar skeleton durante carregamento
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/admin" })

// Capturar durante loading
mcp__chrome-devtools__take_screenshot({ filePath: "/tmp/qa-e2e/TC-UX-002-loading.png" })
```

### TC-UX-003: Empty States

```javascript
// Verificar empty state quando não há dados
// (criar cenário sem usuários ou cursos)
mcp__chrome-devtools__take_snapshot()

// Verificar elementos:
// - Ícone ilustrativo
// - Mensagem informativa
// - Botão de ação (se aplicável)
```

### TC-UX-004: Onboarding Wizard (Primeiro Acesso)

```javascript
// 1. Limpar localStorage
mcp__chrome-devtools__evaluate_script({ function: "() => localStorage.clear()" })

// 2. Login com usuário novo
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/login" })
// ... login ...

// 3. Verificar wizard aparece
mcp__chrome-devtools__wait_for({ text: "Bem-vindo" })

// 4. Completar steps
mcp__chrome-devtools__click({ uid: "<continuar_btn_uid>" }) // Step 1
mcp__chrome-devtools__click({ uid: "<objetivo_backend_uid>" }) // Step 2
mcp__chrome-devtools__click({ uid: "<pular_tour_uid>" }) // Step 3
mcp__chrome-devtools__click({ uid: "<comecar_uid>" }) // Step 4
```

---

## SEÇÃO 9: Testes de Isolamento Multi-Tenant

### TC-TENANT-001: Usuário Vê Apenas Dados da Empresa

**Credencial:** admin@acmetech.com (empresa ACME)

```javascript
// 1. Login como admin ACME
// 2. Verificar lista de usuários
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/admin" })
mcp__chrome-devtools__take_snapshot()

// Todos usuários devem ser da ACME Tech Solutions
// NÃO deve aparecer usuários de DevCorp
```

### TC-TENANT-002: Cross-Tenant Bloqueado

```javascript
// Tentar acessar dados de outra empresa via URL manipulation
// (verificar que API retorna apenas dados do tenant atual)
```

---

## SEÇÃO 10: Checklist de Execução

### Pré-Requisitos

- [ ] Docker Desktop rodando
- [ ] `docker compose -f docker-compose.nocodb.yml up -d`
- [ ] `bun run dev` (frontend em localhost:3001)
- [ ] Chrome com MCP Chrome DevTools conectado

### Ordem de Execução Recomendada

```
1. AUTENTICAÇÃO
   └── TC-AUTH-001 → TC-AUTH-002 → TC-AUTH-003

2. HUB (todos os roles)
   └── TC-HUB-001 → TC-HUB-002

3. STUDENT
   └── TC-STUDENT-001 → TC-STUDENT-002 → TC-STUDENT-003

4. INSTRUCTOR
   └── TC-INSTR-001 → TC-INSTR-002 → TC-INSTR-003

5. ADMIN
   └── TC-ADMIN-001 → TC-ADMIN-002 → TC-ADMIN-003 → TC-ADMIN-004
   └── TC-ADMIN-005 → TC-ADMIN-006 → TC-ADMIN-007

6. EXECUTIVE
   └── TC-EXEC-001 → TC-EXEC-002

7. SPECIALIST (Hub de Especialistas)
   └── TC-SPEC-001 → TC-SPEC-002 → TC-SPEC-003 → TC-SPEC-004 → TC-SPEC-005

8. MOBILE
   └── TC-MOBILE-001 → TC-MOBILE-002

9. UX POLISH
   └── TC-UX-001 → TC-UX-002 → TC-UX-003 → TC-UX-004

10. MULTI-TENANT
    └── TC-TENANT-001 → TC-TENANT-002
```

### Template de Resultado

```markdown
| TC ID | Descrição | Status | Evidência | Observações |
|-------|-----------|--------|-----------|-------------|
| TC-AUTH-001 | Login válido | ✅ PASS | TC-AUTH-001.png | - |
| TC-AUTH-002 | Login inválido | ✅ PASS | TC-AUTH-002.png | - |
```

---

## Comandos MCP Úteis

```javascript
// Navegação
mcp__chrome-devtools__navigate_page({ url: "..." })
mcp__chrome-devtools__navigate_page({ type: "reload", ignoreCache: true })

// Snapshot (acessibilidade)
mcp__chrome-devtools__take_snapshot()

// Screenshot
mcp__chrome-devtools__take_screenshot({ filePath: "/tmp/test.png" })

// Interações
mcp__chrome-devtools__click({ uid: "..." })
mcp__chrome-devtools__fill({ uid: "...", value: "..." })

// Aguardar
mcp__chrome-devtools__wait_for({ text: "...", timeout: 10000 })

// Console/Network
mcp__chrome-devtools__list_console_messages({ types: ["error"] })
mcp__chrome-devtools__list_network_requests()

// JavaScript
mcp__chrome-devtools__evaluate_script({ function: "() => localStorage.clear()" })

// Viewport
mcp__chrome-devtools__resize_page({ width: 375, height: 667 })
```

---

## SEÇÃO 11: Testes do Hub de Especialistas (specialist)

### TC-SPEC-001: Login Specialist e Redirect

**Credencial:** joao.silva.specialist@plataformab2b.com (specialist)
**Prioridade:** Crítica

```javascript
// 1. Navegar para login
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/login" })

// 2. Preencher credenciais
mcp__chrome-devtools__fill({ uid: "<email_uid>", value: "joao.silva.specialist@plataformab2b.com" })
mcp__chrome-devtools__fill({ uid: "<senha_uid>", value: "Demo@2026" })

// 3. Submeter
mcp__chrome-devtools__click({ uid: "<btn_entrar_uid>" })

// 4. Verificar redirect para /specialist
mcp__chrome-devtools__wait_for({ text: "Painel do Especialista" })
```

**Critérios de Aceite:**
- [ ] Login como specialist funciona
- [ ] Redirect para /specialist
- [ ] Header mostra nome "Joao Silva"

### TC-SPEC-002: Specialist Dashboard Stats

**Credencial:** joao.silva.specialist@plataformab2b.com
**Prioridade:** Alta

```javascript
// 1. Navegar para dashboard especialista
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/specialist" })

// 2. Verificar stats cards
mcp__chrome-devtools__take_snapshot()
// - Receita: R$ 4.200,00
// - Matriculas: 156
// - Rating: 4.8
// - Cursos: 1
```

**Critérios de Aceite:**
- [ ] 4 cards de stats renderizam
- [ ] Valores corretos: R$ 4.200, 156 matrículas, 4.8 rating, 1 curso
- [ ] Tabela "Meus Cursos" com Bash
- [ ] Seção "Avaliações Recentes" com 2 reviews

### TC-SPEC-003: Hub Catalog View

**Credencial:** qualquer role autenticado
**Prioridade:** Alta

```javascript
// 1. Navegar para catálogo
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/hub/catalog" })

// 2. Verificar curso do Bash com Joao Silva
mcp__chrome-devtools__take_snapshot()
// - Barra de busca
// - Botão Filtros
// - Card do curso Bash
// - Nome do especialista "Joao Silva"
// - Preço R$ 89,90/mês
```

**Critérios de Aceite:**
- [ ] Página carrega sem erros
- [ ] Barra de busca presente
- [ ] Curso Bash aparece no grid
- [ ] Preço e rating exibidos
- [ ] Click no card navega para reviews

### TC-SPEC-004: Course Reviews

**Credencial:** qualquer role autenticado
**Prioridade:** Média

```javascript
// 1. Navegar para reviews do curso
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/hub/course/<hub_course_id>/reviews" })

// 2. Verificar reviews
mcp__chrome-devtools__take_snapshot()
// - Nota média
// - Reviews individuais com estrelas
// - Comentários
```

**Critérios de Aceite:**
- [ ] Rating médio exibido (4.8)
- [ ] Reviews individuais com estrelas
- [ ] Comentários e datas visíveis

### TC-SPEC-005: Specialist Profile

**Credencial:** qualquer role autenticado
**Prioridade:** Média

```javascript
// 1. Navegar para perfil do especialista
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/specialist/<specialist_id>" })

// 2. Verificar perfil
mcp__chrome-devtools__take_snapshot()
// - Nome "Joao Silva"
// - Bio
// - Especialidades (bash, devops, linux, docker, kubernetes)
// - Credenciais (AWS, CKA, LFCS)
// - Badge "Verificado"
// - Grid de cursos
```

**Critérios de Aceite:**
- [ ] Perfil carrega com dados corretos
- [ ] Tags de especialidades exibidas
- [ ] Credenciais listadas
- [ ] Badge verificado visível
- [ ] Curso Bash aparece no grid

---

**Última atualização:** 2026-02-09
**Autor:** Claude Code
**Versão:** 2.0.0
**Cobertura:** 42 Test Cases (Sprints 6-15)
