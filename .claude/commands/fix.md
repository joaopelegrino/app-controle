---
description: Corrigir erro específico no código
arguments:
  - name: error
    required: true
    description: Mensagem de erro ou descrição do problema
---

# Fix Error: $ERROR

## 1. Análise do Erro
Primeiro, vou analisar o erro fornecido e identificar:
- Arquivo(s) afetado(s)
- Tipo de erro (sintaxe, runtime, lógica)
- Contexto do erro

## 2. Buscar Causa Raiz
Usar ferramentas para localizar o problema:
- Grep para encontrar referências
- Read para examinar o código
- Verificar console logs se aplicável

## 3. Implementar Correção
Aplicar a correção mínima necessária:
- Preservar funcionalidade existente
- Seguir padrões do projeto
- Não introduzir novos problemas

## 4. Validar Correção
Verificar se o erro foi resolvido:
```bash
npm test
npm run build
```

## 5. Adicionar Teste
Se aplicável, adicionar teste para prevenir regressão.

## Padrões do Projeto
- React 18 com hooks
- Tailwind CSS para estilos
- Sem console.log em produção
- Componentes funcionais