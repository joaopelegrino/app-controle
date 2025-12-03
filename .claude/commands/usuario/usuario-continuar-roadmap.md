# 🚀 Comando: Continuar Roadmap Plataforma B2B de treinamento técnico corporativo

**Retomar implementação do Plataforma B2B de treinamento técnico corporativo** seguindo o roadmap em `docs/backlog/ROADMAP.md` (SSOT).

---

## 📋 Como Usar

### Modo 1: Instrução Customizada (com argumento)
```bash
/usuario:usuario-continuar-roadmap implementar US-040
/usuario:usuario-continuar-roadmap corrigir bug no breadcrumb
/usuario:usuario-continuar-roadmap adicionar testes para HubView
```
**Comportamento:** Executa a instrução fornecida pelo usuário.

### Modo 2: Proposta Automática (com flag)
```bash
/usuario:usuario-continuar-roadmap --proposta-continuidade
```
**Comportamento:** Analisa o estado atual do projeto e **propõe automaticamente** os próximos passos mais adequados baseado em:
- Backlog mais recente (`.claude/meta-docs/sessions/`)
- ROADMAP.md (SSOT - User Stories pendentes)
- STATUS-DELIVERABLES.md (deliverables por estágio)
- ACOES-PENDENTES.md (ações manuais prioritárias P0/P1)
- SKILLS-BACKLOG.md (skills disponíveis)

### Modo 3: Padrão (sem argumentos)
```bash
/usuario:usuario-continuar-roadmap
```
**Comportamento:** Mesmo que `--proposta-continuidade` (proposta automática).

---

## 🤖 Comportamento do Comando

### 1. Leitura de Contexto (Automática)

O comando **sempre** lê e analisa:

#### Documentos SSOT (Single Source of Truth)
- **docs/backlog/ROADMAP.md** - PRD B2B v3.0 (User Stories, releases, personas)
- **docs/backlog/STATUS-DELIVERABLES.md** - 36 deliverables com 5 estágios (🔵 🟡 🟠 🟢 📚)
- **docs/backlog/acoes-usuario/ACOES-PENDENTES.md** - Ações manuais prioritizadas (P0 a P3)

