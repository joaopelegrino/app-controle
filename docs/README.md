# 📚 Documentação Plataforma B2B de treinamento técnico corporativo - Índice Geral

> **Plataforma B2B de treinamento técnico corporativo para Treinamento Técnico de Qualidade**
>
> **Versão da Documentação:** 1.0.0
> **Data:** 2025-11-14
> **Status:** 🔄 Em Desenvolvimento

---

## ⭐ LEIA PRIMEIRO

### Contexto Atual do Projeto

O **Plataforma B2B de treinamento técnico corporativo** é um sistema educacional interativo que resolve a dor de **empresas que precisam estruturar treinamentos internos com qualidade**, oferecendo:

- ✅ **Conteúdo estruturado** em hierarquia clara (Hub → Curso → Aula → Prática)
- ✅ **Progresso mensurável** com métricas de completude e engajamento
- ✅ **Experiência imersiva** com flash cards 3D e vídeos integrados
- ✅ **Autonomia de aprendizado** com sistema de notas e auto-avaliação
- ✅ **Stack moderno e escalável** (React + Vite + Tailwind + Docker)

**Estado Atual:**
- 📦 **Release 1.0** concluída (227 módulos, 692h de conteúdo)
- 🎯 **13 áreas de estudo** (C, Rust, Bash, Docker, Kubernetes, VSCode, etc.)
- 🚀 **5 sistemas integrados** + 1 caminho de aprendizado
- 📊 **Nota geral:** 9.0/10 ⭐

**Próximas Releases:**
- 🔄 **Release 2.0** (Q1 2026) - React Router, Refatoração, Testes (30%)
- 🎨 **Release 3.0** (Q2 2026) - Dark Mode, TypeScript, Acessibilidade
- 🚀 **Release 4.0** (Q3 2026) - PWA, Sistema de Conquistas, Recursos Sociais

---

## 🗺️ Navegação Rápida por Persona

### 👔 Gestor de RH / Gerente de Treinamento
**Objetivo:** Entender o valor corporativo e ROI do Plataforma B2B de treinamento técnico corporativo

**Tempo de leitura:** ~2 horas

1. **[01-contexto-projeto.md](conceitual/01-visao-geral/01-contexto-projeto.md)** (30 min)
   → Problema corporativo, solução proposta, diferenciais

2. **[00-definicoes-principais.md](conceitual/01-visao-geral/00-definicoes-principais.md)** (45 min)
   → Glossário de termos, hierarquia de conteúdo, casos de uso

3. **[05-personas-corporativas.md](conceitual/01-visao-geral/05-personas-corporativas.md)** (30 min)
   → Personas de usuários corporativos, jornadas, métricas de sucesso

4. **[PRODUCT-CENTRAL-DOCUMENT.md](../PRODUCT-CENTRAL-DOCUMENT.md)** (15 min - seções selecionadas)
   → Roadmap, releases planejadas, features

**Resultado:** Compreensão completa do valor de negócio e aplicabilidade corporativa.

---

### 👨‍💻 Desenvolvedor (Novo no Projeto)
**Objetivo:** Configurar ambiente, entender arquitetura e começar a contribuir

**Tempo de leitura:** ~3-4 horas

1. **[README.md](../README.md)** (15 min)
   → Setup rápido, comandos principais

2. **[00-definicoes-principais.md](conceitual/01-visao-geral/00-definicoes-principais.md)** (1h)
   → Glossário técnico, hierarquia de componentes, modelo de domínio

3. **[04-modelo-dominio.md](conceitual/01-visao-geral/04-modelo-dominio.md)** (1h)
   → Estrutura de dados, relacionamentos, regras de negócio

4. **[01-visao-geral-arquitetura.md](tecnico/architecture/01-visao-geral-arquitetura.md)** (1h)
   → Decisões arquiteturais, componentes, fluxo de dados

5. **[CLAUDE.md](../CLAUDE.md)** (30 min - referência)
   → Convenções de código, padrões, regras para Claude Code

