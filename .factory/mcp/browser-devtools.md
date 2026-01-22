# Chrome DevTools MCP - Referência Técnica

**MCP:** @benjaminr/chrome-devtools-mcp  
**Versão:** Latest  
**Status:** ✅ Configurado em app-controle

---

## 📋 Visão Geral

Chrome DevTools MCP permite que o Factory Droid inspecione e controle Google Chrome através do Chrome DevTools Protocol (CDP).

### Casos de Uso Principais

| Caso de Uso | Exemplo Prático |
|-------------|-----------------|
| **Debug de erros JS** | Ver console.error(), exceptions não tratadas |
| **Análise de performance** | Métricas Core Web Vitals, tempo de load |
| **Inspeção de rede** | Ver todas as requests, headers, responses |
| **Manipulação de DOM** | Executar JavaScript no contexto da página |
| **Screenshots** | Capturar estado visual para documentação |

---

## 🔧 Configuração

### Pre-requisitos

```bash
# Node.js 22+
node --version  # Deve ser >= 22

# Chrome atual
google-chrome --version

# npx (vem com Node.js)
npx --version
```

### Ativação

```bash
# Com mise (recomendado)
mise run mcp:chrome

# Manual
google-chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-debug &

# WSL2
"/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-debug &
```

### Validação

```bash
# Testar conexão
curl http://127.0.0.1:9222/json/version

# Deve retornar JSON como:
# {
#   "Browser": "Chrome/131.0.6778.86",
#   "Protocol-Version": "1.3",
#   "User-Agent": "...",
#   "V8-Version": "13.1.201.13",
#   "WebKit-Version": "537.36",
#   "webSocketDebuggerUrl": "ws://127.0.0.1:9222/..."
# }
```

---

## 📊 Comandos Disponíveis

### Navegação

```javascript
// Navegar para URL
mcp__chrome-devtools__navigate_page({ 
  url: "http://localhost:3000" 
})

// Espera a página carregar completamente
```

### Console

```javascript
// Obter todos os logs do console
mcp__chrome-devtools__get_console_logs()

// Retorna array de:
// [
//   { level: "error", text: "Uncaught TypeError...", timestamp: ... },
//   { level: "warning", text: "...", timestamp: ... },
//   { level: "info", text: "...", timestamp: ... }
// ]

// Filtrar apenas erros
const logs = mcp__chrome-devtools__get_console_logs()
const errors = logs.filter(log => log.level === 'error')
```

### Rede

```javascript
// Obter todas as requisições de rede
mcp__chrome-devtools__get_network_logs()

// Retorna array de:
// [
//   {
//     url: "http://localhost:3000/api/courses",
//     method: "GET",
//     status: 200,
//     timing: { ... },
//     headers: { ... }
//   },
//   ...
// ]

// Filtrar requisições com erro
const requests = mcp__chrome-devtools__get_network_logs()
const failed = requests.filter(r => r.status >= 400)
```

### Performance

```javascript
// Obter métricas de performance
mcp__chrome-devtools__get_performance_metrics()

// Retorna:
// {
//   DOMContentLoaded: 1234,  // ms
//   loadEventEnd: 2345,      // ms
//   firstPaint: 890,         // ms
//   firstContentfulPaint: 1100,  // ms
//   ...
// }

// Validar performance
const metrics = mcp__chrome-devtools__get_performance_metrics()
if (metrics.loadEventEnd > 2000) {
  console.log("⚠️ Load time > 2s")
}
```

### Executar JavaScript

```javascript
// Executar código na página
mcp__chrome-devtools__execute_js({ 
  script: "return document.title" 
})

// Exemplo: Verificar localStorage
mcp__chrome-devtools__execute_js({ 
  script: "return Object.keys(localStorage)" 
})

// Exemplo: Limpar console
mcp__chrome-devtools__execute_js({ 
  script: "console.clear()" 
})
```

### Storage

```javascript
// Obter dados de storage
mcp__chrome-devtools__get_storage()

// Retorna:
// {
//   localStorage: { ... },
//   sessionStorage: { ... },
//   cookies: [ ... ]
// }
```

### Screenshots

```javascript
// Capturar screenshot
mcp__chrome-devtools__take_screenshot({ 
  path: "/tmp/screenshot.png" 
})

// Screenshot de elemento específico
mcp__chrome-devtools__take_screenshot({ 
  selector: ".course-card",
  path: "/tmp/course-card.png" 
})
```

---

## 🎯 Exemplos Práticos app-controle

### Exemplo 1: Debug de Erro de Login

