import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Circle, BookOpen, Code, Shield, Server, TrendingUp, ChevronLeft, ChevronRight, Target, Award, FileText, Eye, EyeOff, Copy, Lightbulb, AlertTriangle, Terminal, ArrowLeft, ExternalLink, FileJson, Folder, Settings, Zap, Home, X } from 'lucide-react';
import { studyAreas } from '../data/studyAreas';
import { fasesC, modulosC, startDateC } from '../data/cLearningData';
import { topicosVSCode, modulosVSCode, startDateVSCode } from '../data/vscodeLearningData';
import { fasesBash, modulosBash, startDateBash } from '../data/bashLearningData';
import { getWeekDate, formatDate, getCurrentWeek, calculateStats } from '../utils/helpers';
import { CodeBlock } from './CodeBlock';
import { HubView } from './HubView';
import { CLearningSystem } from './CLearningSystem';
import { VSCodeLearningSystem } from './VSCodeLearningSystem';
import { BashLearningSystem } from './BashLearningSystem';
import { FlashcardModal } from './FlashcardModal';

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
    
    if (area.hasIntegratedApp) {
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
      {currentView === 'integrated' && <IntegratedAppView />}
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