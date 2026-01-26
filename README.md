# UltraThink - Plataforma B2B de Treinamento Técnico Corporativo

**Plataforma B2B multi-tenant** para treinamento técnico corporativo com autenticação JWT, RBAC (4 roles), dashboards por perfil e analytics avançado.

## 🎯 Visão Geral

**UltraThink** resolve o problema de empresas que gastam R$150k-200k/ano em plataformas genéricas (Udemy Business, Coursera) mas enfrentam:
- ❌ Baixa taxa de engajamento (apenas 10-15% dos colaboradores usam)
- ❌ Conteúdo não customizável para stack específico da empresa
- ❌ Impossibilidade de medir ROI real do treinamento
- ❌ Onboarding técnico desorganizado (2+ meses para produtividade)

**Solução:** Plataforma própria white-label com:
- ✅ Autenticação JWT real via NocoDB + PostgreSQL
- ✅ Sistema RBAC com 4 roles e 21 permissões
- ✅ Dashboards específicos por perfil (Student, Instructor, Admin, C-Level)
- ✅ Analytics de ROI e módulos difíceis
- ✅ Multi-tenancy por empresa

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

## ⚡ Estado Atual - Janeiro 2026

### 🎯 Status: Sprint 11 COMPLETO (Demo B2B Ready)

```
┌─────────────────┬────────────┬───────────────────────┐
│   Componente    │   Status   │          URL          │
├─────────────────┼────────────┼───────────────────────┤
│ Frontend (Vite) │ ✅ Rodando │ http://localhost:3001 │
├─────────────────┼────────────┼───────────────────────┤
│ NocoDB          │ ✅ Healthy │ http://localhost:8081 │
├─────────────────┼────────────┼───────────────────────┤
│ PostgreSQL      │ ✅ Healthy │ localhost:5432        │
└─────────────────┴────────────┴───────────────────────┘
```

### 🆕 Funcionalidades Implementadas (Sprints 6-11)

**Autenticação & RBAC:**
- 🔐 **Auth JWT NocoDB**: Login real com validação de token
- 👥 **4 Roles**: student, instructor, admin, c_level
- 🛡️ **21 Permissões**: 17 com UI implementada (81%)
- 🏢 **Multi-tenancy**: Isolamento por empresa

**Dashboards por Perfil:**
- 📊 **UserDashboard**: Progresso pessoal, notas, cursos
- 👨‍🏫 **InstructorDashboard**: Time, alunos que precisam atenção
- ⚙️ **AdminDashboard**: CRUD usuários, matrículas, analytics
- 📈 **ExecutiveDashboard**: ROI, KPIs, métricas corporativas

**UX Polish (Sprint 11):**
- 📱 **Responsividade Mobile**: MobileMenu hamburger
- 🎯 **Empty States**: Estados vazios reutilizáveis
- ⚠️ **Confirm Modal**: Confirmação antes de ações destrutivas
- 🎉 **Onboarding Wizard**: 4 steps para novos usuários
- 🔔 **Toast Notifications**: Feedback visual
- ⏳ **Loading States**: Skeletons e spinners

### 📊 Métricas do Projeto

| Métrica | Valor |
|---------|-------|
| Sprints Completos | 6 (Sprint 6-11) |
| User Stories | 37/37 (100%) |
| Permissões RBAC | 17/21 (81%) |
| Testes E2E | 14/14 (100%) |
| Console Errors | 0 |

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
- **Docker Desktop** com WSL2 Integration (para backend)
- mise (gerenciador de versões) ou Node.js 24+ como fallback

### **Modo 1: Frontend Apenas (Dados Mock)**

```bash
# Instale dependências
bun install

# Rode o servidor de desenvolvimento
bun run dev
# Acesse: http://localhost:3001
```

### **Modo 2: Full Stack (Recomendado)**

```bash
# 1. Iniciar Docker Desktop (Windows)
# 2. Iniciar backend (PostgreSQL + NocoDB)
docker compose -f docker-compose.nocodb.yml up -d

# 3. Executar migrations (primeira vez)
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-001-rbac.sql
docker exec -i app-controle-db psql -U nocodb_user -d app_controle < database/migration-002-enrollments.sql

# 4. Iniciar frontend
bun run dev
```

### **Credenciais de Demo**

```
Senha padrão: Demo@2026

ACME Tech Solutions:
├── ceo@acmetech.com     (C-Level)    → /admin/executive
├── admin@acmetech.com   (Admin)      → /admin
├── prof@acmetech.com    (Instructor) → /instructor
└── maria@acmetech.com   (Student)    → /dashboard
```

### **Build de Produção**

```bash
bun run build && bun run preview
```

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

### **Sprints 6-11** ✅ **COMPLETOS** (Janeiro 2026)
- ✅ Auth JWT NocoDB + PostgreSQL
- ✅ Sistema RBAC (4 roles, 21 permissões)
- ✅ 4 Dashboards por perfil
- ✅ CRUD completo de usuários
- ✅ Matrículas em cursos
- ✅ Exportação Excel/JSON
- ✅ Analytics de ROI e módulos difíceis
- ✅ Responsividade mobile
- ✅ Onboarding wizard
- ✅ Toast notifications
- ✅ Loading states (skeletons)

### **Sprint 12** 📋 **PRÓXIMO**
- [ ] CRUD de cursos (courses.create/edit)
- [ ] Certificados de conclusão
- [ ] Tour guiado real (highlight UI)
- [ ] Correção BUG-001 (navegação instructor)

### **Release 3.0 "Enterprise"** 📋 **PLANEJADA**
- [ ] SSO Corporativo (SAML, OAuth)
- [ ] API RESTful para criação de cursos
- [ ] Dark mode
- [ ] TypeScript migration (gradual)
- [ ] Acessibilidade WCAG 2.1 AA (100%)

### **Release 4.0 "Scale"** 📋 **PLANEJADA**
- [ ] Marketplace B2B2C de cursos técnicos
- [ ] Gamificação (badges, leaderboards)
- [ ] PWA com modo offline
- [ ] Mobile apps (iOS/Android)
- [ ] Integração Slack/Teams

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
**Projeto:** UltraThink - Plataforma B2B de Treinamento Técnico Corporativo
**Status:** Demo B2B Ready (Sprint 11 completo)
**Branch:** `demo-nocodb-simple`
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
