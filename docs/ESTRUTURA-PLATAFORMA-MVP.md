# Estrutura da Plataforma MVP - Referência Visual e Funcional

**Versão:** 1.0
**Data:** 2025-12-03
**Status:** Documentação do Estado Atual Funcionando

---

## Visão Geral

Este documento é a **referência única** para a estrutura atual da plataforma.
Documenta apenas o que está **visível e funcionando** no MVP.

```
┌─────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE NAVEGAÇÃO                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🏠 HUB (Página Inicial)                                        │
│   │                                                              │
│   ├── 🎯 Caminhos Propostos                                     │
│   │    └── 🛤️ Backend Developer (exemplo)                       │
│   │         ├── Curso 1: Bash ✅ (disponível)                   │
│   │         ├── Curso 2: Linux 🔒 (em breve)                    │
│   │         ├── Curso 3: Docker 🔒 (em breve)                   │
│   │         └── Curso 4: DevOps 🔒 (em breve)                   │
│   │                                                              │
│   └── 📚 Áreas de Estudo                                        │
│        └── 🐚 Bash ✅ (padrão de referência)                    │
│             ├── Seção 1: Fundamentos (4 módulos)                │
│             ├── Seção 2: Processamento (4 módulos)              │
│             ├── Seção 3: Avançado (4 módulos)                   │
│             └── Seção 4: Ferramentas (4 módulos)                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Página Hub (`/`)

### Componente: `HubView.jsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  🚀 Hub de Aprendizado                                          │
│  Sistema Integrado de Educação em Tecnologia                    │
│  MVP - Padrão de Referência                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐                │
│  │   1    │  │   1    │  │   16   │  │  32h   │                │
│  │  Área  │  │Caminho │  │Módulos │  │Conteúdo│                │
│  └────────┘  └────────┘  └────────┘  └────────┘                │
│                                                                  │
│  ─────────────────────────────────────────────                   │
│  🎯 Caminhos Propostos                                          │
│  Trilhas estruturadas com sequência de cursos                   │
│  ─────────────────────────────────────────────                   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🛤️ Desenvolvedor Backend          │  🎯             │   │
│  │ Caminho de Aprendizado                                  │   │
│  │                                                          │   │
│  │ 🐚 1. Bash Shell Scripting      ✓                       │   │
│  │ 🐧 2. Linux Fundamentals        Em breve                │   │
│  │ 🐳 3. Docker & Containers       Em breve                │   │
│  │ ⚙️ 4. DevOps Essentials         Em breve                │   │
│  │                                                          │   │
│  │ 📖 1/4 cursos  ⏱ 32h disponíveis         →              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ─────────────────────────────────────────────                   │
│  📚 Áreas de Estudo                                             │
│  Cursos completos com vídeo, módulos e caderno                  │
│  ─────────────────────────────────────────────                   │
│                                                                  │
│  ┌─────────────────────────────────┐                            │
│  │ 🐚 Bash                [Integrado]                       │   │
│  │ Shell scripting, automação...                           │   │
│  │ 16 módulos  │  2 cards  │  32h                          │   │
│  └─────────────────────────────────┘                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Dados: `studyAreas.js`

```javascript
// Estrutura padrão de Área de Estudo
{
  bash: {
    name: 'Bash',                              // Nome do curso
    icon: '🐚',                                // Emoji representativo
    description: 'Shell scripting...',        // Descrição curta
    status: 'active',                          // 'active' | 'in-development'
    badge: 'integrated',                       // 'integrated' | 'new' | null
    modules: 16,                               // Número de módulos
    hours: 32,                                 // Horas estimadas
    hasIntegratedApp: true,                    // Tem LearningSystem
    flashcards: {                              // Flashcards por categoria
      basics: {
        name: 'Fundamentos',
        cards: [{ question, answer, code, details }]
      }
    }
  }
}
```

---

## 2. Página Caminho Proposto (`/trilha/:pathId`)

### Componente: `LearningPathView.jsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Voltar ao Hub    🎯 Caminho de Aprendizado                   │
│                     Trilha estruturada e progressiva            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🛤️  Desenvolvedor Backend                     [exemplo] │   │
│  │  Caminho proposto para dominar desenvolvimento backend   │   │
│  │                                                          │   │
│  │  📖 4 cursos   ✓ 1 disponível   ⏱ 106h totais           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  🗺️ Sequência de Cursos                                        │
│  Siga a ordem recomendada para melhor aproveitamento            │
│                                                                  │
│  │                                                               │
│  ●──┬─────────────────────────────────────────────────────────┐ │
│  1  │ 🐚 Bash Shell Scripting      [✓ Disponível]             │ │
│     │ Fundamentos de linha de comando...                      │ │
│     │ 📖 16 módulos  ⏱ 32h               Começar →            │ │
│     └─────────────────────────────────────────────────────────┘ │
│  │                                                               │
│  ○──┬─────────────────────────────────────────────────────────┐ │
│  2  │ 🐧 Linux Fundamentals        [🔒 Em breve]    (opacity) │ │
│     │ Sistema operacional, administração...                   │ │
│     │ 📖 12 módulos  ⏱ 24h                                    │ │
│     └─────────────────────────────────────────────────────────┘ │
│  │                                                               │
│  ...                                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Dados: `caminhoExemploData.js`

