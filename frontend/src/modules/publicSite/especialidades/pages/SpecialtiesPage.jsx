import {
  Baby,
  Bone,
  Brain,
  Ear,
  Eye,
  HeartPulse,
  Microscope,
  Search,
  ShieldPlus,
  Smile,
  Stethoscope,
  Syringe,
  UserRoundCheck,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../home/components/Footer'
import { Header } from '../../../home/pages/HomePage'
import { getSpecialtyPath, specialtiesData } from '../data/specialtiesData'

const iconSet = [
  HeartPulse,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Microscope,
  UserRoundCheck,
  Brain,
  Smile,
  Eye,
  Bone,
  Ear,
  Baby,
]

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function SpecialtiesPage() {
  const [searchValue, setSearchValue] = useState('')

  const filteredSpecialties = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue.trim())

    if (!normalizedSearch) {
      return specialtiesData
    }

    return specialtiesData.filter((specialty) => normalizeText(specialty.name).includes(normalizedSearch))
  }, [searchValue])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8faf5] text-slate-900">
      <Header />
      <main>
        <section className="bg-[#edf5e6] px-6 py-14 sm:px-10">
          <div className="mx-auto w-full max-w-[1180px]">
            <Link className="inline-flex items-center text-[0.82rem] font-medium text-[#4f7f35] no-underline transition hover:text-[#78a85a]" to="/">
              ← Regresar
            </Link>
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-[#29431f]">
              Especialidades
            </h1>
            <p className="mt-3 max-w-[560px] text-base font-normal leading-7 text-slate-500">
              Contamos con 12 especialidades principales a tu disposición
            </p>
          </div>
        </section>

        <section className="bg-white px-6 pb-16 sm:px-10">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="-mt-8 grid gap-4 rounded-2xl border border-[#c9dfbb] bg-white p-5 shadow-sm md:grid-cols-[0.8fr_1.2fr]">
              <label className="grid gap-2 text-[0.76rem] font-medium text-slate-600">
                <span>Sede</span>
                <select
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[0.86rem] font-normal text-slate-800 outline-none transition focus:border-[#a5c98a] focus:shadow-[0_0_0_4px_rgba(103,199,223,0.16)]"
                  defaultValue="Lima Centro"
                >
                  <option>Lima Centro</option>
                </select>
              </label>

              <label className="grid gap-2 text-[0.76rem] font-medium text-slate-600">
                <span>Busca por nombre</span>
                <div className="relative">
                  <input
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-11 text-[0.86rem] font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#a5c98a] focus:shadow-[0_0_0_4px_rgba(103,199,223,0.16)]"
                    type="search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Ingresa el nombre de especialidad."
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78a85a]" size={20} />
                </div>
              </label>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSpecialties.map((specialty, index) => {
                const Icon = iconSet[index % iconSet.length]

                return (
                  <article
                    className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#c9dfbb] hover:shadow-[0_18px_34px_rgba(15,122,166,0.10)]"
                    key={specialty.slug}
                  >
                    <div className="flex min-h-[92px] items-start gap-4">
                      <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-[#edf5e6] text-[#78a85a] transition group-hover:bg-[#e0efd3] group-hover:text-[#4f7f35]">
                        <Icon size={24} strokeWidth={1.9} />
                      </span>
                      <div>
                        <h2 className="text-base font-semibold leading-6 text-[#36532a]">{specialty.name}</h2>
                        <Link className="mt-3 inline-flex text-[0.78rem] font-medium text-[#78a85a] no-underline transition hover:text-[#4f7f35]" to={getSpecialtyPath(specialty.slug)}>
                          Ver detalle →
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {filteredSpecialties.length === 0 && (
              <p className="mt-10 rounded-2xl border border-slate-100 bg-[#f7fbfd] px-5 py-4 text-center text-[0.88rem] font-medium text-slate-500">
                No encontramos especialidades con ese nombre.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default SpecialtiesPage
