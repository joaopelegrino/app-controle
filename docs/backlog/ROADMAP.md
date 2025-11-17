# 📘 Ultrathink - Product Roadmap & Backlog

**Versão:** 3.0  
**Data:** 2025-11-17  
**Status:** ✅ **Fonte Única da Verdade (Single Source of Truth)**  
**Responsável:** João Pelegrino  
**Tipo:** PRD + User Stories + Roadmap B2B

---

## 🎯 VISÃO DO PRODUTO B2B

### Declaração de Visão

**"Ultrathink é uma plataforma B2B de treinamento técnico corporativo que capacita empresas de tecnologia a estruturar, mensurar e escalar o conhecimento interno através de trilhas customizáveis, progresso rastreável e analytics corporativo."**

### Propósito

Resolver o problema de empresas que gastam R$150k-200k/ano em plataformas genéricas (Udemy Business, Coursera) mas enfrentam:
- ❌ **Baixa taxa de engajamento** (apenas 10-15% dos colaboradores usam)
- ❌ **Conteúdo não customizável** para stack específico da empresa
- ❌ **Impossibilidade de medir ROI** real do treinamento
- ❌ **Onboarding técnico desorganizado** (2+ meses para produtividade)

### Público-Alvo B2B

**Personas Corporativas:**

1. **Carlos, CTO de Startup** (120 funcionários)
   - Problema: Gasta R$180k/ano em Udemy Business, mas só 10% dos devs usam
   - Necessidade: Customização de conteúdo para stack da empresa (React, Rust, DevOps)

2. **Ana, Gerente de Engenharia** (Fintech 200 pessoas)
   - Problema: Onboarding técnico caótico, cada líder ensina do seu jeito
   - Necessidade: Padronização de treinamento técnico (4 semanas estruturadas)

3. **Roberto, Diretor de RH** (Consultoria 500 pessoas)
   - Problema: Quer criar universidade corporativa, mas plataformas são caras e rígidas
   - Necessidade: White-label com analytics de engajamento e certificações customizadas

**Consultar:** `docs/conceitual/01-visao-geral/05-personas-corporativas.md`

---

## 📊 ESTADO ATUAL DO PRODUTO (Release 1.0 - Novembro 2025)

### Conteúdo Disponível

```yaml
Áreas de Conhecimento: 13
  Ativas (com sistema integrado): 6
    - Bash Shell Scripting (16 aulas, 32h)
    - C Programming (50 aulas, 100h)
    - Rust Programming (24 aulas, 120h)
    - VSCode WSL (8 aulas, 16h)
    - Claude Code CLI (12 aulas, 120h)
    - Rust Developer Path (trilha completa, 7 áreas)
  
  Em Desenvolvimento: 7
    - Linux, Servidores, DevOps, Docker, Kubernetes
    - Criptografia, Segurança

Total Implementado:
  - Aulas: 110 (5 sistemas)
  - Módulos Planejados: 227
  - Flash Cards: 39
  - Horas de Conteúdo: ~692h
  - Componentes React: 18
```

### Stack Tecnológica

```yaml
Frontend:
  - React: 18.3.1
  - Vite: 5.4.19 (build tool, startup 295ms)
  - Tailwind CSS: 3.4.1

Bibliotecas:
  - Lucide React: 0.344.0 (ícones)
  - React Markdown: 10.1.0

Testes:
  - Vitest: 3.2.4
  - Testing Library: 16.3.0
  - Playwright: 1.56.1 (E2E)

DevOps:
  - Docker + Nginx Alpine
  - GitHub Actions (CI/CD)
  - MCP Chrome DevTools (validação)

Performance:
  - Build Time: ~5.7s ✅
  - Bundle Size: ~600KB
  - Vite Startup: 295ms ✅
```

### Métricas de Qualidade

```yaml
Código:
  - Componentes: 18 (+ Breadcrumb.jsx)
  - Linhas de Código: ~5.600
  - Cobertura de Testes: ~5% ⚠️ (meta: 80%)
  - Duplicação: ~25% ⚠️ (meta: <10%)

Nomenclatura:
  - Consistência: 100% ✅ (ÉPICO 12 completo)
  - Glossário: Aplicado em todos os 5 sistemas
  - Breadcrumb: Implementado (WCAG 2.1 AA)

Nota Geral: 9.0/10 ⭐ (antes: 8.5/10)
```

---

## 🗺️ ROADMAP DE RELEASES

### ✅ **Release 1.0 "Foundation"** - **COMPLETA** (Janeiro-Novembro 2025)

**Objetivo:** MVP funcional com 5 sistemas integrados completos.

**Entregas:**
- ✅ Hub com 13 áreas de estudo (6 ativas + 7 em desenvolvimento)
- ✅ 5 Sistemas Integrados completos (C, Rust, Bash, VSCode, Claude Code)
- ✅ 1 Trilha de Aprendizado (Rust Developer Path)
- ✅ Flash cards 3D interativos (39 cards)
- ✅ Caderno de Notas com auto-save (localStorage)
- ✅ Progresso visual de aulas
- ✅ Build otimizado (Docker + Nginx)
- ✅ CI/CD com GitHub Actions
- ✅ ÉPICO 12: Nomenclatura 100% consistente (28 correções)
- ✅ ÉPICO 12: Breadcrumb hierárquico (WCAG 2.1 AA)
- ✅ ÉPICO 13: Áreas descontinuadas separadas

**Métricas Atingidas:**
- 110 aulas prontas
- 692h de conteúdo planejado
- Nomenclatura profissional (padrão Udemy/Coursera)
- Build < 6s
- Zero violações de glossário

---

### 📋 **Release 2.0 "Quality & Scale"** - **PLANEJADA** (Q1 2026)

**Objetivo:** Reduzir débito técnico, melhorar testabilidade e escalabilidade.

**Épicos:**

#### ÉPICO 14: Navegação e Persistência (21 pontos)
- **US-040**: React Router (navegação por URL, deep linking) - 13 pontos
- **US-041**: Tratamento de erros localStorage (QuotaExceededError, 50KB limit) - 5 pontos
- **US-042**: Persistir progresso de módulos (localStorage + sync React) - 8 pontos

#### ÉPICO 15: Refatoração e Qualidade (49 pontos)
- **US-043**: Refatorar BaseLearningSystem (reduzir 800 linhas duplicadas) - 21 pontos
- **US-019**: Testes de componentes principais (HubView, FlashcardModal) - 21 pontos
- **US-020**: Testes E2E automatizados (CI/CD integrado) - 13 pontos
- **US-022**: Lazy loading de componentes (bundle inicial < 200KB) - 8 pontos

**Entregas Esperadas:**
- Navegação com URLs (botão voltar funciona, deep linking)
- Progresso persistido entre sessões
- Componente genérico BaseLearningSystem (-800 linhas)
- Cobertura de testes >= 30%
- Testes E2E em CI/CD
- Bundle otimizado < 200KB inicial

**Duração Estimada:** 8 semanas  
**Pontos Totais:** 70 pontos

---

### 📋 **Release 3.0 "Enterprise Features"** - **PLANEJADA** (Q2 2026)

**Objetivo:** Transformar em plataforma B2B multi-tenant com analytics corporativo.

**Épicos:**

#### ÉPICO 16: Backend e Multi-Tenancy (55 pontos)
- **US-080**: Sistema Multi-Tenant (empresas isoladas, dados separados) - 21 pontos
- **US-081**: SSO Corporativo (SAML, OAuth, Active Directory) - 13 pontos
- **US-082**: API RESTful (CRUD de cursos, aulas, progresso) - 21 pontos

#### ÉPICO 17: Analytics Corporativo (34 pontos)
- **US-083**: Dashboard para Gestores (engajamento, conclusão, tempo médio) - 21 pontos
- **US-084**: Relatórios de Progresso Individual e por Time - 13 pontos

#### ÉPICO 18: Conteúdo e Customização (47 pontos)
- **US-071**: Template de Curso Padrão (docs + scaffolding) - 5 pontos
- **US-072**: Sistema Linux Completo (seguindo padrão Bash) - 21 pontos
- **US-073 a US-075**: Sistemas Servidores, DevOps, Docker - 21 pontos

