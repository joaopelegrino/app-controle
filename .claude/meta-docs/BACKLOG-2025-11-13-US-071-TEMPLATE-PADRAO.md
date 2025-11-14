# 📋 Backlog - US-071 Template de Curso Padrão

**Data:** 2025-11-13
**Sessão:** Implementação de Template Reutilizável
**Status:** 🚧 75% COMPLETO

---

## ✅ Completado

### 1. Documentação Principal ✅
- [x] `docs/TEMPLATE-CURSO-PADRAO.md` criado (600+ linhas)
  - Guia completo passo a passo
  - 9 etapas documentadas
  - Tempo estimado: 5-6h por sistema
  - Checklist de conformidade (14 itens)
  - Paleta de cores Tailwind
  - Troubleshooting de erros comuns

### 2. Template de Dados ✅
- [x] `templates/learningDataTemplate.js` criado (300+ linhas)
  - Estrutura completa de fases/seções
  - 12 módulos exemplo (3 por seção)
  - Funções auxiliares (getWeekDate, formatDate)
  - Estatísticas automáticas
  - Comentários detalhados

---

## 📋 Pendente

### 3. Template de Sistema Principal ⏳
- [ ] Criar `templates/LearningSystemTemplate.jsx`
  - Baseado em BashLearningSystem.jsx
  - Placeholders para substituição
  - Imports completos
  - Estados (notas, progresso)
  - Breadcrumb integrado
  - Grid 2 colunas (Vídeo + Caderno)
  - Seções com cores
  - Auto-save localStorage

**Estimativa:** 30-40 min

### 4. Template de Notas ⏳
- [ ] Criar `templates/NotesViewTemplate.jsx`
  - Baseado em BashNotesView.jsx
  - Breadcrumb nível 3
  - Subtópicos expandíveis
  - Flash cards integration

**Estimativa:** 20-30 min

### 5. Validação ⏳
- [ ] Build: `npm run build`
- [ ] Verificar se templates são válidos (sem erros de sintaxe)
- [ ] Atualizar PRODUCT-CENTRAL-DOCUMENT.md (marcar US-071 DONE)
- [ ] Atualizar CLAUDE.md (conquistas)

**Estimativa:** 15 min

---

## 🎯 Próxima Ação (Retomada)

**Comando para continuar:**
```bash
# Ler este backlog
cat BACKLOG-2025-11-13-US-071-TEMPLATE-PADRAO.md

# Ver templates criados
ls -la templates/

# Ver documentação
cat docs/TEMPLATE-CURSO-PADRAO.md

# Continuar implementação
/usuario:usuario-continuar-roadmap criar templates LearningSystemTemplate e NotesViewTemplate
```

**O que falta:**
1. LearningSystemTemplate.jsx (30-40 min)
2. NotesViewTemplate.jsx (20-30 min)
3. Validação e documentação (15 min)

**Total restante:** ~1h15 para finalizar US-071

---

## 📂 Arquivos Criados

```
docs/
└── TEMPLATE-CURSO-PADRAO.md           ✅ (600+ linhas)

templates/
├── learningDataTemplate.js             ✅ (300+ linhas)
├── LearningSystemTemplate.jsx          ⏳ PENDENTE
└── NotesViewTemplate.jsx               ⏳ PENDENTE
```

---

## 📊 Progresso

- Critérios de Aceite: 60% (3/5)
- Estimativa total: 3h
- Tempo gasto: ~1h45
- Tempo restante: ~1h15

---

## 🚀 Após Completar US-071

**Próximo na fila:**
- **US-072:** Sistema Linux Completo (21 pontos, 5-6h)
  - Usar templates criados nesta US
  - Primeiro sistema seguindo template oficial
  - Validação completa de conformidade

**Comando sugerido:**
```bash
/usuario:usuario-continuar-roadmap implementar US-072
```

---

**Status:** US-071 75% completa, pronta para retomada
**Responsável:** João Pelegrino (AFK)
**Retomada:** Quando disponível

---

**✅ Templates documentados e prontos para finalização.**
