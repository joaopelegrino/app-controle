# Plano de Consolidação da Documentação

**Data:** 2026-02-05
**Objetivo:** Unificar documentação em estrutura coerente com descrição completa da solução
**Status:** 🟡 Em Planejamento

---

## 1. Diagnóstico da Situação Atual

### 1.1 Problemas Identificados

| Problema | Impacto | Exemplo |
|----------|---------|---------|
| **Documentação fragmentada** | Informação espalhada em 67+ arquivos | Personas em 3 arquivos diferentes |
| **Duplicação de conteúdo** | Versões conflitantes | ROADMAP.md vs ROADMAP-DEMO-B2B.md |
| **Informação desatualizada** | Docs de 2025 vs código de 2026 | 5 cursos prometidos vs 1 implementado |
| **Visão incompleta** | Falta descrição do Hub de Especialistas | Seção 8 adicionada mas não integrada |
| **Sem hierarquia clara** | Difícil saber por onde começar | Novo dev fica perdido |
| **Questões não respondidas** | Decisões de produto não documentadas | Modelo de revenue share não definido |

### 1.2 Inventário de Documentos (67 arquivos .md)

```
CATEGORIA                          QTD    STATUS
─────────────────────────────────────────────────
Conceitual (visão, personas)        5     ⚠️ Parcialmente desatualizado
PRDs e Specs                        3     ⚠️ Fragmentado
Backlog e Roadmap                  15     ⚠️ Arquivos arquivados misturados
Técnico (arquitetura, testing)      8     ✅ Bom estado
Deploy e Infra                      5     ✅ Bom estado
Guias de Usuário                    4     ✅ Bom estado
Referência                          3     ✅ Bom estado
Templates                           3     ✅ Bom estado
Relatórios (forense, gaps)          4     ✅ Recentes
Outros (README, index)              7     ⚠️ Índices desatualizados
```

---

## 2. Estrutura Alvo Proposta

### 2.1 Nova Organização

```
docs/
├── 📋 01-PRODUTO/                    ⭐ DOCUMENTAÇÃO DE PRODUTO
│   ├── 01-visao-e-missao.md          Visão, missão, propósito
│   ├── 02-problema-e-solucao.md      Problema que resolve, proposta de valor
│   ├── 03-modelo-de-negocios.md      Open Core + Hub de Especialistas
│   ├── 04-personas.md                4 personas + 1 especialista externo
│   ├── 05-jornadas-usuario.md        User journeys detalhados
│   ├── 06-glossario.md               Termos canônicos únicos
│   └── 07-questoes-em-aberto.md      ⭐ NOVO: Perguntas para evolução
│
├── 📐 02-ESPECIFICACAO/              SPECS FUNCIONAIS
│   ├── 01-modelo-dominio.md          Hierarquia Hub→Curso→Aula
│   ├── 02-funcionalidades.md         Lista completa de features
│   ├── 03-rbac-permissoes.md         21 permissões detalhadas
│   ├── 04-hub-especialistas.md       ⭐ NOVO: Spec completa do Hub
│   └── 05-integrações.md             APIs externas, SSO, etc.
│
├── 🏗️ 03-ARQUITETURA/                SPECS TÉCNICAS
│   ├── 01-visao-geral.md             Stack, diagrama, decisões
│   ├── 02-frontend.md                React, componentes, estado
│   ├── 03-backend.md                 NocoDB, PostgreSQL, API
│   ├── 04-banco-dados.md             Schema, migrations, seeds
│   └── 05-i18n.md                    Internacionalização
│
├── 🧪 04-QUALIDADE/                  TESTES E QA
│   ├── 01-estrategia-testes.md       Pirâmide, cobertura, ferramentas
│   ├── 02-specs-e2e.md               37 casos de teste
│   ├── 03-mcp-browser-testing.md     Guia de automação
│   └── 04-checklist-release.md       Critérios de aceite
│
├── 🚀 05-OPERACOES/                  DEPLOY E INFRA
│   ├── 01-deploy-local.md            Docker Compose
│   ├── 02-deploy-producao.md         Fly.io, CI/CD
│   ├── 03-monitoramento.md           Logs, métricas, alertas
│   └── 04-troubleshooting.md         Problemas comuns
│
├── 👥 06-GUIAS-USUARIO/              MANUAIS
│   ├── 01-admin.md
│   ├── 02-instructor.md
│   ├── 03-student.md
│   ├── 04-executive.md
│   └── 05-especialista.md            ⭐ NOVO: Guia do especialista
│
├── 📊 07-GESTAO/                     BACKLOG E ROADMAP
│   ├── 01-roadmap.md                 Visão de releases
│   ├── 02-sprint-atual.md            Sprint corrente
│   ├── 03-backlog.md                 User stories pendentes
│   ├── 04-decisoes-arquitetura.md    ADRs
│   └── arquivo/                      Sprints passados
│
├── 📚 08-REFERENCIA/                 CONSULTA RÁPIDA
│   ├── 01-comandos-cli.md
│   ├── 02-api-endpoints.md
│   ├── 03-componentes-ui.md
│   └── 04-variaveis-ambiente.md
│
└── 📁 99-ARQUIVO/                    DOCUMENTOS HISTÓRICOS
    ├── relatorios/
    ├── analises/
    └── legado/
```

