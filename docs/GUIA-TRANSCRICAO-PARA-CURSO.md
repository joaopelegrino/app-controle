# Guia: Transcrição de Vídeo → Estrutura de Curso Plataforma B2B de treinamento técnico corporativo

**Versão:** 1.0.0
**Data:** 2025-11-24
**Base:** Engenharia Reversa do Curso de Bash (Padrão Ouro)
**Status:** Documentação Oficial para Usuários Finais

---

## Objetivo

Este guia documenta o processo completo para transformar **transcrições de vídeos do YouTube** em **estruturas de cursos** para a plataforma Plataforma B2B de treinamento técnico corporativo. Baseado na engenharia reversa do curso de Bash, que serve como "padrão ouro" do sistema.

---

## Visão Geral do Processo

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE TRANSFORMAÇÃO                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────────┐    │
│  │  1. VÍDEO    │────▶│ 2. TRANSCRIÇÃO│────▶│ 3. ESTRUTURAÇÃO  │    │
│  │  YouTube     │     │    Bruta      │     │    de Tópicos    │    │
│  └──────────────┘     └──────────────┘     └──────────────────┘    │
│         │                                           │               │
│         │                                           ▼               │
│         │             ┌──────────────────────────────────────┐      │
│         │             │ 4. TRANSFORMAÇÃO EM CÓDIGO           │      │
│         │             │    ├── bashLearningData.js (dados)   │      │
│         │             │    └── BashNotesView.jsx (conteúdo)  │      │
│         │             └──────────────────────────────────────┘      │
│         │                                           │               │
│         ▼                                           ▼               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ 5. PRODUTO FINAL                                             │   │
│  │    • Curso estruturado em 4 Seções                          │   │
│  │    • 16 Módulos/Aulas com checkboxes de progresso           │   │
│  │    • Páginas de aula com conteúdo interativo                │   │
│  │    • Flashcards para revisão                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Pré-Requisitos

### Ferramentas Necessárias

1. **Python 3.x** com ambiente virtual
2. **youtube-transcript-api** (biblioteca Python)
3. **Editor de código** (VS Code recomendado)
4. **Node.js** para testar a aplicação

### Instalação do Extrator de Transcrições

```bash
# Criar ambiente virtual
python -m venv youtube-env
source youtube-env/bin/activate  # Linux/Mac
# ou: youtube-env\Scripts\activate  # Windows

# Instalar dependência
pip install youtube-transcript-api
```

---

## Etapa 1: Extrair Transcrição do Vídeo

### 1.1 Usando o Script Python

O projeto possui um agent (`learning-path-architect`) que utiliza o script `youtube_transcript.py` para extrair transcrições.

**Uso básico:**

```bash
# Ativar ambiente
source youtube-env/bin/activate

# Extrair transcrição de um vídeo
python youtube_transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"

# Opções disponíveis
--format markdown   # Formato de saída (markdown, json, text, vtt)
--no-timestamps     # Remover timestamps
--languages pt,en   # Preferência de idioma
--batch arquivo.txt # Processar múltiplos vídeos
```

**Saída padrão:** `pastas-caminhos/youtube-transcripts/`

### 1.2 Exemplo Real: Curso de Bash

O curso de Bash foi criado a partir do vídeo:
- **URL:** `https://www.youtube.com/embed/fAgz66M4aNc?start=415`
- **Conteúdo:** Shell Scripting completo em ~32h de estudo

---

## Etapa 2: Analisar e Estruturar a Transcrição

### 2.1 Identificar Seções Principais

Leia a transcrição e identifique os **grandes blocos temáticos**. Para o curso de Bash:

| # | Seção Identificada | Duração | Tópicos Principais |
|---|-------------------|---------|-------------------|
| 1 | Fundamentos Shell Scripting | Semanas 1-4 | História Unix, filosofia, scripts básicos |
| 2 | Processamento de Texto | Semanas 5-8 | Regex, manipulação, pipelines |
| 3 | Recursos Avançados | Semanas 9-12 | Variáveis, loops, funções |
| 4 | Ferramentas e Práticas | Semanas 13-16 | Sinais, subshells, projeto final |

### 2.2 Mapear Módulos/Aulas

Para cada seção, identifique **4 módulos** (padrão recomendado):

```
Seção 1: Fundamentos
├── 1.1 Introdução ao Curso + História Unix/Linux
├── 1.2 Filosofia Software Tools - Parte 1
├── 1.3 Filosofia Software Tools - Parte 2
└── 1.4 Scripts Auto-Contidos (#!) + Primeiros Scripts
```

