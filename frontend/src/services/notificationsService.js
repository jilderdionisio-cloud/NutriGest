import apiClient from './apiClient'

function toRelativeLabel(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function normalizeNotification(item) {
  return {
    id: item.id,
    titulo: item.titulo ?? item.title ?? '',
    mensaje: item.mensaje ?? item.message ?? '',
    tipo: item.tipo ?? '',
    leida: Boolean(item.leida ?? item.read ?? false),
    createdAt: item.createdAt ?? item.created_at ?? '',
    fechaProgramada: item.fechaProgramada ?? item.fecha_programada ?? '',
    fechaEnvio: item.fechaEnvio ?? item.fecha_envio ?? '',
    fechaLabel: toRelativeLabel(item.fechaEnvio ?? item.fecha_envio ?? item.createdAt ?? item.created_at),
  }
}

export async function obtenerNotificaciones() {
  const { data } = await apiClient.get('/notificaciones')
  return Array.isArray(data) ? data.map(normalizeNotification) : []
}

export async function obtenerNotificacionesNoLeidasCount() {
  const { data } = await apiClient.get('/notificaciones/no-leidas/count')
  return Number(data ?? 0)
}

export async function marcarNotificacionLeida(id) {
  await apiClient.patch(`/notificaciones/${id}/leer`)
}

export async function marcarTodasNotificacionesLeidas() {
  await apiClient.patch('/notificaciones/leer-todas')
}
