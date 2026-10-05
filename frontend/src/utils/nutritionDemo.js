const KEY = 'nutrigest-nutrition-demo'
const seed = { patients: [], corrections: [] }
function normalizeState(state) {
  return {
    ...seed,
    ...state,
    patients: (state?.patients || []).map((patient) => ({
      ...patient,
      consultations: (patient.consultations || []).map((consultation, consultationIndex) => ({
        ...consultation,
        id: consultation.id || `consultation-${patient.id}-${consultationIndex + 1}`,
        patientId: consultation.patientId || patient.id,
        measurements: (consultation.measurements || (consultation.measurement ? [consultation.measurement] : [])).map((measurement, measurementIndex) => ({
          ...measurement,
          id: measurement.id || `measurement-${patient.id}-${consultationIndex + 1}-${measurementIndex + 1}`,
        })),
      })),
    })),
  }
}
export const loadDemo = () => { try { return normalizeState(JSON.parse(localStorage.getItem(KEY) || '{}')) } catch { return normalizeState(seed) } }
export const saveDemo = (next) => localStorage.setItem(KEY, JSON.stringify(next))
export const newId = (prefix) => `${prefix}-${crypto.randomUUID?.() ?? Date.now()}`
export function savePatient(patient) { const state = loadDemo(); const index = state.patients.findIndex((item) => item.id === patient.id); const next = index < 0 ? [...state.patients, patient] : state.patients.map((item, i) => i === index ? patient : item); saveDemo({ ...state, patients: next }); return patient }
