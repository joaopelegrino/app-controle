---
Tipo: Contexto de Projeto
Nome: app-controle
Descricao: Plataforma B2B de treinamento tecnico corporativo
Versao: v11.1.0
Data: 2026-02-01
Stack: React + Vite + Bun + NocoDB + PostgreSQL
Healthcare: false
Changelog: |
  v11.1.0 - Command ativar-ambiente-dev + .mcp.json (Chrome DevTools MCP)
  v11.0.0 - Documentacao conceitual completa (Missao, Personas, Arquitetura, ADRs)
  v10.0.2 - Secao Deploy Fly.io, tasks mise deploy:*, conformidade acoes-usuario
  v10.0.1 - Conformidade com ambiente-centralizado, frontmatter padrao
  v10.0.0 - Sprint 14 CRUD Cursos completo
  v9.0.0 - Sprint 13 White-Label refactor
Diretrizes: contextos/globais/SISTEMA_PROGRAMACAO/metodo-agent/ambiente-centralizado/
---

# app-controle (TrainB2B) - Plataforma B2B de Treinamento Corporativo

> **Version:** 11.1.0 | **Date:** 2026-02-01 | **Status:** Production + i18n + White-Label + CRUD Cursos + Deploy + MCP
> **Project Type:** Plataforma B2B de treinamento tecnico corporativo
> **Sprint Atual:** 14 - CRUD de Cursos COMPLETO (1 US)
> **Sprints Completos:** 6, 7, 8, 9, 10, 11, 12, 13, 14

---

## Missao e Visao

### Missao

Democratizar o treinamento tecnico corporativo atraves de uma plataforma B2B que permite empresas criarem e gerenciarem trilhas de capacitacao personalizadas, com suporte multi-idioma e identidade visual propria.

### Visao

Ser a plataforma de referencia para treinamento tecnico B2B no Brasil, oferecendo:
- Cursos personalizaveis por empresa (white-label)
- Multi-idioma nativo (pt-BR, en-US, es-ES)
- Metricas de progresso e ROI para gestores
- Custo acessivel para PMEs

### Analogia

**"Hotmart/Teachable para empresas"** - plataforma onde empresas criam seus proprios ambientes de treinamento com marca propria, gerenciam colaboradores e acompanham resultados.

---

## Proposta de Valor

### Para Empresas (Clientes B2B)

| Metrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| LMS | Generico | Personalizado (white-label) | Marca propria |
| Idiomas | Apenas EN | pt-BR, en-US, es-ES | Acessibilidade |
| Metricas | Manuais | Dashboard automatico | Visibilidade ROI |
| Setup | Semanas | Horas | -95% tempo |
| Custo | $$$$/mes | $/usuario | Escala |

### Para Gestores (Admin/C-Level)

- Dashboard executivo com metricas agregadas
- Relatorios de progresso por equipe
- Controle de acesso granular (RBAC)
- Certificados automaticos

### Para Colaboradores (Students)

- Interface intuitiva
- Progresso visual
- Certificados ao completar
- Acesso multi-dispositivo

---

## Arquitetura de Dominio

### Hierarquia de Entidades

```
COMPANY (Empresa cliente - tenant)
  └─ USER (Usuario)
      ├─ role: c_level | admin | instructor | student
      └─ ENROLLMENT (Matricula em curso)
          └─ PROGRESS (Progresso por modulo)
              └─ MODULE (Modulo do curso)
                  └─ COURSE (Curso)
```

### Cardinalidade

- 1 COMPANY → N USERS
- 1 USER → N ENROLLMENTS
- 1 COURSE → N MODULES
- 1 ENROLLMENT → N PROGRESS (1 por modulo)

### Isolamento Multi-Tenant

| Camada | Implementacao |
|--------|---------------|
| Dados | Filtro por company_id em todas queries |
| UI | White-label (logo, cores) por empresa |
| Auth | Login por empresa (subdominio futuro) |
| RBAC | Permissoes isoladas por tenant |

---

## Personas (4 Perfis Principais)

### 1. Admin (Gestor da Empresa)

- **Perfil:** RH/T&D Manager, 35-50 anos, responsavel por capacitacao
- **Dor:** Falta visibilidade de progresso, LMS caro e complexo
- **Job-to-be-Done:** Gerenciar colaboradores, monitorar progresso, gerar relatorios
- **Features:** CRUD empresas, CRUD usuarios, dashboard, white-label, relatorios
- **Jornada:** Login → Dashboard → Ver progresso equipe → Gerar relatorio → Ajustar cursos
- **Escopo MVP:** Gerenciar usuarios e ver progresso

