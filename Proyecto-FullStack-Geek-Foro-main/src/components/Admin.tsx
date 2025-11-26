import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nombre: string;
  email: string;
  role: string;
  baneado: boolean;
  createdAt: string;
}

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banReason, setBanReason] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    // Verificar si es admin
    if (userRole !== 'ADMIN') {
      alert('No tienes permisos para acceder a esta página');
      navigate('/');
      return;
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleBanClick = (user: User) => {
    setSelectedUser(user);
    setShowBanModal(true);
  };

  const handleBanConfirm = async () => {
    if (!banReason.trim()) {
      alert('Debes ingresar un motivo para el baneo');
      return;
    }

    if (!selectedUser) return;

    try {
      const response = await fetch(`http://localhost:3001/api/admin/users/${selectedUser.id}/ban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ razon: banReason }),
      });

      if (!response.ok) {
        throw new Error('Error al banear usuario');
      }

      alert('Usuario baneado correctamente');
      setShowBanModal(false);
      setSelectedUser(null);
      setBanReason('');
      loadUsers();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al banear el usuario');
    }
  };

  const handleUnban = async (userId: number) => {
    if (!confirm('¿Estás seguro de desbanear a este usuario?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/admin/users/${userId}/unban`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al desbanear usuario');
      }

      alert('Usuario desbaneado correctamente');
      loadUsers();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al desbanear el usuario');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div>Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
          👑 Panel de Administración
        </h1>
        <p style={{ color: '#666' }}>Gestiona usuarios de la plataforma</p>
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>ID</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Nombre</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Rol</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Estado</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Registro</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6', opacity: user.baneado ? 0.6 : 1 }}>
                <td style={{ padding: '16px' }}>{user.id}</td>
                <td style={{ padding: '16px', fontWeight: '500' }}>{user.nombre}</td>
                <td style={{ padding: '16px', color: '#666' }}>{user.email}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: user.role === 'ADMIN' ? '#ffc107' : '#007bff',
                    color: 'white'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  {user.baneado ? (
                    <span style={{ color: '#dc3545', fontWeight: '500' }}>🚫 Baneado</span>
                  ) : (
                    <span style={{ color: '#28a745', fontWeight: '500' }}>✅ Activo</span>
                  )}
                </td>
                <td style={{ padding: '16px', color: '#666', fontSize: '14px' }}>
                  {new Date(user.createdAt).toLocaleDateString('es-ES')}
                </td>
                <td style={{ padding: '16px' }}>
                  {user.role !== 'ADMIN' && (
                    user.baneado ? (
                      <button
                        onClick={() => handleUnban(user.id)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#28a745',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        Desbanear
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBanClick(user)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        Banear
                      </button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de baneo */}
      {showBanModal && selectedUser && (
        <div
          onClick={() => setShowBanModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '30px',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          >
            <h3 style={{ marginBottom: '20px', color: '#dc3545', fontSize: '24px' }}>
              🚫 Banear Usuario
            </h3>
            <p style={{ marginBottom: '20px', color: '#495057' }}>
              Vas a banear a <strong>{selectedUser.nombre}</strong> ({selectedUser.email}).
              El usuario recibirá una notificación con el motivo.
            </p>
            <textarea
              placeholder="Escribe el motivo del baneo..."
              rows={4}
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #ddd',
                fontSize: '14px',
                marginBottom: '20px',
                resize: 'vertical',
                fontFamily: 'inherit',
                color: '#212529',
                backgroundColor: '#ffffff'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowBanModal(false);
                  setSelectedUser(null);
                  setBanReason('');
                }}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '2px solid #6c757d',
                  background: '#ffffff',
                  color: '#6c757d',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleBanConfirm}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#dc3545',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Banear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
