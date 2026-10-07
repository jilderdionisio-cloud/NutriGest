export default function DemoState({ value, onChange, options = [] }) {
  return <details className="demo-controls"><summary>Probar estados de la demostración</summary><label>Resultado simulado<select value={value} onChange={event => onChange(event.target.value)}><option value="normal">Correcto</option><option value="error">Error</option>{options.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><p>La carga aparece durante cada operación. Los datos se reinician al recargar.</p></details>;
}
