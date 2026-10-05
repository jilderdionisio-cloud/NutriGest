import axios from 'axios'

const configuredUrl = (import.meta.env.VITE_ADMIN_API_URL || 'http://127.0.0.1:8000/api/admin').replace(/\/+$/, '')
const baseUrl = configuredUrl.endsWith('/api/admin')
  ? configuredUrl.replace(/\/admin$/, '')
  : configuredUrl.endsWith('/api')
    ? configuredUrl
    : `${configuredUrl}/api`

const publicBudgetApi = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
})

export async function createBudgetRequest({ form, files }) {
  const payload = new FormData()
  payload.append('tipo_documento', form.documentType)
  payload.append('numero_documento', form.documentNumber)
  payload.append('nombres', form.firstName)
  payload.append('apellido_paterno', form.paternalLastName)
  payload.append('apellido_materno', form.maternalLastName)
  payload.append('correo', form.email)
  payload.append('telefono', form.phone)
  payload.append('nombre_procedimiento', form.procedureName)
  payload.append('sede_id', form.location)
  payload.append('observaciones', form.observations)

  if (files.medicalOrder) {
    payload.append('orden_medica', files.medicalOrder)
  }
  if (files.otherFile) {
    payload.append('archivo_adjunto', files.otherFile)
  }

  const { data } = await publicBudgetApi.post('/presupuestos/', payload)
  return data
}
