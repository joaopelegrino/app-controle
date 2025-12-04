# Roadmap MVP - Plataforma de Aprendizado

**Versão:** 1.0 MVP
**Data:** 2025-12-04
**Branch:** `mvp-v1` (orphan - início limpo)
**Foco:** Backend, Persistência e Estrutura Funcional

---

## Visão do MVP

Plataforma de aprendizado técnico com foco em:
- ✅ Interface funcional (Hub, Cursos, Caminhos)
- ✅ Persistência de progresso (Sprint 1 - US-001)
- ✅ Navegação por URL (deep linking) (Sprint 1 - US-002)
- 🎯 Estrutura escalável (Sprint 2)

---

## Estado Atual

### Estrutura Visível

```
🏠 HUB (/)
├── 📊 Estatísticas: 1 área, 1 caminho, 16 módulos, 32h
│
├── 🎯 CAMINHOS PROPOSTOS
│   └── 🛤️ Desenvolvedor Backend
│       └── 🐚 Bash (disponível)
│
└── 📚 ÁREAS DE ESTUDO
    └── 🐚 Bash Shell Scripting (padrão)
        ├── 4 seções (Fundamentos, Texto, Avançado, Ferramentas)
        ├── 16 módulos com checkboxes
        ├── 📹 Vídeo YouTube
        ├── 📒 Caderno de notas (auto-save)
        └── 🃏 Flashcards 3D
```

### Funcionalidades OK

| Componente | Status | Arquivo |
|------------|--------|---------|
| Hub | ✅ | `HubView.jsx` |
| Caminho Proposto | ✅ | `LearningPathView.jsx` |
| Curso Bash | ✅ | `BashLearningSystem.jsx` |
| Caderno Notas | ✅ | `useAutoSaveNotes.js` |
| Flashcards | ✅ | `FlashcardModal.jsx` |
| Breadcrumb | ✅ | `Breadcrumb.jsx` |

### Pendências Técnicas

| Item | Prioridade | Descrição |
|------|------------|-----------|
| ~~Deep linking aulas~~ | ✅ DONE | ~~URL não atualiza ao clicar em módulo~~ |
| ~~Persistir progresso~~ | ✅ DONE | ~~Checkboxes se perdem ao recarregar~~ |
| ~~Rotas de aulas~~ | ✅ DONE | ~~Implementar `/curso/:id/aula/:aulaId`~~ |

---

## Backlog Priorizado

### Sprint 1: Persistência (P0) ✅ COMPLETA

#### US-001: Persistir Progresso de Módulos ✅ DONE

**Como** usuário estudando
**Quero** que meu progresso seja salvo
**Para** não perder ao recarregar a página

**Critérios de Aceite:**
- [x] Hook `useModuleProgress` criado
- [x] Progresso salvo em localStorage por curso
- [x] Carrega progresso ao montar componente
- [x] Sincroniza estado React ↔ localStorage
- [x] Tratamento de erros (QuotaExceededError)

**Estrutura de dados:**
```javascript
// localStorage key: ultrathink_progress_bash
{
  "completedModules": ["1.1", "1.2", "2.1"],
  "lastUpdated": "2025-12-03T10:00:00Z",
  "totalModules": 16
}
```

**Complexidade:** 5 pontos

---

#### US-002: Corrigir Navegação de Aulas ✅ DONE

**Como** usuário navegando
**Quero** que a URL reflita minha posição
**Para** compartilhar links e usar botão voltar

**Critérios de Aceite:**
- [x] Migrar `setCurrentSubView` → `navigate()` (via callback pattern)
- [x] Rota `/curso/:id/aula/:aulaId` funciona
- [x] Deep linking para aulas OK
- [x] Botão voltar do navegador funciona
- [x] Breadcrumb reflete posição

**Arquivos envolvidos:**
- `BashLearningSystem.jsx` - já usava `navigate()` na linha 224
- `SistemaEducacionalCompleto.jsx` - `ModuleNotesRoute` com callback-as-navigation

**Complexidade:** 8 pontos (na prática: 3 pontos - já estava implementado)

---

### Sprint 2: Estrutura de Dados (P1)

#### US-003: API de Dados Local ✅ DONE

**Como** desenvolvedor
**Quero** camada de abstração para dados
**Para** facilitar futura migração para backend

