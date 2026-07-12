import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient.js'
import ConversationList from '../components/chat/ConversationList.jsx'
import ChatWindow from '../components/chat/ChatWindow.jsx'
import { io } from 'socket.io-client'
import Loader from '../components/common/Loader.jsx'

const MessagesPage = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setup = async () => {
      const response = await apiClient.get('/conversations')
      setConversations(response.data.data)
      setLoading(false)

      const socketClient = io(import.meta.env.VITE_SOCKET_URL, {
        withCredentials: true,
      })
      socketClient.on('receive_message', (message) => {
        setMessages((prev) => [...prev, message])
      })
      setSocket(socketClient)
    }
    setup()
  }, [])

  useEffect(() => {
    if (!selectedConversation || !socket) return
    socket.emit('join_conversation', { conversationId: selectedConversation._id })
    const fetchMessages = async () => {
      const response = await apiClient.get(`/messages/${selectedConversation._id}/messages`)
      setMessages(response.data.data)
    }
    fetchMessages()
  }, [selectedConversation, socket])

  const handleSend = async (content) => {
    if (!selectedConversation) return
    socket.emit('send_message', { conversationId: selectedConversation._id, content })
  }

  if (loading) return <Loader />
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div>
          <h1 className="mb-4 text-2xl font-semibold text-slate-900">Messages</h1>
          <ConversationList conversations={conversations} onSelect={setSelectedConversation} />
        </div>
        <div className="min-h-[500px] rounded-3xl border border-slate-200 bg-slate-50 p-4">
          {selectedConversation ? (
            <ChatWindow messages={messages} onSend={handleSend} onTyping={() => {}} selectedConversation={selectedConversation} />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">Select a conversation to begin chatting.</div>
          )}
        </div>
      </div>
    </main>
  )
}

export default MessagesPage
