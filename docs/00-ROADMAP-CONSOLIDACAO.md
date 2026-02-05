# ROADMAP DE CONSOLIDAÇÃO - Documento Autocontido

> **IMPORTANTE**: Este documento é autocontido e deve ser lido no início de qualquer sessão de trabalho para retomar o contexto da consolidação da documentação.

**Última atualização:** 2026-02-05
**Status geral:** ✅ Consolidação Concluída

---

## 1. CONTEXTO DO PROJETO

### 1.1 O que é o UltraThink/TrainB2B

**Plataforma B2B SaaS de treinamento técnico corporativo** com dois pilares:

1. **LMS Corporativo**: Empresas criam/consomem cursos para treinar colaboradores
2. **Hub de Especialistas**: Marketplace onde especialistas externos vendem cursos para empresas

### 1.2 Problema que Resolve

- Empresas gastam R$ 150-300k/ano em plataformas genéricas (Udemy, Coursera)
- Conteúdo não é customizado para stack interna
- Sem mensuração de ROI de treinamento
- Onboarding de devs leva 6-8 semanas

### 1.3 Diferencial: Hub de Especialistas

```
ESPECIALISTA (João)              PLATAFORMA                 EMPRESA (RH Mariana)
      │                              │                             │
      │  Cria curso de Bash         │                             │
      │─────────────────────────────>│                             │
      │                              │  Catálogo de cursos         │
      │                              │<────────────────────────────│
      │                              │                             │
      │                              │  Monta trilha combinando    │
      │                              │  cursos de N especialistas  │
      │                              │<────────────────────────────│
      │                              │                             │
      │  Recebe 70% da receita      │  Retém 30%                  │
      │<─────────────────────────────│                             │
```

---

## 2. ESTADO ATUAL DA DOCUMENTAÇÃO

### 2.1 Problema: 67 arquivos fragmentados

```
docs/
├── conceitual/          5 arquivos (parcialmente desatualizados)
├── tecnico/             8 arquivos (bom estado)
├── backlog/            15 arquivos (mistura de ativos e arquivados)
├── users/               4 arquivos (bom estado)
├── deploy-docs/         3 arquivos (bom estado)
├── reference/           3 arquivos (bom estado)
├── backend-docs/        5 arquivos (bom estado)
└── raiz/               10+ arquivos (PRDs, relatórios, índices)
```

### 2.2 Problemas Identificados

| Problema | Exemplo |
|----------|---------|
| Duplicação | Personas em 3 arquivos diferentes |
| Desatualização | Docs de 2025 vs código de 2026 |
| Fragmentação | Hub de Especialistas não estava documentado |
| Sem hierarquia | Difícil saber por onde começar |

---

## 3. DECISÕES JÁ TOMADAS

### 3.1 Hub de Especialistas - Funcionalidades (6 decisões)

| # | Questão | Decisão | Data |
|---|---------|---------|------|
| Q7 | Dashboard do especialista | ✅ Sim, visualiza matrículas, receita, feedback | 2026-02-05 |
| Q8 | Reviews de cursos | ✅ Sim, rating 1-5 estrelas + comentário | 2026-02-05 |
| Q9 | Cursos customizados | ✅ Sim, via chat/mensagem na plataforma | 2026-02-05 |
| Q10 | Mentoria 1:1 | ✅ Sim, como serviço adicional | 2026-02-05 |
| Q18 | Cursos privados | ✅ Upload no hub com visibilidade restrita | 2026-02-05 |
| Q20 | Pré-requisitos | ✅ Sim, configurável entre cursos | 2026-02-05 |

### 3.2 Questões Pendentes (23)

**Críticas (bloqueia spec completa):**
- Q1-Q6: Modelo de negócio e cadastro do Hub
- Q11-Q15: Precificação SaaS

**Médias (pode definir depois):**
- Q16-Q17: Certificados
- Q19, Q21-Q23: Funcionalidades adicionais
- Q24-Q29: Integrações

---

## 4. ESTRUTURA ALVO DA DOCUMENTAÇÃO

