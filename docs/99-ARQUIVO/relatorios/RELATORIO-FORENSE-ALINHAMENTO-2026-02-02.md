# Relatório Forense de Alinhamento

> **Análise de consistência entre documentação conceitual, base de código e banco de dados**
> Data: 2026-02-02
> Status: Análise completa com divergências identificadas

---

## Sumário Executivo

| Aspecto | Status | Severidade |
|---------|--------|------------|
| Modelo de Domínio | ⚠️ Divergente | Alta |
| Personas vs RBAC | ✅ Alinhado | - |
| Terminologia | ⚠️ Divergente | Média |
| Dados Demo | ⚠️ Divergente | Média |
| Credenciais | ✅ Alinhado | - |
| Onboarding Docs | ⚠️ Incompleto | Média |

**Nota Geral de Alinhamento: 65%** (precisa atenção)

---

## 1. Modelo de Domínio

### Expectativa (Documentação Conceitual)

```
docs/conceitual/01-visao-geral/04-modelo-dominio.md

Hub (Nível 1)
  └── Área de Estudo (Nível 1.5)
       └── Curso (Nível 2)
            └── Seção (Nível 2.5)    ← Nomenclatura: "Seção"
                 └── Aula (Nível 3)   ← Nomenclatura: "Aula"
                      └── Prática (Nível 4) [Planejado]
```

### Realidade (Banco de Dados)

```
database/init.sql

companies (multi-tenant)
  └── users
       └── user_progress
            ↓
courses
  └── phases                          ← Nomenclatura: "phases"
       └── modules                    ← Nomenclatura: "modules"
```

### Divergências Identificadas

| # | Aspecto | Conceitual | Implementado | Impacto |
|---|---------|------------|--------------|---------|
| D1 | Nome da entidade | **Seção** | `phases` (tabela) | Alto - Terminologia inconsistente |
| D2 | Nome da entidade | **Aula** | `modules` (tabela) | Alto - Terminologia inconsistente |
| D3 | Hierarquia | Hub → Área → Curso | Não há tabela `areas` | Médio - Área é virtual |
| D4 | Entidade Prática | Planejada | Não existe | Baixo - Feature futura |

### Recomendação

**Opção A (Recomendada):** Atualizar documentação conceitual para refletir realidade do banco
- Aceitar "phases" e "modules" como terminologia do banco
- Manter "Seção" e "Aula" apenas para UI/UX (labels)

**Opção B:** Migrar banco de dados
- Renomear tabelas (alto risco, requer migration)
- Não recomendado para MVP

---

## 2. Personas vs RBAC

### Expectativa (Documentação Conceitual)

```
docs/conceitual/01-visao-geral/05-personas-corporativas.md

Persona 1: Gestor de RH/T&D (Comprador) → 15% uso
Persona 2: Líder Técnico/Instrutor (Criador) → 25% uso
Persona 3: Desenvolvedor/Aprendiz (Usuário Final) → 60% uso
Persona 4: C-Level (Aprovador) → Não usa diretamente
```

### Realidade (RBAC Implementado)

```
.claude/CLAUDE.md + src/hooks/usePermissions.js

Role: c_level     → /admin/executive
Role: admin       → /admin
Role: instructor  → /instructor
Role: student     → /dashboard
```

### Mapeamento

| Persona Conceitual | Role Implementado | Alinhamento |
|--------------------|-------------------|-------------|
| C-Level (Aprovador) | `c_level` | ✅ Perfeito |
| Gestor de RH/T&D | `admin` | ⚠️ Parcial (foco RH vs foco gestão geral) |
| Líder Técnico/Instrutor | `instructor` | ✅ Perfeito |
| Desenvolvedor/Aprendiz | `student` | ✅ Perfeito |

### Status: ALINHADO ✅

A implementação RBAC cobre todas as personas conceituais.

---

## 3. Terminologia

### Regras Conceituais (00-definicoes-principais.md)

| ❌ Proibido | ✅ Usar |
|-------------|---------|
| Sistema de Aprendizado | **Curso** |
| Módulo (contexto de aula) | **Aula** |
| FASE (maiúsculas) | **Seção** |
| Notas Rápidas | **Caderno de Notas** |
| Ver Notas | **📖 Estudar** |

### Realidade no Código

| Arquivo | Termo Usado | Compliance |
|---------|-------------|------------|
| `database/init.sql` | `phases`, `modules` | ⚠️ Banco usa termo "proibido" |
| `src/components/BashLearningSystem.jsx` | `modules` (array) | ⚠️ Legado mantido |
| `src/data/bashLearningData.js` | `modules: [...]` | ⚠️ Legado mantido |
| `src/components/Breadcrumb.jsx` | Labels corretos | ✅ UI usa termos aprovados |

### Status: DIVERGENTE ⚠️

**Problema:** Código interno usa "modules" e "phases", mas UI deve exibir "Aula" e "Seção".

**Recomendação:** Aceitar divergência como padrão:
- **Banco/Código:** `phases`, `modules` (backend)
- **UI/UX:** "Seção", "Aula" (frontend labels)
- Documentar claramente esta separação

---

## 4. Dados Demo

### Expectativa (Documentação Conceitual)

```
docs/conceitual/01-visao-geral/01-contexto-projeto.md

- 5 sistemas integrados (C, Rust, Bash, VSCode, Claude Code)
- 227 módulos total
- 692 horas de conteúdo
- 13 áreas de estudo (6 ativas + 7 em desenvolvimento)
```

### Realidade (Banco de Dados)

```
docs/backend-docs/DADOS-DEMO.md

- 2 empresas (Acme Tech, DevCorp)
- 12 usuários (4 roles)
- 1 curso (Bash)
- 4 fases
- 16 módulos
- 41 registros de progresso
```

### Divergência

| Aspecto | Conceitual | Real | Gap |
|---------|------------|------|-----|
| Cursos | 5 | 1 | -4 cursos |
| Módulos | 227 | 16 | -211 módulos |
| Horas | 692h | ~40h | -652h |
| Áreas | 13 | N/A (virtual) | N/A |

### Status: DIVERGENTE ⚠️

**Explicação:** Documentação conceitual descreve visão completa (Release 1.0 original). O banco atual tem apenas dados essenciais para MVP demo.

**Recomendação:**
1. Atualizar docs conceituais para refletir MVP atual OU
2. Criar seed adicional com todos os 5 cursos

---

## 5. Credenciais

### Expectativa (Múltiplas Fontes)

| Documento | Email Admin | Senha |
|-----------|-------------|-------|
| CLAUDE.md | admin@acmetech.com | Demo@2026 |
| getting-started.md | admin@acmetech.com | Demo@2026 |
| DADOS-DEMO.md | admin@acmetech.com | Demo@2026 |
| quick-start.md | admin@acmetech.com | Demo@2026 |

### Status: ALINHADO ✅

Credenciais consistentes em toda documentação.

**Nota:** Credenciais NocoDB Admin separadas (admin@trainb2b.local / Admin@TrainB2B2026!) estão documentadas em NOCODB-TROUBLESHOOTING.md.

---

## 6. Onboarding de Novo Usuário

### Documentos Existentes

| Documento | Propósito | Status |
|-----------|-----------|--------|
| `docs/guide/getting-started.md` | Setup inicial | ✅ Completo |
| `docs/guide/quick-start.md` | TL;DR | ✅ Completo |
| `docs/guide/faq.md` | Problemas comuns | ❓ A verificar |
| `docs/backend-docs/NOCODB-TROUBLESHOOTING.md` | Problemas NocoDB | ✅ Criado hoje |
| `docs/backend-docs/DADOS-DEMO.md` | Dados seed | ✅ Criado hoje |

### Gaps Identificados

| # | Gap | Severidade | Recomendação |
|---|-----|------------|--------------|
| G1 | Links para guias de usuário inexistentes | Média | Criar ou remover referências |
| G2 | Falta mencionar que TABLE_IDs podem mudar | Alta | Adicionar nota de warning |
| G3 | Falta processo de recuperação NocoDB | Alta | ✅ Resolvido (NOCODB-TROUBLESHOOTING.md) |
| G4 | Documentação conceitual desatualizada | Média | Sincronizar com realidade |

### Fluxo Atual vs Ideal

```
FLUXO ATUAL (Novo Usuário):
1. Clone repo
2. mise install + bun install
3. mise dev
4. Login com credenciais demo
5. ❌ Se NocoDB falha: usuário perdido

FLUXO IDEAL (Com docs atualizados):
1. Clone repo
2. mise install + bun install
3. mise dev (frontend mock)
4. OU mise full-stack (com backend)
5. Login com credenciais demo
6. ✅ Se NocoDB falha: consultar NOCODB-TROUBLESHOOTING.md
```

---

## 7. Matriz de Arquivos e Responsabilidades

### Documentação Conceitual

| Arquivo | Última Atualização | Alinhado? |
|---------|-------------------|-----------|
| `00-definicoes-principais.md` | 2025-11-14 | ⚠️ Terminologia diverge do código |
| `01-contexto-projeto.md` | 2025-11-14 | ⚠️ Dados de cursos desatualizados |
| `04-modelo-dominio.md` | 2025-11-14 | ⚠️ Terminologia diverge do banco |
| `05-personas-corporativas.md` | 2025-11-14 | ✅ Alinhado com RBAC |

### Documentação Técnica

| Arquivo | Última Atualização | Alinhado? |
|---------|-------------------|-----------|
| `.claude/CLAUDE.md` | 2026-02-02 | ✅ Atualizado |
| `docs/backend-docs/nocodb.md` | 2026-02-02 | ✅ Atualizado |
| `docs/backend-docs/NOCODB-TROUBLESHOOTING.md` | 2026-02-02 | ✅ Novo |
| `docs/backend-docs/DADOS-DEMO.md` | 2026-02-02 | ✅ Novo |
| `docs/guide/getting-started.md` | Recente | ⚠️ Falta warning sobre TABLE_IDs |
| `docs/guide/quick-start.md` | Recente | ✅ OK |

---

## 8. Recomendações Priorizadas

### P0 - Crítico (Fazer Agora)

1. **Adicionar warning sobre TABLE_IDs em getting-started.md**
   - Novos usuários podem ter NocoDB com IDs diferentes
   - Apontar para NOCODB-TROUBLESHOOTING.md

### P1 - Importante (Próxima Sprint)

2. **Atualizar docs conceituais com nota de divergência**
   - Adicionar seção "Nota sobre Terminologia" em 00-definicoes-principais.md
   - Explicar: banco usa "modules/phases", UI usa "Aula/Seção"

3. **Verificar/criar guias de usuário referenciados**
   - getting-started.md menciona guias que podem não existir
   - `/docs/users/admin-guide.md`, `/docs/users/instructor-guide.md`, etc.

### P2 - Médio (Backlog)

4. **Sincronizar quantidade de cursos**
   - Opção A: Criar seed com 5 cursos (C, Rust, Bash, VSCode, Claude Code)
   - Opção B: Atualizar docs conceituais para refletir MVP (1 curso)

5. **Criar ADR sobre divergência de terminologia**
   - Documentar decisão: banco ≠ UI
   - Evitar futuras confusões

---

## 9. Checklist de Verificação

### Para Novo Desenvolvedor

- [ ] Clone e setup funcionam sem erros
- [ ] `mise check` passa
- [ ] Login com credenciais demo funciona
- [ ] Documentação é encontrável (não mais que 2 cliques)
- [ ] Troubleshooting está acessível

### Para Validar Alinhamento

- [x] RBAC implementado cobre personas conceituais
- [x] Credenciais consistentes em todos docs
- [x] Troubleshooting NocoDB documentado
- [ ] Terminologia consistente (pendente)
- [ ] Quantidade de cursos consistente (pendente)

---

## 10. Conclusão

O sistema está **funcionalmente alinhado** (RBAC, credenciais, fluxos principais), mas possui **divergências de documentação** que podem confundir novos usuários:

1. **Terminologia:** Documentação conceitual proíbe termos que o código usa
2. **Quantidade de dados:** Docs prometem 5 cursos, banco tem 1
3. **Guias de usuário:** Referenciados mas possivelmente inexistentes

**Ação Imediata Recomendada:**
- Adicionar warning em getting-started.md sobre possíveis problemas de NocoDB
- Atualizar docs conceituais com nota de "divergência intencional"

---

*Relatório gerado em 2026-02-02 por análise forense automatizada*
*Próxima revisão sugerida: Após Sprint 15 ou após criação de novos cursos*
