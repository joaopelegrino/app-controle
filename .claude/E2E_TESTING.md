# E2E Testing - MCP Chrome DevTools

Guia de testes End-to-End usando MCP (Model Context Protocol) Chrome DevTools.

---

## 🎯 Conceito

Testes E2E **manuais** guiados por Claude usando Chrome DevTools MCP Server:
- **Validação visual** via screenshots
- **Validação DOM** via snapshots
- **Validação console** (erros JS)
- **Validação network** (requests HTTP)
- **Interação** (click, fill, navigate)

---

## ⚙️ Setup MCP Chrome DevTools

### 1. Configuração `.mcp.json`

Já configurado em `.mcp.json` (raiz):

```json
{
  "mcpServers": {
    "chrome-devtools-app-controle": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--browserUrl=http://127.0.0.1:9222"]
    }
  }
}
```

### 2. Iniciar Chrome em Debug Mode

```bash
# Opção A: Usar task mise
mise chrome-debug

# Opção B: Manual
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug
```

Verifica se está rodando:

```bash
curl http://127.0.0.1:9222/json/version
```

### 3. Verificar MCP Server no Claude Code

Comandos MCP disponíveis:
- `mcp__chrome-devtools__take_screenshot`
- `mcp__chrome-devtools__take_snapshot`
- `mcp__chrome-devtools__click`
- `mcp__chrome-devtools__fill`
- `mcp__chrome-devtools__navigate_page`
- `mcp__chrome-devtools__list_console_messages`
- `mcp__chrome-devtools__list_network_requests`
- `mcp__chrome-devtools__evaluate_script`

---

## 📋 Casos de Teste E2E

### TC-001: Login Flow (Student)

```
1. navigate_page(url="http://localhost:3001")
2. take_screenshot() → validar página login
3. fill(uid="email", value="maria@acmetech.com")
4. fill(uid="password", value="Demo@2026")
5. click(uid="login-button")
6. wait_for(text="Bem-vindo")
7. take_snapshot() → validar dashboard student
8. list_console_messages(types=["error"]) → verificar sem erros
9. list_network_requests() → validar request /api/users
```

**Resultado esperado:**
- ✅ Redirect para `/dashboard`
- ✅ Exibe nome do usuário
- ✅ Mostra cursos matriculados
- ✅ Sem erros no console
- ✅ Request autenticado (xc-auth header)

### TC-002: RBAC - Admin Access

```
1. Login como admin@acmetech.com
2. navigate_page(url="http://localhost:3001/admin")
3. take_snapshot() → validar painel admin
4. Verificar elementos visíveis:
   - "Gerenciar Usuários"
   - "Adicionar Usuário"
   - Lista de usuários
5. Logout
6. Login como maria@acmetech.com (student)
7. navigate_page(url="http://localhost:3001/admin")
8. take_snapshot() → validar acesso negado
```

**Resultado esperado:**
- ✅ Admin vê painel completo
- ✅ Student vê "Acesso Negado" ou redirect

### TC-003: Multi-Tenant Isolation

```
1. Login como maria@acmetech.com (company-1)
2. take_snapshot() → anotar cursos visíveis
3. Logout
4. Login como julia@devcorp.com (company-2)
5. take_snapshot() → validar cursos DIFERENTES
6. list_network_requests(resourceTypes=["fetch"])
7. Verificar filtro: where=(company_id,eq,company-2)
```

**Resultado esperado:**
- ✅ Usuários de empresas diferentes veem dados diferentes
- ✅ Requests sempre incluem company_id filter

### TC-004: i18n - Language Switch

```
1. Login maria@acmetech.com
2. take_snapshot() → validar textos em pt-BR
3. click(uid="language-selector")
4. click(uid="language-en-US")
5. take_snapshot() → validar textos em en-US
6. Verificar textos:
   - "Bem-vindo" → "Welcome"
   - "Meus Cursos" → "My Courses"
```

**Resultado esperado:**
- ✅ Todos textos traduzidos corretamente
- ✅ Sem hardcoded text visível

### TC-005: Hub de Especialistas

```
1. Login joao.silva.specialist@plataformab2b.com
2. navigate_page(url="http://localhost:3001/specialist")
3. take_snapshot() → validar dashboard specialist
4. Verificar elementos:
   - Total de cursos publicados
   - Média de avaliação
   - Total de alunos
   - Lista de cursos
5. list_network_requests()
6. Verificar request: v_specialist_dashboard table
```

**Resultado esperado:**
- ✅ Dashboard carrega métricas
- ✅ Lista cursos publicados
- ✅ Exibe reviews recebidas

### TC-006: Course Creation (Instructor)

```
1. Login prof@acmetech.com
2. navigate_page(url="http://localhost:3001/instructor")
3. click(uid="create-course-button")
4. fill_form([
     {uid: "course-title", value: "Teste E2E Course"},
     {uid: "course-description", value: "Descrição teste"}
   ])
5. click(uid="submit-course")
6. wait_for(text="Curso criado com sucesso")
7. take_snapshot() → validar curso na lista
8. list_network_requests(resourceTypes=["fetch"])
9. Verificar POST para /api/v2/tables/courses/records
```

