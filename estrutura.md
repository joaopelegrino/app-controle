# Sumario do Projeto: App-Controle

## Visao Geral
Plataforma B2B de treinamento corporativo construida com React 18 + Vite 5. Possui sistema RBAC com 5 papeis (student, instructor, admin, c_level, specialist), Hub de Especialistas, i18n em 3 idiomas (pt-BR, en-US, es-ES), e backend via NocoDB + PostgreSQL 16. Deploy via Docker/Fly.io com CI/CD via GitHub Actions.

## Stack Identificada
React 18, Vite 5, Tailwind CSS, PostCSS, react-router-dom v6, react-i18next, NocoDB, PostgreSQL 16, Docker, Nginx, Fly.io, Vitest, VitePress (docs), Bun (package manager)

## Estrutura Principal

```
.
│
│ ── CONFIGURACAO (raiz) ──────────────────────────────────────────────
│
├── index.html                          # HTML de entrada (Vite SPA)
├── package.json                        # Dependencias e scripts npm
├── package-lock.json                   # Lock file npm
├── bun.lock                            # Lock file Bun
├── vite.config.js                      # Config do Vite (build/dev)
├── vitest.config.js                    # Config do Vitest (testes)
├── tailwind.config.js                  # Config do Tailwind CSS
├── postcss.config.js                   # Config do PostCSS
├── fly.toml                            # Config do Fly.io (deploy)
├── Dockerfile                          # Build da imagem Docker
├── docker-compose.yml                  # Servicos Docker (app)
├── docker-compose.nocodb.yml           # Servicos Docker (NocoDB + PG)
├── nginx.conf                          # Config do Nginx (producao)
├── .dockerignore
├── .gitignore
├── .gitleaks.toml                      # Deteccao de secrets
├── .mcp.json                           # Config MCP (Chrome DevTools)
├── .mise.toml                          # Config do mise (runtime manager)
├── .env                                # Variaveis de ambiente (SENSIVEL, gitignored)
├── .env.example                        # Variaveis de ambiente (template)
├── .env.nocodb                         # Variaveis NocoDB (SENSIVEL, gitignored)
├── .env.nocodb.example                 # Variaveis NocoDB (template)
├── .env.platform.example               # Variaveis plataforma (template)
│
│ ── DOCUMENTOS (raiz) ────────────────────────────────────────────────
│
├── README.md                           # README principal
├── README.md.backup                    # Backup do README
├── LLMCLAUDE.md                        # Instrucoes para LLMs/Claude
├── LOCALHOST-ACESSO.md                 # Guia de acesso local
├── PROBLEMA-PORTA-8080.md              # Doc de troubleshooting porta 8080
├── PRODUCT-CENTRAL-DOCUMENT.md         # Documento central do produto
├── estrutura.md                        # Este arquivo (mapa do projeto)
├── test-usabilidade-mcp.cjs            # Script de teste MCP usabilidade
│
│ ── CODIGO-FONTE ─────────────────────────────────────────────────────
│
├── src/                                # === CODIGO-FONTE PRINCIPAL (73 arquivos) ===
│   ├── main.jsx                        #   Ponto de entrada React
│   ├── index.css                       #   Estilos globais
│   │
│   ├── components/                     #   39 componentes React (.jsx) + hub/ (5)
│   │   ├── LoginView.jsx               #     Auth: tela de login
│   │   ├── UserHeader.jsx              #     Header com navegacao e perfil
│   │   ├── MobileMenu.jsx              #     Menu mobile responsivo
│   │   ├── PrivateRoute.jsx            #     Rota protegida por auth
│   │   ├── RoleBasedAccess.jsx         #     Controle de acesso RBAC
│   │   ├── ErrorBoundary.jsx           #     Captura de erros React
│   │   ├── AdminDashboard.jsx          #     Dashboard admin
│   │   ├── InstructorDashboard.jsx     #     Dashboard instrutor
│   │   ├── ExecutiveDashboard.jsx      #     Dashboard executivo (C-level)
│   │   ├── UserDashboard.jsx           #     Dashboard aluno
│   │   ├── HubView.jsx                 #     Hub de Especialistas (pagina principal)
│   │   ├── hub/                        #     Sub-componentes do Hub (5 arquivos)
│   │   │   ├── CourseCard.jsx          #       Card de curso
│   │   │   ├── CourseCatalog.jsx       #       Catalogo de cursos
│   │   │   ├── CourseReviews.jsx       #       Avaliacoes de cursos
│   │   │   ├── SpecialistDashboard.jsx #       Dashboard do especialista
│   │   │   └── SpecialistProfile.jsx   #       Perfil do especialista
│   │   ├── OnboardingWizard.jsx        #     Wizard de onboarding
│   │   ├── LearningPathView.jsx        #     Trilha de aprendizado
│   │   ├── SistemaEducacionalCompleto.jsx #  Sistema educacional principal
│   │   ├── AreaCard.jsx                #     Card de area de estudo
│   │   ├── Breadcrumb.jsx              #     Navegacao breadcrumb
│   │   ├── CodeBlock.jsx               #     Bloco de codigo com syntax highlight
│   │   ├── ConfirmModal.jsx            #     Modal de confirmacao generica
│   │   ├── CourseFormModal.jsx         #     Modal de formulario de curso
│   │   ├── EmptyState.jsx              #     Componente de estado vazio
│   │   ├── EnrollUserModal.jsx         #     Modal de matricula de usuario
│   │   ├── ExportButton.jsx            #     Botao de exportacao
│   │   ├── FlashcardModal.jsx          #     Modal de flashcards
│   │   ├── LanguageSelector.jsx        #     Seletor de idioma (i18n)
│   │   ├── LoadingComponents.jsx       #     Componentes de loading/skeleton
│   │   ├── ModuleDifficultyCard.jsx    #     Card de dificuldade de modulo
│   │   ├── StudentNotesModal.jsx       #     Modal de notas do aluno
│   │   ├── ToastContainer.jsx          #     Container de notificacoes toast
│   │   ├── UserFormModal.jsx           #     Modal de formulario de usuario
│   │   │   # --- Learning Systems (5 pares: System + NotesView = 10 arquivos) ---
│   │   ├── BashLearningSystem.jsx      #     Sistema de aprendizado Bash
│   │   ├── BashNotesView.jsx           #     Notas do curso Bash
│   │   ├── CLearningSystem.jsx         #     Sistema de aprendizado C
│   │   ├── CNotesView.jsx              #     Notas do curso C
│   │   ├── ClaudeCodeLearningSystem.jsx #    Sistema de aprendizado Claude Code
│   │   ├── ClaudeCodeNotesView.jsx     #     Notas do curso Claude Code
│   │   ├── RustLearningSystem.jsx      #     Sistema de aprendizado Rust
│   │   ├── RustNotesView.jsx           #     Notas do curso Rust
│   │   ├── VSCodeLearningSystem.jsx    #     Sistema de aprendizado VSCode
│   │   └── VSCodeNotesView.jsx         #     Notas do curso VSCode
│   │
│   ├── config/                         #   Configuracao da aplicacao
│   │   ├── index.js                    #     Config geral (API URLs, ambiente)
│   │   └── platform.js                 #     Roles RBAC, permissoes, features
│   │
│   ├── contexts/                       #   5 React Contexts (estado global)
│   │   ├── AuthContext.jsx             #     Autenticacao (login, logout, user)
│   │   ├── LoadingContext.jsx          #     Estado de loading global
│   │   ├── OnboardingContext.jsx       #     Estado de onboarding
│   │   ├── TenantContext.jsx           #     Multi-tenancy (tenant config)
│   │   └── ToastContext.jsx            #     Notificacoes toast
│   │
│   ├── hooks/                          #   7 Custom Hooks + 1 teste
│   │   ├── useAuth.js                  #     Hook de autenticacao
│   │   ├── useAutoSaveNotes.js         #     Auto-save de notas com debounce
│   │   ├── useCourses.js              #     CRUD de cursos (NocoDB)
│   │   ├── useMediaQuery.js            #     Media queries responsivas
│   │   ├── useModuleProgress.js        #     Progresso de modulos
│   │   ├── usePermissions.js           #     RBAC (hasPermission, isAdmin, etc.)
│   │   ├── useTenant.js               #     Multi-tenancy hook
│   │   └── __tests__/
│   │       └── useAutoSaveNotes.test.js #    Teste do hook useAutoSaveNotes
│   │
│   ├── services/                       #   Camada de servicos + 2 testes
│   │   ├── apiService.js              #     Cliente API REST (NocoDB)
│   │   ├── dataService.js             #     Camada de dados local/fallback
│   │   └── __tests__/
│   │       ├── apiService.auth.test.js #     Testes de autenticacao
│   │       └── apiService.users.test.js #    Testes de usuarios
│   │
│   ├── data/                           #   8 arquivos de dados estaticos
│   │   ├── schema.js                   #     Schema do dominio (tabelas, campos)
│   │   ├── studyAreas.js              #     Areas de estudo disponiveis
│   │   ├── caminhoExemploData.js      #     Dados de trilha exemplo
│   │   ├── bashLearningData.js        #     Dados do curso Bash
│   │   ├── cLearningData.js           #     Dados do curso C
│   │   ├── claudeCodeLearningData.js  #     Dados do curso Claude Code
│   │   ├── rustLearningData.js        #     Dados do curso Rust
│   │   └── vscodeLearningData.js      #     Dados do curso VSCode
│   │
│   ├── i18n/                           #   Internacionalizacao
│   │   ├── config.js                   #     Config do i18next (init, fallback)
│   │   ├── index.js                    #     Re-export
│   │   └── locales/                    #     Traducoes embutidas
│   │       ├── en-US/                  #       Ingles
│   │       ├── es-ES/                  #       Espanhol
│   │       └── pt-BR/                  #       Portugues
│   │
│   ├── pages/
│   │   └── NotFoundPage.jsx           #     Pagina 404
│   │
│   ├── utils/                          #   4 utilidades
│   │   ├── debugLogger.js             #     Logger de debug condicional
│   │   ├── exportUtils.js             #     Exportacao de dados (CSV, etc.)
│   │   ├── helpers.js                 #     Funcoes auxiliares gerais
│   │   └── storageMigration.js        #     Migracao de chaves localStorage
│   │
│   └── tests/                          #   Testes de componentes
│       ├── setup.js                    #     Setup global do Vitest
│       └── components/
│           ├── AreaCard.test.jsx
│           ├── CourseCatalog.test.jsx
│           ├── HubView.test.jsx
│           └── SpecialistDashboard.test.jsx
│
│ ── ASSETS PUBLICOS ──────────────────────────────────────────────────
│
├── public/
│   └── locales/                        # Traducoes runtime (i18next-http-backend)
│       ├── pt-BR/                      #   auth.json, common.json, dashboard.json, errors.json
│       ├── en-US/                      #   auth.json, common.json, dashboard.json, errors.json
│       └── es-ES/                      #   auth.json, common.json, dashboard.json, errors.json
│
│ ── BANCO DE DADOS ───────────────────────────────────────────────────
│
├── database/                           # SQL migrations + seeds (7 arquivos)
│   ├── README.md                       #   Documentacao do schema
│   ├── init.sql                        #   Schema inicial (tabelas base)
│   ├── migration-001-rbac.sql          #   Roles, permissions, user_roles
│   ├── migration-002-enrollments.sql   #   Matriculas
│   ├── migration-003-hub-especialistas.sql  # Hub: specialist_profiles, courses, reviews
│   ├── seed.sql                        #   Dados iniciais minimos
│   └── seed-demo-completo.sql          #   Dados demo completos (5 users, cursos)
│
│ ── SCRIPTS E TEMPLATES ──────────────────────────────────────────────
│
├── scripts/
│   ├── capture-vscode-output.js        #   Captura output do VSCode
│   └── start-chrome-debug.sh           #   Inicia Chrome em modo debug (MCP)
│
├── templates/
│   └── learningDataTemplate.js         #   Template para criar dados de curso
│
│ ── CI/CD ─────────────────────────────────────────────────────────────
│
├── .github/
│   └── workflows/
│       └── fly-deploy.yml              #   CI/CD: deploy automatico no Fly.io
│
│ ── DOCUMENTACAO ──────────────────────────────────────────────────────
│
├── docs/                               # Documentacao VitePress
│   ├── README.md                       #   Indice geral
│   ├── 00-ROADMAP-CONSOLIDACAO.md      #   Roadmap de consolidacao
│   ├── .vitepress/
│   │   └── config.ts                   #   Config do VitePress (sidebar, nav)
│   ├── 01-PRODUTO/                     #   4 docs: visao, personas, glossario, questoes
│   │   ├── 01-visao-e-missao.md
│   │   ├── 04-personas.md
│   │   ├── 06-glossario.md
│   │   └── 07-questoes-em-aberto.md
│   ├── 02-ESPECIFICACAO/               #   2 docs: modelo dominio, hub
│   │   ├── 01-modelo-dominio.md
│   │   └── 04-hub-especialistas.md
│   ├── 03-ARQUITETURA/                 #   8 docs: visao geral, i18n, backend, DB, NocoDB
│   │   ├── 01-visao-geral.md
│   │   ├── 02-i18n.md
│   │   ├── 03-backend-overview.md
│   │   ├── 04-database.md
│   │   ├── 05-nocodb.md
│   │   ├── 06-dados-demo.md
│   │   ├── 07-nocodb-troubleshooting.md
│   │   └── 08-nocodb-quickstart.md
│   ├── 04-QUALIDADE/                   #   5 docs: QA E2E, MCP, testes
│   │   ├── 01-qa-e2e-specs.md
│   │   ├── 02-mcp-chrome-devtools.md
│   │   ├── 03-mcp-quick-start.md
│   │   ├── 04-mcp-manual.md
│   │   └── 05-testing-dev.md
│   ├── 05-OPERACOES/                   #   4 docs: overview, Fly.io, CI/CD, billing
│   │   ├── 01-overview.md
│   │   ├── 02-flyio.md
│   │   ├── 03-ci-cd.md
│   │   └── 04-flyio-billing.md
│   ├── 06-GUIAS-USUARIO/              #   7 docs: guias por papel + quick-start + FAQ
│   │   ├── 01-admin.md
│   │   ├── 02-instructor.md
│   │   ├── 03-student.md
│   │   ├── 04-executive.md
│   │   ├── 05-quick-start.md
│   │   ├── 06-getting-started.md
│   │   └── 07-faq.md
│   ├── 07-GESTAO/                      #   5 docs: roadmap, gaps, acoes, integracao
│   │   ├── 01-roadmap.md
│   │   ├── 02-gaps-demo.md
│   │   ├── 03-acoes-pendentes.md
│   │   ├── 04-acoes-concluidas.md
│   │   └── 05-sulical-integracao.md
│   ├── 08-REFERENCIA/                  #   10 docs: CLI, RBAC, i18n, transcricao, hooks, etc.
│   │   ├── 01-cli-reference.md
│   │   ├── 02-rbac.md
│   │   ├── 03-i18n.md
│   │   ├── 04-template-curso.md
│   │   ├── 05-quick-start-transcricao.md
│   │   ├── 06-guia-transcricao.md
│   │   ├── 07-tasks.md
│   │   ├── 08-tools.md
│   │   ├── 09-configuration.md
│   │   └── 10-hooks.md
│   └── 99-ARQUIVO/                     #   24 docs de arquivo (legado + relatorios + sprints)
│       ├── legado/                     #     7 docs: definicoes, contexto, personas, MVP, six-layer
│       │   ├── 00-definicoes-principais.md
│       │   ├── 01-contexto-projeto.md
│       │   ├── 05-personas-corporativas.md
│       │   ├── ESTRUTURA-PLATAFORMA-MVP.md
│       │   ├── PERSONAS-NAO-TECNICAS.md
│       │   ├── PLANEJAMENTO-SIX-LAYER-SISTEMA.md
│       │   └── SOLUCAO-E-PERSONAS.md
│       ├── relatorios/                 #     3 docs: consolidacao, forense, gaps
│       │   ├── PLANO-CONSOLIDACAO-DOCUMENTACAO.md
│       │   ├── RELATORIO-FORENSE-ALINHAMENTO-2026-02-02.md
│       │   └── RELATORIO-GAPS-2026-02-05.md
│       └── sprints/                    #     14 docs: backlogs, retomadas, roadmap, analises
│           ├── README.md
│           ├── ANALISE-PLANEJAMENTO-DEMO-B2B.md
│           ├── BACKLOG-2026-01-23-SPRINT10-ANALYTICS.md
│           ├── BACKLOG-2026-01-23-SPRINT10-US103-LOADING.md
│           ├── BACKLOG-2026-01-23-SPRINT10-US104-ONBOARDING.md
│           ├── BACKLOG-2026-01-23-SPRINT9-MATRICULAS.md
│           ├── BACKLOG-2026-01-23-TESTES-E2E-BACKEND.md
│           ├── BACKLOG-2026-01-23-TESTES-PERFIS-SPRINT11.md
│           ├── backlog-2026-01-24-itens-pendentes-infra.md
│           ├── backlog-2026-01-26-deploy-cloud-demonstracao.md
│           ├── ESTUDO-REFATORACAO-WHITE-LABEL-2026-01-26.md
│           ├── RETOMADA-2026-01-22-API-SERVICE.md
│           ├── RETOMADA-2026-01-22-AUTH-FRONTEND.md
│           └── ROADMAP-DEMO-B2B.md
│
│ ── CLAUDE CODE CONFIG ────────────────────────────────────────────────
│
├── .claude/                            # Configuracao do Claude Code (26 arquivos)
│   ├── LLMCLAUDE.md                    #   Instrucoes para o agente
│   ├── README.md                       #   Documentacao da config Claude
│   ├── hooks.toml                      #   Hooks de automacao
│   ├── settings.local.json             #   Settings locais
│   ├── agents/                         #   6 agentes especializados
│   │   ├── code-reviewer.md
│   │   ├── config-optimizer.md
│   │   ├── dev-environment-specialist.md
│   │   ├── docs-engineer.md
│   │   ├── security-auditor.md
│   │   └── test-generator.md
│   ├── commands/                       #   8 comandos customizados
│   │   ├── ativar-ambiente-dev.md
│   │   ├── atualizar-estrutura.md
│   │   ├── browser-testing.md
│   │   ├── full-coverage.md
│   │   ├── pr-ready.md
│   │   ├── quick-audit.md
│   │   ├── reunir-informacoes.md
│   │   └── transcrever-curso.md
│   ├── skills/                         #   2 skills
│   │   ├── tmp:resumo-sprint6-retomada.md
│   │   └── transcrever-video-para-curso.md
│   ├── docs-meta/
│   │   └── claude-md-modules/          #   Modulos de contexto para CLAUDE.md
│   └── logs/                           #   Logs de execucao (6 arquivos)
│       ├── security-audit.json
│       ├── hooks/                      #     context-injector.json, post-tool-use.json,
│       │                               #     session-start.json, validator.json
│       └── prompts/
│           └── prompts-2026-01-29.json
│
│ ── FACTORY (automacao/QA) ────────────────────────────────────────────
│
├── .factory/                           # Infra de automacao/QA (58 arquivos)
│   ├── QUICKSTART.md                   #   Guia rapido
│   ├── README.md                       #   Documentacao principal
│   ├── AGENTS.md                       #   Catalogo de agentes
│   ├── FINAL-REPORT.md                 #   Relatorio final de setup
│   ├── INSTALLATION-COMPLETE.md        #   Confirmacao de instalacao
│   ├── MCP-BROWSER-SETUP.md            #   Setup do MCP browser
│   ├── MCP-QUICK-REFERENCE.md          #   Referencia rapida MCP
│   ├── SUMMARY.md                      #   Resumo geral
│   ├── settings.json                   #   Config da factory
│   ├── commands/                       #   4 comandos
│   │   ├── browser-testing.md
│   │   ├── full-coverage.md
│   │   ├── pr-ready.md
│   │   └── quick-audit.md
│   ├── droids/                         #   6 agentes especializados
│   │   ├── code-reviewer.md
│   │   ├── dev-environment-specialist.md
│   │   ├── docs-engineer.md
│   │   ├── factory-config-specialist.md
│   │   ├── security-auditor.md
│   │   └── test-specialist.md
│   ├── mcp/                            #   Config MCP browser
│   │   ├── browser-devtools.md
│   │   └── README.md
│   ├── scripts/
│   │   └── validate-config.sh          #   Validacao de config
│   └── relatorios/                     #   Relatorios de QA (36 arquivos)
│       ├── nocodb-dados-seed-resumo.md
│       ├── ambiente-ativo-2026-01-26.png
│       ├── ambiente-completo-2026-01-26.png
│       ├── hub-funcionando-2026-01-26.png
│       ├── login-sucesso-admin-2026-01-26.png
│       ├── qa-sprint13-admin-dashboard.png
│       ├── qa-sprint13-hub-trainb2b.png
│       ├── status-ambiente-2026-01-26.png
│       ├── arquivo-2026-01/            #     12 arquivos (analises, auditorias, screenshots jan/2026)
│       │   ├── SUMMARY-2026-01-20.md
│       │   ├── analise-branches-demo-2026-01-20.md
│       │   ├── analise-nocodb-viabilidade-2026-01-20.md
│       │   ├── auditoria-factory-config-2026-01-20.md
│       │   ├── auditoria-forense-completa-2026-01-20.md
│       │   ├── implementacao-nocodb-2026-01-20.md
│       │   ├── mcp-browser-configuration-2026-01-20.md
│       │   ├── melhorias-implementadas-2026-01-20.md
│       │   ├── nocodb-mvp-simple-2026-01-22.md
│       │   ├── planejamento-testes-persistencia-2026-01-20.md
│       │   ├── proximas-etapas-desenvolvimento-2026-01-20.md
│       │   └── screenshot-qa-e2e-2026-01-25.png
│       └── qa-e2e-2026-01-26/          #     16 arquivos (screenshots E2E + relatorio)
│           ├── RELATORIO-QA-E2E.md
│           ├── 01-hub-instructor.png
│           ├── 02-menu-dropdown-instructor.png
│           ├── 03-BUG-instructor-acesso-negado.png
│           ├── 04-instructor-dashboard.png
│           ├── 05-modal-notas-aluno.png
│           ├── 06-login-screen.png
│           ├── 07-admin-dashboard.png
│           ├── 08-modal-novo-usuario.png
│           ├── 09-onboarding-wizard.png
│           ├── 10-executive-dashboard.png
│           ├── 11-student-dashboard.png
│           ├── 12-rbac-acesso-negado-student.png
│           ├── 13-i18n-espanol.png
│           ├── 14-hub-i18n-portugues.png
│           └── 15-hub-i18n-english.png
│
│ ── DOCUMENTACAO INTERNA ──────────────────────────────────────────────
│
├── documentacao-interna/               # Docs internos (parcialmente vazio)
│   ├── 01-arquitetura/                 #   (vazio)
│   ├── 03-servicos/                    #   (vazio)
│   ├── 04-dados/                       #   (vazio)
│   ├── 07-referencias/                 #   (vazio)
│   ├── bash/
│   │   └── videodocurso.md             #   Guia de video para curso
│   └── entregaveis/
│       └── fase-1/                     #   (vazio)
│
│ ── CONTEXTOS LLM ─────────────────────────────────────────────────────
│
├── contextos/variaveis/                # Contextos variaveis para LLM
│   ├── .last-update                    #   Timestamp da ultima atualizacao
│   ├── ativos_de_configuracao_claude_code/
│   │   └── ativos_de_configuracao_claude_code_v1/
│   ├── estrutura_atual_do_projeto/
│   │   └── estrutura_atual_do_projeto_v1/
│   └── estrutura_projeto_flusistip/
│       └── estrutura_projeto_flusistip_v1/
│
│ ── IDE ────────────────────────────────────────────────────────────────
│
└── .vscode/
    └── settings.json                   # Config do VS Code
```

