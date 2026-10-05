import { Link } from 'react-router-dom'

function SpecialtyHero({ specialty }) {
  const imageFirst = specialty.layoutVariant === 'left-image'

  const textContent = (
    <div className="relative z-10">
      <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#78a85a]">Especialidad</span>
      <h1 className="mt-4 max-w-[680px] text-3xl font-semibold leading-tight text-[#004b7a] sm:text-4xl lg:text-[2.7rem]">
        {specialty.name}
      </h1>
      <p className="mt-5 max-w-[650px] text-sm leading-6 text-[#245b75] sm:text-base sm:leading-7">
        {specialty.heroDescription}
      </p>
      <Link
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#006aa6] px-7 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#005d91]"
        to="/reserva-cita"
      >
        Reservar cita
      </Link>
    </div>
  )

  const imageContent = (
    <div className="relative mx-auto w-full max-w-[490px]">
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-bl-[4rem] rounded-tr-[4rem] bg-[#7fd0ef]" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[#aee5f3]" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_22px_38px_rgba(15,122,166,0.14)]">
        <img
          className="h-[270px] w-full object-cover object-center sm:h-[340px]"
          src={specialty.heroImage}
          alt={`Atención de ${specialty.name}`}
        />
      </div>
    </div>
  )

  return (
    <section className="relative overflow-hidden bg-[#dff5fc] px-6 py-12 sm:px-10 lg:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_0.86fr]">
        {imageFirst ? (
          <>
            <div className="lg:order-1">{imageContent}</div>
            <div className="lg:order-2">{textContent}</div>
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </section>
  )
}

export default SpecialtyHero
