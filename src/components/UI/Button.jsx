const Button = ({ children, type, disabled, className }) => {
  return (
    <button className={className} disabled={disabled} type={type}>
      {children}
    </button>
  )
}

export default Button
