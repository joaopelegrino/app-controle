# Especificação Funcional: Hub de Especialistas

**Versão:** 1.0.0
**Data:** 2026-02-05
**Status:** ✅ Implementado (Sprint 15 - Fevereiro 2026)

---

## 1. Visão Geral

### 1.1 O que é o Hub de Especialistas

O **Hub de Especialistas** é um marketplace B2B2C integrado à Plataforma B2B que permite:

- **Especialistas externos** cadastrarem e venderem cursos para empresas
- **Empresas** montarem trilhas personalizadas combinando cursos de múltiplos especialistas
- **Plataforma** atuar como intermediária com revenue share

```
MODELO B2B2C: Business (Especialista) → Business (Plataforma) → Business (Empresa) → Consumer (Colaborador)
```

### 1.2 Problema que Resolve

| Ator | Problema Atual | Solução Hub |
|------|----------------|-------------|
| **Empresa** | Líder técnico gasta 30h+ criando cursos | Acessa catálogo de cursos prontos |
| **Empresa** | Conhecimento limitado ao interno | Combina cursos de N especialistas |
| **Especialista** | Monetiza apenas via consultoria | Receita recorrente passiva |
| **Especialista** | Difícil alcançar mercado B2B | Plataforma conecta com RH/T&D |

### 1.3 Valor Estratégico

```
┌─────────────────────────────────────────────────────────────┐
│                 EFEITO DE REDE (FLYWHEEL)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  + Especialistas → + Cursos → + Empresas → + Receita       │
│        ↑                                        │           │
│        └────────────────────────────────────────┘           │
│                                                             │
│  META: 500 especialistas + 1000 empresas em 2 anos         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Personas e Jornadas

### 2.1 Persona: Especialista Externo (João)

```yaml
Nome: João Silva
Idade: 38 anos
Cargo: DevOps Engineer Senior (freelancer)
Especialidade: Bash Shell Scripting, Linux, Automação
Experiência: 15 anos em infraestrutura
Localização: Curitiba, PR
Receita atual: Consultoria pontual (R$ 150/hora)
```

**Motivações:**
- Monetizar conhecimento de forma passiva
- Alcançar múltiplas empresas sem vendas B2B
- Construir reputação como especialista
- Receita recorrente e previsível

**Dores:**
- "Só vendo para empresas que já me conhecem"
- "Udemy paga muito pouco (R$ 5-10 por aluno)"
- "Não tenho acesso ao mercado corporativo"
- "Consultoria é cansativa, preciso estar presente"

### 2.2 Persona: Responsável de Onboarding (Mariana)

```yaml
Nome: Mariana Costa
Idade: 32 anos
Cargo: Gestora de T&D
Empresa: StartupXYZ (150 funcionários)
Desafio: Treinar 5 devs juniores por mês
Orçamento: R$ 2.000/mês para treinamento
```

**Motivações:**
- Onboarding rápido e estruturado
- Conteúdo técnico atualizado
- Métricas para justificar investimento

### 2.3 Jornada do Especialista

```
1. CADASTRO E VERIFICAÇÃO
   ├── Cria perfil no hub
   ├── Envia credenciais (LinkedIn, certificações)
   └── Recebe selo "Especialista Verificado"

2. CRIAÇÃO DO CURSO
   ├── Usa templates padronizados
   ├── Estrutura em módulos/aulas
   ├── Define preço sugerido
   └── Submete para aprovação

3. PUBLICAÇÃO NO CATÁLOGO
   ├── Curso aparece no marketplace
   ├── Tags: "Bash", "DevOps", "Iniciante"
   └── Reviews de empresas que já usaram

4. RECEITA E ANALYTICS
   ├── Visualiza matrículas em tempo real
   ├── Recebe 70% da receita
   └── Feedback dos alunos
```

### 2.4 Jornada da Empresa

```
1. IDENTIFICA NECESSIDADE
   └── "Devs precisam de: Bash, DevOps, Terminal, React"

2. BUSCA NO CATÁLOGO
   └── Filtra por: rating > 4.5, preço < R$ 150

