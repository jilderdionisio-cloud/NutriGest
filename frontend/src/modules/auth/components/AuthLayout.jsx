import { Leaf, Salad } from 'lucide-react'
import { Link } from 'react-router-dom'
import nutritionImage from '../../../assets/images/nutrition-consultation.png'

function AuthLayout({
  topAction,
  children,
  panelLabel = 'Formulario de autenticación',
  variant = 'default',
  heroContent,
}) {
  const isDefaultVariant = variant === 'default'

  return (
    <main className={`auth-layout auth-layout--${variant}`}>
      <section
        className={`auth-hero ${isDefaultVariant ? 'animate-slide-right animate-delay-200' : ''}`}
        aria-label="NutriGest"
      >
        {heroContent ?? (
          <>
            <Link className="auth-brand" to="/">Nutri<span>Gest</span></Link>
            <div className="auth-hero__copy"><p className="auth-eyebrow"><Leaf size={15}/> Nutrición cercana</p><h2>Tu bienestar empieza con lo que haces cada día.</h2><p>Organiza tus consultas y acompaña tus hábitos con una guía clara y práctica.</p></div>
            <div className="auth-hero__visual"><img src={nutritionImage} alt="Alimentos frescos durante una consulta nutricional"/><span><Salad size={18}/> Alimentación con intención</span></div>
          </>
        )}
      </section>

      <section className="auth-panel" aria-label={panelLabel}>
        {topAction && <header className="auth-panel__top">{topAction}</header>}
        <div className="auth-form-shell">{children}</div>
      </section>
    </main>
  )
}

export default AuthLayout
