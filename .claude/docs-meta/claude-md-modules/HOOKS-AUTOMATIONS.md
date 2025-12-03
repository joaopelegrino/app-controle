# Hooks e Automações

**Módulo:** HOOKS-AUTOMATIONS.md
**Parte de:** CLAUDE.md modularizado
**Última atualização:** 2025-11-17

---

## 🎣 Hooks e Automações (.claude/hooks.toml)

### Pre-Tool Use Hooks

**1. Proteção contra Operações Destrutivas**
```toml
event = "PreToolUse"
tool_name = "Bash"
pattern = "rm|delete|drop"
action.type = "block"
```
- Bloqueia comandos destrutivos
- Exige confirmação explícita

**2. Arquivos Sensíveis**
```toml
tool_name = "Write|Edit"
file_paths = ["*.env", "*.key", "*.pem"]
action.type = "confirm"
```
- Confirma antes de modificar secrets

### Post-Tool Use Hooks

**1. Auto-formatação de Código**
```bash
# Após editar .jsx/.js
prettier --write $FILE
eslint $FILE --fix
```
- Formatação automática
- Linting com auto-fix

**2. Validação de Testes**
```bash
# Após criar .test.jsx
npm test -- $FILE --run
```
- Roda testes automaticamente

### Session Hooks

**1. Início de Sessão (SessionStart)**
- Exibe informações do ambiente
- Mostra branch Git atual
- Verifica dependências (npm audit)
- Checa se servidor está rodando (porta 3000)
- Lista comandos slash disponíveis

**2. Fim de Sessão (Stop)**
- Salva log da sessão
- Lista arquivos modificados
- Sugere próximos passos (testes, build, commit)

**3. Pré-Compactação (PreCompact)**
- Salva contexto em `.claude/backups/`
- Timestamp do contexto

**4. Tratamento de Erros (OnError)**
- Log de erros em `.claude/error.log`
- Sugestões de correção comuns

### Custom Trigger Hooks

**before_commit**
- Roda testes automaticamente
- Valida build
- Executa linting
- Bloqueia commit se falhar

---

**Última atualização:** 2025-11-17
**Responsável:** Modularização CLAUDE.md v1.0
**Status:** ✅ Completo