6. **[01-stack-tecnologico.md](tecnico/stack-implementation/01-stack-tecnologico.md)** (30 min)
   → Stack completo, ferramentas, setup de ambiente

**Resultado:** Ambiente configurado e pronto para primeira contribuição.

---

### 🎨 Designer / UX Researcher
**Objetivo:** Entender fluxos de usuário, hierarquia de informação e padrões de design

**Tempo de leitura:** ~2 horas

1. **[01-contexto-projeto.md](conceitual/01-visao-geral/01-contexto-projeto.md)** (30 min)
   → Visão do produto, objetivos de UX

2. **[05-personas-corporativas.md](conceitual/01-visao-geral/05-personas-corporativas.md)** (45 min)
   → Personas, user journeys, pain points

3. **[00-definicoes-principais.md](conceitual/01-visao-geral/00-definicoes-principais.md)** (30 min)
   → Glossário de nomenclatura, princípios de design

4. **Screenshots e validações** (15 min)
   → [screenshots/](../screenshots/) - Evidências visuais do sistema

**Resultado:** Compreensão completa dos fluxos e oportunidades de melhoria UX.

---

### 🎓 Aprendiz / Usuário Final (João Pelegrino)
**Objetivo:** Usar o sistema para aprender programação

**Tempo de leitura:** ~30 minutos

1. **[README.md](../README.md)** (15 min)
   → Como acessar, primeiros passos, funcionalidades principais

2. **[01-contexto-projeto.md](conceitual/01-visao-geral/01-contexto-projeto.md)** (15 min - seção "O que é")
   → Visão geral do sistema, o que você pode fazer

3. **Exploração prática** (imediato)
   → http://localhost:3000 - Experimentar Hub, Cursos, Flash Cards

**Resultado:** Começar a estudar imediatamente com confiança.

---

### 🤖 Claude Code / LLM Assistant
**Objetivo:** Contexto completo para auxiliar desenvolvimento e manutenção

**Tempo de leitura:** ~2-3 horas (processamento)

1. **[CLAUDE.md](../CLAUDE.md)** (PRIORIDADE MÁXIMA)
   → System prompt, regras, convenções, comandos

2. **[00-definicoes-principais.md](conceitual/01-visao-geral/00-definicoes-principais.md)**
   → Glossário canônico, modelo de domínio

3. **[01-contexto-projeto.md](conceitual/01-visao-geral/01-contexto-projeto.md)**
   → História, contexto, objetivos

4. **[PRODUCT-CENTRAL-DOCUMENT.md](../PRODUCT-CENTRAL-DOCUMENT.md)**
   → PRD, User Stories, Backlog

5. **[01-visao-geral-arquitetura.md](tecnico/architecture/01-visao-geral-arquitetura.md)**
   → Arquitetura técnica, decisões de design

**Resultado:** Assistente preparado para realizar qualquer tarefa com contexto completo.

---

## 📊 Progresso da Documentação

| Documento | Status | Completude | Prioridade | Última Atualização |
|-----------|--------|------------|------------|-------------------|
| **Documentação Conceitual** | | | | |
| 00-definicoes-principais.md | 📋 Planejado | 0% | 🔴 Alta | - |
| 01-contexto-projeto.md | 📋 Planejado | 0% | 🔴 Alta | - |
| 03-glossario.md | 📋 Planejado | 0% | 🟡 Média | - |
| 04-modelo-dominio.md | 📋 Planejado | 0% | 🟡 Média | - |
| 05-personas-corporativas.md | 📋 Planejado | 0% | 🔴 Alta | - |
| **Documentação Técnica** | | | | |
| 01-visao-geral-arquitetura.md | 📋 Planejado | 0% | 🟡 Média | - |
| 01-stack-tecnologico.md | 📋 Planejado | 0% | 🟢 Baixa | - |
| 01-estrategia-testes.md | 📋 Planejado | 0% | 🟢 Baixa | - |
| **Documentação Existente** | | | | |
| CLAUDE.md | ✅ Completo | 100% | ⭐ Crítico | 2025-11-13 |
| PRODUCT-CENTRAL-DOCUMENT.md | ✅ Completo | 100% | ⭐ Crítico | 2025-11-13 |
| README.md | ✅ Completo | 100% | ⭐ Crítico | 2025-11-13 |
| MCP-CHROME-DEVTOOLS-*.md | ✅ Completo | 100% | 🟡 Média | 2025-11-13 |

