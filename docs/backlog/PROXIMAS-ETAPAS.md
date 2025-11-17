# 🚀 Próximas Etapas - Ultrathink

**Versão:** 1.0
**Data:** 2025-11-17
**Baseado em:** Sessão anterior (criação ROADMAP.md v3.0 B2B)
**Status:** ✅ Ativo - Guia de próximas ações

---

## 📋 Contexto da Última Sessão

### O Que Foi Feito

✅ **ROADMAP.md Criado** (docs/backlog/ROADMAP.md)
- Versão 3.0 B2B completa (~18KB)
- 40+ User Stories priorizadas
- 4 Releases planejadas (Q1-Q3 2026)
- 3 Personas corporativas definidas
- Matriz RICE de priorização
- Métricas B2B (NPS, engajamento, ARR)

✅ **PRODUCT-CENTRAL-DOCUMENT.md Marcado como DEPRECATED**
- Redirecionamento claro para ROADMAP.md
- Mensagem explicativa do pivô B2C → B2B

✅ **CLAUDE.md Atualizado**
- 6 referências atualizadas para ROADMAP.md
- Seção de documentação reorganizada
- SSOT (Single Source of Truth) claramente definido

✅ **Build Validado**
- Build passou: 5.83s ✅
- Bundle sizes otimizados
- Sem erros de compilação

### Mudança Estratégica Implementada

**ANTES (Confuso):**
```
├── PRODUCT-CENTRAL-DOCUMENT.md (B2C + B2B misturados, 2000+ linhas)
├── docs/conceitual/01-contexto-projeto.md (só B2B)
└── Divergências conceituais em 40% do backlog
```

**DEPOIS (Claro):**
```
├── PRODUCT-CENTRAL-DOCUMENT.md (⚠️ DEPRECATED, só referência histórica)
├── docs/backlog/ROADMAP.md (✅ SSOT, 100% B2B)
└── Alinhamento total: código, docs, roadmap
```

---

## 🎯 Próximas Etapas - Roadmap de Implementação

### Sprint Imediato (Esta Semana - Semana 47/2025)

#### 1. **Validação com Stakeholder** 🔴 CRÍTICO

**Objetivo:** Obter aprovação do ROADMAP.md v3.0 B2B com João Pelegrino

**Ações:**
- [ ] Agendar reunião de validação (30-45 min)
- [ ] Apresentar mudança B2C → B2B
- [ ] Revisar 3 personas corporativas (Carlos, Ana, Roberto)
- [ ] Validar roadmap de 4 releases (Q1-Q3 2026)
- [ ] Confirmar priorização (Matriz RICE)

**Documentos para Revisão:**
- `docs/backlog/ROADMAP.md` (documento principal)
- `docs/conceitual/01-visao-geral/05-personas-corporativas.md` (personas detalhadas)

**Critérios de Aceite:**
- ✅ João aprova visão B2B do produto
- ✅ Personas corporativas fazem sentido com mercado-alvo
- ✅ Roadmap de 4 releases é viável
- ✅ Priorização de épicos está alinhada

---

#### 2. **Atualizar README.md** 🟡 IMPORTANTE

**Objetivo:** README refletir contexto B2B e apontar para ROADMAP.md

**Ações:**
- [ ] Atualizar descrição do projeto (B2B corporativo)
- [ ] Adicionar seção "Visão B2B" no topo
- [ ] Atualizar quick links para ROADMAP.md
- [ ] Remover referências a PRODUCT-CENTRAL-DOCUMENT.md
- [ ] Adicionar badges (Build Status, Version, License)

**Arquivo:** `/home/notebook/workspace/app-controle/README.md`

**Exemplo de Mudança:**
```markdown
## 🎯 Visão Geral

**Ultrathink** é uma plataforma B2B de treinamento técnico corporativo que estrutura, organiza e mensura o conhecimento interno de empresas de tecnologia.

**Problema Resolvido:** Empresas gastam R$150k-200k/ano em plataformas genéricas (Udemy Business) mas enfrentam baixa taxa de engajamento (10-15%), conteúdo não customizável e impossibilidade de medir ROI.

**Solução:** Trilhas customizáveis, progresso rastreável, analytics corporativo.

📘 **Product Roadmap:** [docs/backlog/ROADMAP.md](docs/backlog/ROADMAP.md)
```

