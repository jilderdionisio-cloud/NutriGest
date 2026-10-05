function SpecialtyHighlights({ highlights }) {
  return (
    <section className="bg-white px-6 py-14 sm:px-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="text-2xl font-semibold leading-tight text-[#004b7a]">
          En NutriGest, nos destacamos por:
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <article className="overflow-hidden bg-white" key={highlight.title}>
              <img
                className="h-44 w-full rounded-xl object-cover object-center"
                src={highlight.image}
                alt={highlight.title}
              />
              <h3 className="mt-4 text-base font-semibold leading-snug text-[#004b7a]">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{highlight.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialtyHighlights
