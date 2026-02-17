/**
 * FluSisTip Onboarding - Dados de Aprendizagem
 *
 * Gerado por: Diagnostico Forense TrainB2B v1.0
 * Data: 2026-02-17
 * Projeto Fonte: FluSisTip (Healthcare LLM Workflow Platform)
 *
 * CONTEXTO LLM (zero-context resume):
 * Este arquivo contem os dados de aprendizagem para 5 cursos de onboarding
 * do projeto FluSisTip na plataforma TrainB2B. Os cursos foram gerados a partir
 * de analise forense do codebase (47.390 LOC, 116 namespaces Clojure/CLJS).
 *
 * Artefatos relacionados:
 * - docs/onboarding/flusistip/RELATORIO-FORENSE.md (diagnostico completo)
 * - docs/onboarding/flusistip/TRILHA-ONBOARDING.md (visao geral trilha)
 * - src/data/flusistipFlashCards.js (flash cards com rastreabilidade)
 * - src/data/flusistipOnboardingChecklist.js (checklists por persona)
 * - database/seed-onboarding-flusistip.sql (seed SQL para NocoDB)
 */

import {
  Terminal,
  Code,
  Database,
  Shield,
  Lock,
  GitBranch,
  UserCheck,
  ExternalLink,
  LayoutDashboard,
  Cpu,
  Zap,
  DollarSign,
  Layers,
  Layout,
  Route,
  Server,
  Briefcase,
  AlertTriangle,
  BookOpen,
  FileText,
} from 'lucide-react';

// ============================================================================
// METADADOS DO DIAGNOSTICO FORENSE
// ============================================================================

export const diagnosticoForense = {
  projeto: 'FluSisTip',
  descricao: 'Hub de Workflows de LLMs Assistidas para Healthcare',
  pathFonte: '/home/notebook/workspace/flusistip/',
  dataAnalise: '2026-02-17',
  complexidadeGeral: 8,
  locTotal: 47390,
  locBackend: 35047,
  locFrontend: 8687,
  locTestes: 3656,
  namespacesBackend: 86,
  namespacesFrontend: 30,
  commits: 345,
  contribuidores: 1,
  apiEndpoints: 98,
  schemasDatomic: 12,
  featureFlags: 4,
  personasRBAC: 8,
  statusMVP: '89%',
  stackPrincipal: 'Clojure 1.12 + ClojureScript + Datomic + React 18 (Reagent/Re-frame)',
  tempoOnboardingEstimado: '6-8 semanas',
  cursosGerados: 5,
  modulosTotais: 35,
};

// ============================================================================
// TRILHA DE ONBOARDING (sequencia de cursos com prerequisitos)
// ============================================================================

export const trilhaOnboarding = [
  {
    ordem: 0,
    cursoId: 'flusistip-fundamentos',
    obrigatorio: true,
    prerequisitos: [],
    personasAlvo: ['todos'],
    descricao: 'Setup do ambiente Clojure/CLJS, REPL workflow, e primeiro build local',
  },
  {
    ordem: 1,
    cursoId: 'flusistip-dominio',
    obrigatorio: true,
    prerequisitos: ['flusistip-fundamentos'],
    personasAlvo: ['backend', 'fullstack'],
    descricao: 'Entidades de dominio, multi-tenant isolation, compliance LGPD/CFM, RBAC 8 personas',
  },
  {
    ordem: 2,
    cursoId: 'flusistip-workflow',
    obrigatorio: true,
    prerequisitos: ['flusistip-dominio'],
    personasAlvo: ['backend', 'fullstack'],
    descricao: 'State machine 7 estados, aprovacao unanime, HITL checkpoints, Kanban SLA',
  },
  {
    ordem: 3,
    cursoId: 'flusistip-llm',
    obrigatorio: false,
    prerequisitos: ['flusistip-dominio'],
    personasAlvo: ['backend', 'ml-ai'],
    descricao: 'Gemini/Claude via Vertex AI, composicao de prompts, cost tracking, fallback chain',
  },
  {
    ordem: 4,
    cursoId: 'flusistip-frontend',
    obrigatorio: false,
    prerequisitos: ['flusistip-fundamentos'],
    personasAlvo: ['frontend', 'fullstack'],
    descricao: 'Reagent, Re-frame (events/subs/fx), routing, componentes Playground/Kanban/HITL',
  },
];

// ============================================================================
// CURSO 0: FUNDAMENTOS E AMBIENTE
// ============================================================================

