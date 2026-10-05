import axios from 'axios'

const configuredUserApiUrl = (import.meta.env.VITE_USER_API_URL || 'http://127.0.0.1:8080').replace(/\/+$/, '')
const userServiceUrl = configuredUserApiUrl.endsWith('/api')
  ? configuredUserApiUrl.slice(0, -4)
  : configuredUserApiUrl
const API_URL = import.meta.env.VITE_USER_AUTH_URL || `${userServiceUrl}/api/auth`

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

export async function loginUser(credentials) {
  const { data } = await apiClient.post('/login', credentials)
  return data
}

export async function buscarPersonaPorDocumento(tipoDocumento, numeroDocumento) {
  try {
    const { data } = await apiClient.get(`/dni/${numeroDocumento}`)

    return {
      tipoDocumento,
      ...data,
    }
  } catch (error) {
    console.warn('No se pudo consultar el documento:', error.message)
    return null
  }
}

export async function registerUser(payload) {
  const backendPayload = { ...payload }
  const email = backendPayload.email ?? backendPayload.correo

  delete backendPayload.email
  delete backendPayload.correo
  delete backendPayload.aceptaTerminos

  const { data } = await apiClient.post('/register', {
    ...backendPayload,
    email,
  })
  return data
}

export async function requestPasswordReset(email) {
  const { data } = await apiClient.post('/forgot-password', { email })
  return data
}

export async function verifyPasswordResetCode(email, code) {
  const { data } = await apiClient.post('/verify-code', { email, code })
  return data
}

export async function resetPassword(email, newPassword, confirmPassword) {
  const { data } = await apiClient.post('/reset-password', {
    email,
    newPassword,
    confirmPassword,
  })
  return data
}

export { API_URL }
