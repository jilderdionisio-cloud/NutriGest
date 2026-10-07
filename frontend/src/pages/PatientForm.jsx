import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { patientFields } from '../data/patients';
import { patientClient } from '../api';
import DemoState from '../components/DemoState';
const emptyValues = () => Object.fromEntries(patientFields.map(field => [field.key, '']));
export default function PatientForm() {
  const { id } = useParams(); const navigate = useNavigate();
  const [values, setValues] = useState(emptyValues); const [loading, setLoading] = useState(Boolean(id)); const [saving, setSaving] = useState(false);
  const [error, setError] = useState(''); const [loadError, setLoadError] = useState(''); const [scenario, setScenario] = useState('normal'); const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true; setValues(emptyValues()); setError(''); setLoadError(''); setLoading(Boolean(id));
    if (id) patientClient.detail(id).then(data => { if (active) setValues(Object.fromEntries(patientFields.map(field => [field.key, data[field.key] ?? '']))); }).catch(err => { if (active) setLoadError(err.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, retry]);
  async function submit(event) {
    event.preventDefault(); setError('');
    if (patientFields.some(field => field.required && !values[field.key].trim())) { setError('Completa nombre y apellidos sin usar solo espacios.'); return; }
    setSaving(true);
    try { const patient = await patientClient.save(values, id, scenario); navigate(`/patients/${patient.id}`, { state: { message: id ? 'Cambios guardados en la demostración.' : 'Paciente creado en la demostración.' } }); }
    catch (err) { setError(err.message); } finally { setSaving(false); }
  }
  const cancel = id ? `/patients/${id}` : '/patients';
  return <section><Link to={cancel}>← Volver</Link><h1>{id ? 'Editar paciente' : 'Nuevo paciente'}</h1><p className="muted">Los campos con * son obligatorios en esta demostración.</p>{loading ? <p role="status">Cargando datos…</p> : loadError ? <div><p className="error" role="alert">{loadError}</p><button onClick={() => setRetry(value => value + 1)}>Reintentar</button></div> : <form className="card" onSubmit={submit} aria-busy={saving}><fieldset disabled={saving}><div className="form-grid">{patientFields.map(field => <label key={field.key}>{field.label}{field.required ? ' *' : ''}{field.type === 'textarea' ? <textarea value={values[field.key]} onChange={e => setValues(current => ({ ...current, [field.key]: e.target.value }))} rows={4} /> : <input type={field.type} required={field.required} maxLength={field.maxLength} value={values[field.key]} onChange={e => setValues(current => ({ ...current, [field.key]: e.target.value }))} />}</label>)}</div>{error && <p role="alert" className="error">{error}</p>}<div className="actions"><button>{saving ? 'Guardando…' : 'Guardar paciente'}</button><Link className="button secondary" to={cancel}>Cancelar</Link></div></fieldset></form>}<DemoState value={scenario} onChange={setScenario} /></section>;
}
