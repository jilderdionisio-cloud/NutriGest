import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import ConsultationResults from '../components/ConsultationResults'
import { loadDemo, newId, saveDemo } from '../../../utils/nutritionDemo'
import { calculateConsultationBmi, getConsultationMeasurements } from '../../../utils/clinicalMath'
import { getPreviousConsultation } from '../../../utils/consultationHistory'

const definitions = [
  ['weight', 'Peso', 'kg'],
  ['height', 'Altura', 'm'],
  ['waist', 'Circunferencia de cintura', 'cm'],
  ['bodyFat', 'Grasa corporal', '%'],
  ['muscle', 'Músculo', '%'],
]

function valuesFromConsultation(consultation) {
  const measurements = getConsultationMeasurements(consultation)
  return Object.fromEntries(definitions.map(([key, indicator]) => [key, measurements.find((item) => item.indicator === indicator)?.value ?? '']))
}

export default function ConsultationPage() {
  const { id, consultationId } = useParams()
  const navigate = useNavigate()
  const initialState = useMemo(() => loadDemo(), [])
  const patient = initialState.patients.find((item) => item.id === id)
  const existing = patient?.consultations?.find((item) => item.id === consultationId)
  const [form, setForm] = useState({
    date: existing?.date || new Date().toISOString().slice(0, 10),
    kind: existing?.kind || 'Seguimiento',
    observations: existing?.observations || '',
    note: existing?.note || '',
  })
  const [values, setValues] = useState(() => valuesFromConsultation(existing))
  const [heightUnit, setHeightUnit] = useState(() => getConsultationMeasurements(existing).find((item) => item.indicator === 'Altura')?.unit || 'm')
  const [error, setError] = useState('')

  if (!patient) return <DashboardLayout><p className="dashboard-content p-6">Paciente no encontrado.</p></DashboardLayout>

  const draftMeasurements = definitions.flatMap(([key, indicator, defaultUnit]) => {
    const value = Number(values[key])
    if (values[key] === '' || !Number.isFinite(value) || value <= 0) return []
    return [{
      id: getConsultationMeasurements(existing).find((item) => item.indicator === indicator)?.id || newId('measurement'),
      indicator,
      value,
      unit: key === 'height' ? heightUnit : defaultUnit,
    }]
  })
  const draft = {
    id: existing?.id || '__draft__',
    patientId: patient.id,
    ...form,
    createdAt: existing?.createdAt || new Date().toISOString(),
    measurements: draftMeasurements,
  }
  const bmi = calculateConsultationBmi(draft)
  const current = { ...draft, bmi: bmi === null ? null : { value: bmi, unit: 'kg/m²' } }
  const previous = getPreviousConsultation(patient.consultations || [], current)

  const save = () => {
    if (!form.date) return setError('Selecciona la fecha de la consulta.')
    const invalid = Object.values(values).some((value) => value !== '' && (!Number.isFinite(Number(value)) || Number(value) <= 0))
    if (invalid) return setError('Las mediciones deben ser números positivos o quedar vacías.')

    const now = new Date().toISOString()
    const consultation = {
      ...current,
      id: existing?.id || newId('consultation'),
      patientId: patient.id,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      noteStatus: existing?.noteStatus || 'draft',
    }
    const consultations = existing
      ? (patient.consultations || []).map((item) => item.id === existing.id ? consultation : item)
      : [...(patient.consultations || []), consultation]
    const corrections = existing ? [...(initialState.corrections || []), {
      id: newId('correction'),
      patientId: patient.id,
      consultationId: existing.id,
      correctedAt: now,
      type: 'consultation-update',
    }] : initialState.corrections || []
    const patients = initialState.patients.map((item) => item.id === patient.id ? { ...patient, consultations } : item)
    saveDemo({ ...initialState, patients, corrections })
    navigate(`/dashboard/pacientes/${id}/consultas/${consultation.id}`)
  }

  return (
    <DashboardLayout>
      <section className="dashboard-content dashboard-content--top">
        <Link to={`/dashboard/pacientes/${id}`} className="text-sm text-[#0f8fc6]">← Expediente</Link>
        <h1 className="mt-3 text-3xl font-bold text-[#29431f]">{existing ? 'Editar consulta' : 'Registrar consulta'}</h1>
        <p className="mt-2 text-sm text-slate-500">Paciente: {patient.name}. Un campo vacío significa “Sin dato”, no cero.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Label text="Fecha"><input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></Label>
          <Label text="Tipo"><select value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value })}><option>Primera consulta</option><option>Seguimiento</option></select></Label>
        </div>
        <fieldset className="mt-7 rounded-2xl border border-[#d3eaf4] p-5">
          <legend className="px-2 font-bold text-[#29431f]">Mediciones manuales</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {definitions.map(([key, label, unit]) => (
              <Label key={key} text={`${label} (${key === 'height' ? heightUnit : unit})`}>
                <span className="flex gap-2">
                  <input className="min-w-0 flex-1" inputMode="decimal" value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} />
                  {key === 'height' && <select aria-label="Unidad de altura" value={heightUnit} onChange={(event) => setHeightUnit(event.target.value)}><option value="m">m</option><option value="cm">cm</option></select>}
                </span>
              </Label>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-[#29431f]">IMC calculado: {bmi === null ? 'Sin dato' : `${bmi} kg/m²`}</p>
        </fieldset>
        <Label text="Observaciones"><textarea className="min-h-24 rounded-xl border border-slate-200 p-3" value={form.observations} onChange={(event) => setForm({ ...form, observations: event.target.value })} /></Label>
        <Label text="Notas"><textarea className="min-h-28 rounded-xl border border-slate-200 p-3" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} /></Label>
        <ConsultationResults current={current} previous={previous} />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="mt-6 rounded-xl bg-[#4f7f35] px-5 py-3 font-semibold text-white" onClick={save}>{existing ? 'Guardar corrección' : 'Guardar consulta local'}</button>
        <p className="mt-4 text-xs text-slate-500">Persistencia de demostración en este navegador. La persistencia clínica real requiere integración con el backend.</p>
      </section>
    </DashboardLayout>
  )
}

function Label({ text, children }) {
  return <label className="mt-5 grid gap-2 text-sm font-medium text-[#345224]">{text}{children}</label>
}
