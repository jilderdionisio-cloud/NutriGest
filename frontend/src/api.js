// Adaptador exclusivamente local: sin red, tokens ni credenciales persistidas.
import { initialPatients, patientFields } from './data/patients.js';
export function createMockClient({ delay = 450 } = {}) {
  let patients = structuredClone(initialPatients);
  async function run(scenario, action) {
    await new Promise(resolve => setTimeout(resolve, delay));
    if (scenario === 'error') throw new Error('No fue posible completar la operación simulada. Intenta de nuevo.');
    return action();
  }
  return {
    login: (credentials, scenario) => run(scenario, () => {
      if (!credentials.username.trim() || !credentials.password) throw new Error('Completa usuario y contraseña de demostración.');
      return { username: credentials.username.trim() };
    }),
    list: (search = '', scenario) => run(scenario, () => {
      if (scenario === 'empty') return [];
      const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const query = normalize(search.trim());
      return structuredClone(patients.filter(patient => normalize(patientFields.map(field => patient[field.key] ?? '').join(' ')).includes(query)));
    }),
    detail: (id, scenario) => run(scenario, () => {
      const patient = scenario === 'missing' ? undefined : patients.find(item => String(item.id) === String(id));
      if (!patient) throw new Error('Paciente no encontrado.');
      return structuredClone(patient);
    }),
    save: (values, id, scenario) => run(scenario, () => {
      const data = Object.fromEntries(patientFields.map(field => [field.key, values[field.key] || (field.type === 'date' ? null : '')]));
      if (patientFields.some(field => field.required && !data[field.key]?.trim())) throw new Error('Completa los campos obligatorios.');
      const index = patients.findIndex(item => String(item.id) === String(id));
      if (id && index < 0) throw new Error('Paciente no encontrado.');
      const timestamp = new Date().toISOString();
      const patient = { ...data, id: id ? patients[index].id : Math.max(0, ...patients.map(item => item.id)) + 1, created_at: id ? patients[index].created_at : timestamp, updated_at: timestamp };
      if (id) patients[index] = patient; else patients.push(patient);
      return structuredClone(patient);
    }),
  };
}
export const patientClient = createMockClient();
