import { describe, it, expect } from 'vitest';

describe('Test Simple', () => {
  it('debe pasar un test básico', () => {
    expect(1 + 1).toBe(2);
  });

  it('debe verificar strings', () => {
    expect('hola').toBe('hola');
  });
});
