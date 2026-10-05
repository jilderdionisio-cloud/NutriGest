const STORAGE_KEY = 'nutrigest-local-patients'

export function getLocalPatients() {
  try {
    const patients = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(patients) ? patients : []
  } catch {
    return []
  }
}

export function saveLocalPatient(patient) {
  const normalized = {
    id: patient.id || `local-${patient.email}`,
    name: [patient.nombres, patient.apellidos].filter(Boolean).join(' ').trim(),
    email: patient.email || patient.correo || '',
    phone: patient.phone || patient.celular || '',
    role: 'patient',
    source: 'local-demo',
  }
  const patients = getLocalPatients()
  const index = patients.findIndex((item) => item.email && item.email === normalized.email)
  const nextPatients = index >= 0 ? patients.map((item, i) => i === index ? { ...item, ...normalized } : item) : [...patients, normalized]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPatients))
  return normalized
}
