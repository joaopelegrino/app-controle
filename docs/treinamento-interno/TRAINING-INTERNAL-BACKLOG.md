# Internal Training Backlog - Organizador de Base de Conhecimento Enterprise

> **Single Source of Truth (SSOT) - Inventário de Treinamento Técnico Interno**
>
> **Versão:** 1.0.0
> **Última Atualização:** 2025-11-16
> **Target Audience:** Desenvolvedores iniciantes/intermediários
> **Responsável:** João Pelegrino
> **Projeto:** Organizador de Base de Conhecimento Enterprise

---

## 📋 Índice

1. [Métricas Gerais](#métricas-gerais)
2. [Níveis de Conhecimento](#níveis-de-conhecimento)
3. [Inventário de Módulos](#inventário-de-módulos)
4. [Workshops e Hands-On](#workshops-e-hands-on)
5. [Assessments](#assessments)
6. [Trilhas de Aprendizado](#trilhas-de-aprendizado)
7. [Programa de Onboarding](#programa-de-onboarding)
8. [Checklist de Qualidade](#checklist-de-qualidade)
9. [Workflow de Atualização](#workflow-de-atualização)
10. [Relacionamentos com Outras Camadas](#relacionamentos-com-outras-camadas)

---

## 📊 Métricas Gerais

| Métrica | Valor | Target | Status |
|---------|-------|--------|--------|
| **Total Módulos** | 0 | 15 | 0% 🔴 |
| **Módulos L0 (Fundamentals)** | 0 | 5 | 0% 🔴 |
| **Módulos L1 (Core Concepts)** | 0 | 5 | 0% 🔴 |
| **Módulos L2 (Advanced)** | 0 | 5 | 0% 🔴 |
| **Exercícios Práticos** | 0 | 15 | 0% 🔴 |
| **Workshops** | 0 | 4 | 0% 🔴 |
| **Assessments** | 0 | 3 | 0% 🔴 |
| **Devs Onboarded** | 0 | 5 | 0% 🔴 |
| **Avg Onboarding Time** | TBD | 28 dias | - |
| **Certification Pass Rate** | TBD | >85% | - |
| **Última Auditoria** | 2025-11-16 | Mensal | ✅ |

**Legenda de Status:**
- 🟢 **Excelente** (≥90%)
- 🟡 **Adequado** (70-89%)
- 🔴 **Necessita Atenção** (<70%)

---

## 🎓 Níveis de Conhecimento

### Estrutura de Níveis

| Nível | Nome | Descrição | Duração | Pré-requisitos | Objetivo |
|-------|------|-----------|---------|----------------|----------|
| **L0** | Fundamentals | Setup + Stack básico | 24h (~3 dias) | Nenhum | Ambiente funcionando + conceitos básicos |
| **L1** | Core Concepts | Arquitetura + Features | 36h (~5 dias) | L0 completo | Entender sistema e contribuir features simples |
| **L2** | Advanced | Testing + Deployment + Scale | 20h (~3 dias) | L1 completo | Deploy, testes e features complexas |

**Duração Total:** 80h (~10 dias úteis ou 2 semanas intensivas)

**Programa de Onboarding:** 4 semanas (incluindo workshops e assessments)

---

## 📚 Inventário de Módulos

### L0: Fundamentals (5 módulos - 24h)

**Objetivo:** Nivelamento técnico e configuração de ambiente

| ID | Módulo | Tópicos | Duração | Exercícios | Skills Referência | Status | ETA |
|----|--------|---------|---------|------------|-------------------|--------|-----|
| L0-01 | Environment Setup | WSL2, Node 22 (NVM), Git (SSH), Docker | 4h | 1 | N/A | ⚪ | Semana 5 |
| L0-02 | React Basics | JSX, Components, Props, Hooks (useState, useEffect) | 8h | 3 | react-components-patterns | ⚪ | Semana 5 |
| L0-03 | Vite & Build Tools | Dev server, HMR, Build prod, Code splitting | 4h | 1 | vite-build-optimization | ⚪ | Semana 5 |
| L0-04 | Tailwind CSS | Utility-first, Responsive, JIT, Custom theme | 4h | 2 | tailwind-design-system | ⚪ | Semana 6 |
| L0-05 | Git Workflow | Branches, Commits, PRs, Code Review, Hooks | 4h | 1 | N/A | ⚪ | Semana 6 |

**Entregáveis Esperados:**
- [ ] Ambiente WSL2 configurado e funcionando
- [ ] Aplicação rodando localmente (http://localhost:3000)
- [ ] Primeiro componente React criado (AreaCard customizado)
- [ ] Primeiro PR aberto e merged
- [ ] Quiz Fundamentals com 80%+ acertos

**Critérios de Conclusão:**
- Todos 5 módulos completados
- Mínimo 7/8 exercícios corretos
- Assessment L0 com 80%+ pass rate
- Aplicação rodando sem erros

---

### L1: Core Concepts (5 módulos - 36h)

**Objetivo:** Compreender arquitetura e padrões do sistema

| ID | Módulo | Tópicos | Duração | Exercícios | Skills Referência | Status | ETA |
|----|--------|---------|---------|------------|-------------------|--------|-----|
| L1-01 | Arquitetura do Sistema | 4 camadas, Fluxo unidirecional, Separação de concerns | 6h | 1 | system-architecture | ⚪ | Semana 7 |
| L1-02 | Learning System Pattern | Anatomia CLearningSystem, Navegação, Progresso | 8h | 1 | component-refactor | ⚪ | Semana 7 |
| L1-03 | State Management | localStorage schema, Custom hooks, Context vs Props | 8h | 2 | system-state-management, localStorage-patterns | ⚪ | Semana 7 |
| L1-04 | Breadcrumb & Navigation | WCAG 2.1 AA, Hierarquia, Responsividade | 6h | 1 | breadcrumb-impl | ⚪ | Semana 8 |
| L1-05 | Nomenclatura e UX | Glossário ÉPICO 12, Padrões de botões, Consistência | 8h | 1 | ux-nomenclature | ⚪ | Semana 8 |

**Entregáveis Esperados:**
- [ ] Diagrama de arquitetura desenhado
- [ ] Novo sistema de aprendizado criado (Python Programming)
- [ ] Hook customizado implementado (useAutoSaveNotes)
- [ ] Breadcrumb integrado em componente novo
- [ ] Quiz Core Concepts com 85%+ acertos

**Critérios de Conclusão:**
- Todos 5 módulos completados
- Mínimo 4/5 exercícios corretos
- Assessment L1 com 85%+ pass rate
- Feature end-to-end implementada e testada

---

### L2: Advanced (5 módulos - 20h)

**Objetivo:** Testing, deployment e features complexas

| ID | Módulo | Tópicos | Duração | Exercícios | Skills Referência | Status | ETA |
|----|--------|---------|---------|------------|-------------------|--------|-----|
| L2-01 | Testing com Vitest | Unit tests, Component tests, Mocking, Coverage | 6h | 2 | testing-strategy-vitest | ⚪ | Semana 9 |
| L2-02 | E2E com Playwright | Navegação, Assertions, Screenshots, CI integration | 4h | 1 | testing-strategy-vitest | ⚪ | Semana 9 |
| L2-03 | Docker & Deployment | Multi-stage Dockerfile, Nginx, Docker Compose | 4h | 1 | docker-deployment | ⚪ | Semana 10 |
| L2-04 | CI/CD com GitHub Actions | Workflows, Build, Test, Deploy automático | 4h | 1 | docker-deployment | ⚪ | Semana 10 |
| L2-05 | Refatoração Avançada | Extract hooks, BaseLearningSystem, Reduzir duplicação | 2h | 1 | component-refactor, react-hooks-custom | ⚪ | Semana 10 |

**Entregáveis Esperados:**
- [ ] Cobertura de testes ≥60% no componente criado
- [ ] Testes E2E automatizados funcionando
- [ ] Imagem Docker construída e testada
- [ ] Deploy em staging (AWS EC2 ou similar)
- [ ] Certificação Developer completa (80%+)

**Critérios de Conclusão:**
- Todos 5 módulos completados
- Mínimo 4/5 exercícios corretos
- Assessment Final com 80%+ pass rate
- Apresentação: "O que aprendi em 4 semanas"

---

## 🧪 Workshops e Hands-On

### Estrutura de Workshops

**Formato:** 1 workshop por semana (4 total), duração 4-6h cada

| ID | Workshop | Semana | Duração | Pré-requisitos | Objetivo | Status |
|----|----------|--------|---------|----------------|----------|--------|
| WS-001 | Semana 1: Setup & First Commit | 1 | 5h | L0-01 a L0-03 | Ambiente rodando + primeiro PR | ⚪ |
| WS-002 | Semana 2: Criar Primeiro Componente | 2 | 6h | L0-all + L1-01 | FlashCard customizado funcionando | ⚪ |
| WS-003 | Semana 3: Feature End-to-End | 3 | 6h | L1-all | Sistema Python completo | ⚪ |
| WS-004 | Semana 4: Deploy Production-Ready | 4 | 4h | L2-all | Deploy staging funcionando | ⚪ |

**Total Workshop Hours:** 21h (hands-on prático)

---

### WS-001: Semana 1 - Setup & First Commit

**Duração:** 5h (1 dia)

**Objetivo:** Validar que ambiente está 100% funcional e fazer primeiro commit

**Agenda:**
1. **Setup WSL2 e Node** (1h)
   - Verificar versões (WSL2, Ubuntu 24.04, Node 22)
   - Instalar NVM e configurar Node
   - Testar npm, npx

2. **Clonar e Rodar Projeto** (1h)
   - Git clone com SSH
   - npm install
   - npm run dev
   - Verificar http://localhost:3000

3. **Explorar Codebase** (1h)
   - Estrutura de diretórios (src/, .claude/, docs/)
   - Componentes principais (HubView, AreaCard)
   - Dados (studyAreas.js, cLearningData.js)

4. **Fazer Primeira Modificação** (1h)
   - Editar AreaCard.jsx (adicionar emoji customizado)
   - Testar localmente
   - Criar branch `feat/meu-primeiro-commit`

5. **Abrir Primeiro PR** (1h)
   - git add, commit, push
   - Abrir PR no GitHub
   - Code review com mentor
   - Merge

**Entregável:** PR merged com modificação simples

**Checklist de Sucesso:**
- [ ] Aplicação rodando sem erros
- [ ] Modificação visível no browser
- [ ] PR aberto e merged
- [ ] Feedback positivo do mentor

---

### WS-002: Semana 2 - Criar Primeiro Componente

**Duração:** 6h (1 dia)

**Objetivo:** Criar componente FlashCard customizado do zero

**Agenda:**
1. **Review de React Patterns** (1h)
   - Consultar skill `react-components-patterns`
   - Revisar FlashcardModal.jsx existente
   - Entender props e estado

2. **Design do Componente** (1h)
   - Wireframe no papel (front/back)
   - Definir props necessárias
   - Listar features (flip 3D, categorias, código formatado)

3. **Implementação** (3h)
   - Criar `src/components/CustomFlashCard.jsx`
   - Implementar useState para flip
   - Estilizar com Tailwind
   - Adicionar animação 3D (transform rotate)

4. **Integração e Teste** (1h)
   - Integrar em CLearningSystem
   - Testar flip, categorias, código
   - Validar responsividade (mobile/desktop)

**Entregável:** Componente FlashCard customizado funcionando

**Checklist de Sucesso:**
- [ ] Componente criado e estilizado
- [ ] Flip 3D funcionando
- [ ] Integrado em sistema existente
- [ ] PR aberto e aprovado

---

### WS-003: Semana 3 - Feature End-to-End

**Duração:** 6h (1 dia)

**Objetivo:** Criar sistema completo de Python Programming

**Agenda:**
1. **Planejamento** (1h)
   - Definir estrutura de dados (pythonLearningData.js)
   - Listar seções e aulas (mínimo 8 aulas)
   - Planejar flash cards (mínimo 10)

2. **Implementação de Dados** (1h)
   - Criar `src/data/pythonLearningData.js`
   - Seguir padrão de bashLearningData.js
   - Validar estrutura JSON

3. **Implementação de Componente** (2h)
   - Criar `src/components/PythonLearningSystem.jsx`
   - Copiar estrutura de CLearningSystem
   - Adaptar para dados Python
   - Implementar breadcrumb

4. **Integração no Hub** (1h)
   - Adicionar área em studyAreas.js
   - Criar card no HubView
   - Testar navegação completa

5. **Testing e PR** (1h)
   - Escrever 2 testes básicos (AreaCard, navigation)
   - Validar build (npm run build)
   - PR com descrição completa

**Entregável:** Sistema Python completo com testes

**Checklist de Sucesso:**
- [ ] 8+ aulas criadas
- [ ] 10+ flash cards
- [ ] Navegação Hub → Curso → Aula funcionando
- [ ] 2 testes passando
- [ ] Build sem erros

---

### WS-004: Semana 4 - Deploy Production-Ready

**Duração:** 4h (meio dia)

**Objetivo:** Deploy da aplicação em ambiente staging

**Agenda:**
1. **Build Otimizado** (1h)
   - Revisar vite.config.js
   - npm run build
   - Analisar bundle size (dist/)
   - Verificar sourcemaps (ausentes)

2. **Docker Image** (1h)
   - Entender Dockerfile multi-stage
   - docker build -t sistema-educacional .
   - docker run -p 80:80
   - Testar em http://localhost

3. **Deploy em Staging** (1h)
   - Escolher plataforma (AWS EC2, Render, Fly.io)
   - Configurar credenciais
   - Deploy via GitHub Actions ou manual
   - Verificar URL pública

4. **Validação e Monitoring** (1h)
   - Testar todos fluxos principais
   - Verificar console de erros
   - Configurar alerts básicos
   - Documentar URL e credenciais

**Entregável:** Aplicação rodando em staging com URL pública

**Checklist de Sucesso:**
- [ ] Build otimizado (<500KB)
- [ ] Docker image construída
- [ ] Deploy em staging funcionando
- [ ] URL pública acessível
- [ ] Documentação de deploy completa

---

## 📝 Assessments

### Estrutura de Avaliações

| ID | Assessment | Tipo | Nível | Duração | Passing Score | Formato | Status |
|----|-----------|------|-------|---------|---------------|---------|--------|
| ASS-L0 | Fundamentals Quiz | Multiple Choice + Code Reading | L0 | 30min | 80% (24/30) | Online Quiz | ⚪ |
| ASS-L1 | Core Concepts Practical | Hands-On Coding | L1 | 4h | 75% | Implementar feature | ⚪ |
| ASS-L2 | Developer Certification | Project + Presentation | L2 | 8h | 80% | Sistema completo | ⚪ |

**Total Assessment Time:** 12h 30min

---

### ASS-L0: Fundamentals Quiz (30 questões)

**Duração:** 30 minutos
**Passing Score:** 80% (24/30 corretas)
**Formato:** Online (Google Forms ou similar)

**Distribuição de Questões:**

| Tópico | Questões | Peso |
|--------|----------|------|
| **Environment Setup** | 5 | 17% |
| **React Basics** | 10 | 33% |
| **Vite & Build** | 5 | 17% |
| **Tailwind CSS** | 5 | 17% |
| **Git Workflow** | 5 | 17% |

**Exemplos de Questões:**

**Q1 (React):** Qual é a forma correta de criar um componente funcional em React?
- a) `class MyComponent extends React.Component { render() { ... } }`
- b) `function MyComponent() { return <div>...</div>; }` ✅
- c) `const MyComponent = { render: () => <div>...</div> };`
- d) `React.createComponent('MyComponent', () => <div>...</div>);`

**Q2 (Hooks):** O que faz o hook `useEffect(() => { ... }, [])`?
- a) Roda em todo render
- b) Roda apenas uma vez (mount) ✅
- c) Nunca roda
- d) Roda apenas no unmount

**Q3 (Tailwind):** Qual classe Tailwind aplica padding de 1rem (16px)?
- a) `p-1`
- b) `p-4` ✅
- c) `p-16`
- d) `padding-4`

**Q4 (Git):** Qual comando cria uma nova branch e faz checkout?
- a) `git branch new-feature`
- b) `git checkout new-feature`
- c) `git checkout -b new-feature` ✅
- d) `git create new-feature`

**Q5 (Vite):** Qual comando inicia o dev server do Vite?
- a) `npm start`
- b) `npm run dev` ✅
- c) `vite serve`
- d) `npm run serve`

**Critérios de Aprovação:**
- ≥24 corretas (80%): Aprovado, prosseguir para L1
- 21-23 corretas (70-79%): Revisão de conceitos fracos, retentar
- <21 corretas (<70%): Revisar L0 completo, retentar

---

### ASS-L1: Core Concepts Practical (4 horas)

**Duração:** 4 horas (meio dia)
**Passing Score:** 75% (15/20 pontos)
**Formato:** Hands-on coding challenge

**Desafio:**
> Implementar um novo sistema de aprendizado completo (ex: JavaScript, TypeScript, ou SQL) com todas as features do sistema existente.

**Requisitos (20 pontos total):**

1. **Dados Estruturados (4 pontos)**
   - [ ] Arquivo `{tema}LearningData.js` criado
   - [ ] Mínimo 3 seções, 10 aulas
   - [ ] 8+ flash cards
   - [ ] Estrutura segue padrão existente

