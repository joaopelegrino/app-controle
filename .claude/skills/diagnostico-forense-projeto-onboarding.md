# Skill: Diagnostico Forense de Projeto para Criacao de Estrutura de Onboarding

**Descricao:** Executa analise forense profunda de qualquer projeto de software, mapeando stack, arquitetura, dominios, complexidade e personas para gerar automaticamente trilhas de treinamento de onboarding na plataforma TrainB2B (app-controle). Transforma conhecimento tacito de codebase em estrutura pedagogica formal.

---

## Entrada Esperada

```
<projeto>
path: [Caminho absoluto do projeto, ex: /home/notebook/workspace/flusistip/]
</projeto>

<metadados_projeto>
nome: [Nome do projeto]
empresa: [Nome da empresa/tenant]
idioma_principal: [pt-BR, en-US, es-ES]
prazo_onboarding: [semanas disponiveis para onboarding]
perfil_contratado: [junior|pleno|senior]
areas_prioritarias: [backend, frontend, devops, dominio, todas]
</metadados_projeto>
```

---

## Processo de Diagnostico Forense (7 Fases)

### Fase 1: Reconhecimento Inicial (Recon)

**Objetivo:** Mapear superficie do projeto sem executar codigo.

**Acoes:**
```bash
# 1.1 Estrutura de diretorios (profundidade 3)
find <path> -maxdepth 3 -type d | head -100

# 1.2 Contagem de arquivos por extensao
find <path> -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -20

# 1.3 Tamanho total e distribuicao
du -sh <path>/*/

# 1.4 Historico git (frequencia de commits, contribuidores)
git -C <path> log --oneline --since="6 months ago" | wc -l
git -C <path> shortlog -sn --since="6 months ago"

# 1.5 Idade do projeto
git -C <path> log --reverse --format="%ai" | head -1
```

**Artefatos extraidos:**
| Item | Fonte | Indica |
|------|-------|--------|
| Linguagens | Extensoes de arquivo | Stack tecnico |
| Tamanho | LOC por diretorio | Complexidade relativa |
| Atividade | Frequencia de commits | Areas quentes/frias |
| Contribuidores | git shortlog | Bus factor / silos |
| Idade | Primeiro commit | Divida tecnica potencial |

### Fase 2: Arqueologia de Codigo (Code Archaeology)

**Objetivo:** Identificar camadas arquiteturais, padroes e decisoes tecnicas.

**Acoes:**
1. Ler arquivos de configuracao raiz:
   - `package.json` / `deps.edn` / `Cargo.toml` / `go.mod` / `requirements.txt`
   - `.mise.toml` / `Makefile` / `docker-compose.yml`
   - `CLAUDE.md` / `README.md` / `.claude/` (se existir)

2. Identificar camadas arquiteturais:
   - **Apresentacao:** `src/components/`, `frontend/`, `views/`, `pages/`
   - **API/Rotas:** `routes/`, `api/`, `controllers/`, `handlers/`
   - **Dominio:** `domain/`, `models/`, `entities/`, `services/`
   - **Persistencia:** `db/`, `repositories/`, `migrations/`, `schemas/`
   - **Infraestrutura:** `config/`, `middleware/`, `auth/`, `integrations/`

3. Mapear padroes arquiteturais:
   | Padrao | Indicadores no Codigo |
   |--------|----------------------|
   | MVC | controllers/ + models/ + views/ |
   | DDD | domain/ com entidades ricas |
   | Event Sourcing | imutabilidade, event log, audit trail |
   | CQRS | separacao commands/queries |
   | Microservicos | multiplos package.json/deps.edn |
   | Monolito | unico ponto de entrada |
   | Multi-Tenant | tenant_id em queries, middleware isolamento |
   | RBAC | roles, permissions, guards |
   | State Machine | estados, transicoes, workflows |
   | Feature Flags | flags, toggles, config condicional |

4. Extrair decisoes arquiteturais (ADRs):
   - Buscar em `docs/adr/`, `CLAUDE.md`, `README.md`
   - Inferir de padroes no codigo se nao documentados

### Fase 3: Mapeamento de Dominio (Domain Mapping)

**Objetivo:** Entender o negocio por tras do codigo.

**Acoes:**
1. Identificar **Entidades de Dominio** (substantivos recorrentes):
   ```
   Buscar em: nomes de arquivos, classes, tabelas, schemas
   Resultado: Lista hierarquica de entidades e relacionamentos
   ```

2. Construir **Mapa de Contextos Delimitados** (Bounded Contexts):
   ```
   Para cada diretorio principal:
   - Qual sub-dominio ele representa?
   - Quais entidades sao "donas" desse contexto?
   - Como se comunica com outros contextos?
   ```

3. Identificar **Regras de Negocio Criticas**:
   - Validacoes complexas (if/when com muitas condicoes)
   - State machines (transicoes de estado)
   - Calculos financeiros/metricas
   - Compliance/regulatorio (LGPD, HIPAA, SOX)

