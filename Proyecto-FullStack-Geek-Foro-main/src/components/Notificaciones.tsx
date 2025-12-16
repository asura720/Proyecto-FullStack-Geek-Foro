import React, { useState, useEffect } from 'react';
import { 
  getMyNotifications, 
  markAsRead, 
  deleteNotification, 
  Notification 
} from '../api/notifications';
import '../assets/notificaciones.css';

const Notificaciones: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'todas' | 'leidas' | 'no-leidas'>('todas');
  const [processingIds, setProcessingIds] = useState<number[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para ver las notificaciones');
      setLoading(false);
      return;
    }

    try {
      const data = await getMyNotifications(token);
      setNotifications(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error al cargar las notificaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setProcessingIds([...processingIds, notificationId]);

    try {
      const updatedNotification = await markAsRead(notificationId, token);
      setNotifications(
        notifications.map((n) =>
          n.id === notificationId ? updatedNotification : n
        )
      );
      // Emitir evento para actualizar el contador en el Navbar
      window.dispatchEvent(new Event('notificationChanged'));
    } catch (err: any) {
      alert(err.message || 'Error al marcar como leída');
    } finally {
      setProcessingIds(processingIds.filter(id => id !== notificationId));
    }
  };

  const handleDelete = async (notificationId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setProcessingIds([...processingIds, notificationId]);

    try {
      await deleteNotification(notificationId, token);
      setNotifications(notifications.filter((n) => n.id !== notificationId));
      // Emitir evento para actualizar el contador en el Navbar
      window.dispatchEvent(new Event('notificationChanged'));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar la notificación');
      setProcessingIds(processingIds.filter(id => id !== notificationId));
    }
  };

  const handleMarkAllAsRead = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const unreadNotifications = notifications.filter((n) => !n.leida);

    if (unreadNotifications.length === 0) {
      alert('No hay notificaciones sin leer');
      return;
    }

    try {
      for (const notification of unreadNotifications) {
        await markAsRead(notification.id, token);
      }
      await loadNotifications();
      // Emitir evento para actualizar el contador en el Navbar
      window.dispatchEvent(new Event('notificationChanged'));
    } catch (err: any) {
      alert('Error al marcar todas como leídas');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('¿Estás seguro de eliminar TODAS las notificaciones? Esta acción no se puede deshacer.')) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      for (const notification of notifications) {
        await deleteNotification(notification.id, token);
      }
      setNotifications([]);
      // Emitir evento para actualizar el contador en el Navbar
      window.dispatchEvent(new Event('notificationChanged'));
    } catch (err: any) {
      alert('Error al eliminar todas las notificaciones');
      await loadNotifications();
    }
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'leidas':
        return notifications.filter((n) => n.leida);
      case 'no-leidas':
        return notifications.filter((n) => !n.leida);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'BANEO':
        return '🚫';
      case 'ADVERTENCIA':
        return '⚠️';
      case 'INFO':
        return 'ℹ️';
      case 'BIENVENIDA':
        return '🎉';
      case 'POST_ELIMINADO':
        return '🗑️';
      case 'COMENTARIO':
        return '💬';
      default:
        return '📬';
    }
  };

  const getNotificationClass = (tipo: string) => {
    switch (tipo) {
      case 'BANEO':
        return 'notification-baneo';
      case 'ADVERTENCIA':
        return 'notification-advertencia';
      case 'INFO':
        return 'notification-info';
      case 'BIENVENIDA':
        return 'notification-bienvenida';
      case 'POST_ELIMINADO':
        return 'notification-advertencia';
      case 'COMENTARIO':
        return 'notification-info';
      default:
        return '';
    }
  };

  const getNotificationTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'BANEO':
        return 'Suspensión';
      case 'ADVERTENCIA':
        return 'Advertencia';
      case 'INFO':
        return 'Información';
      case 'BIENVENIDA':
        return 'Bienvenida';
      case 'POST_ELIMINADO':
        return 'Moderación';
      case 'COMENTARIO':
        return 'Nuevo Comentario';
      default:
        return tipo;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const unreadCount = notifications.filter((n) => !n.leida).length;
  const filteredNotifications = getFilteredNotifications();

  if (loading) {
    return (
      <div className="notifications-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando notificaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-title">
          <h1>
            <span className="icon">🔔</span>
            Notificaciones
          </h1>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} sin leer</span>
          )}
        </div>
        <p className="header-subtitle">Mantente al día con todas tus actualizaciones</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="notifications-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'todas' ? 'active' : ''}`}
            onClick={() => setFilter('todas')}
          >
            <span className="filter-icon">📋</span>
            Todas ({notifications.length})
          </button>
          <button
            className={`filter-btn ${filter === 'no-leidas' ? 'active' : ''}`}
            onClick={() => setFilter('no-leidas')}
          >
            <span className="filter-icon">🔴</span>
            No leídas ({unreadCount})
          </button>
          <button
            className={`filter-btn ${filter === 'leidas' ? 'active' : ''}`}
            onClick={() => setFilter('leidas')}
          >
            <span className="filter-icon">✅</span>
            Leídas ({notifications.length - unreadCount})
          </button>
        </div>

        <div className="action-buttons">
          {unreadCount > 0 && (
            <button className="action-btn success" onClick={handleMarkAllAsRead}>
              <span className="btn-icon">✓</span>
              Marcar todas como leídas
            </button>
          )}
          {notifications.length > 0 && (
            <button className="action-btn danger" onClick={handleDeleteAll}>
              <span className="btn-icon">🗑️</span>
              Eliminar todas
            </button>
          )}
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {filter === 'no-leidas' ? '✅' : filter === 'leidas' ? '📭' : '📬'}
          </div>
          <h3>
            {filter === 'no-leidas'
              ? '¡Todo al día!'
              : filter === 'leidas'
              ? 'No hay notificaciones leídas'
              : 'No tienes notificaciones'}
          </h3>
          <p>
            {filter === 'no-leidas'
              ? 'No tienes notificaciones pendientes por leer'
              : filter === 'leidas'
              ? 'Las notificaciones que marques como leídas aparecerán aquí'
              : 'Cuando recibas notificaciones, aparecerán aquí'}
          </p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${
                !notification.leida ? 'notification-unread' : ''
              } ${getNotificationClass(notification.tipo)} ${
                processingIds.includes(notification.id) ? 'processing' : ''
              }`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.tipo)}
              </div>
              
              <div className="notification-content">
                <div className="notification-header-row">
                  <h3 className="notification-title">{notification.titulo}</h3>
                  <span className="notification-time">
                    {formatDate(notification.creadoEn)}
                  </span>
                </div>
                <p className="notification-message">{notification.mensaje}</p>
                <div className="notification-footer">
                  <span className="notification-type-badge">
                    {getNotificationTypeLabel(notification.tipo)}
                  </span>
                  {!notification.leida && (
                    <span className="unread-indicator">• Sin leer</span>
                  )}
                </div>
              </div>
              
              <div className="notification-actions">
                {!notification.leida && (
                  <button
                    className="action-icon-btn read"
                    onClick={() => handleMarkAsRead(notification.id)}
                    title="Marcar como leída"
                    disabled={processingIds.includes(notification.id)}
                  >
                    ✓
                  </button>
                )}
                <button
                  className="action-icon-btn delete"
                  onClick={() => handleDelete(notification.id)}
                  title="Eliminar"
                  disabled={processingIds.includes(notification.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;