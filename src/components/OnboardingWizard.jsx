import React, { useState, useEffect } from 'react';
import {
  X, ArrowRight, ArrowLeft, Check, Sparkles,
  Target, BookOpen, Rocket, Map, ChevronRight
} from 'lucide-react';
import { useOnboarding, ONBOARDING_STEPS, LEARNING_OBJECTIVES } from '../contexts/OnboardingContext';
import { useAuth } from '../hooks/useAuth';

/**
 * OnboardingWizard - Wizard de onboarding para novos usuários
 *
 * US-104: Onboarding wizard
 *
 * Steps:
 * 1. Welcome - Boas-vindas ao usuário
 * 2. Objective - Seleção de objetivo de aprendizado
 * 3. Tour - Opção de tour guiado (opcional)
 * 4. Complete - Conclusão e próximos passos
 */
export function OnboardingWizard() {
  const { user, company } = useAuth();
  const {
    showOnboarding,
    currentStep,
    preferences,
    nextStep,
    previousStep,
    selectObjective,
    setWantsTour,
    completeOnboarding,
    skipOnboarding,
    closeOnboarding,
  } = useOnboarding();

  // Animação de entrada
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showOnboarding) {
      // Pequeno delay para animação de entrada
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [showOnboarding]);

  if (!showOnboarding) return null;

  // Determinar índice do step atual
  const steps = Object.values(ONBOARDING_STEPS);
  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  /**
   * Step 1: Welcome
   */
  const WelcomeStep = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Bem-vindo(a), {user?.fullName?.split(' ')[0]}!
        </h2>
        <p className="text-gray-600 text-lg">
          Estamos felizes em ter você na plataforma de treinamento da{' '}
          <span className="font-semibold text-blue-600">{company?.name}</span>.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">
          O que você vai encontrar aqui:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Cursos Interativos</p>
              <p className="text-sm text-gray-500">Aprenda no seu ritmo</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Trilhas Guiadas</p>
              <p className="text-sm text-gray-500">Caminhos recomendados</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Rocket className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Progresso Tracking</p>
              <p className="text-sm text-gray-500">Acompanhe sua evolução</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-sm">
        Vamos configurar sua experiência em menos de 1 minuto.
      </p>
    </div>
  );

  /**
   * Step 2: Objective Selection
   */
  const ObjectiveStep = () => (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Qual é seu objetivo?
        </h2>
        <p className="text-gray-600">
          Isso nos ajuda a recomendar o melhor caminho de aprendizado para você.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING_OBJECTIVES.map((obj) => (
          <button
            key={obj.id}
            onClick={() => selectObjective(obj.id)}
            className={`p-5 rounded-xl border-2 text-left transition-all ${
              preferences.objective === obj.id
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start">
              <span className="text-3xl mr-4">{obj.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{obj.title}</h3>
                  {preferences.objective === obj.id && (
                    <Check className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{obj.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-gray-400 text-sm mt-6">
        Você pode mudar isso depois nas configurações.
      </p>
    </div>
  );

  /**
   * Step 3: Tour Option
   */
  const TourStep = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Map className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Quer um tour guiado?
        </h2>
        <p className="text-gray-600">
          Podemos mostrar as principais funcionalidades da plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
        <button
          onClick={() => {
            setWantsTour(true);
            nextStep();
          }}
          className="p-6 rounded-xl border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 transition-all"
        >
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-semibold text-blue-700">Sim, me mostre!</h3>
          <p className="text-sm text-blue-600 mt-1">Tour rápido de 2 minutos</p>
        </button>

        <button
          onClick={() => {
            setWantsTour(false);
            nextStep();
          }}
          className="p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="font-semibold text-gray-700">Pular, quero explorar</h3>
          <p className="text-sm text-gray-500 mt-1">Descubro sozinho</p>
        </button>
      </div>
    </div>
  );

  /**
   * Step 4: Complete
   */
  const CompleteStep = () => {
    const selectedObj = LEARNING_OBJECTIVES.find(
      (o) => o.id === preferences.objective
    );

    return (
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tudo pronto!
          </h2>
          <p className="text-gray-600">
            Sua plataforma está configurada e pronta para uso.
          </p>
        </div>

        {selectedObj && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">{selectedObj.icon}</span>
              Recomendações para {selectedObj.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Baseado no seu objetivo, sugerimos começar com:
            </p>
            <div className="space-y-2">
              {selectedObj.recommended.slice(0, 3).map((rec, i) => (
                <div
                  key={rec}
                  className="flex items-center p-3 bg-white rounded-lg"
                >
                  <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-medium mr-3">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 capitalize">{rec}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Dica:</strong> Você pode acessar este wizard novamente pelo menu de configurações.
          </p>
        </div>
      </div>
    );
  };

  /**
   * Renderiza o step atual
   */
  const renderStep = () => {
    switch (currentStep) {
      case ONBOARDING_STEPS.WELCOME:
        return <WelcomeStep />;
      case ONBOARDING_STEPS.OBJECTIVE:
        return <ObjectiveStep />;
      case ONBOARDING_STEPS.TOUR:
        return <TourStep />;
      case ONBOARDING_STEPS.COMPLETE:
        return <CompleteStep />;
      default:
        return <WelcomeStep />;
    }
  };

  /**
   * Verifica se pode avançar
   */
  const canProceed = () => {
    if (currentStep === ONBOARDING_STEPS.OBJECTIVE) {
      return !!preferences.objective;
    }
    return true;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header com progresso */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-white">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-medium">Configuração Inicial</span>
            </div>
            <button
              onClick={skipOnboarding}
              className="text-white/70 hover:text-white transition-colors"
              title="Pular configuração"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-2 text-xs text-white/70">
            <span className={currentIndex >= 0 ? 'text-white' : ''}>Início</span>
            <span className={currentIndex >= 1 ? 'text-white' : ''}>Objetivo</span>
            <span className={currentIndex >= 2 ? 'text-white' : ''}>Tour</span>
            <span className={currentIndex >= 3 ? 'text-white' : ''}>Pronto</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">{renderStep()}</div>

        {/* Footer */}
        <div className="px-8 pb-6 flex items-center justify-between">
          {/* Back button */}
          {currentIndex > 0 && currentStep !== ONBOARDING_STEPS.COMPLETE ? (
            <button
              onClick={previousStep}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </button>
          ) : (
            <button
              onClick={skipOnboarding}
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              Pular configuração
            </button>
          )}

          {/* Next/Complete button */}
          {currentStep === ONBOARDING_STEPS.COMPLETE ? (
            <button
              onClick={completeOnboarding}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Começar a aprender!
            </button>
          ) : currentStep === ONBOARDING_STEPS.TOUR ? null : (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continuar
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OnboardingWizard;