#### Skills e Meta-Documentação
- **CLAUDE.md** - Índice modularizado + Session Start Protocol
- **.claude/skills/SKILLS-BACKLOG.md** - 13 skills (5 implementadas, 8 planejadas)
- **.claude/meta-docs/sessions/** - Backlogs de sessões anteriores

#### Estado do Projeto
- **Arquivos modificados** (`git status`)
- **Branch atual** (`git branch`)
- **Servidor rodando** (`ss -tlnp | grep 3000`)

---

### 2. Análise Inteligente (se `--proposta-continuidade` ou sem args)

**Critérios de Priorização:**

1. **Ações manuais P0/P1** (bloqueia desenvolvimento ou necessária para sprint)
2. **Release em andamento** (Release 2.0 planejada - US-040 a US-044)
3. **Deliverables pendentes** (D-026 a D-037 em Release 2.0)
4. **Skills faltantes** (8 skills P0/P1 planejadas - Fase 1-2)
5. **Débito técnico** (duplicação 25%, testes 5%)
6. **Momentum do projeto** (continuar tema atual vs mudar contexto)

**Proposta Inclui:**
- ✅ **Sprint sugerido** (ex: Sprint 2.1)
- ✅ **User Stories** a implementar (1-3 US)
- ✅ **Deliverables relacionados** (D-XXX)
- ✅ **Ações manuais** vinculadas (ACTION-XXX)
- ✅ **Estimativa** (tempo + pontos de complexidade)
- ✅ **Arquivos afetados** (lista de componentes)
- ✅ **Skills necessárias** (consultar ou criar)
- ✅ **Justificativa** (por que essa ordem)
- ✅ **Alternativas** (outras opções viáveis)

---

### 3. Execução (após confirmação ou instrução direta)

**Se Modo 1 (instrução customizada):**
- Executa a tarefa solicitada diretamente
- Cria TodoList com subtarefas
- Segue ciclo de implementação obrigatório

**Se Modo 2/3 (proposta automática):**
- Apresenta proposta completa para o usuário
- Mostra deliverables, ações manuais e skills relacionadas
- Aguarda confirmação ou ajuste
- Após confirmação, executa

---

## 🔄 Ciclo de Implementação Obrigatório

Aplicado **sempre**, independente do modo:

### 1. Preparação (5-10 min)

**Session Start Protocol (SEMPRE executar):**
```bash
# 1. Contexto do PROJETO
Read: docs/backlog/ROADMAP.md                       # SSOT - próximos passos
Read: docs/backlog/STATUS-DELIVERABLES.md           # Deliverables por estágio
Read: docs/backlog/acoes-usuario/ACOES-PENDENTES.md # Ações manuais P0/P1

# 2. Contexto da META-CONFIGURAÇÃO
Read: .claude/docs-meta/ESTADO-ATUAL.md            # Estado de melhorias
Read: .claude/docs-meta/ARQUITETURA-SISTEMA.md     # Estrutura atual

# 3. Descobrir Componentes Disponíveis
ls .claude/agents/  # Ver agents disponíveis
ls .claude/skills/  # Ver skills disponíveis
```

**Preparação Técnica:**
- [x] Ler backlog mais recente (`.claude/meta-docs/sessions/[data-recente]/`)
- [x] Criar TodoList com tarefas da User Story
- [x] Verificar critérios de aceite em ROADMAP.md
- [x] Iniciar servidor dev: `npm run dev` (se necessário)
- [x] Verificar ações manuais P0 bloqueantes

---

### 2. Implementação (40-90 min por US)

**Workflow:**
- [x] Identificar arquivos afetados (usar Grep/Glob)
- [x] Aplicar mudanças seguindo skills ativas
- [x] Manter consistência com padrões existentes
- [x] Atualizar imports se necessário
- [x] Seguir progressive loading (carregar módulos CLAUDE.md apenas quando necessário)

**Skills Ativas Automaticamente:**
1. **ux-nomenclature** → Valida glossário ÉPICO 12 (nomes, botões, hierarquia)
2. **breadcrumb-impl** → Garante breadcrumb consistente (se trabalhar com navegação)
3. **platform-architecture** → Conhecimento completo da arquitetura do sistema
4. **component-refactor** → Sugestões de refatoração (se detectar duplicação)
5. **meta-configuracao-evolucao** → Evolução de skills/agents (quando integrar nova tecnologia)

---

### 3. Validação (10-15 min)

**Build e Console:**
- [x] Executar build: `npm run build`
- [x] Console limpo (zero erros, warnings menores aceitos)
- [x] Sem erros React, Vite ou acessibilidade

**Funcionalidade (quando aplicável):**
- [x] Navegar aplicação: Hub → Sistema → Aula
- [x] Capturar screenshots de evidência (mínimo 2 por US)
- [x] Validar breadcrumb (visível, clicável, hierarquia correta)
- [x] Nomenclatura consistente (glossário ÉPICO 12)
- [x] Testar responsividade (mobile/tablet/desktop)

**MCP Validation (quando aplicável):**
```javascript
// Navegação programática
mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
mcp__chrome-devtools__take_snapshot()  // Mapeia elementos
mcp__chrome-devtools__take_screenshot(format: "png", filePath: "...")

// Console inspection
mcp__chrome-devtools__list_console_messages()
```

---

### 4. Documentação (10-15 min)

**Atualizar Documentos SSOT:**
- [x] **ROADMAP.md** - Marcar critérios de aceite [x], atualizar "Última Sessão"
- [x] **STATUS-DELIVERABLES.md** - Atualizar estágios de deliverables (🔵→🟡→🟠→🟢→📚)
- [x] **CLAUDE.md** - Atualizar métricas (se necessário)

**Se criou ação manual:**
- [x] Criar **ACTION-XXX.md** usando template
- [x] Adicionar resumo em **ACOES-PENDENTES.md**
- [x] Vincular a deliverable no frontmatter (`deliverable: D-XXX`)

**Meta-Documentação:**
- [x] Criar/atualizar backlog: `.claude/meta-docs/sessions/[data]/[titulo].md`
- [x] Incluir: contexto, arquivos modificados, próximos passos
- [x] Referenciar ROADMAP.md para retomada

---

### 5. Preparação para Próxima Sessão (5 min)

**Sincronização:**
- [x] Atualizar seção "Última Sessão" do ROADMAP.md
- [x] Listar ações manuais criadas (se houver)
- [x] Sugerir próximos passos baseado em prioridades

**Quick Start para Próxima Sessão:**
```bash
# 1. Session Start Protocol
Read: docs/backlog/ROADMAP.md
Read: docs/backlog/ACOES-PENDENTES.md

# 2. Ver backlog mais recente
ls -t .claude/meta-docs/sessions/*/  | head -1

