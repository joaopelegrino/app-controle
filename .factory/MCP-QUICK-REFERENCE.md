# MCP Browser Testing - Quick Reference Card

Fast command reference for browser automation in app-controle. For complete documentation, see `.factory/commands/browser-testing.md`.

## 🚀 Quick Setup

```bash
# 1. Start services
docker-compose -f docker-compose.nocodb.yml up -d  # Backend
bun run dev                                        # Frontend

# 2. (Optional) Start Chrome in debug mode for DevTools MCP
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &

# 3. Use MCP commands in Factory Droid session (auto-configured)
```

## 📋 Essential Commands

### Playwright MCP (E2E Testing)

```javascript
// Navigate
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Get page structure
mcp__playwright__browser_snapshot()

// Click element
mcp__playwright__browser_click({ selector: "text=Iniciar Curso" })
mcp__playwright__browser_click({ selector: "role=button" })

// Type text
mcp__playwright__browser_type({ selector: "role=textbox", text: "Hello" })

// Execute JavaScript
mcp__playwright__browser_execute({ script: "return localStorage.getItem('key')" })

// Screenshot
mcp__playwright__browser_screenshot({ path: "/tmp/test.png" })
```

### Chrome DevTools MCP (Debugging)

```javascript
// Navigate
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Console logs
mcp__chrome-devtools__get_console_logs()

// Network requests
mcp__chrome-devtools__get_network_logs()

// Performance
mcp__chrome-devtools__get_performance_metrics()

// Execute JS
mcp__chrome-devtools__execute_js({ script: "console.log('test')" })

// Get storage
mcp__chrome-devtools__get_storage()
```

## 🎯 Common Test Patterns

### Test All Pages Load

```javascript
['/', '/curso/bash', '/curso/rust', '/dashboard'].forEach(path => {
  mcp__playwright__browser_navigate({ url: `http://localhost:3000${path}` })
  console.log(`${path}:`, mcp__playwright__browser_snapshot().length > 0 ? '✅' : '❌')
})
```

### Test Progress Persistence

```javascript
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })
mcp__playwright__browser_click({ selector: "text=Completar Módulo" })
const saved = mcp__playwright__browser_execute({ 
  script: "return localStorage.getItem('ultrathink_progress_bash')" 
})
console.log("Progress saved:", !!saved)
```

### Check for Errors

```javascript
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
const errors = mcp__chrome-devtools__get_console_logs()
  .filter(log => log.level === 'error')
console.log("Errors found:", errors.length)
```

### Performance Audit

```javascript
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
const metrics = mcp__chrome-devtools__get_performance_metrics()
console.log("Load time:", metrics.DOMContentLoaded || "N/A")
```

## 🔍 Selectors Guide

```javascript
// By text
{ selector: "text=Iniciar Curso" }

// By role
{ selector: "role=button" }
{ selector: "role=textbox" }
{ selector: "role=article" }

// By ID (if present)
{ selector: "#course-card-bash" }

// By class (if needed)
{ selector: ".course-card" }
```

## 📊 Testing Checklist

### Before Release
- [ ] All pages load (/, /curso/*, /dashboard, /admin)
- [ ] Progress persists after navigation
- [ ] Notes save and load correctly
- [ ] No console errors on any page
- [ ] Performance < 2s load time
- [ ] Works on mobile viewport
- [ ] All 5 courses accessible

### Run This Quick Test
```javascript
// 1. Navigate home
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// 2. Click first course
mcp__playwright__browser_click({ selector: "role=article" })

// 3. Complete module
mcp__playwright__browser_click({ selector: "text=Completar Módulo" })

// 4. Navigate away and back
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })

// 5. Verify progress persisted
const snapshot = mcp__playwright__browser_snapshot()
console.log("Module marked complete:", snapshot.includes("completed") || snapshot.includes("✓"))
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MCP not found | Check `.factory/settings.json` has `mcpServers` |
| npx not allowed | Add `"npx"` to `allowedCommands` |
| Chrome timeout | Start Chrome: `google-chrome --remote-debugging-port=9222 &` |
| Page not loading | Check: `curl http://localhost:3000` |
| Empty snapshot | Wait for load: `mcp__playwright__browser_execute({ script: "..." })` |

## 📚 Full Documentation

- **Complete examples:** `.factory/commands/browser-testing.md`
- **Setup guide:** `.factory/MCP-BROWSER-SETUP.md`
- **Quick reference:** `.factory/AGENTS.md` (MCP section)

## ⚡ One-Line Tests

```javascript
// Home loads
mcp__playwright__browser_navigate({url:"http://localhost:3000"}) && mcp__playwright__browser_snapshot().includes("Cursos")

// Course loads
mcp__playwright__browser_navigate({url:"http://localhost:3000/curso/bash"}) && mcp__playwright__browser_snapshot().includes("Bash")

// No errors
mcp__chrome-devtools__navigate_page({url:"http://localhost:3000"}) && mcp__chrome-devtools__get_console_logs().filter(l=>l.level==='error').length === 0
```

---

**Last Updated:** 2026-01-20  
**For detailed documentation, see:** `.factory/commands/browser-testing.md`