3. SELECIONA CURSOS
   ├── "Bash Avançado" - João Silva (4.8★)
   ├── "CI/CD GitHub" - Ana Rodrigues (4.7★)
   ├── "Windows Terminal" - Lucas Mendes (4.9★)
   └── "React Hooks" - Pedro Ferreira (4.6★)

4. MONTA TRILHA
   ├── Define ordem (com pré-requisitos)
   └── Calcula: R$ 360/mês, 140h

5. ATRIBUI E ACOMPANHA
   ├── Matricula devs na trilha
   └── Monitora progresso no dashboard
```

---

## 3. Requisitos Funcionais

### 3.1 Módulo: Cadastro de Especialista

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-001 | Especialista cria conta com email e senha | Alta | ⬜ Pendente |
| RF-002 | Especialista preenche perfil (bio, foto, especialidades) | Alta | ⬜ Pendente |
| RF-003 | Especialista envia credenciais para verificação | Alta | ⬜ Pendente |
| RF-004 | Administrador aprova/rejeita cadastro de especialista | Alta | ⬜ Pendente |
| RF-005 | Especialista recebe selo "Verificado" após aprovação | Média | ⬜ Pendente |

**Regras de Negócio:**
- RN-001: LinkedIn obrigatório no cadastro ✅ (Implementado Sprint 15)
- RN-002: Mínimo 1 comprovação (certificação ou portfólio) ✅ (Implementado Sprint 15)
- RN-003: Aprovação em até 48h úteis ✅ (Implementado Sprint 15)

### 3.2 Módulo: Criação de Curso

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-010 | Especialista cria curso com título, descrição, thumbnail | Alta | ⬜ Pendente |
| RF-011 | Especialista estrutura curso em fases e módulos | Alta | ⬜ Pendente |
| RF-012 | Especialista faz upload de vídeos, textos, exercícios | Alta | ⬜ Pendente |
| RF-013 | Especialista define preço sugerido do curso | Alta | ⬜ Pendente |
| RF-014 | Especialista define tags/categorias do curso | Média | ⬜ Pendente |
| RF-015 | Curso passa por checklist de qualidade automatizado | Alta | ⬜ Pendente |
| RF-016 | Administrador revisa e aprova/rejeita curso | Alta | ⬜ Pendente |

**Regras de Negócio:**
- RN-010: Mínimo 4 módulos por curso
- RN-011: Descrição mínima de 200 caracteres
- RN-012: Thumbnail obrigatória (16:9, min 1280x720)

### 3.3 Módulo: Catálogo/Marketplace

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-020 | Empresa visualiza catálogo de cursos disponíveis | Alta | ⬜ Pendente |
| RF-021 | Empresa filtra por: categoria, preço, rating, duração | Alta | ⬜ Pendente |
| RF-022 | Empresa visualiza perfil do especialista | Média | ⬜ Pendente |
| RF-023 | Empresa visualiza preview do curso (1 módulo gratuito) | Média | ⬜ Pendente |
| RF-024 | Empresa visualiza reviews e rating do curso | Alta | ⬜ Pendente |

### 3.4 Módulo: Sistema de Reviews ✅ DECISÃO TOMADA

> **Decisão Q8:** Rating 1-5 estrelas + comentário obrigatório

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-030 | Empresa avalia curso com rating 1-5 estrelas | Alta | ⬜ Pendente |
| RF-031 | Empresa escreve comentário sobre o curso | Alta | ⬜ Pendente |
| RF-032 | Review só é permitido após 50% de conclusão | Alta | ⬜ Pendente |
| RF-033 | Média de rating é exibida no catálogo | Alta | ⬜ Pendente |
| RF-034 | Especialista pode responder reviews | Média | ⬜ Pendente |

### 3.5 Módulo: Montagem de Trilhas

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-040 | Empresa cria trilha combinando cursos de N especialistas | Alta | ⬜ Pendente |
| RF-041 | Empresa define ordem dos cursos na trilha | Alta | ⬜ Pendente |
| RF-042 | ✅ Trilha suporta pré-requisitos entre cursos | Alta | ⬜ Pendente |
| RF-043 | Sistema calcula custo total da trilha | Alta | ⬜ Pendente |
| RF-044 | Empresa atribui trilha a grupos de colaboradores | Alta | ⬜ Pendente |

> **Decisão Q20:** Pré-requisitos configuráveis entre cursos

### 3.6 Módulo: Dashboard do Especialista ✅ DECISÃO TOMADA

> **Decisão Q7:** Dashboard visualiza matrículas, receita e feedback

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-050 | Especialista visualiza total de matrículas | Alta | ⬜ Pendente |
| RF-051 | Especialista visualiza receita mensal/histórica | Alta | ⬜ Pendente |
| RF-052 | Especialista visualiza taxa de conclusão por curso | Alta | ⬜ Pendente |
| RF-053 | Especialista visualiza feedback/reviews recebidos | Alta | ⬜ Pendente |
| RF-054 | Especialista visualiza gráfico de tendência | Média | ⬜ Pendente |

### 3.7 Módulo: Cursos Customizados ✅ DECISÃO TOMADA

> **Decisão Q9:** Empresa solicita via chat/mensagem na plataforma

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-060 | Empresa envia mensagem para especialista | Alta | ⬜ Pendente |
| RF-061 | Especialista responde mensagens no inbox | Alta | ⬜ Pendente |
| RF-062 | Sistema registra histórico de conversas | Média | ⬜ Pendente |
| RF-063 | Especialista cria proposta de curso customizado | Alta | ⬜ Pendente |
| RF-064 | Empresa aceita/rejeita proposta | Alta | ⬜ Pendente |

### 3.8 Módulo: Mentoria 1:1 ✅ DECISÃO TOMADA

> **Decisão Q10:** Mentoria como serviço adicional

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-070 | Especialista oferece serviço de mentoria 1:1 | Média | ⬜ Pendente |
| RF-071 | Especialista define disponibilidade (calendário) | Média | ⬜ Pendente |
| RF-072 | Especialista define preço por sessão (30min, 60min) | Média | ⬜ Pendente |
| RF-073 | Colaborador agenda sessão de mentoria | Média | ⬜ Pendente |
| RF-074 | Sistema envia lembretes de sessão | Baixa | ⬜ Pendente |

### 3.9 Módulo: Cursos Privados ✅ DECISÃO TOMADA

> **Decisão Q18:** Upload no hub com visibilidade restrita

| RF# | Requisito | Prioridade | Status |
|-----|-----------|------------|--------|
| RF-080 | Empresa faz upload de curso próprio | Alta | ⬜ Pendente |
| RF-081 | Curso privado visível apenas para a empresa | Alta | ⬜ Pendente |
| RF-082 | Empresa pode convidar outras empresas para curso | Média | ⬜ Pendente |
| RF-083 | Curso privado não aparece no catálogo público | Alta | ⬜ Pendente |

---

## 4. Modelo de Dados

### 4.1 Novas Entidades

```sql
-- Especialistas (novo role)
specialists (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  linkedin_url TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[],          -- ['bash', 'devops', 'linux']
  credentials JSONB,           -- {certifications: [], portfolio: []}
  verified_at TIMESTAMP,       -- NULL = pendente, data = verificado
  verified_by UUID REFERENCES users,
  status VARCHAR(50),          -- pending, active, suspended, removed
  rating_avg DECIMAL(2,1),     -- 4.8
  total_courses INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
)

