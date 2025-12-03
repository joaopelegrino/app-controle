# 📚 Índice - Meta-Documentação Plataforma B2B de treinamento técnico corporativo

**Última Atualização:** 2025-11-16
**Localização:** `.claude/meta-docs/`
**Propósito:** Rastrear evolução da meta-configuração do Claude Code

---

## 🎯 Sobre Este Índice

Este índice cataloga toda a **meta-documentação** do projeto Plataforma B2B de treinamento técnico corporativo - ou seja, documentação sobre a **configuração do Claude Code** (skills, agents, hooks, CLAUDE.md).

📖 **Leia primeiro:** [README.md](./README.md) para entender o propósito desta pasta.

---

## 📂 Estrutura Atual

```
meta-docs/
├── README.md                   # Propósito e guidelines
├── INDEX.md                    # Este arquivo (catálogo completo)
│
├── sessions/                   # 🗓️ Sessões de evolução (4 docs)
│   └── 2025-11-13/
│       ├── epico-12-completo.md
│       ├── sprint-25-completo.md
│       ├── us-071-template-padrao.md
│       └── validacao-padrao-bash.md
│
├── validacoes/                 # ✅ Validações de config (3 docs)
│   ├── epico-12.md
│   ├── us-061.md
│   └── mcp-chrome-devtools.md
│
└── diagnosticos/               # 📊 Análises técnicas (5 docs)
    ├── plataforma-b2b-2025-11-13.md
    ├── conformidade-padrao-bash.md
    ├── limpeza-projeto.md
    ├── usabilidade.md
    └── guias/
        └── playwright-mcp-screenshots.md
```

**Total:** 12 documentos organizados em 3 categorias

---

## 🗓️ Sessões de Evolução (4 documentos)

Backlogs de sessões focadas em configurar/melhorar Claude Code:

| Arquivo | Data | Tema | Conquista Principal |
|---------|------|------|-------------------|
| [epico-12-completo.md](./sessions/2025-11-13/epico-12-completo.md) | 2025-11-13 | ÉPICO 12 - Arquitetura de Informação | Skills de nomenclatura + breadcrumb |
| [sprint-25-completo.md](./sessions/2025-11-13/sprint-25-completo.md) | 2025-11-13 | Sprint 2.5 completa | US-060 + US-061 implementadas |
| [us-071-template-padrao.md](./sessions/2025-11-13/us-071-template-padrao.md) | 2025-11-13 | US-071 Template de Curso | Template oficial validado |
| [validacao-padrao-bash.md](./sessions/2025-11-13/validacao-padrao-bash.md) | 2025-11-13 | Padrão Bash como referência | Bash = padrão ouro |

**Quando Consultar:**
- Entender decisões de design de skills/agents
- Rastrear quando foi criada configuração X
- Contexto histórico de implementações

---

## ✅ Validações (3 documentos)

Evidências de que skills, agents, hooks e MCP funcionam:

| Arquivo | O Que Foi Validado | Critérios | Status |
|---------|-------------------|-----------|--------|
| [epico-12.md](./validacoes/epico-12.md) | ÉPICO 12 completo | Nomenclatura + Breadcrumb | ✅ 100% |
| [us-061.md](./validacoes/us-061.md) | US-061 Breadcrumb | 13/13 critérios de aceite | ✅ DONE |
| [mcp-chrome-devtools.md](./validacoes/mcp-chrome-devtools.md) | MCP Chrome DevTools | 24 ferramentas testadas | ✅ Funcional |

**Quando Consultar:**
- Verificar se skill/agent está validado
- Evidências para auditorias
- Screenshots de validação

---

## 📊 Diagnósticos e Análises (5 documentos)

Análises técnicas da configuração do Claude Code:

### Diagnósticos Principais

| Arquivo | Tipo | Conteúdo | Quando Consultar |
|---------|------|----------|-----------------|
| [plataforma-b2b-2025-11-13.md](./diagnosticos/plataforma-b2b-2025-11-13.md) | Snapshot Completo | Stack, métricas, componentes, débito técnico | Decisões arquiteturais |
| [conformidade-padrao-bash.md](./diagnosticos/conformidade-padrao-bash.md) | Checklist | 14 itens de conformidade do padrão Bash | Template para novos sistemas |
| [limpeza-projeto.md](./diagnosticos/limpeza-projeto.md) | Housekeeping | Arquivos removidos, organização mantida | Manutenção da raiz |
| [usabilidade.md](./diagnosticos/usabilidade.md) | Testes UX | 9 testes MCP, nota 8.0/10, 2 screenshots | Melhorias de UX |

### Guias e Tutoriais

| Arquivo | Ferramenta | Conteúdo |
|---------|-----------|----------|
| [guias/playwright-mcp-screenshots.md](./diagnosticos/guias/playwright-mcp-screenshots.md) | Playwright MCP | Como capturar screenshots automatizados |

---

## 🔍 Navegação Rápida

### Por Data

**2025-11-13** (Sprint Produtiva!)
- ✅ 4 sessões documentadas
- ✅ 3 validações concluídas
- ✅ 4 diagnósticos criados
- 🏆 ÉPICO 12 - 100% completo

### Por Categoria

- **🗓️ Sessões**: 4 backlogs de evolução da config
- **✅ Validações**: 3 provas de conformidade
- **📊 Diagnósticos**: 4 análises + 1 guia

