import React, { useState, useEffect } from 'react';
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

const SistemaEducacionalCompleto = () => {
  // Global States
  const [currentView, setCurrentView] = useState('hub');
  const [currentArea, setCurrentArea] = useState(null);
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
    setCurrentArea(areaKey);
    const area = studyAreas[areaKey];
    
    if (area.isLearningPath) {
      // Navigate to learning path view
      setCurrentView('learningPath');
    } else if (area.hasIntegratedApp) {
      setCurrentView('integrated');
      setCurrentSubView('calendar');
    } else {
      // Open flashcards directly
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
  
  const openFlashcardsFromNotes = () => {
    const area = studyAreas[currentArea];
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
  
  // Integrated App View (C or VSCode)
  const IntegratedAppView = () => {
    const area = studyAreas[currentArea];
    
    if (currentArea === 'clang') {
      return (
        <CLearningSystem 
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={setCurrentView}
          completedModules={completedModules}
          setCompletedModules={setCompletedModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          fasesC={fasesC}
          modulosC={modulosC}
          startDateC={startDateC}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={openFlashcardsFromNotes}
          CodeBlock={CodeBlock}
          showCode={showCode}
          toggleCodeVisibility={toggleCodeVisibility}
          copyToClipboard={copyToClipboard}
          copiedCode={copiedCode}
        />
      );
    } else if (currentArea === 'bash') {
      return (
        <BashLearningSystem 
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={setCurrentView}
          completedBashModules={completedBashModules}
          setCompletedBashModules={setCompletedBashModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          fasesBash={fasesBash}
          modulosBash={modulosBash}
          startDateBash={startDateBash}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={openFlashcardsFromNotes}
          CodeBlock={CodeBlock}
          showCode={showCode}
          toggleCodeVisibility={toggleCodeVisibility}
          copyToClipboard={copyToClipboard}
          copiedCode={copiedCode}
        />
      );
    } else if (currentArea === 'vscode') {
      return (
        <VSCodeLearningSystem 
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={setCurrentView}
          completedVSCodeModules={completedVSCodeModules}
          setCompletedVSCodeModules={setCompletedVSCodeModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          topicosVSCode={topicosVSCode}
          modulosVSCode={modulosVSCode}
          startDateVSCode={startDateVSCode}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={openFlashcardsFromNotes}
          CodeBlock={CodeBlock}
          showCode={showCode}
          toggleCodeVisibility={toggleCodeVisibility}
          copyToClipboard={copyToClipboard}
          copiedCode={copiedCode}
        />
      );
    } else if (currentArea === 'claudecode') {
      return (
        <ClaudeCodeLearningSystem 
          onBack={() => setCurrentView('hub')}
          onNavigateToNotes={(moduleId) => {
            setSelectedSection(moduleId);
            setCurrentView('notes');
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
    } else if (currentArea === 'rustprogramming') {
      return (
        <RustLearningSystem 
          currentSubView={currentSubView}
          setCurrentSubView={setCurrentSubView}
          setCurrentView={setCurrentView}
          completedModules={completedRustModules}
          setCompletedModules={setCompletedRustModules}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          fasesRust={fasesRust}
          modulosRust={modulosRust}
          startDateRust={startDateRust}
          getWeekDate={getWeekDate}
          formatDate={formatDate}
          openFlashcardsFromNotes={openFlashcardsFromNotes}
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
  
  // Main Render
  return (
    <div>
      {currentView === 'hub' && (
        <HubView 
          studyAreas={studyAreas}
          calculateStats={calculateStats}
          openArea={openArea}
        />
      )}
      {currentView === 'learningPath' && (
        <LearningPathView 
          pathData={studyAreas[currentArea]}
          pathKey={currentArea}
          onBack={() => setCurrentView('hub')}
          onAreaClick={openAreaFromLearningPath}
          onNavigateToIntegrated={(areaKey) => {
            setCurrentArea(areaKey);
            setCurrentView('integrated');
            setCurrentSubView('calendar');
          }}
        />
      )}
      {currentView === 'integrated' && <IntegratedAppView />}
      {currentView === 'notes' && selectedSection.startsWith('claudecode') && (
        <ClaudeCodeNotesView 
          moduleId={selectedSection}
          onBack={() => {
            setCurrentView('integrated');
            setSelectedSection('');
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
      )}
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