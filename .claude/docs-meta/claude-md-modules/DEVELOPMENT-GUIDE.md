# Guia de Desenvolvimento

**Módulo:** DEVELOPMENT-GUIDE.md
**Parte de:** CLAUDE.md modularizado
**Última atualização:** 2025-11-17

---

## 🔧 Comandos Principais

### Desenvolvimento
```bash
npm run dev          # Servidor local porta 3000 (strictPort)
npm run build        # Build de produção otimizado
npm run preview      # Preview da build

# Testes
npm test            # Rodar testes com Vitest
npm run test:ui     # Interface visual de testes
npm run test:coverage # Relatório de cobertura

# Docker
docker-compose up -d  # Subir container (porta 80)
docker-compose down   # Parar container

# E2E com Playwright
node test-usabilidade-mcp.cjs  # Teste automatizado completo

# Slash Commands (Claude Code)
/test               # Executar e analisar testes
/deploy local       # Build e deploy local
/fix "erro aqui"    # Diagnóstico e correção
```

## 🎨 Padrões e Convenções

### Código
- **Componentes**: PascalCase, funcionais com hooks
- **Arquivos**: camelCase para JS/JSX
- **CSS**: Tailwind utility-first
- **Estado**: useState e useEffect do React
- **Props**: Destructuring na assinatura
- **Dados**: Centralizados em `src/data/`
- **Testes**: Co-localizados com componentes

### Git
- **Branch principal**: desenvolvimento
- **Commits**: Convencionais (feat, fix, docs, refactor, test, chore)
- **PR**: Sempre com review antes do merge
- **Hooks**: Pre-commit checks automáticos

### Qualidade
- **Sem console.log** em produção (removidos no build)
- **Sem sourcemaps** em produção (segurança)
- **Code splitting** configurado (react-vendor, ui-vendor)
- **Minificação** com Terser (drop_console, drop_debugger)
- **Formatação** automática com Prettier (via hooks)
- **Linting** com ESLint auto-fix

### Documentação
- **SSOT (Single Source of Truth)**: docs/backlog/ROADMAP.md (v3.0 B2B)
- **User Stories**: Formato "Como [persona]... Quero... Para..."
- **Critérios de Aceite**: Checkboxes explícitos
- **Estimativas**: Pontos Fibonacci (1, 2, 3, 5, 8, 13, 21)
- **Status**: DONE ✅ | IN PROGRESS 🚧 | TODO 📋 | ICEBOX 🧊
- **Legacy**: PRODUCT-CENTRAL-DOCUMENT.md (deprecated, redireciona para ROADMAP.md)

## 🔒 Segurança
- **Headers CSP** configurados no nginx
- **HTTPS ready** com headers de segurança
- **Sem exposição de secrets** verificado
- **localStorage** apenas para dados não sensíveis
- **Hooks** protegem contra operações destrutivas
- **MCP permissions** controladas via whitelist

## 🤖 Regras para Claude Code

### SEMPRE
- Verificar arquivo antes de editar com Read
- Usar comandos npm para testes e build
- Manter código limpo sem console.log
- Seguir padrões Tailwind existentes
- Preservar funcionalidades existentes
- Consultar docs/backlog/ROADMAP.md (SSOT) para decisões de produto B2B
- Atualizar User Stories quando implementar features
- Marcar critérios de aceite como completos
- Rodar testes antes de commitar

### NUNCA
- Criar arquivos desnecessários (arquivos temporários devem ser deletados)
- Adicionar comentários excessivos no código (código deve ser auto-explicativo)
- Usar jQuery ou bibliotecas não instaladas
- Modificar configurações de build sem necessidade
- Commitar sem rodar testes
- Desabilitar hooks de segurança
- Expor secrets ou tokens
- Duplicar código (refatorar para componentes genéricos)

### AO DEBUGAR
1. Verificar console do browser primeiro
2. Checar Network tab para requisições
3. Validar props dos componentes
4. Testar em diferentes tamanhos de tela (mobile/tablet/desktop)
5. Verificar localStorage para persistência
6. Usar MCP Chrome DevTools para inspeção programática
7. Capturar screenshots para análise visual
8. Consultar logs em `.claude/error.log` se disponível

### AO IMPLEMENTAR FEATURES
1. Verificar User Story correspondente em docs/backlog/ROADMAP.md
2. Ler critérios de aceite e contexto B2B
3. Criar branch: `feature/US-XXX-descricao`
4. Implementar conforme critérios
5. Escrever testes (se aplicável)
6. Atualizar documentação
7. Marcar checkboxes dos critérios
8. Commitar com mensagem convencional
9. Atualizar status da US: TODO → IN PROGRESS → DONE

### AO USAR MCP
**Chrome DevTools:**
```javascript
// Exemplo de uso
1. mcp__chrome-devtools__list_pages
2. mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
3. mcp__chrome-devtools__take_screenshot(format: "png")
4. mcp__chrome-devtools__list_console_messages
5. mcp__chrome-devtools__take_snapshot  // Mapeia elementos
6. mcp__chrome-devtools__click(uid: "1_15")  // Clica em elemento
```

**Playwright:**
```bash
# Teste automatizado completo
node test-usabilidade-mcp.cjs

# Captura screenshots em screenshots/
```

---

**Última atualização:** 2025-11-17
**Responsável:** Modularização CLAUDE.md v1.0
**Status:** ✅ Completo
