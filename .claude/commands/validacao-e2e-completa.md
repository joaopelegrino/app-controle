# Validação E2E Completa - App-Controle

**Comando:** `/validacao-e2e-completa`
**Versão:** 1.3.0
**Stack:** React 18 + Vite + NocoDB + PostgreSQL
**MCP:** Chrome DevTools
**Modo:** 🔍 **READ-ONLY / DIAGNÓSTICO APENAS**

---

## ⚠️ PRINCÍPIOS DE VALIDAÇÃO NÃO-INVASIVA

### 🛡️ Regras Fundamentais

**Esta validação é 100% READ-ONLY e NÃO DESTRUTIVA:**

✅ **PERMITIDO:**
- Navegação em páginas existentes
- Leitura de dados via snapshots/screenshots
- Coleta de logs do console
- Análise de requests/responses de network
- Performance tracing (read-only)
- Login com usuários demo
- Anotações e relatórios de bugs

❌ **PROIBIDO:**
- Criar/editar/deletar dados reais
- Modificar arquivos de código
- Executar comandos destrutivos (rm, DROP, DELETE)
- Alterar configurações de produção/staging
- Fazer commits durante validação
- Modificar banco de dados
- Criar usuários permanentes

### 🎯 Objetivo da Validação

**DIAGNÓSTICO E COLETA DE EVIDÊNCIAS:**
- Identificar bugs visuais e funcionais
- Coletar logs de erros do console
- Validar performance (métricas)
- Verificar RBAC e multi-tenant (read-only)
- Documentar comportamento observado
- Gerar relatório detalhado para correções futuras

### 🧪 Ambiente de Validação

**USAR APENAS:**
- ✅ Ambiente local (localhost:3001)
- ✅ Dados demo seed existentes
- ✅ Usuários demo pré-criados (`.claude/QUICK_START.md`)
- ✅ Banco de dados de desenvolvimento (docker-compose)

**NUNCA USAR:**
- ❌ Ambiente de produção
- ❌ Dados de clientes reais
- ❌ Banco de dados de staging/produção

---

## 🎯 Objetivo

Validação End-to-End **completa** em 3 camadas usando MCP Chrome DevTools:

1. **L1 - Foundation** (Auth + RBAC + Multi-Tenant) - READ-ONLY
2. **L2 - Features** (CRUD + Hub Especialistas) - OBSERVAÇÃO
3. **L3 - Quality** (i18n + White-Label + Performance) - DIAGNÓSTICO

**Modo de Execução:** Observação, anotação e diagnóstico apenas.

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

# 5. Criar diretório de evidências
mkdir -p .factory/relatorios/qa-e2e-$(date +%Y-%m-%d)/{screenshots,snapshots,logs,traces,evidencias}
```

---

## 📸 Guia de Coleta de Evidências MCP

**🎯 Objetivo:** Documentar COMO coletar cada tipo de evidência usando comandos MCP Chrome DevTools.

### 1️⃣ Screenshots (Evidência Visual)

**Quando usar:** Validar UI, branding, layout, bugs visuais

#### Comando Básico
```javascript
// Screenshot da página inteira (viewport atual)
mcp__chrome-devtools__take_screenshot()
```

#### Com Parâmetros (Recomendado)
```javascript
// Salvar screenshot em arquivo (PNG)
mcp__chrome-devtools__take_screenshot({
  filePath: "./screenshots/L1-001-login-student.png",
  format: "png"
})

// Screenshot de elemento específico
mcp__chrome-devtools__take_screenshot({
  uid: "dashboard-card-1",
  filePath: "./screenshots/L2-006-specialist-dashboard-card.png",
  format: "png"
})

// Screenshot full page (scroll completo)
mcp__chrome-devtools__take_screenshot({
  fullPage: true,
  filePath: "./screenshots/L3-001-i18n-full-page.png",
  format: "png"
})

// Screenshot JPEG com qualidade (menor tamanho)
mcp__chrome-devtools__take_screenshot({
  filePath: "./screenshots/performance-dashboard.jpg",
  format: "jpeg",
  quality: 80  // 0-100
})
```

**Naming Convention:**
- `L[layer]-[TC]-[descrição].png`
- Exemplo: `L1-005-admin-panel-rbac.png`
- Bugs: `bug-[ID]-[descrição]-[before|after].png`

---

### 2️⃣ Snapshots DOM (Evidência Estrutural)

**Quando usar:** Validar estrutura DOM, acessibilidade, elementos presentes

#### Comando Básico
```javascript
// Snapshot básico (a11y tree)
const snapshot = mcp__chrome-devtools__take_snapshot()
```

#### Com Parâmetros (Recomendado)
```javascript
// Snapshot verbose (máximo de detalhes)
mcp__chrome-devtools__take_snapshot({
  verbose: true,
  filePath: "./snapshots/L1-001-dashboard-student-verbose.txt"
})

// Snapshot básico salvo em arquivo
mcp__chrome-devtools__take_snapshot({
  filePath: "./snapshots/L2-007-hub-catalog.txt"
})
```

**O que o snapshot captura:**
- Árvore de acessibilidade (a11y tree)
- UIDs de elementos (para clicar/preencher)
- Textos visíveis
- Roles ARIA
- Estados (selected, checked, etc.)

**Uso prático:**
```javascript
// 1. Capturar snapshot
const snapshot = mcp__chrome-devtools__take_snapshot()

// 2. Procurar UID de elemento no snapshot
// Exemplo: uid="button-123"

// 3. Usar UID para interagir
mcp__chrome-devtools__click({ uid: "button-123" })
```

**Naming Convention:**
- `L[layer]-[TC]-[descrição].txt`
- Exemplo: `L2-007-hub-catalog-before-filter.txt`

---

### 3️⃣ Console Logs (Evidência de Erros JS)

**Quando usar:** Validar 0 erros, detectar warnings, debugar comportamento

#### Listar Mensagens Console
```javascript
// Listar TODOS os tipos de mensagens
mcp__chrome-devtools__list_console_messages()

// Listar APENAS erros (recomendado)
mcp__chrome-devtools__list_console_messages({
  types: ["error"]
})

// Listar erros + warnings
mcp__chrome-devtools__list_console_messages({
  types: ["error", "warn"]
})

// Limitar quantidade (paginação)
mcp__chrome-devtools__list_console_messages({
  types: ["error"],
  pageSize: 10,
  pageIdx: 0  // primeira página
})

// Incluir mensagens de navegações anteriores (últimas 3)
mcp__chrome-devtools__list_console_messages({
  types: ["error"],
  includePreservedMessages: true
})
```

**Tipos disponíveis:**
- `"error"` - Erros críticos
- `"warn"` - Avisos
- `"log"` - Logs normais
- `"info"` - Informações
- `"debug"` - Debug messages
- `"table"` - console.table()
- `"trace"` - Stack traces

#### Obter Detalhes de Mensagem
```javascript
// 1. Listar mensagens
const messages = mcp__chrome-devtools__list_console_messages({ types: ["error"] })

// 2. Pegar ID de mensagem específica (msgid)
// msgid: 123

// 3. Obter detalhes completos
mcp__chrome-devtools__get_console_message({ msgid: 123 })
```

**Workflow completo:**
```javascript
// 1. Navegar para página
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/dashboard" })

// 2. Aguardar carregamento
mcp__chrome-devtools__wait_for({ text: "Bem-vindo" })

// 3. Coletar erros console
const errors = mcp__chrome-devtools__list_console_messages({ types: ["error"] })

// 4. Se houver erros, salvar detalhes
if (errors.length > 0) {
  // Salvar em arquivo JSON
  // (não há comando direto, mas anotar manualmente)
  console.log("ERROS ENCONTRADOS:", errors)

  // Obter detalhes de cada erro
  errors.forEach(error => {
    const details = mcp__chrome-devtools__get_console_message({ msgid: error.msgid })
    // Anotar: error.text, error.url, error.lineNumber
  })
}
```

**Naming Convention:**
- `console-errors-L[layer].json`
- Exemplo: `console-errors-L1-foundation.json`
- Bugs: `bug-[ID]-console-log.txt`

---

### 4️⃣ Network Requests (Evidência de API)

**Quando usar:** Validar requests, verificar filtros multi-tenant, debugar API

#### Listar Requests
```javascript
// Listar TODAS as requests
mcp__chrome-devtools__list_network_requests()

// Listar apenas fetch/XHR (recomendado para APIs)
mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch", "xhr"]
})

// Filtrar múltiplos tipos
mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch", "xhr", "script", "stylesheet"]
})

// Paginação
mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch"],
  pageSize: 10,
  pageIdx: 0
})

// Incluir requests de navegações anteriores
mcp__chrome-devtools__list_network_requests({
  includePreservedRequests: true
})
```

**Tipos de Resource:**
- `"fetch"` - Fetch API
- `"xhr"` - XMLHttpRequest
- `"document"` - HTML pages
- `"script"` - JavaScript files
- `"stylesheet"` - CSS files
- `"image"` - Imagens
- `"font"` - Fontes
- `"websocket"` - WebSockets

#### Obter Detalhes de Request
```javascript
// 1. Listar requests
const requests = mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch"]
})

// 2. Pegar ID de request específica (reqid)
// reqid: 456

// 3. Obter detalhes completos (headers, body, response)
mcp__chrome-devtools__get_network_request({ reqid: 456 })

// 4. Salvar request/response em arquivos
mcp__chrome-devtools__get_network_request({
  reqid: 456,
  requestFilePath: "./traces/request-456.json",
  responseFilePath: "./traces/response-456.json"
})
```

**Workflow de Validação Multi-Tenant:**
```javascript
// 1. Login como maria@acmetech.com (company-1)
// ... (login flow)

// 2. Navegar para dashboard
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/dashboard" })

// 3. Aguardar carregamento
mcp__chrome-devtools__wait_for({ text: "Meus Cursos" })

// 4. Listar requests fetch
const requests = mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch"]
})

// 5. Procurar request para v_enrollments_courses
const enrollmentReq = requests.find(r => r.url.includes("v_enrollments_courses"))

// 6. Obter detalhes
const details = mcp__chrome-devtools__get_network_request({ reqid: enrollmentReq.reqid })

// 7. VALIDAR: URL deve conter WHERE (company_id,eq,company-1)
// Anotar: ✅ Filtro multi-tenant presente OU ❌ VAZAMENTO DE DADOS
```

**Naming Convention:**
- `network-requests-L[layer].json` (lista completa)
- `request-[ID]-[endpoint].json` (request específica)
- `response-[ID]-[endpoint].json` (response específica)

---

### 5️⃣ Performance Traces (Evidência de Performance)

**Quando usar:** Medir Core Web Vitals, identificar bottlenecks

#### Start Trace
```javascript
// Iniciar trace com reload automático
mcp__chrome-devtools__performance_start_trace({
  reload: true,
  autoStop: true  // para automaticamente após carregamento
})

// Iniciar trace sem reload (para SPAs)
mcp__chrome-devtools__performance_start_trace({
  reload: false,
  autoStop: false  // parar manualmente com stop_trace
})

// Salvar trace em arquivo
mcp__chrome-devtools__performance_start_trace({
  reload: true,
  autoStop: true,
  filePath: "./traces/performance-dashboard.json"
})
```

#### Stop Trace
```javascript
// Parar trace e obter resultados
mcp__chrome-devtools__performance_stop_trace()

// Parar e salvar em arquivo
mcp__chrome-devtools__performance_stop_trace({
  filePath: "./traces/performance-dashboard.json.gz"  // comprimido
})
```

#### Analisar Insights
```javascript
// 1. Rodar trace
// ... (start_trace)

// 2. Obter insights de performance
mcp__chrome-devtools__performance_analyze_insight({
  insightSetId: "0",  // usar ID do trace
  insightName: "LCPBreakdown"  // nome do insight
})

// Insights disponíveis:
// - "LCPBreakdown" (Largest Contentful Paint)
// - "DocumentLatency" (tempo de carregamento)
// - "CLSBreakdown" (Cumulative Layout Shift)
// - "InteractionToNextPaint"
```

**Workflow completo:**
```javascript
// 1. Navegar para página
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001" })

// 2. Iniciar trace com reload
mcp__chrome-devtools__performance_start_trace({
  reload: true,
  autoStop: true,
  filePath: "./traces/trace-dashboard-$(date +%s).json"
})

// 3. Aguardar trace completar (autoStop: true)

// 4. Analisar métricas
// - First Paint (FP)
// - Largest Contentful Paint (LCP)
// - Total Blocking Time (TBT)

// 5. VALIDAR targets:
// - FP < 1.5s ✅
// - LCP < 2.5s ✅
// - TBT < 300ms ✅
```

**Naming Convention:**
- `trace-[page]-[timestamp].json`
- Exemplo: `trace-dashboard-1707238800.json`

---

### 6️⃣ Workflow Completo de Coleta (Exemplo)

**Cenário:** Validar TC-L1-001 (Login Student) com coleta completa de evidências

```javascript
// 1. Navegar para login
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001" })

// 2. Screenshot inicial
mcp__chrome-devtools__take_screenshot({
  filePath: "./screenshots/L1-001-login-page.png"
})

// 3. Snapshot da página login
mcp__chrome-devtools__take_snapshot({
  filePath: "./snapshots/L1-001-login-page.txt"
})

// 4. Preencher credenciais
mcp__chrome-devtools__fill({ uid: "email", value: "maria@acmetech.com" })
mcp__chrome-devtools__fill({ uid: "password", value: "Demo@2026" })

// 5. Screenshot antes de submeter
mcp__chrome-devtools__take_screenshot({
  filePath: "./screenshots/L1-001-login-filled.png"
})

// 6. Submeter login
mcp__chrome-devtools__click({ uid: "login-button" })

// 7. Aguardar redirect
mcp__chrome-devtools__wait_for({ text: "Bem-vindo" })

// 8. Screenshot após login
mcp__chrome-devtools__take_screenshot({
  filePath: "./screenshots/L1-001-dashboard-student.png"
})

