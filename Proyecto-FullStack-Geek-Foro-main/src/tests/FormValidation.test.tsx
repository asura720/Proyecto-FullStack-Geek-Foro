import { describe, it, expect } from 'vitest';

/**
 * Tests de validación de formularios
 * Estos tests verifican las funciones de validación utilizadas en los formularios
 */

describe('Validación de Formularios', () => {
  describe('Validación de Email', () => {
    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    it('debe aceptar emails válidos', () => {
      expect(validateEmail('usuario@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co')).toBe(true);
      expect(validateEmail('admin@geekplay.com')).toBe(true);
    });

    it('debe rechazar emails inválidos', () => {
      expect(validateEmail('usuario')).toBe(false);
      expect(validateEmail('usuario@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('usuario@.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('Validación de Contraseña', () => {
    const validatePassword = (password: string): { valid: boolean; message?: string } => {
      if (password.length < 6) {
        return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
      }
      if (password.length > 50) {
        return { valid: false, message: 'La contraseña es demasiado larga' };
      }
      return { valid: true };
    };

    it('debe aceptar contraseñas válidas', () => {
      expect(validatePassword('password123').valid).toBe(true);
      expect(validatePassword('securePass!').valid).toBe(true);
      expect(validatePassword('123456').valid).toBe(true);
    });

    it('debe rechazar contraseñas muy cortas', () => {
      const result = validatePassword('12345');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('al menos 6 caracteres');
    });

    it('debe rechazar contraseñas muy largas', () => {
      const longPassword = 'a'.repeat(51);
      const result = validatePassword(longPassword);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('demasiado larga');
    });
  });

  describe('Validación de Campos Requeridos', () => {
    const validateRequired = (value: string, fieldName: string): { valid: boolean; message?: string } => {
      if (!value || value.trim() === '') {
        return { valid: false, message: `${fieldName} es requerido` };
      }
      return { valid: true };
    };

    it('debe detectar campos vacíos', () => {
      const result = validateRequired('', 'Nombre');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('requerido');
    });

    it('debe detectar campos solo con espacios', () => {
      const result = validateRequired('   ', 'Email');
      expect(result.valid).toBe(false);
    });

    it('debe aceptar campos con contenido', () => {
      const result = validateRequired('Contenido válido', 'Descripción');
      expect(result.valid).toBe(true);
    });
  });

  describe('Validación de Post', () => {
    const validatePost = (titulo: string, contenido: string, categoria: string) => {
      const errors: string[] = [];

      if (!titulo || titulo.trim() === '') {
        errors.push('El título es requerido');
      }
      if (titulo && titulo.length < 5) {
        errors.push('El título debe tener al menos 5 caracteres');
      }
      if (titulo && titulo.length > 200) {
        errors.push('El título es demasiado largo');
      }

      if (!contenido || contenido.trim() === '') {
        errors.push('El contenido es requerido');
      }
      if (contenido && contenido.length < 10) {
        errors.push('El contenido debe tener al menos 10 caracteres');
      }

      if (!categoria || categoria === '') {
        errors.push('La categoría es requerida');
      }

      return {
        valid: errors.length === 0,
        errors
      };
    };

    it('debe validar un post completo y válido', () => {
      const result = validatePost(
        'Título válido de post',
        'Este es un contenido válido con más de 10 caracteres',
        'videojuegos'
      );
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('debe rechazar post sin título', () => {
      const result = validatePost('', 'Contenido válido aquí', 'tecnologia');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('El título es requerido');
    });

    it('debe rechazar post con título muy corto', () => {
      const result = validatePost('ABC', 'Contenido válido aquí', 'tecnologia');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('al menos 5 caracteres'))).toBe(true);
    });

    it('debe rechazar post sin contenido', () => {
      const result = validatePost('Título válido', '', 'peliculas-series');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('El contenido es requerido');
    });

    it('debe rechazar post sin categoría', () => {
      const result = validatePost('Título válido', 'Contenido válido aquí', '');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('La categoría es requerida');
    });

    it('debe detectar múltiples errores a la vez', () => {
      const result = validatePost('', '', '');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(2);
    });
  });

  describe('Validación de Comentarios', () => {
    const validateComment = (contenido: string) => {
      if (!contenido || contenido.trim() === '') {
        return { valid: false, message: 'El comentario no puede estar vacío' };
      }
      if (contenido.length < 3) {
        return { valid: false, message: 'El comentario debe tener al menos 3 caracteres' };
      }
      if (contenido.length > 1000) {
        return { valid: false, message: 'El comentario es demasiado largo' };
      }
      return { valid: true };
    };

    it('debe aceptar comentarios válidos', () => {
      expect(validateComment('Buen post!').valid).toBe(true);
      expect(validateComment('Me gusta mucho este contenido').valid).toBe(true);
    });

    it('debe rechazar comentarios vacíos', () => {
      const result = validateComment('');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('vacío');
    });

    it('debe rechazar comentarios muy cortos', () => {
      const result = validateComment('Ok');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('al menos 3 caracteres');
    });

    it('debe rechazar comentarios muy largos', () => {
      const longComment = 'a'.repeat(1001);
      const result = validateComment(longComment);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('demasiado largo');
    });
  });

  describe('Validación de Registro', () => {
    const validateRegistro = (nombre: string, email: string, password: string) => {
      const errors: string[] = [];

      if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es requerido');
      }
      if (nombre && nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
      }

      if (!email || email.trim() === '') {
        errors.push('El email es requerido');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        errors.push('El email no es válido');
      }

      if (!password || password.trim() === '') {
        errors.push('La contraseña es requerida');
      }
      if (password && password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
      }

      return {
        valid: errors.length === 0,
        errors
      };
    };

    it('debe validar un registro completo y válido', () => {
      const result = validateRegistro('Juan Perez', 'juan@example.com', 'password123');
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('debe rechazar registro sin nombre', () => {
      const result = validateRegistro('', 'juan@example.com', 'password123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('El nombre es requerido');
    });

    it('debe rechazar registro con email inválido', () => {
      const result = validateRegistro('Juan Perez', 'email-invalido', 'password123');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('email no es válido'))).toBe(true);
    });

    it('debe rechazar registro con contraseña corta', () => {
      const result = validateRegistro('Juan Perez', 'juan@example.com', '12345');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('al menos 6 caracteres'))).toBe(true);
    });

    it('debe detectar todos los campos vacíos', () => {
      const result = validateRegistro('', '', '');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });
  });
});
