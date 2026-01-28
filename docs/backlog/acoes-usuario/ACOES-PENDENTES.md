# Ações Manuais Pendentes - Plataforma TrainB2B

**Última Atualização:** 2026-01-28
**Status:** 9 ações pendentes
**Prioridades:** P0: 1 | P1: 6 | P2: 2 | P3: 0
**Contexto:** Deploy cloud para demonstração comercial (Fly.io)

---

## Prioridade P0 - BLOCKER (Urgente)

> Ações críticas que bloqueiam desenvolvimento ou releases. Devem ser resolvidas imediatamente.

### ACTION-004: Adicionar Scope Workflow no GitHub CLI
**Categoria:** setup | **Deliverable:** D-050 (CI/CD Pipeline)
**Responsável:** Desenvolvedor | **Estimativa:** 5 minutos

**Descrição:**
O push de arquivos `.github/workflows/*.yml` requer scope `workflow` no token OAuth do GitHub CLI. Sem essa permissão, o workflow de deploy automático não pode ser commitado.

**Erro típico:**
```
refusing to allow an OAuth App to create or update workflow without `workflow` scope
```

**Passo a Passo:**
1. Executar `gh auth refresh --scopes workflow`
2. Autenticar no browser quando solicitado
3. Verificar com `gh auth status`

**Critérios de Validação:**
- [ ] `gh auth status` mostra `Token scopes: 'gist', 'read:org', 'repo', 'workflow'`
- [ ] Push de `.github/workflows/fly-deploy.yml` funciona

