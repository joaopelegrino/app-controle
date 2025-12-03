import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorId = Date.now().toString();
    const errorData = {
      id: errorId,
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      props: this.props.componentName || 'Unknown Component'
    };

    // Log para console (visível no F12)
    console.group(`🚨 React Error [${errorId}]`);
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Timestamp:', errorData.timestamp);
    console.error('Component:', errorData.props);
    console.groupEnd();

    // Salvar erro em localStorage para acesso via Claude Code
    const existingErrors = JSON.parse(localStorage.getItem('app-debugging-errors') || '[]');
    existingErrors.push(errorData);
    localStorage.setItem('app-debugging-errors', JSON.stringify(existingErrors));

    // Salvar também em arquivo de log (se possível)
    this.saveErrorToFile(errorData);

    this.setState({
      error,
      errorInfo,
      errorId: errorId
    });
  }

  saveErrorToFile = async (errorData) => {
    try {
      // Tentar salvar via API se disponível
      const logEntry = `[${errorData.timestamp}] ERROR: ${errorData.message}\nStack: ${errorData.stack}\nComponent: ${errorData.props}\n---\n`;
      
      // Para desenvolvimento, mostrar no console estruturado
      console.log('📝 Error logged for Claude Code access:', {
        timestamp: errorData.timestamp,
        component: errorData.props,
        message: errorData.message,
        id: errorData.id
      });
    } catch (err) {
      console.warn('Could not save error to file:', err);
    }
  };

  clearError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Erro na Aplicação</h2>
                <p className="text-sm text-gray-600">ID: {this.state.errorId}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Mensagem:</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded text-sm font-mono">
                {this.state.error?.message}
              </p>
            </div>

            <details className="mb-4">
              <summary className="font-medium text-gray-900 cursor-pointer hover:text-gray-700">
                Ver Stack Trace (Para Debugging)
              </summary>
              <pre className="text-xs text-gray-600 bg-gray-50 p-3 rounded mt-2 overflow-auto max-h-40">
                {this.state.error?.stack}
              </pre>
            </details>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 mb-2">🔍 Para Debugging:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Erro salvo no localStorage (acessível via F12)</li>
                <li>• Console com log estruturado disponível</li>
                <li>• ID do erro: {this.state.errorId}</li>
                <li>• Timestamp: {new Date().toLocaleString()}</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={this.clearError}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Recarregar Página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;