# Personas Não Técnicas - MVP Simplificado

**Versão:** MVP (1 curso - Bash)  
**Foco:** Dashboard NocoDB para gestão sem código  
**Público:** Gestores RH, Tech Leads, C-Level  

---

## 🎯 Visão Geral

Este documento explica como **3 tipos de usuários não técnicos** usam o dashboard NocoDB para gerenciar treinamentos.

**Problema resolvido:**
- ❌ Antes: "Não sei quem está estudando ou progredindo"
- ✅ Agora: Dashboard visual mostra tudo em tempo real

---

## 👤 Persona 1: Gestor de RH / T&D

### Perfil

```
Nome:              Mariana Silva
Idade:             32 anos
Cargo:             Gerente de T&D
Empresa:           Fintech (scale-up, 180 funcionários)
Formação:          Psicologia + MBA em RH
Experiência:       8 anos em RH, 3 em T&D
```

### Dores Principais

1. **"Não consigo medir se treinamento está funcionando"**
   - CFO pergunta "qual o ROI?" → Não tem resposta
   - Dashboard mostra taxa de conclusão em tempo real

2. **"Plataformas externas são muito caras"**
   - Udemy: R$ 270k/ano para 150 devs
   - Solução: Self-hosted = R$ 0 + custo de servidor

3. **"Conteúdo não é customizado para nossa stack"**
   - Cursos genéricos não ajudam
   - Solução: Criar cursos internos (Bash como exemplo)

### Como Usa o Dashboard

#### Tarefa 1: Ver Progresso Geral

```
1. Abrir NocoDB: http://localhost:8080
2. Sidebar → View "v_company_progress"
3. Ver dados:
   ┌─────────────────┬─────────┬──────────┬──────────┐
   │ Empresa         │ Usuários│ Módulos  │ Taxa     │
   ├─────────────────┼─────────┼──────────┼──────────┤
   │ Acme Tech       │    3    │    7     │  43.75%  │
   │ DevCorp         │    4    │    5     │  31.25%  │
   └─────────────────┴─────────┴──────────┴──────────┘
4. Exportar: "..." → Download → Excel
5. Enviar para CFO
```

**Tempo:** 30 segundos  
**Resultado:** Relatório executivo pronto

#### Tarefa 2: Adicionar Novo Aluno

```
1. Tabela "users" → "+ Add Record"
2. Preencher:
   - company_id: Acme Tech Solutions
   - email: novo@acmetech.com
   - full_name: Novo Aluno
   - role: student
   - password_hash: $2b$10$placeholder (hash real em produção)
3. Save
```

**Tempo:** 1 minuto  
**Resultado:** Novo aluno pode acessar plataforma

#### Tarefa 3: Gerar Relatório Mensal

```
1. View "v_user_dashboard"
2. Filtrar: company_name = "Acme Tech Solutions"
3. Ver lista de alunos com:
   - Nome
   - Email
   - Módulos completados
   - Taxa de conclusão individual
   - Última atividade
4. Download → Excel
5. Criar gráfico no Excel:
   - Eixo X: Alunos
   - Eixo Y: % conclusão
6. Apresentar para board
```

**Tempo:** 5 minutos  
**Resultado:** Apresentação para diretoria

### Métricas que Acompanha

| Métrica | Onde Ver | Atualização |
|---------|----------|-------------|
| Taxa de conclusão geral | `v_company_progress` | Tempo real |
| Alunos ativos vs total | `v_company_progress` | Tempo real |
| Módulos completados | `user_progress` (count) | Tempo real |
| Custo por aluno | Externo (R$ 0 self-hosted) | Mensal |

---

## 👨‍💼 Persona 2: Tech Lead / Instrutor

### Perfil

```
Nome:              Rafael Costa
Idade:             36 anos
Cargo:             Tech Lead / Arquiteto
Empresa:           Startup SaaS (120 funcionários)
Formação:          Ciência da Computação
Experiência:       12 anos como dev, 4 como líder
Time:              8 desenvolvedores (2 seniors, 4 plenos, 2 juniores)
```

### Dores Principais

1. **"Onboarding manual consome muito tempo"**
   - 20-30h por novo dev (pair programming)
   - Solução: Curso estruturado reduz para 5h de mentoria

2. **"Não sei se júniores estão realmente estudando"**
   - Antes: Sem visibilidade
   - Agora: Dashboard mostra progresso em tempo real

