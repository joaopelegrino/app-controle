# 🧪 Teste do ArchAssist — Modo de Melhoria de Prompts

---

## Passo 1 — 🔍 Diagnóstico do seu prompt

| O que encontrei | Por que importa | Como vou resolver |
|---|---|---|
| **Instrução vaga: "limpe"** | O LLM não sabe o que "limpar" significa — pode remover coisas importantes ou de menos. Precisa de critérios objetivos do que manter e do que descartar. | Definir regras explícitas de filtragem: o que preservar (estrutura de diretórios principal, arquivos-chave) e o que resumir ou omitir (node_modules, assets, arquivos repetitivos). |
| **Sem formato de saída definido** | Sem saber o formato esperado, o LLM pode devolver texto corrido, uma lista, um JSON, ou qualquer outra coisa. Cada execução será diferente. | Especificar o formato exato: Markdown estruturado com hierarquia de pastas, descrições e anotações. |
| **"Pensando em tokens" é vago** | O LLM não sabe qual é o limite de tokens, nem como priorizar o que cortar. "Massante em relação a tokens" não é um critério técnico. | Definir um orçamento alvo de tamanho (ex: máximo de ~2000 palavras) e regras de compactação por tipo de pasta/arquivo. |
| **Sem contexto de público-alvo** | "LLMs e devs" têm necessidades diferentes. Um dev quer saber onde está o código; um LLM precisa de contexto semântico sobre o que cada módulo faz. | Instruir o prompt a gerar descrições que sirvam para ambos: estrutura navegável + descrições funcionais breves. |
| **Sem exemplos de entrada/saída** | Sem um exemplo de como a árvore de entrada se parece e como a saída deve ficar, o LLM vai interpretar livremente. | Adicionar um exemplo few-shot com entrada (trecho de `tree`) e saída esperada (sumário limpo). |
| **Sem guardrails** | O LLM pode inventar descrições de pastas que não existem, ou remover arquivos críticos como configurações de build. | Adicionar regra anti-alucinação: descrever apenas o que está presente na árvore, nunca inferir funcionalidades não evidentes. |

---

## Passo 2 — 🔤 Tradução dos seus termos

**Você disse:** "Leia o documento que contém o resultado do tree"
**Termo técnico:** **Parsing de input estruturado**
O que significa: Instruir o LLM a interpretar a saída do comando `tree` como uma estrutura de diretórios hierárquica, não como texto livre.

**Você disse:** "limpe"
**Termo técnico:** **Filtragem e sumarização seletiva**
O que significa: Aplicar regras para decidir o que manter na íntegra, o que resumir com uma descrição, e o que omitir completamente.

**Você disse:** "retirando estruturas de pastas massantes em relação a tokens"
**Termo técnico:** **Compactação de contexto / context pruning**
O que significa: Reduzir o tamanho da saída removendo ou colapsando partes repetitivas (como pastas com dezenas de arquivos CSS ou imagens) para que o documento caiba em uma context window de LLM sem desperdiçar tokens.

**Você disse:** "sumário para contextualização inicial"
**Termo técnico:** **Project context map / onboarding document**
O que significa: Um documento de visão geral que permite a qualquer pessoa (ou LLM) entender rapidamente a estrutura, propósito e organização do projeto antes de mergulhar no código.

**Você disse:** "para início de navegação de LLMs e devs"
**Termo técnico:** **Bootstrap context / initial grounding document**
O que significa: O primeiro documento que um LLM ou desenvolvedor recebe para se orientar no projeto — funciona como um "mapa" antes de explorar arquivos específicos.

---

## Passo 3 — Perguntas de Refinamento

Neste caso, o contexto fornecido é suficiente para gerar uma melhoria sólida. O projeto é JavaScript, o objetivo é gerar um sumário navegável para LLMs e devs, e a entrada é um `tree --all`. Seguimos direto para o Passo 4.

> ⚠️ **Nota:** Em uma iteração futura, seria útil saber: qual framework JS é usado (React, Next.js, Express, etc.), se é monorepo, e qual LLM vai consumir o documento (para calibrar o tamanho ideal).

---

## Passo 4 — Prompt Melhorado

### Bloco A — Prompt pronto para uso

