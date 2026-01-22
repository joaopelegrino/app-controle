# Gaps para Demo B2B Completa

**Branch:** demo-nocodb-simple
**Data:** 2026-01-22
**Status:** Análise de Requisitos

---

## Resumo Executivo

Esta branch demonstra a **arquitetura técnica** da plataforma, mas **não está pronta para demo B2B** devido à ausência de autenticação, RBAC e integração frontend↔backend.

### Status Atual

| Componente | Status | Observação |
|------------|--------|------------|
| Frontend React | ✅ Funcional | http://localhost:3000 |
| Backend NocoDB | ✅ Funcional | http://localhost:8080 |
| PostgreSQL | ✅ Funcional | Schema + seed data |
| Autenticação | ❌ Ausente | Acesso direto ao Hub |
| RBAC | ❌ Ausente | Sem roles definidos |
| Integração FE↔BE | ❌ Ausente | Dados isolados |

---

## 1. Gaps Críticos (Bloqueiam Demo)

### 1.1 Autenticação - NÃO IMPLEMENTADA

**Situação Atual:**
- Frontend: Acesso direto ao Hub sem login
- Backend: NocoDB tem login próprio (separado)
- Não há validação de credenciais

**Necessário:**
```
┌─────────────────────────────────────────────────────┐
│  Fluxo de Login Esperado                           │
├─────────────────────────────────────────────────────┤
│  1. Usuário acessa http://localhost:3000           │
│  2. Redirecionado para /login                      │
│  3. Entra email + senha                            │
│  4. Validação contra NocoDB/PostgreSQL             │
│  5. Token JWT retornado                            │
│  6. Redirecionado para /hub                        │
│  7. Token enviado em todas requisições             │
└─────────────────────────────────────────────────────┘
```

**Arquivos a Criar:**
- `src/components/LoginView.jsx`
- `src/components/RegisterView.jsx`
- `src/hooks/useAuth.js`
- `src/services/authService.js`
- `src/contexts/AuthContext.jsx`

**Documentação a Criar:**
- `docs/tecnico/authentication/01-login-flow.md`
- `docs/tecnico/authentication/02-jwt-tokens.md`

### 1.2 RBAC (Role-Based Access Control) - NÃO DEFINIDO

**Situação Atual:**
- Tabela `users` existe mas sem campo `role`
- Qualquer pessoa vê todo conteúdo
- Sem diferenciação admin/professor/aluno

**Necessário:**

```
┌────────────────────────────────────────────────────────────────┐
│  Matriz de Permissões                                          │
├──────────────────┬─────────┬────────────┬────────────┬────────┤
│  Ação            │ Student │ Instructor │ Admin      │ C-Level│
├──────────────────┼─────────┼────────────┼────────────┼────────┤
│  Ver cursos      │   ✓     │     ✓      │     ✓      │   ✓    │
│  Fazer curso     │   ✓     │     ✓      │     ✓      │   -    │
│  Ver progresso   │  Próprio│  Da turma  │   Todos    │  Todos │
│  Criar curso     │   -     │     ✓      │     ✓      │   -    │
│  Editar curso    │   -     │   Próprios │   Todos    │   -    │
│  Ver analytics   │   -     │   Turma    │   Empresa  │ Global │
│  Gerenciar users │   -     │     -      │     ✓      │   ✓    │
│  Exportar dados  │   -     │     -      │     ✓      │   ✓    │
│  Config empresa  │   -     │     -      │     ✓      │   ✓    │
└──────────────────┴─────────┴────────────┴────────────┴────────┘
```

**Alterações no Banco:**
```sql
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'student';
-- Valores: 'student', 'instructor', 'admin', 'c_level'

ALTER TABLE users ADD COLUMN permissions JSONB DEFAULT '{}';
-- Permissões granulares opcionais
```

**Arquivos a Criar:**
- `src/middleware/withRole.jsx` (HOC)
- `src/hooks/usePermissions.js`
- `src/utils/rbac.js`

**Documentação a Criar:**
- `docs/tecnico/rbac/01-matrix.md`
- `docs/tecnico/rbac/02-implementation.md`

### 1.3 Multi-Tenancy - NÃO IMPLEMENTADO

**Situação Atual:**
- Seed tem 2 empresas mas sem isolamento
- Usuário de empresa A vê dados de empresa B
- Frontend não filtra por tenant

**Necessário:**
```
┌─────────────────────────────────────────────────────┐
│  Isolamento de Dados por Empresa                   │
├─────────────────────────────────────────────────────┤
│  TechCorp Brasil                                    │
│  ├── Usuários: maria, carlos                       │
│  ├── Cursos: Bash (customizado)                    │
│  ├── Progresso: Isolado                            │
│  └── Analytics: Apenas TechCorp                    │
├─────────────────────────────────────────────────────┤
│  Startup ABC                                        │
│  ├── Usuários: ana, pedro, lucas                   │
│  ├── Cursos: Bash, Rust                            │
│  ├── Progresso: Isolado                            │
│  └── Analytics: Apenas Startup ABC                 │
└─────────────────────────────────────────────────────┘
```

**Arquivos a Criar:**
- `src/hooks/useTenant.js`
- `src/contexts/TenantContext.jsx`

---

## 2. Gaps Importantes (Melhoram Demo)

### 2.1 Integração Frontend ↔ NocoDB

**Situação Atual:**
- Frontend usa localStorage isolado
- Backend NocoDB tem API REST
- Não há comunicação entre eles

**Necessário:**
```javascript
// src/services/apiService.js
const API_BASE = 'http://localhost:8080/api/v1';

export const apiService = {
  // Autenticação
  login: (email, password) => POST('/auth/login', { email, password }),

  // Cursos
  getCourses: () => GET('/courses'),
  getCourse: (id) => GET(`/courses/${id}`),

  // Progresso
  getProgress: (userId) => GET(`/progress/${userId}`),
  saveProgress: (data) => POST('/progress', data),

  // Analytics
  getCompanyProgress: () => GET('/analytics/company'),
  getUserDashboard: (userId) => GET(`/analytics/user/${userId}`),
};
```

### 2.2 Fluxo de Onboarding

**Situação Atual:**
- Usuário entra direto no Hub
- Não há setup inicial
- Não há escolha de trilha

**Necessário:**
```
┌─────────────────────────────────────────────────────┐
│  First-Time User Flow                              │
├─────────────────────────────────────────────────────┤
│  1. Login/Registro                                  │
│  2. Bem-vindo (nome da empresa)                    │
│  3. Qual seu objetivo?                             │
│     [ ] Backend Developer                          │
│     [ ] DevOps Engineer                            │
│     [ ] Full Stack                                 │
│  4. Trilha recomendada baseada na escolha          │
│  5. Tour guiado (opcional)                         │
│  6. Hub personalizado                              │
└─────────────────────────────────────────────────────┘
```

**Arquivos a Criar:**
- `src/components/OnboardingWizard.jsx`
- `src/components/WelcomeScreen.jsx`

### 2.3 Dashboard de Analytics (Frontend)

**Situação Atual:**
- Views de analytics existem no PostgreSQL
- Não há UI para visualizar
- Admin não vê métricas no frontend