### 2. Instructor (Professor/Criador de Conteudo)

- **Perfil:** Especialista tecnico, 30-45 anos, cria conteudo de treinamento
- **Dor:** Ferramentas de autoria complexas, sem feedback de engajamento
- **Job-to-be-Done:** Criar cursos, organizar modulos, acompanhar conclusoes
- **Features:** CRUD cursos, CRUD modulos, metricas de engajamento
- **Jornada:** Login → Meus cursos → Criar/editar curso → Ver metricas → Ajustar conteudo
- **Escopo MVP:** CRUD cursos e modulos

### 3. Student (Colaborador em Treinamento)

- **Perfil:** Funcionario, 25-55 anos, precisa capacitar-se
- **Dor:** Cursos genericos, interface confusa, sem progresso visivel
- **Job-to-be-Done:** Completar cursos no proprio ritmo, obter certificado
- **Features:** Dashboard progresso, lista cursos, player de conteudo, certificado
- **Jornada:** Login → Dashboard → Escolher curso → Assistir modulos → Obter certificado
- **Escopo MVP:** Consumir cursos e ver progresso

### 4. C-Level (Executivo)

- **Perfil:** CEO/CTO, 40-60 anos, quer ROI do investimento em treinamento
- **Dor:** Falta metricas de impacto, nao sabe se treinamento funciona
- **Job-to-be-Done:** Ver ROI, comparar equipes, justificar investimento
- **Features:** Dashboard executivo, metricas agregadas, comparativos
- **Jornada:** Login → Dashboard executivo → Ver KPIs → Exportar relatorio
- **Escopo MVP:** Dashboard com metricas agregadas

### Matriz de Capabilities por Persona

| Persona | CRUD Cursos | CRUD Usuarios | Ver Progresso | Dashboard Exec | Certificados |
|---------|-------------|---------------|---------------|----------------|--------------|
| **Admin** | Nao | Sim | Sim (todos) | Nao | Gerar |
| **Instructor** | Sim | Nao | Sim (cursos) | Nao | Nao |
| **Student** | Nao | Nao | Sim (proprio) | Nao | Receber |
| **C-Level** | Nao | Nao | Sim (agregado) | Sim | Nao |

---

## Roadmap e Estado Atual

### Progresso por Sprint

```
Sprint 6-13:  [====================] 100%  Base + Auth + RBAC + i18n + White-Label
Sprint 14:    [====================] 100%  CRUD Cursos COMPLETO
Sprint 15:    [--------------------]   0%  Proxima: Certificados Automaticos

TOTAL MVP:    [=================---]  85%
```

### Funcionalidades por Status

| Funcionalidade | Sprint | Status |
|----------------|--------|--------|
| Auth + Login | 6-7 | ✅ Completo |
| RBAC (4 roles) | 8 | ✅ 82% (18/22) |
| Dashboard Student | 9 | ✅ Completo |
| Dashboard Admin | 10 | ✅ Completo |
| i18n (3 idiomas) | 11 | ✅ Completo |
| White-Label | 12-13 | ✅ Completo |
| CRUD Cursos | 14 | ✅ Completo |
| Certificados | 15 | Planejado |
| Gamificacao | 16 | Backlog |
| Integracao LMS | 17 | Backlog |

### Proximas Prioridades

1. **P0:** Certificados automaticos (Sprint 15)
2. **P1:** Deploy producao Fly.io
3. **P2:** Gamificacao (badges, pontos)
4. **P3:** Integracao com LMS externos

---

## Stack Tecnico

### Frontend

| Tecnologia | Versao | Uso |
|------------|--------|-----|
| React | 18.x | UI Framework |
| Vite | 5.x | Build tool + HMR |
| Tailwind CSS | 3.x | Styling utility-first |
| React Router | 6.x | Routing SPA |
| i18next | 23.x | Internacionalizacao |
| Lucide React | latest | Icones |

### Backend

| Tecnologia | Versao | Uso |
|------------|--------|-----|
| NocoDB | latest | API REST automatica + Admin UI |
| PostgreSQL | 16 | Database relacional |
| Docker Compose | 2.x | Orquestracao containers |

### Runtime e Tooling

| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Bun | 1.3.3 | Runtime JS (35x mais rapido) |
| Node | 24.x | Fallback compatibilidade |
| mise | latest | Gerenciador de versoes |
| Vitest | latest | Testes unitarios |
| Playwright | latest | Testes E2E |
| ESLint | 8.x | Linting |

### Deploy

| Tecnologia | Uso |
|------------|-----|
| Fly.io | Hosting (Docker nativo, suspend/resume) |
| Docker | Build de producao |
| GitHub Actions | CI/CD |

### Custos Estimados (MVP)

| Servico | Custo/mes |
|---------|-----------|
| Fly.io (suspended) | $0 |
| Fly.io (ativo) | ~$5 |
| NocoDB (self-hosted) | $0 |
| **Total MVP** | **$0-5** |

---

## Diretrizes de Ambiente (Conformidade)

> **Fonte:** `estrutura-padrao/contextos/globais/SISTEMA_PROGRAMACAO/metodo-agent/ambiente-centralizado/`

| Diretriz | Arquivo | Aplicacao neste Projeto |
|----------|---------|------------------------|
| Principios | `01-principios.md` | SSOT, Declarativo, Idempotencia |
| Mise Config | `02-mise-config.md` | Tasks, Hooks, Templates |
| Chezmoi | `03-chezmoi-config.md` | Dotfiles (ambiente global) |
| Seguranca | `04-enriquecimento-seguranca.md` | gitleaks RECOMENDADO |

### Conformidade Atual

| Criterio | Status | Observacao |
|----------|--------|------------|
| `.mise.toml` presente | ✅ SIM | 734 linhas, 38 tasks |
| Hooks enter/leave | ✅ SIM | Menu interativo + verificacoes |
| bun como runtime | ✅ SIM | Nao usa npm |
| Security Tools | ✅ SIM | gitleaks configurado |
| Tasks deploy:* | ✅ SIM | 7 tasks Fly.io |
| Tasks security:* | ✅ SIM | 2 tasks gitleaks |
| Lockfile mise | ✅ SIM | `lockfile = true` |
| CLAUDE.md em .claude/ | ✅ SIM | Este arquivo |
| Docs deploy alinhados | ✅ SIM | Conformidade acoes-usuario |

### Proximas Acoes (Opcional)

| Acao | Prioridade | Descricao |
|------|------------|-----------|
| mise.lock | P1 | Executar `mise install` para gerar |
| Feature Flags | P3 | Implementar sistema de feature flags |
| Paranoid Mode | P3 | Habilitar para producao |

---

## Ativacao de Ambiente

> **Command:** `/skill ativar-ambiente-dev` ou ler `.claude/commands/ativar-ambiente-dev.md`

### Ativacao Rapida

```bash
# 1. Verificar ambiente
cd /home/notebook/workspace/app-controle
mise check

# 2. Iniciar full-stack (Frontend + NocoDB)
mise full-stack

# 3. Iniciar Chrome DevTools MCP (opcional, para validacao visual)
mise chrome-debug
```

### 6 Fases de Ativacao

| Fase | Descricao | Comando |
|------|-----------|---------|
| 1 | Verificar Ferramentas mise | `mise list` |
| 2 | Verificar Frontend | `ls node_modules` |
| 3 | Verificar Backend NocoDB | `mise nocodb:health` |
| 4 | Verificar MCP Chrome | `curl http://127.0.0.1:9222/json/version` |
| 5 | Ativar Ambiente | `mise full-stack` |
| 6 | Gerar Relatorio | (automatico via command) |

### Chrome DevTools MCP

Configuracao em `.mcp.json`:

```json
{
  "mcpServers": {
    "chrome-devtools-app-controle": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--browserUrl=http://127.0.0.1:9222"]
    }
  }
}
```

**Comandos MCP disponiveis:**
- `take_screenshot` - Capturar tela
- `take_snapshot` - DOM como texto
- `click`, `fill`, `fill_form` - Interagir com UI
- `list_console_messages` - Ver erros JS
- `list_network_requests` - Ver requests HTTP

---

## Quick Start

```bash
# Desenvolvimento (Frontend apenas - dados mock)
bun run dev          # Servidor local porta 3001 (ou 3000 se livre)
bun run build        # Build de producao
bun run test         # Rodar testes com Vitest

# Com Backend (requer Docker Desktop + WSL2 Integration)
# 1. Ativar Docker Desktop com "Use WSL 2 based engine"
# 2. Habilitar integracao WSL em Settings > Resources > WSL Integration
docker compose up -d           # Inicia PostgreSQL + NocoDB
bun run dev                    # Frontend conecta ao backend

# Alternativa com mise
mise nocodb:start              # Backend (PostgreSQL + NocoDB)
mise full-stack                # Frontend + Backend
```

