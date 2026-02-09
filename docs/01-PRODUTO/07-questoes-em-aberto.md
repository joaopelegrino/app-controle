# Questões em Aberto - Sulical

**Versão:** 2.0.0
**Data:** 2026-02-09
**Status:** 🟡 29 questões identificadas, 12 respondidas, 17 pendentes

> **Propósito:** Este documento lista todas as decisões de produto que precisam ser tomadas para evolução da plataforma. Deve ser consultado antes de implementar novas features.

---

## Resumo Executivo

| Categoria | Total | ✅ Respondidas | ⬜ Pendentes |
|-----------|-------|----------------|--------------|
| Hub de Especialistas | 10 | 10 | 0 |
| Modelo de Negócio | 5 | 0 | 5 |
| Funcionalidades | 8 | 2 | 6 |
| Integrações | 6 | 0 | 6 |
| **TOTAL** | **29** | **12** | **17** |

---

## 1. Hub de Especialistas

### 1.1 Modelo de Negócio do Hub 🔴 CRÍTICO

> **Impacto:** Bloqueia implementação completa do Hub de Especialistas

#### Q1: Revenue share fixo ou variável?

**Status:** ✅ RESPONDIDA (2026-02-09)

**Decisão:** Fixo 70/30 para todos os especialistas

**Justificativa:** Simplicidade operacional para MVP. Especialista recebe 70%, plataforma 30%. Evoluir para tiers depois de atingir 100+ especialistas.

**Implementação:** `platform.js` → `hub.revenueSharePercent: 70`, tabela `specialists.revenue_share_percent DEFAULT 70`

---

#### Q2: Especialista paga mensalidade?

**Status:** ✅ RESPONDIDA (2026-02-09)

**Decisão:** Não, apenas revenue share

**Justificativa:** Atrair massa crítica inicial. Sem barreira de entrada. Revenue share como único modelo de monetização.

**Implementação:** `platform.js` → `hub.specialistMonthlyFee: 0`

---

#### Q3: Quem define o preço do curso?

**Status:** ✅ RESPONDIDA (2026-02-09)

**Decisão:** Especialista define livremente, com faixa sugerida R$ 50-200/mês

**Justificativa:** Especialista tem liberdade de definir preço, plataforma sugere faixa visível no formulário para orientar.

**Implementação:** `hub_courses.price_monthly` definido pelo especialista, `hub_courses.price_suggested_min/max` como referência

---

#### Q4: Credenciais obrigatórias para cadastro?

**Status:** ✅ RESPONDIDA (2026-02-09)

**Decisão:** LinkedIn obrigatório + mínimo 1 comprovação (certificação técnica, portfólio GitHub, ou anos de experiência documentados)

**Justificativa:** LinkedIn garante identidade profissional. Uma comprovação adicional garante qualidade mínima sem criar barreira excessiva.

**Implementação:** `specialists.linkedin_url NOT NULL`, `specialists.credentials JSONB` com validação de pelo menos 1 entrada

---

### 1.2 Processo e Governança 🟡 IMPORTANTE

#### Q5: Aprovação de curso antes de publicar?

**Status:** ✅ RESPONDIDA (2026-02-09)

**Decisão:** Checklist automatizado + revisão manual em 48h úteis

**Justificativa:** Checklist automatizado (mínimo 4 módulos, descrição 200+ caracteres, thumbnail) filtra submissões básicas. Revisão humana em 48h garante qualidade.

**Implementação:** `platform.js` → `hub.approvalProcess: { type: 'checklist_plus_review', reviewTimeHours: 48 }`, `hub_courses.status` workflow: draft → pending_review → published

---

#### Q6: Critérios de remoção de especialista?

**Status:** ✅ RESPONDIDA (2026-02-09)

**Decisão:** Rating < 3.0 por 3 meses consecutivos OU 3+ reclamações graves

**Justificativa:** Aviso ao especialista após 1º mês com rating < 3.0. Suspensão automática após 3 meses consecutivos. Reclamações graves (conteúdo plagiado, ofensivo, etc.) levam a suspensão imediata após 3 ocorrências.

