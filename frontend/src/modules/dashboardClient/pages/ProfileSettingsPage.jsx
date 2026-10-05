import { ChevronRight, Loader2, Lock, Pencil, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getUserDisplayData } from '../../../context/authUtils'
import { useAuth } from '../../../context/useAuth'
import { changePassword, getMyProfile, updateContact } from '../../../services/profileService'
import DashboardLayout from '../components/DashboardLayout'

const profileTabs = [
  {
    id: 'account',
    title: 'Cuenta',
    subtitle: 'Administra tu perfil',
    icon: User,
  },
  {
    id: 'security',
    title: 'Seguridad',
    subtitle: 'Cambia tu contraseña',
    icon: Lock,
  },
]

function ProfileSettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSection = searchParams.get('section') === 'security' ? 'security' : 'account'
  const { user, updateUser } = useAuth()
  const [profile, setProfile] = useState(user)
  const [contactModal, setContactModal] = useState(null)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      try {
        const profileData = await getMyProfile()

        if (isMounted) {
          setProfile(profileData)
          updateUser(profileData)
        }
      } catch (requestError) {
        if (isMounted) {
          window.alert(getRequestMessage(requestError, 'No se pudo cargar tu perfil.'))
        }
      }
    }

    loadProfile()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSectionChange(sectionId) {
    setSearchParams(sectionId === 'security' ? { section: 'security' } : {})
  }

  function handleEditContact(type) {
    setSuccessMessage('')
    setContactModal({
      type,
      value: type === 'email' ? getEmail(profile) : profile?.celular || '',
    })
  }

  async function handleSaveContact(type, value) {
    const payload = { [type]: value.trim() }
    const response = await updateContact(payload)
    const updatedContact = response?.usuario ?? response
    const nextProfile = {
      ...(profile ?? {}),
      email: updatedContact.email ?? profile?.email,
      correo: updatedContact.email ?? profile?.correo,
      celular: updatedContact.celular ?? profile?.celular,
    }

    setProfile(nextProfile)
    updateUser(nextProfile)
    setSuccessMessage(response?.message ?? 'Datos de contacto actualizados correctamente.')
  }

  function handleChangePassword() {
    setSuccessMessage('')
    setPasswordModalOpen(true)
  }

  async function handleSavePassword(payload) {
    const response = await changePassword(payload)
    setSuccessMessage(response?.message ?? 'Contraseña actualizada correctamente.')
  }

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-66px)] bg-[#f8faf5]">
        <div className="mx-auto flex w-full max-w-[1180px] items-center gap-2 px-6 py-5 text-sm font-medium text-slate-500 lg:px-10">
          <Link className="transition-colors hover:text-[#4f7f35]" to="/dashboard">
            Inicio
          </Link>
          <ChevronRight size={15} strokeWidth={2.3} />
          <span className="text-[#29431f]">Mi perfil</span>
        </div>

        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 px-6 pb-10 lg:min-h-[calc(100vh-128px)] lg:grid-cols-[320px_minmax(0,1fr)] lg:px-10">
          <aside className="flex items-start rounded-2xl border border-[#d3eaf4] bg-white px-5 py-6 shadow-sm">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-[#29431f]">Configuración</h1>

              <div className="grid gap-4">
                {profileTabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeSection === tab.id

                  return (
                    <button
                      className={`flex min-h-[78px] w-full items-center gap-4 rounded-2xl border bg-white px-4 text-left transition-all duration-200 ${
                        isActive
                          ? 'border-[#c8ddba] bg-[#f6fbfd] shadow-sm'
                          : 'border-transparent hover:border-slate-200 hover:bg-[#f8fbfd]'
                      }`}
                      type="button"
                      key={tab.id}
                      onClick={() => handleSectionChange(tab.id)}
                    >
                      <span
                        className={`grid h-11 w-11 flex-none place-items-center rounded-full ${
                          isActive ? 'bg-[#eaf7fc] text-[#4f7f35]' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon size={21} strokeWidth={2.1} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.95rem] font-medium text-[#29431f]">
                          {tab.title}
                        </span>
                        <span className="mt-1 block text-sm text-slate-500">{tab.subtitle}</span>
                      </span>
                      <ChevronRight
                        className={isActive ? 'text-[#4f7f35]' : 'text-slate-400'}
                        size={19}
                        strokeWidth={2.3}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          <section className="rounded-2xl border border-[#d3eaf4] bg-white px-6 py-8 shadow-sm lg:px-10">
            {successMessage && activeSection === 'account' && (
              <div className="mx-auto mb-5 max-w-[720px] rounded-[8px] border border-[#c8ddba] bg-white px-4 py-2 text-[12px] text-[#4f7f35]">
                {successMessage}
              </div>
            )}
            {activeSection === 'account' ? (
              <AccountSection profile={profile} onEditContact={handleEditContact} />
            ) : (
              <SecuritySection onChangePassword={handleChangePassword} />
            )}
          </section>
        </div>
      </div>
      {contactModal && (
        <ContactEditModal
          type={contactModal.type}
          initialValue={contactModal.value}
          onClose={() => setContactModal(null)}
          onSave={handleSaveContact}
        />
      )}
      {passwordModalOpen && (
        <PasswordChangeModal
          onClose={() => setPasswordModalOpen(false)}
          onSave={handleSavePassword}
        />
      )}
    </DashboardLayout>
  )
}

function AccountSection({ profile, onEditContact }) {
  const { fullName } = getUserDisplayData(profile)
  const personalData = [
    { label: 'Nombres y apellidos', value: fullName },
    { label: 'Fecha de nacimiento', value: profile?.fechaNacimiento || 'No registrado' },
    { label: 'Tipo de documento', value: profile?.tipoDocumento || 'No registrado' },
    { label: 'No documento', value: profile?.numeroDocumento || profile?.documento || 'No registrado' },
  ]
  const contactData = [
    {
      label: 'Correo electrónico',
      value: getEmail(profile) || 'No registrado',
      onEdit: () => onEditContact('email'),
    },
    {
      label: 'Celular',
      value: profile?.celular || 'No registrado',
      onEdit: () => onEditContact('celular'),
    },
  ]

  return (
    <div className="mx-auto max-w-[720px]">
      <h2 className="mb-8 text-2xl font-semibold text-[#29431f]">Cuenta</h2>

      <section>
        <h3 className="mb-5 text-base font-semibold text-[#29431f]">Datos personales</h3>
        <div className="grid gap-5">
          {personalData.map((field) => (
            <ProfileField label={field.label} value={field.value} key={field.label} />
          ))}
        </div>
      </section>

      <hr className="my-8 border-slate-200" />

      <section>
        <h3 className="mb-5 text-base font-semibold text-[#29431f]">Datos de contacto</h3>
        <div className="grid gap-5">
          {contactData.map((field) => (
            <ProfileField
              label={field.label}
              value={field.value}
              key={field.label}
              editable
              onEdit={field.onEdit}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function SecuritySection({ onChangePassword }) {
  return (
    <div className="mx-auto max-w-[720px]">
      <h2 className="mb-8 text-2xl font-semibold text-[#29431f]">Seguridad</h2>

      <section className="rounded-2xl border border-[#d3eaf4] bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#29431f]">Cambiar contraseña</h3>
        <p className="mt-2 text-sm text-slate-500">
          Actualiza tu contraseña para mantener tu cuenta protegida.
        </p>
        <button
          className="mt-6 rounded-xl bg-[#4f7f35] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3b5f29] hover:shadow-[0_14px_26px_rgba(15,122,166,0.16)]"
          type="button"
          onClick={onChangePassword}
        >
          Actualizar contraseña
        </button>
      </section>
    </div>
  )
}

function ProfileField({ label, value, editable = false, onEdit }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)_auto] sm:items-center">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="min-w-0 break-words text-sm font-medium text-[#29431f]">{value}</span>
      {editable && (
        <button
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#4f7f35] transition-colors hover:text-[#3b5f29]"
          type="button"
          onClick={onEdit}
        >
          <Pencil size={15} strokeWidth={2.2} />
          Editar
        </button>
      )}
    </div>
  )
}

function ContactEditModal({ type, initialValue, onClose, onSave }) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEmail = type === 'email'

  const handleSubmit = async (event) => {
    event.preventDefault()
    const normalizedValue = value.trim()
    const validationError = isEmail ? validateEmail(normalizedValue) : validateCelular(normalizedValue)

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await onSave(type, normalizedValue)
      onClose()
    } catch (requestError) {
      setError(getRequestMessage(requestError, 'No se pudo guardar el cambio.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 px-4 py-6 backdrop-blur-[1px]">
      <form
        className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onSubmit={handleSubmit}
      >
        <header className="flex items-start justify-between gap-4 px-5 py-5">
          <div>
            <h2 className="m-0 text-[20px] font-semibold leading-tight text-[#29431f]">
              {isEmail ? 'Editar correo electrónico' : 'Editar celular'}
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-500">
              {isEmail ? 'Ingresa tu nuevo correo electrónico.' : 'Ingresa tu nuevo número celular.'}
            </p>
          </div>
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            aria-label="Cerrar edición"
            disabled={isSubmitting}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </header>

        <div className="h-px w-full bg-slate-200" />

        <div className="px-5 py-5">
          <label className="grid gap-2 text-sm font-medium text-[#29431f]">
            <span>{isEmail ? 'Correo electrónico' : 'Celular'}</span>
            <input
              className="h-11 rounded-xl border border-[#d3eaf4] bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#4f7f35] focus:ring-4 focus:ring-[#78a85a]/15"
              type={isEmail ? 'email' : 'tel'}
              value={value}
              disabled={isSubmitting}
              onChange={(event) => {
                setValue(event.target.value)
                setError('')
              }}
            />
          </label>
          {error && <p className="mt-3 text-[12px] font-medium text-[#DC2626]">{error}</p>}
        </div>

        <div className="h-px w-full bg-slate-200" />

        <footer className="flex justify-end gap-3 px-5 py-4">
          <button
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#4f7f35] px-5 text-[13px] font-medium text-white transition hover:bg-[#3b5f29] disabled:cursor-not-allowed disabled:bg-slate-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" size={15} />}
            Guardar
          </button>
        </footer>
      </form>
    </div>
  )
}

function PasswordChangeModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    passwordActual: '',
    nuevaPassword: '',
    confirmarPassword: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validatePasswordChange(form.passwordActual, form.nuevaPassword, form.confirmarPassword)

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await onSave(form)
      onClose()
    } catch (requestError) {
      setError(getRequestMessage(requestError, 'No se pudo actualizar la contraseña.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 px-4 py-6 backdrop-blur-[1px]">
      <form
        className="w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onSubmit={handleSubmit}
      >
        <header className="flex items-start justify-between gap-4 px-5 py-5">
          <div>
            <h2 className="m-0 text-[20px] font-semibold leading-tight text-[#29431f]">
              Actualizar contraseña
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-500">
              Ingresa tu contraseña actual y define una nueva contraseña.
            </p>
          </div>
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            aria-label="Cerrar actualización de contraseña"
            disabled={isSubmitting}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </header>

        <div className="h-px w-full bg-slate-200" />

        <div className="grid gap-4 px-5 py-5">
          <PasswordField
            label="Contraseña actual"
            value={form.passwordActual}
            disabled={isSubmitting}
            onChange={(value) => updateField('passwordActual', value)}
          />
          <PasswordField
            label="Nueva contraseña"
            value={form.nuevaPassword}
            disabled={isSubmitting}
            onChange={(value) => updateField('nuevaPassword', value)}
          />
          <PasswordField
            label="Confirmar nueva contraseña"
            value={form.confirmarPassword}
            disabled={isSubmitting}
            onChange={(value) => updateField('confirmarPassword', value)}
          />
          {error && <p className="m-0 text-[12px] font-medium text-[#DC2626]">{error}</p>}
        </div>

        <div className="h-px w-full bg-slate-200" />

        <footer className="flex justify-end gap-3 px-5 py-4">
          <button
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#4f7f35] px-5 text-[13px] font-medium text-white transition hover:bg-[#3b5f29] disabled:cursor-not-allowed disabled:bg-slate-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" size={15} />}
            Guardar contraseña
          </button>
        </footer>
      </form>
    </div>
  )
}

function PasswordField({ label, value, disabled, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#29431f]">
      <span>{label}</span>
      <input
        className="h-11 rounded-xl border border-[#d3eaf4] bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#4f7f35] focus:ring-4 focus:ring-[#78a85a]/15"
        type="password"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function getEmail(profile) {
  return profile?.email || profile?.correo || ''
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? ''
    : 'Ingresa un correo electrónico válido.'
}

function validateCelular(value) {
  return /^9\d{8}$/.test(value) ? '' : 'Ingresa un celular peruano válido de 9 dígitos.'
}

function validatePasswordChange(currentPassword, newPassword, confirmPassword) {
  if (!currentPassword) return 'Ingresa tu contraseña actual.'
  if (!newPassword) return 'Ingresa tu nueva contraseña.'
  if (!confirmPassword) return 'Confirma tu nueva contraseña.'
  if (newPassword.length < 8) return 'La nueva contraseña debe tener al menos 8 caracteres.'
  if (newPassword !== confirmPassword) return 'Las contraseñas no coinciden.'
  if (currentPassword === newPassword) return 'La nueva contraseña debe ser distinta a la actual.'
  return ''
}

function getRequestMessage(error, fallbackMessage) {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0] ||
    error?.message ||
    fallbackMessage
  )
}

export default ProfileSettingsPage
