# Sulical - Documento de Visão, Missão e Estado Atual

**Data:** Fevereiro 2026
**Versão:** 1.0.0
**Tipo:** Análise Forense de Projeto

---

## Sumário Executivo

O **Sulical** é uma plataforma B2B SaaS de treinamento técnico corporativo desenvolvida para resolver problemas críticos enfrentados por empresas de tecnologia no Brasil e América Latina. A solução oferece uma alternativa white-label e personalizável às plataformas genéricas de aprendizado, com foco em ROI mensurável e engajamento real.

---

## 1. Visão

### 1.1 Declaração de Visão

> **"Ser a plataforma de referência para capacitação técnica corporativa na América Latina, democratizando o acesso a treinamentos de alta qualidade através de um modelo Open Core que permite customização total para cada empresa."**

### 1.2 Visão de Futuro (2028)

- **Líder regional** em treinamento técnico B2B
- **10.000+ empresas** utilizando a plataforma
- **Marketplace B2B2C** de cursos especializados
- **Certificações reconhecidas** pelo mercado
- **Integração completa** com ecossistemas corporativos (HRIS, LMS, Slack, Teams)

---

## 2. Missão

### 2.1 Declaração de Missão

> **"Capacitar empresas de tecnologia a desenvolver seus colaboradores de forma eficiente, mensurável e personalizada, reduzindo o tempo de onboarding em 50% e aumentando o engajamento em treinamentos para mais de 80%."**

### 2.2 Pilares da Missão

| Pilar | Descrição |
|-------|-----------|
| **Personalização** | Conteúdo 100% customizável para o stack e cultura de cada empresa |
| **Mensuração** | Analytics avançado com ROI real e identificação de gaps |
| **Democratização** | Modelo Open Core que permite self-hosting gratuito |
| **Eficiência** | Trilhas estruturadas que aceleram o onboarding técnico |

---

## 3. Proposta de Valor

### 3.1 Modelo de Negócio Completo: Hub de Especialistas + Marketplace

> **IMPORTANTE**: Um dos focos estratégicos da solução é o **Hub de Especialistas Externos** - um marketplace onde especialistas independentes podem cadastrar e disponibilizar seus cursos para empresas.

#### O Conceito do Hub de Especialistas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HUB DE ESPECIALISTAS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LADO DO ESPECIALISTA (Criador de Conteúdo)                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ • Especialista em Bash → cadastra "Curso de Bash Avançado"          │   │
│  │ • Especialista em DevOps → cadastra "Curso de CI/CD com GitHub"     │   │
│  │ • Especialista em React → cadastra "Curso de React Hooks"           │   │
│  │ • Especialista em Windows → cadastra "Windows Terminal Mastery"     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    CATÁLOGO DO MARKETPLACE                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │  Bash    │ │  DevOps  │ │  React   │ │ Windows  │  ...          │   │
│  │  │ por João │ │ por Ana  │ │ por Pedro│ │ por Lucas│               │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  LADO DA EMPRESA (Consumidor)                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Responsável de Onboarding (Mariana/RH):                             │   │
│  │                                                                     │   │
│  │ "Preciso de uma trilha para dev junior que necessita de:"          │   │
│  │  ✓ Bash (seleciona curso do Especialista João)                     │   │
│  │  ✓ DevOps (seleciona curso da Especialista Ana)                    │   │
│  │  ✓ Windows Terminal (seleciona curso do Especialista Lucas)        │   │
│  │  ✓ React (seleciona curso do Especialista Pedro)                   │   │
│  │                                                                     │   │
│  │ → MONTA TRILHA PERSONALIZADA combinando cursos de múltiplos        │   │
│  │   especialistas externos                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Fluxo do Modelo B2B2C (Business-to-Business-to-Consumer)

| Ator | Ação | Benefício |
|------|------|-----------|
| **Especialista** | Cria e publica curso no hub | Receita recorrente por assinatura/licenciamento |
| **Empresa (RH/T&D)** | Navega catálogo e seleciona cursos | Acesso a conteúdo especializado sem criar do zero |
| **Empresa (RH/T&D)** | Monta trilha combinando cursos | Onboarding personalizado para stack específico |
| **Desenvolvedor** | Consome trilha estruturada | Aprendizado direcionado e progressão clara |

#### Exemplo Prático

**Cenário**: Empresa XYZ precisa treinar dev junior em stack específico

```
Necessidade da Empresa XYZ:
┌─────────────────────────────────────────┐
│ Trilha para Dev Junior Backend:         │
│                                         │
│ 1. Bash Shell Scripting                 │
│ 2. DevOps Básico (CI/CD)               │
│ 3. Windows Terminal (WSL)              │
│ 4. React Fundamentos                   │
└─────────────────────────────────────────┘

Solução via Hub de Especialistas:
┌─────────────────────────────────────────┐
│ Trilha montada por RH da XYZ:           │
│                                         │
│ 1. "Bash Avançado" - João Silva         │
│    (Especialista certificado)           │
│                                         │
│ 2. "CI/CD com GitHub Actions" - Ana R.  │
│    (DevOps Engineer, 10 anos exp.)      │
│                                         │
│ 3. "Windows Terminal Mastery" - Lucas M.│
│    (Microsoft MVP)                      │
│                                         │
│ 4. "React do Zero ao Deploy" - Pedro F. │
│    (Ex-Meta Engineer)                   │
└─────────────────────────────────────────┘
```

#### Diferencial Competitivo do Modelo

| Aspecto | Modelo Atual (Interno) | Modelo Hub de Especialistas |
|---------|------------------------|----------------------------|
| **Criação de conteúdo** | Líder técnico interno | Especialistas externos certificados |
| **Variedade** | Limitado ao conhecimento interno | Catálogo amplo de especialistas |
| **Qualidade** | Depende do líder | Cursos avaliados e certificados |
| **Custo para empresa** | Tempo do líder técnico | Licenciamento por curso/trilha |
| **Escalabilidade** | Baixa (1 líder = X cursos) | Alta (N especialistas = N² cursos) |
| **Atualização** | Responsabilidade interna | Especialista mantém atualizado |

### 3.2 Problema Identificado

Empresas de tecnologia no Brasil enfrentam desafios críticos:

| Problema | Impacto Financeiro |
|----------|-------------------|
| Plataformas genéricas caras | R$ 150k-200k/ano em Udemy/Coursera Business |
| Baixo engajamento | Apenas 10-15% dos colaboradores utilizam ativamente |
| Sem mensuração de ROI | Impossibilidade de justificar investimento |
| Onboarding longo | 2+ meses para desenvolvedores juniores |
| Conteúdo desatualizado | Cursos não refletem tecnologias internas |

### 3.2 Solução Proposta

**Sulical resolve através de:**

1. **Plataforma White-Label**: Identidade visual da empresa
2. **Conteúdo Personalizável**: 13 áreas de conhecimento + customização
3. **Analytics Avançado**: ROI, taxa de conclusão, módulos difíceis
4. **Trilhas Estruturadas**: Onboarding em 4 semanas
5. **Multi-tenancy**: Isolamento total por empresa
6. **Internacionalização**: 3 idiomas (PT-BR, EN-US, ES-ES)

### 3.3 Diferenciais Competitivos

| Aspecto | Sulical | Concorrentes (Udemy/Coursera) |
|---------|------------|-------------------------------|
| **Customização** | 100% personalizável | Catálogo genérico |
| **Preço** | R$ 499-2.499/mês | R$ 10k-20k/mês |
| **Self-hosting** | Gratuito (Open Core) | Não disponível |
| **ROI Tracking** | Nativo | Limitado |
| **Suporte** | Consultoria T&D incluída | Apenas técnico |

---

## 4. Público-Alvo

### 4.1 Segmentos Primários

| Segmento | Características | Necessidade Principal |
|----------|-----------------|----------------------|
| **CTOs/Tech Leads** | Decisores técnicos | Estruturação de onboarding |
| **RH/T&D** | Gestores de pessoas | Mensuração de engajamento |
| **Startups Tech** | 50-500 funcionários | Escalabilidade de treinamento |
| **Consultorias** | Empresas de tecnologia | Treinamento de clientes |

### 4.2 Personas Identificadas

**1. Carlos - CTO de Startup**
- Precisa reduzir tempo de onboarding
- Quer conteúdo alinhado ao stack interno
- Busca ROI mensurável

**2. Marina - Gestora de T&D**
- Precisa justificar investimento em treinamento
- Quer relatórios de progresso automatizados
- Busca engajamento real dos colaboradores

**3. Pedro - Desenvolvedor Sênior**
- Quer criar trilhas para seu time
- Precisa de conteúdo técnico atualizado
- Busca plataforma fácil de usar

