const Button = ({ children, type = 'button', className = '', ...props }) => {
  return (
    <button type={type} className={`rounded-full bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-500 ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
