# Backlog - Testes de Perfis + Sprint 11 (Parcial)

**Data:** 2026-01-23
**Sprint Atual:** 11 (EM PROGRESSO)
**Status:** Testes de perfis OK + US-105 e US-106 implementadas

---

## Resumo da Sessao

Validacao de login com todos perfis pendentes e planejamento do proximo sprint.

## Testes E2E Realizados

### Login por Perfil

| Perfil | Email | Login | Redirect | Menu RBAC | Dashboard |
|--------|-------|-------|----------|-----------|-----------|
| Aluno | maria@acmetech.com | OK | / (Hub) | So "Sair" | N/A |
| C-Level | ceo@acmetech.com | OK | / (Hub) | "Painel Admin" + "Sair" | /admin/executive OK |
| Admin | admin@acmetech.com | OK (sessao anterior) | /admin | "Painel Admin" + "Sair" | /admin OK |
| Instrutor | prof@acmetech.com | OK (sessao anterior) | / (Hub) | "Painel Admin" + "Sair" | /instructor OK |

### Validacoes RBAC

1. **Aluno (student)**
   - Acesso: Hub, cursos, dashboard proprio
   - Bloqueado: Admin, Instrutor, Executive
   - Menu: Apenas "Sair" (sem Painel Admin)

2. **C-Level**
   - Acesso: Hub, Admin, Executive, cursos
   - Menu: "Painel Admin" + "Sair"
   - Dashboard Executive: Metricas ROI, engajamento, performance

3. **Admin/Instrutor**
   - Testados na sessao anterior
   - Funcionando conforme esperado

---

## Dashboard Executivo - Metricas Observadas

| Metrica | Valor | Tendencia |
|---------|-------|-----------|
| Usuarios Ativos | 7/7 | +12% |
| Taxa Conclusao | 13% | -3% |
| Engajamento | 100% | +5% |
| Modulos Concluidos | 14 | - |
| ROI Estimado | -86% | Negativo |
| Investimento | R$ 50.000 | - |
| Retorno Estimado | R$ 7.000 | - |

---

## Status RBAC

**Implementado:** 17/21 permissoes (81%)

### Permissoes OK
- courses.view, courses.progress, courses.notes, courses.assign
- dashboard.own, dashboard.team, dashboard.company
- analytics.basic, analytics.advanced, analytics.export
- users.view, users.create, users.edit, users.delete
- admin.access

### Permissoes Pendentes (19%)
- courses.edit - Editar cursos
- courses.create - Criar cursos
- paths.edit - Editar trilhas
- company.edit - Editar dados empresa
- audit.view - Logs de auditoria
- admin.full - Acesso completo admin

---

## Sprint 11 - Planejamento

**Objetivo:** UX Polish + Confirmacoes + Mobile

### User Stories Propostas

| US | Descricao | Complexidade | Arquivos |
|----|-----------|--------------|----------|
| US-105 | Empty states para listas vazias | L | AdminDashboard, InstructorDashboard |
| US-106 | Modal confirmacao antes de deletar | L | ConfirmModal.jsx, AdminDashboard |
| US-107 | Responsividade basica mobile | M | CSS/Tailwind em componentes |
| US-108 | Autenticacao real NocoDB JWT | M | apiService.js, AuthContext |

### Criterios de Aceite

**US-105: Empty States**
- Tabela de usuarios vazia mostra ilustracao + mensagem
- Lista de cursos vazia mostra call-to-action
- Notas do aluno vazia mostra placeholder

**US-106: Confirmacao Delete**
- Modal aparece antes de excluir usuario
- Botao "Cancelar" e "Confirmar Exclusao"
- Mostra nome do usuario a ser excluido

**US-107: Responsividade**
- Menu hamburger em telas < 768px
- Cards em coluna unica no mobile
- Tabelas com scroll horizontal

**US-108: Auth NocoDB**
- Login via API NocoDB em vez de mock
- Token JWT armazenado em localStorage
- Refresh token automatico

---

## Proximos Passos

1. Iniciar Sprint 11 com US-105 (Empty States)
2. Implementar ConfirmModal reutilizavel (US-106)
3. Testar responsividade em dispositivos moveis
4. Avaliar integracao JWT NocoDB

---

## Comando de Retomada

```
Continuar Sprint 11 - Implementar US-105 (Empty States) e US-106 (Confirmacao Delete).
Backend Docker ativo. Consultar BACKLOG-2026-01-23-TESTES-PERFIS-SPRINT11.md
```

---

## Sprint 11 - Implementacao

### US-105: Empty States (COMPLETO)

**Arquivos criados/modificados:**
- `src/components/EmptyState.jsx` - Novo componente reutilizavel
- `src/components/AdminDashboard.jsx` - Integrado EmptyStateInline
- `src/components/InstructorDashboard.jsx` - Integrado EmptyStateInline
- `src/components/StudentNotesModal.jsx` - Integrado EmptyState

**Tipos disponiveis:**
- users, students, courses, notes, search, files, inbox, error

### US-106: ConfirmModal (COMPLETO)

**Arquivos criados/modificados:**
- `src/components/ConfirmModal.jsx` - Novo componente + hook useConfirmModal
- `src/components/UserFormModal.jsx` - Integrado ConfirmModal para exclusao

**Tipos disponiveis:**
- danger (vermelho), warning (amarelo), info (azul)

### Pendentes Sprint 11

| US | Descricao | Status |
|----|-----------|--------|
| US-107 | Responsividade basica mobile | Pendente |
| US-108 | Autenticacao real NocoDB JWT | Pendente |

---

**Versao:** 7.3.0
**RBAC:** 81% implementado
**Sprint 11:** 2/4 USs completas
**Testes E2E:** 4/4 perfis validados
