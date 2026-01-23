import React from 'react'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
  </React.StrictMode>,
)