2. **Componente LearningSystem (6 pontos)**
   - [ ] Componente `{Tema}LearningSystem.jsx` criado
   - [ ] Navegação entre views (course, lesson, notes)
   - [ ] Breadcrumb integrado (3 níveis)
   - [ ] Progresso salvo em localStorage

3. **Integração no Hub (3 pontos)**
   - [ ] Área adicionada em studyAreas.js
   - [ ] Card visível no HubView
   - [ ] Navegação funcionando (Hub → Curso → Aula)

4. **Estado e Persistência (4 pontos)**
   - [ ] useState para currentView, selectedLesson
   - [ ] useEffect para carregar progresso
   - [ ] localStorage schema correto
   - [ ] Notas com auto-save (bonus)

5. **Qualidade de Código (3 pontos)**
   - [ ] Nomenclatura consistente (ÉPICO 12)
   - [ ] Código limpo (sem console.log)
   - [ ] Props destructured
   - [ ] Tailwind classes organizadas

**Entregável:**
- Branch `feat/sistema-{tema}` com commits organizados
- PR aberto com descrição completa
- Screenshots do sistema funcionando

**Rubrica de Avaliação:**
- 20 pontos (100%): Excelente, todos requisitos + bonus
- 15-19 pontos (75-95%): Aprovado
- 12-14 pontos (60-74%): Revisão necessária
- <12 pontos (<60%): Reprovar, refazer

---

### ASS-L2: Developer Certification (8 horas)

**Duração:** 8 horas (1 dia completo)
**Passing Score:** 80% (32/40 pontos)
**Formato:** Projeto completo + Apresentação

**Desafio:**
> Criar um sistema de aprendizado completo com testes, deploy e apresentação técnica.

**Requisitos (40 pontos total):**

1. **Feature Completa (15 pontos)**
   - [ ] Sistema de aprendizado novo (tema à escolha)
   - [ ] Mínimo 5 seções, 20 aulas
   - [ ] 15+ flash cards
   - [ ] Caderno de notas integrado
   - [ ] Breadcrumb e navegação completa

2. **Testes Automatizados (10 pontos)**
   - [ ] 3+ testes unitários (Vitest)
   - [ ] 1 teste E2E (Playwright)
   - [ ] Cobertura ≥60% no componente
   - [ ] Testes passando em CI

3. **Deploy (8 pontos)**
   - [ ] Build otimizado (<500KB)
   - [ ] Docker image construída
   - [ ] Deploy em staging
   - [ ] URL pública acessível

4. **Documentação (4 pontos)**
   - [ ] README do sistema criado
   - [ ] Comentários no código
   - [ ] PR description completa
   - [ ] Screenshots/GIFs

5. **Apresentação (3 pontos)**
   - [ ] Apresentação de 10 minutos
   - [ ] Demonstração ao vivo
   - [ ] Explicação de decisões técnicas
   - [ ] Q&A com mentores

