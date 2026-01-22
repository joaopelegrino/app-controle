# PR Ready Check Command

Checklist pré-PR abrangente para garantir que suas mudanças estão prontas para review.

## O Que Este Comando Faz

1. Roda todos os checks de qualidade (audit, lint, test)
2. Revisa git diff para:
   - Dados sensíveis (API keys, tokens)
   - Statements console.log
   - Comentários TODO/FIXME
   - Arquivos grandes (>50KB)
3. Verifica se mensagem de commit segue convenção
4. Verifica atualizações de documentação adequadas
5. Opcionalmente invoca code-reviewer agent

## Uso

```
/pr-ready
```

Ou peça ao Claude:
```
"Verifique se minhas mudanças estão prontas para PR"
```

## Output Esperado

```
Checklist de Prontidão para PR:

Quality Checks:
   Dependency audit: Limpo
   Linter: Passou
   Tests: Todos passando
   Build: Sucesso

Git Checks:
   Branch: feature/US-XXX-description
   Commits: 3 commits, todos convencionais
   Sem dados sensíveis detectados
   2 console.log statements encontrados (revisar recomendado)

Documentation:
   ROADMAP.md atualizado
   CLAUDE.md pode precisar de atualização (nova função adicionada)

Code Review:
   Rodar code-reviewer? (y/n)
```

## Checklist Pré-PR (Manual)

Antes de rodar este comando, garanta:

- [ ] Feature está completa e funcionando
- [ ] Todos testes passam localmente
- [ ] Código segue convenções do projeto
- [ ] Sem console.log em código de produção
- [ ] Documentação está atualizada
- [ ] Mensagens de commit são descritivas
- [ ] Sem dados sensíveis no diff

## Evidências Necessárias

Seu PR deve incluir:

1. **Testes**: Novos testes ou testes atualizados para mudanças
2. **Prova**: Screenshot, output de teste ou verificação manual
3. **Documentação**: Docs atualizados se API mudou
4. **Mensagem de Commit**: Descrição clara da intenção

## Quando Usar

- Antes de criar um PR
- Após endereçar comentários de review
- Antes de solicitar re-review
- Como verificação final antes de merge

## Problemas Comuns e Fixes

### Tests Falhando
```bash
bun run test -- --reporter=verbose
# Corrija testes falhando antes de prosseguir
```

### Erros de Lint
```bash
bun run lint -- --fix
# Revise e commite auto-fixes
```

### Dados Sensíveis Detectados
```bash
git diff --cached | grep -iE '(password|secret|api_key|token)'
# Remova dados sensíveis e use variáveis de ambiente
```

### Mensagem de Commit Não-Convencional
```bash
git commit --amend -m "feat(scope): mensagem de commit adequada"
```

## Integração com Auto-Review

Após passar todos os checks:

```
"Use code-reviewer agent para revisar minhas mudanças staged para este PR"
```

O code-reviewer vai verificar:
- Correção e lógica
- Cobertura de testes
- Convenções do projeto
- Concerns de segurança
- Alinhamento de arquitetura
- Necessidades de documentação

## Com mise (se configurado)

```bash
# Validação completa
mise run validate:env     # Validar ambiente primeiro

# Quality checks
mise run lint             # ESLint
mise run test             # Todos testes
mise run security         # Security scan (secrets + vulnerabilities)

# Verificação de build
mise run build            # Production build

# Tudo em sequência
mise run lint && mise run test && mise run security && mise run build
```

**Workflow PR automatizado:**
```bash
# Comando único para todos checks
mise run lint && \
mise run test:coverage && \
mise run security && \
mise run build && \
echo "PR ready!"
```

## Commands Relacionados

- `/quick-audit` - Verificação rápida de qualidade
- `/full-coverage` - Relatório de cobertura detalhado

## Execução Manual

```bash
# 1. Lint e fix
bun run lint -- --fix

# 2. Rodar todos testes
bun run test

# 3. Verificar cobertura
bun run test:coverage

# 4. Security scan
bun audit

# 5. Verificação de build
bun run build

# 6. Verificar mudanças staged
git diff --cached

# 7. Verificar mensagens de commit
git log --oneline -5
```