#### ÉPICO 19: UX Avançada (26 pontos)
- **US-050**: Dark Mode (toggle, localStorage, system preference) - 13 pontos
- **US-064**: Hierarquia Visual melhorada (níveis claros) - 8 pontos
- **US-065**: Documentar Arquitetura de Informação - 3 pontos

**Entregas Esperadas:**
- Backend Node.js + PostgreSQL
- Multi-tenant (até 100 empresas isoladas)
- SSO corporativo (integração AD, Okta, Auth0)
- Dashboard de analytics para RH/Gestores
- API RESTful documentada (Swagger)
- 3 novos sistemas completos (Linux, Servidores, DevOps)
- Dark mode
- Migração TypeScript (parcial)
- Acessibilidade WCAG 2.1 AA (100%)

**Duração Estimada:** 12 semanas  
**Pontos Totais:** 162 pontos

---

### 📋 **Release 4.0 "Growth & Scale"** - **PLANEJADA** (Q3 2026)

**Objetivo:** Marketplace B2B2C, certificações customizadas, gamificação corporativa.

**Épicos:**

#### ÉPICO 20: Marketplace B2B2C (89 pontos)
- **US-085**: Marketplace de Cursos Técnicos (venda B2B) - 34 pontos
- **US-086**: Sistema de Certificações Customizadas - 21 pontos
- **US-087**: White-label por Empresa (logo, cores, domínio) - 34 pontos

#### ÉPICO 21: Gamificação Corporativa (55 pontos)
- **US-051**: Sistema de Conquistas Corporativas - 21 pontos
- **US-088**: Leaderboards por Time (não individual, para evitar competição tóxica) - 13 pontos
- **US-089**: Badges e Certificados Visuais - 21 pontos

#### ÉPICO 22: Mobile e Offline (55 pontos)
- **US-053**: PWA com Modo Offline (Service Worker, cache) - 21 pontos
- **US-090**: Mobile Apps (React Native, iOS/Android) - 34 pontos

#### ÉPICO 23: Integrações (34 pontos)
- **US-091**: Integração Slack/Teams (notificações de progresso) - 13 pontos
- **US-092**: Webhooks e APIs de Terceiros - 13 pontos
- **US-052**: Busca Global (Ctrl+K, fuzzy search) - 13 pontos

**Entregas Esperadas:**
- Marketplace B2B de cursos técnicos
- Certificações customizadas (logo da empresa)
- White-label completo (domínio próprio)
- Gamificação corporativa (sem toxicidade)
- PWA offline-first
- Mobile apps iOS/Android
- Integrações Slack/Teams

**Duração Estimada:** 16 semanas  
**Pontos Totais:** 233 pontos

---

## 📦 ÉPICOS E USER STORIES DETALHADAS

### ÉPICO 12: Arquitetura de Informação ✅ **100% COMPLETO**

**Status:** ✅ DONE | Nota: 9.5/10 ⭐  
**Sprint:** 2.4 (Novembro 2025)

**User Stories Completas:**
- ✅ **US-060**: Nomenclatura Consistente (28 correções, glossário aplicado)
- ✅ **US-061**: Breadcrumb Hierárquico (WCAG 2.1 AA, 3 níveis)
- ✅ **US-062**: Padronizar Botões de Navegação
- ✅ **US-063**: Unificar Conceito de "Notas"
- ✅ **US-064**: Melhorar Hierarquia Visual

**Impacto:**
- Nomenclatura 100% consistente (padrão Udemy/Coursera)
- Breadcrumb acessível em todos os sistemas
- Navegação intuitiva (Hub > Curso > Aula)
- Violações de glossário: 30 → 0

**Arquivos Modificados:** 7 componentes + 1 arquivo de dados

---

### ÉPICO 13: Padronização Estrutural ✅ 10% COMPLETO

**Status:** 🚧 EM ANDAMENTO | Nota: 7/10 ⭐  
**Sprint:** 3.1 (Dezembro 2025)