**Necessário:**
```
┌─────────────────────────────────────────────────────┐
│  Admin Dashboard                                    │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  85%        │  │  12         │  │  156h       │ │
│  │  Conclusão  │  │  Ativos     │  │  Estudo     │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Progresso por Curso          [Gráfico]     │   │
│  │  ████████████░░░░ Bash 75%                  │   │
│  │  ██████░░░░░░░░░░ Rust 40%                  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Usuários Recentes                          │   │
│  │  Maria Silva - Bash - 85% - Ontem           │   │
│  │  Carlos Santos - Rust - 40% - Há 2 dias     │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Arquivos a Criar/Atualizar:**
- `src/components/AdminDashboard.jsx` (já existe, conectar API)

---

## 3. Gaps Menores (Polish)

### 3.1 UI/UX

- [ ] Loading states durante requisições
- [ ] Error boundaries com mensagens amigáveis
- [ ] Toast notifications para feedback
- [ ] Skeleton loaders para carregamento
- [ ] Empty states para listas vazias

### 3.2 Responsividade

- [ ] Menu mobile (hamburger)
- [ ] Cards adaptáveis
- [ ] Tabelas scrolláveis em mobile

### 3.3 Acessibilidade

- [ ] Skip links
- [ ] ARIA labels completos
- [ ] Contraste adequado
- [ ] Navegação por teclado

---

## 4. Documentação Existente vs Necessária

### Documentação Existente ✅

| Arquivo | Tema | Status |
|---------|------|--------|
| `docs/tecnico/architecture/01-visao-geral-arquitetura.md` | Arquitetura 4 camadas | ✅ Completo |
| `docs/conceitual/01-visao-geral/05-personas-corporativas.md` | Personas B2B | ✅ Excelente |
| `docs/backend/NOCODB-QUICKSTART.md` | Setup NocoDB | ✅ Completo |
| `docs/backend/PERSONAS-NAO-TECNICAS.md` | Casos de uso NocoDB | ✅ Completo |
| `docs/backlog/ROADMAP.md` | User Stories | ✅ Atualizado |
| `docs/ESTRUTURA-PLATAFORMA-MVP.md` | Wireframes | ✅ Completo |
| `database/init.sql` | Schema PostgreSQL | ✅ Funcional |
| `database/seed.sql` | Dados de exemplo | ✅ Funcional |

### Documentação Necessária ❌

| Arquivo | Tema | Prioridade |
|---------|------|------------|
| `docs/tecnico/authentication/01-login-flow.md` | Fluxo de login | Alta |
| `docs/tecnico/authentication/02-jwt-tokens.md` | Gestão de tokens | Alta |
| `docs/tecnico/rbac/01-matrix.md` | Matriz de permissões | Alta |
| `docs/tecnico/rbac/02-implementation.md` | Implementação RBAC | Alta |
| `docs/tecnico/api/nocodb-integration.md` | Integração API | Média |
| `docs/tecnico/multi-tenancy/01-strategy.md` | Estratégia multi-tenant | Média |
| `docs/conceitual/user-flows/login-onboarding.md` | Fluxo de onboarding | Média |

---

## 5. Plano de Implementação

### Fase 1: Autenticação Básica [Alta Prioridade]

```
Tarefas:
1. [H] Criar LoginView.jsx com form email/senha
2. [M] Criar AuthContext.jsx para estado global
3. [M] Criar useAuth.js hook
4. [M] Criar authService.js para chamadas API
5. [L] Proteger rotas com PrivateRoute
6. [L] Redirect para login se não autenticado
7. [M] Documentar fluxo de autenticação

Dependências:
- NocoDB API configurada para auth
- Endpoint de login criado
```

### Fase 2: RBAC [Alta Prioridade]

```
Tarefas:
1. [M] Alterar schema para incluir role
2. [M] Atualizar seed com roles
3. [M] Criar withRole.jsx HOC
4. [L] Criar usePermissions.js hook
5. [M] Aplicar restrições nas rotas
6. [L] Documentar matriz de permissões

Dependências:
- Autenticação funcionando
- Roles definidos no banco
```

### Fase 3: Integração Frontend↔NocoDB [Média Prioridade]

```
Tarefas:
1. [H] Criar apiService.js
2. [M] Substituir localStorage por API calls
3. [M] Sincronizar progresso com backend
4. [L] Implementar cache local
5. [M] Tratamento de erros de rede

Dependências:
- Autenticação funcionando
- RBAC aplicado
```

### Fase 4: Onboarding & Polish [Baixa Prioridade]

```
Tarefas:
1. [M] Criar OnboardingWizard.jsx
2. [L] Implementar tour guiado
3. [L] Adicionar loading states
4. [L] Melhorar responsividade

Dependências:
- Fases 1-3 completas
```

---

## 6. Métricas de Sucesso

### Para Demo B2B Mínima Viável

- [ ] Login funcional com validação
- [ ] Usuário vê apenas dados da sua empresa
- [ ] Roles diferentes veem telas diferentes
- [ ] Progresso salvo no backend
- [ ] Admin vê analytics da empresa

### Para Demo B2B Completa

- [ ] Onboarding guiado
- [ ] Notificações de progresso
- [ ] Export de relatórios
- [ ] Multi-tenancy completo
- [ ] Dashboards interativos

---

## 7. Próximos Passos Recomendados

1. **Criar User Story US-050** - Implementar Autenticação
2. **Criar User Story US-051** - Implementar RBAC
3. **Criar User Story US-052** - Integrar Frontend↔NocoDB
4. **Atualizar ROADMAP.md** com novo sprint
5. **Criar branch** `feature/US-050-autenticacao`

---

**Última atualização:** 2026-01-22
**Autor:** Claude Code Analysis
**Baseado em:** Exploração completa do codebase
