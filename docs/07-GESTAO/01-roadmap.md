# ROADMAP CONSOLIDADO - Plataforma B2B

**Versao:** 10.0.0
**Data:** 2026-02-09
**Branch:** `dev`
**Status:** Sprint 14 COMPLETO + Hub de Especialistas PLANEJADO
**Documento:** Autocontido - Roadmap + Checklist de Implementacao

---

## 1. Visao Geral do Projeto

**Plataforma B2B** - Plataforma SaaS de treinamento tecnico corporativo.

### Pilares
1. **LMS Corporativo** (implementado) - Empresas criam/consomem cursos internos
2. **Hub de Especialistas** (este roadmap) - Marketplace B2B2C com especialistas externos

### Estado Atual (2026-02-09)

| Componente | Status | Detalhe |
|-----------|--------|---------|
| Frontend React 18 + Vite 5 | ✅ Producao | 48 componentes, Tailwind CSS |
| Backend NocoDB + PostgreSQL 16 | ✅ Funcional | API REST auto-gerada |
| Autenticacao JWT + RBAC | ✅ 5 roles | student, instructor, specialist, admin, c_level |
| RBAC Permissoes | ✅ 32 permissoes | 5 roles, Hub permissions incluidas |
| Dashboards Contextuais | ✅ 5 dashboards | User, Instructor, Specialist, Admin, Executive |
| CRUD Usuarios | ✅ Completo | Criar, editar, soft-delete, reativar |
| CRUD Cursos | ✅ Completo | Sprint 14 - CourseFormModal |
| Matriculas | ✅ Completo | EnrollUserModal, bulk enrollment |
| Exportacao | ✅ Excel/JSON | ExportButton em 3 dashboards |
| Analytics | ✅ Avancado | Modulos dificeis, ROI, progress |
| i18n | ✅ 3 idiomas | pt-BR, en-US, es-ES (~355 strings) |
| White-Label | ✅ Plataforma B2B | Configuravel via platform.js |
| Responsividade | ✅ Mobile | MobileMenu, useMediaQuery |
| UX Polish | ✅ Completo | Toasts, skeletons, empty states, onboarding |
| Hub de Especialistas | ✅ Sprint 15 | B2B2C marketplace, 5 componentes, revenue 70/30 |

---

## 2. Historico de Sprints (6-14 Completos)

| Sprint | Tema | USs | Status |
|--------|------|-----|--------|
| 6 | Base B2B (Auth, RBAC, API, Dashboards) | 19/19 | ✅ |
| 7 | CRUD Usuarios | 3/3 | ✅ |
| 8 | Dashboard Instrutor | 3/3 | ✅ |
| 9 | Matriculas e Exportacao | 4/4 | ✅ |
| 10 | Analytics + Toast + Loading + Onboarding | 4/4 | ✅ |
| 11 | UX Polish (Empty States, Confirm, Mobile, Auth JWT) | 4/4 | ✅ |
| 12 | Internacionalizacao i18n | 6/6 | ✅ |
| 13 | White-Label (Plataforma B2B) | 6/6 | ✅ |
| 14 | CRUD de Cursos + Integracao Docs Plataforma B2B | 6/6 | ✅ |
| **Total** | | **55/55** | **100%** |

---

## 3. Decisoes de Produto - Hub de Especialistas (Q1-Q6)

> Questoes criticas que bloqueavam implementacao do Hub. Resolvidas adotando recomendacoes da documentacao.

| # | Questao | Decisao | Justificativa |
|---|---------|---------|---------------|
| **Q1** | Revenue share fixo ou variavel? | **Fixo 70/30** | Simplicidade operacional. Especialista recebe 70%, plataforma 30%. Evoluir para tiers depois de atingir 100+ especialistas |
| **Q2** | Especialista paga mensalidade? | **Nao** | Atrair massa critica inicial. Sem barreira de entrada. Revenue share como unico modelo |
| **Q3** | Quem define preco do curso? | **Especialista com faixa sugerida** | Especialista define livremente, plataforma sugere R$ 50-200/mes. Faixa visivel no formulario |
| **Q4** | Credenciais obrigatorias? | **LinkedIn + 1 comprovacao** | LinkedIn obrigatorio. Minimo 1 de: certificacao tecnica, portfolio GitHub, ou anos de experiencia documentados |
| **Q5** | Aprovacao antes de publicar? | **Checklist auto + revisao manual 48h** | Checklist automatizado (min 4 modulos, descricao 200+ chars, thumbnail). Revisao humana em 48h uteis |
| **Q6** | Criterios de remocao? | **Rating < 3.0 por 3 meses OU 3+ reclamacoes graves** | Aviso ao especialista apos 1o mes < 3.0. Suspensao automatica apos 3 meses consecutivos |

---

## 4. Sprint 15: Hub de Especialistas - Foundation

### 4.1 Fase 1: Database + RBAC + Config

#### US-142: Migration Hub de Especialistas
- [x] **CRIAR** `database/migration-003-hub-especialistas.sql`
  - [x] Atualizar CHECK constraint `users.role` para incluir `'specialist'`
  - [x] Adicionar coluna `source VARCHAR(50) DEFAULT 'internal'` em `courses`
  - [x] Adicionar coluna `specialist_id UUID` em `courses`
  - [x] Criar tabela `specialists`
  - [x] Criar tabela `hub_courses`
  - [x] Criar tabela `course_reviews`
  - [x] Criar view `v_specialist_dashboard`
  - [x] Criar view `v_hub_catalog`
  - [x] Criar indices para performance

#### US-143: Seed Especialista Ficticio "Joao Silva"
- [x] Seed na mesma migration:
  - [x] Empresa "Hub de Especialistas" (id: 550e...99)
  - [x] Usuario "Joao Silva" role=specialist
  - [x] Perfil specialist com credenciais
  - [x] hub_courses: vincular curso bash existente
  - [x] course_reviews: 2 reviews de exemplo

#### US-144: Estender RBAC para 5 Roles
- [x] **MODIFICAR** `src/hooks/usePermissions.js`
  - [x] Adicionar 'specialist' em permissoes existentes
  - [x] Adicionar 11 novas permissoes hub_*
  - [x] ROLE_LABELS e ROLE_COLORS
  - [x] Retorno: isSpecialist, canManageHubCourses, canViewCatalog

#### US-145: Configuracao Hub na Plataforma
- [x] **MODIFICAR** `src/config/platform.js`
  - [x] Adicionar secao `hub` com configuracoes

#### US-146: Componente SpecialistOnly
- [x] **MODIFICAR** `src/components/RoleBasedAccess.jsx`
  - [x] Adicionar export `SpecialistOnly`

---

### 4.2 Fase 2: Componentes UI do Especialista

#### US-147: SpecialistDashboard
- [ ] **CRIAR** `src/components/hub/SpecialistDashboard.jsx`

#### US-148: SpecialistProfile
- [ ] **CRIAR** `src/components/hub/SpecialistProfile.jsx`

#### US-149: CourseCatalog (Marketplace)
- [ ] **CRIAR** `src/components/hub/CourseCatalog.jsx`

#### US-150: CourseReviews
- [ ] **CRIAR** `src/components/hub/CourseReviews.jsx`

#### US-151: CourseCard (Reutilizavel)
- [ ] **CRIAR** `src/components/hub/CourseCard.jsx`

---

### 4.3 Fase 3: Integracao (Rotas, API, i18n, Header)

#### US-152: Rotas do Hub
- [ ] **MODIFICAR** `src/components/SistemaEducacionalCompleto.jsx`

#### US-153: Secao Marketplace no HubView
- [ ] **MODIFICAR** `src/components/HubView.jsx`

#### US-154: API Service - Funcoes Hub
- [ ] **MODIFICAR** `src/services/apiService.js`

#### US-155: Navegacao do Especialista no Header
- [ ] **MODIFICAR** `src/components/UserHeader.jsx`

#### US-156-158: Traducoes i18n Hub (3 idiomas)
- [ ] **MODIFICAR** `public/locales/pt-BR/*.json`
- [ ] **MODIFICAR** `public/locales/en-US/*.json`
- [ ] **MODIFICAR** `public/locales/es-ES/*.json`

---

### 4.4 Fase 4: Testes e Documentacao

#### US-159: Atualizar Testes Unitarios Existentes
- [ ] **MODIFICAR** testes auth, HubView, users

#### US-160: Novos Testes Unitarios
- [ ] **CRIAR** testes SpecialistDashboard, CourseCatalog

#### US-161: Atualizar Specs E2E
- [ ] **MODIFICAR** `docs/04-QUALIDADE/01-qa-e2e-specs.md`

#### US-162: Atualizar Roadmap
- [x] **SUBSTITUIR** `docs/07-GESTAO/01-roadmap.md` (este documento)

#### US-163: Atualizar Questoes em Aberto
- [ ] **MODIFICAR** `docs/01-PRODUTO/07-questoes-em-aberto.md`

---

## 5. Grafo de Dependencias

```
Fase 1: Foundation (sem dependencias externas)
  |
  +-- US-142: Migration SQL (sem deps)
  +-- US-143: Seed Joao Silva (depende de US-142)
  +-- US-144: usePermissions.js (sem deps)
  +-- US-145: platform.js (sem deps)
  +-- US-146: RoleBasedAccess.jsx (depende de US-144)
  |
Fase 2: UI Components (depende de Fase 1)
  |
  +-- US-151: CourseCard.jsx (sem deps internas)
  +-- US-147: SpecialistDashboard.jsx (depende de US-144 + US-154)
  +-- US-148: SpecialistProfile.jsx (depende de US-154)
  +-- US-149: CourseCatalog.jsx (depende de US-151 + US-154)
  +-- US-150: CourseReviews.jsx (depende de US-154)
  |
Fase 3: Integration (depende de Fase 1 + Fase 2)
  |
  +-- US-154: apiService.js (depende de US-142 para table IDs)
  +-- US-152: Rotas (depende de todos componentes)
  +-- US-153: HubView.jsx (depende de US-156)
  +-- US-155: UserHeader.jsx (depende de US-144)
  +-- US-156/157/158: i18n (sem deps, paralelizavel)
  |
Fase 4: Tests & Docs (depende de todas as fases)
  |
  +-- US-159: Testes existentes (depende de US-144 + US-153)
  +-- US-160: Novos testes (depende de US-147 + US-149)
  +-- US-161: Specs E2E (documentacao, sem deps de codigo)
  +-- US-162: Roadmap (documentacao)
  +-- US-163: Questoes (documentacao)
```

---

## 6. Arquivos - Resumo Completo

### CRIAR (8 arquivos)

| # | Arquivo | US | Fase |
|---|---------|-----|------|
| 1 | `database/migration-003-hub-especialistas.sql` | US-142/143 | 1 |
| 2 | `src/components/hub/SpecialistDashboard.jsx` | US-147 | 2 |
| 3 | `src/components/hub/SpecialistProfile.jsx` | US-148 | 2 |
| 4 | `src/components/hub/CourseCatalog.jsx` | US-149 | 2 |
| 5 | `src/components/hub/CourseReviews.jsx` | US-150 | 2 |
| 6 | `src/components/hub/CourseCard.jsx` | US-151 | 2 |
| 7 | `src/tests/components/SpecialistDashboard.test.jsx` | US-160 | 4 |
| 8 | `src/tests/components/CourseCatalog.test.jsx` | US-160 | 4 |

### MODIFICAR (21 arquivos)

| # | Arquivo | Mudanca | US | Fase |
|---|---------|---------|-----|------|
| 1 | `src/hooks/usePermissions.js` | +specialist role, +11 perms | US-144 | 1 |
| 2 | `src/config/platform.js` | +secao hub config | US-145 | 1 |
| 3 | `src/components/RoleBasedAccess.jsx` | +SpecialistOnly | US-146 | 1 |
| 4 | `src/components/SistemaEducacionalCompleto.jsx` | +4 rotas hub | US-152 | 3 |
| 5 | `src/components/HubView.jsx` | +secao marketplace | US-153 | 3 |
| 6 | `src/services/apiService.js` | +10 funcoes, +table IDs | US-154 | 3 |
| 7 | `src/components/UserHeader.jsx` | +nav specialist/catalog | US-155 | 3 |
| 8-10 | `public/locales/pt-BR/*.json` | +hub.specialists | US-156 | 3 |
| 11-13 | `public/locales/en-US/*.json` | +hub.specialists (EN) | US-157 | 3 |
| 14-16 | `public/locales/es-ES/*.json` | +hub.specialists (ES) | US-158 | 3 |
| 17 | `src/services/__tests__/apiService.auth.test.js` | 4->5 roles | US-159 | 4 |
| 18 | `src/tests/components/HubView.test.jsx` | +MemoryRouter +tests | US-159 | 4 |
| 19 | `src/services/__tests__/apiService.users.test.js` | +specialist test | US-159 | 4 |
| 20 | `docs/04-QUALIDADE/01-qa-e2e-specs.md` | +5 TCs, fix nome | US-161 | 4 |
| 21 | `docs/01-PRODUTO/07-questoes-em-aberto.md` | Q1-Q6 respondidas | US-163 | 4 |

---

## 7. Dados do Especialista Ficticio

### Perfil: Joao Silva

```yaml
Nome: Joao Silva
Email: joao.silva.specialist@plataformab2b.com
Senha: Demo@2026
Role: specialist
Empresa: Hub de Especialistas

LinkedIn: linkedin.com/in/joaosilva-devops
Bio: >
  Engenheiro DevOps Senior com 15 anos de experiencia em
  infraestrutura, automacao e shell scripting. Especialista
  em ambientes Unix/Linux e praticas DevOps modernas.
  Ja treinou mais de 500 profissionais em empresas como
  Globo, Nubank e iFood.

Especialidades: [bash, devops, linux, docker, kubernetes]

Certificacoes:
  - AWS Solutions Architect
  - CKA - Certified Kubernetes Administrator
  - Linux Foundation LFCS

Portfolio: github.com/joaosilva-devops

Status: active (verificado ha 30 dias)
Rating: 4.8
Cursos: 1 (Bash Shell Scripting)
Alunos: 156
Receita: R$ 4.200,00
Revenue Share: 70%
```

---

## 8. Credenciais de Demo Atualizadas

```
+--------------------------------------------------------------+
| CREDENCIAIS - Senha padrao: Demo@2026                        |
+--------------------------------------------------------------+
| Role        | Email                           | Dashboard     |
+-------------+---------------------------------+---------------+
| C-Level     | ceo@acmetech.com                | /admin/exec   |
| Admin       | admin@acmetech.com              | /admin        |
| Instructor  | prof@acmetech.com               | /instructor   |
| Student     | maria@acmetech.com              | /dashboard    |
| Specialist  | joao.silva.specialist@plataformab2b.com | /specialist  |
+-------------+---------------------------------+---------------+

Empresas:
  - ACME Tech Solutions (id: 550e...0001)
  - DevCorp Consulting (id: 550e...0002)
  - Hub de Especialistas (id: 550e...0099)
```

---

## 9. Matriz RBAC Atualizada (5 Roles, 32 Permissoes)

| Permissao | student | instructor | admin | c_level | specialist |
|-----------|---------|------------|-------|---------|------------|
| courses.view | ✅ | ✅ | ✅ | ✅ | ✅ |
| courses.progress | ✅ | ✅ | ✅ | ✅ | ✅ |
| courses.notes | ✅ | ✅ | ✅ | ✅ | ✅ |
| courses.edit | - | ✅ | ✅ | - | - |
| courses.create | - | - | ✅ | - | - |
| courses.delete | - | - | ✅ | - | - |
| paths.view | ✅ | ✅ | ✅ | ✅ | - |
| paths.edit | - | - | ✅ | - | - |
| dashboard.own | ✅ | ✅ | ✅ | ✅ | ✅ |
| dashboard.team | - | ✅ | ✅ | ✅ | - |
| dashboard.company | - | - | ✅ | ✅ | - |
| analytics.basic | - | ✅ | ✅ | ✅ | - |
| analytics.advanced | - | - | ✅ | ✅ | - |
| analytics.export | - | - | ✅ | ✅ | - |
| users.view | - | - | ✅ | ✅ | - |
| users.create | - | - | ✅ | - | - |
| users.edit | - | - | ✅ | - | - |
| users.delete | - | - | ✅ | - | - |
| company.view | - | - | ✅ | ✅ | - |
| company.edit | - | - | - | ✅ | - |
| audit.view | - | - | ✅ | ✅ | - |
| **hub_courses.create** | - | - | - | - | ✅ |
| **hub_courses.edit_own** | - | - | - | - | ✅ |
| **hub_courses.delete_own** | - | - | - | - | ✅ |
| **hub_courses.view_own** | - | - | - | - | ✅ |
| **hub_courses.approve** | - | - | ✅ | ✅ | - |
| **hub_analytics.view_own** | - | - | - | - | ✅ |
| **hub_revenue.view_own** | - | - | - | - | ✅ |
| **hub_catalog.view** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **reviews.create** | ✅ | ✅ | ✅ | - | - |
| **reviews.reply_own** | - | - | - | - | ✅ |
| **specialists.approve** | - | - | ✅ | ✅ | - |