**Entregável:**
- Sistema completo funcionando
- Testes passando
- Deploy em staging
- Apresentação técnica

**Rubrica de Avaliação:**
- 36-40 pontos (90-100%): Excelente, certificação com honras
- 32-35 pontos (80-89%): Aprovado, certificação standard
- 28-31 pontos (70-79%): Revisão e reapresentação
- <28 pontos (<70%): Reprovar, refazer projeto

**Certificação:**
> **Desenvolvedor Certificado - Organizador de Base de Conhecimento Enterprise**
>
> Este certificado atesta que [Nome] completou com sucesso o programa de onboarding técnico de 4 semanas, demonstrando proficiência em:
> - React 18.3 com Hooks
> - Vite 5.4 e otimização de build
> - Tailwind CSS 3.4
> - Testes com Vitest e Playwright
> - Deploy com Docker e CI/CD
> - Padrões de código e arquitetura do sistema
>
> Data: [Data]
> Score Final: [Score]%
> Assinatura: [Tech Lead]

---

## 🎯 Trilhas de Aprendizado

### Trilha 1: Full-Stack Developer (4 semanas)

**Objetivo:** Contribuir com features completas end-to-end

**Cronograma:**
- **Semana 1:** L0-all (24h) + Workshop 1 + Assessment L0
- **Semana 2:** L1-all (36h) + Workshop 2 + Assessment L1
- **Semana 3:** L2-all (20h) + Workshop 3
- **Semana 4:** Projeto final + Workshop 4 + Certificação

