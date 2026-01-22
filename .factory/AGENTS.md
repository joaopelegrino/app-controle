# app-controle (UltraThink)

Plataforma B2B de treinamento técnico corporativo - React SPA for technical training with modular courses.

## Core Commands

• Install dependencies: `bun install`
• Start dev server: `bun run dev` (http://localhost:3000)
• Run tests: `bun run test`
• Run tests with UI: `bun run test:ui`
• Run tests with coverage: `bun run test:coverage`
• Lint code: `bun run lint`
• Build production: `bun run build`
• Preview production: `bun run preview`
• Run single test: `bun run test <path-to-test-file>`

**ALWAYS use `bun` commands, never `npm` or `yarn`.**

## Environment Management

The project supports **mise** for automated environment setup (optional but recommended):

**If mise is configured** (`.mise.toml` exists):
```bash
# Setup once per machine
curl https://mise.jdx.dev/install.sh | sh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

# Enter project → automatic setup via hooks
cd app-controle

# Use mise tasks
mise run dev              # Dev server
mise run test             # Tests
mise run security         # Security scan
mise run help             # Show all commands
```

**Standard commands** (always work):
```bash
bun install
bun run dev
bun run test
```

**For details:** See `documentacao-interna/05-workflows/setup-ambiente-mise.md`

## Project Layout

```
app-controle/
├── src/
│   ├── components/         → React components (4-level hierarchy)
│   │   ├── HubView.jsx     → Main hub for courses and paths
│   │   ├── LearningPathView.jsx → Learning paths display
│   │   ├── GenericLearningSystem.jsx → Unified course component
│   │   ├── UserDashboard.jsx → User progress dashboard
│   │   └── AdminDashboard.jsx → Admin analytics dashboard
│   ├── data/               → Course definitions and content
│   │   ├── studyAreas.js   → Active courses configuration (SSOT)
│   │   └── *LearningData.js → Course content (flat structure)
│   ├── hooks/              → Custom React hooks
│   │   └── useModuleProgress.js → Progress persistence
│   ├── services/           → Abstraction layers
│   │   └── dataService.js  → localStorage operations
│   └── tests/              → Vitest test files
├── docs/                   → Project documentation
│   └── backlog/ROADMAP.md  → Current sprint status (SSOT)
├── .claude/                → Claude Code configuration
├── .factory/               → Factory Droid configuration
└── dist/                   → Production build output
```

**Key Files to Read Before Editing:**
1. `docs/backlog/ROADMAP.md` - Current sprint status and planning
2. `src/data/studyAreas.js` - Active courses
3. `CLAUDE.md` - Detailed coding guidelines
4. `.mise.toml` - Environment configuration (if exists)

## Development Patterns & Constraints

### Coding Style
• TypeScript-style JSDoc comments for props and complex functions
• Tailwind CSS for all styling (no inline styles, no CSS files)
• Conventional commits: `feat(scope):`, `fix(scope):`, `refactor(scope):`, etc.
• React 18.3 with hooks (no class components)
• React Router 6 for navigation

### Architecture Patterns
• **4-level component hierarchy:**
  1. Root: SistemaEducacionalCompleto.jsx (Routes + State)
  2. Views: HubView, LearningPathView, etc.
  3. Systems: GenericLearningSystem
  4. Subcomponents: NotesView, etc.

• **Data flow:**
  - studyAreas.js → Course definitions (active courses)
  - *LearningData.js → Course content (flat structure)
  - useModuleProgress → Progress persistence (localStorage)
  - dataService.js → Abstraction layer

• **Routing structure:**
  - `/` → Hub
  - `/curso/:id` → Course view
  - `/curso/:id/aula/:n` → Specific lesson
  - `/trilha/:id` → Learning path
  - `/curso/:id/caderno` → Course notebook
  - `/dashboard` → User dashboard
  - `/admin` → Admin dashboard

### localStorage Patterns
• All operations wrapped in try/catch
• Fallback to sessionStorage on QuotaExceededError
• Handle SecurityError (private browsing mode)
• 50KB limit per course notes
• Key format: `{courseId}-learning-notes` for notes
• Key format: `ultrathink_progress_{courseId}` for progress

### Testing Requirements
• ALWAYS run `bun run lint && bun run test` before committing
• Tests must pass before any PR
• Use Vitest for all tests
• Coverage threshold: aim for >80%

### Security & Best Practices
• NO console.log in production code (use only for development debugging)
• NO hardcoded API keys or secrets (use .env.example as template)
• ALWAYS check dependencies before adding new libraries
• Follow existing patterns instead of creating new ones

## Git Workflows

### Branching Strategy
• Main branch: `desenvolvimento` (development)
• Feature branches: `feature/US-XXX-description`
• Bug fixes: `fix/bug-description`
• Refactoring: `refactor/area`

### Commit Conventions
• Use conventional commits format
• Examples:
  - `feat(data): ativar 5 cursos em studyAreas (1.5.D)`
  - `fix(hooks): prevent race condition in useModuleProgress`
  - `refactor(componentes): migrar para GenericLearningSystem`
  - `docs(roadmap): mark US-XXX as complete`

### Pre-commit Checklist
1. Run `bun run lint`
2. Run `bun run test`
3. Verify changes with `git diff`
4. Write descriptive commit message
5. Check for sensitive data in diff

## Evidence Required for Every PR

A pull request is reviewable when it includes:
• All tests green (`bun run test`)
• Lint passes (`bun run lint`)
• Diff confined to agreed scope
• **Proof artifact:**
  - Bug fix → failing test added first, now passes
  - Feature → new tests demonstrating behavior
• One-paragraph commit description covering intent
• No drop in coverage
• No unexplained runtime dependencies

## Recent Architecture Changes (Fase 1.5)

✅ **Completed:**
- GenericLearningSystem replaces individual *LearningSystem components
- Flat data structure in *LearningData.js files (no nested phases.modules)
- 5 courses active: bash, c, rust, vscode, claude-code
- UserDashboard + AdminDashboard components implemented

## External Services

### Current State (Dual Persistence)

**Client-side:**
- localStorage: Student progress and notes (hooks: useModuleProgress, useAutoSaveNotes)
- Pattern: Hooks customizados with error handling
- Limite: 50KB per course notes

**Server-side (Branch: demo-nocodb-simple):**
- PostgreSQL 16 + NocoDB dashboard
- Purpose: Visual dashboard for non-technical personas (RH, Tech Leads, C-Level)
- Access: http://localhost:8080
- Setup: `docker-compose -f docker-compose.nocodb.yml up -d`
- Documentation: `docs/backend/NOCODB-QUICKSTART.md`

**Future integrations:**
- Full migration localStorage → PostgreSQL
- Backend API (VITE_API_URL in .env)
- Analytics (GA, Sentry)

## MCP Browser Testing & E2E Automation

**Status:** ✅ Fully configured - MCP servers ready to use

**Available MCP Servers:**
1. **Playwright MCP** - Primary E2E testing (automated flows, regression tests)
2. **Chrome DevTools MCP** - Debugging & inspection (network, console, performance)

### Quick Start

**Test app homepage (Playwright):**
```javascript
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_snapshot()  // Get accessibility tree
mcp__playwright__browser_screenshot({ path: "/tmp/homepage.png" })
```

**Debug with Chrome DevTools (requires Chrome in debug mode):**
```javascript
// First start: google-chrome --remote-debugging-port=9222 &
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
mcp__chrome-devtools__get_console_logs()  // Check for errors
mcp__chrome-devtools__get_network_logs()  // Analyze requests
mcp__chrome-devtools__get_performance_metrics()  // Performance data
```

### Common E2E Test Scenarios

**User onboarding flow:**
```javascript
mcp__playwright__browser_navigate({ url: "http://localhost:3000" })
mcp__playwright__browser_click({ selector: "role=article" })  // Click first course
mcp__playwright__browser_click({ selector: "text=Iniciar Curso" })
mcp__playwright__browser_snapshot()  // Verify lesson loaded
```

**Progress persistence test:**
```javascript
mcp__playwright__browser_navigate({ url: "http://localhost:3000/curso/bash" })
mcp__playwright__browser_click({ selector: "text=Completar Módulo" })
const storage = mcp__playwright__browser_execute({ 
  script: "return localStorage.getItem('ultrathink_progress_bash')" 
})
```

**For comprehensive examples and all testing scenarios, see:**
- `.factory/commands/browser-testing.md` - Complete QA command reference
- Includes: E2E flows, performance testing, accessibility checks, regression tests

### MCP Server Configuration

Configured in `.factory/settings.json`:
- **Playwright:** `npx -y @playwright/mcp@latest`
- **Chrome DevTools:** `npx -y @benjaminr/chrome-devtools-mcp` (port 9222)

No additional installation needed - servers auto-load with Factory Droid.

## Gotchas

• Bun is the primary runtime - always use `bun` commands
• React Router 6 uses `useNavigate()` hook (not history API)
• localStorage has quota limits - implement fallback strategies
• Tailwind purge config affects production builds
• vitest.config.js must include `globals: true` for test utilities

## Documentation Files to Avoid Creating

• DO NOT create: RESUMO-*, ATUALIZACAO-FINAL-*, or similar summary files
• DO NOT add unnecessary documentation files
• Update existing docs instead of creating new ones
• Keep docs concise and actionable

## Time Estimates Policy

• NEVER use time estimates (days, weeks, months) in planning
• Use task completion states instead: [L] [M] [H] [D]
  - [L] Low complexity (simple, atomic task)
  - [M] Medium complexity (requires planning)
  - [H] High complexity (multi-step, research needed)
  - [D] Done (completed and verified)

## Session Start Protocol

At the start of every session, read these files for context:
1. `docs/backlog/ROADMAP.md` - Current sprint status (SSOT)
2. `src/data/studyAreas.js` - Active courses
3. This AGENTS.md file

## Stack & Runtime

• **Frontend:** React 18.3 + Vite 5.4 + Tailwind 3.4 + React Router 6
• **Runtime:** Bun 1.3.3 (primary) | Node.js 24+ (fallback via mise)
• **Testing:** Vitest
• **Linting:** ESLint
• **Package Manager:** Bun (DO NOT use npm or yarn)

---

*For full context and detailed guidelines, see `/home/notebook/workspace/app-controle/CLAUDE.md`*