# 3. Retomar desenvolvimento
npm run dev
/usuario:usuario-continuar-roadmap --proposta-continuidade
```

---

## ✅ Checklist de Validação Final

Antes de marcar US como DONE:

### Build e Qualidade
- [ ] `npm run build` passa sem erros
- [ ] Console limpo (zero erros críticos)
- [ ] Lighthouse score > 90 (se aplicável)
- [ ] Bundle size < 5MB (se React Router adicionado)

### Funcionalidade
- [ ] Navegação Hub → Sistema → Aula funciona
- [ ] Breadcrumb visível, clicável e correto
- [ ] Nomenclatura consistente (glossário ÉPICO 12)
- [ ] Screenshots capturados (mínimo 2 por US)
- [ ] Responsividade validada (mobile/tablet/desktop)

### Documentação SSOT
- [ ] **ROADMAP.md** atualizado
  - [ ] Critérios de aceite marcados [x]
  - [ ] Status US: TODO → IN PROGRESS → DONE
  - [ ] Seção "Última Sessão" atualizada
- [ ] **STATUS-DELIVERABLES.md** atualizado
  - [ ] Estágios dos deliverables avançados (🔵→🟡→🟠→🟢→📚)
  - [ ] Próximos passos documentados
- [ ] **ACOES-PENDENTES.md** atualizado (se houver)
  - [ ] Novas ações criadas com template
  - [ ] Prioridades atribuídas (P0 a P3)
  - [ ] Vinculadas a deliverables

### Meta-Documentação
- [ ] Backlog de sessão criado (`.claude/meta-docs/sessions/`)
- [ ] **ARQUITETURA-SISTEMA.md** atualizado (se adicionou components)
- [ ] **ESTADO-ATUAL.md** atualizado (se completou fase/melhoria)

### Qualidade de Código
- [ ] Sem duplicação de código (refatorar se necessário)
- [ ] Componentes reutilizáveis (quando aplicável)
- [ ] Acessibilidade mantida (WCAG 2.1 AA)
- [ ] Consistência visual em todos os sistemas

---

## 🎯 Exemplos de Uso

### Exemplo 1: Proposta Automática (Recomendado)

```bash
/usuario:usuario-continuar-roadmap --proposta-continuidade
```

**Saída Esperada:**
```
📊 Analisando estado atual do projeto...

✅ Lendo documentos SSOT:
   - ROADMAP.md: Release 1.0 (100%), Release 2.0 (0%)
   - STATUS-DELIVERABLES.md: 23/36 deliverables completos
   - ACOES-PENDENTES.md: P0: 0, P1: 2, P2: 1, P3: 0

✅ Métricas Atuais:
   - Nota Geral: 8.8/10 ⭐
   - ÉPICO 12: 100% ✅
   - ÉPICO 13: 10% (áreas descontinuadas)
   - Débito Técnico: Duplicação 25%, Testes 5%

🎯 PROPOSTA: Sprint 2.1 - React Router Navigation (Release 2.0)

**User Story Sugerida:**
- US-040: React Router Navigation (5 pontos, ~6-8h)

**Deliverables Relacionados:**
- D-026: React Router 6 (⏳ Pendente)
- D-027: Rotas Definidas (/hub, /course/:id, /module/:id)
- D-028: Deep Linking (URLs compartilháveis)

**Ações Manuais Vinculadas:**
- ACTION-001: Validar Build de Produção (P1 - Testing)
  - Validar bundle size < 5MB
  - Lighthouse score > 90
  - Docker build funcionando

**Skills Necessárias:**
- ✅ platform-architecture (disponível)
- ⚪ react-components-patterns (planejada - Fase 1)
- ⚪ vite-build-optimization (planejada - Fase 1)

**Justificativa:**
- React Router desbloqueia deep linking e melhora SEO
- US-040 é prioridade P1 na Release 2.0
- Deliverable D-026 já mapeado em STATUS-DELIVERABLES
- Ação manual ACTION-001 já documentada para validação

**Arquivos Afetados:**
- src/components/SistemaEducacionalCompleto.jsx (refatorar navegação)
- package.json (adicionar react-router-dom 6.x)
- vite.config.js (configurar routes)

**Estimativa:** 6-8h (5 pontos de complexidade)

**Alternativas:**
1. Sprint 2.1: US-041 (Tratamento Erros localStorage - P1)
2. Sprint 2.1: US-042 (Persistir Progresso - P1)
3. Sprint 2.1: US-043 (Refatoração Learning Systems - P2)

⚡ Deseja prosseguir com US-040? (confirme ou ajuste)
```

---

### Exemplo 2: Instrução Customizada

```bash
/usuario:usuario-continuar-roadmap implementar US-041 tratamento erros localStorage
```

**Saída Esperada:**
```
✅ Executando: implementar US-041 tratamento erros localStorage

📋 Lendo US-041 em docs/backlog/ROADMAP.md...
📋 Verificando deliverables em STATUS-DELIVERABLES.md...

