import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { CalendarDays, ClipboardList, LogOut, UsersRound } from 'lucide-react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PatientDetail from './pages/PatientDetail'
import PatientList from './pages/PatientList'
import './styles.css'

function Layout({ children }) {
  const navigate = useNavigate()
  const logout = () => { localStorage.removeItem('gestnutri_token'); navigate('/login') }
  return <div className="app-shell"><aside className="sidebar"><NavLink className="brand" to="/patients"><span className="brand-mark">N</span><span>NutriGest<small>Atención nutricional</small></span></NavLink><nav aria-label="Menú principal"><NavLink to="/patients"><UsersRound size={18} />Pacientes</NavLink><NavLink to="/appointments"><CalendarDays size={18} />Citas</NavLink><NavLink to="/consultations"><ClipboardList size={18} />Consultas</NavLink></nav><button className="logout" type="button" onClick={logout}><LogOut size={18} />Cerrar sesión</button></aside><main className="workspace">{children}</main></div>
}
function Protected({ children }) { return localStorage.getItem('gestnutri_token') ? <Layout>{children}</Layout> : <Navigate to="/login" replace /> }
function Pending({ title, description }) { return <section className="content-panel empty-state"><div className="empty-icon"><CalendarDays size={26} /></div><h1>{title}</h1><p>{description}</p><p className="muted">La vista está preparada para conectarse cuando el backend exponga este módulo.</p></section> }
export default function App() { return <Routes><Route path="/" element={<HomePage />} /><Route path="/servicios" element={<HomePage />} /><Route path="/agenda" element={<HomePage booking />} /><Route path="/login" element={<LoginPage />} /><Route path="/patients" element={<Protected><PatientList /></Protected>} /><Route path="/patients/:id" element={<Protected><PatientDetail /></Protected>} /><Route path="/appointments" element={<Protected><Pending title="Agenda nutricional" description="Gestiona las citas de valoración, seguimiento y control nutricional." /></Protected>} /><Route path="/consultations" element={<Protected><Pending title="Consultas e historial" description="Aquí se centralizarán las notas de consulta y evolución de cada paciente." /></Protected>} /><Route path="*" element={<Navigate to="/" replace />} /></Routes> }