```javascript
// Estrutura padrão de Caminho Proposto
{
  id: 'backend-developer',
  name: 'Desenvolvedor Backend',
  icon: '🛤️',
  description: 'Caminho proposto para...',
  badge: 'exemplo',
  cursos: [
    {
      ordem: 1,                    // Posição na sequência
      areaId: 'bash',              // Referência à Área de Estudo
      nome: 'Bash Shell Scripting',
      icone: '🐚',
      descricao: 'Fundamentos...',
      modules: 16,
      hours: 32,
      disponivel: true,            // Clicável ou não
      destaque: 'Padrão de referência'
    }
  ]
}
```

---

## 3. Página de Curso (`/curso/:id`)

### Componente: `*LearningSystem.jsx` (ex: `BashLearningSystem.jsx`)

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Hub > 📖 Curso de Bash                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🏠 Voltar ao Hub                                        75%    │
│  Curso de Bash Shell Scripting                         12/16   │
│  Shell Scripting Robusto → Unix Tools → Pipelines              │
│  ═══════════════════════════════════════════ ▓▓▓▓▓▓▓░░         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────┐  ┌───────────────────────┐│
│  │ ▶ Vídeo do Curso - Shell Script │  │ 📒 Meu Caderno        ││
│  │ ┌────────────────────────────┐  │  │                       ││
│  │ │                            │  │  │ ✓ Salvo automaticam.  ││
│  │ │      YouTube Embed         │  │  │                       ││
│  │ │                            │  │  │ ┌─────────────────┐   ││
│  │ └────────────────────────────┘  │  │ │ Suas notas...   │   ││
│  └──────────────────────────────────┘  │ │                 │   ││
│                                         │ │                 │   ││
│                                         │ └─────────────────┘   ││
│                                         │ 2.5 KB / 50 KB (5%)  ││
│                                         └───────────────────────┘│
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ █ Seção 1: Fundamentos Shell Scripting     (bg-green)    │  │
│  │   História, filosofia software tools e scripts básicos   │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ ┌─────────────────────────────────────────────────────┐   │  │
│  │ │ ✓ 1.1 Introdução ao Curso + História   [📖 Estudar] │   │  │
│  │ │     Entregável: Compreensão da história...          │   │  │
│  │ └─────────────────────────────────────────────────────┘   │  │
│  │ ┌─────────────────────────────────────────────────────┐   │  │
│  │ │ ○ 1.2 Filosofia Software Tools - Parte 1           │   │  │
│  │ │     Entregável: Aplicação dos princípios...         │   │  │
│  │ └─────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ █ Seção 2: Processamento de Texto          (bg-blue)     │  │
│  │   ...                                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Dados: `*LearningData.js` (ex: `bashLearningData.js`)

```javascript
// Estrutura padrão de Seções
export const fasesBash = [
  {
    id: 1,
    nome: "Seção 1: Fundamentos Shell Scripting",
    semanas: "1-4",
    cor: "bg-green-500",            // Cor do header
    corClara: "bg-green-50",        // Cor de fundo
    icone: Terminal,                 // Componente Lucide
    descricao: "História, filosofia..."
  }
];

// Estrutura padrão de Módulos
export const modulosBash = [
  {
    id: '1.1',                       // Identificador único
    nome: 'Introdução ao Curso...',  // Título do módulo
    semana: 1,                       // Número da semana
    fase: 1,                         // Referência à seção
    duracao: '1 semana',
    entregavel: 'Compreensão...',    // O que será aprendido
    temNotas: true                   // Tem subview de notas detalhadas
  }
];
```

---

## 4. Componentes Reutilizáveis

### 4.1 Breadcrumb (`Breadcrumb.jsx`)

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Hub  >  📖 Curso de Bash  >  Aula 1.1  (current)           │
└─────────────────────────────────────────────────────────────────┘
```

```javascript
// Uso padrão
<Breadcrumb
  items={[
    { label: 'Hub', icon: '🏠', onClick: () => navigate('/') },
    { label: 'Curso de Bash', icon: '📖', onClick: () => navigate('/curso/bash') },
    { label: 'Aula 1.1', current: true }
  ]}
