import { CheckCircle2 } from 'lucide-react'
import PublicLayout from '../../components/PublicLayout'
import clinicImage from '../../../../assets/images/nosotros/clinica-salud-mas.webp'
import patientCareImage from '../../../../assets/images/nosotros/atencion-medica-humana.webp'

const sections = [
  {
    title: 'Información organizada',
    description: 'El sistema concentra expedientes, consultas y mediciones para apoyar el seguimiento nutricional.',
  },
  {
    title: 'Seguimiento entre consultas',
    description: 'La evolución se presenta con valores, fechas y unidades, sin sustituir la interpretación profesional.',
  },
  {
    title: 'Revisión profesional',
    description: 'Las notas y decisiones clínicas permanecen bajo revisión de la nutrióloga responsable.',
  },
]

function ClinicInfoPage() {
  return (
    <PublicLayout>
      <main>
        <section className="relative overflow-hidden bg-[#edf5e6] px-6 py-16 sm:px-10 lg:py-20">
          <div className="absolute right-0 top-0 hidden h-full w-[42%] bg-[#cce2bb] lg:block" aria-hidden="true" />
          <div className="absolute bottom-8 right-8 hidden h-36 w-36 rounded-full bg-[#dff5fc] lg:block" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#78a85a]">Nosotros</span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#29431f] sm:text-5xl">NutriGest</h1>
              <p className="mt-5 max-w-[560px] text-base leading-7 text-slate-600">
                Una aplicación para organizar el seguimiento realizado en un consultorio de nutrición.
              </p>
            </div>
            <img className="relative z-10 h-[320px] w-full rounded-[8px] object-cover object-center shadow-sm sm:h-[390px]" src={clinicImage} alt="NutriGest" />
          </div>
        </section>

        <section className="bg-white px-6 py-16 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-6 md:grid-cols-3">
            {sections.map((section) => (
              <article className="rounded-[8px] border border-slate-100 bg-white p-7 shadow-sm" key={section.title}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#edf5e6] text-[#78a85a]">
                  <CheckCircle2 size={22} />
                </span>
                <h2 className="mt-5 text-xl font-semibold text-[#29431f]">{section.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">{section.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f8faf5] px-6 py-16 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <img className="h-[300px] w-full rounded-[8px] object-cover object-center" src={patientCareImage} alt="Atención médica" />
            <div>
              <h2 className="text-2xl font-semibold text-[#29431f]">Alcance del sistema</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                NutriGest apoya el registro y consulta de información. No sustituye la valoración profesional ni genera diagnósticos o prescripciones automáticamente.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}

export default ClinicInfoPage
