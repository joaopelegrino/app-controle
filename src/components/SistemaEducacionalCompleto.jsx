import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, Circle, BookOpen, Code, Shield, Server, TrendingUp, ChevronLeft, ChevronRight, Target, Award, FileText, Eye, EyeOff, Copy, Lightbulb, AlertTriangle, Terminal, ArrowLeft, ExternalLink, FileJson, Folder, Settings, Zap, Home, X } from 'lucide-react';
import { studyAreas } from '../data/studyAreas';
import { fasesC, modulosC, startDateC } from '../data/cLearningData';
import { topicosVSCode, modulosVSCode, startDateVSCode } from '../data/vscodeLearningData';
import { fasesBash, modulosBash, startDateBash } from '../data/bashLearningData';
import { fasesRust, modulosRust, startDateRust } from '../data/rustLearningData';
import { claudeCodeLearningData } from '../data/claudeCodeLearningData';
import { getWeekDate, formatDate, getCurrentWeek, calculateStats } from '../utils/helpers';
import { CodeBlock } from './CodeBlock';
import { HubView } from './HubView';
import { CLearningSystem } from './CLearningSystem';
import { VSCodeLearningSystem } from './VSCodeLearningSystem';
import { BashLearningSystem } from './BashLearningSystem';
import { RustLearningSystem } from './RustLearningSystem';
import ClaudeCodeLearningSystem from './ClaudeCodeLearningSystem';
import ClaudeCodeNotesView from './ClaudeCodeNotesView';
import { FlashcardModal } from './FlashcardModal';
import LearningPathView from './LearningPathView';
import NotFoundPage from '../pages/NotFoundPage';

