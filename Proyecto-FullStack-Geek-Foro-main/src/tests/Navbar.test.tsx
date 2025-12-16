import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Wrapper con Router para componentes que usan React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar Component', () => {
  it('debe renderizar el logo GeekPlay', () => {
    const mockLogout = vi.fn();
    renderWithRouter(<Navbar isAuthenticated={false} onLogout={mockLogout} />);

    const logo = screen.getByText(/GeekPlay/i);
    expect(logo).toBeInTheDocument();
  });

  it('debe mostrar botón "Iniciar Sesión" cuando no está autenticado', () => {
    const mockLogout = vi.fn();
    renderWithRouter(<Navbar isAuthenticated={false} onLogout={mockLogout} />);

    const loginButton = screen.getByText(/Iniciar Sesión/i);
    expect(loginButton).toBeInTheDocument();
  });

  it('debe mostrar enlaces de navegación cuando está autenticado', () => {
    const mockLogout = vi.fn();

    // Mock de localStorage para usuario autenticado
    global.localStorage.getItem = vi.fn((key) => {
      if (key === 'userName') return 'Test User';
      if (key === 'userRole') return 'USER';
      return null;
    });

    renderWithRouter(<Navbar isAuthenticated={true} onLogout={mockLogout} />);

    // Verificar que aparece el saludo
    const greeting = screen.getByText(/Hola,/i);
    expect(greeting).toBeInTheDocument();
  });

  it('debe renderizar correctamente cuando el usuario es ADMIN', () => {
    const mockLogout = vi.fn();

    // Mock de localStorage para usuario ADMIN
    global.localStorage.getItem = vi.fn((key) => {
      if (key === 'userName') return 'Admin User';
      if (key === 'userRole') return 'ADMIN';
      return null;
    });

    renderWithRouter(<Navbar isAuthenticated={true} onLogout={mockLogout} />);

    // Verificar que el Navbar se renderiza correctamente para Admin
    const navbar = document.querySelector('.professional-navbar');
    expect(navbar).not.toBeNull();
  });

  it('NO debe mostrar enlace "Admin" para usuarios normales', () => {
    const mockLogout = vi.fn();

    // Mock de localStorage para usuario normal
    global.localStorage.getItem = vi.fn((key) => {
      if (key === 'userName') return 'Normal User';
      if (key === 'userRole') return 'USER';
      return null;
    });

    renderWithRouter(<Navbar isAuthenticated={true} onLogout={mockLogout} />);

    // Usar queryByRole para buscar específicamente el enlace Admin
    const adminLink = screen.queryByRole('link', { name: /👑.*Admin/i });
    expect(adminLink).not.toBeInTheDocument();
  });

  it('debe tener enlaces a las páginas principales', () => {
    const mockLogout = vi.fn();
    renderWithRouter(<Navbar isAuthenticated={false} onLogout={mockLogout} />);

    // Buscar enlaces con iconos incluidos
    const homeLink = screen.getByRole('link', { name: /🏠.*Inicio/i });
    const forumLink = screen.getByRole('link', { name: /💬.*Foro/i });
    const contactLink = screen.getByRole('link', { name: /📧.*Contacto/i });

    expect(homeLink).toBeInTheDocument();
    expect(forumLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });
});
