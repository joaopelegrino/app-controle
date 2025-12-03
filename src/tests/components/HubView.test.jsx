import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HubView } from '../../components/HubView';

describe('HubView Component', () => {
  const mockCalculateStats = vi.fn();
  const mockOpenArea = vi.fn();

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
    },
    rust: {
      name: 'Caminho Rust',
      icon: '🦀',
      description: 'Trilha completa Rust',
      status: 'active',
      isLearningPath: true,
      modules: 35,
      hours: 140,
      flashcards: {
        rustprogramming: {
          name: 'Rust Programming',
          icon: '🦀'
        },
        systemsrust: {
          name: 'Sistemas Rust',
          icon: '⚙️'
        },
        webrust: {
          name: 'Web Rust',
          icon: '🌐'
        },
        async_rust: {
          name: 'Async Rust',
          icon: '⚡'
        },
        wasm: {
          name: 'WebAssembly',
          icon: '🕸️'
        }
      }
    }
  };

  const mockStats = {
    totalAreas: 3,
    totalCards: 39,
    totalModules: 227,
    totalHours: 692
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCalculateStats.mockReturnValue(mockStats);
  });

  describe('Rendering', () => {
    it('renders main heading', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('🚀 Hub de Aprendizado')).toBeInTheDocument();
      expect(screen.getByText('Sistema Integrado de Educação em Tecnologia')).toBeInTheDocument();
    });

    it('calls calculateStats with studyAreas', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(mockCalculateStats).toHaveBeenCalledWith(mockStudyAreas);
    });
  });

  describe('Statistics Cards', () => {
    it('renders all 4 statistics cards correctly', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('3')).toBeInTheDocument(); // totalAreas
      expect(screen.getByText('Áreas')).toBeInTheDocument();

      expect(screen.getByText('39')).toBeInTheDocument(); // totalCards
      expect(screen.getByText('Flash Cards')).toBeInTheDocument();

      expect(screen.getByText('227')).toBeInTheDocument(); // totalModules
      expect(screen.getByText('Módulos')).toBeInTheDocument();

      expect(screen.getByText('692+')).toBeInTheDocument(); // totalHours
      expect(screen.getByText('Horas')).toBeInTheDocument();
    });

    it('displays statistics from calculateStats return', () => {
      const customStats = {
        totalAreas: 10,
        totalCards: 50,
        totalModules: 100,
        totalHours: 500
      };
      mockCalculateStats.mockReturnValue(customStats);

      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('500+')).toBeInTheDocument();
    });
  });

  describe('Learning Paths Section', () => {
    it('renders learning paths section when paths exist', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('🎯 Caminhos Propostos')).toBeInTheDocument();
      expect(screen.getByText('Trilhas estruturadas de aprendizado para desenvolvimento completo')).toBeInTheDocument();
    });

    it('renders learning path card with correct data', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('Caminho Rust')).toBeInTheDocument();
      expect(screen.getByText('Caminho de Aprendizado')).toBeInTheDocument();
      expect(screen.getByText('35 módulos')).toBeInTheDocument();
      expect(screen.getByText('140h total')).toBeInTheDocument();
    });

    it('renders first 4 areas in learning path preview', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('1. Rust Programming')).toBeInTheDocument();
      expect(screen.getByText('2. Sistemas Rust')).toBeInTheDocument();
      expect(screen.getByText('3. Web Rust')).toBeInTheDocument();
      expect(screen.getByText('4. Async Rust')).toBeInTheDocument();
    });

    it('shows additional areas count when more than 4', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      // 5 áreas no total, mostrando 4, então +1 adicional
      expect(screen.getByText('+1 áreas adicionais')).toBeInTheDocument();
    });

    it('does not render learning paths section when none exist', () => {
      const areasWithoutPaths = {
        bash: mockStudyAreas.bash
      };

      render(
        <HubView
          studyAreas={areasWithoutPaths}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.queryByText('🎯 Caminhos Propostos')).not.toBeInTheDocument();
    });
  });

  describe('Study Areas Section', () => {
    it('renders study areas heading', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('📚 Áreas de Estudo')).toBeInTheDocument();
    });

    it('renders active study area card correctly', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('Bash')).toBeInTheDocument();
      expect(screen.getByText('Shell scripting e automação')).toBeInTheDocument();
      expect(screen.getByText('16 módulos')).toBeInTheDocument();
      expect(screen.getByText('2 cards')).toBeInTheDocument(); // 2 flashcards na categoria basics
      expect(screen.getByText('32h')).toBeInTheDocument();
    });

    it('renders integrated badge for integrated areas', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('Integrado')).toBeInTheDocument();
    });

    it('does not render in-development areas in main section', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      const mainSection = screen.getByText('📚 Áreas de Estudo').closest('div').nextSibling;
      const linuxInMainSection = mainSection.textContent.includes('Linux');
      expect(linuxInMainSection).toBe(false);
    });
  });

  describe('In Development Section', () => {
    it('renders in-development section when areas exist', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('🚧 Em Desenvolvimento')).toBeInTheDocument();
      expect(screen.getByText('Novos cursos completos em breve')).toBeInTheDocument();
    });

    it('renders in-development area with disabled state', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      // Linux está em <h3> → <div flex> → <div container>
      const linuxH3 = screen.getByText('Linux');
      const flexDiv = linuxH3.closest('div'); // div com "flex items-center mb-4"
      const containerDiv = flexDiv.parentElement; // div com "cursor-not-allowed opacity-50"

      expect(containerDiv.className).toContain('cursor-not-allowed');
      expect(containerDiv.className).toContain('opacity-50');
    });

    it('does not render in-development section when no areas', () => {
      const areasWithoutInDev = {
        bash: mockStudyAreas.bash
      };

      render(
        <HubView
          studyAreas={areasWithoutInDev}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.queryByText('🚧 Em Desenvolvimento')).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls openArea when clicking on active area', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      const bashCard = screen.getByText('Bash').closest('div');
      fireEvent.click(bashCard);

      expect(mockOpenArea).toHaveBeenCalledWith('bash');
      expect(mockOpenArea).toHaveBeenCalledTimes(1);
    });

    it('calls openArea when clicking on learning path', () => {
      render(
        <HubView
          studyAreas={mockStudyAreas}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      const rustPathCard = screen.getByText('Caminho Rust').closest('div');
      fireEvent.click(rustPathCard);

      expect(mockOpenArea).toHaveBeenCalledWith('rust');
      expect(mockOpenArea).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty studyAreas object', () => {
      mockCalculateStats.mockReturnValue({
        totalAreas: 0,
        totalCards: 0,
        totalModules: 0,
        totalHours: 0
      });

      render(
        <HubView
          studyAreas={{}}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('🚀 Hub de Aprendizado')).toBeInTheDocument();
      const zeroValues = screen.getAllByText('0');
      expect(zeroValues.length).toBeGreaterThan(0); // Pelo menos 1 zero (totalAreas)
    });

    it('handles areas without flashcards', () => {
      const areasWithoutCards = {
        test: {
          name: 'Test Area',
          icon: '🧪',
          description: 'Test',
          status: 'active',
          modules: 10,
          hours: 20
          // sem flashcards
        }
      };

      render(
        <HubView
          studyAreas={areasWithoutCards}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('Test Area')).toBeInTheDocument();
      expect(screen.getByText('0 cards')).toBeInTheDocument(); // 0 porque não tem flashcards
    });

    it('calculates card count correctly across multiple categories', () => {
      const areaWithMultipleCategories = {
        test: {
          name: 'Multi Category',
          icon: '📚',
          description: 'Test',
          status: 'active',
          modules: 10,
          hours: 20,
          flashcards: {
            cat1: {
              name: 'Category 1',
              cards: [{ q: '1' }, { q: '2' }]
            },
            cat2: {
              name: 'Category 2',
              cards: [{ q: '3' }, { q: '4' }, { q: '5' }]
            }
          }
        }
      };

      render(
        <HubView
          studyAreas={areaWithMultipleCategories}
          calculateStats={mockCalculateStats}
          openArea={mockOpenArea}
        />
      );

      expect(screen.getByText('5 cards')).toBeInTheDocument(); // 2 + 3 = 5
    });
  });
});
