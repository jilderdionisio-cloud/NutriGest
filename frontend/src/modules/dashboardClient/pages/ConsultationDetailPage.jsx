import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import ConsultationResults from '../components/ConsultationResults'
import { loadDemo } from '../../../utils/nutritionDemo'
import { calculateConsultationBmi, getConsultationMeasurements } from '../../../utils/clinicalMath'
import { getPreviousConsultation } from '../../../utils/consultationHistory'

export default function ConsultationDetailPage() {
  const { id, consultationId } = useParams()
  const patient = loadDemo().patients.find((item) => item.id === id)
  const consultation = patient?.consultations?.find((item) => item.id === consultationId)

  if (!patient || !consultation) {
    return <DashboardLayout><section className="dashboard-content p-6"><p>Consulta no encontrada.</p><Link to={`/dashboard/pacientes/${id}`}>Volver al expediente</Link></section></DashboardLayout>
  }

  const previous = getPreviousConsultation(patient.consultations || [], consultation)
  const bmi = consultation.bmi?.value ?? consultation.bmi ?? calculateConsultationBmi(consultation)

  return (
    <DashboardLayout>
      <section className="dashboard-content dashboard-content--top">
        <Link to={`/dashboard/pacientes/${id}`} className="text-sm text-[#0f8fc6]">← Expediente</Link>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div><h1 className="text-3xl font-bold text-[#29431f]">Evaluación del {consultation.date}</h1><p className="mt-2 text-sm text-slate-500">{patient.name} · ID de consulta: {consultation.id}</p></div>
          <Link className="rounded-xl border border-[#4f7f35] px-4 py-2 text-sm font-semibold text-[#345224] no-underline" to={`/dashboard/pacientes/${id}/consultas/${consultation.id}/editar`}>Editar evaluación</Link>
        </div>
        <dl className="mt-7 grid gap-4 rounded-2xl border border-[#d3eaf4] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3">
          {getConsultationMeasurements(consultation).map((measurement) => <div key={measurement.id || `${measurement.indicator}-${measurement.unit}`}><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{measurement.indicator}</dt><dd className="mt-1 font-semibold text-[#29431f]">{measurement.value} {measurement.unit}</dd></div>)}
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">IMC</dt><dd className="mt-1 font-semibold text-[#29431f]">{bmi === null ? 'Sin dato' : `${bmi} kg/m²`}</dd></div>
        </dl>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <TextBlock title="Observaciones" value={consultation.observations} />
          <TextBlock title="Notas" value={consultation.note} />
        </div>
        <ConsultationResults current={consultation} previous={previous} />
        <p className="mt-5 text-xs text-slate-500">Registro local de demostración. La persistencia clínica real y multiusuario requiere backend.</p>
      </section>
    </DashboardLayout>
  )
}

function TextBlock({ title, value }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-bold text-[#29431f]">{title}</h2><p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{value || 'Sin dato'}</p></section>
}
