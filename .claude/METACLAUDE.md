# METACLAUDE — Controle de Implementação Claude Code

**Projeto:** app-controle (TrainB2B) — Plataforma B2B de Treinamento Corporativo  
**Versão:** 2.1.0  
**Branch:** `dev` (PR para `principal`)  
**Criado:** 2026-02-16 | **Atualizado:** 2026-02-16  
**Sprint Atual:** 15 (Hub de Especialistas) - **COMPLETO** ✅

---

## Arquitetura Implementada

```
app-controle/
├── CLAUDE.md                              # [EXISTENTE] Contexto completo do projeto (22 KB)
├── .claude/
│   ├── METACLAUDE.md                      # [NOVO] Este arquivo — controle de implementação
│   ├── settings.json                      # [NOVO] Config global (model, permissions)
│   ├── settings.local.json                # [MODIFICADO] Config projeto (sprint, database)
│   ├── hooks.toml                         # [NOVO] Hooks automação (3 ativos)
│   ├── CHANGELOG-METACONFIGURACAO.md      # [NOVO] Histórico mudanças config
│   ├── README.md                          # [MODIFICADO] Documentação estrutura
│   │
│   ├── rules/                             # [NOVO] 10 regras condicionais por path
│   │   ├── rbac-permissions.md            # RBAC patterns (5 roles, 32 perms)
│   │   ├── react-components.md            # React + Tailwind patterns
│   │   ├── react-hooks.md                 # 7 custom hooks
│   │   ├── multi-tenant.md                # Isolamento company_id
│   │   ├── i18n-translations.md           # pt-BR, en-US, es-ES
│   │   ├── testing.md                     # Vitest + React Testing Library
│   │   ├── security.md                    # OWASP Top 10 + gitleaks
│   │   ├── api-integration.md             # NocoDB + PostgreSQL patterns
│   │   ├── white-label.md                 # Customização por tenant
│   │   ├── hub-marketplace.md             # Hub de Especialistas
│   │   └── README.md                      # Índice de rules
│   │
│   ├── skills/                            # [EXISTENTE] Skills invocáveis
│   │   ├── transcrever-video-para-curso.md
│   │   └── tmp/
│   │
│   ├── agents/                            # [EXISTENTE] 6 agents especializados
│   │   ├── code-reviewer.md
│   │   ├── security-auditor.md
│   │   ├── test-generator.md
│   │   ├── docs-engineer.md
│   │   ├── dev-environment-specialist.md
│   │   └── config-optimizer.md
│   │
│   ├── commands/                          # [EXISTENTE] 10+ slash commands
│   │   ├── quick-audit.md
│   │   ├── full-coverage.md
│   │   ├── pr-ready.md
│   │   ├── browser-testing.md
│   │   ├── ativar-ambiente-dev.md
│   │   └── ...
│   │
│   ├── logs/                              # [REORGANIZADO] Logs estruturados
│   │   ├── sprints/
│   │   └── auditorias/
│   │
│   ├── secrets/                           # [NOVO] Secrets (gitignored)
│   │   └── README.md
│   │
│   ├── QUICK_START.md                     # [NOVO] Onboarding 5 minutos
│   └── E2E_TESTING.md                     # [NOVO] Testes E2E com MCP
```

---

## Status de Implementação

### ✅ Completo (Sprints 6-15)

| Feature | Sprint | Status | Detalhes |
|---------|--------|--------|----------|
| **Auth + Login** | 6-7 | ✅ | JWT auth, localStorage |
| **RBAC (5 roles)** | 8, 15 | ✅ | 32 permissions, usePermissions hook |
| **Dashboard Student** | 9 | ✅ | Progresso, cursos, certificados |
| **Dashboard Admin** | 10 | ✅ | Gestão usuários, métricas |
| **i18n (3 idiomas)** | 11, 15 | ✅ | pt-BR (default), en-US, es-ES |
| **White-Label** | 12-13 | ✅ | Logo, cores, nome por tenant |
| **CRUD Cursos** | 14 | ✅ | Create, Read, Update, Delete |
| **Hub de Especialistas** | 15 | ✅ | 5 componentes, specialist role, marketplace |

### 🔄 Em Andamento

| Feature | Sprint | Status | Próximos Passos |
|---------|--------|--------|-----------------|
| **Certificados** | 16 | 📋 Planejado | Auto-geração ao completar curso |
| **Gamificação** | 17 | 📋 Backlog | Badges, pontos, leaderboard |
| **Integração LMS** | 18 | 📋 Backlog | Importar/exportar SCORM |

---

## Stack Técnico

### Frontend
- React 18.2 + Vite 5.x
- Tailwind CSS 3.x (utility-first)
- react-router-dom v6 (SPA routing)
- react-i18next v23 (i18n)
- Lucide React (icons)

### Backend
- NocoDB (REST API automática)
- PostgreSQL 16 (database)
- Docker Compose (orquestração)

### Runtime & Tools
- Bun 1.3.3 (primary runtime)
- Node 24.x (fallback)
- mise (version manager + task runner)
- Vitest (testing)
- MCP Chrome DevTools (E2E validation)

### Deploy
- Fly.io (Docker nativo, suspend/resume)
- GitHub Actions (CI/CD futuro)

---

## Conformidade e Qualidade

### Claude Code Metaconfiguração v2.1.0

| Item | Status | Notas |
|------|--------|-------|
| CLAUDE.md na raiz | ✅ | 22 KB contexto completo |
| settings.json global | ✅ | Model, permissions, patterns |
| settings.local.json | ✅ | Projeto, sprint, database |
| hooks.toml | ✅ | 3 hooks ativos (session-start, pre-commit, pre-deploy) |
| rules/ (10 regras) | ✅ | Ativação automática por path |
| .gitignore atualizado | ✅ | logs/, _usuario/, secrets/ |
| defaultSubagentModel | ✅ | Haiku para economia 70% |

### Métricas de Qualidade

| Métrica | Target | Atual | Status |
|---------|--------|-------|--------|
| Test Coverage | >70% | ~60% | 🟡 Melhorar |
| Lint Warnings | 0 | 0 | ✅ |
| Lighthouse Score | >90 | ~85 | 🟡 Otimizar |
| Bundle Size | <500KB | ~400KB | ✅ |
| First Paint | <1.5s | ~1.2s | ✅ |

### QA Sprint 15 (Hub de Especialistas)

| Métrica | Valor |
|---------|-------|
| Total TCs | 62 |
| PASS | 60 |
| PARTIAL | 2 |
| FAIL | 0 |
| SKIP | 0 |
| Bugs | 8 (corrigidos) |

---

## RBAC - 5 Roles + 32 Permissions

### Hierarquia de Roles

1. **c_level** - Dashboard executivo, métricas agregadas
2. **admin** - Gestão de usuários e empresa
3. **instructor** - Criação e gestão de cursos
4. **student** - Consumo de cursos, progresso
5. **specialist** - Hub de Especialistas (marketplace)

### Implementação

- **Hook:** `usePermissions()` em `src/hooks/usePermissions.js`
- **Component:** `<RoleBasedAccess>` em `src/components/RoleBasedAccess.jsx`
- **Config:** `src/config/platform.js`
- **Rule:** `.claude/rules/rbac-permissions.md` (ativa automaticamente)

---

## Multi-Tenant - Isolamento por company_id

### Empresas Demo

| Empresa | company_id | Usuários |
|---------|------------|----------|
| ACME Tech Solutions | company-1 | 4 usuários (ceo, admin, prof, maria) |
| DevCorp Consulting | company-2 | 4 usuários (cto, admin, prof, julia) |

**Senha padrão:** `Demo@2026`

### Implementação

- **Hook:** `useTenant()` em `src/hooks/useTenant.js`
- **API:** Filtro `where=(company_id,eq,...)` em TODAS queries
- **Validação:** Frontend + Backend (row-level isolation)
- **Rule:** `.claude/rules/multi-tenant.md`

---

## i18n - 3 Idiomas

- 🇧🇷 **pt-BR** (Português Brasil) - DEFAULT
- 🇺🇸 **en-US** (English US)
- 🇪🇸 **es-ES** (Español)

### Implementação

- **Hook:** `useTranslation()` from react-i18next
- **Translations:** `public/locales/{pt-BR,en-US,es-ES}/`
- **Component:** `<LanguageSelector>` para trocar idioma
- **Storage:** localStorage (`plataformab2b_language`)
- **Rule:** `.claude/rules/i18n-translations.md`

---

## Hub de Especialistas (Sprint 15)

### Componentes

- `<HubView>` - View principal
- `<CourseCatalog>` - Catálogo de cursos
- `<CourseCard>` - Card de curso
- `<CourseReviews>` - Avaliações (1-5 estrelas)
- `<SpecialistDashboard>` - Dashboard especialista
- `<SpecialistProfile>` - Perfil público

### Tabelas NocoDB

```js
specialists: 'mbn9lnlx37mfphz'
hub_courses: 'mllolxpxcihz57r'
course_reviews: 'mscbqt1jldsnswx'
v_specialist_dashboard: 'myo14y9v1ogx76a'  // View
v_hub_catalog: 'mj1emzixf2bqwlh'           // View
```

### Rule

`.claude/rules/hub-marketplace.md` (ativa em `components/hub/**`, `*specialist*`)

---

## Decisões Arquiteturais (ADRs)

### ADR-001: Bun como Runtime
**Decisão:** Usar Bun em vez de npm  
**Razão:** 35x mais rápido, recomendação Anthropic  
**Trade-off:** Menos maduro, Node como fallback

### ADR-002: NocoDB como Backend
**Decisão:** NocoDB em vez de API própria  
**Razão:** MVP rápido, admin visual, PostgreSQL real  
**Trade-off:** Limitações customização

### ADR-003: Fly.io para Deploy
**Decisão:** Fly.io em vez de Vercel  
**Razão:** Docker nativo, suspend/resume, região GRU  
**Trade-off:** Curva aprendizado CLI

### ADR-004: RBAC com 5 Roles Fixos
**Decisão:** 5 roles pré-definidos + 32 permissions granulares  
**Razão:** Simplifica implementação, cobre todos use cases MVP  
**Trade-off:** Não permite roles customizados

---

## Próximos Passos (Sprint 16+)

### P0 - Crítico
- [ ] Certificados automáticos (Sprint 16)
- [ ] Deploy produção Fly.io
- [ ] Coverage >70%

### P1 - Importante
- [ ] Gamificação (badges, pontos)
- [ ] Sistema de pagamento Hub
- [ ] CI/CD GitHub Actions

### P2 - Desejável
- [ ] Subdomínios multi-tenant
- [ ] Integração LMS (SCORM)
- [ ] Mobile app (React Native)

---

## Comandos Úteis

### Desenvolvimento
```bash
mise full-stack          # Frontend + Backend
bun run dev              # Frontend apenas
bun run test             # Testes Vitest
bun run lint             # Linting
```

### Deploy
```bash
mise deploy:check        # Verificar pré-requisitos
mise deploy:prod         # Deploy Fly.io
mise deploy:logs         # Logs em tempo real
mise deploy:suspend      # Pausar (economia)
```

### Segurança
```bash
mise security:scan       # Scan gitleaks completo
mise security:scan-staged # Scan arquivos staged
bun audit                # Vulnerabilidades deps
```

### Claude Code
```bash
/quick-audit             # Verificação rápida
/full-coverage           # Relatório coverage
/pr-ready                # Checklist pré-PR
/ativar-ambiente-dev     # Setup ambiente
```

---

## Referências

| Documento | Path |
|-----------|------|
| **Contexto Principal** | `CLAUDE.md` (raiz) |
| **Roadmap** | `docs/backlog/ROADMAP.md` v10.0.0 |
| **Gaps** | `docs/backlog/GAPS-DEMO-B2B.md` v5.0.0 |
| **Deploy** | `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md` |
| **NocoDB Docs** | `docs/backend-docs/nocodb.md` |
| **Troubleshooting** | `docs/backend-docs/NOCODB-TROUBLESHOOTING.md` |
| **Quick Start** | `.claude/QUICK_START.md` ⭐ |
| **E2E Testing** | `.claude/E2E_TESTING.md` ⭐ |
| **Rules Index** | `.claude/rules/README.md` |

---

*app-controle v12.0.0 | Metaconfiguração v2.1.0 | Sprint 15 Completo*  
*Stack: React + Vite + Bun + NocoDB + PostgreSQL*  
*RBAC: 5 roles, 32 permissions | i18n: 3 idiomas | Multi-tenant: company_id*  
*Claude Code: 10 rules, 6 agents, 10+ commands, 3 hooks*
