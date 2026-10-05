import { CalendarCheck, HeartPulse, ShieldCheck } from 'lucide-react'
import Footer from '../../../home/components/Footer'
import { Header } from '../../../home/pages/HomePage'
import medicalTeamImage from '../../../../assets/images/nosotros/nosotros-equipo-medico.webp'
import historyImage from '../../../../assets/images/nosotros/historia-equipo-medico.webp'

const milestones = [
  {
    title: 'Nuestros inicios',
    description: 'Nacimos con la meta de acercar atención médica confiable, oportuna y humana a más familias.',
    icon: HeartPulse,
  },
  {
    title: 'Crecimiento y modernización',
    description: 'Fuimos ampliando servicios, espacios y tecnología para responder mejor a las necesidades de nuestros pacientes.',
    icon: CalendarCheck,
  },
  {
    title: 'Nuestra misión de servicio',
    description: 'Seguimos trabajando para brindar una atención cercana, segura y centrada en el bienestar de cada persona.',
    icon: ShieldCheck,
  },
]

function OurHistoryPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#edf5e6] px-6 py-16 sm:px-10 lg:py-20">
          <div className="absolute right-0 top-0 hidden h-full w-[42%] bg-[#cce2bb] lg:block" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#78a85a]">Nosotros</span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#29431f] sm:text-5xl">Nuestra historia</h1>
              <p className="mt-5 max-w-[620px] text-base leading-7 text-slate-600">
                Una clínica creada para acercar servicios de salud de calidad a más familias.
              </p>
            </div>
            <img className="relative z-10 h-[320px] w-full rounded-[8px] object-cover object-center shadow-sm sm:h-[390px]" src={historyImage} alt="Nuestra historia" />
          </div>
        </section>

        <section className="bg-white px-6 py-16 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-6 md:grid-cols-3">
            {milestones.map((item) => {
              const Icon = item.icon

              return (
                <article className="rounded-[8px] border border-slate-100 bg-white p-7 shadow-sm" key={item.title}>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#edf5e6] text-[#78a85a]">
                    <Icon size={22} />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold text-[#29431f]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="bg-[#f8faf5] px-6 py-16 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <img className="h-[300px] w-full rounded-[8px] object-cover object-center" src={medicalTeamImage} alt="Equipo médico" />
            <div>
              <h2 className="text-2xl font-semibold text-[#29431f]">Una historia que sigue creciendo</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Cada etapa nos impulsa a mejorar nuestros servicios, fortalecer nuestro equipo y brindar experiencias de salud más humanas.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default OurHistoryPage