**User Stories:**
- ✅ **US-070**: Descontinuar Áreas Incompletas (13 edições) - **DONE**
- 📋 **US-071**: Template de Curso Padrão - TODO (5 pontos)
- 📋 **US-072**: Sistema Linux Completo - TODO (21 pontos)
- 📋 **US-073 a US-078**: Migração áreas restantes - TODO (63 pontos)

**Objetivo:** Elevar as 7 áreas incompletas ao nível do **Bash** (padrão ouro).

**Próximos Passos (Sprint 3.1):**
1. Criar `docs/TEMPLATE-CURSO-PADRAO.md` ✅ (já existe)
2. Implementar US-071 (Template físico em `templates/`)
3. Criar Sistema Linux completo seguindo template

---

### ÉPICO 14: Navegação e Persistência 📋 TODO

**Prioridade:** 🟠 Alta  
**Sprint:** 2.1 (Q1 2026)  
**Pontos:** 21

#### US-040: Implementar React Router

**Como** usuário navegando  
**Quero** URLs que reflitam minha posição  
**Para** compartilhar links e usar botão voltar do navegador

**Critérios de Aceite:**
- [ ] react-router-dom instalado
- [ ] Rotas: `/`, `/curso/:id`, `/curso/:id/aula/:aulaId`
- [ ] Navegação via Link/NavLink
- [ ] Botão voltar do navegador funciona
- [ ] Deep linking funciona (ex: `/curso/bash/aula/1-1`)
- [ ] 404 page implementada

**Complexidade:** 13 pontos

---

#### US-041: Tratamento de Erros localStorage

**Como** usuário salvando notas  
**Quero** ser avisado se houver problemas  
**Para** não perder meu trabalho

**Critérios de Aceite:**
- [ ] Try/catch em todas operações localStorage
- [ ] Tratamento de QuotaExceededError
- [ ] Limite de 50KB por nota (com alerta)
- [ ] Toast/notificação de erro
- [ ] Fallback: salvar em memória
- [ ] Testes unitários

**Complexidade:** 5 pontos

---

#### US-042: Persistir Progresso de Módulos

**Como** usuário completando aulas  
**Quero** que meu progresso seja salvo  
**Para** não perder ao recarregar página

**Critérios de Aceite:**
- [ ] Progresso salvo em localStorage por curso
- [ ] Keys: `ultrathink_progress_bash`, `ultrathink_progress_c`, etc.
- [ ] Carregar progresso ao montar componente
- [ ] Sincronizar estado React com localStorage
- [ ] Tratamento de erros (US-041)

**Complexidade:** 8 pontos

---

### ÉPICO 15: Refatoração e Qualidade 📋 TODO

**Prioridade:** 🟠 Alta  
**Sprint:** 2.2-2.3 (Q1 2026)  
**Pontos:** 49

#### US-043: Refatorar BaseLearningSystem

**Como** desenvolvedor mantendo código  
**Quero** componente genérico para sistemas  
**Para** reduzir duplicação de 800 linhas

**Critérios de Aceite:**
- [ ] BaseLearningSystem.jsx criado
- [ ] Props genéricos: `{courseData, videoUrl, sections, modules, ...}`
- [ ] CLearningSystem usa BaseLearningSystem
- [ ] RustLearningSystem usa BaseLearningSystem
- [ ] BashLearningSystem usa BaseLearningSystem
- [ ] VSCodeLearningSystem usa BaseLearningSystem
- [ ] ClaudeCodeLearningSystem usa BaseLearningSystem
- [ ] Funcionalidade idêntica mantida
- [ ] Testes passam
- [ ] ~800 linhas removidas

**Impacto:** Duplicação 25% → 10%

**Complexidade:** 21 pontos

---

#### US-019: Testes de Componentes Principais

**Como** desenvolvedor garantindo qualidade  
**Quero** testes para componentes críticos  
**Para** evitar regressões

**Critérios de Aceite:**
- [ ] HubView.test.jsx (renderização, stats, navegação)
- [ ] FlashcardModal.test.jsx (flip, navegação, dados)
- [ ] CLearningSystem.test.jsx (módulos, progresso, notas)
- [ ] LearningPathView.test.jsx (áreas, navegação)
- [ ] Breadcrumb.test.jsx (acessibilidade, navegação)
- [ ] Cobertura >= 30%