**Implementação:** `platform.js` → `hub.removalCriteria: { minRating: 3.0, consecutiveMonths: 3, maxGraveComplaints: 3 }`

---

### 1.3 Funcionalidades do Hub ✅ DECIDIDAS

#### Q7: Dashboard próprio para especialista?

**Status:** ✅ RESPONDIDA (2026-02-05)

**Decisão:** Sim, visualiza matrículas, receita e feedback em tempo real

**Implementação necessária:**
- UI de dashboard para role "specialist"
- APIs de analytics próprios
- Gráficos de tendência

---

#### Q8: Sistema de reviews de cursos?

**Status:** ✅ RESPONDIDA (2026-02-05)

**Decisão:** Sim, rating 1-5 estrelas + comentário obrigatório

**Implementação necessária:**
- Tabela `course_reviews`
- Média de rating no catálogo
- Possibilidade de resposta do especialista

---

#### Q9: Cursos customizados sob demanda?

**Status:** ✅ RESPONDIDA (2026-02-05)

**Decisão:** Sim, via chat/mensagem na plataforma

**Implementação necessária:**
- Sistema de mensagens entre empresa e especialista
- Fluxo de proposta/aceite
- Histórico de conversas

---

#### Q10: Mentoria 1:1 como serviço adicional?

**Status:** ✅ RESPONDIDA (2026-02-05)

**Decisão:** Sim, como serviço adicional aos cursos

**Implementação necessária:**
- Calendário de disponibilidade
- Agendamento de sessões
- Preço por sessão configurável

---

## 2. Modelo de Negócio SaaS

### 2.1 Precificação 🔴 CRÍTICO

#### Q11: Preços por usuário ou flat fee?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Flat fee (R$ 499/mês até X usuários)
- [ ] Por usuário (R$ X/usuário/mês)
- [ ] Híbrido (base + excedente)

**Contexto atual:**
- Starter: R$ 499/mês (até 50 usuários)
- Professional: R$ 2.499/mês (até 200 usuários)
- Enterprise: Sob consulta

**Decisão necessária:** Confirmar modelo ou ajustar

---

#### Q12: Trial gratuito?

**Status:** ⬜ Pendente

**Opções:**
- [ ] 14 dias full access
- [ ] 30 dias full access
- [ ] Não, apenas demo guiada
- [ ] Freemium (limitado para sempre)

**Impacto:** Conversão, custo de suporte, qualificação de leads

---

#### Q13: Desconto para pagamento anual?

**Status:** ⬜ Pendente

**Opções:**
- [ ] 2 meses grátis (16% desconto)
- [ ] 20% de desconto
- [ ] 25% de desconto
- [ ] Não oferece desconto anual

**Impacto:** Cash flow, retenção, previsibilidade de receita

---

### 2.2 Segmentação 🟡 IMPORTANTE

#### Q14: Tamanho mínimo para Enterprise?

**Status:** ⬜ Pendente

**Opções:**
- [ ] 200+ usuários
- [ ] 500+ usuários
- [ ] 1000+ usuários
- [ ] Negociação caso a caso

**Impacto:** Posicionamento, complexidade de vendas

---

#### Q15: Community Edition tem limitações funcionais?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Não, apenas sem suporte oficial
- [ ] Sim, sem analytics avançado
- [ ] Sim, sem white-label
- [ ] Sim, limite de usuários (ex: 20)
- [ ] Combinação: ________________

**Impacto:** Conversão para pago, adoção open source

---

## 3. Funcionalidades Gerais

### 3.1 Certificados 🟡 IMPORTANTE

#### Q16: Certificados têm validade?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Não, permanentes
- [ ] Sim, 1 ano (precisa recertificar)
- [ ] Sim, 2 anos
- [ ] Configurável por empresa/curso

**Impacto:** Valor percebido, engajamento contínuo

---

#### Q17: Certificados verificáveis externamente?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Sim, URL pública + QR code
- [ ] Sim, apenas com código de verificação
- [ ] Não, apenas PDF interno

**Impacto:** Credibilidade, marketing viral, implementação

---

### 3.2 Trilhas e Cursos ✅ PARCIALMENTE DECIDIDO

#### Q18: Empresa pode criar cursos próprios?

