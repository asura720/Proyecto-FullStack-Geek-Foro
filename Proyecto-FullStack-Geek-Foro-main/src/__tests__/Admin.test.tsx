import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Admin from '../components/Admin';

describe('Componente Admin', () => {
  const renderAdmin = () => {
    return render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('debe renderizar sin errores', () => {
    renderAdmin();
    expect(screen.getByRole('main')).toBeDefined();
  });

  it('debe mostrar el título del panel de administración', () => {
    renderAdmin();
    const title = screen.getByText(/Panel de administración/i);
    expect(title).toBeDefined();
  });

  it('debe mostrar un input para crear items', () => {
    renderAdmin();
    const input = screen.getByPlaceholderText(/Título/i);
    expect(input).toBeDefined();
  });

  it('debe mostrar un botón de Crear', () => {
    renderAdmin();
    const createButton = screen.getByText(/Crear/i);
    expect(createButton).toBeDefined();
  });

  it('debe crear un nuevo item cuando se hace click en Crear', () => {
    renderAdmin();
    const input = screen.getByPlaceholderText(/Título/i) as HTMLInputElement;
    const createButton = screen.getByText(/Crear/i);

    fireEvent.change(input, { target: { value: 'Test Item' } });
    fireEvent.click(createButton);

    // El item debe aparecer en la lista
    expect(screen.getByText(/Test Item/i)).toBeDefined();
  });

  it('debe mostrar botones de Editar y Eliminar para cada item', () => {
    renderAdmin();
    const input = screen.getByPlaceholderText(/Título/i) as HTMLInputElement;
    const createButton = screen.getByText(/Crear/i);

    fireEvent.change(input, { target: { value: 'Item de prueba' } });
    fireEvent.click(createButton);

    const editButtons = screen.getAllByText(/Editar/i);
    const deleteButtons = screen.getAllByText(/Eliminar/i);

    expect(editButtons.length).toBeGreaterThan(0);
    expect(deleteButtons.length).toBeGreaterThan(0);
  });
});
