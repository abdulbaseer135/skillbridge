import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import useAuth from './hooks/useAuth.js'

function App() {
  const { user, loading } = useAuth()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar user={user} />
        <AppRoutes user={user} loading={loading} />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
