import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { loginUser } from '../../../api/authApi'
import { useAuth } from '../../../context/useAuth'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'
import '../../../styles/auth.css'
import { isStaff } from '../../../utils/roles'

const initialForm = {
  email: '',
  password: '',
}

const demoUser = {
  nombres: 'María',
  apellidos: 'Demo',
  correo: 'demo@nutrigest.local',
  token: 'nutrigest-development-demo',
  role: 'nutritionist',
}

function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const [formValues, setFormValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormValues(initialForm)

    const clearAutofillTimers = [0, 100, 500].map((delay) =>
      window.setTimeout(() => setFormValues(initialForm), delay),
    )

    return () => clearAutofillTimers.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
      general: '',
    }))
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formValues.email.trim()) {
      nextErrors.email = 'Ingresa tu correo electrónico.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido.'
    }

    if (!formValues.password.trim()) {
      nextErrors.password = 'Ingresa tu contraseña.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const payload = {
      email: formValues.email.trim(),
      password: formValues.password,
    }

    setIsSubmitting(true)

    try {
      const response = await loginUser(payload)
      const responseUser =
        response.usuario ||
        response.user ||
        response.data?.usuario ||
        response.data?.user ||
        response.data ||
        response
      const authenticatedUser = {
        ...responseUser,
        token:
          responseUser.token ||
          responseUser.accessToken ||
          response.token ||
          response.accessToken ||
          response.data?.token ||
          response.data?.accessToken,
      }
      if (!isStaff(authenticatedUser)) {
        setErrors((currentErrors) => ({ ...currentErrors, general: 'Esta cuenta no tiene acceso al sistema profesional.' }))
        return
      }
      login(authenticatedUser)
      navigate(searchParams.get('redirect') || '/dashboard')
    } catch (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        general:
          error.response?.data?.message ??
          'No se pudo iniciar sesión. Verifica tus credenciales.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoAccess = () => {
    login(demoUser)
    navigate(searchParams.get('redirect') || '/dashboard')
  }

  return (
    <AuthLayout
      panelLabel="Formulario de inicio de sesión"
      topAction={
        <>
          <span>¿No tienes cuenta?</span>
          <Link className="secondary-button" to="/registro">
            Regístrate
          </Link>
        </>
      }
    >
      <div className="auth-card">
        <div className="auth-heading">
          <h1 className="animate-element animate-delay-100">Iniciar sesión</h1>
          <p className="animate-element animate-delay-200">
            Ingresa para continuar con tus consultas y seguimiento nutricional.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div className="form-field animate-element animate-delay-300">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              autoComplete="email"
              className={errors.email ? 'has-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-field animate-element animate-delay-400">
            <div className="field-label-row">
              <label htmlFor="password">Contraseña</label>
              <Link className="forgot-link" to="/recuperar-contrasena">
                Olvidé mi contraseña
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              hasError={Boolean(errors.password)}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {errors.general && <p className="form-alert form-alert--error">{errors.general}</p>}

          <button
            type="submit"
            className="primary-button animate-element animate-delay-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
        {import.meta.env.DEV && (
          <button type="button" className="demo-access-button" onClick={handleDemoAccess}>
            Acceder al panel de demostración
          </button>
        )}
        <p className="auth-footer">© {new Date().getFullYear()} NutriGest. Todos los derechos reservados.</p>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