### 2.3 Template de Análise

Use este template para cada módulo:

```markdown
## Módulo X.Y: [Título do Módulo]

**Fonte na transcrição:** [timestamp ou linha]

### Tópicos Cobertos:
- Tópico 1
- Tópico 2
- Tópico 3

### Exemplos de Código:
```bash
# Código mencionado na transcrição
comando exemplo
```

### Conceitos-Chave:
- Conceito A: explicação
- Conceito B: explicação

### Exercício Proposto:
[Descrição do entregável prático]
```

---

## Etapa 3: Criar Arquivo de Dados

### 3.1 Estrutura do Arquivo

**Arquivo:** `src/data/[nome]LearningData.js`

```javascript
import { Terminal, FileText, Settings, Zap } from 'lucide-react';

// SEÇÕES (3-4 recomendadas)
export const fases[Nome] = [
  {
    id: 1,
    nome: "Seção 1: [Título da Seção]",
    semanas: "1-4",           // Período sugerido
    cor: "bg-green-500",      // Cor Tailwind
    corClara: "bg-green-50",  // Variante clara
    icone: Terminal,          // Ícone lucide-react
    descricao: "[Descrição curta da seção]"
  },
  // ... mais seções
];

// MÓDULOS (4 por seção = 16 total recomendado)
export const modulos[Nome] = [
  {
    id: '1.1',                  // Formato: [seção].[ordem]
    nome: '[Título do Módulo]',
    semana: 1,                  // Semana do curso
    fase: 1,                    // ID da seção
    duracao: '1 semana',
    entregavel: '[O que o aluno deve produzir]',
    temNotas: true              // Tem página de aula detalhada?
  },
  // ... mais módulos
];

// Data de início do curso
export const startDate[Nome] = new Date(2025, 1, 3);
```

### 3.2 Exemplo Real: bashLearningData.js

```javascript
// Localização: src/data/bashLearningData.js

export const fasesBash = [
  {
    id: 1,
    nome: "Seção 1: Fundamentos Shell Scripting",
    semanas: "1-4",
    cor: "bg-green-500",
    corClara: "bg-green-50",
    icone: Terminal,
    descricao: "História, filosofia software tools e scripts básicos"
  },
  // ... 3 mais seções
];

export const modulosBash = [
  {
    id: '1.1',
    nome: 'Introdução ao Curso + História Unix/Linux',
    semana: 1,
    fase: 1,
    duracao: '1 semana',
    entregavel: 'Compreensão da história e contexto do shell scripting',
    temNotas: true
  },
  // ... 15 mais módulos
];
```

---

## Etapa 4: Criar Conteúdo das Aulas (NotesView)

### 4.1 Padrão de Transformação: Transcrição → JSX

A transcrição bruta é transformada em **componentes React estruturados**.

#### Antes (Transcrição Bruta):

```
[00:06:55] O Unix nasceu nos Bell Labs na década de 1970.
Era um ambiente de pesquisa, sem pressão comercial.
O PDP-11 tinha apenas 64KB de memória.
Isso levou à filosofia de ferramentas pequenas...
```

#### Depois (Componente JSX):

```jsx
<div className="bg-green-50 border border-green-200 rounded-lg p-6">
  <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
    <History className="w-6 h-6" />
    História do Unix e Shell Scripting
  </h2>

  <div className="grid md:grid-cols-2 gap-4">
    <div className="bg-green-100 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">🏢 Bell Labs (1970s)</h3>
      <ul className="text-sm space-y-1">
        <li>• Ambiente orientado à pesquisa</li>
        <li>• Sem pressão para lançar produtos</li>
        <li>• Desenvolvedores eram os próprios usuários</li>
        <li>• Tempo para experimentar e refinar</li>
      </ul>
    </div>

    <div className="bg-blue-100 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">💻 PDP-11 Constraints</h3>
      <ul className="text-sm space-y-1">
        <li>• Apenas 64KB de espaço de endereçamento</li>
        <li>• Memória física ainda menor</li>
        <li>• Sistemas pequenos = filosofia ferramentas</li>
        <li>• Cada byte importava!</li>
      </ul>
    </div>
  </div>
</div>
```

### 4.2 Padrões de Transformação

