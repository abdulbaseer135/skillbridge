import { useEffect, useState } from 'react'
import { getMe } from '../services/authService.js'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getMe()
        setUser(response.data.data)
      } catch (error) {
        setUser(null)
      }
      setLoading(false)
    }
    load()
  }, [])

  return { user, loading }
}

export default useAuth