-- Cursos do Hub (estende courses existente)
hub_courses (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses,
  specialist_id UUID REFERENCES specialists,
  price_monthly DECIMAL(10,2),
  visibility VARCHAR(50),      -- public, private, company_specific
  company_ids UUID[],          -- se visibility = company_specific
  approved_at TIMESTAMP,
  approved_by UUID REFERENCES users,
  status VARCHAR(50),          -- draft, review, published, archived
  total_enrollments INTEGER DEFAULT 0,
  rating_avg DECIMAL(2,1),
  created_at TIMESTAMP DEFAULT NOW()
)

-- Reviews de Cursos
course_reviews (
  id UUID PRIMARY KEY,
  hub_course_id UUID REFERENCES hub_courses,
  company_id UUID REFERENCES companies,
  user_id UUID REFERENCES users,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  specialist_reply TEXT,
  specialist_replied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(hub_course_id, company_id)  -- 1 review por empresa/curso
)

-- Trilhas Customizadas
custom_paths (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies,
  name VARCHAR(255),
  description TEXT,
  created_by UUID REFERENCES users,
  total_duration_hours INTEGER,
  total_price_monthly DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
)

-- Cursos na Trilha (com ordem e pré-requisitos)
path_courses (
  id UUID PRIMARY KEY,
  path_id UUID REFERENCES custom_paths,
  hub_course_id UUID REFERENCES hub_courses,
  position INTEGER,
  prerequisite_course_id UUID REFERENCES path_courses,
  UNIQUE(path_id, hub_course_id)
)

