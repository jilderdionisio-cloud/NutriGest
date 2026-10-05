import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

function ReservationBanner({ image }) {
  return (
    <section className="bg-white px-6 py-12 sm:px-10">
      <div className="mx-auto grid w-full max-w-[1180px] overflow-hidden rounded-[2rem] bg-[#2f9fcb] text-white lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[270px] bg-[#dff5fc]">
          <div className="absolute left-8 top-10 h-20 w-56 rounded-full bg-[#8bd8ec]" aria-hidden="true" />
          <img
            className="absolute bottom-0 left-1/2 h-[108%] -translate-x-1/2 object-contain"
            src={image}
            alt="Reserva de cita desde la web"
          />
        </div>
        <div className="px-8 py-10 sm:px-12">
          <h2 className="max-w-[520px] text-2xl font-semibold leading-tight">
            Reserva tu cita de manera fácil, rápida y segura desde nuestra web
          </h2>
          <ul className="mt-6 grid gap-3 text-sm leading-6 text-white/90">
            <li className="flex gap-3"><Check size={18} /> Agenda citas para ti y tus familiares.</li>
            <li className="flex gap-3"><Check size={18} /> Revisa coberturas y pagos.</li>
            <li className="flex gap-3"><Check size={18} /> Revisa tu historial clínico, recetas y órdenes médicas.</li>
          </ul>
          <Link
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#005d91] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#004d79]"
            to="/login"
          >
            Ir a Mi Salud+
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ReservationBanner
