# Skill: Transformar Transcrição de Vídeo em Estrutura de Curso

**Descrição:** Converte transcrições de vídeos educacionais em estrutura completa de curso para a plataforma TrainB2B, gerando todos os artefatos necessários (curso, fases, módulos, conteúdo de aulas).

---

## Entrada Esperada

```
<transcrição>
[Conteúdo da transcrição do vídeo educacional - pode ser output de whisper, YouTube captions, ou transcrição manual]
</transcrição>

<metadados_video>
titulo: [Título do vídeo/curso]
url_video: [URL do YouTube ou outra plataforma]
duracao_total: [Duração em horas]
autor: [Nome do instrutor]
idioma: [pt-BR, en-US, es-ES]
</metadados_video>
```

---

## Processo de Análise

### 1. Análise Semântica da Transcrição

Identifique na transcrição:
- **Temas principais** (serão as FASES/SEÇÕES do curso)
- **Sub-temas** (serão os MÓDULOS/AULAS)
- **Conceitos-chave** (serão os TÓPICOS dentro de cada aula)
- **Exemplos práticos** (código, comandos, demonstrações)
- **Pré-requisitos** mencionados
- **Objetivos de aprendizagem** explícitos ou implícitos

### 2. Identificação de Marcadores Estruturais

Procure por frases indicativas:
- "Nesta seção vamos..." → Início de FASE
- "Primeiro, vamos entender..." → Início de MÓDULO
- "Por exemplo..." → Exemplo prático
- "É importante saber que..." → Conceito-chave
- "Para isso, você precisa..." → Pré-requisito
- "Ao final, você será capaz de..." → Objetivo de aprendizagem

---

## Saídas Geradas

### 1. Registro do Curso (PostgreSQL/NocoDB)

```sql
-- Inserir na tabela 'courses'
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, video_url, order_index)
VALUES (
  '[slug-do-curso]',              -- ID slug gerado do nome
  '[Nome do Curso]',
  '[Descrição do curso em 1-2 frases]',
  '[emoji apropriado]',           -- Ex: 🐧, 💻, 🐳, ⚙️
  [duração em horas],
  [total de módulos],
  '[beginner|intermediate|advanced]',
  'in-development',               -- Sempre inicia em desenvolvimento
  'new',                          -- Badge inicial
  '[url do vídeo]',
  [próximo order_index]
);
```

### 2. Arquivo de Fases (src/data/{curso}LearningData.js)

```javascript
import { [Icons] } from 'lucide-react';

export const fases{Curso} = [
  {
    id: 1,
    nome: "Seção 1: [Título da Fase]",
    semanas: "1-N",                    // Range de semanas/módulos
    cor: "bg-[color]-500",             // green, blue, purple, orange
    corClara: "bg-[color]-50",
    icone: [IconComponent],            // Terminal, FileText, Settings, Zap, etc.
    descricao: "[Descrição breve do que será coberto]"
  },
  // ... repetir para cada fase
];

export const modulos{Curso} = [
  {
    id: '1.1',                         // Formato: fase.ordem
    nome: '[Título do Módulo]',
    semana: 1,
    fase: 1,                           // Referência à fase
    duracao: '1 semana',
    entregavel: '[O que o aluno entregará/aprenderá]',
    temNotas: true                     // Se tem material complementar
  },
  // ... repetir para cada módulo
];

export const startDate{Curso} = new Date(2025, 1, 3);
```

### 3. Conteúdo de Aula (src/components/{Curso}NotesView.jsx)

```jsx
const sections = [
  {
    id: 'topico-slug',
    title: '[Título do Tópico]',
    subtitle: '[Subtítulo descritivo]',
    icon: [IconComponent],
    color: 'bg-[color]-500'
  },
  // ... repetir para cada tópico
];

// Conteúdo de cada seção
const renderContent = () => {
  if (selectedSection === 'topico-slug') {
    return (
      <div className="space-y-6">
        <div className="bg-[color]-50 border border-[color]-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[color]-900 mb-4">
            [Título]
          </h2>

          {/* Conteúdo estruturado */}
          <div className="space-y-4 text-[color]-800">
            <p>[Parágrafo introdutório]</p>

            {/* Lista de conceitos */}
            <div className="bg-[color]-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">[Subtítulo]</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>[Item 1]</li>
                <li>[Item 2]</li>
              </ul>
            </div>

            {/* Bloco de código se aplicável */}
            <CodeBlock
              code={`[código exemplo]`}
              id="exemplo-1"
              title="[nome do arquivo ou comando]"
            />

            {/* Alertas/Notas importantes */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ [Aviso]</h3>
              <p className="text-yellow-700">[Conteúdo do aviso]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
```

### 4. Flash Cards (opcional)

