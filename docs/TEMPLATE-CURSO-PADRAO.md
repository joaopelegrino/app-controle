# 📘 Template de Curso Padrão - Plataforma B2B de treinamento técnico corporativo

**Versão:** 1.0
**Data:** 2025-11-13
**Base:** Bash Learning System (Padrão Ouro)
**Status:** Documentação Oficial

---

## 🎯 Objetivo

Este documento fornece um **template completo e reutilizável** para criar novos sistemas de aprendizado no Plataforma B2B de treinamento técnico corporativo, garantindo **100% de conformidade** com o padrão Bash validado.

---

## 📋 Pré-Requisitos

Antes de criar um novo curso, você precisa:

### 1. Conteúdo Preparado
- [ ] **Vídeo YouTube** do curso (URL embedável)
- [ ] **Estrutura de Seções** definida (3-4 seções recomendadas)
- [ ] **Lista de Módulos/Aulas** com títulos e tópicos
- [ ] **Flash Cards** (mínimo 3-5 cards)
- [ ] **Duração estimada** de cada módulo (em horas)

### 2. Informações Básicas
- [ ] **Nome da tecnologia** (ex: "Linux", "Docker", "DevOps")
- [ ] **Ícone emoji** representativo (ex: 🐧, 🐳, ⚙️)
- [ ] **Descrição curta** (1 linha, ~50 caracteres)
- [ ] **Cores das seções** (escolher da paleta Tailwind)

### 3. Ambiente de Desenvolvimento
- [ ] Servidor dev rodando: `npm run dev`
- [ ] Git branch criada: `feature/US-XXX-sistema-[nome]`
- [ ] Este documento lido completamente

---

## 🏗️ Estrutura de Arquivos

Para um curso chamado "**Linux**", você criará:

```
src/
├── components/
│   ├── LinuxLearningSystem.jsx    # Sistema principal do curso
│   └── LinuxNotesView.jsx          # Página individual da aula
├── data/
│   └── linuxLearningData.js        # Dados: fases, módulos
```

### Convenções de Nomeação

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| **Componente Principal** | `[Nome]LearningSystem.jsx` | `LinuxLearningSystem.jsx` |
| **Notas/Aulas** | `[Nome]NotesView.jsx` | `LinuxNotesView.jsx` |
| **Dados** | `[nome]LearningData.js` | `linuxLearningData.js` |
| **LocalStorage Key** | `[nome]-learning-notes` | `linux-learning-notes` |

**Regras:**
- **Componentes:** PascalCase (primeira letra maiúscula)
- **Arquivos de dados:** camelCase (primeira letra minúscula)
- **Chaves localStorage:** kebab-case (com hífens)

---

## 📝 Passo a Passo: Como Criar Novo Curso

### **Passo 1: Criar Arquivo de Dados** (30 min)

**Arquivo:** `src/data/linuxLearningData.js`

**Baseado em:** `templates/learningDataTemplate.js`

**Ações:**
1. Copiar template: `cp templates/learningDataTemplate.js src/data/linuxLearningData.js`
2. Substituir `[NOME_MAIUSCULO]` por `LINUX`
3. Substituir `[nome]` por `linux`
4. Definir 3-4 seções (fasesLinux)
5. Criar 8-16 módulos (modulosLinux)
6. Validar estrutura JSON

**Exemplo de Estrutura:**
```javascript
export const fasesLinux = [
  {
    id: 1,
    nome: "Seção 1: Fundamentos do Sistema",
    semanas: "1-3",
    cor: "bg-blue-500",
    icone: BookOpen, // Import from lucide-react
    descricao: "Sistema operacional, arquitetura e filosofia Unix"
  },
  // ... mais 2-3 seções
];

export const modulosLinux = [
  {
    id: 1,
    faseId: 1,
    titulo: "Aula 1.1: História e Filosofia Unix/Linux",
    duracao: "2h",
    temNotas: true,
    topicos: [
      "Origem do Unix nos Bell Labs",
      "Surgimento do Linux (Linus Torvalds)",
      "Filosofia: Tudo é arquivo"
    ]
  },
  // ... mais módulos
];
```

---

### **Passo 2: Criar Componente Principal** (1-2h)

**Arquivo:** `src/components/LinuxLearningSystem.jsx`

**Baseado em:** `templates/LearningSystemTemplate.jsx`

