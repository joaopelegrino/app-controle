# Estudo de Refatoração: White-Label da Plataforma

**Data:** 2026-01-26
**Versão:** 1.0.0
**Objetivo:** Remover hardcoded "UltraThink" e implementar arquitetura white-label
**Status:** Proposta de Refatoração

---

## 1. Sumário Executivo

Este documento propõe uma refatoração para transformar a plataforma em uma solução **white-label**, removendo todas as referências hardcoded ao nome "UltraThink" e substituindo por uma arquitetura configurável.

### Benefícios da Refatoração

| Benefício | Descrição |
|-----------|-----------|
| **Multi-tenant real** | Cada cliente pode ter sua própria marca |
| **Manutenibilidade** | Alterações de branding em um único local |
| **Escalabilidade** | Facilita onboarding de novos clientes |
| **Profissionalismo** | Código genérico pronto para produção |

---

## 2. Mapeamento de Ocorrências

### 2.1 Estatísticas Gerais

```
Total de arquivos afetados: 62
Total de ocorrências: 154
├── Código fonte (src/): 13 ocorrências em 6 arquivos
├── Configuração: 25 ocorrências em 5 arquivos
├── Traduções (i18n): 6 ocorrências em 3 arquivos
├── Documentação: 110+ ocorrências em 48 arquivos
└── Docker/Infra: 6 ocorrências em 1 arquivo
```

### 2.2 Categorização por Tipo

#### Categoria A: Código Fonte (PRIORIDADE ALTA)

| Arquivo | Linha | Ocorrência | Tipo |
|---------|-------|------------|------|
| `src/contexts/AuthContext.jsx` | 20 | `ultrathink_auth` | Storage Key |
| `src/contexts/OnboardingContext.jsx` | 15 | `ultrathink_onboarding` | Storage Key |
| `src/services/apiService.js` | 28-31 | `ultrathink_api_token`, `ultrathink_refresh_token`, `ultrathink_user`, `ultrathink_table_ids` | Storage Keys |
| `src/services/apiService.js` | 58-59 | `admin@ultrathink.com`, `UltraThink@Admin2026!` | Credenciais Default |
| `src/services/dataService.js` | 29 | `STORAGE_PREFIX = 'ultrathink'` | Prefixo Storage |
| `src/i18n/config.js` | 59 | `ultrathink_language` | Storage Key |
| `src/hooks/useModuleProgress.js` | 20 | `ultrathink_progress_${courseId}` | Storage Key |

#### Categoria B: Traduções i18n (PRIORIDADE ALTA)

| Arquivo | Chave | Valor Atual |
|---------|-------|-------------|
| `public/locales/pt-BR/common.json` | `app.name` | "UltraThink" |
| `public/locales/pt-BR/common.json` | `app.copyright` | "UltraThink © 2026..." |
| `public/locales/en-US/common.json` | `app.name` | "UltraThink" |
| `public/locales/en-US/common.json` | `app.copyright` | "UltraThink © 2026..." |
| `public/locales/es-ES/common.json` | `app.name` | "UltraThink" |
| `public/locales/es-ES/common.json` | `app.copyright` | "UltraThink © 2026..." |

#### Categoria C: Configuração (PRIORIDADE MÉDIA)

| Arquivo | Ocorrência | Tipo |
|---------|------------|------|
| `package.json` | `name: "ultrathink"` | Nome do pacote |
| `docker-compose.nocodb.yml` | `UltraThink_2026_Secure` | Password default |
| `docker-compose.nocodb.yml` | `admin@ultrathink.com` | Email default |
| `docker-compose.nocodb.yml` | `UltraThink@Admin2026!` | Password default |
| `.mise.toml` | Várias referências | Tarefas mise |

#### Categoria D: Documentação (PRIORIDADE BAIXA)

```
CLAUDE.md: 3 ocorrências
README.md: 3 ocorrências
docs/backlog/*.md: 20+ ocorrências
.factory/**/*.md: 60+ ocorrências
```

---

## 3. Arquitetura Proposta

### 3.1 Arquivo de Configuração Central

Criar `src/config/platform.js`:

```javascript
/**
 * Configuração da Plataforma - White Label
 *
 * Este arquivo centraliza todas as configurações de branding
 * e pode ser sobrescrito por variáveis de ambiente.
 */

// Configuração base (pode ser sobrescrita por .env)
const DEFAULT_CONFIG = {
  // Identidade da plataforma
  platform: {
    name: import.meta.env.VITE_PLATFORM_NAME || 'Plataforma de Treinamento B2B',
    shortName: import.meta.env.VITE_PLATFORM_SHORT_NAME || 'TrainB2B',
    tagline: import.meta.env.VITE_PLATFORM_TAGLINE || 'Treinamento Corporativo Inteligente',
    copyright: import.meta.env.VITE_PLATFORM_COPYRIGHT || '© 2026 - Treinamento Corporativo',
    version: import.meta.env.VITE_PLATFORM_VERSION || '1.0.0',
  },

  // Prefixos para storage (localStorage/sessionStorage)
  storage: {
    prefix: import.meta.env.VITE_STORAGE_PREFIX || 'trainb2b',
    keys: {
      auth: 'auth',
      user: 'user',
      token: 'api_token',
      refreshToken: 'refresh_token',
      tableIds: 'table_ids',
      language: 'language',
      onboarding: 'onboarding',
      progress: (courseId) => `progress_${courseId}`,
      notes: (courseId) => `notes_${courseId}`,
    }
  },

  // URLs e endpoints
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },

  // Configurações de UI
  ui: {
    defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'pt-BR',
    supportedLanguages: ['pt-BR', 'en-US', 'es-ES'],
  },
};

// Helper para construir chaves de storage com prefixo
export const getStorageKey = (key) => {
  const prefix = DEFAULT_CONFIG.storage.prefix;
  return `${prefix}_${key}`;
};

// Helper para chaves dinâmicas
export const getProgressKey = (courseId) => {
  return getStorageKey(DEFAULT_CONFIG.storage.keys.progress(courseId));
};

export const getNotesKey = (courseId) => {
  return getStorageKey(DEFAULT_CONFIG.storage.keys.notes(courseId));
};

// Exportar configuração
export const platformConfig = DEFAULT_CONFIG;
export default platformConfig;
```

### 3.2 Variáveis de Ambiente

Criar/atualizar `.env.example`:

```bash
# ===========================================
# CONFIGURAÇÃO DA PLATAFORMA (WHITE-LABEL)
# ===========================================

# Identidade da Plataforma
VITE_PLATFORM_NAME="Plataforma de Treinamento B2B"
VITE_PLATFORM_SHORT_NAME="TrainB2B"
VITE_PLATFORM_TAGLINE="Treinamento Corporativo Inteligente"
VITE_PLATFORM_COPYRIGHT="© 2026 - Treinamento Corporativo"
VITE_PLATFORM_VERSION="1.0.0"

# Storage (localStorage prefix)
VITE_STORAGE_PREFIX="trainb2b"

# API
VITE_API_BASE_URL="http://localhost:8081"
VITE_API_TIMEOUT="30000"

# i18n
VITE_DEFAULT_LANGUAGE="pt-BR"

# ===========================================
# BACKEND (Docker)
# ===========================================

# Database
DB_PASSWORD="Secure_Password_2026"

# NocoDB Admin
ADMIN_EMAIL="admin@empresa.com"
ADMIN_PASSWORD="Admin@Secure2026!"

# JWT
JWT_SECRET="your_jwt_secret_here"
```

### 3.3 Estrutura de Arquivos Proposta

```
src/
├── config/
│   ├── platform.js          # Configuração centralizada (NOVO)
│   ├── index.js             # Re-exports
│   └── constants.js         # Constantes não-configuráveis (NOVO)
├── contexts/
│   ├── AuthContext.jsx      # Importar de config/platform.js
│   └── OnboardingContext.jsx
├── services/
│   ├── apiService.js        # Importar de config/platform.js
│   └── dataService.js       # Importar de config/platform.js
├── hooks/
│   └── useModuleProgress.js # Importar de config/platform.js
└── i18n/
    └── config.js            # Importar de config/platform.js
```

---

## 4. Plano de Implementação

### Fase 1: Infraestrutura (US-119)

**Objetivo:** Criar arquivo de configuração central

**Arquivos a criar:**
- `src/config/platform.js`
- `src/config/index.js`
- `.env.example` (atualizar)

**Estimativa:** Baixa complexidade

### Fase 2: Migração de Storage Keys (US-120)

**Objetivo:** Refatorar todos os arquivos que usam storage keys

**Arquivos a modificar:**

