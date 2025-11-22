# Pesquisa: Soluções de Banco de Dados para Ultrathink

**Data:** 22 de Novembro de 2025
**Objetivo:** Avaliar opções de banco de dados local-first vs cloud para o projeto Ultrathink
**Contexto:** Migração de localStorage para solução escalável e corporativa

---

## Sumário Executivo

Este relatório analisa **12 soluções de banco de dados** categorizadas em 4 grupos:
1. **Embedded/Local-First:** DuckDB, SQLite, Turso/libSQL
2. **Cloud Serverless:** Neon, Supabase, PlanetScale
3. **Híbridos (Local + Cloud):** MotherDuck, ElectricSQL
4. **Tradicionais:** PostgreSQL self-hosted

### Recomendação Principal

Para o **Ultrathink B2B**, recomendamos uma abordagem em fases:

| Fase | Solução | Justificativa |
|------|---------|---------------|
| **MVP (Atual)** | localStorage | Já implementado, suficiente para demo |
| **Release 3.0** | **Supabase** | BaaS completo, PostgreSQL, Auth, Storage |
| **Futuro (Scale)** | Supabase + DuckDB | Analytics com DuckDB para dashboards |

---

## 1. Soluções Embedded/Local-First

### 1.1 DuckDB

> "SQLite para Analytics"

**O que é:** Banco de dados embarcado otimizado para consultas analíticas (OLAP), não requer servidor.

**Características:**
- Armazenamento colunar (vs row-based do SQLite)
- Execução vetorizada (10-50x mais rápido para agregações)
- Suporte a WASM (roda no browser)
- Zero dependências externas
- Integração nativa com Parquet, CSV, JSON

**Performance:**
- Window functions: 15.2x mais rápido que PostgreSQL
- Agregações em 1M+ registros: ordens de magnitude mais rápido
- Startup: milissegundos (in-process)

**Ideal para:**
- ✅ Dashboards de analytics corporativo
- ✅ Exploração de dados em Jupyter/notebooks
- ✅ ETL/ELT leve
- ❌ CRUD transacional (muitas escritas)
- ❌ Multi-usuário concorrente

**Preço:** Gratuito (open source)

**Para Ultrathink:**
- Excelente para dashboards de RH (métricas de engajamento)
- Não adequado para dados transacionais (notas, progresso)

**Fontes:**
- [DuckDB vs PostgreSQL - Airbyte](https://airbyte.com/data-engineering-resources/duckdb-vs-postgres)
- [DuckDB vs PostgreSQL 2025 - Digitalogy](https://www.digitalogy.co/blog/duckdb-vs-postgresql/)
- [MotherDuck Blog - Postgres + DuckDB](https://motherduck.com/blog/postgres-duckdb-options/)

---

### 1.2 SQLite

> "O banco de dados mais usado do mundo"

**O que é:** Banco embarcado row-based, padrão da indústria para aplicações locais.

**Características:**
- Armazenamento por linhas (OLTP otimizado)
- Single-file database
- Suporte universal (iOS, Android, Browser via sql.js)
- ACID compliance completo
- Zero configuração

**Performance:**
- CRUD individual: excelente
- Consultas analíticas: limitado (não otimizado)
- Tamanho máximo: 281 TB (teórico)

**Ideal para:**
- ✅ Apps mobile offline-first
- ✅ Cache local em desktop apps
- ✅ Prototipagem rápida
- ❌ Analytics em grandes volumes
- ❌ Multi-usuário remoto

**Preço:** Gratuito (domínio público)

**Para Ultrathink:**
- Possível como cache local (embedded replicas)
- Não ideal como banco principal (sem sync nativo)

**Fontes:**
- [DuckDB vs SQLite - MotherDuck](https://motherduck.com/learn-more/duckdb-vs-sqlite-databases/)
- [DuckDB vs SQLite - Better Stack](https://betterstack.com/community/guides/scaling-python/duckdb-vs-sqlite/)

---

### 1.3 Turso / libSQL

> "SQLite para a Edge"

**O que é:** Fork do SQLite com recursos de edge computing e sync, mantido pela Turso.

**Características:**
- Baseado em libSQL (fork aberto do SQLite)
- Edge-hosted com latência mínima global
- Embedded replicas (sync local-cloud)
- Suporte a vetores (AI/RAG nativos)
- Reescrita em Rust em andamento

**Recursos Local-First:**
```javascript
// Sync automático com embedded replica
const db = createClient({
  url: 'libsql://seu-banco.turso.io',
  syncUrl: 'file:local-replica.db'
});
await db.sync(); // Sincroniza local ↔ cloud
```

**Performance:**
- Latência global: baixa (edge nodes)
- Offline: funciona 100%
- Sync: automático quando online

**Ideal para:**
- ✅ Apps local-first com sync
- ✅ Dispositivos edge/IoT
- ✅ Apps com IA (vector search nativo)
- ❌ Analytics pesados (usar DuckDB)

**Preço:**
| Plano | Preço | Databases | Storage |
|-------|-------|-----------|---------|
| Starter | Grátis | 500 | 9GB |
| Scaler | $29/mês | 10.000 | 24GB |
| Pro | Custom | Ilimitado | Ilimitado |

**Para Ultrathink:**
- Interessante para modo offline (colaboradores em campo)
- Embedded replicas para performance
- Menos maduro que Supabase para BaaS completo

**Fontes:**
- [Turso - Local-First SQLite](https://turso.tech/local-first)
- [GitHub - libSQL](https://github.com/tursodatabase/libsql)
- [Turso Embedded Replicas](https://turso.tech/blog/local-first-cloud-connected-sqlite-with-turso-embedded-replicas)

---

## 2. Soluções Cloud Serverless

### 2.1 Supabase ⭐ RECOMENDADO

> "Firebase Open Source"

**O que é:** BaaS (Backend-as-a-Service) completo baseado em PostgreSQL.

**Características:**
- PostgreSQL gerenciado
- Auth built-in (OAuth, Magic Links, SSO)
- Storage para arquivos
- Edge Functions (Deno)
- Realtime subscriptions
- Auto-generated REST/GraphQL APIs
- Row Level Security (RLS)

**Arquitetura:**
```
┌─────────────────────────────────────────────┐
│                  Supabase                    │
├─────────────────────────────────────────────┤
│  Auth │ Database │ Storage │ Edge Functions │
│       │ (Postgres)│         │    (Deno)      │
└─────────────────────────────────────────────┘
```

**Integração React:**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Consulta com RLS automático
const { data, error } = await supabase
  .from('user_progress')
  .select('*')
  .eq('user_id', userId)
```

**Performance:**
- Latência: sub-10ms (com pooling)
- Conexões: via Supavisor (connection pooling)
- Realtime: WebSocket nativo

**Ideal para:**
- ✅ Full-stack apps (auth + db + storage)
- ✅ Multi-tenant B2B
- ✅ Prototipagem rápida → produção
- ✅ Equipes pequenas (tudo integrado)
- ❌ Analytics pesados (complementar com DuckDB)

**Preço:**
| Plano | Preço | Database | Storage | Auth MAU |
|-------|-------|----------|---------|----------|
| Free | $0 | 500MB | 1GB | 50.000 |
| Pro | $25/mês | 8GB | 100GB | 100.000 |
| Team | $599/mês | 32GB | 200GB | Ilimitado |
| Enterprise | Custom | Custom | Custom | Custom |

**Para Ultrathink:**
- **RECOMENDADO** para Release 3.0
- Auth pronto (SSO corporativo no plano Team)
- PostgreSQL = schemas já planejados funcionam
- Storage para vídeos/materiais
- Row Level Security para multi-tenant

**Fontes:**
- [Neon vs Supabase - Bytebase](https://www.bytebase.com/blog/neon-vs-supabase/)
- [Comparing Neon, Supabase, PlanetScale](https://kenny-io.hashnode.dev/comparing-popular-cloud-databases-neon-supabase-planetscale)
- [Bejamas Comparison](https://bejamas.com/compare/neon-vs-planetscale-vs-supabase)

---

### 2.2 Neon

> "Serverless Postgres Puro"

**O que é:** PostgreSQL serverless com separação de storage/compute e branching.

**Características:**
- PostgreSQL nativo (100% compatível)
- Separação storage ↔ compute
- Database branching (como Git)
- Auto-scaling (scale-to-zero)
- Sem gestão de infra

**Recursos Únicos:**
- **Branching:** Crie branches do banco para dev/staging
- **Scale-to-zero:** Para de cobrar quando inativo
- **Instant restore:** Point-in-time recovery

**Integração:**
```javascript
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const posts = await sql`SELECT * FROM posts`;
```

**Performance:**
- Latência: sub-10ms
- Cold start: ~500ms (scale-to-zero)
- Conexões: serverless driver otimizado

**Ideal para:**
- ✅ Postgres puro sem extras
- ✅ CI/CD com database branching
- ✅ Projetos com tráfego variável
- ❌ Auth/Storage (precisa complementar)

**Preço:**
| Plano | Preço | Compute | Storage | Branches |
|-------|-------|---------|---------|----------|
| Free | $0 | 0.5 vCPU | 512MB | 10 |
| Launch | $19/mês | 1 vCPU | 10GB | Ilimitado |
| Scale | $69/mês | 2 vCPU | 50GB | Ilimitado |

**Para Ultrathink:**
- Bom se quiser apenas banco (sem Auth/Storage)
- Branching excelente para CI/CD
- Menos completo que Supabase para BaaS

**Fontes:**
- [Neon vs Supabase - Bytebase](https://www.bytebase.com/blog/neon-vs-supabase/)
- [State of Databases 2024](https://www.devtoolsacademy.com/blog/state-of-databases-2024/)

---

### 2.3 PlanetScale

> "MySQL Serverless com Vitess"

**O que é:** MySQL serverless baseado em Vitess (tecnologia do YouTube).

**Características:**
- MySQL (não PostgreSQL)
- Baseado em Vitess (sharding automático)
- Database branching
- Non-blocking schema changes
- Horizontal scaling

**⚠️ Mudança Importante (2024):**
PlanetScale **descontinuou o plano gratuito** em abril de 2024. Agora o plano mínimo é $39/mês.

**Ideal para:**
- ✅ Apps MySQL existentes
- ✅ Scale massivo (milhões de usuários)
- ❌ Novos projetos (custo inicial alto)
- ❌ PostgreSQL (não suportado)

**Preço:**
| Plano | Preço | Storage | Rows read/mês |
|-------|-------|---------|---------------|
| Scaler | $39/mês | 10GB | 100M |
| Scaler Pro | $99/mês | 50GB | 500M |

**Para Ultrathink:**
- ❌ **Não recomendado**
- Schemas planejados são PostgreSQL
- Sem plano gratuito
- Custo alto para MVP

**Fontes:**
- [PlanetScale Hobby Plan Deprecated](https://blog.logrocket.com/11-planetscale-alternatives-free-tiers/)
- [Bejamas Comparison](https://bejamas.com/compare/neon-vs-planetscale-vs-supabase)

---

## 3. Soluções Híbridas (Local + Cloud)

### 3.1 MotherDuck

> "DuckDB na Cloud"

**O que é:** Data warehouse serverless baseado em DuckDB com execução híbrida.

**Características:**
- DuckDB na cloud
- Dual execution (local + cloud)
- Integração com BI tools (Tableau, PowerBI)
- SOC 2 certificado
- EU region disponível

**Arquitetura Única:**
```
┌─────────────┐     ┌─────────────┐
│  Local      │     │  Cloud      │
│  DuckDB     │◄───►│  MotherDuck │
│  (seu PC)   │     │  (Duckling) │
└─────────────┘     └─────────────┘
       │                    │
       └────────┬───────────┘
                │
        Dual Execution
        (queries otimizadas)
```

**Integração:**
```python
# Conectar DuckDB local ao MotherDuck
import duckdb
conn = duckdb.connect('md:')  # Uma linha!
```

**Sizing (Ducklings):**
| Tier | vCPU | RAM | Preço/hora |
|------|------|-----|------------|
| Pulse | 0.5 | 2GB | $0.10 |
| Standard | 2 | 8GB | $0.40 |
| Jumbo | 8 | 32GB | $1.60 |
| Mega | 32 | 128GB | $6.40 |

**Ideal para:**
- ✅ Analytics corporativo
- ✅ Dashboards de RH/gestores
- ✅ Data science workflows
- ❌ CRUD transacional

**Para Ultrathink:**
- Excelente para dashboards de analytics (Release 3.0)
- Complementar ao Supabase (não substitui)
- Dual execution = queries rápidas mesmo com pouco compute

**Fontes:**
- [MotherDuck GA Announcement](https://www.prnewswire.com/news-releases/motherduck-announces-general-availability-brings-simplicity-and-power-of-duckdb-in-a-serverless-data-warehouse-302168749.html)
- [MotherDuck Architecture](https://motherduck.com/docs/concepts/architecture-and-capabilities/)
- [MotherDuck - Xebia](https://xebia.com/blog/motherduck-serverless-analytics-without-overhead/)

---

### 3.2 ElectricSQL

> "Local-First Sync com CRDTs"

**O que é:** Camada de sync local-first entre PostgreSQL e SQLite usando CRDTs.

**Características:**
- Sync bidirecional Postgres ↔ SQLite
- CRDTs (Conflict-free Replicated Data Types)
- Funciona 100% offline
- Criado pelos inventores de CRDTs
- Open source (600K+ downloads/semana)

**Arquitetura:**
```
┌───────────────────────────────────────────────────┐
│                   PostgreSQL                       │
│                   (Cloud/Server)                   │
└─────────────────────────┬─────────────────────────┘
                          │
                    Electric Sync
                    (Elixir Server)
                          │
          ┌───────────────┼───────────────┐
          │               │               │
     ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
     │ SQLite  │    │ SQLite  │    │ SQLite  │
     │ Device 1│    │ Device 2│    │ Device 3│
     └─────────┘    └─────────┘    └─────────┘
```

**Integração React:**
```javascript
import { useShape } from '@electric-sql/react'

function MyComponent() {
  const { data } = useShape({
    url: `http://localhost:3000/v1/shape`,
    params: {
      table: 'user_progress',
      where: `user_id = '${userId}'`
    }
  })
  return <ProgressList items={data} />
}
```

**Consistência:**
- Transactional Causal+ Consistency
- Sem conflitos em escritas offline
- Preserva integridade relacional

**Ideal para:**
- ✅ Apps que PRECISAM funcionar offline
- ✅ Colaboração real-time
- ✅ Multi-device sync
- ❌ Analytics pesados

**Status (2024):**
Em julho 2024, Electric anunciou "clean rebuild" do sync engine. A versão legacy foi descontinuada.

**Para Ultrathink:**
- Interessante para cenário de colaboradores em campo
- Mais complexo de implementar que Supabase
- Considerar para Release 4.0 (mobile offline)

**Fontes:**
- [ElectricSQL - Local-First with React](https://electric-sql.com/blog/2023/10/12/linerlite-local-first-with-react)
- [ElectricSQL - Introducing v0.6](https://electric-sql.com/blog/2023/09/20/introducing-electricsql-v0.6)
- [GitHub - ElectricSQL](https://github.com/electric-sql/electric)

---

## 4. Matriz Comparativa

### 4.1 Funcionalidades

| Solução | Tipo | Engine | Offline | Multi-tenant | Auth | Storage | Analytics |
|---------|------|--------|---------|--------------|------|---------|-----------|
| **DuckDB** | Embedded | Colunar | ✅ | ❌ | ❌ | ❌ | ⭐⭐⭐ |
| **SQLite** | Embedded | Row | ✅ | ❌ | ❌ | ❌ | ⭐ |
| **Turso** | Edge | libSQL | ✅ | ✅ | ❌ | ❌ | ⭐ |
| **Supabase** | BaaS | Postgres | ❌ | ✅ | ✅ | ✅ | ⭐⭐ |
| **Neon** | Serverless | Postgres | ❌ | ✅ | ❌ | ❌ | ⭐⭐ |
| **PlanetScale** | Serverless | MySQL | ❌ | ✅ | ❌ | ❌ | ⭐⭐ |
| **MotherDuck** | Hybrid | DuckDB | ✅ | ✅ | ❌ | ❌ | ⭐⭐⭐ |
| **ElectricSQL** | Sync | Postgres+SQLite | ✅ | ✅ | ❌ | ❌ | ⭐ |

### 4.2 Preços (Plano Inicial Pago)

| Solução | Plano Gratuito | Primeiro Pago | Custo Anual (Pro) |
|---------|----------------|---------------|-------------------|
| **DuckDB** | ✅ Ilimitado | N/A | $0 |
| **SQLite** | ✅ Ilimitado | N/A | $0 |
| **Turso** | ✅ 500 DBs | $29/mês | $348 |
| **Supabase** | ✅ 500MB | $25/mês | $300 |
| **Neon** | ✅ 512MB | $19/mês | $228 |
| **PlanetScale** | ❌ | $39/mês | $468 |
| **MotherDuck** | ✅ Limited | ~$50/mês | ~$600 |
| **ElectricSQL** | ✅ Self-host | Cloud pricing | Variável |

### 4.3 Adequação ao Ultrathink

| Solução | MVP | Release 3.0 | Release 4.0 | Score |
|---------|-----|-------------|-------------|-------|
| **Supabase** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | **9/10** |
| **Neon** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | 7/10 |
| **Turso** | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | 7/10 |
| **MotherDuck** | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 7/10 |
| **ElectricSQL** | ⭐ | ⭐⭐ | ⭐⭐⭐ | 6/10 |
| **PlanetScale** | ❌ | ⭐⭐ | ⭐⭐ | 4/10 |

---

## 5. Arquitetura Recomendada

### 5.1 Release 3.0 (Supabase)

```
┌─────────────────────────────────────────────────────────────┐
│                        Supabase                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐  ┌─────────────┐  ┌─────────┐  ┌────────────┐  │
│  │  Auth   │  │  PostgreSQL │  │ Storage │  │   Edge     │  │
│  │         │  │             │  │         │  │  Functions │  │
│  │ - OAuth │  │ - tenants   │  │ - videos│  │            │  │
│  │ - SSO   │  │ - users     │  │ - assets│  │ - webhooks │  │
│  │ - JWT   │  │ - courses   │  │ - pdfs  │  │ - cron     │  │
│  │         │  │ - progress  │  │         │  │            │  │
│  └────┬────┘  └──────┬──────┘  └────┬────┘  └─────┬──────┘  │
│       │              │              │             │          │
└───────┼──────────────┼──────────────┼─────────────┼──────────┘
        │              │              │             │
        └──────────────┴──────────────┴─────────────┘
                              │
                    Supabase Client (React)
                              │
                      ┌───────┴───────┐
                      │               │
                 ┌────┴────┐    ┌────┴────┐
                 │ Browser │    │ Mobile  │
                 │ (React) │    │ (React  │
                 │         │    │ Native) │
                 └─────────┘    └─────────┘
```

### 5.2 Release 4.0 (Supabase + DuckDB Analytics)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Ultrathink Stack                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRANSACIONAL (Supabase)              ANALYTICS (MotherDuck/DuckDB) │
│  ┌─────────────────────┐              ┌─────────────────────┐       │
│  │                     │              │                     │       │
│  │  PostgreSQL         │    ETL       │  DuckDB             │       │
│  │  - CRUD users       │ ──────────►  │  - Agregações       │       │
│  │  - Progress         │    (daily)   │  - Dashboards       │       │
│  │  - Notes            │              │  - Reports          │       │
│  │                     │              │                     │       │
│  └──────────┬──────────┘              └──────────┬──────────┘       │
│             │                                    │                   │
│             │                                    │                   │
│  ┌──────────┴──────────┐              ┌──────────┴──────────┐       │
│  │   App Principal     │              │   Dashboard RH      │       │
│  │   (Colaboradores)   │              │   (Gestores)        │       │
│  │                     │              │                     │       │
│  │   - Estudar cursos  │              │   - Métricas time   │       │
│  │   - Fazer anotações │              │   - Engajamento     │       │
│  │   - Ver progresso   │              │   - ROI treinamento │       │
│  └─────────────────────┘              └─────────────────────┘       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Plano de Implementação

### Fase 1: Preparação (2 semanas)

```bash
# Criar projeto Supabase
npx supabase init
npx supabase start

# Instalar dependências
npm install @supabase/supabase-js @supabase/auth-helpers-react
```

### Fase 2: Migração de Schema (1 semana)

```sql
-- Migrations Supabase
-- 001_create_tenants.sql
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 002_create_users.sql
-- 003_create_courses.sql
-- ... (usar schemas do relatório anterior)
```

### Fase 3: Auth Integration (1 semana)

```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

// src/hooks/useAuth.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

### Fase 4: Data Migration (2 semanas)

```javascript
// Migrar dados do localStorage para Supabase
async function migrateUserData(userId) {
  // 1. Ler notas do localStorage
  const localNotes = JSON.parse(
    localStorage.getItem('bash-learning-notes') || '{}'
  )

  // 2. Inserir no Supabase
  if (localNotes.content) {
    await supabase.from('user_notes').upsert({
      user_id: userId,
      course_id: 'bash',
      content: localNotes.content,
      migrated_from_local: true
    })
  }

  // 3. Limpar localStorage (após confirmação)
  // localStorage.removeItem('bash-learning-notes')
}
```

---

## 7. Custos Estimados (12 meses)

### Cenário: 100 usuários ativos

| Componente | Plano | Custo Mensal | Custo Anual |
|------------|-------|--------------|-------------|
| **Supabase** | Pro | $25 | $300 |
| **MotherDuck** | Starter | $50 | $600 |
| **Total** | - | **$75** | **$900** |

### Cenário: 500 usuários ativos

| Componente | Plano | Custo Mensal | Custo Anual |
|------------|-------|--------------|-------------|
| **Supabase** | Team | $599 | $7.188 |
| **MotherDuck** | Standard | $150 | $1.800 |
| **Total** | - | **$749** | **$8.988** |

### Comparativo ROI

```
Plataformas genéricas (Udemy Business):
- 100 usuários: ~R$ 150.000/ano
- 500 usuários: ~R$ 500.000/ano

Ultrathink self-hosted:
- 100 usuários: ~R$ 5.000/ano ($900 * 5.5)
- 500 usuários: ~R$ 50.000/ano ($9.000 * 5.5)

Economia:
- 100 usuários: R$ 145.000/ano (96% menos)
- 500 usuários: R$ 450.000/ano (90% menos)
```

---

## 8. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Vendor lock-in Supabase | Média | Alto | PostgreSQL padrão = portável |
| Custos escalam rápido | Média | Médio | Monitorar usage, otimizar queries |
| Latência em regiões distantes | Baixa | Médio | Supabase tem edge caching |
| Migração de localStorage | Baixa | Alto | Testar migração em staging |

---

## 9. Conclusão e Recomendação Final

### Decisão Recomendada

| Release | Solução | Justificativa |
|---------|---------|---------------|
| **2.0 (Atual)** | localStorage | Já funciona, foco em features |
| **3.0 (Q2 2026)** | **Supabase** | BaaS completo, Auth + DB + Storage |
| **4.0 (Q3 2026)** | Supabase + MotherDuck | Analytics para dashboards corporativos |

### Por que Supabase?

1. **PostgreSQL nativo** → Schemas já planejados funcionam
2. **Auth completo** → SSO corporativo incluído (Team plan)
3. **Storage** → Para vídeos e materiais de curso
4. **Row Level Security** → Multi-tenant nativo
5. **Preço justo** → $25/mês para começar, escala gradualmente
6. **Open source** → Sem vendor lock-in total

### Próximos Passos

1. ✅ Criar conta Supabase (free tier)
2. ✅ Migrar schemas para migrations
3. ✅ Implementar Auth em staging
4. ✅ Testar migração de localStorage
5. ✅ Deploy Release 3.0

---

## Fontes e Referências

### DuckDB & Analytics
- [DuckDB vs PostgreSQL - Airbyte](https://airbyte.com/data-engineering-resources/duckdb-vs-postgres)
- [DuckDB vs PostgreSQL 2025 - Digitalogy](https://www.digitalogy.co/blog/duckdb-vs-postgresql/)
- [DuckDB vs SQLite - MotherDuck](https://motherduck.com/learn-more/duckdb-vs-sqlite-databases/)
- [Why DuckDB - DuckDB.org](https://duckdb.org/why_duckdb)

### Cloud Databases
- [State of Databases 2024](https://www.devtoolsacademy.com/blog/state-of-databases-2024/)
- [Neon vs Supabase - Bytebase](https://www.bytebase.com/blog/neon-vs-supabase/)
- [Comparing Neon, Supabase, PlanetScale](https://kenny-io.hashnode.dev/comparing-popular-cloud-databases-neon-supabase-planetscale)
- [Bejamas Database Comparison](https://bejamas.com/compare/neon-vs-planetscale-vs-supabase)

### Local-First & Sync
- [Turso Local-First](https://turso.tech/local-first)
- [ElectricSQL - Local-First with React](https://electric-sql.com/blog/2023/10/12/linerlite-local-first-with-react)
- [GitHub - ElectricSQL](https://github.com/electric-sql/electric)
- [GitHub - libSQL](https://github.com/tursodatabase/libsql)

### MotherDuck
- [MotherDuck GA Announcement](https://www.prnewswire.com/news-releases/motherduck-announces-general-availability-brings-simplicity-and-power-of-duckdb-in-a-serverless-data-warehouse-302168749.html)
- [MotherDuck Architecture](https://motherduck.com/docs/concepts/architecture-and-capabilities/)

---

**Gerado em:** 2025-11-22
**Por:** Claude Code (Learning Mode)
**Projeto:** Ultrathink B2B
**Objetivo:** Pesquisa de soluções de banco de dados corporativas
