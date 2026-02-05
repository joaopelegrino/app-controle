# UltraThink/TrainB2B - Documentação

**Plataforma B2B SaaS de Treinamento Técnico Corporativo**

**Última atualização:** 2026-02-05
**Versão da Documentação:** 2.0.0 (Consolidada)

---

## Navegação Rápida

| Se você quer... | Vá para... |
|-----------------|------------|
| Entender o produto | [01-PRODUTO/](#01-produto) |
| Ver especificações funcionais | [02-ESPECIFICACAO/](#02-especificacao) |
| Entender a arquitetura | [03-ARQUITETURA/](#03-arquitetura) |
| Configurar testes | [04-QUALIDADE/](#04-qualidade) |
| Fazer deploy | [05-OPERACOES/](#05-operacoes) |
| Usar a plataforma | [06-GUIAS-USUARIO/](#06-guias-usuario) |
| Ver roadmap/backlog | [07-GESTAO/](#07-gestao) |
| Consultar referência | [08-REFERENCIA/](#08-referencia) |
| **Retomar consolidação** | [00-ROADMAP-CONSOLIDACAO.md](./00-ROADMAP-CONSOLIDACAO.md) |

---

## Visão Geral do Produto

**UltraThink** é uma plataforma B2B SaaS de treinamento técnico corporativo com dois pilares:

1. **LMS Corporativo**: Empresas criam/consomem cursos para treinar colaboradores
2. **Hub de Especialistas**: Marketplace onde especialistas externos vendem cursos para empresas

### Status Atual

| Aspecto | Status |
|---------|--------|
| **Frontend** | ✅ Produção-ready (React 18 + Vite 5) |
| **Backend** | ✅ Funcional (NocoDB + PostgreSQL 16) |
| **Autenticação** | ✅ JWT + RBAC (4 roles, 21 permissões) |
| **Dashboards** | ✅ 4 dashboards por role |
| **i18n** | ✅ 3 idiomas (PT-BR, EN-US, ES-ES) |
| **Hub Especialistas** | 📋 Planejado (Q4 2026+) |

---

## Estrutura da Documentação

### 01-PRODUTO/
Documentação de produto, visão, personas e modelo de negócio.

| Arquivo | Descrição |
|---------|-----------|
| [01-visao-e-missao.md](./01-PRODUTO/01-visao-e-missao.md) | PRD principal - Visão, Missão, Hub de Especialistas |
| [04-personas.md](./01-PRODUTO/04-personas.md) | 5 personas (4 internas + 1 especialista externo) |
| [06-glossario.md](./01-PRODUTO/06-glossario.md) | Glossário unificado de termos |
| [07-questoes-em-aberto.md](./01-PRODUTO/07-questoes-em-aberto.md) | 29 questões de produto (6 respondidas) |

---

### 02-ESPECIFICACAO/
Especificações funcionais detalhadas.

| Arquivo | Descrição |
|---------|-----------|
| [01-modelo-dominio.md](./02-ESPECIFICACAO/01-modelo-dominio.md) | Hierarquia Hub → Curso → Aula |
| [04-hub-especialistas.md](./02-ESPECIFICACAO/04-hub-especialistas.md) | Spec completa do Hub de Especialistas |

---

### 03-ARQUITETURA/
Documentação técnica e de arquitetura.

| Arquivo | Descrição |
|---------|-----------|
| [01-visao-geral.md](./03-ARQUITETURA/01-visao-geral.md) | Visão geral da arquitetura |
| [02-i18n.md](./03-ARQUITETURA/02-i18n.md) | Internacionalização |
| [03-backend-overview.md](./03-ARQUITETURA/03-backend-overview.md) | Overview do backend |
| [04-database.md](./03-ARQUITETURA/04-database.md) | Schema do banco de dados |
| [05-nocodb.md](./03-ARQUITETURA/05-nocodb.md) | Configuração NocoDB |

---

### 04-QUALIDADE/
Testes, QA e especificações de qualidade.

| Arquivo | Descrição |
|---------|-----------|
| [01-qa-e2e-specs.md](./04-QUALIDADE/01-qa-e2e-specs.md) | 37 casos de teste E2E |
| [02-mcp-chrome-devtools.md](./04-QUALIDADE/02-mcp-chrome-devtools.md) | Guia completo MCP Chrome |

---

### 05-OPERACOES/
Deploy, CI/CD e operações.

| Arquivo | Descrição |
|---------|-----------|
| [01-overview.md](./05-OPERACOES/01-overview.md) | Overview de deploy |
| [02-flyio.md](./05-OPERACOES/02-flyio.md) | Deploy no Fly.io |
| [03-ci-cd.md](./05-OPERACOES/03-ci-cd.md) | Pipeline CI/CD |

---

### 06-GUIAS-USUARIO/
Manuais por perfil de usuário.

| Arquivo | Descrição |
|---------|-----------|
| [01-admin.md](./06-GUIAS-USUARIO/01-admin.md) | Guia do Administrador |
| [02-instructor.md](./06-GUIAS-USUARIO/02-instructor.md) | Guia do Instrutor |
| [03-student.md](./06-GUIAS-USUARIO/03-student.md) | Guia do Estudante |
| [04-executive.md](./06-GUIAS-USUARIO/04-executive.md) | Guia do Executivo |

---

### 07-GESTAO/
Roadmap, backlog e gestão do projeto.

| Arquivo | Descrição |
|---------|-----------|
| [01-roadmap.md](./07-GESTAO/01-roadmap.md) | Roadmap de releases |
| [03-acoes-pendentes.md](./07-GESTAO/03-acoes-pendentes.md) | Ações pendentes |

---

### 08-REFERENCIA/
Documentação de referência rápida.

| Arquivo | Descrição |
|---------|-----------|
| [01-cli-reference.md](./08-REFERENCIA/01-cli-reference.md) | Referência CLI |
| [02-rbac.md](./08-REFERENCIA/02-rbac.md) | RBAC e permissões |
| [04-template-curso.md](./08-REFERENCIA/04-template-curso.md) | Template de curso |

---

### 99-ARQUIVO/
Documentos históricos e arquivados.

```
99-ARQUIVO/
├── legado/          # Documentos substituídos pela consolidação
├── relatorios/      # Relatórios de análise
└── sprints/         # Sprints arquivados
```

---

## Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Frontend | React + Vite | 18.3.1 / 5.1.4 |
| Styling | Tailwind CSS | 3.4.1 |
| Backend | NocoDB | Latest |
| Database | PostgreSQL | 16 |
| Runtime | Bun | 1.3.3+ |
| Testing | Playwright + Vitest | 1.56.1 / 3.2.4 |
| i18n | i18next | 25.8.0 |

---

## Quick Start

```bash
# Clone o repositório
git clone [repo-url]
cd app-controle

# Instale dependências
bun install

# Inicie o banco de dados
docker-compose -f docker-compose.nocodb.yml up -d

# Inicie o frontend
bun run dev
```

---

## Links Úteis

- **Roadmap de Consolidação:** [00-ROADMAP-CONSOLIDACAO.md](./00-ROADMAP-CONSOLIDACAO.md)
- **Questões em Aberto:** [01-PRODUTO/07-questoes-em-aberto.md](./01-PRODUTO/07-questoes-em-aberto.md)
- **Hub de Especialistas:** [02-ESPECIFICACAO/04-hub-especialistas.md](./02-ESPECIFICACAO/04-hub-especialistas.md)

---

**Mantido por:** Equipe UltraThink
**Última consolidação:** 2026-02-05
