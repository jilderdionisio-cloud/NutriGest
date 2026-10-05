import apiClient from './apiClient'

export async function obtenerResumenDashboard() {
  const { data } = await apiClient.get('/dashboard/resumen')
  return data
}
