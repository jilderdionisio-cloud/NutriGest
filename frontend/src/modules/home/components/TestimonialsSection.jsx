import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInLeft, fadeInRight, fadeInUp } from '../../../utils/animations'

function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(1)

  return (
    <motion.section
      className="bg-white px-6 py-16 sm:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <motion.div
        className="mx-auto grid w-full max-w-[1180px] gap-8 rounded-2xl border border-slate-100 bg-[#f2fbfe] px-6 py-10 text-left shadow-sm sm:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center"
        variants={fadeInUp}
      >
        <motion.div variants={fadeInLeft}>
          <span className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#78a85a]">
            Más de 70 mil atenciones
          </span>
          <h2 className="mt-3 max-w-[390px] text-2xl font-semibold leading-tight text-[#29431f] sm:text-3xl">
            Conoce los testimonios
          </h2>
        </motion.div>

        <motion.div className="w-full" variants={fadeInRight}>
          <motion.article
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
          >
            <Quote className="text-[#78a85a]" size={30} strokeWidth={2} />
            <p className="mt-4 text-[1rem] font-medium leading-8 text-[#344b5f]">
              La atención fue rápida y muy humana. Me orientaron desde la reserva de la cita hasta la entrega de mis resultados, con médicos atentos y un equipo siempre dispuesto a ayudar.
            </p>
            <div className="mt-6 border-t border-[#e2eef4] pt-5">
              <h3 className="text-base font-semibold text-[#29431f]">Walter Luna</h3>
              <p className="mt-1 text-[0.82rem] font-semibold text-[#6a7d8d]">Paciente de la clínica</p>
            </div>
          </motion.article>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex gap-2" aria-label="Controles del carrusel de testimonios">
              <motion.button
                className="grid h-9 w-9 place-items-center rounded-full border border-[#cde6f0] bg-white text-[#4f7f35] shadow-sm transition hover:bg-[#e7f7fc]"
                type="button"
                aria-label="Testimonio anterior"
                onClick={() => setActiveTestimonial((current) => (current === 1 ? 3 : current - 1))}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                className="grid h-9 w-9 place-items-center rounded-full border border-[#cde6f0] bg-white text-[#4f7f35] shadow-sm transition hover:bg-[#e7f7fc]"
                type="button"
                aria-label="Testimonio siguiente"
                onClick={() => setActiveTestimonial((current) => (current === 3 ? 1 : current + 1))}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
            <div className="flex items-center gap-2" aria-hidden="true">
              {[1, 2, 3].map((item) => (
                <span className={`${activeTestimonial === item ? 'w-7 bg-[#4f7f35]' : 'w-2.5 bg-[#b8ddeb]'} h-2.5 rounded-full`} key={item} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default TestimonialsSection
