# Backlog - Itens Pendentes de Infraestrutura

**Data:** 2026-01-24
**Status:** Pendente
**Prioridade:** Média/Baixa

---

## Contexto

Itens identificados durante diagnóstico de ambiente Docker + WSL2.
Sprint 11 está COMPLETO - estes são melhorias de DX (Developer Experience).

---

## Itens Pendentes

### 1. Adicionar seção Docker WSL2 ao CLAUDE.md

**Descrição:** Documentar configuração Docker Desktop + WSL2 no CLAUDE.md

**Conteúdo sugerido:**
```markdown
## Docker + WSL2

### Requisitos
- Docker Desktop instalado no Windows
- WSL2 Integration habilitada (Settings > Resources > WSL Integration)
- Distro WSL ativa na integração

### Verificar Status
docker info | grep "Operating System"
# Deve mostrar: Docker Desktop

### Troubleshooting
Se "Cannot connect to Docker daemon":
1. Verificar Docker Desktop rodando no Windows
2. Verificar integração WSL em Settings > Resources > WSL Integration
3. Reiniciar terminal WSL
```

**Arquivos:** `CLAUDE.md`
**Estimativa:** 15 min

---

### 2. Adicionar verificação Docker ao mise hook

**Descrição:** Hook para verificar se Docker está disponível antes de comandos

**Conteúdo sugerido:**
```bash
# Em .mise/hooks/pre-task.sh
check_docker() {
  if ! docker info &>/dev/null; then
    echo "⚠️  Docker não está rodando"
    echo "   Inicie o Docker Desktop no Windows"
    return 1
  fi
}
```

**Arquivos:** `.mise/hooks/pre-task.sh` (criar se não existir)
**Estimativa:** 10 min

---

### 3. Criar task docker:status no .mise.toml

**Descrição:** Task para verificar status completo do ambiente Docker

**Conteúdo sugerido:**
```toml
[tasks."docker:status"]
description = "Verificar status do ambiente Docker"
run = '''
echo "=== Docker Status ==="
docker info | grep -E "(Server Version|Operating System|CPUs|Memory)"
echo ""
echo "=== Containers ==="
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
'''
```

**Arquivos:** `.mise.toml`
**Estimativa:** 5 min

---

## Resumo

| Item | Prioridade | Estimativa |
|------|------------|------------|
| Seção Docker WSL2 no CLAUDE.md | Média | 15 min |
| Hook verificação Docker | Baixa | 10 min |
| Task docker:status | Baixa | 5 min |

**Total estimado:** ~30 min

---

## Decisão

Estes itens são opcionais e melhoram a experiência de desenvolvimento.
Podem ser implementados quando houver tempo disponível ou antes de
onboarding de novos desenvolvedores.
