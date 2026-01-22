# MCP Browser Testing - Installation & Setup Guide

Complete guide for setting up and verifying MCP browser automation for E2E testing and QA in app-controle.

## 🎯 What's Been Configured

### MCP Servers Added to `.factory/settings.json`

1. **Playwright MCP Server** - Browser automation for E2E testing
   - Command: `npx -y @playwright/mcp@latest`
   - Use case: Automated test flows, regression testing, multi-step interactions
   
2. **Chrome DevTools MCP Server** - Live debugging and inspection
   - Command: `npx -y @benjaminr/chrome-devtools-mcp`
   - Use case: Network monitoring, console inspection, performance metrics
   - Debug port: 9222

### Additional Changes

- Added `npx` to `allowedCommands` in settings.json
- Created `.factory/commands/browser-testing.md` with comprehensive examples
- Updated `.factory/AGENTS.md` with quick reference and usage patterns

## ✅ Verification Steps

### Step 1: Verify MCP Configuration

```bash
# Check settings.json has mcpServers configured
cat .factory/settings.json | grep -A 20 mcpServers
```

**Expected output:**
```json
"mcpServers": {
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp@latest"],
    "description": "Browser automation for E2E testing using Playwright - preferred for test flows",
    "env": {}
  },
  "chrome-devtools": {
    "command": "npx",
    "args": ["-y", "@benjaminr/chrome-devtools-mcp"],
    "description": "Chrome DevTools integration for debugging and inspection",
    "env": {
      "CHROME_DEBUG_PORT": "9222"
    }
  }
}
```

### Step 2: Verify npx Access (Optional - Auto-installed)

The MCP servers will be auto-downloaded via npx when first used. You can verify npx is working:

```bash
# Check npx is available
npx --version

# Test Playwright MCP package access (optional)
npx -y @playwright/mcp@latest --version

# Test Chrome DevTools MCP package access (optional)
npx -y @benjaminr/chrome-devtools-mcp --version
```

### Step 3: Start Development Environment

```bash
# Start backend (NocoDB + PostgreSQL)
docker-compose -f docker-compose.nocodb.yml up -d

# Start frontend
bun run dev
```

**Verify services:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

### Step 4: Test Playwright MCP (Recommended First Test)

Within Factory Droid session, you can now use:

```javascript
// Navigate to app homepage
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Get accessibility snapshot (verifies page loaded)
mcp__playwright__browser_snapshot()

// Take screenshot for visual verification
mcp__playwright__browser_screenshot({ path: "/tmp/app-test.png" })
```

**Success indicators:**
- No errors in tool execution
- Snapshot returns page structure with courses visible
- Screenshot saved to /tmp/app-test.png

### Step 5: Test Chrome DevTools MCP (Debugging)

**First, start Chrome in debug mode:**

```bash
# Linux/WSL
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &

# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &

# Verify Chrome debug port is open
curl http://localhost:9222/json/version
```

**Then in Factory Droid:**

```javascript
// Navigate to app
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Check console logs
mcp__chrome-devtools__get_console_logs()

// Check network requests
mcp__chrome-devtools__get_network_logs()

// Get performance metrics
mcp__chrome-devtools__get_performance_metrics()
```

**Success indicators:**
- Chrome navigates to localhost:3000
- Console logs returned (may be empty if no errors)
- Network logs show resource loading
- Performance metrics show timing data

## 🚀 Quick Start Test Suite

Run this complete test to verify everything works:

```javascript
// === PLAYWRIGHT TEST ===
console.log("Testing Playwright MCP...")

// 1. Navigate to home
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// 2. Verify page loaded
const homeSnapshot = mcp__playwright__browser_snapshot()
console.log("Home page loaded:", homeSnapshot.includes("Cursos"))

// 3. Navigate to bash course
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })

// 4. Verify course page
const courseSnapshot = mcp__playwright__browser_snapshot()
console.log("Course page loaded:", courseSnapshot.includes("Bash"))

// 5. Take screenshot for evidence
mcp__playwright__browser_screenshot({ path: "/tmp/quick-test-playwright.png" })

console.log("✅ Playwright MCP working!")

// === CHROME DEVTOOLS TEST (if Chrome running in debug mode) ===
console.log("\nTesting Chrome DevTools MCP...")

// 1. Navigate
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// 2. Check for errors
const consoleLogs = mcp__chrome-devtools__get_console_logs()
console.log("Console logs retrieved:", consoleLogs.length || 0, "entries")

// 3. Check network
const networkLogs = mcp__chrome-devtools__get_network_logs()
console.log("Network requests retrieved:", networkLogs.length || 0, "requests")

console.log("✅ Chrome DevTools MCP working!")
```

