import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, updateMyProfile, Profile } from '../api/profile';
import { validateProfileForm } from '../utils/validations';

export default function Perfil() {
  const navigate = useNavigate();

  // Estados
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Estados del formulario de edición
  const [formData, setFormData] = useState({
    nombre: '',
    biografia: '',
    avatarUrl: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    biografia: '',
    avatarUrl: ''
  });

  // Cargar perfil al montar el componente
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Debes iniciar sesión para ver tu perfil');
      navigate('/registro');
      return;
    }

    try {
      setLoading(true);
      const data = await getMyProfile();
      setProfile(data);

      // Pre-llenar el formulario con los datos actuales
      setFormData({
        nombre: data.nombre,
        biografia: data.biografia || '',
        avatarUrl: data.avatarUrl || ''
      });
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      alert('Error al cargar tu perfil. Intenta iniciar sesión de nuevo.');
      localStorage.removeItem('token');
      navigate('/registro');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Limpiar error del campo
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSave = async () => {
    // Validar formulario
    const validationErrors = validateProfileForm({
      nombre: formData.nombre,
      correo: profile?.email || ''
    });

    if (validationErrors.nombre) {
      setErrors(prev => ({ ...prev, nombre: validationErrors.nombre || '' }));
      return;
    }

    try {
      setSaving(true);

      const updatedProfile = await updateMyProfile({
        nombre: formData.nombre,
        biografia: formData.biografia || undefined,
        avatarUrl: formData.avatarUrl || undefined
      });

      setProfile(updatedProfile);
      setEditing(false);
      alert('✅ Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('❌ Error al actualizar el perfil. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Restaurar valores originales
    setFormData({
      nombre: profile?.nombre || '',
      biografia: profile?.biografia || '',
      avatarUrl: profile?.avatarUrl || ''
    });
    setErrors({ nombre: '', biografia: '', avatarUrl: '' });
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Sesión cerrada correctamente');
    navigate('/');
  };

  if (loading) {
    return (
      <main className="container my-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando perfil...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="container my-5">
        <div className="alert alert-danger">
          No se pudo cargar el perfil.
        </div>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-4">

              {/* Header con avatar */}
              <div className="text-center mb-4">
                {profile.avatarUrl || formData.avatarUrl ? (
                  <img
                    src={editing ? formData.avatarUrl : profile.avatarUrl || ''}
                    alt={profile.nombre}
                    className="rounded-circle shadow"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      border: '4px solid #007bff'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150?text=Avatar';
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center shadow"
                    style={{ width: '150px', height: '150px' }}
                  >
                    <span className="text-white" style={{ fontSize: '64px' }}>
                      {profile.nombre.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {profile.role === 'ADMIN' && (
                  <div className="mt-3">
                    <span className="badge bg-warning text-dark fs-6">
                      👑 Administrador
                    </span>
                  </div>
                )}
              </div>

              {/* Modo visualización */}
              {!editing ? (
                <>
                  <h2 className="text-center mb-3">{profile.nombre}</h2>
                  <p className="text-center text-muted mb-4">{profile.email}</p>

                  <div style={{
                    marginBottom: '1.5rem',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semi-transparente
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)' // Efecto glassmorphism
                  }}>
                    <h5 style={{
                      color: '#e0e0e0', // Texto más claro
                      marginBottom: '1rem',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      display: 'block'
                    }}>
                       Biografía
                    </h5>
                    <div style={{
                      color: '#ffffff', // Texto blanco
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      display: 'block',
                      minHeight: '20px',
                      fontStyle: 'italic' // Cursiva para darle estilo
                    }}>
                      {profile.biografia}
                    </div>
                  </div>
                  <div className="mb-4">
                    <small className="text-muted">
                      Miembro desde: {new Date(profile.creadoEn).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </small>
                  </div>

                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditing(true)}
                    >
                      ✏️ Editar Perfil
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                /* Modo edición */
                <>
                  <h2 className="text-center mb-4">Editar Perfil</h2>

                  {/* Nombre */}
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label fw-bold">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                    />
                    {errors.nombre && (
                      <div className="invalid-feedback">{errors.nombre}</div>
                    )}
                  </div>

                  {/* Biografía */}
                  <div className="mb-3">
                    <label htmlFor="biografia" className="form-label fw-bold">
                      Biografía
                    </label>
                    <textarea
                      id="biografia"
                      className="form-control"
                      rows={4}
                      placeholder="Cuéntanos sobre ti..."
                      value={formData.biografia}
                      onChange={(e) => handleInputChange('biografia', e.target.value)}
                      maxLength={500}
                    />
                    <small className="text-muted">
                      {formData.biografia.length}/500 caracteres
                    </small>
                  </div>

                  {/* Avatar URL */}
                  <div className="mb-3">
                    <label htmlFor="avatarUrl" className="form-label fw-bold">
                      URL del Avatar
                    </label>
                    <input
                      type="url"
                      id="avatarUrl"
                      className="form-control"
                      placeholder="https://ejemplo.com/mi-foto.jpg"
                      value={formData.avatarUrl}
                      onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                    />
                    <small className="text-muted d-block mt-1">
                      💡 Prueba con: https://i.pravatar.cc/150?img=12
                    </small>
                  </div>

                  {/* Botones */}
                  <div className="d-flex gap-2 justify-content-center mt-4">
                    <button
                      className="btn btn-success"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? '⏳ Guardando...' : '💾 Guardar Cambios'}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}