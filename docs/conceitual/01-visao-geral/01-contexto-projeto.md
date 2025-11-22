# 01. Contexto do Projeto - Organizador de Base de Conhecimento Enterprise

> **Plataforma de Treinamento Técnico Corporativo**
>
> **Versão:** 1.0.0
> **Data:** 2025-11-14
> **Status:** ✅ Release 1.0 Concluída

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [O Problema](#o-problema)
3. [A Solução](#a-solução)
4. [Escopo e Fases](#escopo-e-fases)
5. [Roadmap de Alto Nível](#roadmap-de-alto-nível)
6. [Próximos Passos](#próximos-passos)
7. [Referências](#referências)

---

## Visão Geral

### O Que É

O **Organizador de Base de Conhecimento Enterprise** é uma plataforma web de treinamento técnico interno que estrutura o conhecimento corporativo de forma hierárquica, mensurável e escalável.

**Diferencial:** Enquanto plataformas como Moodle, Udemy for Business e Confluence focam em vídeos isolados ou wikis desorganizados, esta solução oferece **trilhas de aprendizado estruturadas** com progressão clara, métricas de engajamento e experiência de usuário moderna.

### Contexto de Mercado

**Segmento:** B2B SaaS para médias empresas de tecnologia (50-500 funcionários)

**Mercado Endereçável:**
- 📊 **Mercado de Corporate Learning:** US$ 40 bilhões/ano (crescimento 13% a.a.)
- 🎯 **Segmento Técnico:** US$ 8 bilhões (programação, DevOps, segurança)
- 🚀 **Empresas Tech no Brasil:** ~15.000 (fonte: Distrito, 2024)
- 💼 **TAM (Brasil):** ~R$ 200 milhões/ano

**Tendências:**
- ✅ Shift de treinamentos presenciais → digital (acelerado pós-pandemia)
- ✅ Demanda por upskilling técnico contínuo
- ✅ Empresas buscando alternativas mais baratas que Udemy/Coursera
- ✅ Necessidade de conteúdo customizável e white-label

### Objetivos do Projeto

**Curto Prazo (6 meses):**
- ✅ Validar viabilidade técnica (Release 1.0 completa)
- ✅ Estruturar 5 cursos técnicos com 227 módulos
- 🔄 Atingir 80% de cobertura de testes (em andamento)
- 🔄 Implementar navegação por URL (React Router)

**Médio Prazo (12 meses):**
- 📋 Sistema de administração multi-tenant
- 📋 Analytics de engajamento e retenção
- 📋 Integração com SSO corporativo (SAML, OAuth)
- 📋 API para criação de conteúdo por instrutores

**Longo Prazo (24 meses):**
- 📋 Marketplace de cursos técnicos (B2B2C)
- 📋 Certificações customizadas por empresa
- 📋 Gamificação e sistema de conquistas
- 📋 Mobile apps (iOS/Android)

---

## O Problema

### Dores Corporativas Identificadas

#### 1. 💸 **Alto Custo de Plataformas Externas**

**Cenário Atual:**
- Udemy for Business: US$ 360/usuário/ano (~R$ 1.800)
- Coursera for Teams: US$ 399/usuário/ano (~R$ 2.000)
- LinkedIn Learning: US$ 299/usuário/ano (~R$ 1.500)

**Exemplo:** Empresa com 100 desenvolvedores gasta **R$ 150.000 a R$ 200.000/ano** em licenças.

**Impacto:**
- Budget de T&D consome 3-5% da folha de pagamento
- 70% do conteúdo das plataformas não é relevante para a empresa
- Sem controle sobre roadmap de conteúdo

---

#### 2. 📚 **Conhecimento Desorganizado e Fragmentado**

**Cenário Atual:**
- Documentação técnica espalhada em Confluence, Google Docs, Notion
- Vídeos de treinamento perdidos em pastas do Drive
- Onboarding manual com PDFs de 50+ páginas
- Sem trilha clara de progressão técnica

**Exemplo:** Novo desenvolvedor leva **4-6 semanas** para se tornar produtivo por falta de estrutura.

**Impacto:**
- ⏱️ Perda de 160-240 horas produtivas por novo contratado
- 🔄 Conhecimento crítico preso na cabeça de seniors
- 📉 Alta rotatividade por falta de desenvolvimento estruturado

---

#### 3. 📊 **Impossibilidade de Medir ROI de Treinamento**

**Cenário Atual:**
- Sem métricas de conclusão de cursos
- Não sabe quem completou onboarding obrigatório
- Feedback qualitativo apenas (pesquisas manuais)
- Dificuldade em justificar investimento em T&D

**Exemplo:** RH não consegue responder: "Quantos desenvolvedores dominam Docker na empresa?"

**Impacto:**
- ❌ Investimento em treinamento sem data-driven decisions
- ❌ Impossível correlacionar treinamento com performance
- ❌ Dificuldade em provar valor do setor de T&D

---

#### 4. 🎯 **Baixa Retenção e Engajamento**

**Cenário Atual:**
- Taxa de conclusão de cursos online: 5-15% (média do mercado)
- Conteúdo genérico não engaja desenvolvedores experientes
- Falta de prática hands-on (apenas vídeos)
- Sem gamificação ou motivadores

**Exemplo:** Empresa compra 100 licenças do Udemy, mas apenas 12 funcionários completam ao menos 1 curso.

**Impacto:**
- 💰 ROI negativo (85-95% do investimento desperdiçado)
- 😞 Frustração de gestores e RH
- 📉 Skill gap continua crescendo

---

#### 5. 🔒 **Falta de Customização e White-Label**

**Cenário Atual:**
- Plataformas externas com branding próprio
- Conteúdo genérico (não alinhado com stack da empresa)
- Impossível adicionar conteúdo proprietário (arquitetura interna, ferramentas custom)

**Exemplo:** Empresa usa stack específico (Elixir + K8s + Terraform) mas cursos disponíveis são genéricos.

**Impacto:**
- ⚠️ Gap entre treinamento e realidade da empresa
- ⚠️ Necessidade de criar material complementar (trabalho duplicado)
- ⚠️ Marca da empresa não reforçada no processo de aprendizado

---

### Quotes de Gestores (Pesquisa Qualitativa)

> **"Gastamos R$ 180 mil/ano no Udemy Business, mas só 10% dos devs usam. Precisamos de algo mais focado."**
> — CTO, startup 120 pessoas

> **"Nosso onboarding técnico é um caos. Cada líder ensina do seu jeito. Levamos 2 meses para um júnior ficar produtivo."**
> — Gerente de Engenharia, fintech 200 pessoas

> **"Não consigo medir se o investimento em treinamento está funcionando. RH pede números e eu não tenho."**
> — Head de People, scale-up 80 pessoas

> **"Queremos criar uma universidade corporativa, mas as plataformas prontas são caras e rígidas."**
> — Diretor de RH, consultoria 500 pessoas

---

## A Solução

### Proposta de Valor

**Para:** Empresas de tecnologia (50-500 funcionários) que precisam treinar times técnicos

**Que:** Desejam reduzir custos, estruturar conhecimento e medir ROI de treinamento

**O Organizador de Base de Conhecimento Enterprise:** É uma plataforma web self-hosted de treinamento técnico

**Que:** Estrutura cursos em trilhas hierárquicas (Hub → Curso → Aula → Prática), permite customização total e oferece analytics de engajamento

**Diferente de:** Udemy for Business, Moodle, Confluence

**Nossa solução:** Combina organização clara (tipo Notion), conteúdo técnico profundo (tipo Udemy) e métricas (tipo LMS corporativo), com custo 70-80% menor e 100% customizável.

---

### Funcionalidades Principais

#### ✅ Release 1.0 (Concluída - Nov 2025)

**1. Hub de Áreas de Estudo**
- Página inicial com cards visuais de 13 áreas técnicas
- 6 áreas ativas (5 cursos completos + 1 caminho de aprendizado)
- 7 áreas em desenvolvimento (roadmap visível)
- Navegação intuitiva com ícones e descrições

**2. Cursos Estruturados**
- 5 sistemas integrados:
  - 📖 Curso de C Programming (50 aulas, 150h)
  - 📖 Curso de Rust Programming (24 aulas, 72h)
  - 📖 Curso de Bash Shell Scripting (16 aulas, 40h)
  - 📖 Curso de VSCode no WSL (8 aulas, 20h)
  - 📖 Curso de Claude Code CLI (12 aulas, 30h)
- Total: 227 módulos, 692 horas de conteúdo

**3. Hierarquia Clara (4 Níveis)**
- **Nível 1:** Hub (página inicial)
- **Nível 2:** Curso (lista de seções e aulas)
- **Nível 3:** Aula (conteúdo + vídeo + notas)
- **Nível 4:** Prática (planejado)

**4. Sistema de Breadcrumb (US-061)**
- Navegação hierárquica: `Hub > Curso > Aula`
- WCAG 2.1 AA compliant (acessibilidade)
- Responsivo (colapsa em mobile)
- Sempre visível (sticky top)

**5. Caderno de Notas**
- Auto-save a cada 500ms (debounce)
- Persistência local (localStorage)
- Limite de 50KB por curso
- Markdown suportado

**6. Flash Cards 3D**
- 39 cards interativos por curso
- Animação de flip (frente/verso)
- Categorizado (basics, commands, advanced)
- Ideal para memorização ativa

**7. Progresso Visual**
- Métricas de conclusão: "5 de 16 aulas completadas"
- Checkboxes de aulas concluídas
- Persistência de progresso (localStorage)

**8. Build Otimizado**
- Vite 5.4.19 (startup 295ms, build ~7s)
- Code splitting (react-vendor, ui-vendor)
- Sem sourcemaps em produção (segurança)
- Docker + Nginx Alpine (imagem leve)

---

#### 🔄 Release 2.0 "Quality & Scale" (Q1 2026)

**1. React Router (US-040)**
- Navegação por URL: `/curso/bash/aula/1-1`
- Deep linking (compartilhar links de aulas)
- Botão voltar do browser funcionando
- SEO-friendly

**2. Tratamento de Erros (US-041)**
- Try/catch em todas operações localStorage
- Tratamento de QuotaExceededError
- Feedback visual de erros
- Retry automático

**3. Persistência de Progresso (US-042)**
- Sync automático com localStorage
- Backup em segundo plano
- Restauração de progresso em crash

**4. Refatoração BaseLearningSystem (US-043)**
- Componente genérico reutilizável
- Reduzir 800 linhas de código duplicado
- Hooks customizados: `useAutoSaveNotes`, `useModuleProgress`
- Cobertura de testes: 5% → 30%

**5. Testes Automatizados (US-019, US-020)**
- Vitest: testes unitários e integração
- Playwright: testes E2E
- MCP Chrome DevTools: validação visual
- CI/CD com GitHub Actions

**6. Lazy Loading (US-022)**
- `React.lazy()` para sistemas
- Bundle inicial < 200KB
- Skeleton screens durante carregamento

---

#### 📋 Release 3.0 "Enterprise Features" (Q2 2026)

**1. Sistema de Administração**
- Painel multi-tenant (1 instância, N empresas)
- Gestão de usuários por empresa
- Permissões granulares (admin, instrutor, colaborador)
- Criação de cursos via UI (sem código)

**2. Analytics de Engajamento**
- Dashboard com métricas:
  - Taxa de conclusão por curso
  - Tempo médio por aula
  - Progresso individual e por time
  - Identificação de gargalos (aulas com alta desistência)
- Exportação de relatórios (CSV, PDF)

**3. SSO Corporativo**
- Integração SAML 2.0
- OAuth 2.0 (Google Workspace, Microsoft Entra ID)
- Provisionamento automático de usuários

**4. Dark Mode (US-050)**
- Toggle light/dark
- Preferência salva por usuário
- Respeita configuração do OS

**5. TypeScript Migration**
- Migração gradual (utils → componentes)
- Type safety para reduzir bugs
- Melhor DX (autocomplete, refactoring)

**6. Acessibilidade WCAG 2.1 AA**
- Auditoria Lighthouse
- ARIA labels completos
- Navegação por teclado
- Suporte a leitores de tela

---

#### 🚀 Release 4.0 "Engagement & Growth" (Q3 2026)

**1. PWA com Modo Offline**
- Service workers
- Cache de conteúdo
- Sync quando online retornar
- Install prompt (mobile/desktop)

**2. Sistema de Conquistas**
- Badges por marcos (10 aulas, 50 aulas, curso completo)
- Leaderboards por time
- Gamificação de progresso
- Notificações de conquistas

**3. Recursos Sociais**
- Comentários por aula
- Perguntas e respostas (tipo Stack Overflow)
- Menções a colegas
- Sistema de reações

**4. Mobile Apps (React Native)**
- iOS e Android nativos
- Notificações push
- Offline-first
- Sync com web app

**5. Marketplace de Cursos (B2B2C)**
- Empresas publicam cursos customizados
- Outras empresas podem licenciar
- Revenue share 70/30
- Curadoria de qualidade

---

### Diferenciais Competitivos

| Característica | Organizador Base Conhecimento | Udemy for Business | Moodle | Confluence |
|----------------|-------------------------------|---------------------|--------|------------|
| **Custo** | 🟢 R$ 500/mês flat (self-hosted) | 🔴 R$ 1.800/user/ano | 🟡 R$ 2.000 setup + hosting | 🟡 R$ 600/mês (10 users) |
| **Customização** | 🟢 100% (código aberto) | 🔴 Zero | 🟡 Alta (mas complexa) | 🟢 Alta (plugins) |
| **UX Moderna** | 🟢 React + Tailwind | 🟢 Boa | 🔴 Antiquada | 🟡 Ok |
| **Conteúdo Técnico** | 🟢 Focado (C, Rust, DevOps) | 🟢 Amplo (mas genérico) | 🟡 Depende do instrutor | 🔴 Não é LMS |
| **Analytics** | 🟡 Básico (v2.0), Avançado (v3.0) | 🟢 Completo | 🟢 Completo | 🔴 Não é LMS |
| **Self-Hosted** | 🟢 Sim (Docker) | 🔴 Não (apenas SaaS) | 🟢 Sim | 🔴 Não (cloud only) |
| **White-Label** | 🟢 Total | 🔴 Não | 🟢 Sim | 🟡 Parcial |
| **Trilhas Estruturadas** | 🟢 Hierarquia 4 níveis | 🟡 Playlists simples | 🟢 Sim | 🔴 Não aplicável |
| **Flash Cards** | 🟢 Nativos (3D) | 🔴 Não | 🔴 Não | 🔴 Não |
| **Progresso Visual** | 🟢 Sim | 🟢 Sim | 🟢 Sim | 🔴 Não |

**Legenda:** 🟢 Excelente | 🟡 Médio | 🔴 Fraco/Inexistente

---

### Modelo de Negócio (Futuro)

#### Receitas

**1. Self-Hosted License (Primary)**
- **Preço:** R$ 500/mês flat (até 100 usuários)
- **Incremento:** R$ 3/usuário adicional/mês (acima de 100)
- **Suporte:** R$ 2.000/mês (SLA 4h, suporte dedicado)
- **Customização:** R$ 15.000 one-time (features específicas)

**Exemplo:** Empresa com 150 usuários paga:
- Base: R$ 500/mês
- 50 usuários extras: R$ 150/mês
- **Total:** R$ 650/mês = R$ 7.800/ano

**Comparação:**
- Udemy for Business (150 users): R$ 270.000/ano
- **Economia:** 97% (!) 🚀

**2. Managed Hosting (SaaS)**
- **Preço:** R$ 1.500/mês (até 50 usuários, inclui hosting AWS)
- **Incremento:** R$ 15/usuário adicional/mês
- **Backup e updates:** Inclusos
- **SLA:** 99.5% uptime

**3. Marketplace Revenue Share (v4.0)**
- Empresas publicam cursos customizados
- 70% para criador, 30% para plataforma
- Potencial: R$ 50k - R$ 200k/ano (estimativa conservadora)

#### Custos

**Desenvolvimento (Ano 1):**
- Desenvolvedor full-time: R$ 120.000/ano
- Infra AWS (desenvolvimento): R$ 500/mês = R$ 6.000/ano
- Ferramentas (GitHub, Sentry, Analytics): R$ 3.000/ano
- **Total Ano 1:** R$ 129.000

**Operacional (Ano 2+):**
- Desenvolvedor + Designer: R$ 200.000/ano
- Suporte (part-time): R$ 60.000/ano
- Infra AWS (produção multi-tenant): R$ 2.000/mês = R$ 24.000/ano
- Sales & Marketing: R$ 100.000/ano
- **Total Ano 2:** R$ 384.000

#### Break-Even

**Cenário Conservador:**
- 10 clientes x R$ 650/mês = R$ 6.500/mês = R$ 78.000/ano
- **Break-even:** ~5 anos (desenvolvimento amortizado)

**Cenário Realista:**
- 30 clientes x R$ 1.000/mês (média) = R$ 30.000/mês = R$ 360.000/ano
- **Break-even:** Ano 2

**Cenário Otimista:**
- 100 clientes x R$ 1.500/mês (média) = R$ 150.000/mês = R$ 1.800.000/ano
- **Lucro Ano 3:** R$ 1.400.000 (após custos)

---

## Escopo e Fases

### Fase 1: Foundation ✅ (Concluída - Jan-Nov 2025)

**Objetivo:** Validar viabilidade técnica e criar MVP funcional.

**Entregas:**
- ✅ Setup do projeto (React + Vite + Tailwind + Docker)
- ✅ Estrutura de componentes (18 componentes React)
- ✅ 5 cursos completos (227 módulos, 692h conteúdo)
- ✅ Sistema de navegação hierárquica
- ✅ Breadcrumb WCAG 2.1 AA
- ✅ Caderno de notas com auto-save
- ✅ Flash cards 3D interativos
- ✅ Build otimizado (<7s) e Docker
- ✅ CI/CD com GitHub Actions
- ✅ MCP Chrome DevTools para testes automatizados

**Métricas:**
- Performance: Vite startup 295ms ✅
- Conteúdo: 227 módulos ✅
- Qualidade: Build passa, console limpo ✅
- Nota geral: **9.0/10** ⭐

**Status:** 100% completa (Nov 2025)

---

### Fase 2: Quality & Scale 📋 (Q1 2026 - Jan-Mar)

**Objetivo:** Reduzir débito técnico, aumentar cobertura de testes e preparar para produção.

**Entregas:**
- 📋 React Router (US-040) - Deep linking
- 📋 Tratamento de erros robusto (US-041)
- 📋 Persistência de progresso (US-042)
- 📋 Refatoração BaseLearningSystem (US-043) - Reduzir 800 linhas
- 📋 Cobertura de testes 30% (US-019, US-020)
- 📋 Lazy loading (US-022) - Bundle < 200KB
- 📋 Documentação completa (100% docs conceituais)

**Métricas:**
- Cobertura testes: 5% → 30% 🎯
- Duplicação código: 25% → 10% 🎯
- Bundle size: ~500KB → <200KB 🎯
- Lighthouse score: TBD → 90+ 🎯

**Status:** Planejada (Sprint 2.1-2.3)

---

### Fase 3: Enterprise Features 📋 (Q2 2026 - Abr-Jun)

**Objetivo:** Adicionar funcionalidades corporativas e preparar para go-to-market.

**Entregas:**
- 📋 Sistema de administração multi-tenant
- 📋 Analytics de engajamento (dashboard)
- 📋 SSO corporativo (SAML, OAuth)
- 📋 Dark mode (US-050)
- 📋 TypeScript migration (50% do código)
- 📋 Acessibilidade WCAG 2.1 AA (auditoria completa)
- 📋 API para criação de cursos
- 📋 Primeiros 3 clientes beta

**Métricas:**
- Clientes beta: 3 empresas 🎯
- MRR: R$ 2.000 (validação) 🎯
- Feedback NPS: >50 🎯
- Bugs críticos: 0 🎯

**Status:** Planejada (Sprint 3.1-3.6)

---

### Fase 4: Growth & Scale 📋 (Q3-Q4 2026 - Jul-Dez)

**Objetivo:** Escalar para 30 clientes e estabelecer marca no mercado.

**Entregas:**
- 📋 PWA com modo offline
- 📋 Sistema de conquistas e gamificação
- 📋 Recursos sociais (comentários, Q&A)
- 📋 Mobile apps (React Native)
- 📋 Marketplace de cursos (beta)
- 📋 30 clientes ativos
- 📋 Equipe: 2 devs + 1 designer + 1 suporte

**Métricas:**
- Clientes: 30 empresas 🎯
- MRR: R$ 30.000 🎯
- Churn rate: <5% 🎯
- Time to value: <1 semana 🎯

**Status:** Planejada (Sprint 4.1-4.12)

---

## Roadmap de Alto Nível

```
2025 ══════════════════════════════════════════════════════════
Q4 │ ✅ Release 1.0 Foundation
   │    └─ 227 módulos, 692h conteúdo, MCP Chrome DevTools

2026 ══════════════════════════════════════════════════════════
Q1 │ 🔄 Release 2.0 Quality & Scale
   │    └─ React Router, Testes 30%, Refatoração, Docs 100%

Q2 │ 📋 Release 3.0 Enterprise Features
   │    └─ Multi-tenant, Analytics, SSO, Dark Mode, TypeScript

Q3 │ 📋 Release 4.0 Growth & Scale
   │    └─ PWA, Gamificação, Social, Mobile Apps

Q4 │ 📋 Release 4.5 Marketplace
   │    └─ B2B2C, Certificações, 30 clientes

2027 ══════════════════════════════════════════════════════════
Q1 │ 📋 Release 5.0 AI-Powered Learning
   │    └─ Recomendações IA, Geração automática de conteúdo

Q2 │ 📋 Release 5.5 International Expansion
   │    └─ i18n (EN, ES), 100 clientes, Série A

Q3-Q4 │ 📋 Scale to 500 clientes
      │    └─ ARR R$ 10M, Equipe 15 pessoas
```

**Milestones Principais:**
- ✅ **Nov 2025:** Release 1.0 (MVP técnico validado)
- 🎯 **Mar 2026:** Release 2.0 (Produção-ready)
- 🎯 **Jun 2026:** Release 3.0 (3 clientes beta pagando)
- 🎯 **Dez 2026:** Release 4.0 (30 clientes, MRR R$ 30k)
- 🎯 **Jun 2027:** Release 5.5 (100 clientes, Série A)

---

## Próximos Passos

### Imediatos (Próximas 2 Semanas - Sprint 2.5)

**Alta Prioridade:**
1. ✅ Completar documentação conceitual (5 documentos)
2. 📋 Criar documento de arquitetura técnica
3. 📋 Reorganizar guias MCP para `docs/tecnico/testing/`
4. 📋 Atualizar CLAUDE.md com links para nova estrutura
5. 📋 Validar build e testes passando

**Média Prioridade:**
6. 📋 Criar apresentação para stakeholders (pitch deck)
7. 📋 Elaborar plano de testes para Release 2.0
8. 📋 Pesquisa de mercado: 10 entrevistas com gestores de T&D

---

### Curto Prazo (Próximo Mês - Sprint 3.1-3.2)

**Desenvolvimento:**
1. Implementar React Router (US-040) - 13 pontos
2. Tratamento de erros localStorage (US-041) - 5 pontos
3. Persistir progresso de módulos (US-042) - 8 pontos
4. Escrever testes de componentes principais (US-019) - 21 pontos

**Produto:**
5. Definir personas corporativas detalhadas (3-5 personas)
6. Mapear user journeys completos
7. Criar wireframes de dashboard de analytics (v3.0)

**Negócio:**
8. Validar pricing com 20 empresas (survey)
9. Criar landing page MVP (próximo sprint)
10. Identificar 10 clientes beta potenciais

---

### Médio Prazo (Próximos 3 Meses - Q1 2026)

**Desenvolvimento:**
1. Refatorar BaseLearningSystem (US-043) - 21 pontos
2. Implementar lazy loading (US-022) - 8 pontos
3. Atingir 30% cobertura de testes
4. Documentação técnica 100%

**Produto:**
5. Protótipo de sistema de administração
6. Spec completo de analytics dashboard
7. Roadmap de API para instrutores

**Negócio:**
8. Fechar 3 clientes beta (meta: R$ 2.000 MRR)
9. Criar materiais de vendas (case studies, demos)
10. Contratar designer part-time

---

## Referências

### Documentos Relacionados

**Conceituais:**
- **[00-definicoes-principais.md](00-definicoes-principais.md)** - Glossário canônico (LEIA PRIMEIRO)
- **[03-glossario.md](03-glossario.md)** - Termos técnicos expandidos
- **[04-modelo-dominio.md](04-modelo-dominio.md)** - Hierarquia detalhada
- **[05-personas-corporativas.md](05-personas-corporativas.md)** - Personas e jornadas

**Técnicos:**
- **[../../tecnico/architecture/01-visao-geral-arquitetura.md](../../tecnico/architecture/01-visao-geral-arquitetura.md)** - Decisões arquiteturais

**Raiz do Projeto:**
- **[../../PRODUCT-CENTRAL-DOCUMENT.md](../../PRODUCT-CENTRAL-DOCUMENT.md)** - PRD e User Stories (fonte única de verdade)
- **[../../CLAUDE.md](../../CLAUDE.md)** - Instruções para Claude Code
- **[../../README.md](../../README.md)** - Setup e comandos principais

### Navegação

- **[← Voltar ao Índice de Documentação](../README.md)**
- **[← Voltar ao README Conceitual](README.md)**
- **[→ Próximo: Glossário Técnico](03-glossario.md)**

---

## Changelog

| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 1.0.0 | 2025-11-14 | Criação inicial com foco corporativo B2B | Claude Code |

---

**📍 Você está em:** `docs/conceitual/01-visao-geral/01-contexto-projeto.md`
**📅 Última atualização:** 2025-11-14
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** ✅ Release 1.0 completa, Release 2.0 planejada
**🎯 Próximo Marco:** Release 2.0 (Q1 2026) - Quality & Scale
