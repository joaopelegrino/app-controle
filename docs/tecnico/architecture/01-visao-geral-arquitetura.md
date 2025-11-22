# 01. Visão Geral de Arquitetura - Organizador de Base de Conhecimento Enterprise

> **Decisões Arquiteturais e Padrões Técnicos**
>
> **Versão:** 1.0.0
> **Data:** 2025-11-14
> **Status:** ✅ Ativo - Release 1.0

---

## 📋 Índice

1. [Objetivos Arquiteturais](#objetivos-arquiteturais)
2. [Princípios de Design](#princípios-de-design)
3. [Decisões Arquiteturais](#decisões-arquiteturais)
4. [Diagrama de Camadas](#diagrama-de-camadas)
5. [Componentes Principais](#componentes-principais)
6. [Fluxo de Dados](#fluxo-de-dados)
7. [Persistência e Estado](#persistência-e-estado)
8. [Performance e Otimizações](#performance-e-otimizações)
9. [Segurança](#segurança)
10. [Escalabilidade](#escalabilidade)
11. [Referências](#referências)

---

## Objetivos Arquiteturais

### 1. **Performance** ⚡
- Startup time < 500ms
- Build time < 10s
- Bundle size inicial < 200KB (meta Release 2.0)
- TTI (Time to Interactive) < 2s

**Status Atual (Release 1.0):**
- ✅ Startup: 295ms
- ✅ Build: ~7s
- ⚠️ Bundle: ~500KB (otimização pendente)
- ✅ TTI: <2s

---

### 2. **Escalabilidade** 📈
- Suportar 1.000+ aulas sem degradação
- Suportar 100+ usuários simultâneos (self-hosted)
- Arquitetura preparada para multi-tenant (Release 3.0)

**Status Atual:**
- ✅ 227 aulas sem problemas de performance
- ⚠️ Multi-tenant: planejado para Release 3.0

---

### 3. **Manutenibilidade** 🛠️
- Código componentizado (DRY)
- Separação clara de responsabilidades
- Documentação inline
- Testes automatizados (meta: 80% cobertura)

**Status Atual:**
- ⚠️ Duplicação de código: 25% (meta: <10%)
- ⚠️ Cobertura de testes: 5% (meta: 80%)

---

### 4. **Usabilidade** 🎨
- UX intuitiva (hierarquia clara)
- Feedback visual imediato
- Acessibilidade WCAG 2.1 AA (Release 3.0)
- Responsividade (mobile-first futuro)

**Status Atual:**
- ✅ Hierarquia clara (4 níveis)
- ✅ Breadcrumb WCAG AA (US-061)
- ⚠️ Responsividade: parcial

---

### 5. **Portabilidade** 🐳
- Containerizado (Docker)
- Self-hosted ou SaaS
- Cross-platform (Linux, macOS, Windows via WSL)

**Status Atual:**
- ✅ Docker + Nginx Alpine
- ✅ Multi-stage build otimizado

---

## Princípios de Design

### 1. **Component Composition over Inheritance**

**Princípio:** Componentes são compostos de outros componentes menores, não herdam de classes base.

**Aplicação:**
```jsx
// ❌ Errado: Herança
class BashLearningSystem extends BaseLearningSystem {
  render() { ... }
}

// ✅ Correto: Composição
function BashLearningSystem() {
  return (
    <LearningSystemLayout course={bashCourseData}>
      <Breadcrumb items={...} />
      <LessonList sections={...} />
      <NotesButton onClick={...} />
    </LearningSystemLayout>
  );
}
```

**Benefícios:**
- Reutilização de lógica (hooks)
- Menor acoplamento
- Mais flexível

**Status:** Parcialmente implementado (refatoração em US-043)

---

### 2. **Single Source of Truth**

**Princípio:** Cada dado tem uma única fonte autoritativa.

**Aplicação:**
```
- Dados de cursos: src/data/*LearningData.js
- Progresso: localStorage (ultrathink_progress_*)
- Notas: localStorage (ultrathink_notes_*)
- Metadados de áreas: src/data/studyAreas.js
```

**Benefícios:**
- Sem inconsistências
- Fácil manutenção
- Debug simplificado

---

### 3. **Progressive Enhancement**

**Princípio:** Funcionalidade básica funciona sempre, features avançadas melhoram experiência.

**Aplicação:**
```javascript
// Feature básica: Exibir conteúdo
function LessonView({ lesson }) {
  return <div>{lesson.content}</div>;
}

// Feature avançada: Vídeo (se disponível)
function LessonView({ lesson }) {
  return (
    <div>
      {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />}
      <div>{lesson.content}</div>
    </div>
  );
}
```

**Benefícios:**
- Robustez (degrada gracefully)
- Melhor UX incremental

---

### 4. **Fail Fast, Fail Loud**

**Princípio:** Erros devem ser detectados cedo e reportados claramente.

**Aplicação:**
```javascript
// Validação de dados ao carregar
function loadCourseData(courseId) {
  const data = require(`./data/${courseId}LearningData.js`);

  if (!data.sections || data.sections.length === 0) {
    throw new Error(`Curso ${courseId} inválido: sem seções`);
  }

  return data;
}
```

**Benefícios:**
- Bugs descobertos em dev, não em prod
- Debug mais rápido

---

### 5. **Convention over Configuration**

**Princípio:** Convenções reduzem necessidade de configuração explícita.

**Aplicação:**
```javascript
// Convenção: Arquivos de dados seguem padrão
// src/data/bashLearningData.js
// src/data/cLearningData.js
// src/data/rustLearningData.js

// Componentes seguem padrão
// src/components/BashLearningSystem.jsx
// src/components/CLearningSystem.jsx
```

**Benefícios:**
- Onboarding de devs mais rápido
- Menos decisões a tomar

---

## Decisões Arquiteturais

### Decisão 1: React como Framework de UI

**Contexto:** Precisávamos de framework para construir UI interativa e componentizada.

**Opções Consideradas:**
1. **React 18.3** - Virtual DOM, hooks, ecosystem maduro
2. **Vue 3** - Mais simples, menos ecosystem
3. **Svelte** - Compile-time, bundle menor, ecosystem imaturo
4. **Vanilla JS** - Sem framework, mais controle, muito trabalho manual

**Decisão:** **React 18.3**

**Justificativa:**
- ✅ Ecosystem gigante (milhares de libs)
- ✅ Hooks modernos (useState, useEffect, custom hooks)
- ✅ Componentes funcionais (mais simples que classes)
- ✅ Comunidade ativa (fácil encontrar ajuda)
- ✅ Performance excelente com Virtual DOM
- ✅ DevTools incríveis (React DevTools, Profiler)

**Consequências:**
- ➕ Produtividade alta (libs prontas: react-markdown, etc.)
- ➕ Fácil contratar devs React
- ➖ Bundle maior que Svelte (~140KB React + ReactDOM)
- ➖ Curva de aprendizado (hooks, reconciliation)

**Trade-off Aceito:** Bundle maior em troca de produtividade e ecosystem.

---

### Decisão 2: Vite como Build Tool

**Contexto:** Precisávamos de build tool rápido para desenvolvimento e produção.

**Opções Consideradas:**
1. **Vite 5.4** - ESM nativo, HMR instantâneo, build rápido
2. **Create React App** - Oficial React, mas lento e abandonado
3. **Webpack 5** - Flexível, mas configuração complexa
4. **Parcel** - Zero-config, mas menos controle

**Decisão:** **Vite 5.4**

**Justificativa:**
- ✅ Startup **295ms** (vs. 5-10s do Webpack/CRA)
- ✅ HMR instantâneo (mudanças visíveis em <100ms)
- ✅ Build de produção rápido (~7s)
- ✅ Zero-config para casos comuns
- ✅ Suporte nativo a TypeScript (futuro)
- ✅ Code splitting automático

**Consequências:**
- ➕ Dev experience excelente (dev server veloz)
- ➕ Build otimizado automaticamente
- ➖ Ecosystem menor que Webpack (menos plugins)
- ➖ Alguns packages legados podem dar problema

**Trade-off Aceito:** Ecosystem menor em troca de velocidade brutal.

**Configuração Chave (vite.config.js):**
```javascript
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['react-markdown', 'lucide-react']
        }
      }
    },
    sourcemap: false, // Segurança: não expor código
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
};
```

---

### Decisão 3: Tailwind CSS como Framework de Estilo

**Contexto:** Precisávamos de sistema de estilo rápido, consistente e responsivo.

**Opções Consideradas:**
1. **Tailwind CSS 3.4** - Utility-first, JIT compiler, bundle pequeno
2. **CSS Modules** - Scoped styles, sem framework
3. **Styled Components** - CSS-in-JS, runtime overhead
4. **Bootstrap 5** - Components prontos, mas pesado e opinionado

**Decisão:** **Tailwind CSS 3.4**

**Justificativa:**
- ✅ Produtividade alta (classes prontas: `bg-blue-500`, `p-4`)
- ✅ Bundle otimizado (JIT: apenas classes usadas)
- ✅ Responsividade fácil (`md:text-lg`, `lg:grid-cols-3`)
- ✅ Design system consistente (cores, spacing, typography)
- ✅ Sem CSS morto (PurgeCSS automático)

**Consequências:**
- ➕ Velocidade de desenvolvimento (sem escrever CSS)
- ➕ Consistência visual automática
- ➖ HTML verboso (muitas classes)
- ➖ Curva de aprendizado (memorizar classes)

**Trade-off Aceito:** HTML verboso em troca de produtividade.

**Configuração Chave (tailwind.config.js):**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors para brand
      }
    }
  }
};
```

---

### Decisão 4: localStorage para Persistência

**Contexto:** Precisávamos salvar progresso e notas sem backend (Release 1.0).

**Opções Consideradas:**
1. **localStorage** - Browser API, 5-10MB, síncrono
2. **IndexedDB** - Browser DB, 50MB+, assíncrono
3. **Backend API** - Persistência server-side, requer infra
4. **Cookies** - 4KB max, enviado em toda req

**Decisão:** **localStorage (Release 1.0)**

**Justificativa:**
- ✅ Simples de usar (API síncrona)
- ✅ Suficiente para MVP (5MB = ~1000 aulas de progresso)
- ✅ Sem necessidade de backend
- ✅ Rápido (acesso síncrono)

**Consequências:**
- ➕ Zero latência (dados locais)
- ➕ Funciona offline
- ➖ Sem sync entre dispositivos
- ➖ Limitado a 5-10MB
- ➖ Perdido se limpar cache

**Trade-off Aceito:** Sem sync entre dispositivos em troca de simplicidade (Release 1.0).

**Migração Futura (Release 3.0):**
- Adicionar backend API para sync
- localStorage como cache + backup offline

**Schema Atual:**
```javascript
// Progresso
localStorage.setItem('ultrathink_progress_bash', JSON.stringify({
  completedLessons: ['bash-1-1', 'bash-1-2'],
  lastUpdated: Date.now()
}));

// Notas
localStorage.setItem('ultrathink_notes_bash', JSON.stringify({
  content: "# Minhas anotações...",
  lastSaved: Date.now()
}));
```

---

### Decisão 5: Docker para Deployment

**Contexto:** Precisávamos de deployment fácil e consistente (self-hosted ou SaaS).

**Opções Consideradas:**
1. **Docker + Nginx** - Container leve, fácil deploy
2. **Static hosting** (Vercel, Netlify) - Mais simples, mas sem self-hosted
3. **VM tradicional** - Mais controle, mas mais complexo
4. **Serverless** (Lambda) - Barato, mas frio start

**Decisão:** **Docker + Nginx Alpine**

**Justificativa:**
- ✅ Portável (roda em qualquer lugar: AWS, GCP, on-premise)
- ✅ Leve (imagem final ~50MB com Alpine)
- ✅ Multi-stage build (build separado de runtime)
- ✅ Self-hosted friendly (clientes podem hospedar)
- ✅ Nginx otimizado (gzip, cache, headers de segurança)

**Consequências:**
- ➕ Flexibilidade total (self-hosted ou managed)
- ➕ Custo baixo (R$ 50-100/mês AWS t3.micro)
- ➖ Requer conhecimento Docker (onboarding de clientes)

**Trade-off Aceito:** Curva de aprendizado Docker em troca de portabilidade.

**Dockerfile (Multi-stage):**
```dockerfile
# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Imagem Final:** ~50MB (vs. ~1GB se incluísse node_modules)

---

## Diagrama de Camadas

### Arquitetura de 4 Camadas

```
┌─────────────────────────────────────────────────────────────┐
│                     Camada 1: Presentation                  │
│                   (Componentes React)                       │
├─────────────────────────────────────────────────────────────┤
│ - HubView.jsx                  (Página inicial)             │
│ - *LearningSystem.jsx          (Cursos)                     │
│ - *NotesView.jsx               (Caderno de notas)           │
│ - Breadcrumb.jsx               (Navegação)                  │
│ - FlashcardModal.jsx           (Flash cards)                │
│ - AreaCard.jsx                 (Card reutilizável)          │
│                                                             │
│ Responsabilidade: UI, interação com usuário, navegação     │
└────────┬────────────────────────────────────────────────────┘
         │
         │ Props, State, Callbacks
         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Camada 2: Business Logic                  │
│                  (Hooks & Utils)                            │
├─────────────────────────────────────────────────────────────┤
│ - useAutoSaveNotes()           (Auto-save notas)            │
│ - useModuleProgress()          (Progresso aulas)            │
│ - useCourseData()              (Carrega dados curso)        │
│ - helpers.js                   (Funções auxiliares)         │
│ - debugLogger.js               (Logging customizado)        │
│                                                             │
│ Responsabilidade: Lógica de negócio, validações, cálculos  │
└────────┬────────────────────────────────────────────────────┘
         │
         │ API calls (localStorage, futuro: backend API)
         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Camada 3: Data Layer                      │
│                  (Dados & Persistência)                     │
├─────────────────────────────────────────────────────────────┤
│ - src/data/studyAreas.js       (Areas de estudo - MVP: Bash)│
│ - src/data/caminhoExemploData.js (Caminhos Propostos)       │
│ - src/data/*LearningData.js    (Dados de cursos)           │
│ - localStorage                  (Progresso, notas)          │
│ - (Futuro) Backend API          (Sync multi-device)         │
│                                                             │
│ Responsabilidade: Armazenamento, persistência, sincronização│
└────────┬────────────────────────────────────────────────────┘
         │
         │ Deployment
         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Camada 4: Infrastructure                    │
│                  (Hosting & CI/CD)                          │
├─────────────────────────────────────────────────────────────┤
│ - Docker + Nginx Alpine         (Containerização)           │
│ - GitHub Actions                (CI/CD pipeline)            │
│ - AWS / GCP / On-premise        (Hosting)                   │
│                                                             │
│ Responsabilidade: Deploy, build, monitoramento              │
└─────────────────────────────────────────────────────────────┘
```

---

## Componentes Principais

### Mapa de Componentes (18 total)

```
src/components/
├── SistemaEducacionalCompleto.jsx  # Componente raiz (router)
│
├── HubView.jsx                     # Nível 1: Hub
│   └── AreaCard.jsx                # Card reutilizável de área
│
├── LearningPathView.jsx            # Caminho de Aprendizado (Rust)
│
├── *LearningSystem.jsx (5)         # Nível 2: Cursos
│   ├── CLearningSystem.jsx
│   ├── RustLearningSystem.jsx
│   ├── BashLearningSystem.jsx
│   ├── VSCodeLearningSystem.jsx
│   └── ClaudeCodeLearningSystem.jsx
│
├── *NotesView.jsx (5)              # Caderno de Notas por curso
│   ├── CNotesView.jsx
│   ├── RustNotesView.jsx
│   ├── BashNotesView.jsx
│   ├── VSCodeNotesView.jsx
│   └── ClaudeCodeNotesView.jsx
│
├── Breadcrumb.jsx                  # Navegação hierárquica (US-061)
├── FlashcardModal.jsx              # Flash cards 3D
├── CodeBlock.jsx                   # Bloco de código formatado
└── ErrorBoundary.jsx               # Tratamento de erros React
```

### Componente Arquetípico: BashLearningSystem.jsx

```jsx
import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import FlashcardModal from './FlashcardModal';
import { bashCourseData } from '../data/bashLearningData';

/**
 * Sistema de aprendizado do curso de Bash
 *
 * Responsabilidades:
 * - Exibir lista de seções e aulas (nível 2)
 * - Exibir conteúdo de aula selecionada (nível 3)
 * - Gerenciar navegação (breadcrumb)
 * - Rastrear progresso de aulas
 * - Abrir modal de flash cards
 *
 * Estado:
 * - currentView: 'course' | 'lesson' | 'notes'
 * - selectedLesson: Lesson | null
 * - completedLessons: string[] (IDs das aulas completadas)
 */
function BashLearningSystem({ onBack }) {
  // Estado de navegação
  const [currentView, setCurrentView] = useState('course');
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Estado de progresso
  const [completedLessons, setCompletedLessons] = useState([]);

  // Estado de flash cards
  const [showFlashcards, setShowFlashcards] = useState(false);

  // Carregar progresso do localStorage ao montar
  useEffect(() => {
    const progress = JSON.parse(
      localStorage.getItem('ultrathink_progress_bash') || '{"completedLessons": []}'
    );
    setCompletedLessons(progress.completedLessons);
  }, []);

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

  // Render condicional baseado em currentView
  // ... (implementação completa)
}

export default BashLearningSystem;
```

**Padrão de Responsabilidades:**
- ✅ **Single Responsibility:** Cada componente faz uma coisa bem feita
- ✅ **Composition:** Componentes compostos de sub-componentes
- ✅ **Controlled Components:** Estado gerenciado por componente pai
- ✅ **Pure Functions:** Render puro (mesmo input = mesmo output)

---

## Fluxo de Dados

### Padrão: Unidirectional Data Flow (React)

```
┌──────────────────────────────────────────────────────────────┐
│                   Dados (Source of Truth)                    │
│                                                              │
│  src/data/bashLearningData.js                                │
│  localStorage (progresso, notas)                             │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ Leitura (import, JSON.parse)
         ▼
┌──────────────────────────────────────────────────────────────┐
│              State (Componente Pai)                          │
│                                                              │
│  const [currentView, setCurrentView] = useState('course');   │
│  const [completedLessons, setCompletedLessons] = useState([]);│
└────────┬─────────────────────────────────────────────────────┘
         │
         │ Props (one-way data binding)
         ▼
┌──────────────────────────────────────────────────────────────┐
│         Componentes Filhos (Presentation)                    │
│                                                              │
│  <Breadcrumb items={...} />                                  │
│  <LessonList lessons={...} onSelect={...} />                 │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ Events (callbacks)
         ▼
┌──────────────────────────────────────────────────────────────┐
│            Handlers (Componente Pai)                         │
│                                                              │
│  const handleCompleteLesson = (id) => { ... }                │
│  const handleSelectLesson = (lesson) => { ... }              │
└────────┬─────────────────────────────────────────────────────┘
         │
         │ State update (setState)
         │
         └──────> Re-render (React reconciliation)
```

**Regras:**
1. Dados fluem de cima para baixo (props)
2. Eventos fluem de baixo para cima (callbacks)
3. Estado é mutado apenas por setState/useState
4. Nunca mutar props diretamente

---

## Modelo de Caminhos Propostos (US-044)

### Conceito Fundamental

A partir da US-044 (Hub MVP Simplificado), o sistema diferencia claramente dois conceitos:

**Area de Estudo (Curso):** Entidade autocontida com video, modulos, notas, flashcards.
**Caminho Proposto (Trilha):** Sequencia ordenada de CURSOS (referencias, nao dados duplicados).

```
Exemplo: "Desenvolvedor Backend"
  1. Bash Shell Scripting (disponivel)
  2. Linux Fundamentals (em breve)
  3. Docker & Containers (em breve)
  4. DevOps Essentials (em breve)
```

### Arquivos de Dados

```
src/data/
├── studyAreas.js           # Areas de Estudo (MVP: apenas Bash ativo)
├── caminhoExemploData.js   # Caminhos Propostos (modelo de referencia)
├── bashLearningData.js     # Conteudo do curso Bash
└── ...
```

### Schema de Caminho

```javascript
{
  id: 'backend-developer',
  name: 'Desenvolvedor Backend',
  cursos: [
    {
      ordem: 1,
      areaId: 'bash',        // Referencia a studyAreas.js
      disponivel: true,      // Clicavel
      modules: 16,
      hours: 32
    }
  ],
  get totalCursos() { return this.cursos.length; }
}
```

**Skill Relacionada:** `.claude/skills/learning-path-patterns/SKILL.md`

---

## Persistência e Estado

### localStorage Schema

```javascript
// Progresso de aulas
Key: ultrathink_progress_{courseId}
Value: {
  completedLessons: string[],  // ["bash-1-1", "bash-1-2"]
  lastUpdated: number           // timestamp
}

// Notas do caderno
Key: ultrathink_notes_{courseId}
Value: {
  content: string,              // Markdown
  lastSaved: number             // timestamp
}
```

**Limites:**
- localStorage total: 5-10MB (varia por browser)
- Por curso (notas): 50KB (validado)
- Por curso (progresso): ~1KB (227 aulas = ~2KB JSON)

**Tratamento de Erros (US-041 - Planejado):**
```javascript
function saveNotes(courseId, content) {
  try {
    const size = new Blob([content]).size;
    if (size > 50 * 1024) {
      throw new Error('Limite de 50KB excedido');
    }

    localStorage.setItem(`ultrathink_notes_${courseId}`, JSON.stringify({
      content,
      lastSaved: Date.now()
    }));

    return { status: 'saved' };
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      return { status: 'error', message: 'Cota do localStorage excedida. Exporte suas notas.' };
    }
    return { status: 'error', message: error.message };
  }
}
```

---

## Performance e Otimizações

### 1. Code Splitting (vite.config.js)

```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],        // ~140KB
        'ui-vendor': ['react-markdown', 'lucide-react'] // ~80KB
      }
    }
  }
}
```

**Resultado:**
- Chunk 1 (react-vendor): Carregado sempre
- Chunk 2 (ui-vendor): Carregado quando necessário
- Chunks de componentes: Lazy loading (futuro US-022)

---

### 2. Minificação (Terser)

```javascript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,    // Remove console.log
      drop_debugger: true,   // Remove debugger
      pure_funcs: ['console.info', 'console.debug']
    }
  }
}
```

**Resultado:**
- Bundle ~30% menor
- Sem console.log em produção (segurança)

---

### 3. Sem Sourcemaps (Segurança)

```javascript
build: {
  sourcemap: false  // Não expor código-fonte
}
```

**Trade-off:** Dificulta debug em produção, mas protege código.

---

### 4. Lazy Loading (Planejado US-022)

```jsx
// Futuro: Lazy loading de sistemas
const BashLearningSystem = React.lazy(() =>
  import('./components/BashLearningSystem')
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BashLearningSystem />
    </Suspense>
  );
}
```

**Benefício:** Bundle inicial < 200KB (atualmente ~500KB)

---

## Segurança

### 1. Headers de Segurança (nginx.conf)

```nginx
# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;

# Prevent clickjacking
add_header X-Frame-Options "DENY" always;

# Prevent MIME sniffing
add_header X-Content-Type-Options "nosniff" always;

# XSS Protection
add_header X-XSS-Protection "1; mode=block" always;
```

---

### 2. Sem Exposição de Código (Build)

```javascript
// vite.config.js
build: {
  sourcemap: false,         // Não gerar sourcemaps
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true    // Remove console.log
    }
  }
}
```

---

### 3. Sanitização de Input (Futuro)

```javascript
// Sanitizar conteúdo markdown antes de renderizar
import DOMPurify from 'dompurify';

function sanitizeMarkdown(content) {
  return DOMPurify.sanitize(content);
}
```

**Status:** Planejado para Release 2.0 (US-041)

---

## Escalabilidade

### Arquitetura Multi-Tenant (Release 3.0)

```
┌─────────────────────────────────────────────────────────────┐
│                    Camada de Tenant                         │
├─────────────────────────────────────────────────────────────┤
│ Empresa A                  Empresa B                Empresa C│
│ ├─ 50 usuários             ├─ 200 usuários          ├─ 80    │
│ ├─ 10 cursos custom        ├─ 5 cursos custom       ├─ 15    │
│ └─ DB separado             └─ DB separado           └─ DB    │
└────────┬────────────────────────────────────────────────────┘
         │
         │ Tenant Isolation (database per tenant)
         ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend API (Node.js + Express)                │
│                                                             │
│  /api/tenant/{tenantId}/courses                             │
│  /api/tenant/{tenantId}/progress                            │
│  /api/tenant/{tenantId}/users                               │
└─────────────────────────────────────────────────────────────┘
```

**Estratégia de Isolamento:**
- Database per tenant (PostgreSQL schemas)
- Autenticação JWT com tenantId
- Rate limiting por tenant

---

## Referências

### Documentos Relacionados

**Conceituais:**
- **[../../conceitual/01-visao-geral/00-definicoes-principais.md](../../conceitual/01-visao-geral/00-definicoes-principais.md)** - Glossário canônico
- **[../../conceitual/01-visao-geral/04-modelo-dominio.md](../../conceitual/01-visao-geral/04-modelo-dominio.md)** - Modelo de domínio

**Técnicos:**
- **[../stack-implementation/01-stack-tecnologico.md](../stack-implementation/01-stack-tecnologico.md)** - Stack completo
- **[../testing/01-estrategia-testes.md](../testing/01-estrategia-testes.md)** - Testes

**Código:**
- `vite.config.js` - Configuração de build
- `tailwind.config.js` - Configuração de estilos
- `Dockerfile` - Multi-stage build
- `nginx.conf` - Headers de segurança

---

## Changelog

| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 1.0.0 | 2025-11-14 | Criação inicial com 5 decisões arquiteturais, diagrama de camadas e padrões | Claude Code |

---

**📍 Você está em:** `docs/tecnico/architecture/01-visao-geral-arquitetura.md`
**📅 Última atualização:** 2025-11-14
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** ✅ Ativo - Release 1.0
**🎯 Uso:** Referência para decisões técnicas, onboarding de desenvolvedores e planejamento de refatorações
