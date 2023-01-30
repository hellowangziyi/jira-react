import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { loadServer, DevTools } from 'jira-dev-tool'
import { AppProvider } from './context'

loadServer(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <AppProvider>
        <DevTools />
        <App />
      </AppProvider>
    </React.StrictMode>
  )
})
