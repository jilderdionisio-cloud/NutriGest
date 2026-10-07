export const patientFields = [
  { key: 'first_name', label: 'Nombre', type: 'text', required: true, maxLength: 100 },
  { key: 'last_name', label: 'Apellidos', type: 'text', required: true, maxLength: 100 },
  { key: 'birth_date', label: 'Fecha de nacimiento', type: 'date' },
  { key: 'email', label: 'Correo electrónico', type: 'email' },
  { key: 'phone', label: 'Teléfono', type: 'tel', maxLength: 30 },
  { key: 'notes', label: 'Notas manuales', type: 'textarea' },
];
export const patientName = patient => `${patient.first_name} ${patient.last_name}`;
// Datos ficticios; campos de docs/contrato-api.md, pendientes de cotejo con Diana.
export const initialPatients = [
  { id: 1, first_name: 'Ana', last_name: 'López', birth_date: '1995-04-12', email: 'ana@example.com', phone: '', notes: 'Registro ficticio para recorrer el expediente.', created_at: '2026-09-21T12:00:00Z', updated_at: '2026-09-21T12:00:00Z' },
  { id: 2, first_name: 'Carlos', last_name: 'Méndez', birth_date: null, email: 'carlos@example.com', phone: '', notes: '', created_at: '2026-09-22T12:00:00Z', updated_at: '2026-09-22T12:00:00Z' },
  { id: 3, first_name: 'Sofía', last_name: 'Ruiz', birth_date: '1988-11-03', email: '', phone: '', notes: '', created_at: '2026-09-23T12:00:00Z', updated_at: '2026-09-23T12:00:00Z' },
];
