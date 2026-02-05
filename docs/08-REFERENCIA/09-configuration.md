# Configuration

O app-controle utiliza uma arquitetura de configuracao em camadas, permitindo customizacao por ambiente sem modificar o codigo.

## Arquivos de Configuracao

| Arquivo | Proposito | Versionado |
|---------|-----------|------------|
| `.mise.toml` | Ferramentas e tasks de desenvolvimento | Sim |
| `.env.nocodb` | Credenciais do backend | **Nao** |
| `src/config/platform.js` | Configuracao da plataforma (white-label) | Sim |
| `vite.config.js` | Configuracao do bundler | Sim |
| `tailwind.config.js` | Estilos CSS | Sim |

---

## .mise.toml

Configuracao principal do ambiente de desenvolvimento.

### Estrutura

```toml
# Ferramentas de runtime
[tools]
bun = "1.3.3"
node = "24.11.1"
gitleaks = "latest"

# Variaveis de ambiente
[env]
PROJECT_NAME = "ultrathink"
NODE_ENV = "development"
VITE_PORT = "3001"

# Hooks de automacao
[hooks]
enter = "..."
leave = "..."

# Tasks
[tasks.dev]
description = "Inicia servidor"
run = "bun run dev"

# Configuracoes
[settings]
yes = true
lockfile = true
```

### Secoes Principais

#### [tools]

Define versoes de ferramentas:

```toml
[tools]
bun = "1.3.3"           # Versao exata
node = "24"             # Major version (resolve para 24.x.x)
gitleaks = "latest"     # Sempre mais recente
"cargo:ripgrep" = "latest"  # Via cargo (Rust)
```

#### [env]

Variaveis de ambiente carregadas ao entrar no diretorio:

```toml
[env]
NODE_ENV = "development"
VITE_PORT = "3001"
NOCODB_URL = "http://localhost:8081"
```

#### [hooks]

Scripts executados automaticamente:

```toml
[hooks]
enter = """
# Executado ao entrar no diretorio
echo "Bem-vindo ao projeto!"
"""

leave = """
# Executado ao sair
echo "Ate logo!"
"""
```

#### [tasks]

Comandos disponiveis via `mise run`:

```toml
[tasks.dev]
description = "Inicia servidor"
run = "bun run dev"

[tasks.deploy]
depends = ["build", "test"]
run = "flyctl deploy"
```

#### [settings]

Configuracoes do mise:

```toml
[settings]
yes = true          # Nao pedir confirmacao
verbose = false     # Modo silencioso
lockfile = true     # Usar mise.lock
experimental = true # Features experimentais
```

---

## Variaveis de Ambiente

### Desenvolvimento (.env.nocodb)

Arquivo local com credenciais do backend:

```env
# PostgreSQL
POSTGRES_USER=nocodb_user
POSTGRES_PASSWORD=SenhaSegura123!
POSTGRES_DB=app_controle

# NocoDB
NC_AUTH_JWT_SECRET=jwt-secret-muito-longo
NC_PUBLIC_URL=http://localhost:8081
```

::: warning Seguranca
O arquivo `.env.nocodb` **nunca** deve ser commitado. Esta no `.gitignore`.
:::

### Build (vite.config.js)

Variaveis expostas no frontend (prefixo `VITE_`):

```javascript
// Acessiveis via import.meta.env
VITE_PLATFORM_NAME      // Nome da plataforma
VITE_PLATFORM_SHORT_NAME // Nome curto
VITE_STORAGE_PREFIX      // Prefixo do localStorage
VITE_API_BASE_URL        // URL da API
```

---

## Configuracao White-Label

A plataforma suporta customizacao de marca via `src/config/platform.js`:

```javascript
// src/config/platform.js
export const platform = {
  // Identidade
  name: import.meta.env.VITE_PLATFORM_NAME || 'TrainB2B',
  shortName: import.meta.env.VITE_PLATFORM_SHORT_NAME || 'TrainB2B',

  // Storage
  storagePrefix: import.meta.env.VITE_STORAGE_PREFIX || 'trainb2b',

  // API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
};

// Chaves de storage derivadas
export const storageKeys = {
  auth: `${platform.storagePrefix}_auth`,
  user: `${platform.storagePrefix}_user`,
  language: `${platform.storagePrefix}_language`,
  onboarding: `${platform.storagePrefix}_onboarding`,
};
```

### Customizando para Outra Marca

1. Crie um `.env.local`:

```env
VITE_PLATFORM_NAME="Minha Empresa Training"
VITE_PLATFORM_SHORT_NAME="MET"
VITE_STORAGE_PREFIX="met"
```

2. Rebuild:

```sh
mise build
```

---

## Configuracao do Vite

O `vite.config.js` define o bundler:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

### Portas

| Servico | Porta | Configuracao |
|---------|-------|--------------|
| Frontend (dev) | 3001 | `VITE_PORT` |
| Frontend (preview) | 4173 | Default Vite |
| NocoDB | 8081 | `docker-compose.nocodb.yml` |
| PostgreSQL | 5432 | `docker-compose.nocodb.yml` |

---

## Configuracao do Tailwind

O `tailwind.config.js` define estilos:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores customizadas
        primary: '#3B82F6',
        secondary: '#10B981',
      },
    },
  },
  plugins: [],
};
```

---

## Configuracao de Internacionalizacao

O `src/i18n/config.js` configura idiomas:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
    ns: ['common', 'auth', 'errors', 'dashboard'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
```

### Idiomas Suportados

| Codigo | Idioma | Status |
|--------|--------|--------|
| pt-BR | Portugues (Brasil) | Completo |
| en-US | English | Completo |
| es-ES | Espanol | Completo |

---

## Ordem de Precedencia

Configuracoes sao carregadas nesta ordem (ultima vence):

1. **Defaults no codigo** - Valores padrao em `platform.js`
2. **`.mise.toml`** - Variaveis de ambiente do projeto
3. **`.env.nocodb`** - Credenciais locais
4. **Variaveis do sistema** - `export VAR=value`
5. **Linha de comando** - `VITE_PORT=3002 mise dev`

---

## Exemplo: Configuracao Completa

Para um ambiente de desenvolvimento tipico:

```sh
# 1. Clone o projeto
git clone https://github.com/joaopelegrino/app-controle.git
cd app-controle

# 2. Instale ferramentas
mise install

# 3. Configure backend (cria .env.nocodb)
mise nocodb:setup

# 4. Inicie
mise full-stack
```

::: info Configuracao Avancada
Para cenarios especificos (CI/CD, Docker, producao), veja:
- [Deploy Fly.io](/docs/deploy-docs/flyio.md)
- [CI/CD](/docs/deploy-docs/ci-cd.md)
:::