// 9. Snapshot do dashboard
mcp__chrome-devtools__take_snapshot({
  filePath: "./snapshots/L1-001-dashboard-student.txt"
})

// 10. Coletar erros console
const errors = mcp__chrome-devtools__list_console_messages({
  types: ["error", "warn"]
})

// 11. Coletar network requests
const requests = mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch", "xhr"]
})

// 12. ANOTAR RESULTADOS:
// - ✅ Login bem-sucedido
// - ✅ Redirect para /dashboard
// - ✅ 0 erros no console
// - ✅ 5 requests fetch (auth, user, courses, enrollments, progress)
// - ✅ Todas requests com status 200
// - 📸 3 screenshots salvos
// - 📄 2 snapshots salvos
```

---

### 7️⃣ Checklist de Coleta (Para Cada TC)

**Antes de iniciar teste:**
- [ ] Diretório de evidências criado
- [ ] Chrome em debug mode (9222)
- [ ] Backend + Frontend rodando

**Durante o teste:**
- [ ] Screenshot ANTES de ação crítica
- [ ] Screenshot DEPOIS de ação crítica
- [ ] Snapshot de páginas importantes
- [ ] Coletar console messages ao final
- [ ] Coletar network requests se relevante

**Ao encontrar bug:**
- [ ] Screenshot do bug (visual)
- [ ] Snapshot do DOM (estrutural)
- [ ] Console log completo (get_console_message)
- [ ] Network request com erro (get_network_request)
- [ ] Anotar: TC, timestamp, severidade, steps to reproduce

**Naming de arquivos:**
```
.factory/relatorios/qa-e2e-2026-02-16/
├── screenshots/
│   ├── L1-001-login-page.png
│   ├── L1-001-dashboard-student.png
│   ├── bug-001-dashboard-error.png
│   └── ...
├── snapshots/
│   ├── L1-001-login-page.txt
│   ├── L1-001-dashboard-student.txt
│   └── ...
├── logs/
│   ├── console-errors-L1.json
│   ├── bug-001-console-details.txt
│   └── ...
├── traces/
│   ├── network-requests-L1.json
│   ├── trace-dashboard-1707238800.json
│   └── ...
└── evidencias/
    ├── bug-001-evidencias.md (consolidado)
    └── ...
```

---

### 8️⃣ Comandos Quick Reference

| Tipo | Comando | Parâmetros Principais |
|------|---------|----------------------|
| **Screenshot** | `take_screenshot()` | `filePath`, `format`, `fullPage`, `uid` |
| **Snapshot** | `take_snapshot()` | `filePath`, `verbose` |
| **Console** | `list_console_messages()` | `types`, `pageSize` |
| **Console Detail** | `get_console_message()` | `msgid` |
| **Network** | `list_network_requests()` | `resourceTypes`, `pageSize` |
| **Network Detail** | `get_network_request()` | `reqid`, `requestFilePath`, `responseFilePath` |
| **Perf Start** | `performance_start_trace()` | `reload`, `autoStop`, `filePath` |
| **Perf Stop** | `performance_stop_trace()` | `filePath` |
| **Perf Insight** | `performance_analyze_insight()` | `insightSetId`, `insightName` |

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

**⚠️ ATENÇÃO:** Cenários CRUD são apenas para **OBSERVAÇÃO DE FUNCIONALIDADE**. NÃO executar em produção. Usar ambiente de desenvolvimento local com dados seed.

### Categoria: CRUD - Courses (5 cenários)

#### TC-L2-001: Create Course (OBSERVAÇÃO APENAS)

**🔴 IMPORTANTE:** Este teste cria dados temporários. Executar APENAS em ambiente local de desenvolvimento.

**Modo Validação:**
1. **Opção A - OBSERVAÇÃO (Recomendado):**
   - Apenas verificar se UI de criação está acessível
   - Validar campos do formulário visíveis
   - NÃO submeter formulário
   - Anotar: "UI de criação funcional, campos presentes"

2. **Opção B - SANDBOX (Ambiente de Teste):**
   ```
   1. Login como prof@acmetech.com
   2. navigate_page(url="http://localhost:3001/instructor")
   3. click(uid="create-course-button")
   4. take_snapshot() → validar formulário de criação
   5. fill_form([
        {uid: "course-title", value: "[QA-TEST] Curso Temporário E2E"},
        {uid: "course-description", value: "DELETAR - Teste automático"},
        {uid: "course-category", value: "tecnologia"}
      ])
   6. take_screenshot() → evidência antes de submeter
   7. click(uid="submit-course")
   8. wait_for(text="Curso criado com sucesso")
   9. take_snapshot() → validar curso na lista
   10. list_network_requests(resourceTypes=["fetch"])
   11. get_network_request() → validar POST request
   12. ANOTAR ID do curso criado para cleanup manual posterior
   ```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ UI de criação acessível
- ✅ Formulário com todos campos
- ✅ Request POST com company_id correto
- ✅ Toast de sucesso exibido
- 📝 **Anotar:** ID do curso criado, timestamp, evidências (screenshots)

**Cleanup Manual:** Deletar curso `[QA-TEST]` após validação

#### TC-L2-002: Edit Course (OBSERVAÇÃO APENAS)

**🔴 IMPORTANTE:** NÃO editar cursos demo existentes. Apenas validar UI e funcionalidade.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como prof@acmetech.com
2. navigate_page(url="http://localhost:3001/instructor")
3. take_snapshot() → listar cursos existentes
4. click(uid="edit-course-button-1")
5. take_snapshot() → validar formulário de edição carregado
6. Verificar campos pré-preenchidos
7. take_screenshot() → evidência do formulário
8. NÃO modificar campos
9. NÃO clicar em "Salvar"
10. click(uid="cancel-button") → cancelar edição
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ UI de edição acessível
- ✅ Formulário pré-preenchido com dados existentes
- ✅ Botões "Salvar" e "Cancelar" visíveis
- 📝 **Anotar:** UI funcional, campos carregados corretamente

**Alternativa (se curso [QA-TEST] foi criado em TC-L2-001):**
- Editar APENAS o curso temporário [QA-TEST]
- Adicionar sufixo " - EDITADO"
- Anotar mudança para cleanup

#### TC-L2-003: Delete Course (OBSERVAÇÃO APENAS)

**🔴 CRÍTICO:** NÃO deletar cursos demo existentes. Apenas validar UI e modal de confirmação.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como prof@acmetech.com
2. navigate_page(url="http://localhost:3001/instructor")
3. take_snapshot() → listar cursos existentes
4. click(uid="delete-course-button-1")
5. take_screenshot() → modal de confirmação
6. Verificar texto: "Tem certeza que deseja deletar?"
7. click(uid="cancel-dialog") → CANCELAR (NÃO confirmar)
8. take_snapshot() → validar curso ainda na lista
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ Botão de delete visível
- ✅ Modal de confirmação aparece
- ✅ Botões "Confirmar" e "Cancelar" presentes
- ✅ Cancelar mantém curso na lista
- 📝 **Anotar:** Fluxo de confirmação funcional

**Alternativa (se curso [QA-TEST] foi criado):**
- Deletar APENAS o curso temporário [QA-TEST]
- Confirmar deleção
- Validar DELETE request
- Anotar: Cleanup concluído

#### TC-L2-004: Enroll in Course (OBSERVAÇÃO APENAS)

**🟡 ATENÇÃO:** Validar apenas UI e fluxo. Evitar criar enrollments desnecessários.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como maria@acmetech.com
2. navigate_page(url="http://localhost:3001/dashboard")
3. take_snapshot() → anotar cursos já matriculados
4. navigate_page(url="http://localhost:3001/courses")
5. take_snapshot() → ver cursos disponíveis
6. Verificar botão "Matricular-se" em curso NÃO matriculado
7. take_screenshot() → evidência da UI
8. NÃO clicar em "Matricular-se" (observação apenas)
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ Lista de cursos disponíveis carregada
- ✅ Botão "Matricular-se" visível em cursos não matriculados
- ✅ Cursos já matriculados mostram "Continuar"
- 📝 **Anotar:** UI de enrollment funcional

**Nota:** Maria já possui enrollments demo. NÃO criar novos.

#### TC-L2-005: Complete Module (OBSERVAÇÃO APENAS)

**🟡 ATENÇÃO:** Validar apenas UI. NÃO modificar progresso real de usuários demo.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como maria@acmetech.com
2. navigate_page(url="http://localhost:3001/dashboard")
3. take_snapshot() → verificar progresso atual
4. Anotar: Progresso existente de cursos demo
5. navigate_page(url="http://localhost:3001/courses/[curso-matriculado]")
6. take_snapshot() → ver módulos disponíveis
7. Verificar elementos:
   - Lista de módulos
   - Status (completo/incompleto)
   - Botão "Marcar como completo" OU checkmark
8. take_screenshot() → evidência
9. NÃO clicar em "Marcar como completo"
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ Progresso atual visível no dashboard
- ✅ Lista de módulos carregada
- ✅ Status de cada módulo exibido
- ✅ UI de conclusão presente
- 📝 **Anotar:** Progresso preservado, UI funcional

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

**🔴 CRÍTICO:** User Management testa funcionalidades de administração. NÃO criar/editar/deletar usuários demo reais. Apenas OBSERVAÇÃO.

#### TC-L2-011: Create User (OBSERVAÇÃO APENAS)

**🔴 IMPORTANTE:** NÃO criar usuários reais. Apenas validar UI.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → listar usuários existentes (6 esperados)
4. click(uid="add-user-button")
5. take_snapshot() → validar formulário de criação
6. Verificar campos disponíveis:
   - Nome
   - Email
   - Role (dropdown com 5 opções)
   - Company (pré-preenchido, readonly)
7. take_screenshot() → evidência do formulário
8. NÃO preencher campos
9. NÃO submeter formulário
10. click(uid="cancel-button") → cancelar
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ Painel admin acessível
- ✅ Lista de 6 usuários demo visível
- ✅ Botão "Adicionar Usuário" funcional
- ✅ Formulário com todos campos necessários
- ✅ company_id pré-preenchido e readonly
- 📝 **Anotar:** UI de criação funcional, validações presentes

#### TC-L2-012: Edit User (OBSERVAÇÃO APENAS)

**🔴 IMPORTANTE:** NÃO modificar usuários demo. Apenas validar UI.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → listar usuários
4. click(uid="edit-user-button-1")
5. take_snapshot() → formulário de edição carregado
6. Verificar campos pré-preenchidos
7. take_screenshot() → evidência
8. NÃO modificar campos
9. click(uid="cancel-button") → cancelar edição
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ UI de edição acessível
- ✅ Dados pré-carregados corretamente
- ✅ Campos editáveis
- 📝 **Anotar:** Edição preservada, UI funcional

#### TC-L2-013: Delete User (OBSERVAÇÃO APENAS)

**🔴 CRÍTICO:** NÃO deletar usuários demo. Apenas validar modal de confirmação.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → listar usuários
4. click(uid="delete-user-button-1")
5. take_screenshot() → modal de confirmação
6. Verificar texto de alerta
7. Verificar botões "Confirmar" e "Cancelar"
8. click(uid="cancel-dialog") → CANCELAR (NÃO confirmar)
9. take_snapshot() → usuário ainda na lista
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ Modal de confirmação aparece
- ✅ Mensagem de alerta clara
- ✅ Cancelar preserva usuário
- 📝 **Anotar:** Fluxo de confirmação funcional, dados preservados

#### TC-L2-014: User Role Change (OBSERVAÇÃO APENAS)

**🔴 IMPORTANTE:** NÃO modificar roles de usuários demo. Apenas validar UI.

**Modo Validação (OBSERVAÇÃO):**
```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → listar usuários e roles atuais
4. Anotar: maria@acmetech.com = student
5. click(uid="edit-user-maria")
6. take_snapshot() → formulário de edição
7. Verificar dropdown de roles:
   - student (atual)
   - instructor
   - admin
   - c_level
   - specialist
