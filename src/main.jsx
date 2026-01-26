import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { TenantProvider } from './contexts/TenantContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'
import { OnboardingProvider } from './contexts/OnboardingContext.jsx'
import SistemaEducacionalCompleto from './components/SistemaEducacionalCompleto.jsx'
import { ToastContainer } from './components/ToastContainer.jsx'
import { OnboardingWizard } from './components/OnboardingWizard.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './utils/debugLogger.js'
import './index.css'

// Migração de localStorage (Sprint 13 - White-Label)
import { migrateLocalStorage } from './utils/storageMigration'

// Executar migração de storage antes de qualquer coisa
const migrationResult = migrateLocalStorage()
if (migrationResult.migrated) {
  console.log(`[App] Storage migrado: ${migrationResult.count} chaves`)
}

// Inicialização i18n - deve ser importado antes dos componentes que usam traduções
import './i18n'

// Fallback simples para carregamento das traduções
const I18nLoadingFallback = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-lg">Carregando...</div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<I18nLoadingFallback />}>
      <BrowserRouter>
        <ErrorBoundary componentName="App Root">
          <AuthProvider>
            <TenantProvider>
              <OnboardingProvider>
                <LoadingProvider>
                  <ToastProvider>
                    <SistemaEducacionalCompleto />
                    <ToastContainer />
                    <OnboardingWizard />
                  </ToastProvider>
                </LoadingProvider>
              </OnboardingProvider>
            </TenantProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)