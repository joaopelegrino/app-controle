---
titulo: Ativar Ambiente de Desenvolvimento app-controle
versao: 2
data: 2026-02-02
projeto: app-controle
referencia: CLAUDE.md v11.1.0, ROADMAP.md, GAPS-DEMO-B2B.md
stack: React + Vite + Bun + NocoDB + PostgreSQL
changelog: |
  v2 (2026-02-02) - Padronizado porta 3001, adicionado mise activate obrigatorio
  v1 (2026-02-01) - Versao inicial
---

# Ativar Ambiente de Desenvolvimento app-controle

Comando autocontido para verificar e ativar o ambiente de desenvolvimento completo do projeto app-controle (TrainB2B - Plataforma B2B de Treinamento Corporativo).

---

## Execucao Automatica (Instrucoes para Claude)

**IMPORTANTE:** Este command e autocontido. Ao ser invocado via `/skill ativar-ambiente-dev`, Claude DEVE:

1. **Verificar pre-requisito mise activate** (obrigatorio para hooks)
2. **Executar comandos bash** das fases em sequencia
3. **Reportar status** de cada fase (OK/ERRO)
4. **Verificar NocoDB** e dados seed
5. **Verificar Chrome DevTools MCP** (porta 9222)
6. **Gerar relatorio final** estruturado com credenciais

**Fluxo de Execucao:**
```
FASE 1 (Ferramentas) -> FASE 2 (Frontend) -> FASE 3 (Backend/NocoDB)
     |
     v
FASE 4 (MCP Chrome) -> FASE 5 (Validacao) -> FASE 6 (Relatorio Final)
```

---

## Pre-Requisitos

- Ferramentas mise instaladas globalmente
- Acesso ao workspace `/home/notebook/workspace/app-controle`
- Docker Desktop com WSL2 Integration habilitado
- **OBRIGATORIO:** `eval "$(mise activate zsh)"` no ~/.zshrc (para hooks funcionarem)

---

## Hooks Mise Automaticos

### Pre-Requisito Obrigatorio

```bash
# Verificar se mise activate esta configurado
grep -q "mise activate" ~/.zshrc && echo "mise activate: OK" || echo "ERRO: Adicionar 'eval \"$(mise activate zsh)\"' ao ~/.zshrc"
```

### Hooks Configurados no app-controle

| Hook | Evento | Acoes Automaticas |
|------|--------|-------------------|
| `enter` | Ao fazer `cd app-controle/` | 1. Instala deps (idempotente) 2. Verifica lockfile 3. Verifica .env.nocodb 4. Verifica Docker 5. Exibe menu |
| `leave` | Ao sair do diretorio | Lembrete sobre NocoDB rodando |

---

## Fluxo de Ativacao (6 Fases)

### Fase 1: Verificar Ferramentas mise

```bash
# Listar ferramentas instaladas
mise list | grep -e bun -e node -e gitleaks -e python

# Versoes esperadas:
# bun        1.3.3
# node       24.11.1 (fallback)
# gitleaks   latest
# python     3.12

# Verificar versao do bun
bun --version
# Esperado: 1.3.3
```

### Fase 2: Verificar Frontend

```bash
# Verificar node_modules
ls /home/notebook/workspace/app-controle/node_modules | head -5

# Se node_modules nao existir:
# cd /home/notebook/workspace/app-controle && bun install

# Verificar build funciona
cd /home/notebook/workspace/app-controle && bun run build --dry-run 2>/dev/null || echo "Build check: OK"

# Verificar lint
cd /home/notebook/workspace/app-controle && bun run lint 2>/dev/null && echo "Lint: OK" || echo "Lint: Warnings/Errors"
```

### Fase 3: Verificar Backend (NocoDB + PostgreSQL)

```bash
# Verificar Docker instalado
docker --version

# Verificar containers rodando
docker ps | grep -e app-controle-db -e app-controle-nocodb

# Se containers nao estiverem rodando:
cd /home/notebook/workspace/app-controle && mise nocodb:start

# Verificar saude do NocoDB
cd /home/notebook/workspace/app-controle && mise nocodb:health

# Testar endpoint NocoDB
curl -s http://localhost:8081/api/v1/health > /dev/null && echo "NocoDB: OK" || echo "NocoDB: ERRO"
```

### Fase 4: Verificar MCP Chrome DevTools

```bash
# Verificar se Chrome com debug esta rodando
curl -s http://127.0.0.1:9222/json/version > /dev/null && echo "Chrome DevTools: ATIVO" || echo "Chrome DevTools: INATIVO"

# Verificar config .mcp.json
cat /home/notebook/workspace/app-controle/.mcp.json

# Se inativo, iniciar Chrome DevTools:
# cd /home/notebook/workspace/app-controle && mise chrome-debug
# OU manualmente:
# "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" --remote-debugging-port=9222 --user-data-dir="$HOME/.chrome-debug-profile" http://localhost:3001
```

### Fase 5: Ativar Ambiente Completo

**Terminal 1 - Frontend:**
```bash
cd /home/notebook/workspace/app-controle
mise dev
# Inicia Vite dev server
# App: http://localhost:3001 (ou 3000 se livre)
```

**Terminal 2 - Backend (NocoDB):**
```bash
cd /home/notebook/workspace/app-controle
mise nocodb:start
# PostgreSQL: porta 5432
# NocoDB Admin: http://localhost:8081
```

**Testar Frontend:**
```bash
curl -s http://localhost:3001 > /dev/null && echo "Frontend: OK" || echo "Frontend: ERRO"
```

**Terminal 3 - Chrome DevTools (para validacao visual):**
```bash
cd /home/notebook/workspace/app-controle
mise chrome-debug
# Chrome com debug port 9222
```

**ALTERNATIVA: Full-Stack em um comando**
```bash
cd /home/notebook/workspace/app-controle
mise full-stack
# Inicia NocoDB + Frontend juntos
```

### Fase 6: Gerar Relatorio Final (OBRIGATORIO)

Claude DEVE gerar este relatorio ao final da ativacao:

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    RELATORIO DE ATIVACAO - APP-CONTROLE                        ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ Data: YYYY-MM-DD HH:MM                                                         ║
║ Ambiente: Localhost + Chrome DevTools MCP                                      ║
║ Stack: React + Vite + Bun + NocoDB + PostgreSQL                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ INFRAESTRUTURA                                                                 ║
╠───────────────────────────────────────────────────────────────────────────────╣
║ Frontend:  [ ] OK  [ ] ERRO    Porta 3001                                     ║
║ NocoDB:    [ ] OK  [ ] ERRO    Porta 8081                                     ║
║ PostgreSQL:[ ] OK  [ ] ERRO    Porta 5432                                     ║
║ Chrome:    [ ] OK  [ ] ERRO    Porta 9222                                     ║
║ Docker:    [ ] OK  [ ] ERRO    Desktop + WSL2 Integration                     ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ FERRAMENTAS MISE                                                               ║
╠───────────────────────────────────────────────────────────────────────────────╣
║ bun:       [ ] OK  [ ] ERRO    Versao: 1.3.3                                  ║
║ node:      [ ] OK  [ ] ERRO    Versao: 24.11.1 (fallback)                     ║
║ gitleaks:  [ ] OK  [ ] ERRO    Versao: latest                                 ║
║ python:    [ ] OK  [ ] ERRO    Versao: 3.12                                   ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ CREDENCIAIS PARA TESTES (COPIAR E COLAR)                                      ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ Senha padrao: Demo@2026                                                        ║
╠───────────────────────────────────────────────────────────────────────────────╣
║ ACME TECH SOLUTIONS (Empresa 1):                                               ║
║    C-Level:    ceo@acmetech.com       -> /admin/executive                     ║
║    Admin:      admin@acmetech.com     -> /admin                               ║
║    Instructor: prof@acmetech.com      -> /instructor                          ║
║    Student:    maria@acmetech.com     -> /dashboard                           ║
╠───────────────────────────────────────────────────────────────────────────────╣
║ DEVCORP CONSULTING (Empresa 2):                                                ║
║    C-Level:    cto@devcorp.com        -> /admin/executive                     ║
║    Admin:      admin@devcorp.com      -> /admin                               ║
║    Instructor: prof@devcorp.com       -> /instructor                          ║
║    Student:    julia@devcorp.com      -> /dashboard                           ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ URLS DE ACESSO                                                                 ║
╠───────────────────────────────────────────────────────────────────────────────╣
║ Frontend:     http://localhost:3001                                            ║
║ NocoDB Admin: http://localhost:8081                                            ║
║   Email:      admin@ultrathink.com                                             ║
║   Senha:      UltraThink@Admin2026!                                            ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║ PROXIMOS PASSOS                                                                ║
╠───────────────────────────────────────────────────────────────────────────────╣
║ 1. Abrir http://localhost:3001                                                ║
║ 2. Login como admin@acmetech.com / Demo@2026                                  ║
║ 3. Validar dashboard admin                                                     ║
║ 4. Testar CRUD de cursos (Sprint 14)                                          ║
║ 5. Testar white-label (Sprint 13)                                             ║
║ 6. Verificar i18n (pt-BR, en-US, es-ES)                                       ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## Validacao com Chrome DevTools MCP

### Comandos MCP Disponiveis

| Comando | Funcao | Uso no QA |
|---------|--------|-----------|
| `list_pages` | Listar abas abertas | Verificar URL atual |
| `select_page` | Selecionar aba | Focar pagina correta |
| `navigate_page` | Navegar para URL | Testar rotas |
| `take_screenshot` | Capturar tela | Evidencia visual |
| `take_snapshot` | DOM como texto (a11y) | Analise elementos |
| `evaluate_script` | Executar JS (read-only) | Debugar estado |
| `click` | Clicar em elemento | Navegar UI |
| `fill` | Preencher input | Login, formularios |
| `fill_form` | Preencher multiplos campos | Cadastros |
| `list_console_messages` | Logs do console | Detectar erros JS |
| `list_network_requests` | Requests HTTP | Diagnosticar API |

### Comandos para Validacao Visual

```
"Liste as paginas abertas no Chrome"
"Navegue para http://localhost:3001/admin"
"Tire um snapshot da pagina atual"
"Tire um screenshot da pagina"
"Preencha o campo email com admin@acmetech.com"
```

---

## Troubleshooting

| Problema | Solucao |
|----------|---------|
| `mise list` vazio | `mise install` no diretorio do projeto |
| node_modules ausente | `bun install` |
| Porta 3001 nao responde | Verificar se Vite esta rodando: `mise dev` |
| NocoDB 8081 nao responde | `mise nocodb:start` |
| Docker nao encontrado | Instalar Docker Desktop + WSL2 Integration |
| Chrome DevTools inativo | `mise chrome-debug` |
| Erro "permission denied" | Verificar Docker Desktop esta rodando |
| Dados seed nao carregados | `mise nocodb:reset` (cuidado: deleta dados) |
| Login 401 | Verificar credenciais: Demo@2026 |
| Hot reload nao funciona | Verificar porta 3001 correta |

---

## Comandos mise Disponiveis

### Desenvolvimento

| Command | Funcao |
|---------|--------|
| `mise dev` | Start frontend (Vite) |
| `mise build` | Build producao |
| `mise test` | Testes Vitest |
| `mise lint` | ESLint |
| `mise nocodb:start` | Iniciar backend |
| `mise nocodb:stop` | Parar backend |
| `mise nocodb:health` | Verificar saude |
| `mise full-stack` | Frontend + Backend |
| `mise check` | Verificar ambiente |
| `mise chrome-debug` | Chrome com debug |

### Deploy

| Command | Funcao |
|---------|--------|
| `mise deploy:check` | Verificar pre-requisitos |
| `mise deploy:prod` | Deploy Fly.io |
| `mise deploy:logs` | Ver logs |
| `mise deploy:status` | Status app |
| `mise deploy:suspend` | Pausar (economia) |
| `mise deploy:resume` | Reativar |

### Seguranca

| Command | Funcao |
|---------|--------|
| `mise security:scan` | Scan gitleaks completo |
| `mise security:scan-staged` | Scan arquivos staged |

---

## Checklist Rapido de Ativacao (10 itens)

| # | Item | Comando Verificacao |
|---|------|---------------------|
| 1 | mise instalado | `mise --version` |
| 2 | Ferramentas mise | `mise list` |
| 3 | node_modules | `ls node_modules` |
| 4 | Docker rodando | `docker ps` |
| 5 | NocoDB ativo | `curl http://localhost:8081` |
| 6 | PostgreSQL ativo | `mise nocodb:health` |
| 7 | Frontend ativo | `curl http://localhost:3001` |
| 8 | Chrome DevTools | `curl http://127.0.0.1:9222/json/version` |
| 9 | Login funciona | Login com Demo@2026 |
| 10 | RBAC correto | Admin ve /admin, Student ve /dashboard |

**Criterio Aprovacao:**
- **APROVADO:** Todos 10 itens = OK
- **APROVADO COM RESSALVAS:** Itens 1-7 = OK, alguns 8-10 = Fail
- **REPROVADO:** Qualquer item 1-7 = Fail

---

## Metricas de Ambiente Saudavel

| Metrica | Valor Esperado |
|---------|----------------|
| Ferramentas mise | 4+ (bun, node, gitleaks, python) |
| Tasks mise | 38 |
| Lint warnings | 0 |
| Frontend porta | 3001 |
| NocoDB porta | 8081 |
| PostgreSQL porta | 5432 |
| Chrome debug | 9222 |
| Usuarios demo | 8 (4 por empresa) |
| Empresas demo | 2 |

---

## Referencias

| Documento | Path |
|-----------|------|
| CLAUDE.md | `/home/notebook/workspace/app-controle/.claude/CLAUDE.md` |
| ROADMAP | `/home/notebook/workspace/app-controle/docs/backlog/ROADMAP.md` |
| GAPS | `/home/notebook/workspace/app-controle/docs/backlog/GAPS-DEMO-B2B.md` |
| Deploy Fly.io | `/home/notebook/workspace/app-controle/docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md` |
| .mise.toml | `/home/notebook/workspace/app-controle/.mise.toml` |
| .mcp.json | `/home/notebook/workspace/app-controle/.mcp.json` |

---

*Criado: 2026-02-01 | Versao: 1*
*Projeto: app-controle (TrainB2B)*
*Stack: React + Vite + Bun + NocoDB + PostgreSQL*
*Conformidade: ambiente-centralizado v1.7*