8. take_screenshot() → evidência
9. NÃO alterar role
10. click(uid="cancel-button")
```

**Resultado esperado (DIAGNÓSTICO):**
- ✅ Dropdown de roles funcional
- ✅ 5 roles disponíveis
- ✅ Role atual selecionado
- 📝 **Anotar:** Alteração de role possível, UI funcional, dados preservados

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

## 📊 Relatório de Diagnóstico

**🎯 Foco:** Coleta de evidências, anotações de bugs e recomendações de correção.

### Template de Relatório

```markdown
# Relatório de Diagnóstico E2E - App-Controle
**Data:** YYYY-MM-DD
**Executor:** Claude Opus 4.6
**MCP:** chrome-devtools-mcp@latest
**Modo:** 🔍 READ-ONLY / DIAGNÓSTICO

---

## ⚙️ Ambiente de Validação

- **Frontend:** http://localhost:3001 (local)
- **Backend:** http://localhost:8081 (NocoDB)
- **Database:** PostgreSQL 16 (Docker)
- **Chrome:** v121.x (Debug Mode)
- **Usuários Demo:** 9 usuários seed
- **Modificações:** ❌ NENHUMA (read-only)

---

## 📋 Evidências Coletadas

### Screenshots Salvos
- `./screenshots/L1-001-login-student.png`
- `./screenshots/L1-005-admin-panel.png`
- `./screenshots/L2-006-specialist-dashboard.png`
- `./screenshots/L3-001-i18n-pt-br.png`
- `./screenshots/L3-001-i18n-en-us.png`
- ... (total: XX screenshots)

### Snapshots DOM
- `./snapshots/L1-001-dashboard-student.txt`
- `./snapshots/L2-007-hub-catalog.txt`
- ... (total: XX snapshots)

### Logs Console
- `./logs/console-errors-L1.json`
- `./logs/console-errors-L2.json`
- `./logs/console-errors-L3.json`

### Network Traces
- `./traces/network-requests-L1.json`
- `./traces/performance-dashboard.json`

