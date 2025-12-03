# Testing - Plataforma B2B de treinamento técnico corporativo

> **Estratégia de Testes e Ferramentas**
>
> **Versão:** 1.0.0
> **Data:** 2025-11-14
> **Status:** ✅ Guias MCP Completos

---

## 📋 Índice de Documentos

### 1. **MCP Chrome DevTools**

#### [MCP-CHROME-DEVTOOLS-QUICK-START.md](MCP-CHROME-DEVTOOLS-QUICK-START.md)
**Público:** Desenvolvedores novos em MCP
**Tempo:** 5 minutos
**Conteúdo:** Setup rápido e primeiro teste

#### [MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md](MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md)
**Público:** Desenvolvedores que querem dominar MCP
**Tempo:** 45 minutos
**Conteúdo:**
- Configuração detalhada WSL2
- Troubleshooting completo
- Integração com Claude Code
- 24 ferramentas disponíveis

#### [MCP-CHROME-DEVTOOLS-MANUAL-USO.md](MCP-CHROME-DEVTOOLS-MANUAL-USO.md)
**Público:** Referência rápida
**Tempo:** Consulta conforme necessário
**Conteúdo:**
- Todos os 24 comandos MCP
- Exemplos práticos
- Casos de uso comuns

---

## 🎯 Quick Start

### 1. Setup MCP Chrome DevTools

```bash
# Terminal 1: Iniciar Chrome em modo debug
./scripts/start-chrome-debug.sh

# Terminal 2: Verificar conexão
npx chrome-devtools-mcp@latest --executable-path=/home/notebook/.cache/chrome-testing/chrome/...
```

### 2. Primeiro Teste Automatizado

```bash
# Rodar teste E2E com Playwright + MCP
node test-usabilidade-mcp.cjs

# Resultado: Screenshots em screenshots/
```

### 3. Validação Manual via Claude Code

Use comandos MCP diretamente no Claude Code:

```
1. mcp__chrome-devtools__list_pages
2. mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
3. mcp__chrome-devtools__take_screenshot(format: "png")
```

---

## 📊 Status Atual de Testes

### Cobertura

| Tipo | Atual | Meta Release 2.0 | Meta Release 3.0 |
|------|-------|------------------|------------------|
| **Unit Tests** | 5% | 30% | 60% |
| **Integration Tests** | 0% | 10% | 20% |
| **E2E Tests** | 1 script | 10 scripts | 30 scripts |
| **Cobertura Total** | **5%** | **30%** | **80%** |

### Ferramentas

| Ferramenta | Status | Uso |
|------------|--------|-----|
| **Vitest** | ✅ Configurado | Unit + Integration tests |
| **React Testing Library** | ✅ Configurado | Component tests |
| **Playwright** | ✅ Instalado | E2E headless |
| **MCP Chrome DevTools** | ✅ Validado | E2E com Claude Code |

---

## 🧪 Estratégia de Testes (Release 2.0)

### Pirâmide de Testes

```
        ┌─────────────┐
        │   E2E (5%)  │  ← Testes de ponta a ponta
        ├─────────────┤      Playwright + MCP
        │ Integration │  ← Testes de integração
        │   (10%)     │      Vitest
        ├─────────────┤
        │   Unit      │  ← Testes unitários
        │   (85%)     │      Vitest + RTL
        └─────────────┘
```

### Prioridades

**Alta (Sprint 2.1-2.2):**
1. Testes de componentes principais (HubView, Breadcrumb)
2. Testes de hooks (useAutoSaveNotes, useModuleProgress)
3. Testes de helpers (utils/helpers.js)

**Média (Sprint 2.3):**
4. Testes de integração (navegação completa)
5. Mais E2E scripts (fluxos principais)

**Baixa (Release 3.0):**
6. Testes de acessibilidade (axe-core)
7. Performance tests (Lighthouse CI)

---

## 📚 Documentos Planejados

- **01-estrategia-testes.md** - Estratégia completa de testes (planejado)
- **02-guia-vitest.md** - Como escrever testes unitários (planejado)
- **03-guia-playwright.md** - Como escrever testes E2E (planejado)

---

## 🔗 Links Úteis

### Documentação Externa
- [MCP Chrome DevTools Official](https://github.com/google/mcp-chrome-devtools)
- [Playwright Docs](https://playwright.dev)
- [Vitest Docs](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)

### Documentação Interna
- **[../../conceitual/01-visao-geral/04-modelo-dominio.md](../../conceitual/01-visao-geral/04-modelo-dominio.md)** - Entidades a testar
- **[../architecture/01-visao-geral-arquitetura.md](../architecture/01-visao-geral-arquitetura.md)** - Arquitetura do sistema

---

## 🚀 Próximos Passos

1. Criar 01-estrategia-testes.md (detalhado)
2. Escrever primeiros testes unitários (HubView.test.jsx)
3. Configurar CI/CD para rodar testes automaticamente
4. Adicionar coverage reports (Istanbul)

---

**📍 Você está em:** `docs/tecnico/testing/README.md`
**📅 Última atualização:** 2025-11-14
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** ✅ Guias MCP completos, estratégia planejada