**Deliverables:**
- D-029: Error Boundary Melhorado (try-catch quota exceeded)
- D-030: Fallback Mechanism (IndexedDB alternativa)

**Critérios de Aceite:**
- [ ] Try-catch robusto em todas operações localStorage
- [ ] Fallback para IndexedDB se quota exceeded
- [ ] Alertas ao usuário (toasts ou modals)
- [ ] Logs de erro para debugging
- [ ] Build passa sem warnings

📋 Criando TodoList...

**Tarefas:**
1. Adicionar try-catch em helpers.js (localStorage operations)
2. Implementar fallback IndexedDB
3. Criar componente ToastNotification
4. Testar quota exceeded (preencher localStorage)
5. Validar build e console
6. Atualizar documentação (ROADMAP + STATUS)

⚡ Iniciando implementação...
```

---

### Exemplo 3: Criar Ação Manual Durante Desenvolvimento

Durante a implementação, Claude detecta necessidade de ação manual:

```markdown
⚠️ AÇÃO MANUAL NECESSÁRIA

Detectei que US-040 (React Router) requer validação manual de build após implementação.

🛠️ Criando ACTION-004: Validar React Router Build

**Categoria:** testing
**Prioridade:** P1 (High)
**Deliverable:** D-026 (React Router 6)
**Estimativa:** 30-45 minutos

**Passo a Passo:**
1. npm run build
2. Validar bundle size < 5MB
3. Testar deep linking (/course/bash, /module/bash/1)
4. Validar botão voltar do navegador
5. Lighthouse Accessibility > 90

✅ ACTION-004 criada em: docs/backlog/acoes-usuario/templates/
✅ Resumo adicionado em: ACOES-PENDENTES.md
✅ Vinculada a D-026 em: STATUS-DELIVERABLES.md
```

---

## 📚 Estrutura de Documentos (Referência Rápida)

### SSOT (Single Source of Truth)
```
docs/backlog/
├── ROADMAP.md                  # PRD B2B v3.0 (40+ User Stories, 4 Releases)
├── STATUS-DELIVERABLES.md      # 36 deliverables (5 estágios: 🔵🟡🟠🟢📚)
└── acoes-usuario/
    ├── ACOES-PENDENTES.md      # Lista principal (P0 a P3)
    ├── ACOES-CONCLUIDAS.md     # Histórico auditável
    ├── README.md               # Guia completo de uso
    └── templates/
        ├── template-acao.md    # Template base
        ├── ACTION-001.md       # Validar Build (Testing, P1)
        ├── ACTION-002.md       # Analytics B2B (Setup, P2)
        └── ACTION-003.md       # WCAG Compliance (Validation, P1)
```

### Skills e Meta-Docs
```
.claude/
├── skills/
│   ├── SKILLS-BACKLOG.md       # 13 skills (5 impl, 8 plan)
│   ├── ux-nomenclature/        # Glossário ÉPICO 12
│   ├── platform-architecture/        # Arquitetura completa
│   ├── breadcrumb-impl/        # Breadcrumb WCAG
│   ├── component-refactor/     # Refatoração React
│   └── meta-configuracao-evolucao/ # Meta-skill
├── agents/
│   └── ux-refactor-agent.md    # Workflow UX 5 fases
├── meta-docs/
│   ├── ESTADO-ATUAL.md         # Estado de melhorias
│   ├── ARQUITETURA-SISTEMA.md  # Estrutura atual
│   ├── INDEX.md                # Catálogo completo
│   └── sessions/               # Backlogs de sessões
│       └── 2025-11-17/
│           ├── modularizacao-claude-md.md
│           └── implementacao-sistema-acoes-manuais.md
└── docs-meta/
    └── claude-md-modules/      # Módulos do CLAUDE.md
```

---

## 🚀 Quick Start

```bash
# 1. Executar Session Start Protocol
Read: docs/backlog/ROADMAP.md
Read: docs/backlog/STATUS-DELIVERABLES.md
Read: docs/backlog/acoes-usuario/ACOES-PENDENTES.md
Read: .claude/docs-meta/ESTADO-ATUAL.md

# 2. Verificar branch e servidor
git status
git branch
ss -tlnp | grep 3000  # Verificar se servidor rodando

# 3. Iniciar servidor (se necessário)
npm run dev

# 4. Abrir aplicação
# http://localhost:3000

