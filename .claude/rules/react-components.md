---
paths:
  - "src/components/**/*.jsx"
  - "!src/components/**/*.test.jsx"
---

# React Components - Patterns e Convenções

## Estrutura de Componentes

### Pattern Preferido: Function Components + Hooks

```jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePermissions } from '../hooks/usePermissions';

function MyComponent({ prop1, prop2, onAction }) {
  const { t } = useTranslation();
  const { hasPermission } = usePermissions();
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  if (!hasPermission('feature.access')) {
    return <AccessDenied />;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      {/* Content */}
    </div>
  );
}

export default MyComponent;
```

## Convenções Críticas

### 1. Props Destructuring
✅ **SEMPRE** destructure props no signature
```jsx
function Component({ user, onSave }) { }  // BOM
```

❌ **NUNCA** use props object
```jsx
function Component(props) { props.user }  // RUIM
```

### 2. i18n - SEMPRE usar useTranslation()
```jsx
const { t } = useTranslation();
<h1>{t('dashboard.welcome')}</h1>  // BOM
<h1>Welcome</h1>  // RUIM - hardcoded
```

### 3. RBAC Check
```jsx
const { hasPermission, isAdmin } = usePermissions();

// Renderização condicional
if (!hasPermission('courses.view')) return <AccessDenied />;

// OU wrapper declarativo
<RoleBasedAccess requiredPermission="courses.view">
  <CourseList />
</RoleBasedAccess>
```

### 4. Tailwind CSS - Utility-First
```jsx
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
  // BOM - utilities
</div>

// EVITAR inline styles
<div style={{ display: 'flex', padding: '16px' }}>  // RUIM
</div>
```

### 5. Event Handlers
```jsx
// Prefixo 'handle' para handlers internos
const handleSubmit = (e) => {
  e.preventDefault();
  onSave(data);  // 'on' prefix para props callbacks
};

<form onSubmit={handleSubmit}>
```

## Hooks Customizados Disponíveis

| Hook | Uso | Path |
|------|-----|------|
| `useAuth()` | Auth state, login, logout | src/hooks/useAuth.js |
| `usePermissions()` | RBAC checks | src/hooks/usePermissions.js |
| `useTenant()` | Multi-tenant context | src/hooks/useTenant.js |
| `useCourses()` | Course data fetching | src/hooks/useCourses.js |
| `useModuleProgress()` | Progress tracking | src/hooks/useModuleProgress.js |
| `useMediaQuery()` | Responsive breakpoints | src/hooks/useMediaQuery.js |
| `useAutoSaveNotes()` | Auto-save notes | src/hooks/useAutoSaveNotes.js |

## Componentes Compartilhados (Reutilizar)

| Componente | Uso | Props |
|------------|-----|-------|
| `<RoleBasedAccess>` | RBAC wrapper | requiredPermission, fallback |
| `<PrivateRoute>` | Protected routes | allowedRoles |
| `<LanguageSelector>` | i18n switcher | - |
| `<EmptyState>` | Empty UI states | title, description, action |
| `<ConfirmModal>` | Confirmation dialogs | isOpen, onConfirm, title |
| `<ToastContainer>` | Notifications | - |
| `<LoadingComponents>` | Loading states | variant |
| `<ErrorBoundary>` | Error catching | fallback |

## Anti-Patterns (EVITAR)

❌ **Class Components** (usar apenas function components)
❌ **Inline styles** (usar Tailwind)
❌ **Hardcoded text** (usar i18n)
❌ **Direct role checks** (usar usePermissions hook)
❌ **Props drilling > 2 níveis** (usar Context ou state management)

## Testing

Componentes DEVEM ter testes em `*.test.jsx`:
- Render básico
- Props variations
- RBAC scenarios (diferentes roles)
- i18n (múltiplos idiomas)
- User interactions (click, submit)

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock necessários
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useTranslation: () => ({ t: (key, fb) => fb || key }) };
});

vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: () => ({ hasPermission: () => true, isStudent: true })
}));

test('renders component', () => {
  render(<MemoryRouter><MyComponent /></MemoryRouter>);
  expect(screen.getByText('expected text')).toBeInTheDocument();
});
```

---

**Stack:** React 18 + Vite + Tailwind CSS + react-router-dom v6 + react-i18next
