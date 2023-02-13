import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import './App.css'
import { useAuth } from './context/auth-context'
import AuthenticateApp from './screens/authenticatedApp/authenticatedApp'
import { UnauthenticatedApp } from './screens/unauthenticatedApp'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>{user ? <AuthenticateApp /> : <UnauthenticatedApp />}</Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
