# Glossário Unificado - Sulical

**Versão:** 1.0.0
**Data:** 2026-02-05
**Status:** ✅ Documento Canônico

> **Este é o glossário oficial da plataforma.** Em caso de conflito com outros documentos, este prevalece.

---

## Índice

1. [Termos de Domínio](#1-termos-de-domínio)
2. [Entidades do Sistema](#2-entidades-do-sistema)
3. [Roles e Permissões](#3-roles-e-permissões)
4. [Hub de Especialistas](#4-hub-de-especialistas)
5. [Modelo de Negócio](#5-modelo-de-negócio)
6. [Termos Técnicos](#6-termos-técnicos)
7. [Nomenclatura de UI](#7-nomenclatura-de-ui)
8. [Siglas e Acrônimos](#8-siglas-e-acrônimos)

---

## 1. Termos de Domínio

### Área de Estudo
**Definição:** Categoria temática que agrupa um ou mais Cursos (ex: "Bash Shell Scripting", "C Programming").

**Relacionamentos:**
- Hub contém N Áreas de Estudo
- Cada Área pode ter 1 ou N Cursos

**Exemplo:** A área "DevOps" pode conter cursos de Docker, Kubernetes, CI/CD.

---

### Aula
**Definição:** Unidade mínima de conteúdo educacional dentro de um Curso.

**Características:**
- Possui título descritivo (ex: "Aula 1.1: Introdução ao Bash")
- Contém duração estimada (ex: "2h30min")
- Status: não iniciado, em andamento, concluído
- Formato: texto, vídeo, código ou misto
- Permite anotações no Caderno de Notas

**Mapeamento Técnico:**
| Camada | Nome |
|--------|------|
| UI | Aula |
| Banco de Dados | `modules` |
| API | `lessons[]` |

**Termos Proibidos:** ❌ "Módulo" (no contexto de aula individual)

---

### Caderno de Notas
**Definição:** Sistema de anotações pessoais do colaborador, persistido localmente por curso.

**Características:**
- Auto-save em localStorage (debounce 500ms)
- Limite de 50KB por curso
- Suporta Markdown
- Feedback visual: "✓ Salvo automaticamente"

**Key de Storage:** `plataforma-b2b_notes_{courseId}`

**Termos Proibidos:** ❌ "Notas Rápidas", "Ver Notas", "Minhas Notas"

---

### Caminho de Aprendizado
**Definição:** Sequência estruturada de cursos que forma uma trilha de capacitação completa.

**Sinônimos:** Trilha de Aprendizado, Learning Path

**Exemplo:** "Caminho Backend Developer" = Bash + Linux + Docker + Kubernetes

---

### Curso
**Definição:** Conjunto estruturado de aulas sobre um tema técnico específico.

**Características:**
- Título descritivo (ex: "Curso de Bash Shell Scripting")
- Múltiplas Seções (categorias de aulas)
- Progresso mensurável (ex: "5 de 16 aulas completadas")
- Duração total estimada
- Caderno de Notas associado
- Flash Cards opcionais

**Estrutura:**
```
Curso
├── Seção 1: Fundamentos
│   ├── Aula 1.1
│   └── Aula 1.2
├── Seção 2: Avançado
│   ├── Aula 2.1
│   └── Aula 2.2
└── Flash Cards (opcional)
```

**Termos Proibidos:** ❌ "Sistema de Aprendizado", "Cronograma"

---

### Flash Card
**Definição:** Cartão interativo 3D para memorização ativa de conceitos técnicos.

**Características:**
- Animação de flip 3D (frente/verso)
- Frente: Termo ou pergunta
- Verso: Definição ou resposta
- Categorias: `basics`, `commands`, `advanced`

---

### Hub
**Definição:** Página inicial da plataforma onde o usuário visualiza todas as áreas de estudo disponíveis.

**Características:**
- Título: "Áreas de Estudo"
- Cards visuais por área
- Seção "Em Desenvolvimento" para áreas futuras
- Breadcrumb: "Hub" ou "🏠 Início"

---

### Prática
**Definição:** Exercício hands-on ou projeto prático associado a uma Aula.

**Status:** 📋 Planejado (Release 3.0+)

**Tipos:** Quiz, Desafio de código, Projeto guiado

---

### Progresso
**Definição:** Sistema de rastreamento de conclusão de aulas do colaborador.

**Armazenamento:** localStorage (`plataforma-b2b_progress_{courseId}`)

**Estrutura:**
```json
{
  "completedLessons": ["bash-1-1", "bash-1-2"],
  "lastUpdated": 1706745600000
}
```

---

### Seção
**Definição:** Agrupamento lógico de Aulas dentro de um Curso.

**Características:**
- Título descritivo (ex: "Fundamentos", "Comandos Avançados")
- Agrupa 2 a 10 aulas relacionadas
- Facilita navegação e organização pedagógica

**Mapeamento Técnico:**
| Camada | Nome |
|--------|------|
| UI | Seção |
| Banco de Dados | `phases` |
| API | `sections[]` |

**Termos Proibidos:** ❌ "FASE" (maiúsculas), "Módulo" (no contexto de agrupamento)

---

## 2. Entidades do Sistema

### Empresa (Company)
**Definição:** Organização cliente que utiliza a plataforma para treinar seus colaboradores.

**Atributos:**
- Nome, slug, logo
- Plano (starter, professional, enterprise)
- Limite de usuários
- Configurações de white-label

**Isolamento:** Multi-tenancy garante que dados de uma empresa são invisíveis para outras.

---

### Usuário (User)
**Definição:** Pessoa cadastrada na plataforma vinculada a uma empresa.

**Atributos:**
- Email (único por empresa)
- Nome completo
- Role (student, instructor, admin, c_level, specialist)
- Status (ativo/inativo)

---

### Matrícula (Enrollment)
**Definição:** Vínculo entre um usuário e um curso que autoriza o acesso.

**Atributos:**
- Usuário, Curso
- Atribuído por (quem matriculou)
- Data de atribuição
- Data limite (opcional)

---

### Breadcrumb
**Definição:** Componente de navegação hierárquica que mostra o caminho atual.

**Formato:** `Hub > Curso > Aula`

**Características:**
- Máximo 3 níveis
- Acessibilidade WCAG 2.1 AA
- Responsivo (colapsa em mobile)

---

## 3. Roles e Permissões

### Student (Estudante)
**Definição:** Colaborador que consome cursos e trilhas atribuídas.

**Permissões:** Ver cursos atribuídos, marcar progresso, fazer anotações

**Dashboard:** UserDashboard (progresso pessoal, cursos, notas)

---

### Instructor (Instrutor)
**Definição:** Líder técnico responsável por criar conteúdo e acompanhar equipe.

**Permissões:** Criar cursos, ver progresso do time, identificar alunos com dificuldades

**Dashboard:** InstructorDashboard (time, analytics de engajamento)

---

### Admin (Administrador)
**Definição:** Gestor de RH/T&D responsável pela plataforma na empresa.

**Permissões:** CRUD usuários, matrículas em massa, relatórios, configurações

**Dashboard:** AdminDashboard (gestão de usuários, analytics)

---

### C-Level (Executivo)
**Definição:** Diretor ou C-Level que acompanha ROI de treinamento.

**Permissões:** Visualizar métricas corporativas, ROI, KPIs

**Dashboard:** ExecutiveDashboard (métricas estratégicas, comparativos)

---

### Specialist (Especialista) 🆕
**Definição:** Criador de conteúdo externo que vende cursos no Hub de Especialistas.

**Status:** ✅ Implementado (Sprint 15)

**Permissões:** Criar cursos, ver analytics próprios, responder reviews

**Dashboard:** SpecialistDashboard (receita, matrículas, feedback)

---

## 4. Hub de Especialistas

### Hub de Especialistas
**Definição:** Marketplace B2B2C onde especialistas externos vendem cursos para empresas.

**Modelo:** Business (Especialista) → Business (Plataforma) → Business (Empresa) → Consumer (Colaborador)

**Status:** ✅ Implementado (Sprint 15)

---

### Especialista Externo
**Definição:** Profissional independente que cria e vende cursos na plataforma.

**Requisitos:**
- LinkedIn obrigatório
- Mínimo 1 comprovação (certificação ou portfólio)
- Aprovação pela plataforma

**Benefícios:**
- Revenue share de 70%
- Acesso ao mercado B2B
- Dashboard de analytics

---

### Especialista Verificado
**Definição:** Selo concedido a especialistas que passaram pelo processo de verificação de credenciais.

**Indicador visual:** Badge "✓ Verificado" no perfil

---

### Catálogo
**Definição:** Listagem de cursos disponíveis no Hub de Especialistas para empresas.

**Filtros:** Categoria, preço, rating, duração, especialista

---

### Curso Customizado
**Definição:** Curso criado sob demanda por um especialista para atender necessidade específica de uma empresa.

**Fluxo:**
1. Empresa solicita via mensagem
2. Especialista envia proposta
3. Empresa aceita/rejeita
4. Especialista cria conteúdo

---

### Curso Privado
**Definição:** Curso no Hub com visibilidade restrita a uma ou mais empresas específicas.

**Visibilidades:**
- Público: aparece no catálogo geral
- Privado: apenas empresa dona pode ver
- Restrito: lista de empresas específicas

---

### Trilha Personalizada
**Definição:** Combinação de cursos de múltiplos especialistas montada pela empresa.

**Exemplo:** RH seleciona "Bash" de João + "DevOps" de Ana + "React" de Pedro

**Atributos:**
- Ordem dos cursos
- Pré-requisitos configuráveis
- Custo total calculado

---

### Mentoria 1:1
**Definição:** Sessão individual de mentoria oferecida por especialista como serviço adicional.

**Atributos:**
- Duração (30min, 60min)
- Preço por sessão
- Calendário de disponibilidade

---

### Review
**Definição:** Avaliação de curso feita por empresa após uso.

**Componentes:**
- Rating: 1-5 estrelas
- Comentário: texto obrigatório
- Resposta do especialista (opcional)

**Regra:** Só pode avaliar após 50% de conclusão

---

## 5. Modelo de Negócio

### B2B
**Definição:** Business-to-Business. Venda de plataforma SaaS diretamente para empresas.

---

### B2B2C
**Definição:** Business-to-Business-to-Consumer. Modelo do Hub onde especialistas vendem para plataforma, que revende para empresas, que entregam para colaboradores.

---

### Revenue Share
**Definição:** Divisão de receita entre especialista e plataforma.

**Modelo padrão:** 70% especialista / 30% plataforma

---

### MRR
**Definição:** Monthly Recurring Revenue. Receita mensal recorrente de assinaturas.

---

### Churn
**Definição:** Taxa de cancelamento de clientes.

---

### NPS
**Definição:** Net Promoter Score. Métrica de satisfação (-100 a +100).

---

### Open Core
**Definição:** Modelo de negócio onde código-fonte é open source, mas há versão paga com recursos adicionais.

**Sulical:**
- Community Edition: Gratuito, self-hosted
- SaaS Gerenciado: Pago, com suporte

---

### White-Label
**Definição:** Personalização da plataforma com identidade visual da empresa cliente.

**Inclui:** Logo, cores, domínio customizado

---

### Multi-Tenancy
**Definição:** Arquitetura onde múltiplas empresas compartilham mesma infraestrutura com isolamento de dados.

---

## 6. Termos Técnicos

### JWT
**Definição:** JSON Web Token. Padrão de autenticação usado na API.

---

### RBAC
**Definição:** Role-Based Access Control. Sistema de permissões baseado em papéis (roles).

---

### NocoDB
**Definição:** Backend-as-a-Service usado como camada de API sobre PostgreSQL.

---

### Debounce
**Definição:** Técnica que atrasa execução de função até que não haja novas chamadas por X ms.

**Uso:** Auto-save de notas (500ms debounce)

---

### localStorage
**Definição:** API do navegador para armazenamento de dados persistentes no lado do cliente.

**Limite:** ~5MB por domínio

---

### E2E (End-to-End)
**Definição:** Testes que simulam fluxo completo do usuário no sistema.

**Ferramenta:** Playwright

---

### i18n
**Definição:** Internacionalização. Suporte a múltiplos idiomas.

**Sulical:** PT-BR, EN-US, ES-ES

---

### WCAG
**Definição:** Web Content Accessibility Guidelines. Padrão de acessibilidade web.

**Meta:** WCAG 2.1 AA

---

## 7. Nomenclatura de UI

### Termos Aprovados (Usar Sempre)

| Contexto | ✅ Termo Correto | Exemplo |
|----------|------------------|---------|
| Agrupamento de aulas | **Curso** | "Curso de Bash" |
| Unidade de conteúdo | **Aula** | "Aula 1.1: Fundamentos" |
| Categoria de aulas | **Seção** | "Fundamentos", "Avançado" |
| Sistema de anotações | **Caderno de Notas** | "📖 Estudar" |
| Página inicial | **Hub** | "🏠 Hub" |
| Navegação hierárquica | **Breadcrumb** | "Hub > Curso > Aula" |

### Termos Proibidos (Nunca Usar)

| ❌ Proibido | ✅ Substituir Por | Motivo |
|-------------|-------------------|--------|
| Sistema de Aprendizado | **Curso** | Verboso |
| Módulo (contexto de aula) | **Aula** | Ambíguo |
| FASE (maiúsculas) | **Seção** | Inconsistente |
| Notas Rápidas | **Caderno de Notas** | Pouco descritivo |
| Ver Notas | **📖 Estudar** | Vago |
| Cronograma | **Curso** | Confuso |

### Padrão de Botões

```jsx
// ✅ Correto
<button>← Voltar ao Hub</button>
<button>📖 Estudar</button>

// ❌ Incorreto
<button>Voltar</button>
<button>Ver Notas</button>
```

**Regra:** Sempre especificar destino: "Voltar ao [Nível Pai]"

---

## 8. Siglas e Acrônimos

| Sigla | Significado |
|-------|-------------|
| API | Application Programming Interface |
| B2B | Business-to-Business |
| B2B2C | Business-to-Business-to-Consumer |
| BaaS | Backend as a Service |
| CI/CD | Continuous Integration / Continuous Deployment |
| CTO | Chief Technology Officer |
| CRUD | Create, Read, Update, Delete |
| E2E | End-to-End |
| HRIS | Human Resource Information System |
| i18n | Internationalization |
| JWT | JSON Web Token |
| KPI | Key Performance Indicator |
| LMS | Learning Management System |
| MRR | Monthly Recurring Revenue |
| MVP | Minimum Viable Product |
| NPS | Net Promoter Score |
| PRD | Product Requirements Document |
| RBAC | Role-Based Access Control |
| ROI | Return on Investment |
| SaaS | Software as a Service |
| SPA | Single Page Application |
| SSO | Single Sign-On |
| T&D | Treinamento e Desenvolvimento |
| UI/UX | User Interface / User Experience |
| WCAG | Web Content Accessibility Guidelines |

---

## Referências

- `docs/conceitual/01-visao-geral/00-definicoes-principais.md` - Documento original de definições
- `docs/conceitual/01-visao-geral/04-modelo-dominio.md` - Modelo de domínio detalhado
- `docs/02-ESPECIFICACAO/04-hub-especialistas.md` - Spec do Hub de Especialistas
- `docs/VISAO_MISSAO_E_ESTADO_ATUAL.md` - PRD principal

---

**FIM DO GLOSSÁRIO**

**Última atualização:** 2026-02-09
**Mantido por:** Equipe de Produto Sulical