| Elemento na Transcrição | Componente JSX |
|------------------------|----------------|
| Texto explicativo | `<p>` com classes Tailwind |
| Lista de tópicos | `<ul className="list-disc">` |
| Timeline/cronologia | Grid com `<div className="flex gap-4">` |
| Código/comandos | Template literal + `<CodeBlock>` |
| Dica/aviso | `<div className="bg-yellow-50 border">` |
| Comparação | Grid com 2 colunas |

### 4.3 Estrutura do Componente NotesView

```jsx
// src/components/[Nome]NotesView.jsx

export const [Nome]NotesView = ({
  setCurrentSubView,
  setCurrentView,
  selectedSection,
  setSelectedSection,
  openFlashcardsFromNotes,
  CodeBlock,
  showCode,
  toggleCodeVisibility,
  copyToClipboard,
  copiedCode
}) => {

  // 1. DEFINIR SEÇÕES DA AULA
  const sections = [
    {
      id: 'section-1',
      title: 'Título da Seção',
      subtitle: 'Descrição breve',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    // ... mais seções
  ];

  // 2. DEFINIR EXEMPLOS DE CÓDIGO (template literals)
  const exemploCode = `#!/bin/bash
# Código de exemplo extraído da transcrição
echo "Hello World"`;

  // 3. FUNÇÃO DE RENDERIZAÇÃO DE CONTEÚDO
  const renderContent = () => {
    if (selectedSection === 'section-1') {
      return (
        <div className="space-y-6">
          {/* Conteúdo transformado da transcrição */}
        </div>
      );
    }
    // ... mais seções
  };

  // 4. RETORNAR LAYOUT
  return (
    <div className="max-w-5xl mx-auto p-4">
      <Breadcrumb items={[...]} />

      <div className="flex gap-6">
        {/* Sidebar com navegação de seções */}
        <div className="w-80">
          {sections.map(section => (...))}
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
```

### 4.4 Exemplo Real: BashNotesView.jsx (Módulo 1.1)

O módulo 1.1 do Bash tem **4 seções** transformadas da transcrição:

1. **course-intro** - Objetivos e estrutura do curso
2. **unix-history** - História Unix/Linux (Bell Labs, PDP-11)
3. **shell-evolution** - Evolução dos Shells (timeline 1970-1992)
4. **first-script** - Primeiro script prático

---

## Etapa 5: Integrar ao Sistema

### 5.1 Atualizar SistemaEducacionalCompleto.jsx

```jsx
// Importar novo componente
import { [Nome]LearningSystem } from './[Nome]LearningSystem';

// Adicionar estado
const [completed[Nome]Modules, setCompleted[Nome]Modules] = useState(new Set());

// Adicionar caso no switch
case '[nome]':
  return <[Nome]LearningSystem
    onBack={() => setCurrentView('hub')}
    completedModules={completed[Nome]Modules}
    setCompletedModules={setCompleted[Nome]Modules}
  />;
```

### 5.2 Atualizar studyAreas.js

```javascript
[nome]: {
  name: '[Nome]',
  icon: '🔧',
  description: '[Descrição curta]',
  status: 'active',
  badge: 'integrated',
  modules: 16,
  hours: 32,
  hasIntegratedApp: true,
  flashcards: { /* ... */ }
}
```

---

## Checklist de Validação

### Dados (learningData.js)
- [ ] 3-4 seções definidas com cores únicas
- [ ] 12-16 módulos mapeados
- [ ] IDs no formato correto (1.1, 1.2, etc.)
- [ ] Entregáveis claros para cada módulo
- [ ] `temNotas: true` para módulos com página detalhada

### Conteúdo (NotesView.jsx)
- [ ] Seções navegáveis via sidebar
- [ ] Conteúdo transformado com formatação visual
- [ ] Exemplos de código extraídos
- [ ] Ícones e cores consistentes
- [ ] Link para flashcards

### Integração
- [ ] Componente importado no sistema principal
- [ ] Estado de progresso criado
- [ ] Navegação Hub → Curso → Aula funcionando
- [ ] studyAreas.js atualizado

### Qualidade
- [ ] Build passa sem erros (`npm run build`)
- [ ] Console limpo
- [ ] Breadcrumb funciona em todos os níveis
- [ ] localStorage salva notas corretamente

---

## Dicas de Transformação

### 1. Identificar Estruturas na Transcrição

