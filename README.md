# FluSisTip - Plataforma de Onboarding Tecnico

**Branch:** `feature/onboarding-flusistip-forensic`
**Stack:** React 18 + Vite 5 + Tailwind CSS + NocoDB + PostgreSQL
**Data:** 2026-02-17

---

## O que e o FluSisTip?

Plataforma de onboarding tecnico para novos colaboradores do projeto FluSisTip (Healthcare LLM). Esta branch contem **exclusivamente** conteudo FluSisTip — sem cursos genericos (Bash), trilhas propostas ou Hub de Especialistas. Oferece uma trilha estruturada de 5 cursos com 35 modulos, 50 flash cards e checklists por persona.

### Trilha de Aprendizado (5 Cursos)

```
FluSisTip Fundamentos (8h, 5 modulos) ─── beginner
    ├── FluSisTip Dominio (12h, 8 modulos) ─── intermediate
    │       └── FluSisTip Workflow (15h, 9 modulos) ─── advanced
    │       └── FluSisTip LLM (10h, 6 modulos) ─── advanced
    └── FluSisTip Frontend (12h, 7 modulos) ─── intermediate
```

- **35 modulos** com complexidade 4D (conceitual, tecnico, dominio, integracao)
- **50 flash cards** com rastreabilidade de fonte
- **4 checklists** por persona (71 items verificaveis)

---

## 2 Personas

A tela de login apresenta 2 botoes de acesso rapido:

| Persona | Email | Role | Acesso |
|---------|-------|------|--------|
| **Colaborador FluSisTip** | maria@acmetech.com | student | Hub de Aprendizado, Dashboard, Cursos, Flash Cards |
| **Profissional de Capacitacao** | prof@acmetech.com | instructor | Dashboard do Time, Catalogo, Gestao de Alunos |

**Senha:** `Demo@2026`

### Colaborador FluSisTip (student)

Acessa a trilha de aprendizado:
- `/` — Hub com 5 areas FluSisTip (stats: 5 areas, 35 modulos, 57h)
- `/dashboard` — Meu Progresso (cursos, notas)
- `/curso/*` — Conteudo dos cursos + flash cards

Bloqueado em:
- `/admin` — Acesso Negado
- `/instructor` — Acesso Negado
- `/admin/executive` — Acesso Negado
- `/specialist` — Acesso Negado

### Profissional de Capacitacao (instructor)

Gerencia o onboarding e acompanha progresso:
- `/instructor` — Dashboard do time (alunos, progresso, notas)
- `/` — Hub de Aprendizado (visao dos cursos)
- `/curso/*` — Conteudo dos cursos

---

## Como Rodar

### Pre-requisitos

- **Bun 1.3.3+** (via mise)
- **Docker Desktop** com WSL2 Integration (para backend)

### Frontend (dados mock)

```bash
bun install
bun run dev
# Acesse: http://localhost:3001/login
```

### Full Stack (recomendado)

```bash
# 1. Backend
docker compose -f docker-compose.nocodb.yml up -d

# 2. Migrations
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-002-enrollments.sql

# 3. Seed FluSisTip (5 cursos)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/seed-onboarding-flusistip.sql

# 4. Frontend
bun run dev
```

### Testes

```bash
bun run test
# 74/75 pass (1 falha pre-existente nao relacionada ao FluSisTip)
```

---

## Artefatos do Onboarding

```
app-controle/
├── docs/onboarding/flusistip/
│   ├── RELATORIO-FORENSE.md            # Diagnostico completo (metricas, gaps)
│   └── TRILHA-ONBOARDING.md            # Visao geral 5 cursos + DAG
├── src/data/
│   ├── flusistipOnboardingData.js       # 5 cursos, 35 modulos, complexidade 4D
│   ├── flusistipFlashCards.js           # 50 flash cards com rastreabilidade
│   ├── flusistipOnboardingChecklist.js  # 4 personas, 71 items verificaveis
│   └── studyAreas.js                   # 5 areas FluSisTip (somente onboarding)
├── database/
│   └── seed-onboarding-flusistip.sql    # 5 cursos para NocoDB (idempotente)
└── src/components/
    ├── LoginView.jsx                    # Login com 2 botoes FluSisTip
    └── HubView.jsx                      # Hub exclusivo FluSisTip (sem Bash/Caminhos/Hub Especialistas)
```

---

## Validacao

Comando de validacao completa (57 test cases, 7 layers):

```
/validacao-onboarding-flusistip
```

Resultado atual: **45 PASS | 2 FAIL | 6 PARTIAL | 4 SKIP (79%)**

---

## Stack

| Tecnologia | Uso |
|------------|-----|
| React 18 | UI Framework |
| Vite 5 | Build + HMR |
| Tailwind CSS 3 | Styling |
| react-router-dom v6 | Routing SPA |
| react-i18next | i18n (pt-BR, en-US, es-ES) |
| NocoDB + PostgreSQL 16 | Backend |
| Vitest | Testes unitarios |
| Bun 1.3.3 | Runtime JS |

---

**Desenvolvido por:** TrainB2B
**Branch:** `feature/onboarding-flusistip-forensic`
**Base:** app-controle v12.0.0
