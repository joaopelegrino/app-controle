# 04. Modelo de Domínio - Organizador de Base de Conhecimento Enterprise

> **Hierarquia e Relacionamentos do Sistema**
>
> **Versão:** 1.0.0
> **Data:** 2025-11-14
> **Status:** ✅ Ativo - Baseado na Release 1.0

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Hierarquia de 4 Níveis](#hierarquia-de-4-níveis)
3. [Entidades do Domínio](#entidades-do-domínio)
4. [Relacionamentos](#relacionamentos)
5. [Fluxos de Dados](#fluxos-de-dados)
6. [Regras de Negócio](#regras-de-negócio)
7. [Exemplos Práticos](#exemplos-práticos)
8. [Referências](#referências)

---

## Visão Geral

O **Organizador de Base de Conhecimento Enterprise** estrutura conteúdo educacional em uma hierarquia clara de 4 níveis, onde cada nível tem responsabilidades e relacionamentos bem definidos.

### Princípios de Design

1. **Hierarquia Clara:** Hub → Curso → Aula → Prática (4 níveis)
2. **Separação de Responsabilidades:** Cada entidade tem um propósito único
3. **Composição sobre Herança:** Entidades são compostas de outras entidades
4. **Navegação Previsível:** Breadcrumb sempre reflete a hierarquia
5. **Persistência Local:** Dados críticos (progresso, notas) em localStorage

---

## Hierarquia de 4 Níveis

### Diagrama Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                         Nível 1: Hub                            │
│                     (Página Inicial)                            │
│                                                                 │
│  [🏠 Hub]  ──────────────────────────────────────────────────  │
│     │                                                           │
│     │  Contém: Áreas de Estudo (cards visuais)                 │
│     │  Navegação: Cards clicáveis                               │
│     │  Breadcrumb: "Hub" ou sem breadcrumb                      │
│     │                                                           │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 1:N (Hub contém múltiplas Áreas)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Nível 1.5: Área de Estudo                      │
│                  (Agrupamento Lógico)                           │
│                                                                 │
│  [📚 Área: Bash Shell Scripting]  ────────────────────────────  │
│     │                                                           │
│     │  Contém: 1 Curso                                          │
│     │  Metadados: Título, Ícone, Descrição                      │
│     │  Função: Categorização no Hub                             │
│     │                                                           │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 1:1 (Área contém 1 Curso - Release 1.0)
       │      (Futuro: 1:N - Área pode ter múltiplos Cursos)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Nível 2: Curso                             │
│              (Sistema de Aprendizado Estruturado)               │
│                                                                 │
│  [📖 Curso de Bash]  ──────────────────────────────────────────  │
│     │                                                           │
│     │  Contém: Múltiplas Seções                                 │
│     │  Progresso: "5 de 16 aulas completadas"                   │
│     │  Navegação: Lista de Seções → Aulas                       │
│     │  Breadcrumb: "Hub > Curso de Bash"                        │
│     │  Recursos: Caderno de Notas, Flash Cards                  │
│     │                                                           │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 1:N (Curso contém múltiplas Seções)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Nível 2.5: Seção                           │
│                  (Agrupamento de Aulas)                         │
│                                                                 │
│  [📂 Seção: Fundamentos]  ─────────────────────────────────────  │
│     │                                                           │
│     │  Contém: 2-10 Aulas relacionadas                          │
│     │  Função: Categorização pedagógica                         │
│     │  Visual: Cabeçalho colapsável (futuro)                    │
│     │                                                           │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 1:N (Seção contém múltiplas Aulas)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Nível 3: Aula                              │
│                 (Unidade de Conteúdo)                           │
│                                                                 │
│  [📝 Aula 1.1: Introdução ao Bash]  ───────────────────────────  │
│     │                                                           │
│     │  Contém: Conteúdo (texto, vídeo, código)                  │
│     │  Duração: "2h30min"                                        │
│     │  Progresso: Não iniciado | Em andamento | Concluído       │
│     │  Breadcrumb: "Hub > Curso de Bash > Aula 1.1"             │
│     │  Interação: Leitura, Anotações, Marcar Concluída          │
│     │                                                           │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 1:1 (Aula pode ter 1 Prática - Release 3.0+)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Nível 4: Prática                           │
│                 (Exercício Hands-On)                            │
│                                                                 │
│  [🎯 Prática: Criar Script de Backup]  ────────────────────────  │
│     │                                                           │
│     │  Contém: Desafio, Validação, Feedback                     │
│     │  Tipo: Quiz, Código, Projeto                              │
│     │  Status: Não tentado | Em progresso | Completo            │
│     │  Nota: 0-100 (opcional)                                    │
│     │                                                           │
└─────────────────────────────────────────────────────────────────┘

Status: 📋 Planejado (Release 3.0 - Q2 2026)
```

---

## Entidades do Domínio

### Entidade 1: Hub

**Descrição:** Página inicial onde usuário visualiza todas as áreas de estudo disponíveis.

**Atributos:**
```typescript
interface Hub {
  title: string;              // "Áreas de Estudo"
  studyAreas: StudyArea[];    // Lista de áreas disponíveis
  inDevelopmentAreas: StudyArea[];  // Áreas descontinuadas (US-070)
}
```

**Responsabilidades:**
- Exibir cards de áreas de estudo
- Filtrar áreas ativas vs. em desenvolvimento
- Navegação para Cursos ou Caminhos de Aprendizado

**Exemplo de Dados:**
```javascript
const hub = {
  title: "Áreas de Estudo",
  studyAreas: [
    { id: "bash", title: "Bash Shell Scripting", hasSystem: true },
    { id: "c", title: "C Programming", hasSystem: true },
    // ... 4 mais
  ],
  inDevelopmentAreas: [
    { id: "servidores", title: "Servidores Linux", hasSystem: false },
    // ... 6 mais
  ]
};
```

**Localização no Código:**
- Componente: `src/components/HubView.jsx`
- Dados: `src/data/studyAreas.js`

---

### Entidade 2: Área de Estudo

**Descrição:** Categoria temática que agrupa um ou mais Cursos (Release 1.0: 1 curso por área).

**Atributos:**
```typescript
interface StudyArea {
  id: string;                 // "bash"
  title: string;              // "Bash Shell Scripting"
  icon: string;               // "📖"
  description: string;        // "Domine o shell..."
  hasSystem: boolean;         // true = tem curso integrado
  color: string;              // "bg-green-500"
  videoUrl?: string;          // URL do vídeo introdutório
}
```

**Responsabilidades:**
- Representar domínio de conhecimento
- Agrupar cursos relacionados (futuro: 1:N)
- Fornecer metadados para exibição no Hub

**Exemplo de Dados:**
```javascript
{
  id: "bash",
  title: "Bash Shell Scripting",
  icon: "📖",
  description: "Domine o shell Bash e automação de tarefas",
  hasSystem: true,
  color: "bg-green-500",
  videoUrl: "https://youtube.com/watch?v=..."
}
```

**Localização no Código:**
- Dados: `src/data/studyAreas.js` (array de 13 áreas)

---

### Entidade 3: Curso

**Descrição:** Sistema de aprendizado estruturado com múltiplas aulas organizadas em seções.

**Atributos:**
```typescript
interface Course {
  id: string;                 // "bash"
  title: string;              // "Curso de Bash Shell Scripting"
  description: string;        // Descrição marketing
  icon: string;               // "📖"
  totalLessons: number;       // 16
  completedLessons: number;   // 5 (calculado dinamicamente)
  estimatedTime: string;      // "40h"
  sections: Section[];        // Lista de seções
  flashcards?: Flashcard[];   // Flash cards (opcional)
}
```

**Responsabilidades:**
- Organizar conteúdo em seções
- Calcular progresso total (X de Y aulas)
- Fornecer sistema de notas (Caderno)
- Gerenciar flash cards (revisão)

**Exemplo de Dados:**
```javascript
{
  id: "bash",
  title: "Curso de Bash Shell Scripting",
  description: "Aprenda desde o básico até automação avançada",
  icon: "📖",
  totalLessons: 16,
  estimatedTime: "40h",
  sections: [
    {
      sectionTitle: "Fundamentos",
      modules: [
        { id: "bash-1-1", title: "Aula 1.1: Introdução", duration: "2h30min" },
        { id: "bash-1-2", title: "Aula 1.2: Variáveis", duration: "3h" }
      ]
    },
    // ... mais seções
  ],
  flashcards: [
    { id: 1, front: "O que é um Pipeline?", back: "...", category: "basics" }
  ]
}
```

**Localização no Código:**
- Componente: `src/components/BashLearningSystem.jsx` (exemplo)
- Dados: `src/data/bashLearningData.js`

---

### Entidade 4: Seção

**Descrição:** Agrupamento lógico de aulas dentro de um Curso (ex: "Fundamentos", "Comandos Avançados").

**Atributos:**
```typescript
interface Section {
  sectionTitle: string;       // "Fundamentos"
  modules: Lesson[];          // Array de aulas (nome legado: "modules")
}
```

**Responsabilidades:**
- Categorizar aulas por tema
- Facilitar navegação (futuro: seções colapsáveis)
- Estruturar progressão pedagógica

**Exemplo de Dados:**
```javascript
{
  sectionTitle: "Fundamentos",
  modules: [
    { id: "bash-1-1", title: "Aula 1.1: Introdução ao Bash", duration: "2h30min" },
    { id: "bash-1-2", title: "Aula 1.2: Variáveis e Tipos", duration: "3h" }
  ]
}
```

**Nota Técnica:** O campo `modules` é nomenclatura legada do código, mas cada item representa uma **Aula**.

---

### Entidade 5: Aula

**Descrição:** Unidade mínima de conteúdo educacional. Contém texto, vídeo, código e permite anotações.

**Atributos:**
```typescript
interface Lesson {
  id: string;                 // "bash-1-1"
  title: string;              // "Aula 1.1: Introdução ao Bash"
  duration: string;           // "2h30min"
  content: string;            // Markdown (texto + código)
  videoUrl?: string;          // URL do vídeo (opcional)
  completed: boolean;         // Status de conclusão
}
```

**Responsabilidades:**
- Apresentar conteúdo educacional
- Permitir anotações no Caderno
- Rastrear status de conclusão
- Exibir breadcrumb completo (Hub > Curso > Aula)

**Exemplo de Dados:**
```javascript
{
  id: "bash-1-1",
  title: "Aula 1.1: Introdução ao Bash",
  duration: "2h30min",
  content: `
# Introdução ao Bash

O Bash (Bourne Again Shell) é...

## Conceitos Básicos

\`\`\`bash
echo "Hello World"
\`\`\`
  `,
  videoUrl: "https://youtube.com/watch?v=...",
  completed: false
}
```

**Localização no Código:**
- Exibição: Dentro de componentes `*LearningSystem.jsx`
- Dados: Arrays `modules` dentro de `sections` em `*LearningData.js`

---

### Entidade 6: Caderno de Notas

**Descrição:** Sistema de anotações pessoais do usuário, persistido localmente, separado por curso.

**Atributos:**
```typescript
interface NotesSystem {
  courseId: string;           // "bash"
  content: string;            // Texto das notas (Markdown)
  lastSaved: Date;            // Timestamp do último save
  saveStatus: "idle" | "saving" | "saved" | "error";
}
```

**Responsabilidades:**
- Auto-save a cada 500ms (debounce)
- Persistir em localStorage (`ultrathink_notes_${courseId}`)
- Feedback visual de salvamento
- Limite de 50KB por curso

**Exemplo de localStorage:**
```javascript
// Key: ultrathink_notes_bash
// Value:
{
  content: "# Minhas anotações\n\n- Pipeline = comando1 | comando2\n- Redirecionamento: > e >>",
  lastSaved: "2025-11-14T10:30:00Z"
}
```

**Localização no Código:**
- Componente: `src/components/BashNotesView.jsx` (exemplo)
- Hook: `useAutoSaveNotes` (planejado em US-043)

---

### Entidade 7: Flash Card

**Descrição:** Cartão interativo 3D para memorização ativa de conceitos técnicos.

**Atributos:**
```typescript
interface Flashcard {
  id: number;                 // 1
  front: string;              // Pergunta ou termo
  back: string;               // Resposta ou definição
  category: "basics" | "commands" | "advanced";
}
```

**Responsabilidades:**
- Apresentar conceito (frente)
- Revelar resposta (verso) com animação 3D flip
- Categorizar por dificuldade

**Exemplo de Dados:**
```javascript
{
  id: 1,
  front: "O que é um Pipeline no Bash?",
  back: "Encadeamento de comandos usando | (pipe) para passar a saída de um comando como entrada de outro. Exemplo: cat file.txt | grep 'error' | wc -l",
  category: "basics"
}
```

**Localização no Código:**
- Componente: `src/components/FlashcardModal.jsx`
- Dados: Array `flashcards` dentro de `*LearningData.js`

---

### Entidade 8: Progresso de Aulas

**Descrição:** Sistema de rastreamento de conclusão de aulas, persistido localmente.

**Atributos:**
```typescript
interface LessonProgress {
  courseId: string;           // "bash"
  completedLessons: string[]; // ["bash-1-1", "bash-1-2", "bash-1-3"]
  lastUpdated: Date;          // Timestamp
}
```

**Responsabilidades:**
- Marcar aulas como concluídas
- Calcular % de progresso (5 de 16 = 31%)
- Persistir em localStorage
- Sincronizar com UI (checkboxes)

**Exemplo de localStorage:**
```javascript
// Key: ultrathink_progress_bash
// Value:
{
  completedLessons: ["bash-1-1", "bash-1-2", "bash-2-1"],
  lastUpdated: "2025-11-14T10:30:00Z"
}
```

**Localização no Código:**
- Lógica: Dentro de componentes `*LearningSystem.jsx`
- Hook: `useModuleProgress` (planejado em US-042)

---

### Entidade 9: Breadcrumb

**Descrição:** Componente de navegação hierárquica que mostra caminho atual (Hub > Curso > Aula).

**Atributos:**
```typescript
interface BreadcrumbItem {
  label: string;              // "Hub", "Curso de Bash", "Aula 1.1"
  icon: string;               // "🏠", "📖", "📝"
  onClick?: () => void;       // Handler de navegação
  current?: boolean;          // true para item atual
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];    // Array de items
}
```

**Responsabilidades:**
- Mostrar caminho hierárquico (máx 3 níveis)
- Permitir navegação clicável
- Acessibilidade WCAG 2.1 AA
- Responsividade (colapsa em mobile)

**Exemplo de Uso:**
```jsx
<Breadcrumb items={[
  { label: 'Hub', icon: '🏠', onClick: () => navigate('hub') },
  { label: 'Curso de Bash', icon: '📖', onClick: () => navigate('bash') },
  { label: 'Aula 1.1', icon: '📝', current: true }
]} />
```

**Localização no Código:**
- Componente: `src/components/Breadcrumb.jsx`
- Uso: Integrado em `*LearningSystem.jsx` e `*NotesView.jsx`

---

## Relacionamentos

### Diagrama de Relacionamentos Completo

```
┌─────────────┐
│     Hub     │ (1)
└──────┬──────┘
       │
       │ 1:N
       │ "contém"
       ▼
┌─────────────────┐
│ Área de Estudo  │ (13 no total, 6 ativas)
└────────┬────────┘
         │
         │ 1:1 (Release 1.0)
         │ 1:N (Futuro)
         │ "possui"
         ▼
┌─────────────────┐
│      Curso      │ (5 ativos + 1 caminho)
└────────┬────────┘
         │
         ├─────── 1:N ──────> [Seção] (2-10 por curso)
         │        "organiza"
         │
         ├─────── 1:1 ──────> [Caderno de Notas]
         │        "associa"
         │
         └─────── 1:N ──────> [Flash Card] (0-50 por curso)
                  "possui"

┌─────────────────┐
│      Seção      │
└────────┬────────┘
         │
         │ 1:N
         │ "agrupa"
         ▼
┌─────────────────┐
│      Aula       │ (227 no total)
└────────┬────────┘
         │
         ├─────── 1:1 ──────> [Prática] (Futuro)
         │        "possui"
         │
         └─────── N:1 ──────> [Progresso]
                  "rastreia"

┌─────────────────┐
│   Breadcrumb    │ (Componente transversal)
└────────┬────────┘
         │
         │ N:1 (Breadcrumb referencia múltiplas entidades)
         │
         ├─────── "aponta para" ──────> [Hub]
         ├─────── "aponta para" ──────> [Curso]
         └─────── "aponta para" ──────> [Aula]
```

---

### Matriz de Relacionamentos

| De \ Para | Hub | Área | Curso | Seção | Aula | Caderno | Flash Card | Progresso | Breadcrumb |
|-----------|-----|------|-------|-------|------|---------|------------|-----------|------------|
| **Hub** | - | 1:N | - | - | - | - | - | - | 1:1 |
| **Área** | N:1 | - | 1:1 | - | - | - | - | - | - |
| **Curso** | - | 1:1 | - | 1:N | - | 1:1 | 1:N | 1:1 | 1:1 |
| **Seção** | - | - | N:1 | - | 1:N | - | - | - | - |
| **Aula** | - | - | - | N:1 | - | - | - | N:1 | 1:1 |
| **Caderno** | - | - | 1:1 | - | - | - | - | - | - |
| **Flash Card** | - | - | N:1 | - | - | - | - | - | - |
| **Progresso** | - | - | 1:1 | - | 1:N | - | - | - | - |
| **Breadcrumb** | 1:1 | - | 1:1 | - | 1:1 | - | - | - | - |

**Legenda:** 1:1 (um para um), 1:N (um para muitos), N:1 (muitos para um)

---

## Fluxos de Dados

### Fluxo 1: Navegação do Hub até Aula

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Usuário acessa Hub                                        │
├──────────────────────────────────────────────────────────────┤
│ [HubView.jsx]                                                │
│   ↓ Lê dados de studyAreas.js                               │
│   ↓ Renderiza cards (6 ativas + 7 em desenvolvimento)       │
│   ↓ Usuário clica em card "Bash Shell Scripting"            │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ Navigate to: /bash (futuro com React Router)
         │ Atualmente: setState('bash')
         ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. Sistema exibe Curso de Bash                              │
├──────────────────────────────────────────────────────────────┤
│ [BashLearningSystem.jsx]                                     │
│   ↓ Lê dados de bashLearningData.js                         │
│   ↓ Renderiza Breadcrumb: "Hub > Curso de Bash"             │
│   ↓ Lista Seções com Aulas                                   │
│   ↓ Calcula progresso: "5 de 16 aulas completadas"          │
│   ↓ Usuário clica em "Aula 1.1: Introdução ao Bash"         │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ setState('aula-1-1')
         ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. Sistema exibe conteúdo da Aula 1.1                       │
├──────────────────────────────────────────────────────────────┤
│ [BashLearningSystem.jsx - seção de conteúdo]                │
│   ↓ Renderiza Breadcrumb: "Hub > Curso de Bash > Aula 1.1"  │
│   ↓ Exibe conteúdo Markdown                                  │
│   ↓ Carrega vídeo (se videoUrl presente)                     │
│   ↓ Botão "📖 Estudar" → Abre NotesView                     │
│   ↓ Checkbox "Marcar como concluída"                         │
└──────────────────────────────────────────────────────────────┘
```

---

### Fluxo 2: Auto-save de Notas

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Usuário digita no Caderno de Notas                       │
├──────────────────────────────────────────────────────────────┤
│ [BashNotesView.jsx]                                          │
│   ↓ onChange event triggered                                 │
│   ↓ setState(newContent)                                     │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ Debounce de 500ms
         ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. Hook useAutoSaveNotes (Futuro - US-041)                  │
├──────────────────────────────────────────────────────────────┤
│ useEffect(() => {                                            │
│   const timer = setTimeout(() => {                           │
│     try {                                                    │
│       localStorage.setItem(                                  │
│         `ultrathink_notes_bash`,                             │
│         JSON.stringify({ content, lastSaved: Date.now() })   │
│       );                                                     │
│       setSaveStatus('saved');                                │
│     } catch (error) {                                        │
│       if (error.name === 'QuotaExceededError') {            │
│         alert('Limite de 50KB excedido');                    │
│       }                                                      │
│       setSaveStatus('error');                                │
│     }                                                        │
│   }, 500);                                                   │
│   return () => clearTimeout(timer);                          │
│ }, [content]);                                               │
└──────────────────────────────────────────────────────────────┘
         │
         │ localStorage.setItem()
         ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. Dados persistidos em localStorage                        │
├──────────────────────────────────────────────────────────────┤
│ Key: ultrathink_notes_bash                                   │
│ Value: { content: "...", lastSaved: 1731592200000 }         │
│                                                              │
│ Feedback visual: "✓ Salvo automaticamente"                  │
└──────────────────────────────────────────────────────────────┘
```

---

### Fluxo 3: Marcação de Aula como Concluída

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Usuário clica em checkbox "Marcar como concluída"        │
├──────────────────────────────────────────────────────────────┤
│ [BashLearningSystem.jsx]                                     │
│   ↓ handleCompleteLesson('bash-1-1')                         │
└────────┬─────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. Atualiza estado e localStorage                           │
├──────────────────────────────────────────────────────────────┤
│ const handleCompleteLesson = (lessonId) => {                │
│   // 1. Atualiza estado local                               │
│   setCompletedLessons(prev => [...prev, lessonId]);         │
│                                                              │
│   // 2. Lê progresso atual do localStorage                  │
│   const progress = JSON.parse(                               │
│     localStorage.getItem('ultrathink_progress_bash') || '{}' │
│   );                                                         │
│                                                              │
│   // 3. Adiciona nova aula completada                       │
│   progress.completedLessons = [                              │
│     ...(progress.completedLessons || []),                    │
│     lessonId                                                 │
│   ];                                                         │
│   progress.lastUpdated = Date.now();                         │
│                                                              │
│   // 4. Salva no localStorage                               │
│   localStorage.setItem(                                      │
│     'ultrathink_progress_bash',                              │
│     JSON.stringify(progress)                                 │
│   );                                                         │
│                                                              │
│   // 5. Recalcula progresso visual                          │
│   const completed = progress.completedLessons.length;        │
│   const total = 16; // Total de aulas do curso              │
│   setProgressText(`${completed} de ${total} aulas`);        │
│ };                                                           │
└────────┬─────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. UI atualizada em tempo real                              │
├──────────────────────────────────────────────────────────────┤
│ - Checkbox marcado: ✓                                        │
│ - Progresso atualizado: "6 de 16 aulas completadas"         │
│ - Barra de progresso: 37.5% (futuro)                        │
└──────────────────────────────────────────────────────────────┘
```

---

## Regras de Negócio

### RN-01: Hierarquia Obrigatória

**Regra:** Toda Aula DEVE pertencer a uma Seção, e toda Seção DEVE pertencer a um Curso.

**Validação:**
```javascript
// Validar estrutura de dados ao carregar
function validateCourseStructure(course) {
  if (!course.sections || course.sections.length === 0) {
    throw new Error('Curso deve ter ao menos 1 seção');
  }

  course.sections.forEach(section => {
    if (!section.modules || section.modules.length === 0) {
      throw new Error(`Seção "${section.sectionTitle}" deve ter ao menos 1 aula`);
    }
  });
}
```

**Impacto:** Garante consistência de navegação e breadcrumb.

---

### RN-02: Limite de Notas por Curso

**Regra:** Cada curso pode armazenar até 50KB de notas no localStorage.

**Validação:**
```javascript
function saveNotes(courseId, content) {
  const sizeInBytes = new Blob([content]).size;
  const maxSize = 50 * 1024; // 50KB

  if (sizeInBytes > maxSize) {
    throw new Error('Limite de 50KB excedido. Exporte suas notas ou reduza o tamanho.');
  }

  localStorage.setItem(`ultrathink_notes_${courseId}`, content);
}
```

**Justificativa:** localStorage tem limite de ~5MB. Com 5 cursos, cada um pode ter até 50KB.

**Referência:** US-041 (planejado)

---

### RN-03: Nomenclatura Consistente (ÉPICO 12)

**Regra:** Termos padronizados devem ser usados em toda UI:
- ✅ "Curso" (não "Sistema de Aprendizado")
- ✅ "Aula" (não "Módulo")
- ✅ "Seção" (não "FASE")
- ✅ "Caderno de Notas" (não "Notas Rápidas")
- ✅ "📖 Estudar" (não "Ver Notas")

**Validação:** Skill `ux-nomenclature` enforce automaticamente.

**Referência:** US-060 (100% completo)

---

### RN-04: Breadcrumb Sempre Visível (Níveis 2 e 3)

**Regra:** Breadcrumb deve estar sempre presente e visível (sticky top) em:
- Nível 2: Curso (ex: "Hub > Curso de Bash")
- Nível 3: Aula (ex: "Hub > Curso de Bash > Aula 1.1")

**Exceção:** Hub (nível 1) não exibe breadcrumb ou exibe apenas "Hub".

**Implementação:**
```jsx
// Nível 2 (Curso)
<Breadcrumb items={[
  { label: 'Hub', icon: '🏠', onClick: handleHome },
  { label: 'Curso de Bash', icon: '📖', current: true }
]} />

// Nível 3 (Aula)
<Breadcrumb items={[
  { label: 'Hub', icon: '🏠', onClick: handleHome },
  { label: 'Curso de Bash', icon: '📖', onClick: handleBackToCourse },
  { label: 'Aula 1.1', icon: '📝', current: true }
]} />
```

**Referência:** US-061 (100% completo)

---

### RN-05: Áreas Sem Sistema Separadas

**Regra:** Áreas de estudo sem sistema integrado (`hasSystem: false`) devem aparecer em seção separada "Em Desenvolvimento", não misturadas com áreas ativas.

**Implementação:**
```jsx
// Filtrar áreas ativas
const activeAreas = studyAreas.filter(area => area.hasSystem);

// Filtrar áreas em desenvolvimento
const inDevAreas = studyAreas.filter(area => !area.hasSystem);

// Renderizar separadamente
<section>
  <h2>Áreas de Estudo</h2>
  {activeAreas.map(area => <AreaCard {...area} />)}
</section>

<section>
  <h2>Em Desenvolvimento</h2>
  {inDevAreas.map(area => <AreaCard {...area} disabled />)}
</section>
```

**Referência:** US-070 (100% completo)

---

### RN-06: Flash Cards por Categoria

**Regra:** Flash cards devem ser categorizados como `basics`, `commands` ou `advanced` para facilitar filtros (futuro).

**Implementação:**
```javascript
// Validar categoria ao criar flash card
function validateFlashcard(card) {
  const validCategories = ['basics', 'commands', 'advanced'];
  if (!validCategories.includes(card.category)) {
    throw new Error(`Categoria inválida: ${card.category}`);
  }
}
```

**Futuro (Release 2.0):** Filtro no modal: "Mostrar apenas basics" ou "Mostrar apenas advanced".

---

### RN-07: Progresso Persistido Localmente

**Regra:** Progresso de aulas DEVE ser persistido em localStorage para sobreviver a refresh da página.

**Implementação:**
```javascript
// Salvar progresso
function saveProgress(courseId, lessonId) {
  const key = `ultrathink_progress_${courseId}`;
  const progress = JSON.parse(localStorage.getItem(key) || '{"completedLessons": []}');

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.lastUpdated = Date.now();
    localStorage.setItem(key, JSON.stringify(progress));
  }
}

// Carregar progresso ao montar componente
useEffect(() => {
  const key = `ultrathink_progress_bash`;
  const progress = JSON.parse(localStorage.getItem(key) || '{"completedLessons": []}');
  setCompletedLessons(progress.completedLessons);
}, []);
```

**Referência:** US-042 (planejado)

---

## Exemplos Práticos

### Exemplo 1: Estrutura Completa de Curso (Bash)

```javascript
// src/data/bashLearningData.js

export const bashCourseData = {
  // Metadados do Curso
  id: "bash",
  title: "Curso de Bash Shell Scripting",
  description: "Domine o shell Bash desde comandos básicos até automação avançada de tarefas.",
  icon: "📖",
  estimatedTime: "40h",

  // Estrutura de Seções e Aulas
  sections: [
    {
      sectionTitle: "Fundamentos",
      modules: [ // Nome legado, mas representa Aulas
        {
          id: "bash-1-1",
          title: "Aula 1.1: Introdução ao Bash",
          duration: "2h30min",
          content: `
# Introdução ao Bash

O Bash (Bourne Again Shell) é o shell padrão do Linux...

## O que você vai aprender
- História do Bash
- Conceitos básicos de shell
- Comandos essenciais

## Exemplo prático
\`\`\`bash
echo "Hello World"
ls -la
cd /home/user
\`\`\`
          `,
          videoUrl: "https://youtube.com/watch?v=...",
          completed: false
        },
        {
          id: "bash-1-2",
          title: "Aula 1.2: Variáveis e Tipos",
          duration: "3h",
          content: "..."
        }
      ]
    },
    {
      sectionTitle: "Comandos Avançados",
      modules: [
        {
          id: "bash-2-1",
          title: "Aula 2.1: Pipelines e Redirecionamento",
          duration: "4h"
        }
      ]
    }
  ],

  // Flash Cards para revisão
  flashcards: [
    {
      id: 1,
      front: "O que é um Pipeline?",
      back: "Encadeamento de comandos usando | para passar saída de um comando como entrada de outro.",
      category: "basics"
    },
    {
      id: 2,
      front: "Como redirecionar stdout para arquivo?",
      back: "Use > para sobrescrever ou >> para anexar. Exemplo: ls -la > lista.txt",
      category: "commands"
    }
  ]
};
```

---

### Exemplo 2: localStorage Schema

```javascript
// Key: ultrathink_notes_bash
{
  "content": "# Minhas anotações do Curso de Bash\n\n## Aula 1.1\n- Pipeline = cmd1 | cmd2\n- Redirecionamento: >, >>, 2>\n\n## Aula 1.2\n- Variáveis: nome=valor (sem espaços)\n- $nome para expandir",
  "lastSaved": 1731592200000
}

// Key: ultrathink_progress_bash
{
  "completedLessons": ["bash-1-1", "bash-1-2", "bash-2-1", "bash-2-2", "bash-3-1"],
  "lastUpdated": 1731592500000
}

// Key: ultrathink_progress_c
{
  "completedLessons": ["c-1-1", "c-1-2"],
  "lastUpdated": 1731590000000
}
```

**Padrão de Keys:**
- Notas: `ultrathink_notes_{courseId}`
- Progresso: `ultrathink_progress_{courseId}`

---

### Exemplo 3: Componente React com Modelo de Domínio

```jsx
// src/components/BashLearningSystem.jsx

import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { bashCourseData } from '../data/bashLearningData';

function BashLearningSystem({ onBack }) {
  const [currentView, setCurrentView] = useState('course'); // 'course' | 'lesson'
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Carregar progresso do localStorage
  useEffect(() => {
    const progress = JSON.parse(
      localStorage.getItem('ultrathink_progress_bash') || '{"completedLessons": []}'
    );
    setCompletedLessons(progress.completedLessons);
  }, []);

  // Calcular progresso total
  const totalLessons = bashCourseData.sections.reduce(
    (acc, section) => acc + section.modules.length, 0
  );
  const completedCount = completedLessons.length;

  // Handler de conclusão de aula
  const handleCompleteLesson = (lessonId) => {
    if (completedLessons.includes(lessonId)) return;

    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);

    localStorage.setItem('ultrathink_progress_bash', JSON.stringify({
      completedLessons: newCompleted,
      lastUpdated: Date.now()
    }));
  };

  // Render da lista de Seções e Aulas
  if (currentView === 'course') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Breadcrumb: Hub > Curso */}
        <Breadcrumb items={[
          { label: 'Hub', icon: '🏠', onClick: onBack },
          { label: 'Curso de Bash', icon: '📖', current: true }
        ]} />

        {/* Progresso */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700">
            Progresso: <strong>{completedCount} de {totalLessons} aulas completadas</strong>
          </p>
        </div>

        {/* Lista de Seções */}
        {bashCourseData.sections.map((section, idx) => (
          <div key={idx} className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">
              📂 {section.sectionTitle}
            </h2>
            <ul className="mt-2 space-y-2">
              {section.modules.map((lesson) => (
                <li key={lesson.id} className="bg-white p-3 rounded shadow">
                  <button
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setCurrentView('lesson');
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    {lesson.title} ({lesson.duration})
                  </button>
                  {completedLessons.includes(lesson.id) && (
                    <span className="ml-2 text-green-600">✓ Concluída</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // Render do conteúdo da Aula
  if (currentView === 'lesson' && selectedLesson) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Breadcrumb: Hub > Curso > Aula */}
        <Breadcrumb items={[
          { label: 'Hub', icon: '🏠', onClick: onBack },
          { label: 'Curso de Bash', icon: '📖', onClick: () => setCurrentView('course') },
          { label: selectedLesson.title, icon: '📝', current: true }
        ]} />

        {/* Conteúdo da Aula */}
        <div className="mt-4 bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold">{selectedLesson.title}</h1>
          <p className="text-gray-600 mt-2">Duração: {selectedLesson.duration}</p>

          <div className="mt-6 prose max-w-none">
            <ReactMarkdown>{selectedLesson.content}</ReactMarkdown>
          </div>

          {/* Checkbox de conclusão */}
          <div className="mt-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={completedLessons.includes(selectedLesson.id)}
                onChange={() => handleCompleteLesson(selectedLesson.id)}
              />
              <span>Marcar como concluída</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default BashLearningSystem;
```

---

## Referências

### Documentos Relacionados

- **[00-definicoes-principais.md](00-definicoes-principais.md)** - Glossário canônico (LEIA PRIMEIRO)
- **[01-contexto-projeto.md](01-contexto-projeto.md)** - Contexto corporativo e solução
- **[03-glossario.md](03-glossario.md)** - Termos técnicos expandidos
- **[05-personas-corporativas.md](05-personas-corporativas.md)** - Personas e jornadas

### Código Relacionado

- `src/components/HubView.jsx` - Implementação do Hub
- `src/components/*LearningSystem.jsx` - Implementação de Cursos
- `src/components/Breadcrumb.jsx` - Componente de breadcrumb (US-061)
- `src/data/studyAreas.js` - Dados de Áreas de Estudo
- `src/data/*LearningData.js` - Dados de Cursos

### User Stories Relacionadas

- **US-060** - Nomenclatura consistente (✅ DONE)
- **US-061** - Breadcrumb hierárquico (✅ DONE)
- **US-070** - Áreas descontinuadas separadas (✅ DONE)
- **US-041** - Tratamento de erros localStorage (📋 Planejado)
- **US-042** - Persistir progresso de módulos (📋 Planejado)
- **US-043** - Refatorar BaseLearningSystem (📋 Planejado)

### Navegação

- **[← Voltar ao Índice de Documentação](../../README.md)**
- **[← Voltar ao README Conceitual](README.md)**
- **[→ Próximo: Personas Corporativas](05-personas-corporativas.md)**

---

## Changelog

| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 1.0.0 | 2025-11-14 | Criação inicial com 9 entidades, fluxos de dados e 7 regras de negócio | Claude Code |

---

**📍 Você está em:** `docs/conceitual/01-visao-geral/04-modelo-dominio.md`
**📅 Última atualização:** 2025-11-14
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** ✅ Ativo - Baseado na Release 1.0 (227 módulos implementados)
**🎯 Uso:** Referência para desenvolvimento, onboarding de devs e design de features