---

## 🧪 Resultados por Layer (DIAGNÓSTICO)

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

## 🐛 Bugs e Observações

### Template de Bug Report

Para cada bug encontrado, documentar:

```markdown
### 🐛 BUG-XXX: [Título Descritivo do Bug]

**Classificação:**
- **Severidade:** CRITICAL / HIGH / MEDIUM / LOW
- **Tipo:** Funcional / Visual / Performance / Segurança
- **Layer:** L1 / L2 / L3
- **TC:** TC-LX-XXX
- **Componente:** [Nome do componente/página]

**Ambiente:**
- Browser: Chrome 121.x
- Viewport: Desktop 1920x1080
- Usuário: maria@acmetech.com (student)

**Evidências Coletadas:**
- 📸 Screenshot: `./screenshots/bug-xxx-before.png`
- 📄 Snapshot: `./snapshots/bug-xxx-dom.txt`
- 📋 Console Log: `./logs/bug-xxx-console.json`
- 🌐 Network: `./traces/bug-xxx-network.json`

**Steps to Reproduce:**
1. Login como maria@acmetech.com
2. Navegar para /dashboard
3. Clicar em "Meus Cursos"
4. Observar erro no console

**Comportamento Esperado:**
- Dashboard carrega sem erros
- Lista de cursos exibida corretamente

**Comportamento Atual:**
- Console error: "Cannot read property 'name' of undefined"
- Lista vazia mesmo com cursos matriculados

**Análise Inicial:**
- Possível race condition no carregamento de dados
- Componente renderiza antes de API response

**Recomendação de Correção:**
1. Adicionar loading state ao componente
2. Validar dados antes de renderizar
3. Adicionar error boundary
4. Testar com network throttling (Slow 3G)

**Prioridade Sugerida:** HIGH
**Estimativa de Esforço:** 2-4 horas
**Risco:** Impacta experiência de todos estudantes
```

---

## 📊 Análise Consolidada

### Resumo de Bugs por Severidade

| Severidade | Quantidade | Componentes Afetados |
|------------|------------|---------------------|
| CRITICAL | 0 | - |
| HIGH | 2 | Dashboard, Hub Catalog |
| MEDIUM | 5 | i18n, Performance |
| LOW | 3 | UI cosmético |
| **TOTAL** | **10** | - |

### Bugs por Categoria

| Categoria | Bugs | % Total |
|-----------|------|---------|
| Funcional | 4 | 40% |
| Visual | 3 | 30% |
| Performance | 2 | 20% |
| i18n | 1 | 10% |

---

## ✅ Observações Positivas

**Pontos Fortes Identificados:**
- ✅ RBAC funcionando corretamente (0 vazamentos)
- ✅ Multi-tenant 100% isolado (testado em 2 companies)
- ✅ Performance dentro dos targets (FP < 1.5s, LCP < 2.5s)
- ✅ 0 erros críticos de segurança
- ✅ i18n 95% funcional (3 idiomas)
- ✅ Hub de Especialistas carregando corretamente

---

## 🎯 Recomendações de Correção

### Prioridade P0 (Bloqueador)
**Nenhum bug bloqueador identificado** ✅

### Prioridade P1 (Alta - 2 bugs)
1. **BUG-001:** Dashboard student - Race condition no carregamento
   - **Impacto:** Todos estudantes
   - **Esforço:** 2-4h
   - **Recomendação:** Adicionar loading state + error boundary

2. **BUG-002:** Hub Catalog - Filtro de busca não funciona
   - **Impacto:** Descoberta de cursos prejudicada
   - **Esforço:** 1-2h
   - **Recomendação:** Corrigir query de busca

### Prioridade P2 (Média - 5 bugs)
- BUG-003: Texto não traduzido em es-ES (Settings page)
- BUG-004: Performance - Bundle size 520kb (target: <500kb)
- BUG-005: Contrast ratio insuficiente em botão secundário
- ... (detalhes em seção Bugs)

### Prioridade P3 (Baixa - 3 bugs)
- BUG-008: Tooltip truncado em mobile
- BUG-009: Favicon não carrega
- BUG-010: Logo levemente desalinhado

---

## 📈 Conclusão do Diagnóstico

### Status Geral: ✅ APROVADO COM RESSALVAS

**Resumo:**
- ✅ Sistema funcional e seguro
- ✅ Arquitetura (RBAC, Multi-tenant) correta
- ✅ Performance dentro dos targets
- ⚠️ 2 bugs HIGH precisam correção antes de produção
- ⚠️ 5 bugs MEDIUM podem ser corrigidos pós-lançamento
- ✅ 3 bugs LOW são cosméticos

