# Factory Droid Configuration

This directory contains configuration files for **Factory Droid CLI**, an AI-powered coding agent designed to assist with development tasks.

## Directory Structure

```
.factory/
├── AGENTS.md                 # Main instructions for AI agents (300+ lines)
├── settings.json             # CLI settings and preferences
├── README.md                 # This file
├── droids/                   # Custom subagents (droids)
│   ├── code-reviewer.md      # Code review droid
│   ├── security-auditor.md   # Security audit droid
│   └── test-specialist.md    # Testing specialist droid
├── commands/                 # Custom slash commands
│   ├── quick-audit.md        # Quick health check
│   ├── full-coverage.md      # Coverage report generator
│   └── pr-ready.md           # Pre-PR checklist
└── relatorios/               # Audit reports
    └── auditoria-forense-completa-2026-01-20.md
```

## Quick Start

### 1. Using Factory Droid CLI

```bash
# Start interactive session
droid

# Run specific command
droid "Check if my changes are ready for PR"

# Use custom droid
droid "Use code-reviewer to review my staged changes"
```

### 2. Custom Droids (Subagents)

Five specialized droids are available:

#### a) code-reviewer
**Purpose:** Review code for correctness, tests, security, and conventions  
**Usage:**
```
"Use code-reviewer droid to review my last commit"
"Run code-reviewer on src/components/GenericLearningSystem.jsx"
```

#### b) security-auditor
**Purpose:** Security audits focusing on secrets, vulnerabilities, best practices  
**Usage:**
```
"Use security-auditor to scan the codebase"
"Run security-auditor on the .env files"
```

#### c) test-specialist
**Purpose:** Create, review, and improve test coverage  
**Usage:**
```
"Use test-specialist to create tests for src/hooks/useModuleProgress.js"
"Ask test-specialist to analyze current coverage"
```

#### d) factory-config-specialist
**Purpose:** Diagnose, optimize, and evolve Factory Droid CLI configurations  
**Usage:**
```
"Use factory-config-specialist to analyze my configuration"
"Suggest MCP servers for this project"
"Review my settings.json and optimize"
```

#### e) docs-engineer ⭐ NEW!
**Purpose:** Generate LLM-friendly technical documentation for internal use  
**Usage:**
```
"Use docs-engineer to document the GenericLearningSystem component"
"Generate context documentation for frontend development"
"Create workflow documentation for adding a new course"
"Document the architecture of the learning system"
```

#### f) dev-environment-specialist ⭐ NEW!
**Purpose:** Setup and maintain development environment with mise  
**Usage:**
```
"Use dev-environment-specialist to setup mise for this project"
"Validate environment and fix any issues"
"Add new task to .mise.toml"
"Troubleshoot environment problems"
```

### 3. Custom Commands

Three custom commands are available via `/command-name`:

#### `/quick-audit`
Fast health check: audit, lint, test, git status

#### `/full-coverage`
Generate detailed coverage report with recommendations

#### `/pr-ready`
Comprehensive pre-PR checklist and validation

## AGENTS.md

The `AGENTS.md` file is the **primary instruction document** for AI agents. It contains:

- ✅ Core Commands (all bun commands)
- ✅ Project Layout (directory structure)
- ✅ Development Patterns & Constraints
- ✅ Coding Style (Tailwind, JSDoc, Conventional Commits)
- ✅ Git Workflows (branching, commits, PR requirements)
- ✅ Architecture Patterns (4-level hierarchy, data flow)
- ✅ localStorage Patterns (error handling, quotas)
- ✅ Testing Requirements
- ✅ Security & Best Practices

**When to update AGENTS.md:**
- Adding new dependencies
- Changing project structure
- Updating coding conventions
- Adding new commands or scripts
- Changing architecture patterns

## Settings.json

