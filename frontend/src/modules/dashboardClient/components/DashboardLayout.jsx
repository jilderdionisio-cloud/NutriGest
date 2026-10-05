import {
  Bell,
  ChevronRight,
  ClipboardList,
  Home,
  Menu,
  X,
  UsersRound,
  MessagesSquare,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserDisplayData } from '../../../context/authUtils'
import { useAuth } from '../../../context/useAuth'
import logo from '../../../assets/brand-mark.svg'
import {
  marcarNotificacionLeida,
  marcarTodasNotificacionesLeidas,
  obtenerNotificaciones,
  obtenerNotificacionesNoLeidasCount,
} from '../../../services/notificationsService'
import UserMenu from './UserMenu'
import NotificationDrawer from '../../shared/components/NotificationDrawer'
import '../../../styles/dashboard.css'

const menuItems = [
  { label: 'Inicio', icon: Home, href: '/dashboard' },
  { label: 'Pacientes', icon: UsersRound, href: '/dashboard/pacientes' },
  { label: 'Seguimiento', icon: ClipboardList, href: '/dashboard/seguimiento' },
  { label: 'Solicitudes de contacto', icon: MessagesSquare, href: '/dashboard/solicitudes-contacto' },
]

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsLoading, setNotificationsLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { user } = useAuth()
  const { firstName } = getUserDisplayData(user)

  useEffect(() => {
    let isActive = true

    async function loadUnreadCount() {
      try {
        const unreadTotal = await obtenerNotificacionesNoLeidasCount()
        if (isActive) {
          setUnreadCount(unreadTotal)
        }
      } catch {
        if (isActive) {
          setUnreadCount(0)
        }
      }
    }

    loadUnreadCount()
    const intervalId = window.setInterval(loadUnreadCount, 60000)

    return () => {
      isActive = false
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (!notificationsOpen) {
      return undefined
    }

    let isActive = true

    async function loadNotifications() {
      setNotificationsLoading(true)

      try {
        const [items, unreadTotal] = await Promise.all([
          obtenerNotificaciones(),
          obtenerNotificacionesNoLeidasCount(),
        ])

        if (isActive) {
          setNotifications(items)
          setUnreadCount(unreadTotal)
        }
      } catch {
        if (isActive) {
          setNotifications([])
          setUnreadCount(0)
        }
      } finally {
        if (isActive) {
          setNotificationsLoading(false)
        }
      }
    }

    loadNotifications()

    return () => {
      isActive = false
    }
  }, [notificationsOpen])

  const handleMarkAsRead = async (notificationId) => {
    try {
      await marcarNotificacionLeida(notificationId)
      setNotifications((current) => current.map((notification) =>
        notification.id === notificationId ? { ...notification, leida: true } : notification
      ))
      setUnreadCount((current) => Math.max(0, current - 1))
    } catch {
      // El estado se mantiene para que el usuario reintente.
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await marcarTodasNotificacionesLeidas()
      setNotifications((current) => current.map((notification) => ({ ...notification, leida: true })))
      setUnreadCount(0)
    } catch {
      // El estado se mantiene para que el usuario reintente.
    }
  }

  return (
    <div className="dashboard-page">
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'dashboard-sidebar--open' : ''}`}>
        <div className="dashboard-sidebar__logo">
          <img src={logo} alt="NutriGest" />
        </div>

        <section className="dashboard-sidebar__greeting">
          <h1>¡Hola, {firstName}!</h1>
          <p>Estamos aquí para cuidarte</p>
        </section>

        <nav className="dashboard-menu" aria-label="Menú principal">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                className={({ isActive }) =>
                  `dashboard-menu__item ${isActive ? 'dashboard-menu__item--active' : ''}`
                }
                end={item.href === '/dashboard'}
                to={item.href}
                key={item.label}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon size={18} strokeWidth={2.2} />
                <span>{item.label}</span>
                <ChevronRight className="dashboard-menu__chevron" size={18} strokeWidth={2.4} />
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {isSidebarOpen && (
        <button
          className="dashboard-sidebar-backdrop"
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="dashboard-shell">
        <header className="dashboard-header">
          <button
            className="dashboard-mobile-menu"
            type="button"
            aria-label={isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsSidebarOpen((current) => !current)}
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="dashboard-header__spacer" />
          <button
            className="dashboard-icon-button"
            type="button"
            aria-label="Abrir notificaciones"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="dashboard-notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
          </button>
          <UserMenu />
        </header>

        <main className="dashboard-main">{children}</main>
      </div>

      <NotificationDrawer
        isOpen={notificationsOpen}
        loading={notificationsLoading}
        notifications={notifications}
        unreadCount={unreadCount}
        onClose={() => setNotificationsOpen(false)}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  )
}

export default DashboardLayout
