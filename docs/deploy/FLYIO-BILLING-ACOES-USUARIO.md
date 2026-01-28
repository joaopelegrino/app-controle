# Fly.io - Referência Técnica de Billing e Configuração

**Projeto:** app-controle (TrainB2B)
**Data:** 2026-01-28
**Tipo:** Documentação técnica de referência

> **IMPORTANTE:** As ações manuais pendentes estão centralizadas em:
> [`docs/backlog/acoes-usuario/ACOES-PENDENTES.md`](../backlog/acoes-usuario/ACOES-PENDENTES.md)
>
> Este documento serve como referência técnica detalhada para execução das ações.

---

## 1. Criar Conta Fly.io

### Via Browser (Recomendado)

1. Acesse: https://fly.io/app/sign-up
2. Opções de cadastro:
   - GitHub (recomendado para integração CI/CD)
   - Email + senha
3. Verificar email de confirmação

### Via CLI

```bash
# Instalar flyctl
curl -L https://fly.io/install.sh | sh

# Criar conta (abre browser)
flyctl auth signup

# Ou fazer login se já tem conta
flyctl auth login
```

---

## 2. Adicionar Cartão de Crédito

**IMPORTANTE:** Fly.io requer cartão de crédito para todas as organizações, mesmo para uso do free tier.

### Via Dashboard (Recomendado)

1. Acesse: https://fly.io/dashboard
2. Clique no nome da organização (canto superior esquerdo)
3. Navegue para **Billing**
4. Clique em **Add Payment Method**
5. Preencha dados do cartão:
   - Número do cartão
   - Data de validade
   - CVV
   - Nome no cartão
   - Endereço de cobrança (pode usar brasileiro)

### Via CLI

```bash
# Abre página de billing no browser
flyctl orgs billing
```

---

## 3. Verificar Limites do Free Tier

### Allowances Gratuitos (por organização)

| Recurso | Quantidade Gratuita |
|---------|---------------------|
| VMs shared-cpu-1x | 3 unidades (256MB cada) |
| Volumes | 3GB total |
| Bandwidth (saída) | 160GB/mês |
| IPv4 compartilhado | Incluído |
| IPv6 dedicado | Incluído |
| SSL/TLS | Incluído |

### Verificar Uso Atual

```bash
# Ver uso da organização
flyctl orgs show

# Ver billing detalhado
flyctl billing show

# Ver todas as apps e recursos
flyctl apps list
```

---

## 4. Configurar Alertas de Billing

### Via Dashboard

1. Acesse: https://fly.io/dashboard/[org-name]/billing
2. Seção **Spending Limits**
3. Configure:
   - **Soft Limit**: Alerta por email (ex: $5)
   - **Hard Limit**: Para recursos automaticamente (ex: $10)

### Recomendação para Demonstração

```
Soft Limit: $5 (alerta)
Hard Limit: $10 (proteção)
```

---

## 5. Monitorar Custos

### Comandos CLI

```bash
# Resumo de billing atual
flyctl billing show

# Uso detalhado por app
flyctl apps list --json | jq '.[] | {name, status}'

# Ver máquinas rodando (cobradas)
flyctl machines list -a trainb2b-demo

# Ver volumes (cobrados)
flyctl volumes list -a trainb2b-demo
```

### Via Dashboard

1. https://fly.io/dashboard/[org-name]/billing
2. Seções importantes:
   - **Current Usage**: Uso do mês atual
   - **Invoices**: Faturas anteriores
   - **Payment Methods**: Cartões cadastrados

---

## 6. Escalar para Reduzir Custos

### Habilitar Scale to Zero (já configurado no fly.toml)

```toml
# fly.toml - já configurado
[http_service]
  auto_stop_machines = "stop"   # Para quando inativo
  auto_start_machines = true    # Acorda em requests
  min_machines_running = 0      # Permite parar todas
```

### Verificar se Scale to Zero está funcionando

```bash
# Ver status das máquinas
flyctl machines list -a trainb2b-demo

# Se mostra "stopped" após inatividade = funcionando
# Se mostra "started" sempre = verificar configuração
```

### Parar App Manualmente (economia total)

```bash
# Parar todas as máquinas
flyctl apps suspend trainb2b-demo

# Reativar quando necessário
flyctl apps resume trainb2b-demo
```

---

## 7. Gerenciar PostgreSQL

### Criar Banco Development (Gratuito)

```bash
flyctl postgres create \
  --name trainb2b-db \
  --region gru \
  --initial-cluster-size 1 \
  --vm-size shared-cpu-1x \
  --volume-size 1
```

### Verificar Custo do Banco

```bash
# Ver detalhes do cluster
flyctl postgres list

# Ver uso de storage
flyctl volumes list -a trainb2b-db
```

### Destruir Banco (se não usar mais)

```bash
# CUIDADO: Irreversível!
flyctl apps destroy trainb2b-db
```

---

## 8. Ações em Caso de Cobrança Inesperada

### 1. Identificar Origem

```bash
# Listar todas as apps
flyctl apps list

# Ver máquinas de cada app
flyctl machines list -a [app-name]

# Ver volumes
flyctl volumes list -a [app-name]
```

### 2. Parar Recursos

```bash
# Parar app específica
flyctl apps suspend [app-name]

# Ou destruir se não precisar
flyctl apps destroy [app-name]
```

### 3. Contatar Suporte (se necessário)

- Email: support@fly.io
- Community: https://community.fly.io
- Discord: https://fly.io/discord

---

## 9. Cancelar/Deletar Conta

### Deletar Organização