/>
```

### 4.2 FlashcardModal (`FlashcardModal.jsx`)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                          ✕     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │         Como criar uma variável em Bash?                │   │
│  │                  (frente - laranja)                      │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│           [← Anterior]  [🔄 Virar]  [Próximo →]                │
│                                                                  │
│                     Cartão 1 de 2                               │
└─────────────────────────────────────────────────────────────────┘
```

```javascript
// Estrutura de um Flashcard
{
  question: 'Como criar uma variável em Bash?',
  answer: 'VARIAVEL="valor" (sem espaços ao redor do =)',
  code: 'NAME="Developer"\necho $NAME',
  details: 'Em Bash, não use espaços ao redor do =\n...'
}
```

### 4.3 Caderno de Notas (inline em LearningSystem)

```
┌──────────────────────────────────────┐
│ 📒 Meu Caderno de Notas   ✓ Salvo   │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │ Digite suas anotações sobre...   │ │
│ │                                   │ │
│ │ • Comandos importantes            │ │
│ │ • Pipelines úteis                 │ │
│ │                                   │ │
│ └──────────────────────────────────┘ │
│                                       │
│ 🐚 Auto-save       2.5 KB / 50 KB   │
└──────────────────────────────────────┘
```

**Funcionalidades (US-041):**
- Auto-save com debounce 1s
- Limite 50KB por nota
- Indicador de status (salvando/salvo/erro)
- Tratamento de QuotaExceededError

---

## 5. Padrões de Cores e Visual

### Cores por Seção

| Seção | Header | Fundo |
|-------|--------|-------|
| Fundamentos | `bg-green-500` | `bg-green-50` |
| Processamento | `bg-blue-500` | `bg-blue-50` |
| Avançado | `bg-purple-500` | `bg-purple-50` |
| Ferramentas | `bg-orange-500` | `bg-orange-50` |

### Status Visual

| Estado | Cor | Ícone |
|--------|-----|-------|
| Disponível | `text-green-600` | `CheckCircle` |
| Em breve | `text-gray-400` | `Lock` |
| Completo | `bg-green-50 border-green-200` | `CheckCircle` ✓ |
| Pendente | `bg-gray-50 border-gray-200` | `Circle` ○ |

### Tipografia

| Nível | Classe | Uso |
|-------|--------|-----|
| H1 | `text-4xl font-bold` | Título do Hub |
| H2 | `text-3xl font-bold` | Seção do Hub |
| H3 | `text-2xl font-bold` | Nome do Curso |
| H4 | `font-medium` | Título do Módulo |

---

## 6. Rotas Funcionais

| Rota | Componente | Status |
|------|------------|--------|
| `/` | HubView | ✅ Funcional |
| `/curso/bash` | BashLearningSystem | ✅ Funcional |
| `/trilha/backend-developer` | LearningPathView | ✅ Funcional |
| `/curso/bash/aula/:id` | (subview) | ⚠️ Bug: URL não atualiza |

---

## 7. Estado Atual do MVP

### O que está funcionando

- ✅ Hub com 1 Área de Estudo (Bash)
- ✅ Hub com 1 Caminho Proposto (Backend Developer)
- ✅ Navegação Hub → Curso → Hub
- ✅ Navegação Hub → Caminho → Curso → Hub
- ✅ 16 módulos com checkbox de progresso
- ✅ 4 seções coloridas
- ✅ Caderno de notas com auto-save
- ✅ Breadcrumb hierárquico
- ✅ Flashcards interativos 3D
- ✅ Vídeo YouTube embedado
- ✅ Barra de progresso visual
- ✅ Persistência de notas (localStorage)

### O que precisa de correção

- ⚠️ Deep linking para aulas (URL não atualiza ao clicar em módulo)
- ⚠️ Botão voltar do navegador não funciona em aulas

---

## 8. Próximos Passos (Simplificados)

### Prioridade 1: Corrigir Navegação

1. Migrar `setCurrentSubView` → `navigate()` em BashLearningSystem
2. Implementar rota `/curso/:id/aula/:aulaId`
3. Validar deep linking funciona

### Prioridade 2: Adicionar Conteúdo

1. Reativar mais Áreas de Estudo (C, Rust, VSCode, ClaudeCode)
2. Padronizar todas ao modelo Bash
3. Adicionar flashcards

### Prioridade 3: Persistência

1. Persistir progresso de módulos (checkboxes)
2. Sincronizar com localStorage

---

**Este documento é a referência para qualquer desenvolvimento futuro.**
**Atualize-o sempre que adicionar novos padrões ou componentes.**
