import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-auto border-t border-[#dce6d5] bg-[#fffdf8] px-5 py-10 text-[#61705d]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className="text-xl font-bold tracking-tight text-[#315b2d] no-underline">Nutri<span className="text-[#d87b49]">Gest</span></Link>
          <p className="mt-2 text-sm">Gestión y seguimiento para profesionales de nutrición.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <Link className="hover:text-[#315b2d]" to="/nosotros">Nosotros</Link>
          <Link className="hover:text-[#315b2d]" to="/contacto">Contáctanos</Link>
          <Link className="hover:text-[#315b2d]" to="/registro">Registro</Link>
          <Link className="hover:text-[#315b2d]" to="/login">Ingresar</Link>
        </nav>
      </div>
      <p className="mx-auto mt-7 max-w-6xl border-t border-[#e5ecdf] pt-5 text-xs">© {new Date().getFullYear()} NutriGest. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
