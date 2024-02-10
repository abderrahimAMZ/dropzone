

const FormLabel = ({ children, className = '', htmlFor }) => {
  return (
    <label className={`block text-sm font-bold mb-3 ${className}`} htmlFor={htmlFor}>
      { children }
    </label>
  )
}

export default FormLabel;