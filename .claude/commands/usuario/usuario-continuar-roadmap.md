# 🚀 Comando: Continuar Roadmap Ultrathink

**Retomar implementação do Ultrathink** seguindo o roadmap em `PRODUCT-CENTRAL-DOCUMENT.md`.

---

## 📋 Como Usar

### Modo 1: Instrução Customizada (com argumento)
```bash
/usuario:usuario-continuar-roadmap implementar US-065
/usuario:usuario-continuar-roadmap corrigir bug no breadcrumb
/usuario:usuario-continuar-roadmap adicionar testes para HubView
```
**Comportamento:** Executa a instrução fornecida pelo usuário.

### Modo 2: Proposta Automática (com flag)
```bash
/usuario:usuario-continuar-roadmap --proposta-continuidade
```
**Comportamento:** Analisa o estado atual do projeto e **propõe automaticamente** os próximos passos mais adequados baseado em:
- Backlog mais recente
- PRODUCT-CENTRAL-DOCUMENT.md (US pendentes)
- CLAUDE.md (conquistas recentes)
- Prioridades do roadmap

### Modo 3: Padrão (sem argumentos)
```bash
/usuario:usuario-continuar-roadmap
```
**Comportamento:** Mesmo que `--proposta-continuidade` (proposta automática).

---

## 🤖 Comportamento do Comando

### 1. Leitura de Contexto (Automática)
O comando **sempre** lê e analisa:
- **Backlog mais recente** (`BACKLOG-*.md` ordenado por data)
- **PRODUCT-CENTRAL-DOCUMENT.md** (User Stories e status)
- **CLAUDE.md** (métricas, conquistas, débito técnico)
- **Arquivos modificados** (`git status`)

### 2. Análise Inteligente (se `--proposta-continuidade` ou sem args)

**Critérios de Priorização:**
1. **ÉPICO em andamento** (ex: ÉPICO 12 83% → completar primeiro)
2. **Débito técnico crítico** (US com prioridade P0/P1)
3. **Dependências bloqueadas** (US que desbloqueiam outras)
4. **Momentum do projeto** (continuar tema atual vs mudar contexto)

**Proposta Inclui:**
- ✅ **Sprint sugerido** (ex: Sprint 2.6)
- ✅ **User Stories** a implementar (1-3 US)
- ✅ **Estimativa** (tempo + pontos de complexidade)
- ✅ **Arquivos afetados** (lista de componentes)
- ✅ **Justificativa** (por que essa ordem)
- ✅ **Alternativas** (outras opções viáveis)

### 3. Execução (após confirmação ou instrução direta)

**Se Modo 1 (instrução customizada):**
- Executa a tarefa solicitada diretamente
- Cria TodoList com subtarefas
- Segue ciclo de implementação obrigatório

**Se Modo 2/3 (proposta automática):**
- Apresenta proposta para o usuário
- Aguarda confirmação ou ajuste
- Após confirmação, executa

---

## 🔄 Ciclo de Implementação Obrigatório

Aplicado **sempre**, independente do modo:

### 1. Preparação (5-10 min)
- [x] Ler backlog mais recente (contexto completo)
- [x] Criar TodoList com tarefas da User Story
- [x] Verificar critérios de aceite em `PRODUCT-CENTRAL-DOCUMENT.md`
- [x] Iniciar servidor dev: `npm run dev` (se necessário)

### 2. Implementação (40-90 min por US)
- [x] Identificar arquivos afetados (usar Grep)
- [x] Aplicar mudanças seguindo skills ativas (ux-nomenclature, ultrathink-arch)
- [x] Manter consistência com padrões existentes
- [x] Atualizar imports se necessário

### 3. Validação (10-15 min)
- [x] Navegar aplicação: Hub → Sistema → Aula (se aplicável)
- [x] Capturar screenshots de evidência (quando relevante)
- [x] Validar console (sem erros)
- [x] Executar build: `npm run build`

### 4. Documentação (10-15 min)
- [x] Atualizar `PRODUCT-CENTRAL-DOCUMENT.md` (marcar critérios ✅)
- [x] Atualizar `CLAUDE.md` (conquistas recentes, métricas)
- [x] Gerar relatório de validação (se aplicável)
- [x] Criar/atualizar backlog para próxima sessão

### 5. Preparação para Compactação (5 min)
- [x] Criar documento `BACKLOG-[DATA]-[TITULO].md`
- [x] Incluir: contexto, arquivos modificados, próximos passos
- [x] Referenciar `PRODUCT-CENTRAL-DOCUMENT.md` para retomada
- [x] Listar comandos úteis para quick start

---

## 🧠 Skills Ativas Automaticamente

Estas skills são ativadas conforme o contexto de trabalho:

1. **ux-nomenclature** → Valida glossário ÉPICO 12 (nomes, botões, hierarquia)
2. **breadcrumb-impl** → Garante breadcrumb consistente (se trabalhar com navegação)
3. **ultrathink-arch** → Conhecimento completo da arquitetura do sistema
4. **component-refactor** → Sugestões de refatoração (se detectar duplicação)
5. **meta-configuracao-evolucao** → Evolução de skills/agents (quando integrar nova tecnologia)

---

## ✅ Checklist de Validação Final

Antes de marcar US como DONE:

### Build e Console
- [ ] `npm run build` passa sem erros
- [ ] Console limpo (apenas warnings menores aceitos)
- [ ] Sem erros de React ou acessibilidade

### Funcionalidade (quando aplicável)
- [ ] Navegação Hub → Sistema → Aula funciona
- [ ] Breadcrumb visível e clicável
- [ ] Nomenclatura consistente (glossário ÉPICO 12)
- [ ] Screenshots capturados (mínimo 2 por US)

### Documentação
- [ ] `PRODUCT-CENTRAL-DOCUMENT.md` atualizado
- [ ] Critérios de aceite marcados [x]
- [ ] Status US: TODO → DONE
- [ ] `CLAUDE.md`: Conquistas recentes atualizado
- [ ] Backlog criado para próxima sessão

### Qualidade
- [ ] Sem duplicação de código
- [ ] Componentes reutilizáveis (se aplicável)
- [ ] Acessibilidade mantida (WCAG AA)
- [ ] Consistência visual em todos os sistemas

---

## 🚀 Quick Start

```bash
# 1. Ler backlog mais recente
ls -t BACKLOG-*.md | head -1 | xargs cat

# 2. Verificar branch
git status
git branch

# 3. Iniciar servidor (se necessário)
npm run dev

# 4. Abrir aplicação
# http://localhost:3000

# 5. Executar comando
/usuario:usuario-continuar-roadmap --proposta-continuidade
```

---

## 📝 Glossário ÉPICO 12 (Referência)

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

## 🔗 Referências Importantes

### Documentos Centrais
- **PRD:** `PRODUCT-CENTRAL-DOCUMENT.md` (fonte única da verdade)
- **Contexto Técnico:** `CLAUDE.md`
- **Backlog:** `BACKLOG-*.md` (ordenado por data)
- **Relatórios:** `RELATORIO-VALIDACAO-*.md`

### Skills e Agents
- **Skills:** `.claude/skills/` (5 skills especializadas)
- **Agent UX:** `.claude/agents/ux-refactor-agent.md`
- **Comandos:** `.claude/commands/usuario/`

### Comandos MCP Úteis (quando aplicável)
```javascript
// Navegação
mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
mcp__chrome-devtools__take_snapshot()
mcp__chrome-devtools__take_screenshot(format: "png", filePath: "...")

// Validação
mcp__chrome-devtools__list_console_messages()
mcp__chrome-devtools__click(uid: "...")
```

---

## 🎯 Exemplos de Uso

### Exemplo 1: Proposta Automática
```bash
/usuario:usuario-continuar-roadmap --proposta-continuidade
```

**Saída Esperada:**
```
📊 Analisando estado atual do projeto...

✅ Backlog mais recente: BACKLOG-2025-11-13-SPRINT-25-COMPLETO.md
✅ ÉPICO 12: 83% completo (5/6 US)
✅ ÉPICO 13: 10% completo (1/10 US)
✅ Nota Geral: 9.2/10 ⭐

🎯 PROPOSTA: Sprint 2.6 - Finalizar ÉPICO 12

**User Story Sugerida:**
- US-065: Documentar Arquitetura de Informação (3 pontos, ~3h)

**Justificativa:**
- ÉPICO 12 está 83% completo, falta apenas US-065 para 100%
- Documentação consolida todo o trabalho de arquitetura realizado
- Facilita manutenção futura e onboarding de desenvolvedores

**Arquivos a Criar:**
- docs/ARQUITETURA-INFORMACAO.md
- Atualizar CLAUDE.md (seção Arquitetura)

**Alternativas:**
1. Sprint 2.7: Débito Técnico (US-040 React Router)
2. Sprint 3.1: Iniciar ÉPICO 13 (Template de Curso)

⚡ Deseja prosseguir com US-065? (confirme ou ajuste)
```

### Exemplo 2: Instrução Customizada
```bash
/usuario:usuario-continuar-roadmap implementar React Router conforme US-040
```

**Saída Esperada:**
```
✅ Executando: implementar React Router conforme US-040

📋 Lendo US-040 em PRODUCT-CENTRAL-DOCUMENT.md...
📋 Criando TodoList...

**Tarefas:**
1. Instalar react-router-dom
2. Definir rotas: /, /curso/:id, /aula/:courseId/:moduleId
3. Substituir navegação por estado → Link/NavLink
4. Implementar 404 page
5. Validar botão voltar do navegador
6. Atualizar build e documentação

⚡ Iniciando implementação...
```

### Exemplo 3: Comando Padrão (sem argumentos)
```bash
/usuario:usuario-continuar-roadmap
```
**Comportamento:** Idêntico a `--proposta-continuidade`

---

## 📊 Detecção Inteligente de Contexto

O comando detecta automaticamente:

✅ **Sessão em andamento** (arquivos modificados não commitados)
✅ **ÉPICO prioritário** (maior % de progresso ou próximo de completar)
✅ **Débitos técnicos críticos** (P0/P1 no backlog)
✅ **Dependências bloqueadas** (US que desbloqueiam outras)
✅ **Tempo desde última sessão** (sugere revisão se > 7 dias)

---

**✅ Comando genérico pronto!** Use com flexibilidade total:
- `$AUGMENT` para instruções diretas
- `--proposta-continuidade` para propostas inteligentes
- Sem args para modo automático
