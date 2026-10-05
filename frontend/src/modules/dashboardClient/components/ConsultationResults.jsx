import { buildConsultationComparison, formatSignedDifference } from '../../../utils/consultationHistory'

const valueText = (measurement) => measurement ? `${measurement.value} ${measurement.unit}` : 'Sin dato'

export default function ConsultationResults({ current, previous }) {
  const comparisons = buildConsultationComparison(current, previous)

  return (
    <section className="mt-8" aria-labelledby="consultation-results-title">
      <h2 id="consultation-results-title" className="text-xl font-bold text-[#29431f]">Resultados</h2>
      {!previous ? (
        <p className="mt-4 rounded-2xl border border-[#d3eaf4] bg-white p-5 text-sm text-slate-600">
          Primera evaluación: sin datos anteriores para comparar.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm text-slate-500">
            Comparación con la consulta inmediatamente anterior del mismo paciente. Diferencia = actual − anterior.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d3eaf4] bg-white">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-[#f8faf5] text-[#29431f]">
                <tr><th className="p-4">Indicador</th><th className="p-4">Anterior ({previous.date})</th><th className="p-4">Actual ({current.date})</th><th className="p-4">Diferencia</th></tr>
              </thead>
              <tbody>
                {comparisons.map(({ indicator, previous: before, current: now, result }) => (
                  <tr className="border-t border-slate-100" key={indicator}>
                    <th className="p-4 font-semibold text-[#29431f]">{indicator}</th>
                    <td className="p-4 text-slate-600">{valueText(before)}</td>
                    <td className="p-4 text-slate-600">{valueText(now)}</td>
                    <td className="p-4 font-semibold text-[#4f7f35]">
                      {result.ok ? `${formatSignedDifference(result.difference)} ${result.unit}` : result.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-slate-500">Los cambios se muestran sin clasificación ni conclusión clínica automática.</p>
    </section>
  )
}
