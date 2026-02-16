# Quick Start - app-controle (TrainB2B)

Onboarding em **5 minutos** ⚡

---

## 📋 Pré-requisitos

- ✅ WSL2 (Ubuntu 24.04 LTS)
- ✅ mise instalado ([mise.jdx.dev](https://mise.jdx.dev))
- ✅ Docker Desktop com WSL2 Integration

---

## 🚀 Setup Completo (3 minutos)

### 1. Clone & Navegue

```bash
cd /home/notebook/workspace/app-controle
```

### 2. Instale Dependências

```bash
# mise instala automaticamente: Bun 1.3.3, Node 24.x
mise install

# Instalar dependências frontend
bun install
```

### 3. Inicie Ambiente Full-Stack

```bash
# Opção A: Full-stack (Frontend + Backend)
mise full-stack
# → Frontend: http://localhost:3001
# → NocoDB Admin: http://localhost:8081

# Opção B: Frontend apenas (dados mock)
bun run dev
```

---

## 🔐 Login Demo (30 segundos)

Acesse http://localhost:3001 e faça login:

### ACME Tech Solutions

| Role | Email | Senha | Dashboard |
|------|-------|-------|-----------|
| C-Level | ceo@acmetech.com | Demo@2026 | /admin/executive |
| Admin | admin@acmetech.com | Demo@2026 | /admin |
| Instructor | prof@acmetech.com | Demo@2026 | /instructor |
| Student | maria@acmetech.com | Demo@2026 | /dashboard |

### DevCorp Consulting

| Role | Email | Senha | Dashboard |
|------|-------|-------|-----------|
| C-Level | cto@devcorp.com | Demo@2026 | /admin/executive |
| Admin | admin@devcorp.com | Demo@2026 | /admin |
| Instructor | prof@devcorp.com | Demo@2026 | /instructor |
| Student | julia@devcorp.com | Demo@2026 | /dashboard |

### Hub de Especialistas

| Role | Email | Senha | Dashboard |
|------|-------|-------|-----------|
| Specialist | joao.silva.specialist@plataformab2b.com | Demo@2026 | /specialist |

---

## 🧪 Rodar Testes (1 minuto)

```bash
# Testes unitários
bun run test

# Coverage
bun run test:coverage

# Lint
bun run lint
```

---

## 🎯 Verificação Rápida

### Health Checks

```bash
# Verificar mise
mise check

# Verificar NocoDB
mise nocodb:health

# Ver tasks disponíveis
mise tasks
```

### Credenciais NocoDB Admin

| Campo | Valor |
|-------|-------|
| URL | http://localhost:8081 |
| Email | admin@trainb2b.local |
| Senha | Admin@TrainB2B2026! |

**⚠️ IMPORTANTE:** Estas são credenciais do backend NocoDB, não dos usuários da aplicação.

---

## 📚 Estrutura do Projeto

```
app-controle/
├── src/
│   ├── components/         # 43 componentes React
│   │   ├── hub/            # 5 componentes Hub
│   │   ├── RoleBasedAccess.jsx
│   │   └── ...
│   ├── hooks/              # 7 custom hooks
│   │   ├── useAuth.js
│   │   ├── usePermissions.js
│   │   └── ...
│   ├── services/           # API integration
│   │   ├── apiService.js   # NocoDB REST
│   │   └── dataService.js
│   ├── config/             # Configurações
│   │   └── platform.js     # White-label, RBAC
│   └── i18n/               # Internacionalização
├── public/locales/         # Traduções (pt-BR, en-US, es-ES)
├── docs/                   # Documentação completa
├── .claude/                # Claude Code config
│   ├── rules/              # 10 regras condicionais
│   ├── agents/             # 6 agents especializados
│   └── commands/           # 10+ slash commands
└── database/               # Migrations + seeds
```

---

## 🔍 Explorando Features

### RBAC (5 Roles)

```bash
# Testar diferentes roles
# Login com diferentes emails demo (ver tabela acima)

# Verificar permissões
# → Admin vê gestão de usuários
# → Student vê apenas seus cursos
# → Specialist vê Hub dashboard
```

### Multi-Tenant

```bash
# Login ACME Tech vs DevCorp
# → Dados isolados por company_id
# → Logo/cores diferentes (white-label)
```

### i18n (3 Idiomas)

```bash
# Trocar idioma no selector
# → pt-BR (default)
# → en-US
# → es-ES
```

### Hub de Especialistas

```bash
# Login como specialist
joao.silva.specialist@plataformab2b.com / Demo@2026

# Acessar
http://localhost:3001/specialist

# Funcionalidades:
# → Publicar cursos
# → Ver métricas (alunos, rating)
# → Responder reviews
```

---

## 🛠️ Comandos Úteis

### Desenvolvimento

```bash
mise full-stack           # Frontend + Backend
mise run dev              # Frontend apenas
mise run build            # Build produção
mise run test             # Testes
mise run lint             # Linting
```

### Backend

```bash
mise nocodb:start         # Iniciar containers
mise nocodb:stop          # Parar containers
mise nocodb:restart       # Reiniciar
mise nocodb:health        # Health check
mise nocodb:logs          # Ver logs
```

### Deploy (Fly.io)

```bash
mise deploy:check         # Verificar pré-requisitos
mise deploy:prod          # Deploy produção
mise deploy:logs          # Logs em tempo real
mise deploy:status        # Status da app
mise deploy:suspend       # Pausar (economia)
```

### Segurança

```bash
mise security:scan        # Scan gitleaks completo
mise security:scan-staged # Scan arquivos staged
bun audit                 # Vulnerabilidades deps
```

---

## 📖 Próximos Passos

1. **Ler contexto completo:** `CLAUDE.md` (raiz)
2. **Ver roadmap:** `docs/backlog/ROADMAP.md`
3. **Explorar rules:** `.claude/rules/README.md`
4. **Testar E2E:** `.claude/E2E_TESTING.md`
5. **Ver gaps:** `docs/backlog/GAPS-DEMO-B2B.md`

---

## 🆘 Troubleshooting

### NocoDB não inicia

```bash
# Verificar Docker
docker ps

# Reiniciar containers
mise nocodb:restart

# Ver logs
docker logs app-controle-nocodb-1
```

### Frontend não conecta ao backend

```bash
# Verificar .env
cat .env  # VITE_API_BASE_URL=http://localhost:8081

# Verificar NocoDB health
curl http://localhost:8081/api/v1/health
```

### Testes falhando

```bash
# Limpar cache
rm -rf node_modules/.vite

# Reinstalar deps
bun install

# Rodar testes isolados
bun test src/components/MyComponent.test.jsx
```

### Login retorna HTTP 400

1. Verificar `docs/backend-docs/NOCODB-TROUBLESHOOTING.md`
2. Executar `mise nocodb:health`
3. Verificar TABLE_IDs em `src/services/apiService.js`

---

## 📞 Referências Rápidas

| Recurso | Link |
|---------|------|
| **NocoDB Admin** | http://localhost:8081 |
| **Frontend Dev** | http://localhost:3001 |
| **Documentação** | `docs/` |
| **Roadmap** | `docs/backlog/ROADMAP.md` |
| **METACLAUDE** | `.claude/METACLAUDE.md` |

---

**Tempo total:** ~5 minutos ⚡  
**Stack:** React + Vite + Bun + NocoDB + PostgreSQL  
**Pronto para:** Desenvolver, testar, explorar features

🎉 **Bem-vindo ao app-controle!**
