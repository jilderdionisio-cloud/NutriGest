import { describe, expect, test } from 'vitest';
import { createMockClient } from './api';
describe('adaptador local', () => {
  test('busca ignorando acentos y entrega copias aisladas', async () => {
    const client = createMockClient({ delay: 0 });
    const records = await client.list('SOFIA');
    expect(records).toHaveLength(1);
    records[0].first_name = 'Mutación externa';
    expect((await client.detail(3)).first_name).toBe('Sofía');
    expect(await client.list('inexistente')).toEqual([]);
  });
  test('crea y edita sin alterar otros registros ni aceptar campos ajenos', async () => {
    const client = createMockClient({ delay: 0 });
    const patient = await client.save({ first_name: 'Demo', last_name: 'Prueba', invented: 'no' });
    expect(patient).not.toHaveProperty('invented');
    expect(patient.birth_date).toBeNull();
    await client.save({ ...patient, first_name: 'Editado' }, patient.id);
    expect((await client.detail(patient.id)).first_name).toBe('Editado');
    expect((await client.detail(1)).first_name).toBe('Ana');
    expect(await createMockClient({ delay: 0 }).list()).toHaveLength(3);
  });
  test('errores no mutan los datos y contempla vacío y no encontrado', async () => {
    const client = createMockClient({ delay: 0 });
    await expect(client.save({ first_name: 'Demo', last_name: 'Prueba' }, undefined, 'error')).rejects.toThrow('simulada');
    expect(await client.list()).toHaveLength(3);
    expect(await client.list('', 'empty')).toEqual([]);
    await expect(client.detail(999)).rejects.toThrow('no encontrado');
    await expect(client.save({ first_name: ' ', last_name: 'Demo' })).rejects.toThrow('obligatorios');
    await expect(client.login({ username: '', password: '' })).rejects.toThrow('Completa');
  });
});