---

#### 3. **Arquivar PRODUCT-CENTRAL-DOCUMENT.md** 🟢 OPCIONAL

**Objetivo:** Mover documento deprecated para arquivo histórico

**Ações:**
- [ ] Criar diretório `docs/historico/`
- [ ] Mover `PRODUCT-CENTRAL-DOCUMENT.md` → `docs/historico/PRODUCT-CENTRAL-DOCUMENT-v2.4-deprecated.md`
- [ ] Criar arquivo stub na raiz redirecionando para ROADMAP.md

**Arquivo Stub (PRODUCT-CENTRAL-DOCUMENT.md):**
```markdown
# ⚠️ DOCUMENTO DEPRECATED

Este documento foi substituído por **ROADMAP.md v3.0** após pivô do produto de B2C para B2B.

**Consultar:** [docs/backlog/ROADMAP.md](docs/backlog/ROADMAP.md)

**Arquivo Histórico:** [docs/historico/PRODUCT-CENTRAL-DOCUMENT-v2.4-deprecated.md](docs/historico/PRODUCT-CENTRAL-DOCUMENT-v2.4-deprecated.md)

**Motivo da Mudança:** O produto passou de foco individual (B2C) para corporativo (B2B), exigindo revisão completa de personas, métricas e roadmap.
```

---

### Sprint 2.1 - ÉPICO 14: Navegação (Dezembro 2025 - 70 pontos)

**Objetivo:** Implementar navegação por URL e tratamento de erros

**User Stories Priorizadas:**

#### **US-040: React Router** (13 pontos) 🔴 P0

**Como** desenvolvedor usando Ultrathink,
**Quero** navegar usando URLs diretas,
**Para** compartilhar links de aulas específicas com minha equipe.

**Critérios de Aceite:**
- [ ] React Router 6 instalado e configurado
- [ ] Rotas implementadas:
  - `/` - Hub
  - `/curso/:sistemaId` - Página do curso
  - `/curso/:sistemaId/aula/:aulaId` - Aula específica
  - `/trilha/:pathId` - Trilha de aprendizado
  - `/caderno/:sistemaId` - Caderno de notas
- [ ] Navegação por breadcrumb usa URLs
- [ ] Botão "Voltar" do navegador funciona
- [ ] Deep linking funciona (copiar URL e abrir em nova aba)
- [ ] 404 page para rotas inválidas

**Complexidade:** 13 pontos (estrutural, afeta toda navegação)

**Arquivos Impactados:**
- `src/App.jsx` (adicionar Router)
- `src/components/SistemaEducacionalCompleto.jsx` (refatorar navegação)
- `src/components/HubView.jsx`, `*LearningSystem.jsx`, `LearningPathView.jsx` (usar useNavigate)

