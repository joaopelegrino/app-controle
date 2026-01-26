# Auditoria de Configuração .factory/ - Sincronização com Ambiente Centralizado

**Data:** 2026-01-20  
**Objetivo:** Identificar inconsistências e necessidades de atualização após implementação de ambiente centralizado com mise  
**Escopo:** Todos os arquivos em `.factory/`

---

## 📊 Resumo Executivo

### Status Geral: 🟡 **BOM COM MELHORIAS NECESSÁRIAS**

Após a implementação do **dev-environment-specialist** e práticas de ambiente centralizado, foram identificadas **5 inconsistências críticas** e **8 melhorias recomendadas** nos arquivos existentes da `.factory/`.

---

## 🔴 Problemas Críticos Identificados

### 1. settings.json - bun.lock Incorretamente Ignorado

**Arquivo:** `.factory/settings.json`  
**Linha:** `"fileIgnorePatterns": [..., "bun.lock"]`

**Problema:**
```json
"fileIgnorePatterns": [
  "node_modules/**",
  "dist/**",
  "coverage/**",
  ".git/**",
  "*.log",
  "*.lock",     // ❌ ERRADO - ignora TODOS os locks
  "bun.lock"    // ❌ DUPLICADO e ERRADO
]
```

**Por que é crítico:**
- `bun.lock` **DEVE** ser versionado no git (equivalente ao package-lock.json)
- Ignorar bun.lock quebra reprodutibilidade de dependências
- Contradiz boas práticas de ambiente centralizado

**Impacto:**
- ⚠️ Builds não reproduzíveis entre máquinas
- ⚠️ Versões de dependências podem divergir
- ⚠️ Conflitos de versões não detectados

**Correção:**
```json
"fileIgnorePatterns": [
  "node_modules/**",
  "dist/**",
  "coverage/**",
  ".git/**",
  "*.log"
  // REMOVER: "*.lock" e "bun.lock"
]
```

---

### 2. AGENTS.md - Faltam Diretrizes de mise

**Arquivo:** `.factory/AGENTS.md`

**Problema:**
- Não menciona mise como gerenciador de ambiente
- Comandos ainda são "bun run X" sem alternativa "mise run X"
- Falta seção "Environment Management"

**Impacto:**
- ⚠️ Desenvolvedores não sabem sobre mise
- ⚠️ Inconsistência entre documentação e práticas
- ⚠️ Onboarding incompleto

**Correção Necessária:**
Adicionar seção:
```markdown
## Environment Management (mise)

### Setup Automático

O projeto usa **mise** para gerenciamento de ambiente:
- Versões de ferramentas definidas em `.mise.toml` (SSOT)
- Hooks automáticos ao entrar no projeto
- Tasks integradas para workflows comuns

### Comandos com mise

**Opção 1: Via mise (recomendado se mise configurado)**
```bash
mise run dev              # Dev server
mise run test             # Testes
mise run security         # Security scan
mise run help             # Ver todos os comandos
```

**Opção 2: Direto com bun (sempre funciona)**
```bash
bun run dev
bun run test
```

### Setup Inicial

Se mise estiver configurado (`.mise.toml` existe):
```bash
# 1. Instalar mise (uma vez)
curl https://mise.jdx.dev/install.sh | sh

# 2. Ativar no shell (uma vez)
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

# 3. Entrar no projeto
cd app-controle
# → Hooks executam automaticamente
```

Consulte: `documentacao-interna/05-workflows/setup-ambiente-mise.md`
```

---

## 🟡 Melhorias Recomendadas

### 3. factory-config-specialist - Adicionar Check de mise

**Arquivo:** `.factory/droids/factory-config-specialist.md`

**Melhoria:**
Adicionar ao checklist de diagnóstico:

```markdown
### mise Configuration (if implemented)
- [ ] .mise.toml exists and is valid
- [ ] Tools versions are appropriate
- [ ] Hooks are configured
- [ ] Tasks cover common workflows
- [ ] Security tools included (trivy, gitleaks)
```

