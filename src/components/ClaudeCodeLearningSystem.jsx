import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Target, 
  Calendar,
  Trophy,
  Users,
  Zap,
  GitBranch,
  Shield,
  FileText,
  Cpu,
  Award,
  ArrowLeft,
  Play,
  ArrowRight,
  Activity
} from 'lucide-react';
import { claudeCodeLearningData } from '../data/claudeCodeLearningData';

const ClaudeCodeLearningSystem = ({ onBack, onNavigateToNotes, onOpenFlashcards }) => {
  const [completedModules, setCompletedModules] = useState(() => {
    const saved = localStorage.getItem('claudecode-completed-modules');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('claudecode-learning-notes') || '';
  });

  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Salvar progresso
  useEffect(() => {
    localStorage.setItem('claudecode-completed-modules', JSON.stringify([...completedModules]));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('claudecode-learning-notes', notes);
  }, [notes]);

  // Função para alternar conclusão de módulo
  const toggleModuleCompletion = (moduleId) => {
    const newCompleted = new Set(completedModules);
    if (newCompleted.has(moduleId)) {
      newCompleted.delete(moduleId);
    } else {
      newCompleted.add(moduleId);
    }
    setCompletedModules(newCompleted);
  };

  // Calcular estatísticas
  const totalModules = claudeCodeLearningData.phases.reduce((acc, phase) => acc + phase.modules.length, 0);
  const completedCount = completedModules.size;
  const progressPercentage = Math.round((completedCount / totalModules) * 100);
  const totalHours = claudeCodeLearningData.phases.reduce((acc, phase) => 
    acc + phase.modules.reduce((phaseAcc, module) => phaseAcc + module.hours, 0), 0
  );

  // Calcular tempo decorrido desde o início
  const startDate = new Date(claudeCodeLearningData.startDate);
  const today = new Date();
  const weeksElapsed = Math.ceil((today - startDate) / (7 * 24 * 60 * 60 * 1000));

  // Ícones por fase
  const phaseIcons = {
    1: <BookOpen className="w-6 h-6" />,
    2: <Zap className="w-6 h-6" />,
    3: <Shield className="w-6 h-6" />,
    4: <Trophy className="w-6 h-6" />
  };

  const phaseColors = {
    1: 'from-green-500 to-emerald-600',
    2: 'from-blue-500 to-indigo-600', 
    3: 'from-purple-500 to-violet-600',
    4: 'from-orange-500 to-red-600'
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white/10 animate-pulse">
                <div className="w-5 h-5 bg-white/20 rounded"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/10 animate-pulse">
                  <div className="w-8 h-8 bg-white/20 rounded"></div>
                </div>
                <div>
                  <div className="w-32 h-6 bg-white/10 rounded animate-pulse mb-2"></div>
                  <div className="w-24 h-4 bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-full h-20 bg-white/10 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
            <div className="w-48 h-6 bg-white/10 rounded animate-pulse mb-4"></div>
            <div className="w-full h-3 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="space-y-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="p-6">
                  <div className="w-64 h-8 bg-white/10 rounded animate-pulse mb-4"></div>
                  <div className="w-full h-32 bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500">
                  🤖
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Claude Code</h1>
                  <p className="text-purple-200">Do Zero ao Especialista</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenFlashcards('claudecode', 'Claude Code')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                📚 Flashcards
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Progresso</p>
                <p className="text-3xl font-bold text-white">{progressPercentage}%</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Módulos</p>
                <p className="text-3xl font-bold text-white">{completedCount}/{totalModules}</p>
              </div>
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total de Horas</p>
                <p className="text-3xl font-bold text-white">{totalHours}h</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Semana Atual</p>
                <p className="text-3xl font-bold text-white">{weeksElapsed}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Progresso Geral</h3>
            <span className="text-purple-200">{completedCount} de {totalModules} módulos</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Fases do Aprendizado */}
        <div className="space-y-8">
          {claudeCodeLearningData.phases.map((phase) => (
            <div key={phase.phase} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              {/* Cabeçalho da Fase */}
              <div className={`bg-gradient-to-r ${phaseColors[phase.phase]} p-6 rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      {phaseIcons[phase.phase]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Fase {phase.phase}: {phase.name}
                      </h2>
                      <p className="text-white/80">{phase.description}</p>
                      <p className="text-white/60 text-sm mt-1">
                        {phase.theme} • Semanas {phase.weeks}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">Módulos</p>
                    <p className="text-2xl font-bold text-white">{phase.modules.length}</p>
                  </div>
                </div>
              </div>

              {/* Módulos da Fase */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.modules.map((module) => {
                    const isCompleted = completedModules.has(module.id);
                    const canAccess = module.week <= weeksElapsed + 1; // Permite acesso com 1 semana de antecedência

                    return (
                      <div
                        key={module.id}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          isCompleted
                            ? 'bg-green-500/20 border-green-400/50'
                            : canAccess
                            ? 'bg-white/5 border-white/20 hover:bg-white/10'
                            : 'bg-gray-500/10 border-gray-400/20 opacity-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm px-2 py-1 bg-purple-500/20 text-purple-200 rounded">
                                Semana {module.week}
                              </span>
                              <span className="text-sm px-2 py-1 bg-indigo-500/20 text-indigo-200 rounded">
                                {module.hours}h
                              </span>
                            </div>
                            <h3 className="font-semibold text-white mb-2">
                              {module.title}
                            </h3>
                            <p className="text-gray-300 text-sm mb-3">
                              {module.description}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => canAccess && toggleModuleCompletion(module.id)}
                            disabled={!canAccess}
                            className={`p-2 rounded-lg transition-colors ${
                              isCompleted
                                ? 'text-green-400'
                                : canAccess
                                ? 'text-gray-400 hover:text-green-400'
                                : 'text-gray-600 cursor-not-allowed'
                            }`}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Deliverables */}
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Entregas:</h4>
                          <ul className="space-y-1">
                            {module.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ações */}
                        <div className="flex gap-2">
                          {module.temNotas && (
                            <button
                              onClick={() => canAccess && onNavigateToNotes(`claudecode-${module.id}`)}
                              disabled={!canAccess}
                              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                canAccess
                                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <FileText className="w-4 h-4" />
                              Ver Notas
                            </button>
                          )}
                          
                          {!canAccess && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              Disponível na semana {module.week}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Notes */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Notas Rápidas
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote aqui seus insights, comandos úteis, dúvidas ou descobertas sobre Claude Code..."
            className="w-full h-32 bg-black/20 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Rodapé com informações */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mt-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-white mb-2">🎯 Objetivo Final</h4>
              <p className="text-gray-300 text-sm">
                Tornar-se especialista em Claude Code com certificação oficial
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">⚡ Metodologia</h4>
              <p className="text-gray-300 text-sm">
                Aprendizado prático com projetos reais e contribuições open source
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🏆 Certificação</h4>
              <p className="text-gray-300 text-sm">
                Claude Code Specialist ao completar todos os módulos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaudeCodeLearningSystem;