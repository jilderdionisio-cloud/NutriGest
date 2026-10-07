import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { patientClient } from '../api';
import { patientName, patientFields } from '../data/patients';
import DemoState from '../components/DemoState';
export default function PatientList() {
  const [patients, setPatients] = useState([]); const [search, setSearch] = useState(''); const [scenario, setScenario] = useState('normal');
  const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true; setLoading(true); setError('');
    patientClient.list(search, scenario).then(data => { if (active) setPatients(data); }).catch(err => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, scenario, retry]);
  const contactFields = patientFields.filter(field => ['email', 'phone'].includes(field.key));
  return <section><div className="title-row"><div><p className="eyebrow">GESTIÓN DE PACIENTES</p><h1>Pacientes</h1><p className="muted">Busca un expediente o registra a un nuevo paciente.</p></div><Link className="button" to="/patients/new">+ Nuevo paciente</Link></div><div className="card"><label>Buscar pacientes<input type="search" placeholder="Buscar en los datos del expediente" value={search} onChange={e => setSearch(e.target.value)} /></label><div aria-live="polite" aria-busy={loading}>{loading ? <p role="status">Cargando pacientes…</p> : error ? <div><p role="alert" className="error">{error}</p><button onClick={() => { setScenario('normal'); setRetry(value => value + 1); }}>Reintentar</button></div> : patients.length ? <><p className="muted">{patients.length} pacientes encontrados</p><ul className="patient-list">{patients.map(patient => <li key={patient.id}><div><Link className="patient-name" to={`/patients/${patient.id}`}>{patientName(patient)}</Link><p className="muted">{contactFields.map(field => patient[field.key]).filter(Boolean).join(' · ') || 'Sin contacto registrado'}</p></div><Link to={`/patients/${patient.id}/edit`} aria-label={`Editar a ${patientName(patient)}`}>Editar</Link></li>)}</ul></> : <div className="empty"><h2>{search ? 'Sin coincidencias' : 'Aún no hay pacientes'}</h2><p>{search ? 'Prueba con otra búsqueda.' : 'Registra el primer paciente para comenzar.'}</p>{search ? <button className="secondary" onClick={() => setSearch('')}>Limpiar búsqueda</button> : <Link to="/patients/new">Registrar paciente</Link>}</div>}</div></div><DemoState value={scenario} onChange={setScenario} options={ [['empty', 'Lista vacía']] } /></section>;
}
