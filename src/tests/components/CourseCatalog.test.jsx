import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock dependencies
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key, fallback) => fallback || key,
      i18n: { language: 'pt-BR' },
    }),
  };
});

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: '1', fullName: 'Test User', role: 'student', companyId: '1' },
    company: { id: '1', name: 'Test Corp' },
  }),
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
    roleColor: 'blue',
  }),
}));

vi.mock('../../services/apiService', () => ({
  apiService: {
    getHubCatalog: vi.fn().mockResolvedValue([
      {
        hub_course_id: 'hc-1',
        course_id: 'bash',
        course_name: 'Bash Shell Scripting',
        course_description: 'Shell scripting e automacao',
        course_icon: '🐚',
        specialist_name: 'Joao Silva',
        price_monthly: 89.9,
        course_rating: 4.8,
        total_enrollments: 156,
        course_modules: 16,
        course_hours: 32,
      },
    ]),
  },
}));

import { CourseCatalog } from '../../components/hub/CourseCatalog';

describe('CourseCatalog (US-149)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderCatalog = () => {
    return render(
      <MemoryRouter>
        <CourseCatalog />
      </MemoryRouter>
    );
  };

  it('renders loading state initially', () => {
    renderCatalog();
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders catalog title after loading', async () => {
    renderCatalog();
    const title = await screen.findByText('hub.specialists.sectionTitle');
    expect(title).toBeInTheDocument();
  });

  it('renders search bar after loading', async () => {
    renderCatalog();
    await screen.findByText('hub.specialists.sectionTitle');
    const searchInput = screen.getByPlaceholderText('Buscar por curso, especialista...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders filters button', async () => {
    renderCatalog();
    await screen.findByText('hub.specialists.sectionTitle');
    expect(screen.getByText('Filtros')).toBeInTheDocument();
  });

  it('renders course cards after loading', async () => {
    renderCatalog();
    const courseName = await screen.findByText('Bash Shell Scripting');
    expect(courseName).toBeInTheDocument();
  });

  it('renders result count', async () => {
    renderCatalog();
    const count = await screen.findByText(/1 curso encontrado/);
    expect(count).toBeInTheDocument();
  });
});
