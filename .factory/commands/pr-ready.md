# PR Ready Check

Comprehensive pre-PR checklist to ensure your changes are ready for review.

## What This Command Does

1. Runs all quality checks (audit, lint, test)
2. Reviews git diff for:
   - Sensitive data (API keys, tokens)
   - Console.log statements
   - TODO/FIXME comments
   - Large files (>50KB)
3. Verifies commit message follows convention
4. Checks for proper documentation updates
5. Optionally invokes code-reviewer droid

## Usage

```
/pr-ready
```

Or ask Droid:
```
"Check if my changes are ready for PR"
```

## Expected Output

```
PR Readiness Checklist:

✅ Quality Checks:
   ✅ Dependency audit: Clean
   ✅ Linter: Passed
   ✅ Tests: All passing
   ✅ Build: Successful

✅ Git Checks:
   ✅ Branch: feature/US-XXX-description
   ✅ Commits: 3 commits, all conventional
   ✅ No sensitive data detected
   ⚠️ 2 console.log statements found (review recommended)

✅ Documentation:
   ✅ ROADMAP.md updated
   ⚠️ AGENTS.md may need update (new function added)

✅ Code Review:
   Run code-reviewer? (y/n)
```

## Pre-PR Checklist (Manual)

Before running this command, ensure:

- [ ] Feature is complete and working
- [ ] All tests pass locally
- [ ] Code follows project conventions
- [ ] No console.log in production code
- [ ] Documentation is updated
- [ ] Commit messages are descriptive
- [ ] No sensitive data in diff

## Evidence Required

Your PR should include:

1. **Tests**: New tests or updated tests for changes
2. **Proof**: Screenshot, test output, or manual verification
3. **Documentation**: Updated docs if API changed
4. **Commit Message**: Clear description of intent

## When to Use

- Before creating a PR
- After addressing review comments
- Before requesting re-review
- As final check before merge

## Common Issues and Fixes

### ❌ Tests Failing
```bash
bun run test -- --reporter=verbose
# Fix failing tests before proceeding
```

### ❌ Lint Errors
```bash
bun run lint -- --fix
# Review and commit auto-fixes
```

### ❌ Sensitive Data Detected
```bash
git diff --cached | grep -iE '(password|secret|api_key|token)'
# Remove sensitive data and use environment variables
```

### ❌ Commit Message Non-Conventional
```bash
git commit --amend -m "feat(scope): proper commit message"
```

## Auto-Review Integration

After passing all checks:

```
"Use code-reviewer droid to review my staged changes for this PR"
```

The code-reviewer will check:
- Correctness and logic
- Test coverage
- Project conventions
- Security concerns
- Architecture alignment
- Documentation needs

## With mise (if configured)

If you have mise configured (`.mise.toml` exists), run comprehensive checks:

```bash
# Complete validation
mise run validate:env     # Validate environment first

# Quality checks
mise run lint             # ESLint
mise run test             # All tests
mise run security         # Security scan (secrets + vulnerabilities)

# Build verification
mise run build            # Production build

# All in sequence
mise run lint && mise run test && mise run security && mise run build
```

**Automated PR workflow:**
```bash
# Single command for all checks
mise run lint && \
mise run test:coverage && \
mise run security && \
mise run build && \
echo "✅ PR ready!"
```

## Related Commands

- `/quick-audit` - Fast quality check
- `/security-check` - Deep security scan
- `/full-coverage` - Detailed coverage report
