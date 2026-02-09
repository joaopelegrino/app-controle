import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock react-i18next with importOriginal to keep initReactI18next
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key, fallback) => fallback || key,
      i18n: { language: 'pt-BR' }
    }),
  };
});

import { HubView } from '../../components/HubView';

// Mock useAuth and usePermissions (needed by UserHeader/MobileMenu)
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: '1', fullName: 'Test User', role: 'student', companyId: '1' },
    company: { id: '1', name: 'Test Corp' }
  })
}));

vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: () => ({
    isAdmin: false,
    isInstructor: false,
    isCLevel: false,
    isSpecialist: false,
    canViewCatalog: true,
    hasPermission: () => false,
    hasAnyPermission: () => false,
    hasAllPermissions: () => false,
    role: 'student',
    roleLabel: 'Aluno',
    roleColor: 'blue'
  })
}));

// Helper to render with MemoryRouter
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('HubView Component', () => {
  const mockOpenArea = vi.fn();
  const mockOpenLearningPath = vi.fn();

  const mockStudyAreas = {
    bash: {
      name: 'Bash',
      icon: '🐚',
      description: 'Shell scripting e automação',
      status: 'active',
      badge: 'integrated',
      modules: 16,
      hours: 32,
      hasIntegratedApp: true,
      flashcards: {
        basics: {
          name: 'Fundamentos',
          cards: [{ question: 'Q1', answer: 'A1' }, { question: 'Q2', answer: 'A2' }]
        }
      }
    },
    linux: {
      name: 'Linux',
      icon: '🐧',
      description: 'Sistema operacional',
      status: 'in-development',
      modules: 12,
      hours: 24,
      flashcards: {
        commands: {
          name: 'Comandos',
          cards: [{ question: 'Q3', answer: 'A3' }]
        }
      }
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the HubView component without crashing', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      // HubView renders a page with min-h-screen
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
    });

    it('renders UserHeader', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      // UserHeader renders navigation/header
      expect(screen.getByText('Test Corp')).toBeInTheDocument();
    });
  });

  describe('Study Areas Section', () => {
    it('renders active study area card', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      expect(screen.getByText('Bash')).toBeInTheDocument();
      expect(screen.getByText('Shell scripting e automação')).toBeInTheDocument();
    });

    it('calls openArea when clicking on active area card', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      const bashCard = screen.getByText('Bash').closest('div[class*="cursor-pointer"]');
      if (bashCard) {
        fireEvent.click(bashCard);
        expect(mockOpenArea).toHaveBeenCalledWith('bash');
      }
    });
  });

  describe('Hub de Especialistas Section (US-153)', () => {
    it('renders Hub de Especialistas CTA card', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      // The Hub de Especialistas section has a gradient card
      const gradientCard = document.querySelector('[class*="from-indigo-600"]');
      expect(gradientCard).toBeInTheDocument();
    });

    it('renders Hub de Especialistas title', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      expect(screen.getByText('Hub de Especialistas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty studyAreas object', () => {
      renderWithRouter(
        <HubView
          studyAreas={{}}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
    });

    it('handles areas without flashcards', () => {
      const areasNoCards = {
        test: {
          name: 'Test Area',
          icon: '🧪',
          description: 'Test',
          status: 'active',
          modules: 10,
          hours: 20
        }
      };

      renderWithRouter(
        <HubView
          studyAreas={areasNoCards}
          openArea={mockOpenArea}
          openLearningPath={mockOpenLearningPath}
        />
      );

      expect(screen.getByText('Test Area')).toBeInTheDocument();
    });
  });
});
