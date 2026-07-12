import LoginForm from '../components/auth/LoginForm.jsx'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/apiClient.js'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleLogin = async (data) => {
    await apiClient.post('/auth/login', data)
    navigate('/')
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Sign in</h1>
      <LoginForm onSubmit={handleLogin} />
    </main>
  )
}

export default LoginPage
