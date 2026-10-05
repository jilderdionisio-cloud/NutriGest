import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import ConsultationResults from '../components/ConsultationResults'
import { loadDemo } from '../../../utils/nutritionDemo'
import { calculateConsultationBmi } from '../../../utils/clinicalMath'
import { getPreviousConsultation, sortConsultations } from '../../../utils/consultationHistory'

export default function EvolutionPage() {
  const { id } = useParams()
  const patient = loadDemo().patients.find((item) => item.id === id)
  if (!patient) return <DashboardLayout><p className="dashboard-content p-6">Paciente no encontrado.</p></DashboardLayout>
  const consultations = sortConsultations(patient.consultations || [])
  const latest = consultations[0] || null
  const previous = latest ? getPreviousConsultation(patient.consultations || [], latest) : null
  const bmi = latest ? (latest.bmi?.value ?? latest.bmi ?? calculateConsultationBmi(latest)) : null

  return <DashboardLayout><section className="dashboard-content dashboard-content--top"><Link to={`/dashboard/pacientes/${id}`} className="text-sm text-[#0f8fc6]">← Expediente</Link><h1 className="mt-3 text-3xl font-bold text-[#29431f]">Evolución de {patient.name}</h1><p className="mt-2 text-sm text-slate-500">La evaluación más reciente se compara exclusivamente con la consulta inmediatamente anterior de este paciente.</p>{latest && <p className="mt-5 rounded-xl bg-[#edf5e6] p-4 font-semibold text-[#29431f]">Consulta actual: {latest.date} · IMC: {bmi === null ? 'Sin dato' : `${bmi} kg/m²`}</p>}{latest ? <ConsultationResults current={latest} previous={previous} /> : <p className="mt-6 text-sm text-slate-500">No hay consultas registradas.</p>}</section>{consultations.length > 0 && <section className="dashboard-content dashboard-section"><h2 className="text-xl font-bold text-[#29431f]">Evaluaciones</h2><div className="mt-4 grid gap-3">{consultations.map((consultation) => <Link key={consultation.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 no-underline" to={`/dashboard/pacientes/${id}/consultas/${consultation.id}`}><span><strong className="text-[#29431f]">{consultation.date}</strong><small className="ml-2 text-slate-500">{consultation.kind}</small></span><span className="text-sm font-semibold text-[#0f8fc6]">Ver resultados →</span></Link>)}</div></section>}</DashboardLayout>
}