const SistemaEducacionalCompleto = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Global States
  const [currentSubView, setCurrentSubView] = useState('calendar');
  const [selectedSection, setSelectedSection] = useState('');
  const [showCode, setShowCode] = useState({});
  const [copiedCode, setCopiedCode] = useState('');
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [currentCards, setCurrentCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // C Learning States
  const [completedModules, setCompletedModules] = useState(new Set());
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  // VSCode Learning States
  const [completedVSCodeModules, setCompletedVSCodeModules] = useState(new Set());
  
  // Bash Learning States
  const [completedBashModules, setCompletedBashModules] = useState(new Set());
  
  // Claude Code Learning States
  const [completedClaudeCodeModules, setCompletedClaudeCodeModules] = useState(new Set());
  
  // Rust Learning States
  const [completedRustModules, setCompletedRustModules] = useState(new Set());
  
  // Helper Functions
  const toggleCodeVisibility = (sectionId) => {
    setShowCode(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Erro ao copiar código:', err);
    }
  };
  
  const openArea = (areaKey) => {
    const area = studyAreas[areaKey];

    if (area.isLearningPath) {
      // Navigate to learning path view
      navigate(`/trilha/${areaKey}`);
    } else if (area.hasIntegratedApp) {
      // Navigate to integrated course view
      navigate(`/curso/${areaKey}`);
      setCurrentSubView('calendar');
    } else {
      // Open flashcards directly (não precisa navegar, modal abre no estado atual)
      const cards = [];
      Object.values(area.flashcards).forEach(category => {
        cards.push(...category.cards);
      });
      setCurrentCards(cards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setFlashcardModalOpen(true);
    }
  };
  
  const openFlashcardsFromNotes = (areaKey) => {
    const area = studyAreas[areaKey];
    const cards = [];
    Object.values(area.flashcards).forEach(category => {
      cards.push(...category.cards);
    });
    setCurrentCards(cards.sort(() => Math.random() - 0.5));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setFlashcardModalOpen(true);
  };

  const openAreaFromLearningPath = (areaKey, areaData) => {
    // Open flashcards for specific area within learning path
    setCurrentCards(areaData.cards.sort(() => Math.random() - 0.5));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setFlashcardModalOpen(true);
  };
  
  // Integrated App View (C or VSCode) - Receives areaKey from URL
  const IntegratedAppView = ({ areaKey }) => {
    const area = studyAreas[areaKey];

    if (areaKey === 'clang') {
      return (
        <CLearningSystem
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={() => navigate('/')}
          completedModules={completedModules}
          setCompletedModules={setCompletedModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          fasesC={fasesC}
          modulosC={modulosC}
          startDateC={startDateC}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={() => openFlashcardsFromNotes(areaKey)}
          CodeBlock={CodeBlock}
          showCode={showCode}
          toggleCodeVisibility={toggleCodeVisibility}
          copyToClipboard={copyToClipboard}
          copiedCode={copiedCode}
        />
      );
    } else if (areaKey === 'bash') {
      return (
        <BashLearningSystem
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={() => navigate('/')}
          completedBashModules={completedBashModules}
          setCompletedBashModules={setCompletedBashModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          fasesBash={fasesBash}
          modulosBash={modulosBash}
          startDateBash={startDateBash}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={() => openFlashcardsFromNotes(areaKey)}
          CodeBlock={CodeBlock}
          showCode={showCode}
          toggleCodeVisibility={toggleCodeVisibility}
          copyToClipboard={copyToClipboard}
          copiedCode={copiedCode}
        />
      );
    } else if (areaKey === 'vscode') {
      return (
        <VSCodeLearningSystem
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={() => navigate('/')}
          completedVSCodeModules={completedVSCodeModules}
          setCompletedVSCodeModules={setCompletedVSCodeModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          topicosVSCode={topicosVSCode}
          modulosVSCode={modulosVSCode}
          startDateVSCode={startDateVSCode}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={() => openFlashcardsFromNotes(areaKey)}
          CodeBlock={CodeBlock}
          showCode={showCode}
          toggleCodeVisibility={toggleCodeVisibility}
          copyToClipboard={copyToClipboard}
          copiedCode={copiedCode}
        />
      );
    } else if (areaKey === 'claudecode') {
      return (
        <ClaudeCodeLearningSystem
          onBack={() => navigate('/')}
          onNavigateToNotes={(moduleId) => {
            setSelectedSection(moduleId);
            navigate(`/curso/${areaKey}/aula/${moduleId}`);
          }}
          onOpenFlashcards={(area, title) => {
            const areaData = studyAreas[area];
            const cards = [];
            Object.values(areaData.flashcards).forEach(category => {
              cards.push(...category.cards);
            });
            setCurrentCards(cards.sort(() => Math.random() - 0.5));
            setCurrentCardIndex(0);
            setIsFlipped(false);
            setFlashcardModalOpen(true);
          }}
        />
      );
    } else if (areaKey === 'rustprogramming') {
      return (
        <RustLearningSystem
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={() => navigate('/')}
          completedModules={completedRustModules}
          setCompletedModules={setCompletedRustModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          fasesRust={fasesRust}
          modulosRust={modulosRust}
          startDateRust={startDateRust}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={() => openFlashcardsFromNotes(areaKey)}
          CodeBlock={CodeBlock}
          showCode={showCode}
          toggleCodeVisibility={toggleCodeVisibility}
          copyToClipboard={copyToClipboard}
          copiedCode={copiedCode}
        />
      );
    }
    
    return null;
  };
  
  // Route components that extract params
  const CourseRoute = () => {
    const { courseId } = useParams();
    return <IntegratedAppView areaKey={courseId} />;
  };

  const LearningPathRoute = () => {
    const { pathId } = useParams();
    return (
      <LearningPathView
        pathData={studyAreas[pathId]}
        pathKey={pathId}
        onBack={() => navigate('/')}
        onAreaClick={openAreaFromLearningPath}
        onNavigateToIntegrated={(areaKey) => {
          navigate(`/curso/${areaKey}`);
          setCurrentSubView('calendar');
        }}
      />
    );
  };

  const ModuleNotesRoute = () => {
    const { courseId, moduleId } = useParams();
    const [localSelectedSection, setLocalSelectedSection] = useState('course-intro'); // Fix: seção inicial

    // US-040: Renderizar NotesView correto baseado no courseId
    const renderNotesView = () => {
      switch (courseId) {
        case 'bash':
          return (
            <BashLearningSystem
              currentSubView="notes"
              setCurrentSubView={(view) => view === 'calendar' && navigate(`/curso/${courseId}`)}
              setCurrentView={() => navigate('/')}
              completedBashModules={completedBashModules}
              setCompletedBashModules={setCompletedBashModules}
              selectedSection={localSelectedSection} // Fix: usar estado local
              setSelectedSection={setLocalSelectedSection} // Fix: usar setState local
              fasesBash={fasesBash}
              modulosBash={modulosBash}
              startDateBash={startDateBash}
              getWeekDate={getWeekDate}
              formatDate={formatDate}
              openFlashcardsFromNotes={() => openFlashcardsFromNotes('bash')} // Fix: passar areaKey
              CodeBlock={CodeBlock}
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          );
        case 'clang':
          return (
            <CLearningSystem
              currentSubView="notes"
              setCurrentSubView={(view) => view === 'calendar' && navigate(`/curso/${courseId}`)}
              setCurrentView={() => navigate('/')}
              completedModules={completedModules}
              setCompletedModules={setCompletedModules}
              selectedSection={localSelectedSection} // Fix: usar estado local
              setSelectedSection={setLocalSelectedSection} // Fix: usar setState local
              fasesC={fasesC}
              modulosC={modulosC}
              startDateC={startDateC}
              getWeekDate={getWeekDate}
              formatDate={formatDate}
              openFlashcardsFromNotes={() => openFlashcardsFromNotes('clang')} // Fix: passar areaKey
              CodeBlock={CodeBlock}
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          );
        case 'rust':
          return (
            <RustLearningSystem
              currentSubView="notes"
              setCurrentSubView={(view) => view === 'calendar' && navigate(`/curso/${courseId}`)}
              setCurrentView={() => navigate('/')}
              completedModules={completedRustModules}
              setCompletedModules={setCompletedRustModules}
              selectedSection={localSelectedSection} // Fix: usar estado local
              setSelectedSection={setLocalSelectedSection} // Fix: usar setState local
              fasesRust={fasesRust}
              modulosRust={modulosRust}
              startDateRust={startDateRust}
              getWeekDate={getWeekDate}
              formatDate={formatDate}
              openFlashcardsFromNotes={() => openFlashcardsFromNotes('rust')} // Fix: passar areaKey
              CodeBlock={CodeBlock}
              showCode={showCode}
              toggleCodeVisibility={toggleCodeVisibility}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />
          );
        case 'claude-code':
          return (
            <ClaudeCodeNotesView
              moduleId={moduleId}
              onBack={() => navigate(`/curso/${courseId}`)}
              onOpenFlashcards={(area, title) => {
                const areaData = studyAreas[area];
                const cards = [];
                Object.values(areaData.flashcards).forEach(category => {
                  cards.push(...category.cards);
                });
                setCurrentCards(cards.sort(() => Math.random() - 0.5));
                setCurrentCardIndex(0);
                setIsFlipped(false);
                setFlashcardModalOpen(true);
              }}
            />
          );
        default:
          return <NotFoundPage />;
      }
    };

    return renderNotesView();
  };

  // Main Render
  return (
    <div>
      <Routes>
        {/* Hub - Rota principal */}
        <Route
          path="/"
          element={
            <HubView
              studyAreas={studyAreas}
              calculateStats={calculateStats}
              openArea={openArea}
            />
          }
        />

        {/* Trilhas de Aprendizado */}
        <Route path="/trilha/:pathId" element={<LearningPathRoute />} />

        {/* Cursos Integrados */}
        <Route path="/curso/:courseId" element={<CourseRoute />} />

        {/* Notas de Aula (para Claude Code) */}
        <Route path="/curso/:courseId/aula/:moduleId" element={<ModuleNotesRoute />} />

        {/* 404 - Página não encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Flashcard Modal - Global (aparece sobre qualquer rota) */}
      <FlashcardModal
        flashcardModalOpen={flashcardModalOpen}
        setFlashcardModalOpen={setFlashcardModalOpen}
        currentCards={currentCards}
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />
    </div>
  );
};

export default SistemaEducacionalCompleto;