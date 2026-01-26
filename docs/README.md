# Documentação TrainB2B - Plataforma de Treinamento Corporativo

> **Plataforma B2B White-Label de Treinamento Técnico Corporativo**
>
> **Versão da Documentação:** 9.0.0
> **Data:** 2026-01-26
> **Sprint Atual:** 13 (White-Label) - COMPLETO
> **Status:** Produção

---

## ⭐ LEIA PRIMEIRO

### Contexto Atual do Projeto

O **TrainB2B** é uma plataforma B2B white-label de treinamento técnico corporativo, oferecendo:

- ✅ **Autenticação Multi-tenant** com 4 roles (student, instructor, admin, c_level)
- ✅ **Sistema RBAC** com 21 permissões (81% implementado com UI)
- ✅ **Dashboards por Role** (Admin, Executive, Instructor, User)
- ✅ **CRUD Completo** de usuários com soft delete
- ✅ **Matrículas em Cursos** com data limite
- ✅ **Exportação** Excel/JSON de relatórios
- ✅ **Analytics Avançados** (módulos difíceis, progresso)
- ✅ **Internacionalização** i18n (pt-BR, en-US, es-ES)
- ✅ **Arquitetura White-Label** configurável via variáveis de ambiente
- ✅ **Stack moderno** (React + Vite + Tailwind + NocoDB + PostgreSQL)

**Estado Atual (Sprint 13 COMPLETO):**
- 📦 **43 User Stories** implementadas (Sprints 6-13)
- 🎯 **4 Dashboards** funcionais por role
- 🌐 **3 idiomas** com troca instantânea
- 🏷️ **White-Label** com nome/prefixo configurável
- 📊 **RBAC:** 81% completo (17/21 permissões com UI)

**Sprints Completos:**
- ✅ Sprint 6: Base B2B (19 USs)
- ✅ Sprint 7: CRUD Usuários (3 USs)
- ✅ Sprint 8: Dashboard Instrutor (3 USs)
- ✅ Sprint 9: Matrículas e Exportação (4 USs)
- ✅ Sprint 10: Analytics + Polish (4 USs)
- ✅ Sprint 11: UX Polish (4 USs)
- ✅ Sprint 12: Internacionalização (6 USs)
- ✅ Sprint 13: White-Label (6 USs)

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

## Progresso da Documentação

| Documento | Status | Completude | Última Atualização |
|-----------|--------|------------|-------------------|
| **Backlog & Roadmap** | | | |
| ROADMAP.md | ✅ Completo | 100% | 2026-01-26 |
| GAPS-DEMO-B2B.md | ✅ Completo | 100% | 2026-01-26 |
| **Documentação Conceitual** | | | |
| 00-definicoes-principais.md | ✅ Existente | 100% | 2025-12 |
| 01-contexto-projeto.md | ✅ Existente | 100% | 2025-12 |
| 04-modelo-dominio.md | ✅ Existente | 100% | 2025-12 |
| 05-personas-corporativas.md | ✅ Existente | 100% | 2025-12 |
| **Documentação Técnica** | | | |
| ANALISE-I18N-INTERNACIONALIZACAO.md | ✅ Completo | 100% | 2026-01-25 |
| MCP-CHROME-DEVTOOLS-*.md | ✅ Completo | 100% | 2026-01 |
| **Raiz do Projeto** | | | |
| CLAUDE.md | ✅ Completo | 100% | 2026-01-26 (v9.0.0) |
| README.md | ✅ Completo | 100% | 2026-01-26 |

**Status:** Documentação alinhada com Sprint 13 (White-Label)

---

## Estrutura de Documentação

```
docs/
├── README.md                              # Você está aqui
│
├── backlog/                               # Planejamento e roadmap
│   ├── ROADMAP.md                         # Roadmap principal (v9.0.0)
│   ├── GAPS-DEMO-B2B.md                   # Análise de gaps (v8.0.0)
│   ├── ESTUDO-REFATORACAO-WHITE-LABEL-2026-01-26.md  # Sprint 13
│   ├── acoes-usuario/                     # Templates de ações
│   └── arquivo-2026-01/                   # Backlogs históricos arquivados
│
├── backend/                               # Documentação backend
│   ├── NOCODB-QUICKSTART.md               # Setup NocoDB
│   └── PERSONAS-NAO-TECNICAS.md           # Guia para não-técnicos
│
├── conceitual/                            # Documentação de produto
│   └── 01-visao-geral/
│       ├── 00-definicoes-principais.md    # Glossário autoritativo
│       ├── 01-contexto-projeto.md         # Problema + solução
│       ├── 04-modelo-dominio.md           # Hierarquia de dados
│       └── 05-personas-corporativas.md    # Personas B2B
│
├── screenshots/                           # Evidências visuais
│
└── tecnico/                               # Documentação técnica
    ├── architecture/
    │   └── 01-visao-geral-arquitetura.md
    ├── arquitetura/
    │   └── ANALISE-I18N-INTERNACIONALIZACAO.md  # Sprint 12
    └── testing/
        ├── MCP-CHROME-DEVTOOLS-*.md       # Guias MCP
        ├── QA-E2E-SPECS-MCP.md            # Specs de testes E2E
        └── README.md
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

## Próximos Passos (Sprint 14)

### Sugestões para próximo sprint
- **US-125:** CRUD de cursos (courses.create/edit)
- **US-126:** Certificados de conclusão
- **US-127:** Tour guiado real (highlight UI)
- **US-128:** Notificações push/email

### Merge pendente
```bash
# Branch feature/white-label-refactor está pronta para merge
git checkout desenvolvimento
git merge feature/white-label-refactor
```

---

**Você está em:** `docs/README.md` - Índice Geral de Documentação
**Última atualização:** 2026-01-26
**Mantido por:** Claude Code
**Status:** Sprint 13 COMPLETO - Produção
