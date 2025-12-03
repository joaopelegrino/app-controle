---
Tipo: Contexto Variável
Nome: servidor_local_comandos
Função: Referência executável para gerenciar servidor de desenvolvimento Vite com Bun
Frequência: Sempre que precisar ligar, matar, reiniciar ou verificar servidor local
Instruções de Atualização:
  1) Verificar se porta ou processo mudou
  2) Atualizar comandos se stack mudar
  3) Adicionar novos cenários conforme surgem
Versão: v2
Data: 2025-12-03
Projeto: ultrathink (Plataforma de Aprendizado)
Runtime: Bun 1.3.3 (Anthropic) via mise
---

# <servidor_local_comandos_v2>

## O que é este documento?

Referência executável para gerenciar o servidor de desenvolvimento local.
Formato FII (Formato Instrutivo Interativo) - cada comando é explicado e executável.

### Stack do Servidor

```
┌─────────────────────────────────────────────────────────────────┐
│  Bun 1.3.3 → Vite 5.4 → HMR → React 18.3 → localhost:3000      │
│      │          │        │         │              │             │
│      │          │        │         │              └── Porta     │
│      │          │        │         └── Framework                │
│      │          │        └── Hot Module Replacement             │
│      │          └── Build tool (startup < 200ms)                │
│      └── Runtime (35x mais rápido que npm - Anthropic)          │
└─────────────────────────────────────────────────────────────────┘
```

**Por que Bun?**
- Anthropic adquiriu Bun em Dez 2025
- Install: 1.3s vs 45s (npm) para 381 pacotes
- Runtime + Package Manager + Bundler + Test Runner
- 100% compatível com npm/package.json

---

## MAPA DO DOCUMENTO

```
├── VERIFICAR STATUS (Linha 60)
├── LIGAR SERVIDOR (Linha 100)
├── MATAR SERVIDOR (Linha 150)
├── REINICIAR LIMPO (Linha 200)
├── TROUBLESHOOTING (Linha 260)
├── REFERÊNCIA RÁPIDA (Linha 310)
└── MISE TASKS (Linha 350)
```

---

## ═══════════════════════════════════════════════════════════════════
## CONCEITO 1: VERIFICAR STATUS
## ═══════════════════════════════════════════════════════════════════

### ┌─────────────────────────────────────────────────────────────────┐
### │ O QUE É?                                                        │
### └─────────────────────────────────────────────────────────────────┘

Verificar se o servidor está rodando e em qual porta.
Útil antes de ligar (evita conflito) ou para diagnosticar problemas.

### COMANDO 1A: Verificar porta 3000

```bash
# Mostra processo usando porta 3000
ss -tlnp | grep 3000
```

**Saída esperada (servidor rodando):**
```
LISTEN  0  511  *:3000  *:*  users:(("bun",pid=12345,fd=19))
```

**Saída esperada (servidor parado):**
```
(vazio - sem output)
```

### COMANDO 1B: Verificar processos Vite/Bun

```bash
# Lista todos processos bun/vite
ps aux | grep -E "(vite|bun)" | grep -v grep
```

### COMANDO 1C: Verificar via curl

```bash
# Testa se servidor responde
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Retorna: 200 (OK) ou 000 (offline)
```

### EXERCÍCIO 1:
Por que o processo agora aparece como "bun" ao invés de "node"?

**Resposta:** Bun é um runtime JavaScript completo que substitui Node.js.
Quando você roda `bun run dev`, o Bun executa diretamente sem Node.js intermediário.

---

## ═══════════════════════════════════════════════════════════════════
## CONCEITO 2: LIGAR SERVIDOR
## ═══════════════════════════════════════════════════════════════════

### ┌─────────────────────────────────────────────────────────────────┐
### │ O QUE É?                                                        │
### └─────────────────────────────────────────────────────────────────┘

Iniciar o servidor de desenvolvimento Vite via Bun.
Startup típico: < 200ms. Porta fixa: 3000 (strictPort no vite.config.js).

### COMANDO 2A: Ligar com Bun (RECOMENDADO)

```bash
bun run dev
```

**Quando usar:** Padrão para desenvolvimento. Mais rápido que npm.

### COMANDO 2B: Ligar em background (terminal livre)

```bash
bun run dev &
# ou
nohup bun run dev > /dev/null 2>&1 &
```

**Quando usar:** Continuar trabalhando no mesmo terminal.

### COMANDO 2C: Ligar via mise

```bash
mise run dev
```

**Quando usar:** Consistência entre projetos (configurado no .mise.toml).

### VARIAÇÃO: Ligar com porta diferente

```bash
bun run dev -- --port 3001
```

### EXERCÍCIO 2:
Qual a diferença entre `bun run dev` e `bun dev`?

**Resposta:**
- `bun run dev` → Executa script "dev" do package.json (padrão)
- `bun dev` → Tenta executar arquivo "dev" diretamente (não funciona aqui)
Sempre use `bun run` para scripts do package.json.

---

## ═══════════════════════════════════════════════════════════════════
## CONCEITO 3: MATAR SERVIDOR
## ═══════════════════════════════════════════════════════════════════

### ┌─────────────────────────────────────────────────────────────────┐
### │ O QUE É?                                                        │
### └─────────────────────────────────────────────────────────────────┘

Parar o servidor de desenvolvimento. Necessário antes de reiniciar
ou quando a porta fica "presa" por processo zumbi.

### COMANDO 3A: Matar por nome (vite)

```bash
pkill -f "vite"
```

**Quando usar:** Forma mais direta, mata todos processos vite.

### COMANDO 3B: Matar por nome (bun)

```bash
pkill -f "bun"
```

**⚠️ CUIDADO:** Mata TODOS processos bun, incluindo outros projetos!

### COMANDO 3C: Matar por porta (mais seguro)

```bash
# Encontra PID e mata
kill $(lsof -t -i:3000)

# Ou em uma linha com verificação
lsof -t -i:3000 | xargs -r kill
```

**Quando usar:** Quando há múltiplos processos e quer matar só o da porta 3000.

### COMANDO 3D: Matar forçado (SIGKILL)

```bash
pkill -9 -f "vite"
# ou
kill -9 $(lsof -t -i:3000)
```

**Quando usar:** Processo não responde ao kill normal. Último recurso.

### EXERCÍCIO 3:
Por que matar por porta (3C) é mais seguro que matar por nome (3B)?

**Resposta:** Matar por porta afeta apenas o processo específico que está
usando a porta 3000. Matar por nome "bun" pode afetar outros projetos Bun
rodando em outras portas ou processos Bun de build/test.

---

## ═══════════════════════════════════════════════════════════════════
## CONCEITO 4: REINICIAR LIMPO
## ═══════════════════════════════════════════════════════════════════

### ┌─────────────────────────────────────────────────────────────────┐
### │ O QUE É?                                                        │
### └─────────────────────────────────────────────────────────────────┘

Reiniciar servidor limpando cache para garantir estado consistente.
Essencial após trocar de branch ou quando há comportamentos estranhos.

### COMANDO 4A: Reinício básico

```bash
pkill -f "vite" && bun run dev
```

### COMANDO 4B: Reinício com limpeza de cache (recomendado)

```bash
pkill -f "vite" 2>/dev/null
rm -rf node_modules/.vite dist
bun run dev
```

### COMANDO 4C: Reinício completo (cache + build)

```bash
pkill -f "vite" 2>/dev/null
rm -rf node_modules/.vite dist
bun run build && bun run dev
```

### COMANDO 4D: Reinício nuclear (tudo do zero)

```bash
pkill -f "vite" 2>/dev/null
rm -rf node_modules/.vite dist node_modules bun.lockb
bun install && bun run dev
```

**⚡ Demora:** ~2-3 segundos com Bun (vs 30-60s com npm)!

### EXERCÍCIO 4:
Por que o "reinício nuclear" com Bun demora apenas 2-3 segundos?

**Resposta:** Bun instala 381 pacotes em ~1.3 segundos (35x mais rápido que npm).
Isso torna o "nuclear" uma opção viável mesmo para uso frequente.

---

## ═══════════════════════════════════════════════════════════════════
## TROUBLESHOOTING
## ═══════════════════════════════════════════════════════════════════

### Problema: "Port 3000 is already in use"

```bash
# 1. Identificar processo
lsof -i:3000

# 2. Matar processo
kill $(lsof -t -i:3000)

# 3. Tentar novamente
bun run dev
```

### Problema: "Cannot find module X"

```bash
# Reinstalar dependências (super rápido com Bun!)
rm -rf node_modules
bun install
bun run dev
```

### Problema: Mudanças não aparecem (HMR quebrado)

```bash
# Limpar cache Vite
rm -rf node_modules/.vite
bun run dev
```

### Problema: Servidor inicia mas página branca

```bash
# 1. Verificar console do navegador (F12)
# 2. Build para ver erros
bun run build

# 3. Se build OK, limpar cache browser
# Ctrl+Shift+R (hard refresh)
```

### Problema: bun não encontrado

```bash
# Verificar se mise ativou bun
mise current

# Se bun não aparece, ativar
eval "$(mise activate zsh)"

# Ou usar caminho direto
~/.local/share/mise/installs/bun/1.3.3/bin/bun run dev
```

---

## ═══════════════════════════════════════════════════════════════════
## REFERÊNCIA RÁPIDA
## ═══════════════════════════════════════════════════════════════════

```
┌────────────────────┬─────────────────────────────────────────────┐
│ Ação               │ Comando                                     │
├────────────────────┼─────────────────────────────────────────────┤
│ Verificar porta    │ ss -tlnp | grep 3000                        │
│ Ligar              │ bun run dev                                 │
│ Ligar (background) │ bun run dev &                               │
│ Ligar (mise)       │ mise run dev                                │
│ Matar              │ pkill -f "vite"                             │
│ Matar (porta)      │ kill $(lsof -t -i:3000)                     │
│ Reiniciar          │ pkill -f "vite" && bun run dev              │
│ Reiniciar limpo    │ pkill -f "vite"; rm -rf node_modules/.vite; │
│                    │ bun run dev                                 │
│ Build produção     │ bun run build                               │
│ Preview build      │ bun run preview                             │
│ Instalar deps      │ bun install                                 │
│ Adicionar pacote   │ bun add pacote                              │
└────────────────────┴─────────────────────────────────────────────┘
```

---

## ═══════════════════════════════════════════════════════════════════
## MISE TASKS (Alternativa)
## ═══════════════════════════════════════════════════════════════════

O projeto tem tarefas configuradas em `.mise.toml`:

```bash
mise run dev           # Inicia servidor (via bun)
mise run build         # Build produção
mise run test          # Executa testes
mise run lint          # Verifica código
mise run preview       # Preview do build
mise run chrome-debug  # Chrome com DevTools remoto
```

**Vantagem:** Comandos padronizados, funcionam em qualquer máquina com mise.

---

## ═══════════════════════════════════════════════════════════════════
## FLUXO TÍPICO DE TRABALHO
## ═══════════════════════════════════════════════════════════════════

```bash
# 1. Verificar se já está rodando
ss -tlnp | grep 3000

# 2. Se sim, matar
pkill -f "vite"

# 3. Ligar limpo
rm -rf node_modules/.vite && bun run dev

# 4. Abrir no navegador
# http://localhost:3000

# 5. Ao terminar (opcional - deixar rodando)
pkill -f "vite"
```

---

## ═══════════════════════════════════════════════════════════════════
## COMPARAÇÃO BUN vs NPM
## ═══════════════════════════════════════════════════════════════════

```
┌─────────────────────┬─────────────────┬─────────────────┬───────────┐
│ Operação            │ npm             │ bun             │ Ganho     │
├─────────────────────┼─────────────────┼─────────────────┼───────────┤
│ Install (381 pkgs)  │ ~45s            │ 1.3s            │ 35x ⚡    │
│ Dev server startup  │ 190ms           │ 207ms           │ ~igual    │
│ Build produção      │ 5.6s            │ 5.7s            │ ~igual    │
│ Reinício nuclear    │ ~60s            │ ~3s             │ 20x ⚡    │
└─────────────────────┴─────────────────┴─────────────────┴───────────┘
```

---

## PRÓXIMO PASSO

Agora que você sabe gerenciar o servidor, consulte:
- `docs/ESTRUTURA-PLATAFORMA-MVP.md` - Estrutura visual da plataforma
- `docs/backlog/ROADMAP.md` - Próximas features a implementar
- `~/.claude/skills/ambiente/mise/SKILL.md` - Documentação completa do mise/bun

---

*Documento no formato FII (Formato Instrutivo Interativo) | ultrathink MVP v1 | 2025-12-03*
*Runtime: Bun 1.3.3 (Anthropic) via mise*

</servidor_local_comandos_v2>