Configuration for Factory Droid CLI behavior:

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "autonomyLevel": "medium",
  "requireTestsForPR": true,
  "requireLintForPR": true,
  "commitConvention": "conventional"
}
```

**Key settings:**
- `autonomyLevel`: "low" | "medium" | "high" - how autonomous the agent is
- `requireTestsForPR`: Enforce test requirement before PR
- `requireLintForPR`: Enforce lint pass before PR
- `commitConvention`: "conventional" | "free" - commit message format

## Creating Custom Droids

To create a new droid:

1. **Via CLI:**
   ```bash
   droid
   # Then: /droids → Create a new Droid
   ```

2. **Manually:**
   Create a new `.md` file in `droids/` with this structure:

   ```markdown
   ---
   name: my-droid
   description: What this droid does
   model: inherit
   tools: read-only
   ---

   Instructions for the droid...
   ```

3. **Fields:**
   - `name`: Lowercase, hyphenated identifier
   - `description`: Brief description (max 500 chars)
   - `model`: "inherit" or specific model ID
   - `tools`: "read-only" | "edit" | "execute" | "web" | array of tool names

## Creating Custom Commands

To create a new command:

1. Create a `.md` file in `commands/` with the command name
2. Write instructions in Markdown
3. Use the command with `/command-name` in droid CLI

**Example:** `commands/my-command.md`
```markdown
# My Command

Description of what the command does.

## Usage

/my-command

## Steps

1. Do this
2. Then this
3. Finally this
```

## Integration with .claude/

This `.factory/` configuration complements the existing `.claude/` directory:

| Feature | .claude/ | .factory/ |
|---------|----------|-----------|
| Target Tool | Claude Code (claude.ai) | Factory Droid CLI |
| Main Config | .claude/CLAUDE.md | .factory/AGENTS.md |
| Agents/Droids | .claude/agents/ | .factory/droids/ |
| Commands | .claude/commands/ | .factory/commands/ |
| Skills | .claude/skills/ | (future) |

**Both can coexist** without conflicts. Use:
- `.claude/` for Claude Code at claude.ai
- `.factory/` for Factory Droid CLI

## Common Workflows

### Starting a New Feature

```bash
# 1. Run quick audit
droid "/quick-audit"

# 2. Create feature branch
git checkout -b feature/US-XXX-description

# 3. Read ROADMAP for context
cat docs/backlog/ROADMAP.md

# 4. Start development with droid
droid "Help me implement feature X according to AGENTS.md"
```

### Before Creating PR

```bash
# 1. Check PR readiness
droid "/pr-ready"

# 2. Run code review
droid "Use code-reviewer to review my staged changes"

# 3. Generate coverage report
droid "/full-coverage"

# 4. If all passes, create PR
git push -u origin feature/US-XXX-description
```

### Security Audit

```bash
# Run comprehensive security audit
droid "Use security-auditor to scan the entire codebase"

# Or focus on specific area
droid "Use security-auditor to check src/services/ for vulnerabilities"
```

### Improving Test Coverage

```bash
# 1. Generate coverage report
bun run test:coverage

# 2. Ask test-specialist for help
droid "Use test-specialist to create tests for uncovered files"

# 3. Run tests again
bun run test
```

## Troubleshooting

### Droid not reading AGENTS.md

**Solution:** AGENTS.md should be at project root or in `.factory/`. Check file location.

### Custom droid not appearing

**Solution:** 
1. Check droid file format (YAML frontmatter + body)
2. Verify `name` field is valid (lowercase, hyphenated)
3. Restart droid CLI
4. Run `/droids` to reload

### Command not working

**Solution:**
1. Check command file is in `.factory/commands/`
2. File should be `.md` format
3. Use `/command-name` (lowercase, without .md extension)

### Settings not taking effect

**Solution:**
1. Check `settings.json` is valid JSON
2. Restart droid CLI
3. Run `/settings` to verify current configuration

## Best Practices

1. **Keep AGENTS.md updated**: Update when changing project structure or conventions
2. **Document droids**: Add clear descriptions and usage examples
3. **Test custom droids**: Verify they work as expected before relying on them
4. **Version control**: Commit `.factory/` to git (except logs if any)
5. **Review regularly**: Update settings and droids based on team feedback

## Advanced Configuration

Once you're comfortable with the basics, explore these advanced features to enhance your Factory Droid CLI experience.

### 1. Model Context Protocol (MCP)

**What it is:** Extend droid's capabilities with 40+ specialized servers for tools and integrations.

**Popular MCP Servers:**

| Server | Purpose | Add Command |
|--------|---------|-------------|
| **Linear** | Issue tracking | `droid mcp add linear https://mcp.linear.app/mcp --type http` |
| **Notion** | Documentation | `droid mcp add notion https://mcp.notion.com/mcp --type http` |
| **Sentry** | Error monitoring | `droid mcp add sentry https://mcp.sentry.dev/mcp --type http` |
| **Playwright** | E2E testing | `droid mcp add playwright "npx -y @playwright/mcp@latest"` |
| **Stripe** | Payments | `droid mcp add stripe https://mcp.stripe.com --type http` |

