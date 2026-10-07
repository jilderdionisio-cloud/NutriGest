import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { patientClient } from '../api';
import { patientFields, patientName } from '../data/patients';
import DemoState from '../components/DemoState';
export default function PatientDetail() {
  const { id } = useParams(); const location = useLocation();
  const [patient, setPatient] = useState(null); const [error, setError] = useState(''); const [scenario, setScenario] = useState('normal'); const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true; setLoading(true); setError(''); setPatient(null);
    patientClient.detail(id, scenario).then(data => { if (active) setPatient(data); }).catch(err => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, scenario]);
  return <section><Link to="/patients">← Volver a pacientes</Link><h1>Expediente del paciente</h1>{location.state?.message && <p role="status" className="success">{location.state.message}</p>}{loading ? <p role="status">Cargando expediente…</p> : error ? <p role="alert" className="error">{error}</p> : patient && <div className="card"><div className="title-row"><h2>{patientName(patient)}</h2><Link className="button secondary" to={`/patients/${id}/edit`}>Editar paciente</Link></div><dl className="detail-grid">{patientFields.map(field => <div key={field.key}><dt>{field.label}</dt><dd>{patient[field.key] || 'No registrado'}</dd></div>)}</dl><div className="pending"><h2>Alergias y restricciones</h2><p>Pendiente de definición de campos por el equipo de datos. Esta sección aún no permite registrar información.</p></div></div>}<DemoState value={scenario} onChange={setScenario} options={ [['missing', 'No encontrado']] } /></section>;
}
