import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function PatientDetail() {
  const { id } = useParams(); const [patient, setPatient] = useState(null); const [error, setError] = useState("");
  useEffect(() => { api(`/patients/${id}/`).then(setPatient).catch(err => setError(err.message)); }, [id]);
  if (error) return <p className="error">Error: {error}</p>;
  if (!patient) return <p>Cargando paciente…</p>;
  return <section><Link to="/patients">← Pacientes</Link><h1>{patient.first_name} {patient.last_name}</h1><dl><dt>Correo</dt><dd>{patient.email || "No registrado"}</dd><dt>Teléfono</dt><dd>{patient.phone || "No registrado"}</dd><dt>Fecha de nacimiento</dt><dd>{patient.birth_date || "No registrada"}</dd><dt>Notas</dt><dd>{patient.notes || "Sin notas"}</dd></dl></section>;
}
