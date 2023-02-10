import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import './App.css'
import { useAuth } from './context/auth-context'
import AuthenticateApp from './screens/authenticatedApp/authenticatedApp'
import { UnauthenticatedApp } from './screens/unauthenticatedApp'
import { FullErrorPage } from './components/common/lib'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary>
        {user ? <AuthenticateApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
