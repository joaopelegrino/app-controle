---
paths:
  - "src/services/apiService.js"
  - "src/services/dataService.js"
---

# API Integration - NocoDB + PostgreSQL

## Arquitetura

```
Frontend (React)
    ↓
apiService.js (Fetch wrapper)
    ↓
NocoDB REST API (port 8081)
    ↓
PostgreSQL (port 5432)
```

## Credenciais NocoDB Admin

| Campo | Valor |
|-------|-------|
| URL | http://localhost:8081 |
| Email | admin@trainb2b.local |
| Senha | Admin@TrainB2B2026! |

**⚠️ IMPORTANTE:** Estas são credenciais do backend NocoDB, não dos usuários da aplicação.

## Base IDs e Table IDs

```js
// apiService.js
const BASE_ID = 'por8gk2phpp2pfk';
const WORKSPACE = 'ws_trainb2b';

const TABLE_IDS = {
  users: 'm9tvgm5rx70qh3i',
  companies: 'mvw5muqhbzrmkuv',
  courses: 'mfrp5ndkje59e7r',
  modules: 'mu3cf9gd3ujxrg2',
  enrollments: 'enrollment_table_id',
  progress: 'progress_table_id',
  
  // Hub de Especialistas (Sprint 15)
  specialists: 'mbn9lnlx37mfphz',
  hub_courses: 'mllolxpxcihz57r',
  course_reviews: 'mscbqt1jldsnswx',
  v_specialist_dashboard: 'myo14y9v1ogx76a',
  v_hub_catalog: 'mj1emzixf2bqwlh',
};
```

**Atualização:** IDs foram atualizados em 2026-02-10 após migration-003.

## Pattern: GET (List)

```js
export const listUsers = async (companyId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.users}/records?` +
    `where=(company_id,eq,${companyId})`,
    {
      headers: {
        'xc-auth': getAuthToken(),
        'Content-Type': 'application/json',
      }
    }
  );
  
  if (!response.ok) throw new Error('Failed to fetch users');
  
  const data = await response.json();
  return data.list || [];
};
```

## Pattern: GET (Single)

```js
export const getUser = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.users}/records/${userId}`,
    {
      headers: {
        'xc-auth': getAuthToken(),
        'Content-Type': 'application/json',
      }
    }
  );
  
  if (!response.ok) throw new Error('User not found');
  
  return response.json();
};
```

## Pattern: POST (Create)

```js
export const createCourse = async (courseData, companyId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.courses}/records`,
    {
      method: 'POST',
      headers: {
        'xc-auth': getAuthToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...courseData,
        company_id: companyId,  // SEMPRE incluir!
        created_at: new Date().toISOString(),
      })
    }
  );
  
  if (!response.ok) throw new Error('Failed to create course');
  
  return response.json();
};
```

## Pattern: PATCH (Update)

```js
export const updateCourse = async (courseId, updates, companyId) => {
  // Validar ownership (multi-tenant)
  const existing = await getCourse(courseId);
  if (existing.company_id !== companyId) {
    throw new Error('Unauthorized: company_id mismatch');
  }
  
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.courses}/records`,
    {
      method: 'PATCH',
      headers: {
        'xc-auth': getAuthToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: courseId,
        ...updates,
        updated_at: new Date().toISOString(),
      })
    }
  );
  
  if (!response.ok) throw new Error('Failed to update course');
  
  return response.json();
};
```

## Pattern: DELETE

```js
export const deleteCourse = async (courseId, companyId) => {
  // Validar ownership
  const existing = await getCourse(courseId);
  if (existing.company_id !== companyId) {
    throw new Error('Unauthorized: company_id mismatch');
  }
  
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.courses}/records`,
    {
      method: 'DELETE',
      headers: {
        'xc-auth': getAuthToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ Id: courseId }])  // Array de IDs
    }
  );
  
  if (!response.ok) throw new Error('Failed to delete course');
  
  return response.json();
};
```

## Authentication Token

```js
const getAuthToken = () => {
  const token = localStorage.getItem(getStorageKey('api_token'));
  if (!token) throw new Error('Not authenticated');
  return token;
};
```

## Error Handling

```js
const handleApiError = (error, context) => {
  console.error(`API Error [${context}]:`, error);
  
  if (error.message.includes('401')) {
    // Token expirado - redirecionar para login
    window.location.href = '/login';
  }
  
  if (error.message.includes('403')) {
    // Sem permissão
    throw new Error('Acesso negado');
  }
  
  throw error;
};
```

## Multi-Tenant WHERE Clause

```js
// Filtro simples
where=(company_id,eq,company-1)

// Filtro múltiplo (AND)
where=(company_id,eq,company-1)~and(status,eq,active)

// Filtro múltiplo (OR)
where=(company_id,eq,company-1)~or(role,eq,admin)

// Busca
where=(name,like,%search%)
```

## Troubleshooting

### HTTP 400 - Bad Request
- Verificar TABLE_IDs em `apiService.js`
- Consultar `docs/backend-docs/NOCODB-TROUBLESHOOTING.md`
- Executar `mise nocodb:health`

### HTTP 401 - Unauthorized
- Token expirado ou inválido
- Fazer login novamente

### HTTP 403 - Forbidden
- Sem permissão para recurso
- Verificar RBAC do usuário

### Tabela não encontrada
- TABLE_IDs desatualizados após migration
- Obter IDs corretos via NocoDB Meta API

## Comandos Úteis

```bash
# Health check NocoDB
mise nocodb:health

# Logs do container
docker logs app-controle-nocodb-1

# Restart backend
mise nocodb:restart
```

---

**Backend:** NocoDB v0.latest + PostgreSQL 16
**Docs:** `docs/backend-docs/nocodb.md`
**Troubleshooting:** `docs/backend-docs/NOCODB-TROUBLESHOOTING.md`