---

## 3. Questões em Aberto (Para Alinhamento)

### 3.1 Hub de Especialistas - Perguntas Não Respondidas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HUB DE ESPECIALISTAS - QUESTÕES EM ABERTO                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔴 MODELO DE NEGÓCIO                                                       │
│  ────────────────────                                                       │
│  Q1. Revenue share é 70/30? Ou varia por tier do especialista?             │
│      [ ] Fixo 70/30                                                         │
│      [ ] Variável (60/40 bronze, 70/30 prata, 80/20 ouro)                  │
│      [x] A definir                                                          │
│                                                                             │
│  Q2. Especialista paga mensalidade para estar no hub?                      │
│      [ ] Não, apenas revenue share                                          │
│      [ ] Sim, R$ 99/mês para destaque                                       │
│      [x] A definir                                                          │
│                                                                             │
│  Q3. Preço do curso é definido pelo especialista ou pela plataforma?       │
│      [ ] Especialista define livremente                                     │
│      [ ] Plataforma sugere faixa (R$ 50-200)                               │
│      [ ] Plataforma define baseado em métricas                              │
│      [x] A definir                                                          │
│                                                                             │
│  🟡 PROCESSO DE CADASTRO                                                    │
│  ────────────────────────                                                   │
│  Q4. Quais credenciais são obrigatórias para especialista?                 │
│      [ ] LinkedIn verificado                                                │
│      [ ] Certificações técnicas                                             │
│      [ ] Anos de experiência comprovados                                    │
│      [ ] Portfolio/GitHub                                                   │
│      [x] A definir                                                          │
│                                                                             │
│  Q5. Existe processo de aprovação de curso antes de publicar?              │
│      [ ] Não, especialista publica direto                                   │
│      [ ] Sim, revisão manual pela plataforma                                │
│      [ ] Sim, revisão automatizada (checklist)                              │
│      [x] A definir                                                          │
│                                                                             │
│  Q6. Especialista pode ser removido? Quais critérios?                      │
│      [ ] Rating abaixo de X estrelas                                        │
│      [ ] Reclamações de empresas                                            │
│      [ ] Inatividade por X meses                                            │
│      [x] A definir                                                          │
│                                                                             │
│  🟢 FUNCIONALIDADES TÉCNICAS                                                │
│  ────────────────────────────                                               │
│  Q7. Especialista tem dashboard próprio com analytics?                     │
│      [x] Sim, visualiza matrículas, receita, feedback                       │
│      [ ] Não, apenas recebe relatório mensal por email                      │
│      [ ] A definir                                                          │
│                                                                             │
│  Q8. Empresa pode avaliar/dar review no curso?                             │
│      [x] Sim, rating 1-5 estrelas + comentário                              │
│      [ ] Sim, apenas rating sem comentário                                  │
│      [ ] Não, apenas métricas de conclusão                                  │
│      [ ] A definir                                                          │
│                                                                             │
│  Q9. Empresa pode solicitar curso customizado ao especialista?             │
│      [x] Sim, via chat/mensagem na plataforma                               │
│      [ ] Sim, mas negociação é externa                                      │
│      [ ] Não, apenas catálogo padrão                                        │
│      [ ] A definir                                                          │
│                                                                             │
│  Q10. Especialista pode oferecer mentoria 1:1 além de cursos?              │
│      [x] Sim, como serviço adicional                                        │
│      [ ] Não, apenas cursos assíncronos                                     │
│      [ ] A definir                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Modelo de Negócio - Perguntas Não Respondidas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MODELO DE NEGÓCIO - QUESTÕES EM ABERTO                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔴 PRECIFICAÇÃO                                                            │
│  ───────────────                                                            │
│  Q11. Preços SaaS são por usuário ou flat fee?                             │
│       [ ] Flat fee (R$ 499/mês até X usuários)                              │
│       [ ] Por usuário (R$ X/usuário/mês)                                    │
│       [ ] Híbrido (base + excedente)                                        │
│       [x] A definir                                                         │
│                                                                             │
│  Q12. Existe trial gratuito? Por quanto tempo?                             │
│       [ ] 14 dias                                                           │
│       [ ] 30 dias                                                           │
│       [ ] Não, apenas demo guiada                                           │
│       [x] A definir                                                         │
│                                                                             │
│  Q13. Desconto para pagamento anual?                                       │
│       [ ] 2 meses grátis (16%)                                              │
│       [ ] 20% de desconto                                                   │
│       [ ] Não oferece                                                       │
│       [x] A definir                                                         │
│                                                                             │
│  🟡 SEGMENTAÇÃO                                                             │
│  ──────────────                                                             │
│  Q14. Qual o tamanho mínimo de empresa para Enterprise?                    │
│       [ ] 200+ usuários                                                     │
│       [ ] 500+ usuários                                                     │
│       [ ] Negociação caso a caso                                            │
│       [x] A definir                                                         │
│                                                                             │
│  Q15. Community Edition tem limitações funcionais?                         │
│       [ ] Não, apenas sem suporte                                           │
│       [ ] Sim, sem analytics avançado                                       │
│       [ ] Sim, sem white-label                                              │
│       [x] A definir                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Funcionalidades - Perguntas Não Respondidas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FUNCIONALIDADES - QUESTÕES EM ABERTO                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔴 CERTIFICADOS                                                            │
│  ───────────────                                                            │
│  Q16. Certificado tem validade? (ex: 2 anos)                               │
│       [ ] Não, permanente                                                   │
│       [ ] Sim, precisa recertificar                                         │
│       [x] A definir                                                         │
│                                                                             │
│  Q17. Certificado é verificável externamente? (URL pública)                │
│       [ ] Sim, com QR code e URL                                            │
│       [ ] Não, apenas PDF interno                                           │
│       [x] A definir                                                         │
│                                                                             │
│  🟡 TRILHAS E CURSOS                                                        │
│  ──────────────────                                                         │
│  Q18. Empresa pode criar cursos próprios além dos do marketplace?          │
│       [ ] Sim, editor WYSIWYG                                               │
│       [ ] Sim, apenas upload de conteúdo                                    │
│       [ ] Não, apenas cursos do marketplace                                 │
│       [ ] A definir                                                         │
│       [x] Upload no hub com a opcao de mante com visivilidade restrita      │
│                                                                             │
│  Q19. Trilha pode misturar cursos internos + externos?                     │
│       [ ] Sim, totalmente flexível                                          │
│       [ ] Não, separados                                                    │
│       [x] A definir                                                         │
│                                                                             │
│  Q20. Existe pré-requisito entre cursos? (curso A antes de B)              │
│       [x] Sim, configurável                                                 │
│       [ ] Não, qualquer ordem                                               │
│       [ ] A definir                                                         │
│                                                                             │
│  🟢 GAMIFICAÇÃO                                                             │
│  ─────────────                                                              │
│  Q21. Existe sistema de badges/conquistas além de certificados?            │
│       [ ] Sim, badges por marcos (10 aulas, 100 horas)                      │
│       [ ] Não, apenas certificados                                          │
│       [x] A definir                                                         │
│                                                                             │
│  Q22. Existe leaderboard (ranking) entre usuários?                         │
│       [ ] Sim, por empresa                                                  │
│       [ ] Sim, global                                                       │
│       [ ] Não                                                               │
│       [x] A definir                                                         │
│                                                                             │
│  Q23. Existe sistema de pontos/XP?                                         │
│       [ ] Sim, com recompensas                                              │
│       [ ] Sim, apenas visual                                                │
│       [ ] Não                                                               │
│       [x] A definir                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Integrações - Perguntas Não Respondidas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INTEGRAÇÕES - QUESTÕES EM ABERTO                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔴 SSO E AUTENTICAÇÃO                                                      │
│  ─────────────────────                                                      │
│  Q24. Quais provedores SSO serão suportados?                               │
│       [ ] Google Workspace                                                  │
│       [ ] Microsoft Azure AD                                                │
│       [ ] Okta                                                              │
│       [ ] SAML genérico                                                     │
│       [ ] LDAP                                                              │
│       [x] A definir                                                         │
│                                                                             │
│  Q25. SSO é feature de qual tier?                                          │
│       [ ] Todos (inclusive Community)                                       │
│       [ ] Professional+                                                     │
│       [ ] Apenas Enterprise                                                 │
│       [x] A definir                                                         │
│                                                                             │
│  🟡 COMUNICAÇÃO                                                             │
│  ─────────────                                                              │
│  Q26. Integração com Slack/Teams para notificações?                        │
│       [ ] Sim, notifica conclusão de curso                                  │
│       [ ] Sim, notifica atribuição de trilha                                │
│       [ ] Não planejado                                                     │
│       [x] A definir                                                         │
│                                                                             │
│  Q27. Integração com HRIS (Gupy, BambooHR)?                                │
│       [ ] Sim, sync de usuários                                             │
│       [ ] Não planejado                                                     │
│       [x] A definir                                                         │
│                                                                             │
│  🟢 DADOS E ANALYTICS                                                       │
│  ────────────────────                                                       │
│  Q28. Exportação de dados para BI externo (PowerBI, Tableau)?              │
│       [ ] Sim, API de dados                                                 │
│       [ ] Sim, export CSV/Excel                                             │
│       [ ] Não planejado                                                     │
│       [x] A definir                                                         │
│                                                                             │
│  Q29. Webhook para eventos (conclusão, matrícula)?                         │
│       [ ] Sim, configurável                                                 │
│       [ ] Não planejado                                                     │
│       [x] A definir                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Plano de Consolidação