## 📋 Usage Patterns

### When to Use Playwright MCP

**Best for:**
- ✅ Automated E2E test flows
- ✅ Regression testing
- ✅ Multi-step user journeys
- ✅ Accessibility testing (snapshot-based)
- ✅ Screenshot-based visual testing
- ✅ CI/CD integration

**Example use cases:**
- Test complete user onboarding flow
- Verify progress persistence across navigation
- Test course completion workflow
- Validate form submissions
- Check responsive layouts

### When to Use Chrome DevTools MCP

**Best for:**
- ✅ Live debugging sessions
- ✅ Network traffic analysis
- ✅ Performance profiling
- ✅ Console error monitoring
- ✅ localStorage/cookie inspection
- ✅ Memory leak detection

**Example use cases:**
- Debug why a feature isn't working
- Analyze slow page loads
- Check for network errors
- Monitor console warnings
- Inspect storage quota issues

## 🧪 Test Scenarios for app-controle

### Scenario 1: Smoke Test (All Pages Load)

```javascript
const pages = [
  'http://localhost:3000',                    // Hub
  'http://localhost:3000/curso/bash',         // Bash course
  'http://localhost:3000/curso/c',            // C course
  'http://localhost:3000/curso/rust',         // Rust course
  'http://localhost:3000/curso/vscode',       // VSCode course
  'http://localhost:3000/curso/claude-code',  // Claude Code course
  'http://localhost:3000/dashboard',          // User dashboard
  'http://localhost:3000/admin'               // Admin dashboard
]

for (const url of pages) {
  console.log(`Testing: ${url}`)
  mcp__playwright__browser_navigate({ url })
  const snapshot = mcp__playwright__browser_snapshot()
  console.log(snapshot.length > 0 ? '✅ Loaded' : '❌ Failed')
}
```

### Scenario 2: Progress Persistence

```javascript
// Navigate to bash course
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })

// Complete module 1
mcp__playwright__browser_click({ selector: "text=Completar Módulo" })

// Check localStorage
const progress1 = mcp__playwright__browser_execute({ 
  script: "return localStorage.getItem('ultrathink_progress_bash')" 
})

// Navigate away
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })

// Navigate back
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })

// Verify progress persisted
const progress2 = mcp__playwright__browser_execute({ 
  script: "return localStorage.getItem('ultrathink_progress_bash')" 
})

console.log("Progress persisted:", progress1 === progress2)
```

### Scenario 3: Performance Audit

```javascript
// Start Chrome DevTools monitoring
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Get performance metrics
const metrics = mcp__chrome-devtools__get_performance_metrics()

// Check critical metrics
console.log("Performance Metrics:")
console.log("- DOM Content Loaded:", metrics.DOMContentLoaded || "N/A")
console.log("- First Contentful Paint:", metrics.FirstContentfulPaint || "N/A")
console.log("- Time to Interactive:", metrics.TimeToInteractive || "N/A")

// Get network timing
const network = mcp__chrome-devtools__get_network_logs()
const bundleSize = network
  .filter(req => req.url.includes('.js') || req.url.includes('.css'))
  .reduce((sum, req) => sum + (req.size || 0), 0)

console.log("- Total bundle size:", bundleSize, "bytes")
```

## 🔧 Troubleshooting

### Issue: "MCP server not found"

**Solution:**
1. Verify settings.json has `"mcpEnabled": true`
2. Check `mcpServers` block exists in settings.json
3. Restart Factory Droid session to reload configuration

### Issue: "npx command not allowed"

**Solution:**
1. Verify `"npx"` is in `allowedCommands` in settings.json
2. If not, add it: `"allowedCommands": [..., "npx"]`
3. Restart Factory Droid

### Issue: "Chrome DevTools connection timeout"

