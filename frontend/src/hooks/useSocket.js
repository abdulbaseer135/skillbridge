import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const useSocket = (token) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!token) return
    const client = io(import.meta.env.VITE_SOCKET_URL, { auth: { token } })
    setSocket(client)

    return () => {
      client.disconnect()
    }
  }, [token])

  return socket
}

export default useSocket
