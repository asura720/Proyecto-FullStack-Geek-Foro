// Configuración de la API
const FORUM_API_URL = 'http://localhost:3003/api';

// Obtener el token del localStorage
function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

// ============= INTERFACES =============

export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
  slug: string;
  creadoEn: string;
}

export interface Post {
  id: number;
  titulo: string;
  contenido: string;
  categoryId: number;
  categoryNombre: string;
  autorId: number;
  autorNombre: string;
  autorAvatar: string | null;
  creadoEn: string;
  actualizadoEn: string;
}

export interface CreatePostRequest {
  titulo: string;
  contenido: string;
  categoryId: number;
}

export interface UpdatePostRequest {
  titulo: string;
  contenido: string;
}

export interface Comment {
  id: number;
  contenido: string;
  postId: number;
  autorId: number;
  autorNombre: string;
  autorAvatar: string | null;
  creadoEn: string;
  actualizadoEn: string;
}

export interface CreateCommentRequest {
  contenido: string;
}

// ============= CATEGORÍAS =============

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(`${FORUM_API_URL}/categories`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener categorías');
  }

  return response.json();
}

export async function getCategoryById(id: number): Promise<Category> {
  const response = await fetch(`${FORUM_API_URL}/categories/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener categoría');
  }

  return response.json();
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const response = await fetch(`${FORUM_API_URL}/categories/slug/${slug}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener categoría');
  }

  return response.json();
}

// ============= POSTS =============

export async function getAllPosts(): Promise<Post[]> {
  const response = await fetch(`${FORUM_API_URL}/posts`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener posts');
  }

  return response.json();
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const response = await fetch(`${FORUM_API_URL}/posts/category/${categoryId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener posts por categoría');
  }

  return response.json();
}

export async function getPostByCategorySlug(slug: string): Promise<Post[]> {
  const response = await fetch(`${FORUM_API_URL}/posts/category/slug/${slug}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener posts');
  }

  return response.json();
}

export async function getPostById(id: number): Promise<Post> {
  const response = await fetch(`${FORUM_API_URL}/posts/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener post');
  }

  return response.json();
}

export async function createPost(data: CreatePostRequest): Promise<Post> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${FORUM_API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear post');
  }

  return response.json();
}

export async function updatePost(id: number, data: UpdatePostRequest): Promise<Post> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${FORUM_API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar post');
  }

  return response.json();
}

export async function deletePost(id: number): Promise<void> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${FORUM_API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar post');
  }
}

export async function getMyPosts(): Promise<Post[]> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${FORUM_API_URL}/posts/my-posts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener tus posts');
  }

  return response.json();
}

// ============= COMENTARIOS =============

export async function getCommentsByPost(postId: number): Promise<Comment[]> {
  const response = await fetch(`${FORUM_API_URL}/comments/post/${postId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener comentarios');
  }

  return response.json();
}

export async function createComment(postId: number, data: CreateCommentRequest): Promise<Comment> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${FORUM_API_URL}/comments/post/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear comentario');
  }

  return response.json();
}

export async function updateComment(id: number, data: CreateCommentRequest): Promise<Comment> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${FORUM_API_URL}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar comentario');
  }

  return response.json();
}

export async function deleteComment(id: number): Promise<void> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${FORUM_API_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar comentario');
  }
}

export async function countCommentsByPost(postId: number): Promise<number> {
  const response = await fetch(`${FORUM_API_URL}/comments/post/${postId}/count`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al contar comentarios');
  }

  return response.json();
}