**Referência Técnica:**
- [React Router v6 Docs](https://reactrouter.com/en/main)
- Skill: `.claude/skills/react-components-patterns/` (routing patterns)

---

#### **US-041: Tratamento de Erros localStorage** (5 pontos) 🟡 P1

**Como** usuário corporativo,
**Quero** ser notificado quando notas excedem limite de armazenamento,
**Para** não perder meu trabalho sem aviso.

**Critérios de Aceite:**
- [ ] Try/catch em todas operações localStorage
- [ ] Tratamento de QuotaExceededError
- [ ] Toast de aviso quando 80% do limite (5MB)
- [ ] Modal de erro com opções ao atingir 100%:
  - Exportar notas como .txt
  - Limpar notas antigas
  - Continuar sem salvar
- [ ] Limite de 50KB por nota individual

**Complexidade:** 5 pontos (refatoração + UI de erros)

**Arquivos Impactados:**
- `src/utils/localStorageHelper.js` (novo arquivo)
- Todos `*NotesView.jsx` (usar helper)

**Exemplo de Implementação:**
```javascript
// src/utils/localStorageHelper.js
export const saveNotes = (key, value) => {
  try {
    const size = new Blob([JSON.stringify(value)]).size;
    const limit = 5 * 1024 * 1024; // 5MB
    const used = getLocalStorageSize();

    if (used + size > limit * 0.8) {
      toast.warning('Armazenamento em 80%. Considere exportar notas.');
    }

    localStorage.setItem(key, JSON.stringify(value));
    return { success: true };
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      return {
        success: false,
        error: 'QUOTA_EXCEEDED',
        message: 'Limite de armazenamento atingido. Exporte suas notas.'
      };
    }
    return { success: false, error: 'UNKNOWN', message: error.message };
  }
};
```

---

#### **US-042: Persistir Progresso de Módulos** (8 pontos) 🟡 P1

**Como** gerente de engenharia (persona Ana),
**Quero** ver progresso de cada colaborador nas aulas,
**Para** acompanhar evolução do onboarding.

**Critérios de Aceite:**
- [ ] Checkbox "Marcar como completo" em cada aula
- [ ] Progresso salvo em localStorage (estrutura: `{ sistemaId: { aulaId: { completed: true, date: '2025-11-17' } } }`)
- [ ] Indicador visual de progresso (ex: "3/16 aulas concluídas")
- [ ] Barra de progresso no card do sistema (Hub)
- [ ] Filtro "Apenas não concluídas" na lista de aulas

**Complexidade:** 8 pontos (estado + persistência + UI)

**Arquivos Impactados:**
- `src/data/*LearningData.js` (adicionar campo `completed`)
- `src/components/*LearningSystem.jsx` (checkbox + lógica)
- `src/components/HubView.jsx` (indicador de progresso)

---

### Sprint 2.2 - ÉPICO 15: Qualidade (Janeiro 2026 - 92 pontos)

#### **US-019: Testes de Componentes Principais** (21 pontos) 🔴 P0

**Meta:** Cobertura de testes >= 30%

**Componentes a Testar:**
- [ ] HubView.test.jsx (navegação, 6 cards ativos)
- [ ] FlashcardModal.test.jsx (rotação 3D, navegação)
- [ ] CLearningSystem.test.jsx (50 aulas, progresso)
- [ ] Breadcrumb.test.jsx (navegação hierárquica, WCAG)

**Complexidade:** 21 pontos (4 componentes complexos)

---

#### **US-043: Refatorar BaseLearningSystem** (21 pontos) 🟡 P1

**Objetivo:** Reduzir duplicação de código de 25% para <10%

**Ações:**
- [ ] Criar `src/components/BaseLearningSystem.jsx` (componente genérico)
- [ ] Extrair hooks customizados:
  - `useAutoSaveNotes(sistemaId)` - Auto-save de notas
  - `useModuleProgress(sistemaId)` - Progresso de aulas
- [ ] Refatorar 5 Learning Systems para usar BaseLearningSystem
- [ ] Reduzir ~800 linhas de código duplicado

**Complexidade:** 21 pontos (refatoração estrutural)

**Referência Técnica:**
- Skill: `.claude/skills/component-refactor/`

---

### Sprint 3.1-3.3 - ÉPICO 16: Multi-Tenancy + ÉPICO 17: Analytics (Fevereiro-Março 2026)

**Detalhes completos em:** `docs/backlog/ROADMAP.md` (seções Release 3.0)

---

## 📊 Métricas de Sucesso

### Curto Prazo (6 meses - Q1-Q2 2026)

**Qualidade Técnica:**
- [ ] Cobertura de testes >= 30%
- [ ] Duplicação de código < 10%
- [ ] Bundle size < 600KB
- [ ] Lighthouse score >= 90

**Conteúdo:**
- [ ] 150 aulas prontas (atual: 110)
- [ ] 3 novos sistemas (Linux, Servidores, DevOps)

### Médio Prazo (12 meses - Q3-Q4 2026)

**Produto B2B:**
- [ ] 3-5 clientes piloto (contratos de R$80k-120k/ano cada)
- [ ] 500-1000 usuários corporativos ativos
- [ ] Engajamento >= 60% (vs 10-15% Udemy Business)
- [ ] NPS >= 50

### Longo Prazo (24 meses - 2027)

**Negócio:**
- [ ] 50+ empresas clientes
- [ ] ARR: R$500k - R$1M
- [ ] 10k+ colaboradores ativos
- [ ] Marketplace com 20+ cursos de terceiros

---

## 🔧 Ferramentas e Recursos

### Documentação de Referência

**SSOT (Single Source of Truth):**
- [`docs/backlog/ROADMAP.md`](../backlog/ROADMAP.md) - PRD B2B v3.0

**Contexto Técnico:**
- [`CLAUDE.md`](../../CLAUDE.md) - Instruções para Claude Code
- [`.claude/skills/`](../../.claude/skills/) - Skills técnicas (5 implementadas)

**Personas e Contexto:**
- [`docs/conceitual/01-visao-geral/05-personas-corporativas.md`](../conceitual/01-visao-geral/05-personas-corporativas.md)
- [`docs/conceitual/01-visao-geral/01-contexto-projeto.md`](../conceitual/01-visao-geral/01-contexto-projeto.md)

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev                # Servidor local (porta 3000)
npm run build              # Build de produção
npm test                   # Rodar testes
npm run test:coverage      # Cobertura de testes

# Validação
node test-usabilidade-mcp.cjs  # Testes E2E

# Claude Code
/test                      # Executar e analisar testes
/deploy local              # Build e deploy local
```

---

## ✅ Checklist de Início de Sprint

**Antes de Implementar US-040 (React Router):**
- [ ] Validar ROADMAP.md com João Pelegrino
- [ ] Atualizar README.md com contexto B2B
- [ ] Arquivar PRODUCT-CENTRAL-DOCUMENT.md (opcional)
- [ ] Criar branch: `feature/US-040-react-router`
- [ ] Ler critérios de aceite em ROADMAP.md
- [ ] Consultar skill: `react-components-patterns`

**Workflow de Implementação:**
1. ✅ Ler User Story em ROADMAP.md
2. ✅ Criar branch feature/US-XXX
3. ✅ Implementar critérios de aceite
4. ✅ Escrever testes (se aplicável)
5. ✅ Validar build: `npm run build`
6. ✅ Testar localmente: `npm run dev`
7. ✅ Marcar critérios como ✅ em ROADMAP.md
8. ✅ Commitar: `feat: implementa US-040 - React Router`
9. ✅ Atualizar status: TODO → IN PROGRESS → DONE

---

## 🎯 Resumo Executivo

### O Que Mudou (Sessão Anterior)
- ✅ Produto pivotou de B2C para B2B
- ✅ ROADMAP.md criado como SSOT (v3.0 B2B)
- ✅ 3 Personas corporativas definidas (Carlos, Ana, Roberto)
- ✅ 4 Releases planejadas (até Q3 2026)
- ✅ PRODUCT-CENTRAL-DOCUMENT.md deprecated

### Próxima Ação Imediata
**Validar ROADMAP.md com stakeholder (João Pelegrino)** 🔴 CRÍTICO

### Próximo Sprint (Sprint 2.1 - Dezembro 2025)
**Implementar ÉPICO 14: Navegação** (70 pontos)
- US-040: React Router (13 pontos)
- US-041: Tratamento erros localStorage (5 pontos)
- US-042: Persistir progresso (8 pontos)

---

**★ Insight - Product Management B2B**

```
★ Insight ─────────────────────────────────────────────────

Lição Aprendida: Pivô B2C → B2B exige "reset" completo da documentação

O que mudou:
- Personas: "João, dev iniciante" → "Carlos (CTO), Ana (Gerente), Roberto (RH)"
- Problema: "Conteúdo disperso" → "R$180k/ano desperdiçados em Udemy Business"
- Métricas: "Tempo de estudo, cards completados" → "Engajamento 60%, NPS 70, ARR R$500k"
- Features: "Gamificação pessoal" → "Multi-tenancy, SSO, Analytics corporativo"

Por que criar ROADMAP.md novo (vs editar PRODUCT-CENTRAL):
✅ Clareza: Time sabe qual documento seguir
✅ Histórico preservado: Decisões B2C documentadas
✅ Alinhamento total: Código, docs, personas, métricas

Pattern identificado:
Quando produto faz pivô, criar novo SSOT (não tentar "adaptar" o antigo).
Marcar antigo como DEPRECATED com redirecionamento claro.

─────────────────────────────────────────────────────────
```

---

**📅 Última atualização:** 2025-11-17
**✅ Status:** Ativo - Guia de próximas ações
**🔄 Próxima revisão:** Após validação com stakeholder
**👤 Responsável:** João Pelegrino
