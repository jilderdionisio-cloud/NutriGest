import { Link, useParams } from 'react-router-dom'
import Footer from '../../../home/components/Footer'
import { Header } from '../../../home/pages/HomePage'
import ReservationBanner from '../components/ReservationBanner'
import SpecialtyHero from '../components/SpecialtyHero'
import SpecialtyHighlights from '../components/SpecialtyHighlights'
import SpecialtyServices from '../components/SpecialtyServices'
import WhyChooseUs from '../components/WhyChooseUs'
import { specialtiesBySlug } from '../data/specialtiesData'

function SpecialtyDetailPage() {
  const { slug } = useParams()
  const specialty = specialtiesBySlug[slug]

  if (!specialty) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">
        <Header />
        <main className="bg-[#edf5e6] px-6 py-20 sm:px-10">
          <section className="mx-auto w-full max-w-[900px] rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-3xl font-semibold leading-tight text-[#004b7a]">Especialidad no encontrada</h1>
            <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-slate-500">
              La especialidad que buscas no está disponible en nuestra lista principal. Puedes volver al directorio para revisar las opciones activas.
            </p>
            <Link
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#4f7f35] px-7 text-sm font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:bg-[#3b5f29]"
              to="/especialidades"
            >
              Ver especialidades
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main>
        <SpecialtyHero specialty={specialty} />

        <section className="bg-white px-6 py-14 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <h2 className="text-2xl font-semibold leading-tight text-[#004b7a]">
              {specialty.mainTitle}
            </h2>
            <p className="text-sm leading-7 text-slate-500">
              {specialty.mainDescription}
            </p>
          </div>
        </section>

        <SpecialtyServices specialty={specialty} />
        <SpecialtyHighlights highlights={specialty.highlights} />
        <ReservationBanner image={specialty.heroImage} />
        <WhyChooseUs benefits={specialty.benefits} />
      </main>
      <Footer />
    </div>
  )
}

export default SpecialtyDetailPage
