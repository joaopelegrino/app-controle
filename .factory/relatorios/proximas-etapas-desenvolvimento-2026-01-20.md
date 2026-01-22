# Próximas Etapas de Desenvolvimento - app-controle

**Data:** 2026-01-20  
**Branch Atual:** fase-1.5-completa  
**Análise de:** desenvolvimento, mvp-v1, ROADMAP.md, ACOES-PENDENTES.md

---

## 📊 Estado Atual

### Branch: fase-1.5-completa ✅

**Último commit:** 0916fbd - "atualizacao rapida"

**Implementado:**
- ✅ GenericLearningSystem (componente unificado)
- ✅ 5 cursos ativos (bash, c, rust, vscode, claude-code)
- ✅ UserDashboard + AdminDashboard
- ✅ Estrutura de dados plana (*LearningData.js)
- ✅ Persistência em localStorage (useModuleProgress)
- ✅ Deep linking para aulas
- ✅ Caderno de notas auto-save
- ✅ Flashcards 3D
- ✅ Breadcrumb navigation

**Arquitetura:**
```
SistemaEducacionalCompleto (Root - Routes + State)
├── HubView (Hub: áreas + trilhas)
├── LearningPathView (Trilhas: Backend Developer, etc.)
├── GenericLearningSystem (Componente unificado para todos os cursos)
│   └── NotesView (Caderno por curso)
└── UserDashboard / AdminDashboard
```

---

## 🎯 Próximas Etapas (Prioridade)

### 🔴 FASE 2.0: Backend & Persistência (Q1 2026)

**Objetivo:** Migrar de localStorage para backend real com autenticação

#### Sprint 5: API Backend (P0 - CRÍTICO)

**US-006: Configurar Backend com Supabase OU PostgreSQL**

**Decisão pendente:** Modelo de deployment
- Opção A: Supabase ($25/mês - cloud)
- Opção B: PostgreSQL + Docker Compose (self-hosted)

**Critérios de Aceite:**
- [ ] Banco de dados configurado (PostgreSQL 16)
- [ ] Schema SQL criado (users, courses, progress, notes)
- [ ] API REST/tRPC implementada
- [ ] Migrations configuradas
- [ ] Seeds para dados de teste

**Arquivos a criar:**
```
backend/
├── db/
│   ├── schema.sql
│   ├── migrations/
│   └── seeds/
├── api/
│   ├── routes/
│   │   ├── courses.js
│   │   ├── progress.js
│   │   └── notes.js
│   └── middleware/
└── config/
```

**Complexidade:** 21 pontos
**Dependências:** Decisão sobre Supabase vs Self-hosted

---

**US-007: Implementar Autenticação**

**Opções em avaliação:**
- Keycloak (open source, self-hosted)
- Authentik (moderna, Docker-native)
- Supabase Auth (se escolher Supabase)

**Critérios de Aceite:**
- [ ] Sistema de autenticação funcionando
- [ ] Login/Logout implementado
- [ ] Registro de usuários
- [ ] Sessões persistentes
- [ ] Proteção de rotas

**Componentes a criar:**
```
src/components/auth/
├── LoginForm.jsx
├── RegisterForm.jsx
├── AuthProvider.jsx
└── ProtectedRoute.jsx

src/hooks/
└── useAuth.js
```

**Complexidade:** 13 pontos
**Dependências:** US-006

---

**US-008: Migrar Persistência para Backend**

**Objetivo:** Substituir localStorage por chamadas API

**Critérios de Aceite:**
- [ ] dataService.js refatorado para usar API
- [ ] Progresso salvo em banco
- [ ] Notas salvas em banco
- [ ] Fallback para localStorage (offline-first)
- [ ] Sincronização automática

**Mudanças:**
```javascript
// ANTES (localStorage):
const progress = dataService.getProgress(courseId);

// DEPOIS (API):
const progress = await dataService.getProgress(courseId, userId);
// → Faz chamada fetch('/api/progress/:courseId')
```

**Complexidade:** 8 pontos
**Dependências:** US-006, US-007

---

#### Sprint 6: Analytics Corporativo (P1 - HIGH)

**US-009: Dashboard Analytics B2B**

**Objetivo:** Métricas para gestores acompanharem progresso da equipe

**Critérios de Aceite:**
- [ ] AdminDashboard expandido com métricas corporativas
- [ ] Visão por empresa/departamento
- [ ] Taxa de conclusão por curso
- [ ] Tempo médio de treinamento
- [ ] Exportação de relatórios (CSV/PDF)