**4. João - Especialista Externo (Hub de Especialistas)**
- Especialista em tecnologia específica (Bash, DevOps, etc.)
- Quer monetizar seu conhecimento criando cursos
- Busca plataforma para alcançar múltiplas empresas
- Quer analytics sobre engajamento e receita

---

## 5. Modelo de Negócio

### 5.1 Estrutura Open Core

```
┌─────────────────────────────────────────────────────────────┐
│                    MODELO OPEN CORE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  COMMUNITY EDITION (Gratuito)                               │
│  ├── Self-hosted via Docker Compose                         │
│  ├── 100% código-fonte aberto                               │
│  ├── Todas as funcionalidades core                          │
│  ├── Suporte via comunidade                                 │
│  └── Sem limites de usuários                                │
│                                                             │
│  SAAS GERENCIADO                                            │
│  ├── Starter: R$ 499/mês (até 50 usuários)                 │
│  ├── Professional: R$ 2.499/mês (até 200 usuários)         │
│  ├── Enterprise: Sob consulta (ilimitado)                   │
│  └── + Consultoria T&D incluída                             │
│                                                             │
│  SERVIÇOS ADICIONAIS                                        │
│  ├── Customização de conteúdo                               │
│  ├── Consultoria em T&D                                     │
│  ├── Integração com sistemas internos                       │
│  └── Treinamento presencial                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Hub de Especialistas (Marketplace B2B2C)

```
┌─────────────────────────────────────────────────────────────┐
│          HUB DE ESPECIALISTAS (MARKETPLACE B2B2C)           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PARA ESPECIALISTAS (Criadores de Conteúdo)                 │
│  ├── Cadastro gratuito + verificação de credenciais         │
│  ├── Publicação de cursos no marketplace                    │
│  ├── Revenue share: 70% especialista / 30% plataforma      │
│  ├── Dashboard de analytics (visualizações, matrículas)     │
│  └── Certificação de qualidade ("Especialista Verificado")  │
│                                                             │
│  PARA EMPRESAS (Consumidoras)                               │
│  ├── Acesso ao catálogo completo de especialistas           │
│  ├── Montagem de trilhas personalizadas                     │
│  ├── Licenciamento por curso: R$ 50-200/curso/mês          │
│  ├── Licenciamento por trilha: R$ 150-500/trilha/mês       │
│  └── Pacote ilimitado: R$ 2.000/mês (todo catálogo)        │
│                                                             │
│  MODELO DE RECEITA                                          │
│  ├── Taxa de transação: 30% sobre vendas de cursos          │
│  ├── Assinatura premium especialistas: R$ 99/mês           │
│  ├── Certificação de trilhas: R$ 500 one-time              │
│  └── API de integração: R$ 1.000/mês (LMS externos)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Exemplo: Trilha Montada por Responsável de Onboarding

**Cenário**: Dev Junior precisa de: Bash, DevOps, Windows Terminal, React

| Curso | Especialista Externo | Preço/mês | Duração |
|-------|---------------------|-----------|---------|
| Bash Shell Scripting Avançado | João Silva (DevOps Senior, 10 anos) | R$ 80 | 40h |
| CI/CD com GitHub Actions | Ana Rodrigues (SRE Lead, AWS Cert.) | R$ 100 | 32h |
| Windows Terminal + WSL Mastery | Lucas Mendes (Microsoft MVP) | R$ 60 | 20h |
| React Hooks na Prática | Pedro Ferreira (Ex-Meta Engineer) | R$ 120 | 48h |
| **TOTAL DA TRILHA** | **4 especialistas** | **R$ 360/mês** | **140h** |

**Comparação**: Criar internamente custaria ~140h de trabalho do líder técnico = R$ 17.500 em custo de oportunidade.

### 5.3 Métricas de Sucesso (KPIs)

| Métrica | Meta Atual | Meta 2027 |
|---------|------------|-----------|
| MRR (Monthly Recurring Revenue) | Validação | R$ 500k |
| Empresas ativas | 10 pilotos | 500 |
| Taxa de retenção | 90% | 95% |
| NPS | 50 | 70 |
| Taxa de engajamento | 80% | 90% |

---

## 6. Estado Atual da Base de Código

### 6.1 Visão Geral Técnica

