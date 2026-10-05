import { Activity, ClipboardCheck, FileHeart, UsersRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../../utils/animations'

const stats = [
  { value: '+6,000', label: 'Historias clínicas creadas', icon: FileHeart },
  { value: '+495,000', label: 'Atenciones en consultas externas', icon: ClipboardCheck },
  { value: '+3,200', label: 'Consultas seguras realizadas', icon: Activity },
  { value: '+45,000', label: 'Pacientes atendidos', icon: UsersRound },
]

function StatsSection() {
  return (
    <motion.section
      className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-4 px-0 py-14 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <motion.article
            className="rounded-2xl border border-slate-100 bg-white px-5 py-6 text-left shadow-sm"
            key={stat.label}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
          >
            <Icon className="mb-5 text-[#78a85a]" size={28} strokeWidth={1.8} />
            <strong className="block text-3xl font-semibold leading-none text-[#4f7f35]">{stat.value}</strong>
            <span className="mt-3 block text-[0.82rem] font-medium leading-5 text-[#63745d]">{stat.label}</span>
          </motion.article>
        )
      })}
    </motion.section>
  )
}

export default StatsSection