### 4.1 Fase 1: Leitura e Mapeamento (2-3 horas)

| # | Ação | Documentos | Objetivo |
|---|------|------------|----------|
| 1.1 | Ler docs conceituais | `conceitual/01-visao-geral/*.md` | Extrair visão, personas |
| 1.2 | Ler PRDs existentes | `SOLUCAO-E-PERSONAS.md`, `ESTRUTURA-PLATAFORMA-MVP.md` | Extrair specs funcionais |
| 1.3 | Ler roadmap e backlog | `backlog/ROADMAP.md`, `backlog/*.md` | Mapear features planejadas |
| 1.4 | Ler relatórios recentes | `RELATORIO-*.md` | Entender gaps atuais |
| 1.5 | Criar matriz de rastreabilidade | - | Mapear origem de cada info |

### 4.2 Fase 2: Consolidação de Produto (3-4 horas)

| # | Ação | Entrada | Saída |
|---|------|---------|-------|
| 2.1 | Consolidar visão e missão | 3 arquivos | `01-PRODUTO/01-visao-e-missao.md` |
| 2.2 | Consolidar problema/solução | 4 arquivos | `01-PRODUTO/02-problema-e-solucao.md` |
| 2.3 | Escrever modelo de negócio | Fragmentos + questões | `01-PRODUTO/03-modelo-de-negocios.md` |
| 2.4 | Unificar personas | 3 arquivos | `01-PRODUTO/04-personas.md` |
| 2.5 | Consolidar jornadas | 2 arquivos | `01-PRODUTO/05-jornadas-usuario.md` |
| 2.6 | Criar glossário único | 2 arquivos | `01-PRODUTO/06-glossario.md` |
| 2.7 | Documentar questões | Este documento | `01-PRODUTO/07-questoes-em-aberto.md` |