**Complexidade:** 21 pontos

---

#### US-020: Testes E2E com Playwright

**Como** QA validando features  
**Quero** testes E2E automatizados  
**Para** garantir fluxos completos

**Critérios de Aceite:**
- [ ] Teste: Navegação Hub → Bash → Aula → Voltar
- [ ] Teste: Caminho Rust completo
- [ ] Teste: Flash cards (abrir, navegar, fechar)
- [ ] Teste: Persistência de notas
- [ ] Teste: Progresso de módulos
- [ ] CI/CD: Testes rodam em GitHub Actions
- [ ] Screenshot comparison (visual regression)

**Complexidade:** 13 pontos

---

#### US-022: Lazy Loading de Componentes

**Como** usuário acessando o sistema  
**Quero** carregamento rápido inicial  
**Para** começar a usar logo

**Critérios de Aceite:**
- [ ] React.lazy() para sistemas integrados
- [ ] Suspense com loading fallback
- [ ] Code splitting por rota
- [ ] Bundle inicial < 200KB
- [ ] TTI (Time to Interactive) < 3s
- [ ] Lighthouse score >= 90

**Complexidade:** 8 pontos

---

### ÉPICO 16: Backend e Multi-Tenancy 📋 TODO

**Prioridade:** 🔴 Crítica para B2B  
**Sprint:** 3.1-3.3 (Q2 2026)  
**Pontos:** 55

#### US-080: Sistema Multi-Tenant

**Como** CTO de empresa  
**Quero** dados da minha empresa isolados de outras  
**Para** garantir segurança e privacidade

**Critérios de Aceite:**
- [ ] Backend Node.js + Express
- [ ] PostgreSQL com schema por tenant
- [ ] Autenticação JWT por tenant
- [ ] Subdomain routing (`empresa1.ultrathink.com.br`)
- [ ] Dados isolados (courses, users, progress por empresa)
- [ ] API: `/api/v1/tenants/:tenantId/...`
- [ ] Seed de tenant demo
- [ ] Testes de isolamento de dados

**Complexidade:** 21 pontos

---

#### US-081: SSO Corporativo

**Como** Gerente de TI  
**Quero** integração com Active Directory/Okta  
**Para** colaboradores fazerem login único

**Critérios de Aceite:**
- [ ] Suporte SAML 2.0
- [ ] Suporte OAuth 2.0 (Google Workspace, Microsoft 365)
- [ ] Integração Active Directory
- [ ] Integração Okta, Auth0
- [ ] Provisionamento automático de usuários (SCIM)
- [ ] Grupo de permissões sincronizado
- [ ] Documentação de configuração por provedor

**Complexidade:** 13 pontos

---

#### US-082: API RESTful para Cursos

**Como** instrutor corporativo  
**Quero** criar cursos via API  
**Para** automatizar criação de conteúdo

**Critérios de Aceite:**
- [ ] API REST documentada (Swagger/OpenAPI)
- [ ] Endpoints: CRUD de cursos, seções, aulas
- [ ] Endpoints: Upload de vídeos (YouTube embed ou S3)
- [ ] Endpoints: CRUD de flash cards
- [ ] Endpoints: Atribuir cursos a grupos/usuários
- [ ] Rate limiting (100 req/min por tenant)
- [ ] Webhooks para eventos (curso criado, aula completada)
- [ ] SDK JavaScript/Python

**Complexidade:** 21 pontos

---

### ÉPICO 17: Analytics Corporativo 📋 TODO

**Prioridade:** 🟠 Alta para B2B  
**Sprint:** 3.4 (Q2 2026)  
**Pontos:** 34

#### US-083: Dashboard para Gestores

**Como** Diretor de RH  
**Quero** ver engajamento e conclusão por curso  
**Para** medir ROI do treinamento

**Critérios de Aceite:**
- [ ] Dashboard React (D3.js ou Recharts)
- [ ] Métricas:
  - Engajamento total (usuários ativos/total)
  - Taxa de conclusão por curso
  - Tempo médio por aula
  - Cursos mais acessados
  - Progresso geral da empresa