4. Mapear **Fluxos de Dados**:
   ```
   Input → Processamento → Output
   Usuario → API → Dominio → DB → Resposta
   ```

### Fase 4: Analise de Complexidade (Complexity Scoring)

**Objetivo:** Classificar cada area por dificuldade de aprendizado.

**Matriz de Complexidade:**

| Dimensao | Peso | Criterios |
|----------|------|-----------|
| **Conceitual** | 30% | Quantos conceitos novos o dev precisa aprender |
| **Tecnico** | 25% | Profundidade de stack/framework necessaria |
| **Dominio** | 25% | Conhecimento de negocio necessario |
| **Integracao** | 20% | Dependencias entre modulos/servicos |

**Escala de Scoring:**

| Score | Nivel | Tempo Estimado | Descricao |
|-------|-------|----------------|-----------|
| 1-2 | Basico | 1-2 dias | Codigo auto-explicativo, padrao CRUD |
| 3-4 | Intermediario | 3-5 dias | Requer entender contexto, patterns |
| 5-6 | Avancado | 1-2 semanas | Regras complexas, multi-camada |
| 7-8 | Especialista | 2-4 semanas | Dominio profundo + tecnico |
| 9-10 | Critico | 1+ mes | Compliance, seguranca, arquitetura core |

**Aplicar scoring para cada namespace/modulo:**
```
[namespace] → Conceitual: X | Tecnico: Y | Dominio: Z | Integracao: W | TOTAL: N
```

### Fase 5: Mapeamento de Personas e Jornadas de Onboarding

**Objetivo:** Definir quem precisa aprender o que.

**Personas de Onboarding (por perfil de contratado):**

| Persona | Foco | Profundidade | Prazo Tipico |
|---------|------|-------------|-------------|
| **Dev Junior Backend** | CRUD, testes, git flow | Basico-Intermediario | 4-6 semanas |
| **Dev Junior Frontend** | Componentes, estado, rotas | Basico-Intermediario | 4-6 semanas |
| **Dev Pleno Full-Stack** | Arquitetura, dominio, integracao | Intermediario-Avancado | 3-4 semanas |
| **Dev Senior** | ADRs, decisoes, trade-offs, mentoria | Avancado-Especialista | 2-3 semanas |
| **Tech Lead** | Visao sistemica, roadmap, riscos | Especialista-Critico | 1-2 semanas |
| **QA Engineer** | Fluxos, edge cases, testes E2E | Intermediario | 3-4 semanas |
| **DevOps/SRE** | Infra, deploy, monitoring, seguranca | Avancado | 2-3 semanas |
| **Product Owner** | Dominio, personas, metricas | Dominio-heavy | 1-2 semanas |

**Jornada padrao (4 semanas):**
```
Semana 1: Ambiente + Stack + Hello World (Fase Fundamentos)
Semana 2: Dominio + Arquitetura + Primeiro PR (Fase Imersao)
Semana 3: Feature completa + Code Review (Fase Autonomia)
Semana 4: Mentoria + Contribuicao real (Fase Integracao)
```

### Fase 6: Identificacao de Gaps de Conhecimento

**Objetivo:** Detectar o que NAO esta documentado mas e essencial.

**Checklist de Gaps:**

| Area | Pergunta-Chave | Fonte de Verdade |
|------|---------------|------------------|
| Setup | Como subir o ambiente do zero? | README, .mise.toml, docker-compose |
| Arquitetura | Por que X e nao Y? | ADRs, CLAUDE.md, commits |
| Dominio | O que faz o sistema no mundo real? | Docs de negocio, personas |
| Debugging | Como investigar problemas? | Logs, monitoring, troubleshooting |
| Deploy | Como vai para producao? | CI/CD, scripts, checklists |
| Seguranca | O que NAO fazer? | Security rules, OWASP |
| Gotchas | Armadilhas comuns? | Issues, PRs antigos, post-mortems |
| Tribal Knowledge | O que so "os antigos" sabem? | Entrevistas, code comments |

**Metodo de Extracao de Tribal Knowledge:**
1. Analisar commits com mensagens longas (decisoes)
2. Ler issues/PRs com discussoes extensas
3. Buscar `TODO`, `HACK`, `FIXME`, `XXX`, `WORKAROUND` no codigo
4. Identificar codigo com alta rotacao (muitos commits no mesmo arquivo)
5. Mapear dependencias nao-obvias (imports cruzados)

### Fase 7: Sintese e Geracao de Estrutura de Curso

**Objetivo:** Transformar diagnostico em trilha de onboarding TrainB2B.

**Regras de Conversao:**

