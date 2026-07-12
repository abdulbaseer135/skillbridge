const Modal = ({ title, open, onClose, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
