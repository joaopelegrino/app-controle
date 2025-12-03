---
Tipo: Contexto Variável
Nome: servidor_local_comandos
Função: Referência executável para gerenciar servidor de desenvolvimento Vite
Frequência: Sempre que precisar ligar, matar, reiniciar ou verificar servidor local
Instruções de Atualização:
  1) Verificar se porta ou processo mudou
  2) Atualizar comandos se stack mudar (ex: Vite → Webpack)
  3) Adicionar novos cenários conforme surgem
Versão: v1
Data: 2025-12-03
Projeto: ultrathink (Plataforma de Aprendizado)
---

# <servidor_local_comandos_v1>

## O que é este documento?

Referência executável para gerenciar o servidor de desenvolvimento local.
Formato FII (Formato Instrutivo Interativo) - cada comando é explicado e executável.

### Stack do Servidor

```
┌─────────────────────────────────────────────────────────────────┐
│  Vite 5.4.19 → HMR → React 18.3 → localhost:3000               │
│      │          │         │              │                      │
│      │          │         │              └── Porta fixa         │
│      │          │         └── Framework                         │
│      │          └── Hot Module Replacement                      │
│      └── Build tool (startup < 200ms)                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## MAPA DO DOCUMENTO

```
├── VERIFICAR STATUS (Linha 50)
├── LIGAR SERVIDOR (Linha 90)
├── MATAR SERVIDOR (Linha 140)
├── REINICIAR LIMPO (Linha 190)
├── TROUBLESHOOTING (Linha 250)
├── REFERÊNCIA RÁPIDA (Linha 300)
└── MISE TASKS (Linha 340)
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
LISTEN  0  511  *:3000  *:*  users:(("node",pid=12345,fd=19))
```

**Saída esperada (servidor parado):**
```
(vazio - sem output)
```

### COMANDO 1B: Verificar processos Vite/Node

```bash
# Lista todos processos node/vite
ps aux | grep -E "(vite|node)" | grep -v grep
```

### COMANDO 1C: Verificar via curl

```bash
# Testa se servidor responde
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Retorna: 200 (OK) ou 000 (offline)
```

### EXERCÍCIO 1:
Por que usamos `ss -tlnp` ao invés de `netstat -tlnp`?

**Resposta:** `ss` é mais moderno, rápido e vem instalado por padrão em distros recentes.
`netstat` requer pacote `net-tools` (deprecated).

---

## ═══════════════════════════════════════════════════════════════════
## CONCEITO 2: LIGAR SERVIDOR
## ═══════════════════════════════════════════════════════════════════

### ┌─────────────────────────────────────────────────────────────────┐
### │ O QUE É?                                                        │
### └─────────────────────────────────────────────────────────────────┘

Iniciar o servidor de desenvolvimento Vite.
Startup típico: < 200ms. Porta fixa: 3000 (strictPort no vite.config.js).

### COMANDO 2A: Ligar em foreground (terminal ocupado)

```bash
npm run dev
```

**Quando usar:** Debugging, ver logs em tempo real.

### COMANDO 2B: Ligar em background (terminal livre)

```bash
npm run dev &
# ou
nohup npm run dev > /dev/null 2>&1 &
```

**Quando usar:** Continuar trabalhando no mesmo terminal.

### COMANDO 2C: Ligar via mise (recomendado)

```bash
mise run dev
```

**Quando usar:** Consistência entre desenvolvedores (configurado no .mise.toml).

### VARIAÇÃO: Ligar com porta diferente

```bash
npm run dev -- --port 3001
```

### EXERCÍCIO 2:
O que acontece se a porta 3000 já estiver ocupada e `strictPort: true` no config?

**Resposta:** Vite falha com erro ao invés de tentar próxima porta.
Isso é intencional para evitar confusão com múltiplas instâncias.

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

### COMANDO 3B: Matar por porta

```bash
# Encontra PID e mata
kill $(lsof -t -i:3000)

# Ou em uma linha com verificação
lsof -t -i:3000 | xargs -r kill
```

**Quando usar:** Quando há múltiplos processos node e quer matar só o da porta 3000.

### COMANDO 3C: Matar forçado (SIGKILL)

```bash
pkill -9 -f "vite"
# ou
kill -9 $(lsof -t -i:3000)
```

**Quando usar:** Processo não responde ao kill normal. Último recurso.

### COMANDO 3D: Matar todos processos node

```bash
pkill -f "node"
```

**⚠️ CUIDADO:** Mata TODOS processos node, incluindo outros projetos!

### EXERCÍCIO 3:
Qual a diferença entre `kill` (SIGTERM) e `kill -9` (SIGKILL)?

**Resposta:**
- SIGTERM (15): Pede ao processo para terminar graciosamente (cleanup).
- SIGKILL (9): Força término imediato (sem cleanup, pode deixar arquivos temp).
Sempre tente SIGTERM primeiro.

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
pkill -f "vite" && npm run dev
```

### COMANDO 4B: Reinício com limpeza de cache (recomendado)

```bash
pkill -f "vite" 2>/dev/null
rm -rf node_modules/.vite dist
npm run dev
```

### COMANDO 4C: Reinício completo (cache + build)

```bash
pkill -f "vite" 2>/dev/null
rm -rf node_modules/.vite dist
npm run build && npm run dev
```

### COMANDO 4D: Reinício nuclear (tudo do zero)

```bash
pkill -f "vite" 2>/dev/null
rm -rf node_modules/.vite dist node_modules
npm install && npm run dev
```

**⚠️ Demora:** ~30-60 segundos pelo npm install.

### EXERCÍCIO 4:
Quando você usaria o "reinício nuclear" (4D)?

**Resposta:**
- Após atualizar package.json
- Após trocar de branch com dependências diferentes
- Quando erros persistem após limpeza de cache
- Após atualização major do Node.js

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
npm run dev
```

### Problema: "Cannot find module X"

```bash
# Reinstalar dependências
rm -rf node_modules
npm install
npm run dev
```

### Problema: Mudanças não aparecem (HMR quebrado)

```bash
# Limpar cache Vite
rm -rf node_modules/.vite
npm run dev
```

### Problema: Servidor inicia mas página branca

```bash
# 1. Verificar console do navegador (F12)
# 2. Build para ver erros
npm run build

# 3. Se build OK, limpar cache browser
# Ctrl+Shift+R (hard refresh)
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
│ Ligar              │ npm run dev                                 │
│ Ligar (background) │ npm run dev &                               │
│ Ligar (mise)       │ mise run dev                                │
│ Matar              │ pkill -f "vite"                             │
│ Matar (porta)      │ kill $(lsof -t -i:3000)                     │
│ Reiniciar          │ pkill -f "vite" && npm run dev              │
│ Reiniciar limpo    │ pkill -f "vite"; rm -rf node_modules/.vite; │
│                    │ npm run dev                                 │
│ Build produção     │ npm run build                               │
│ Preview build      │ npm run preview                             │
└────────────────────┴─────────────────────────────────────────────┘
```

---

## ═══════════════════════════════════════════════════════════════════
## MISE TASKS (Alternativa)
## ═══════════════════════════════════════════════════════════════════

O projeto tem tarefas configuradas em `.mise.toml`:

```bash
mise run dev           # Inicia servidor
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
rm -rf node_modules/.vite && npm run dev

# 4. Abrir no navegador
# http://localhost:3000

# 5. Ao terminar (opcional - deixar rodando)
pkill -f "vite"
```

---

## PRÓXIMO PASSO

Agora que você sabe gerenciar o servidor, consulte:
- `docs/ESTRUTURA-PLATAFORMA-MVP.md` - Estrutura visual da plataforma
- `docs/backlog/ROADMAP.md` - Próximas features a implementar

---

*Documento no formato FII (Formato Instrutivo Interativo) | ultrathink MVP v1 | 2025-12-03*

</servidor_local_comandos_v1>