## Pontos de Entrada
- `index.html` -- HTML raiz (Vite SPA injeta `src/main.jsx`)
- `src/main.jsx` -- Ponto de entrada React (monta App com providers)
- `src/config/index.js` -- Configuracao da API e ambiente
- `src/config/platform.js` -- Roles RBAC, permissoes e features
- `src/contexts/AuthContext.jsx` -- Provider de autenticacao
- `src/services/apiService.js` -- Cliente API REST para NocoDB

## Observacoes para Navegacao
- A **logica de negocio** esta em `src/services/` (apiService, dataService) e `src/hooks/` (usePermissions, useCourses, useAuth).
- O **sistema RBAC** esta definido em `src/config/platform.js` e consumido via `src/hooks/usePermissions.js` + `src/components/RoleBasedAccess.jsx`.
- Os **dashboards por papel** estao em `src/components/` com nomes `*Dashboard.jsx` (Admin, Instructor, Executive, User + Specialist no hub/).
- O **Hub de Especialistas** esta em `src/components/HubView.jsx` + `src/components/hub/` (5 sub-componentes).
- Os **cursos de aprendizado** seguem o padrao `*LearningSystem.jsx` + `*NotesView.jsx` + `*LearningData.js` (5 temas: Bash, C, Rust, VSCode, ClaudeCode).
- As **traducoes** vivem em dois lugares: `src/i18n/locales/` (build-time) e `public/locales/` (runtime i18next-http-backend). Cada um tem 3 idiomas x 4 namespaces (auth, common, dashboard, errors).
- As **migrations SQL** em `database/` sao incrementais (001-rbac, 002-enrollments, 003-hub) aplicadas sobre `init.sql`.
- A **documentacao** esta em `docs/` (VitePress, 45 .md) organizada por dominio; `.factory/relatorios/` tem evidencias de QA com screenshots.
- O **Claude Code** esta configurado em `.claude/` (agentes, comandos, skills, hooks) e `.factory/` (droids, commands, MCP).

## Omitidos deste sumario (artefatos gerados/transitorios)
- `node_modules/` -- dependencias instaladas (~27.000 linhas no tree original)
- `.git/` -- objetos internos do Git (branches, objects, refs, hooks)
- `dist/` -- artefatos de build do Vite (HTML, JS, CSS minificados)
- `docs/.vitepress/cache/` -- cache de dependencias do VitePress (20 arquivos)
- `docs/.vitepress/dist/` -- build estatico do VitePress (70+ arquivos HTML/JS/CSS/fonts)
- `.claude-backup-20251205-101418/` -- backup de configuracao anterior do Claude Code
- `historico/checkpoints/` -- diretorio de checkpoints (vazio)
- `home/notebook/workspace/app-controle/contextos/` -- caminho duplicado/artefato de teste
- `.mise.toml.*` -- 6 arquivos de analise/backup temporarios (.mise.toml.ANALISE-DIRETRIZES.md, .mise.toml.bak-original, .mise.toml.CHANGES.md, .mise.toml.proposed, .mise.toml.RECOMENDACAO-FINAL.md, .mise.toml.v2)
