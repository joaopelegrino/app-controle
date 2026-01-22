# Full Coverage Report

Generate a comprehensive test coverage report and analyze uncovered areas.

## What This Command Does

1. Runs tests with coverage (`bun run test:coverage`)
2. Analyzes coverage report
3. Identifies uncovered files and functions
4. Suggests priority areas for test improvement
5. Can invoke test-specialist droid for recommendations

## Usage

```
/full-coverage
```

Or ask Droid:
```
"Generate a full coverage report and analyze it"
```

## Expected Output

```
Coverage Summary:
├── Statements: 78% (234/300)
├── Branches: 72% (54/75)
├── Functions: 85% (34/40)
└── Lines: 79% (220/280)

Uncovered Files:
❌ src/hooks/useModuleProgress.js - 45% coverage
❌ src/services/dataService.js - 60% coverage
⚠️ src/components/GenericLearningSystem.jsx - 75% coverage

Recommendations:
1. Priority: Add tests for useModuleProgress error handling
2. Priority: Cover localStorage quota scenarios in dataService
3. Nice-to-have: Add edge case tests for GenericLearningSystem
```

## When to Use

- Before releasing a new version
- When implementing critical features
- After refactoring
- Weekly as part of quality metrics
- When aiming to reach 80%+ coverage

## Follow-up Actions

After running coverage:

1. **Invoke test-specialist**:
   ```
   "Use test-specialist to create tests for src/hooks/useModuleProgress.js"
   ```

2. **Manual review**:
   ```bash
   open coverage/index.html  # macOS
   xdg-open coverage/index.html  # Linux
   ```

3. **Update tests**:
   - Focus on red/yellow areas in coverage report
   - Prioritize core functionality
   - Don't aim for 100% - focus on meaningful tests

## Coverage Goals

| Component Type | Target Coverage |
|----------------|-----------------|
| Hooks | 90%+ |
| Services | 85%+ |
| Core Components | 80%+ |
| UI Components | 70%+ |
| Utility Functions | 95%+ |

## With mise (if configured)

If you have mise configured (`.mise.toml` exists):

```bash
# Generate coverage report
mise run test:coverage

# View coverage in terminal
mise run test:coverage

# Then open HTML report manually
# Coverage report location: coverage/index.html
```

**Integration with test-specialist:**
```bash
# After running coverage
droid "Use test-specialist to analyze coverage report and suggest improvements"
```

## Related Commands

- `/quick-audit` - Fast quality check without detailed coverage
- `/test-file <path>` - Run tests for specific file
