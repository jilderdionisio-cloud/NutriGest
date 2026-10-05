import { useState } from 'react'

function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = 'Ingresa tu contraseña',
  autoComplete = 'current-password',
  hasError = false,
}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`password-input ${hasError ? 'has-error' : ''}`}>
      <input
        id={id}
        name={name}
        type={isVisible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setIsVisible((currentValue) => !currentValue)}
        aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12 18.25 18.25 12 18.25 2.25 12 2.25 12Z" />
          <circle cx="12" cy="12" r="3.25" />
          {isVisible && <path className="password-toggle__slash" d="M4.5 19.5 19.5 4.5" />}
        </svg>
      </button>
    </div>
  )
}

export default PasswordInput
