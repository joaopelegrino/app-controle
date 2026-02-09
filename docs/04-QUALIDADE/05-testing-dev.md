# Testing

O app-controle utiliza uma estrategia de testes em multiplas camadas para garantir qualidade e confiabilidade.

## Visao Geral

| Tipo | Framework | Comando | Cobertura |
|------|-----------|---------|-----------|
| Unitario | Vitest | `mise test` | Logica de negocio |
| E2E | Playwright | `mise e2e:ui` | Fluxos completos |
| Manual | MCP Chrome | Interativo | Exploratorio |

---

## Testes Unitarios

### Executar Testes

```sh
mise test
```

### Com Coverage

```sh
bun run test:coverage
```

### Watch Mode

```sh
bun run test:watch
```

### Estrutura de Arquivos

```
src/
├── services/
│   ├── apiService.js
│   └── __tests__/
│       ├── apiService.users.test.js
│       └── apiService.auth.test.js
├── hooks/
│   ├── usePermissions.js
│   └── __tests__/
│       └── usePermissions.test.js
```

### Exemplo de Teste

```javascript
// src/services/__tests__/apiService.auth.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiService } from '../apiService';

describe('apiService.loginUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should return user data on successful login', async () => {
    const result = await apiService.loginUser(
      'admin@acmetech.com',
      'Demo@2026'
    );

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
    expect(result.user.email).toBe('admin@acmetech.com');
  });

  it('should throw error on invalid credentials', async () => {
    await expect(
      apiService.loginUser('invalid@email.com', 'wrongpass')
    ).rejects.toThrow();
  });
});
```

---

## Testes E2E (Playwright)

### Requisitos

Antes de executar testes E2E:

1. **Dev server rodando**: `mise dev`
2. **Backend rodando**: `mise nocodb:start`
3. **Browsers instalados**: `mise e2e:install`

### Executar com Interface

```sh
mise e2e:ui
```

Abre o Playwright Test Runner com interface grafica.

### Executar Headless

```sh
mise e2e:headless
```

Executa em modo silencioso (ideal para CI/CD).

### Estrutura de Testes E2E

```
e2e/
├── auth.spec.ts       # Testes de autenticacao
├── dashboard.spec.ts  # Testes de dashboard
├── crud.spec.ts       # Testes de CRUD
└── fixtures/
    └── users.json     # Dados de teste
```

### Exemplo de Teste E2E

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login as admin', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'admin@acmetech.com');
    await page.fill('input[name="password"]', 'Demo@2026');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'invalid@email.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toBeVisible();
  });
});
```

---

## Testes com MCP Chrome DevTools

Para testes exploratorios e debugging, use o MCP Chrome DevTools.

### Iniciar Chrome

```sh
mise chrome-debug
```

### Comandos MCP

```javascript
// Navegar para login
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3001/login" })

// Capturar snapshot (acessibilidade)
mcp__chrome-devtools__take_snapshot()

// Preencher formulario
mcp__chrome-devtools__fill({ uid: "email-input", value: "admin@acmetech.com" })
mcp__chrome-devtools__fill({ uid: "password-input", value: "Demo@2026" })

// Clicar em botao
mcp__chrome-devtools__click({ uid: "submit-button" })

// Verificar console
mcp__chrome-devtools__list_console_messages({ types: ["error"] })

// Screenshot
mcp__chrome-devtools__take_screenshot({ filePath: "/tmp/test.png" })
```

::: tip Documentacao Completa
Veja `docs/tecnico/testing/MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md` para mais detalhes.
:::

---

## Testes de Permissoes (RBAC)

### Matriz de Testes

| Perfil | Pode Ver | Nao Pode Ver |
|--------|----------|--------------|
| student | /dashboard | /admin, /instructor |
| instructor | /instructor, /dashboard | /admin, /admin/executive |
| admin | /admin, /instructor, /dashboard | /admin/executive |
| c_level | Todos | - |
| specialist | /specialist, /hub/catalog | /admin, /instructor |

### Teste Automatizado

```javascript
// Testar permissoes por perfil
const profiles = [
  { email: 'maria@acmetech.com', role: 'student', allowed: ['/dashboard'] },
  { email: 'prof@acmetech.com', role: 'instructor', allowed: ['/instructor'] },
  { email: 'admin@acmetech.com', role: 'admin', allowed: ['/admin'] },
  { email: 'ceo@acmetech.com', role: 'c_level', allowed: ['/admin/executive'] },
  { email: 'joao.silva.specialist@sulical.com', role: 'specialist', allowed: ['/specialist'] },
];

profiles.forEach(({ email, role, allowed }) => {
  test(`${role} should access ${allowed}`, async ({ page }) => {
    await login(page, email, 'Demo@2026');
    for (const route of allowed) {
      await page.goto(route);
      await expect(page).not.toHaveURL('/login');
    }
  });
});
```

---

## CI/CD

### GitHub Actions

Os testes sao executados automaticamente em cada push:

```yaml
# .github/workflows/fly-deploy.yml
- name: Run tests
  run: mise run test

- name: Run lint
  run: mise run lint

- name: Run security scan
  run: mise run security:scan
```

### Rodar Localmente (Simular CI)

```sh
mise test:all
```

Executa: lint → unit tests → e2e (se servicos rodando).

---

## Estrutura de Dados de Teste

### Credenciais de Demo

| Empresa | Email | Perfil |
|---------|-------|--------|
| ACME Tech | admin@acmetech.com | admin |
| ACME Tech | prof@acmetech.com | instructor |
| ACME Tech | maria@acmetech.com | student |
| ACME Tech | ceo@acmetech.com | c_level |
| DevCorp | admin@devcorp.com | admin |
| DevCorp | prof@devcorp.com | instructor |
| DevCorp | julia@devcorp.com | student |
| DevCorp | cto@devcorp.com | c_level |
| Hub Especialistas | joao.silva.specialist@sulical.com | specialist |

**Senha padrao**: `Demo@2026`

### Verificar Dados no Banco

```sh
mise db:verify
```

---

## Debugging de Testes

### Vitest

```sh
# Modo debug
bun run test -- --reporter=verbose

# Teste especifico
bun run test apiService.auth

# Com breakpoints
bun run test --inspect-brk
```

### Playwright

```sh
# Com browser visivel
npx playwright test --headed

# Pausar em cada passo
npx playwright test --debug

# Gerar trace
npx playwright test --trace on
```

### Verificar Console Errors

```javascript
// Via MCP
mcp__chrome-devtools__list_console_messages({ types: ["error", "warn"] })
```

---

## Cobertura de Testes

### Gerar Relatorio

```sh
bun run test:coverage
```

### Metricas Atuais

| Modulo | Linhas | Funcoes | Branches |
|--------|--------|---------|----------|
| apiService | 85% | 90% | 80% |
| usePermissions | 95% | 100% | 90% |
| AuthContext | 80% | 85% | 75% |

### Meta

- **Unitarios**: > 80% de cobertura em services e hooks
- **E2E**: Todos os fluxos criticos (login, CRUD, permissoes)

---

## Troubleshooting

### Testes Falhando

```sh
# Limpar cache
rm -rf node_modules/.vitest

# Reinstalar dependencias
mise fresh
```

### Playwright nao inicia

```sh
# Reinstalar browsers
mise e2e:install
```

### Backend nao responde

```sh
# Verificar status
mise nocodb:health

# Reiniciar
mise nocodb:restart
```

::: info Mais Informacoes
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [MCP Chrome DevTools](https://github.com/anthropics/mcp-chrome-devtools)
:::
