# Exemplo Prático: Captura de Screenshots com Playwright MCP

## Como Claude Code pode capturar e salvar screenshots

### 1. Verificando se Playwright MCP está instalado

O Playwright MCP já está configurado em seu sistema conforme visto em:
```
/home/joao/.claude/mcp-servers.json
```

### 2. Comandos para capturar screenshots

Quando você precisar que eu capture screenshots durante o debugging, use estes comandos:

#### Screenshot básico da página
```
"Use playwright mcp to navigate to http://localhost:3000 and take a screenshot"
```

#### Screenshot com nome específico
```
"Use playwright mcp to take a screenshot and save as error-state-login.png"
```

#### Screenshot de elemento específico
```
"Use playwright mcp to take a screenshot of the error message div"
```

#### Screenshot de página completa
```
"Use playwright mcp to take a full page screenshot including all scrollable content"
```

### 3. Exemplo de sessão de debugging com screenshots

```markdown
Usuário: "Estou vendo um erro na tela de login. Use playwright mcp para capturar o estado atual"

Claude: Vou usar o Playwright MCP para navegar até sua aplicação e capturar o erro.

[Claude executa]:
- mcp__playwright__browser_navigate para http://localhost:3000/login
- mcp__playwright__browser_take_screenshot com filename: "login-error-{timestamp}.png"

Claude: Capturei o screenshot em: ./login-error-2025-08-01-143022.png
Posso ver o erro. Vou também capturar os logs do console...

[Claude executa]:
- mcp__playwright__browser_console_messages para ver erros JavaScript

Claude: Encontrei o problema! Há um erro "Cannot read property 'user' of undefined" no console.
```

### 4. Workflow completo de debugging visual

```bash
# 1. Claude abre o navegador
mcp__playwright__browser_navigate("http://localhost:3000")

# 2. Claude tira screenshot inicial
mcp__playwright__browser_take_screenshot({
  filename: "debug-session-start.png",
  fullPage: true
})

# 3. Claude simula interação que causa erro
mcp__playwright__browser_click({
  element: "Login button",
  ref: "button[type='submit']"
})

# 4. Claude captura estado de erro
mcp__playwright__browser_take_screenshot({
  filename: "error-state.png"
})

# 5. Claude captura console logs
mcp__playwright__browser_console_messages()

# 6. Claude captura network requests
mcp__playwright__browser_network_requests()
```

### 5. Onde os screenshots são salvos

Por padrão, os screenshots são salvos em:
- Diretório atual do projeto: `./screenshot-{timestamp}.png`
- Com nome customizado: `./seu-nome-aqui.png`
- Em pasta específica: `./debug-screenshots/erro-1.png`

### 6. Visualizando os screenshots

Após captura, você pode:
1. Abrir o arquivo diretamente no VSCode
2. Ver no explorador de arquivos
3. Pedir para eu analisar: "Read the screenshot at ./error-state.png"

### 7. Exemplo de comando completo

```
"Use playwright mcp to:
1. Navigate to localhost:3000
2. Click on the 'Add Product' button
3. Take a screenshot if any error appears
4. Get all console messages
5. Save everything in a debug folder with timestamp"
```

### 8. Dicas importantes

- **Sempre especifique "playwright mcp"** na primeira vez para evitar que eu use Bash
- **O navegador fica visível** - você pode interagir enquanto eu automatizo
- **Cookies persistem** - faça login manual se necessário
- **Screenshots são locais** - salvos em seu sistema de arquivos

### 9. Resposta direta às suas perguntas

> "É possível Claude Code salvar os prints e mostrar ao usuário?"

**SIM!** Eu posso:
1. ✅ Capturar screenshots usando Playwright MCP
2. ✅ Salvar com nomes descritivos
3. ✅ Informar o caminho exato onde foi salvo
4. ✅ Ler e analisar o screenshot se necessário
5. ✅ Organizar em pastas para melhor gestão

O processo é totalmente transparente e você tem acesso a todos os arquivos gerados.