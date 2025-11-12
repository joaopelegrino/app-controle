# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Este é um repositório de controle de aplicação que está em fase inicial de desenvolvimento. Atualmente contém apenas arquivos de estrutura básica.

## Git Workflow

O repositório possui dois branches principais sincronizados:

- **main**: Branch principal de produção
- **desenvolvimento**: Branch de desenvolvimento ativo

Ambos os branches (local e remoto) são mantidos sincronizados no mesmo commit. Ao trabalhar com novas funcionalidades:

```bash
# Trabalhar no branch de desenvolvimento
git checkout desenvolvimento

# Após aprovação, sincronizar com main
git checkout main
git merge desenvolvimento
git push personal main

# Manter desenvolvimento atualizado
git checkout desenvolvimento
git push personal desenvolvimento
```

## Remote Configuration

O repositório usa o remote **personal** apontando para:
- `https://github.com/joaopelegrino/app-controle.git`

Use os comandos configurados no ambiente WSL para gerenciar remotes:
```bash
remoteadd_personal <repo-name>  # Adicionar novo remote personal
sync_repos [message]             # Push para múltiplos remotes
```

## Development Environment

Este projeto é desenvolvido em ambiente WSL2 Ubuntu 24.04 com as seguintes ferramentas configuradas:

- Git 2.43.0 com aliases personalizados
- Vim com 17 plugins (ver ~/.config/vimrc)
- Zsh com Oh My Zsh
- Docker Desktop integrado

## Security Notes

O repositório tem 4 vulnerabilidades de dependências detectadas pelo GitHub Dependabot (2 moderadas, 2 baixas). Verificar em:
https://github.com/joaopelegrino/app-controle/security/dependabot