**Carga Horária:** 80h conteúdo + 21h workshops + 12.5h assessments = **113.5h**

**Duração:** 4 semanas (28 dias úteis)

**Pré-requisitos:**
- JavaScript ES6+ básico
- HTML/CSS básico
- Git básico
- Terminal/Shell básico

**Resultado Esperado:**
- Desenvolvedor autônomo para features de complexidade média
- Capaz de refatorar código e reduzir duplicação
- Confortável com testes e deploy
- Pronto para on-call (shadowing inicial)

---

### Trilha 2: Frontend Specialist (2 semanas)

**Objetivo:** Focar em UI/UX e componentes React

**Cronograma:**
- **Semana 1:** L0-all (24h) + L1-01 a L1-03 (22h)
- **Semana 2:** L1-04, L1-05 (14h) + Workshop 2 + Assessment

**Carga Horária:** 60h conteúdo + 6h workshop + 4.5h assessment = **70.5h**

**Duração:** 2 semanas (14 dias úteis)

**Foco:**
- React patterns avançados
- Tailwind e design system
- Acessibilidade (WCAG)
- Nomenclatura e UX

**Resultado Esperado:**
- Especialista em componentes React
- Capaz de criar design system consistente
- Foco em acessibilidade e performance

---

### Trilha 3: DevOps & Deployment (1 semana)

**Objetivo:** Especializar em infraestrutura e deploy

**Cronograma:**
- **Semana 1:** L0-01, L0-03, L0-05 (12h) + L2-03, L2-04 (8h)

**Carga Horária:** 20h conteúdo + 4h workshop = **24h**

**Duração:** 1 semana (intensiva)

**Pré-requisitos:**
- Docker básico
- Linux/Shell intermediário
- Git avançado

**Foco:**
- Docker multi-stage
- CI/CD com GitHub Actions
- Nginx e otimizações
- Monitoring e alertas

**Resultado Esperado:**
- Capaz de fazer deploys em produção
- Configurar CI/CD completo
- Troubleshoot problemas de infra

---

## 📋 Checklist de Qualidade para Novo Módulo

**Antes de marcar módulo como "Implementado":**

### 1. Estrutura de Conteúdo

- [ ] **Título claro** (formato: `L{X}-{YY}: {Nome do Módulo}`)
- [ ] **Metadados completos:**
  - [ ] Duração estimada
  - [ ] Pré-requisitos listados
  - [ ] Nível (L0, L1, L2)
  - [ ] Skills de referência linkadas

- [ ] **Seções obrigatórias:**
  - [ ] **🎯 Objetivos de Aprendizado** (3-5 bullets)
  - [ ] **📋 Pré-requisitos** (conhecimento e software)
  - [ ] **💡 Conceitos Fundamentais** (teoria)
  - [ ] **🔧 Exemplos Práticos** (código do projeto)
  - [ ] **✅ Exercícios** (1-3 exercícios hands-on)
  - [ ] **📚 Referências** (skills, docs, código)

### 2. Qualidade de Conteúdo

- [ ] **Exemplos reais** do código do projeto (não genérico)
- [ ] **Código executável** (testado e funcionando)
- [ ] **Screenshots ou diagramas** quando apropriado
- [ ] **Links funcionam** (skills, docs técnicas, docs conceituais)
- [ ] **Nomenclatura consistente** (usa glossário ÉPICO 12)