- [ ] Filtros: Por time, por período, por curso
- [ ] Export CSV/Excel
- [ ] Gráficos: Linha (progresso tempo), barras (conclusão), pizza (distribuição)
- [ ] Atualização em tempo real (WebSocket ou polling)

**Complexidade:** 21 pontos

---

#### US-084: Relatórios de Progresso

**Como** Gerente de Engenharia  
**Quero** ver progresso individual de cada dev  
**Para** acompanhar evolução do time

**Critérios de Aceite:**
- [ ] Tabela de usuários com progresso (nome, curso atual, % conclusão)
- [ ] Filtro por time/departamento
- [ ] Detalhamento individual (quais aulas completou, quanto tempo gastou)
- [ ] Histórico de atividade (últimas 30 dias)
- [ ] Notificações automáticas (usuário inativo por 7+ dias)
- [ ] Export PDF (relatório individual ou consolidado)

**Complexidade:** 13 pontos

---

### ÉPICO 18: Conteúdo e Customização 📋 TODO

**Prioridade:** 🟡 Média  
**Sprint:** 3.1-3.3 (Q2 2026)  
**Pontos:** 47

#### US-071: Template de Curso Padrão

**Como** desenvolvedor criando novos cursos  
**Quero** template padronizado  
**Para** manter consistência

**Critérios de Aceite:**
- [ ] Documentação completa: `docs/TEMPLATE-CURSO-PADRAO.md` ✅ (já existe)
- [ ] Template físico: `templates/learningDataTemplate.js` ✅ (já existe)
- [ ] Template componente: `templates/LearningSystemTemplate.jsx`
- [ ] Template NotesView: `templates/NotesViewTemplate.jsx`
- [ ] Script de scaffolding: `npm run create-course LinuxBasics`
- [ ] Checklist de conformidade (14 itens)
- [ ] Exemplos de uso

**Complexidade:** 5 pontos

---

#### US-072: Sistema Linux Completo

**Como** usuário aprendendo Linux  
**Quero** curso estruturado completo  
**Para** dominar sistema operacional

**Critérios de Aceite:**
- [ ] LinuxLearningSystem.jsx (seguindo padrão Bash 100%)
- [ ] LinuxNotesView.jsx
- [ ] linuxLearningData.js (4 seções, 12-16 aulas)
- [ ] Vídeo YouTube embedado
- [ ] Caderno de Notas com auto-save
- [ ] Flash cards integrados (comandos essenciais)
- [ ] Breadcrumb: Hub > Curso de Linux > Aula X.Y
- [ ] Progresso visual
- [ ] Conformidade 100% com checklist

**Seções Propostas:**
1. Fundamentos do Sistema (história, arquitetura)
2. Comandos e Ferramentas (gerenciamento arquivos, processos)
3. Administração de Sistemas (usuários, grupos, serviços)
4. Redes e Segurança (firewall, SSH, hardening)

**Complexidade:** 21 pontos

---

#### US-073 a US-075: Sistemas Adicionais

**Criar sistemas completos para:**
- **US-073**: Servidores (Nginx, Apache, otimização) - 21 pontos
- **US-074**: DevOps (CI/CD, Terraform, Ansible) - 21 pontos
- **US-075**: Docker (Containers, Compose, Registry) - 21 pontos

**Total:** 63 pontos

---

### ÉPICO 19: UX Avançada 📋 TODO

**Prioridade:** 🟡 Média  
**Sprint:** 3.5 (Q2 2026)  
**Pontos:** 26

#### US-050: Dark Mode

**Como** usuário estudando à noite  
**Quero** modo escuro  
**Para** não cansar minha visão

**Critérios de Aceite:**
- [ ] Toggle dark/light mode (header)
- [ ] Tailwind dark: classes aplicadas (`dark:bg-gray-900`)
- [ ] Preferência salva em localStorage
- [ ] Transição suave entre modos (transition-colors)
- [ ] Ícone sol/lua (Lucide React)
- [ ] Respeita preferência do sistema (`prefers-color-scheme`)
- [ ] Cores otimizadas para dark mode (contraste WCAG AA)

**Complexidade:** 13 pontos

---

#### US-064: Hierarquia Visual Melhorada

**Como** designer/usuário  
**Quero** hierarquia visual clara  
**Para** entender intuitivamente relação pai-filho

**Critérios de Aceite:**
- [x] Níveis de largura (Hub: 7xl, Curso: 6xl, Aula: 5xl) ✅
- [x] Tipografia hierárquica (4xl → 3xl → 2xl) ✅
- [ ] Animações de transição entre níveis
- [ ] Cores diferenciadas por nível
- [ ] Breadcrumb sempre visível (sticky top-0)

**Complexidade:** 8 pontos

---

#### US-065: Documentar Arquitetura de Informação

**Como** desenvolvedor/designer  
**Quero** documentação clara da hierarquia  
**Para** manter consistência

**Critérios de Aceite:**
- [ ] Criar `docs/conceitual/02-arquitetura-informacao.md`
- [ ] Diagrama da hierarquia (ASCII)
- [ ] Glossário completo de termos (referência: 00-definicoes-principais.md)
- [ ] Exemplos de cada nível
- [ ] Padrões de nomenclatura
- [ ] Guia de estilo para novos componentes
- [ ] Testes de nomenclatura (lint rules)

**Complexidade:** 3 pontos

---

## 📊 MÉTRICAS DE SUCESSO B2B

### Objetivos de Curto Prazo (6 meses - Release 2.0)

```yaml
Técnico:
  - Cobertura de Testes: >= 30% (atual: 5%)
  - Duplicação de Código: < 10% (atual: 25%)
  - Lighthouse Score: >= 90 (atual: TBD)
  - Bundle Size: < 200KB inicial (atual: ~300KB)

Produto:
  - Conteúdo: 150+ aulas (atual: 110)
  - Sistemas Completos: 8 (atual: 5)
  - Trilhas de Aprendizado: 3 (atual: 1)
```

### Objetivos de Médio Prazo (12 meses - Release 3.0)

```yaml
B2B:
  - Clientes Piloto: 3-5 empresas (50-200 funcionários)
  - Usuários Ativos: 500-1000 colaboradores
  - Taxa de Engajamento: >= 60% (vs 10-15% Udemy Business)
  - NPS: >= 50
  - Churn: < 10%

Produto:
  - Multi-Tenancy: 100 empresas simultâneas
  - SSO: 3+ provedores integrados (Okta, AD, Google)
  - Analytics: Dashboard completo para gestores
  - Conteúdo: 250+ aulas, 10 sistemas completos
```

### Objetivos de Longo Prazo (24 meses - Release 4.0)

```yaml
B2B:
  - Clientes: 50+ empresas
  - ARR: R$500k - R$1M
  - CAC Payback: < 6 meses
  - LTV/CAC: > 3x
  - Usuários Ativos: 10k+ colaboradores

Produto:
  - Marketplace: 20+ cursos de parceiros
  - White-label: 10+ empresas com domínio próprio
  - Mobile Apps: iOS/Android nativos
  - Certificações: 5k+ certificados emitidos
  - Gamificação: 50k+ conquistas desbloqueadas
```

---

## 🎯 PRIORIZAÇÃO DE ÉPICOS

### Critérios de Priorização

**Matriz RICE (Reach, Impact, Confidence, Effort):**

| Épico | Reach | Impact | Confidence | Effort | RICE Score | Prioridade |
|-------|-------|--------|-----------|--------|------------|------------|
| ÉPICO 14 (Navegação) | Alto | Alto | Alto | Baixo | **9.0** | 🔴 P0 |
| ÉPICO 15 (Qualidade) | Alto | Alto | Médio | Médio | **7.5** | 🟠 P1 |
| ÉPICO 16 (Multi-Tenant) | Crítico | Crítico | Médio | Alto | **8.0** | 🔴 P0 |
| ÉPICO 17 (Analytics) | Alto | Alto | Médio | Médio | **7.0** | 🟠 P1 |
| ÉPICO 18 (Conteúdo) | Médio | Médio | Alto | Alto | **5.0** | 🟡 P2 |
| ÉPICO 19 (UX Avançada) | Médio | Baixo | Alto | Baixo | **6.0** | 🟡 P2 |
| ÉPICO 20 (Marketplace) | Baixo | Médio | Baixo | Alto | **3.0** | 🟢 P3 |

