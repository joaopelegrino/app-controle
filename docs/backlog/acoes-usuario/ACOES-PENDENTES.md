# Ações Manuais Pendentes - Ultrathink

**Última Atualização:** 2025-11-17
**Status:** 3 ações pendentes
**Prioridades:** P0: 0 | P1: 2 | P2: 1 | P3: 0

---

## 🚨 Prioridade P0 - BLOCKER (Urgente)

> Ações críticas que bloqueiam desenvolvimento ou releases. Devem ser resolvidas imediatamente.

**Nenhuma ação P0 no momento.**

---

## 🔴 Prioridade P1 - HIGH (Sprint Atual)

> Ações necessárias para concluir deliverables da sprint atual. Devem ser resolvidas esta semana.

### ACTION-001: Validar Build de Produção do Ultrathink
**Categoria:** testing | **Deliverable:** D-026 (React Router)
**Responsável:** Tech Lead | **Estimativa:** 2 horas

**Descrição:**
Validar manualmente que o build de produção está funcionando corretamente após as refatorações do Release 2.0, incluindo otimizações Vite, code splitting, e assets.

**Passo a Passo Resumido:**
1. Limpar builds anteriores e executar `npm run build`
2. Analisar bundle gerado (tamanho < 5MB)
3. Testar build localmente com `npx vite preview`
4. Validar assets e otimizações no DevTools Network
5. (Opcional) Testar build Docker

**Critérios de Validação:**
- [ ] Build completa sem erros críticos
- [ ] Bundle size < 5MB total
- [ ] Aplicação funciona no preview
- [ ] Sem console errors
- [ ] Performance adequada (First Load < 3s)

**Referência Completa:** [templates/ACTION-001.md](templates/ACTION-001.md)

---

### ACTION-003: Validar Conformidade WCAG 2.1 AA
**Categoria:** validation | **Deliverable:** D-021 (Refatoração UI)
**Responsável:** UX Lead | **Estimativa:** 4 horas

**Descrição:**
Validar que os componentes refatorados no ÉPICO-12 atendem aos critérios de acessibilidade WCAG 2.1 nível AA, incluindo breadcrumb, navegação hierárquica, e formulários.

**Passo a Passo Resumido:**
1. Validação automática com axe DevTools
2. Testes de navegação por teclado (Tab, Enter, Arrows)
3. Testes com screen reader (NVDA/Orca)
4. Validação de contraste de cores (4.5:1)
5. Lighthouse Accessibility Audit (score > 90)
6. Testes manuais de casos de uso

**Critérios de Validação:**
- [ ] Score Lighthouse Accessibility > 90
- [ ] Zero issues críticos no axe DevTools
- [ ] Navegação completa por teclado funcional
- [ ] Screen readers funcionando corretamente
- [ ] Contraste de cores adequado (WCAG 2.1 AA)

**Referência Completa:** [templates/ACTION-003.md](templates/ACTION-003.md)

---

## 🟡 Prioridade P2 - MEDIUM (Sprints Futuras)

> Ações necessárias para releases futuros. Devem ser planejadas e executadas nas próximas 2-4 semanas.

### ACTION-002: Configurar Google Analytics 4 para Métricas B2B
**Categoria:** setup | **Deliverable:** D-033 (Dashboard Analytics)
**Responsável:** Product Owner | **Estimativa:** 3 horas

**Descrição:**
Configurar Google Analytics 4 para rastrear métricas corporativas B2B específicas do Ultrathink, incluindo engajamento por empresa, progresso de treinamento, e conversão de trials.

**Passo a Passo Resumido:**
1. Criar Propriedade GA4 e Data Stream
2. Configurar 4 eventos customizados B2B:
   - `module_progress`
   - `course_completion`
   - `company_engagement`
   - `trial_conversion`
3. Adicionar Measurement ID ao `.env`
4. (Opcional) Configurar Google Tag Manager
5. Testar configuração e validar eventos no GA4 Realtime

**Critérios de Validação:**
- [ ] Measurement ID configurado e funcional
- [ ] 4 eventos customizados aparecendo no GA4 Realtime
- [ ] Parâmetros capturados corretamente
- [ ] Sem console errors relacionados a GA4
- [ ] Privacy compliance OK (LGPD - consentimento)

**Referência Completa:** [templates/ACTION-002.md](templates/ACTION-002.md)

---

## 🟢 Prioridade P3 - LOW (Backlog)

> Ações nice-to-have, não-bloqueantes. Podem ser executadas quando houver disponibilidade.

**Nenhuma ação P3 no momento.**

---

## 📊 Métricas

| Prioridade | Pendentes | Estimativa Total |
|-----------|-----------|------------------|
| P0 (Blocker) | 0 | 0h |
| P1 (High) | 2 | 6h |
| P2 (Medium) | 1 | 3h |
| P3 (Low) | 0 | 0h |
| **TOTAL** | **3** | **9h** |

---

## 🔗 Links Úteis

- **Templates:** [templates/](templates/)
- **Ações Concluídas:** [ACOES-CONCLUIDAS.md](ACOES-CONCLUIDAS.md)
- **Guia de Uso:** [README.md](README.md)
- **Deliverables:** [../STATUS-DELIVERABLES.md](../STATUS-DELIVERABLES.md)
- **ROADMAP (SSOT):** [../ROADMAP.md](../ROADMAP.md)

---

## 📋 Próximos Passos

1. **Priorizar P1:** Executar ACTION-001 e ACTION-003 esta semana
2. **Planejar P2:** Agendar ACTION-002 para próxima sprint (Analytics Dashboard)
3. **Criar Novas Ações:** Usar [template-acao.md](templates/template-acao.md) quando necessário
4. **Mover para Concluídas:** Atualizar ACOES-CONCLUIDAS.md após finalizar ações

---

**Como criar nova ação?** Consulte [README.md](README.md) para workflow completo.
