import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contacto from '../components/Contacto';

describe('Componente Contacto', () => {
  const renderContacto = () => {
    return render(
      <BrowserRouter>
        <Contacto />
      </BrowserRouter>
    );
  };

  it('debe renderizar sin errores', () => {
    renderContacto();
    expect(screen.getByRole('main')).toBeDefined();
  });

  it('debe mostrar el título de contacto', () => {
    renderContacto();
    const title = screen.getByText(/Contacto/i);
    expect(title).toBeDefined();
  });

  it('debe tener un formulario de contacto', () => {
    renderContacto();
    const forms = document.querySelectorAll('form');
    expect(forms.length).toBeGreaterThan(0);
  });

  it('debe tener campo de nombre', () => {
    renderContacto();
    const nameInput = screen.getByLabelText(/Nombre/i);
    expect(nameInput).toBeDefined();
  });

  it('debe tener campo de correo', () => {
    renderContacto();
    const emailInput = screen.getByLabelText(/Correo/i);
    expect(emailInput).toBeDefined();
  });

  it('debe tener campo de mensaje', () => {
    renderContacto();
    const messageInput = screen.getByLabelText(/Mensaje/i);
    expect(messageInput).toBeDefined();
  });

  it('debe tener un botón de enviar', () => {
    renderContacto();
    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    expect(submitButton).toBeDefined();
  });
});