### 4.3 Fase 3: Consolidação de Specs (2-3 horas)

| # | Ação | Entrada | Saída |
|---|------|---------|-------|
| 3.1 | Refinar modelo de domínio | 1 arquivo | `02-ESPECIFICACAO/01-modelo-dominio.md` |
| 3.2 | Listar funcionalidades | Código + docs | `02-ESPECIFICACAO/02-funcionalidades.md` |
| 3.3 | Documentar RBAC | 2 arquivos | `02-ESPECIFICACAO/03-rbac-permissoes.md` |
| 3.4 | **Escrever spec Hub** | Questões + visão | `02-ESPECIFICACAO/04-hub-especialistas.md` |
| 3.5 | Documentar integrações | Fragmentos | `02-ESPECIFICACAO/05-integrações.md` |

### 4.4 Fase 4: Reorganização Física (1-2 horas)

| # | Ação | Descrição |
|---|------|-----------|
| 4.1 | Criar estrutura de pastas | `01-PRODUTO/`, `02-ESPECIFICACAO/`, etc. |
| 4.2 | Mover arquivos | Reorganizar conforme estrutura alvo |
| 4.3 | Arquivar documentos antigos | Mover para `99-ARQUIVO/` |
| 4.4 | Atualizar índice | Criar novo `README.md` com navegação |
| 4.5 | Atualizar referências | Corrigir links internos |

