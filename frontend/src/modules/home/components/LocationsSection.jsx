import { CheckCircle2, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInLeft, fadeInUp, staggerContainer } from '../../../utils/animations'

const locations = [
  {
    name: 'NutriGest Los Olivos',
    address: 'Av. Carlos Izaguirre 1245, Los Olivos, Lima',
    phone: '(01) 640 9200',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Av.%20Carlos%20Izaguirre%201245%2C%20Los%20Olivos%2C%20Lima',
  },
  {
    name: 'NutriGest Lima Centro',
    address: 'Av. Garcilaso de la Vega 980, Lima Centro',
    phone: '(01) 640 9300',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Av.%20Garcilaso%20de%20la%20Vega%20980%2C%20Lima%20Centro',
  },
]

const services = ['Atención ambulatoria', 'Emergencia', 'Hospitalización', 'Imágenes y laboratorio']

function LocationsSection() {
  return (
    <motion.section
      className="bg-white px-6 py-16 sm:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="mx-auto grid w-full max-w-[1180px] gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <motion.div variants={fadeInLeft}>
          <span className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#78a85a]">
            Vive la experiencia
          </span>
          <h2 className="mt-3 max-w-[430px] text-2xl font-semibold leading-tight text-[#29431f] sm:text-3xl">
            Visítanos en la sede de tu preferencia
          </h2>
        </motion.div>

        <motion.div className="grid gap-5 md:grid-cols-2" variants={staggerContainer}>
          {locations.map((location) => (
            <motion.article
              className="rounded-2xl border border-[#c9dfbb] bg-white p-6 text-slate-700 shadow-sm"
              key={location.name}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-semibold leading-tight text-[#29431f]">{location.name}</h3>

              <div className="mt-5 grid gap-3 text-[0.86rem] font-normal leading-6 text-slate-600">
                <p className="flex gap-3">
                  <MapPin className="mt-1 flex-none text-[#78a85a]" size={18} />
                  <span>{location.address}</span>
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-1 flex-none text-[#78a85a]" size={18} />
                  <span>{location.phone}</span>
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#4f7f35]">Servicios destacados</p>
                <ul className="mt-3 grid gap-2.5">
                  {services.map((service) => (
                    <li className="flex items-center gap-2 text-[0.84rem] font-normal text-slate-600" key={service}>
                      <CheckCircle2 className="flex-none text-[#78a85a]" size={17} />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#4f7f35] px-5 text-[0.82rem] font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3b5f29]"
                type="button"
                onClick={() => window.open(location.mapUrl, '_blank', 'noopener,noreferrer')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Ver en Google Maps
              </motion.button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default LocationsSection