**Métricas a implementar:**
```
Dashboard Analytics:
├── Engajamento Geral
│   ├── Usuários ativos (DAU/MAU)
│   ├── Taxa de conclusão por curso
│   └── Horas totais de treinamento
├── Desempenho por Departamento
│   ├── Progresso médio por área
│   ├── Cursos mais populares
│   └── Tempo médio até conclusão
└── ROI Treinamento
    ├── Comparativo vs plataformas genéricas
    └── Custo por hora de treinamento
```

**Complexidade:** 13 pontos
**Dependências:** US-008

---

**ACTION-002: Configurar Google Analytics 4** (Pendente)

**Status:** 🟡 P2 - MEDIUM
**Responsável:** Product Owner
**Estimativa:** 3 horas

**Eventos customizados B2B a rastrear:**
```javascript
// module_progress
gtag('event', 'module_progress', {
  course_id: 'bash',
  module_id: '1.2',
  company_id: 'acme-corp',
  user_role: 'developer'
});

// course_completion
gtag('event', 'course_completion', {
  course_id: 'bash',
  duration_days: 14,
  company_id: 'acme-corp'
});

// company_engagement
gtag('event', 'company_engagement', {
  company_id: 'acme-corp',
  active_users: 25,
  total_users: 50
});

// trial_conversion
gtag('event', 'trial_conversion', {
  plan: 'professional',
  company_size: 'medium'
});
```

---

### 🟡 FASE 2.5: Expansão de Conteúdo (Q2 2026)

#### Sprint 7-8: Mais Cursos e Trilhas (P2 - MEDIUM)

**US-010: Ativar 7 Áreas em Desenvolvimento**

**Cursos a adicionar:**
1. Linux Fundamentals
2. Servidores Linux
3. DevOps Foundations
4. Docker Containerization
5. Kubernetes Orchestration
6. Criptografia Aplicada
7. Segurança de Aplicações

**Critérios de Aceite:**
- [ ] 7 novos *LearningData.js criados
- [ ] Conteúdo estruturado (fases + módulos)
- [ ] Vídeos YouTube selecionados
- [ ] Flashcards criados
- [ ] Todos usando GenericLearningSystem

**Complexidade:** 34 pontos (5 pontos por curso)

---

**US-011: Criar Trilhas Customizáveis**

**Objetivo:** Empresas podem criar trilhas personalizadas

**Trilhas planejadas:**
```
1. 🛤️ Backend Developer (existente)
   └── Bash → Linux → Servidores → DevOps

2. 🛤️ DevOps Engineer (novo)
   └── Linux → Docker → Kubernetes → Segurança

3. 🛤️ Systems Programmer (novo)
   └── C → Rust → Linux → Criptografia

4. 🛤️ Custom (por empresa)
   └── Definido pelo admin
```

**Critérios de Aceite:**
- [ ] Editor de trilhas para admins
- [ ] Drag-and-drop de cursos
- [ ] Pré-requisitos configuráveis
- [ ] Timeline estimada automática
- [ ] Clone de trilhas padrão

**Complexidade:** 21 pontos

---

### 🟢 FASE 3.0: Modelo de Negócio (Q2 2026)

#### Sprint 9-10: Open Core + SaaS (P3 - LOW)

**US-012: Implementar Multi-tenancy**

**Objetivo:** Suporte para múltiplas empresas na mesma instância

**Critérios de Aceite:**
- [ ] Tabela `companies` no banco
- [ ] Usuários vinculados a empresas
- [ ] Isolamento de dados por empresa
- [ ] Subdomínios ou paths por empresa
- [ ] White-label configurável

**Estrutura:**
```
companies:
├── acme-corp.ultrathink.com.br
├── tech-startup.ultrathink.com.br
└── consulting-firm.ultrathink.com.br

Cada empresa tem:
├── Logo customizado
├── Cores primárias
├── Cursos selecionados
├── Trilhas customizadas
└── Analytics isolados
```

**Complexidade:** 21 pontos

---

**US-013: Planos de Assinatura**

**Objetivo:** Modelo SaaS com Stripe/PagSeguro

