import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { studyAreas } from '../data/studyAreas';
import { fasesBash, modulosBash, startDateBash } from '../data/bashLearningData';

/**
 * Hook para carregamento de cursos da API NocoDB
 *
 * US-071: Carregar cursos da API com fallback para dados estáticos
 *
 * Estratégia:
 * - Tenta carregar da API primeiro
 * - Fallback para studyAreas.js se API indisponível
 * - Cache em memória para evitar requisições repetidas
 * - Merge de dados API + dados estáticos (conteúdo dos módulos)
 *
 * @returns {Object} { courses, isLoading, error, reload }
 */
export function useCourses() {
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('loading');

  /**
   * Carrega cursos da API ou fallback
   */
  const loadCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Tentar API primeiro
      const apiCourses = await apiService.getCourses();

      if (apiCourses && apiCourses.length > 0) {
        // Mapear formato da API para formato esperado pelos componentes
        const coursesMap = {};
        for (const course of apiCourses) {
          coursesMap[course.id] = mapApiCourseToLocal(course);
        }

        setCourses(coursesMap);
        setDataSource('api');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.warn('[useCourses] API indisponível, usando fallback:', err.message);
      setError('api_unavailable');
    }

    // Fallback: dados estáticos
    setCourses(studyAreas);
    setDataSource('static');
    setIsLoading(false);
  }, []);

  /**
   * Mapeia curso da API para formato local
   */
  const mapApiCourseToLocal = (apiCourse) => {
    // Mesclar com dados estáticos se existirem (para flashcards, etc)
    const staticData = studyAreas[apiCourse.id] || {};

    return {
      id: apiCourse.id,
      name: apiCourse.name,
      icon: apiCourse.icon || staticData.icon || '📚',
      description: apiCourse.description || staticData.description || '',
      status: apiCourse.status || 'active',
      badge: apiCourse.badge || staticData.badge || null,
      modules: apiCourse.total_modules || staticData.modules || 0,
      hours: apiCourse.duration_hours || staticData.hours || 0,
      hasIntegratedApp: staticData.hasIntegratedApp || apiCourse.status === 'active',
      flashcards: staticData.flashcards || {},
      // Preservar outras propriedades estáticas
      ...staticData,
      // API tem prioridade
      name: apiCourse.name,
      status: apiCourse.status,
    };
  };

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return {
    courses,
    isLoading,
    error,
    dataSource,
    reload: loadCourses,
  };
}

/**
 * Hook para carregamento de módulos e fases de um curso
 *
 * @param {string} courseId - ID do curso
 * @returns {Object} { modules, phases, isLoading, error }
 */
export function useCourseContent(courseId) {
  const [modules, setModules] = useState(null);
  const [phases, setPhases] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('loading');

  const loadContent = useCallback(async () => {
    if (!courseId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Tentar API primeiro (paralelo)
      const [apiModules, apiPhases] = await Promise.all([
        apiService.getCourseModules(courseId),
        apiService.getCoursePhases(courseId),
      ]);

      if (apiModules?.length > 0 || apiPhases?.length > 0) {
        // Mapear para formato esperado
        const mappedModules = mapApiModulesToLocal(apiModules, apiPhases, courseId);
        const mappedPhases = mapApiPhasesToLocal(apiPhases);

        setModules(mappedModules);
        setPhases(mappedPhases);
        setDataSource('api');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.warn('[useCourseContent] API indisponível, usando fallback:', err.message);
      setError('api_unavailable');
    }

    // Fallback: dados estáticos
    const staticContent = getStaticCourseContent(courseId);
    setModules(staticContent.modulos);
    setPhases(staticContent.fases);
    setDataSource('static');
    setIsLoading(false);
  }, [courseId]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    modules,
    phases,
    isLoading,
    error,
    dataSource,
    reload: loadContent,
  };
}

/**
 * Mapeia módulos da API para formato local
 */
function mapApiModulesToLocal(apiModules, apiPhases, courseId) {
  if (!apiModules || apiModules.length === 0) {
    return [];
  }

  // Criar mapa de fases
  const phasesMap = {};
  for (const phase of apiPhases || []) {
    phasesMap[phase.id] = phase;
  }

  // Mapear módulos
  return apiModules.map((mod, index) => ({
    id: mod.id,
    titulo: mod.name,
    semana: mod.week || index + 1,
    duracao: mod.duration || '2h',
    entregavel: mod.deliverable || '',
    temCaderno: mod.has_notes || false,
    fase: mod.phase_id || null,
    // Dados adicionais da API
    courseId: mod.course_id,
    orderIndex: mod.order_index || index,
  }));
}

/**
 * Mapeia fases da API para formato local
 */
function mapApiPhasesToLocal(apiPhases) {
  if (!apiPhases || apiPhases.length === 0) {
    return [];
  }

  return apiPhases.map((phase, index) => ({
    id: phase.id,
    titulo: phase.name,
    semanas: phase.weeks || '',
    cor: phase.color || 'gray-500',
    corClara: phase.light_color || 'gray-100',
    icone: phase.icon || '📚',
    descricao: phase.description || '',
    orderIndex: phase.order_index || index,
  }));
}

/**
 * Retorna dados estáticos de um curso (fallback)
 */
function getStaticCourseContent(courseId) {
  switch (courseId) {
    case 'bash':
      return {
        fases: fasesBash,
        modulos: modulosBash,
        startDate: startDateBash,
      };
    // Adicionar outros cursos conforme necessário
    default:
      return {
        fases: [],
        modulos: [],
        startDate: null,
      };
  }
}

export default useCourses;
