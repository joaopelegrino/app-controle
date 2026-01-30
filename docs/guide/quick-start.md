# Quick Start

Tutorial de 5 minutos para ter o app-controle rodando.

## TL;DR

```sh
# Clone e entre no diretorio
git clone https://github.com/joaopelegrino/app-controle.git
cd app-controle

# Instale ferramentas e dependencias
mise install && bun install

# Inicie o servidor de desenvolvimento
mise dev
```

Acesse http://localhost:3001 e faca login com `admin@acmetech.com` / `Demo@2026`.

---

## Passo a Passo

### 1. Clone o Repositorio

```sh
git clone https://github.com/joaopelegrino/app-controle.git
cd app-controle
```

### 2. Instale as Ferramentas

```sh
mise install
```

::: tip Primeira vez usando mise?
Se o mise nao estiver instalado:
```sh
curl https://mise.run | sh
eval "$(mise activate zsh)"  # ou bash
```
:::

### 3. Instale Dependencias

```sh
bun install
```

### 4. Inicie o Servidor

```sh
mise dev
```

### 5. Acesse a Aplicacao

Abra http://localhost:3001 no navegador.

### 6. Faca Login

Use uma das credenciais de demo:

```
Email: admin@acmetech.com
Senha: Demo@2026
```

---

## Usando o Backend (Opcional)

Para usar dados reais em vez de mock:

### Iniciar NocoDB

```sh
mise nocodb:start
```

### Verificar Status

```sh
mise nocodb:health
```

### Parar NocoDB

```sh
mise nocodb:stop
```

---

## Comandos Uteis

```sh
# Desenvolvimento
mise dev              # Inicia frontend
mise full-stack       # Frontend + Backend
mise check            # Verifica ambiente

# Testes
mise test             # Testes unitarios
mise e2e:ui           # Testes E2E com interface

# Backend
mise nocodb:start     # Inicia containers
mise nocodb:stop      # Para containers
mise nocodb:logs      # Ver logs

# Ajuda
mise help             # Lista todos comandos
mise docs             # Links de documentacao
```

---

## Proximos Passos

1. **Explorar a interface** - Navegue pelos menus e funcionalidades
2. **Testar diferentes perfis** - Login com admin, instrutor, aluno, c-level
3. **Ler a documentacao** - [Tasks](/docs/development/tasks.md) e [Configuration](/docs/development/configuration.md)

::: info Problemas?
Consulte o [FAQ](/docs/guide/faq.md) ou execute `mise check` para diagnosticar.
:::