| Diagnostico | Artefato TrainB2B |
|-------------|-------------------|
| Bounded Context | CURSO (1 curso por contexto) |
| Camada Arquitetural | FASE (dentro do curso) |
| Modulo/Namespace | MODULO (aula individual) |
| Regra de Negocio | TOPICO (dentro da aula) |
| Gotcha/Tribal Knowledge | FLASH CARD |
| Fluxo de Dados | EXERCICIO PRATICO |
| ADR/Decisao | NOTA COMPLEMENTAR |

---

## Saidas Geradas

### 1. Relatorio Forense (Markdown)

```markdown
# Diagnostico Forense: [Nome do Projeto]

## Sumario Executivo
- Stack: [linguagens, frameworks, bancos]
- Complexidade Geral: [1-10]
- LOC Total: [N]
- Arquivos: [N]
- Idade: [N meses]
- Contribuidores ativos: [N]

## Mapa Arquitetural
[Diagrama ASCII ou descricao das camadas]

## Entidades de Dominio
[Hierarquia de entidades com cardinalidade]

## Matriz de Complexidade por Modulo
[Tabela com scoring]

## Gaps de Conhecimento Identificados
[Lista priorizada]

## Trilha de Onboarding Recomendada
[Estrutura de cursos gerada]
```

### 2. Registro dos Cursos (PostgreSQL/NocoDB)

```sql
-- Trilha de Onboarding: [Projeto]
-- Gerar 1 curso por bounded context + 1 curso fundacional

-- Curso 0: Fundamentos e Setup
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  '[projeto]-fundamentos',
  '[Projeto] - Fundamentos e Ambiente',
  'Setup do ambiente, stack overview e primeiro deploy local',
  '[emoji]',
  [horas],
  [modulos],
  'beginner',
  'in-development',
  'onboarding',
  0
);

-- Curso N: [Bounded Context]
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  '[projeto]-[contexto-slug]',
  '[Projeto] - [Nome do Contexto]',
  '[Descricao do que cobre]',
  '[emoji]',
  [horas],
  [modulos],
  '[beginner|intermediate|advanced]',
  'in-development',
  'onboarding',
  [N]
);
```

### 3. Arquivo de Dados de Aprendizagem (src/data/{projeto}OnboardingData.js)

```javascript
import { [Icons] } from 'lucide-react';

// Metadados do diagnostico forense
export const diagnosticoForense = {
  projeto: '[nome]',
  dataAnalise: '[YYYY-MM-DD]',
  complexidadeGeral: [1-10],
  locTotal: [N],
  stackPrincipal: '[stack]',
  tempoOnboardingEstimado: '[N semanas]',
  cursosGerados: [N],
  modulosTotais: [N]
};

// Trilha de Onboarding (sequencia de cursos)
export const trilhaOnboarding = [
  {
    ordem: 0,
    cursoId: '[projeto]-fundamentos',
    obrigatorio: true,
    prerequisitos: [],
    personasAlvo: ['todos'],
    descricao: 'Setup do ambiente e overview da arquitetura'
  },
  {
    ordem: 1,
    cursoId: '[projeto]-[contexto-1]',
    obrigatorio: true,
    prerequisitos: ['[projeto]-fundamentos'],
    personasAlvo: ['backend', 'fullstack'],
    descricao: '[Descricao do contexto 1]'
  },
  // ... repetir para cada curso
];

// Fases do curso (camadas arquiteturais → fases)
export const fases{Projeto}{Curso} = [
  {
    id: 1,
    nome: "Fase 1: [Camada/Conceito]",
    semanas: "1-N",
    cor: "bg-green-500",
    corClara: "bg-green-50",
    icone: [IconComponent],
    descricao: "[O que sera coberto nesta fase]",
    complexidade: [1-10],
    prerequisitoConceitual: "[O que o dev ja deve saber]"
  },
  // ... repetir para cada fase
];

// Modulos (namespaces → modulos)
export const modulos{Projeto}{Curso} = [
  {
    id: '1.1',
    nome: '[Titulo do Modulo]',
    semana: 1,
    fase: 1,
    duracao: '1 semana',
    entregavel: '[O que o dev deve conseguir fazer apos este modulo]',
    temNotas: true,
    namespaceFonte: '[namespace original no projeto]',
    complexidade: { conceitual: N, tecnico: N, dominio: N, integracao: N },
    gotchas: ['[armadilha 1]', '[armadilha 2]'],
    exercicioPratico: '[descricao do exercicio hands-on]'
  },
  // ... repetir para cada modulo
];
```

### 4. Componente de Conteudo (src/components/{Projeto}OnboardingNotesView.jsx)

