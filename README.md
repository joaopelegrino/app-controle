# Plataforma B2B de treinamento técnico corporativo

**Plataforma B2B de treinamento técnico corporativo** que estrutura, organiza e mensura o conhecimento interno de empresas de tecnologia.

## 🎯 Visão Geral

**Plataforma B2B de treinamento técnico corporativo** resolve o problema de empresas que gastam R$150k-200k/ano em plataformas genéricas (Udemy Business, Coursera) mas enfrentam:
- ❌ Baixa taxa de engajamento (apenas 10-15% dos colaboradores usam)
- ❌ Conteúdo não customizável para stack específico da empresa
- ❌ Impossibilidade de medir ROI real do treinamento
- ❌ Onboarding técnico desorganizado (2+ meses para produtividade)

**Solução:** Plataforma própria white-label que estrutura conteúdo técnico (programação, DevOps, segurança) com trilhas customizáveis, progresso rastreável e analytics corporativo.

---

## 💼 Contexto B2B

### **Público-Alvo Principal**
- Empresas de tecnologia (startups a mid-size, 50-500 funcionários)
- Áreas de RH/T&D de corporações tech
- Times de engenharia que precisam padronizar onboarding técnico
- Consultorias que treinam clientes em tecnologias específicas

### **Problema Resolvido**
\`\`\`
Cenário Típico CTO:
"Gastamos R$ 180 mil/ano no Udemy Business, mas só 10% dos devs usam.
 Precisamos de algo mais focado no nosso stack (React, Rust, DevOps)."

Cenário Típico Gerente de Engenharia:
"Nosso onboarding técnico é um caos. Cada líder ensina do seu jeito.
 Levamos 2 meses para um júnior ficar produtivo."
\`\`\`

### **Proposta de Valor**
- ✅ **Customizável**: Crie cursos específicos da empresa (stack, ferramentas internas)
- ✅ **Mensurável**: Analytics de engajamento, conclusão, tempo por módulo
- ✅ **Escalável**: Onboard 10 ou 100 devs com mesmo padrão de qualidade
- ✅ **Flexível**: Self-hosted gratuito ou SaaS gerenciado com consultoria

---

## 💡 Modelo de Negócio (Em Definição)

> **Status:** 🟡 Decisão em aberto - pesquisa de tecnologias concluída, validação pendente

### Visão: Open Core + Consultoria T&D

O Plataforma B2B de treinamento técnico corporativo está sendo desenvolvido com modelo **Open Core**, inspirado em casos de sucesso como GitLab (69% YoY growth), Supabase e Mattermost:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MODELO HÍBRIDO (EM VALIDAÇÃO)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🆓 COMMUNITY (Self-Hosted)        💼 SAAS GERENCIADO               │
│  ────────────────────────          ────────────────────────         │
│  • 100% gratuito                   • Starter: R$ 499/mês            │
│  • Docker Compose                  • Professional: R$ 2.499/mês     │
│  • Código aberto (AGPL-3.0*)       • Enterprise: Sob consulta       │
│  • Suporte: comunidade             • Suporte: dedicado              │
│  • Sem limite de usuários          • + Consultoria T&D inclusa      │
│                                                                      │
│  * Licença em definição (AGPL-3.0, Apache 2.0 ou MIT)               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Opções de Stack Backend (Em Avaliação)

| Componente | Opção A (Self-Hosted) | Opção B (Cloud) | Status |
|------------|----------------------|-----------------|--------|
| **Database** | PostgreSQL 16 (Docker) | Supabase | 🟡 Em avaliação |
| **Autenticação** | Keycloak / Authentik / Ory | Supabase Auth | 🟡 Em avaliação |
| **Storage** | MinIO (S3-compatible) | Supabase Storage | 🟡 Em avaliação |
| **Analytics** | DuckDB | MotherDuck | 🟡 Em avaliação |

> **Pesquisa completa:** [docs/backlog/relatorios/2025-11-22-pesquisa-solucoes-database.md](docs/backlog/relatorios/2025-11-22-pesquisa-solucoes-database.md)

### Diferencial: Consultoria T&D

Além do software, o Plataforma B2B de treinamento técnico corporativo oferecerá serviços de consultoria especializada:
- Diagnóstico de gaps de competência
- Criação de trilhas customizadas
- Workshops presenciais/remotos
- Implementação enterprise

---

## ⚡ Estado Atual da Plataforma - Novembro 2025

### 🎯 Status do MVP (Hub Simplificado - US-044)
- ✅ **Sistema Totalmente Funcional**: Rodando em `http://localhost:3000`
- ✅ **MVP Focado**: 1 Área de Estudo (Bash) + 1 Caminho Proposto (Backend Developer)
- ✅ **Arquitetura Modular B2B**: Componentes React preparados para multi-tenancy
- ✅ **Interface Responsiva**: Desktop, tablet e mobile
- ✅ **Persistência Local**: localStorage com tratamento de erros (US-041)

### 🆕 Funcionalidades Implementadas (Release 1.0)
- 📖 **5 Cursos Técnicos Completos**: C (50 aulas), Rust (24 aulas), Bash (16 aulas), VSCode (8 aulas), Claude Code (12 aulas)
- 🛤️ **Trilhas de Aprendizado**: Caminhos estruturados por role (Backend, DevOps, Security)
- 🃏 **Flash Cards Interativos**: Memorização ativa com animações 3D
- 📝 **Caderno de Notas Colaborador**: Auto-save, markdown, 50KB por curso
- 🎥 **Vídeos Integrados**: YouTube embed para conteúdo audiovisual
- 📊 **Progresso Visual**: Barras de conclusão por aula, seção e curso
- 🧭 **Breadcrumb Hierárquico**: Navegação \`Hub > Curso > Aula\` (WCAG 2.1 AA)
- 🎨 **Design System Consistente**: ÉPICO 12 - Nomenclatura 100% padronizada

### 📊 Métricas do MVP
- **1 Área Ativa (MVP)**: Bash Shell Scripting (16 módulos, 32h) - padrão de referência
- **1 Caminho Proposto**: "Desenvolvedor Backend" (Bash → Linux → Docker → DevOps)
- **5 Sistemas Integrados**: Bash, C, Rust, VSCode, Claude Code (apenas Bash ativo no MVP)
- **227 Módulos Planejados**: ~692h de conteúdo (expandindo seguindo padrão Bash)
- **Release 2.0**: 50% completa (US-040 parcial + US-041 + US-044)

---

## 🚀 Diferenciais da Plataforma

### **Para CTOs e Gestores de Engenharia**
- 🎯 **Onboarding Estruturado**: Padronize treinamento técnico em 4 semanas (vs 2+ meses atual)
- 📊 **Analytics Corporativo**: Dashboards de engajamento, conclusão, tempo médio (Release 3.0)
- 💰 **ROI Mensurável**: Compare custo/colaborador vs plataformas genéricas
- 🔐 **Controle Total**: Conteúdo 100% customizável, sem vendor lock-in

### **Para Colaboradores (Usuários Finais)**
- 📖 **Trilhas Claras**: Curso → Aula → Prática (hierarquia de 4 níveis)
- 🎓 **Progresso Visível**: Badges, conclusão percentual, tempo estimado
- 📝 **Caderno Integrado**: Anote enquanto aprende (auto-save 500ms)
- 🃏 **Memorização Ativa**: Flash cards para reforço de conceitos
- 🎥 **Multi-Formato**: Texto, vídeo, código interativo

### **Para Times de RH/T&D**
- 📚 **Biblioteca Técnica**: 13 áreas de conhecimento prontas
- 🛤️ **Trilhas por Role**: Backend, Frontend, DevOps, Security
- 📈 **Relatórios de Engajamento**: Quem está estudando, quanto tempo, taxa de conclusão (futuro)
- 🎯 **Certificações Customizadas**: Crie certificados internos com logo da empresa (futuro)

---

## 🛠️ Stack Tecnológica

- **Bun 1.3.3**: Runtime JavaScript principal (Anthropic - 35x mais rápido que npm)
- **React 18.3.1**: Framework frontend
- **Vite 5.4.19**: Build tool moderno (startup 295ms)
- **Tailwind CSS 3.4.1**: Design system utility-first
- **Lucide React 0.344.0**: Biblioteca de ícones
- **React Markdown 10.1.0**: Renderização de conteúdo
- **Vitest 3.2.4**: Testes unitários
- **Playwright 1.56.1**: Testes E2E
- **Docker + Nginx**: Containerização e deploy
- **mise**: Gerenciador de versões (Node.js 24.11.1 como fallback)

---

## 📁 Estrutura do Projeto

\`\`\`
plataforma-b2b/
├── src/
│   ├── components/          # 18 componentes React
│   │   ├── SistemaEducacionalCompleto.jsx  # Root component
│   │   ├── HubView.jsx                     # Hub principal
│   │   ├── *LearningSystem.jsx (5x)        # Sistemas de cursos
│   │   ├── *NotesView.jsx (5x)             # Caderno de notas
│   │   ├── Breadcrumb.jsx                  # Navegação WCAG AA
│   │   ├── FlashcardModal.jsx              # Flash cards 3D
│   │   └── ...
│   ├── data/                # Dados estruturados
│   │   ├── studyAreas.js                   # 13 áreas de conhecimento
│   │   ├── *LearningData.js (5x)           # Conteúdo dos cursos
│   │   └── ...
│   ├── utils/               # Utilitários
│   └── tests/               # Testes automatizados
├── docs/                    # Documentação técnica
│   ├── conceitual/          # Docs de negócio (PRD, glossário)
│   ├── tecnico/             # Docs de arquitetura
│   └── treinamento-interno/ # Onboarding desenvolvedores
├── .claude/                 # Configuração Claude Code
│   ├── skills/              # Skills especializadas (auto-ativa)
│   ├── agents/              # Agents complexos
│   └── meta-docs/           # Meta-documentação
├── dist/                    # Build de produção
├── docker-compose.yml       # Orquestração Docker
├── package.json             # Dependências
└── README.md                # Este arquivo
\`\`\`

---

## 🚀 Como Rodar Localmente

### **Pré-requisitos**
- **Bun 1.3.3+** (recomendado - via mise)
- mise (gerenciador de versões) ou Node.js 24+ como fallback
- Docker (opcional, para deploy)

### **Instalação**

\`\`\`bash
# Clone o repositório
git clone <repo-url>
cd plataforma-b2b

# Instale dependências (35x mais rápido com Bun!)
bun install

# Rode o servidor de desenvolvimento
bun run dev
# Acesse: http://localhost:3000
\`\`\`

### **Build de Produção**

\`\`\`bash
# Build otimizado
bun run build

# Preview da build
bun run preview
\`\`\`

### **Docker**

\`\`\`bash
# Build e suba o container
docker-compose up -d

# Acesse: http://localhost:80
\`\`\`

---

## 🧪 Testes

\`\`\`bash
# Testes unitários
bun run test

# Testes com UI
bun run test:ui

# Cobertura de testes
bun run test:coverage

# Testes E2E (Playwright)
bun run test-usabilidade-mcp.cjs
\`\`\`

---

## 📊 Roadmap de Produto

### **Release 1.0 "Foundation"** ✅ **COMPLETA** (Novembro 2025)
- ✅ 5 cursos técnicos completos (110 aulas)
- ✅ Flash cards interativos
- ✅ Caderno de notas com auto-save
- ✅ Progresso visual
- ✅ Breadcrumb hierárquico
- ✅ Build otimizado e Docker

### **Release 2.0 "Quality & Scale"** 📋 **PLANEJADA** (Q1 2026)
- [ ] React Router (navegação por URL, deep linking)
- [ ] Tratamento de erros localStorage (QuotaExceededError)
- [ ] Progresso persistido no backend
- [ ] Refatoração BaseLearningSystem (-800 linhas duplicadas)
- [ ] Cobertura de testes >= 30%
- [ ] Lazy loading de componentes

### **Release 3.0 "Enterprise Features"** 📋 **PLANEJADA** (Q2 2026)
- [ ] Backend Node.js + PostgreSQL
- [ ] Sistema Multi-Tenant (empresas isoladas)
- [ ] SSO Corporativo (SAML, OAuth)
- [ ] Analytics Dashboard para RH/Gestores
- [ ] API RESTful para criação de cursos
- [ ] Dark mode
- [ ] TypeScript migration (gradual)
- [ ] Acessibilidade WCAG 2.1 AA (100%)

### **Release 4.0 "Growth & Scale"** 📋 **PLANEJADA** (Q3 2026)
- [ ] Marketplace B2B2C de cursos técnicos
- [ ] Certificações customizadas por empresa
- [ ] Gamificação corporativa (badges, leaderboards por time)
- [ ] PWA com modo offline
- [ ] Mobile apps (iOS/Android)
- [ ] Integração Slack/Teams (notificações de progresso)

---

## 🤝 Contribuindo

Este é um projeto proprietário B2B. Se você é colaborador:

1. Clone o repositório
2. Leia \`CLAUDE.md\` para entender arquitetura e padrões
3. Consulte \`docs/conceitual/01-visao-geral/00-definicoes-principais.md\` para glossário
4. Consulte \`PRODUCT-CENTRAL-DOCUMENT.md\` para PRD e User Stories
5. Crie branch: \`feature/US-XXX-descricao\`
6. Implemente seguindo padrões do projeto
7. Rode testes: \`npm test\`
8. Abra Pull Request

---

## 📚 Documentação

- **[CLAUDE.md](CLAUDE.md)** - Contexto completo para Claude Code (arquitetura, skills, MCP)
- **[docs/backlog/ROADMAP.md](docs/backlog/ROADMAP.md)** - PRD B2B, User Stories, Backlog (SSOT)
- **[docs/conceitual/](docs/conceitual/)** - Glossário, modelo de domínio, personas
- **[docs/tecnico/](docs/tecnico/)** - Arquitetura, guias MCP, templates
- **[.claude/meta-docs/](.claude/meta-docs/)** - Meta-documentação de evolução

---

## 📞 Contato

**Desenvolvedor:** João Pelegrino  
**Projeto:** Plataforma B2B de treinamento técnico corporativo - Plataforma B2B de Treinamento Técnico Corporativo  
**Status:** MVP funcional (Release 1.0 completa)  
**Repositório:** Privado

---

## 📄 Licença

> **Status:** 🟡 Em definição

**Opções em avaliação:**
- **AGPL-3.0** (recomendado) - Protege contra "cloud washing", incentiva contribuições
- **Apache 2.0** - Mais permissivo, facilita adoção enterprise
- **MIT** - Máxima permissividade

A decisão final será tomada antes da Release 3.0 (Q2 2026), considerando:
- Proteção do modelo de negócio
- Facilidade de adoção por empresas
- Incentivo a contribuições da comunidade

**Atualmente:** Código em desenvolvimento, repositório privado.