```javascript
export const flashCards{Curso} = [
  {
    id: 1,
    pergunta: "[Pergunta sobre o conceito]",
    resposta: "[Resposta concisa]",
    categoria: "[fase-1|fase-2|...]",
    dificuldade: "[facil|medio|dificil]"
  },
  // ... gerar 5-10 cards por módulo
];
```

---

## Esquema de Cores por Fase

| Fase | Cor Tailwind | Uso |
|------|--------------|-----|
| 1 (Fundamentos) | green-500 | Conceitos básicos |
| 2 (Intermediário) | blue-500 | Aprofundamento |
| 3 (Avançado) | purple-500 | Recursos complexos |
| 4 (Prático/Final) | orange-500 | Projetos e aplicação |

---

## Ícones Recomendados (lucide-react)

| Contexto | Ícone |
|----------|-------|
| Introdução | BookOpen |
| História | History |
| Terminal/CLI | Terminal |
| Código | Code |
| Arquivos | FileText |
| Configuração | Settings |
| Performance | Zap |
| Rede | Globe |
| Segurança | Shield |
| Database | Database |
| Docker | Container |
| Git | GitBranch |

---

## Validações Obrigatórias

1. **Consistência de IDs:**
   - Curso: slug lowercase com hífens
   - Módulos: formato "N.M" (ex: 1.1, 2.3)
   - Tópicos: slug lowercase com hífens

2. **Balanceamento:**
   - 3-5 fases por curso
   - 3-5 módulos por fase
   - 3-6 tópicos por módulo
   - Total: 12-25 módulos por curso

3. **Coerência temporal:**
   - Cada módulo = ~1 semana de estudo
   - Duração total = total_modules horas (aproximadamente)

4. **Progressão pedagógica:**
   - Fase 1: Fundamentos (pré-requisitos mínimos)
   - Fase 2: Conceitos intermediários
   - Fase 3: Recursos avançados
   - Fase 4: Aplicação prática/projetos

---

## Exemplo de Output Completo

Para uma transcrição de curso de Docker:

### 1. SQL para NocoDB

```sql
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, video_url, order_index)
VALUES (
  'docker',
  'Docker & Containers',
  'Containerização, imagens, volumes e orquestração básica',
  '🐳',
  20,
  12,
  'intermediate',
  'in-development',
  'new',
  'https://youtube.com/watch?v=XXX',
  3
);
```

### 2. dockerLearningData.js

```javascript
import { Terminal, Box, Database, Zap } from 'lucide-react';

export const fasesDocker = [
  {
    id: 1,
    nome: "Seção 1: Fundamentos de Containers",
    semanas: "1-3",
    cor: "bg-green-500",
    corClara: "bg-green-50",
    icone: Terminal,
    descricao: "Conceitos básicos, instalação e primeiros containers"
  },
  {
    id: 2,
    nome: "Seção 2: Imagens e Dockerfile",
    semanas: "4-6",
    cor: "bg-blue-500",
    corClara: "bg-blue-50",
    icone: Box,
    descricao: "Criação e gerenciamento de imagens Docker"
  },
  {
    id: 3,
    nome: "Seção 3: Persistência e Redes",
    semanas: "7-9",
    cor: "bg-purple-500",
    corClara: "bg-purple-50",
    icone: Database,
    descricao: "Volumes, bind mounts e networking"
  },
  {
    id: 4,
    nome: "Seção 4: Docker Compose",
    semanas: "10-12",
    cor: "bg-orange-500",
    corClara: "bg-orange-50",
    icone: Zap,
    descricao: "Orquestração multi-container e deploy"
  }
];

export const modulosDocker = [
  { id: '1.1', nome: 'Introdução a Containers', semana: 1, fase: 1, duracao: '1 semana', entregavel: 'Primeiro container rodando localmente' },
  { id: '1.2', nome: 'Instalação e Configuração', semana: 2, fase: 1, duracao: '1 semana', entregavel: 'Docker funcionando no ambiente' },
  { id: '1.3', nome: 'Comandos Básicos', semana: 3, fase: 1, duracao: '1 semana', entregavel: 'Domínio de run, ps, stop, rm' },
  // ... continua
];

export const startDateDocker = new Date(2025, 3, 1);
```

---

## Uso

1. Cole a transcrição no formato especificado
2. Execute a análise semântica
3. Gere os artefatos na ordem:
   - SQL do curso
   - Arquivo de dados (fases + módulos)
   - Componente de conteúdo (NotesView)
   - Flash cards (opcional)
4. Valide a consistência dos IDs
5. Revise a progressão pedagógica

---

## Integração com a Plataforma

Após gerar os arquivos:

```bash
# 1. Inserir curso no banco
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/seed-[curso].sql

# 2. Adicionar arquivos de dados
# src/data/[curso]LearningData.js

# 3. Criar componente de visualização
# src/components/[Curso]LearningSystem.jsx
# src/components/[Curso]NotesView.jsx

# 4. Adicionar rota
# src/App.jsx - Route /curso/[curso-id]
```
