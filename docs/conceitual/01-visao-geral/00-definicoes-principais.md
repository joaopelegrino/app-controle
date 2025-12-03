# 00. Definições Principais - Plataforma B2B de treinamento técnico corporativo

> **🚨 DOCUMENTO CANÔNICO**
>
> Este é o documento de **maior prioridade** do Plataforma B2B de treinamento técnico corporativo. Em caso de conflito ou inconsistência com outros documentos, **este sempre prevalece**.
>
> **Versão:** 1.0.0
> **Data:** 2025-11-14
> **Status:** ✅ Ativo - Baseado no ÉPICO 12 (100% completo)

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Glossário de Termos do Domínio](#glossário-de-termos-do-domínio)
3. [Modelo de Domínio - Hierarquia](#modelo-de-domínio---hierarquia)
4. [Casos de Uso Principais](#casos-de-uso-principais)
5. [Princípios e Padrões](#princípios-e-padrões)
6. [Regras de Negócio](#regras-de-negócio)
7. [Referências](#referências)

---

## Visão Geral

O **Plataforma B2B de treinamento técnico corporativo** é um sistema educacional corporativo que estrutura treinamentos técnicos internos com qualidade, oferecendo:

- **Organização hierárquica** de conteúdo (Hub → Curso → Aula → Prática)
- **Nomenclatura consistente** seguindo glossário único
- **Progresso mensurável** com métricas visuais e analytics
- **Experiência imersiva** com flash cards 3D, vídeos e notas integradas
- **Autonomia de aprendizado** com sistema de caderno digital

### Contexto Corporativo

**Problema:** Empresas com treinamentos técnicos desorganizados, baixa retenção de conhecimento, custos altos com plataformas externas e dificuldade de medir ROI.

**Solução:** Plataforma própria que estrutura conteúdo técnico (programação, DevOps, segurança) com trilhas claras, progresso rastreável e conteúdo customizável.

**Público-Alvo:**
- Empresas de tecnologia (startups a mid-size)
- Áreas de RH/T&D de corporações
- Times de engenharia que precisam padronizar onboarding
- Consultorias que treinam clientes

---

## Glossário de Termos do Domínio

> **Nota:** Este glossário foi validado no ÉPICO 12 (US-060 e US-061) e é a fonte única da verdade para nomenclatura.

### A

#### Aula
**Definição:** Unidade mínima de conteúdo educacional dentro de um Curso. Anteriormente chamado de "Módulo".

**Características:**
- Possui título descritivo (ex: "Aula 1.1: Introdução ao Bash")
- Contém duração estimada (ex: "2h30min")
- Pode ter status: não iniciado, em andamento, concluído
- Apresenta conteúdo em formato texto, vídeo, código ou misto
- Permite anotações no Caderno de Notas

**Exemplo:**
```javascript
{
  id: "bash-aula-1-1",
  title: "Aula 1.1: Fundamentos do Shell",
  duration: "2h30min",
  content: "...",
  status: "completed" // ou "in_progress", "not_started"
}
```

**Relacionamentos:**
- Pertence a uma **Seção**
- Pertence a um **Curso** (via seção)
- Pode ter anotações no **Caderno de Notas**

---

### B

#### Breadcrumb
**Definição:** Componente de navegação hierárquica que mostra o caminho atual do usuário no sistema.

**Características:**
- Formato padrão: `Hub > Curso > Aula`
- 3 níveis de navegação
- Acessibilidade WCAG 2.1 AA (`aria-label="Breadcrumb"`)
- Responsivo (colapsa em mobile: `... > Aula 1.1`)
- Clicável para navegação rápida entre níveis

**Exemplo:**
```jsx
<Breadcrumb items={[
  { label: 'Hub', icon: '🏠', onClick: handleHome },
  { label: 'Curso de Bash', icon: '📖', onClick: handleCourse },
  { label: 'Aula 1.1', icon: '📝', current: true }
]} />
```

**Relacionamentos:**
- Presente em: **Learning System** (nível 2), **Aula View** (nível 3)
- Ref: US-061 (ÉPICO 12 - 100% completo)

---

### C

#### Caderno de Notas
**Definição:** Sistema de anotações pessoais do colaborador, persistido localmente. Anteriormente chamado de "Notas Rápidas" ou "Ver Notas".

**Características:**
- Auto-save em localStorage (debounce de 500ms)
- Limite de 50KB por curso
- Markdown suportado
- Feedback visual de salvamento (✓ Salvo automaticamente)
- Separado por curso (ex: `plataforma-b2b_notes_bash`)

**Exemplo de uso:**
```javascript
// localStorage key pattern
`plataforma-b2b_notes_${courseId}` // ex: plataforma-b2b_notes_bash

// Auto-save hook
const [notes, setNotes, saveStatus] = useAutoSaveNotes('bash');
```

**Relacionamentos:**
- Associado a um **Curso** específico
- Acessível via botão `📖 Estudar` (nomenclatura padrão)

**Termos Proibidos:**
❌ "Notas Rápidas", "Ver Notas", "Minhas Notas"
✅ Usar sempre: "Caderno de Notas" ou "Meu Caderno"

---

#### Curso
**Definição:** Conjunto estruturado de aulas sobre um tema técnico específico. Anteriormente chamado de "Sistema de Aprendizado" ou "Cronograma".

**Características:**
- Título descritivo (ex: "Curso de Bash Shell Scripting")
- Ícone representativo (📖)
- Múltiplas Seções (categorias de aulas)
- Progresso mensurável (ex: "5 de 16 aulas completadas")
- Duração total estimada
- Sistema de Caderno de Notas associado

**Exemplo:**
```javascript
{
  id: "bash",
  title: "Curso de Bash Shell Scripting",
  icon: "📖",
  description: "Domine o shell Bash...",
  totalLessons: 16,
  completedLessons: 5,
  estimatedTime: "40h",
  sections: [...]
}
```

**Relacionamentos:**
- Pertence a uma **Área de Estudo** (via Hub)
- Contém múltiplas **Seções**
- Cada seção contém múltiplas **Aulas**
- Possui um **Caderno de Notas** associado

**Termos Proibidos:**
❌ "Sistema de Aprendizado", "Cronograma", "Módulo" (contexto de grupo de aulas)
✅ Usar sempre: "Curso" ou "Curso de [Tema]"

---

### F

#### Flash Card
**Definição:** Cartão interativo 3D para memorização ativa de conceitos técnicos.

**Características:**
- Animação de flip 3D (frente/verso)
- Frente: Termo ou pergunta
- Verso: Definição ou resposta
- Categorizado por tema (basics, commands, advanced)
- Suporta código formatado
- Visual: fundo gradiente + ícone

**Exemplo:**
```javascript
{
  id: 1,
  front: "O que é um Pipeline?",
  back: "Encadeamento de comandos usando | para passar...",
  category: "basics"
}
```

**Relacionamentos:**
- Associado a uma **Área de Estudo** ou **Curso**
- Acessível via modal popup

---

### H

#### Hub
**Definição:** Página inicial do Plataforma B2B de treinamento técnico corporativo onde o usuário visualiza todas as áreas de estudo disponíveis e acessa cursos.

**Características:**
- Título: "Áreas de Estudo" (seção principal)
- Cards visuais por área (6 ativas + seção "Em Desenvolvimento")
- Breadcrumb simples: "Hub" ou "🏠 Início"
- Navegação para: **Cursos**, **Caminhos de Aprendizado**
- Progresso visual (se implementado)

**Relacionamentos:**
- Nível 1 da hierarquia (topo)
- Contém: **Área de Estudo** → **Curso** → **Aula**

---

### P

#### Prática
**Definição:** Exercício hands-on ou projeto prático associado a uma Aula (planejado para Release 2.0+).

**Características:**
- Formato: Desafio de código, quiz, projeto guiado
- Validação automática (futuramente)
- Feedback imediato
- Contribui para progresso de completude

**Status:** 📋 Planejado (não implementado na Release 1.0)

**Relacionamentos:**
- Associado a uma **Aula** específica
- Opcional ou obrigatório (configurável)

---

### S

#### Seção
**Definição:** Agrupamento lógico de Aulas dentro de um Curso. Anteriormente chamado de "FASE" (em maiúsculas).

**Características:**
- Título descritivo (ex: "Fundamentos", "Comandos Avançados")
- Agrupa de 2 a 10 aulas relacionadas
- Apresentada como categoria visual no Curso
- Facilita navegação e organização pedagógica

**Exemplo:**
```javascript
{
  sectionTitle: "Fundamentos",
  modules: [
    { title: "Aula 1.1: Introdução ao Bash", duration: "2h30min" },
    { title: "Aula 1.2: Variáveis e Tipos", duration: "3h" }
  ]
}
```

**Relacionamentos:**
- Pertence a um **Curso**
- Contém múltiplas **Aulas**

**Termos Proibidos:**
❌ "FASE" (maiúsculas), "Módulo" (no contexto de agrupamento)
✅ Usar sempre: "Seção"

---

## Modelo de Domínio - Hierarquia

### Estrutura de 4 Níveis

```
🏠 Hub (Nível 1)
 │
 ├── 📚 Área de Estudo: "Bash Shell Scripting"
 │    │
 │    └── 📖 Curso: "Curso de Bash"
 │         │
 │         ├── 📂 Seção 1: "Fundamentos"
 │         │    │
 │         │    ├── 📝 Aula 1.1: "Introdução ao Bash"
 │         │    │    ├── Conteúdo (texto, vídeo, código)
 │         │    │    ├── Duração: 2h30min
 │         │    │    └── 📖 Caderno de Notas
 │         │    │
 │         │    └── 📝 Aula 1.2: "Variáveis e Tipos"
 │         │
 │         └── 📂 Seção 2: "Comandos Avançados"
 │              └── 📝 Aula 2.1: "Pipelines e Redirecionamento"
 │
 ├── 📚 Área de Estudo: "C Programming"
 │    └── 📖 Curso: "Curso de C"
 │         └── ...
 │
 └── 🛤️ Caminho de Aprendizado: "Rust Developer Path"
      ├── 📖 Curso: "Curso de Rust"
      ├── 📖 Curso: "Sistemas Operacionais com Rust"
      └── ...
```

### Diagrama de Entidades

```
┌─────────────┐
│     Hub     │ (Página inicial)
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────────┐
│ Área de Estudo  │ (Ex: Bash, C, Rust)
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│      Curso      │ (Ex: Curso de Bash)
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│     Seção       │ (Ex: Fundamentos)
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│      Aula       │ (Ex: Aula 1.1)
└────────┬────────┘
         │
         │ 1:1 (opcional)
         ▼
┌─────────────────┐
│     Prática     │ (Exercício hands-on)
└─────────────────┘

Relacionamentos Adicionais:
─────────────────────────────
Curso ──(1:1)──> Caderno de Notas
Curso ──(1:N)──> Flash Cards
Aula  ──(N:1)──> Breadcrumb
```

---

## Casos de Uso Principais

### Caso de Uso 1: Colaborador Acessa Curso pela Primeira Vez

**Ator:** Colaborador (aprendiz)

**Fluxo:**
1. Colaborador acessa Hub (http://localhost:3000)
2. Visualiza cards de **Áreas de Estudo**
3. Clica em card "Bash Shell Scripting"
4. Sistema exibe tela de **Curso de Bash**
5. Breadcrumb mostra: `Hub > Curso de Bash`
6. Colaborador vê lista de **Seções** com **Aulas**
7. Clica em "Aula 1.1: Introdução ao Bash"
8. Breadcrumb atualiza: `Hub > Curso de Bash > Aula 1.1`
9. Colaborador lê conteúdo, faz anotações no **Caderno**
10. Sistema auto-salva notas a cada 500ms (debounce)
11. Colaborador marca aula como concluída
12. Progresso visual atualiza: `1 de 16 aulas completadas`

**Resultado:** Colaborador completou primeira aula e tem anotações salvas.

**Diagrama:**
```
[Hub] → [Curso de Bash] → [Aula 1.1] → [Caderno de Notas]
         ↓                      ↓
    [Lista Seções]       [Marcar Concluída]
                                ↓
                         [Progresso: 1/16]
```

---

### Caso de Uso 2: Gestor de RH Configura Trilha de Onboarding

**Ator:** Gestor de RH / Admin

**Fluxo (Release 3.0+):**
1. Admin acessa painel administrativo
2. Cria nova **Caminho de Aprendizado**: "Onboarding Backend"
3. Seleciona cursos obrigatórios:
   - Curso de Bash (16 aulas)
   - Curso de C (50 aulas)
   - Curso de Docker (planejado)
4. Define ordem de progressão
5. Atribui para grupo: "Novos Desenvolvedores Backend"
6. Sistema notifica colaboradores
7. Colaboradores visualizam trilha no Hub
8. Progresso geral: `5 de 70 aulas completadas`

**Resultado:** Trilha de onboarding estruturada e atribuída.

**Status:** 📋 Planejado (Release 3.0 - Q2 2026)

---

### Caso de Uso 3: Desenvolvedor Adiciona Novo Curso

**Ator:** Desenvolvedor / Instrutor

**Fluxo:**
1. Desenvolvedor lê template: `docs/TEMPLATE-CURSO-PADRAO.md`
2. Cria arquivo: `src/data/dockerLearningData.js`
3. Estrutura dados seguindo padrão:
   ```javascript
   export const dockerLearningData = {
     title: "Curso de Docker",
     description: "...",
     sections: [
       {
         sectionTitle: "Fundamentos",
         modules: [
           { title: "Aula 1.1: Introdução ao Docker", duration: "3h" }
         ]
       }
     ]
   };
   ```
4. Cria componente: `src/components/DockerLearningSystem.jsx`
5. Integra no Hub: adiciona card em `src/data/studyAreas.js`
6. Testa navegação: Hub → Curso → Aula → Breadcrumb
7. Valida nomenclatura (ux-nomenclature skill)
8. Roda testes: `npm test`
9. Commita: `feat: adicionar Curso de Docker (US-XXX)`

**Resultado:** Novo curso disponível no Hub.

**Ferramentas:** TEMPLATE-CURSO-PADRAO.md, ux-nomenclature skill, component-refactor skill

---

## Princípios e Padrões

### Princípios de Nomenclatura (ÉPICO 12)

**Regra de Ouro:** Nomenclatura consistente = navegação intuitiva = melhor aprendizado.

#### ✅ Termos Aprovados (Usar Sempre)

| Contexto | Termo Correto | Exemplo |
|----------|---------------|---------|
| Agrupamento de aulas | **Curso** | "Curso de Bash" |
| Unidade de conteúdo | **Aula** | "Aula 1.1: Fundamentos" |
| Categoria de aulas | **Seção** | "Fundamentos", "Avançado" |
| Sistema de anotações | **Caderno de Notas** | "📖 Estudar" (botão) |
| Página inicial | **Hub** | "🏠 Hub" (breadcrumb) |
| Navegação hierárquica | **Breadcrumb** | "Hub > Curso > Aula" |

#### ❌ Termos Proibidos (Nunca Usar)

| ❌ Termo Proibido | ✅ Substituir Por | Motivo |
|-------------------|-------------------|--------|
| Sistema de Aprendizado | **Curso** | Verboso e genérico |
| Módulo (contexto de aula) | **Aula** | Ambíguo |
| FASE (maiúsculas) | **Seção** | Inconsistente |
| Notas Rápidas | **Caderno de Notas** | Pouco descritivo |
| Ver Notas | **📖 Estudar** | Vago |
| Cronograma (contexto de curso) | **Curso** | Confuso |

#### Padrão de Botões de Navegação

```jsx
// ✅ Correto
<button onClick={onBack}>
  ← Voltar ao Hub
</button>

<button onClick={handleNotes}>
  📖 Estudar
</button>

// ❌ Incorreto
<button onClick={onBack}>
  Voltar
</button>

<button onClick={handleNotes}>
  Ver Notas
</button>
```

**Regra:** Sempre especificar destino: "Voltar ao [Nível Pai]"

---

### Padrões de Design

#### Hierarquia Visual

```
Hub:         Grande, chamativo, cards coloridos
  ↓
Curso:       Lista organizada, seções colapsáveis
  ↓
Aula:        Conteúdo focado, breadcrumb no topo
  ↓
Prática:     (Futuro) Modal ou página dedicada
```

#### Cores por Contexto

| Contexto | Cor Principal | Classe Tailwind |
|----------|---------------|-----------------|
| Hub | Azul (#3B82F6) | `bg-blue-500` |
| Curso | Verde (#10B981) | `bg-green-500` |
| Aula | Roxo (#8B5CF6) | `bg-purple-500` |
| Caderno | Amarelo (#F59E0B) | `bg-yellow-500` |
| Prática | Laranja (#F97316) | `bg-orange-500` |
| Flash Card | Gradiente | `bg-gradient-to-r from-blue-500 to-purple-600` |

#### Ícones Padrão

| Entidade | Ícone | Uso |
|----------|-------|-----|
| Hub | 🏠 | Breadcrumb, botão home |
| Curso | 📖 | Card, breadcrumb |
| Aula | 📝 | Lista de aulas |
| Seção | 📂 | Cabeçalho de seção |
| Caderno | 📖 | Botão de notas |
| Flash Card | 🎴 | Modal, botão |
| Progresso | ✓ | Checkmark de conclusão |

---

### Padrões de Dados

#### Estrutura de Curso

```javascript
// src/data/[tema]LearningData.js
export const temaCourseData = {
  // Metadados
  id: "tema",
  title: "Curso de [Tema]",
  description: "Descrição marketing...",
  icon: "📖",

  // Conteúdo estruturado
  sections: [
    {
      sectionTitle: "Fundamentos",
      modules: [ // ⚠️ Nome legado, mas conteúdo são Aulas
        {
          id: "tema-1-1",
          title: "Aula 1.1: Título Descritivo",
          duration: "2h30min",
          content: `
            # Conteúdo em Markdown

            ## Conceitos
            ...
          `,
          videoUrl: "https://youtube.com/...",
          completed: false
        }
      ]
    }
  ],

  // Flash cards (opcional)
  flashcards: [
    {
      id: 1,
      front: "Pergunta?",
      back: "Resposta.",
      category: "basics"
    }
  ]
};
```

**Nota:** O campo `modules` é nomenclatura legada do código, mas cada item representa uma **Aula**.

---

## Regras de Negócio

### RN-01: Progresso de Aulas

**Regra:** Uma aula é considerada "concluída" apenas quando o usuário marca explicitamente como tal.

**Implementação:**
- Checkbox ao final de cada aula
- Estado salvo em localStorage: `plataforma-b2b_progress_${courseId}`
- Progresso visual atualizado em tempo real

**Validação:**
```javascript
// Verificar se aula foi completada
const isCompleted = progress[courseId]?.completedLessons?.includes(lessonId);

// Marcar como completada
progress[courseId].completedLessons.push(lessonId);
localStorage.setItem('plataforma-b2b_progress', JSON.stringify(progress));
```

---

### RN-02: Auto-save de Notas

**Regra:** Notas devem ser salvas automaticamente a cada 500ms após última digitação (debounce).

**Implementação:**
- Hook customizado: `useAutoSaveNotes(courseId)`
- Limite de 50KB por curso
- Tratamento de QuotaExceededError

**Validação:**
```javascript
// Hook retorna status
const [notes, setNotes, saveStatus] = useAutoSaveNotes('bash');

// Status possíveis:
// "idle" | "saving" | "saved" | "error"
```

**Referência:** US-041 (planejado para Release 2.0)

---

### RN-03: Breadcrumb Sempre Visível

**Regra:** Breadcrumb deve estar sempre visível no topo da tela (posição fixa) em níveis 2 e 3.

**Implementação:**
- Componente `<Breadcrumb />` em CLearningSystem, BashNotesView, etc.
- Classes Tailwind: `sticky top-0 z-10 bg-white shadow-md`
- Responsivo: colapsa em mobile (<768px)

**Validação:**
- Nível 1 (Hub): Sem breadcrumb ou apenas "Hub"
- Nível 2 (Curso): "Hub > Curso de [Tema]"
- Nível 3 (Aula): "Hub > Curso de [Tema] > Aula X.Y"

**Referência:** US-061 (ÉPICO 12 - 100% completo)

---

### RN-04: Áreas Descontinuadas

**Regra:** Áreas sem sistema integrado devem aparecer em seção separada "Em Desenvolvimento", não misturadas com áreas ativas.

**Implementação:**
- Hub mostra 6 cards ativos (5 sistemas + 1 caminho)
- Seção "Em Desenvolvimento" com 7 áreas (Servidores, Criptografia, etc.)
- Cards descontinuados com visual diferenciado (cinza, sem link)

**Validação:**
```javascript
// Filtrar áreas ativas
const activeAreas = studyAreas.filter(area => area.hasSystem);

// Áreas em desenvolvimento
const inDevAreas = studyAreas.filter(area => !area.hasSystem);
```

**Referência:** US-070 (ÉPICO 13 - 100% completo)

---

## Referências

### Documentos Relacionados

- **[01-contexto-projeto.md](01-contexto-projeto.md)** - Contexto completo e história do projeto
- **[03-glossario.md](03-glossario.md)** - Glossário técnico expandido (acrônimos, termos de implementação)
- **[04-modelo-dominio.md](04-modelo-dominio.md)** - Modelo de domínio detalhado com relacionamentos
- **[05-personas-corporativas.md](05-personas-corporativas.md)** - Personas de usuários corporativos
- **[../../PRODUCT-CENTRAL-DOCUMENT.md](../../PRODUCT-CENTRAL-DOCUMENT.md)** - PRD e User Stories (fonte única de verdade de produto)

### Épicos e User Stories Relacionadas

- **ÉPICO 12: Arquitetura de Informação** (✅ 100% completo)
  - US-060: Nomenclatura consistente (✅ DONE - 28 correções)
  - US-061: Breadcrumb hierárquico (✅ DONE - 13/13 critérios)

- **ÉPICO 13: Padronização Estrutural** (🔄 3% completo)
  - US-070: Áreas descontinuadas separadas (✅ DONE)

### Relatórios de Validação

- **RELATORIO-VALIDACAO-EPICO-12.md** - Validação completa da nomenclatura
- **RELATORIO-VALIDACAO-US-061.md** - Implementação e testes do breadcrumb
- **VALIDACAO-MCP-CHROME-DEVTOOLS.md** - Testes automatizados com MCP

### Skills e Agents

- **ux-nomenclature** - Skill que enforce este glossário automaticamente
- **breadcrumb-impl** - Skill de implementação de breadcrumb
- **platform-architecture** - Skill com arquitetura completa do sistema

---

## Changelog do Documento

| Versão | Data | Mudanças | Autor |
|--------|------|----------|-------|
| 1.0.0 | 2025-11-14 | Criação inicial baseada em ÉPICO 12 e análise do código | Claude Code |

---

**📍 Você está em:** `docs/conceitual/01-visao-geral/00-definicoes-principais.md` - **DOCUMENTO CANÔNICO**
**📅 Última atualização:** 2025-11-14
**👤 Mantido por:** João Pelegrino + Claude Code
**📦 Status:** ✅ Ativo - Base no ÉPICO 12 (100% completo)
**⭐ Prioridade:** MÁXIMA - Este documento prevalece em conflitos
