---
paths:
  - "src/services/apiService.js"
  - "src/services/dataService.js"
  - "src/hooks/useTenant.js"
  - "**/*company*.js"
  - "**/*company*.jsx"
---

# Multi-Tenant - Isolamento por company_id

## Princípio Fundamental

**TODAS** as queries ao backend DEVEM filtrar por `company_id` para garantir isolamento de dados entre empresas (tenants).

## Hook useTenant()

```jsx
import { useTenant } from '../hooks/useTenant';

function MyComponent() {
  const { currentCompany, companyId, companyName } = useTenant();
  
  // companyId está sempre disponível para queries
  const users = await apiService.users.list({ company_id: companyId });
}
```

## API Service Pattern

**SEMPRE** incluir `company_id` em queries:

```js
// ✅ BOM - Filtro por company
export const listUsers = async (companyId) => {
  const response = await fetch(`/api/users?company_id=${companyId}`);
  return response.json();
};

// ❌ RUIM - Sem filtro (vazamento de dados!)
export const listUsers = async () => {
  const response = await fetch('/api/users');  // PERIGO!
  return response.json();
};
```

## NocoDB Queries (Backend)

Queries NocoDB DEVEM usar `where` com `company_id`:

```js
// GET com filtro
const users = await nocodb.dbTableRow.list(
  'noco',
  'base_id',
  'users_table_id',
  {
    where: `(company_id,eq,${companyId})`  // CRÍTICO!
  }
);

// CREATE - sempre incluir company_id
await nocodb.dbTableRow.create('noco', 'base_id', 'users_table_id', {
  name: 'João',
  email: 'joao@example.com',
  company_id: companyId,  // OBRIGATÓRIO
});
```

## Validação em Frontend

```jsx
function CourseList() {
  const { companyId } = useTenant();
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      // SEMPRE passar companyId
      const data = await apiService.courses.list(companyId);
      
      // Validação adicional (paranoid mode)
      const filtered = data.filter(c => c.company_id === companyId);
      setCourses(filtered);
    };
    
    fetchCourses();
  }, [companyId]);
}
```

## White-Label por Tenant

Cada empresa pode ter:
- Logo customizada
- Cores primárias/secundárias
- Nome da plataforma
- Domínio próprio (futuro: subdomain.plataformab2b.com)

```js
// src/config/platform.js
export const getTenantConfig = (companyId) => {
  return {
    logo: `/assets/logos/${companyId}.png`,
    primaryColor: tenantConfigs[companyId]?.primaryColor || '#3B82F6',
    // ...
  };
};
```

## Security Checklist

Ao implementar feature nova:

- [ ] API endpoint valida `company_id`?
- [ ] Query filtra por `company_id`?
- [ ] CREATE inclui `company_id`?
- [ ] Frontend valida dados retornados?
- [ ] Testes cobrem isolamento multi-tenant?

## Testing Multi-Tenant

```js
describe('Multi-tenant isolation', () => {
  it('should filter users by company_id', async () => {
    const companyA = 'company-1';
    const companyB = 'company-2';
    
    const usersA = await apiService.users.list(companyA);
    const usersB = await apiService.users.list(companyB);
    
    // Validar isolamento
    expect(usersA.every(u => u.company_id === companyA)).toBe(true);
    expect(usersB.every(u => u.company_id === companyB)).toBe(true);
    expect(usersA).not.toEqual(usersB);
  });
});
```

## Empresas Demo

| Empresa | company_id | Usuários Demo |
|---------|------------|---------------|
| ACME TECH SOLUTIONS | company-1 | ceo@, admin@, prof@, maria@ acmetech.com |
| DEVCORP CONSULTING | company-2 | cto@, admin@, prof@, julia@ devcorp.com |

**Senha padrão demo:** `Demo@2026`

## Anti-Patterns

❌ **Global queries** sem filtro company_id
❌ **Hardcoded company_id** em código
❌ **Compartilhar dados** entre tenants
❌ **Subdomínios** antes de validar isolamento completo

---

**Arquitetura:** Multi-tenant com isolamento por company_id em PostgreSQL (row-level)
**Backend:** NocoDB REST API com filtros where
