import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

/**
 * Protege las rutas del dashboard del cliente. Antes, /dashboard/* no tenia
 * ninguna verificacion de sesion: un usuario no autenticado podia navegar
 * directamente a esas rutas y ver el layout vacio mientras las llamadas a la
 * API fallaban en silencio con 401. Este componente redirige a /login
 * conservando la ruta original para volver despues de iniciar sesion.
 */
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    const redirectTo = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectTo)}`} replace />
  }

  return children
}

export default ProtectedRoute
