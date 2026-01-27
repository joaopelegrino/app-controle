# Fly.io - Ações do Usuário: Pagamentos e Assinaturas

**Projeto:** app-controle (TrainB2B)
**Data:** 2026-01-27
**Objetivo:** Guia de ações manuais para configuração de billing no Fly.io

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

## Referências

- [Fly.io Pricing](https://fly.io/docs/about/pricing/)
- [Fly.io Billing Dashboard](https://fly.io/dashboard)
- [Fly.io Free Allowances](https://fly.io/docs/about/pricing/#free-allowances)
- [Community Forum](https://community.fly.io)

---

**Última atualização:** 2026-01-27
