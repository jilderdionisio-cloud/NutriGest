import axios from 'axios'
import { removeStoredUser } from '../context/authUtils'

const configuredUserApiUrl = (import.meta.env.VITE_USER_API_URL || 'http://127.0.0.1:8080').replace(/\/+$/, '')
const userApiUrl = configuredUserApiUrl.endsWith('/api') ? configuredUserApiUrl : `${configuredUserApiUrl}/api`

const apiClient = axios.create({
  baseURL: userApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
})

function getStoredUserToken() {
  const storedUser = localStorage.getItem('user')

  if (!storedUser) {
    return null
  }

  try {
    const user = JSON.parse(storedUser)
    return user.token ?? user.accessToken ?? user.authToken ?? null
  } catch {
    return null
  }
}

apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('token') ??
    localStorage.getItem('accessToken') ??
    localStorage.getItem('authToken') ??
    getStoredUserToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeStoredUser()
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        const redirectTo = `${window.location.pathname}${window.location.search}`
        window.location.assign(`/login?redirect=${encodeURIComponent(redirectTo)}`)
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
