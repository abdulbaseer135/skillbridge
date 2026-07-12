const ConversationList = ({ conversations, onSelect }) => (
  <div className="space-y-3">
    {conversations.map((conversation) => (
      <button key={conversation._id} onClick={() => onSelect(conversation)} className="w-full rounded-3xl border border-slate-200 bg-white p-4 text-left transition hover:shadow-lg">
        <div className="font-semibold text-slate-900">Conversation</div>
        <div className="mt-2 text-sm text-slate-500">Participants: {conversation.participants.map((user) => user.name).join(', ')}</div>
      </button>
    ))}
  </div>
)

export default ConversationList