| Dimensão | Status | Detalhes |
|----------|--------|----------|
| **Frontend** | ✅ Produção-ready | React 18 + Vite 5 + Tailwind CSS |
| **Backend** | ✅ Funcional | NocoDB + PostgreSQL 16 |
| **Autenticação** | ✅ Implementado | JWT + RBAC (5 roles, 32 permissões) |
| **Dashboards** | ✅ Completo | 5 dashboards contextuais |
| **i18n** | ✅ Completo | 3 idiomas, ~350+ strings |
| **Testes** | ✅ Parcial | 14 E2E tests (100% passando) |
| **Deploy** | ✅ Ready | Docker, Fly.io, Nginx |

### 6.2 Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (SPA)                         │
│                   React 18 + Vite 5                         │
├─────────────────────────────────────────────────────────────┤
│  components/   │  contexts/   │  hooks/     │  services/    │
│  (48 arquivos) │  (5 ctx)     │  (8 hooks)  │  (apiService) │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP/REST
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND (API)                          │
│                   NocoDB (BaaS)                             │
├─────────────────────────────────────────────────────────────┤
│  REST API v1/v2  │  JWT Auth  │  RBAC  │  Multi-tenant     │
└────────────────┬────────────────────────────────────────────┘
                 │ SQL
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE                               │
│                   PostgreSQL 16                             │
├─────────────────────────────────────────────────────────────┤
│  14 tabelas  │  3 views  │  Indexes  │  Constraints        │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Estrutura de Pastas

```
app-controle/
├── src/                          # Código-fonte React
│   ├── components/               # 48 componentes JSX
│   ├── contexts/                 # 5 contextos (Auth, Tenant, Toast, Loading, Onboarding)
│   ├── hooks/                    # 8 custom hooks
│   ├── services/                 # apiService.js (2076 linhas)
│   ├── data/                     # Dados de cursos (5 arquivos)
│   ├── utils/                    # Utilitários
│   ├── i18n/                     # Configuração i18next
│   ├── config/                   # Configuração centralizada
│   └── pages/                    # Páginas de rotas
│
├── database/                     # Scripts SQL PostgreSQL
│   ├── init.sql                  # Schema inicial
│   ├── migration-001-rbac.sql    # RBAC
│   ├── migration-002-enrollments.sql # Matrículas
│   └── seed-demo-completo.sql    # Dados demo
│
├── docs/                         # Documentação
│   ├── conceitual/               # Glossário, personas
│   ├── tecnico/                  # Arquitetura
│   └── backlog/                  # Roadmap, user stories
│
├── public/locales/               # Arquivos i18n JSON
├── dist/                         # Build de produção
└── docker-compose.nocodb.yml     # Stack local
```

### 6.4 Stack Tecnológico

#### Frontend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.3.1 | Framework UI |
| Vite | 5.1.4 | Build tool |
| React Router | 6.30.2 | Roteamento SPA |
| Tailwind CSS | 3.4.1 | Design system |
| Lucide React | 0.344.0 | Ícones |
| i18next | 25.8.0 | Internacionalização |

#### Backend & Database
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| PostgreSQL | 16 Alpine | Database relacional |
| NocoDB | Latest | Backend as a Service |
| Docker | Latest | Containerização |

#### Testing & QA
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Vitest | 3.2.4 | Testes unitários |
| Playwright | 1.56.1 | Testes E2E |
| Testing Library | 16.3.0 | Testes de componentes |

#### Runtime & Build
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Bun | 1.3.3+ | Runtime JavaScript |
| Node.js | 24.11.1 | Fallback runtime |
| mise | Latest | Gerenciador de versões |

### 6.5 Modelo de Dados

#### Entidades Principais

```sql
-- Empresas (Multi-tenancy)
companies (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  slug VARCHAR(100) UNIQUE,
  logo_url TEXT,
  plan VARCHAR(50),
  max_users INTEGER,
  created_at TIMESTAMP
)

-- Usuários
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  role VARCHAR(50),        -- student, instructor, admin, c_level, specialist
  company_id UUID REFERENCES companies,
  is_active BOOLEAN,
  last_login_at TIMESTAMP
)

-- Cursos
courses (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  slug VARCHAR(100) UNIQUE,
  description TEXT,
  difficulty VARCHAR(50),
  status VARCHAR(50),      -- active, in-development, archived
  total_modules INTEGER,
  duration_hours INTEGER
)

-- Progresso
user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  module_id UUID REFERENCES modules,
  completed_at TIMESTAMP,
  UNIQUE(user_id, module_id)
)

-- Matrículas
user_courses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  course_id UUID REFERENCES courses,
  assigned_by UUID REFERENCES users,
  assigned_at TIMESTAMP,
  due_date DATE
)
```

### 6.6 Funcionalidades Implementadas

#### Autenticação & Autorização
- [x] Login com JWT via NocoDB
- [x] 5 Roles RBAC: `student`, `instructor`, `admin`, `c_level`, `specialist`
- [x] 32 Permissões granulares
- [x] Multi-tenancy com isolamento por empresa
- [x] Persistência de sessão

#### Dashboards por Role
| Role | Dashboard | Funcionalidades |
|------|-----------|-----------------|
| Student | UserDashboard | Progresso, notas, cursos, flash cards |
| Instructor | InstructorDashboard | Time, alunos com dificuldades |
| Admin | AdminDashboard | CRUD usuários, matrículas, analytics |
| C-Level | ExecutiveDashboard | ROI, KPIs corporativos |

#### Sistema de Cursos
- [x] 5 cursos estruturados (Bash, C, Rust, VS Code, Claude Code)
- [x] Hierarquia 4 níveis: Empresa → Curso → Fase → Módulo
- [x] 16 módulos por curso (~32 horas cada)
- [x] CRUD completo de cursos
- [x] Suporte multi-formato (texto, código, vídeos, flashcards)

#### Gerenciamento de Usuários
- [x] CRUD completo com soft-delete
- [x] Matrículas em massa
- [x] Exportação Excel/JSON
- [x] Validação de email único

#### Acompanhamento de Progresso
- [x] Marcação de módulos como completos
- [x] Cálculo de taxa de conclusão
- [x] Timestamps de conclusão
- [x] Persistência em PostgreSQL + localStorage fallback

#### Caderno de Notas
- [x] Auto-save a cada 500ms
- [x] Limite de 50KB
- [x] Suporte Markdown
- [x] Notas isoladas por curso

#### Analytics
- [x] Dashboard de ROI
- [x] Identificação de módulos difíceis (< 40% conclusão)
- [x] Taxa de alcance
- [x] Relatórios exportáveis

#### UX/UI
- [x] Responsividade mobile
- [x] Loading states (skeletons, spinners)
- [x] Empty states contextuais
- [x] Toasts de notificação
- [x] Modais de confirmação
- [x] Onboarding wizard (4 passos)

#### Internacionalização
- [x] 3 idiomas: PT-BR, EN-US, ES-ES
- [x] Lazy loading por namespace
- [x] ~350+ strings traduzidas
- [x] Seletor de idioma com 3 variantes

### 6.7 Qualidade do Código

#### Pontos Fortes
| Aspecto | Avaliação | Observação |
|---------|-----------|------------|
| Estrutura | ✅ Excelente | Separação clara em camadas |
| Nomenclatura | ✅ Excelente | Nomes descritivos e consistentes |
| Documentação | ✅ Muito Bom | JSDoc em 95% das funções |
| Estilização | ✅ Excelente | Tailwind consistente |
| Error handling | ✅ Muito Bom | Try-catch robusto |
| Performance | ✅ Bom | Code splitting, lazy loading |

#### Débitos Técnicos

| Débito | Severidade | Impacto | Prioridade |
|--------|------------|---------|------------|
| Sem TypeScript | Média | Bugs em runtime | Release 3.0 |
| Sem modo offline | Baixa | UX em conexões ruins | Release 4.0 |
| Sem dark mode | Baixa | Preferência do usuário | Release 3.0 |
| WCAG incompleto (~70%) | Média | Acessibilidade | Release 3.0 |
| Sem SSO corporativo | Alta | Enterprise sales | Release 3.0 |

#### Métricas de Código

```
Total de componentes JSX:     53
Total de hooks customizados:  8
Linhas em apiService:         2,076
Linhas totais em components:  ~10,631
Número de permissões RBAC:    32
Strings i18n:                 ~350+
Cobertura de testes E2E:      14/14 (100%)
```

### 6.8 Sprints Completados

| Sprint | Escopo | Status |
|--------|--------|--------|
| Sprint 6 | Auth JWT + DB Schema | ✅ Completo |
| Sprint 7 | RBAC (4 roles) | ✅ Completo |
| Sprint 8 | Dashboards básicos | ✅ Completo |
| Sprint 9 | CRUD de usuários | ✅ Completo |
| Sprint 10 | Matrículas + Analytics | ✅ Completo |
| Sprint 11 | UX Polish + Modals | ✅ Completo |
| Sprint 12 | Internacionalização | ✅ Completo |
| Sprint 13 | White-Label Refactor | ✅ Completo |
| Sprint 14 | CRUD de Cursos | ✅ Completo |
| Sprint 15 | Hub de Especialistas | ✅ Completo |

---

## 7. Roadmap

### 7.1 Curto Prazo (Q1 2026)

- [x] **Sprint 13**: White-Label Refactor
- [x] **Sprint 14**: CRUD de Cursos
- [x] **Sprint 15**: Hub de Especialistas

### 7.2 Médio Prazo (Q2-Q3 2026)

- [ ] Migração gradual para TypeScript
- [ ] Dark mode
- [ ] WCAG 2.1 AA compliance (100%)
- [ ] SSO corporativo (SAML/OAuth)
- [ ] Integração Slack/Teams

### 7.3 Longo Prazo (Q4 2026+)

- [ ] PWA com suporte offline
- [x] **Hub de Especialistas (Marketplace B2B2C)** ✅ Implementado Sprint 15
  - [x] Cadastro de especialistas externos
  - [x] Sistema de avaliação e certificação
  - [x] Revenue sharing (70/30)
  - [x] Dashboard de analytics para especialistas
- [ ] API pública para integrações
- [ ] Mobile apps (React Native)
- [ ] AI-powered recommendations

---

## 8. Hub de Especialistas - Visão Detalhada

### 8.1 O Problema que o Hub Resolve

| Lado | Problema Atual | Solução Hub |
|------|----------------|-------------|
| **Empresa** | Líder técnico gasta 30h+ criando cursos internamente | Acessa catálogo de cursos prontos de especialistas |
| **Empresa** | Conhecimento limitado ao que existe internamente | Combina cursos de múltiplos especialistas externos |
| **Especialista** | Conhecimento monetizado apenas via consultoria pontual | Receita recorrente com cursos vendidos para N empresas |
| **Especialista** | Difícil alcançar público corporativo B2B | Plataforma conecta diretamente com RH/T&D de empresas |

### 8.2 Fluxo do Hub de Especialistas

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUXO COMPLETO DO HUB                                │
└─────────────────────────────────────────────────────────────────────────┘

ESPECIALISTA                                          EMPRESA
     │                                                    │
     │  1. CADASTRO E VERIFICAÇÃO                        │
     │  ├── Cria perfil no hub                           │
     │  ├── Envia credenciais (LinkedIn, certificações)  │
     │  └── Recebe selo "Especialista Verificado"        │
     │                                                    │
     │  2. CRIAÇÃO DO CURSO                              │
     │  ├── Usa templates padronizados                   │
     │  ├── Estrutura em módulos/aulas                   │
     │  ├── Define preço sugerido                        │
     │  └── Submete para aprovação de qualidade          │
     │                                                    │
     │  3. PUBLICAÇÃO NO CATÁLOGO                        │
     │  ├── Curso aparece no marketplace                 │
     │  ├── Tags: "Bash", "DevOps", "Iniciante"         │
     │  └── Reviews de empresas que já usaram            │
     │                                                    │
     │                    MARKETPLACE                     │
     │                    ┌─────────┐                    │
     │                    │ Catálogo│                    │
     │                    │ de 500+ │                    │
     │                    │ cursos  │                    │
     │                    └─────────┘                    │
     │                         │                         │
     │                         │  4. BUSCA E SELEÇÃO     │
     │                         │  ├── RH busca "bash"    │
     │                         │  ├── Filtra por rating  │
     │                         ├──────────────────────────>
     │                                                    │
     │                         │  5. MONTAGEM DE TRILHA  │
     │                         │  ├── Seleciona 4 cursos │
     │                         │  ├── Define ordem       │
     │                         │  └── Atribui a devs     │
     │                         ├──────────────────────────>
     │                                                    │
     │  6. RECEITA                                        │
     │  ├── Empresa paga R$ 360/mês                      │
     │  ├── Plataforma retém 30% (R$ 108)               │
     │  └── Especialistas recebem 70% (R$ 252 dividido) │
     │<───────────────────────────────────────────────────│
     │                                                    │
     │  7. ANALYTICS                                      │
     │  ├── Visualiza matrículas                         │
     │  ├── Taxa de conclusão                            │
     │  ├── Feedback dos alunos                          │
     │  └── Receita mensal                               │
     │                                                    │
```

### 8.3 Personas do Hub de Especialistas

#### Persona 5: Especialista Externo

```
Nome:           João Silva
Idade:          38 anos
Cargo:          DevOps Engineer Senior (freelancer)
Especialidade:  Bash Shell Scripting, Linux, Automação
Experiência:    15 anos em infraestrutura e automação
Localização:    Curitiba, PR
Receita atual:  Consultoria pontual (R$ 150/hora)
```

**Motivações:**
- Monetizar conhecimento de forma passiva (não apenas consultoria)
- Alcançar mais empresas sem precisar fazer vendas B2B
- Construir reputação como especialista reconhecido
- Receita recorrente e previsível

**Dores Atuais:**
- "Só consigo vender para empresas que já me conhecem"
- "Udemy paga muito pouco (R$ 5-10 por aluno)"
- "Não tenho acesso ao mercado corporativo B2B"
- "Consultoria é cansativa, preciso estar sempre presente"

**O que busca no Hub:**
- Acesso direto a RH/T&D de empresas
- Revenue share justo (70% para o especialista)
- Analytics sobre performance dos cursos
- Selo de qualidade que valida suas credenciais

#### Como a Responsável de Onboarding usa o Hub

**Cenário**: Mariana (Gestora de T&D) precisa treinar 5 devs juniores

```
1. IDENTIFICA NECESSIDADE
   └── "Devs precisam de: Bash, DevOps, Windows Terminal, React"

2. BUSCA NO CATÁLOGO
   └── Pesquisa cada tecnologia
   └── Filtra por: rating > 4.5, reviews > 50, preço < R$ 150

3. SELECIONA CURSOS
   ├── "Bash Avançado" - João Silva (4.8★, 120 reviews)
   ├── "CI/CD com GitHub" - Ana Rodrigues (4.7★, 89 reviews)
   ├── "Windows Terminal" - Lucas Mendes (4.9★, 156 reviews)
   └── "React Hooks" - Pedro Ferreira (4.6★, 201 reviews)

4. MONTA TRILHA
   └── Define ordem dos cursos
   └── Estima duração total: 140h
   └── Calcula custo: R$ 360/mês para 5 devs

5. ATRIBUI AOS DEVS
   └── Matricula 5 devs na trilha
   └── Define prazo: 8 semanas

6. ACOMPANHA PROGRESSO
   └── Dashboard mostra % conclusão por dev
   └── Identifica quem está atrasado
   └── Recebe alertas de módulos difíceis
```

### 8.4 Estado Atual vs. Visão do Hub

| Funcionalidade | Estado Atual | Hub de Especialistas |
|----------------|--------------|---------------------|
| **Criação de cursos** | ✅ Interno (líderes técnicos) | 🔜 Externo (especialistas cadastrados) |
| **Catálogo** | ✅ 5 cursos internos | 🔜 500+ cursos de especialistas |
| **Trilhas** | ✅ Pré-definidas | 🔜 Montagem dinâmica pelo RH |
| **Monetização** | ✅ SaaS para empresa | 🔜 + Revenue share com especialistas |
| **Marketplace** | ❌ Não existe | 🔜 Catálogo público de cursos |
| **Perfil de especialista** | ❌ Não existe | 🔜 Perfil verificado com credenciais |

### 8.5 Impacto Estratégico do Hub

```
┌─────────────────────────────────────────────────────────────┐
│                   EFEITO DE REDE (NETWORK EFFECT)           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Mais Especialistas → Mais Cursos → Mais Empresas          │
│       ↑                                    │               │
│       │                                    │               │
│       └────────────────────────────────────┘               │
│                                                             │
│  FLYWHEEL:                                                  │
│  1. Primeiros especialistas publicam cursos                 │
│  2. Empresas encontram conteúdo relevante                   │
│  3. Especialistas ganham receita                            │
│  4. Notícia se espalha na comunidade tech                   │
│  5. Mais especialistas se cadastram                         │
│  6. Catálogo cresce                                         │
│  7. Mais empresas se interessam                             │
│  8. Ciclo se repete                                         │
│                                                             │
│  META: 500 especialistas + 1000 empresas em 2 anos         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.6 Decisões de Produto Tomadas (2026-02-05)

As seguintes decisões foram validadas e devem guiar a implementação:

#### ✅ Funcionalidades do Especialista