3. **"Perguntas repetidas no Slack"**
   - Mesmas dúvidas toda semana
   - Solução: Módulos estruturados + notas

### Como Usa o Dashboard

#### Tarefa 1: Acompanhar Júnior Recém-Contratado

```
1. Tabela "user_progress"
2. Filtrar: user_id = "Maria Santos"
3. Ver:
   ┌──────────────┬───────────┬────────────────┐
   │ Módulo       │ Status    │ Data Conclusão │
   ├──────────────┼───────────┼────────────────┤
   │ bash-1.1     │ ✅ Completo│ 10 dias atrás  │
   │ bash-1.2     │ ✅ Completo│ 9 dias atrás   │
   │ bash-1.3     │ ✅ Completo│ 8 dias atrás   │
   │ bash-1.4     │ ✅ Completo│ 7 dias atrás   │
   │ bash-2.1     │ ✅ Completo│ 6 dias atrás   │
   │ bash-2.2     │ ⏳ Pendente│ -              │
   └──────────────┴───────────┴────────────────┘
4. Ver ritmo: ~1 módulo/dia → Bom progresso!
```

**Ação:** Se aluno está travado >3 dias, agendar 1:1.

#### Tarefa 2: Ver Anotações do Aluno

```
1. Tabela "study_notes"
2. Filtrar: user_id = "Maria Santos", course_id = "bash"
3. Ler anotações:
   
   # Minhas Anotações - Bash
   
   ## Módulo 1.1: Introdução
   - Unix criado em 1969 no Bell Labs
   - Shell é o interpretador de comandos
   ...
   
   ## Módulo 2.1: Redirecionamento
   - `>` - Redirecionar saída (sobrescreve)
   - `>>` - Append
   ...
```

**Insight:** Ver se aluno está fazendo anotações de qualidade.

#### Tarefa 3: Identificar Módulos Difíceis

```
1. Tabela "user_progress"
2. Agrupar por: module_id
3. Ver taxa de conclusão por módulo:
   ┌──────────┬────────────┬──────────┐
   │ Módulo   │ Iniciaram  │ Concluíram│
   ├──────────┼────────────┼──────────┤
   │ bash-1.1 │     7      │    7     │ ✅ 100%
   │ bash-1.2 │     7      │    7     │ ✅100%
   │ bash-1.3 │     7      │    5     │ ⚠️71%
   │ bash-2.1 │     5      │    2     │ ⚠️40%
   └──────────┴────────────┴──────────┘
```

**Ação:** Módulo bash-2.1 está difícil → Revisar conteúdo.

---

## 📊 Persona 3: C-Level / Tomador de Decisão

### Perfil

```
Nome:              Roberto Silva
Idade:             45 anos
Cargo:             CTO
Empresa:           Scale-up tech (250 funcionários)
Formação:          Engenharia + MBA
Responsabilidade:  Aprovar budget de T&D (~R$ 300k/ano)
```

### Necessidades

1. **ROI demonstrável**
   - Precisa justificar investimento para CFO
   - Dashboard mostra métricas concretas

2. **Payback < 12 meses**
   - Solução self-hosted: custo ~R$ 0
   - Economia vs Udemy: R$ 270k/ano

3. **Métricas de adoção**
   - Taxa de uso da plataforma
   - Taxa de conclusão de cursos

### Como Usa o Dashboard

#### Tarefa 1: Apresentar Business Case

```
1. View "v_company_progress"
2. Ver dados agregados:
   - Total usuários: 7
   - Usuários ativos: 7 (100%)
   - Módulos completados: 12
   - Taxa conclusão média: 40%

3. View "v_course_stats"
4. Ver:
   - Curso Bash: 7 inscritos, 12 conclusões, 40% taxa

5. Preparar slide:
   
   TREINAMENTO TÉCNICO - Q1 2026
   
   ✅ 100% de adoção (7/7 alunos ativos)
   ✅ 40% de conclusão em 2 semanas
   ✅ Custo: R$ 0 (self-hosted)
   ✅ ROI: Economia de R$ 270k/ano vs Udemy
   
   PROJEÇÃO:
   - 50 devs treinados até Q2
   - Time to productivity: -50% (8 → 4 semanas)
   - Economia anual: R$ 270k
```

**Resultado:** Board aprova budget para Q2.

#### Tarefa 2: Comparar Empresas/Times

