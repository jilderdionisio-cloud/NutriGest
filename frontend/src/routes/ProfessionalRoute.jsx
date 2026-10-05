import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { isStaff } from '../utils/roles'

export default function ProfessionalRoute({children}){const {user}=useAuth();const location=useLocation();if(!user)return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace/>;if(!isStaff(user))return <Navigate to="/" replace state={{accessDenied:true}}/>;return children}
