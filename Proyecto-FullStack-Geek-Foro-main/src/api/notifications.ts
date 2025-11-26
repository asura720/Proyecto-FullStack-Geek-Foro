const API_URL = 'http://localhost:3005/api/notifications';

export interface Notification {
  id: number;
  userId: number;
  tipo: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  creadoEn: string;
}

export interface NotificationRequest {
  userId: number;
  tipo: string;
  titulo: string;
  mensaje: string;
}

// Obtener mis notificaciones
export const getMyNotifications = async (token: string): Promise<Notification[]> => {
  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', response.status, errorText);
      throw new Error(`Error al obtener notificaciones: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error: any) {
    console.error('Error en getMyNotifications:', error);
    if (error.message.includes('fetch')) {
      throw new Error('No se puede conectar con el servicio de notificaciones. Verifica que esté corriendo en el puerto 3005.');
    }
    throw error;
  }
};

// Contar notificaciones no leídas
export const getUnreadCount = async (token: string): Promise<number> => {
  const response = await fetch(`${API_URL}/me/unread-count`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener contador de notificaciones');
  }

  const data = await response.json();
  return data.unreadCount;
};

// Marcar notificación como leída
export const markAsRead = async (notificationId: number, token: string): Promise<Notification> => {
  const response = await fetch(`${API_URL}/${notificationId}/read`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al marcar notificación como leída');
  }

  return response.json();
};

// Eliminar notificación
export const deleteNotification = async (notificationId: number, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${notificationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar notificación');
  }
};

// Crear notificación (para uso interno entre microservicios)
export const createNotification = async (request: NotificationRequest): Promise<Notification> => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Error al crear notificación');
  }

  return response.json();
};