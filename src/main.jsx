import React from 'react'
import ReactDOM from 'react-dom/client'
import SistemaEducacionalCompleto from './components/SistemaEducacionalCompleto.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './utils/debugLogger.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary componentName="App Root">
      <SistemaEducacionalCompleto />
    </ErrorBoundary>
  </React.StrictMode>,
)