**Resultado esperado:**
- ✅ Curso criado com company_id correto
- ✅ Aparece na lista de cursos
- ✅ Request inclui company_id no body

### TC-007: Console Errors Check

```
1. navigate_page(url="http://localhost:3001")
2. Login qualquer usuário
3. Navegar por todas páginas principais:
   - /dashboard
   - /admin
   - /instructor
   - /specialist
   - /hub
4. Para cada página:
   list_console_messages(types=["error", "warn"])
5. take_screenshot() de cada página
```

**Resultado esperado:**
- ✅ ZERO erros no console
- ✅ Warnings aceitáveis apenas (ex: deprecated API)

### TC-008: Network Performance

```
1. navigate_page(url="http://localhost:3001")
2. Login maria@acmetech.com
3. performance_start_trace(reload=true, autoStop=true)
4. Aguardar trace completo
5. performance_stop_trace()
6. Analisar métricas:
   - First Paint < 1.5s
   - Largest Contentful Paint < 2.5s
   - Total requests < 50
```

**Resultado esperado:**
- ✅ First Paint < 1.5s
- ✅ LCP < 2.5s
- ✅ < 50 requests iniciais

---

## 🔍 Comandos MCP Úteis

### Screenshots

```
take_screenshot()                           # Fullscreen
take_screenshot(uid="element-id")           # Elemento específico
take_screenshot(filePath="./debug.png")     # Salvar em arquivo
```

### Snapshots (DOM como texto)

```
take_snapshot()                             # DOM completo
take_snapshot(verbose=true)                 # Detalhado
take_snapshot(filePath="./dom.txt")         # Salvar
```

### Interação

```
click(uid="button-id")
fill(uid="input-id", value="texto")
press_key(key="Enter")
press_key(key="Control+A")
hover(uid="element-id")
```

### Navegação

```
navigate_page(url="http://localhost:3001")
navigate_page(type="back")
navigate_page(type="forward")
navigate_page(type="reload")
```

### Console

```
list_console_messages()
list_console_messages(types=["error"])
list_console_messages(pageSize=10)
get_console_message(msgid=123)
```

### Network

```
list_network_requests()
list_network_requests(resourceTypes=["fetch", "xhr"])
get_network_request(reqid=456)
```

### Scripts

```
evaluate_script(function="() => { return document.title; }")
evaluate_script(
  function="(el) => { return el.innerText; }",
  args=[{uid: "element-id"}]
)
```

---

## 📊 Relatório de Testes

### Template

```markdown
# QA E2E Report - YYYY-MM-DD

## Ambiente
- Frontend: http://localhost:3001
- Backend: http://localhost:8081
- Chrome: v121.x
- MCP: chrome-devtools-mcp@latest

## Casos de Teste

| TC | Descrição | Status | Observações |
|----|-----------|--------|-------------|
| TC-001 | Login Flow Student | ✅ PASS | - |
| TC-002 | RBAC Admin | ✅ PASS | - |
| TC-003 | Multi-Tenant | ✅ PASS | - |
| TC-004 | i18n Switch | ⚠️ PARTIAL | Bug: 1 texto não traduzido |
| TC-005 | Hub Specialist | ✅ PASS | - |
| TC-006 | Course Creation | ✅ PASS | - |
| TC-007 | Console Errors | ✅ PASS | 0 erros |
| TC-008 | Performance | ✅ PASS | FP 1.2s, LCP 2.1s |

## Bugs Encontrados

### BUG-001: Texto não traduzido
- **Severidade:** LOW
- **Steps:** Login → Switch idioma → Ver "Welcome"
- **Esperado:** "Bienvenido" (es-ES)
- **Atual:** "Welcome" (en-US)
- **Fix:** Adicionar chave em es-ES/translation.json

## Métricas

- **Total TCs:** 8
- **PASS:** 7 (87.5%)
- **PARTIAL:** 1 (12.5%)
- **FAIL:** 0 (0%)
- **Bugs:** 1 (LOW)

## Conclusão

✅ Sistema estável para produção com 1 bug cosmético.
```

---

## 🚀 Automatização Futura

```bash
# Playwright (não implementado)
bun run test:e2e

# Cypress (não implementado)
bun run cypress:open
```

---

## 📖 Referências

| Recurso | Link |
|---------|------|
| **MCP Chrome DevTools** | https://github.com/modelcontextprotocol/servers |
| **Command Reference** | `.claude/commands/browser-testing.md` |
| **QA Reports** | `.factory/relatorios/qa-e2e-*/` |

---

**Stack E2E:** MCP Chrome DevTools (manual)  
**Futuro:** Playwright/Cypress (automatizado)  
**Reports:** `.claude/logs/auditorias/`
