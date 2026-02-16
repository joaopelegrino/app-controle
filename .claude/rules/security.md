---
paths:
  - "src/**/*.js"
  - "src/**/*.jsx"
  - "!**/*.test.js"
  - "!**/*.test.jsx"
---

# Security - OWASP Top 10 + Best Practices

## Princípios de Segurança

1. **NUNCA** commitar secrets (.env, credentials, API keys)
2. **SEMPRE** validar input do usuário
3. **SEMPRE** sanitizar dados antes de renderizar
4. **SEMPRE** usar HTTPS em produção
5. **SEMPRE** validar permissões no backend (frontend é apenas UX)

## OWASP Top 10 Checklist

### 1. Injection (SQL, NoSQL, XSS)

**XSS - Cross-Site Scripting:**

```jsx
// ❌ PERIGO - dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SEGURO - React escapa automaticamente
<div>{userInput}</div>

// ✅ SEGURO - DOMPurify para HTML necessário
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirtyHTML);
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

**SQL Injection (NocoDB):**

```js
// ❌ PERIGO - concatenação direta
const query = `(name,eq,${userInput})`;  // SQL injection!

// ✅ SEGURO - parametrizado
const query = `(name,eq,${encodeURIComponent(userInput)})`;
```

### 2. Broken Authentication

```js
// ✅ Senha forte (regex)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ✅ Token storage (httpOnly cookies ideal, localStorage aceitável para MVP)
const TOKEN_KEY = getStorageKey('api_token');
localStorage.setItem(TOKEN_KEY, token);  // OK para MVP
// MELHOR: httpOnly cookies (implementar em produção)

// ✅ Logout limpa tudo
const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(getStorageKey('user'));
  // Redirecionar para login
};
```

### 3. Sensitive Data Exposure

```js
// ❌ NUNCA logar dados sensíveis
console.log('User password:', password);  // PERIGO!

// ❌ NUNCA incluir em error messages
throw new Error(`Login failed for ${email}`);  // Email exposto!

// ✅ Logs genéricos
console.log('Authentication failed');
throw new Error('Invalid credentials');

// ✅ Secrets em .env (NUNCA commitar)
const API_KEY = import.meta.env.VITE_API_KEY;  // OK
```

### 4. Broken Access Control (RBAC)

```jsx
// ❌ RUIM - apenas frontend
const isAdmin = user.role === 'admin';
if (isAdmin) showAdminPanel();  // Backend DEVE validar!

// ✅ BOM - frontend + backend
const { hasPermission } = usePermissions();
if (hasPermission('admin.panel')) {
  // Backend TAMBÉM valida via middleware
  showAdminPanel();
}
```

**Backend DEVE:**
- Validar JWT token
- Verificar role do usuário
- Filtrar por company_id (multi-tenant)

### 5. Security Misconfiguration

```js
// ✅ Variáveis de ambiente
VITE_API_BASE_URL=http://localhost:8081  // Dev
VITE_API_BASE_URL=https://api.prod.com   // Prod

// ✅ CORS configurado no backend
// NocoDB: permitir apenas domínio da aplicação

// ✅ Content Security Policy (CSP)
// Configurar headers HTTP no servidor
```

### 6. Components with Known Vulnerabilities

```bash
# ✅ Auditoria regular de dependências
bun audit

# ✅ Atualizar deps com vulnerabilidades
bun update [package]

# ✅ Scan com gitleaks (pre-commit)
mise run security:scan-staged
```

### 7. Insufficient Logging

```js
// ✅ Logar eventos de segurança
const logSecurityEvent = (event, severity, details) => {
  console.log(`[${severity}] Security Event: ${event}`, {
    timestamp: new Date().toISOString(),
    user: getCurrentUser()?.email,
    ...details
  });
};

// Exemplos
logSecurityEvent('login_failed', 'WARN', { email });
logSecurityEvent('permission_denied', 'ERROR', { resource, role });
logSecurityEvent('suspicious_activity', 'CRITICAL', { ip, action });
```

## Secrets Management

### .env.example (commitar)
```
VITE_API_BASE_URL=http://localhost:8081
VITE_PLATFORM_NAME=Plataforma B2B
```

### .env (NUNCA commitar)
```
VITE_API_BASE_URL=https://api.real.com
VITE_API_SECRET=abc123...  # Secrets reais
```

### .gitignore
```
.env
.env.local
.env.production
*.key
*.pem
credentials.json
```

### Validar com gitleaks

```bash
# Pre-commit hook (automático)
mise run security:scan-staged

# Scan completo
mise run security:scan
```

## Input Validation

```js
// ✅ Validar tipo
const validateEmail = (email) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
};

// ✅ Sanitizar input
const sanitizeInput = (input) => {
  return input.trim().slice(0, 255);  // Max length
};

// ✅ Escapar HTML
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

## HTTPS Only (Produção)

```js
// vite.config.js (dev com HTTPS opcional)
export default defineConfig({
  server: {
    https: true,  // Produção OBRIGATÓRIO
  }
});
```

## Checklist de Segurança (Pre-PR)

Antes de criar PR:

- [ ] Nenhum secret hardcoded
- [ ] Input do usuário validado
- [ ] RBAC implementado (frontend + backend)
- [ ] XSS prevenido (sem dangerouslySetInnerHTML sem sanitização)
- [ ] Multi-tenant isolation validado
- [ ] Logs não expõem dados sensíveis
- [ ] `bun audit` sem vulnerabilidades HIGH/CRITICAL
- [ ] `mise run security:scan` PASS

## Ferramentas

| Ferramenta | Uso | Comando |
|------------|-----|---------|
| gitleaks | Scan de secrets | `mise run security:scan` |
| bun audit | Vulnerabilidades deps | `bun audit` |
| ESLint | Código inseguro | `bun run lint` |

---

**Referência:** OWASP Top 10 2021
**Compliance:** LGPD (dados brasileiros)
**Tools:** gitleaks, bun audit, DOMPurify