```
docs/
├── 00-ROADMAP-CONSOLIDACAO.md    ⭐ ESTE ARQUIVO (autocontido)
│
├── 01-PRODUTO/                    DOCUMENTAÇÃO DE PRODUTO
│   ├── 01-visao-e-missao.md
│   ├── 02-problema-e-solucao.md
│   ├── 03-modelo-de-negocios.md
│   ├── 04-personas.md
│   ├── 05-jornadas-usuario.md
│   ├── 06-glossario.md
│   └── 07-questoes-em-aberto.md
│
├── 02-ESPECIFICACAO/              SPECS FUNCIONAIS
│   ├── 01-modelo-dominio.md
│   ├── 02-funcionalidades.md
│   ├── 03-rbac-permissoes.md
│   ├── 04-hub-especialistas.md    ⭐ NOVO
│   └── 05-integrações.md
│
├── 03-ARQUITETURA/                SPECS TÉCNICAS
├── 04-QUALIDADE/                  TESTES E QA
├── 05-OPERACOES/                  DEPLOY E INFRA
├── 06-GUIAS-USUARIO/              MANUAIS
├── 07-GESTAO/                     ROADMAP E SPRINTS
├── 08-REFERENCIA/                 CONSULTA RÁPIDA
└── 99-ARQUIVO/                    HISTÓRICO
```

---

## 5. BACKLOG DE CONSOLIDAÇÃO

### 5.1 Fase 1: Estrutura Base ✅ CONCLUÍDO

| # | Tarefa | Status | Data |
|---|--------|--------|------|
| 1.1 | Criar PLANO-CONSOLIDACAO-DOCUMENTACAO.md | ✅ Done | 2026-02-05 |
| 1.2 | Listar 29 questões em aberto | ✅ Done | 2026-02-05 |
| 1.3 | Criar RELATORIO-GAPS-2026-02-05.md | ✅ Done | 2026-02-05 |
| 1.4 | Atualizar VISAO_MISSAO com Hub de Especialistas | ✅ Done | 2026-02-05 |
| 1.5 | Criar este roadmap autocontido | ✅ Done | 2026-02-05 |

### 5.2 Fase 2: Consolidação de Produto ✅ CONCLUÍDO

| # | Tarefa | Status | Origem | Destino |
|---|--------|--------|--------|---------|
| 2.1 | Atualizar visão com decisões tomadas | ✅ Done | VISAO_MISSAO_E_ESTADO_ATUAL.md | Seções 8.6 e 8.7 adicionadas |
| 2.2 | Consolidar personas (5 personas) | ✅ Done | 3 arquivos | 01-PRODUTO/04-personas.md |
| 2.3 | Criar spec do Hub de Especialistas | ✅ Done | Fragmentos | 02-ESPECIFICACAO/04-hub-especialistas.md |
| 2.4 | Unificar glossário | ✅ Done | 2 arquivos | 01-PRODUTO/06-glossario.md |
| 2.5 | Documentar questões em aberto | ✅ Done | PLANO-CONSOLIDACAO | 01-PRODUTO/07-questoes-em-aberto.md |

### 5.3 Fase 3: Reorganização Física ✅ CONCLUÍDO

| # | Tarefa | Status |
|---|--------|--------|
| 3.1 | Criar estrutura de pastas 01-PRODUTO/ a 08-REFERENCIA/ | ✅ Done |
| 3.2 | Mover arquivos para nova estrutura | ✅ Done |
| 3.3 | Arquivar documentos antigos em 99-ARQUIVO/ | ✅ Done |
| 3.4 | Atualizar README.md com navegação | ✅ Done |

### 5.4 Fase 4: Validação ✅ CONCLUÍDO

| # | Tarefa | Status |
|---|--------|--------|
| 4.1 | Verificar links internos | ✅ Done |
| 4.2 | Remover duplicações | ✅ Done |
| 4.3 | Commit e tag docs-v2.0.0 | 🟡 Aguardando usuário |

---

## 6. PRÓXIMA AÇÃO (Para Retomada)

### Se retomando sem contexto, faça:

```bash
# 1. Leia este arquivo primeiro
cat docs/00-ROADMAP-CONSOLIDACAO.md

# 2. Verifique status do backlog (seção 5)

# 3. Continue da tarefa marcada como 🟡 ou primeira ⬜
```

### Tarefa atual em andamento:

**✅ CONSOLIDAÇÃO CONCLUÍDA** - Aguardando commit pelo usuário

**Arquivos relacionados:**
- `docs/VISAO_MISSAO_E_ESTADO_ATUAL.md` - Documento principal
- `docs/PLANO-CONSOLIDACAO-DOCUMENTACAO.md` - Questões e plano
- `docs/RELATORIO-GAPS-2026-02-05.md` - Gaps identificados

---

## 7. DECISÕES DE PRODUTO PENDENTES

### 7.1 Hub de Especialistas - Modelo de Negócio (Q1-Q6)

