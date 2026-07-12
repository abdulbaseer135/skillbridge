import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient.js'
import Loader from '../components/common/Loader.jsx'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await apiClient.get('/auth/me')
      setUser(response.data.data)
      setLoading(false)
    }
    fetchProfile()
  }, [])

  if (loading) return <Loader />

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
          <img src={user.avatar || '/favicon.svg'} alt="avatar" className="h-24 w-24 rounded-3xl object-cover" />
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{user.name}</h1>
            <p className="mt-2 text-slate-600">{user.bio || 'No bio yet'}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">City</p>
            <p className="mt-2 text-slate-900">{user.location.city || 'Unknown'}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Neighborhood</p>
            <p className="mt-2 text-slate-900">{user.location.neighborhood || 'Unknown'}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