```bash
# Primeiro, destruir todas as apps
flyctl apps list
flyctl apps destroy [cada-app]

# Deletar organização (via dashboard)
# https://fly.io/dashboard/[org-name]/settings
```

### Remover Método de Pagamento

1. Acesse: https://fly.io/dashboard/[org-name]/billing
2. Seção **Payment Methods**
3. Clique em **Remove** no cartão
4. **Nota:** Só remove se não houver saldo devedor

---

## 10. Checklist de Ações do Usuário

### Primeira Configuração

- [ ] Criar conta Fly.io (https://fly.io/app/sign-up)
- [ ] Adicionar cartão de crédito (obrigatório)
- [ ] Configurar spending limits ($5 soft, $10 hard)
- [ ] Verificar região padrão (gru para Brasil)

### Antes do Deploy

- [ ] Verificar free tier disponível (`flyctl billing show`)
- [ ] Confirmar fly.toml com scale-to-zero
- [ ] Gerar token de deploy (`flyctl tokens create deploy`)

### Após Deploy

- [ ] Verificar app funcionando (`flyctl open`)
- [ ] Monitorar primeiras 24h de uso
- [ ] Confirmar scale-to-zero ativo

### Manutenção Mensal

- [ ] Revisar billing no início do mês
- [ ] Verificar se há recursos ociosos
- [ ] Atualizar limites se necessário

---

## 11. Ações Externas Obrigatórias

Ações que **devem ser realizadas manualmente** pelo usuário (não podem ser automatizadas pelo Claude Code).

### 11.1 GitHub CLI - Adicionar Scope Workflow

**Problema:** Push de arquivos `.github/workflows/*.yml` requer scope `workflow` no token OAuth.

**Erro típico:**
```
refusing to allow an OAuth App to create or update workflow without `workflow` scope
```

**Solução:**
```bash
# Adicionar scope ao token existente (abre browser)
gh auth refresh --scopes workflow

# Ou reautenticar completamente
gh auth login --scopes repo,workflow,gist,read:org
```

**Verificar:**
```bash
gh auth status
# Deve mostrar: Token scopes: 'gist', 'read:org', 'repo', 'workflow'
```

### 11.2 Fly.io - Gerar Token de Deploy

**Ação:** Gerar token para CI/CD no GitHub Actions.

```bash
# Instalar flyctl (se não instalado)
curl -L https://fly.io/install.sh | sh

# Login no Fly.io (abre browser)
flyctl auth login

# Gerar token de deploy (copiar COMPLETO incluindo "FlyV1 ")
flyctl tokens create deploy -x 999999h
```

**Configurar no GitHub:**
```bash
# Via gh CLI
gh secret set FLY_API_TOKEN
# Cole o token quando solicitado

# Ou via browser:
# https://github.com/[user]/[repo]/settings/secrets/actions/new
```

### 11.3 Fly.io - Criar App (Primeira Vez)

**Ação:** Criar aplicação no Fly.io antes do primeiro deploy.

```bash
# Criar app (não faz deploy ainda)
flyctl launch --name trainb2b-demo --region gru --no-deploy

# Ou se app já existe, apenas associar
flyctl apps create trainb2b-demo --org personal
```

### 11.4 GitHub - Configurar Variables de Build

**Ação:** Configurar variáveis públicas para o build Vite.

```bash
# Via gh CLI
gh variable set VITE_PLATFORM_NAME --body "TrainB2B Demo"
gh variable set VITE_PLATFORM_SHORT_NAME --body "TrainB2B"
gh variable set VITE_STORAGE_PREFIX --body "trainb2b"
gh variable set VITE_API_BASE_URL --body "https://trainb2b-api.fly.dev"

# Verificar
gh variable list
```

### 11.5 Checklist de Ações Externas

**Ordem de execução recomendada:**

- [ ] 1. `gh auth refresh --scopes workflow` (permissão GitHub)
- [ ] 2. `flyctl auth login` (login Fly.io)
- [ ] 3. `flyctl launch --name trainb2b-demo --region gru --no-deploy` (criar app)
- [ ] 4. `flyctl tokens create deploy -x 999999h` (gerar token)
- [ ] 5. `gh secret set FLY_API_TOKEN` (configurar secret)
- [ ] 6. `gh variable set VITE_*` (configurar variables)
- [ ] 7. `git push origin feature/white-label-refactor` (push com workflow)
- [ ] 8. Adicionar cartão de crédito no Fly.io (billing)
- [ ] 9. Configurar spending limits ($5/$10)

---

## Referências

- [Fly.io Pricing](https://fly.io/docs/about/pricing/)
- [Fly.io Billing Dashboard](https://fly.io/dashboard)
- [Fly.io Free Allowances](https://fly.io/docs/about/pricing/#free-allowances)
- [GitHub CLI Auth Scopes](https://cli.github.com/manual/gh_auth_login)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Community Forum](https://community.fly.io)

---

## Integração com Sistema de Ações

Este documento é **referência técnica**. As ações pendentes estão em:

| Documento | Propósito |
|-----------|-----------|
| [`ACOES-PENDENTES.md`](../backlog/acoes-usuario/ACOES-PENDENTES.md) | Lista de ações a executar |
| [`ACOES-CONCLUIDAS.md`](../backlog/acoes-usuario/ACOES-CONCLUIDAS.md) | Histórico de ações |
| [`README.md`](../backlog/acoes-usuario/README.md) | Guia do sistema de ações |

---

**Última atualização:** 2026-01-28
**Tipo:** Referência técnica (não checklist)