**Critérios de Aceite:**
- [x] Serviço `dataService.js` criado
- [x] Métodos: getCourses, getCourse, getCourseModules
- [x] Métodos: getProgress, saveProgress, clearProgress
- [x] Métodos: getNotes, saveNotes, clearNotes
- [x] Métodos: checkStorageAvailable, getStorageStats
- [x] Abstrai localStorage (fallback para sessionStorage)
- [x] Tipagem completa com JSDoc (Course, CourseProgress, NoteData, SaveResult)

**Estrutura implementada:**
```javascript
// src/services/dataService.js
export const dataService = {
  // Cursos
  getCourses: () => Course[],
  getCourse: (id) => Course | null,
  getCourseModules: (id) => { fases, modulos, startDate } | null,

  // Progresso
  getProgress: (courseId) => CourseProgress,
  saveProgress: (courseId, modules) => SaveResult,
  clearProgress: (courseId) => boolean,

  // Notas
  getNotes: (courseId) => NoteData,
  saveNotes: (courseId, content) => SaveResult & { sizeInfo },
  clearNotes: (courseId) => boolean,

  // Utilitários
  checkStorageAvailable: () => boolean,
  getStorageStats: () => { used, usedKB, usedMB, available }
};
```

**Complexidade:** 8 pontos

---

#### US-004: Refatorar Estrutura de Dados

**Como** desenvolvedor
**Quero** estrutura de dados consistente
**Para** facilitar manutenção

**Critérios de Aceite:**
- [ ] Unificar formato de `*LearningData.js`
- [ ] Schema documentado
- [ ] Validação de dados no load
- [ ] Migração de dados antigos

**Complexidade:** 5 pontos

---

### Sprint 3: Expansão Controlada (P2)

#### US-005: Reativar Áreas Comentadas

**Como** usuário
**Quero** acessar mais cursos
**Para** expandir meu aprendizado

**Critérios de Aceite:**
- [ ] C Programming reativado (50 módulos)
- [ ] Rust reativado (24 módulos)
- [ ] Todos usando padrão Bash
- [ ] Persistência funcionando

**Ordem:**
1. C Programming (já tem LearningSystem)
2. Rust (já tem LearningSystem)
3. VSCode WSL
4. Claude Code

**Complexidade:** 13 pontos (total)

---

## Stack Técnica

```yaml
Runtime:
  principal: Bun 1.3.3 (Anthropic - 35x mais rápido)
  fallback: Node.js 24.11.1 (via mise)
  gerenciador: mise (versões centralizadas)

Frontend:
  framework: React 18.3.1
  build: Vite 5.4.19
  styling: Tailwind CSS 3.4
  icons: Lucide React
  routing: React Router 6

Persistência (Atual):
  storage: localStorage
  pattern: Hooks customizados
  limite: 50KB por nota

Persistência (Futuro):
  database: PostgreSQL ou Supabase
  auth: A definir
  api: REST ou tRPC
```

---

## Métricas

| Métrica | Atual | Meta Sprint 1 | Meta Sprint 2 |
|---------|-------|---------------|---------------|
| Áreas visíveis | 1 | 1 | 5 |
| Progresso persistido | ✅ | ✅ | ✅ |
| Deep linking | ✅ | ✅ | ✅ |
| Camada de dados | ✅ | ❌ | ✅ |

---

## Arquivos de Referência

| Arquivo | Propósito |
|---------|-----------|
| `docs/ESTRUTURA-PLATAFORMA-MVP.md` | Mockups e padrões visuais |
| `src/data/studyAreas.js` | Áreas de estudo |
| `src/data/bashLearningData.js` | Modelo de dados (padrão) |
| `src/hooks/useAutoSaveNotes.js` | Padrão de persistência |

---

## Changelog

| Data | Mudança |
|------|---------|
| 2025-12-04 | US-003: dataService.js criado (camada de abstração para persistência) |
| 2025-12-04 | US-002: Deep linking de aulas validado e funcionando (callback-as-navigation pattern) |
| 2025-12-04 | US-001: Persistência de progresso implementada (useModuleProgress hook) |
| 2025-12-03 | Migração npm → Bun como runtime principal |
| 2025-12-03 | Criação do MVP v1 (orphan branch) |

---

**Foco:** Menos features, mais qualidade. Cada funcionalidade deve estar 100% antes de avançar.
