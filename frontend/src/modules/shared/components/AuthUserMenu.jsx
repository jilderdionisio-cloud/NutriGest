import { ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getUserDisplayData } from '../../../context/authUtils'

const userMenuOptions = [
  { label: 'Portal Mi Salud+', to: '/dashboard' },
  { label: 'Seguridad', to: '/dashboard/perfil' },
]

function AuthUserMenu({ isOpen, menuRef, onClose, onLogout, onToggle, user }) {
  const ChevronIcon = isOpen ? ChevronUp : ChevronDown
  const { firstName, initials } = getUserDisplayData(user)

  return (
    <div className="relative z-[9999]" ref={menuRef}>
      <button
        className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[#29431f] shadow-[0_1px_0_rgba(15,122,166,0.06)] outline-none transition hover:border-[#c8ddba] hover:bg-[#f6fbfd] hover:text-[#4f7f35] sm:px-3"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#2b9fcb] text-xs font-semibold text-white">
          {initials}
        </span>
        <strong className="hidden max-w-28 truncate text-[0.84rem] font-semibold leading-none sm:inline">
          {firstName}
        </strong>
        <ChevronIcon className="flex-none" size={16} strokeWidth={2.4} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-[9999] mt-3 w-[220px] overflow-hidden rounded-xl border border-slate-100 bg-white text-[#385268] shadow-xl"
          role="menu"
        >
          <div className="divide-y divide-slate-100 py-2">
            {userMenuOptions.map((option) => (
              <Link
                className="block px-4 py-3 text-sm font-medium text-[#4d6477] no-underline transition hover:bg-[#eaf7fc] hover:text-[#4f7f35]"
                to={option.to}
                key={option.label}
                role="menuitem"
                onClick={onClose}
              >
                {option.label}
              </Link>
            ))}
            <button
              className="block w-full px-4 py-3 text-left text-sm font-medium text-[#4f7f35] transition hover:bg-[#eaf7fc]"
              type="button"
              role="menuitem"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthUserMenu
