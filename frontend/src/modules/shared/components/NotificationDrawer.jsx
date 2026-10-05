import { Check, X } from 'lucide-react'
import { useEffect } from 'react'

function NotificationDrawer({
  isOpen,
  onClose,
  notifications = [],
  loading = false,
  unreadCount = 0,
  onMarkAsRead,
  onMarkAllAsRead,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9998]" aria-modal="true" role="dialog" aria-labelledby="notification-drawer-title">
      <button
        className="fixed inset-0 z-[9998] bg-black/40 transition-opacity duration-300"
        type="button"
        aria-label="Cerrar notificaciones"
        onClick={onClose}
      />

      <aside className="fixed right-0 top-0 z-[9999] flex h-screen w-[90vw] max-w-[420px] flex-col border-l border-slate-100 bg-white px-6 py-6 shadow-xl sm:w-[420px] sm:px-6">
        <header className="flex min-h-10 items-start justify-between">
          <h2 id="notification-drawer-title" className="text-lg font-semibold text-[#29431f]">
            Notificaciones
          </h2>
          <button
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-[#4f7f35]"
            type="button"
            aria-label="Cerrar panel de notificaciones"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>

        {loading ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-500">Cargando notificaciones...</div>
        ) : unreadCount === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4 text-center">
            <div>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[#bfe8f5] bg-[#EAF8FD] text-[#167EA8]">
                <Check size={30} strokeWidth={2.5} />
              </span>
              <strong className="mt-5 block text-xl font-semibold text-[#29431f]">Estás al día</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">No tienes notificaciones sin leer</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {unreadCount > 0 && onMarkAllAsRead && (
              <div className="flex justify-end">
                <button
                  className="text-xs font-medium text-[#167EA8] transition hover:text-[#0f5f82]"
                  type="button"
                  onClick={onMarkAllAsRead}
                >
                  Marcar todas como leídas
                </button>
              </div>
            )}
            {notifications.length > 0 ? notifications.map((notification) => (
              <article
                className={`rounded-[14px] border p-4 transition hover:shadow-sm ${
                  notification.leida ? 'border-slate-200 bg-white' : 'border-[#cfeaf4] bg-[#f7fbfd]'
                }`}
                key={notification.id}
              >
                <div className="flex items-start gap-3">
                  {!notification.leida && (
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#167EA8]" aria-hidden="true" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-900">{notification.titulo}</h3>
                      <span className="shrink-0 text-[0.7rem] font-medium text-slate-500">{notification.fechaLabel}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{notification.mensaje}</p>
                    {!notification.leida && onMarkAsRead && (
                      <button
                        className="mt-3 text-xs font-medium text-[#167EA8] transition hover:text-[#0f5f82]"
                        type="button"
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        Marcar como leída
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )) : (
              <div className="flex flex-1 items-center justify-center px-4 text-center">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[#bfe8f5] bg-[#EAF8FD] text-[#167EA8]">
                    <Check size={30} strokeWidth={2.5} />
                  </span>
                  <strong className="mt-5 block text-xl font-semibold text-[#29431f]">Estás al día</strong>
                  <p className="mt-2 text-sm leading-6 text-slate-600">No tienes notificaciones sin leer</p>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  )
}

export default NotificationDrawer
