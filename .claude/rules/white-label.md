---
paths:
  - "src/config/platform.js"
  - "**/*brand*.js"
  - "**/*brand*.jsx"
  - "**/*theme*.js"
---

# White-Label - Customização por Empresa

## Conceito

Cada empresa (tenant) pode ter sua própria identidade visual:
- Logo customizada
- Cores primárias/secundárias
- Nome da plataforma
- Tagline
- Domínio próprio (futuro)

## Configuração Central: platform.js

```js
// src/config/platform.js
const DEFAULT_CONFIG = {
  platform: {
    name: import.meta.env.VITE_PLATFORM_NAME || 'Plataforma B2B',
    shortName: import.meta.env.VITE_PLATFORM_SHORT_NAME || 'B2B',
    tagline: import.meta.env.VITE_PLATFORM_TAGLINE || 'Treinamento Corporativo',
    copyright: import.meta.env.VITE_PLATFORM_COPYRIGHT || '© 2026 Plataforma B2B',
    version: '1.0.0',
  },
  
  theme: {
    primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#3B82F6',
    secondaryColor: import.meta.env.VITE_SECONDARY_COLOR || '#10B981',
    logo: import.meta.env.VITE_LOGO_URL || '/logo.png',
  },
  
  ui: {
    defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'pt-BR',
  }
};

export default DEFAULT_CONFIG;
```

## Customização via .env

```env
# .env (empresa específica)
VITE_PLATFORM_NAME="ACME Tech Academy"
VITE_PLATFORM_SHORT_NAME="ACME Academy"
VITE_PLATFORM_TAGLINE="Capacitação Técnica ACME"
VITE_PRIMARY_COLOR="#DC2626"
VITE_SECONDARY_COLOR="#F59E0B"
VITE_LOGO_URL="https://acme.com/logo.png"
```

## Uso em Componentes

```jsx
import platform from '../config/platform';

function Header() {
  return (
    <header>
      <img src={platform.theme.logo} alt={platform.platform.name} />
      <h1>{platform.platform.name}</h1>
      <p>{platform.platform.tagline}</p>
    </header>
  );
}
```

## Cores Dinâmicas com Tailwind

```jsx
// Não é possível usar variáveis diretamente no Tailwind
// Usar CSS variables ou inline styles

function Button() {
  return (
    <button 
      style={{ 
        backgroundColor: platform.theme.primaryColor 
      }}
      className="px-4 py-2 text-white rounded"
    >
      Botão
    </button>
  );
}

// OU configurar CSS variables
// :root {
//   --primary-color: #3B82F6;
// }
```

## Logos por Empresa

```
public/assets/logos/
├── company-1.png       # ACME Tech Solutions
├── company-2.png       # DevCorp Consulting
└── default.png         # Logo padrão
```

```js
const getLogo = (companyId) => {
  return `/assets/logos/${companyId}.png`;
};
```

## Empresas Demo

| Empresa | company_id | Nome Customizado | Cor Primária |
|---------|------------|------------------|--------------|
| ACME Tech Solutions | company-1 | ACME Tech Academy | #DC2626 (Red) |
| DevCorp Consulting | company-2 | DevCorp Learning | #10B981 (Green) |

## Futuro: Subdomínios

```
# Multi-subdomain (não implementado)
acme.plataformab2b.com     → company-1
devcorp.plataformab2b.com  → company-2
```

## Customização Avançada (Futuro)

- [ ] CSS customizado por empresa
- [ ] Fontes customizadas
- [ ] Favicon customizado
- [ ] Email templates customizados
- [ ] Certificados com logo da empresa

## Validação

```js
// Verificar se config está OK
const validateConfig = () => {
  const required = ['platform.name', 'theme.logo'];
  required.forEach(key => {
    const value = getNestedValue(platform, key);
    if (!value) console.warn(`Missing config: ${key}`);
  });
};
```

---

**Implementado em:** Sprint 13 (White-Label Refactor)
**Config:** `src/config/platform.js`
**Status:** MVP completo, expansão futura
