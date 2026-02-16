---
paths:
  - "**/*.test.jsx"
  - "**/*.test.js"
  - "**/*.spec.jsx"
  - "**/*.spec.js"
  - "test/**/*"
---

# Testing - Vitest + React Testing Library

## Stack de Testes

- **Framework:** Vitest
- **Library:** @testing-library/react
- **Coverage:** Vitest coverage (target: >70%)
- **E2E:** MCP Chrome DevTools (manual)

## Estrutura de Teste Padrão

```jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyComponent from './MyComponent';

// Mocks necessários
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key, fallback) => fallback || key,
      i18n: { language: 'pt-BR' }
    })
  };
});

vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: () => ({
    isAdmin: false,
    isStudent: true,
    hasPermission: () => false,
    hasAnyPermission: () => false,
    hasAllPermissions: () => false,
    role: 'student',
    roleLabel: 'Aluno',
    roleColor: 'blue'
  })
}));

describe('MyComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MyComponent />
      </MemoryRouter>
    );
    expect(screen.getByTestId('my-component')).toBeInTheDocument();
  });
  
  it('handles user interaction', async () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

## Mocks Obrigatórios

### 1. react-i18next (SEMPRE com importOriginal)

```js
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key, fallback) => fallback || key,
      i18n: { language: 'pt-BR', changeLanguage: vi.fn() }
    })
  };
});
```

**CRÍTICO:** Usar `importOriginal` para preservar `initReactI18next` export.

### 2. usePermissions (SEMPRE incluir hasPermission)

```js
vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: () => ({
    isAdmin: false,
    isSpecialist: false,
    isInstructor: false,
    isStudent: true,
    isCLevel: false,
    hasPermission: () => false,      // OBRIGATÓRIO
    hasAnyPermission: () => false,   // OBRIGATÓRIO
    hasAllPermissions: () => false,  // OBRIGATÓRIO
    role: 'student',
    roleLabel: 'Aluno',
    roleColor: 'blue'
  })
}));
```

### 3. MemoryRouter (para componentes com routing)

```jsx
import { MemoryRouter } from 'react-router-dom';

render(
  <MemoryRouter initialEntries={['/dashboard']}>
    <MyComponent />
  </MemoryRouter>
);
```

## Casos de Teste Obrigatórios

Para CADA componente:

### 1. Render Básico
```js
it('renders without crashing', () => {
  render(<MyComponent />);
  expect(screen.getByTestId('component-id')).toBeInTheDocument();
});
```

### 2. Props Variations
```js
it('renders with different props', () => {
  const { rerender } = render(<MyComponent type="A" />);
  expect(screen.getByText('Type A')).toBeInTheDocument();
  
  rerender(<MyComponent type="B" />);
  expect(screen.getByText('Type B')).toBeInTheDocument();
});
```

### 3. RBAC Scenarios
```js
it('shows admin content for admin role', () => {
  vi.mocked(usePermissions).mockReturnValue({
    isAdmin: true,
    hasPermission: () => true,
    // ...
  });
  
  render(<MyComponent />);
  expect(screen.getByText('Admin Panel')).toBeInTheDocument();
});

it('hides admin content for student role', () => {
  vi.mocked(usePermissions).mockReturnValue({
    isStudent: true,
    hasPermission: () => false,
    // ...
  });
  
  render(<MyComponent />);
  expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
});
```

### 4. User Interactions
```js
it('handles form submission', async () => {
  const handleSubmit = vi.fn();
  render(<MyForm onSubmit={handleSubmit} />);
  
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'João' }
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'João' });
  });
});
```

### 5. i18n (múltiplos idiomas)
```js
it('renders in Portuguese', () => {
  render(<MyComponent />);
  expect(screen.getByText('Bem-vindo')).toBeInTheDocument();
});

it('renders in English', () => {
  vi.mocked(useTranslation).mockReturnValue({
    t: (key) => key === 'welcome' ? 'Welcome' : key,
    i18n: { language: 'en-US' }
  });
  
  render(<MyComponent />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});
```

## vi.mock Hoisting (IMPORTANTE!)

`vi.mock()` é **hoisted** para o topo do arquivo. Variáveis definidas DEPOIS do mock serão `undefined` DENTRO do factory:

```js
// ❌ RUIM - mockData será undefined
const mockData = { name: 'Test' };

vi.mock('./api', () => ({
  getData: () => mockData  // undefined!
}));

// ✅ BOM - inline no factory
vi.mock('./api', () => ({
  getData: () => ({ name: 'Test' })  // OK!
}));
```

## Comandos

```bash
# Rodar todos os testes
bun run test

# Rodar com coverage
bun run test:coverage

# Watch mode
bun run test:watch

# Teste específico
bun test src/components/MyComponent.test.jsx
```

## Coverage Target

| Métrica | Target | Atual |
|---------|--------|-------|
| Statements | >70% | ~60% |
| Branches | >70% | ~55% |
| Functions | >70% | ~58% |
| Lines | >70% | ~60% |

## Anti-Patterns

❌ **Esquecer MemoryRouter** para componentes com `useNavigate` ou `<Link>`
❌ **Mock incompleto de usePermissions** (faltando `hasPermission()`)
❌ **Mock sem importOriginal** para react-i18next
❌ **Testar implementação** em vez de comportamento
❌ **Testes muito acoplados** à estrutura DOM

## Debugging Testes

```js
import { screen } from '@testing-library/react';

// Ver DOM atual
screen.debug();

// Ver elemento específico
screen.debug(screen.getByTestId('my-element'));

// Log queries
screen.logTestingPlaygroundURL();
```

---

**Framework:** Vitest + @testing-library/react
**Config:** `vitest.config.js`
**Pattern:** Test-driven development (TDD recomendado)