```markdown
# System Prompt — Gerador de Sumário de Estrutura de Projeto

Você é um **engenheiro de software especialista em documentação técnica e onboarding de projetos**. Sua tarefa é transformar a saída bruta do comando `tree --all` de um projeto JavaScript em um **sumário estruturado e conciso** que sirva como documento de contextualização inicial.

## Objetivo

Gerar um **project context map** — um documento que permite a desenvolvedores e LLMs entenderem rapidamente a organização, propósito e estrutura do projeto antes de navegar pelo código-fonte.

## Entrada

Você receberá a saída completa do comando `tree --all` de um projeto JavaScript, delimitada pela tag abaixo:

<tree_output>
[saída completa do tree --all será inserida aqui]
</tree_output>

## Regras de Processamento

### O que PRESERVAR na íntegra (listar cada arquivo/pasta individualmente):
- Arquivos na raiz do projeto (package.json, tsconfig.json, .env.example, README.md, docker-compose.yml, Dockerfile, etc.)
- Diretórios de primeiro nível (src/, lib/, app/, pages/, api/, config/, scripts/, tests/, docs/)
- Arquivos de configuração de build e CI/CD (.github/workflows/, .eslintrc, .prettierrc, jest.config.*, webpack.config.*, vite.config.*, next.config.*)
- Arquivos de entrada principais (index.js, index.ts, main.js, app.js, server.js)
- Estrutura de rotas ou controllers (até 2 níveis de profundidade)

### O que RESUMIR (colapsar em uma linha descritiva):
- Pastas com mais de 10 arquivos do mesmo tipo → `📁 components/ — 23 componentes React (.jsx)`
- Pastas de estilos (css/, styles/, scss/) → `📁 styles/ — 15 arquivos de estilização (CSS/SCSS)`
- Pastas de assets/imagens/fontes → `📁 assets/ — imagens, fontes e ícones (47 arquivos)`
- Pastas de testes com muitos arquivos → `📁 __tests__/ — 31 arquivos de teste (Jest)`
- Pastas de tipos/interfaces (types/, interfaces/) → `📁 types/ — 12 definições de tipos TypeScript`

### O que OMITIR completamente:
- `node_modules/` e todo seu conteúdo
- `.git/` e todo seu conteúdo
- `dist/`, `build/`, `.next/`, `out/` (artefatos de build)
- `.cache/`, `.tmp/`, `.parcel-cache/`
- Arquivos de lock individuais dentro de subpastas (preservar apenas o da raiz)
- Arquivos `.DS_Store`, `Thumbs.db`

## Formato de Saída

Gere o sumário em **Markdown** seguindo esta estrutura:

```
# 📋 Sumário do Projeto: [nome do projeto se identificável]

## Visão Geral
[1-3 frases descrevendo o que o projeto parece ser, baseado APENAS na estrutura observada. Ex: "Aplicação Next.js com API REST, autenticação e banco de dados PostgreSQL."]

## Stack Identificada
[Lista das tecnologias identificáveis pelos arquivos de configuração. Ex: Next.js, TypeScript, Prisma, Jest, Docker]

## Estrutura Principal
[Árvore filtrada e anotada seguindo as regras acima]

## Pontos de Entrada
[Arquivos que provavelmente são os pontos de entrada da aplicação]

## Observações para Navegação
[2-3 dicas sobre como navegar o projeto. Ex: "A lógica de negócio está concentrada em src/services/. As rotas da API estão em src/app/api/."]
```

## Restrições

- **NUNCA invente funcionalidades ou descrições** que não sejam evidentes pela estrutura de arquivos. Se não tiver certeza do que uma pasta faz, descreva-a de forma neutra: `📁 utils/ — arquivos utilitários (8 arquivos .js)`.
- **NUNCA inclua conteúdo de arquivos** — apenas nomes e descrições baseadas na nomenclatura.
- O sumário final deve ter no máximo **~2000 palavras**. Se a árvore original for muito grande, priorize a estrutura de primeiro e segundo nível.
- Use emojis de forma funcional para facilitar a leitura rápida: 📁 para pastas, 📄 para arquivos importantes, ⚙️ para configuração, 🧪 para testes, 🚀 para pontos de entrada.

## Exemplo

### Entrada (trecho):
<tree_output>
├── .github
│   └── workflows
│       ├── ci.yml
│       └── deploy.yml
├── src
│   ├── components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Table.jsx
│   │   ├── Form.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Tooltip.jsx
│   │   └── Dropdown.jsx
│   ├── services
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── apiClient.js
│   └── index.js
├── public
│   ├── favicon.ico
│   ├── logo.png
│   └── images
│       ├── banner1.jpg
│       ├── banner2.jpg
│       └── ... (14 mais)
├── package.json
├── package-lock.json
└── next.config.js
</tree_output>

### Saída esperada:

# 📋 Sumário do Projeto

## Visão Geral
Aplicação Next.js com componentes React, serviços de autenticação e integração com API.

## Stack Identificada
Next.js, React (JSX), JavaScript

## Estrutura Principal
```
📄 package.json
📄 package-lock.json
⚙️ next.config.js
⚙️ .github/workflows/ — CI (ci.yml) e deploy (deploy.yml)
🚀 src/index.js — ponto de entrada
📁 src/components/ — 12 componentes React (.jsx)
📁 src/services/ — 3 serviços (auth, user, apiClient)
📁 public/ — favicon, logo
📁 public/images/ — 16 imagens estáticas
```

## Pontos de Entrada
- `src/index.js` — entrada principal da aplicação

## Observações para Navegação
- A lógica de integração com APIs está em `src/services/`.
- Os componentes de UI estão concentrados em `src/components/`.
```

---

### Bloco B — 📝 O que foi alterado

1. **Adicionada role definition clara** — O prompt original não definia quem o LLM deveria "ser". Agora ele assume o papel de engenheiro de documentação, o que melhora a qualidade e consistência da saída.

2. **Criadas regras explícitas de filtragem (preservar/resumir/omitir)** — "Limpe" foi substituído por três categorias objetivas com critérios concretos. O LLM agora sabe exatamente o que fazer com cada tipo de pasta.

3. **Definido formato de saída em Markdown estruturado** — Em vez de deixar o LLM escolher o formato, o prompt especifica seções fixas (Visão Geral, Stack, Estrutura, Pontos de Entrada, Observações) que garantem consistência.

4. **Adicionado orçamento de tamanho (~2000 palavras)** — Substitui a noção vaga de "reduzir tokens" por um limite concreto que o LLM pode seguir.

5. **Adicionado exemplo few-shot (entrada → saída)** — Um exemplo concreto mostra ao LLM exatamente como transformar a árvore bruta no sumário desejado. Isso reduz drasticamente a variação entre execuções.

6. **Adicionados guardrails anti-alucinação** — Regra explícita proibindo o LLM de inventar descrições de funcionalidades não evidentes na árvore.

7. **Adicionada seção de Stack Identificada** — O LLM agora extrai as tecnologias dos arquivos de configuração, dando contexto técnico imediato.

8. **Adicionado uso funcional de emojis** — Ícones como 📁, 📄, ⚙️, 🧪, 🚀 funcionam como marcadores visuais que aceleram a leitura tanto para devs quanto para LLMs.

9. **Input delimitado com tag XML** — A saída do `tree` agora é envolvida em `<tree_output>`, separando claramente os dados das instruções e reduzindo risco de prompt injection.

---

### Bloco C — 📖 Glossário

- **Context pruning (poda de contexto)**: Técnica de remover ou comprimir partes menos relevantes de um texto para que ele caiba dentro do limite de tokens de um LLM, sem perder informação crítica.

- **Context window**: A quantidade máxima de texto (medida em tokens) que um LLM consegue processar de uma vez. Quanto menor o documento de entrada, mais "espaço" sobra para o LLM raciocinar e responder.

- **Few-shot example**: Um exemplo de entrada e saída incluído no prompt para ensinar ao LLM o padrão desejado. É como mostrar um "modelo" antes de pedir o trabalho.

- **Guardrail**: Uma regra de segurança ou qualidade embutida no prompt que impede o LLM de produzir resultados indesejados (como inventar informações).

- **Prompt injection**: Técnica maliciosa onde alguém insere instruções escondidas nos dados de entrada para manipular o comportamento do LLM. Delimitar o input com tags XML ajuda a prevenir isso.

- **Role definition**: A primeira instrução do prompt que define "quem" o LLM deve ser (ex: "Você é um engenheiro de documentação"). Isso calibra o tom, vocabulário e nível de detalhe das respostas.

- **Project context map**: Documento de visão geral de um projeto que funciona como um "mapa" — mostra a estrutura, tecnologias e pontos de entrada sem entrar no detalhe do código.

- **Bootstrap context**: O primeiro bloco de informação dado a um LLM ou desenvolvedor para que ele se oriente antes de começar a trabalhar no projeto. Funciona como um "briefing inicial".

- **Token**: A unidade de texto que um LLM processa. Uma palavra comum ≈ 1 token, palavras longas ou técnicas podem ser 2-3 tokens. Quanto menos tokens o documento consome, mais sobra para a resposta do LLM.

---

## Passo 5 — Oferta de Iteração

Quer que eu ajuste algo? Posso, por exemplo:

- **Adaptar para um framework específico** (Next.js, Express, NestJS, etc.) com regras de filtragem mais precisas para a estrutura desse framework
- **Adicionar suporte a monorepo** com regras para workspaces (Turborepo, Nx, Lerna)
- **Incluir mais exemplos few-shot** com árvores maiores e mais complexas
- **Adicionar uma seção de "Arquivos críticos para ler primeiro"** que priorize os arquivos mais importantes para entender o projeto
- **Gerar uma versão compacta (~500 palavras)** para LLMs com context window menor
- **Adaptar para projetos em outras linguagens** (Python, Go, Java, etc.)
