# Roadmap MVP - Plataforma de Aprendizado

**Versão:** 1.0 MVP
**Data:** 2025-12-03
**Branch:** `mvp-v1` (orphan - início limpo)
**Foco:** Backend, Persistência e Estrutura Funcional

---

## Visão do MVP

Plataforma de aprendizado técnico com foco em:
- ✅ Interface funcional (Hub, Cursos, Caminhos)
- 🎯 Persistência de progresso
- 🎯 Navegação por URL (deep linking)
- 🎯 Estrutura escalável

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
| Deep linking aulas | 🔴 P0 | URL não atualiza ao clicar em módulo |
| Persistir progresso | 🔴 P0 | Checkboxes se perdem ao recarregar |
| Rotas de aulas | 🟡 P1 | Implementar `/curso/:id/aula/:aulaId` |

---

## Backlog Priorizado

### Sprint 1: Persistência (P0)

#### US-001: Persistir Progresso de Módulos

**Como** usuário estudando
**Quero** que meu progresso seja salvo
**Para** não perder ao recarregar a página

**Critérios de Aceite:**
- [ ] Hook `useModuleProgress` criado
- [ ] Progresso salvo em localStorage por curso
- [ ] Carrega progresso ao montar componente
- [ ] Sincroniza estado React ↔ localStorage
- [ ] Tratamento de erros (QuotaExceededError)

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

#### US-002: Corrigir Navegação de Aulas

**Como** usuário navegando
**Quero** que a URL reflita minha posição
**Para** compartilhar links e usar botão voltar

**Critérios de Aceite:**
- [ ] Migrar `setCurrentSubView` → `navigate()`
- [ ] Rota `/curso/:id/aula/:aulaId` funciona
- [ ] Deep linking para aulas OK
- [ ] Botão voltar do navegador funciona
- [ ] Breadcrumb reflete posição

**Arquivos a modificar:**
- `BashLearningSystem.jsx`
- `SistemaEducacionalCompleto.jsx` (rotas)

**Complexidade:** 8 pontos

---

### Sprint 2: Estrutura de Dados (P1)

#### US-003: API de Dados Local

**Como** desenvolvedor
**Quero** camada de abstração para dados
**Para** facilitar futura migração para backend

**Critérios de Aceite:**
- [ ] Serviço `dataService.js` criado
- [ ] Métodos: getCourses, getProgress, saveProgress
- [ ] Abstrai localStorage (pode trocar por API)
- [ ] Tipagem com JSDoc

**Estrutura:**
```javascript
// src/services/dataService.js
export const dataService = {
  getCourses: () => {...},
  getCourse: (id) => {...},
  getProgress: (courseId) => {...},
  saveProgress: (courseId, data) => {...},
  getNotes: (courseId) => {...},
  saveNotes: (courseId, content) => {...}
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
| Progresso persistido | ❌ | ✅ | ✅ |
| Deep linking | ❌ | ✅ | ✅ |
| Camada de dados | ❌ | ❌ | ✅ |

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
| 2025-12-03 | Migração npm → Bun como runtime principal |
| 2025-12-03 | Criação do MVP v1 (orphan branch) |

---

**Foco:** Menos features, mais qualidade. Cada funcionalidade deve estar 100% antes de avançar.