E ao analysis response format:

```markdown
## mise Configuration
- [Status of .mise.toml]
- [Configured tools]
- [Suggestions for improvement]
```

---

### 4. code-reviewer - Adicionar Check de mise.toml

**Arquivo:** `.factory/droids/code-reviewer.md`

**Melhoria:**
Adicionar ao checklist:

```markdown
### 7. Environment Configuration (if applicable)
- mise.toml updated if dependencies changed?
- Tool versions appropriate?
- New tasks documented?
```

---

### 5. Commands - Sugerir mise run Como Alternativa

**Arquivos:** 
- `.factory/commands/quick-audit.md`
- `.factory/commands/full-coverage.md`
- `.factory/commands/pr-ready.md`

**Melhoria:**
Adicionar seção em cada comando:

```markdown
## With mise (if configured)

If you have mise configured, you can use:

```bash
mise run security      # Runs complete security scan
# or individual checks
mise run lint
mise run test
```

See `.mise.toml` for all available tasks.
```

---

### 6. settings.json - Adicionar mise aos allowedCommands

**Arquivo:** `.factory/settings.json`

**Melhoria:**
```json
"allowedCommands": [
  "bun",
  "mise",      // ⭐ ADICIONAR
  "git",
  "grep",
  // ...
]
```

**Justificativa:**
Se mise for implementado, Factory Droid precisa poder executar comandos mise.

---

### 7. README.md - Atualizar Lista de Droids

**Arquivo:** `.factory/README.md`

**Status:** ✅ Já está correto!

O README já lista corretamente os 6 droids:
```markdown
Five specialized droids are available:

#### e) docs-engineer ⭐ NEW!
```

**Nota:** Mas falta adicionar o **dev-environment-specialist** na seção "### 2. Custom Droids (Subagents)"

**Correção:**
Adicionar:
```markdown
#### f) dev-environment-specialist ⭐ NEW!
**Purpose:** Setup and maintain development environment with mise  
**Usage:**
```
"Use dev-environment-specialist to setup mise for this project"
"Validate environment and fix any issues"
"Add new task to .mise.toml"
```
```

---

### 8. AGENTS.md - Adicionar .mise.toml aos Key Files

**Arquivo:** `.factory/AGENTS.md`

**Melhoria:**
Na seção "Key Files to Read Before Editing", adicionar:

```markdown
**Key Files to Read Before Editing:**
1. `docs/backlog/ROADMAP.md` - Current sprint status and planning
2. `src/data/studyAreas.js` - Active courses
3. `CLAUDE.md` - Detailed coding guidelines
4. `.mise.toml` - Environment configuration (if exists) ⭐ NEW
```

---

### 9. QUICKSTART.md - Adicionar Seção de mise

**Arquivo:** `.factory/QUICKSTART.md`

**Melhoria:**
Adicionar seção:

```markdown
## 🔧 Environment Setup (Optional - mise)

If `.mise.toml` exists in the project:

```bash
# One-time setup
curl https://mise.jdx.dev/install.sh | sh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

# Enter project (hooks execute automatically)
cd app-controle

# Use mise tasks
mise run help
```

See: `documentacao-interna/05-workflows/setup-ambiente-mise.md`
```

---

### 10. FINAL-REPORT.md e INSTALLATION-COMPLETE.md - Atualizar Contagem

**Arquivos:** 
- `.factory/FINAL-REPORT.md`
- `.factory/INSTALLATION-COMPLETE.md`

**Melhoria:**
Atualizar de "5 droids" para "6 droids":

```markdown
**Droids Disponíveis:** 6 (incluindo dev-environment-specialist)
```

---

## 📋 Checklist de Implementação

### Prioridade CRÍTICA (Fazer Agora)

- [ ] **1. Corrigir settings.json**
  - Remover `"*.lock"` de fileIgnorePatterns
  - Remover `"bun.lock"` de fileIgnorePatterns
  - Commit bun.lock se não estiver no repo

- [ ] **2. Adicionar mise aos allowedCommands**
  - Adicionar `"mise"` ao array allowedCommands em settings.json

### Prioridade ALTA (Esta Semana)

- [ ] **3. Atualizar AGENTS.md**
  - Adicionar seção "Environment Management (mise)"
  - Adicionar .mise.toml aos Key Files
  - Documentar comandos mise run

- [ ] **4. Atualizar README.md**
  - Adicionar dev-environment-specialist à lista de droids
  - Atualizar contagem para 6 droids

### Prioridade MÉDIA (Próximas 2 Semanas)

- [ ] **5. Melhorar factory-config-specialist**
  - Adicionar check de .mise.toml ao diagnostic checklist
  - Adicionar análise de mise configuration

- [ ] **6. Melhorar code-reviewer**
  - Adicionar check de mise.toml ao review checklist

- [ ] **7. Atualizar Commands**
  - Adicionar seção "With mise" em quick-audit.md
  - Adicionar seção "With mise" em full-coverage.md
  - Adicionar seção "With mise" em pr-ready.md

### Prioridade BAIXA (Quando Houver Tempo)

- [ ] **8. Atualizar QUICKSTART.md**
  - Adicionar seção opcional sobre mise setup

- [ ] **9. Atualizar Relatórios**
  - Atualizar contagens em FINAL-REPORT.md
  - Atualizar contagens em INSTALLATION-COMPLETE.md

---

## 🔧 Comandos para Executar

### 1. Corrigir settings.json

```bash
# Editar settings.json manualmente
# Remover linhas problemáticas

# Verificar se bun.lock está no git
git status bun.lock

# Se não estiver, adicionar
git add bun.lock
git commit -m "chore: add bun.lock to version control"
```

### 2. Verificar Estado Atual

```bash
# Verificar droids disponíveis
ls -l .factory/droids/ | wc -l
# Esperado: 6 arquivos

# Verificar se mise está configurado
[ -f .mise.toml ] && echo "✓ mise configured" || echo "✗ mise not configured"

# Verificar bun.lock
git ls-files | grep bun.lock || echo "⚠️  bun.lock not tracked"
```

---

## 📊 Matriz de Impacto

| Item | Arquivo | Impacto | Esforço | Prioridade |
|------|---------|---------|---------|------------|
| 1. bun.lock ignorado | settings.json | 🔴 Alto | 5 min | Crítico |
| 2. mise não documentado | AGENTS.md | 🟠 Médio | 15 min | Alto |
| 3. mise check ausente | factory-config-specialist.md | 🟡 Baixo | 10 min | Médio |
| 4. mise check ausente | code-reviewer.md | 🟡 Baixo | 5 min | Médio |
| 5. Commands sem mise | commands/*.md | 🟡 Baixo | 15 min | Médio |
| 6. mise não em allowlist | settings.json | 🟠 Médio | 2 min | Alto |
| 7. Droid não listado | README.md | 🟡 Baixo | 5 min | Médio |
| 8. .mise.toml não listado | AGENTS.md | 🟡 Baixo | 2 min | Médio |

---

## 🎯 Benefícios Após Correções

### Consistência

- ✅ Toda documentação menciona mise quando relevante
- ✅ Droids sabem verificar configuração de ambiente
- ✅ Comandos oferecem alternativas mise run

### Reprodutibilidade

- ✅ bun.lock versionado garante builds idênticos
- ✅ Ambiente centralizado funciona corretamente

### Developer Experience

- ✅ Onboarding completo (bun + mise)
- ✅ Documentação consistente
- ✅ Menos confusão sobre como executar comandos

---

## 📝 Arquivos a Modificar

| Arquivo | Tipo de Mudança | Linhas Afetadas |
|---------|----------------|-----------------|
| `.factory/settings.json` | Remover + Adicionar | ~2 linhas |
| `.factory/AGENTS.md` | Adicionar seção | +30 linhas |
| `.factory/README.md` | Adicionar droid | +8 linhas |
| `.factory/droids/factory-config-specialist.md` | Adicionar checklist | +10 linhas |
| `.factory/droids/code-reviewer.md` | Adicionar check | +5 linhas |
| `.factory/commands/quick-audit.md` | Adicionar seção | +10 linhas |
| `.factory/commands/full-coverage.md` | Adicionar seção | +10 linhas |
| `.factory/commands/pr-ready.md` | Adicionar seção | +10 linhas |
| `.factory/QUICKSTART.md` | Adicionar seção | +15 linhas |

**Total:** ~9 arquivos, ~100 linhas adicionadas/modificadas

---

## 🚀 Script de Validação

Criar script para validar configuração:

```bash
#!/bin/bash
# .factory/scripts/validate-config.sh

echo "🔍 Validando Configuração .factory/"
echo ""

# 1. Check settings.json
echo "📋 Verificando settings.json..."
if grep -q '"bun.lock"' .factory/settings.json; then
  echo "  ✗ ERRO: bun.lock está em fileIgnorePatterns"
else
  echo "  ✓ OK: bun.lock não está ignorado"
fi

if grep -q '"mise"' .factory/settings.json; then
  echo "  ✓ OK: mise em allowedCommands"
else
  echo "  ⚠️  AVISO: mise não está em allowedCommands"
fi

# 2. Check bun.lock versionado
echo ""
echo "📦 Verificando bun.lock..."
if git ls-files | grep -q "bun.lock"; then
  echo "  ✓ OK: bun.lock está versionado"
else
  echo "  ✗ ERRO: bun.lock não está no git"
fi

# 3. Check droids count
echo ""
echo "🤖 Verificando droids..."
DROID_COUNT=$(ls -1 .factory/droids/*.md 2>/dev/null | wc -l)
echo "  Droids encontrados: $DROID_COUNT"
if [ "$DROID_COUNT" -eq 6 ]; then
  echo "  ✓ OK: 6 droids esperados"
else
  echo "  ⚠️  AVISO: Esperado 6 droids, encontrado $DROID_COUNT"
fi

# 4. Check mise.toml
echo ""
echo "⚙️  Verificando mise..."
if [ -f ".mise.toml" ]; then
  echo "  ✓ mise configurado (.mise.toml existe)"
elif [ -f ".mise.toml.template" ]; then
  echo "  ⚠️  Template existe, mas .mise.toml não criado"
else
  echo "  ℹ️  mise não configurado (opcional)"
fi

echo ""
echo "✅ Validação completa!"
```

---

## 📞 Como Usar Este Relatório

### Para Implementar Correções

```bash
# 1. Usar factory-config-specialist
droid "Use factory-config-specialist to analyze this audit report and implement critical fixes"

# 2. Ou implementar manualmente seguindo checklist acima
```

### Para Validar Após Correções

```bash
# Criar script de validação
cat > .factory/scripts/validate-config.sh << 'EOF'
[script acima]
EOF

chmod +x .factory/scripts/validate-config.sh

# Executar validação
.factory/scripts/validate-config.sh
```

---

## ✅ Conclusão

### Prioridades Imediatas

1. **Corrigir settings.json** (2 minutos)
   - Remover bun.lock de fileIgnorePatterns
   - Adicionar mise a allowedCommands

2. **Versionar bun.lock** (1 minuto)
   - `git add bun.lock && git commit -m "chore: add bun.lock"`

3. **Atualizar AGENTS.md** (15 minutos)
   - Adicionar seção Environment Management

### Estado Após Correções

- ✅ Configuração consistente
- ✅ Documentação alinhada
- ✅ Ambiente centralizado totalmente integrado
- ✅ Developer experience otimizado

---

**Auditoria realizada por:** Factory Droid CLI  
**Data:** 2026-01-20  
**Status:** 🟡 Melhorias identificadas e documentadas  
**Próximo Passo:** Implementar correções críticas (settings.json)