-- Mensagens (para cursos customizados)
messages (
  id UUID PRIMARY KEY,
  from_user_id UUID REFERENCES users,
  to_user_id UUID REFERENCES users,
  subject VARCHAR(255),
  body TEXT,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
)

-- Sessões de Mentoria
mentoring_sessions (
  id UUID PRIMARY KEY,
  specialist_id UUID REFERENCES specialists,
  student_id UUID REFERENCES users,
  scheduled_at TIMESTAMP,
  duration_minutes INTEGER,
  price DECIMAL(10,2),
  status VARCHAR(50),          -- scheduled, completed, cancelled
  meeting_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
)

-- Revenue Share (pagamentos)
revenue_transactions (
  id UUID PRIMARY KEY,
  specialist_id UUID REFERENCES specialists,
  hub_course_id UUID REFERENCES hub_courses,
  company_id UUID REFERENCES companies,
  period_month DATE,           -- 2026-02-01
  gross_amount DECIMAL(10,2),
  platform_fee DECIMAL(10,2),  -- 30%
  specialist_amount DECIMAL(10,2), -- 70%
  status VARCHAR(50),          -- pending, paid, disputed
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
)
```

### 4.2 Alterações em Entidades Existentes

```sql
-- Adicionar campo em users
ALTER TABLE users ADD COLUMN is_specialist BOOLEAN DEFAULT FALSE;

-- Adicionar campo em courses
ALTER TABLE courses ADD COLUMN source VARCHAR(50) DEFAULT 'internal';
-- source: 'internal' (criado pela empresa) ou 'hub' (do marketplace)
```

---

## 5. RBAC: Nova Role "Specialist"

### 5.1 Permissões da Role Specialist

```yaml
role: specialist
permissions:
  # Cursos próprios
  - hub_courses.create
  - hub_courses.edit_own
  - hub_courses.delete_own
  - hub_courses.view_own

  # Dashboard
  - hub_analytics.view_own
  - hub_revenue.view_own

  # Mensagens
  - messages.send
  - messages.receive

  # Mentoria
  - mentoring.manage_own

  # Reviews
  - reviews.reply_own
```

### 5.2 Permissões Adicionais para Admin

```yaml
role: admin
new_permissions:
  - specialists.approve
  - specialists.suspend
  - hub_courses.approve
  - hub_courses.feature  # destacar no catálogo
```

### 5.3 Permissões Adicionais para Empresa

```yaml
role: admin (empresa)
new_permissions:
  - hub_catalog.view
  - hub_catalog.purchase
  - custom_paths.create
  - custom_paths.edit
  - reviews.create
  - messages.send_to_specialist
  - private_courses.upload
```

---

## 6. Decisões Tomadas vs. Pendentes

### 6.1 ✅ Decisões Confirmadas (6)

| # | Questão | Decisão | Data |
|---|---------|---------|------|
| Q7 | Dashboard do especialista | ✅ Visualiza matrículas, receita, feedback | 2026-02-05 |
| Q8 | Reviews de cursos | ✅ Rating 1-5 estrelas + comentário | 2026-02-05 |
| Q9 | Cursos customizados | ✅ Via chat/mensagem na plataforma | 2026-02-05 |
| Q10 | Mentoria 1:1 | ✅ Como serviço adicional | 2026-02-05 |
| Q18 | Cursos privados | ✅ Upload no hub com visibilidade restrita | 2026-02-05 |
| Q20 | Pré-requisitos | ✅ Configurável entre cursos | 2026-02-05 |

### 6.2 ✅ Questões de Negócio RESPONDIDAS (Q1-Q6) - 2026-02-09

> **Todas as questões críticas foram respondidas no Sprint 15**

| # | Questão | Decisão Final | Data |
|---|---------|---------------|------|
| Q1 | Revenue share | ✅ Fixo 70/30 (especialista/plataforma) | 2026-02-09 |
| Q2 | Especialista paga mensalidade? | ✅ Não - cadastro gratuito para atrair massa crítica | 2026-02-09 |
| Q3 | Quem define preço? | ✅ Especialista define, com faixa sugerida pela plataforma | 2026-02-09 |
| Q4 | Credenciais obrigatórias | ✅ LinkedIn obrigatório + mínimo 1 comprovação | 2026-02-09 |
| Q5 | Aprovação antes de publicar? | ✅ Sim - checklist automático + revisão manual em 48h | 2026-02-09 |
| Q6 | Critérios de remoção | ✅ Rating < 3.0 por 3 meses consecutivos OU 3+ reclamações formais | 2026-02-09 |

---

## 7. Fluxos de Tela (Wireframes Conceituais)

### 7.1 Cadastro de Especialista

```
┌────────────────────────────────────────────────────────────┐
│  CADASTRO DE ESPECIALISTA                     [1/3]        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────┐                                               │
│  │  FOTO   │  Nome Completo: ____________________         │
│  │         │  Email: ____________________________         │
│  └─────────┘  LinkedIn: _________________________         │
│                                                            │
│  Bio (mínimo 100 caracteres):                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Especialidades (selecione até 5):                         │
│  ☑ Bash  ☑ DevOps  ☐ Linux  ☐ Python  ☐ React            │
│  ☐ AWS   ☐ Docker  ☐ K8s    ☐ Git     ☐ CI/CD            │
│                                                            │
│                              [ Próximo → ]                 │
└────────────────────────────────────────────────────────────┘
```

### 7.2 Catálogo de Cursos (Empresa)

```
┌────────────────────────────────────────────────────────────┐
│  CATÁLOGO DE CURSOS                      🔍 buscar...      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Filtros: [Categoria ▼] [Preço ▼] [Rating ▼] [Duração ▼] │
│                                                            │
│  ┌────────────────────┐ ┌────────────────────┐            │
│  │ ░░░░░░░░░░░░░░░░░░ │ │ ░░░░░░░░░░░░░░░░░░ │            │
│  │ Bash Avançado      │ │ CI/CD com GitHub   │            │
│  │ por João Silva     │ │ por Ana Rodrigues  │            │
│  │ ★★★★★ (4.8) 120rev│ │ ★★★★☆ (4.7) 89rev │            │
│  │ 40h | R$ 80/mês    │ │ 32h | R$ 100/mês   │            │
│  │ [Ver curso]        │ │ [Ver curso]        │            │
│  └────────────────────┘ └────────────────────┘            │
│                                                            │
│  ┌────────────────────┐ ┌────────────────────┐            │
│  │ ░░░░░░░░░░░░░░░░░░ │ │ ░░░░░░░░░░░░░░░░░░ │            │
│  │ Windows Terminal   │ │ React Hooks        │            │
│  │ por Lucas Mendes   │ │ por Pedro Ferreira │            │
│  │ ★★★★★ (4.9) 156rev│ │ ★★★★☆ (4.6) 201rev│            │
│  │ 20h | R$ 60/mês    │ │ 48h | R$ 120/mês   │            │
│  │ [Ver curso]        │ │ [Ver curso]        │            │
│  └────────────────────┘ └────────────────────┘            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 7.3 Dashboard do Especialista