# 5. Executar comando
/usuario:usuario-continuar-roadmap --proposta-continuidade
```

---

## 📊 Detecção Inteligente de Contexto

O comando detecta automaticamente:

✅ **Ações manuais P0/P1** (prioridade blocker/high)
✅ **Release em andamento** (Release 2.0 planejada)
✅ **Deliverables pendentes** (D-026 a D-037)
✅ **Skills disponíveis** (5 implementadas, 8 planejadas)
✅ **Sessão em andamento** (arquivos modificados não commitados)
✅ **Débitos técnicos críticos** (duplicação 25%, testes 5%)
✅ **Dependências bloqueadas** (US que desbloqueiam outras)
✅ **Tempo desde última sessão** (sugere revisão se > 7 dias)

---

## 📋 Glossário ÉPICO 12 (Referência)

Nomenclatura obrigatória estabelecida:

```
❌ PROIBIDO              → ✅ USAR
Sistema de Aprendizado  → Curso
Notas Rápidas           → Meu Caderno de Notas
Módulo                  → Aula
FASE                    → Seção
Ver Notas               → 📖 Estudar
Cronograma (contexto)   → Curso
Voltar ao Cronograma    → ← Voltar ao Curso
```

### Hierarquia de Navegação
```
NÍVEL 1: Hub de Aprendizado (sem breadcrumb)
NÍVEL 2: Curso de [Tecnologia] (breadcrumb: Hub > Curso)
NÍVEL 3: Aula [número]: [Título] (breadcrumb: Hub > Curso > Aula)
NÍVEL 4: Modal Flash Cards (overlay)
```

### Hierarquia Visual
```
Larguras:   Hub (1280px) > Curso (1152px) > Aula (1024px)
Tipografia: Hub (4xl)    > Curso (3xl)    > Aula (2xl)
```

---

## 🔗 Integração com Sistema Completo

### Fluxo de Desenvolvimento (End-to-End)

```
1. PLANEJAMENTO (ROADMAP.md)
   ↓ User Stories definidas (US-XXX)

2. RASTREAMENTO (STATUS-DELIVERABLES.md)
   ↓ Deliverables mapeados (D-XXX)
   ↓ Estágios: 🔵 Implementada → 🟡 Testada LLM → 🟠 Testada Usuário → 🟢 Validada → 📚 Docs

3. AÇÕES MANUAIS (ACOES-PENDENTES.md)
   ↓ Ações criadas (ACTION-XXX)
   ↓ Prioridades: P0 (Blocker) → P1 (High) → P2 (Medium) → P3 (Low)
   ↓ Categorias: setup, testing, validation, deployment, documentation

4. IMPLEMENTAÇÃO (Claude Code)
   ↓ Skills ativas (ux-nomenclature, platform-architecture, etc.)
   ↓ Agents invocados (ux-refactor-agent se necessário)

5. VALIDAÇÃO (Build + MCP + Manual)
   ↓ npm run build
   ↓ MCP screenshots
   ↓ Usuário executa ações manuais

6. DOCUMENTAÇÃO (Meta-Docs)
   ↓ Backlog de sessão (.claude/meta-docs/sessions/)
   ↓ ROADMAP "Última Sessão" atualizado
   ↓ STATUS-DELIVERABLES estágios avançados

7. PRÓXIMA SESSÃO
   ↓ Session Start Protocol
   ↓ /usuario:usuario-continuar-roadmap --proposta-continuidade
```

---

## 🎯 Métricas de Sucesso

**Validar após cada sessão:**

| Métrica | Target | Como Validar |
|---------|--------|--------------|
| **Build OK** | 100% | `npm run build` sem erros |
| **Console limpo** | Zero erros críticos | Chrome DevTools Console |
| **Critérios US** | 100% marcados | ROADMAP.md checkboxes [x] |
| **Deliverables avançados** | +1 estágio mínimo | STATUS-DELIVERABLES.md (🔵→🟡→...) |
| **Ações criadas** | Se necessário | ACOES-PENDENTES.md atualizado |
| **Meta-docs** | Backlog criado | `.claude/meta-docs/sessions/[data]/` |
| **Skills usadas** | 2-5 por sessão | Consultar SKILLS-BACKLOG.md |

---

**✅ Comando genérico atualizado!** Use com flexibilidade total:
- `$AUGMENT` para instruções diretas
- `--proposta-continuidade` para propostas inteligentes baseadas em SSOT
- Sem args para modo automático com Session Start Protocol

**🔄 Integração completa** com:
- ✅ ROADMAP.md (SSOT)
- ✅ STATUS-DELIVERABLES.md (36 deliverables)
- ✅ acoes-usuario/ (sistema completo)
- ✅ SKILLS-BACKLOG.md (13 skills)
- ✅ CLAUDE.md modularizado (progressive loading)
- ✅ meta-docs/ (backlogs de sessões)
