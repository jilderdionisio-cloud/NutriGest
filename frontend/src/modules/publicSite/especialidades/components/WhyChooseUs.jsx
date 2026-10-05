import { CalendarClock, FileHeart, HeartHandshake, Stethoscope } from 'lucide-react'

const icons = [HeartHandshake, CalendarClock, FileHeart, Stethoscope]

function WhyChooseUs({ benefits }) {
  return (
    <section className="bg-white px-6 py-14 sm:px-10">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[0.58fr_1fr] lg:items-center">
        <h2 className="text-2xl font-semibold leading-tight text-[#004b7a]">¿Por qué elegirnos?</h2>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = icons[index % icons.length]

            return (
              <article className="text-center" key={benefit.title}>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f8fd] text-[#78a85a]">
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 text-base font-semibold leading-tight text-[#006aa6]">{benefit.title}</h3>
                <p className="mx-auto mt-2 max-w-[250px] text-sm leading-6 text-slate-500">{benefit.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
