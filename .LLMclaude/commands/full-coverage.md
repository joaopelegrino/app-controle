# Full Coverage Report Command

Gerar relatório abrangente de cobertura de testes e analisar áreas não cobertas.

## O Que Este Comando Faz

1. Roda testes com cobertura (`bun run test:coverage`)
2. Analisa relatório de cobertura
3. Identifica arquivos e funções não cobertos
4. Sugere áreas prioritárias para melhoria de testes
5. Pode invocar test-generator agent para recomendações

## Uso

```
/full-coverage
```

Ou peça ao Claude:
```
"Gere um relatório completo de cobertura e analise"
```

## Output Esperado

```
Resumo de Cobertura:
├── Statements: 78% (234/300)
├── Branches: 72% (54/75)
├── Functions: 85% (34/40)
└── Lines: 79% (220/280)

Arquivos Não Cobertos:
BAIXA: src/hooks/useModuleProgress.js - 45% coverage
BAIXA: src/services/dataService.js - 60% coverage
MEDIA: src/components/GenericLearningSystem.jsx - 75% coverage

Recomendações:
1. Prioridade: Adicionar testes para tratamento de erro useModuleProgress
2. Prioridade: Cobrir cenários de quota localStorage em dataService
3. Nice-to-have: Adicionar testes de edge case para GenericLearningSystem
```

## Quando Usar

- Antes de lançar nova versão
- Ao implementar features críticas
- Após refatoração
- Semanalmente como parte de métricas de qualidade
- Quando buscando atingir 80%+ de cobertura

## Ações de Follow-up

Após rodar cobertura:

1. **Invocar test-generator agent**:
   ```
   "Use test-generator agent para criar testes para src/hooks/useModuleProgress.js"
   ```

2. **Revisão manual**:
   ```bash
   # Abrir relatório HTML
   xdg-open coverage/index.html  # Linux
   open coverage/index.html      # macOS
   ```

3. **Atualizar testes**:
   - Focar em áreas vermelhas/amarelas no relatório
   - Priorizar funcionalidade core
   - Não mirar 100% - focar em testes significativos

## Metas de Cobertura

| Tipo de Componente | Cobertura Alvo |
|-------------------|----------------|
| Hooks | 90%+ |
| Services | 85%+ |
| Core Components | 80%+ |
| UI Components | 70%+ |
| Utility Functions | 95%+ |

## Com mise (se configurado)

```bash
# Gerar relatório de cobertura
mise run test:coverage

# Ver cobertura no terminal
mise run test:coverage

# Então abrir relatório HTML manualmente
# Localização: coverage/index.html
```

**Integração com test-generator:**
```bash
# Após rodar cobertura
"Use test-generator agent para analisar relatório de cobertura e sugerir melhorias"
```

## Commands Relacionados

- `/quick-audit` - Verificação rápida de qualidade sem cobertura detalhada

## Execução Manual

```bash
# Gerar relatório de cobertura
bun run test:coverage

# Abrir relatório (Linux)
xdg-open coverage/index.html

# Ver resumo no terminal
cat coverage/coverage-summary.json | jq '.total'
```