export const fasesFlusistipFundamentos = [
  {
    id: 1,
    nome: 'Fase 1: Ambiente de Desenvolvimento',
    semanas: '1',
    cor: 'bg-green-500',
    corClara: 'bg-green-50',
    icone: Terminal,
    descricao: 'Instalacao de Clojure 1.12, Java 21, Bun, mise e Datomic Local',
  },
  {
    id: 2,
    nome: 'Fase 2: REPL-First Workflow',
    semanas: '1',
    cor: 'bg-blue-500',
    corClara: 'bg-blue-50',
    icone: Code,
    descricao: 'REPL driven development: eval, reload, test — o fluxo de trabalho core do projeto',
  },
];

export const modulosFlusistipFundamentos = [
  {
    id: '1.1',
    nome: 'Clojure Essencial para o Projeto',
    semana: 1,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Avaliar expressoes Clojure no REPL com confianca',
    temNotas: true,
    namespaceFonte: 'hub.server',
    complexidade: { conceitual: 5, tecnico: 4, dominio: 1, integracao: 1 },
    gotchas: [
      'Sempre usar :reload apos alterar arquivo — REPL stale causa bugs fantasma',
      'Clojure usa kebab-case (nao camelCase) — ex: buscar-por-id',
    ],
    exercicioPratico: 'Conectar nREPL, avaliar (+ 1 2), carregar namespace hub.config, listar feature flags',
  },
  {
    id: '1.2',
    nome: 'Setup Local Completo',
    semana: 1,
    fase: 1,
    duracao: '1 dia',
    entregavel: 'Backend (porta 3000) + Frontend (porta 8080) rodando localmente',
    temNotas: true,
    namespaceFonte: 'hub.db.connection',
    complexidade: { conceitual: 2, tecnico: 4, dominio: 1, integracao: 3 },
    gotchas: [
      'Datomic Local precisa de diretorio data/ — criado via mise run db:create',
      'Bun 1.3.3 especifico via mise — nao usar npm',
      'Shadow-cljs compila CLJS → JS — pode demorar no primeiro build',
    ],
    exercicioPratico: 'Executar mise run dev:all e verificar health check em http://localhost:3000/api/health',
  },
  {
    id: '1.3',
    nome: 'Estrutura do Projeto',
    semana: 1,
    fase: 1,
    duracao: '1 dia',
    entregavel: 'Navegar e explicar cada diretorio principal do projeto',
    temNotas: true,
    namespaceFonte: null,
    complexidade: { conceitual: 3, tecnico: 2, dominio: 2, integracao: 1 },
    gotchas: [
      '119 arquivos fonte — nao tente ler tudo de uma vez',
      '307 .js + 303 .map sao output compilado de shadow-cljs (ignorar)',
      'Documentacao FII-MIN em documentacao-interna/fii-min/ tem 125 docs de funcoes',
    ],
    exercicioPratico: 'Mapear: onde fica dominio? API? DB? Frontend? Testes? Schemas?',
  },
  {
    id: '2.1',
    nome: 'REPL Workflow (6 passos)',
    semana: 1,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Executar fluxo: Design → Plan → Validate(REPL) → Implement → Test → Commit',
    temNotas: true,
    namespaceFonte: 'dev/user.clj',
    complexidade: { conceitual: 4, tecnico: 4, dominio: 1, integracao: 2 },
    gotchas: [
      'nREPL != terminal REPL — usar nREPL com CIDER para hot-reload',
      'Avaliar top-level form = evaluar definicao inteira, nao linha individual',
      'Plan Mode para features complexas — explorar antes de codar',
    ],
    exercicioPratico: 'Modificar hub.config, recarregar no REPL, verificar mudanca sem reiniciar server',
  },
  {
    id: '2.2',
    nome: 'Testes e Validacao L1-L4',
    semana: 1,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Rodar testes Kaocha e entender os 4 niveis de validacao',
    temNotas: true,
    namespaceFonte: 'test/',
    complexidade: { conceitual: 3, tecnico: 3, dominio: 1, integracao: 2 },
    gotchas: [
      'L1(lint clj-kondo) → L2(load require) → L3(test Kaocha) → L4(browser) — NAO pular niveis',
      'ALERTA: 93 deftest com zero assertions (is) — testes podem ser no-ops',
      'Kaocha runner: mise run test — filtra por namespace com mise run test:ns hub.db.schema-test',
    ],
    exercicioPratico: 'Rodar mise run lint && mise run test — corrigir warnings se houver',
  },
];

export const startDateFlusistipFundamentos = new Date(2026, 1, 17);

// ============================================================================
// CURSO 1: DOMINIO HEALTHCARE E MULTI-TENANT
// ============================================================================

export const fasesFlusistipDominio = [
  {
    id: 1,
    nome: 'Fase 1: Modelo de Dominio',
    semanas: '2',
    cor: 'bg-green-500',
    corClara: 'bg-green-50',
    icone: Database,
    descricao: 'Entidades: Tenant, Usuario, Componente, Sistema, Fluxo — e como se relacionam',
  },
  {
    id: 2,
    nome: 'Fase 2: Multi-Tenant e RBAC',
    semanas: '2',
    cor: 'bg-blue-500',
    corClara: 'bg-blue-50',
    icone: Shield,
    descricao: 'Isolamento por tenant em todas as queries, 8 personas com permissoes distintas',
  },
  {
    id: 3,
    nome: 'Fase 3: Compliance Healthcare',
    semanas: '2-3',
    cor: 'bg-purple-500',
    corClara: 'bg-purple-50',
    icone: Lock,
    descricao: 'LGPD Art.11 (dados sensiveis), CFM/CRP, audit trail via imutabilidade Datomic',
  },
];

export const modulosFlusistipDominio = [
  {
    id: '1.1',
    nome: 'Hierarquia de Entidades',
    semana: 2,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Diagrama Tenant→App→Funcao→Fluxo→Sistema→Componente',
    temNotas: true,
    namespaceFonte: 'hub.domain.componente + hub.domain.sistema + hub.domain.fluxo',
    complexidade: { conceitual: 5, tecnico: 3, dominio: 5, integracao: 3 },
    gotchas: [
      'Componente tem 3 tipos: texto-base, contexto, config-llm — NAO confundir',
      'Sistema combina: 1 TextoBase + N Contextos + 0..1 ConfigLLM',
      'Fluxo = lista ORDENADA de Sistemas (ordem importa!)',
    ],
    exercicioPratico: 'No REPL: buscar um sistema, listar seus componentes, verificar tipo de cada um',
  },
  {
    id: '1.2',
    nome: 'Datomic Schemas (12 EDN)',
    semana: 2,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Ler e explicar os 12 schemas EDN e seus atributos',
    temNotas: true,
    namespaceFonte: 'hub.db.schema',
    complexidade: { conceitual: 5, tecnico: 6, dominio: 3, integracao: 3 },
    gotchas: [
      'query-many descarta colunas alem da primeira — usar d/q direto (ADR-364)',
      'Seeds DEVEM ser 100% idempotentes — usar ffirst/first, nunca scalar find (.)',
      'Lookup refs: [:entity/id uuid] para queries por UUID externo',
    ],
    exercicioPratico: 'No REPL: carregar schema, fazer query simples com d/q, comparar com query-many',
  },
  {
    id: '1.3',
    nome: 'Componentes: TextoBase, Contexto, ConfigLLM',
    semana: 2,
    fase: 1,
    duracao: '1 dia',
    entregavel: 'CRUD de componente via REPL com versionamento',
    temNotas: true,
    namespaceFonte: 'hub.domain.componente',
    complexidade: { conceitual: 4, tecnico: 5, dominio: 4, integracao: 3 },
    gotchas: [
      'API aceita :texto-base mas schema usa :componente.tipo/texto-base — conversao automatica',
      'Versionamento SHA-256: cada mudanca gera nova versao com hash',
      'Quotas por tenant: verificar-quota-componentes limita criacao',
    ],
    exercicioPratico: 'Criar texto-base no REPL, incrementar versao, verificar hash de integridade',
  },
  {
    id: '2.1',
    nome: 'Multi-Tenant Isolation',
    semana: 2,
    fase: 2,
    duracao: '2 dias',
    entregavel: 'Implementar query com filtro tenant-id e explicar middleware',
    temNotas: true,
    namespaceFonte: 'hub.domain.tenant + hub.api.middleware.tenant',
    complexidade: { conceitual: 5, tecnico: 5, dominio: 5, integracao: 5 },
    gotchas: [
      'Esquecer tenant-id = DATA LEAKAGE entre tenants — CRITICO em healthcare',
      'Tenant vem de 3 fontes (prioridade): Header X-Tenant-ID > Path param > JWT claims',
      'Middleware injeta :tenant e :tenant-id no request — usar nas queries',
    ],
    exercicioPratico: 'Testar endpoint sem X-Tenant-ID (deve retornar 401), depois com header correto',
  },
  {
    id: '2.2',
    nome: 'RBAC 8 Personas',
    semana: 2,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Explicar permissoes de cada persona e testar acesso',
    temNotas: true,
    namespaceFonte: 'hub.api.middleware.auth',
    complexidade: { conceitual: 4, tecnico: 5, dominio: 4, integracao: 4 },
    gotchas: [
      'Zero-trust: middleware valida TODA request — nao confiar no frontend',
      'JWT serializa keywords como strings — deserializar no middleware',
      'wrap-revisor inclui admin-* + dev-team + revisor-* (BUG-003 fix)',
    ],
    exercicioPratico: 'Login como P2 (ana@clinica-nova.com), tentar acessar /admin/ (deve dar 403)',
  },
  {
    id: '2.3',
    nome: 'Middleware Stack Completo',
    semana: 3,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Explicar ordem: CORS → Logging → JSON → Error → Tenant → Auth → RBAC → Handler',
    temNotas: true,
    namespaceFonte: 'hub.server + hub.api.routes',
    complexidade: { conceitual: 5, tecnico: 6, dominio: 3, integracao: 5 },
    gotchas: [
      'Ordem de middleware IMPORTA — Auth antes de RBAC, Tenant antes de Auth',
      'wrap-optional-auth: procede sem token (anonimo), mas 400 se token invalido',
      'Reitit middleware syntax: {:name ::name :wrap fn} — factory pattern',
    ],
    exercicioPratico: 'Adicionar middleware de logging customizado e ver request flow no terminal',
  },
  {
    id: '3.1',
    nome: 'LGPD Compliance no Codigo',
    semana: 3,
    fase: 3,
    duracao: '1.5 dias',
    entregavel: 'Identificar pontos LGPD no codigo e explicar Art.11',
    temNotas: true,
    namespaceFonte: 'hub.domain.compliance_checklist',
    complexidade: { conceitual: 5, tecnico: 4, dominio: 8, integracao: 4 },
    gotchas: [
      'Dados healthcare = dados SENSIVEIS Art.11 LGPD — tratamento especial obrigatorio',
      'Decision Point: LGPD score >= 70 aciona validacao externa automaticamente',
      'BAA Google Cloud = bloqueador para PHI real (usar dados anonimizados no piloto)',
    ],
    exercicioPratico: 'Listar todos os pontos do codigo que processam dados sensiveis',
  },
  {
    id: '3.2',
    nome: 'Audit Trail via Datomic',
    semana: 3,
    fase: 3,
    duracao: '0.5 dia',
    entregavel: 'Explicar como Datomic garante auditoria pela imutabilidade',
    temNotas: true,
    namespaceFonte: 'hub.domain.assinatura',
    complexidade: { conceitual: 4, tecnico: 5, dominio: 4, integracao: 3 },
    gotchas: [
      'Datomic e naturalmente imutavel — cada transacao e um fato no tempo',
      'Queries temporais (d/as-of, d/history) permitem "viagem no tempo"',
      'Performance: queries history sao mais lentas — usar com cuidado',
    ],
    exercicioPratico: 'Fazer query d/as-of para ver estado de uma entidade em momento passado',
  },
];

export const startDateFlusistipDominio = new Date(2026, 1, 24);

// ============================================================================
// CURSO 2: WORKFLOW ENGINE E HITL
// ============================================================================

export const fasesFlusistipWorkflow = [
  {
    id: 1,
    nome: 'Fase 1: State Machine (7 estados)',
    semanas: '3-4',
    cor: 'bg-green-500',
    corClara: 'bg-green-50',
    icone: GitBranch,
    descricao: 'draft→technical-review→legal-review→revision→approved→published→archived',
  },
  {
    id: 2,
    nome: 'Fase 2: HITL Checkpoints',
    semanas: '4',
    cor: 'bg-blue-500',
    corClara: 'bg-blue-50',
    icone: UserCheck,
    descricao: 'Checkpoints medicos e juridicos, aprovacao unanime, validacao externa',
  },
  {
    id: 3,
    nome: 'Fase 3: Kanban e SLA',
    semanas: '4-5',
    cor: 'bg-purple-500',
    corClara: 'bg-purple-50',
    icone: LayoutDashboard,
    descricao: 'Board 7 colunas, WIP limits, SLA monitoring com alertas progressivos',
  },
];

export const modulosFlusistipWorkflow = [
  {
    id: '1.1',
    nome: 'Estados e Transicoes',
    semana: 3,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Desenhar diagrama de estados com todas transicoes validas',
    temNotas: true,
    namespaceFonte: 'hub.workflow.transitions',
    complexidade: { conceitual: 6, tecnico: 5, dominio: 6, integracao: 3 },
    gotchas: [
      ':archived e estado FINAL — sem transicoes de saida',
      'Nao existe rollback direto :approved→:draft — usar :revision como intermediario',
      'BFS pathfinding: caminho-mais-curto calcula rota entre estados',
    ],
    exercicioPratico: 'No REPL: verificar se transicao :draft→:legal-review e valida (deve ser false)',
  },
  {
    id: '1.2',
    nome: 'Orchestrator',
    semana: 3,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Entender fluxo completo de avancar-estado! com validacoes',
    temNotas: true,
    namespaceFonte: 'hub.workflow.orchestrator',
    complexidade: { conceitual: 7, tecnico: 7, dominio: 8, integracao: 6 },
    gotchas: [
      'Retorna tuplas {:sucesso false :erros [...]} — NAO usa exceptions',
      'Feature flag guards: cfg/feature-enabled? antes de decision points',
      'TODO: history database do Datomic nao implementado ainda (L353)',
    ],
    exercicioPratico: 'Criar workflow via REPL, avancar de :draft para :technical-review',
  },
  {
    id: '1.3',
    nome: 'Decision Points (GAP-002)',
    semana: 4,
    fase: 1,
    duracao: '1 dia',
    entregavel: 'Explicar como score LGPD decide se vai para external-validation',
    temNotas: true,
    namespaceFonte: 'hub.workflow.decision',
    complexidade: { conceitual: 6, tecnico: 5, dominio: 7, integracao: 5 },
    gotchas: [
      'Scores armazenados como strings (flexibilidade de parsing) via :metadado/tipo',
      'Threshold LGPD >= 70 aciona external-validation',
      'Feature flag :decision-point-lgpd deve estar true para funcionar',
    ],
    exercicioPratico: 'Registrar metadado score-lgpd=75, avaliar decision point, ver resultado',
  },
  {
    id: '2.1',
    nome: 'Tipos de Checkpoint HITL',
    semana: 4,
    fase: 2,
    duracao: '1.5 dias',
    entregavel: 'Listar e explicar os 4 tipos de mensagem HITL',
    temNotas: true,
    namespaceFonte: 'hub.agent.hitl',
    complexidade: { conceitual: 6, tecnico: 5, dominio: 7, integracao: 5 },
    gotchas: [
      '4 tipos de HITL message: medical, legal, external, approval',
      'HITL e OBRIGATORIO para todas as decisoes de IA em healthcare',
      'Agent tools definem acoes disponiveis no checkpoint',
    ],
    exercicioPratico: 'Criar checkpoint medico, submeter aprovacao, ver resultado',
  },
  {
    id: '2.2',
    nome: 'Aprovacao Unanime',
    semana: 4,
    fase: 2,
    duracao: '1.5 dias',
    entregavel: 'Implementar cenario de 3 votos com 1 rejeicao',
    temNotas: true,
    namespaceFonte: 'hub.workflow.unanimous',
    complexidade: { conceitual: 6, tecnico: 5, dominio: 8, integracao: 5 },
    gotchas: [
      '3 votos necessarios, TODOS devem aprovar — 1 rejeicao volta para :revision',
      'Apenas :legal-review→:approved requer unanimidade',
      'TODO: buscar nome real do usuario (L189) — atualmente usa ID',
    ],
    exercicioPratico: 'Simular 3 aprovacoes unanimes, depois simular 1 rejeicao e verificar rollback',
  },
  {
    id: '2.3',
    nome: 'Validacao Externa',
    semana: 4,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Explicar fluxo: gerar-link → token JWT → portal externo → callback',
    temNotas: true,
    namespaceFonte: 'hub.api.external.validation + hub.api.external.callback',
    complexidade: { conceitual: 5, tecnico: 6, dominio: 6, integracao: 6 },
    gotchas: [
      'Token JWT com expiracao para validador externo',
      'Portal externo = interface simplificada (P6)',
      'Callback com parecer: aprovar/rejeitar + assinatura digital',
    ],
    exercicioPratico: 'Gerar link de validacao, acessar portal externo, submeter parecer',
  },
  {
    id: '3.1',
    nome: 'Kanban Board 7 Colunas',
    semana: 5,
    fase: 3,
    duracao: '1.5 dias',
    entregavel: 'Explicar mapeamento: estados workflow → colunas kanban',
    temNotas: true,
    namespaceFonte: 'hub.domain.kanban_board + hub.domain.kanban_card',
    complexidade: { conceitual: 4, tecnico: 5, dominio: 5, integracao: 4 },
    gotchas: [
      'Kanban reflete estado do workflow — mover card = avancar estado',
      'WIP limits por coluna — impede acumulo',
      'Feature flag :drag-drop-kanban controla interatividade UI',
    ],
    exercicioPratico: 'Via API: listar board, mover card entre colunas, verificar historico',
  },
  {
    id: '3.2',
    nome: 'SLA Monitoring',
    semana: 5,
    fase: 3,
    duracao: '1 dia',
    entregavel: 'Explicar calculo SLA e 4 niveis de alerta',
    temNotas: true,
    namespaceFonte: 'hub.sla.monitor + hub.sla.alerts',
    complexidade: { conceitual: 4, tecnico: 4, dominio: 5, integracao: 4 },
    gotchas: [
      'SLA status: healthy(>50%) → warning(25-50%) → critical(10-25%) → breached(<0%)',
      'critical-pulsing e variante visual de critical (<10%)',
      'Remaining hours pode ser NEGATIVO (SLA violado)',
    ],
    exercicioPratico: 'Criar card com SLA de 24h, simular passagem de tempo, ver mudanca de status',
  },
  {
    id: '3.3',
    nome: 'Comments e Colaboracao',
    semana: 5,
    fase: 3,
    duracao: '0.5 dia',
    entregavel: 'Adicionar comentario a card e ver thread',
    temNotas: true,
    namespaceFonte: 'hub.api.kanban.comments',
    complexidade: { conceitual: 2, tecnico: 3, dominio: 3, integracao: 3 },
    gotchas: [
      'Comments sao threaded (resposta a resposta)',
      'Historico completo em /kanban/historico/:id',
    ],
    exercicioPratico: 'Criar card, adicionar 3 comments, verificar thread via API',
  },
];

export const startDateFlusistipWorkflow = new Date(2026, 2, 3);

// ============================================================================
// CURSO 3: INTEGRACAO LLM
// ============================================================================

export const fasesFlusistipLLM = [
  {
    id: 1,
    nome: 'Fase 1: Provider Abstraction',
    semanas: '5-6',
    cor: 'bg-green-500',
    corClara: 'bg-green-50',
    icone: Cpu,
    descricao: 'Executor, fallback chain Gemini→Claude→Mock, selecao por tipo de sistema',
  },
  {
    id: 2,
    nome: 'Fase 2: Composicao de Prompts',
    semanas: '6',
    cor: 'bg-blue-500',
    corClara: 'bg-blue-50',
    icone: FileText,
    descricao: 'Placeholder {{var}} resolution, Sistemas tipo A/B/C/D, prompt assembly',
  },
  {
    id: 3,
    nome: 'Fase 3: Custo e Metricas',
    semanas: '6',
    cor: 'bg-purple-500',
    corClara: 'bg-purple-50',
    icone: DollarSign,
    descricao: 'Token counting, cost tracking por execucao, otimizacao 41% via tipos de sistema',
  },
];

export const modulosFlusistipLLM = [
  {
    id: '1.1',
    nome: 'Executor e Fallback Chain',
    semana: 5,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Explicar selecao de provider por tipo de sistema e fallback',
    temNotas: true,
    namespaceFonte: 'hub.llm.executor',
    complexidade: { conceitual: 5, tecnico: 6, dominio: 3, integracao: 6 },
    gotchas: [
      'Chain: Gemini Flash → Gemini Pro → Claude Haiku → Mock',
      'Tipo A(pure)→:gemini, B(+DB)→:gemini, C(+Web)→:gemini, D(complex)→:claude',
      'Mock provider SEMPRE disponivel — feature flag :real-llm-execution controla',
    ],
    exercicioPratico: 'Executar sistema tipo A com mock, depois ativar flag e usar Gemini real',
  },
  {
    id: '1.2',
    nome: 'Gemini Client (Auth + Retry)',
    semana: 5,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Entender autenticacao GCP, safety settings e retry strategy',
    temNotas: true,
    namespaceFonte: 'hub.llm.gemini',
    complexidade: { conceitual: 5, tecnico: 8, dominio: 3, integracao: 7 },
    gotchas: [
      'Auth via ADC (Application Default Credentials) — gcloud auth login',
      'Retry exponencial: 2s → 4s → 8s em 429 (rate limit) e 500/503',
      'Safety settings HIGH para healthcare: DANGEROUS_CONTENT, HARASSMENT, etc',
      'Token invalido: invalidar cache com client/invalidar-token! em 401',
    ],
    exercicioPratico: 'Verificar GCP config com mise run qa:gcp-check, fazer chamada Gemini real',
  },
  {
    id: '2.1',
    nome: 'Placeholders {{var}}',
    semana: 6,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Resolver placeholders de um sistema com contextos',
    temNotas: true,
    namespaceFonte: 'hub.domain.sistema',
    complexidade: { conceitual: 4, tecnico: 5, dominio: 4, integracao: 3 },
    gotchas: [
      'Sintaxe: {{nome-placeholder}} em texto-base',
      'TODOS os placeholders devem estar resolvidos antes de executar',
      'validar-placeholders-resolvidos checa antes da execucao',
    ],
    exercicioPratico: 'Criar texto-base com {{paciente}} e {{diagnostico}}, resolver com contextos',
  },
  {
    id: '2.2',
    nome: 'Sistemas Tipo A/B/C/D',
    semana: 6,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Explicar os 4 tipos e quando usar cada um',
    temNotas: true,
    namespaceFonte: 'hub.domain.sistema',
    complexidade: { conceitual: 4, tecnico: 4, dominio: 5, integracao: 4 },
    gotchas: [
      'A(70%): Pure LLM — $0.075/M tokens — maioria dos casos',
      'B(20%): LLM+DB — $1.25/M — acesso a dados internos',
      'C(8%): LLM+Web — $2.50/M — grounding com dados externos',
      'D(2%): All — $5.00/M — orquestracao complexa',
    ],
    exercicioPratico: 'Criar um sistema de cada tipo e comparar custos de execucao',
  },
  {
    id: '3.1',
    nome: 'Token Counting',
    semana: 6,
    fase: 3,
    duracao: '0.5 dia',
    entregavel: 'Explicar como tokens sao contados e reportados',
    temNotas: true,
    namespaceFonte: 'hub.llm.executor',
    complexidade: { conceitual: 3, tecnico: 4, dominio: 2, integracao: 3 },
    gotchas: [
      'Gemini retorna tokens em :usageMetadata.promptTokenCount + candidatesTokenCount',
      'Custo = (tokens-in * preco-input) + (tokens-out * preco-output)',
      'Resultado estruturado inclui :tokens-in, :tokens-out, :custo, :tempo-ms',
    ],
    exercicioPratico: 'Executar sistema e inspecionar metricas de tokens no resultado',
  },
  {
    id: '3.2',
    nome: 'Cost Tracking e Otimizacao',
    semana: 6,
    fase: 3,
    duracao: '0.5 dia',
    entregavel: 'Calcular economia por tipo de sistema (41% savings)',
    temNotas: true,
    namespaceFonte: 'hub.domain.metricas + hub.billing.external',
    complexidade: { conceitual: 3, tecnico: 3, dominio: 4, integracao: 3 },
    gotchas: [
      'Billing external tem 9 TODOs — nao totalmente implementado',
      '41% savings vem de usar tipo A (barato) para 70% das tasks',
      'TODO: numero sequencial de fatura e persistencia no banco',
    ],
    exercicioPratico: 'Comparar custo de executar mesmo prompt como tipo A vs tipo D',
  },
];

