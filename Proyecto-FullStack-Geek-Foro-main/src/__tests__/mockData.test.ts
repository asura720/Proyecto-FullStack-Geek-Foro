import { describe, it, expect, beforeEach } from 'vitest';
import { getAll, getById, createItem, updateItem, deleteItem } from '../api/mockData';

describe('mockData CRUD operations', () => {
  beforeEach(() => {
    // Limpiar datos antes de cada test
    const items = getAll();
    items.forEach(item => deleteItem(item.id));
  });

  describe('getAll', () => {
    it('debe retornar un array', () => {
      const items = getAll();
      expect(Array.isArray(items)).toBe(true);
    });

    it('debe retornar todos los items creados', () => {
      createItem({ title: 'Test 1' });
      createItem({ title: 'Test 2' });
      const items = getAll();
      expect(items.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getById', () => {
    it('debe retornar un item existente por su id', () => {
      const newItem = createItem({ title: 'Test Item' });
      const found = getById(newItem.id);
      expect(found).toBeDefined();
      expect(found?.title).toBe('Test Item');
    });

    it('debe retornar null para un id inexistente', () => {
      const found = getById('id-inexistente-12345');
      expect(found).toBeNull();
    });
  });

  describe('createItem', () => {
    it('debe crear un nuevo item con título', () => {
      const newItem = createItem({ title: 'Nuevo Item' });
      expect(newItem).toBeDefined();
      expect(newItem.id).toBeDefined();
      expect(newItem.title).toBe('Nuevo Item');
    });

    it('debe asignar un id único al nuevo item', () => {
      const item1 = createItem({ title: 'Item 1' });
      const item2 = createItem({ title: 'Item 2' });
      expect(item1.id).not.toBe(item2.id);
    });

    it('debe agregar el item a la lista', () => {
      const initialCount = getAll().length;
      createItem({ title: 'Test' });
      const finalCount = getAll().length;
      expect(finalCount).toBe(initialCount + 1);
    });
  });

  describe('updateItem', () => {
    it('debe actualizar el título de un item existente', () => {
      const item = createItem({ title: 'Original' });
      const updated = updateItem(item.id, { title: 'Actualizado' });
      expect(updated).toBeDefined();
      expect(updated?.title).toBe('Actualizado');
    });

    it('debe mantener el id al actualizar', () => {
      const item = createItem({ title: 'Test' });
      const originalId = item.id;
      const updated = updateItem(item.id, { title: 'Modificado' });
      expect(updated?.id).toBe(originalId);
    });

    it('debe retornar null si el item no existe', () => {
      const result = updateItem('id-inexistente', { title: 'Test' });
      expect(result).toBeNull();
    });
  });

  describe('deleteItem', () => {
    it('debe eliminar un item existente', () => {
      const item = createItem({ title: 'A Eliminar' });
      const result = deleteItem(item.id);
      expect(result).toBe(true);
      const found = getById(item.id);
      expect(found).toBeNull();
    });

    it('debe retornar false si el item no existe', () => {
      const result = deleteItem('id-inexistente');
      expect(result).toBe(false);
    });

    it('debe reducir la cantidad de items', () => {
      const item = createItem({ title: 'Test' });
      const initialCount = getAll().length;
      deleteItem(item.id);
      const finalCount = getAll().length;
      expect(finalCount).toBe(initialCount - 1);
    });
  });
});