```
"Primeiro... segundo... terceiro..."  →  Lista ordenada <ol>
"Por exemplo..."                       →  Bloco de código
"A diferença entre X e Y..."           →  Grid comparativo
"Em 1970... em 1977... em 1989..."     →  Timeline visual
"Cuidado com..."                       →  Bloco de aviso amarelo
```

### 2. Escolher Cores por Tema

| Tema | Cor Primária | Cor de Fundo |
|------|-------------|--------------|
| Fundamentos | green-500 | green-50 |
| Processamento | blue-500 | blue-50 |
| Avançado | purple-500 | purple-50 |
| Ferramentas | orange-500 | orange-50 |
| Alertas | yellow-500 | yellow-50 |

### 3. Extrair Código com Contexto

```javascript
// Sempre incluir comentário explicativo
const exemploCode = `#!/bin/bash
# Objetivo: [o que o código faz]
# Fonte: [referência na transcrição]

comando1
comando2`;
```

### 4. Manter Consistência Visual

- Títulos: `text-2xl font-bold`
- Subtítulos: `font-semibold mb-2`
- Listas: `text-sm space-y-1`
- Cards: `p-4 rounded-lg`
- Ícones: tamanho `w-5 h-5` ou `w-6 h-6`

---

## Tempo Estimado

| Etapa | Tempo |
|-------|-------|
| Extração da transcrição | 10-30 min |
| Análise e estruturação | 1-2h |
| Criar learningData.js | 30 min |
| Criar NotesView.jsx (por módulo) | 1-2h |
| Integração e testes | 30 min |
| **Total (1 módulo detalhado)** | **3-5h** |
| **Total (curso completo 16 módulos)** | **20-40h** |

---

## Referências

### Arquivos do Padrão Ouro (Bash)

| Arquivo | Linhas | Descrição |
|---------|--------|-----------|
| `src/data/bashLearningData.js` | 181 | Fases e módulos |
| `src/components/BashLearningSystem.jsx` | ~300 | Sistema principal |
| `src/components/BashNotesView.jsx` | 378 | Conteúdo do módulo 1.1 |

### Documentação Relacionada

- [TEMPLATE-CURSO-PADRAO.md](./TEMPLATE-CURSO-PADRAO.md) - Template completo
- [.claude/agents/learning-path-architect.md](../.claude/agents/learning-path-architect.md) - Agent de extração
- [.claude/skills/learning-path-patterns/SKILL.md](../.claude/skills/learning-path-patterns/SKILL.md) - Padrões de trilhas

### Vídeo de Referência

O curso de Bash foi criado a partir de:
- **Vídeo:** Shell Scripting Tutorial
- **URL Embed:** `https://www.youtube.com/embed/fAgz66M4aNc?start=415`
- **Resultado:** 4 seções, 16 módulos, ~32h de conteúdo

---

## Exemplo Completo: Módulo 1.1 do Bash

### Entrada (Tópicos da Transcrição):

```
- Bem-vindo ao curso
- Objetivo: scripting portável POSIX
- Pré-requisitos: terminal, editor, chmod
- História Unix: Bell Labs, PDP-11, filosofia
- Evolução: Thompson → Bourne → C Shell → Korn → Bash
- Primeiro script: who | wc -l
```

### Saída (Estrutura de Dados):

```javascript
// bashLearningData.js
{
  id: '1.1',
  nome: 'Introdução ao Curso + História Unix/Linux',
  semana: 1,
  fase: 1,
  duracao: '1 semana',
  entregavel: 'Compreensão da história e contexto',
  temNotas: true
}
```

### Saída (Seções no NotesView):

```javascript
const sections = [
  { id: 'course-intro', title: 'Introdução ao Curso', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'unix-history', title: 'História Unix/Linux', icon: History, color: 'bg-green-500' },
  { id: 'shell-evolution', title: 'Evolução dos Shells', icon: Terminal, color: 'bg-purple-500' },
  { id: 'first-script', title: 'Primeiro Script', icon: Code, color: 'bg-orange-500' }
];
```

### Saída (Código de Exemplo):

```javascript
const firstScriptCode = `#!/bin/bash
# Conta o número de sessões de login
who > /tmp/sessions.txt
wc -l < /tmp/sessions.txt`;
```

---

**Última Atualização:** 2025-11-24
**Autor:** Engenharia Reversa Automatizada
**Status:** Documentação Oficial
**Projeto:** Plataforma B2B de treinamento técnico corporativo - Plataforma B2B de Treinamento Técnico
