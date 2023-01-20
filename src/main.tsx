import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { loadDevTools } from 'jira-dev-tool'

loadDevTools(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