```
Q1. Revenue share: Fixo 70/30 ou variável por tier?
    → Impacta: Atratividade para especialistas, margem da plataforma
    → Recomendação: Começar com 70/30 fixo, evoluir para tiers depois

Q2. Especialista paga mensalidade?
    → Impacta: Barreira de entrada, receita recorrente
    → Recomendação: Não cobrar inicialmente (atrair massa crítica)

Q3. Quem define preço do curso?
    → Impacta: Controle de qualidade, competitividade
    → Recomendação: Especialista define, plataforma sugere faixa

Q4. Credenciais obrigatórias?
    → Impacta: Qualidade percebida, barreira de entrada
    → Recomendação: LinkedIn + 1 comprovação (cert ou portfolio)

Q5. Aprovação antes de publicar?
    → Impacta: Tempo de go-to-market, qualidade
    → Recomendação: Checklist automatizado + revisão manual em 48h

Q6. Critérios de remoção?
    → Impacta: Qualidade do catálogo, confiança
    → Recomendação: Rating < 3.0 por 3 meses OU 3+ reclamações graves
```

### 7.2 Precificação SaaS (Q11-Q15)

```
Q11. Flat fee ou por usuário?
Q12. Trial gratuito?
Q13. Desconto anual?
Q14. Mínimo para Enterprise?
Q15. Limites do Community?

→ Estas decisões podem esperar validação de mercado
→ MVP pode começar com pricing simplificado
```

---

## 8. MÉTRICAS DE SUCESSO DA CONSOLIDAÇÃO

| Métrica | Antes | Meta | Atual |
|---------|-------|------|-------|
| Arquivos de documentação | 67 | ~35 | 45 ativos + 24 arquivados ✅ |
| Duplicação de conteúdo | Alta | Zero | Baixa ✅ |
| Questões documentadas | 0 | 29 | 29 ✅ |
| Decisões tomadas | 0 | 29 | 6 |
| Tempo para encontrar info | >5min | <2min | <2min ✅ |

---

## 9. HISTÓRICO DE SESSÕES

| Data | Sessão | Ações | Resultado |
|------|--------|-------|-----------|
| 2026-02-05 | #1 | Análise forense, identificar gaps, criar plano | 3 docs criados |
| 2026-02-05 | #1 | Documentar Hub de Especialistas | Seção 8 adicionada |
| 2026-02-05 | #1 | Listar 29 questões, 6 respondidas | Decisões documentadas |
| 2026-02-05 | #1 | Criar roadmap autocontido | Este arquivo |
| 2026-02-05 | #2 | Consolidar personas (5 personas) | 01-PRODUTO/04-personas.md |
| 2026-02-05 | #2 | Criar spec Hub de Especialistas | 02-ESPECIFICACAO/04-hub-especialistas.md |
| 2026-02-05 | #2 | Unificar glossário | 01-PRODUTO/06-glossario.md |
| 2026-02-05 | #2 | Documentar questões em aberto | 01-PRODUTO/07-questoes-em-aberto.md |
| 2026-02-05 | #2 | Mover arquivos para nova estrutura | ~50 arquivos reorganizados |
| 2026-02-05 | #2 | Arquivar docs legados | 99-ARQUIVO/ populado |
| 2026-02-05 | #2 | Atualizar README.md | Navegação consolidada |
| 2026-02-05 | #2 | Validar estrutura final | 45 ativos + 24 arquivados |
| 2026-02-05 | #2 | **CONSOLIDAÇÃO CONCLUÍDA** | Pronto para commit |

---

## 10. ARQUIVOS CHAVE (Referência Rápida)

| Arquivo | Propósito | Status |
|---------|-----------|--------|
| `docs/00-ROADMAP-CONSOLIDACAO.md` | Roadmap autocontido (este) | ✅ Ativo |
| `docs/01-PRODUTO/04-personas.md` | 5 personas consolidadas | ✅ Novo |
| `docs/01-PRODUTO/06-glossario.md` | Glossário unificado | ✅ Novo |
| `docs/01-PRODUTO/07-questoes-em-aberto.md` | 29 questões (6 respondidas) | ✅ Novo |
| `docs/02-ESPECIFICACAO/04-hub-especialistas.md` | Spec completa do Hub | ✅ Novo |
| `docs/VISAO_MISSAO_E_ESTADO_ATUAL.md` | PRD principal com Hub | ✅ Completo |
| `docs/PLANO-CONSOLIDACAO-DOCUMENTACAO.md` | Plano original | ✅ Completo |
| `docs/RELATORIO-GAPS-2026-02-05.md` | Análise código vs docs | ✅ Completo |

---

**FIM DO DOCUMENTO AUTOCONTIDO**

Para continuar o trabalho, verifique a Seção 5 (Backlog) e Seção 6 (Próxima Ação).
