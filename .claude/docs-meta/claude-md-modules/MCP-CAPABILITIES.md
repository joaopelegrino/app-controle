# Capacidades MCP (Model Context Protocol)

**Módulo:** MCP-CAPABILITIES.md
**Parte de:** CLAUDE.md modularizado
**Última atualização:** 2025-11-17

---

## 🚀 Capacidades MCP (Model Context Protocol)

### Servidores MCP Configurados

**1. Chrome DevTools MCP** (Oficial Google)
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest",
               "--executable-path=/home/notebook/.cache/chrome-testing/chrome/..."]
    }
  }
}
```

**Capacidades:**
- 24 ferramentas disponíveis
- Navegação programática (navigate_page, list_pages)
- Screenshots (take_screenshot, take_snapshot)
- Interação com elementos (click, fill, hover, drag)
- Inspeção (console, network requests)
- Performance tracing
- Evaluate JavaScript

**Status:** ✅ Validado e funcional (VALIDACAO-MCP-CHROME-DEVTOOLS.md)

**2. Playwright MCP** (Microsoft)
```bash
npm install --save-dev playwright
npx playwright install chromium
```

**Capacidades:**
- Testes E2E automatizados
- Navegação headless ou com UI
- Multi-browser (Chromium, Firefox, WebKit)
- Scripts de teste (test-usabilidade-mcp.cjs)

**Status:** ✅ Instalado e testado

### Permissões Configuradas (.claude/settings.local.json)

**MCP Tools Permitidos:**
- `mcp__chrome-devtools__*` - Todas ferramentas Chrome DevTools
- `mcp__playwright__browser_navigate` - Navegação Playwright
- `mcp__playwright__browser_install` - Instalação browsers

**Bash Comandos Permitidos:**
- NPM: `npm install`, `npm run dev:*`, `npm run build:*`, `npm:*`
- Node: `node:*`, `npx playwright:*`, `npx chrome-devtools-mcp:*`
- Git: `git --version`
- Utilitários: `mkdir:*`, `curl:*`, `mv:*`, `ls:*`, `chmod:*`, `rm:*`, `find:*`, `cat:*`
- Python: `pip install:*`, `python3:*`, `python:*`
- Rede: `ss:*`, `pkill:*`, `kill:*`

**Web Fetch Permitido:**
- `docs.anthropic.com` - Documentação Claude Code
- `www.builder.io` - Recursos Builder
- `medium.com` - Artigos técnicos
- `www.youtube.com` - Vídeos educacionais
- `WebSearch` - Busca geral

**Configurações Especiais:**
- `outputStyle: "Learning"` - Modo educacional com insights
- `enableAllProjectMcpServers: true` - Habilita todos MCPs do projeto

---

**Última atualização:** 2025-11-17
**Responsável:** Modularização CLAUDE.md v1.0
**Status:** ✅ Completo
