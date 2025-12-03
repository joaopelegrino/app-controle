// Sistema de logging estruturado para debugging com Claude Code
class DebugLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 100;
    this.storageKey = 'app-debugging-logs';
    this.setupGlobalErrorHandlers();
    this.setupConsoleInterception();
  }

  // Interceptar erros globais
  setupGlobalErrorHandlers() {
    window.addEventListener('error', (event) => {
      this.logError('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        type: 'global-error'
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', {
        reason: event.reason,
        type: 'promise-rejection'
      });
    });

    // Interceptar erros de recursos (imagens, scripts, etc)
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.logError('Resource Error', {
          tagName: event.target.tagName,
          source: event.target.src || event.target.href,
          type: 'resource-error'
        });
      }
    }, true);
  }

  // Interceptar console.error para capturar erros de bibliotecas
  setupConsoleInterception() {
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      this.logConsoleOutput('error', args);
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      this.logConsoleOutput('warn', args);
      originalWarn.apply(console, args);
    };
  }

  logConsoleOutput(level, args) {
    const logEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: level,
      message: args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '),
      type: 'console-output',
      source: 'console'
    };

    this.addLog(logEntry);
  }

  logError(title, errorData) {
    const logEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      title: title,
      ...errorData,
      source: 'error-boundary',
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.addLog(logEntry);

    // Log estruturado para Claude Code acessar
    console.group(`🔍 Debug Log [${logEntry.id}]`);
    console.table({
      ID: logEntry.id,
      Timestamp: logEntry.timestamp,
      Title: title,
      Type: errorData.type || 'unknown'
    });
    console.log('Error Data:', errorData);
    console.groupEnd();
  }

  logInfo(message, data = {}) {
    const logEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: 'info',
      message: message,
      data: data,
      type: 'info',
      source: 'app'
    };

    this.addLog(logEntry);
  }

  addLog(logEntry) {
    this.logs.unshift(logEntry);
    
    // Manter apenas os últimos N logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Salvar no localStorage para acesso via Claude Code
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.logs));
    } catch (e) {
      console.warn('Could not save logs to localStorage:', e);
    }
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Métodos para acessar logs (útil para Claude Code)
  getAllLogs() {
    return this.logs;
  }

  getErrorLogs() {
    return this.logs.filter(log => 
      log.level === 'error' || log.type === 'global-error' || log.type === 'promise-rejection'
    );
  }

  getRecentLogs(minutes = 10) {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000).toISOString();
    return this.logs.filter(log => log.timestamp > cutoff);
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem(this.storageKey);
    console.log('🧹 Debug logs cleared');
  }

  exportLogs() {
    const exportData = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      logs: this.logs
    };

    // Criar arquivo para download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('📄 Debug logs exported');
  }
}

// Criar instância global
const debugLogger = new DebugLogger();

// Expor globalmente para acesso via console (com verificação)
if (typeof window !== 'undefined') {
  window.debugLogger = debugLogger;
  window.exportDebugLogs = () => debugLogger.exportLogs();
  window.clearDebugLogs = () => debugLogger.clearLogs();
  
  // Log de inicialização para confirmar carregamento
  console.log('🔧 Debug Logger initialized successfully');
  console.log('📋 Available commands: window.debugLogger, window.exportDebugLogs(), window.clearDebugLogs()');
}

// Funções de conveniência
export const logError = (title, errorData) => debugLogger.logError(title, errorData);
export const logInfo = (message, data) => debugLogger.logInfo(message, data);
export const getErrorLogs = () => debugLogger.getErrorLogs();
export const getAllLogs = () => debugLogger.getAllLogs();

export default debugLogger;