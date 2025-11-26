import React, { useState } from 'react';
import { validateEmail, validateName, validateMessage } from '../utils/validations';
import { sendContactMessage } from '../api/contacto';
import '../assets/contacto.css';

interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

interface Errors {
  nombre: string;
  email: string;
  mensaje: string;
}

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<Errors>({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      nombre: validateName(formData.nombre),
      email: validateEmail(formData.email),
      mensaje: validateMessage(formData.mensaje)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await sendContactMessage(formData);
      
      setSuccessMessage('✅ Mensaje enviado con éxito. Te responderemos pronto.');
      setFormData({
        nombre: '',
        email: '',
        mensaje: ''
      });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      alert('❌ Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contacto-container">
      <section className="contacto-section">
        <div className="contacto-header">
          <h1 className="contacto-title">
            <span className="icon">💬</span>
            Ponte en Contacto
          </h1>
          <p className="contacto-subtitle">
            ¿Tienes una pregunta o sugerencia? Nos encantaría escucharte.
          </p>
        </div>

        <div className="contacto-content">
          <div className="contacto-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>Envíanos un mensaje y responderemos en las próximas 24 horas</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Rápido</h3>
              <p>Procesamos tus consultas de forma ágil y eficiente</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Atento</h3>
              <p>Tu opinión es importante para mejorar nuestra comunidad</p>
            </div>
          </div>

          <div className="contacto-form-wrapper">
            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="contacto-form" aria-label="Formulario de contacto">
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <div className="input-wrapper">
                  <input
                    id="nombre"
                    type="text"
                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={e => handleChange('nombre', e.target.value)}
                    required
                    disabled={loading}
                  />
                  {errors.nombre && <span className="error-icon">⚠️</span>}
                </div>
                {errors.nombre && (
                  <div className="error-message">{errors.nombre}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    required
                    disabled={loading}
                  />
                  {errors.email && <span className="error-icon">⚠️</span>}
                </div>
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <div className="input-wrapper">
                  <textarea
                    id="mensaje"
                    className={`form-input form-textarea ${errors.mensaje ? 'error' : ''}`}
                    placeholder="Cuéntanos qué piensas..."
                    value={formData.mensaje}
                    onChange={e => handleChange('mensaje', e.target.value)}
                    required
                    rows={5}
                    disabled={loading}
                  />
                  {errors.mensaje && <span className="error-icon">⚠️</span>}
                </div>
                {errors.mensaje && (
                  <div className="error-message">{errors.mensaje}</div>
                )}
              </div>

              <button type="submit" className="btn-enviar" disabled={loading}>
                <span className="btn-icon">✉️</span>
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}