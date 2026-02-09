# Browser Testing Command

Comandos para testes E2E e automação QA usando servidores MCP de browser.

## Servidores MCP Disponíveis

### 1. Chrome DevTools MCP (Preferido para Debugging)

**Quando usar:** Debugging ao vivo, inspeção de network, monitoramento de console

**Tools disponíveis:**
- `mcp__chrome-devtools__navigate_page` - Navegar para URL
- `mcp__chrome-devtools__take_snapshot` - Capturar snapshot DOM
- `mcp__chrome-devtools__click` - Clicar elemento por UID
- `mcp__chrome-devtools__list_console_messages` - Ler output do console
- `mcp__chrome-devtools__list_network_requests` - Analisar tráfego de rede
- `mcp__chrome-devtools__take_screenshot` - Tirar screenshot

## Quick Start: Testando localhost:3000

### Teste Básico de Navegação

```javascript
// Navegar para app
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Tirar snapshot para verificar se página carregou
mcp__chrome-devtools__take_snapshot()

// Tirar screenshot
mcp__chrome-devtools__take_screenshot({ format: "png" })
```

### Debug Session ao Vivo

```javascript
// 1. Navegar para app
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// 2. Tirar snapshot
mcp__chrome-devtools__take_snapshot()

// 3. Verificar console por erros
mcp__chrome-devtools__list_console_messages()

// 4. Verificar requisições de rede
mcp__chrome-devtools__list_network_requests()
```

## Cenários de Teste E2E para app-controle

### Cenário 1: Fluxo de Onboarding de Usuário

```javascript
// Navegar para home
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Verificar se hub carregou
const snapshot1 = mcp__chrome-devtools__take_snapshot()
// Verificar heading "Cursos Disponíveis"

// Clicar primeiro card de curso
mcp__chrome-devtools__click({ uid: "[uid do card]" })

// Verificar se página do curso carregou
const snapshot2 = mcp__chrome-devtools__take_snapshot()

// Clicar botão "Iniciar Curso"
mcp__chrome-devtools__click({ uid: "[uid do botão]" })

// Verificar se aula 1 carregou
const snapshot3 = mcp__chrome-devtools__take_snapshot()

// Tirar screenshot para verificação visual
mcp__chrome-devtools__take_screenshot({ format: "png" })
```

### Cenário 2: Teste de Persistência de Progresso

```javascript
// Navegar para curso
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/curso/bash" })

// Completar módulo 1 (clicar botão completar)
mcp__chrome-devtools__click({ uid: "[uid botão completar]" })

// Verificar localStorage via evaluate_script
mcp__chrome-devtools__evaluate_script({
  function: "() => localStorage.getItem('ultrathink_progress_bash')"
})

// Navegar para fora
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Retornar ao curso
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/curso/bash" })

// Verificar se progresso persistiu
const snapshot = mcp__chrome-devtools__take_snapshot()
// Deve mostrar módulo 1 como completado
```

### Cenário 3: Teste de Funcionalidade de Notas

```javascript
// Navegar para notas do curso
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/curso/bash/caderno" })

// Preencher campo de notas
mcp__chrome-devtools__fill({
  uid: "[uid do textarea]",
  value: "Teste de anotações - comandos básicos do bash"
})

// Verificar localStorage
mcp__chrome-devtools__evaluate_script({
  function: "() => localStorage.getItem('bash-learning-notes')"
})

// Navegar para fora e voltar
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/curso/bash/caderno" })

// Verificar se notas persistiram
const snapshot = mcp__chrome-devtools__take_snapshot()
```

### Cenário 4: Teste de Analytics do Dashboard