### 4.5 Fase 5: Validação e Publicação (1 hora)

| # | Ação | Descrição |
|---|------|-----------|
| 5.1 | Revisar consistência | Verificar termos, datas, versões |
| 5.2 | Validar links | Garantir que todos funcionam |
| 5.3 | Marcar questões em aberto | Destacar onde precisa decisão |
| 5.4 | Commit e tag | `docs-v2.0.0-consolidado` |

---

## 5. Cronograma Estimado

```
FASE                              DURAÇÃO    RESPONSÁVEL    STATUS
───────────────────────────────────────────────────────────────────
Fase 1: Leitura e Mapeamento      2-3h       Claude/Dev     [ ] Pendente
Fase 2: Consolidação de Produto   3-4h       Claude/Dev     [ ] Pendente
Fase 3: Consolidação de Specs     2-3h       Claude/Dev     [ ] Pendente
Fase 4: Reorganização Física      1-2h       Claude/Dev     [ ] Pendente
Fase 5: Validação e Publicação    1h         Claude/Dev     [ ] Pendente
───────────────────────────────────────────────────────────────────
TOTAL ESTIMADO                    9-13h
```

---

## 6. Critérios de Sucesso

### 6.1 Documentação Consolidada Deve Ter

- [ ] **Estrutura navegável**: Qualquer pessoa encontra info em <2 min
- [ ] **Sem duplicação**: Cada informação em um único lugar
- [ ] **Versão única da verdade**: Sem conflitos entre documentos
- [ ] **Questões marcadas**: Claro o que está definido vs em aberto
- [ ] **Rastreabilidade**: Sabe-se a origem de cada decisão
- [ ] **Atualizada**: Reflete código atual (Sprint 13)