**Status:** ✅ RESPONDIDA (2026-02-05)

**Decisão:** Upload no hub com opção de manter visibilidade restrita

**Implementação necessária:**
- Flag de visibilidade: público, privado, empresa específica
- Upload de conteúdo por admins de empresa
- Não aparece no catálogo se privado

---

#### Q19: Trilha pode misturar cursos internos + externos?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Sim, totalmente flexível
- [ ] Não, separados
- [ ] Sim, mas com indicação visual clara

**Impacto:** Flexibilidade, UX de montagem de trilhas

---

#### Q20: Pré-requisitos entre cursos?

**Status:** ✅ RESPONDIDA (2026-02-05)

**Decisão:** Sim, configurável entre cursos da trilha

**Implementação necessária:**
- Campo de dependências entre cursos
- Bloqueio de acesso se pré-requisito não concluído
- Visualização de ordem na trilha

---

### 3.3 Gamificação 🟢 PODE ESPERAR

#### Q21: Sistema de badges/conquistas?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Sim, badges por marcos (10 aulas, 100 horas, etc.)
- [ ] Não, apenas certificados de conclusão
- [ ] Sim, configurável por empresa

**Impacto:** Engajamento, complexidade, gamificação

---

#### Q22: Leaderboard/ranking entre usuários?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Sim, por empresa (privado)
- [ ] Sim, global (público)
- [ ] Não, pode gerar competição negativa
- [ ] Configurável por empresa

**Impacto:** Engajamento, cultura, privacidade

---

#### Q23: Sistema de pontos/XP?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Sim, com recompensas tangíveis
- [ ] Sim, apenas visual/status
- [ ] Não

**Impacto:** Engajamento, complexidade de implementação

---

## 4. Integrações

### 4.1 Autenticação 🔴 CRÍTICO (para Enterprise)

#### Q24: Provedores SSO suportados?

**Status:** ⬜ Pendente

**Opções (múltipla escolha):**
- [ ] Google Workspace
- [ ] Microsoft Azure AD / Entra ID
- [ ] Okta
- [ ] SAML 2.0 genérico
- [ ] LDAP
- [ ] OpenID Connect

**Prioridade sugerida:** Azure AD > Google > SAML genérico

**Impacto:** Vendas enterprise, segurança, compliance

---

#### Q25: SSO em qual tier?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Todos (inclusive Community)
- [ ] Professional+
- [ ] Apenas Enterprise

**Impacto:** Diferenciação de tiers, barreiras de entrada

---

### 4.2 Comunicação 🟡 IMPORTANTE

#### Q26: Integração Slack/Teams?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Notifica conclusão de curso
- [ ] Notifica atribuição de trilha
- [ ] Notifica prazos próximos
- [ ] Comandos slash para consultar progresso
- [ ] Não planejado

**Impacto:** Engajamento, visibilidade, adoção

---

#### Q27: Integração com HRIS?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Gupy - sync de usuários
- [ ] BambooHR - sync de usuários
- [ ] Workday - sync de usuários
- [ ] API genérica para HRIS
- [ ] Não planejado

**Impacto:** Automação de onboarding, manutenção de usuários

---

### 4.3 Dados e Analytics 🟢 PODE ESPERAR

#### Q28: Exportação para BI externo?

**Status:** ⬜ Pendente

**Opções:**
- [ ] API de dados para PowerBI/Tableau
- [ ] Export CSV/Excel manual
- [ ] Webhook de eventos
- [ ] Não planejado

**Impacto:** Valor para analytics corporativo

---

#### Q29: Webhooks para eventos?

**Status:** ⬜ Pendente

**Opções:**
- [ ] Sim, configurável (conclusão, matrícula, certificado)
- [ ] Sim, eventos fixos
- [ ] Não planejado

**Impacto:** Integrações customizadas, automação

---

## 5. Matriz de Priorização

### 5.1 Questões Críticas (Bloqueiam features)

