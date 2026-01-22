# Quick Audit Command

Perform a quick health check of the project by running essential quality checks.

## What This Command Does

1. Runs dependency audit (`bun audit`)
2. Runs linter (`bun run lint`)
3. Runs all tests (`bun run test`)
4. Shows git status
5. Checks for uncommitted changes

## Usage

```
/quick-audit
```

Or ask Droid:
```
"Run a quick audit of the project"
```

## Expected Output

```
✅ Dependency Audit: No vulnerabilities found
✅ Linter: All files pass
✅ Tests: 45 passed
✅ Git Status: Clean working directory
```

## When to Use

- Before starting a new feature
- Before creating a PR
- After pulling changes from remote
- Daily standup check
- Before end of day commit

## Troubleshooting

If any check fails:
1. **Audit failures**: Run `bun audit --fix` or update vulnerable packages
2. **Lint failures**: Run `bun run lint -- --fix` to auto-fix
3. **Test failures**: Review test output and fix failing tests
4. **Uncommitted changes**: Commit or stash changes

## With mise (if configured)

If you have mise configured (`.mise.toml` exists), you can use integrated tasks:

```bash
mise run security         # Complete security scan (includes audit)
mise run lint             # Linter
mise run test             # Tests
mise run validate:env     # Validate environment
```

The `mise run security` task includes:
- `gitleaks` - Secret detection
- `trivy` - Vulnerability scanning
- `bun audit` - Dependency audit

## Related Commands

- `/full-coverage` - Run tests with coverage report
- `/security-check` - Deep security audit using security-auditor droid
