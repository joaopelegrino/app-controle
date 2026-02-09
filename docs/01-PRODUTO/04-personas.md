# Personas da Plataforma B2B

> **Versão:** 2.0.0 (Consolidada)
> **Data:** 2026-02-05
> **Status:** ✅ Ativo
> **Origem:** Consolidação de `conceitual/05-personas-corporativas.md` + `SOLUCAO-E-PERSONAS.md` + `VISAO_MISSAO_E_ESTADO_ATUAL.md`

---

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Persona 1: Gestor de RH/T&D (Mariana)](#2-persona-1-gestor-de-rhtd)
3. [Persona 2: Líder Técnico/Instrutor (Rafael)](#3-persona-2-líder-técnicoinstrutor)
4. [Persona 3: Desenvolvedor/Aprendiz (Lucas)](#4-persona-3-desenvolvedoraprendiz)
5. [Persona 4: C-Level/CTO (Carla)](#5-persona-4-c-levelcto)
6. [Persona 5: Especialista Externo (João)](#6-persona-5-especialista-externo) ⭐ Hub
7. [Matriz de Personas vs Funcionalidades](#7-matriz-de-personas-vs-funcionalidades)
8. [Jobs to Be Done (JTBD)](#8-jobs-to-be-done)

---

## 1. Visão Geral

### 1.1 Mapa de Personas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ECOSSISTEMA PLATAFORMA B2B                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LADO DA EMPRESA (B2B)                    LADO DO MARKETPLACE (B2B2C)      │
│  ─────────────────────                    ───────────────────────────       │
│                                                                             │
│  ┌─────────────────┐                      ┌─────────────────┐              │
│  │ P4: C-Level     │ Aprova budget        │ P5: Especialista│ Cria cursos  │
│  │ (Carla - CTO)   │ e estratégia         │ (João - DevOps) │ para o hub   │
│  └────────┬────────┘                      └────────┬────────┘              │
│           │                                        │                        │
│           ▼                                        ▼                        │
│  ┌─────────────────┐                      ┌─────────────────┐              │
│  │ P1: Gestor T&D  │ Compra, monta        │   MARKETPLACE   │              │
│  │ (Mariana - RH)  │ trilhas, mede ROI    │   DE CURSOS     │              │
│  └────────┬────────┘                      └────────┬────────┘              │
│           │                                        │                        │
│           ▼                                        │                        │
│  ┌─────────────────┐         ┌─────────────────────┘                       │
│  │ P2: Líder Téc.  │ Cria    │                                             │
│  │ (Rafael - Tech) │ cursos  │                                             │
│  └────────┬────────┘ internos│                                             │
│           │                  │                                              │
│           ▼                  ▼                                              │
│  ┌─────────────────────────────┐                                           │
│  │     P3: Desenvolvedor       │ Consome cursos (internos + externos)      │
│  │     (Lucas - Júnior)        │                                           │
│  └─────────────────────────────┘                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Resumo das Personas

| # | Persona | Role no Sistema | % Uso | Prioridade |
|---|---------|-----------------|-------|------------|
| P1 | Gestor de RH/T&D (Mariana) | `admin` | 15% | 🔴 Alta |
| P2 | Líder Técnico (Rafael) | `instructor` | 25% | 🔴 Alta |
| P3 | Desenvolvedor (Lucas) | `student` | 55% | 🟡 Média |
| P4 | C-Level (Carla) | `c_level` | 5% | 🟢 Baixa |
| P5 | Especialista Externo (João) | `specialist` ⭐ | Variável | 🔴 Alta |

---

## 2. Persona 1: Gestor de RH/T&D

### Perfil

```
Nome:           Mariana Silva
Idade:          32 anos
Cargo:          Gerente de T&D (Treinamento & Desenvolvimento)
Empresa:        Fintech scale-up (180 funcionários)
Localização:    São Paulo, SP
Formação:       Psicologia Organizacional + MBA em RH
Experiência:    8 anos em RH, 3 em T&D
Salário:        R$ 12.000 - R$ 18.000
Time:           2 analistas + 1 estagiário
Budget anual:   R$ 200k para treinamento
```

### Responsabilidades

- Estruturar programas de onboarding técnico
- Gerenciar budget de treinamento
- Medir ROI de treinamentos
- Reportar métricas para Diretoria
- Garantir compliance (LGPD, Segurança)
- **NOVO**: Montar trilhas combinando cursos do marketplace

### Dores Principais

| Dor | Cenário | Frequência |
|-----|---------|------------|
| **Falta de métricas** | "CFO pergunta ROI e não tenho resposta" | Mensal |
| **Custo alto** | "Udemy cobra US$ 360/usuário/ano" | Anual |
| **Conteúdo genérico** | "Usamos Elixir mas cursos são de Python" | Semanal |

### Objetivos

- ✅ Reduzir custo de treinamento em 50%
- ✅ Aumentar taxa de conclusão de 15% para 60%+
- ✅ Ter dados concretos para reportar ROI
- ✅ Estruturar "Universidade Corporativa" interna
- ✅ **NOVO**: Montar trilhas com cursos de especialistas externos

### Citações Representativas

> "Meu pesadelo é o CFO perguntar: 'Gastamos R$ 200k em treinamento, quantos devs ficaram melhores?' e eu não ter a resposta."

> "Se eu conseguisse montar uma trilha combinando cursos de vários especialistas, seria perfeito para nosso stack específico."

### Jornada no Sistema

```
1. Login como Admin
2. Acessa Dashboard → vê métricas de engajamento
3. Vai ao Marketplace → busca cursos por tecnologia
4. Seleciona cursos de diferentes especialistas
5. Monta trilha personalizada (Bash + DevOps + React)
6. Atribui trilha aos 5 novos devs
7. Acompanha progresso no dashboard
8. Exporta relatório para apresentar ao CFO
```

---

## 3. Persona 2: Líder Técnico/Instrutor

### Perfil

```
Nome:           Rafael Costa
Idade:          36 anos
Cargo:          Tech Lead / Arquiteto de Software
Empresa:        Startup SaaS B2B (120 funcionários, Série A)
Localização:    Belo Horizonte, MG
Formação:       Ciência da Computação
Experiência:    12 anos como dev, 4 como líder
Salário:        R$ 18.000 - R$ 25.000
Time:           8 desenvolvedores (2 seniors, 4 plenos, 2 juniores)
```

### Responsabilidades

- Definir stack técnico do time
- Fazer onboarding técnico de novos devs
- Criar documentação de arquitetura
- Code review e mentoria
- Garantir qualidade e padrões de código
- **Criar cursos internos** sobre arquitetura da empresa

### Dores Principais

| Dor | Cenário | Frequência |
|-----|---------|------------|
| **Onboarding manual** | "Gasto 20-30h por júnior em pair programming" | A cada contratação |
| **Docs desatualizados** | "Confluence cheio de docs de 2023" | Diária |
| **Difícil criar conteúdo** | "Sei muito, mas não sou professor" | Mensal |

### Objetivos

- ✅ Reduzir tempo de onboarding de 30h para 5h
- ✅ Escalar conhecimento (1 conteúdo → 10+ devs)
- ✅ Ter trilha clara de progressão (júnior → pleno → senior)
- ✅ Focar em arquitetura, não em mentoria básica

### Citações Representativas

> "Se eu conseguisse gravar uma vez 'como funciona nossa arquitetura' e todo júnior assistir, eu economizaria 100h/ano."

> "Confluence é bom pra docs estáticas, mas não pra ensinar. Preciso de algo com trilha, exercícios, progresso."

### Jornada no Sistema

```
1. Login como Instructor
2. Acessa painel de criação de cursos
3. Usa template padrão para criar "Onboarding Backend"
4. Estrutura em 10 aulas com código real da base
5. Publica curso (visibilidade: apenas empresa)
6. Atribui para novos devs via Mariana (RH)
7. Acompanha progresso no dashboard de instrutor
8. Atualiza conteúdo baseado em feedback
```

---

## 4. Persona 3: Desenvolvedor/Aprendiz

### Perfil

```
Nome:           Lucas Oliveira
Idade:          24 anos
Cargo:          Desenvolvedor Júnior (Backend)
Empresa:        Fintech (180 funcionários)
Localização:    Remoto (Salvador, BA)
Formação:       Cursando Ciência da Computação (7º semestre)
Experiência:    1 ano como dev (6 meses estágio + 6 meses CLT)
Salário:        R$ 4.500 - R$ 6.000
Situação:       Primeiro emprego tech, ansioso para crescer
```

### Responsabilidades

- Desenvolver features simples (CRUD, integrações)
- Corrigir bugs não-críticos
- Escrever testes unitários
- Participar de code reviews (aprendendo)

### Dores Principais

| Dor | Cenário | Frequência |
|-----|---------|------------|
| **Onboarding confuso** | "Me deram acesso a 50 repos e falaram 'vai lendo'" | Onboarding |
| **Conteúdo genérico** | "Fiz curso de Docker mas usamos K8s" | Mensal |
| **Sem senso de progresso** | "Não sei se estou evoluindo" | Semestral |

### Objetivos

- ✅ Dominar stack da empresa (Node.js, Docker, K8s, PostgreSQL)
- ✅ Contribuir com features médias (não só CRUDs)
- ✅ Ser promovido a Pleno em 18-24 meses
- ✅ Ganhar autonomia (menos perguntas no Slack)

### Citações Representativas

> "No onboarding, eu só queria uma lista: 'Faça isso, depois isso, depois isso'. Não documentos espalhados."

> "Quando vejo meu progresso (tipo '12 de 20 aulas completadas'), eu me motivo a continuar."

### Jornada no Sistema

```
1. Login como Student
2. Vê trilha atribuída: "Onboarding Dev Junior"
3. Começa pela Aula 1.1: Introdução ao Bash
4. Estuda 1-2h por dia, marca aulas como concluídas
5. Usa Caderno de Notas para anotar dúvidas
6. Revisa conceitos com Flash Cards 3D
7. Vê progresso: "12 de 20 aulas completadas"
8. Completa trilha em 3 semanas (vs 6 semanas antes)
```

---

## 5. Persona 4: C-Level/CTO

### Perfil

```
Nome:           Carla Mendes
Idade:          42 anos
Cargo:          CTO (Chief Technology Officer)
Empresa:        Scale-up SaaS B2B (220 funcionários, Série B)
Localização:    São Paulo, SP
Formação:       Engenharia de Software + MBA em Gestão
Experiência:    18 anos em tech (12 como dev, 6 em liderança)
Salário:        R$ 35.000 - R$ 50.000 + equity
Time:           40 devs + 10 product + 5 infra
Budget tech:    R$ 3M/ano
```

### Responsabilidades

- Definir estratégia de tech (produto + infra)
- Aprovar budget de tecnologia
- Contratar e reter talentos técnicos
- Garantir qualidade e escalabilidade do produto
- Reportar métricas técnicas para board

### Dores Principais

| Dor | Cenário | Frequência |
|-----|---------|------------|
| **Onboarding lento** | "15 devs levaram 2 meses para ficar produtivos" | Trimestral |
| **ROI indefinido** | "Gastamos R$ 300k/ano em treinamento sem dados" | Anual |
| **Alta rotatividade** | "Juniores ficam 12-18 meses e saem" | Mensal |

### Objetivos (12 meses)

- ✅ Escalar time de 40 para 80 devs sem perder qualidade
- ✅ Reduzir time to productivity de 8 para 3 semanas
- ✅ Aumentar retenção de devs para 90%+ ao ano
- ✅ Reduzir custos operacionais em 20%

### Citações Representativas

> "Se eu conseguir reduzir onboarding de 2 meses para 3 semanas, economizo R$ 400k/ano em produtividade perdida."

> "Não me importo em pagar R$ 5k/mês por ferramenta se ela resolver meu problema de scale de time."

### Jornada no Sistema

```
1. Login como C-Level (role: c_level)
2. Acessa Executive Dashboard
3. Vê KPIs: ROI de treinamento, taxa de conclusão, time to productivity
4. Compara métricas antes/depois da plataforma
5. Exporta relatório para apresentar ao board
6. Aprova expansão de budget para T&D
```

---

## 6. Persona 5: Especialista Externo

> ⭐ **NOVA PERSONA** - Hub de Especialistas

### Perfil

```
Nome:           João Silva
Idade:          38 anos
Cargo:          DevOps Engineer Senior (freelancer)
Especialidade:  Bash Shell Scripting, Linux, Automação
Experiência:    15 anos em infraestrutura e automação
Localização:    Curitiba, PR
Receita atual:  Consultoria pontual (R$ 150/hora)
Meta:           Receita recorrente passiva
```

### Responsabilidades

- Criar e manter cursos de alta qualidade
- Responder dúvidas de alunos (via plataforma)
- Atualizar conteúdo conforme tecnologia evolui
- **NOVO**: Oferecer mentoria 1:1 como serviço adicional
- **NOVO**: Atender solicitações de cursos customizados

### Dores Principais

| Dor | Cenário | Frequência |
|-----|---------|------------|
| **Alcance limitado** | "Só consigo vender para quem já me conhece" | Constante |
| **Baixa remuneração** | "Udemy paga R$ 5-10 por aluno" | Mensal |
| **Sem acesso B2B** | "Não tenho entrada em grandes empresas" | Constante |
| **Consultoria cansativa** | "Preciso estar sempre presente" | Semanal |

### Objetivos

- ✅ Monetizar conhecimento de forma passiva
- ✅ Alcançar mais empresas sem fazer vendas B2B
- ✅ Construir reputação como especialista reconhecido
- ✅ Receita recorrente e previsível (R$ 5-10k/mês)

### O que busca no Hub

- ✅ Acesso direto a RH/T&D de empresas
- ✅ Revenue share justo (70% para o especialista)
- ✅ Dashboard com analytics de performance
- ✅ Selo de qualidade que valida suas credenciais
- ✅ **DECIDIDO**: Possibilidade de oferecer mentoria 1:1
- ✅ **DECIDIDO**: Receber solicitações de cursos customizados

### Citações Representativas

> "Se eu conseguisse vender meu curso de Bash para 100 empresas, seria melhor que dar consultoria para 10."

> "Udemy é B2C e paga muito pouco. Preciso de uma plataforma B2B onde empresas pagam mais por qualidade."

### Jornada no Sistema

```
1. Cadastro no Hub de Especialistas
2. Envia credenciais (LinkedIn, certificações, portfolio)
3. Recebe selo "Especialista Verificado"
4. Cria curso usando template padrão
5. Define preço sugerido (R$ 80/mês/empresa)
6. Submete para aprovação de qualidade
7. Curso publicado no marketplace
8. Empresas encontram e licenciam o curso
9. Acompanha no dashboard: matrículas, receita, reviews
10. Recebe 70% da receita mensalmente
11. Responde solicitações de cursos customizados
12. Oferece mentoria 1:1 para empresas interessadas
```

---

## 7. Matriz de Personas vs Funcionalidades

| Funcionalidade | P1 Mariana | P2 Rafael | P3 Lucas | P4 Carla | P5 João |
|----------------|------------|-----------|----------|----------|---------|
| **Dashboard** | Admin | Instructor | Student | Executive | Specialist |
| **Criar curso** | ❌ | ✅ Interno | ❌ | ❌ | ✅ Marketplace |
| **Consumir curso** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Montar trilha** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Ver analytics** | ✅ Empresa | ✅ Time | ✅ Pessoal | ✅ Estratégico | ✅ Cursos |
| **Matricular usuários** | ✅ | ✅ Time | ❌ | ❌ | ❌ |
| **Exportar relatórios** | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Avaliar cursos** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Usar marketplace** | ✅ Compra | ❌ | ❌ | ❌ | ✅ Vende |
| **Mentoria 1:1** | ❌ | ❌ | ✅ Recebe | ❌ | ✅ Oferece |

---

## 8. Jobs to Be Done

### JTBD #1: Gestor de RH (Mariana)

> "Quando meu CFO questiona ROI de treinamento, eu quero ter dados concretos de conclusão e engajamento, para que eu possa justificar o investimento e manter o budget."

**Critérios de Sucesso:**
- Dashboard com taxa de conclusão por curso
- Relatórios exportáveis (PDF, CSV)
- Comparação antes/depois
- Tempo médio de onboarding mensurável

### JTBD #2: Líder Técnico (Rafael)

> "Quando um novo desenvolvedor júnior entra no time, eu quero que ele aprenda arquitetura e padrões da empresa sozinho, para que eu possa focar em features críticas."

**Critérios de Sucesso:**
- Júnior completa onboarding em 2 semanas (80% sozinho)
- Líder dedica apenas 5h (vs. 30h)
- Conteúdo reutilizável para próximos juniores
- Fácil de atualizar (10 min vs. 1h no Confluence)

### JTBD #3: Desenvolvedor Júnior (Lucas)

> "Quando estou fazendo onboarding, eu quero uma trilha clara de 'faça isso, depois isso', para que eu não fique ansioso e me torne produtivo rápido."

**Critérios de Sucesso:**
- Lista clara de aulas sequenciais
- Progresso visual (8 de 15 aulas completadas)
- Conteúdo relevante (stack da empresa)
- Sistema de notas para anotar dúvidas

### JTBD #4: CTO (Carla)

> "Quando estou escalando o time de 40 para 80 devs, eu quero reduzir time to productivity de 8 para 3 semanas, para que velocity não caia e atinja metas da Série B."

**Critérios de Sucesso:**
- Onboarding estruturado e automático
- Redução de 8 → 3 semanas medida
- ROI demonstrável (R$ 400k/ano em produtividade)
- Escalável (suporta 200+ devs)

### JTBD #5: Especialista Externo (João) ⭐ NOVO

> "Quando tenho conhecimento especializado em uma tecnologia, eu quero vendê-lo para múltiplas empresas de forma escalável, para que eu tenha receita recorrente sem precisar estar sempre presente."

**Critérios de Sucesso:**
- Curso publicado e visível para empresas
- Revenue share de 70% sobre vendas
- Dashboard com métricas de performance
- Possibilidade de oferecer serviços adicionais (mentoria, customização)

---

## Referências

### Documentos Originais (Arquivados)

- `docs/conceitual/01-visao-geral/05-personas-corporativas.md` → Migrado
- `docs/SOLUCAO-E-PERSONAS.md` → Migrado
- `docs/VISAO_MISSAO_E_ESTADO_ATUAL.md` Seção 8.3 → Migrado

### Metodologia

- 15 entrevistas qualitativas (Set-Nov 2025)
- 3 sessões de observação in loco
- Análise de 50+ reviews de Udemy, Moodle, LinkedIn Learning
- Benchmarking com 10 empresas tech (50-500 funcionários)

---

**Última atualização:** 2026-02-09
**Mantido por:** Claude Code
**Status:** ✅ Documento consolidado
