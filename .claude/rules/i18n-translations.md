---
paths:
  - "src/i18n/**/*.js"
  - "public/locales/**/*.json"
  - "**/*i18n*.js"
  - "**/*translation*.js"
---

# i18n - Internacionalização (pt-BR, en-US, es-ES)

## Idiomas Suportados

- 🇧🇷 **pt-BR** (Português Brasil) - DEFAULT
- 🇺🇸 **en-US** (English US)
- 🇪🇸 **es-ES** (Español)

## Hook useTranslation()

**SEMPRE** usar em componentes:

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.welcome')}</h1>
      <p>{t('dashboard.description')}</p>
      
      {/* Com fallback */}
      <p>{t('key.missing', 'Fallback text')}</p>
      
      {/* Com interpolação */}
      <p>{t('user.greeting', { name: userName })}</p>
      
      {/* Plural */}
      <p>{t('courses.count', { count: 5 })}</p>
    </div>
  );
}
```

## Estrutura de Arquivos

```
public/locales/
├── pt-BR/
│   ├── translation.json      # Traduções gerais
│   ├── dashboard.json         # Dashboard específico
│   ├── courses.json           # Cursos
│   ├── users.json             # Usuários
│   └── hub.json               # Hub de Especialistas
├── en-US/
│   └── ... (mesma estrutura)
└── es-ES/
    └── ... (mesma estrutura)
```

## Estrutura JSON

```json
{
  "dashboard": {
    "welcome": "Bem-vindo",
    "subtitle": "Seus cursos e progresso",
    "stats": {
      "total": "Total de cursos",
      "completed": "Concluídos",
      "inProgress": "Em andamento"
    }
  },
  "user": {
    "greeting": "Olá, {{name}}!",
    "role": {
      "student": "Aluno",
      "instructor": "Instrutor",
      "admin": "Administrador",
      "c_level": "Executivo",
      "specialist": "Especialista"
    }
  },
  "courses": {
    "count_one": "{{count}} curso",
    "count_other": "{{count}} cursos"
  }
}
```

## Trocar Idioma

```jsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);  // Persiste em localStorage
  };
  
  return (
    <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
      <option value="pt-BR">Português</option>
      <option value="en-US">English</option>
      <option value="es-ES">Español</option>
    </select>
  );
}
```

## Regras de Tradução

### 1. NUNCA hardcode text
```jsx
// ❌ RUIM
<h1>Welcome to Dashboard</h1>

// ✅ BOM
<h1>{t('dashboard.welcome')}</h1>
```

### 2. Namespaces organizados
```jsx
// Agrupar por feature/domínio
t('dashboard.title')      // Dashboard
t('courses.create')       // Courses
t('users.manage')         // Users
t('hub.specialist')       // Hub
```

### 3. Pluralização
```json
{
  "items": {
    "count_zero": "Nenhum item",
    "count_one": "{{count}} item",
    "count_other": "{{count}} itens"
  }
}
```

```jsx
{t('items.count', { count: items.length })}
```

### 4. Interpolação
```json
{
  "welcome": "Olá, {{name}}! Você tem {{count}} cursos."
}
```

```jsx
{t('welcome', { name: userName, count: coursesCount })}
```

## RBAC com i18n

Traduzir roles e permissions:

```json
{
  "roles": {
    "student": "Aluno",
    "instructor": "Instrutor",
    "admin": "Administrador",
    "c_level": "Executivo",
    "specialist": "Especialista"
  },
  "permissions": {
    "courses.view": "Visualizar cursos",
    "courses.create": "Criar cursos",
    "users.manage": "Gerenciar usuários"
  }
}
```

```jsx
const { role } = usePermissions();
const { t } = useTranslation();

<p>{t(`roles.${role}`)}</p>  // "Aluno", "Student", "Estudiante"
```

## Testing i18n

```js
// Mock useTranslation
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

test('renders translated text', () => {
  render(<MyComponent />);
  // Usar fallback ou key no teste
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
```

## Adicionar Nova Tradução

1. Adicionar chave em `pt-BR/translation.json`
2. Traduzir para `en-US/translation.json`
3. Traduzir para `es-ES/translation.json`
4. Usar `t('nova.chave')` no componente
5. Testar troca de idioma

## White-Label + i18n

Cada empresa pode ter textos customizados:

```js
// platform.js
platform: {
  name: t('platform.name', 'Plataforma B2B'),  // Pode ser sobrescrito por .env
}
```

---

**Stack:** react-i18next v23.x
**Config:** `src/i18n/config.js`
**Default:** pt-BR
**Persistência:** localStorage (`plataformab2b_language`)
