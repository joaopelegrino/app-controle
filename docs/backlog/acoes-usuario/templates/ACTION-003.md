---
id: ACTION-003
titulo: "Validar Conformidade WCAG 2.1 AA em Componentes Refatorados"
prioridade: P1
status: PENDENTE
categoria: validation
deliverable: D-021
sprint: "Release 2.0 - UI Refactoring"
created: 2025-11-17
updated: 2025-11-17
completed: null
estimativa: "4 horas"
responsavel: "UX Lead"
---

# ACTION-003: Validar Conformidade WCAG 2.1 AA em Componentes Refatorados

## 📋 Descrição

Validar manualmente que os componentes refatorados no ÉPICO-12 (Arquitetura de Informação) atendem aos critérios de acessibilidade WCAG 2.1 nível AA, incluindo breadcrumb, navegação hierárquica, e componentes de formulário.

## 🎯 Contexto

**Por que esta ação é necessária?**
O Ultrathink é uma plataforma B2B que pode ser utilizada por colaboradores com diversas necessidades de acessibilidade. Garantir conformidade WCAG não é apenas compliance legal (Lei Brasileira de Inclusão), mas também amplia o mercado endereçável para empresas com políticas de inclusão.

**Relação com Deliverables:**
- Deliverable: D-021 - Refatoração de componentes UI
- User Story: US-038 - Implementar breadcrumb navigation WCAG-compliant
- ÉPICO: ÉPICO-12 - Arquitetura de Informação

**Dependências:**
- [ ] D-021 implementado e merged em `desenvolvimento`
- [ ] Componentes de breadcrumb e navegação finalizados
- [ ] Documentação de componentes atualizada

## 📝 Passo a Passo

### Pré-requisitos
- [ ] Aplicação rodando localmente (`npm run dev`)
- [ ] Browser com DevTools (Chrome/Firefox)
- [ ] Screen reader instalado (NVDA no Windows ou Orca no Linux)
- [ ] Extensões instaladas:
  - axe DevTools (Chrome/Firefox)
  - WAVE Evaluation Tool
  - Lighthouse (built-in Chrome)

### Execução

**Passo 1: Validação Automática com axe DevTools**
```bash
# 1. Abrir aplicação
npm run dev
# Browser: http://localhost:3000

# 2. Abrir DevTools → axe DevTools tab
# 3. Clicar em "Scan ALL of my page"
# 4. Revisar issues encontrados
```

**Validar:**
- [ ] Zero issues críticos (Critical)
- [ ] < 5 issues sérios (Serious)
- [ ] Issues moderados documentados

**Passo 2: Testes de Navegação por Teclado**
Testar sem mouse, apenas teclado:

```
Tab          → Avançar para próximo elemento focável
Shift+Tab    → Voltar para elemento anterior
Enter/Space  → Ativar links e botões
Arrow Keys   → Navegar em menus e listas
Esc          → Fechar modais e dropdowns
```

**Validar:**
- [ ] Todos os elementos interativos são alcançáveis via Tab
- [ ] Ordem de foco é lógica e previsível
- [ ] Foco visível (outline) em todos os elementos
- [ ] Não há "keyboard traps" (elementos que prendem o foco)
- [ ] Breadcrumb navegável por Tab + Enter

**Passo 3: Testes com Screen Reader (NVDA/Orca)**
```bash
# Linux: instalar Orca
sudo apt install orca

# Iniciar Orca
orca &
```

**Testar:**
1. **Landmarks e Estrutura:**
   - [ ] `<main>`, `<nav>`, `<header>`, `<footer>` identificados
   - [ ] Headings hierárquicos (h1 → h2 → h3)
   - [ ] Breadcrumb identificado como navigation landmark

2. **Breadcrumb Navigation:**
   - [ ] Lista de navegação anunciada corretamente
   - [ ] Item atual identificado com `aria-current="page"`
   - [ ] Links anunciados com destino claro

3. **Componentes Interativos:**
   - [ ] Botões anunciados como "button"
   - [ ] Links anunciados como "link"
   - [ ] Form labels associados corretamente
   - [ ] Estados (disabled, checked) anunciados

4. **Imagens e Ícones:**
   - [ ] Alt text descritivo em imagens
   - [ ] Ícones decorativos com `aria-hidden="true"`
   - [ ] Ícones funcionais com `aria-label`