### 3. Exercícios Práticos

- [ ] **Objetivo claro** do exercício
- [ ] **Specs detalhadas** (o que implementar)
- [ ] **Critérios de sucesso** (checklist)
- [ ] **Entregável definido** (código, screenshot, PR)
- [ ] **Tempo estimado** para completar

### 4. Integração

- [ ] **Adicionado ao inventário** neste backlog (tabela completa)
- [ ] **Skills de referência linkadas** ao final do módulo
- [ ] **Cross-references** para docs/tecnico/ e docs/conceitual/
- [ ] **Exercícios testados** (podem ser completados em tempo estimado)

### 5. Validação

- [ ] **Módulo revisado** por tech lead
- [ ] **Exercícios testados** com desenvolvedor real
- [ ] **Tempo real medido** (vs. estimado)
- [ ] **Feedback incorporado** (melhorias)

---

## 🔄 Workflow de Atualização

### Quando Atualizar Este Backlog

**Gatilhos para atualização:**

1. ✅ **Ao criar novo módulo** (adicionar entrada na tabela de inventário)
2. ✅ **Ao atualizar módulo existente** (atualizar timestamp)
3. ✅ **Mensalmente** (revisar métricas e progresso de onboarding)
4. ✅ **Após cada onboarding completo** (atualizar métricas de pass rate e tempo)
5. ✅ **Quando stack muda** (ex: React 19, Vite 6 lançados)

### Processo de Atualização

**1. Novo Módulo Criado:**
```bash
# Adicionar entrada na tabela de inventário (L0, L1 ou L2)
# Atualizar métricas gerais (Total Módulos +1)
# Atualizar "Última Atualização" do backlog
# Linkar skills de referência
# Criar cross-references com docs/
```

**2. Módulo Atualizado:**
```bash
# Atualizar timestamp na tabela
# Revisar exercícios se conteúdo mudou
# Verificar se links ainda funcionam
# Atualizar changelog do módulo (se houver)
```

**3. Auditoria Mensal:**
```bash
# Revisar métricas de onboarding (tempo médio, pass rate)
# Identificar módulos com baixo score (feedback negativo)
# Atualizar conteúdo de módulos desatualizados
# Adicionar novos exercícios se necessário
```

---

## 📚 Relacionamentos com Outras Camadas

### Camada 1 (Skills) ↔ Camada 4 (Treinamento)

**Relação:** Skills são **material de referência consultivo** em módulos

**Integração:**
- Cada módulo lista 1-3 skills de referência ao final
- Skills fornecem **deep dive técnico** (módulos são introdutórios)
- Troubleshooting de skills complementa exercícios de módulos

**Exemplo:**
```markdown
## 📚 Referências (em L0-02-react-basics.md)

**Skills Claude Code (para consulta):**
- `.claude/skills/react-components-patterns/` - Padrões completos
- `.claude/skills/react-hooks-custom/` - Hooks customizados

**Quando consultar:**
- Dúvidas sobre composition vs inheritance
- Exemplos de custom hooks do projeto
- Antipadrões a evitar
```

---

### docs/tecnico/ → Camada 4

**Relação:** Docs técnicas = **aprofundamento** após módulos

**Integração:**
- Módulos linkam para docs técnicas ao final (leitura avançada)
- Docs técnicas = referência, Módulos = didático

**Exemplo:**
```markdown
## 📚 Leitura Avançada (em L1-01-arquitetura.md)

**Documentação Técnica:**
- [Arquitetura Completa](../../tecnico/architecture/01-visao-geral-arquitetura.md)
- [Decisões Arquiteturais](../../tecnico/architecture/02-decisoes.md)
```

---

### docs/conceitual/ → Camada 4

**Relação:** Docs conceituais fornecem **glossário e nomenclatura**

**Integração:**
- Módulos usam glossário ÉPICO 12 (00-definicoes-principais.md)
- Nomenclatura consistente (Curso, Aula, Seção, Caderno de Notas)
- Exemplos seguem padrões de UX

