import './App.css'
import { useAuth } from './context/auth-context'
import AuthenticateApp from './screens/authenticatedApp/authenticatedApp'
import { UnauthenticatedApp } from './screens/unauthenticatedApp'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticateApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
