import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMessage,
  validateTitle,
  validateContent,
  validateLoginForm,
  validateRegistrationForm,
  validateContactForm,
  validateProfileForm,
  validateForumPost,
  isAdminEmail
} from '../utils/validations';

describe('Validaciones de formularios', () => {
  describe('validateEmail', () => {
    it('debe aceptar emails válidos', () => {
      expect(validateEmail('test@example.com')).toBe('');
      expect(validateEmail('usuario@dominio.cl')).toBe('');
      expect(validateEmail('admin@geekplay.cl')).toBe('');
    });

    it('debe rechazar emails inválidos', () => {
      expect(validateEmail('invalido')).toBeTruthy();
      expect(validateEmail('sin@dominio')).toBeTruthy();
      expect(validateEmail('@sinusuario.com')).toBeTruthy();
      expect(validateEmail('')).toBeTruthy();
    });

    it('debe rechazar emails sin @', () => {
      expect(validateEmail('emailsinArroba.com')).toBeTruthy();
    });
  });

  describe('validatePassword', () => {
    it('debe aceptar contraseñas válidas (6+ caracteres)', () => {
      expect(validatePassword('123456')).toBe('');
      expect(validatePassword('password123')).toBe('');
      expect(validatePassword('MiPass2023!')).toBe('');
    });

    it('debe rechazar contraseñas cortas (menos de 6 caracteres)', () => {
      expect(validatePassword('12345')).toBeTruthy();
      expect(validatePassword('abc')).toBeTruthy();
      expect(validatePassword('')).toBeTruthy();
    });
  });

  describe('validateName', () => {
    it('debe aceptar nombres válidos', () => {
      expect(validateName('Juan')).toBe('');
      expect(validateName('María José')).toBe('');
      expect(validateName('Admin')).toBe('');
    });

    it('debe rechazar nombres muy cortos', () => {
      expect(validateName('A')).toBeTruthy();
      expect(validateName('')).toBeTruthy();
      expect(validateName('  ')).toBeTruthy();
    });
  });

  describe('validateMessage', () => {
    it('debe aceptar mensajes con 10+ caracteres', () => {
      expect(validateMessage('Mensaje de prueba válido')).toBe('');
      expect(validateMessage('1234567890')).toBe('');
    });

    it('debe rechazar mensajes cortos', () => {
      expect(validateMessage('Corto')).toBeTruthy();
      expect(validateMessage('123')).toBeTruthy();
      expect(validateMessage('')).toBeTruthy();
    });
  });

  describe('validateLoginForm', () => {
    it('debe validar formulario de login correcto', () => {
      const errors = validateLoginForm({
        email: 'test@example.com',
        password: '123456'
      });
      expect(errors.email).toBeFalsy();
      expect(errors.password).toBeFalsy();
    });

    it('debe detectar email inválido en login', () => {
      const errors = validateLoginForm({
        email: 'emailinvalido',
        password: '123456'
      });
      expect(errors.email).toBeTruthy();
    });

    it('debe detectar contraseña corta en login', () => {
      const errors = validateLoginForm({
        email: 'test@example.com',
        password: '123'
      });
      expect(errors.password).toBeTruthy();
    });
  });

  describe('validateRegistrationForm', () => {
    it('debe validar formulario de registro correcto', () => {
      const errors = validateRegistrationForm({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: '123456',
        confirmPassword: '123456'
      });
      expect(errors.name).toBeFalsy();
      expect(errors.email).toBeFalsy();
      expect(errors.password).toBeFalsy();
      expect(errors.confirmPassword).toBeFalsy();
    });

    it('debe detectar contraseñas que no coinciden', () => {
      const errors = validateRegistrationForm({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: '123456',
        confirmPassword: '654321'
      });
      expect(errors.confirmPassword).toBeTruthy();
    });

    it('debe detectar nombre inválido', () => {
      const errors = validateRegistrationForm({
        name: 'A',
        email: 'juan@example.com',
        password: '123456',
        confirmPassword: '123456'
      });
      expect(errors.name).toBeTruthy();
    });

    it('debe detectar múltiples errores a la vez', () => {
      const errors = validateRegistrationForm({
        name: 'A',
        email: 'emailinvalido',
        password: '123',
        confirmPassword: '456'
      });
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
      expect(errors.password).toBeTruthy();
      expect(errors.confirmPassword).toBeTruthy();
    });
  });

  describe('validateContactForm', () => {
    it('debe validar formulario de contacto correcto', () => {
      const errors = validateContactForm({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        message: 'Este es un mensaje de prueba válido'
      });
      expect(errors.name).toBeFalsy();
      expect(errors.email).toBeFalsy();
      expect(errors.message).toBeFalsy();
    });

    it('debe detectar mensaje muy corto', () => {
      const errors = validateContactForm({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        message: 'Corto'
      });
      expect(errors.message).toBeTruthy();
    });
  });

  describe('validateTitle', () => {
    it('debe aceptar títulos válidos (3+ caracteres)', () => {
      expect(validateTitle('Título válido')).toBe('');
      expect(validateTitle('ABC')).toBe('');
      expect(validateTitle('Mi post')).toBe('');
    });

    it('debe rechazar títulos muy cortos', () => {
      expect(validateTitle('AB')).toBeTruthy();
      expect(validateTitle('A')).toBeTruthy();
      expect(validateTitle('')).toBeTruthy();
      expect(validateTitle('  ')).toBeTruthy();
    });
  });

  describe('validateContent', () => {
    it('debe aceptar contenido válido (10+ caracteres)', () => {
      expect(validateContent('Este es un contenido válido')).toBe('');
      expect(validateContent('1234567890')).toBe('');
    });

    it('debe rechazar contenido muy corto', () => {
      expect(validateContent('Corto')).toBeTruthy();
      expect(validateContent('123')).toBeTruthy();
      expect(validateContent('')).toBeTruthy();
      expect(validateContent('   ')).toBeTruthy();
    });
  });

  describe('validateForumPost', () => {
    it('debe validar post de foro correcto', () => {
      const errors = validateForumPost({
        titulo: 'Título del post',
        contenido: 'Este es el contenido del post'
      });
      expect(errors.titulo).toBeFalsy();
      expect(errors.contenido).toBeFalsy();
    });

    it('debe detectar título inválido', () => {
      const errors = validateForumPost({
        titulo: 'AB',
        contenido: 'Este es el contenido del post'
      });
      expect(errors.titulo).toBeTruthy();
    });

    it('debe detectar contenido inválido', () => {
      const errors = validateForumPost({
        titulo: 'Título válido',
        contenido: 'Corto'
      });
      expect(errors.contenido).toBeTruthy();
    });
  });

  describe('validateProfileForm', () => {
    it('debe validar perfil sin cambio de contraseña', () => {
      const errors = validateProfileForm({
        nombre: 'Juan Pérez',
        correo: 'juan@example.com'
      });
      expect(errors.nombre).toBeFalsy();
      expect(errors.correo).toBeFalsy();
    });

    it('debe validar perfil con cambio de contraseña', () => {
      const errors = validateProfileForm({
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        nuevaPassword: 'nuevapass123',
        confirmarPassword: 'nuevapass123'
      });
      expect(errors.nombre).toBeFalsy();
      expect(errors.correo).toBeFalsy();
      expect(errors.nuevaPassword).toBeFalsy();
      expect(errors.confirmarPassword).toBeFalsy();
    });

    it('debe detectar contraseñas que no coinciden', () => {
      const errors = validateProfileForm({
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        nuevaPassword: 'password1',
        confirmarPassword: 'password2'
      });
      expect(errors.confirmarPassword).toBeTruthy();
    });

    it('debe detectar contraseña muy corta', () => {
      const errors = validateProfileForm({
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        nuevaPassword: '12345',
        confirmarPassword: '12345'
      });
      expect(errors.nuevaPassword).toBeTruthy();
    });

    it('debe detectar nombre inválido', () => {
      const errors = validateProfileForm({
        nombre: 'A',
        correo: 'juan@example.com'
      });
      expect(errors.nombre).toBeTruthy();
    });

    it('debe detectar correo inválido', () => {
      const errors = validateProfileForm({
        nombre: 'Juan Pérez',
        correo: 'emailinvalido'
      });
      expect(errors.correo).toBeTruthy();
    });
  });

  describe('isAdminEmail', () => {
    it('debe identificar emails de admin correctamente', () => {
      expect(isAdminEmail('admin@geekplay.cl')).toBe(true);
      expect(isAdminEmail('soporte@geekplay.cl')).toBe(true);
      expect(isAdminEmail('moderador@geekplay.cl')).toBe(true);
    });

    it('debe identificar emails de usuario normal', () => {
      expect(isAdminEmail('usuario@gmail.com')).toBe(false);
      expect(isAdminEmail('test@example.com')).toBe(false);
      expect(isAdminEmail('user@otrodominio.cl')).toBe(false);
    });

    it('debe manejar casos edge', () => {
      expect(isAdminEmail('@geekplay.cl')).toBe(true);
      expect(isAdminEmail('geekplay.cl')).toBe(false);
      expect(isAdminEmail('')).toBe(false);
    });
  });
});