export const startDateFlusistipLLM = new Date(2026, 2, 10);

// ============================================================================
// CURSO 4: FRONTEND RE-FRAME
// ============================================================================

export const fasesFlusistipFrontend = [
  {
    id: 1,
    nome: 'Fase 1: Re-frame Fundamentals',
    semanas: '2-3',
    cor: 'bg-green-500',
    corClara: 'bg-green-50',
    icone: Layers,
    descricao: 'Events, Subscriptions, Views — o padrao unidirecional de dados',
  },
  {
    id: 2,
    nome: 'Fase 2: Componentes UI Core',
    semanas: '3',
    cor: 'bg-blue-500',
    corClara: 'bg-blue-50',
    icone: Layout,
    descricao: 'Playground Editor, Kanban Board, HITL Interface — os 3 componentes principais',
  },
  {
    id: 3,
    nome: 'Fase 3: Rotas e Integracao',
    semanas: '3-4',
    cor: 'bg-purple-500',
    corClara: 'bg-purple-50',
    icone: Route,
    descricao: 'Reitit frontend, guards RBAC, navegacao entre views',
  },
];

export const modulosFlusistipFrontend = [
  {
    id: '1.1',
    nome: 'Events, Subs, Views',
    semana: 2,
    fase: 1,
    duracao: '2 dias',
    entregavel: 'Criar event + subscription + view simples funcionando',
    temNotas: true,
    namespaceFonte: 'hub.events + hub.subs + hub.views',
    complexidade: { conceitual: 6, tecnico: 5, dominio: 2, integracao: 4 },
    gotchas: [
      'NUNCA mutate app-db diretamente — sempre dispatch events',
      'Side effects APENAS em reg-event-fx, NUNCA em reg-event-db',
      '@(rf/subscribe) fora de componente falha silenciosamente',
    ],
    exercicioPratico: 'Adicionar novo event :teste/incrementar, subscription :teste/valor, e view que mostra',
  },
  {
    id: '1.2',
    nome: 'App-db e Estado Global',
    semana: 2,
    fase: 1,
    duracao: '1 dia',
    entregavel: 'Explicar estrutura do app-db e como navegar nele',
    temNotas: true,
    namespaceFonte: 'hub.db',
    complexidade: { conceitual: 5, tecnico: 4, dominio: 3, integracao: 3 },
    gotchas: [
      'App-db e um UNICO atom — toda a state vive la',
      'Subscriptions sao derivadas (computed) — compostas com :<- [:parent-sub]',
      'Nunca armazenar estado derivado no db — usar subscriptions compostas',
    ],
    exercicioPratico: 'Inspecionar app-db via Chrome DevTools, encontrar estado de auth e kanban',
  },
  {
    id: '1.3',
    nome: 'Auth Flow no Frontend',
    semana: 2,
    fase: 1,
    duracao: '1 dia',
    entregavel: 'Explicar fluxo: login → store token → restore session → refetch',
    temNotas: true,
    namespaceFonte: 'hub.auth + hub.events (auth section)',
    complexidade: { conceitual: 5, tecnico: 5, dominio: 3, integracao: 5 },
    gotchas: [
      'Token armazenado em localStorage E em app-db — dupla persistencia',
      'normalizar-usuario converte tipos string → keywords (GAP-TIPO-001)',
      'auth-initializing? flag previne race condition (BUG-NEW-001)',
      'dispatch-later 50ms antes de refetch — espera auth estabilizar',
    ],
    exercicioPratico: 'Login como P2, verificar token no localStorage, recarregar pagina e ver restore',
  },
  {
    id: '2.1',
    nome: 'Playground Editor',
    semana: 3,
    fase: 2,
    duracao: '1.5 dias',
    entregavel: 'Navegar pelo Playground e explicar 3 tabs',
    temNotas: true,
    namespaceFonte: 'hub.components.playground.*',
    complexidade: { conceitual: 5, tecnico: 6, dominio: 4, integracao: 4 },
    gotchas: [
      '1.197 LOC em 4 arquivos — maior componente do frontend',
      'Biblioteca = browser de componentes reusaveis',
      'Pipeline = builder visual de fluxos',
      'Editor = CRUD de sistema individual',
    ],
    exercicioPratico: 'Criar sistema no Playground, adicionar componentes, executar',
  },
  {
    id: '2.2',
    nome: 'Kanban Board',
    semana: 3,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Explicar mapeamento estado→coluna e SLA visual',
    temNotas: true,
    namespaceFonte: 'hub.components.kanban.*',
    complexidade: { conceitual: 4, tecnico: 5, dominio: 5, integracao: 4 },
    gotchas: [
      'SLA bar com cores progressivas: green→yellow→red→pulse',
      'Drag-drop controlado por feature flag',
      'Cards agrupados por coluna via subscription :kanban/cards-by-column',
    ],
    exercicioPratico: 'Visualizar board, clicar em card, ver detalhes e SLA',
  },
  {
    id: '2.3',
    nome: 'HITL Interface',
    semana: 3,
    fase: 2,
    duracao: '1 dia',
    entregavel: 'Usar interface HITL para aprovar/rejeitar checkpoint',
    temNotas: true,
    namespaceFonte: 'hub.components.hitl.interface',
    complexidade: { conceitual: 4, tecnico: 4, dominio: 6, integracao: 4 },
    gotchas: [
      'Interface simplificada para reviewer (P3)',
      'Mostra conteudo gerado por LLM + opcoes aprovar/rejeitar',
      'Subscription :hitl/pending-count mostra badge de pendentes',
    ],
    exercicioPratico: 'Como P3 (carlos@), aprovar um checkpoint pendente',
  },
  {
    id: '3.1',
    nome: 'Routing e Guards RBAC',
    semana: 4,
    fase: 3,
    duracao: '1 dia',
    entregavel: 'Explicar como rotas sao protegidas por role no frontend',
    temNotas: true,
    namespaceFonte: 'hub.routes',
    complexidade: { conceitual: 4, tecnico: 5, dominio: 3, integracao: 4 },
    gotchas: [
      'Reitit frontend com guards por role',
      'Usar :navigate event (nao :set-route) para atualizar URL',
      'Smart refetch: :route/refetch-current recarrega dados da rota atual',
    ],
    exercicioPratico: 'Navegar entre /playground, /kanban, /admin — verificar guards RBAC',
  },
];

export const startDateFlusistipFrontend = new Date(2026, 1, 24);
