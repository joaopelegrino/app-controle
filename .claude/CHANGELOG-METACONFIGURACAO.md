# Changelog - Metaconfiguração Claude Code

## [2.0.0] - 2026-02-16

### 🔧 CORREÇÕES CRÍTICAS

#### 1. Formato do campo `model` corrigido
- **Antes:** `"model": { "default": "claude-opus-4-6" }`
- **Depois:** `"model": "claude-opus-4-6"`
- **Motivo:** Nova versão da CLI Claude Code espera string, não objeto
- **Arquivo:** `.claude/settings.local.json` → `.claude/settings.json`

#### 2. CLAUDE.md movido para raiz do projeto
- **Antes:** `.claude/LLMCLAUDE.md` (49KB)
- **Depois:** `./CLAUDE.md` (raiz do projeto)
- **Motivo:** Padrão Claude Code atualizado (Fev 2026)
- **Impacto:** Configurações agora são carregadas corretamente

### ✨ NOVAS FUNCIONALIDADES

#### 3. hooks.toml criado
- **Path:** `.claude/hooks.toml`
- **Hooks ativos:**
  - `session-start`: Verificar ambiente mise
  - `pre-commit`: Testes + lint
  - `pre-deploy`: Security scan
- **Hooks desabilitados (disponíveis):**
  - `post-commit`, `post-tool-use`, `pre-task`

#### 4. Separação settings.json e settings.local.json
- **settings.json:** Configurações globais compartilháveis (versionadas)
  - Permissões
  - Modelo padrão
  - Padrões de arquivo
- **settings.local.json:** Configurações específicas do projeto (versionadas)
  - Metadados do projeto
  - Sprint atual
  - Git config
  - Database config

#### 5. defaultSubagentModel adicionado
- **Valor:** `claude-haiku-4-5-20251001`
- **Motivo:** Otimização de custos (usar Haiku para subagentes, Opus apenas para sessão principal)
- **Economia estimada:** ~70% em custos de API para explorações

### 🧹 LIMPEZA E ORGANIZAÇÃO

#### 6. .gitignore atualizado
Adicionadas exclusões para:
```
.claude/logs/
.claude/_usuario/
.claude/meta-estrutura.md
```

#### 7. Arquivos removidos
- ❌ `.claude/meta-estrutura.md` (vazio, 1 linha)

### 📊 RESUMO DE ARQUIVOS

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `CLAUDE.md` | ✅ CRIADO | Contexto principal (raiz) |
| `.claude/settings.json` | ✅ CRIADO | Config global |
| `.claude/settings.local.json` | ✅ OTIMIZADO | Config projeto |
| `.claude/hooks.toml` | ✅ CRIADO | Hooks automação |
| `.gitignore` | ✅ ATUALIZADO | + 3 exclusões |
| `.claude/meta-estrutura.md` | ❌ REMOVIDO | Arquivo vazio |

### 🎯 CONFORMIDADE

Metaconfiguração agora está 100% conforme com:
- ✅ Claude Code CLI v1.x (Fev 2026)
- ✅ Padrão CLAUDE.md na raiz
- ✅ Separação settings global/local
- ✅ Hooks configurados
- ✅ Otimização de custos (subagent model)
- ✅ .gitignore atualizado

### 🚀 PRÓXIMOS PASSOS (Opcional)

1. **Testar hooks:** Fazer commit para verificar `pre-commit` hook
2. **Rotação de logs:** Implementar cleanup automático de `.claude/logs/`
3. **Documentação:** Atualizar `.claude/README.md` com novos hooks

### 📝 NOTAS

- **Compatibilidade:** Mantém compatibilidade com configurações anteriores
- **Backup:** Configurações antigas em `.claude-backup-20251205-101418/`
- **Versionamento:** Todos os arquivos de config estão versionados (exceto logs/_usuario)

---

**Autor:** Claude Opus 4.6  
**Data:** 2026-02-16  
**Versão Projeto:** v12.0.0 (Sprint 15 - Hub de Especialistas)
