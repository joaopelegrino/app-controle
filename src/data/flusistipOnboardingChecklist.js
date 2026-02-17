/**
 * FluSisTip Onboarding - Checklists por Persona
 *
 * Gerado por: Diagnostico Forense TrainB2B v1.0
 * Data: 2026-02-17
 *
 * CONTEXTO LLM (zero-context resume):
 * Checklists semanais com entregaveis verificaveis para 4 perfis de contratado.
 * Cada item tem verificacao objetiva (pode ser validado por mentor).
 * Baseado no diagnostico forense de 47.390 LOC do projeto FluSisTip.
 */

export const checklistOnboarding = {
  // ============================================================================
  // DEV PLENO BACKEND (Perfil mais comum)
  // ============================================================================
  'dev-pleno-backend': {
    titulo: 'Dev Pleno Backend (Clojure)',
    duracao: '6 semanas',
    cursos: ['flusistip-fundamentos', 'flusistip-dominio', 'flusistip-workflow', 'flusistip-llm'],
    semana1: {
      titulo: 'Ambiente + Stack + Hello REPL',
      items: [
        { item: 'Instalar Clojure 1.12, Java 21, Bun 1.3.3 via mise', verificacao: 'mise list mostra versoes corretas' },
        { item: 'Clonar repo e instalar dependencias', verificacao: 'mise run install completa sem erro' },
        { item: 'Subir backend + frontend localmente', verificacao: 'curl http://localhost:3000/api/health retorna ok' },
        { item: 'Conectar nREPL e avaliar expressao', verificacao: '(+ 1 2) retorna 3 no REPL' },
        { item: 'Carregar namespace hub.config no REPL', verificacao: '(cfg/list-features) retorna 4 feature flags' },
        { item: 'Rodar suite de testes', verificacao: 'mise run test completa (mesmo com warnings)' },
        { item: 'Fazer primeiro commit (doc/typo fix)', verificacao: 'PR aberto, revisado e mergeado' },
      ],
    },
    semana2: {
      titulo: 'Dominio e Entidades',
      items: [
        { item: 'Desenhar diagrama de entidades do dominio', verificacao: 'Diagrama revisado pelo mentor' },
        { item: 'Ler os 12 schemas Datomic EDN', verificacao: 'Explicar atributos de componente, sistema, fluxo' },
        { item: 'Fazer query Datomic no REPL (d/q)', verificacao: 'Listar todos os tenants via query' },
        { item: 'Entender diferenca query-many vs d/q', verificacao: 'Explicar bug ADR-364 e solucao' },
        { item: 'Login como cada persona (P1-P5)', verificacao: 'Testar 5 credenciais no browser' },
        { item: 'Testar isolamento multi-tenant', verificacao: 'Request sem X-Tenant-ID retorna 401' },
      ],
    },
    semana3: {
      titulo: 'Workflow + Primeiro Feature PR',
      items: [
        { item: 'Desenhar state machine de 7 estados', verificacao: 'Diagrama com transicoes corretas' },
        { item: 'Criar workflow via REPL e avancar estados', verificacao: ':draft → :technical-review via REPL' },
        { item: 'Entender Decision Points (LGPD)', verificacao: 'Explicar threshold score >= 70' },
        { item: 'Implementar feature do roadmap (task simples)', verificacao: 'PR aprovado com testes' },
      ],
    },
    semana4: {
      titulo: 'LLM + HITL',
      items: [
        { item: 'Executar sistema com mock LLM', verificacao: 'Resultado com :sucesso true e metricas' },
        { item: 'Ativar Gemini real e executar', verificacao: 'mise run qa:llm-on + execucao real' },
        { item: 'Explicar fallback chain', verificacao: 'Descrever Gemini→Claude→Mock' },
        { item: 'Aprovar checkpoint HITL como P3', verificacao: 'Login carlos@, aprovar pendente' },
      ],
    },
    semana5: {
      titulo: 'Feature Completa + Code Review',
      items: [
        { item: 'Implementar feature complexa (multi-arquivo)', verificacao: 'PR com 3+ arquivos modificados' },
        { item: 'Fazer code review de colega', verificacao: 'Review util submetido' },
        { item: 'Resolver bug em area desconhecida', verificacao: 'Bug fix com root cause documentado' },
      ],
    },
    semana6: {
      titulo: 'Autonomia + Mentoria',
      items: [
        { item: 'Contribuicao significativa ao projeto', verificacao: 'Feature em producao' },
        { item: 'Documentar algo que aprendeu', verificacao: 'FII-MIN doc ou ADR escrito' },
        { item: 'Apresentar aprendizados para equipe', verificacao: 'Lightning talk de 10min' },
      ],
    },
  },

  // ============================================================================
  // DEV PLENO FRONTEND (ClojureScript/Re-frame)
  // ============================================================================
  'dev-pleno-frontend': {
    titulo: 'Dev Pleno Frontend (ClojureScript/Re-frame)',
    duracao: '5 semanas',
    cursos: ['flusistip-fundamentos', 'flusistip-frontend'],
    semana1: {
      titulo: 'Ambiente + ClojureScript Basics',
      items: [
        { item: 'Setup completo (backend + frontend)', verificacao: 'http://localhost:8080 carrega app' },
        { item: 'Entender Shadow-cljs build pipeline', verificacao: 'Explicar como CLJS compila para JS' },
        { item: 'Conectar REPL ClojureScript', verificacao: 'Avaliar expressao no browser via REPL' },
        { item: 'Navegar pelo app como cada persona', verificacao: 'Login P1-P5, navegar por todas as rotas' },
        { item: 'Inspecionar app-db via Chrome DevTools', verificacao: 'Encontrar estado de auth e kanban' },
      ],
    },
    semana2: {
      titulo: 'Re-frame Pattern + Events/Subs',
      items: [
        { item: 'Criar event + subscription + view simples', verificacao: 'Componente customizado funcionando' },
        { item: 'Entender ciclo: dispatch → event → db → sub → view', verificacao: 'Explicar com exemplo real' },
        { item: 'Ler events.cljs (1.348 LOC) e categorizar', verificacao: 'Listar 12 categorias de events' },
        { item: 'Entender auth flow (BUG-NEW-001 fix)', verificacao: 'Explicar auth-initializing? flag' },
      ],
    },
    semana3: {
      titulo: 'Componentes Core',
      items: [
        { item: 'Navegar pelo Playground (3 tabs)', verificacao: 'Criar sistema via UI' },
        { item: 'Usar Kanban Board (mover cards)', verificacao: 'Mover card entre colunas' },
        { item: 'Usar HITL Interface (aprovar checkpoint)', verificacao: 'Aprovar pendente como P3' },
        { item: 'Implementar componente UI novo', verificacao: 'PR com componente + events + subs' },
      ],
    },
    semana4: {
      titulo: 'Feature Completa',
      items: [
        { item: 'Implementar feature com routing RBAC', verificacao: 'Rota protegida por role' },
        { item: 'Code review de PR frontend', verificacao: 'Review util com sugestoes Re-frame' },
        { item: 'Resolver bug visual ou de estado', verificacao: 'Bug fix com hot-reload verificado' },
      ],
    },
    semana5: {
      titulo: 'Autonomia',
      items: [
        { item: 'Feature independente entregue', verificacao: 'Feature em producao' },
        { item: 'Documentar padrao Re-frame aprendido', verificacao: 'Doc atualizado' },
      ],
    },
  },

  // ============================================================================
  // DEV SENIOR FULL-STACK (Foco em arquitetura)
  // ============================================================================
  'dev-senior-fullstack': {
    titulo: 'Dev Senior Full-Stack',
    duracao: '4 semanas',
    cursos: ['flusistip-fundamentos', 'flusistip-dominio', 'flusistip-workflow', 'flusistip-llm', 'flusistip-frontend'],
    semana1: {
      titulo: 'Imersao Rapida + Arquitetura',
      items: [
        { item: 'Setup completo em 2h', verificacao: 'Full-stack rodando' },
        { item: 'Ler CLAUDE.md (1.785 linhas)', verificacao: 'Resumir ADRs e convencoes' },
        { item: 'Mapear todas as 7 camadas da arquitetura', verificacao: 'Diagrama completo' },
        { item: 'Identificar hotspots e divida tecnica', verificacao: 'Lista de top 5 riscos' },
        { item: 'Avaliar cobertura de testes', verificacao: 'Report sobre 93 deftest sem assertions' },
      ],
    },
    semana2: {
      titulo: 'Dominio Profundo + State Machine',
      items: [
        { item: 'Entender todos os 21 domain files', verificacao: 'Explicar cada entidade' },
        { item: 'Dominar workflow orchestrator (820 LOC)', verificacao: 'Explicar decision points' },
        { item: 'Auditar middleware stack de seguranca', verificacao: 'Report de gaps encontrados' },
        { item: 'Primeiro PR arquitetural', verificacao: 'Refactoring ou fix estrutural' },
      ],
    },
    semana3: {
      titulo: 'LLM + Frontend + Cross-cutting',
      items: [
        { item: 'Entender LLM integration e cost model', verificacao: 'Calcular custo por workflow' },
        { item: 'Auditar frontend events.cljs', verificacao: 'Proposta de decomposicao' },
        { item: 'Implementar feature cross-cutting', verificacao: 'PR tocando backend + frontend' },
      ],
    },
    semana4: {
      titulo: 'Lideranca Tecnica',
      items: [
        { item: 'Propor ADR para melhoria arquitetural', verificacao: 'ADR escrito e discutido' },
        { item: 'Mentorar junior/pleno', verificacao: 'Pair programming session' },
        { item: 'Apresentar tech talk sobre a arquitetura', verificacao: 'Apresentacao de 30min' },
      ],
    },
  },

  // ============================================================================
  // QA ENGINEER (Foco em testes e validacao)
  // ============================================================================
  'qa-engineer': {
    titulo: 'QA Engineer',
    duracao: '3 semanas',
    cursos: ['flusistip-fundamentos', 'flusistip-dominio'],
    semana1: {
      titulo: 'Ambiente + Fluxos de Usuario',
      items: [
        { item: 'Setup completo (backend + frontend + Chrome MCP)', verificacao: 'mise run dev:e2e funciona' },
        { item: 'Login como cada persona (P1-P5)', verificacao: 'Screenshots de cada dashboard' },
        { item: 'Executar smoke test do Iniciarqae2e.md', verificacao: 'Checklist completo' },
        { item: 'Entender 4 planos de validacao E2E', verificacao: 'Listar cenarios por plano' },
      ],
    },
    semana2: {
      titulo: 'Validacao E2E Completa',
      items: [
        { item: 'Executar PERSONAS E2E (6 cenarios)', verificacao: 'Relatorio com PASS/FAIL' },
        { item: 'Executar FLUXO E2E (5 cenarios)', verificacao: 'Relatorio com PASS/FAIL' },
        { item: 'Executar HITL E2E (10 cenarios)', verificacao: 'Relatorio com PASS/FAIL' },
        { item: 'Documentar bugs encontrados', verificacao: 'Bugs reportados em formato padrao' },
      ],
    },
    semana3: {
      titulo: 'Automacao e Cobertura',
      items: [
        { item: 'Escrever teste automatizado para cenario novo', verificacao: 'Teste passando no CI' },
        { item: 'Investigar 93 deftest sem assertions', verificacao: 'Report de cobertura real' },
        { item: 'Propor melhorias na estrategia de testes', verificacao: 'Documento de proposta' },
      ],
    },
  },
};

// ============================================================================
// METRICAS DO CHECKLIST
// ============================================================================

export const checklistMetricas = {
  perfis: 4,
  totalItems: {
    'dev-pleno-backend': 27,
    'dev-pleno-frontend': 18,
    'dev-senior-fullstack': 15,
    'qa-engineer': 11,
  },
  tempoTotal: {
    'dev-pleno-backend': '6 semanas',
    'dev-pleno-frontend': '5 semanas',
    'dev-senior-fullstack': '4 semanas',
    'qa-engineer': '3 semanas',
  },
};
