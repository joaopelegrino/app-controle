---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Sulical"
  text: "Central de Ajuda"
  tagline: Capacitação Técnica para sua Empresa
  actions:
    - theme: brand
      text: Getting Started
      link: /guide/getting-started
    - theme: alt
      text: Quick Start
      link: /guide/quick-start
    - theme: alt
      text: Acessar Plataforma
      link: /

features:
  - title: Guia do Desenvolvedor
    details: Ferramentas, tasks mise, configuracao, hooks e testes
    link: /development/tools
  - title: Deploy
    details: Fly.io, CI/CD com GitHub Actions
    link: /deploy-docs/overview
  - title: Backend
    details: NocoDB, PostgreSQL, API
    link: /backend-docs/overview
  - title: Referencia
    details: CLI, RBAC, i18n
    link: /reference/cli-reference
---

## Guias por Perfil

Documentacao especifica para cada tipo de usuario:

| Perfil | Guia | Descricao |
|--------|------|-----------|
| Administrador | [Guia do Admin](/users/admin-guide) | Gestao de usuarios e cursos |
| Instrutor | [Guia do Instrutor](/users/instructor-guide) | Acompanhamento de equipe |
| Aluno | [Guia do Aluno](/users/student-guide) | Uso da plataforma |
| Executivo | [Guia do Executivo](/users/executive-guide) | Metricas e ROI |

---

## Comandos Essenciais

```sh
# Desenvolvimento
mise dev              # Inicia frontend
mise full-stack       # Frontend + Backend
mise test             # Executa testes

# Documentacao
mise docs:dev         # Servidor de docs local
mise docs:build       # Build de docs

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
| Docs | VitePress |

---

## Versao

- **Versao**: 11.0.0
- **Data**: 2026-02-01
- **Status**: Producao
- **Sprints Completos**: 6-14

---

*Documentacao Sulical - Gerada com [VitePress](https://vitepress.dev)*
