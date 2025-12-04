# Retomar US-002: Deep Linking de Aulas

## Contexto da Sessão Anterior (2025-12-04)

### ✅ O que foi concluído:

**US-001: Persistir Progresso de Módulos** - DONE
- Hook `useModuleProgress` em `src/hooks/useModuleProgress.js`
- Usa lazy initialization (`useState(() => loadFromStorage())`)
- Integrado em `SistemaEducacionalCompleto.jsx` para 5 cursos
- Testado via MCP Chrome DevTools - funciona após reload

**HOTFIX aplicado:**
- Race condition corrigida (dados não eram sobrescritos no reload)
- Padrão `hasUserChanges.current` para só salvar após interação

### Commits gerados:
```
01f7575 fix(hooks): prevent race condition in useModuleProgress initialization
345b75f docs(roadmap): mark US-001 as complete
6517cee refactor(education): integrate useModuleProgress in all courses
cb0d02e feat(hooks): add useModuleProgress for localStorage persistence
```

---

## 🎯 Próxima Tarefa: US-002 - Deep Linking

### Problema atual:
- URL não atualiza ao clicar em módulo para ver notas
- `setCurrentSubView` é usado internamente mas não reflete na URL
- Rota `/curso/:id/aula/:aulaId` existe mas precisa validação

### Critérios de Aceite (do ROADMAP.md):
- [ ] Migrar `setCurrentSubView` → `navigate()`
- [ ] Rota `/curso/:id/aula/:aulaId` funciona
- [ ] Deep linking para aulas OK
- [ ] Botão voltar do navegador funciona
- [ ] Breadcrumb reflete posição

### Arquivos a modificar:
1. `src/components/BashLearningSystem.jsx` - já usa `navigate()` na linha 224
2. `src/components/SistemaEducacionalCompleto.jsx` - rotas já configuradas
3. `src/components/BashNotesView.jsx` - usa `setCurrentSubView` para voltar

### Análise prévia:
O `BashLearningSystem.jsx` já tem navegação:
```javascript
// Linha 224 - já navega para aulas
navigate(`/curso/bash/aula/${modulo.id}`);
```

O problema pode estar em:
1. `BashNotesView.jsx` usando `setCurrentSubView('calendar')` em vez de `navigate()`
2. Rotas no `SistemaEducacionalCompleto.jsx` podem precisar ajustes

---

## Como usar este comando:

```bash
# Na nova sessão, execute:
/retomar-us002-deep-linking
```

Isso vai carregar este contexto e você pode continuar de onde parou.

---

## Comandos úteis para debug:

```bash
# Servidor dev
bun run dev

# Testar rota diretamente
# Navegar para: http://localhost:3000/curso/bash/aula/1.1

# Verificar console de erros via MCP
mcp__chrome-devtools__list_console_messages
```

---

## Arquivos de referência:
- `docs/backlog/ROADMAP.md` - US-002 linhas 93-110
- `src/components/SistemaEducacionalCompleto.jsx` - rotas linhas 380-405
- `src/components/BashLearningSystem.jsx` - navegação linha 224
- `src/components/BashNotesView.jsx` - breadcrumb linha 292
