import { useEffect, useRef } from 'react'
import Button from '../common/Button.jsx'
import MessageBubble from './MessageBubble.jsx'

const ChatWindow = ({ messages, onSend, onTyping, selectedConversation }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [selectedConversation])

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = inputRef.current.value.trim()
    if (!content) return
    onSend(content)
    inputRef.current.value = ''
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex-1 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4">
        {messages.map((message) => (
          <MessageBubble key={message._id} message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3 rounded-3xl border border-slate-200 bg-white p-4">
        <input ref={inputRef} onChange={() => onTyping(true)} className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none" placeholder="Write a message" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

export default ChatWindow