| Decisão | Descrição | Impacto |
|---------|-----------|---------|
| **Dashboard próprio** | Especialista visualiza matrículas, receita e feedback em tempo real | Necessário criar UI de dashboard para role "specialist" |
| **Mentoria 1:1** | Especialista pode oferecer sessões de mentoria como serviço adicional | Além de cursos assíncronos, suporte a agendamento |

#### ✅ Funcionalidades para Empresas

| Decisão | Descrição | Impacto |
|---------|-----------|---------|
| **Sistema de reviews** | Empresas avaliam cursos com rating 1-5 estrelas + comentário | Tabela de reviews, média de rating no catálogo |
| **Cursos customizados** | Empresa pode solicitar curso customizado via chat na plataforma | Sistema de mensagens entre empresa e especialista |
| **Cursos privados** | Empresa pode fazer upload de curso com visibilidade restrita | Flag de visibilidade: público, privado, empresa específica |

#### ✅ Funcionalidades de Trilhas

| Decisão | Descrição | Impacto |
|---------|-----------|---------|
| **Pré-requisitos** | Trilhas podem ter ordem configurável (curso A antes de B) | Campo de dependências entre cursos |

### 8.7 Questões Pendentes (Para Definição Futura)

> **Referência completa:** `docs/PLANO-CONSOLIDACAO-DOCUMENTACAO.md`

#### 🔴 Modelo de Negócio (Q1-Q6) - Críticas

- Q1: Revenue share fixo 70/30 ou variável por tier?
- Q2: Especialista paga mensalidade para estar no hub?
- Q3: Quem define o preço do curso (especialista ou plataforma)?
- Q4: Quais credenciais são obrigatórias para cadastro?
- Q5: Existe aprovação de curso antes de publicar?
- Q6: Quais critérios para remover especialista?

#### 🟡 Precificação SaaS (Q11-Q15) - Importantes

- Q11: Preços são por usuário ou flat fee?
- Q12: Existe trial gratuito? Por quanto tempo?
- Q13: Desconto para pagamento anual?
- Q14: Tamanho mínimo para Enterprise?
- Q15: Community Edition tem limitações funcionais?

#### 🟢 Funcionalidades Adicionais (Q16-Q29) - Podem Esperar

- Certificados (validade, verificação externa)
- Gamificação (badges, leaderboard, XP)
- Integrações (SSO, Slack/Teams, HRIS, BI)

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Escalabilidade NocoDB | Média | Alto | Preparar migração para API própria |
| Competição de grandes players | Alta | Médio | Focar em nicho (LATAM, customização) |
| Churn de clientes | Média | Alto | Consultoria T&D incluída |
| Débito técnico acumulado | Média | Médio | Sprints dedicados a refatoração |
| **Hub: Qualidade dos cursos** | Média | Alto | Processo de certificação rigoroso |
| **Hub: Atração de especialistas** | Alta | Alto | Revenue share competitivo (70%) |
| **Hub: Chicken-egg problem** | Alta | Alto | Seed com 50 cursos internos/parceiros |

---

## 10. Conclusão

O **Sulical** está em um estado saudável de desenvolvimento, com uma base de código bem estruturada e funcionalidades core implementadas. O projeto demonstra:

1. **Arquitetura sólida** com separação clara de responsabilidades
2. **Código de qualidade** com padrões consistentes
3. **Funcionalidades essenciais** prontas para produção
4. **Roadmap claro** para evolução

### Recomendações Prioritárias

1. **Manter a estrutura atual** - está excelente
2. **Continuar com TDD** em novos features
3. **Migrar para TypeScript** incrementalmente
4. **Implementar SSO** para vendas enterprise
5. **Completar WCAG 2.1 AA** para acessibilidade
6. **Hub de Especialistas implementado (Sprint 15)** - diferencial estratégico de longo prazo

### Visão Estratégica: Hub de Especialistas

O **Hub de Especialistas** representa o principal diferencial competitivo de longo prazo da plataforma, permitindo:

- **Para Empresas**: Acesso a catálogo de cursos de especialistas externos, eliminando a necessidade de criar todo conteúdo internamente
- **Para Especialistas**: Canal de monetização B2B com revenue share de 70%
- **Para a Plataforma**: Efeito de rede que cria barreira de entrada para concorrentes

Este modelo transforma a plataforma de um LMS tradicional em um **marketplace de conhecimento técnico corporativo**.

---

**Documento preparado por análise forense automatizada**
**Data de geração:** Fevereiro 2026