```javascript
// 1. Navegar para página de login
mcp__chrome-devtools__navigate_page({ 
  url: "http://localhost:3000/login" 
})

// 2. Verificar erros no console
const logs = mcp__chrome-devtools__get_console_logs()
const errors = logs.filter(l => l.level === 'error')

console.log(`Erros encontrados: ${errors.length}`)
errors.forEach(err => console.log(err.text))

// 3. Verificar requisições de rede
const requests = mcp__chrome-devtools__get_network_logs()
const authRequests = requests.filter(r => r.url.includes('/api/auth'))

authRequests.forEach(req => {
  console.log(`${req.method} ${req.url} - Status: ${req.status}`)
})
```

### Exemplo 2: Análise de Performance

```javascript
// 1. Navegar para homepage
mcp__chrome-devtools__navigate_page({ 
  url: "http://localhost:3000" 
})

// 2. Obter métricas
const metrics = mcp__chrome-devtools__get_performance_metrics()

// 3. Avaliar
console.log("📊 Métricas de Performance:")
console.log(`  Load Time: ${metrics.loadEventEnd}ms`)
console.log(`  First Paint: ${metrics.firstPaint}ms`)
console.log(`  FCP: ${metrics.firstContentfulPaint}ms`)

if (metrics.loadEventEnd < 1000) {
  console.log("✅ Performance excelente")
} else if (metrics.loadEventEnd < 2000) {
  console.log("⚠️ Performance aceitável")
} else {
  console.log("❌ Performance ruim - otimizar")
}
```

### Exemplo 3: Validar LocalStorage

```javascript
// 1. Navegar para curso
mcp__chrome-devtools__navigate_page({ 
  url: "http://localhost:3000/curso/bash" 
})

// 2. Verificar localStorage
const keys = mcp__chrome-devtools__execute_js({ 
  script: "return Object.keys(localStorage)" 
})

console.log("Keys no localStorage:", keys)

// 3. Verificar progresso específico
const progress = mcp__chrome-devtools__execute_js({ 
  script: "return localStorage.getItem('ultrathink_progress_bash')" 
})

if (progress) {
  console.log("✅ Progresso salvo:", JSON.parse(progress))
} else {
  console.log("❌ Progresso não encontrado")
}
```

### Exemplo 4: Teste de Todas as Rotas

```javascript
const routes = [
  '/',
  '/curso/bash',
  '/curso/c',
  '/curso/rust',
  '/dashboard',
  '/admin'
]

for (const route of routes) {
  // Navegar
  mcp__chrome-devtools__navigate_page({ 
    url: `http://localhost:3000${route}` 
  })
  
  // Verificar erros
  const logs = mcp__chrome-devtools__get_console_logs()
  const errors = logs.filter(l => l.level === 'error')
  
  if (errors.length === 0) {
    console.log(`✅ ${route} - Sem erros`)
  } else {
    console.log(`❌ ${route} - ${errors.length} erros`)
  }
}
```

---

## 🐛 Troubleshooting

### "Connection refused" ou timeout

**Causa:** Chrome não está rodando com remote debugging

**Solução:**
```bash
# Verificar se Chrome debug está ativo
pgrep -f "remote-debugging-port=9222"

# Se não retornar PID, iniciar
mise run mcp:chrome

# Ou manual
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &
```

### "Target closed" durante navegação

**Causa:** Chrome fechou ou crashou

**Solução:**
```bash
# Reiniciar Chrome debug
mise run mcp:stop
mise run mcp:chrome
```

### Porta 9222 já em uso

**Causa:** Outra instância do Chrome está usando a porta

**Solução:**
```bash
# Matar todos os processos Chrome debug
pkill -f "remote-debugging-port=9222"

# Reiniciar
mise run mcp:chrome
```

### WSL2: Chrome não abre

**Causa:** Caminho do executável incorreto

**Solução:**
```bash
# Usar caminho completo do Windows
"/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-debug &
```

### Commands não aparecem no Factory Droid

**Verificar:**
1. `mcpEnabled: true` em `.factory/settings.json`
2. `npx` está em `allowedCommands`
3. Chrome DevTools MCP está na seção `mcpServers`

**Validar:**
```bash
cat .factory/settings.json | jq '.mcpServers."chrome-devtools"'
```

---

## 📚 Documentação Adicional

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Chrome DevTools MCP - GitHub](https://github.com/benjaminrsherman/chrome-devtools-mcp)
- [Remote Debugging Chrome](https://developer.chrome.com/docs/devtools/remote-debugging/)

---

## 🎓 Próximos Passos

1. **Testar conexão** - `mise run mcp:devtools`
2. **Navegar para app** - Usar comando `navigate_page`
3. **Ver console logs** - Identificar erros
4. **Analisar performance** - Obter métricas
5. **Criar testes automatizados** - Seguir [browser-testing.md](../commands/browser-testing.md)

---

**Mantido por:** Factory Droid Team  
**Última atualização:** 2026-01-20  
**Versão:** v1.0
