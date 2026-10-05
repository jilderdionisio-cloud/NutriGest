import axios from 'axios'

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/public',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
})

export async function getActiveCampaigns(page = 'HOME') {
  const { data } = await publicApi.get('/campanas/activas/', {
    params: { page },
  })
  return Array.isArray(data) ? data : []
}
