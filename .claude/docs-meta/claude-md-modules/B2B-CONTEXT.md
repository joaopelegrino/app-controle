# Contexto B2B Corporativo

**Módulo:** B2B-CONTEXT.md
**Parte de:** CLAUDE.md modularizado
**Última atualização:** 2025-11-17

---

## 🎯 Contexto B2B Corporativo

**Plataforma B2B de treinamento técnico corporativo** é um produto B2B (plataforma de treinamento técnico corporativo) desenvolvido e testado por **João Pelegrino** como fundador/desenvolvedor.

### **Público-Alvo do Produto**
- **Primário**: CTOs, Gerentes de Engenharia, Diretores de RH/T&D
- **Secundário**: Colaboradores técnicos (desenvolvedores, DevOps, SREs)
- **Mercado**: Empresas de tecnologia 50-500 funcionários (Brasil)

### **Stack Técnica Utilizada** (Para Desenvolvimento)
- React e componentes funcionais
- Hooks (useState, useEffect)
- Tailwind CSS e design responsivo
- Vite como build tool moderno
- Docker e containerização
- CI/CD e automação com GitHub Actions
- Testes automatizados (Vitest, Playwright)
- MCP e integração com ferramentas
- Git workflow e boas práticas
- Arquitetura de componentes
- Gerenciamento de estado

### **Personas B2B (Referência de Negócio)**
Consultar: `docs/conceitual/01-visao-geral/05-personas-corporativas.md`

- **Persona 1: "Carlos, CTO de Startup"** (120 funcionários, gasta R$180k/ano em Udemy Business, quer customização)
- **Persona 2: "Ana, Gerente de Engenharia"** (fintech 200 pessoas, onboarding caótico, precisa padronização)
- **Persona 3: "Roberto, Diretor de RH"** (consultoria 500 pessoas, quer universidade corporativa)

### Estilo de Comunicação
Explicações devem ser:
- **Claras e didáticas**: Evitar jargões sem explicação (facilitando onboarding de novos contribuidores)
- **Com exemplos práticos**: Mostrar código real do projeto
- **Focadas no "porquê"**: Não apenas "como", mas por que fazemos assim (decisões arquiteturais B2B)
- **Em português brasileiro**: Linguagem natural
- **Com insights educacionais**: Seção "★ Insight" ao final de tarefas complexas
- **Contexto B2B**: Sempre lembrar que o produto é corporativo, não pessoal

### Output Style: Learning Mode
Configurado em `.claude/settings.local.json`:
```json
{
  "outputStyle": "Learning"
}
```

**Características:**
- Insights educacionais após implementações (facilitam evolução do produto)
- Explicações de conceitos técnicos
- Conexões com padrões da indústria (B2B SaaS)
- Encorajamento do aprendizado prático
- Solicitação de input do usuário em decisões de design (produto B2B)

## 📚 Documentação de Referência

### 📄 Documentos Ativos (Raiz do Projeto)
- **CLAUDE.md** - Instruções completas do projeto para Claude Code (este arquivo)
- **README.md** - README principal do projeto
- **PRODUCT-CENTRAL-DOCUMENT.md** - ⚠️ DEPRECATED (redireciona para ROADMAP.md)

### 📋 Product Management (docs/backlog/)
- **ROADMAP.md** - ✅ SSOT (Single Source of Truth) - PRD B2B v3.0
  - Visão B2B Plataforma B2B de treinamento técnico corporativo (3 personas corporativas)
  - Estado Atual (Release 1.0 completa)
  - 4 Releases planejadas (Q1-Q3 2026)
  - 40+ User Stories B2B priorizadas
  - Métricas corporativas (NPS, engajamento, ARR)
  - Matriz RICE de priorização

### 📘 Documentação Técnica (docs/)
**Guias MCP Chrome DevTools:**
- **MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md** - Configuração detalhada WSL2
- **MCP-CHROME-DEVTOOLS-MANUAL-USO.md** - 24 comandos MCP + casos de uso
- **MCP-CHROME-DEVTOOLS-QUICK-START.md** - Início rápido (5 minutos)

**Templates Oficiais:**
- **TEMPLATE-CURSO-PADRAO.md** - Template para criar novos sistemas de aprendizado

### 📚 Meta-Documentação (.claude/meta-docs/)

**Propósito:** Única fonte da verdade sobre evolução da configuração do Claude Code (skills, agents, hooks, CLAUDE.md)

**Estrutura Organizada:**
```
meta-docs/
├── README.md                   # Propósito e guidelines
├── INDEX.md                    # Catálogo completo (12 documentos)
│
├── sessions/                   # 🗓️ Sessões de evolução (4 docs)
│   └── 2025-11-13/            # Organizado por data
│       ├── epico-12-completo.md
│       ├── sprint-25-completo.md
│       ├── us-071-template-padrao.md
│       └── validacao-padrao-bash.md
│
├── validacoes/                 # ✅ Validações de config (3 docs)
│   ├── epico-12.md            # ÉPICO 12 - 100% completo
│   ├── us-061.md              # Breadcrumb - 13/13 critérios
│   └── mcp-chrome-devtools.md # MCP - 24 ferramentas
│
└── diagnosticos/               # 📊 Análises técnicas (5 docs)
    ├── plataforma-b2b-2025-11-13.md
    ├── conformidade-padrao-bash.md
    ├── limpeza-projeto.md
    ├── usabilidade.md
    └── guias/
        └── playwright-mcp-screenshots.md
```

**Consultar:**
- [INDEX.md](/.claude/meta-docs/INDEX.md) - Navegação completa
- [README.md](/.claude/meta-docs/README.md) - Como usar meta-docs

**Nota:** meta-docs/ rastreia apenas configuração do Claude Code, NÃO documentação da aplicação

### Links Externos Úteis
- [Documentação React](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Playwright Docs](https://playwright.dev)
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)

---

**Última atualização:** 2025-11-17
**Responsável:** Modularização CLAUDE.md v1.0
**Status:** ✅ Completo
