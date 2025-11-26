import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Componente Header', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('debe renderizar sin errores', () => {
    renderHeader();
    expect(screen.getByRole('banner')).toBeDefined();
  });

  it('debe mostrar el logo "Geek-Play"', () => {
    renderHeader();
    const logo = screen.getByText(/Geek-Play/i);
    expect(logo).toBeDefined();
  });

  it('debe mostrar el menú de navegación', () => {
    renderHeader();
    const categoriasLink = screen.getByText(/Categorías/i);
    const foroLink = screen.getByText(/Foro/i);
    const contactoLink = screen.getByText(/Contacto/i);

    expect(categoriasLink).toBeDefined();
    expect(foroLink).toBeDefined();
    expect(contactoLink).toBeDefined();
  });

  describe('Usuario no autenticado', () => {
    it('debe mostrar botón de Login/Registro', () => {
      renderHeader();
      const loginButton = screen.getByText(/Login\/Registro/i);
      expect(loginButton).toBeDefined();
    });

    it('no debe mostrar botón de Perfil', () => {
      renderHeader();
      const perfilButton = screen.queryByText(/Perfil/i);
      expect(perfilButton).toBeNull();
    });

    it('no debe mostrar botón de Cerrar sesión', () => {
      renderHeader();
      const logoutButton = screen.queryByText(/Cerrar sesión/i);
      expect(logoutButton).toBeNull();
    });
  });

  describe('Usuario autenticado', () => {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify({
        correo: 'usuario@test.com',
        nombre: 'Usuario Test'
      }));
    });

    it('debe mostrar botón de Perfil', () => {
      renderHeader();
      const perfilButton = screen.getByText(/Perfil/i);
      expect(perfilButton).toBeDefined();
    });

    it('debe mostrar botón de Cerrar sesión', () => {
      renderHeader();
      const logoutButton = screen.getByText(/Cerrar sesión/i);
      expect(logoutButton).toBeDefined();
    });

    it('no debe mostrar botón de Login/Registro', () => {
      renderHeader();
      const loginButton = screen.queryByText(/Login\/Registro/i);
      expect(loginButton).toBeNull();
    });
  });

  describe('Usuario administrador', () => {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify({
        correo: 'admin@geekplay.cl',
        nombre: 'Admin'
      }));
    });

    it('debe mostrar botón de Admin', () => {
      renderHeader();
      const adminButton = screen.getByText(/Admin/i);
      expect(adminButton).toBeDefined();
    });

    it('debe mostrar todos los botones de usuario autenticado', () => {
      renderHeader();
      expect(screen.getByText(/Perfil/i)).toBeDefined();
      expect(screen.getByText(/Cerrar sesión/i)).toBeDefined();
      expect(screen.getByText(/Admin/i)).toBeDefined();
    });
  });
});