**Quick Setup:**
```bash
# Interactive manager
droid
# Type: /mcp → Add from Registry

# Or via CLI
droid mcp add <name> <url> --type http
```

**For app-controle:**
```bash
# Add Playwright for E2E testing
droid mcp add playwright "npx -y @playwright/mcp@latest"

# Add Sentry if using error tracking
droid mcp add sentry https://mcp.sentry.dev/mcp --type http
```

**Configuration Files:**
- **User-level:** `~/.factory/mcp.json` (your personal servers)
- **Project-level:** `.factory/mcp.json` (shared with team, commit to git)

**Learn more:** [MCP Documentation](https://docs.factory.ai/cli/configuration/mcp)

---

### 2. Mixed Models (Different Models for Planning vs. Coding)

**What it is:** Use a more powerful model for Specification Mode planning, while keeping a faster model for regular coding.

**Common Configurations:**

**Budget-Conscious:**
- Default: `haiku-4.5` (fast, cheap)
- Spec Mode: `sonnet-4.5` (thorough planning)

**Performance-Focused:**
- Default: `sonnet-4.5` (balanced)
- Spec Mode: `sonnet-4.5` with high reasoning (deep analysis)

**Setup:**
```bash
droid
# Type: /model → Configure Spec Mode Model
# Select your preferred model for planning
# Choose reasoning effort (off/low/medium/high)
```

**Model Compatibility Rules:**
- OpenAI models → can only pair with OpenAI models
- Anthropic models (reasoning on) → can only pair with Anthropic models
- Anthropic models (reasoning off) → can pair with non-OpenAI models

**When to use:**
- Complex features: Use powerful model for spec, faster for implementation
- Simple tasks: Use same model for both
- Cost optimization: Reserve premium models for critical planning

**Learn more:** [Mixed Models Documentation](https://docs.factory.ai/cli/configuration/mixed-models)

---

### 3. Auto-Run Mode (Autonomy Levels)

**What it is:** Control how much autonomy droid has to execute commands without asking.

**Autonomy Levels:**

| Level | Auto-Executes | Example Commands |
|-------|---------------|------------------|
| **Auto (Low)** | File edits + read-only commands | `Edit`, `Create`, `ls`, `git status`, `rg` |
| **Auto (Medium)** | Low + reversible workspace changes | `bun install`, `git commit`, `mv`, `cp`, builds |
| **Auto (High)** | Medium + all non-blocked commands | `docker compose up`, `git push`, migrations |

**How to Switch:**
```bash
# Press Shift+Tab to cycle through:
# Normal → Spec → Auto (Low) → Auto (Medium) → Auto (High) → Normal
```

**Or set default in settings:**
```bash
droid
# Type: /settings → Set autonomy level
```

**Best Practices:**
- Start with **Normal** or **Auto (Low)** for new work
- Use **Auto (Medium)** for regular feature development
- Use **Auto (High)** for trusted pipelines and automation
- **Interrupt anytime** with ESC key

**Safety Interlocks (always prompt, even in Auto High):**
- Dangerous patterns: `rm -rf /`, `sudo rm -rf`, `dd of=/dev/*`
- Command substitution: `$(...)`, backticks
- Blocked commands in settings.json

**Learn more:** [Auto-Run Documentation](https://docs.factory.ai/cli/user-guides/auto-run)

---

### 4. Bring Your Own Key (BYOK)

**What it is:** Use your own API keys for Anthropic, OpenAI, or other model providers.

**Why use BYOK:**
- Control costs directly
- Use custom models not in Factory catalog
- Comply with corporate policies
- Access beta models

**Setup:**
```bash
# Edit config file
nano ~/.factory/config.json

# Add provider configuration
{
  "customModels": [
    {
      "provider": "anthropic",
      "model": "claude-sonnet-4.5-20250929",
      "model_display_name": "My Claude Sonnet",
      "api_key": "sk-ant-..."
    }
  ]
}
```

**Supported Providers:**
- Anthropic (Claude models)
- OpenAI (GPT models)
- OpenRouter (access multiple providers)
- Fireworks AI
- Ollama (local models)
- Google Gemini
- And more...

**Learn more:** [BYOK Documentation](https://docs.factory.ai/cli/byok/overview)

---

### 5. IDE Integration

**What it is:** Use Factory Droid directly from VSCode or JetBrains IDEs.

**Installation:**

**VS Code:**
```bash
# Install extension
code --install-extension factory.droid-vscode
```

**JetBrains (IntelliJ, WebStorm, etc.):**
```bash
# Install plugin from marketplace
# Search for "Factory Droid"
```

**Features:**
- Context-aware assistance (current file, selection)
- Inline code suggestions
- Quick access to droids and commands
- Terminal integration

**Learn more:** [IDE Integration Documentation](https://docs.factory.ai/cli/configuration/ide-integrations)

---

### 6. Custom Slash Commands (Advanced)

**What they are:** Executable scripts that can run complex workflows.

**Creating Executable Commands:**

```bash
# Create executable command
cat > .factory/commands/deploy-staging.sh << 'EOF'
#!/bin/bash
# Deploy to staging environment

set -e

echo "Running pre-deployment checks..."
bun run lint
bun run test

echo "Building for staging..."
bun run build

echo "Deploying to staging..."
# Add your deployment commands here

echo "✅ Deployed to staging!"
EOF

chmod +x .factory/commands/deploy-staging.sh
```

**Usage:**
```bash
droid "/deploy-staging"
```

**Markdown Commands (Documentation):**
Create `.md` files for documentation-style commands (like existing quick-audit.md).

**Learn more:** [Custom Commands Documentation](https://docs.factory.ai/cli/configuration/custom-slash-commands)

---

### 7. Hooks and Automations

**What they are:** Automate actions based on events (pre-commit, post-merge, etc.).

**Example: Pre-commit Hook**

```bash
# Create .factory/hooks/pre-commit.sh
#!/bin/bash

echo "Running pre-commit checks..."

# Run linter
bun run lint || exit 1

# Run tests
bun run test || exit 1

# Check for secrets
if git diff --cached | grep -iE "(password|secret|api_key|token)" ; then
  echo "⚠️  Possible secret detected! Review before committing."
  exit 1
fi

echo "✅ Pre-commit checks passed!"
```

**Git Hooks Integration:**
```bash
# Link to git hooks
ln -s ../../.factory/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

---

### 8. Specification Mode (Advanced Usage)

**What it is:** Plan features thoroughly before implementation.

**Advanced Workflow:**

1. **Activate Spec Mode:** `Shift+Tab`
2. **Provide detailed requirements**
3. **Droid generates comprehensive spec**
4. **Choose implementation mode:**
   - Normal (manual approval for each step)
   - Auto (Low/Medium/High) for autonomous implementation

**Best for:**
- Complex features with multiple components
- Architectural changes
- Features requiring multiple file changes
- Code migrations and refactoring

**With Mixed Models:**
Use a more powerful model for spec generation, then switch to faster model for implementation.

**Learn more:** [Specification Mode Documentation](https://docs.factory.ai/cli/user-guides/specification-mode)

---

### 9. Advanced Settings Configuration

**Location:** `.factory/settings.json`

**Advanced Options:**

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "reasoningEffort": "medium",
  "autonomyLevel": "medium",
  "diffMode": "unified",
  "cloudSessionSync": true,
  "soundNotifications": false,
  
  "allowedCommands": [
    "bun", "git", "grep", "find", "cat", "ls", "pwd"
  ],
  
  "deniedCommands": [
    "sudo", "rm -rf /", "dd", "mkfs"
  ],
  
  "customDroidsEnabled": true,
  "mcpEnabled": true,
  
  "fileIgnorePatterns": [
    "node_modules/**",
    "dist/**",
    "coverage/**"
  ],
  
  "maxFileSize": 1048576,
  "requireTestsForPR": true,
  "requireLintForPR": true,
  "commitConvention": "conventional"
}
```

**Key Advanced Settings:**
- `reasoningEffort`: "off" | "low" | "medium" | "high"
- `autonomyLevel`: "low" | "medium" | "high"
- `diffMode`: "unified" | "split"
- `cloudSessionSync`: Sync sessions across devices
- `allowedCommands`: Whitelist of safe commands
- `deniedCommands`: Blacklist of dangerous commands

---

## Next Steps for Advanced Configuration

### Week 1: Foundations
- [ ] Set up MCP servers (Playwright for testing)
- [ ] Configure Auto-Run Mode (start with Low)
- [ ] Try Specification Mode on a small feature

### Week 2: Optimization
- [ ] Configure Mixed Models (if beneficial)
- [ ] Create custom executable commands
- [ ] Set up pre-commit hooks

### Week 3: Mastery
- [ ] Explore BYOK for cost optimization
- [ ] Install IDE integration
- [ ] Create advanced automation workflows

### Ongoing: Use the factory-config-specialist droid
```bash
droid "Use factory-config-specialist to analyze my current configuration and suggest improvements"
```

---

## Documentation

- [Factory Droid Documentation](https://docs.factory.ai/)
- [AGENTS.md Specification](https://docs.factory.ai/cli/configuration/agents-md)
- [Custom Droids Guide](https://docs.factory.ai/cli/configuration/custom-droids)
- [Custom Commands Guide](https://docs.factory.ai/cli/configuration/custom-slash-commands)
- [MCP Documentation](https://docs.factory.ai/cli/configuration/mcp)
- [Mixed Models Guide](https://docs.factory.ai/cli/configuration/mixed-models)
- [Auto-Run Mode](https://docs.factory.ai/cli/user-guides/auto-run)

## Support

For issues or questions:
- Check Factory Droid documentation
- Review audit report in `relatorios/`
- Ask droid directly: `droid "How do I use custom droids?"`
- Use factory-config-specialist droid for configuration help

---

---

## 🆕 Branch: demo-nocodb-simple (2026-01-22) ✅ ACTIVE

**Purpose:** Dashboard visual para personas não técnicas + mise v2 automation

**What's new:**
- ✅ **mise v2** (556 lines, 91% conformidade): Hooks enter/leave + 22 tasks
- ✅ **PostgreSQL 16 + NocoDB** RODANDO em localhost:8081
- ✅ **Frontend React** RODANDO em localhost:3000
- ✅ **Docker 29.1.3** configurado no WSL2
- 8 tables + 3 analytics views
- Seed data: 2 companies, 7 users, 16 modules (Bash course only)
- Complete documentation: `docs/backend/NOCODB-QUICKSTART.md`

**System Status:**
```
✅ Frontend :3000  → React + Vite (Hub + Bash course)
✅ NocoDB :8081    → Dashboard visual (PostgreSQL 16)
✅ Docker          → WSL2 integration active
✅ mise v2         → Hooks + 22 tasks (91% conformidade)
⏸️ FluSisTip      → Pausado (porta 8080 liberada)
```

**Quick Start (mise v2):**
```bash
# 1. Checkout branch
git checkout demo-nocodb-simple

# 2. Enter project (hooks auto-setup)
cd app-controle
# Menu automático exibido ↓

# 3. Start services
mise full-stack              # Frontend + Backend
# ou
mise dev                     # Frontend only
mise nocodb:start            # Backend only

# 4. Access
# Frontend: http://localhost:3000
# Backend:  http://localhost:8081
#   Email: admin@ultrathink.com
#   Senha: UltraThink@Admin2026!

# 5. Verify
mise check                   # Verificar tudo
mise nocodb:health           # Status NocoDB
```

**Personas served:**
1. **Gestor de RH / T&D** - ROI metrics, Excel export
2. **Tech Lead / Instrutor** - Track junior developers
3. **C-Level** - Board presentations, business case

**Documentation created (2026-01-22):**
- `LOCALHOST-ACESSO.md` - Guia completo de acesso
- `PROBLEMA-PORTA-8080.md` - Resolução conflito porta
- `.mise.toml.RECOMENDACAO-FINAL.md` - Por que v2
- `.mise.toml.ANALISE-DIRETRIZES.md` - Análise conformidade
- `.mise.toml.CHANGES.md` - Guia completo de tasks

**Full reports:**
- `.factory/relatorios/nocodb-mvp-simple-2026-01-22.md`
- `auditoria-forense-completa-2026-01-20.md`

---

**Last Updated:** 2026-01-22 12:30  
**Version:** 1.2.0 (+ mise v2 + localhost active)  
**Status:** 🟢 SISTEMA COMPLETO OPERACIONAL  
**Commits:** 3 novos (mise v2 + docs + problema porta 8080)
