export function isStaff(user) {
  const rawRole = user?.role ?? user?.rol ?? user?.tipoUsuario ?? user?.userType ?? ''
  const role = String(typeof rawRole === 'object' ? rawRole.name ?? rawRole.nombre ?? rawRole.code ?? '' : rawRole)
    .trim()
    .toLowerCase()
    .replace(/^role_/, '')

  return [
    'admin',
    'administrator',
    'administrador',
    'staff',
    'nutritionist',
    'nutricionista',
    'nutriologa',
    'nutrióloga',
  ].includes(role)
}