### Ordem Recomendada de Implementação

**Q1 2026 (Release 2.0):**
1. ÉPICO 14: Navegação e Persistência
2. ÉPICO 15: Refatoração e Qualidade

**Q2 2026 (Release 3.0):**
3. ÉPICO 16: Backend e Multi-Tenancy
4. ÉPICO 17: Analytics Corporativo
5. ÉPICO 18: Conteúdo e Customização
6. ÉPICO 19: UX Avançada

**Q3 2026 (Release 4.0):**
7. ÉPICO 20: Marketplace B2B2C
8. ÉPICO 21: Gamificação Corporativa
9. ÉPICO 22: Mobile e Offline
10. ÉPICO 23: Integrações

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

### Sprint Atual (2025-11-17 a 2025-11-24)

**Foco:** Finalizar Release 1.0, preparar documentação para Release 2.0

**Tarefas:**
1. ✅ Atualizar CLAUDE.md com contexto B2B ✅ DONE
2. ✅ Criar docs/backlog/ROADMAP.md ✅ DONE (este arquivo)
3. 📋 Marcar PRODUCT-CENTRAL-DOCUMENT.md como DEPRECATED
4. 📋 Validar build final Release 1.0
5. 📋 Preparar demo para clientes piloto
6. 📋 Criar apresentação comercial (pitch deck)

### Próximo Sprint (Sprint 2.1 - Dezembro 2025)

**Foco:** Iniciar ÉPICO 14 (Navegação)

**Tarefas:**
1. US-040: Implementar React Router (13 pontos)
2. US-041: Tratamento de erros localStorage (5 pontos)
3. US-042: Persistir progresso de módulos (8 pontos)

**Total:** 26 pontos (sprint saudável)

---

## 📚 REFERÊNCIAS

### Documentação Relacionada

- **[docs/conceitual/01-visao-geral/00-definicoes-principais.md](../conceitual/01-visao-geral/00-definicoes-principais.md)** - Glossário oficial
- **[docs/conceitual/01-visao-geral/01-contexto-projeto.md](../conceitual/01-visao-geral/01-contexto-projeto.md)** - Contexto B2B completo
- **[docs/conceitual/01-visao-geral/05-personas-corporativas.md](../conceitual/01-visao-geral/05-personas-corporativas.md)** - Personas B2B
- **[CLAUDE.md](../../CLAUDE.md)** - Contexto completo para Claude Code
- **[docs/TEMPLATE-CURSO-PADRAO.md](../TEMPLATE-CURSO-PADRAO.md)** - Template oficial de cursos

### Skills e Agents (.claude/)

- **ux-nomenclature** - Garante glossário ÉPICO 12
- **component-refactor** - Refatoração React (US-043)
- **breadcrumb-impl** - Breadcrumb WCAG AA
- **ultrathink-arch** - Arquitetura completa
- **ux-refactor-agent** - Agent UX/UI especializado

---

## 🔄 CHANGELOG DO ROADMAP

| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 3.0 | 2025-11-17 | Criação com foco B2B Ultrathink, reorganização de épicos, roadmap até Release 4.0 | Claude Code |
| 2.0 | 2025-11-13 | (DEPRECATED) Versão B2C anterior (PRODUCT-CENTRAL-DOCUMENT.md) | João Pelegrino |

---

**📍 Você está em:** `docs/backlog/ROADMAP.md` - **FONTE ÚNICA DA VERDADE**  
**📅 Última atualização:** 2025-11-17  
**👤 Responsável:** João Pelegrino  
**📦 Projeto:** Ultrathink - Plataforma B2B de Treinamento Técnico Corporativo  
**🎯 Nota Atual:** 9.0/10 ⭐ | Meta Release 2.0: 9.5/10 ⭐  
**🚀 Status:** Release 1.0 ✅ COMPLETA | Release 2.0 📋 PLANEJADA (Q1 2026)