**Decisão Recomendada:**
- ✅ **APROVAR para deploy em STAGING**
- ⚠️ **CORRIGIR 2 bugs HIGH** antes de produção
- 📋 Agendar correção de bugs MEDIUM para Sprint 17

### Próximas Ações

**Antes de Produção:**
1. Corrigir BUG-001 (Dashboard race condition)
2. Corrigir BUG-002 (Hub search filter)
3. Re-run TC-L2-001 e TC-L2-007 (validar correções)
4. Deploy para staging
5. Re-run smoke test em staging

**Pós-Produção (Sprint 17):**
1. Corrigir 5 bugs MEDIUM
2. Melhorar bundle size (520kb → <500kb)
3. Completar tradução es-ES
4. Melhorar acessibilidade (contrast ratio)

---

## 📁 Artefatos Gerados

### Estrutura de Arquivos

```
.factory/relatorios/qa-e2e-YYYY-MM-DD/
├── RELATORIO-DIAGNOSTICO.md (este arquivo)
├── screenshots/
│   ├── L1-001-login-student.png
│   ├── L1-005-admin-panel.png
│   ├── bug-001-dashboard-error.png
│   └── ... (total: 45 screenshots)
├── snapshots/
│   ├── L1-001-dashboard-student.txt
│   └── ... (total: 40 snapshots)
├── logs/
│   ├── console-errors-L1.json
│   ├── console-errors-L2.json
│   └── console-errors-L3.json
├── traces/
│   ├── network-requests-L1.json
│   ├── performance-dashboard.json
│   └── performance-hub.json
└── evidencias/
    ├── bug-001-console-log.txt
    ├── bug-002-network-trace.json
    └── ... (todas evidências de bugs)
```

### Estatísticas

- **Total de screenshots:** 45
- **Total de snapshots:** 40
- **Total de console logs:** 3 arquivos (L1, L2, L3)
- **Total de network traces:** 5 arquivos
- **Bugs documentados:** 10
- **Evidências de bugs:** 10 conjuntos completos

---

**🔍 Diagnóstico Executado por:** Claude Opus 4.6
**🛠️ MCP Server:** chrome-devtools-mcp@latest
**📅 Data:** YYYY-MM-DD
**⏱️ Duração:** XX minutos
**📁 Relatório salvo em:** `.factory/relatorios/qa-e2e-YYYY-MM-DD/RELATORIO-DIAGNOSTICO.md`

---

**✅ VALIDAÇÃO READ-ONLY COMPLETA - NENHUMA MODIFICAÇÃO REALIZADA NA BASE DE CÓDIGO**
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

**Versão:** 1.3.0
**Stack:** React 18 + Vite + NocoDB + PostgreSQL
**Última atualização:** 2026-02-16

---

## 📝 Changelog

### v1.3.0 (2026-02-16) - 📸 GUIA DE COLETA MCP
**Adicionado:**
- ✅ **Guia completo de Coleta de Evidências MCP** (Seção dedicada)
- ✅ **8 subsections detalhadas:**
  1. Screenshots (take_screenshot) - todos parâmetros
  2. Snapshots DOM (take_snapshot) - verbose mode
  3. Console Logs (list_console_messages, get_console_message)
  4. Network Requests (list_network_requests, get_network_request)
  5. Performance Traces (performance_start_trace, performance_stop_trace)
  6. Workflow completo de coleta (exemplo TC-L1-001)
  7. Checklist de coleta (antes/durante/após)
  8. Quick Reference Table (todos comandos MCP)
- ✅ **Naming conventions** para arquivos de evidências
- ✅ **Exemplos práticos** de cada comando
- ✅ **Parâmetros completos** documentados
- ✅ **Workflow de validação multi-tenant** com network requests

**Impacto:** Agora há documentação completa de COMO coletar evidências MCP.

### v1.2.0 (2026-02-16) - 🔍 READ-ONLY ENFORCEMENT
**CRÍTICO - Mudança de Paradigma:**
- 🔴 **Modo READ-ONLY obrigatório** - Nenhuma modificação na base de código
- 🔴 **Princípios de Validação Não-Invasiva** adicionados
- 🔴 **Todos testes CRUD** ajustados para observação ou sandbox
- ✅ Testes L2 (CRUD) agora com modo "OBSERVAÇÃO APENAS"
- ✅ Template de relatório focado em **DIAGNÓSTICO**
- ✅ Seção de "Evidências Coletadas" (screenshots, logs, traces)
- ✅ Template detalhado de Bug Report
- ✅ Recomendações de correção por prioridade (P0, P1, P2, P3)
- ✅ Estrutura de artefatos (screenshots, snapshots, logs, traces)
- ✅ Avisos em TODOS os testes que modificam dados

**Objetivo:** Garantir que validação seja 100% diagnóstica sem alterações na base.

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
