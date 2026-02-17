import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, Circle, BookOpen, Code, Shield, Server, TrendingUp, ChevronLeft, ChevronRight, Target, Award, FileText, Eye, EyeOff, Copy, Lightbulb, AlertTriangle, Terminal, ArrowLeft, ExternalLink, FileJson, Folder, Settings, Zap, Home, X } from 'lucide-react';
import { studyAreas } from '../data/studyAreas';
import { caminhosPropostos } from '../data/caminhoExemploData';
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
import LoginView from './LoginView';
import PrivateRoute from './PrivateRoute';
import AdminDashboard from './AdminDashboard';
import ExecutiveDashboard from './ExecutiveDashboard';
import InstructorDashboard from './InstructorDashboard';
import UserDashboard from './UserDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import SpecialistDashboard from './hub/SpecialistDashboard';
import SpecialistProfile from './hub/SpecialistProfile';
import CourseCatalog from './hub/CourseCatalog';
import CourseReviews from './hub/CourseReviews';
import { useModuleProgress } from '../hooks/useModuleProgress';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';

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
  
  // C Learning States (US-001: Persistência de progresso)
  const [completedModules, setCompletedModules] = useModuleProgress('clang');
  const [selectedWeek, setSelectedWeek] = useState(1);

  // VSCode Learning States (US-001: Persistência de progresso)
  const [completedVSCodeModules, setCompletedVSCodeModules] = useModuleProgress('vscode');

  // Bash Learning States (US-001: Persistência de progresso)
  const [completedBashModules, setCompletedBashModules] = useModuleProgress('bash');

  // Claude Code Learning States (US-001: Persistência de progresso)
  const [completedClaudeCodeModules, setCompletedClaudeCodeModules] = useModuleProgress('claudecode');

  // Rust Learning States (US-001: Persistência de progresso)
  const [completedRustModules, setCompletedRustModules] = useModuleProgress('rust');
  
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

    if (!area) {
      console.warn(`[openArea] Área não encontrada: ${areaKey}`);
      return;
    }

    if (area.isLearningPath) {
      // Navigate to learning path view (modelo antigo - deprecated)
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

  // US-044: Abrir caminho proposto (novo modelo)
  const openLearningPath = (pathKey) => {
    const path = caminhosPropostos[pathKey];
    if (path) {
      navigate(`/trilha/${pathKey}`);
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
    // US-044: Usar novo modelo de caminhos propostos
    const pathData = caminhosPropostos[pathId] || studyAreas[pathId];

    return (
      <LearningPathView
        pathData={pathData}
        pathKey={pathId}
        onBack={() => navigate('/')}
        onAreaClick={openAreaFromLearningPath}
        onNavigateToCourse={(areaKey) => {
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
        {/* Login - Rota pública */}
        <Route path="/login" element={<LoginView />} />

        {/* Hub - Rota principal (protegida) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HubView
                studyAreas={studyAreas}
                openArea={openArea}
              />
            </PrivateRoute>
          }
        />

        {/* Trilhas de Aprendizado (protegida) */}
        <Route
          path="/trilha/:pathId"
          element={
            <PrivateRoute>
              <LearningPathRoute />
            </PrivateRoute>
          }
        />

        {/* Cursos Integrados (protegida) */}
        <Route
          path="/curso/:courseId"
          element={
            <PrivateRoute>
              <CourseRoute />
            </PrivateRoute>
          }
        />

        {/* Notas de Aula (protegida) */}
        <Route
          path="/curso/:courseId/aula/:moduleId"
          element={
            <PrivateRoute>
              <ModuleNotesRoute />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard (protegida - admin e c_level) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin', 'c_level']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Executive Dashboard (protegida - c_level apenas) */}
        <Route
          path="/admin/executive"
          element={
            <PrivateRoute roles={['c_level']}>
              <ExecutiveDashboard />
            </PrivateRoute>
          }
        />

        {/* Instructor Dashboard (protegida - instructor, admin, c_level) US-096 */}
        <Route
          path="/instructor"
          element={
            <PrivateRoute roles={['instructor', 'admin', 'c_level']}>
              <InstructorDashboard />
            </PrivateRoute>
          }
        />

        {/* User Dashboard (protegida - todos) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Hub de Especialistas - Catalogo (todos autenticados) US-152 */}
        <Route
          path="/hub/catalog"
          element={
            <PrivateRoute>
              <CourseCatalog />
            </PrivateRoute>
          }
        />

        {/* Hub de Especialistas - Reviews de Curso (todos autenticados) US-152 */}
        <Route
          path="/hub/course/:hubCourseId/reviews"
          element={
            <PrivateRoute>
              <CourseReviews />
            </PrivateRoute>
          }
        />

        {/* Specialist Dashboard (specialist, admin, c_level) US-152 */}
        <Route
          path="/specialist"
          element={
            <PrivateRoute roles={['specialist', 'admin', 'c_level']}>
              <SpecialistDashboard />
            </PrivateRoute>
          }
        />

        {/* Specialist Profile (todos autenticados) US-152 */}
        <Route
          path="/specialist/:specialistId"
          element={
            <PrivateRoute>
              <SpecialistProfile />
            </PrivateRoute>
          }
        />

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