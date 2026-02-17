/**
 * Áreas de Estudo - FluSisTip Onboarding
 *
 * 5 cursos de onboarding gerados por diagnóstico forense
 * do projeto FluSisTip (Healthcare LLM - 47.390 LOC).
 *
 * PADRÃO DE ÁREA DE ESTUDO:
 * - name: Nome do curso
 * - icon: Emoji representativo
 * - description: Descrição curta
 * - status: 'active' | 'in-development'
 * - badge: 'integrated' | 'new' | 'onboarding' | null
 * - modules: Número de módulos
 * - hours: Horas estimadas
 * - hasIntegratedApp: true se tem sistema integrado (LearningSystem)
 * - flashcards: Objeto com categorias de flashcards
 *
 * @see flusistipOnboardingData.js - Dados detalhados FluSisTip
 * @see flusistipFlashCards.js - Flash cards FluSisTip
 */

import { flashCardsFlusistipOnboarding } from './flusistipFlashCards';

/**
 * Converte flash cards FluSisTip (pergunta/resposta) para o formato
 * esperado pelo sistema (question/answer com categorias agrupadas).
 */
function buildFlusistipFlashcards(cursoId) {
  const cards = flashCardsFlusistipOnboarding.filter(c => c.cursoId === cursoId);
  const byCategory = {};
  cards.forEach(card => {
    const cat = card.categoria;
    if (!byCategory[cat]) {
      byCategory[cat] = { name: cat.charAt(0).toUpperCase() + cat.slice(1), cards: [] };
    }
    byCategory[cat].cards.push({
      question: card.pergunta,
      answer: card.resposta,
      details: `Fonte: ${card.fonte} | Dificuldade: ${card.dificuldade}`
    });
  });
  return byCategory;
}

export const studyAreas = {
  // ============================================
  // FLUSISTIP ONBOARDING - Diagnóstico Forense
  // 5 cursos gerados de análise de 47.390 LOC
  // @see database/seed-onboarding-flusistip.sql
  // ============================================

  'flusistip-fundamentos': {
    name: 'FluSisTip - Fundamentos e Ambiente',
    icon: '\u{1F527}',
    description: 'Setup completo: Clojure 1.12, Java 21, Datomic Local, Bun, mise. REPL-first workflow e validação L1-L4.',
    status: 'active',
    badge: 'onboarding',
    modules: 5,
    hours: 8,
    hasIntegratedApp: false,
    flashcards: buildFlusistipFlashcards('flusistip-fundamentos')
  },

  'flusistip-dominio': {
    name: 'FluSisTip - Domínio Healthcare e Multi-Tenant',
    icon: '\u{1F3E5}',
    description: 'Entidades DDD, Datomic schemas (12 EDN), multi-tenant isolation, RBAC 8 personas, compliance LGPD/CFM/CRP.',
    status: 'active',
    badge: 'onboarding',
    modules: 8,
    hours: 12,
    hasIntegratedApp: false,
    flashcards: buildFlusistipFlashcards('flusistip-dominio')
  },

  'flusistip-workflow': {
    name: 'FluSisTip - Workflow Engine e HITL',
    icon: '\u{2699}\u{FE0F}',
    description: 'State machine 7 estados, aprovação unânime, Decision Points (LGPD), HITL checkpoints, Kanban SLA monitoring.',
    status: 'active',
    badge: 'onboarding',
    modules: 9,
    hours: 15,
    hasIntegratedApp: false,
    flashcards: buildFlusistipFlashcards('flusistip-workflow')
  },

  'flusistip-llm': {
    name: 'FluSisTip - Integração LLM',
    icon: '\u{1F916}',
    description: 'Gemini/Claude via Vertex AI, provider fallback chain, placeholders {{var}}, sistemas A/B/C/D, cost tracking.',
    status: 'active',
    badge: 'onboarding',
    modules: 6,
    hours: 10,
    hasIntegratedApp: false,
    flashcards: buildFlusistipFlashcards('flusistip-llm')
  },

  'flusistip-frontend': {
    name: 'FluSisTip - Frontend ClojureScript/Re-frame',
    icon: '\u{1F3A8}',
    description: 'Reagent (React 18), Re-frame (events/subs/fx), Playground editor, Kanban board, HITL interface, routing RBAC.',
    status: 'active',
    badge: 'onboarding',
    modules: 7,
    hours: 12,
    hasIntegratedApp: false,
    flashcards: buildFlusistipFlashcards('flusistip-frontend')
  }
};