| Arquivo | Modificação |
|---------|-------------|
| `src/contexts/AuthContext.jsx` | Importar `getStorageKey` |
| `src/contexts/OnboardingContext.jsx` | Importar `getStorageKey` |
| `src/services/apiService.js` | Importar `platformConfig` |
| `src/services/dataService.js` | Importar `platformConfig` |
| `src/hooks/useModuleProgress.js` | Importar `getProgressKey` |
| `src/i18n/config.js` | Importar `platformConfig` |

**Padrão de migração:**

```javascript
// ANTES
const AUTH_STORAGE_KEY = 'ultrathink_auth';

// DEPOIS
import { getStorageKey } from '../config/platform';
const AUTH_STORAGE_KEY = getStorageKey('auth');
```

**Estimativa:** Média complexidade

### Fase 3: Migração de Traduções (US-121)

**Objetivo:** Tornar nome da plataforma configurável via i18n

**Abordagem:** Manter nos arquivos de tradução, mas documentar que é configurável por cliente.

**Arquivos a modificar:**
- `public/locales/pt-BR/common.json`
- `public/locales/en-US/common.json`
- `public/locales/es-ES/common.json`

**Padrão sugerido:**

```json
{
  "app": {
    "name": "{{platformName}}",
    "tagline": "Treinamento Corporativo Inteligente",
    "copyright": "{{platformName}} © {{year}} - Treinamento Corporativo"
  }
}
```

**Estimativa:** Baixa complexidade

### Fase 4: Migração de Docker/Infra (US-122)

**Objetivo:** Remover credenciais hardcoded do docker-compose

**Arquivos a modificar:**
- `docker-compose.nocodb.yml`

**Padrão:**

```yaml
# ANTES
POSTGRES_PASSWORD: ${DB_PASSWORD:-UltraThink_2026_Secure}

# DEPOIS
POSTGRES_PASSWORD: ${DB_PASSWORD:?DB_PASSWORD is required}
```

**Estimativa:** Baixa complexidade

### Fase 5: Documentação (US-123)

**Objetivo:** Atualizar documentação com nomenclatura genérica

**Estratégia:**
- Manter "UltraThink" como nome de exemplo em docs de contexto
- Usar "Plataforma de Treinamento B2B" em docs técnicas

**Arquivos principais:**
- `CLAUDE.md`
- `README.md`
- `docs/backlog/ROADMAP.md`

**Estimativa:** Baixa complexidade (pode ser feito gradualmente)

---

## 5. Matriz de Impacto

### 5.1 Risco vs Esforço

| Fase | Risco | Esforço | Prioridade |
|------|-------|---------|------------|
| Fase 1: Infraestrutura | Baixo | Baixo | P0 (Crítico) |
| Fase 2: Storage Keys | Médio | Médio | P0 (Crítico) |
| Fase 3: Traduções | Baixo | Baixo | P1 (Alto) |
| Fase 4: Docker | Baixo | Baixo | P1 (Alto) |
| Fase 5: Documentação | Nenhum | Médio | P2 (Médio) |

### 5.2 Dependências

```
┌─────────────────────────────────────────┐
│         ORDEM DE IMPLEMENTAÇÃO          │
├─────────────────────────────────────────┤
│                                         │
│  Fase 1: Infraestrutura                 │
│     │                                   │
│     ▼                                   │
│  Fase 2: Storage Keys ◄─── Dependente   │
│     │                                   │
│     ├──► Fase 3: Traduções (paralelo)   │
│     │                                   │
│     └──► Fase 4: Docker (paralelo)      │
│                                         │
│  Fase 5: Documentação (qualquer momento)│
│                                         │
└─────────────────────────────────────────┘
```

---

## 6. Migração de Dados Existentes

### 6.1 Script de Migração de localStorage

Usuários existentes terão dados salvos com prefixo `ultrathink_`.
É necessário um script de migração:

```javascript
// src/utils/storageMigration.js

import { platformConfig, getStorageKey } from '../config/platform';

const OLD_PREFIX = 'ultrathink';
const NEW_PREFIX = platformConfig.storage.prefix;

/**
 * Migra dados do localStorage do prefixo antigo para o novo
 * Deve ser executado uma vez no boot da aplicação
 */
export function migrateLocalStorage() {
  // Verificar se já migrou
  const migrationKey = getStorageKey('_migration_complete');
  if (localStorage.getItem(migrationKey)) {
    return { migrated: false, reason: 'already_migrated' };
  }

  const keysToMigrate = [
    'auth',
    'user',
    'api_token',
    'refresh_token',
    'table_ids',
    'language',
    'onboarding',
  ];

  let migratedCount = 0;

  // Migrar chaves fixas
  keysToMigrate.forEach(key => {
    const oldKey = `${OLD_PREFIX}_${key}`;
    const newKey = getStorageKey(key);
    const value = localStorage.getItem(oldKey);

    if (value) {
      localStorage.setItem(newKey, value);
      localStorage.removeItem(oldKey);
      migratedCount++;
    }
  });

  // Migrar chaves dinâmicas (progress_*, notes_*)
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(`${OLD_PREFIX}_progress_`) ||
        key.startsWith(`${OLD_PREFIX}_notes_`)) {
      const suffix = key.replace(`${OLD_PREFIX}_`, '');
      const newKey = getStorageKey(suffix);
      const value = localStorage.getItem(key);

      if (value) {
        localStorage.setItem(newKey, value);
        localStorage.removeItem(key);
        migratedCount++;
      }
    }
  });

  // Marcar como migrado
  localStorage.setItem(migrationKey, new Date().toISOString());

  return { migrated: true, count: migratedCount };
}
```

### 6.2 Integração no App Bootstrap

```javascript
// src/main.jsx ou App.jsx
import { migrateLocalStorage } from './utils/storageMigration';

// Executar migração antes de renderizar
const migrationResult = migrateLocalStorage();
if (migrationResult.migrated) {
  console.log(`[Migration] Migrated ${migrationResult.count} storage keys`);
}
```

---

## 7. Testes de Validação

### 7.1 Checklist de Testes

- [ ] Novo usuário consegue fazer login (sem dados migrados)
- [ ] Usuário existente mantém progresso após migração
- [ ] Usuário existente mantém notas após migração
- [ ] Troca de idioma funciona com novo storage key
- [ ] Onboarding funciona com novo storage key
- [ ] Logout limpa dados corretamente
- [ ] Build de produção funciona com .env configurado

### 7.2 Teste E2E via MCP

```javascript
// Limpar storage antigo
mcp__chrome-devtools__evaluate_script({
  function: "() => { Object.keys(localStorage).filter(k => k.startsWith('ultrathink_')).forEach(k => localStorage.removeItem(k)); return 'cleared'; }"
})

// Verificar migração
mcp__chrome-devtools__evaluate_script({
  function: "() => Object.keys(localStorage).filter(k => k.startsWith('trainb2b_'))"
})
```

---

## 8. Backlog de User Stories

### Sprint 13: White-Label

| US | Descrição | Complexidade | Dependência |
|----|-----------|--------------|-------------|
| **US-119** | Criar `src/config/platform.js` com configuração centralizada | L | - |
| **US-120** | Migrar storage keys em 6 arquivos para usar config central | M | US-119 |
| **US-121** | Atualizar traduções i18n para suportar nome configurável | L | US-119 |
| **US-122** | Remover credenciais hardcoded do docker-compose | L | - |
| **US-123** | Criar script de migração de localStorage | M | US-119, US-120 |
| **US-124** | Atualizar documentação principal (CLAUDE.md, README.md) | L | - |

### Estimativa Total

```
User Stories: 6
Complexidade Total: 2L + 2M + 2L = Média
Arquivos a modificar: ~15
Arquivos a criar: 3
```

---

## 9. Considerações Finais

### 9.1 Vantagens da Abordagem

1. **Retrocompatível:** Script de migração preserva dados de usuários existentes
2. **Configurável:** Variáveis de ambiente permitem customização sem rebuild
3. **Centralizada:** Uma única fonte de verdade para configurações de branding
4. **Testável:** Fácil de testar com diferentes configurações

### 9.2 Alternativas Consideradas

| Alternativa | Motivo de Descarte |
|-------------|-------------------|
| Search & Replace global | Não é manutenível, difícil de reverter |
| Arquivos de tema por cliente | Complexidade excessiva para o momento |
| Configuração em runtime via API | Requer backend adicional |

### 9.3 Próximos Passos

1. **Aprovar** este documento de estudo
2. **Criar branch** `feature/white-label-refactor`
3. **Implementar** US-119 (config central)
4. **Testar** com build local
5. **Migrar** demais arquivos (US-120 a US-124)
6. **Validar** com testes E2E
7. **Merge** para branch principal

---

**Autor:** Claude Code Analysis
**Revisão:** Pendente aprovação
**Próxima ação:** Aprovar ou solicitar ajustes

