# Roadmap MVP - Plataforma de Aprendizado

**Versão:** 1.1 MVP + NocoDB
**Data:** 2026-01-22
**Branch:** `demo-nocodb-simple` (baseada em `mvp-v1`)
**Foco:** Backend, Persistência, Dashboard para Personas Não Técnicas

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

### Sprint 2: Estrutura de Dados (P1) ✅ COMPLETA

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

#### US-004: Refatorar Estrutura de Dados ✅ DONE

**Como** desenvolvedor
**Quero** estrutura de dados consistente
**Para** facilitar manutenção

**Critérios de Aceite:**
- [x] Analisar formato atual de `*LearningData.js` (bash, c, rust)
- [x] Schema documentado com tipos JSDoc (Phase, Module, CourseData)
- [x] Validação de dados em runtime (validateCourseData)
- [x] Constantes de validação (cores Tailwind, padrão de ID)
- [ ] Migração de dados antigos (não necessário - estrutura já consistente)

**Arquivo criado:** `src/data/schema.js`
```javascript
// Tipos principais
Phase: { id, nome, semanas, cor, corClara, icone, descricao }
Module: { id, nome, semana, fase, duracao, entregavel, temNotas? }
CourseData: { fases[], modulos[], startDate }

// Funções de validação
validatePhase(phase, index) => string[]
validateModule(module, index, validPhaseIds) => { errors, warnings }
validateCourseData(data, courseId) => ValidationResult
```

**Complexidade:** 5 pontos

---

### Sprint 3: Dashboard NocoDB (P1) ✅ COMPLETA

#### US-005: Implementar Backend PostgreSQL + NocoDB ✅ DONE

**Como** gestor não técnico (RH, Tech Lead, C-Level)
**Quero** visualizar progresso dos alunos em dashboard visual
**Para** tomar decisões baseadas em dados sem precisar programar

**Critérios de Aceite:**
- [x] Schema PostgreSQL criado (`database/init.sql`)
- [x] Dados seed incluídos (`database/seed.sql`)
- [x] Docker Compose configurado (`docker-compose.nocodb.yml`)
- [x] NocoDB acessível em http://localhost:8080
- [x] 8 tabelas + 3 views de analytics
- [x] Dados realistas: 2 empresas, 7 usuários, 16 módulos
- [x] Documentação completa para não-técnicos
- [x] Setup em ~10 minutos

**Estrutura implementada:**

```
PostgreSQL 16
├── Tabelas (8)
│   ├── companies      → Empresas clientes
│   ├── users          → Usuários (admins, teachers, students)
│   ├── courses        → Catálogo de cursos (1: Bash)
│   ├── phases         → Fases do curso (4)
│   ├── modules        → Módulos/aulas (16)
│   ├── user_progress  → Progresso de conclusão
│   ├── study_notes    → Caderno de notas
│   └── audit_logs     → Logs de auditoria
│
└── Views Analytics (3)
    ├── v_company_progress  → Progresso por empresa
    ├── v_user_dashboard    → Dashboard individual
    └── v_course_stats      → Estatísticas do curso
```

**Personas atendidas:**
1. **Gestor de RH / T&D** - Ver ROI, exportar relatórios
2. **Tech Lead / Instrutor** - Acompanhar júniores, identificar módulos difíceis
3. **C-Level** - Apresentar métricas para board, justificar budget

**Documentação criada:**
- `docs/backend/NOCODB-QUICKSTART.md` - Setup em 10 min
- `docs/backend/PERSONAS-NAO-TECNICAS.md` - Como cada persona usa
- `database/README.md` - Estrutura do banco

**Complexidade:** 13 pontos

**Benefícios:**
- ✅ Gestores veem progresso em tempo real
- ✅ Exportação Excel com 1 clique
- ✅ Sem código necessário para gerenciar dados
- ✅ Multi-tenancy (2+ empresas)
- ✅ Economia R$ 270k/ano vs Udemy

---

### Sprint 4: Expansão Controlada (P2)

#### US-006: Reativar Áreas Comentadas

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

Persistência (Dual):
  client: localStorage (hooks customizados, 50KB/nota)
  server: PostgreSQL 16 + NocoDB (dashboard visual)
  pattern: Ambos coexistem (migração gradual)

Backend (NocoDB):
  database: PostgreSQL 16
  dashboard: NocoDB Community Edition
  interface: Spreadsheet-like (sem SQL)
  api: REST auto-gerada
  auth: Email/password
  deploy: Docker Compose
  
Admin Interface:
  acesso: http://localhost:8080
  usuarios: Gestores RH, Tech Leads, C-Level
  funcoes: Ver progresso, adicionar users, exportar Excel
```

---

## Métricas

| Métrica | Sprint 1 | Sprint 2 | Sprint 3 (Atual) |
|---------|----------|----------|------------------|
| Áreas visíveis | 1 | 1 | 1 |
| Progresso persistido | ✅ | ✅ | ✅ (dual) |
| Deep linking | ✅ | ✅ | ✅ |
| Camada de dados | ❌ | ✅ | ✅ |
| Dashboard visual | ❌ | ❌ | ✅ |
| Multi-tenancy | ❌ | ❌ | ✅ |
| Exportação Excel | ❌ | ❌ | ✅ |
| Personas não-técnicas | ❌ | ❌ | ✅ (3) |

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
| 2026-01-22 | Sprint 3: NocoDB + PostgreSQL implementado (US-005) |
| 2026-01-22 | Criado: database/init.sql, seed.sql, docker-compose.nocodb.yml |
| 2026-01-22 | Documentação: NOCODB-QUICKSTART.md, PERSONAS-NAO-TECNICAS.md |
| 2026-01-22 | Branch demo-nocodb-simple criada (baseada em mvp-v1) |
| 2025-12-04 | US-004: schema.js criado (tipos JSDoc + validação de dados) |
| 2025-12-04 | US-003: dataService.js criado (camada de abstração para persistência) |
| 2025-12-04 | US-002: Deep linking de aulas validado e funcionando (callback-as-navigation pattern) |
| 2025-12-04 | US-001: Persistência de progresso implementada (useModuleProgress hook) |
| 2025-12-03 | Migração npm → Bun como runtime principal |
| 2025-12-03 | Criação do MVP v1 (orphan branch) |

---

**Foco:** Menos features, mais qualidade. Cada funcionalidade deve estar 100% antes de avançar.