```
1. View "v_company_progress"
2. Ver side-by-side:
   
   Acme Tech:     43.75% conclusão, 3 usuários
   DevCorp:       31.25% conclusão, 4 usuários
   
3. Análise:
   - Acme menor mas mais engajada
   - DevCorp precisa de mais suporte?
   
4. Ação:
   - Reunir com Tech Lead da DevCorp
   - Entender blockers
```

#### Tarefa 3: Exportar para Board Meeting

```
1. View "v_company_progress" → Download Excel
2. View "v_user_dashboard" → Download Excel
3. View "v_course_stats" → Download Excel

4. PowerPoint:
   - Slide 1: Resumo executivo (números-chave)
   - Slide 2: Progresso por empresa (gráfico)
   - Slide 3: Top performers (ranking)
   - Slide 4: ROI e economia (vs Udemy)
   - Slide 5: Próximos passos (adicionar +2 cursos)
```

**Tempo:** 15 minutos  
**Resultado:** Apresentação profissional para board

---

## 📈 Comparativo: Antes vs Depois

### Antes (Sem Dashboard)

| Tarefa | Tempo | Dificuldade |
|--------|-------|-------------|
| Ver progresso de alunos | ❌ Impossível | - |
| Adicionar novo usuário | ⏰ 30 min (chamar dev) | Alta |
| Gerar relatório | ⏰ 2 horas (SQL manual) | Muito alta |
| Exportar para Excel | ❌ Não existe | - |
| Ver quem está ativo | ❌ Impossível | - |

### Depois (Com NocoDB)

| Tarefa | Tempo | Dificuldade |
|--------|-------|-------------|
| Ver progresso de alunos | ⚡ 10 segundos | Nenhuma |
| Adicionar novo usuário | ⚡ 1 minuto | Baixa |
| Gerar relatório | ⚡ 30 segundos | Nenhuma |
| Exportar para Excel | ⚡ 5 segundos | Nenhuma |
| Ver quem está ativo | ⚡ 5 segundos | Nenhuma |

---

## 🎯 Casos de Uso Reais

### Caso 1: Onboarding de 5 Júniores

**Contexto:** Tech Lead precisa acompanhar 5 novos devs

**Antes:**
- ❌ Perguntar manualmente: "Como está o estudo?"
- ❌ Sem visibilidade de progresso
- ❌ Cada um no seu ritmo (sem padrão)

**Depois (com Dashboard):**
1. View "user_progress" filtrada por empresa
2. Ver progresso dos 5 em tempo real
3. Identificar quem está travado
4. Intervir apenas quando necessário (>3 dias parado)

**Resultado:** 80% menos tempo de mentoria básica

---

### Caso 2: Relatório Trimestral para CFO

**Contexto:** Gestor de RH precisa justificar budget

**Antes:**
- ❌ Sem dados concretos
- ❌ "Acho que está funcionando"
- ❌ CFO corta budget

**Depois (com Dashboard):**
1. View "v_company_progress" → Excel
2. Criar slides com métricas:
   - 100% adoção
   - 40% conclusão
   - Economia R$ 270k/ano
3. CFO aprova expansão

**Resultado:** Budget aprovado + promoção

---

### Caso 3: Identificar Conteúdo Difícil

**Contexto:** Tech Lead quer melhorar curso

**Antes:**
- ❌ Feedback informal no Slack
- ❌ Sem dados estruturados

**Depois (com Dashboard):**
1. Tabela "user_progress" → Agrupar por module_id
2. Ver taxa de conclusão por módulo
3. Identificar: bash-2.1 tem 40% conclusão (outros >80%)
4. Revisar módulo bash-2.1

**Resultado:** Qualidade do curso melhora continuamente

---

## ✅ Resumo

### Para Gestores de RH

- ✅ Ver progresso em tempo real
- ✅ Adicionar usuários sem dev
- ✅ Exportar relatórios para Excel
- ✅ Justificar ROI para CFO

### Para Tech Leads

- ✅ Acompanhar júniores automaticamente
- ✅ Ver anotações dos alunos
- ✅ Identificar módulos difíceis
- ✅ Reduzir tempo de mentoria

### Para C-Level

- ✅ Apresentar métricas concretas
- ✅ Comparar times/empresas
- ✅ Demonstrar ROI (R$ 270k economia/ano)
- ✅ Tomar decisões baseadas em dados

---

**Documentação técnica:** `docs/backend/NOCODB-QUICKSTART.md`  
**Schema:** `database/init.sql`  
**Dados:** `database/seed.sql`
