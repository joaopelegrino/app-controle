# Getting Started

Este guia mostra como instalar e configurar o **app-controle** para desenvolvimento ou uso. Em 5 minutos voce tera o ambiente rodando.

## 1. Pre-requisitos

Antes de comecar, certifique-se de ter instalado:

| Ferramenta | Versao Minima | Verificar |
|------------|---------------|-----------|
| [mise](https://mise.jdx.dev) | 2024.x | `mise --version` |
| [Docker Desktop](https://docker.com) | 24.x | `docker --version` |
| Git | 2.x | `git --version` |

::: tip Instalacao do mise
```sh
# macOS/Linux
curl https://mise.run | sh

# Adicionar ao shell (~/.bashrc ou ~/.zshrc)
eval "$(mise activate bash)"  # ou zsh
```
:::

## 2. Clonar o Repositorio

```sh
git clone https://github.com/joaopelegrino/app-controle.git
cd app-controle
```

## 3. Instalar Ferramentas

O projeto usa [mise](https://mise.jdx.dev) para gerenciar todas as ferramentas de desenvolvimento. Execute:

```sh
mise install
```

Isso instalara automaticamente:

- **Bun 1.3.3** - Runtime JavaScript principal (35x mais rapido que npm)
- **Node.js 24.11.1** - Fallback para compatibilidade
- **Python 3.12** - Scripts auxiliares
- **gitleaks** - Verificacao de secrets
- **CLI modernas** - ripgrep, fd, bat, eza, delta, zoxide

## 4. Setup Rapido

Para configurar tudo de uma vez:

```sh
mise setup
```

Este comando executa:
1. Instala dependencias do projeto (`bun install`)
2. Configura o backend (PostgreSQL + NocoDB)
3. Instala browsers para testes E2E (Playwright)

## 5. Iniciar o Ambiente

### Frontend Apenas (dados mock)

```sh
mise dev
```

Acesse: http://localhost:3001

### Full-Stack (frontend + backend)

```sh
mise full-stack
```

Isso inicia:
- **Frontend**: http://localhost:3001
- **NocoDB**: http://localhost:8081

## 6. Verificar Ambiente

Para confirmar que tudo esta funcionando:

```sh
mise check
```

Saida esperada:

```
📦 Ferramentas:
  Bun: 1.3.3
  Node: v24.11.1
  Docker: Docker version 24.x

🔥 Dev server:
  ✅ Rodando (http://localhost:3001)

🐳 NocoDB:
  ✅ Containers rodando
  ✅ PostgreSQL: OK
  ✅ NocoDB: OK (http://localhost:8081)
```

## 7. Credenciais de Demo

Use estas credenciais para testar diferentes perfis:

| Email | Senha | Perfil | Acesso |
|-------|-------|--------|--------|
| admin@acmetech.com | Demo@2026 | Administrador | `/admin` |
| prof@acmetech.com | Demo@2026 | Instrutor | `/instructor` |
| maria@acmetech.com | Demo@2026 | Aluno | `/dashboard` |
| ceo@acmetech.com | Demo@2026 | C-Level | `/admin/executive` |

## Proximos Passos

- **[Quick Start](/docs/guide/quick-start.md)** - Tutorial de 5 minutos
- **[Tasks](/docs/development/tasks.md)** - Todos os comandos disponiveis
- **[FAQ](/docs/guide/faq.md)** - Perguntas frequentes

---

## Comandos Essenciais

| Comando | Descricao |
|---------|-----------|
| `mise dev` | Inicia servidor de desenvolvimento |
| `mise full-stack` | Frontend + Backend |
| `mise test` | Executa testes |
| `mise help` | Lista todos os comandos |

::: info Documentacao por Perfil
Veja os guias especificos para cada tipo de usuario:
- [Guia do Administrador](/docs/users/admin-guide.md)
- [Guia do Instrutor](/docs/users/instructor-guide.md)
- [Guia do Aluno](/docs/users/student-guide.md)
- [Guia do Executivo](/docs/users/executive-guide.md)
:::
