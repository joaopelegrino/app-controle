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
    user: { id: 'specialist-1', fullName: 'Joao Silva', role: 'specialist', companyId: '99' },
    company: { id: '99', name: 'Hub de Especialistas' },
  }),
}));

vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: () => ({
    isSpecialist: true,
    isAdmin: false,
    isCLevel: false,
  }),
}));

vi.mock('../../services/apiService', () => ({
  apiService: {
    getSpecialistByUserId: vi.fn().mockResolvedValue({
      id: 'sp-1',
      user_id: 'specialist-1',
      specialist_name: 'Joao Silva',
      total_revenue: 4200,
      total_students: 156,
      rating_avg: 4.8,
      total_courses: 1,
      revenue_share_percent: 70,
    }),
    getHubCoursesBySpecialist: vi.fn().mockResolvedValue([
      {
        id: 'hc-1',
        course_id: 'bash',
        total_enrollments: 156,
        rating_avg: 4.8,
        status: 'published',
      },
    ]),
    getCourseReviews: vi.fn().mockResolvedValue([
      {
        id: 'r-1',
        rating: 5,
        comment: 'Excelente curso!',
        created_at: '2026-01-15T10:00:00Z',
      },
    ]),
  },
}));

import { SpecialistDashboard } from '../../components/hub/SpecialistDashboard';

describe('SpecialistDashboard (US-147)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDashboard = () => {
    return render(
      <MemoryRouter>
        <SpecialistDashboard />
      </MemoryRouter>
    );
  };

  it('renders loading state initially', () => {
    renderDashboard();
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders dashboard title after loading', async () => {
    renderDashboard();
    const title = await screen.findByText('specialist.title');
    expect(title).toBeInTheDocument();
  });

  it('renders stats cards after loading', async () => {
    renderDashboard();
    await screen.findByText('specialist.stats.revenue');
    expect(screen.getByText('specialist.stats.enrollments')).toBeInTheDocument();
    expect(screen.getByText('specialist.stats.avgRating')).toBeInTheDocument();
    expect(screen.getByText('specialist.stats.publishedCourses')).toBeInTheDocument();
  });

  it('renders courses table after loading', async () => {
    renderDashboard();
    await screen.findByText('specialist.myCourses');
    expect(screen.getByText('Curso')).toBeInTheDocument();
    expect(screen.getByText('Alunos')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders recent reviews section after loading', async () => {
    renderDashboard();
    await screen.findByText('specialist.recentReviews');
    expect(screen.getByText('Excelente curso!')).toBeInTheDocument();
  });

  it('renders back button', async () => {
    renderDashboard();
    await screen.findByText('specialist.title');
    const backButton = document.querySelector('button');
    expect(backButton).toBeInTheDocument();
  });
});
