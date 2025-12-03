# Quick Start: Transcrição → Curso (5 Passos)

**Tempo:** 3-5h para 1 módulo completo

---

## Passo 1: Extrair Transcrição (10 min)

```bash
# Ativar ambiente Python
source youtube-env/bin/activate

# Extrair transcrição
python youtube_transcript.py "URL_DO_VIDEO" --format markdown --languages pt,en

# Saída: pastas-caminhos/youtube-transcripts/[video-id].md
```

---

## Passo 2: Mapear Estrutura (30 min)

Leia a transcrição e preencha:

```markdown
# Mapeamento: [Nome do Curso]

## Seções (3-4)
1. [Seção 1] - semanas 1-4 - cor: green
2. [Seção 2] - semanas 5-8 - cor: blue
3. [Seção 3] - semanas 9-12 - cor: purple
4. [Seção 4] - semanas 13-16 - cor: orange

## Módulos (4 por seção)
### Seção 1
- 1.1 [Título] - entregável: [...]
- 1.2 [Título] - entregável: [...]
- 1.3 [Título] - entregável: [...]
- 1.4 [Título] - entregável: [...]
```

---

## Passo 3: Criar Arquivo de Dados (30 min)

**Arquivo:** `src/data/[nome]LearningData.js`

```javascript
import { Terminal, FileText, Settings, Zap } from 'lucide-react';

export const fases[Nome] = [
  { id: 1, nome: "Seção 1: [Título]", semanas: "1-4", cor: "bg-green-500", corClara: "bg-green-50", icone: Terminal, descricao: "[desc]" },
  // ... mais seções
];

export const modulos[Nome] = [
  { id: '1.1', nome: '[Título]', semana: 1, fase: 1, duracao: '1 semana', entregavel: '[...]', temNotas: true },
  // ... mais módulos
];

export const startDate[Nome] = new Date(2025, 1, 3);
```

---

## Passo 4: Criar Conteúdo JSX (1-2h por módulo)

**Arquivo:** `src/components/[Nome]NotesView.jsx`

### Padrão de Transformação:

| Transcrição | JSX |
|-------------|-----|
| Lista de tópicos | `<ul className="list-disc list-inside space-y-1">` |
| Código/comando | Template literal + `<CodeBlock code={...}>` |
| Timeline | `<div className="flex gap-4"><div className="w-20">[ano]</div><div className="flex-1">[evento]</div></div>` |
| Aviso/dica | `<div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">` |
| Comparação | Grid: `<div className="grid md:grid-cols-2 gap-4">` |

### Template Mínimo:

```jsx
export const [Nome]NotesView = ({ setCurrentSubView, setCurrentView, selectedSection, ... }) => {
  const sections = [
    { id: 'intro', title: 'Introdução', icon: BookOpen, color: 'bg-blue-500' },
    // ...
  ];

  const codigoExemplo = `#!/bin/bash
echo "Hello"`;

  const renderContent = () => {
    if (selectedSection === 'intro') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Título</h2>
          <p>Conteúdo...</p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Breadcrumb items={[...]} />
      <div className="flex gap-6">
        <div className="w-80">{/* Sidebar */}</div>
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};
```

---

## Passo 5: Integrar e Testar (30 min)

### 5.1 Atualizar SistemaEducacionalCompleto.jsx

```jsx
import { [Nome]LearningSystem } from './[Nome]LearningSystem';

// No switch:
case '[nome]':
  return <[Nome]LearningSystem onBack={() => setCurrentView('hub')} />;
```

### 5.2 Atualizar studyAreas.js

```javascript
[nome]: {
  name: '[Nome]',
  icon: '[emoji]',
  status: 'active',
  hasIntegratedApp: true,
  modules: 16,
  hours: 32
}
```

### 5.3 Testar

```bash
npm run build  # Deve passar sem erros
npm run dev    # Navegar: Hub → Curso → Aula
```

---

## Cores Rápidas

| Seção | Classe | Uso |
|-------|--------|-----|
| 1 | `bg-green-500` / `bg-green-50` | Fundamentos |
| 2 | `bg-blue-500` / `bg-blue-50` | Processamento |
| 3 | `bg-purple-500` / `bg-purple-50` | Avançado |
| 4 | `bg-orange-500` / `bg-orange-50` | Ferramentas |
| Aviso | `bg-yellow-50` | Dicas/alertas |

---

## Arquivos de Referência

```
# Padrão Ouro (Bash)
src/data/bashLearningData.js          # Estrutura de dados
src/components/BashLearningSystem.jsx # Sistema principal
src/components/BashNotesView.jsx      # Conteúdo da aula

# Templates
docs/TEMPLATE-CURSO-PADRAO.md         # Template completo
docs/GUIA-TRANSCRICAO-PARA-CURSO.md   # Guia detalhado
```

---

**Pronto!** Seu curso está estruturado seguindo o padrão Plataforma B2B de treinamento técnico corporativo.
