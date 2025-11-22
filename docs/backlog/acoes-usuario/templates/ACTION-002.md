---
id: ACTION-002
titulo: "Configurar Google Analytics 4 para Métricas B2B Corporativas"
prioridade: P2
status: PENDENTE
categoria: setup
deliverable: D-033
sprint: "Release 2.0 - Analytics Dashboard"
created: 2025-11-17
updated: 2025-11-17
completed: null
estimativa: "3 horas"
responsavel: "Product Owner"
---

# ACTION-002: Configurar Google Analytics 4 para Métricas B2B Corporativas

## 📋 Descrição

Configurar Google Analytics 4 (GA4) para rastrear métricas corporativas B2B específicas do Ultrathink, incluindo engajamento por empresa, progresso de treinamento, e conversão de trials.

## 🎯 Contexto

**Por que esta ação é necessária?**
O Release 2.0 introduz Dashboard Analytics Corporativo (D-033). Para fornecer métricas precisas aos gestores B2B (personas Carlos CTO e Ana Gerente), precisamos configurar tracking de eventos customizados além do pageview padrão.

**Relação com Deliverables:**
- Deliverable: D-033 - Dashboard Analytics Corporativo
- User Story: US-047 - Implementar tracking de métricas B2B
- ÉPICO: ÉPICO-15 - Analytics e Reporting

**Dependências:**
- [ ] Conta Google Analytics 4 criada
- [ ] Propriedade GA4 configurada para domínio de produção
- [ ] Variáveis de ambiente `.env` preparadas

## 📝 Passo a Passo

### Pré-requisitos
- [ ] Acesso admin à conta Google Analytics
- [ ] Permissões para editar código de produção
- [ ] Conhecimento básico de GA4 e eventos customizados

### Execução

**Passo 1: Criar Propriedade GA4**
1. Acessar https://analytics.google.com
2. Admin → Create Property
3. **Configurações:**
   - Nome: "Ultrathink - Produção"
   - Timezone: America/Sao_Paulo
   - Currency: BRL (R$)
4. Criar Data Stream:
   - Platform: Web
   - URL: https://ultrathink.com.br
   - Stream name: "Ultrathink Web"
5. **Copiar Measurement ID** (formato: G-XXXXXXXXXX)

**Passo 2: Configurar eventos customizados B2B**
No GA4 Admin → Events → Create Event:

**Eventos a criar:**
```javascript
// 1. Progresso em módulo
{
  event_name: "module_progress",
  parameters: {
    company_id: "string",
    user_id: "string",
    module_id: "string",
    progress_percentage: "number",
    time_spent_minutes: "number"
  }
}

// 2. Conclusão de curso
{
  event_name: "course_completion",
  parameters: {
    company_id: "string",
    user_id: "string",
    course_id: "string",
    completion_time_hours: "number",
    quiz_score: "number"
  }
}

// 3. Engajamento de empresa
{
  event_name: "company_engagement",
  parameters: {
    company_id: "string",
    active_users_count: "number",
    avg_time_per_user_minutes: "number",
    courses_in_progress: "number"
  }
}

// 4. Conversão de trial
{
  event_name: "trial_conversion",
  parameters: {
    company_id: "string",
    trial_duration_days: "number",
    active_users_during_trial: "number",
    plan_selected: "string"
  }
}
```

**Passo 3: Adicionar Measurement ID ao projeto**
```bash
cd /home/notebook/workspace/app-controle
```

Editar `.env`:
```bash
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true
```

Adicionar ao `.env.example` (sem valor real):
```bash
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=false
```

**Passo 4: Configurar Google Tag Manager (GTM) - opcional**
Se usar GTM ao invés de gtag direto:
1. Criar container GTM
2. Adicionar tag GA4 Configuration
3. Configurar triggers para eventos customizados
4. Publicar container

**Passo 5: Testar configuração**
```bash
# 1. Build local com analytics
npm run dev

# 2. Abrir http://localhost:3000
# 3. Abrir DevTools → Network → filtrar "google-analytics"
# 4. Navegar pela aplicação e verificar eventos sendo enviados

# 5. Validar no GA4 Realtime
# Admin → Realtime → ver eventos em tempo real
```

## ✅ Validação

**Como validar que a ação foi executada corretamente?**

- [ ] Measurement ID configurado em `.env` e funcional
- [ ] Eventos customizados aparecendo no GA4 Realtime
- [ ] Parâmetros customizados sendo capturados corretamente
- [ ] No console errors relacionados a GA4
- [ ] Privacy compliance OK (LGPD - consentimento de cookies)

**Comandos de Validação:**
```bash
# Verificar variáveis de ambiente
cat .env | grep GA4

# Verificar se código GA4 está no build
npm run build
grep -r "gtag\|G-" dist/assets/*.js
```

**Validação no GA4:**
1. Admin → Realtime → ver eventos em tempo real
2. Admin → DebugView → validar parâmetros de eventos
3. Reports → Engagement → Events → verificar eventos customizados

## 🎁 Resultado Esperado

Google Analytics 4 configurado e rastreando métricas B2B corporativas:
- Pageviews padrão funcionando
- 4 eventos customizados configurados
- Parâmetros de empresa/usuário capturados
- Dashboard GA4 com dados em tempo real

**Evidências:**
- [ ] Screenshot do GA4 Realtime mostrando eventos
- [ ] Screenshot do DebugView com parâmetros validados
- [ ] Arquivo `.env.example` atualizado (sem secrets)
- [ ] Documentação de eventos em `docs/analytics/GA4-EVENTS.md`

## 📌 Notas

**Referências:**
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Custom Events GA4](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [LGPD Compliance](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- ROADMAP.md - ÉPICO-15 - Analytics

**Riscos:**
- **Risco:** Exposição de company_id ou user_id sensíveis
  - **Mitigação:** Usar IDs hash/anonimizados, não enviar PII
- **Risco:** Excesso de eventos pode exceder quota gratuita GA4
  - **Mitigação:** Implementar sampling para empresas grandes
- **Risco:** LGPD - cookies sem consentimento
  - **Mitigação:** Implementar cookie banner com opt-in

**Tempo Estimado:** 3 horas (incluindo testes e documentação)

---

**Status:** PENDENTE
**Última Atualização:** 2025-11-17
**Próxima Ação:** Após configuração, implementar Dashboard Analytics (US-047)
