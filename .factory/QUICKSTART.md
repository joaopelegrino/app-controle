# Factory Droid CLI - Quick Start Guide

🎯 **5-Minute Setup** | Get started with Factory Droid CLI in app-controle

---

## ⚡ Installation (if not installed)

```bash
# Install Factory Droid CLI
curl -fsSL https://cli.factory.ai/install.sh | bash

# Or with Homebrew (macOS)
brew install factory-cli

# Verify installation
droid --version
```

## 🚀 First Run

```bash
# Navigate to project
cd /home/notebook/workspace/app-controle

# Start droid
droid

# You'll see:
# > Welcome to Factory Droid CLI
# > Loaded AGENTS.md from .factory/
# > 3 custom droids available
# > 3 custom commands available
```

## 🎯 Quick Commands

### Run Quality Checks
```bash
droid "/quick-audit"
```
Runs: audit → lint → test → git status

### Generate Coverage Report
```bash
droid "/full-coverage"
```
Analyzes test coverage and suggests improvements

### Pre-PR Checklist
```bash
droid "/pr-ready"
```
Validates everything before creating a PR

## 🤖 Using Custom Droids

### Code Review
```bash
droid "Use code-reviewer to review my staged changes"
```

### Security Audit
```bash
droid "Use security-auditor to scan the codebase"
```

### Test Creation
```bash
droid "Use test-specialist to create tests for src/hooks/useModuleProgress.js"
```

## 📋 Common Workflows

### Starting a New Feature

```bash
# 1. Quick health check
droid "/quick-audit"

# 2. Create feature branch
git checkout -b feature/US-XXX-description

# 3. Get help from droid
droid "Help me implement [feature description] following AGENTS.md conventions"
```

### Before Creating PR

```bash
# 1. Check readiness
droid "/pr-ready"

# 2. Review code
droid "Use code-reviewer to review my changes"

# 3. If approved, push
git push -u origin feature/US-XXX-description
```

### Improving Test Coverage

```bash
# 1. Check coverage
droid "/full-coverage"

# 2. Create tests
droid "Use test-specialist to add tests for [file path]"

# 3. Verify improvement
bun run test:coverage
```

## 🎨 Customization

### View Available Droids
```bash
droid
# Then type: /droids
```

### Create New Droid
```bash
droid
# Type: /droids → Create a new Droid
```

### View Settings
```bash
droid
# Type: /settings
```

## 📚 Key Resources

| Resource | Location | Purpose |
|----------|----------|---------|
| **AGENTS.md** | `.factory/AGENTS.md` | Main instructions for AI |
| **Custom Droids** | `.factory/droids/` | Specialized subagents |
| **Commands** | `.factory/commands/` | Custom slash commands |
| **Audit Report** | `.factory/relatorios/` | Latest audit findings |
| **Settings** | `.factory/settings.json` | CLI configuration |

## 🔧 Configuration Files

### AGENTS.md
Primary instructions file - read by droid at session start
- Core commands
- Project structure
- Coding conventions
- Git workflows

### settings.json
CLI behavior configuration:
```json
{
  "model": "claude-sonnet-4-5-20250929",
  "autonomyLevel": "medium",
  "requireTestsForPR": true,
  "commitConvention": "conventional"
}
```

## 🎓 Learning Path

### Week 1: Basics
- [x] Install and run droid
- [x] Use `/quick-audit`
- [x] Ask droid simple questions
- [x] Try one custom droid

### Week 2: Advanced
- [x] Use all 3 custom droids
- [x] Run `/pr-ready` workflow
- [x] Create a custom command
- [x] Modify settings.json

### Week 3: Power User
- [x] Create a custom droid
- [x] Integrate with CI/CD
- [x] Train team members
- [x] Optimize workflows

### Week 4: Mastery 🏆
- [ ] Use factory-config-specialist monthly
- [ ] Optimize settings based on usage
- [ ] Train team members
- [ ] Integrate with CI/CD

---

## 🔧 Environment Setup (Optional - mise)

The project supports **mise** for automated environment management:

### Quick Setup

```bash
# One-time setup (per machine)
curl https://mise.jdx.dev/install.sh | sh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc

# Enter project (automatic setup via hooks)
cd app-controle
```

### What You Get

When entering the project with mise configured:
- ✅ Dependencies installed automatically
- ✅ Environment validated
- ✅ Welcome menu with commands
- ✅ Zero manual setup

### Using mise Tasks

```bash
mise run help             # Show all available commands
mise run dev              # Start dev server
mise run test             # Run tests
mise run security         # Security scan
mise run validate:env     # Validate environment
```

### Standard Commands Still Work

You can always use standard bun commands:
```bash
bun install
bun run dev
bun run test
```

**See full documentation:** `documentacao-interna/05-workflows/setup-ambiente-mise.md`

---

## 🆘 Troubleshooting

### Droid not finding AGENTS.md
```bash
# Check file exists
ls -la .factory/AGENTS.md

# Should be at project root in .factory/
```

### Custom droid not working
```bash
# List available droids
droid "/droids"

# Check droid file format
cat .factory/droids/code-reviewer.md
```

### Command not recognized
```bash
# Commands must be in .factory/commands/
ls .factory/commands/

# Use with slash prefix
droid "/quick-audit"
```

## ✅ Quick Wins

Here are 3 things to try **right now**:

### 1. Run Your First Audit (2 min)
```bash
droid "/quick-audit"
```

### 2. Review Recent Code (3 min)
```bash
git add .
droid "Use code-reviewer to review my staged changes"
```

### 3. Check Test Coverage (2 min)
```bash
droid "/full-coverage"
```

## 🎯 Next Steps

After completing the quick start:

1. **Read the full audit report:**
   ```bash
   cat .factory/relatorios/auditoria-forense-completa-2026-01-20.md
   ```

2. **Review AGENTS.md:**
   ```bash
   cat .factory/AGENTS.md
   ```

3. **Explore custom droids:**
   ```bash
   ls -l .factory/droids/
   cat .factory/droids/code-reviewer.md
   ```

4. **Try interactive mode:**
   ```bash
   droid
   # Then type your questions naturally
   ```

## 🔗 Important Links

- **Factory Droid Docs:** https://docs.factory.ai/
- **AGENTS.md Spec:** https://docs.factory.ai/cli/configuration/agents-md
- **Custom Droids:** https://docs.factory.ai/cli/configuration/custom-droids
- **CLI Reference:** https://docs.factory.ai/reference/cli-reference

## 💡 Pro Tips

1. **Start every session with audit:**
   ```bash
   droid "/quick-audit"
   ```

2. **Use specific droids for specific tasks:**
   - Code review → `code-reviewer`
   - Security → `security-auditor`
   - Tests → `test-specialist`

3. **Read AGENTS.md for context:**
   Droid reads it automatically, but you should too!

4. **Commit `.factory/` to git:**
   Share configuration with your team

5. **Update AGENTS.md when conventions change:**
   Keep it as single source of truth

## 📊 Success Metrics

After using Factory Droid for 1 week, you should see:

- ✅ Faster PR reviews
- ✅ Better test coverage
- ✅ Fewer bugs in production
- ✅ More consistent code style
- ✅ Less time on manual checks

## 🎉 You're Ready!

You now have everything set up to use Factory Droid CLI effectively.

**Your next command should be:**
```bash
droid "Help me understand the current state of the project by reading the ROADMAP"
```

---

**Need help?** Just ask droid: `droid "How do I [your question]?"`

**Found an issue?** Check the audit report: `.factory/relatorios/`

**Want to customize?** Edit `.factory/settings.json` or create new droids!