```
┌────────────────────────────────────────────────────────────┐
│  MEU DASHBOARD                             João Silva 👤   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │   RECEITA    │ │  MATRÍCULAS  │ │    RATING    │       │
│  │   R$ 4.200   │ │     156      │ │    ★ 4.8     │       │
│  │   +12% ↑     │ │   +8% ↑      │ │   estável    │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                            │
│  Receita Mensal (últimos 6 meses)                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │     ▁▂▃▄▅▆█                                          │ │
│  │     Set Out Nov Dez Jan Fev                          │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Meus Cursos:                                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Bash Avançado      | 120 alunos | ★4.8 | [Editar]  │  │
│  │ Linux Fundamentos  | 36 alunos  | ★4.6 | [Editar]  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  Últimos Feedbacks:                                        │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ ★★★★★ "Excelente curso, muito prático!" - Empresa X│  │
│  │ ★★★★☆ "Bom conteúdo, poderia ter mais exercícios"  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 8. APIs Necessárias

### 8.1 Endpoints de Especialista

```
POST   /api/v1/specialists              # Cadastro
GET    /api/v1/specialists/:id          # Perfil público
PATCH  /api/v1/specialists/:id          # Editar perfil próprio
POST   /api/v1/specialists/:id/verify   # Admin aprova

GET    /api/v1/specialists/me/dashboard # Dashboard próprio
GET    /api/v1/specialists/me/courses   # Meus cursos
GET    /api/v1/specialists/me/revenue   # Minha receita
GET    /api/v1/specialists/me/reviews   # Reviews recebidos
```

### 8.2 Endpoints de Hub Courses

```
POST   /api/v1/hub/courses              # Criar curso
GET    /api/v1/hub/courses              # Catálogo (filtros)
GET    /api/v1/hub/courses/:id          # Detalhes do curso
PATCH  /api/v1/hub/courses/:id          # Editar curso próprio
DELETE /api/v1/hub/courses/:id          # Arquivar curso
POST   /api/v1/hub/courses/:id/approve  # Admin aprova
POST   /api/v1/hub/courses/:id/preview  # Liberar preview
```

### 8.3 Endpoints de Reviews

```
POST   /api/v1/hub/courses/:id/reviews     # Criar review
GET    /api/v1/hub/courses/:id/reviews     # Listar reviews
POST   /api/v1/reviews/:id/reply           # Especialista responde
```

### 8.4 Endpoints de Trilhas

```
POST   /api/v1/paths                    # Criar trilha
GET    /api/v1/paths                    # Minhas trilhas
GET    /api/v1/paths/:id                # Detalhes da trilha
PATCH  /api/v1/paths/:id                # Editar trilha
DELETE /api/v1/paths/:id                # Deletar trilha
POST   /api/v1/paths/:id/courses        # Adicionar curso
DELETE /api/v1/paths/:id/courses/:cid   # Remover curso
POST   /api/v1/paths/:id/assign         # Atribuir a usuários
```

### 8.5 Endpoints de Mensagens

```
POST   /api/v1/messages                 # Enviar mensagem
GET    /api/v1/messages                 # Inbox
GET    /api/v1/messages/:id             # Ler mensagem
PATCH  /api/v1/messages/:id/read        # Marcar como lida
```

### 8.6 Endpoints de Mentoria

```
GET    /api/v1/specialists/:id/availability  # Ver disponibilidade
POST   /api/v1/mentoring/sessions           # Agendar sessão
GET    /api/v1/mentoring/sessions           # Minhas sessões
PATCH  /api/v1/mentoring/sessions/:id       # Cancelar/completar
```

---

## 9. Componentes React Necessários

### 9.1 Novos Componentes

```
src/components/hub/
├── SpecialistRegistration.jsx    # Cadastro de especialista
├── SpecialistProfile.jsx         # Perfil público
├── SpecialistDashboard.jsx       # Dashboard do especialista
├── CourseCatalog.jsx             # Catálogo/marketplace
├── CourseCard.jsx                # Card de curso no catálogo
├── CourseDetail.jsx              # Página de detalhes do curso
├── CourseEditor.jsx              # Editor de curso
├── CourseReviews.jsx             # Lista de reviews
├── ReviewForm.jsx                # Formulário de avaliação
├── PathBuilder.jsx               # Montagem de trilha
├── PathPreview.jsx               # Preview da trilha
├── MessageInbox.jsx              # Inbox de mensagens
├── MessageThread.jsx             # Thread de conversa
├── MentoringCalendar.jsx         # Calendário de disponibilidade
├── MentoringBooking.jsx          # Agendamento de sessão
└── RevenueChart.jsx              # Gráfico de receita
```

### 9.2 Contextos

```
src/contexts/
├── SpecialistContext.jsx         # Estado do especialista logado
└── HubContext.jsx                # Estado do marketplace
```

### 9.3 Hooks

```
src/hooks/
├── useSpecialist.js              # Dados do especialista
├── useHubCourses.js              # Cursos do hub
├── useCatalog.js                 # Filtros e busca
├── useReviews.js                 # Reviews de cursos
├── usePaths.js                   # Trilhas customizadas
└── useMessages.js                # Mensagens
```

---

## 10. Timeline Estimada

### 10.1 Fases de Implementação

```
FASE 1: FUNDAÇÃO (8 semanas)
├── Semana 1-2: Schema de banco + migrações
├── Semana 3-4: APIs de especialista e cursos
├── Semana 5-6: Cadastro e dashboard de especialista
└── Semana 7-8: Catálogo básico

FASE 2: MARKETPLACE (6 semanas)
├── Semana 9-10: Sistema de reviews
├── Semana 11-12: Montagem de trilhas
└── Semana 13-14: Filtros avançados e busca

FASE 3: ENGAJAMENTO (4 semanas)
├── Semana 15-16: Sistema de mensagens
└── Semana 17-18: Mentoria 1:1

FASE 4: MONETIZAÇÃO (4 semanas)
├── Semana 19-20: Revenue tracking
└── Semana 21-22: Relatórios e payouts
```

### 10.2 Dependências Externas

- [ ] Gateway de pagamento (Stripe, PagSeguro)
- [ ] Integração calendário (Google Calendar, Calendly)
- [ ] Armazenamento de vídeos (S3, Cloudflare R2)
- [ ] Serviço de email transacional (SendGrid)

---

## 11. Métricas de Sucesso

| Métrica | Meta 6 meses | Meta 12 meses |
|---------|--------------|---------------|
| Especialistas cadastrados | 50 | 200 |
| Cursos publicados | 150 | 500 |
| Empresas comprando | 100 | 400 |
| GMV (Gross Merchandise Value) | R$ 50k/mês | R$ 200k/mês |
| Take rate (receita plataforma) | R$ 15k/mês | R$ 60k/mês |
| Rating médio dos cursos | > 4.0 | > 4.2 |

---

## 12. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Chicken-egg problem | Alta | Alto | Seed com 50 cursos internos/parceiros |
| Qualidade dos cursos | Média | Alto | Processo rigoroso de aprovação |
| Atração de especialistas | Alta | Alto | Revenue share 70% competitivo |
| Concorrência (Udemy B2B) | Média | Médio | Foco em LATAM + customização |
| Pagamentos internacionais | Média | Médio | Stripe para multi-moeda |

---

## 13. Referências

- `docs/VISAO_MISSAO_E_ESTADO_ATUAL.md` - Seção 8 (Hub de Especialistas)
- `docs/PLANO-CONSOLIDACAO-DOCUMENTACAO.md` - Questões Q1-Q29
- `docs/01-PRODUTO/04-personas.md` - Persona 5 (João, Especialista)
- `docs/00-ROADMAP-CONSOLIDACAO.md` - Roadmap geral

---

**FIM DA ESPECIFICAÇÃO**

**Status Sprint 15 (Fevereiro 2026):**
1. ✅ Questões Q1-Q6 respondidas (modelo de negócio definido)
2. ✅ Migration-003: 3 tabelas, 2 views, 3 triggers criados
3. ✅ RBAC: 5 roles, 32 permissões (11 novas hub_*)
4. ✅ 5 componentes Hub implementados em src/components/hub/
5. ✅ Rotas /specialist e /hub/catalog funcionais
6. ✅ i18n: namespace hub em 3 idiomas
7. ✅ Testes unitários Hub passando