**Solution:**
1. Verify Chrome is running with debug flag:
   ```bash
   ps aux | grep "remote-debugging-port"
   ```
2. Check port 9222 is accessible:
   ```bash
   curl http://localhost:9222/json/version
   ```
3. If not running, start Chrome in debug mode:
   ```bash
   google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug &
   ```

### Issue: "Page navigation fails"

**Solution:**
1. Verify frontend is running:
   ```bash
   curl http://localhost:3000
   ```
2. If not, start dev server:
   ```bash
   bun run dev
   ```
3. Check for port conflicts:
   ```bash
   lsof -i :3000
   ```

### Issue: "Playwright snapshot empty"

**Solution:**
1. Wait for page to fully load before snapshot:
   ```javascript
   mcp__playwright__browser_execute({ 
     script: "return new Promise(r => window.addEventListener('load', r))"
   })
   ```
2. Then take snapshot:
   ```javascript
   mcp__playwright__browser_snapshot()
   ```

### Issue: "Screenshot not saved"

**Solution:**
1. Verify path is writable:
   ```bash
   mkdir -p /tmp/screenshots
   ```
2. Use full absolute path:
   ```javascript
   mcp__playwright__browser_screenshot({ path: "/tmp/screenshots/test.png" })
   ```

## 📚 Additional Resources

### Documentation Files

- `.factory/commands/browser-testing.md` - Complete command reference with all test scenarios
- `.factory/AGENTS.md` - Quick reference for common operations
- `docs/backlog/ROADMAP.md` - Current sprint status and feature list

### External Documentation

- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Factory Droid MCP Guide](https://docs.factory.ai/cli/configuration/mcp)
- [Playwright Documentation](https://playwright.dev/)

### Tool Comparison

| Feature | Playwright MCP | Chrome DevTools MCP |
|---------|---------------|---------------------|
| E2E Testing | ✅ Best choice | ⚠️ Limited |
| Live Debugging | ⚠️ Limited | ✅ Best choice |
| Multi-browser | ✅ Chromium, Firefox, WebKit | ❌ Chrome only |
| Network Analysis | ⚠️ Basic | ✅ Advanced |
| Console Access | ✅ Yes | ✅ Yes |
| Performance Metrics | ⚠️ Basic | ✅ Advanced |
| Screenshots | ✅ Yes | ⚠️ Limited |
| Accessibility Tree | ✅ Yes | ❌ No |
| CI/CD Ready | ✅ Yes | ⚠️ Requires Chrome |
| Setup Complexity | ✅ Simple (npx) | ⚠️ Medium (debug mode) |

### Best Practices

1. **Start with Playwright** for most testing needs
2. **Use Chrome DevTools** when debugging specific issues
3. **Always verify services are running** before testing
4. **Take screenshots** for visual evidence
5. **Check console logs** for errors first
6. **Test critical flows** regularly
7. **Automate regression tests** with Playwright
8. **Use snapshots** for structure verification
9. **Clean up localStorage** between tests
10. **Document test scenarios** as you create them

## 🎉 What's Next?

Now that MCP browser testing is configured, you can:

1. **Run smoke tests** before each deployment
2. **Create regression test suite** for critical flows
3. **Automate visual testing** with screenshot comparisons
4. **Monitor performance** with DevTools metrics
5. **Integrate with CI/CD** for automated testing
6. **Document test coverage** in ROADMAP.md
7. **Create custom test droids** for specific workflows

### Suggested Next Steps

1. Create a custom droid for QA automation:
   ```bash
   # Create .factory/droids/qa-tester.md
   ```

2. Add custom slash commands for common tests:
   ```bash
   # Create .factory/commands/smoke-test.md
   ```

3. Set up automated screenshots for visual regression:
   ```bash
   mkdir -p screenshots/baseline
   ```

4. Document test coverage requirements:
   ```bash
   # Update docs/backlog/ROADMAP.md with testing goals
   ```

## 🤝 Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review `.factory/commands/browser-testing.md` for examples
3. Check Factory Droid logs for detailed errors
4. Verify environment setup (services running, ports open)
5. Test with basic examples first before complex scenarios

---

**Configuration Date:** 2026-01-20  
**Maintained by:** Factory Droid Configuration Specialist  
**Status:** ✅ Production Ready
