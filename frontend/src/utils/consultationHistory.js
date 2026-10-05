import { calculateConsultationBmi, compareMeasurements, getConsultationMeasurements } from './clinicalMath.js'

function orderingValue(consultation, fallbackIndex = 0) {
  const timestamp = Date.parse(consultation.createdAt || '')
  return Number.isFinite(timestamp) ? timestamp : (consultation.__historyOrder ?? fallbackIndex)
}

export function sortConsultations(consultations = [], direction = 'desc') {
  return consultations.map((consultation, index) => ({ consultation, index })).sort((left, right) => {
    const dateComparison = String(left.consultation.date || '').localeCompare(String(right.consultation.date || ''))
    if (dateComparison !== 0) return direction === 'asc' ? dateComparison : -dateComparison
    const orderComparison = orderingValue(left.consultation, left.index) - orderingValue(right.consultation, right.index)
    if (orderComparison !== 0) return direction === 'asc' ? orderComparison : -orderComparison
    const idComparison = String(left.consultation.id || '').localeCompare(String(right.consultation.id || ''))
    return direction === 'asc' ? idComparison : -idComparison
  }).map(({ consultation }) => consultation)
}

export function getPreviousConsultation(consultations = [], current) {
  const originalIndex = consultations.findIndex((item) => item.id === current?.id)
  const currentOrder = originalIndex >= 0 ? originalIndex : consultations.length
  const candidates = consultations
    .filter((item) => item.id !== current?.id)
    .map((item, index) => ({ ...item, __historyOrder: index }))
  if (current) candidates.push({ ...current, __historyOrder: currentOrder })
  const ordered = sortConsultations(candidates, 'asc')
  const currentIndex = ordered.findIndex((item) => item.id === current?.id)
  return currentIndex > 0 ? ordered[currentIndex - 1] : null
}

function bmiMeasurement(consultation) {
  const value = consultation?.bmi?.value ?? consultation?.bmi ?? calculateConsultationBmi(consultation)
  return value === null || value === undefined ? null : { indicator: 'IMC', value, unit: 'kg/m²' }
}

export function buildConsultationComparison(current, previous) {
  if (!previous) return []
  const currentMeasurements = [...getConsultationMeasurements(current)]
  const previousMeasurements = [...getConsultationMeasurements(previous)]
  const currentBmi = bmiMeasurement(current)
  const previousBmi = bmiMeasurement(previous)
  if (currentBmi) currentMeasurements.push(currentBmi)
  if (previousBmi) previousMeasurements.push(previousBmi)
  const indicators = [...new Set([...previousMeasurements.map((item) => item.indicator), ...currentMeasurements.map((item) => item.indicator)])]
  return indicators.map((indicator) => {
    const currentMeasurement = currentMeasurements.find((item) => item.indicator === indicator) || null
    const previousMeasurement = previousMeasurements.find((item) => item.indicator === indicator) || null
    return { indicator, current: currentMeasurement, previous: previousMeasurement, result: compareMeasurements(currentMeasurement, previousMeasurement) }
  })
}

export function formatSignedDifference(value) {
  if (value > 0) return `+${value}`
  if (value < 0) return `−${Math.abs(value)}`
  return '0'
}
