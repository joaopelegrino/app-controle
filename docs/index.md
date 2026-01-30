# app-controle Documentation

Bem-vindo a documentacao do **app-controle** - Plataforma B2B de treinamento tecnico corporativo.

## Quick Links

- [Getting Started](/docs/guide/getting-started.md) - Comece aqui
- [Quick Start](/docs/guide/quick-start.md) - Setup em 5 minutos
- [FAQ](/docs/guide/faq.md) - Perguntas frequentes

---

## Guias

### Para Todos

| Guia | Descricao |
|------|-----------|
| [Getting Started](/docs/guide/getting-started.md) | Instalacao e configuracao inicial |
| [Quick Start](/docs/guide/quick-start.md) | Tutorial rapido de 5 minutos |
| [FAQ](/docs/guide/faq.md) | Perguntas frequentes |

### Para Desenvolvedores

| Guia | Descricao |
|------|-----------|
| [Dev Tools](/docs/development/tools.md) | Ferramentas de desenvolvimento |
| [Tasks](/docs/development/tasks.md) | Todos os comandos mise |
| [Configuration](/docs/development/configuration.md) | Configuracao do projeto |
| [Hooks](/docs/development/hooks.md) | Automacao com hooks |
| [Testing](/docs/development/testing.md) | Testes unitarios e E2E |

### Para DevOps

| Guia | Descricao |
|------|-----------|
| [Deploy Overview](/docs/deploy-docs/overview.md) | Visao geral de deploy |
| [Fly.io](/docs/deploy-docs/flyio.md) | Deploy no Fly.io |
| [CI/CD](/docs/deploy-docs/ci-cd.md) | Integracao continua |

### Para Backend

| Guia | Descricao |
|------|-----------|
| [Backend Overview](/docs/backend-docs/overview.md) | Arquitetura do backend |
| [NocoDB](/docs/backend-docs/nocodb.md) | API e administracao |
| [Database](/docs/backend-docs/database.md) | Schema e queries |

---

## Guias por Perfil

Documentacao especifica para cada tipo de usuario:

| Perfil | Guia | Acesso |
|--------|------|--------|
| Administrador | [Guia do Admin](/docs/users/admin-guide.md) | Gestao de usuarios e cursos |
| Instrutor | [Guia do Instrutor](/docs/users/instructor-guide.md) | Acompanhamento de equipe |
| Aluno | [Guia do Aluno](/docs/users/student-guide.md) | Uso da plataforma |
| Executivo | [Guia do Executivo](/docs/users/executive-guide.md) | Metricas e ROI |

---

## Referencia

Documentacao tecnica detalhada:

| Referencia | Descricao |
|------------|-----------|
| [CLI Reference](/docs/reference/cli-reference.md) | Todos os comandos |
| [RBAC](/docs/reference/rbac.md) | Sistema de permissoes |
| [i18n](/docs/reference/i18n.md) | Internacionalizacao |

---

## Estrutura da Documentacao

```
docs/
├── guide/                  # Guias gerais
│   ├── getting-started.md  # Introducao
│   ├── quick-start.md      # Tutorial rapido
│   └── faq.md              # FAQ
│
├── development/            # Para desenvolvedores
│   ├── tools.md            # Ferramentas
│   ├── tasks.md            # Comandos mise
│   ├── configuration.md    # Configuracao
│   ├── hooks.md            # Automacao
│   └── testing.md          # Testes
│
├── deploy-docs/            # Para DevOps
│   ├── overview.md         # Visao geral
│   ├── flyio.md            # Fly.io
│   └── ci-cd.md            # GitHub Actions
│
├── backend-docs/           # Backend
│   ├── overview.md         # Arquitetura
│   ├── nocodb.md           # NocoDB
│   └── database.md         # PostgreSQL
│
├── users/                  # Por perfil
│   ├── admin-guide.md      # Administrador
│   ├── instructor-guide.md # Instrutor
│   ├── student-guide.md    # Aluno
│   └── executive-guide.md  # Executivo
│
└── reference/              # Referencia tecnica
    ├── cli-reference.md    # CLI
    ├── rbac.md             # Permissoes
    └── i18n.md             # Traducoes
```

---

## Comandos Essenciais

```sh
# Desenvolvimento
mise dev              # Inicia frontend
mise full-stack       # Frontend + Backend
mise test             # Executa testes

# Backend
mise nocodb:start     # Inicia NocoDB
mise nocodb:health    # Verifica status

# Deploy
mise deploy:prod      # Deploy Fly.io
mise deploy:status    # Status da app

# Ajuda
mise help             # Lista comandos
mise docs             # Links de docs
```

---

## Stack Tecnologica

| Camada | Tecnologia |
|--------|------------|
| Frontend | React + Vite + Tailwind |
| Runtime | Bun |
| Backend | NocoDB + PostgreSQL |
| Deploy | Fly.io |
| CI/CD | GitHub Actions |
| Tooling | mise |
| i18n | react-i18next |

---

## Versao

- **Versao**: 10.0.2
- **Data**: 2026-01-30
- **Status**: Producao
- **Sprints Completos**: 6-14

---

## Contribuindo

1. Fork o repositorio
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commite: `git commit -m "feat: minha feature"`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## Suporte

- **Issues**: https://github.com/joaopelegrino/app-controle/issues
- **Email**: suporte@trainb2b.com
- **Documentacao**: Este site

---

*Documentacao gerada seguindo o estilo [mise.jdx.dev](https://mise.jdx.dev)*
