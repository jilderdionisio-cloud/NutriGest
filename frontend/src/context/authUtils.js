const USER_STORAGE_KEY = 'user'
const AUTH_TOKEN_STORAGE_KEYS = ['token', 'accessToken', 'authToken']
const SENSITIVE_AUTH_KEYS = new Set([
  'password',
  'contrasena',
  'contraseña',
  'passwordActual',
  'nuevaPassword',
  'confirmarPassword',
])

export function normalizeUserData(userData) {
  if (!userData) {
    return null
  }

  const source = userData.usuario ?? userData.user ?? userData.data ?? userData
  const nombres = source.nombres ?? source.nombre ?? source.name ?? ''
  const apellidos =
    source.apellidos ??
    ([source.apellidoPaterno, source.apellidoMaterno].filter(Boolean).join(' ') ||
      source.lastName ||
      '')

  return {
    ...source,
    nombres,
    apellidos,
    correo: source.correo ?? source.email ?? '',
    documento: source.documento ?? source.numeroDocumento ?? source.dni ?? '',
    numeroDocumento: source.numeroDocumento ?? source.documento ?? source.dni ?? '',
    tipoDocumento: source.tipoDocumento ?? source.documentType ?? '',
    celular: source.celular ?? source.telefono ?? source.phone ?? '',
    fechaNacimiento: source.fechaNacimiento ?? source.birthDate ?? '',
  }
}

export function getUserDisplayData(user) {
  const nombres = user?.nombres?.trim() ?? ''
  const apellidos = user?.apellidos?.trim() ?? ''
  const fullName = nombres && apellidos ? `${nombres} ${apellidos}` : nombres || apellidos || 'Usuario'
  const firstName = nombres ? nombres.split(' ')[0] : 'Usuario'
  const initials = `${nombres?.[0] || 'U'}${apellidos?.[0] || ''}`.toUpperCase()

  return {
    fullName,
    firstName,
    initials,
  }
}

export function getStoredUser() {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return normalizeUserData(JSON.parse(storedUser))
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

function sanitizeStoredUser(userData) {
  if (!userData || typeof userData !== 'object') {
    return userData
  }

  return Object.fromEntries(
    Object.entries(userData).filter(([key]) => !SENSITIVE_AUTH_KEYS.has(key)),
  )
}

export function hasStoredAuthToken() {
  return AUTH_TOKEN_STORAGE_KEYS.some((key) => Boolean(localStorage.getItem(key)))
}

export function saveStoredUser(userData) {
  if (userData) {
    const sanitizedUser = sanitizeStoredUser(userData)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sanitizedUser))

    const token = sanitizedUser.token ?? sanitizedUser.accessToken ?? sanitizedUser.authToken
    if (token) {
      localStorage.setItem('token', token)
    }
  }
}

export function removeStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY)
  AUTH_TOKEN_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
  Array.from(SENSITIVE_AUTH_KEYS).forEach((key) => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  })
}
