import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import SistemaEducacionalCompleto from './components/SistemaEducacionalCompleto.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './utils/debugLogger.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary componentName="App Root">
        <AuthProvider>
          <SistemaEducacionalCompleto />
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)