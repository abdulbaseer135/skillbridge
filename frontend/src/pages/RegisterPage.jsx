import RegisterForm from '../components/auth/RegisterForm.jsx'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/apiClient.js'

const RegisterPage = () => {
  const navigate = useNavigate()

  const handleRegister = async (data) => {
    await apiClient.post('/auth/register', data)
    navigate('/')
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Create account</h1>
      <RegisterForm onSubmit={handleRegister} />
    </main>
  )
}

export default RegisterPage
