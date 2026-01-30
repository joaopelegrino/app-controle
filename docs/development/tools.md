# Dev Tools

O app-controle usa [mise](https://mise.jdx.dev) para gerenciar ferramentas de desenvolvimento. Isso garante que todos os desenvolvedores usem as mesmas versoes, independente da configuracao do sistema.

## Ferramentas Instaladas

### Runtime Principal

| Ferramenta | Versao | Uso |
|------------|--------|-----|
| **Bun** | 1.3.3 | Runtime JavaScript principal. 35x mais rapido que npm. |
| Node.js | 24.11.1 | Fallback para compatibilidade com scripts legados. |
| Python | 3.12 | Scripts auxiliares e agents. |

### Seguranca

| Ferramenta | Versao | Uso |
|------------|--------|-----|
| **gitleaks** | latest | Deteccao de secrets no codigo. |

### CLI Modernas (via Cargo)

| Ferramenta | Comando | Substitui | Uso |
|------------|---------|-----------|-----|
| ripgrep | `rg` | grep | Busca em arquivos (usado por Claude Code) |
| fd-find | `fd` | find | Localizacao rapida de arquivos |
| bat | `bat` | cat | Visualizacao com syntax highlighting |
| eza | `eza` | ls | Listagem com icones e cores |
| bottom | `btm` | htop | Monitoramento de processos |
| git-delta | `delta` | diff | Diff melhorado para git |
| zoxide | `z` | cd | Navegacao inteligente com historico |

---

## Instalacao

Para instalar todas as ferramentas:

```sh
mise install
```

Isso le o arquivo `.mise.toml` e instala as versoes especificadas.

### Verificar Instalacao

```sh
mise list
```

Output esperado:
```
Tool       Version  Source
bun        1.3.3    .mise.toml
node       24.11.1  .mise.toml
python     3.12     .mise.toml
gitleaks   8.30.0   .mise.toml
ripgrep    14.1.0   .mise.toml
...
```

---

## Configuracao

As ferramentas sao configuradas no arquivo `.mise.toml` na raiz do projeto:

```toml
[tools]
# Runtime principal
bun = "1.3.3"

# Seguranca
gitleaks = "latest"

# Fallback
node = "24.11.1"
python = "3.12"

# CLI modernas
"cargo:ripgrep" = "latest"
"cargo:fd-find" = "latest"
"cargo:bat" = "latest"
"cargo:eza" = "latest"
"cargo:bottom" = "latest"
"cargo:git-delta" = "latest"
"cargo:zoxide" = "latest"
```

---

## Bun vs npm

O projeto usa **Bun** como runtime principal em vez de npm:

| Operacao | npm | Bun | Ganho |
|----------|-----|-----|-------|
| `install` | 45s | 1.3s | **35x** |
| `dev` | 2.5s | 0.8s | **3x** |
| `build` | 12s | 4s | **3x** |
| `test` | 8s | 2.5s | **3x** |

### Por que Bun?

1. **Velocidade** - Instalacao 35x mais rapida
2. **Compatibilidade** - 100% compativel com package.json
3. **Built-in** - Bundler, transpiler, test runner integrados
4. **Drop-in** - Substitui npm/yarn sem mudancas no codigo

::: warning Importante
Sempre use `bun` em vez de `npm` ou `yarn`:
```sh
# Correto
bun install
bun run dev

# Incorreto
npm install  # Nao use!
yarn dev     # Nao use!
```
:::

---

## CLI Modernas

### ripgrep (rg)

Busca rapida em arquivos:

```sh
# Buscar "useState" em arquivos .jsx
rg "useState" --type jsx

# Buscar com contexto
rg "apiService" -C 3

# Buscar ignorando case
rg -i "error" src/
```

### fd

Encontrar arquivos:

```sh
# Encontrar arquivos .jsx
fd -e jsx

# Encontrar por nome
fd "Modal" src/

# Encontrar e executar comando
fd -e test.js -x bun test {}
```

### bat

Visualizar arquivos com syntax highlighting:

```sh
# Ver arquivo com cores
bat src/App.jsx

# Ver diff com cores
git diff | bat -l diff
```

### eza

Listagem de arquivos melhorada:

```sh
# Lista com icones
eza --icons

# Lista em arvore
eza --tree --level=2

# Lista com git status
eza -la --git
```

### zoxide

Navegacao inteligente:

```sh
# Pular para diretorio frequente
z app-controle

# Interativo
zi

# Adicionar diretorio manualmente
zoxide add ~/projetos/app-controle
```

### bottom (btm)

Monitoramento de sistema:

```sh
btm
```

Mostra CPU, memoria, processos, rede em interface TUI.

---

## Atualizando Ferramentas

### Atualizar Todas

```sh
mise upgrade
```

### Atualizar Ferramenta Especifica

```sh
mise upgrade bun
mise upgrade node
```

### Verificar Atualizacoes Disponiveis

```sh
mise outdated
```

---

## Lockfile

O projeto usa lockfile para garantir reprodutibilidade:

```toml
[settings]
lockfile = true
```

O arquivo `mise.lock` trava versoes exatas para CI/CD e colaboradores.

---

## Variaveis de Ambiente

O `.mise.toml` tambem define variaveis de ambiente:

```toml
[env]
PROJECT_NAME = "ultrathink"
PROJECT_TYPE = "react-vite-bun"
NODE_ENV = "development"
VITE_PORT = "3001"
NOCODB_URL = "http://localhost:8081"
```

Essas variaveis sao carregadas automaticamente ao entrar no diretorio.

---

## Troubleshooting

### Ferramenta nao encontrada

```sh
mise install
```

### Versao errada

```sh
mise list
# Verificar se .mise.toml esta correto
mise install --force
```

### Cache corrompido

```sh
mise cache clear
mise install
```

### Conflito com instalacao global

```sh
# Verificar qual binario esta sendo usado
which bun
# Deve ser: ~/.local/share/mise/installs/bun/1.3.3/bin/bun
```

::: info Mais Informacoes
- [Documentacao oficial do mise](https://mise.jdx.dev)
- [Comparacao mise vs asdf](https://mise.jdx.dev/dev-tools/comparison-to-asdf.html)
- [Backends disponiveis](https://mise.jdx.dev/dev-tools/backends/)
:::