**Planos planejados:**
```
🆓 COMMUNITY (Self-Hosted)
   • Gratuito
   • Ilimitado usuários
   • Suporte: comunidade

💼 STARTER (SaaS - R$ 499/mês)
   • Até 50 usuários
   • Suporte por email
   • Analytics básico

💼 PROFESSIONAL (SaaS - R$ 2.499/mês)
   • Até 200 usuários
   • Suporte dedicado
   • Analytics avançado
   • White-label
   • Consultoria T&D inclusa

💼 ENTERPRISE (Sob consulta)
   • Ilimitado usuários
   • On-premise ou cloud
   • SLA dedicado
   • Customizações
```

**Critérios de Aceite:**
- [ ] Integração Stripe/PagSeguro
- [ ] Página de pricing
- [ ] Checkout implementado
- [ ] Webhooks de pagamento
- [ ] Upgrade/downgrade de planos
- [ ] Trial de 14 dias

**Complexidade:** 34 pontos

---

## 📋 Ações Manuais Pendentes

### ACTION-003: Validar Conformidade WCAG 2.1 AA (P1)

**Status:** 🔴 HIGH - Sprint Atual
**Responsável:** UX Lead
**Estimativa:** 4 horas

**Tarefas:**
1. [ ] Validação automática com axe DevTools
2. [ ] Testes de navegação por teclado
3. [ ] Testes com screen reader (NVDA/Orca)
4. [ ] Validação de contraste de cores (4.5:1)
5. [ ] Lighthouse Accessibility Audit (score > 90)

**Critérios de Validação:**
- [ ] Score Lighthouse Accessibility > 90
- [ ] Zero issues críticos no axe DevTools
- [ ] Navegação completa por teclado funcional
- [ ] Screen readers funcionando corretamente

---

## 🗓️ Timeline Proposto

### Q1 2026 (Jan-Mar)

| Sprint | Semanas | Entregas |
|--------|---------|----------|
| Sprint 5 | 1-4 | Backend + Autenticação (US-006, US-007) |
| Sprint 6 | 5-8 | Migração API + Analytics (US-008, US-009) |
| Sprint 7 | 9-12 | Expansão Conteúdo (US-010) |

### Q2 2026 (Abr-Jun)

| Sprint | Semanas | Entregas |
|--------|---------|----------|
| Sprint 8 | 13-16 | Trilhas Customizáveis (US-011) |
| Sprint 9 | 17-20 | Multi-tenancy (US-012) |
| Sprint 10 | 21-24 | Planos SaaS (US-013) |

---

## 🔍 Decisões Pendentes

### Decisão 1: Stack Backend (URGENTE)

**Opções:**

**A) Supabase (Cloud)**
- ✅ Setup rápido (< 1 dia)
- ✅ Auth integrado
- ✅ Storage integrado
- ✅ Realtime subscriptions
- ❌ Custo: $25/mês + overages
- ❌ Vendor lock-in

**B) Self-Hosted (Docker Compose)**
- ✅ Controle total
- ✅ Custo fixo (infraestrutura)
- ✅ Open source
- ❌ Setup complexo (3-5 dias)
- ❌ Manutenção própria

**Recomendação:** Supabase para MVP (Q1), migrar para self-hosted em Q3

---

### Decisão 2: Sistema de Auth

**Opções:**
- Keycloak (enterprise, complexo)
- Authentik (moderno, Docker-native)
- Supabase Auth (se escolher Supabase)

**Recomendação:** Supabase Auth para MVP, avaliar Authentik em Q2

---

### Decisão 3: Licença Open Core

**Opções:**
- AGPL-3.0 (recomendado - GitLab, Supabase)
- Apache 2.0 (permissiva)
- MIT (ultra-permissiva)

**Recomendação:** AGPL-3.0 (protege modelo SaaS)

---

## 📊 Métricas de Sucesso

### Release 2.0 (Backend - Q1 2026)

- [ ] 100% persistência migrada para backend
- [ ] Autenticação funcionando
- [ ] 0 dependência de localStorage (apenas cache)
- [ ] < 200ms latência API
- [ ] 99.9% uptime

### Release 2.5 (Expansão - Q2 2026)

- [ ] 12+ cursos ativos (5 atuais + 7 novos)
- [ ] 4+ trilhas disponíveis
- [ ] Analytics corporativo implementado
- [ ] WCAG 2.1 AA compliant

### Release 3.0 (Modelo Negócio - Q2 2026)

- [ ] Multi-tenancy funcional
- [ ] 3+ planos de assinatura
- [ ] Checkout implementado
- [ ] 5+ empresas beta testando
- [ ] MRR > R$ 10k

---

## 🚀 Próximos Passos Imediatos

### Esta Semana (Jan 20-26)

