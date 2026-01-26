# /transcrever-curso - Transformar Transcrição em Curso

**Uso:** `/transcrever-curso <transcrição ou URL>`

---

## Descrição

Transforma uma transcrição de vídeo educacional em estrutura completa de curso para a plataforma TrainB2B, seguindo o padrão do curso de Bash existente.

---

## Workflow

### Passo 1: Receber Entrada

Aceita:
- Transcrição completa colada diretamente
- URL do YouTube (buscará transcrição via API se disponível)
- Arquivo de transcrição (.txt, .srt, .vtt)

### Passo 2: Análise da Transcrição

Ultrathink para identificar:

1. **Estrutura temática:**
   - Quantos temas principais? → Fases (3-5)
   - Quantos sub-temas por tema? → Módulos (3-5 por fase)
   - Quais conceitos em cada sub-tema? → Tópicos (3-6 por módulo)

2. **Metadados:**
   - Título do curso
   - Dificuldade (beginner/intermediate/advanced)
   - Duração estimada
   - Pré-requisitos mencionados

3. **Conteúdo pedagógico:**
   - Objetivos de aprendizagem
   - Exemplos práticos (código, comandos)
   - Exercícios sugeridos
   - Material complementar referenciado

### Passo 3: Gerar Artefatos

#### A) Registro do Curso (SQL)

```sql
-- database/seed-[curso-slug].sql
INSERT INTO courses (id, name, description, icon, duration_hours, total_modules, difficulty, status, badge, video_url, order_index)
VALUES ('[slug]', '[Nome]', '[Descrição]', '[emoji]', [horas], [módulos], '[difficulty]', 'in-development', 'new', '[url]', [ordem]);
```

#### B) Dados do Curso (JS)

```javascript
// src/data/[curso]LearningData.js
export const fases[Curso] = [...];
export const modulos[Curso] = [...];
export const startDate[Curso] = new Date(...);
```

#### C) Componente de Visualização (JSX)

```jsx
// src/components/[Curso]LearningSystem.jsx
// src/components/[Curso]NotesView.jsx
```

#### D) Flash Cards (Opcional)

```javascript
// src/data/[curso]FlashCards.js
export const flashCards[Curso] = [...];
```

### Passo 4: Validação

Verificar:
- [ ] IDs únicos e consistentes
- [ ] Progressão pedagógica lógica
- [ ] 12-25 módulos total
- [ ] Cada fase tem cor e ícone apropriados
- [ ] Conteúdo das aulas extraído da transcrição

---

## Exemplo de Uso

```
/transcrever-curso

<transcrição>
Olá, sejam bem-vindos ao curso de Docker. Neste curso vocês vão aprender
desde os conceitos básicos de containerização até orquestração com
Docker Compose.

Vamos começar entendendo o que são containers...
[resto da transcrição]
</transcrição>

<metadados>
titulo: Docker para Desenvolvedores
url: https://youtube.com/watch?v=ABC123
duracao: 18 horas
autor: João Silva
</metadados>
```

---

## Output Esperado

1. **Resumo da Análise:**
   - X fases identificadas
   - Y módulos totais
   - Z tópicos extraídos

2. **Arquivos Gerados:**
   - `database/seed-docker.sql`
   - `src/data/dockerLearningData.js`
   - `src/components/DockerLearningSystem.jsx`
   - `src/components/DockerNotesView.jsx`

3. **Próximos Passos:**
   - Comandos para inserir no banco
   - Como adicionar a rota
   - Como testar localmente

---

## Referência: Estrutura do Curso Bash

O curso de Bash serve como template:

- **4 Fases:** Fundamentos → Processamento → Avançado → Prático
- **16 Módulos:** 4 por fase
- **Estrutura de aula:** Tópicos com conteúdo JSX formatado
- **Cores:** green → blue → purple → orange
- **Ícones:** Terminal, FileText, Settings, Zap

Arquivos de referência:
- `src/data/bashLearningData.js`
- `src/components/BashLearningSystem.jsx`
- `src/components/BashNotesView.jsx`
