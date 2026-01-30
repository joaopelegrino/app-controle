# Hooks

O app-controle usa [mise hooks](https://mise.jdx.dev/hooks.html) para automatizar tarefas quando voce entra ou sai do diretorio do projeto.

## Visao Geral

Hooks sao scripts executados automaticamente durante uma sessao `mise activate`:

| Hook | Quando Executa | Uso |
|------|----------------|-----|
| `enter` | Ao entrar no diretorio | Setup automatico |
| `leave` | Ao sair do diretorio | Cleanup e lembretes |

---

## Hook Enter

Executado toda vez que voce entra no diretorio do projeto.

### Configuracao Atual

```toml
[hooks]
enter = """
# 1. Verificar e instalar deps (idempotente)
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias (bun)..."
  bun install --silent && echo "   ✓ Dependencias instaladas"
fi

# 2. Verificar lockfile atualizado
if [ -f "package.json" ] && [ -f "bun.lock" ]; then
  if [ "package.json" -nt "bun.lock" ]; then
    echo "⚠️  package.json mais recente que bun.lock"
    echo "   💡 Execute: bun install"
  fi
fi

# 3. Verificar .env.nocodb
if [ ! -f ".env.nocodb" ]; then
  echo "⚠️  Arquivo .env.nocodb nao encontrado"
  echo "   💡 Execute: mise nocodb:setup"
fi

# 4. Verificar Docker
if ! command -v docker &> /dev/null; then
  echo "⚠️  Docker nao encontrado (necessario para NocoDB)"
  echo "   💡 Instale Docker: https://docs.docker.com/get-docker/"
fi

# 5. Menu de comandos
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  📦 app-controle - MVP Simples (Bash + NocoDB)                 ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║  Frontend:  mise dev              (React + Vite)               ║"
echo "║  Backend:   mise nocodb:start     (PostgreSQL + NocoDB)        ║"
echo "║  Full:      mise full-stack       (Frontend + Backend)         ║"
echo "║  E2E:       mise e2e:ui            (Playwright UI)             ║"
echo "║  Verify:    mise check             (Verificar ambiente)        ║"
echo "║  Help:      mise help              (Lista todos comandos)      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
"""
```

### O que o Hook Faz

1. **Instala dependencias automaticamente** se `node_modules` nao existe
2. **Alerta sobre lockfile desatualizado** se `package.json` foi modificado
3. **Verifica configuracao do backend** (`.env.nocodb`)
4. **Verifica Docker** instalado
5. **Mostra menu de comandos** para referencia rapida

---

## Hook Leave

Executado ao sair do diretorio do projeto.

### Configuracao Atual

```toml
leave = """
# Cleanup suave (sem forcar kill de processos)
echo "👋 Saindo do app-controle..."

# Lembrete util se NocoDB estiver rodando
if command -v docker &> /dev/null; then
  if docker ps 2>/dev/null | grep -q app-controle-nocodb; then
    echo "💡 NocoDB ainda esta rodando. Para parar: mise nocodb:stop"
  fi
fi
"""
```

### O que o Hook Faz

1. **Mensagem de despedida**
2. **Lembrete sobre containers** se NocoDB ainda estiver rodando

---

## Personalizando Hooks

### Desativar Menu

Se o menu de comandos for muito verboso, crie um `.mise.local.toml`:

```toml
[hooks]
enter = """
# Verificacoes silenciosas
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
  bun install --silent
fi
"""
```

### Adicionar Verificacoes

```toml
[hooks]
enter = """
# Verificar versao do Node
REQUIRED_NODE=24
CURRENT_NODE=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$CURRENT_NODE" -lt "$REQUIRED_NODE" ]; then
  echo "⚠️  Node $REQUIRED_NODE+ necessario. Atual: v$CURRENT_NODE"
fi

# Verificar git hooks
if [ ! -f ".git/hooks/pre-commit" ]; then
  echo "💡 Configure pre-commit: mise generate git-pre-commit"
fi
"""
```

### Auto-Start Backend

```toml
[hooks]
enter = """
# Iniciar NocoDB automaticamente se Docker disponivel
if command -v docker &> /dev/null; then
  if ! docker ps 2>/dev/null | grep -q app-controle-nocodb; then
    echo "🐳 Iniciando NocoDB automaticamente..."
    docker-compose -f docker-compose.nocodb.yml up -d
  fi
fi
"""
```

::: warning Cuidado com Auto-Start
Iniciar servicos automaticamente pode consumir recursos. Use com moderacao.
:::

---

## Hooks em Arquivo Separado

Para hooks complexos, use arquivo externo:

```toml
[hooks]
enter = "source ./scripts/enter-hook.sh"
leave = "source ./scripts/leave-hook.sh"
```

### scripts/enter-hook.sh

```bash
#!/bin/bash
# Hook de entrada do projeto

# Carregar funcoes auxiliares
source ./scripts/utils.sh

# Executar verificacoes
check_dependencies
check_environment
show_menu
```

---

## Variaveis Disponiveis

Dentro dos hooks, voce tem acesso a:

| Variavel | Valor | Descricao |
|----------|-------|-----------|
| `$PWD` | Diretorio atual | Caminho do projeto |
| `$MISE_*` | Variaveis do mise | Configuracoes internas |
| `$PROJECT_NAME` | ultrathink | Do `[env]` |
| `$NODE_ENV` | development | Do `[env]` |

---

## Debugging Hooks

### Ver o que esta sendo executado

```sh
MISE_DEBUG=1 cd /path/to/app-controle
```

### Testar hook manualmente

```sh
# Simular enter
source <(grep -A100 'enter = """' .mise.toml | sed 's/enter = """//' | sed '/"""/q' | head -n -1)
```

### Desativar hooks temporariamente

```sh
MISE_HOOKS=0 cd /path/to/app-controle
```

---

## Hooks vs Tasks

| Aspecto | Hooks | Tasks |
|---------|-------|-------|
| Execucao | Automatica | Manual (`mise run`) |
| Proposito | Setup/cleanup | Comandos especificos |
| Frequencia | Toda entrada/saida | Sob demanda |
| Interativo | Nao | Sim |

::: tip Quando Usar
- **Hooks**: Verificacoes automaticas, lembretes, setup inicial
- **Tasks**: Operacoes que precisam ser executadas explicitamente
:::

---

## Exemplos de Uso

### Sincronizar Git Hooks

```toml
[hooks]
enter = """
# Garantir git hooks configurados
if [ -d ".git" ]; then
  if [ ! -f ".git/hooks/pre-commit" ]; then
    cp scripts/pre-commit .git/hooks/
    chmod +x .git/hooks/pre-commit
    echo "✓ Git pre-commit hook configurado"
  fi
fi
"""
```

### Ativar Ambiente Virtual Python

```toml
[hooks]
enter = """
if [ -f "requirements.txt" ]; then
  if [ ! -d ".venv" ]; then
    python -m venv .venv
    echo "✓ Ambiente virtual criado"
  fi
  source .venv/bin/activate
  echo "✓ Ambiente virtual ativado"
fi
"""
```

### Notificacao Desktop (macOS)

```toml
[hooks]
enter = """
if command -v osascript &> /dev/null; then
  osascript -e 'display notification "Projeto carregado" with title "app-controle"'
fi
"""
```

::: info Documentacao Oficial
Veja a [documentacao do mise sobre hooks](https://mise.jdx.dev/hooks.html) para mais opcoes.
:::