**Referência:** [GitHub CLI Auth Scopes](https://cli.github.com/manual/gh_auth_login)

---

## Prioridade P1 - HIGH (Deploy Demo)

> Ações necessárias para disponibilizar a plataforma em nuvem. Devem ser executadas antes do primeiro deploy.

### ACTION-005: Criar Conta Fly.io
**Categoria:** setup | **Deliverable:** D-051 (Infraestrutura Cloud)
**Responsável:** DevOps/Desenvolvedor | **Estimativa:** 10 minutos

**Descrição:**
Criar conta no Fly.io para hospedar a aplicação. Requer email válido e verificação.

**Passo a Passo:**
1. Acessar https://fly.io/app/sign-up
2. Cadastrar com GitHub (recomendado) ou email
3. Verificar email de confirmação
4. (Alternativa CLI) `flyctl auth signup`

**Critérios de Validação:**
- [ ] Conta criada e verificada
- [ ] Acesso ao dashboard https://fly.io/dashboard

---

### ACTION-006: Adicionar Cartão de Crédito no Fly.io
**Categoria:** setup | **Deliverable:** D-051 (Infraestrutura Cloud)
**Responsável:** Financeiro/DevOps | **Estimativa:** 5 minutos
**Dependência:** ACTION-005

**Descrição:**
Fly.io requer cartão de crédito para todas as organizações, mesmo para uso do free tier. Sem cartão, não é possível fazer deploy.

**Passo a Passo:**
1. Acessar https://fly.io/dashboard
2. Clicar no nome da organização (canto superior esquerdo)
3. Navegar para **Billing**
4. Clicar em **Add Payment Method**
5. Preencher dados do cartão

**Critérios de Validação:**
- [ ] Cartão cadastrado e validado
- [ ] Seção "Payment Methods" mostra cartão ativo

**Nota:** Cartões brasileiros são aceitos. Free tier inclui 3 VMs shared-cpu-1x, 3GB volumes, 160GB bandwidth.

---

### ACTION-007: Configurar Spending Limits no Fly.io
**Categoria:** setup | **Deliverable:** D-051 (Infraestrutura Cloud)
**Responsável:** Financeiro/DevOps | **Estimativa:** 5 minutos
**Dependência:** ACTION-006

**Descrição:**
Configurar limites de gasto para evitar cobranças inesperadas. Importante para ambiente de demonstração.

**Passo a Passo:**
1. Acessar https://fly.io/dashboard/[org-name]/billing
2. Ir para seção **Spending Limits**
3. Configurar:
   - **Soft Limit:** $5 (alerta por email)
   - **Hard Limit:** $10 (para recursos automaticamente)

**Critérios de Validação:**
- [ ] Soft limit configurado em $5
- [ ] Hard limit configurado em $10
- [ ] Email de confirmação recebido

---

### ACTION-008: Criar App no Fly.io
**Categoria:** deployment | **Deliverable:** D-051 (Infraestrutura Cloud)
**Responsável:** DevOps | **Estimativa:** 5 minutos
**Dependência:** ACTION-006

**Descrição:**
Criar a aplicação no Fly.io antes do primeiro deploy via CI/CD.

**Passo a Passo:**
```bash
# Instalar flyctl (se não instalado)
curl -L https://fly.io/install.sh | sh

# Login no Fly.io (abre browser)
flyctl auth login

# Criar app (não faz deploy ainda)
flyctl launch --name trainb2b-demo --region gru --no-deploy

# Ou se preferir criar sem launch wizard
flyctl apps create trainb2b-demo --org personal
```

**Critérios de Validação:**
- [ ] `flyctl apps list` mostra `trainb2b-demo`
- [ ] App visível no dashboard https://fly.io/dashboard

---

### ACTION-009: Gerar Token de Deploy para CI/CD
**Categoria:** setup | **Deliverable:** D-050 (CI/CD Pipeline)
**Responsável:** DevOps | **Estimativa:** 5 minutos
**Dependência:** ACTION-008

**Descrição:**
Gerar token de deploy do Fly.io para uso no GitHub Actions. Este token será configurado como secret no repositório.

**Passo a Passo:**
```bash
# Gerar token (copiar COMPLETO incluindo "FlyV1 ")
flyctl tokens create deploy -x 999999h

# O token tem formato: FlyV1 fm2_xxxxx...
# IMPORTANTE: Copiar token inteiro incluindo "FlyV1 "
```

**Critérios de Validação:**
- [ ] Token gerado e copiado
- [ ] Token começa com "FlyV1 "
- [ ] Token salvo em local seguro (será usado na ACTION-010)

---

### ACTION-010: Configurar Secrets e Variables no GitHub
**Categoria:** setup | **Deliverable:** D-050 (CI/CD Pipeline)
**Responsável:** DevOps | **Estimativa:** 10 minutos
**Dependência:** ACTION-004, ACTION-009

**Descrição:**
Configurar secrets (sensíveis) e variables (públicas) no repositório GitHub para o workflow de CI/CD.

**Passo a Passo:**
```bash
# 1. Configurar secret do Fly.io
gh secret set FLY_API_TOKEN
# Cole o token quando solicitado (FlyV1 fm2_xxxxx...)

# 2. Configurar variáveis de build
gh variable set VITE_PLATFORM_NAME --body "TrainB2B Demo"
gh variable set VITE_PLATFORM_SHORT_NAME --body "TrainB2B"
gh variable set VITE_STORAGE_PREFIX --body "trainb2b"
gh variable set VITE_API_BASE_URL --body "https://trainb2b-api.fly.dev"

# 3. Verificar
gh secret list
gh variable list
```

**Critérios de Validação:**
- [ ] `gh secret list` mostra FLY_API_TOKEN
- [ ] `gh variable list` mostra 4 variáveis VITE_*
- [ ] Secrets/Variables visíveis em Settings > Secrets and variables > Actions

---

## Prioridade P2 - MEDIUM (Pós-Deploy)

> Ações necessárias após o primeiro deploy. Podem ser executadas nas próximas semanas.

### ACTION-011: Configurar PostgreSQL Managed no Fly.io
**Categoria:** setup | **Deliverable:** D-052 (Backend Cloud)
**Responsável:** DevOps | **Estimativa:** 15 minutos
**Dependência:** ACTION-008

**Descrição:**
Criar cluster PostgreSQL Development no Fly.io para substituir o banco local do Docker. Necessário para backend completo em produção.

**Passo a Passo:**
```bash
# Criar cluster PostgreSQL (Development - gratuito)
flyctl postgres create \
  --name trainb2b-db \
  --region gru \
  --initial-cluster-size 1 \
  --vm-size shared-cpu-1x \
  --volume-size 1

# Conectar ao app frontend
flyctl postgres attach trainb2b-db --app trainb2b-demo

# Verificar conexão
flyctl postgres connect -a trainb2b-db
```

**Critérios de Validação:**
- [ ] Cluster criado: `flyctl postgres list` mostra trainb2b-db
- [ ] Secret DATABASE_URL adicionado automaticamente ao app
- [ ] Conexão via `flyctl postgres connect` funciona

---

### ACTION-012: Configurar Domínio Customizado
**Categoria:** setup | **Deliverable:** D-053 (DNS/SSL)
**Responsável:** DevOps | **Estimativa:** 30 minutos
**Dependência:** ACTION-008

**Descrição:**
Configurar domínio customizado (ex: demo.trainb2b.com) com SSL automático. Opcional para demonstração inicial.

**Passo a Passo:**
1. Adicionar certificado: `flyctl certs create demo.trainb2b.com -a trainb2b-demo`
2. Configurar DNS no registrar:
   - CNAME: `demo` -> `trainb2b-demo.fly.dev`
   - Ou A record para IP do Fly.io
3. Aguardar propagação (até 24h)
4. Verificar: `flyctl certs show demo.trainb2b.com -a trainb2b-demo`

**Critérios de Validação:**
- [ ] Certificado SSL emitido
- [ ] https://demo.trainb2b.com acessível
- [ ] Redirecionamento HTTP → HTTPS funciona

---

## Prioridade P3 - LOW (Backlog)

> Ações nice-to-have, não-bloqueantes.

**Nenhuma ação P3 no momento.**

---

## Métricas

| Prioridade | Pendentes | Estimativa Total |
|-----------|-----------|------------------|
| P0 (Blocker) | 1 | 5min |
| P1 (High) | 6 | 40min |
| P2 (Medium) | 2 | 45min |
| P3 (Low) | 0 | 0 |
| **TOTAL** | **9** | **~1.5h** |

---

## Ordem de Execução Recomendada

```
1. ACTION-004: gh auth refresh --scopes workflow (P0 - libera push de workflows)
2. ACTION-005: Criar conta Fly.io
3. ACTION-006: Adicionar cartão de crédito
4. ACTION-007: Configurar spending limits
5. ACTION-008: Criar app trainb2b-demo
6. ACTION-009: Gerar token de deploy
7. ACTION-010: Configurar secrets/variables GitHub
8. git push origin feature/white-label-refactor (dispara CI/CD)
9. ACTION-011: PostgreSQL (se precisar backend)
10. ACTION-012: Domínio customizado (opcional)
```

---

## Links Úteis

- **Referência Técnica Fly.io:** [docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md](../../deploy/FLYIO-BILLING-ACOES-USUARIO.md)
- **Templates:** [templates/](templates/)
- **Ações Concluídas:** [ACOES-CONCLUIDAS.md](ACOES-CONCLUIDAS.md)
- **Guia de Uso:** [README.md](README.md)
- **ROADMAP:** [../ROADMAP.md](../ROADMAP.md)

---

## Ações Arquivadas (Obsoletas)

As seguintes ações de 2025 foram arquivadas por não serem mais relevantes:
- ACTION-002: Configurar Google Analytics 4 (adiado para pós-demo)
- ACTION-003: Validar Conformidade WCAG 2.1 AA (adiado para pós-demo)

---

**Última atualização:** 2026-01-28
**Próxima revisão:** Após execução do deploy inicial
