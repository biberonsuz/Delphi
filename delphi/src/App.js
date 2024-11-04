import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingView from './views/LandingView'
import SignUpView from './views/SignUpView'
import LoginView from './views/LoginView'
import MainView from './views/MainView'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/app" element={<ProtectedRoute><MainView /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