---

## Principios do Projeto (Conformidade ambiente-centralizado)

### SSOT (Single Source of Truth)

| Tipo | SSOT | Localizacao |
|------|------|-------------|
| Ferramentas | `.mise.toml` | Raiz do projeto |
| Configuracao | `src/config/platform.js` | Centralizado |
| Traducoes | `public/locales/` | i18n |
| Backend | NocoDB + PostgreSQL | Docker |

### Declarativo sobre Imperativo

```bash
# BOM: Declarativo via mise
mise run dev
mise run nocodb:start

# RUIM: Imperativo
# npm run dev (usar bun)
# docker-compose up (usar mise task)
```

---

## Commands Disponiveis

### Desenvolvimento

| Command | Funcao |
|---------|--------|
| `mise run dev` | Start frontend |
| `mise run build` | Build producao |
| `mise run test` | Testes Vitest |
| `mise run lint` | Linting |
| `mise run nocodb:start` | Backend containers |
| `mise run full-stack` | Frontend + Backend |
| `mise run help` | Lista todos comandos |

### Deploy Fly.io

> **Referencia:** `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md`

| Command | Funcao |
|---------|--------|
| `mise run deploy:check` | Verifica pre-requisitos |
| `mise run deploy:prod` | Deploy para Fly.io |
| `mise run deploy:logs` | Logs em tempo real |
| `mise run deploy:status` | Status da aplicacao |
| `mise run deploy:open` | Abrir no browser |
| `mise run deploy:suspend` | Pausar (economia) |
| `mise run deploy:resume` | Reativar app |

### Seguranca

| Command | Funcao |
|---------|--------|
| `mise run security:scan` | Scan gitleaks completo |
| `mise run security:scan-staged` | Scan arquivos staged |

---

## Credenciais de Demo

```
Senha padrao: Demo@2026

ACME TECH SOLUTIONS:
  ceo@acmetech.com       (c_level)   -> /admin/executive
  admin@acmetech.com     (admin)     -> /admin
  prof@acmetech.com      (instructor)-> /instructor
  maria@acmetech.com     (student)   -> /dashboard

DEVCORP CONSULTING:
  cto@devcorp.com        (c_level)   -> /admin/executive
  admin@devcorp.com      (admin)     -> /admin
  prof@devcorp.com       (instructor)-> /instructor
  julia@devcorp.com      (student)   -> /dashboard
```

---

## Regras (Conformidade)

### SEMPRE

- Usar `bun` (nao npm/yarn)
- Verificar `GAPS-DEMO-B2B.md` antes de implementar
- Rodar testes antes de commit
- Seguir padroes Tailwind existentes
- Usar paths absolutos em documentacao

### NUNCA

- Usar npm/yarn (somente Bun)
- Commitar sem rodar testes
- Implementar sem verificar permissao RBAC
- Commitar credentials ou `.env` files
- Usar comandos destrutivos git (force push, hard reset)

---

## Metas e Metricas

### MVP (Q1 2026)

| Metrica | Alvo | Atual |
|---------|------|-------|
| Empresas demo | 2 | 2 ✅ |
| Usuarios demo | 8 | 8 ✅ |
| Cursos | 10 | WIP |
| RBAC coverage | 100% | 82% |
| i18n idiomas | 3 | 3 ✅ |
| Sprints completos | 15 | 14 |

### Metricas Tecnicas

| Metrica | Alvo | Atual |
|---------|------|-------|
| Lighthouse Score | >90 | ~85 |
| Bundle Size | <500KB | ~400KB |
| First Paint | <1.5s | ~1.2s |
| Test Coverage | >70% | ~60% |
| Tasks mise | 30+ | 38 ✅ |

### Metricas de Qualidade

| Metrica | Alvo |
|---------|------|
| Lint warnings | 0 |
| Type errors | 0 |
| Testes passando | 100% |
| Docs atualizados | Sim |

---

## Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| NocoDB limitacoes | Media | Alto | Migrar para API propria se necessario |
| Billing Fly.io | Baixa | Medio | Limite orcamento + suspend/resume |
| Secrets expostos | Baixa | Critico | .gitleaks.toml + security:scan |
| Performance bundle | Media | Medio | Code splitting + lazy loading |
| Dependencia Bun | Baixa | Baixo | Node como fallback |

