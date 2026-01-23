import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileJson, Loader2, ChevronDown } from 'lucide-react';
import {
  exportToExcel,
  exportToJSON,
  generateFilename,
  formatUsersProgressReport,
  formatCompanyAnalyticsReport,
  formatCourseStatsReport,
} from '../utils/exportUtils';
import { apiService } from '../services/apiService';
import { useToast } from '../contexts/ToastContext';

/**
 * ExportButton - Botão de exportação de relatórios
 *
 * US-100: Exportar relatórios Excel
 *
 * @param {string} type - Tipo de relatório: 'users', 'analytics', 'courses', 'custom'
 * @param {string} companyId - ID da empresa (para users/analytics)
 * @param {array} customData - Dados customizados (quando type='custom')
 * @param {object} customOptions - Opções para exportação customizada
 * @param {string} label - Texto do botão (opcional)
 * @param {string} className - Classes CSS adicionais
 * @param {boolean} showDropdown - Mostrar dropdown com opções de formato
 * @param {boolean} disabled - Desabilitar botão
 */
export function ExportButton({
  type = 'users',
  companyId,
  customData = null,
  customOptions = {},
  label = 'Exportar',
  className = '',
  showDropdown = false,
  disabled = false,
}) {
  const toast = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Carrega dados e exporta
  const handleExport = async (format = 'excel') => {
    setIsExporting(true);
    setDropdownOpen(false);

    try {
      let data;
      let filename;
      let formattedReport;
      let reportName;

      switch (type) {
        case 'users':
          data = await apiService.getUsersDashboard(companyId);
          formattedReport = formatUsersProgressReport(data);
          filename = generateFilename('relatorio_usuarios');
          reportName = 'Relatório de Usuários';
          break;

        case 'analytics':
          const [analytics, users] = await Promise.all([
            apiService.getCompanyAnalytics(companyId),
            apiService.getUsersDashboard(companyId),
          ]);
          formattedReport = formatCompanyAnalyticsReport(analytics, users);
          filename = generateFilename('analytics_empresa');
          reportName = 'Analytics da Empresa';
          break;

        case 'courses':
          data = await apiService.getCourseStats();
          formattedReport = formatCourseStatsReport(data);
          filename = generateFilename('estatisticas_cursos');
          reportName = 'Estatísticas de Cursos';
          break;

        case 'custom':
          if (!customData) {
            throw new Error('customData é obrigatório para type="custom"');
          }
          formattedReport = {
            data: customData,
            columns: customOptions.columns || Object.keys(customData[0] || {}),
            headers: customOptions.headers || {},
          };
          filename = customOptions.filename || generateFilename('exportacao');
          reportName = 'Dados';
          break;

        default:
          throw new Error(`Tipo de relatório não suportado: ${type}`);
      }

      // Exportar no formato escolhido
      if (format === 'json') {
        exportToJSON(formattedReport.data, filename);
      } else {
        exportToExcel(formattedReport.data, filename, {
          columns: formattedReport.columns,
          headers: formattedReport.headers,
        });
      }

      toast.success(
        `${reportName} exportado com sucesso`,
        'Download Iniciado'
      );
    } catch (err) {
      console.error('[ExportButton] Erro na exportação:', err);
      toast.error(err.message || 'Erro ao exportar relatório');
    } finally {
      setIsExporting(false);
    }
  };

  // Versão simples (só Excel)
  if (!showDropdown) {
    return (
      <button
        onClick={() => handleExport('excel')}
        disabled={disabled || isExporting}
        className={`inline-flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
        title="Exportar para Excel (CSV)"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Exportando...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            {label}
          </>
        )}
      </button>
    );
  }

  // Versão com dropdown
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        disabled={disabled || isExporting}
        className={`inline-flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Exportando...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            {label}
            <ChevronDown className="w-4 h-4 ml-1" />
          </>
        )}
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setDropdownOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
              Excel (CSV)
            </button>
            <button
              onClick={() => handleExport('json')}
              className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-b-lg"
            >
              <FileJson className="w-4 h-4 mr-2 text-blue-600" />
              JSON
            </button>
          </div>
        </>
      )}

    </div>
  );
}

/**
 * ExportAllButton - Exporta múltiplos relatórios de uma vez
 */
export function ExportAllButton({ companyId, disabled = false }) {
  const toast = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportAll = async () => {
    setIsExporting(true);

    try {
      // Buscar todos os dados
      const [users, analytics, courseStats] = await Promise.all([
        apiService.getUsersDashboard(companyId),
        apiService.getCompanyAnalytics(companyId),
        apiService.getCourseStats(),
      ]);

      // Exportar cada relatório
      const usersReport = formatUsersProgressReport(users);
      exportToExcel(usersReport.data, generateFilename('usuarios'), {
        columns: usersReport.columns,
        headers: usersReport.headers,
      });

      // Pequeno delay entre downloads para evitar bloqueio do navegador
      await new Promise((r) => setTimeout(r, 500));

      const analyticsReport = formatCompanyAnalyticsReport(analytics, users);
      exportToExcel(analyticsReport.data, generateFilename('analytics'), {
        columns: analyticsReport.columns,
        headers: analyticsReport.headers,
      });

      await new Promise((r) => setTimeout(r, 500));

      const coursesReport = formatCourseStatsReport(courseStats);
      exportToExcel(coursesReport.data, generateFilename('cursos'), {
        columns: coursesReport.columns,
        headers: coursesReport.headers,
      });

      toast.success('3 relatórios exportados com sucesso', 'Exportação Completa');
    } catch (err) {
      console.error('[ExportAllButton] Erro:', err);
      toast.error('Erro ao exportar relatórios');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExportAll}
      disabled={disabled || isExporting}
      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Exportando todos...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Exportar Todos
        </>
      )}
    </button>
  );
}

export default ExportButton;
