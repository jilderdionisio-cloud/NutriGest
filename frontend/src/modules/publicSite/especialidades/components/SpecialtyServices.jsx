function SpecialtyServices({ specialty }) {
  const isHorizontal = specialty.servicesLayout === 'horizontal'
  const gridClass = specialty.servicesLayout === 'grid-2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  const sectionBg = specialty.sectionTone === 'light' ? 'bg-[#edf5e6]' : 'bg-white'

  return (
    <section className={`${sectionBg} px-6 py-14 sm:px-10`}>
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="max-w-[920px] text-2xl font-semibold leading-tight text-[#004b7a]">
          Servicios y atenciones de {specialty.name}
        </h2>

        <div className={`mt-8 grid gap-6 ${isHorizontal ? 'lg:grid-cols-2' : `md:grid-cols-2 ${gridClass}`}`}>
          {specialty.services.map((service) => (
            <article
              className={`overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,122,166,0.10)] ${
                isHorizontal ? 'sm:grid sm:grid-cols-[180px_1fr]' : ''
              }`}
              key={service.title}
            >
              <img
                className={`${isHorizontal ? 'h-48 sm:h-full' : 'h-48'} w-full object-cover object-center`}
                src={service.image}
                alt={service.title}
              />
              <div className="p-5">
                <h3 className="text-base font-semibold leading-tight text-[#006aa6]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialtyServices
