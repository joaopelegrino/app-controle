# Backlog - Sulical Integracoes e Proximos Passos

**Versao:** 1.0.0
**Data:** 2026-02-01
**Sprint Anterior:** 14 - CRUD de Cursos COMPLETO
**Status:** Pronto para Sprint 15

---

## Resumo da Sessao Atual

### Implementado Hoje (2026-02-01)

| Item | Descricao | Status |
|------|-----------|--------|
| Rebranding Sulical | Nome da plataforma atualizado em config, i18n e docs | ✅ |
| Integracao App → Docs | Botao ajuda no header e menu mobile | ✅ |
| Integracao Docs → App | Link "Acessar Plataforma" na navbar VitePress | ✅ |
| Traducoes i18n | `navigation.help` e `navigation.docs` em 3 idiomas | ✅ |
| Build Validado | Frontend e VitePress compilam sem erros | ✅ |

### Arquivos Modificados

```
src/config/platform.js              # Nome Sulical + docsUrl
src/components/UserHeader.jsx       # Botao HelpCircle
src/components/MobileMenu.jsx       # Link Ajuda no footer
docs/.vitepress/config.ts           # Titulo Sulical + link app
docs/index.md                       # Hero Sulical
public/locales/pt-BR/common.json    # Traducoes
public/locales/en-US/common.json    # Traducoes
public/locales/es-ES/common.json    # Traducoes
```

---

## Backlog Priorizado

### P0 - CRITICO (Bloqueiam Demo)

#### US-130: Servir Docs no Mesmo Dominio

**Descricao:** Configurar nginx para servir VitePress em `/docs/` do mesmo dominio da aplicacao.

**Criterios de Aceite:**
- [ ] `http://localhost:3001/docs/` abre documentacao VitePress
- [ ] Links internos da docs funcionam
- [ ] Link "Acessar Plataforma" na docs aponta para `/`
- [ ] Build de producao inclui docs

**Arquivos:**
```
nginx.conf                          # Adicionar location /docs/
Dockerfile                          # Copiar docs dist
vite.config.js                      # Proxy em dev (opcional)
```

**Complexidade:** M (4-6h)

---

#### US-131: Logo Sulical

**Descricao:** Criar e aplicar logo Sulical na aplicacao e documentacao.

**Criterios de Aceite:**
- [ ] Logo SVG criado (`public/logo.svg`)
- [ ] Logo aplicado no LoginView
- [ ] Logo aplicado no header
- [ ] Logo aplicado no VitePress (`docs/public/logo.svg`)
- [ ] Favicon atualizado

**Arquivos:**
```
public/logo.svg                     # CRIAR
public/favicon.ico                  # ATUALIZAR
docs/public/logo.svg                # CRIAR
src/components/LoginView.jsx        # Usar logo
```

**Complexidade:** S (2-4h)

---

### P1 - ALTO (Sprint 15 - Certificados)

#### US-132: Geracao de Certificados PDF

**Descricao:** Gerar certificado PDF automatico ao concluir curso.

**Criterios de Aceite:**
- [ ] Template de certificado em HTML/CSS
- [ ] Geracao de PDF (html2pdf.js ou similar)
- [ ] Dados: nome, curso, data, codigo verificacao
- [ ] Download disponivel no dashboard do aluno
- [ ] Armazenamento do certificado no NocoDB

**Arquivos:**
```
src/components/CertificateTemplate.jsx   # CRIAR
src/components/CertificateModal.jsx      # CRIAR
src/services/certificateService.js       # CRIAR
src/utils/pdfGenerator.js                # CRIAR
database/migration-003-certificates.sql  # CRIAR
```

**Complexidade:** L (8-12h)

---

#### US-133: Pagina de Verificacao de Certificado

**Descricao:** Pagina publica para verificar autenticidade do certificado.

**Criterios de Aceite:**
- [ ] Rota `/verificar/:codigo` publica (sem login)
- [ ] Exibe dados do certificado se valido
- [ ] Mensagem de erro se invalido
- [ ] QR Code no certificado aponta para esta pagina

**Arquivos:**
```
src/components/CertificateVerifyPage.jsx  # CRIAR
src/services/apiService.js                # verifyCertificate()
```

**Complexidade:** M (4-6h)

---

#### US-134: Listagem de Certificados do Aluno

**Descricao:** Secao "Meus Certificados" no dashboard do aluno.

**Criterios de Aceite:**
- [ ] Lista de certificados obtidos
- [ ] Botao download PDF
- [ ] Botao compartilhar (LinkedIn, email)
- [ ] Empty state se nenhum certificado

**Arquivos:**
```
src/components/UserDashboard.jsx          # Adicionar secao
src/components/CertificateCard.jsx        # CRIAR
public/locales/*/dashboard.json           # Traducoes
```

**Complexidade:** M (4-6h)

---

### P2 - MEDIO (Melhorias de Qualidade)

#### US-135: Atualizar Guias de Usuario para Sulical

**Descricao:** Substituir todas referencias "TrainB2B" por "Sulical" nos guias de usuario.

**Criterios de Aceite:**
- [ ] `docs/users/admin-guide.md` atualizado
- [ ] `docs/users/instructor-guide.md` atualizado
- [ ] `docs/users/student-guide.md` atualizado
- [ ] `docs/users/executive-guide.md` atualizado
- [ ] URLs de exemplo atualizadas

**Arquivos:**
```
docs/users/*.md                     # Substituir TrainB2B → Sulical
docs/guide/*.md                     # Verificar referencias
```

**Complexidade:** S (2-4h)

---

#### US-136: Atualizar README e CLAUDE.md para Sulical

**Descricao:** Atualizar documentacao principal do repositorio.

**Criterios de Aceite:**
- [ ] README.md atualizado com nome Sulical
- [ ] CLAUDE.md atualizado
- [ ] .claude/CLAUDE.md atualizado
- [ ] Badges e links atualizados

**Arquivos:**
```
README.md
CLAUDE.md
.claude/CLAUDE.md
```

**Complexidade:** S (1-2h)

---

#### US-137: Testes E2E de Integracao App-Docs

**Descricao:** Testes automatizados para verificar integracao entre app e docs.

**Criterios de Aceite:**
- [ ] Teste: botao ajuda no header abre docs
- [ ] Teste: link ajuda no mobile menu funciona
- [ ] Teste: link "Acessar Plataforma" na docs funciona
- [ ] Testes passam no CI

**Arquivos:**
```
e2e/integration-app-docs.spec.ts    # CRIAR
```

**Complexidade:** M (4-6h)

---

### P3 - BAIXO (Futuras Melhorias)

#### US-138: Dark Mode

**Descricao:** Implementar tema escuro na aplicacao.

**Criterios de Aceite:**
- [ ] Toggle no header para alternar tema
- [ ] Preferencia salva no localStorage
- [ ] Respeita preferencia do sistema
- [ ] Todos componentes suportam dark mode

**Complexidade:** L (8-12h)

---

#### US-139: Notificacoes Push/Email

**Descricao:** Sistema de notificacoes para eventos importantes.

**Criterios de Aceite:**
- [ ] Notificacao ao completar curso
- [ ] Notificacao ao obter certificado
- [ ] Notificacao para instrutor quando aluno para
- [ ] Configuracoes de preferencia

**Complexidade:** XL (16-24h)

---

#### US-140: Gamificacao (Badges)

**Descricao:** Sistema de badges e pontos para engajamento.

**Criterios de Aceite:**
- [ ] Badges por marcos (1o curso, 5 cursos, etc)
- [ ] Badges por streak de estudo
- [ ] Exibicao no perfil do aluno
- [ ] Leaderboard por empresa

**Complexidade:** XL (16-24h)

---

#### US-141: Integracao LMS Externos (SCORM)

**Descricao:** Exportar cursos em formato SCORM para LMS externos.

**Criterios de Aceite:**
- [ ] Exportar curso como pacote SCORM 1.2
- [ ] Compatibilidade com Moodle, Blackboard
- [ ] Tracking de progresso bidirecional

**Complexidade:** XXL (32h+)

---

## Cronograma Sugerido

### Sprint 15 (Semana 1-2)

| US | Descricao | Pontos | Responsavel |
|----|-----------|--------|-------------|
| US-130 | Servir Docs no Mesmo Dominio | 5 | Dev |
| US-131 | Logo Sulical | 3 | Design/Dev |
| US-132 | Geracao de Certificados PDF | 8 | Dev |
| US-133 | Pagina Verificacao Certificado | 5 | Dev |
| **Total** | | **21** | |

### Sprint 16 (Semana 3-4)

| US | Descricao | Pontos | Responsavel |
|----|-----------|--------|-------------|
| US-134 | Listagem Certificados Aluno | 5 | Dev |
| US-135 | Atualizar Guias Usuario | 3 | Dev |
| US-136 | Atualizar README/CLAUDE | 2 | Dev |
| US-137 | Testes E2E Integracao | 5 | QA |
| **Total** | | **15** | |

### Backlog Futuro

| US | Descricao | Pontos | Prioridade |
|----|-----------|--------|------------|
| US-138 | Dark Mode | 8 | P3 |
| US-139 | Notificacoes Push/Email | 13 | P3 |
| US-140 | Gamificacao (Badges) | 13 | P3 |
| US-141 | Integracao SCORM | 21 | P3 |

---

## Metricas de Progresso

### Cobertura RBAC

```
Atual:  18/22 permissoes (82%)
Meta:   22/22 permissoes (100%)
Gap:    4 permissoes sem UI
```

### Funcionalidades MVP

```
Completo:   14 sprints
Pendente:   2 sprints (Certificados + Polish)
Progresso:  87%
```

### Documentacao

```
Guias Usuario:  21 arquivos (100% estrutura)
Rebranding:     60% (falta guias usuarios e README)
Integracao:     100% (app ↔ docs conectados)
```

---

## Dependencias Tecnicas

### Para US-132 (Certificados PDF)

```bash
# Biblioteca sugerida
bun add html2pdf.js
# ou
bun add @react-pdf/renderer
```

### Para US-130 (Servir Docs)

```nginx
# nginx.conf
location /docs/ {
    alias /app/docs/.vitepress/dist/;
    try_files $uri $uri/ /docs/index.html;
}
```

---

## Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| html2pdf.js nao funciona em todos browsers | Media | Medio | Fallback para screenshot |
| VitePress conflita com Vite em dev | Baixa | Baixo | Portas separadas em dev |
| Logo Sulical nao fornecido | Alta | Baixo | Usar placeholder texto |
| Certificado falsificado | Baixa | Alto | Hash SHA256 + verificacao |

---

## Comandos Uteis

```bash
# Desenvolvimento
bun run dev                    # Frontend (3001)
bun run docs:dev               # VitePress (5173)

# Build
bun run build                  # Frontend
bun run docs:build             # Documentacao

# Testar integracao
curl http://localhost:3001/docs/  # Apos US-130

# Verificar rebranding
grep -r "TrainB2B" src/ public/ docs/
```

---

## Referencias

| Documento | Path |
|-----------|------|
| Roadmap | `docs/backlog/ROADMAP.md` |
| Gaps | `docs/backlog/GAPS-DEMO-B2B.md` |
| Personas | `docs/conceitual/01-visao-geral/05-personas-corporativas.md` |
| Deploy | `docs/deploy/FLYIO-BILLING-ACOES-USUARIO.md` |

---

*Backlog Sulical v1.0.0 | 2026-02-01*
*Proxima Revisao: Inicio do Sprint 15*
