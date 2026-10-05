import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { loadDemo, savePatient } from '../../../utils/nutritionDemo'
import { calculateConsultationBmi, getConsultationMeasurements } from '../../../utils/clinicalMath'
import { sortConsultations } from '../../../utils/consultationHistory'

export default function PatientRecordPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(() => loadDemo().patients.find((item) => item.id === id))
  if (!patient) return <DashboardLayout><p className="dashboard-content p-6">Paciente no encontrado.</p></DashboardLayout>

  const save = () => { savePatient(patient); navigate('/dashboard/pacientes') }
  const field = (key, label) => <label className="grid gap-2 text-sm font-medium text-[#345224]">{label}<input className="h-11 rounded-xl border border-slate-200 px-3" value={patient[key] ?? ''} onChange={(event) => setPatient({ ...patient, [key]: event.target.value })} /></label>
  const consultations = sortConsultations(patient.consultations || [])

  return (
    <DashboardLayout>
      <section className="dashboard-content dashboard-content--top">
        <Link to="/dashboard/pacientes" className="text-sm text-[#0f8fc6]">← Pacientes</Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[#29431f]">Expediente del paciente</h1>
          <div className="flex gap-2"><Link to={`/dashboard/pacientes/${id}/editar`} className="rounded-xl border border-[#4f7f35] px-4 py-2 text-sm font-semibold text-[#345224] no-underline">Editar</Link><Link to={`/dashboard/pacientes/${id}/evolucion`} className="rounded-xl bg-[#4f7f35] px-4 py-2 text-sm font-semibold text-white no-underline">Ver evolución</Link></div>
        </div>
        <p className="mt-2 text-sm text-slate-500">ID estable: {patient.id}. Editar estos datos generales no modifica las consultas históricas.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">{field('name', 'Nombre completo')}{field('email', 'Correo')}{field('phone', 'Teléfono internacional')}</div>
        <h2 className="mt-8 text-xl font-bold text-[#29431f]">Información alimentaria</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">{field('allergies', 'Alergias')}{field('preferences', 'Preferencias')}{field('restrictions', 'Restricciones')}</div>
        <button onClick={save} className="mt-7 min-h-11 rounded-xl bg-[#4f7f35] px-5 font-semibold text-white">Guardar cambios locales</button>
      </section>
      <section className="dashboard-content dashboard-section">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold text-[#29431f]">Historial de consultas</h2><Link className="rounded-xl border border-[#4f7f35] px-4 py-2 text-sm font-semibold text-[#345224] no-underline" to={`/dashboard/pacientes/${id}/consultas/nueva`}>Registrar consulta</Link></div>
        {consultations.length ? (
          <div className="mt-4 grid gap-3">
            {consultations.map((consultation) => {
              const bmi = consultation.bmi?.value ?? consultation.bmi ?? calculateConsultationBmi(consultation)
              return <Link className="rounded-xl border border-slate-200 bg-white p-4 no-underline transition hover:border-[#b8d6a8] hover:shadow-sm" key={consultation.id} to={`/dashboard/pacientes/${id}/consultas/${consultation.id}`}><div className="flex flex-wrap items-start justify-between gap-3"><span><strong className="block text-[#29431f]">{consultation.date} · {consultation.kind}</strong><small className="mt-1 block text-slate-500">ID: {consultation.id}</small></span><span className="text-sm font-semibold text-[#0f8fc6]">Abrir evaluación →</span></div><p className="mt-2 text-sm text-slate-600">{consultation.observations || consultation.note || 'Sin observaciones ni notas'}</p><p className="mt-2 text-xs text-slate-500">{getConsultationMeasurements(consultation).length} mediciones · IMC: {bmi === null ? 'Sin dato' : `${bmi} kg/m²`}</p></Link>
            })}
          </div>
        ) : <p className="mt-4 text-sm text-slate-500">Aún no hay consultas registradas.</p>}
        <p className="mt-5 text-xs text-slate-500">El historial se conserva en el almacenamiento local de demostración. La persistencia clínica real requiere backend.</p>
        <h2 className="mt-8 text-xl font-bold text-[#29431f]">Documentos esenciales</h2><p className="mt-2 text-sm text-slate-500">Sin documentos registrados. Carga y tipos de documento pendientes de definición.</p>
      </section>
    </DashboardLayout>
  )
}