1. **Decisão Stack Backend** (URGENTE)
   - Reunião com stakeholders
   - Definir Supabase vs Self-hosted
   - Criar POC em branch separada

2. **ACTION-003: WCAG Audit**
   - Executar validação completa
   - Documentar findings
   - Criar issues para correções

3. **Merge fase-1.5 → desenvolvimento**
   - Testar em desenvolvimento
   - Resolver conflitos (se houver)
   - Fazer merge da branch

### Próximas 2 Semanas (Jan 27 - Feb 9)

4. **US-006: Setup Backend** (Sprint 5 inicia)
   - Configurar banco de dados
   - Criar schema SQL
   - Implementar API REST básica

5. **US-007: Autenticação** (Sprint 5)
   - Escolher sistema de auth
   - Implementar login/logout
   - Proteger rotas

### Mês de Fevereiro

6. **US-008: Migração API**
   - Refatorar dataService
   - Testar persistência
   - Manter fallback localStorage

7. **US-009: Analytics Dashboard**
   - Expandir AdminDashboard
   - Implementar métricas B2B
   - ACTION-002: GA4 setup

---

## 📁 Arquivos a Criar/Modificar

### Backend (Novos)

```
backend/
├── package.json                  # Dependencies
├── .env.example                  # Config template
├── db/
│   ├── schema.sql               # Database schema
│   ├── migrations/
│   │   └── 001_initial.sql     # Initial migration
│   └── seeds/
│       └── courses.sql          # Sample data
├── api/
│   ├── server.js                # Express/Fastify app
│   ├── routes/
│   │   ├── auth.js             # Auth endpoints
│   │   ├── courses.js          # Courses CRUD
│   │   ├── progress.js         # Progress tracking
│   │   └── notes.js            # Notes persistence
│   └── middleware/
│       ├── auth.js              # JWT validation
│       └── rateLimit.js         # Rate limiting
└── docker-compose.yml           # Local dev environment
```

### Frontend (Modificações)

```
src/
├── services/
│   └── dataService.js           # Refactor para API
├── components/
│   ├── auth/                    # Novos componentes
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── AuthProvider.jsx
│   ├── AdminDashboard.jsx       # Expandir com analytics
│   └── TrailEditor.jsx          # Novo - US-011
├── hooks/
│   ├── useAuth.js               # Novo
│   └── useAPI.js                # Novo - fetch wrapper
└── config/
    └── api.js                   # API endpoints config
```

---

## 🔗 Referências

**Documentação Atual:**
- [ROADMAP.md](/home/notebook/workspace/app-controle/docs/backlog/ROADMAP.md) - SSOT
- [ACOES-PENDENTES.md](/home/notebook/workspace/app-controle/docs/backlog/acoes-usuario/ACOES-PENDENTES.md)
- [AGENTS.md](/.factory/AGENTS.md) - Guidelines Factory Droid
- [setup-ambiente-mise.md](/home/notebook/workspace/app-controle/documentacao-interna/05-workflows/setup-ambiente-mise.md)

**Branches:**
- `fase-1.5-completa` (atual) - GenericLearningSystem + 5 cursos
- `desenvolvimento` (remote default) - Documentação atualizada
- `mvp-v1` - Schema + dataService (referência)

**Ferramentas:**
- mise - Gerenciamento de ambiente
- Factory Droid CLI - Assistente AI
- Bun 1.3.3 - Runtime principal

---

## ✅ Checklist de Prioridades

### Imediato (Esta Semana)
- [ ] Decisão: Supabase vs PostgreSQL self-hosted
- [ ] ACTION-003: WCAG audit completo
- [ ] Merge fase-1.5 → desenvolvimento

### Curto Prazo (Próximas 2 Semanas)
- [ ] US-006: Setup backend
- [ ] US-007: Autenticação implementada
- [ ] POC de integração frontend-backend

### Médio Prazo (Próximo Mês)
- [ ] US-008: Migração completa para API
- [ ] US-009: Analytics dashboard
- [ ] ACTION-002: GA4 configurado

### Longo Prazo (Q2 2026)
- [ ] US-010: 7 novos cursos
- [ ] US-011: Trilhas customizáveis
- [ ] US-012: Multi-tenancy
- [ ] US-013: Planos SaaS

---

**Gerado por:** factory-config-specialist  
**Data:** 2026-01-20  
**Baseado em:** ROADMAP.md, ACOES-PENDENTES.md, git branches analysis  
**Status:** ✅ Análise completa
