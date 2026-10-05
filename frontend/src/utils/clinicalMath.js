const round = (value) => Number(Number(value).toFixed(2))

export function calculateBmi(weightKg, heightValue, heightUnit = 'm') {
  const weight = Number(weightKg)
  const rawHeight = Number(heightValue)
  const height = heightUnit === 'cm' ? rawHeight / 100 : rawHeight
  if (!Number.isFinite(weight) || !Number.isFinite(height) || weight <= 0 || height <= 0) return null
  return round(weight / (height * height))
}

const conversions = {
  Peso: { kg: { unit: 'kg', convert: (value) => value }, g: { unit: 'kg', convert: (value) => value / 1000 } },
  Altura: { m: { unit: 'm', convert: (value) => value }, cm: { unit: 'm', convert: (value) => value / 100 } },
  'Circunferencia de cintura': { cm: { unit: 'cm', convert: (value) => value }, m: { unit: 'cm', convert: (value) => value * 100 } },
}

function normalizeMeasurement(measurement) {
  if (!measurement || measurement.value === '' || measurement.value === null || measurement.value === undefined) return null
  const value = Number(measurement.value)
  if (!Number.isFinite(value)) return null
  if (measurement.unit === '%') return { value, unit: 'puntos porcentuales' }
  const conversion = conversions[measurement.indicator]?.[measurement.unit]
  if (conversion) return { value: conversion.convert(value), unit: conversion.unit }
  return { value, unit: measurement.unit }
}

export function compareMeasurements(current, reference) {
  if (!current || !reference) return { ok: false, message: 'Sin dato' }
  if (current.indicator !== reference.indicator) return { ok: false, message: 'Los indicadores no son compatibles.' }
  const normalizedCurrent = normalizeMeasurement(current)
  const normalizedReference = normalizeMeasurement(reference)
  if (!normalizedCurrent || !normalizedReference) return { ok: false, message: 'Sin dato' }
  if (normalizedCurrent.unit !== normalizedReference.unit) {
    return { ok: false, message: `Comparación no disponible: unidades incompatibles (${reference.unit} y ${current.unit}).` }
  }
  return { ok: true, difference: round(normalizedCurrent.value - normalizedReference.value), unit: normalizedCurrent.unit }
}

export function getConsultationMeasurements(consultation) {
  if (Array.isArray(consultation?.measurements)) return consultation.measurements
  return consultation?.measurement ? [consultation.measurement] : []
}

export function calculateConsultationBmi(consultation) {
  const measurements = getConsultationMeasurements(consultation)
  const weight = measurements.find((item) => item.indicator === 'Peso')
  const height = measurements.find((item) => item.indicator === 'Altura')
  if (!weight || !height) return null
  let weightKg = Number(weight.value)
  if (weight.unit === 'g') weightKg /= 1000
  if (!['kg', 'g'].includes(weight.unit) || !['m', 'cm'].includes(height.unit)) return null
  return calculateBmi(weightKg, height.value, height.unit)
}
