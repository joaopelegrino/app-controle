# MCP Browser - app-controle

**Status:** ✅ Configurado e funcional  
**Versão:** v1.0  
**Data:** 2026-01-20

---

## 📋 Visão Geral

Este projeto utiliza **2 MCPs complementares** para automação de browser:

| MCP | Foco | Quando Usar | Status |
|-----|------|-------------|--------|
| **Playwright MCP** | Automação, testes E2E | Testes automatizados, validação de fluxos | ✅ Configurado |
| **Chrome DevTools MCP** | Debug, inspeção, performance | Desenvolvimento, encontrar bugs visuais | ✅ Configurado |

---

## 🚀 Quick Start

### Ativar Chrome DevTools

```bash
# Opção 1: Com mise (recomendado)
mise run mcp:chrome

# Opção 2: Manual
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &
```

### Testar Conexão

```bash
# Verificar se Chrome DevTools está ativo
curl -s http://127.0.0.1:9222/json/version

# Se retornar JSON com "Browser", "Protocol-Version" = ✅ Funcionando
```

### Usar no Factory Droid

```javascript
// Playwright MCP (automação)
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_snapshot()
mcp__playwright__browser_screenshot({ path: "/tmp/test.png" })

// Chrome DevTools MCP (debug)
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
mcp__chrome-devtools__get_console_logs()
mcp__chrome-devtools__get_network_logs()
mcp__chrome-devtools__get_performance_metrics()
```

---

## 📊 Comparativo: Playwright vs Chrome DevTools

### Casos de Uso

| Cenário | Use Playwright | Use Chrome DevTools | Motivo |
|---------|---------------|---------------------|--------|
| Testes E2E automatizados | ✅ | ❌ | Melhor para fluxos completos |
| Debug de erro no console | ❌ | ✅ | Acesso direto ao DevTools |
| Screenshots para docs | ✅ | ✅ | Ambos funcionam bem |
| Performance profiling | ❌ | ✅ | Métricas Core Web Vitals |
| Click em elementos | ✅ | ⚠️ | Playwright tem melhor API |
| Network inspection | ⚠️ | ✅ | DevTools tem mais detalhes |
| Responsive testing | ✅ | ✅ | Ambos suportam viewports |

### Recomendação por Fase

| Fase do Desenvolvimento | MCP Recomendado | Justificativa |
|------------------------|-----------------|---------------|
| **Implementação inicial** | Nenhum | Focus no código |
| **Testes de integração** | Playwright | Automação de fluxos |
| **Debug de bugs visuais** | Chrome DevTools | Inspeção detalhada |
| **Otimização performance** | Chrome DevTools | Métricas precisas |
| **Validação pré-release** | Ambos | Cobertura completa |

---

## 🔧 Configuração

### settings.json (SSOT)

Localização: `.factory/settings.json`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "description": "Browser automation for E2E testing",
      "env": {}
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@benjaminr/chrome-devtools-mcp"],
      "description": "Chrome DevTools integration",
      "env": {
        "CHROME_DEBUG_PORT": "9222"
      }
    }
  }
}
```

### .mise.toml (Tasks)

**RECOMENDADO:** Adicionar tasks mise para facilitar uso:

```toml
[tasks."mcp:chrome"]
description = "Iniciar Chrome com remote debugging (porta 9222)"
run = "google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &"

[tasks."mcp:devtools"]
description = "Testar conexão Chrome DevTools"
run = "curl -s http://127.0.0.1:9222/json/version | jq ."

[tasks."mcp:validate"]
description = "Validar MCPs configurados"
run = '''
echo "🔍 Validando MCPs..."
echo ""
echo "✅ Playwright MCP:"
npx -y @playwright/mcp@latest --version 2>&1 | head -1
echo ""
echo "✅ Chrome DevTools MCP:"
npx -y @benjaminr/chrome-devtools-mcp --version 2>&1 | head -1
echo ""
echo "🌐 Chrome Debug Port:"
curl -s http://127.0.0.1:9222/json/version >/dev/null && echo "  ✅ Ativo (porta 9222)" || echo "  ❌ Inativo - Execute: mise run mcp:chrome"
'''

[tasks."mcp:stop"]
description = "Parar Chrome debug"
run = "pkill -f 'remote-debugging-port=9222'"
```

**Adicionar ao .mise.toml:**
```bash
cat >> .mise.toml << 'EOF'

# ========================================
# MCP Browser Tasks
# ========================================

[tasks."mcp:chrome"]
description = "Iniciar Chrome com remote debugging (porta 9222)"
run = "google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &"

[tasks."mcp:devtools"]
description = "Testar conexão Chrome DevTools"
run = "curl -s http://127.0.0.1:9222/json/version | jq ."

[tasks."mcp:validate"]
description = "Validar MCPs configurados"
run = '''
echo "🔍 Validando MCPs..."
echo ""
echo "✅ Playwright MCP:"
npx -y @playwright/mcp@latest --version 2>&1 | head -1
echo ""
echo "✅ Chrome DevTools MCP:"
npx -y @benjaminr/chrome-devtools-mcp --version 2>&1 | head -1
echo ""
echo "🌐 Chrome Debug Port:"
curl -s http://127.0.0.1:9222/json/version >/dev/null && echo "  ✅ Ativo (porta 9222)" || echo "  ❌ Inativo - Execute: mise run mcp:chrome"
'''

[tasks."mcp:stop"]
description = "Parar Chrome debug"
run = "pkill -f 'remote-debugging-port=9222'"
EOF
```

---

## 🎯 Fluxo de Trabalho Recomendado

### 1. Desenvolvimento de Funcionalidade

```bash
# Sem MCP - focus no código
bun run dev
```

### 2. Teste Manual com Chrome DevTools

```bash
# Iniciar Chrome debug
mise run mcp:chrome

# Abrir app no browser
# http://localhost:3000

# No Factory Droid:
# "Conecte ao Chrome DevTools e analise erros de console"
# "Tire screenshot da página atual"
```

### 3. Testes E2E Automatizados

```javascript
// No Factory Droid - usar Playwright MCP
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_click({ selector: "text=Iniciar Curso" })
mcp__playwright__browser_snapshot()
```

### 4. Debug de Performance

```javascript
// No Factory Droid - usar Chrome DevTools
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
mcp__chrome-devtools__get_performance_metrics()
```

---

## 🐛 Troubleshooting

### Chrome DevTools não conecta

**Sintoma:** `Connection refused` ou timeout

**Solução:**
```bash
# 1. Verificar se Chrome está rodando com debug
pgrep -f "remote-debugging-port=9222"

# 2. Se não estiver, iniciar
mise run mcp:chrome

# 3. Testar conexão
mise run mcp:devtools

# 4. Se WSL2, pode precisar de caminho completo
"/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-debug &
```

### Porta 9222 já em uso

```bash
# Parar todos os processos Chrome debug
mise run mcp:stop

# Ou manual
pkill -f "remote-debugging-port"

# Reiniciar
mise run mcp:chrome
```

### MCP não aparece no Factory Droid

**Verificar:**
1. `cat .factory/settings.json | jq '.mcpServers'`
2. `npx` está em `allowedCommands`?
3. `mcpEnabled: true` no settings.json?

**Solução:**
```bash
# Validar tudo
mise run mcp:validate
```

### Playwright falha ao instalar browser

```bash
# Instalar Chromium manualmente
npx playwright install chromium

# Verificar
npx playwright --version
```

---

## 📚 Documentação Completa

| Documento | Conteúdo | Quando Consultar |
|-----------|----------|------------------|
| [browser-devtools.md](./browser-devtools.md) | Referência Chrome DevTools | Setup inicial, troubleshooting |
| [playwright-mcp.md](./playwright-mcp.md) | Referência Playwright | Testes E2E, automação |
| [../commands/browser-testing.md](../commands/browser-testing.md) | Exemplos práticos | Codar testes |
| [../MCP-QUICK-REFERENCE.md](../MCP-QUICK-REFERENCE.md) | Comandos rápidos | Consulta rápida |
| [../MCP-BROWSER-SETUP.md](../MCP-BROWSER-SETUP.md) | Guia completo setup | Primeira configuração |

---

## ✅ Checklist de Validação

```bash
# Executar validação completa
mise run mcp:validate
```

**Resultado esperado:**
```
🔍 Validando MCPs...

✅ Playwright MCP:
Version 0.0.56

✅ Chrome DevTools MCP:
chrome-devtools-mcp@1.0.0

🌐 Chrome Debug Port:
  ✅ Ativo (porta 9222)
```

---

## 🎓 Próximos Passos

1. **Adicionar tasks mise** - Executar comandos acima para adicionar ao `.mise.toml`
2. **Testar Chrome DevTools** - `mise run mcp:chrome` e validar conexão
3. **Criar teste E2E** - Seguir [browser-testing.md](../commands/browser-testing.md)
4. **Documentar casos específicos** - Adicionar exemplos do projeto

---

**Mantido por:** Factory Droid Team  
**Última atualização:** 2026-01-20  
**Versão:** v1.0