### Por Status

- ✅ **Concluídos**: 12 documentos
- 🚧 **Em Progresso**: 0
- 📋 **Planejados**: Próximas sessões

---

## 📌 Documentos Mais Consultados

### 1. Diagnóstico Completo Plataforma B2B de treinamento técnico corporativo
📄 [diagnosticos/plataforma-b2b-2025-11-13.md](./diagnosticos/plataforma-b2b-2025-11-13.md)

**Por quê:** Visão geral completa do sistema em 2025-11-13
- Stack tecnológica
- 18 componentes React
- 227 módulos educacionais
- Débito técnico identificado
- Métricas de qualidade

---

### 2. Validação ÉPICO 12
📄 [validacoes/epico-12.md](./validacoes/epico-12.md)

**Por quê:** Evidências de conformidade com glossário e breadcrumb
- 28 correções de nomenclatura
- Skills `ux-nomenclature` e `breadcrumb-impl`
- Screenshots de validação
- Metodologia MCP documentada

---

### 3. Conformidade Padrão Bash
📄 [diagnosticos/conformidade-padrao-bash.md](./diagnosticos/conformidade-padrao-bash.md)

**Por quê:** Checklist de 14 itens validando Bash como padrão ouro
- Template para novos sistemas
- Critérios de qualidade
- Evidências de conformidade

---

### 4. Validação MCP Chrome DevTools
📄 [validacoes/mcp-chrome-devtools.md](./validacoes/mcp-chrome-devtools.md)

**Por quê:** Prova de que 24 ferramentas MCP estão funcionais
- Navegação programática
- Screenshots automatizados
- Inspeção de console/rede
- Performance tracing

---

## 🗂️ Contexto do Projeto Plataforma B2B de treinamento técnico corporativo

### Documentação Ativa (Fora de meta-docs/)

**Raiz do Projeto:**
- `CLAUDE.md` - Instruções completas do Claude Code ✅
- `PRODUCT-CENTRAL-DOCUMENT.md` - PRD Central (v2.4) ✅
- `README.md` - README principal ✅

**Docs Técnicos:**
- `docs/` - Guias MCP, templates oficiais

**Configuração Claude Code:**
- `.claude/skills/` - 5 skills especializadas
- `.claude/agents/` - 5 agents complexos
- `.claude/commands/` - 3 comandos slash
- `.claude/hooks.toml` - Automações
- `.claude/settings.local.json` - Permissões

---

## 🔄 Como Usar Este Índice

### Para Claude Code

Ao retomar contexto:

```
"Read .claude/meta-docs/sessions/2025-11-13/epico-12-completo.md"
"Quais decisões foram tomadas no ÉPICO 12?"
```

### Para Desenvolvedores

Consultar evidências:

```bash
cd .claude/meta-docs

# Listar últimas sessões
ls -lt sessions/*/

# Buscar validações de breadcrumb
grep -r "breadcrumb" validacoes/

# Ver diagnósticos recentes
ls -lt diagnosticos/
```

### Para Auditorias

Rastrear conformidade:
- Validações comprovam critérios de aceite ✅
- Screenshots preservados como evidências 📸
- Decisões documentadas em sessões 📋

---

## 📊 Estatísticas

### Conteúdo
- **Total de Documentos**: 12 arquivos
- **Período Coberto**: 2025-11-13 → 2025-11-16
- **Sessões Documentadas**: 1 data (2025-11-13)
- **Validações**: 3 (ÉPICO 12, US-061, MCP)
- **Diagnósticos**: 5 análises técnicas
- **Linhas de Documentação**: ~6.000+ linhas

### Conquistas Rastreadas
- ✅ ÉPICO 12 - 100% completo
- ✅ Sprint 2.5 - Concluída
- ✅ 5 Skills criadas e documentadas
- ✅ 5 Agents implementados
- ✅ MCP Chrome DevTools validado (24 tools)

---

## 🚀 Próximos Passos

Ao completar nova sessão de configuração:

1. ✅ Criar arquivo em `sessions/YYYY-MM-DD/nome-descritivo.md`
2. ✅ Adicionar validação em `validacoes/` se testou algo
3. ✅ Criar diagnóstico em `diagnosticos/` se analisou qualidade
4. ✅ Atualizar este `INDEX.md` com novo documento
5. ✅ Atualizar estatísticas acima

---

## 🔗 Links Úteis

### Documentação de Skills/Agents
- [Skills README](../skills/meta-configuracao-evolucao/README-SKILLS-AGENTS.md)
- [Quick Start Skills](../skills/meta-configuracao-evolucao/QUICK-START.md)

### Configuração Claude
- [CLAUDE.md](../../CLAUDE.md) - Instruções principais
- [hooks.toml](../hooks.toml) - Automações configuradas
- [settings.local.json](../settings.local.json) - Permissões

### Documentação Oficial
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)
- [MCP Chrome DevTools](https://github.com/google/chrome-devtools-mcp)

---

**📅 Última Reorganização:** 2025-11-16
**🤖 Organizado por:** Claude Code + João Pelegrino
**✅ Status:** Estrutura estabelecida e indexada
**🔄 Próxima Revisão:** Ao completar próxima sessão de config

---

*Este índice facilita navegação, contexto histórico e rastreabilidade da evolução da meta-configuração do Plataforma B2B de treinamento técnico corporativo.*
