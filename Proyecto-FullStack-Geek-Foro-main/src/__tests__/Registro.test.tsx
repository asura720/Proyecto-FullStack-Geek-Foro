import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Registro from '../components/Registro';

describe('Componente Registro', () => {
  const renderRegistro = () => {
    return render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('debe renderizar sin errores', () => {
    renderRegistro();
    expect(document.querySelector('section#authSection')).toBeDefined();
  });

  describe('Formulario de Login', () => {
    it('debe mostrar el formulario de login', () => {
      renderRegistro();
      const heading = screen.getByText(/Iniciar Sesión/i);
      expect(heading).toBeDefined();
    });

    it('debe tener campos de correo y contraseña', () => {
      renderRegistro();
      const emailInput = screen.getAllByLabelText(/Correo/i)[0];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[0];

      expect(emailInput).toBeDefined();
      expect(passwordInput).toBeDefined();
    });

    it('debe tener un botón de Entrar', () => {
      renderRegistro();
      const submitButton = screen.getByRole('button', { name: /Entrar/i });
      expect(submitButton).toBeDefined();
    });
  });

  describe('Formulario de Registro', () => {
    it('debe mostrar el formulario de registro', () => {
      renderRegistro();
      const heading = screen.getByText(/Crear Cuenta/i);
      expect(heading).toBeDefined();
    });

    it('debe tener campo de nombre de usuario', () => {
      renderRegistro();
      const nameInput = screen.getByLabelText(/Nombre de usuario/i);
      expect(nameInput).toBeDefined();
    });

    it('debe tener campos de correo y contraseñas', () => {
      renderRegistro();
      const emailInputs = screen.getAllByLabelText(/Correo/i);
      const passwordInputs = screen.getAllByLabelText(/Contraseña/i);

      expect(emailInputs.length).toBeGreaterThan(0);
      expect(passwordInputs.length).toBeGreaterThan(0);
    });

    it('debe tener campo de confirmar contraseña', () => {
      renderRegistro();
      const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
      expect(confirmInput).toBeDefined();
    });

    it('debe tener un botón de Registrarse', () => {
      renderRegistro();
      const submitButton = screen.getByRole('button', { name: /Registrarse/i });
      expect(submitButton).toBeDefined();
    });
  });

  describe('Validaciones', () => {
    it('debe validar que ambos formularios sean del tipo noValidate', () => {
      renderRegistro();
      const forms = document.querySelectorAll('form[novalidate]');
      expect(forms.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Funcionalidad de Login', () => {
    it('debe mostrar error con email inválido', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const emailInput = screen.getAllByLabelText(/Correo/i)[0];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[0];

      await user.type(emailInput, 'emailinvalido');
      await user.type(passwordInput, '123456');

      await waitFor(() => {
        expect(screen.getByText(/Correo electrónico inválido/i)).toBeDefined();
      });
    });

    it('debe mostrar error con contraseña corta', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const emailInput = screen.getAllByLabelText(/Correo/i)[0];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[0];

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '123');

      await waitFor(() => {
        expect(screen.getByText(/La contraseña debe tener al menos 6 caracteres/i)).toBeDefined();
      });
    });

    it('debe mostrar error cuando el usuario no existe', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const emailInput = screen.getAllByLabelText(/Correo/i)[0];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[0];
      const loginButton = screen.getByRole('button', { name: /Entrar/i });

      await user.type(emailInput, 'noexiste@example.com');
      await user.type(passwordInput, '123456');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/Usuario o contraseña incorrectos o no registrados/i)).toBeDefined();
      });
    });

    it('debe permitir login exitoso con credenciales válidas', async () => {
      // Primero registrar un usuario
      const mockUser = { nombre: 'Test User', correo: 'test@example.com', pass: 'password123' };
      localStorage.setItem('users', JSON.stringify([mockUser]));

      renderRegistro();
      const user = userEvent.setup();

      const emailInput = screen.getAllByLabelText(/Correo/i)[0];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[0];
      const loginButton = screen.getByRole('button', { name: /Entrar/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      // Verificar que el usuario se guardó en localStorage
      await waitFor(() => {
        const savedUser = localStorage.getItem('user');
        expect(savedUser).toBeTruthy();
        const parsedUser = JSON.parse(savedUser!);
        expect(parsedUser.correo).toBe('test@example.com');
        expect(parsedUser.nombre).toBe('Test User');
      });
    });

    it('debe limpiar errores anteriores al corregir el input', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const emailInput = screen.getAllByLabelText(/Correo/i)[0] as HTMLInputElement;

      // Escribir email inválido
      await user.type(emailInput, 'invalido');
      await waitFor(() => {
        expect(screen.getByText(/Correo electrónico inválido/i)).toBeDefined();
      });

      // Limpiar y escribir email válido
      await user.clear(emailInput);
      await user.type(emailInput, 'valido@example.com');

      // Esperar a que el error desaparezca
      await waitFor(() => {
        expect(screen.queryByText(/Correo electrónico inválido/i)).toBeNull();
      });
    });

    it('debe validar ambos campos antes de permitir login', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const loginButton = screen.getByRole('button', { name: /Entrar/i });

      // Intentar login sin llenar campos
      await user.click(loginButton);

      await waitFor(() => {
        // Debe mostrar errores de validación
        const errors = screen.getAllByText(/Correo electrónico inválido|La contraseña debe tener al menos 6 caracteres/i);
        expect(errors.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Funcionalidad de Registro', () => {
    it('debe registrar usuario con datos válidos', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const nameInput = screen.getByLabelText(/Nombre de usuario/i);
      const emailInput = screen.getAllByLabelText(/Correo/i)[1];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[1];
      const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
      const registerButton = screen.getByRole('button', { name: /Registrarse/i });

      await user.type(nameInput, 'Nuevo Usuario');
      await user.type(emailInput, 'nuevo@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmInput, 'password123');

      // Mock del alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await user.click(registerButton);

      // Verificar que el usuario se guardó
      await waitFor(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        expect(users.length).toBe(1);
        expect(users[0].nombre).toBe('Nuevo Usuario');
        expect(users[0].correo).toBe('nuevo@example.com');
      }, { timeout: 3000 });

      alertSpy.mockRestore();
    });

    it('debe mostrar error si las contraseñas no coinciden', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const nameInput = screen.getByLabelText(/Nombre de usuario/i);
      const emailInput = screen.getAllByLabelText(/Correo/i)[1];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[1];
      const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);

      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmInput, 'password456');

      await waitFor(() => {
        expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeDefined();
      });
    });

    it('debe mostrar error si el correo ya está registrado', async () => {
      // Pre-registrar un usuario
      localStorage.setItem('users', JSON.stringify([
        { nombre: 'Existing', correo: 'existing@example.com', pass: 'password123' }
      ]));

      renderRegistro();
      const user = userEvent.setup();

      const nameInput = screen.getByLabelText(/Nombre de usuario/i);
      const emailInput = screen.getAllByLabelText(/Correo/i)[1];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[1];
      const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
      const registerButton = screen.getByRole('button', { name: /Registrarse/i });

      await user.type(nameInput, 'New User');
      await user.type(emailInput, 'existing@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmInput, 'password123');
      await user.click(registerButton);

      await waitFor(() => {
        expect(screen.getByText(/Este correo ya está registrado/i)).toBeDefined();
      });
    });

    it('debe mostrar spinner durante el registro', async () => {
      renderRegistro();
      const user = userEvent.setup();

      const nameInput = screen.getByLabelText(/Nombre de usuario/i);
      const emailInput = screen.getAllByLabelText(/Correo/i)[1];
      const passwordInput = screen.getAllByLabelText(/Contraseña/i)[1];
      const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
      const registerButton = screen.getByRole('button', { name: /Registrarse/i });

      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmInput, 'password123');

      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await user.click(registerButton);

      // Verificar que el spinner aparece
      await waitFor(() => {
        expect(screen.getByText(/Cargando/i)).toBeDefined();
      }, { timeout: 500 });

      alertSpy.mockRestore();
    });
  });
});