**Meta:** 100% da documentação conceitual até Sprint 3.2 (2 semanas)

---

## 📁 Estrutura de Documentação

```
docs/
├── README.md                              # 📍 Você está aqui
│
├── conceitual/                            # Documentação de produto e negócio
│   ├── README.md                          # Índice conceitual
│   └── 01-visao-geral/
│       ├── 00-definicoes-principais.md    # 🎯 CANÔNICO - Glossário autoritativo
│       ├── 01-contexto-projeto.md         # Problema corporativo + solução
│       ├── 03-glossario.md                # Termos técnicos expandidos
│       ├── 04-modelo-dominio.md           # Hierarquia Hub→Curso→Aula
│       └── 05-personas-corporativas.md    # Admin RH, Instrutor, Colaborador
│
├── tecnico/                               # Documentação de implementação
│   ├── README.md                          # Índice técnico
│   ├── architecture/
│   │   ├── 01-visao-geral-arquitetura.md  # Decisões arquiteturais
│   │   ├── 02-modelo-dados.md             # localStorage, studyAreas.js
│   │   └── 03-componentes.md              # 18 componentes React
│   ├── stack-implementation/
│   │   ├── 01-stack-tecnologico.md        # React + Vite + Tailwind + Docker
│   │   ├── 02-setup-ambiente.md           # Como rodar localmente
│   │   └── 03-build-deploy.md             # Docker + GitHub Actions
│   ├── testing/
│   │   ├── 01-estrategia-testes.md        # Vitest + Playwright
│   │   ├── 02-mcp-chrome-devtools.md      # → MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md
│   │   ├── 03-mcp-manual-uso.md           # → MCP-CHROME-DEVTOOLS-MANUAL-USO.md
│   │   └── 04-mcp-quick-start.md          # → MCP-CHROME-DEVTOOLS-QUICK-START.md
│   └── patterns/
│       ├── 01-component-patterns.md       # Padrões React (hooks, composition)
│       └── 02-data-patterns.md            # Como estruturar dados de cursos
│
├── MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md   # ✅ Já existe (mover para tecnico/testing/)
├── MCP-CHROME-DEVTOOLS-MANUAL-USO.md      # ✅ Já existe (mover para tecnico/testing/)
├── MCP-CHROME-DEVTOOLS-QUICK-START.md     # ✅ Já existe (mover para tecnico/testing/)
└── TEMPLATE-CURSO-PADRAO.md               # ✅ Já existe (template de conteúdo)
```

---

## 🎯 Hierarquia de Autoridade (Em Caso de Conflito)

```
1. 00-definicoes-principais.md             # ⭐ DOCUMENTO CANÔNICO
   ↓
2. Demais docs em conceitual/01-visao-geral/
   ↓
3. PRODUCT-CENTRAL-DOCUMENT.md             # PRD e User Stories
   ↓
4. CLAUDE.md                               # System prompt para Claude Code
   ↓
5. Documentação técnica (tecnico/)
   ↓
6. README.md                               # Visão geral para usuários
```

**Regra:**
- Se houver inconsistência entre documentos, **sempre prevalece o documento de maior prioridade**
- Outros devem ser atualizados para alinhar
- Reportar via TODO list ou GitHub Issue

---

## ✅ Checklist de Compreensão Completa

Após ler a documentação relevante para sua persona, você deve ser capaz de responder:

