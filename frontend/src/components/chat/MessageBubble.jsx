const MessageBubble = ({ message }) => {
  const isSender = message.sender?.name === 'You' || false
  return (
    <div className={`mb-3 max-w-xl rounded-3xl px-4 py-3 ${isSender ? 'self-end bg-sky-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
      <div className="text-sm font-semibold">{message.sender?.name || 'User'}</div>
      <p className="mt-1 text-sm leading-6">{message.content}</p>
    </div>
  )
}

export default MessageBubble
