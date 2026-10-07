import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { patientClient } from './api';
import DemoState from './components/DemoState';
import PatientList from './pages/PatientList';
import PatientDetail from './pages/PatientDetail';
import PatientForm from './pages/PatientForm';
export default function App() {
  const [session, setSession] = useState(null);
  const location = useLocation(); const content = useRef(null);
  useEffect(() => { content.current?.focus(); }, [location.pathname]);
  const protect = page => session ? page : <Navigate to="/login" replace />;
  return <><a className="skip-link" href="#content">Ir al contenido</a><header><NavLink className="brand" to="/patients">GestNutri</NavLink><nav aria-label="Principal">{session && <><NavLink to="/patients">Pacientes</NavLink><button className="secondary" onClick={() => setSession(null)}>Salir</button></>}</nav></header><div className="demo-banner">Demostración · Solo datos ficticios · Cambios temporales</div><main id="content" ref={content} tabIndex={-1}><Routes><Route path="/login" element={session ? <Navigate to="/patients" replace /> : <Login onLogin={setSession} />} /><Route path="/patients" element={protect(<PatientList />)} /><Route path="/patients/new" element={protect(<PatientForm />)} /><Route path="/patients/:id/edit" element={protect(<PatientForm />)} /><Route path="/patients/:id" element={protect(<PatientDetail />)} /><Route path="*" element={<Navigate to="/patients" replace />} /></Routes></main></>;
}
function Login({ onLogin }) {
  const [username, setUsername] = useState(''); const [password, setPassword] = useState('');
  const [scenario, setScenario] = useState('normal'); const [loading, setLoading] = useState(false); const [error, setError] = useState(''); const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault(); setError(''); setLoading(true);
    try { onLogin(await patientClient.login({ username, password }, scenario)); navigate('/patients'); }
    catch (err) { setError(err.message); } finally { setLoading(false); setPassword(''); }
  }
  return <section className="login card"><p className="eyebrow">TU ESPACIO DE ATENCIÓN</p><h1>Bienvenida a GestNutri</h1><p>Organiza tus pacientes en un solo lugar.</p><p className="muted">Usa cualquier usuario y contraseña ficticios. Este acceso es simulado.</p><form onSubmit={submit} aria-busy={loading}><label>Usuario<input autoComplete="off" value={username} onChange={e => setUsername(e.target.value)} required /></label><label>Contraseña de demostración<input type="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} required /></label>{error && <p role="alert" className="error">{error}</p>}<button disabled={loading}>{loading ? 'Entrando…' : 'Entrar a la demostración'}</button></form><DemoState value={scenario} onChange={setScenario} /></section>;
}
