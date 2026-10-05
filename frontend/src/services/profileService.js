import apiClient from './apiClient'

export async function getMyProfile() {
  const { data } = await apiClient.get('/users/me')
  return data
}

export async function updateContact(payload) {
  const { data } = await apiClient.patch('/usuarios/me/contacto', payload)
  return data
}

export async function changePassword(payload) {
  const { data } = await apiClient.put('/usuarios/me/password', payload)
  return data
}
