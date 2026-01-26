import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getStorageKey } from '../config/platform';

/**
 * OnboardingContext - Gerenciamento do wizard de onboarding
 *
 * US-104: Onboarding wizard para novos usuários
 *
 * Responsabilidades:
 * - Detectar primeiro acesso do usuário
 * - Gerenciar estado do wizard (step atual, preferências)
 * - Persistir conclusão do onboarding no localStorage
 */

const ONBOARDING_STORAGE_KEY = getStorageKey('onboarding');

// Steps do wizard
export const ONBOARDING_STEPS = {
  WELCOME: 'welcome',
  OBJECTIVE: 'objective',
  TOUR: 'tour',
  COMPLETE: 'complete',
};

// Objetivos de aprendizado disponíveis
export const LEARNING_OBJECTIVES = [
  {
    id: 'backend',
    icon: '🖥️',
    title: 'Backend Developer',
    description: 'APIs, bancos de dados, arquitetura de sistemas',
    recommended: ['bash', 'docker', 'databases'],
  },
  {
    id: 'devops',
    icon: '⚙️',
    title: 'DevOps Engineer',
    description: 'CI/CD, infraestrutura, automação',
    recommended: ['bash', 'docker', 'kubernetes'],
  },
  {
    id: 'fullstack',
    icon: '🚀',
    title: 'Full Stack Developer',
    description: 'Frontend, backend e deploy completo',
    recommended: ['bash', 'react', 'nodejs'],
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data Engineer',
    description: 'Pipelines de dados, analytics, SQL',
    recommended: ['bash', 'python', 'databases'],
  },
];

// Contexto
const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  // Estado do onboarding
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true); // Default true para não mostrar
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(ONBOARDING_STEPS.WELCOME);
  const [preferences, setPreferences] = useState({
    objective: null,
    wantsTour: false,
    completedAt: null,
  });

  // Carregar estado do localStorage ao autenticar
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadOnboardingState(user.id);
    }
  }, [isAuthenticated, user?.id]);

  /**
   * Carrega estado do onboarding do localStorage
   */
  const loadOnboardingState = useCallback((userId) => {
    try {
      const stored = localStorage.getItem(`${ONBOARDING_STORAGE_KEY}_${userId}`);

      if (stored) {
        const data = JSON.parse(stored);
        setIsOnboardingComplete(data.completed || false);
        setPreferences(data.preferences || {});

        // Se não completou, mostrar o wizard
        if (!data.completed) {
          setShowOnboarding(true);
          setCurrentStep(ONBOARDING_STEPS.WELCOME);
        }
      } else {
        // Primeiro acesso - mostrar onboarding
        setIsOnboardingComplete(false);
        setShowOnboarding(true);
        setCurrentStep(ONBOARDING_STEPS.WELCOME);
      }
    } catch (error) {
      console.error('[Onboarding] Erro ao carregar estado:', error);
      // Em caso de erro, não mostrar onboarding
      setIsOnboardingComplete(true);
      setShowOnboarding(false);
    }
  }, []);

  /**
   * Salva estado do onboarding no localStorage
   */
  const saveOnboardingState = useCallback((completed, prefs) => {
    if (!user?.id) return;

    try {
      localStorage.setItem(
        `${ONBOARDING_STORAGE_KEY}_${user.id}`,
        JSON.stringify({
          completed,
          preferences: prefs,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error('[Onboarding] Erro ao salvar estado:', error);
    }
  }, [user?.id]);

  /**
   * Avança para o próximo step
   */
  const nextStep = useCallback(() => {
    const steps = Object.values(ONBOARDING_STEPS);
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep]);

  /**
   * Volta para o step anterior
   */
  const previousStep = useCallback(() => {
    const steps = Object.values(ONBOARDING_STEPS);
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  /**
   * Define o objetivo selecionado
   */
  const selectObjective = useCallback((objectiveId) => {
    setPreferences((prev) => ({
      ...prev,
      objective: objectiveId,
    }));
  }, []);

  /**
   * Define se quer fazer o tour
   */
  const setWantsTour = useCallback((wants) => {
    setPreferences((prev) => ({
      ...prev,
      wantsTour: wants,
    }));
  }, []);

  /**
   * Completa o onboarding
   */
  const completeOnboarding = useCallback(() => {
    const finalPrefs = {
      ...preferences,
      completedAt: new Date().toISOString(),
    };

    setPreferences(finalPrefs);
    setIsOnboardingComplete(true);
    setShowOnboarding(false);
    saveOnboardingState(true, finalPrefs);
  }, [preferences, saveOnboardingState]);

  /**
   * Pula o onboarding
   */
  const skipOnboarding = useCallback(() => {
    const skipPrefs = {
      objective: null,
      wantsTour: false,
      skipped: true,
      completedAt: new Date().toISOString(),
    };

    setPreferences(skipPrefs);
    setIsOnboardingComplete(true);
    setShowOnboarding(false);
    saveOnboardingState(true, skipPrefs);
  }, [saveOnboardingState]);

  /**
   * Reinicia o onboarding (para testes/demo)
   */
  const resetOnboarding = useCallback(() => {
    if (!user?.id) return;

    localStorage.removeItem(`${ONBOARDING_STORAGE_KEY}_${user.id}`);
    setIsOnboardingComplete(false);
    setShowOnboarding(true);
    setCurrentStep(ONBOARDING_STEPS.WELCOME);
    setPreferences({
      objective: null,
      wantsTour: false,
      completedAt: null,
    });
  }, [user?.id]);

  /**
   * Abre o onboarding manualmente
   */
  const openOnboarding = useCallback(() => {
    setShowOnboarding(true);
    setCurrentStep(ONBOARDING_STEPS.WELCOME);
  }, []);

  /**
   * Fecha o onboarding
   */
  const closeOnboarding = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  // Valor do contexto memoizado
  const value = useMemo(
    () => ({
      // Estado
      isOnboardingComplete,
      showOnboarding,
      currentStep,
      preferences,
      // Constantes
      steps: ONBOARDING_STEPS,
      objectives: LEARNING_OBJECTIVES,
      // Métodos de navegação
      nextStep,
      previousStep,
      setCurrentStep,
      // Métodos de preferências
      selectObjective,
      setWantsTour,
      // Métodos de controle
      completeOnboarding,
      skipOnboarding,
      resetOnboarding,
      openOnboarding,
      closeOnboarding,
    }),
    [
      isOnboardingComplete,
      showOnboarding,
      currentStep,
      preferences,
      nextStep,
      previousStep,
      selectObjective,
      setWantsTour,
      completeOnboarding,
      skipOnboarding,
      resetOnboarding,
      openOnboarding,
      closeOnboarding,
    ]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

/**
 * Hook para usar o contexto de onboarding
 */
export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding deve ser usado dentro de um OnboardingProvider');
  }

  return context;
}

export default OnboardingContext;
