import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "./api";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";

function Layout({ children }) {
  const navigate = useNavigate();
  function logout() { localStorage.removeItem("gestnutri_token"); navigate("/login"); }
  return <><header><strong>GestNutri</strong><nav><NavLink to="/patients">Pacientes</NavLink><button onClick={logout}>Salir</button></nav></header><main>{children}</main></>;
}

function Login() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const navigate = useNavigate();
  async function submit(event) { event.preventDefault(); setError(""); try { const data = await api("/auth/login/", { method: "POST", body: JSON.stringify({ username, password }) }); localStorage.setItem("gestnutri_token", data.token); navigate("/patients"); } catch (err) { setError(err.message); } }
  return <main className="login"><h1>GestNutri</h1><form onSubmit={submit}><label>Usuario<input value={username} onChange={e => setUsername(e.target.value)} required /></label><label>Contraseña<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>{error && <p className="error">{error}</p>}<button>Entrar</button></form></main>;
}

function Protected({ children }) { return localStorage.getItem("gestnutri_token") ? <Layout>{children}</Layout> : <Navigate to="/login" replace />; }
export default function App() { return <Routes><Route path="/login" element={<Login />} /><Route path="/patients" element={<Protected><PatientList /></Protected>} /><Route path="/patients/:id" element={<Protected><PatientDetail /></Protected>} /><Route path="*" element={<Navigate to="/patients" replace />} /></Routes>; }