```javascript
// Completar progresso em múltiplos cursos
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/curso/bash" })
mcp__chrome-devtools__click({ uid: "[uid botão completar]" })

mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/curso/rust" })
mcp__chrome-devtools__click({ uid: "[uid botão completar]" })

// Navegar para dashboard
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/dashboard" })

// Verificar se cards de progresso aparecem
const snapshot = mcp__chrome-devtools__take_snapshot()
// Deve mostrar progresso para bash e rust

// Tirar screenshot para revisão manual
mcp__chrome-devtools__take_screenshot({ format: "png" })
```

## Testes de Performance

### Medir Performance de Carregamento de Página

```javascript
// Navegar para página
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Iniciar trace de performance
mcp__chrome-devtools__performance_start_trace({ reload: true, autoStop: true })

// Analisar insights
mcp__chrome-devtools__performance_analyze_insight({
  insightSetId: "[id do conjunto]",
  insightName: "LCPBreakdown"
})
```

## Testes de Acessibilidade

### Verificar ARIA Labels e Roles

```javascript
// Navegar para página
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })

// Pegar árvore de acessibilidade (via snapshot verbose)
const snapshot = mcp__chrome-devtools__take_snapshot({ verbose: true })

// Verificar:
// - Todos elementos interativos têm roles
// - Imagens têm alt text
// - Inputs de form têm labels
// - Headings formam hierarquia adequada
```

## Checklist de Testes de Regressão

Rodar antes de cada release:

### Fluxos Críticos de Usuário
- [ ] Hub carrega e exibe todos cursos ativos
- [ ] Navegação de curso funciona (todos 5 cursos)
- [ ] Progresso salva no localStorage
- [ ] Progresso carrega do localStorage
- [ ] Notas salvam e persistem
- [ ] Dashboard mostra progresso correto
- [ ] Admin dashboard carrega (se autenticado)

### Testes de Viewport
- [ ] Mobile (375x667)
- [ ] Tablet (768x1024)
- [ ] Desktop (1920x1080)

### Verificações de Performance
- [ ] Carregamento de página < 2s
- [ ] Sem erros no console
- [ ] Sem erros 404 de rede
- [ ] Tamanho de bundle < 500kb

### Verificações de Acessibilidade
- [ ] Todas imagens têm alt text
- [ ] Navegação por teclado funciona
- [ ] Indicadores de foco visíveis
- [ ] ARIA labels presentes

## Smoke Test Rápido

Verificação básica de saúde:

```javascript
// 1. Carregar home
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
const home = mcp__chrome-devtools__take_snapshot()

// 2. Carregar cada curso
const courses = ['bash', 'c', 'rust', 'vscode', 'claude-code']
for (const course of courses) {
  mcp__chrome-devtools__navigate_page({ url: `http://localhost:3000/curso/${course}` })
  mcp__chrome-devtools__take_snapshot()
  // Verificar sem erros
}

// 3. Carregar dashboards
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/dashboard" })
const dashboard = mcp__chrome-devtools__take_snapshot()

// 4. Verificar console
mcp__chrome-devtools__list_console_messages({ types: ["error"] })
```

## Dicas de Debugging

### Problemas Comuns

**Servidor MCP não conectando:**
```bash
# Verificar se Chrome está rodando em modo debug
# No Windows/WSL, iniciar Chrome com:
# google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug
```

**Snapshot não mostrando elementos:**
```javascript
// Esperar página carregar completamente
mcp__chrome-devtools__wait_for({ text: "Cursos Disponíveis" })

// Então tirar snapshot
const snapshot = mcp__chrome-devtools__take_snapshot()
```

## Boas Práticas

1. **Sempre navegar primeiro** - Não assumir que página está carregada
2. **Usar snapshots para verificação** - Mais confiável que screenshots
3. **Tratar operações async** - Esperar network/animações estabilizarem
4. **Limpar localStorage** - Resetar estado entre testes
5. **Usar DevTools para debugging** - Melhores capacidades de inspeção
6. **Tirar screenshots como evidência** - Prova visual de issues
7. **Testar com dados realistas** - Usar conteúdo real de curso
8. **Verificar estados de erro** - Testar unhappy paths também
