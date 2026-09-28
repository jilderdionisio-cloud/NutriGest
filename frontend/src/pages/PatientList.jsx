import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function PatientList() {
  const [patients, setPatients] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { api("/patients/").then(setPatients).catch(err => setError(err.message)).finally(() => setLoading(false)); }, []);
  return <section><h1>Pacientes</h1>{loading && <p>Cargando pacientes…</p>}{error && <p className="error">Error: {error}</p>}{!loading && !error && (patients.length ? <ul className="patient-list">{patients.map(patient => <li key={patient.id}><Link to={`/patients/${patient.id}`}>{patient.first_name} {patient.last_name}</Link><span>{patient.email || "Sin correo"}</span></li>)}</ul> : <p>Aún no hay pacientes registrados.</p>)}</section>;
}