**Passo 4: Validação de Contraste de Cores**
```bash
# Usar axe DevTools ou WAVE
# Browser: DevTools → axe → Color Contrast issues
```

**Validar:**
- [ ] Contraste mínimo 4.5:1 para texto normal
- [ ] Contraste mínimo 3:1 para texto grande (18px+ ou 14px+ bold)
- [ ] Contraste mínimo 3:1 para elementos interativos (botões, inputs)

**Passo 5: Lighthouse Accessibility Audit**
```bash
# Browser: DevTools → Lighthouse tab
# Selecionar "Accessibility" category
# Clicar "Analyze page load"
```

**Validar:**
- [ ] Score de Acessibilidade > 90
- [ ] Todos os critérios WCAG 2.1 AA passando
- [ ] Sem issues de alto impacto

**Passo 6: Testes Manuais de Casos de Uso**

**Cenário 1: Navegação Completa por Teclado**
```
1. Tab até o breadcrumb
2. Enter para navegar para nível anterior
3. Tab até a navegação de cursos
4. Arrow keys para selecionar curso
5. Enter para abrir aula
```

**Cenário 2: Usuário com Screen Reader**
```
1. Iniciar NVDA/Orca
2. Navegar pelos landmarks (H, D, L)
3. Ler breadcrumb
4. Navegar para conteúdo principal
5. Ler títulos e descrições
```

**Cenário 3: Usuário com Visão Reduzida**
```
1. Zoom 200% (Ctrl++)
2. Validar que layout não quebra
3. Validar que texto não fica cortado
4. Validar que scroll horizontal não aparece
```

## ✅ Validação

**Como validar que a ação foi executada corretamente?**

**WCAG 2.1 AA - Critérios Principais:**
- [ ] **1.1.1** - Non-text Content (alt text)
- [ ] **1.3.1** - Info and Relationships (semantic HTML)
- [ ] **1.4.3** - Contrast Minimum (4.5:1)
- [ ] **2.1.1** - Keyboard (all functionality via keyboard)
- [ ] **2.4.1** - Bypass Blocks (skip links)
- [ ] **2.4.3** - Focus Order (logical tab order)
- [ ] **2.4.7** - Focus Visible (visible outline)
- [ ] **3.2.3** - Consistent Navigation
- [ ] **4.1.2** - Name, Role, Value (ARIA attributes)

**Comandos de Validação:**
```bash
# Validar HTML semântico
npm run build
grep -E '(aria-|role=|alt=)' dist/index.html

# Rodar pa11y (acessibility testing tool)
npx pa11y http://localhost:3000
```

## 🎁 Resultado Esperado

Plataforma Ultrathink 100% acessível conforme WCAG 2.1 AA:
- Score Lighthouse Accessibility > 90
- Zero issues críticos de acessibilidade
- Navegação completa por teclado funcional
- Screen readers funcionando corretamente
- Contraste de cores adequado

**Evidências:**
- [ ] Screenshot do axe DevTools (sem issues críticos)
- [ ] Screenshot do Lighthouse (score > 90)
- [ ] Vídeo de navegação com screen reader (2 min)
- [ ] Relatório WAVE completo salvo em `docs/accessibility/`
- [ ] Checklist WCAG 2.1 AA completa

## 📌 Notas

**Referências:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lei Brasileira de Inclusão (LBI)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)
- [axe DevTools Documentation](https://www.deque.com/axe/devtools/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- ROADMAP.md - ÉPICO-12 - US-038

**Riscos:**
- **Risco:** Issues WCAG podem requerer refatoração significativa
  - **Mitigação:** Priorizar issues críticos primeiro, documentar moderados
- **Risco:** Screen readers diferentes podem ter comportamentos variados
  - **Mitigação:** Testar com NVDA (Windows) e Orca (Linux) no mínimo
- **Risco:** Contraste pode ser subjetivo em alguns casos
  - **Mitigação:** Usar ferramentas automáticas como referência objetiva

**Compliance Legal:**
- Lei Brasileira de Inclusão (LBI - Lei 13.146/2015)
- Decreto Federal nº 5.296/2004 (acessibilidade digital)

**Tempo Estimado:** 4 horas (incluindo testes completos e documentação)

---

**Status:** PENDENTE
**Última Atualização:** 2025-11-17
**Próxima Ação:** Corrigir issues encontrados e re-validar com axe DevTools
