import nutritionImage from '../../../../assets/images/nutrition-consultation.png'

const service = (title, description) => ({ title, description, image: nutritionImage })
const benefits = [
  { title: 'Atención cercana', description: 'Un espacio para conversar sobre tus hábitos y objetivos.' },
  { title: 'Planes prácticos', description: 'Orientación que considera tu rutina y preferencias.' },
  { title: 'Seguimiento ordenado', description: 'Registra avances y ajusta tus próximos pasos.' },
]
const highlights = [
  { title: 'Evaluación completa', description: 'Revisamos hábitos, objetivos y necesidades nutricionales.', image: nutritionImage },
  { title: 'Planificación realista', description: 'Construimos opciones para tu día a día.', image: nutritionImage },
  { title: 'Acompañamiento continuo', description: 'Mantén visibles tus metas y próximos controles.', image: nutritionImage },
]
const createService = (slug, name, description, services, layoutVariant = 'right-image') => ({
  slug, name, heroDescription: description, mainTitle: `${name} para hábitos que se adaptan a tu vida`,
  mainDescription: 'Encuentra orientación nutricional clara, personalizada y centrada en cambios graduales.',
  layoutVariant, servicesLayout: 'grid-2', sectionTone: layoutVariant === 'right-image' ? 'light' : 'white',
  heroImage: nutritionImage, services: services.map(([title, detail]) => service(title, detail)), highlights, benefits,
})
export const specialtiesData = [
  createService('nutricion', 'Consulta nutricional', 'Una consulta para entender tu alimentación actual y definir objetivos alcanzables.', [['Primera consulta', 'Conoce tu punto de partida y organiza prioridades.'], ['Revisión de hábitos', 'Identifica rutinas que quieres conservar o ajustar.'], ['Plan de acción', 'Define pasos concretos para tu próxima semana.']]),
  createService('evaluacion-nutricional', 'Evaluación nutricional', 'Revisamos información relevante para orientar mejor tu proceso alimentario.', [['Historia alimentaria', 'Conversación guiada sobre comidas y horarios.'], ['Mediciones de referencia', 'Registra datos útiles para tus metas.'], ['Objetivos personalizados', 'Prioriza cambios que tengan sentido para ti.']]),
  createService('plan-alimentacion', 'Plan de alimentación', 'Opciones flexibles para organizar tu día sin fórmulas rígidas.', [['Menú semanal', 'Ideas para distribuir comidas durante la semana.'], ['Lista de compras', 'Apoyo para elegir alimentos y planificar.'], ['Equivalencias prácticas', 'Alternativas para tus elecciones cotidianas.']]),
  createService('seguimiento-nutricional', 'Seguimiento nutricional', 'Revisa avances, dificultades y próximos ajustes en cada encuentro.', [['Revisión de avances', 'Observa cambios y aprendizajes de tu proceso.'], ['Ajuste del plan', 'Actualiza opciones según tu rutina actual.'], ['Metas siguientes', 'Define un siguiente paso claro y alcanzable.']]),
  createService('nutricion-familiar', 'Nutrición para familias', 'Ideas para construir comidas cotidianas que funcionen para toda la familia.', [['Organización en casa', 'Planifica comidas y colaciones de forma sencilla.'], ['Cocina cotidiana', 'Alternativas prácticas para distintos gustos.'], ['Hábitos compartidos', 'Crea rutinas más conscientes.']]),
  createService('alimentacion-activa', 'Alimentación activa', 'Acompañamiento para coordinar alimentación, movimiento y descanso.', [['Rutina y energía', 'Organiza comidas alrededor de tus actividades.'], ['Recuperación diaria', 'Explora opciones después de entrenar.'], ['Planificación flexible', 'Ajusta horarios a tu ritmo.']]),
]
export const specialtiesBySlug = specialtiesData.reduce((result, specialty) => ({ ...result, [specialty.slug]: specialty }), {})
export const getSpecialtyPath = (slug) => `/especialidades/${slug}`