---

## Decisoes Arquiteturais (ADRs)

### ADR-001: Bun como Runtime Principal

**Data:** 2026-01-22
**Decisao:** Usar Bun em vez de npm/node como runtime principal
**Status:** Aceito

**Contexto:**
Projeto precisa de performance em dev e CI.

**Razoes:**
- 35x mais rapido que npm para install
- Compativel com package.json existente
- Recomendacao Anthropic (Dez 2025)

**Trade-offs:**
- Menos maduro que npm
- Alguns edge cases podem falhar

**Mitigacao:**
Node.js 24 como fallback em .mise.toml

---

### ADR-002: NocoDB como Backend

**Data:** 2026-01-22
**Decisao:** Usar NocoDB como backend em vez de API propria
**Status:** Aceito

**Contexto:**
MVP precisa de backend rapido com admin visual.

**Razoes:**
- API REST automatica a partir de schema
- Admin UI para gestao de dados
- PostgreSQL como database real
- Setup em minutos

**Trade-offs:**
- Limitacoes em customizacao
- Dependencia de projeto externo

**Mitigacao:**
Schema PostgreSQL permite migrar para API propria no futuro.

---

### ADR-003: Fly.io para Deploy

**Data:** 2026-01-22
**Decisao:** Usar Fly.io em vez de Vercel/Netlify
**Status:** Aceito

**Contexto:**
Precisa de Docker nativo e economia de custos.

**Razoes:**
- Docker nativo (sem adaptacao)
- Suspend/resume para economia
- Region GRU (Sao Paulo)
- Preco por uso

**Trade-offs:**
- Curva de aprendizado CLI
- Menos integracao com GitHub

**Mitigacao:**
Tasks mise automatizam operacoes comuns.

---

### ADR-004: RBAC com 4 Roles

**Data:** 2026-01-22
**Decisao:** Implementar RBAC com 4 roles fixos
**Status:** Aceito

**Contexto:**
Multi-tenant precisa de controle de acesso.

**Roles:**
1. `c_level` - Dashboard executivo
2. `admin` - Gestao de usuarios
3. `instructor` - Criacao de cursos
4. `student` - Consumo de cursos

**Razoes:**
- Cobertura de todas personas
- Simplicidade de implementacao
- Extensivel no futuro

**Trade-offs:**
- Nao permite roles customizados
- Permissoes pre-definidas

**Mitigacao:**
Matriz de permissoes em `src/config/` permite ajustes.

---

## Ambiente WSL2/Windows

> Detalhes em arquivo legado: `/home/notebook/workspace/app-controle/CLAUDE.md` (raiz)

| Item | Valor |
|------|-------|
| Distro | Ubuntu 24.04.3 LTS |
| Shell | Zsh 5.9 |
| Projeto | `/home/notebook/workspace/app-controle` |
| Runtime | Bun 1.3.3 via mise |
| Docker | Desktop 29.1.3 com WSL2 Integration |

---

## Referencias

| Documento | Path |
|-----------|------|
| Gaps | `docs/backlog/GAPS-DEMO-B2B.md` v5.0.0 |
| Roadmap | `docs/backlog/ROADMAP.md` v6.0.0 |
| Deploy Fly.io | `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md` v1.1 |
| Acoes Usuario | `docs/backlog/acoes-usuario/ACOES-PENDENTES.md` |
| Diretrizes Ambiente | `estrutura-padrao/.../ambiente-centralizado/` |
| **Ativar Ambiente** | `.claude/commands/ativar-ambiente-dev.md` v1 |
| **MCP Config** | `.mcp.json` (Chrome DevTools MCP) |
| Arquivo Original | `/home/notebook/workspace/app-controle/CLAUDE.md` |

---

*app-controle v11.1.0 | 2026-02-01 | Command ativar-ambiente-dev + MCP*
*Stack: React + Vite + Bun + NocoDB + PostgreSQL*
*RBAC: 82% (18/22 permissoes) | i18n: pt-BR, en-US, es-ES*
*Tasks mise: 38 (dev, deploy:*, security:*, nocodb:*)*
*Personas: 4 (Admin, Instructor, Student, C-Level)*
*MCP: Chrome DevTools (porta 9222) | Command: ativar-ambiente-dev v1*
