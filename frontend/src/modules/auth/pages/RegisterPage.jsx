import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../../api/authApi'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'
import logo from '../../../assets/brand-mark.svg'
import '../../../styles/auth.css'

const emptyForm = { nombres: '', apellidos: '', email: '', password: '', confirmPassword: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function RegisterPage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '', general: '' }))
  }

  const validateForm = () => {
    const nextErrors = {}
    ;[
      ['nombres', 'Ingresa tus nombres.'],
      ['apellidos', 'Ingresa tus apellidos.'],
      ['email', 'Ingresa tu correo electrónico.'],
      ['password', 'Crea una contraseña.'],
      ['confirmPassword', 'Confirma tu contraseña.'],
    ].forEach(([field, message]) => {
      if (!formValues[field].trim()) nextErrors[field] = message
    })
    if (formValues.email.trim() && !emailPattern.test(formValues.email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido.'
    }
    if (formValues.password && formValues.password.length < 8) {
      nextErrors.password = 'La contraseña debe tener mínimo 8 caracteres.'
    }
    if (formValues.confirmPassword && formValues.password && formValues.confirmPassword !== formValues.password) {
      nextErrors.confirmPassword = 'Las contraseñas no coinciden.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      await registerUser({
        nombres: formValues.nombres.trim(),
        apellidos: formValues.apellidos.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      })
      navigate('/login')
    } catch (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        general: error.response?.data?.message ?? 'No se pudo completar el registro. Verifica los datos e inténtalo nuevamente.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      variant="register-form"
      panelLabel="Formulario de registro"
      topAction={<><span>¿Ya tienes cuenta?</span><Link className="secondary-button" to="/login">Inicia sesión</Link></>}
      heroContent={<><div className="register-form-hero__brand animate-slide-right animate-delay-100"><img className="brand-logo brand-logo--on-dark" src={logo} alt="NutriGest" /></div><div className="register-form-hero__content animate-slide-right animate-delay-200"><div className="register-form-hero__photo animate-element animate-delay-300" aria-hidden="true"/><div className="register-form-hero__copy"><h1>Crea una cuenta pública</h1><p>El registro no concede acceso al dashboard profesional ni a expedientes de pacientes.</p></div></div><footer className="register-form-hero__footer animate-element animate-delay-700"><span>NutriGest</span><span>•</span><span>Cuenta pública</span></footer></>}
    >
      <div className="register-form-card">
        <div className="register-form-card__top animate-element animate-delay-100"><Link className="back-link" to="/login">Atrás</Link></div>
        <div className="auth-heading auth-heading--compact"><h1 className="animate-element animate-delay-100">Crea tu cuenta</h1><span className="animate-element animate-delay-200">El destino y las funciones de la cuenta pública están pendientes de definición. No habilita acceso clínico.</span></div>
        <form className="auth-form auth-form--dense register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid animate-element animate-delay-300">
            <FormField id="nombres" label="Nombres" value={formValues.nombres} onChange={handleChange} placeholder="Ingresa tus nombres" autoComplete="given-name" error={errors.nombres} />
            <FormField id="apellidos" label="Apellidos" value={formValues.apellidos} onChange={handleChange} placeholder="Ingresa tus apellidos" autoComplete="family-name" error={errors.apellidos} />
          </div>
          <div className="form-field animate-element animate-delay-400"><label htmlFor="email">Correo electrónico</label><input id="email" name="email" type="email" value={formValues.email} onChange={handleChange} placeholder="ejemplo@correo.com" autoComplete="email" className={errors.email ? 'has-error' : ''} />{errors.email && <span className="field-error">{errors.email}</span>}</div>
          <div className="form-grid animate-element animate-delay-500">
            <PasswordField id="password" label="Crea una contraseña" value={formValues.password} onChange={handleChange} placeholder="Mínimo 8 caracteres" error={errors.password} />
            <PasswordField id="confirmPassword" label="Confirma tu contraseña" value={formValues.confirmPassword} onChange={handleChange} placeholder="Repite tu contraseña" error={errors.confirmPassword} />
          </div>
          {errors.general && <p className="form-alert form-alert--error">{errors.general}</p>}
          <button type="submit" className="primary-button animate-element animate-delay-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Crear cuenta'}</button>
        </form>
      </div>
    </AuthLayout>
  )
}

function FormField({ id, label, value, onChange, placeholder, autoComplete, error }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label><input id={id} name={id} type="text" value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} className={error ? 'has-error' : ''} />{error && <span className="field-error">{error}</span>}</div>
}

function PasswordField({ id, label, value, onChange, placeholder, error }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label><PasswordInput id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} autoComplete="new-password" hasError={Boolean(error)} />{error && <span className="field-error">{error}</span>}</div>
}

export default RegisterPage