| # | Questão | Bloqueia | Status |
|---|---------|----------|--------|
| ~~Q1~~ | ~~Revenue share~~ | ~~Hub de Especialistas~~ | ✅ Resolvida |
| ~~Q2~~ | ~~Mensalidade especialista~~ | ~~Hub de Especialistas~~ | ✅ Resolvida |
| ~~Q3~~ | ~~Quem define preço~~ | ~~Hub de Especialistas~~ | ✅ Resolvida |
| ~~Q4~~ | ~~Credenciais obrigatórias~~ | ~~Hub de Especialistas~~ | ✅ Resolvida |
| Q24 | SSO providers | Vendas Enterprise | ⬜ Pendente |

### 5.2 Questões Importantes (Afetam experiência)

| # | Questão | Afeta | Status |
|---|---------|-------|--------|
| ~~Q5~~ | ~~Aprovação de curso~~ | ~~Qualidade do catálogo~~ | ✅ Resolvida |
| ~~Q6~~ | ~~Critérios remoção~~ | ~~Governança do Hub~~ | ✅ Resolvida |
| Q11 | Modelo de preços | Posicionamento | ⬜ Pendente |
| Q16 | Validade certificado | Valor percebido | ⬜ Pendente |
| Q26 | Slack/Teams | Engajamento | ⬜ Pendente |

### 5.3 Questões que Podem Esperar

| # | Questão | Motivo |
|---|---------|--------|
| Q21-Q23 | Gamificação | Nice-to-have |
| Q27-Q29 | Integrações avançadas | Pós-lançamento |

---

## 6. Processo de Decisão

### 6.1 Como Responder Questões

1. **Analise o contexto**: Leia a seção de impacto
2. **Considere trade-offs**: Cada opção tem prós/contras
3. **Documente a decisão**: Marque com `[x]` a opção escolhida
4. **Atualize status**: Mude de `⬜ Pendente` para `✅ RESPONDIDA (data)`
5. **Adicione justificativa**: Explique o racional brevemente

### 6.2 Exemplo de Decisão Documentada

```markdown
#### Q99: Exemplo de questão

**Status:** ✅ RESPONDIDA (2026-02-15)

**Decisão:** Opção B - Descrição da escolha

**Justificativa:** Escolhemos esta opção porque...

**Implementação necessária:**
- Item 1
- Item 2
```

### 6.3 Quem Decide

| Tipo de Questão | Responsável |
|-----------------|-------------|
| Modelo de negócio (Q1-Q6, Q11-Q15) | Product Owner / Founder |
| Funcionalidades (Q7-Q10, Q16-Q23) | Product Manager |
| Integrações (Q24-Q29) | Tech Lead + Product |

---

## 7. Histórico de Decisões

| Data | Questão | Decisão | Decidido por |
|------|---------|---------|--------------|
| 2026-02-05 | Q7 | Dashboard próprio para especialista | Stakeholder |
| 2026-02-05 | Q8 | Reviews com rating 1-5 + comentário | Stakeholder |
| 2026-02-05 | Q9 | Cursos customizados via chat | Stakeholder |
| 2026-02-05 | Q10 | Mentoria 1:1 como serviço adicional | Stakeholder |
| 2026-02-05 | Q18 | Upload com visibilidade restrita | Stakeholder |
| 2026-02-05 | Q20 | Pré-requisitos configuráveis | Stakeholder |
| 2026-02-09 | Q1 | Revenue share fixo 70/30 | Product Owner |
| 2026-02-09 | Q2 | Sem mensalidade para especialista | Product Owner |
| 2026-02-09 | Q3 | Especialista define preço com faixa sugerida | Product Owner |
| 2026-02-09 | Q4 | LinkedIn + 1 comprovação | Product Owner |
| 2026-02-09 | Q5 | Checklist auto + revisão manual 48h | Product Owner |
| 2026-02-09 | Q6 | Rating < 3.0/3 meses ou 3+ reclamações | Product Owner |

---

## Referências

- `docs/PLANO-CONSOLIDACAO-DOCUMENTACAO.md` - Origem das questões
- `docs/02-ESPECIFICACAO/04-hub-especialistas.md` - Spec do Hub
- `docs/VISAO_MISSAO_E_ESTADO_ATUAL.md` - PRD principal

---

**FIM DO DOCUMENTO**

**Última atualização:** 2026-02-09
**Próxima revisão:** Quando novas questões surgirem ou decisões forem tomadas
