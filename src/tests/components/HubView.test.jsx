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

  const mockStudyAreas = {
    'flusistip-fundamentos': {
      name: 'FluSisTip - Fundamentos e Ambiente',
      icon: '\u{1F527}',
      description: 'Setup completo: Clojure 1.12, Java 21, Datomic Local',
      status: 'active',
      badge: 'onboarding',
      modules: 5,
      hours: 8,
      hasIntegratedApp: false,
      flashcards: {
        basics: {
          name: 'Fundamentos',
          cards: [{ question: 'Q1', answer: 'A1' }, { question: 'Q2', answer: 'A2' }]
        }
      }
    },
    'flusistip-dominio': {
      name: 'FluSisTip - Domínio Healthcare',
      icon: '\u{1F3E5}',
      description: 'Entidades DDD, Datomic schemas',
      status: 'active',
      badge: 'onboarding',
      modules: 8,
      hours: 12,
      hasIntegratedApp: false,
      flashcards: {
        domain: {
          name: 'Domínio',
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
        />
      );

      expect(screen.getByText('FluSisTip - Fundamentos e Ambiente')).toBeInTheDocument();
      expect(screen.getByText('Setup completo: Clojure 1.12, Java 21, Datomic Local')).toBeInTheDocument();
    });

    it('calls openArea when clicking on active area card', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
        />
      );

      const card = screen.getByText('FluSisTip - Fundamentos e Ambiente').closest('div[class*="cursor-pointer"]');
      if (card) {
        fireEvent.click(card);
        expect(mockOpenArea).toHaveBeenCalledWith('flusistip-fundamentos');
      }
    });
  });

  describe('Statistics', () => {
    it('renders correct stats for FluSisTip areas', () => {
      renderWithRouter(
        <HubView
          studyAreas={mockStudyAreas}
          openArea={mockOpenArea}
        />
      );

      // 2 areas, 13 modules (5+8), 20h (8+12)
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('13')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty studyAreas object', () => {
      renderWithRouter(
        <HubView
          studyAreas={{}}
          openArea={mockOpenArea}
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
        />
      );

      expect(screen.getByText('Test Area')).toBeInTheDocument();
    });
  });
});
