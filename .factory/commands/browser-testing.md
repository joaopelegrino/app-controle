# Browser Testing & QA Commands

Custom commands for E2E testing and QA automation using MCP browser servers.

## Installation

The MCP servers are pre-configured in `.factory/settings.json`. No additional installation needed - they will be auto-loaded when Factory Droid starts.

### Manual Verification (if needed)

```bash
# Verify Playwright MCP is accessible
npx -y @playwright/mcp@latest --version

# Verify Chrome DevTools MCP is accessible  
npx -y @benjaminr/chrome-devtools-mcp --version
```

### Start Chrome in Debug Mode (for chrome-devtools MCP)

```bash
# Linux/WSL
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &

# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &
```

## Available MCP Servers

### 1. Playwright MCP (Preferred for E2E Testing)

**When to use:** Automated test flows, multi-step interactions, regression testing

**Available tools:**
- `mcp__playwright__browser_navigate` - Navigate to URL
- `mcp__playwright__browser_snapshot` - Get page accessibility tree
- `mcp__playwright__browser_click` - Click element by text or role
- `mcp__playwright__browser_type` - Type text into input fields
- `mcp__playwright__browser_select` - Select from dropdowns
- `mcp__playwright__browser_check` - Check/uncheck checkboxes
- `mcp__playwright__browser_screenshot` - Take visual screenshot
- `mcp__playwright__browser_execute` - Execute JavaScript

### 2. Chrome DevTools MCP (Preferred for Debugging)

**When to use:** Live debugging, network inspection, console monitoring

**Available tools:**
- `mcp__chrome-devtools__navigate_page` - Navigate to URL
- `mcp__chrome-devtools__take_snapshot` - Capture DOM snapshot
- `mcp__chrome-devtools__click` - Click element by UID
- `mcp__chrome-devtools__get_console_logs` - Read console output
- `mcp__chrome-devtools__get_network_logs` - Analyze network traffic
- `mcp__chrome-devtools__get_performance_metrics` - Performance data
- `mcp__chrome-devtools__execute_js` - Run JavaScript in console
- `mcp__chrome-devtools__get_storage` - Read localStorage/cookies

## Quick Start: Testing localhost:3000

### Basic Navigation Test (Playwright)

```javascript
// Navigate to app
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Take snapshot to verify page loaded
mcp__playwright__browser_snapshot()

// Click "Iniciar" button
mcp__playwright__browser_click({ selector: "text=Iniciar" })

// Verify navigation
mcp__playwright__browser_snapshot()
```

### Debug Live Session (Chrome DevTools)

```javascript
// 1. Start Chrome in debug mode first (see above)

// 2. Navigate to app
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// 3. Take snapshot
mcp__chrome-devtools__take_snapshot()

// 4. Check console for errors
mcp__chrome-devtools__get_console_logs()

// 5. Check network requests
mcp__chrome-devtools__get_network_logs()
```

## E2E Test Scenarios for app-controle

### Scenario 1: User Onboarding Flow

```javascript
// Navigate to home
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Verify hub loaded
const snapshot1 = mcp__playwright__browser_snapshot()
// Check for "Cursos Disponíveis" heading

// Click first course card
mcp__playwright__browser_click({ selector: "role=article" })

// Verify course page loaded
const snapshot2 = mcp__playwright__browser_snapshot()

// Click "Iniciar Curso" button
mcp__playwright__browser_click({ selector: "text=Iniciar Curso" })

// Verify lesson 1 loaded
const snapshot3 = mcp__playwright__browser_snapshot()

// Take screenshot for visual verification
mcp__playwright__browser_screenshot({ path: "/tmp/lesson-1.png" })
```

### Scenario 2: Progress Persistence Test

```javascript
// Navigate to course
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })

// Complete module 1
mcp__playwright__browser_click({ selector: "text=Completar Módulo" })

// Check localStorage for progress
const storage = mcp__playwright__browser_execute({ 
  script: "return localStorage.getItem('ultrathink_progress_bash')" 
})

// Navigate away
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Return to course
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })

// Verify progress persisted
const snapshot = mcp__playwright__browser_snapshot()
// Should show module 1 as completed
```

### Scenario 3: Notes Functionality Test

```javascript
// Navigate to course notes
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash/caderno" })

// Type note content
mcp__playwright__browser_type({ 
  selector: "role=textbox",
  text: "Teste de anotações - comandos básicos do bash"
})

// Save note (trigger auto-save)
mcp__playwright__browser_execute({ 
  script: "window.dispatchEvent(new Event('blur'))" 
})

// Verify localStorage
const notes = mcp__playwright__browser_execute({ 
  script: "return localStorage.getItem('bash-learning-notes')" 
})

// Navigate away and back
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash/caderno" })

// Verify notes persisted
const snapshot = mcp__playwright__browser_snapshot()
```

### Scenario 4: Dashboard Analytics Test

```javascript
// Complete progress in multiple courses
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })
mcp__playwright__browser_click({ selector: "text=Completar Módulo" })

mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/rust" })
mcp__playwright__browser_click({ selector: "text=Completar Módulo" })

// Navigate to dashboard
mcp__playwright__browser_navigate({ url: "http://localhost:3000/dashboard" })

// Verify progress cards appear
const snapshot = mcp__playwright__browser_snapshot()
// Should show progress for bash and rust

// Take screenshot for manual review
mcp__playwright__browser_screenshot({ path: "/tmp/dashboard-progress.png" })
```

### Scenario 5: Responsive Layout Test

```javascript
// Test mobile viewport
mcp__playwright__browser_execute({ 
  script: "window.innerWidth = 375; window.innerHeight = 667; window.dispatchEvent(new Event('resize'))"
})

mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_screenshot({ path: "/tmp/mobile-view.png" })

// Test tablet viewport
mcp__playwright__browser_execute({ 
  script: "window.innerWidth = 768; window.innerHeight = 1024; window.dispatchEvent(new Event('resize'))"
})

mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_screenshot({ path: "/tmp/tablet-view.png" })

// Test desktop viewport
mcp__playwright__browser_execute({ 
  script: "window.innerWidth = 1920; window.innerHeight = 1080; window.dispatchEvent(new Event('resize'))"
})

mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_screenshot({ path: "/tmp/desktop-view.png" })
```

## Performance Testing

### Measure Page Load Performance

```javascript
// Navigate to page
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Get performance metrics
const metrics = mcp__chrome-devtools__get_performance_metrics()

// Expected metrics:
// - DOMContentLoaded < 1s
// - FirstContentfulPaint < 1.5s
// - TimeToInteractive < 2s

// Check network waterfall
const network = mcp__chrome-devtools__get_network_logs()
// Verify no unnecessary requests
// Check bundle sizes
```

### Memory Leak Detection

```javascript
// Take initial heap snapshot
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
const heap1 = mcp__chrome-devtools__get_performance_metrics()

// Perform actions that might leak
for (let i = 0; i < 10; i++) {
  mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/curso/bash" })
  mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
}

// Take final heap snapshot
const heap2 = mcp__chrome-devtools__get_performance_metrics()

// Compare heap sizes (should not grow excessively)
```

## Accessibility Testing

### Check ARIA Labels and Roles

```javascript
// Navigate to page
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Get accessibility tree
const snapshot = mcp__playwright__browser_snapshot()

// Verify:
// - All interactive elements have roles
// - Images have alt text
// - Form inputs have labels
// - Headings form proper hierarchy
```

### Keyboard Navigation Test

```javascript
// Navigate to course
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })

// Simulate Tab key presses
mcp__playwright__browser_execute({ 
  script: "document.activeElement.focus(); document.activeElement.blur();"
})

// Verify focus indicators are visible
mcp__playwright__browser_screenshot({ path: "/tmp/focus-states.png" })
```

## Network Condition Testing

### Test on Slow Connection

```javascript
// Enable network throttling (Chrome DevTools)
mcp__chrome-devtools__execute_js({ 
  script: `
    await chrome.network.emulateNetworkConditions({
      offline: false,
      downloadThroughput: 50 * 1024, // 50kb/s
      uploadThroughput: 20 * 1024,   // 20kb/s
      latency: 500                   // 500ms
    })
  `
})

// Navigate and measure
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
const metrics = mcp__chrome-devtools__get_performance_metrics()

// Verify graceful degradation
```

### Test Offline Mode

```javascript
// Enable offline mode
mcp__chrome-devtools__execute_js({ 
  script: "await chrome.network.emulateNetworkConditions({ offline: true })"
})

// Try to navigate
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Verify error handling
const console = mcp__chrome-devtools__get_console_logs()
// Should show user-friendly offline message
```

## Regression Testing Checklist

Run before each release:

### Critical User Flows
- [ ] Hub loads and displays all active courses
- [ ] Course navigation works (all 5 courses)
- [ ] Progress saves to localStorage
- [ ] Progress loads from localStorage
- [ ] Notes save and persist
- [ ] Dashboard shows correct progress
- [ ] Admin dashboard loads (if authenticated)

### Cross-Browser Testing
- [ ] Chrome/Chromium (primary)
- [ ] Firefox (via Playwright)
- [ ] Safari/WebKit (via Playwright)

### Viewport Testing
- [ ] Mobile (375x667)
- [ ] Tablet (768x1024)
- [ ] Desktop (1920x1080)
- [ ] Ultra-wide (2560x1440)

### Performance Checks
- [ ] Page load < 2s
- [ ] No console errors
- [ ] No 404 network errors
- [ ] Bundle size < 500kb
- [ ] No memory leaks

### Accessibility Checks
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] ARIA labels present

## Custom Commands for QA

### Quick Smoke Test

Run basic health check:

```javascript
// 1. Load home
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
const home = mcp__playwright__browser_snapshot()

// 2. Load each course
const courses = ['bash', 'c', 'rust', 'vscode', 'claude-code']
for (const course of courses) {
  mcp__playwright__browser_navigate({ url: `http://localhost:3000/curso/${course}` })
  const snapshot = mcp__playwright__browser_snapshot()
  // Verify no errors
}

// 3. Load dashboards
mcp__playwright__browser_navigate({ url: "http://localhost:3000/dashboard" })
const dashboard = mcp__playwright__browser_snapshot()

// 4. Check console
const logs = mcp__playwright__browser_execute({ 
  script: "return console.error ? [] : window.consoleErrors || []" 
})
```

### Visual Regression Test

Take screenshots of all key pages:

```bash
# Create screenshots directory
mkdir -p /tmp/app-controle-screenshots

# Then run:
```

```javascript
const pages = [
  { url: '/', name: 'home' },
  { url: '/curso/bash', name: 'course-bash' },
  { url: '/curso/bash/aula/1', name: 'lesson-bash-1' },
  { url: '/curso/bash/caderno', name: 'notes-bash' },
  { url: '/dashboard', name: 'dashboard' },
  { url: '/trilha/programming-fundamentals', name: 'path' }
]

for (const page of pages) {
  mcp__playwright__browser_navigate({ url: `http://localhost:3000${page.url}` })
  mcp__playwright__browser_screenshot({ 
    path: `/tmp/app-controle-screenshots/${page.name}.png` 
  })
}
```

## Debugging Tips

### Common Issues

**MCP server not connecting:**
```bash
# Check if npx can access packages
npx -y @playwright/mcp@latest --version

# Verify Factory Droid settings
cat .factory/settings.json | grep -A 10 mcpServers
```

**Chrome DevTools timeout:**
```bash
# Ensure Chrome is running in debug mode
ps aux | grep "remote-debugging-port"

# Check port 9222 is open
curl http://localhost:9222/json/version
```

**Snapshot not showing elements:**
```javascript
// Wait for page to fully load
mcp__playwright__browser_execute({ 
  script: "return new Promise(resolve => window.addEventListener('load', resolve))"
})

// Then take snapshot
const snapshot = mcp__playwright__browser_snapshot()
```

### Verbose Logging

Enable debug output in MCP calls:

```javascript
// Add to environment before calling
process.env.DEBUG = 'mcp:*'
```

## Best Practices

1. **Always navigate first** - Don't assume page is loaded
2. **Use snapshots for verification** - More reliable than screenshots
3. **Handle async operations** - Wait for network/animations to settle
4. **Clean up localStorage** - Reset state between tests
5. **Use Playwright for automation** - More stable than DevTools for E2E
6. **Use DevTools for debugging** - Better inspection capabilities
7. **Take screenshots for evidence** - Visual proof of issues
8. **Test with realistic data** - Use actual course content
9. **Verify error states** - Test unhappy paths too
10. **Run tests in CI** - Automate regression testing

## Resources

- [Playwright MCP Documentation](https://github.com/microsoft/playwright-mcp)
- [Chrome DevTools MCP Documentation](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Factory Droid MCP Guide](https://docs.factory.ai/cli/configuration/mcp)
- [app-controle Testing Strategy](../../../docs/backlog/ROADMAP.md)

---

**Last Updated:** 2026-01-20  
**Maintained by:** Factory Droid Configuration Specialist
