---
paths:
  - "src/hooks/**/*.js"
---

# React Custom Hooks

## Hooks Disponíveis

| Hook | Responsabilidade | Path |
|------|------------------|------|
| `useAuth()` | Autenticação e usuário logado | `src/hooks/useAuth.js` |
| `usePermissions()` | RBAC checks | `src/hooks/usePermissions.js` |
| `useTenant()` | Multi-tenant context | `src/hooks/useTenant.js` |
| `useCourses()` | Course data fetching | `src/hooks/useCourses.js` |
| `useModuleProgress()` | Progress tracking | `src/hooks/useModuleProgress.js` |
| `useMediaQuery()` | Responsive breakpoints | `src/hooks/useMediaQuery.js` |
| `useAutoSaveNotes()` | Auto-save notes | `src/hooks/useAutoSaveNotes.js` |

## Pattern: Custom Hook

```js
import { useState, useEffect } from 'react';

export function useMyCustomHook(param) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiService.getData(param);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [param]);  // Dependencies
  
  return { data, loading, error, refetch: fetchData };
}
```

## useAuth() - Detalhado

```js
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { 
    user,           // Usuário logado (null se não autenticado)
    isAuthenticated,// Boolean
    login,          // (email, password) => Promise
    logout,         // () => void
    loading,        // Boolean
    error           // Error | null
  } = useAuth();
  
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Redirect to="/login" />;
  
  return <div>Olá, {user.name}!</div>;
}
```

## usePermissions() - Detalhado

```js
import { usePermissions } from '../hooks/usePermissions';

function MyComponent() {
  const {
    // Booleans de role
    isAdmin,
    isInstructor,
    isStudent,
    isCLevel,
    isSpecialist,
    
    // Functions de check
    hasPermission,      // (perm: string) => boolean
    hasAnyPermission,   // (perms: string[]) => boolean
    hasAllPermissions,  // (perms: string[]) => boolean
    
    // Metadata
    role,          // 'student' | 'instructor' | 'admin' | 'c_level' | 'specialist'
    roleLabel,     // 'Aluno' | 'Instrutor' | ...
    roleColor,     // 'blue' | 'green' | ...
    permissions,   // string[] todas permissões do role
  } = usePermissions();
  
  if (!hasPermission('courses.create')) {
    return <AccessDenied />;
  }
  
  return <CreateCourseForm />;
}
```

## useTenant() - Detalhado

```js
import { useTenant } from '../hooks/useTenant';

function MyComponent() {
  const {
    currentCompany,  // { id, name, logo, ... }
    companyId,       // string (company-1, company-2, ...)
    companyName,     // string (ACME Tech, DevCorp, ...)
    isMultiTenant,   // boolean (true)
  } = useTenant();
  
  // Sempre filtrar por companyId
  const users = await apiService.users.list(companyId);
}
```

## useCourses() - Detalhado

```js
import { useCourses } from '../hooks/useCourses';

function MyCourseList() {
  const {
    courses,       // Course[]
    loading,       // boolean
    error,         // Error | null
    refetch,       // () => Promise<void>
    createCourse,  // (data) => Promise<Course>
    updateCourse,  // (id, data) => Promise<Course>
    deleteCourse,  // (id) => Promise<void>
  } = useCourses();
  
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

## useModuleProgress() - Detalhado

```js
import { useModuleProgress } from '../hooks/useModuleProgress';

function ModuleView({ moduleId }) {
  const {
    progress,      // number (0-100)
    isCompleted,   // boolean
    markComplete,  // () => Promise<void>
    updateProgress,// (percent: number) => Promise<void>
  } = useModuleProgress(moduleId);
  
  return (
    <div>
      <ProgressBar value={progress} />
      {!isCompleted && (
        <button onClick={markComplete}>
          Marcar como Completo
        </button>
      )}
    </div>
  );
}
```

## useMediaQuery() - Detalhado

```js
import { useMediaQuery } from '../hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  if (isMobile) return <MobileView />;
  if (isTablet) return <TabletView />;
  return <DesktopView />;
}
```

## useAutoSaveNotes() - Detalhado

```js
import { useAutoSaveNotes } from '../hooks/useAutoSaveNotes';

function NotesEditor({ courseId }) {
  const {
    notes,         // string
    setNotes,      // (value: string) => void
    isSaving,      // boolean
    lastSaved,     // Date | null
  } = useAutoSaveNotes(courseId);
  
  return (
    <div>
      <textarea 
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      {isSaving && <span>Salvando...</span>}
      {lastSaved && <span>Salvo às {lastSaved.toLocaleTimeString()}</span>}
    </div>
  );
}
```

## Regras para Custom Hooks

1. **Nome começa com `use`** (React convention)
2. **Pode chamar outros hooks** (useState, useEffect, outros custom hooks)
3. **Retornar objeto ou array** (preferir objeto para clareza)
4. **Documentar dependencies** no useEffect
5. **Cleanup** em useEffect quando necessário

## Testing Custom Hooks

```js
import { renderHook, waitFor } from '@testing-library/react';
import { useMyCustomHook } from './useMyCustomHook';

describe('useMyCustomHook', () => {
  it('fetches data successfully', async () => {
    const { result } = renderHook(() => useMyCustomHook('param'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });
});
```

## Anti-Patterns

❌ **Chamar hooks condicionalmente**
```js
// RUIM
if (condition) {
  const data = useData();  // Erro!
}
```

❌ **Chamar hooks em loops**
```js
// RUIM
items.forEach(item => {
  const data = useData(item.id);  // Erro!
});
```

❌ **Esquecer dependencies**
```js
// RUIM
useEffect(() => {
  fetchData(param);
}, []);  // Missing param dependency!
```

✅ **BOM: Hooks no top-level**
```js
function MyComponent() {
  const data = useData();      // OK
  const [state, setState] = useState();  // OK
  
  useEffect(() => {
    // ...
  }, [dependencies]);  // OK
}
```

---

**Referência:** React Hooks API
**Convenção:** Prefixo `use` obrigatório
**Location:** `src/hooks/*.js`
