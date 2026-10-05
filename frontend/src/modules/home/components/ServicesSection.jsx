import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInLeft, fadeInUp, staggerContainer } from '../../../utils/animations'

const services = [
  'Consulta nutricional',
  'Evaluación de hábitos',
  'Análisis de composición corporal',
  'Plan de alimentación personalizado',
  'Seguimiento de objetivos',
  'Educación alimentaria',
  'Planificación de compras',
  'Nutrición para familias',
]

function ServicesSection() {
  return (
    <motion.section
      className="bg-[#f1f7ea] px-6 py-16 sm:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 text-left lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div variants={fadeInLeft}>
          <span className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#78a85a]">Conoce nuestros servicios</span>
          <h2 className="mt-3 max-w-[420px] text-2xl font-semibold leading-tight text-[#29431f] sm:text-3xl">
            Servicios para comer mejor y sentirte bien
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2" variants={staggerContainer}>
          {services.map((service) => (
            <motion.div
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
              key={service}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <CheckCircle2 className="flex-none text-[#78a85a]" size={20} strokeWidth={2} />
              <span className="text-[0.86rem] font-medium text-slate-700">{service}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ServicesSection
