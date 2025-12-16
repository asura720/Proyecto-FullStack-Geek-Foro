import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUnreadCount } from '../api/notifications';
import '../assets/navbar.css';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail')?.split('@')[0] || 'Usuario';
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (isAuthenticated) {
      loadUnreadCount();
      const interval = setInterval(loadUnreadCount, 30000);

      // Escuchar evento personalizado para actualizar el contador
      const handleNotificationChange = () => {
        loadUnreadCount();
      };
      window.addEventListener('notificationChanged', handleNotificationChange);

      return () => {
        clearInterval(interval);
        window.removeEventListener('notificationChanged', handleNotificationChange);
      };
    }
  }, [isAuthenticated]);

  const loadUnreadCount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const count = await getUnreadCount(token);
      setUnreadCount(count);
    } catch (err) {
      console.error('Error al cargar contador de notificaciones:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Intentar obtener el mensaje de error del servidor
        const text = await response.text();
        let errorMessage = 'Credenciales incorrectas';
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Si no es JSON, usar el texto directamente
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.nombre || data.name || data.email.split('@')[0]);
      
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
      window.location.reload();
      
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <nav className="professional-navbar">
        <div className="navbar-container">
          <Link className="navbar-logo" to="/">
            <span className="logo-icon">🎮</span>
            <span className="logo-text">GeekPlay</span>
          </Link>
          
          <div className="navbar-menu">
            {isAuthenticated ? (
              <>
                <Link className="nav-item" to="/foro">
                  <span className="nav-icon">💬</span>
                  <span>Foro</span>
                </Link>
                
                <Link className="nav-item" to="/perfil">
                  <span className="nav-icon">👤</span>
                  <span>Perfil</span>
                </Link>

                <Link className="nav-item notifications-link" to="/notificaciones">
                  <span className="nav-icon">🔔</span>
                  <span>Notificaciones</span>
                  {unreadCount > 0 && (
                    <span className="notification-badge">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </Link>

                <Link className="nav-item" to="/contacto">
                  <span className="nav-icon">📧</span>
                  <span>Contacto</span>
                </Link>

                {userRole === 'ADMIN' && (
                  <Link className="nav-item admin-link" to="/admin">
                    <span className="nav-icon">👑</span>
                    <span>Admin</span>
                  </Link>
                )}

                <div className="user-menu">
                  <span className="user-name">¡Hola, {userName}!</span>
                  <button className="btn-logout" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link className="nav-item" to="/">
                  <span className="nav-icon">🏠</span>
                  <span>Inicio</span>
                </Link>

                <Link className="nav-item" to="/foro">
                  <span className="nav-icon">💬</span>
                  <span>Foro</span>
                </Link>

                <Link className="nav-item" to="/contacto">
                  <span className="nav-icon">📧</span>
                  <span>Contacto</span>
                </Link>

                <button className="btn-login" onClick={() => setShowLoginModal(true)}>
                  Iniciar Sesión
                </button>
                
                <Link to="/registro" className="btn-register">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>
              ✕
            </button>
            
            <div className="login-header">
              <span className="login-icon">🎮</span>
              <h2 className="modal-title">Bienvenido de Vuelta</h2>
              <p className="login-subtitle">Inicia sesión en tu cuenta GeekPlay</p>
            </div>
            
            {error && (
              <div className="alert-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-icon">📧</span>
                  Correo electrónico
                </label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <span className="label-icon">🔒</span>
                  Contraseña
                </label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <span className="btn-icon">→</span>
                Entrar
              </button>
            </form>

            <div className="login-divider">
              <span>¿Nuevo en GeekPlay?</span>
            </div>

            <div className="modal-footer">
              <p>
                <Link 
                  to="/registro" 
                  onClick={() => setShowLoginModal(false)}
                  className="register-link"
                >
                  Crea tu cuenta aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;