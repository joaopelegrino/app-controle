import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Clock, CheckCircle, TrendingUp,
  ArrowLeft, RefreshCw, FileText, Award,
  Play, ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/apiService';

/**
 * UserDashboard - Dashboard pessoal do aluno
 *
 * US-078: Conectar UserDashboard ao Backend
 *
 * Mostra:
 * - Progresso pessoal em cursos
 * - Módulos completados
 * - Próximos módulos a estudar
 * - Notas recentes
 */
export function UserDashboard() {
  const navigate = useNavigate();
  const { user, company } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [recentNotes, setRecentNotes] = useState([]);

  /**
   * Carrega dados do dashboard
   */
  const loadData = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      // Buscar cursos disponíveis
      const coursesData = await apiService.getCourses();
      setCourses(coursesData);

      // Buscar progresso em cada curso
      const progressData = {};
      for (const course of coursesData) {
        try {
          const { completedModules } = await apiService.getProgress(user.id, course.id);
          progressData[course.id] = {
            completed: completedModules.length,
            total: course.total_modules || 0,
            percentage: course.total_modules > 0
              ? Math.round((completedModules.length / course.total_modules) * 100)
              : 0,
          };
        } catch (e) {
          progressData[course.id] = { completed: 0, total: course.total_modules || 0, percentage: 0 };
        }
      }
      setProgress(progressData);

      // Buscar notas recentes (do primeiro curso ativo)
      if (coursesData.length > 0) {
        try {
          const notes = await apiService.getNotes(user.id, coursesData[0].id);
          if (notes.content) {
            setRecentNotes([{
              courseId: coursesData[0].id,
              courseName: coursesData[0].name,
              preview: notes.content.substring(0, 150) + '...',
              updatedAt: notes.updatedAt,
            }]);
          }
        } catch (e) {
          setRecentNotes([]);
        }
      }
    } catch (error) {
      console.error('[UserDashboard] Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.id]);

  // Calcular estatísticas gerais
  const totalCompleted = Object.values(progress).reduce((sum, p) => sum + p.completed, 0);
  const totalModules = Object.values(progress).reduce((sum, p) => sum + p.total, 0);
  const overallProgress = totalModules > 0 ? Math.round((totalCompleted / totalModules) * 100) : 0;

  /**
   * Card de curso em progresso
   */
  const CourseCard = ({ course }) => {
    const courseProgress = progress[course.id] || { completed: 0, total: 0, percentage: 0 };
    const isActive = course.status === 'active';

    return (
      <div
        onClick={() => isActive && navigate(`/curso/${course.id}`)}
        className={`bg-white rounded-lg shadow-md p-6 ${
          isActive ? 'cursor-pointer hover:shadow-lg transition' : 'opacity-60'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{course.icon || '📚'}</span>
            <div>
              <h3 className="font-semibold text-gray-800">{course.name}</h3>
              <p className="text-sm text-gray-500">
                {course.duration_hours || 0}h de conteúdo
              </p>
            </div>
          </div>
          {isActive ? (
            <Play className="w-5 h-5 text-blue-500" />
          ) : (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
              Em breve
            </span>
          )}
        </div>

        {/* Barra de progresso */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progresso</span>
            <span className="font-medium text-gray-800">{courseProgress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                courseProgress.percentage === 100
                  ? 'bg-green-500'
                  : courseProgress.percentage > 0
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
              style={{ width: `${courseProgress.percentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{courseProgress.completed} de {courseProgress.total} módulos</span>
          {isActive && courseProgress.percentage < 100 && (
            <span className="text-blue-600 flex items-center">
              Continuar <ChevronRight className="w-4 h-4" />
            </span>
          )}
          {courseProgress.percentage === 100 && (
            <span className="text-green-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" /> Concluído
            </span>
          )}
        </div>
      </div>
    );
  };

  /**
   * Stat card pequeno
   */
  const StatMini = ({ icon: Icon, value, label, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <div className={`p-2 bg-${color}-100 rounded-lg mr-3`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando seu progresso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-white/20 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Meu Progresso</h1>
                <p className="text-blue-100 text-sm">
                  Olá, {user?.fullName?.split(' ')[0] || 'Aluno'}!
                </p>
              </div>
            </div>
            <button
              onClick={loadData}
              className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatMini
            icon={CheckCircle}
            value={totalCompleted}
            label="Módulos Concluídos"
            color="green"
          />
          <StatMini
            icon={TrendingUp}
            value={`${overallProgress}%`}
            label="Progresso Geral"
            color="blue"
          />
          <StatMini
            icon={BookOpen}
            value={courses.filter(c => c.status === 'active').length}
            label="Cursos Disponíveis"
            color="purple"
          />
          <StatMini
            icon={Clock}
            value={`${totalCompleted * 2}h`}
            label="Tempo de Estudo"
            color="orange"
          />
        </div>

        {/* Cursos em Andamento */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Meus Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Notas Recentes */}
        {recentNotes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Notas Recentes</h2>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentNotes.map((note, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/curso/${note.courseId}`)}
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">{note.courseName}</span>
                    {note.updatedAt && (
                      <span className="text-xs text-gray-500">
                        {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{note.preview}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conquistas Placeholder */}
        <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <Award className="w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold">Continue Aprendendo!</h3>
              <p className="text-yellow-100">
                Complete mais {totalModules - totalCompleted} módulos para terminar todos os cursos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
