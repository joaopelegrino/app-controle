# 📚 Meta-Documentação - Plataforma B2B de treinamento técnico corporativo

**Propósito:** Única Fonte da Verdade sobre a evolução da meta-configuração do Claude Code

**Localização:** `.claude/meta-docs/`

**Última Reorganização:** 2025-11-16

---

## 🎯 O Que é Meta-Documentação?

Esta pasta rastreia a **evolução da configuração do Claude Code** no projeto Plataforma B2B de treinamento técnico corporativo, incluindo:

- 🧠 **Skills e Agents** criados/modificados
- ⚙️ **Hooks e automações** implementadas
- 📋 **CLAUDE.md** e demais arquivos `.claude/*`
- ✅ **Validações** de que tudo funciona conforme esperado
- 📊 **Diagnósticos** de qualidade da meta-configuração

---

## 🔍 O Que NÃO Fica Aqui

Esta pasta **NÃO** é para:

- ❌ Documentação da aplicação (código React, componentes) → use `/docs`
- ❌ User Stories da aplicação → use `PRODUCT-CENTRAL-DOCUMENT.md`
- ❌ Backlogs de features da aplicação → use PRD
- ❌ Documentação técnica ativa (guias MCP) → use `/docs`

**Foco:** Apenas documentação sobre **configuração do Claude Code** (meta-layer)

---

## 📂 Estrutura Organizada

```
meta-docs/
├── README.md                   # Este arquivo
├── INDEX.md                    # Índice completo com navegação
│
├── sessions/                   # 🗓️ Sessões de evolução da config
│   └── 2025-11-13/            # Organizado por data
│       ├── epico-12-completo.md
│       ├── sprint-25-completo.md
│       ├── us-071-template-padrao.md
│       └── validacao-padrao-bash.md
│
├── validacoes/                 # ✅ Validações de skills/agents/hooks
│   ├── epico-12.md            # ÉPICO 12 nomenclatura + breadcrumb
│   ├── us-061.md              # US-061 breadcrumb hierárquico
│   └── mcp-chrome-devtools.md # Validação 24 ferramentas MCP
│
└── diagnosticos/               # 📊 Análises técnicas da configuração
    ├── plataforma-b2b-2025-11-13.md
    ├── conformidade-padrao-bash.md
    ├── limpeza-projeto.md
    ├── usabilidade.md
    └── guias/                  # Tutoriais de ferramentas meta
        └── playwright-mcp-screenshots.md
```

---

## 🔄 Workflow: Quando Adicionar Documentos

### 1. **Sessions** (Backlogs de Sessões)

Adicione quando completar sessão focada em:
- Criar/modificar skills ou agents
- Implementar hooks e automações
- Atualizar CLAUDE.md com novos padrões
- Configurar ferramentas MCP

**Formato:** `sessions/YYYY-MM-DD/nome-descritivo.md`

**Exemplo:** `sessions/2025-11-13/epico-12-completo.md`

---

### 2. **Validações** (Provas de Conformidade)

Adicione quando validar que:
- Skill/agent funciona conforme esperado
- Hook automatiza corretamente
- MCP server está operacional
- Padrão estabelecido é seguido

**Formato:** `validacoes/nome-do-que-foi-validado.md`

**Exemplo:** `validacoes/mcp-chrome-devtools.md`

---

### 3. **Diagnósticos** (Análises Técnicas)

Adicione quando analisar:
- Qualidade da configuração meta
- Conformidade com best practices
- Performance de skills/agents/hooks
- Estado geral do setup Claude Code

**Formato:** `diagnosticos/tema-especifico.md`

**Exemplo:** `diagnosticos/plataforma-b2b-2025-11-13.md`

**Guias/Tutoriais:** `diagnosticos/guias/ferramenta.md`

---

## 🗂️ Organização por Data

Sessões são organizadas por data para rastreabilidade:

```
sessions/
├── 2025-11-13/     # Sprint produtiva (ÉPICO 12)
│   ├── epico-12-completo.md
│   ├── sprint-25-completo.md
│   ├── us-071-template-padrao.md
│   └── validacao-padrao-bash.md
│
└── 2025-11-16/     # Reorganização meta-docs (futuro)
    └── reorganizacao-meta-docs.md
```

---

## 📖 Navegação Rápida

### Consultar INDEX.md

O arquivo `INDEX.md` contém:
- 📋 Catálogo completo de todos os documentos
- 🔍 Filtros por categoria, data, status
- 🏆 Documentos mais consultados
- 📊 Estatísticas da meta-documentação

**Sempre consulte INDEX.md primeiro** para encontrar o que precisa.

---

## 🎯 Casos de Uso

### Para Claude Code

Ao retomar contexto de configurações passadas:

```
"Read .claude/meta-docs/sessions/2025-11-13/epico-12-completo.md"
"Quais skills foram criadas no ÉPICO 12?"
```

### Para Desenvolvedores

Auditar evolução da configuração:

```bash
cd .claude/meta-docs
ls -lt sessions/*/  # Últimas sessões
grep -r "breadcrumb" validacoes/  # Buscar validações de breadcrumb
```

### Para Manutenção

Rastrear decisões de configuração:
- Quando criamos skill X? → `sessions/`
- Skill Y está validada? → `validacoes/`
- Qual o estado da config em data X? → `diagnosticos/`

---

## 🧹 Manutenção e Limpeza

### Quando Arquivar

Considere mover para `meta-docs/arquivo/` quando:
- Documentação tem >6 meses
- Skill/agent foi depreciado
- Configuração não é mais relevante

### Nunca Delete

Mantenha sempre, mesmo se antigo:
- ✅ Decisões de design (contexto histórico)
- ✅ Validações (provas de conformidade)
- ✅ Diagnósticos (rastreabilidade)

---

## 🔗 Documentação Relacionada

### Documentação Ativa (Raiz do Projeto)
- **CLAUDE.md** - Instruções completas do Claude Code
- **PRODUCT-CENTRAL-DOCUMENT.md** - PRD da aplicação
- **README.md** - README principal

### Documentação Técnica Ativa
- `/docs` - Guias MCP, templates oficiais

### Skills e Agents
- `.claude/skills/meta-configuracao-evolucao/` - Documentação de skills
  - `README-SKILLS-AGENTS.md` - Guia completo de skills/agents
  - `QUICK-START.md` - Início rápido (5 minutos)

---

## 📊 Estatísticas Atuais

- **Total de Documentos**: 12 arquivos organizados
- **Sessões Documentadas**: 1 data (2025-11-13)
- **Validações Registradas**: 3 validações (ÉPICO 12, US-061, MCP)
- **Diagnósticos**: 5 análises técnicas + 1 guia
- **Período Coberto**: Novembro 2025

---

## 🚀 Próximos Passos

Ao completar nova sessão de configuração:

1. **Criar arquivo em `sessions/YYYY-MM-DD/`** com backlog da sessão
2. **Adicionar validação em `validacoes/`** se testou algo
3. **Atualizar `INDEX.md`** com novo documento
4. **Atualizar este README** se mudou estrutura

---

**🤖 Organizado por:** Claude Code + João Pelegrino
**📅 Última Atualização:** 2025-11-16
**✅ Status:** Estrutura estabelecida e funcional
**🎯 Propósito:** Rastrear evolução da meta-configuração do Plataforma B2B de treinamento técnico corporativo

---

*Esta pasta é a memória institucional da configuração do Claude Code no projeto.*