### Para Gestores/RH
- [ ] Qual problema corporativo o Plataforma B2B de treinamento técnico corporativo resolve?
- [ ] Quais são os 3 principais diferenciais vs. plataformas tradicionais (Moodle, Udemy)?
- [ ] Como medir ROI do treinamento (métricas disponíveis)?
- [ ] Qual o custo de implementação e manutenção?
- [ ] Como escala para 100, 500, 1000 colaboradores?

### Para Desenvolvedores
- [ ] Como clonar e rodar o projeto localmente?
- [ ] Qual a estrutura de componentes React?
- [ ] Como adicionar um novo curso/módulo?
- [ ] Onde estão os dados (studyAreas.js, *LearningData.js)?
- [ ] Como rodar testes e validar build?
- [ ] Quais são as convenções de código (nomenclatura, commits)?

### Para Designers/UX
- [ ] Quais são as 3 personas principais de usuários corporativos?
- [ ] Qual a jornada de um colaborador desde login até conclusão de curso?
- [ ] Quais são os princípios de design (hierarquia, cores, tipografia)?
- [ ] Como funciona o sistema de progresso visual?
- [ ] Quais são as dores de usabilidade identificadas (relatórios)?

### Para Usuários Finais (Aprendizes)
- [ ] Como acessar o sistema?
- [ ] Como navegar: Hub → Curso → Aula?
- [ ] Como fazer anotações e salvar progresso?
- [ ] Como usar flash cards 3D?
- [ ] Como saber meu progresso em cada curso?

---

## 📚 Documentos de Referência Externos

### Raiz do Projeto (Críticos)
- **[../CLAUDE.md](../CLAUDE.md)** - Instruções para Claude Code ⭐
- **[../PRODUCT-CENTRAL-DOCUMENT.md](../PRODUCT-CENTRAL-DOCUMENT.md)** - PRD + User Stories ⭐
- **[../README.md](../README.md)** - README principal ⭐

### Histórico e Backlogs
- **[../.claude/meta-docs/INDEX.md](../.claude/meta-docs/INDEX.md)** - Índice de 12 documentos históricos
- Backlogs de sprints anteriores (ÉPICO 12, Sprint 25, US-071)
- Relatórios de validação (ÉPICO 12, US-061, MCP Chrome DevTools)

### Screenshots e Evidências
- **[../screenshots/](../screenshots/)** - 11 screenshots de validação
- Análises de usabilidade (hub, sistema bash, flash cards)

---

## 🔄 Processo de Atualização desta Documentação

**Frequência:** Toda sprint (a cada 2 semanas)

**Responsabilidades:**
1. **Desenvolvedor/João:** Atualiza docs técnicos após implementações
2. **Claude Code:** Sugere atualizações baseado em mudanças no código
3. **Gestor/Product:** Valida alinhamento com roadmap

**Changelog:**
| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 1.0.0 | 2025-11-14 | Criação inicial da estrutura de documentação | Claude Code |

---

## 🚀 Próximos Passos

### Alta Prioridade 🔴
1. **Criar 00-definicoes-principais.md** - Glossário canônico do Plataforma B2B de treinamento técnico corporativo
2. **Criar 01-contexto-projeto.md** - Problema corporativo + solução
3. **Criar 05-personas-corporativas.md** - Admin RH, Instrutor, Colaborador

### Média Prioridade 🟡
4. **Criar 04-modelo-dominio.md** - Hierarquia Hub→Curso→Aula detalhada
5. **Criar 01-visao-geral-arquitetura.md** - Decisões técnicas documentadas
6. **Reorganizar guias MCP** - Mover para tecnico/testing/

### Baixa Prioridade 🟢
7. **Expandir documentação técnica** - Component patterns, data patterns
8. **Criar guias de setup** - Ambiente local, Docker, CI/CD

---

**📍 Você está em:** `docs/README.md` - Índice Geral de Documentação
**📅 Última atualização:** 2025-11-14
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** 🔄 Estrutura criada, conteúdo em desenvolvimento