```jsx
const sections = [
  {
    id: 'setup-ambiente',
    title: 'Setup do Ambiente',
    subtitle: 'Do zero ao primeiro build',
    icon: Terminal,
    color: 'bg-green-500'
  },
  {
    id: 'arquitetura-overview',
    title: 'Visao Geral da Arquitetura',
    subtitle: 'Camadas, padroes e decisoes',
    icon: Layers,
    color: 'bg-blue-500'
  },
  {
    id: 'dominio-negocio',
    title: 'Dominio de Negocio',
    subtitle: 'O que o sistema resolve no mundo real',
    icon: Briefcase,
    color: 'bg-purple-500'
  },
  {
    id: 'gotchas-tribal',
    title: 'Gotchas e Tribal Knowledge',
    subtitle: 'O que so os antigos sabem',
    icon: AlertTriangle,
    color: 'bg-orange-500'
  },
  // ... repetir para cada secao
];
```

### 5. Flash Cards de Onboarding

```javascript
export const flashCardsOnboarding = [
  // Categoria: Setup
  {
    id: 1,
    pergunta: "[Pergunta sobre setup/ambiente]",
    resposta: "[Resposta com comando ou procedimento]",
    categoria: "setup",
    dificuldade: "facil",
    fonte: "[arquivo ou doc de origem]"
  },
  // Categoria: Arquitetura
  {
    id: 2,
    pergunta: "[Por que usamos X em vez de Y?]",
    resposta: "[Razao da decisao arquitetural - extraida de ADR]",
    categoria: "arquitetura",
    dificuldade: "medio",
    fonte: "[ADR ou commit]"
  },
  // Categoria: Gotchas
  {
    id: 3,
    pergunta: "[Armadilha comum ao trabalhar com Z]",
    resposta: "[Como evitar + solucao]",
    categoria: "gotcha",
    dificuldade: "dificil",
    fonte: "[issue, PR, ou comentario no codigo]"
  },
  // Gerar 5-10 cards por modulo
];
```

### 6. Checklist de Onboarding (por persona)

```javascript
export const checklistOnboarding = {
  'dev-junior-backend': {
    semana1: [
      { item: 'Clonar repositorio e instalar dependencias', verificacao: 'bun install funciona' },
      { item: 'Subir ambiente local completo', verificacao: 'App rodando em localhost' },
      { item: 'Executar suite de testes', verificacao: 'Todos testes passando' },
      { item: 'Fazer primeiro commit (typo fix ou doc)', verificacao: 'PR aberto e mergeado' },
    ],
    semana2: [
      { item: 'Entender modelo de dominio', verificacao: 'Desenhar diagrama de entidades' },
      { item: 'Navegar pelas camadas da arquitetura', verificacao: 'Explicar fluxo request→response' },
      { item: 'Implementar CRUD simples', verificacao: 'Feature entregue com testes' },
    ],
    semana3: [
      { item: 'Implementar feature com regra de negocio', verificacao: 'PR aprovado' },
      { item: 'Fazer code review de colega', verificacao: 'Review util submetido' },
      { item: 'Resolver bug em area desconhecida', verificacao: 'Bug fix com root cause documentado' },
    ],
    semana4: [
      { item: 'Contribuicao significativa ao projeto', verificacao: 'Feature completa em producao' },
      { item: 'Documentar algo que aprendeu', verificacao: 'Doc/ADR escrito' },
      { item: 'Mentorar proximo onboarding', verificacao: 'Pair programming com novo dev' },
    ]
  },
  // ... repetir para cada persona
};
```

---

## Esquema de Cores por Tipo de Conteudo

| Tipo de Conteudo | Cor Tailwind | Uso |
|------------------|--------------|-----|
| Setup/Ambiente | green-500 | Instalacao, configuracao, hello world |
| Stack/Tecnologia | blue-500 | Linguagem, framework, ferramentas |
| Dominio/Negocio | purple-500 | Regras, entidades, fluxos |
| Arquitetura/Padroes | indigo-500 | ADRs, patterns, camadas |
| Gotchas/Tribal | orange-500 | Armadilhas, workarounds, dicas |
| Seguranca/Compliance | red-500 | OWASP, LGPD, autenticacao |
| DevOps/Deploy | cyan-500 | CI/CD, monitoring, infra |
| Exercicios/Pratica | amber-500 | Hands-on, labs, desafios |

---

## Icones Recomendados por Area (lucide-react)

| Area de Onboarding | Icone |
|--------------------|-------|
| Setup Ambiente | Terminal |
| Arquitetura | Layers |
| Dominio/Negocio | Briefcase |
| Backend | Server |
| Frontend | Layout |
| API/Rotas | Route |
| Database | Database |
| Autenticacao | Shield |
| Testes | TestTube |
| Deploy/CI | Rocket |
| Gotchas | AlertTriangle |
| Tribal Knowledge | BookMarked |
| Performance | Zap |
| Seguranca | Lock |
| Exercicio Pratico | Hammer |
| Code Review | GitPullRequest |
| Monitoramento | Activity |
| Documentacao | FileText |

---

## Validacoes Obrigatorias

### 1. Cobertura de Diagnostico

