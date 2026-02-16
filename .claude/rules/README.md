# Rules - Regras Condicionais por Path

Rules ativam **automaticamente** quando Claude edita/lê arquivos que matcham o `paths:` no frontmatter YAML.

## 10 Rules Ativas

| Rule | Paths | Ativa Quando |
|------|-------|--------------|
| **rbac-permissions.md** | hooks/usePermissions, RoleBasedAccess, permissions.js | Trabalhar com RBAC |
| **react-components.md** | components/**/*.jsx | Editar componentes React |
| **react-hooks.md** | hooks/**/*.js | Criar/editar custom hooks |
| **multi-tenant.md** | apiService, useTenant, *company* | Multi-tenant features |
| **i18n-translations.md** | i18n/**, locales/**, *i18n*, *translation* | Internacionalização |
| **testing.md** | **/*.test.jsx, **/*.spec.js | Escrever testes |
| **security.md** | src/**/*.js, src/**/*.jsx | TODO código (OWASP) |
| **api-integration.md** | services/apiService, services/dataService | Integração NocoDB |
| **white-label.md** | config/platform.js, *brand*, *theme* | Customização visual |
| **hub-marketplace.md** | components/hub/**, *specialist*, *hub* | Hub de Especialistas |

## Como Funcionam

Exemplo: editar `src/components/CourseCard.jsx` ativa automaticamente:
- `react-components.md` (match em `components/**/*.jsx`)
- `security.md` (match em `src/**/*.jsx`)

Se o componente usar `usePermissions()`:
- `rbac-permissions.md` também ativa

## Frontmatter YAML

```yaml
---
paths:
  - "src/components/**/*.jsx"
  - "!src/components/**/*.test.jsx"  # Exclusão
---
```

## Adicionar Nova Rule

1. Criar arquivo em `.claude/rules/nome.md`
2. Adicionar frontmatter com paths
3. Documentar padrões, convenções, anti-patterns
4. Atualizar este README

---

**Stack:** React 18 + Vite + Tailwind + NocoDB
**Total Rules:** 10
**Cobertura:** 100% do código (security.md ativa sempre)
