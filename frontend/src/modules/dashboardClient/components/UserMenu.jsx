import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserDisplayData } from '../../../context/authUtils'
import { useAuth } from '../../../context/useAuth'

const menuOptions = [
  { label: 'Volver a saludmas.pe', to: '/' },
  { label: 'Administra tu perfil', to: '/dashboard/perfil' },
  { label: 'Cambiar contraseña', to: '/dashboard/perfil?section=security' },
]

function UserMenu() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const openedByHoverRef = useRef(false)
  const ChevronIcon = isOpen ? ChevronUp : ChevronDown
  const { firstName, initials } = getUserDisplayData(user)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        openedByHoverRef.current = false
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div
      className="relative z-[9999]"
      ref={menuRef}
      onMouseEnter={() => {
        if (!isOpen) {
          openedByHoverRef.current = true
          setIsOpen(true)
        }
      }}
    >
      <button
        className="inline-flex items-center gap-2.5 border-0 bg-transparent text-[#29431f] outline-none transition-colors duration-200 hover:text-[#4f7f35]"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          if (openedByHoverRef.current) {
            openedByHoverRef.current = false
            setIsOpen(true)
            return
          }

          setIsOpen((currentValue) => !currentValue)
        }}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#4f7f35] text-sm font-medium text-white">
          {initials}
        </span>
        <strong className="hidden text-[0.84rem] font-semibold sm:inline">{firstName}</strong>
        <ChevronIcon size={16} strokeWidth={2.4} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-[9999] mt-3 w-[260px] overflow-hidden rounded-2xl border border-slate-100 bg-white text-[#385268] shadow-2xl"
          role="menu"
        >
          <div className="divide-y divide-slate-100 py-2">
            {menuOptions.map((option) => (
              <Link
                className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-[#eaf7fc] hover:text-[#4f7f35] ${
                  option.featured ? 'text-[#4f7f35]' : 'text-[#4d6477]'
                }`}
                to={option.to}
                key={option.label}
                role="menuitem"
              >
                {option.label}
              </Link>
            ))}
            <button
              className="block w-full px-4 py-3 text-left text-sm font-medium text-[#4f7f35] transition-colors duration-200 hover:bg-[#eaf7fc]"
              type="button"
              role="menuitem"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

