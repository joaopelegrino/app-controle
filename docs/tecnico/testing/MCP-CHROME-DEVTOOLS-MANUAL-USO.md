# 🚀 Manual de Uso - MCP Chrome DevTools

**Projeto:** Plataforma B2B de treinamento técnico corporativo - Sistema Educacional Completo
**Versão:** 1.0
**Data:** 2025-11-12
**Status:** ✅ Validado e Funcional

---

## 📋 Índice

1. [O Que É MCP Chrome DevTools](#o-que-é-mcp-chrome-devtools)
2. [Pré-requisitos](#pré-requisitos)
3. [Configuração Inicial](#configuração-inicial)
4. [Comandos Básicos](#comandos-básicos)
5. [Casos de Uso Práticos](#casos-de-uso-práticos)
6. [Troubleshooting](#troubleshooting)
7. [Referências](#referências)

---

## 🎯 O Que É MCP Chrome DevTools

O **MCP Chrome DevTools** é um servidor MCP (Model Context Protocol) que permite ao Claude Code controlar o Google Chrome programaticamente. Com ele, você pode:

- ✅ Navegar em páginas web automaticamente
- ✅ Capturar screenshots e snapshots
- ✅ Inspecionar console e rede
- ✅ Interagir com elementos (clicks, formulários)
- ✅ Analisar performance
- ✅ Executar JavaScript no contexto da página

### Por Que Usar?

**Cenários ideais:**
- Testes automatizados E2E
- Debug visual de interfaces
- Análise de performance
- Validação de acessibilidade
- Inspeção de bugs em produção

---

## ⚙️ Pré-requisitos

### 1. Chrome for Testing Instalado

```bash
# Instalar Chrome for Testing
npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-testing

# Verificar instalação
ls -la ~/.cache/chrome-testing/chrome/linux-*/chrome-linux64/chrome
```

### 2. Servidor de Desenvolvimento Rodando

```bash
# Iniciar Vite dev server
cd /home/notebook/workspace/app-controle
npm run dev

# Deve exibir:
# ➜  Local:   http://localhost:3000/
```

### 3. Claude Code com MCP Habilitado

```bash
# Verificar permissões em .claude/settings.local.json
cat .claude/settings.local.json | jq .enableAllProjectMcpServers
# Deve retornar: true
```

---

## 🔧 Configuração Inicial

### Arquivo `.mcp.json` (Raiz do Projeto)

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--executable-path=/home/notebook/.cache/chrome-testing/chrome/linux-142.0.7444.162/chrome-linux64/chrome"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

**⚠️ Importante:** Ajuste o caminho `--executable-path` para a versão instalada no seu sistema.

### Ativar MCP Server

```bash
# Dentro do Claude Code, executar:
/mcp

# Ou reiniciar Claude Code para carregar automaticamente
```

---

## 📝 Comandos Básicos

### 1. Listar Páginas Abertas

```
Você: Liste as páginas abertas no Chrome
```

**Comando MCP:** `mcp__chrome-devtools__list_pages`

**Resultado esperado:**
```
0: http://localhost:3000/ [selected]
```

---

### 2. Navegar para URL

```
Você: Navegue para http://localhost:3000
```

**Comando MCP:** `mcp__chrome-devtools__navigate_page`

**Parâmetros:**
- `type`: "url"
- `url`: "http://localhost:3000"

---

### 3. Capturar Screenshot

```
Você: Tire um screenshot da página atual
```

**Comando MCP:** `mcp__chrome-devtools__take_screenshot`

**Parâmetros opcionais:**
- `format`: "png" | "jpeg" | "webp"
- `quality`: 0-100 (para jpeg/webp)
- `fullPage`: true (captura página completa)

**Exemplo avançado:**
```
Você: Tire um screenshot em alta qualidade da página completa
```

---

### 4. Inspecionar Console

```
Você: Verifique se há erros no console
```

**Comando MCP:** `mcp__chrome-devtools__list_console_messages`

**Resultado esperado:**
```
msgid=1 [debug] [vite] connecting...
msgid=2 [info] React DevTools suggestion
msgid=3 [error] TypeError: ... (se houver erros)
```

---

### 5. Interagir com Elementos

#### a) Tirar Snapshot da Página

```
Você: Mapeie os elementos da página
```

**Comando MCP:** `mcp__chrome-devtools__take_snapshot`

**Resultado:** Lista de elementos com UIDs únicos

#### b) Clicar em Elemento

```
Você: Clique no botão "Rust"
```

**Comandos:**
1. `take_snapshot` (mapear elementos)
2. `click` com `uid` do elemento

---

### 6. Preencher Formulários

```
Você: Preencha o campo de busca com "JavaScript"
```

**Comando MCP:** `mcp__chrome-devtools__fill`

**Parâmetros:**
- `uid`: ID do elemento (obtido via snapshot)
- `value`: Texto a preencher

---

### 7. Analisar Performance

```
Você: Analise a performance de carregamento
```

**Comandos:**
1. `mcp__chrome-devtools__performance_start_trace`
2. `mcp__chrome-devtools__navigate_page` (reload)
3. `mcp__chrome-devtools__performance_stop_trace`

**Resultado:** Métricas Core Web Vitals (FCP, LCP, TTI)

---

## 🎓 Casos de Uso Práticos

### Caso 1: Validar Navegação Entre Páginas

**Objetivo:** Garantir que o card Rust abre o caminho corretamente

```markdown
Você:
1. Navegue para http://localhost:3000
2. Clique no card "Rust"
3. Tire um screenshot da página de destino
4. Verifique se o título contém "Caminho de Aprendizado"
```

**Resultado esperado:**
- Screenshot mostra header "Caminho de Aprendizado"
- 7 áreas do caminho Rust visíveis
- Botão "Voltar ao Hub" presente

---

### Caso 2: Verificar Flash Cards

**Objetivo:** Testar modal de flash cards

```markdown
Você:
1. Navegue para http://localhost:3000
2. Clique no card "Bash"
3. Aguarde modal abrir
4. Tire screenshot do flash card
5. Verifique se há botões "Próximo" e "Anterior"
```

---

### Caso 3: Testar Responsividade

**Objetivo:** Validar design em diferentes tamanhos

```markdown
Você:
1. Redimensione a janela para 375x667 (mobile)
2. Navegue para http://localhost:3000
3. Tire screenshot
4. Redimensione para 1920x1080 (desktop)
5. Tire outro screenshot
6. Compare os layouts
```

**Comando adicional:** `mcp__chrome-devtools__resize_page`

---

### Caso 4: Debug de Erros em Produção

**Objetivo:** Investigar erro reportado pelo usuário

```markdown
Você:
1. Navegue para http://localhost:3000
2. Abra o console
3. Execute ação que causa erro (ex: clicar em área específica)
4. Liste mensagens de erro do console
5. Capture screenshot do estado problemático
6. Liste requisições de rede falhadas
```

---

### Caso 5: Validar Sistema de Notas

**Objetivo:** Testar persistência de dados no localStorage

```markdown
Você:
1. Navegue para sistema C
2. Digite "Teste de notas" no campo de notas
3. Execute JavaScript para verificar localStorage
4. Recarregue a página
5. Verifique se o texto persiste
```

**Comando JavaScript:**
```javascript
// Via mcp__chrome-devtools__evaluate_script
() => {
  return localStorage.getItem('notasRapidas_cProgramming');
}
```

---

## 🔍 Comandos Avançados

### Executar JavaScript Customizado

```markdown
Você: Execute este código JavaScript na página:
```

**Comando:** `mcp__chrome-devtools__evaluate_script`

**Exemplo - Obter título da página:**
```javascript
() => {
  return document.title;
}
```

**Exemplo - Contar elementos:**
```javascript
() => {
  return document.querySelectorAll('.area-card').length;
}
```

**Exemplo - Verificar estado React:**
```javascript
() => {
  const root = document.getElementById('root');
  return {
    hasChildren: root.children.length > 0,
    firstChild: root.firstChild?.tagName
  };
}
```

---

### Monitorar Requisições de Rede

```markdown
Você: Liste todas as requisições HTTP da página
```

**Comando:** `mcp__chrome-devtools__list_network_requests`

**Parâmetros opcionais:**
- `resourceTypes`: ["xhr", "fetch", "document"]
- `pageSize`: Limite de resultados
- `includePreservedRequests`: Incluir navegações anteriores

---

### Emular Condições de Rede

```markdown
Você: Simule conexão 3G lenta
```

**Comando:** `mcp__chrome-devtools__emulate`

**Opções:**
- `networkConditions`: "Slow 3G" | "Fast 3G" | "Offline"
- `cpuThrottlingRate`: 1-20 (1 = sem throttling)

---

## 🐛 Troubleshooting

### Problema: MCP Server não carrega

**Sintoma:** Comandos `mcp__chrome-devtools__*` não disponíveis

**Solução:**
```bash
# 1. Verificar sintaxe JSON
cat .mcp.json | jq .

# 2. Verificar permissões
cat .claude/settings.local.json | jq .enableAllProjectMcpServers

# 3. Reiniciar Claude Code
# Ctrl+C → iniciar nova sessão
```

---

### Problema: Chrome não inicia

**Sintoma:** Erro ao tentar navegar

**Solução:**
```bash
# Testar executável manualmente
/home/notebook/.cache/chrome-testing/chrome/linux-142.0.7444.162/chrome-linux64/chrome --version

# Deve retornar: Google Chrome 142.x.x.x

# Se não funcionar, reinstalar:
npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-testing
```

---

### Problema: Elementos não clicáveis

**Sintoma:** Click não dispara ação

**Solução:**
```markdown
# 1. Tirar snapshot atualizado
Você: Tire um novo snapshot da página

# 2. Verificar se elemento está visível
Você: Execute JavaScript para verificar visibilidade do elemento

# 3. Tentar com hover primeiro
Você: Passe o mouse sobre o elemento antes de clicar
```

---

### Problema: Screenshots em branco

**Sintoma:** Imagem capturada está vazia

**Solução:**
```markdown
# 1. Aguardar carregamento completo
Você: Aguarde 2 segundos antes de tirar screenshot

# 2. Verificar se página carregou
Você: Liste mensagens do console para ver erros de carregamento

# 3. Tentar screenshot de elemento específico
Você: Tire screenshot do elemento com uid=X_Y
```

---

## 📚 Referências

### Documentação Oficial

- **Chrome DevTools Protocol:** https://chromedevtools.github.io/devtools-protocol/
- **MCP Chrome DevTools GitHub:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Issue WSL2:** https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/131

### Arquivos do Projeto

- `.mcp.json` - Configuração MCP server (raiz)
- `.claude/settings.local.json` - Permissões (linhas 42-44)
- `docs/MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md` - Guia técnico detalhado
- `VALIDACAO-MCP-CHROME-DEVTOOLS.md` - Testes de validação

### Comandos Rápidos

```bash
# Verificar servidor Vite
ss -tuln | grep :3000

# Verificar Chrome instalado
ls ~/.cache/chrome-testing/chrome/

# Verificar MCP config
cat .mcp.json | jq .

# Reiniciar Claude Code
# Ctrl+C → claude-code
```

---

## 🎯 Resumo de Ferramentas MCP Disponíveis

### Navegação
- `list_pages` - Listar páginas abertas
- `new_page` - Criar nova página
- `select_page` - Selecionar página ativa
- `close_page` - Fechar página
- `navigate_page` - Navegar para URL
- `resize_page` - Redimensionar janela

### Captura
- `take_screenshot` - Screenshot do viewport ou elemento
- `take_snapshot` - Snapshot da árvore de acessibilidade

### Interação
- `click` - Clicar em elemento
- `fill` - Preencher input
- `fill_form` - Preencher múltiplos campos
- `hover` - Passar mouse sobre elemento
- `drag` - Arrastar elemento
- `press_key` - Pressionar tecla
- `upload_file` - Upload de arquivo

### Inspeção
- `list_console_messages` - Listar mensagens do console
- `get_console_message` - Obter mensagem específica
- `list_network_requests` - Listar requisições HTTP
- `get_network_request` - Obter requisição específica

### Performance
- `performance_start_trace` - Iniciar gravação de performance
- `performance_stop_trace` - Parar gravação
- `performance_analyze_insight` - Analisar insights

### Avançado
- `evaluate_script` - Executar JavaScript
- `wait_for` - Aguardar texto aparecer
- `handle_dialog` - Lidar com alertas/confirms
- `emulate` - Emular condições de rede/CPU

---

## ✨ Exemplo Completo: Teste E2E

```markdown
Você: Execute o seguinte teste completo do Plataforma B2B de treinamento técnico corporativo:

1. Navegue para http://localhost:3000
2. Verifique se não há erros no console
3. Capture screenshot da página inicial
4. Clique no card "Rust"
5. Aguarde 1 segundo
6. Capture screenshot do caminho Rust
7. Clique no botão "Estudar" da área "Terminal Warp"
8. Aguarde modal abrir
9. Capture screenshot do flash card
10. Clique em "Próximo"
11. Capture screenshot do segundo card
12. Verifique se contador de cards avançou
13. Gere relatório com todos os screenshots
```

**Resultado esperado:**
- ✅ 5 screenshots capturados
- ✅ Nenhum erro no console
- ✅ Navegação fluida entre telas
- ✅ Modal de flash cards funcionando
- ✅ Contadores atualizados corretamente

---

**📅 Última atualização:** 2025-11-12
**✅ Status:** Documentação validada e testada
**👤 Autor:** Claude Code
**📦 Projeto:** Plataforma B2B de treinamento técnico corporativo v2.0
