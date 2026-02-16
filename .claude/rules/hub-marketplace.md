---
paths:
  - "src/components/hub/**/*.jsx"
  - "**/*specialist*.jsx"
  - "**/*specialist*.js"
  - "**/*hub*.jsx"
  - "**/*hub*.js"
---

# Hub de Especialistas - Marketplace de Cursos

## Conceito

Marketplace onde **especialistas externos** publicam cursos técnicos para empresas comprarem.

## Role: specialist

5º role RBAC (adicionado Sprint 15):
- Publica cursos no Hub (não nos cursos internos da empresa)
- Responde reviews
- Vê métricas de receita e vendas
- Dashboard próprio (`/specialist`)

## Componentes Hub

| Componente | Descrição | Path |
|------------|-----------|------|
| `<HubView>` | View principal do Hub | `src/components/HubView.jsx` |
| `<CourseCatalog>` | Catálogo de cursos | `src/components/hub/CourseCatalog.jsx` |
| `<CourseCard>` | Card de curso | `src/components/hub/CourseCard.jsx` |
| `<CourseReviews>` | Avaliações | `src/components/hub/CourseReviews.jsx` |
| `<SpecialistDashboard>` | Dashboard especialista | `src/components/hub/SpecialistDashboard.jsx` |
| `<SpecialistProfile>` | Perfil público | `src/components/hub/SpecialistProfile.jsx` |

## Fluxo de Uso

### 1. Student/Instructor/Admin (Compra)
```
Dashboard → Hub Tab → CourseCatalog → Selecionar curso → Comprar (futuro)
```

### 2. Specialist (Venda)
```
Login → /specialist → SpecialistDashboard → Gerenciar cursos → Ver métricas
```

## Tabelas NocoDB

```js
specialists: 'mbn9lnlx37mfphz',           // Dados do especialista
hub_courses: 'mllolxpxcihz57r',           // Cursos publicados
course_reviews: 'mscbqt1jldsnswx',        // Avaliações
v_specialist_dashboard: 'myo14y9v1ogx76a', // View métricas
v_hub_catalog: 'mj1emzixf2bqwlh',         // View catálogo
```

## API Patterns

### Listar Cursos do Hub

```js
export const listHubCourses = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.v_hub_catalog}/records?` +
    `where=(status,eq,active)&sort=-created_at`,
    {
      headers: { 'xc-auth': getAuthToken() }
    }
  );
  
  return response.json();
};
```

### Criar Review

```js
export const createReview = async (hubCourseId, rating, comment, userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.course_reviews}/records`,
    {
      method: 'POST',
      headers: {
        'xc-auth': getAuthToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hub_course_id: hubCourseId,
        user_id: userId,
        rating: rating,  // 1-5
        comment: comment,
        created_at: new Date().toISOString(),
      })
    }
  );
  
  return response.json();
};
```

### Dashboard Especialista (View)

```js
export const getSpecialistDashboard = async (specialistId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v2/tables/${TABLE_IDS.v_specialist_dashboard}/records?` +
    `where=(specialist_id,eq,${specialistId})`,
    {
      headers: { 'xc-auth': getAuthToken() }
    }
  );
  
  const data = await response.json();
  return data.list[0];  // Métricas agregadas
};
```

## Métricas Dashboard Especialista

```js
{
  total_courses: 5,           // Cursos publicados
  total_students: 142,        // Alunos matriculados
  avg_rating: 4.3,           // Média de avaliações
  total_revenue: 12450.00,   // Receita total (futuro)
  pending_reviews: 3,        // Reviews sem resposta
  courses: [...]             // Lista de cursos com métricas
}
```

## Configuração Hub (platform.js)

```js
hub: {
  enabled: true,
  revenueSharePercent: 70,          // Especialista fica com 70%
  specialistMonthlyFee: 0,          // Sem taxa mensal (MVP)
  pricingModel: 'specialist_defined', // Especialista define preço
  priceSuggestedMin: 50,            // R$ 50
  priceSuggestedMax: 200,           // R$ 200
  requiredCredentials: [
    'linkedin',
    'one_of:certification,portfolio,experience'
  ],
  approvalProcess: 'checklist_auto_plus_manual_48h',
  removalCriteria: {
    minRating: 3.0,
    ratingMonths: 3,
    maxGraveComplaints: 3,
  },
}
```

## RBAC - Permissões Hub

| Permission | Roles com Acesso |
|------------|------------------|
| `hub.view` | all |
| `hub.purchase` | admin, c_level, instructor |
| `hub.manage_courses` | specialist |
| `hub.moderate_reviews` | admin, c_level |
| `hub.view_revenue` | specialist, admin, c_level |

## Usuário Demo Specialist

```
Email: joao.silva.specialist@plataformab2b.com
Senha: Demo@2026
Role: specialist
Dashboard: /specialist
```

## Validação Reviews (1-5 estrelas)

```js
const validateRating = (rating) => {
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  return Math.round(rating);  // Garantir inteiro
};
```

## Filtros CourseCatalog

```jsx
<CourseCatalog 
  filters={{
    category: 'programming',
    minRating: 4.0,
    maxPrice: 150,
    language: 'pt-BR'
  }}
/>
```

## Testing Hub Components

```js
vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: () => ({
    isSpecialist: true,
    hasPermission: (perm) => perm.startsWith('hub.'),
    role: 'specialist'
  })
}));

test('specialist can manage courses', () => {
  render(<SpecialistDashboard />);
  expect(screen.getByText('Meus Cursos')).toBeInTheDocument();
});
```

---

**Implementado em:** Sprint 15 (Hub de Especialistas)
**Status:** MVP completo (8 US) ✅
**Futuro:** Sistema de pagamento, certificados, gamificação
