// Configuración de la API
const PROFILE_API_URL = 'http://localhost:3002/api/profile';

// Obtener el token del localStorage
function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

// Interfaces
export interface Profile {
  id: number;
  nombre: string;
  email: string;
  role: 'USER' | 'ADMIN';
  biografia: string | null;
  avatarUrl: string | null;
  creadoEn: string;
  actualizadoEn: string;
}

export interface UpdateProfileData {
  nombre?: string;
  biografia?: string;
  avatarUrl?: string;
}

// 1. OBTENER MI PERFIL
export async function getMyProfile(): Promise<Profile> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${PROFILE_API_URL}/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el perfil');
  }

  return response.json();
}

// 2. ACTUALIZAR MI PERFIL
export async function updateMyProfile(data: UpdateProfileData): Promise<Profile> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${PROFILE_API_URL}/me`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el perfil');
  }

  return response.json();
}

// 3. OBTENER PERFIL DE OTRO USUARIO POR ID
export async function getProfileById(userId: number): Promise<Profile> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${PROFILE_API_URL}/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el perfil');
  }

  return response.json();
}