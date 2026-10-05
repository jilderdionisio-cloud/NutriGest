import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { isStaff } from '../utils/roles'

export default function StaffRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  return isStaff(user) ? children : <Navigate to="/dashboard" replace state={{ from: location.pathname }} />
}