- [ ] Todas as linguagens do projeto foram identificadas
- [ ] Todas as camadas arquiteturais foram mapeadas
- [ ] Todas as entidades de dominio foram listadas
- [ ] Complexidade foi pontuada para cada modulo
- [ ] Gaps de conhecimento foram documentados
- [ ] Gotchas e tribal knowledge foram extraidos

### 2. Consistencia da Trilha

- [ ] Curso fundacional (setup) sempre existe como primeiro
- [ ] Prerequisitos formam DAG (sem ciclos)
- [ ] Cada persona tem pelo menos 1 trilha completa
- [ ] Total de semanas respeita prazo_onboarding informado
- [ ] Dificuldade e progressiva (basico → avancado)

### 3. Balanceamento Pedagogico

- [ ] 3-6 cursos por trilha de onboarding
- [ ] 3-5 fases por curso
- [ ] 3-5 modulos por fase
- [ ] 3-6 topicos por modulo
- [ ] 5-10 flash cards por modulo
- [ ] 1 exercicio pratico por modulo (minimo)

### 4. Rastreabilidade

- [ ] Cada modulo referencia namespace/arquivo fonte
- [ ] Cada flash card referencia fonte (arquivo, ADR, issue)
- [ ] Cada gotcha tem solucao documentada
- [ ] Exercicios praticos sao executaveis no ambiente local

---

## Exemplo Completo: Projeto FluSisTip

### Dados de Entrada

```
<projeto>
path: /home/notebook/workspace/flusistip/
</projeto>

<metadados_projeto>
nome: FluSisTip
empresa: Clinica Nova (tenant piloto)
idioma_principal: pt-BR
prazo_onboarding: 6
perfil_contratado: pleno
areas_prioritarias: todas
</metadados_projeto>
```

### Resultado da Fase 1 (Recon)

```
Stack: Clojure 1.12 + ClojureScript + Datomic + React 18 (Reagent/Re-frame)
LOC Total: ~44,206 (26,500 backend + 8,687 frontend + testes)
Arquivos: 119 fonte (89 .clj + 30 .cljs)
Idade: ~4 meses
Contribuidores: 1-2
Complexidade Geral: 8/10 (MUITO ALTA)
```

### Resultado da Fase 2 (Arqueologia)

**Padroes Identificados:**
- DDD (Domain-Driven Design) - `src/hub/domain/` com 21 entidades ricas
- Event Sourcing - Datomic (imutabilidade nativa)
- CQRS parcial - queries separadas de transactions
- Multi-Tenant - `tenant-id` em todas as queries
- State Machine - 7 estados no workflow
- RBAC - 8 personas com permissoes distintas
- Feature Flags - 4 flags ativas
- HITL (Human-in-the-Loop) - checkpoints obrigatorios

**Camadas:**
```
API (Ring/Reitit) → Domain (pure functions) → DB (Datomic) → LLM (Vertex AI)
     ↑                                                              ↓
Frontend (Re-frame) ← WebSocket/HTTP ← Notifications ← HITL Checkpoints
```

### Resultado da Fase 4 (Matriz de Complexidade)

