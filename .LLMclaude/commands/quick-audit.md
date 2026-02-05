# Quick Audit Command

Realizar verificação rápida de saúde do projeto executando checks essenciais de qualidade.

## O Que Este Comando Faz

1. Roda auditoria de dependências (`bun audit`)
2. Roda linter (`bun run lint`)
3. Roda todos os testes (`bun run test`)
4. Mostra git status
5. Verifica mudanças não commitadas

## Uso

```
/quick-audit
```

Ou peça ao Claude:
```
"Rode uma auditoria rápida do projeto"
```

## Output Esperado

```
Dependency Audit: Sem vulnerabilidades encontradas
Linter: Todos arquivos passam
Tests: 45 passaram
Git Status: Working directory limpo
```

## Quando Usar

- Antes de iniciar nova feature
- Antes de criar PR
- Após puxar mudanças do remote
- Check diário de standup
- Antes de commit de final de dia

## Troubleshooting

Se algum check falhar:
1. **Falhas de audit**: Rode `bun audit --fix` ou atualize pacotes vulneráveis
2. **Falhas de lint**: Rode `bun run lint -- --fix` para auto-fix
3. **Falhas de test**: Revise output de teste e corrija testes falhando
4. **Mudanças não commitadas**: Commite ou stash mudanças

## Com mise (se configurado)

Se você tem mise configurado (`.mise.toml` existe), use tasks integradas:

```bash
mise run security         # Security scan completo (inclui audit)
mise run lint             # Linter
mise run test             # Testes
mise run validate:env     # Validar ambiente
```

A task `mise run security` inclui:
- `gitleaks` - Detecção de secrets
- `trivy` - Vulnerability scanning
- `bun audit` - Dependency audit

## Commands Relacionados

- `/full-coverage` - Rodar testes com relatório de cobertura
- `/pr-ready` - Checklist pré-PR completo

## Execução Manual

```bash
# Auditoria de dependências
bun audit

# Linter
bun run lint

# Testes
bun run test

# Git status
git status

# Verificar diff
git diff
```
