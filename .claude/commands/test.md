---
description: Executar e analisar testes do projeto
arguments:
  - name: type
    required: false
    default: all
    values: [unit, integration, e2e, coverage, all]
---

# Run Tests: $TYPE

## Executar Testes

### Testes Unitários
{{#if TYPE == "unit" || TYPE == "all"}}
```bash
npm test -- --run
```
{{/if}}

### Testes com Coverage
{{#if TYPE == "coverage" || TYPE == "all"}}
```bash
npm run test:coverage
```
Analisar relatório de cobertura e identificar áreas não testadas.
{{/if}}

### Testes E2E (quando implementados)
{{#if TYPE == "e2e"}}
```bash
# npm run test:e2e (quando configurado)
```
{{/if}}

## Análise de Resultados

1. **Testes Falhando**: Identificar e corrigir
2. **Cobertura Baixa**: Adicionar testes para áreas críticas
3. **Performance**: Verificar tempo de execução

## Adicionar Testes Faltantes

Se a cobertura estiver abaixo de 80%, criar testes para:
- Componentes principais
- Funções utilitárias
- Casos extremos
- Tratamento de erros

## Padrões de Teste
- Usar Vitest com Testing Library
- Testes devem ser isolados
- Mock de dependências externas
- Nomenclatura: `ComponentName.test.jsx`