**Exemplo:**
```markdown
## 📋 Glossário (em L1-05-nomenclatura.md)

**Termos Obrigatórios** (ÉPICO 12):
- ✅ **Curso** (não "Sistema de Aprendizado")
- ✅ **Aula** (não "Módulo" no contexto de conteúdo)
- ✅ **Seção** (não "FASE")
- ✅ **Caderno de Notas** (não "Notas Rápidas")

Veja glossário completo: [00-definicoes-principais.md](../../conceitual/01-visao-geral/00-definicoes-principais.md)
```

---

### PRODUCT-CENTRAL-DOCUMENT.md → Camada 4

**Relação:** PRD fornece **contexto de produto e negócio**

**Integração:**
- Módulos L1 referenciam PRD para entender "por quê"
- User Stories fornecem contexto de features
- Roadmap ajuda entender prioridades

**Exemplo:**
```markdown
## 🎯 Contexto de Negócio (em L1-02-learning-system.md)

**Por que existem 5 Learning Systems?**
Veja PRD: [PRODUCT-CENTRAL-DOCUMENT.md](../../PRODUCT-CENTRAL-DOCUMENT.md#sistemas-integrados)

**Roadmap de Features:**
- Release 2.0: Refatoração BaseLearningSystem (reduzir 800 linhas)
- Release 3.0: TypeScript migration, Dark mode
```

---

## 📊 Estatísticas e Tendências

### Crescimento de Módulos (Projetado)

```
Novembro 2025:  0 módulos (baseline)
Dezembro 2025:  5 módulos L0 (+5, Fase 3 completa)
Janeiro 2026:   10 módulos L0+L1 (+5, Fase 4 completa)
Fevereiro 2026: 15 módulos L0+L1+L2 (+5, Fase 5-6 completas)
Março 2026:     15 módulos (manutenção)
```

**Taxa de Crescimento:**
- Fase 3: +5 módulos L0 (2 semanas)
- Fase 4: +5 módulos L1 (2 semanas)
- Fase 5-6: +5 módulos L2 + workshops (4 semanas)
- Maturidade: 0 novos (foco em qualidade)

### Onboarding Médio (Projetado)

```
Primeiro dev (test pilot):    35 dias (inclui criação de módulos)
Segundo dev:                   28 dias (target)
Terceiro+ devs:                25 dias (otimizado)
```

**Objetivo:** <28 dias do primeiro commit ao primeiro deploy em produção

---

## 🎯 Metas de Curto, Médio e Longo Prazo

### Curto Prazo (4 semanas - até 14 Dez 2025)

- [ ] Criar 5 módulos L0 (Fundamentals)
- [ ] Criar 3 exercícios por módulo (15 total)
- [ ] Criar Workshop 1 (Setup & First Commit)
- [ ] Criar Assessment L0 (30 questões)

**Critério de Sucesso:** Primeiro desenvolvedor pode completar L0 (semana 1 de onboarding)

---

### Médio Prazo (8 semanas - até 11 Jan 2026)

- [ ] Criar 5 módulos L1 (Core Concepts)
- [ ] Criar Workshops 2 e 3
- [ ] Criar Assessment L1 (hands-on 4h)
- [ ] Onboard primeiro desenvolvedor (test pilot)

**Critério de Sucesso:** Primeiro dev completou semanas 1-2 (L0+L1) e está contribuindo

---

### Longo Prazo (12 semanas - até 8 Fev 2026)

- [ ] Criar 5 módulos L2 (Advanced)
- [ ] Criar Workshop 4 (Deploy)
- [ ] Criar Assessment Final (certificação)
- [ ] Onboard 3+ desenvolvedores
- [ ] Pass rate >85% em todos assessments

**Critério de Sucesso:** 3 desenvolvedores certificados, tempo médio <28 dias

---

## 📅 Changelog do Backlog

| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 1.0.0 | 2025-11-16 | Criação inicial do inventário SSOT com estrutura completa de 15 módulos, 4 workshops e 3 assessments | Claude Code |

---

**📍 Você está em:** `docs/treinamento-interno/TRAINING-INTERNAL-BACKLOG.md` - **SSOT de Treinamento**
**📅 Última atualização:** 2025-11-16
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** ✅ Ativo - Inventário completo e estruturado
**🎯 Uso:** Referência central para todo programa de onboarding técnico
**🔄 Próxima revisão:** 2025-12-16 (mensal)