**Ações:**
1. Copiar template: `cp templates/LearningSystemTemplate.jsx src/components/LinuxLearningSystem.jsx`
2. **Find & Replace (9 substituições):**
   - `[NOME]` → `Linux` (nome da tecnologia)
   - `[nome]` → `linux` (lowercase)
   - `[ICONE]` → `🐧` (emoji)
   - `[VIDEO_URL]` → URL do YouTube
   - `[COR_PRIMARIA]` → `green` (cor principal)
   - `[COR_SECUNDARIA]` → `blue` (cor secundária)
3. Importar dados: `import { fasesLinux, modulosLinux } from '../data/linuxLearningData'`
4. Ajustar props conforme necessário

**Checklist do Componente:**
- [ ] Import do Breadcrumb
- [ ] Import dos dados (fases, módulos)
- [ ] Estado para notas (localStorage)
- [ ] Estado para progresso (completedModules)
- [ ] Breadcrumb no topo
- [ ] Título: "Curso de [Nome]"
- [ ] Botão "← Voltar ao Hub"
- [ ] Grid 2 colunas (Vídeo + Caderno)
- [ ] Vídeo YouTube embedado
- [ ] "📒 Meu Caderno de Notas"
- [ ] Auto-save em localStorage
- [ ] Seções com cores diferenciadas
- [ ] Módulos com checkbox de progresso
- [ ] Botão "📖 Estudar"

---

### **Passo 3: Criar Componente de Notas** (1h)

**Arquivo:** `src/components/LinuxNotesView.jsx`

**Baseado em:** `templates/NotesViewTemplate.jsx`

**Ações:**
1. Copiar template: `cp templates/NotesViewTemplate.jsx src/components/LinuxNotesView.jsx`
2. **Find & Replace:**
   - `[NOME]` → `Linux`
   - `[nome]` → `linux`
3. Adaptar conteúdo dos tópicos
4. Integrar com LearningSystem

**Estrutura da Aula:**
```jsx
<div className="max-w-5xl mx-auto">
  <Breadcrumb items={[...]} />

  <h1>📝 Aula 1.1: [Título do Módulo]</h1>

  <button>← Voltar ao Curso</button>

  {/* Subtópicos Expandíveis */}
  <section>
    <h2>📚 Subtópicos da Aula</h2>
    {topicos.map(topico => (
      <details>
        <summary>{topico.titulo}</summary>
        <div>{topico.conteudo}</div>
      </details>
    ))}
  </section>

  {/* Flash Cards */}
  <button>💡 Praticar com Flash Cards</button>
</div>
```

---

### **Passo 4: Integrar com Sistema Principal** (30 min)

**Arquivo:** `src/components/SistemaEducacionalCompleto.jsx`

**Ações:**
1. Importar novo componente:
   ```jsx
   import { LinuxLearningSystem } from './LinuxLearningSystem';
   ```

2. Adicionar estado específico:
   ```jsx
   const [completedLinuxModules, setCompletedLinuxModules] = useState(new Set());
   ```

3. Adicionar caso no switch:
   ```jsx
   case 'linux':
     return <LinuxLearningSystem
       onBack={() => setCurrentView('hub')}
       completedModules={completedLinuxModules}
       setCompletedModules={setCompletedLinuxModules}
     />;
   ```

---

### **Passo 5: Atualizar studyAreas.js** (10 min)

**Arquivo:** `src/data/studyAreas.js`

**Ações:**
1. Mudar status de `'in-development'` para `'active'`:
   ```javascript
   linux: {
     name: 'Linux',
     icon: '🐧',
     description: 'Sistema operacional, comandos e administração',
     status: 'active', // ← Mudar aqui
     badge: 'integrated', // ← Adicionar badge
     modules: 12,
     hours: 24,
     hasIntegratedApp: true, // ← Adicionar flag
     // ... flashcards existentes
   }
   ```

---

### **Passo 6: Validar com Checklist de Conformidade** (30 min)

**Checklist Obrigatório (14 itens):**

#### Visual e Estrutura
- [ ] Fundo claro `bg-gray-50` (não escuro)
- [ ] Container `max-w-6xl mx-auto`
- [ ] Breadcrumb no topo (primeiro elemento)

#### Cabeçalho
- [ ] Título: "Curso de [Tecnologia]" (`text-3xl font-bold text-gray-900`)
- [ ] Botão "← Voltar ao Hub" sempre visível
- [ ] Progresso no cabeçalho (percentual + barra gradiente)

#### Conteúdo
- [ ] Grid `lg:grid-cols-3 gap-6` (Vídeo 2/3 + Notas 1/3)
- [ ] Vídeo YouTube embedado com iframe responsivo
- [ ] "📒 Meu Caderno de Notas" com textarea (h-80)
- [ ] Auto-save localStorage com feedback "Salvo!"

#### Seções e Módulos
- [ ] Seções com header colorido e ícone
- [ ] Módulos com checkbox de progresso (CheckCircle/Circle)
- [ ] Botão "📖 Estudar" (NÃO "Ver Notas")
- [ ] Persistência em localStorage

#### Nomenclatura (Glossário ÉPICO 12)
- [ ] "Curso de [Nome]" (não "Sistema de Aprendizado")
- [ ] "📒 Meu Caderno de Notas" (não "Notas Rápidas")
- [ ] "Seção X" (não "FASE X")
- [ ] "Aula X.X" (não "Módulo X.X")
- [ ] "📖 Estudar" (não "Ver Notas")
- [ ] "← Voltar ao Curso" (não "Voltar ao Cronograma")

---

### **Passo 7: Testes e Build** (15 min)

**Comandos:**
```bash
# 1. Build de produção
npm run build
# Deve passar sem erros em ~7s

# 2. Verificar console
# Iniciar dev server e navegar para o curso
npm run dev
# Console deve estar limpo (apenas warnings menores)

# 3. Testar fluxo completo
# Hub → Curso → Aula → Flash Cards → Voltar
```

**Validações:**
- [ ] Build passa sem erros
- [ ] Navegação Hub → Curso funciona
- [ ] Vídeo YouTube carrega
- [ ] Caderno de notas salva (verificar localStorage)
- [ ] Progresso de módulos funciona
- [ ] Botão "Estudar" navega para NotesView
- [ ] Breadcrumb está visível e clicável
- [ ] Voltar ao Hub funciona

---

### **Passo 8: Screenshots de Evidência** (10 min)

**Capturar 2 screenshots:**
1. **Nível 2:** Curso principal (com vídeo e caderno)
   - `screenshots/sistema-linux-curso-principal.png`
2. **Nível 3:** Página de aula (com breadcrumb)
   - `screenshots/sistema-linux-aula-01.png`

**Método:**
- Usar ferramenta de screenshot do sistema
- Ou usar MCP Chrome DevTools: `mcp__chrome-devtools__take_screenshot`

---

### **Passo 9: Documentação Final** (15 min)

**Atualizar PRODUCT-CENTRAL-DOCUMENT.md:**

1. Marcar US como DONE:
   ```markdown
   ### US-072: Sistema Linux Completo ✅ DONE

   **Data Conclusão:** 2025-11-XX

   **Critérios de Aceite:**
   - [x] LinuxLearningSystem.jsx implementado
   - [x] LinuxNotesView.jsx implementado
   - [x] linuxLearningData.js com 4 seções, 12 módulos
   - [x] Vídeo YouTube integrado
   - [x] Checklist de conformidade validado (14/14)
   - [x] Build passou (Xs)
   - [x] Screenshots capturados

   **Arquivos Criados:**
   - src/components/LinuxLearningSystem.jsx (300+ linhas)
   - src/components/LinuxNotesView.jsx (200+ linhas)
   - src/data/linuxLearningData.js (150+ linhas)
   ```

2. Atualizar métricas:
   ```yaml
   Sistemas Integrados: 6 (+ Linux)
   Módulos Totais: 239 (+ 12)
   Horas de Conteúdo: 716h (+ 24h)
   ```

---

## ⏱️ Tempo Estimado Total

| Etapa | Tempo | Acumulado |
|-------|-------|-----------|
| 1. Criar arquivo de dados | 30 min | 30 min |
| 2. Componente principal | 1-2h | 2h30 |
| 3. Componente de notas | 1h | 3h30 |
| 4. Integração sistema | 30 min | 4h |
| 5. Atualizar studyAreas | 10 min | 4h10 |
| 6. Validar checklist | 30 min | 4h40 |
| 7. Testes e build | 15 min | 4h55 |
| 8. Screenshots | 10 min | 5h05 |
| 9. Documentação final | 15 min | **5h20** |

**Total: 5-6 horas** (1 dia de trabalho focado)

Para desenvolvedores experientes: 4-5h
Para iniciantes: 6-8h

---

## 🎨 Paleta de Cores Sugerida

Use cores do Tailwind CSS para as seções:

| Cor | Classe Tailwind | Uso Recomendado |
|-----|----------------|-----------------|
| 🔵 Azul | `bg-blue-500` | Fundamentos, Introdução |
| 🟢 Verde | `bg-green-500` | Comandos, Ferramentas |
| 🟣 Roxo | `bg-purple-500` | Administração, Configuração |
| 🔴 Vermelho | `bg-red-500` | Segurança, Avançado |
| 🟠 Laranja | `bg-orange-500` | Redes, Infraestrutura |
| 🟡 Amarelo | `bg-yellow-500` | Performance, Otimização |

**Gradientes para barra de progresso:**
- `from-green-500 to-blue-500` (Bash)
- `from-blue-500 to-purple-500` (C)
- `from-orange-500 to-red-500` (Rust)

---

## 🚨 Erros Comuns e Soluções

### Erro 1: Build falha com "Module not found"
**Causa:** Import incorreto dos dados
**Solução:** Verificar caminho: `import { fasesLinux, modulosLinux } from '../data/linuxLearningData'`

### Erro 2: Console mostra "Cannot read property 'map' of undefined"
**Causa:** Dados não exportados corretamente
**Solução:** Garantir `export const fasesLinux = [...]` no arquivo de dados

### Erro 3: localStorage não salva
**Causa:** Key incorreta ou useEffect faltando
**Solução:** Verificar `localStorage.setItem('linux-learning-notes', notes)`

### Erro 4: Breadcrumb não aparece
**Causa:** Import faltando
**Solução:** `import { Breadcrumb } from './Breadcrumb'`

### Erro 5: Vídeo YouTube não carrega
**Causa:** URL incorreta
**Solução:** Usar formato embed: `https://www.youtube.com/embed/VIDEO_ID`

---

## 📚 Referências

### Padrão Ouro
- **Componente:** `src/components/BashLearningSystem.jsx` (300+ linhas)
- **Dados:** `src/data/bashLearningData.js` (4 seções, 16 módulos)
- **Notas:** `src/components/BashNotesView.jsx` (200+ linhas)

### Documentação
- **PRD:** `PRODUCT-CENTRAL-DOCUMENT.md` (linhas 1846-2001)
- **Validação:** `RELATORIO-CONFORMIDADE-PADRAO-BASH-2025-11-13.md`
- **Glossário:** ÉPICO 12 (nomenclatura obrigatória)

### Templates
- **Sistema Principal:** `templates/LearningSystemTemplate.jsx`
- **Notas:** `templates/NotesViewTemplate.jsx`
- **Dados:** `templates/learningDataTemplate.js`

---

## ✅ Checklist Final (Antes de Marcar US como DONE)

### Código
- [ ] 3 arquivos criados (LearningSystem, NotesView, Data)
- [ ] studyAreas.js atualizado (status: 'active')
- [ ] SistemaEducacionalCompleto.jsx integrado
- [ ] Imports corretos (Breadcrumb, dados, ícones)
- [ ] No console.log em produção

### Funcionalidade
- [ ] Navegação Hub → Curso → Aula → Hub funciona
- [ ] Vídeo YouTube carrega
- [ ] Caderno de notas salva em localStorage
- [ ] Progresso de módulos persiste
- [ ] Breadcrumb clicável em todos os níveis
- [ ] Botões com nomenclatura correta

### Qualidade
- [ ] Build passa: `npm run build` (sem erros)
- [ ] Console limpo (apenas warnings menores)
- [ ] Checklist de conformidade: 14/14 itens ✅
- [ ] Screenshots capturados (2 evidências)

### Documentação
- [ ] US marcada como DONE no PRD
- [ ] Métricas atualizadas (sistemas, módulos, horas)
- [ ] Arquivos documentados no critério de aceite
- [ ] CLAUDE.md atualizado (conquistas recentes)

---

## 🏆 Parabéns!

Você criou um novo sistema de aprendizado seguindo 100% o padrão Bash!

**Próximos passos:**
- Implementar próximo sistema (Docker, Kubernetes, etc.)
- Ou criar User Stories para features específicas
- Ou melhorar conteúdo existente (mais módulos, flash cards)

**Lembre-se:**
- Sempre seguir este template
- Validar com checklist obrigatório
- Documentar tudo no PRD
- Capturar evidências visuais

---

**📅 Última Atualização:** 2025-11-13
**✅ Status:** Documentação Oficial Aprovada
**🔄 Revisão:** A cada novo sistema implementado
**📊 Versão:** 1.0

---

*Este documento é parte da infraestrutura de qualidade do Plataforma B2B de treinamento técnico corporativo. Siga-o rigorosamente para garantir consistência em todos os sistemas educacionais.*