---

## 10. Rotas Atualizadas

```
+--------------------+---+---+---+---+---+-----+
| Rota               | S | I | A | C | E | Pub |
+--------------------+---+---+---+---+---+-----+
| /login             | - | - | - | - | - | ✅  |
| /                  | ✅| ✅| ✅| ✅| ✅|  -  |
| /curso/:id         | ✅| ✅| ✅| ✅| ✅|  -  |
| /dashboard         | ✅| ✅| ✅| ✅| ✅|  -  |
| /hub/catalog       | ✅| ✅| ✅| ✅| ✅|  -  |
| /specialist/:id    | ✅| ✅| ✅| ✅| ✅|  -  |
| /hub/course/:id/rev| ✅| ✅| ✅| ✅| ✅|  -  |
| /instructor        | - | ✅| ✅| ✅| - |  -  |
| /specialist        | - | - | ✅| ✅| ✅|  -  |
| /admin             | - | - | ✅| ✅| - |  -  |
| /admin/executive   | - | - | - | ✅| - |  -  |
+--------------------+---+---+---+---+---+-----+
S=Student I=Instructor A=Admin C=C-Level E=Especialista
```

---

## 11. Verificacao e Testes

### Apos Fase 1:
```bash
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-003-hub-especialistas.sql
docker exec -i app-controle-db psql -U nocodb_user -d app_controle -c "SELECT * FROM specialists;"
docker exec -i app-controle-db psql -U nocodb_user -d app_controle -c "SELECT * FROM hub_courses;"
docker exec -i app-controle-db psql -U nocodb_user -d app_controle -c "SELECT * FROM course_reviews;"
```

### Apos Fases 2-3:
```bash
bun run dev
# Login: joao.silva.specialist@plataformab2b.com / Demo@2026
# Verificar: /specialist (dashboard), /hub/catalog, / (secao marketplace)
```

### Apos Fase 4:
```bash
bun run test
bun run test -- --reporter=verbose
```

---

## 12. Roadmap Futuro (Pos-Sprint 15)

### Sprint 16: Certificados (P1)
- US-132: Geracao certificados PDF
- US-133: Pagina verificacao certificado
- US-134: Listagem certificados do aluno

### Sprint 17: Hub Fase 2 - Marketplace Completo
- Sistema de mensagens entre empresa e especialista
- Montagem de trilhas com cursos de N especialistas
- Filtros avancados no catalogo (busca full-text)

### Sprint 18: Hub Fase 3 - Engajamento
- Mentoria 1:1 (calendario, agendamento, preco por sessao)
- Cursos customizados sob demanda
- Notificacoes push/email

### Sprint 19: Hub Fase 4 - Monetizacao
- Revenue tracking e payouts
- Relatorios financeiros para especialistas
- Integracao gateway pagamento (Stripe)

### Backlog Tecnico
- [ ] Migracao TypeScript incremental
- [ ] SSO corporativo (SAML/OAuth) - critico para Enterprise
- [ ] WCAG 2.1 AA (100%)
- [ ] Dark mode
- [ ] PWA com suporte offline
- [ ] Cobertura testes unitarios 5% -> 80%

---

## 13. Metricas de Progresso

```
Total User Stories: 55 completas + 22 novas (Sprint 15) = 77
RBAC: 32 permissoes (21 existentes + 11 novas)
Roles: 5 (student, instructor, admin, c_level, specialist)
Componentes: 48 existentes + 5 novos = 53
Tabelas DB: 14 existentes + 3 novas = 17
Idiomas: 3 (pt-BR, en-US, es-ES)
Testes unitarios: 52 existentes + ~30 novos
Testes E2E specs: 37 existentes + 5 novos = 42
```

---

## 14. Compatibilidade Retroativa

- Roles existentes (student/instructor/admin/c_level) NAO sao afetados
- Rotas existentes NAO mudam
- Curso Bash continua funcionando normalmente para alunos atuais
- Coluna `source` default 'internal' nao afeta cursos existentes
- Testes existentes precisam ajustes minimos (4->5 roles, MemoryRouter)
- NocoDB auto-expoe CRUD para novas tabelas

---

**Ultima atualizacao:** 2026-02-09
**Versao:** 10.0.0
**Status:** Sprint 15 EM IMPLEMENTACAO - Hub de Especialistas Foundation
**Proxima revisao:** Apos implementacao das 4 fases