| Modulo | Conceitual | Tecnico | Dominio | Integracao | TOTAL |
|--------|-----------|---------|---------|-----------|-------|
| domain/workflow_comment | 2 | 3 | 2 | 2 | **2.3** |
| domain/componente | 3 | 3 | 3 | 2 | **2.8** |
| domain/usuario | 2 | 3 | 3 | 3 | **2.8** |
| domain/tenant | 3 | 4 | 3 | 3 | **3.3** |
| db/queries | 4 | 5 | 3 | 3 | **3.8** |
| api/playground/* | 3 | 4 | 4 | 4 | **3.8** |
| notifications/* | 3 | 3 | 4 | 5 | **3.8** |
| domain/kanban_board | 4 | 4 | 5 | 3 | **4.1** |
| llm/gemini+claude | 5 | 6 | 3 | 5 | **4.8** |
| api/middleware/auth | 5 | 5 | 4 | 5 | **4.8** |
| domain/approval_workflow | 6 | 5 | 6 | 4 | **5.3** |
| workflow/orchestrator | 7 | 6 | 6 | 5 | **6.1** |
| domain/compliance_checklist | 5 | 4 | 8 | 4 | **5.4** |
| workflow/unanimous | 6 | 5 | 7 | 6 | **6.1** |
| frontend/events.cljs | 7 | 8 | 5 | 7 | **6.8** |

### Trilha de Onboarding Gerada

#### Curso 0: FluSisTip - Fundamentos e Ambiente

```sql
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-fundamentos',
  'FluSisTip - Fundamentos e Ambiente',
  'Setup completo do ambiente Clojure/CLJS, REPL workflow, e primeiro build local',
  '🔧',
  8,
  5,
  'beginner',
  'in-development',
  'onboarding',
  0
);
```

```javascript
export const fasesFlusistipFundamentos = [
  {
    id: 1,
    nome: "Fase 1: Ambiente de Desenvolvimento",
    semanas: "1",
    cor: "bg-green-500",
    corClara: "bg-green-50",
    icone: Terminal,
    descricao: "Instalacao de Clojure, Java 21, Bun, mise e Datomic local"
  },
  {
    id: 2,
    nome: "Fase 2: REPL-First Workflow",
    semanas: "1",
    cor: "bg-blue-500",
    corClara: "bg-blue-50",
    icone: Code,
    descricao: "REPL driven development: eval, reload, test no REPL"
  }
];

export const modulosFlusistipFundamentos = [
  { id: '1.1', nome: 'Clojure Essencial para o Projeto', semana: 1, fase: 1, duracao: '2 dias',
    entregavel: 'Avaliar expressoes Clojure no REPL', namespaceFonte: 'hub.server',
    gotchas: ['Sempre usar :reload apos alterar arquivo', 'REPL stale = bugs fantasma'] },
  { id: '1.2', nome: 'Setup Local Completo', semana: 1, fase: 1, duracao: '1 dia',
    entregavel: 'Backend + Frontend rodando localmente', namespaceFonte: 'hub.db.connection',
    gotchas: ['Datomic local precisa de diretorio data/', 'Bun 1.3.3 especifico via mise'] },
  { id: '1.3', nome: 'Estrutura do Projeto', semana: 1, fase: 1, duracao: '1 dia',
    entregavel: 'Navegar e explicar cada diretorio', namespaceFonte: null,
    gotchas: ['119 arquivos fonte - nao tente ler tudo de uma vez'] },
  { id: '2.1', nome: 'REPL Workflow (6 passos)', semana: 1, fase: 2, duracao: '1 dia',
    entregavel: 'Design→Plan→Validate(REPL)→Implement→Test→Commit', namespaceFonte: 'dev/user.clj',
    gotchas: ['nREPL != terminal REPL - usar nREPL para hot-reload'] },
  { id: '2.2', nome: 'Testes e Validacao', semana: 1, fase: 2, duracao: '1 dia',
    entregavel: 'Rodar testes Kaocha e entender 4 niveis de validacao', namespaceFonte: 'test/',
    gotchas: ['L1(lint)→L2(load)→L3(test)→L4(browser) - nao pular niveis'] }
];
```

#### Curso 1: FluSisTip - Dominio e Entidades

```sql
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-dominio',
  'FluSisTip - Dominio Healthcare/LLM',
  'Entidades de dominio, regras de negocio healthcare, compliance LGPD/CFM e multi-tenant',
  '🏥',
  12,
  8,
  'intermediate',
  'in-development',
  'onboarding',
  1
);
```

```javascript
export const fasesFlusistipDominio = [
  {
    id: 1,
    nome: "Fase 1: Modelo de Dominio",
    semanas: "2",
    cor: "bg-green-500",
    corClara: "bg-green-50",
    icone: Database,
    descricao: "Entidades: Tenant, Usuario, Componente, Sistema, Fluxo"
  },
  {
    id: 2,
    nome: "Fase 2: Multi-Tenant e RBAC",
    semanas: "2",
    cor: "bg-blue-500",
    corClara: "bg-blue-50",
    icone: Shield,
    descricao: "Isolamento por tenant, 8 personas, permissoes"
  },
  {
    id: 3,
    nome: "Fase 3: Compliance Healthcare",
    semanas: "2",
    cor: "bg-purple-500",
    corClara: "bg-purple-50",
    icone: Lock,
    descricao: "LGPD, CFM/CRP, auditoria, assinatura digital"
  }
];

export const modulosFlusistipDominio = [
  { id: '1.1', nome: 'Hierarquia de Entidades', semana: 2, fase: 1, duracao: '2 dias',
    entregavel: 'Diagrama Tenant→App→Funcao→Fluxo→Sistema→Componente',
    namespaceFonte: 'hub.domain.componente + hub.domain.sistema + hub.domain.fluxo',
    gotchas: ['Componente tem 3 tipos: texto-base, contexto, config-llm - nao confundir'] },
  { id: '1.2', nome: 'Datomic Schemas', semana: 2, fase: 1, duracao: '2 dias',
    entregavel: 'Ler e explicar os 12 schemas EDN', namespaceFonte: 'hub.db.schema',
    gotchas: ['query-many descarta colunas alem da primeira - usar d/q direto', 'Seeds devem ser 100% idempotentes (ADR-364)'] },
  { id: '2.1', nome: 'Multi-Tenant Isolation', semana: 2, fase: 2, duracao: '2 dias',
    entregavel: 'Implementar query com filtro tenant-id', namespaceFonte: 'hub.domain.tenant + hub.api.middleware.tenant',
    gotchas: ['Esquecer tenant-id = data leakage entre tenants - CRITICO'] },
  { id: '2.2', nome: 'RBAC 8 Personas', semana: 2, fase: 2, duracao: '1 dia',
    entregavel: 'Explicar permissoes de cada persona', namespaceFonte: 'hub.api.middleware.auth',
    gotchas: ['Zero-trust: middleware valida TODA request, nao confiar no frontend'] },
  { id: '3.1', nome: 'LGPD Compliance', semana: 2, fase: 3, duracao: '2 dias',
    entregavel: 'Identificar pontos LGPD no codigo', namespaceFonte: 'hub.domain.compliance_checklist',
    gotchas: ['Dados healthcare = dados sensiveis Art.11 - tratamento especial obrigatorio'] },
  { id: '3.2', nome: 'Auditoria e Assinatura Digital', semana: 2, fase: 3, duracao: '1 dia',
    entregavel: 'Explicar fluxo de audit trail via Datomic', namespaceFonte: 'hub.domain.assinatura',
    gotchas: ['Datomic e naturalmente imutavel - ideal para audit, mas queries temporais sao diferentes'] }
];
```

#### Curso 2: FluSisTip - Workflow Engine e HITL

```sql
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-workflow',
  'FluSisTip - Workflow Engine e HITL',
  'State machine de 7 estados, aprovacao unanime, checkpoints humanos e validacao externa',
  '⚙️',
  15,
  8,
  'advanced',
  'in-development',
  'onboarding',
  2
);
```

```javascript
export const fasesFlusistipWorkflow = [
  {
    id: 1,
    nome: "Fase 1: State Machine (7 estados)",
    semanas: "3",
    cor: "bg-green-500",
    corClara: "bg-green-50",
    icone: GitBranch,
    descricao: "draft→technical-review→legal-review→revision→approved→published→archived"
  },
  {
    id: 2,
    nome: "Fase 2: HITL Checkpoints",
    semanas: "3-4",
    cor: "bg-blue-500",
    corClara: "bg-blue-50",
    icone: UserCheck,
    descricao: "Checkpoints medicos e juridicos, aprovacao unanime"
  },
  {
    id: 3,
    nome: "Fase 3: Validacao Externa",
    semanas: "4",
    cor: "bg-purple-500",
    corClara: "bg-purple-50",
    icone: ExternalLink,
    descricao: "Portal externo, JWT tokens, callbacks"
  },
  {
    id: 4,
    nome: "Fase 4: Kanban e SLA",
    semanas: "4",
    cor: "bg-orange-500",
    corClara: "bg-orange-50",
    icone: LayoutDashboard,
    descricao: "Board 7 colunas, WIP limits, monitoramento SLA"
  }
];
```

#### Curso 3: FluSisTip - LLM Integration

```sql
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-llm',
  'FluSisTip - Integracao LLM',
  'Orquestracao Gemini/Claude via Vertex AI, composicao de prompts, cost tracking e fallback',
  '🤖',
  10,
  6,
  'advanced',
  'in-development',
  'onboarding',
  3
);
```

#### Curso 4: FluSisTip - Frontend Re-frame

```sql
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, order_index)
VALUES (
  'flusistip-frontend',
  'FluSisTip - Frontend ClojureScript/Re-frame',
  'Reagent, Re-frame (events/subs/fx), routing, componentes UI e Playground',
  '🎨',
  12,
  7,
  'intermediate',
  'in-development',
  'onboarding',
  4
);
```

### Flash Cards do Onboarding FluSisTip (Amostra)

```javascript
export const flashCardsFlusistipOnboarding = [
  // Setup
  { id: 1, pergunta: "Qual comando inicia o backend FluSisTip?",
    resposta: "mise run dev (porta 3000) - usa Ring+Jetty",
    categoria: "setup", dificuldade: "facil", fonte: ".mise.toml" },

  { id: 2, pergunta: "Por que usamos Bun em vez de npm?",
    resposta: "35x mais rapido para install, recomendacao Anthropic. Node e fallback.",
    categoria: "setup", dificuldade: "facil", fonte: "ADR em CLAUDE.md" },

  // Arquitetura
  { id: 3, pergunta: "O que e Datomic e por que foi escolhido?",
    resposta: "Database imutavel (event sourcing nativo). Ideal para audit trail healthcare. Cada transacao e um fato no tempo.",
    categoria: "arquitetura", dificuldade: "medio", fonte: "ADR fundacao" },

  { id: 4, pergunta: "Quantos estados tem o workflow FluSisTip?",
    resposta: "7: draft, technical-review, legal-review, revision, approved, published, archived (+external-validation)",
    categoria: "arquitetura", dificuldade: "medio", fonte: "hub.workflow.transitions" },

  // Gotchas
  { id: 5, pergunta: "O que acontece se esquecer tenant-id em uma query?",
    resposta: "DATA LEAKAGE - dados de um tenant vazam para outro. CRITICO em healthcare.",
    categoria: "gotcha", dificuldade: "dificil", fonte: "hub.api.middleware.tenant" },

  { id: 6, pergunta: "Por que q/query-many nao funciona para multi-column?",
    resposta: "Bug conhecida: descarta todas colunas exceto a primeira. Usar d/q direto. ADR-364.",
    categoria: "gotcha", dificuldade: "dificil", fonte: "ADR-364, 17 ocorrencias em 6 arquivos" },

  { id: 7, pergunta: "O que significa L1→L2→L3→L4 na validacao?",
    resposta: "L1=lint(clj-kondo), L2=load(require sem erro), L3=test(Kaocha), L4=browser(Playwright). NAO pular niveis.",
    categoria: "processo", dificuldade: "medio", fonte: "CLAUDE.md workflow" },

  { id: 8, pergunta: "Como funciona aprovacao unanime no HITL?",
    resposta: "3 votos necessarios, TODOS devem aprovar. 1 rejeicao = workflow volta para revision.",
    categoria: "dominio", dificuldade: "dificil", fonte: "hub.workflow.unanimous" },

  { id: 9, pergunta: "Qual o fallback se Claude GCP estiver indisponivel?",
    resposta: "Gemini Flash → Gemini Pro → Claude Haiku → Mock. Chain implementada em hub.llm.executor.",
    categoria: "arquitetura", dificuldade: "medio", fonte: "hub.llm.executor" },

  { id: 10, pergunta: "O que sao os 4 tipos de sistema (A/B/C/D)?",
    resposta: "A=Pure LLM (70%), B=LLM+DB (20%), C=LLM+Web (8%), D=All (2%). Otimizacao de custo 41%.",
    categoria: "dominio", dificuldade: "medio", fonte: "hub.domain.sistema :tipo" }
];
```

---

## Uso do Skill

1. Fornecer `<projeto>` e `<metadados_projeto>` no formato especificado
2. Executar as 7 fases de diagnostico na ordem:
   - Fase 1: Recon (5 min) → Superficie
   - Fase 2: Arqueologia (15 min) → Camadas
   - Fase 3: Dominio (20 min) → Negocio
   - Fase 4: Complexidade (10 min) → Scoring
   - Fase 5: Personas (10 min) → Jornadas
   - Fase 6: Gaps (15 min) → Tribal knowledge
   - Fase 7: Sintese (20 min) → Geracao de artefatos
3. Gerar artefatos na ordem:
   - Relatorio forense (Markdown)
   - SQL dos cursos
   - Arquivos de dados (fases + modulos)
   - Componentes de conteudo (NotesView)
   - Flash cards
   - Checklists de onboarding
4. Validar consistencia (IDs, prerequisitos, balanceamento)
5. Revisar progressao pedagogica

---

## Integracao com a Plataforma TrainB2B

Apos gerar os artefatos:

```bash
# 1. Inserir cursos no banco
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/seed-onboarding-[projeto].sql

# 2. Adicionar arquivos de dados
# src/data/[projeto]OnboardingData.js

# 3. Criar componentes de visualizacao
# src/components/[Projeto]OnboardingNotesView.jsx
# src/components/[Projeto]OnboardingLearningSystem.jsx

# 4. Adicionar rotas
# src/App.jsx - Route /onboarding/[projeto-id]

# 5. Configurar trilha no tenant
# Admin → Cursos → Criar Trilha de Onboarding → Selecionar cursos gerados

# 6. Associar personas aos cursos
# Admin → Usuarios → Atribuir trilha por perfil de contratado
```

---

## Diferencial vs Onboarding Tradicional

| Aspecto | Onboarding Tradicional | Diagnostico Forense TrainB2B |
|---------|----------------------|------------------------------|
| **Fonte** | Doc manual (desatualizado) | Codigo vivo (sempre atual) |
| **Cobertura** | Parcial (o que alguem lembrou) | Sistematica (varredura completa) |
| **Tribal Knowledge** | Perdido com turnover | Capturado em flash cards |
| **Personalizacao** | Generico | Por persona + nivel |
| **Progressao** | Linear | DAG com prerequisitos |
| **Validacao** | Subjetiva | Entregaveis verificaveis |
| **Manutencao** | Manual | Re-executar diagnostico |
| **Metricas** | Nenhuma | Dashboard TrainB2B |

---

## Quando Re-executar o Diagnostico

| Trigger | Acao |
|---------|------|
| Nova major version do projeto | Re-executar completo (7 fases) |
| Novo bounded context adicionado | Adicionar curso a trilha |
| Mudanca de stack | Atualizar curso de Fundamentos |
| Novo tipo de persona no onboarding | Gerar nova trilha |
| > 3 meses sem atualizacao | Re-executar Fase 6 (Gaps) |
| Feedback negativo de onboarding | Analisar e ajustar modulos |

---

*Skill v1.0 | 2026-02-17 | Diagnostico Forense para Onboarding TrainB2B*
*Baseado em analise do projeto FluSisTip como modelo de referencia*
*Compativel com: qualquer projeto com repositorio git*
