# Backlog: Deploy Cloud para Demonstração

**Data:** 2026-01-26
**Branch:** feature/white-label-refactor
**Objetivo:** Disponibilizar plataforma B2B em nuvem para demonstração comercial

---

## Contexto

O projeto app-controle está com 14 sprints completos, incluindo:
- Frontend React completo com i18n (pt-BR, en-US, es-ES)
- Backend NocoDB + PostgreSQL
- Sistema RBAC funcional (82%)
- Configuração white-label implementada
- CRUD completo de usuários e cursos

**Gap atual:** Falta infraestrutura de CI/CD e deploy em nuvem.

---

## Análise de Estado Atual

### Já Implementado

| Componente | Status | Arquivo |
|------------|--------|---------|
| Dockerfile (multi-stage) | ✅ | `Dockerfile` |
| Docker Compose (dev) | ✅ | `docker-compose.nocodb.yml` |
| Nginx config (produção) | ✅ | `nginx.conf` |
| Vite build otimizado | ✅ | `vite.config.js` |
| Variáveis white-label | ✅ | `src/config/platform.js` |

### Gaps Identificados

| Gap | Severidade | Impacto |
|-----|-----------|---------|
| CI/CD Pipeline | CRÍTICO | Sem automação de deploy |
| HTTPS/SSL | CRÍTICO | Inseguro para produção |
| Secrets Management | ALTO | Senhas expostas em compose |
| Monitoramento | ALTO | Sem visibilidade de erros |
| Migrations automáticas | MÉDIO | Deploy manual de schema |

---

## Tarefas Ordenadas por Prioridade

### Fase 1: Preparação (Fundação)

| # | Tarefa | Dependência |
|---|--------|-------------|
| 5 | Configurar variáveis de ambiente para produção | - |
| 3 | Criar docker-compose.prod.yml | - |
| 4 | Criar endpoint /health | - |
| 2 | Adicionar suporte HTTPS ao nginx.conf | - |
| 7 | Criar script de migração de banco | - |
| 10 | Preparar dados de demonstração | 7 |

### Fase 2: Infraestrutura Cloud

| # | Tarefa | Dependência |
|---|--------|-------------|
| 6 | Escolher e configurar plataforma cloud | - |
| 9 | Configurar domínio e DNS | 6 |
| 1 | Criar pipeline CI/CD | 3, 5 |

### Fase 3: Operação

| # | Tarefa | Dependência |
|---|--------|-------------|
| 11 | Adicionar monitoramento básico | 6, 9 |
| 8 | Criar documentação de deploy | Todas |

---

## Recomendação de Plataforma

### Para Demonstração Inicial (Custo-Benefício)

**Railway** ou **Render** - Características:
- Deploy via GitHub (push to deploy)
- PostgreSQL managed incluído
- SSL automático
- Custo: $20-50/mês
- Zero configuração de infraestrutura

### Para Escala Enterprise

**AWS ECS + RDS** ou **Kubernetes**
- Maior controle
- Auto-scaling
- Multi-região
- Custo: $100-500/mês

---

## Arquivos a Criar

```
.github/
└── workflows/
    └── deploy.yml              # CI/CD Pipeline

docs/deploy/
└── DEPLOY-GUIDE.md             # Documentação completa

database/
├── migrate.sh                  # Script de migrations
└── seed-demo-producao.sql      # Dados de demonstração

.env.production.example         # Template variáveis prod
docker-compose.prod.yml         # Compose para produção
```

---

## Comando de Retomada

```bash
# Para continuar o desenvolvimento de deploy:
git checkout feature/white-label-refactor
cat docs/backlog/backlog-2026-01-26-deploy-cloud-demonstracao.md

# Iniciar pela tarefa #5 (variáveis de ambiente)
# ou tarefa #6 (escolher plataforma) se preferir começar pela infra
```

---

## Próxima Sessão

1. Abrir este arquivo como contexto inicial
2. Escolher plataforma cloud (Railway recomendado para início)
3. Executar tarefas na ordem de dependência
4. Documentar configurações específicas da plataforma escolhida

**Meta:** Ter URL de demonstração funcional com HTTPS

---

**Última atualização:** 2026-01-26
**Responsável:** Claude Code Session