### 6.2 Métricas de Qualidade

| Métrica | Atual | Meta |
|---------|-------|------|
| Arquivos de docs | 67 | ~35 |
| Duplicação de conteúdo | Alta | Zero |
| Questões não respondidas documentadas | 0 | 29+ |
| Tempo para encontrar info | >5 min | <2 min |
| Docs desatualizados | ~40% | <5% |

---

## 7. Decisões Necessárias Antes de Consolidar

### 7.1 Decisões de Produto (Requer Stakeholder)

| # | Decisão | Opções | Impacto |
|---|---------|--------|---------|
| D1 | Revenue share do Hub | 70/30 fixo ou variável? | Modelo de negócio |
| D2 | Processo de aprovação de especialista | Manual ou automático? | Operação |
| D3 | Certificados têm validade? | Permanente ou expira? | Feature |
| D4 | Community Edition tem limites? | Funcional ou apenas suporte? | Posicionamento |

### 7.2 Decisões Técnicas (Pode decidir agora)

| # | Decisão | Recomendação | Justificativa |
|---|---------|--------------|---------------|
| D5 | Estrutura de pastas docs | Proposta da Seção 2.1 | Clareza e navegabilidade |
| D6 | Onde arquivar docs antigos | `99-ARQUIVO/` | Manter histórico sem poluir |
| D7 | Formato de questões em aberto | Checkboxes como acima | Facilita responder depois |

---

## 8. Próximos Passos Imediatos

### Para Iniciar Agora:

```
1. [ ] Aprovar estrutura de pastas proposta (Seção 2.1)
2. [ ] Aprovar lista de questões em aberto (Seção 3)
3. [ ] Decidir se consolida agora ou aguarda respostas
```

### Opção A: Consolidar Agora (com questões em aberto)
- Vantagem: Documentação organizada rapidamente
- Desvantagem: Algumas seções terão "A DEFINIR"

### Opção B: Responder Questões Primeiro
- Vantagem: Documentação mais completa
- Desvantagem: Atrasa consolidação

### Recomendação: **Opção A**
Consolidar agora marcando questões em aberto. Permite:
- Ter estrutura organizada imediatamente
- Identificar claramente o que precisa decisão
- Evoluir incrementalmente conforme decisões são tomadas

---

## 9. Anexo: Mapeamento de Origem dos Documentos

| Documento Atual | Vai Para | Ação |
|-----------------|----------|------|
| `VISAO_MISSAO_E_ESTADO_ATUAL.md` | `01-PRODUTO/01-visao-e-missao.md` | Extrair e refinar |
| `SOLUCAO-E-PERSONAS.md` | `01-PRODUTO/02-problema-e-solucao.md` | Extrair e refinar |
| `conceitual/01-visao-geral/05-personas-corporativas.md` | `01-PRODUTO/04-personas.md` | Merge |
| `conceitual/01-visao-geral/04-modelo-dominio.md` | `02-ESPECIFICACAO/01-modelo-dominio.md` | Mover e atualizar |
| `conceitual/01-visao-geral/00-definicoes-principais.md` | `01-PRODUTO/06-glossario.md` | Mover |
| `reference/rbac.md` | `02-ESPECIFICACAO/03-rbac-permissoes.md` | Mover e expandir |
| `backlog/ROADMAP.md` | `07-GESTAO/01-roadmap.md` | Mover |
| `tecnico/testing/QA-E2E-SPECS-MCP.md` | `04-QUALIDADE/02-specs-e2e.md` | Mover |
| `backlog/arquivo-2026-01/*` | `99-ARQUIVO/sprints/` | Arquivar |
| `RELATORIO-*.md` | `99-ARQUIVO/relatorios/` | Arquivar |

---

**Documento preparado para planejamento de consolidação**
**Data:** 2026-02-05
**Próxima ação:** Aprovar estrutura e iniciar Fase 1
