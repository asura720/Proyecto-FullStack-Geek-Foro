import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../assets/foro.css';

interface Category {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
}

interface Post {
  id: number;
  titulo: string;
  contenido: string;
  autorId: number;
  autorNombre: string;
  autorAvatar?: string;
  categoryId: number;
  categoryNombre: string;
  categorySlug: string;
  creadoEn: string;
  comentarios?: Comment[];
  comentariosCount?: number;
}

interface Comment {
  id: number;
  contenido: string;
  autorId: number;
  autorNombre: string;
  autorAvatar?: string;
  creadoEn: string;
}

const Foro: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({
    titulo: '',
    contenido: '',
    categoryId: 0,
  });
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{ id: number; userId: number } | null>(null);
  const [deleteReason, setDeleteReason] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    loadCategories();
    loadPosts();
  }, []);

  useEffect(() => {
    // Check if there's a category parameter in the URL
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.length > 0) {
      const category = categories.find(cat => cat.slug === categoryParam);
      if (category) {
        handleCategoryFilter(category.id);
      }
    }
  }, [searchParams, categories]);

  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const loadPosts = async (categoryId?: number) => {
    try {
      const url = categoryId
        ? `http://localhost:3003/api/posts/category/${categoryId}`
        : 'http://localhost:3003/api/posts';
      
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error al cargar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    if (categoryId) {
      loadPosts(categoryId);
    } else {
      loadPosts();
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      alert('Debes iniciar sesión para crear un post');
      return;
    }

    if (!newPost.titulo || !newPost.contenido || !newPost.categoryId) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setNewPost({ titulo: '', contenido: '', categoryId: 0 });
        setShowCreatePost(false);
        loadPosts(selectedCategory || undefined);
      } else {
        alert('Error al crear el post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el post');
    }
  };

  const handleDeletePost = async (postId: number, postUserId: number) => {
    // Si es admin, mostrar modal para motivo
    if (userRole === 'ADMIN' && userId !== postUserId.toString()) {
      setPostToDelete({ id: postId, userId: postUserId });
      setShowDeleteModal(true);
      return;
    }

    // Si es el propio usuario, eliminar directamente
    if (!confirm('¿Estás seguro de eliminar este post?')) return;
    await executeDeletePost(postId, '');
  };

  const executeDeletePost = async (postId: number, reason: string) => {
    try {
      const url = reason
        ? `http://localhost:3003/api/posts/${postId}?reason=${encodeURIComponent(reason)}`
        : `http://localhost:3003/api/posts/${postId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setPostToDelete(null);
        setDeleteReason('');
        loadPosts(selectedCategory || undefined);
        alert('Post eliminado correctamente');
      } else {
        alert('Error al eliminar el post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el post');
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteReason.trim()) {
      alert('Por favor ingresa un motivo para la eliminación');
      return;
    }
    if (postToDelete) {
      executeDeletePost(postToDelete.id, deleteReason);
    }
  };

  const loadComments = async (postId: number) => {
    try {
      const response = await fetch(`http://localhost:3003/api/comments/post/${postId}`);
      const comments = await response.json();

      setPosts(posts.map(post =>
        post.id === postId ? { ...post, comentarios: comments } : post
      ));
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  const handleToggleComments = async (postId: number) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
      await loadComments(postId);
    }
  };

  const handleAddComment = async (postId: number) => {
    if (!token) {
      alert('Debes iniciar sesión para comentar');
      return;
    }

    const contenido = newComment[postId];
    if (!contenido || !contenido.trim()) {
      alert('El comentario no puede estar vacío');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3003/api/comments/post/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ contenido: contenido.trim() }),
      });

      if (response.ok) {
        const newCommentData = await response.json();

        // Actualizar el estado de posts INMEDIATAMENTE con el nuevo comentario
        setPosts(posts.map(post => {
          if (post.id === postId) {
            const updatedComments = [...(post.comentarios || []), newCommentData];
            return {
              ...post,
              comentarios: updatedComments,
              comentariosCount: (post.comentariosCount || 0) + 1
            };
          }
          return post;
        }));

        setNewComment({ ...newComment, [postId]: '' });
      } else {
        alert('Error al agregar comentario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar comentario');
    }
  };

  const handleDeleteComment = async (postId: number, commentId: number) => {
    if (!confirm('¿Estás seguro de eliminar este comentario?')) return;

    try {
      const response = await fetch(`http://localhost:3003/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Actualizar el estado de posts INMEDIATAMENTE removiendo el comentario eliminado
        setPosts(posts.map(post => {
          if (post.id === postId) {
            const updatedComments = (post.comentarios || []).filter(c => c.id !== commentId);
            return {
              ...post,
              comentarios: updatedComments,
              comentariosCount: Math.max((post.comentariosCount || 0) - 1, 0)
            };
          }
          return post;
        }));
      } else {
        alert('Error al eliminar comentario');
      }
    } catch (error) {
      console.error('Error:', error);
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

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'videojuegos':
        return '🎮';
      case 'peliculas-series':
        return '🎬';
      case 'tecnologia':
        return '💻';
      default:
        return '📝';
    }
  };

  const filteredPosts = posts.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.contenido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="foro-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando foro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="foro-container">
      {/* Header */}
      <div className="foro-header">
        <div className="header-content">
          <h1>
            <span className="icon">💬</span>
            Foro Comunitario
          </h1>
          <p>Comparte, debate y conecta con otros geeks</p>
        </div>
        {token && (
          <button
            className="btn-create-post"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <span className="btn-icon">✍️</span>
            {showCreatePost ? 'Cancelar' : 'Crear Post'}
          </button>
        )}
      </div>

      {/* Crear Post Form */}
      {showCreatePost && (
        <div className="create-post-card">
          <h2>Crear Nuevo Post</h2>
          <form onSubmit={handleCreatePost}>
            <div className="form-group">
              <label>Categoría</label>
              <select
                className="form-select"
                value={newPost.categoryId}
                onChange={(e) => setNewPost({ ...newPost, categoryId: Number(e.target.value) })}
                required
              >
                <option value={0}>Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {getCategoryIcon(cat.slug)} {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                className="form-input"
                placeholder="Título de tu post"
                value={newPost.titulo}
                onChange={(e) => setNewPost({ ...newPost, titulo: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Contenido</label>
              <textarea
                className="form-textarea"
                placeholder="Escribe el contenido de tu post..."
                rows={5}
                value={newPost.contenido}
                onChange={(e) => setNewPost({ ...newPost, contenido: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-submit-post">
              <span className="btn-icon">🚀</span>
              Publicar
            </button>
          </form>
        </div>
      )}

      {/* Categories Filter */}
      <div className="categories-filter">
        <button
          className={`category-chip ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => handleCategoryFilter(null)}
        >
          <span className="chip-icon">📋</span>
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(category.id)}
          >
            <span className="chip-icon">{getCategoryIcon(category.slug)}</span>
            {category.nombre}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No hay posts disponibles</h3>
          <p>
            {searchTerm
              ? 'No se encontraron resultados para tu búsqueda'
              : selectedCategory
              ? 'Aún no hay posts en esta categoría'
              : 'Sé el primero en crear un post'}
          </p>
        </div>
      ) : (
        <div className="posts-list">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-category">
                  {getCategoryIcon(post.categorySlug)} {post.categoryNombre}
                </div>
                <span className="post-time">{formatDate(post.creadoEn)}</span>
              </div>

              <h3 className="post-title">{post.titulo}</h3>
              <p className="post-content">{post.contenido}</p>

              <div className="post-footer">
                <div className="post-author">
                  {post.autorAvatar && (
                    <img
                      src={post.autorAvatar}
                      alt={post.autorNombre}
                      className="author-avatar"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        marginRight: '8px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  {!post.autorAvatar && <span className="author-icon">👤</span>}
                  {post.autorNombre}
                </div>

                <div className="post-actions">
                  <button
                    className="action-btn comments"
                    onClick={() => handleToggleComments(post.id)}
                  >
                    <span className="action-icon">💬</span>
                    {post.comentariosCount ?? 0} comentarios
                  </button>

                  {(userId === post.autorId.toString() || userRole === 'ADMIN') && (
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeletePost(post.id, post.autorId)}
                    >
                      <span className="action-icon">🗑️</span>
                      Eliminar
                    </button>
                  )}
                </div>
              </div>

              {/* Comments Section */}
              {expandedPost === post.id && (
                <div className="comments-section">
                  <h4 className="comments-title">
                    💬 Comentarios ({post.comentariosCount ?? 0})
                  </h4>

                  {/* Add Comment */}
                  {token && (
                    <div className="add-comment">
                      <textarea
                        className="comment-input"
                        placeholder="Escribe un comentario..."
                        rows={3}
                        value={newComment[post.id] || ''}
                        onChange={(e) =>
                          setNewComment({ ...newComment, [post.id]: e.target.value })
                        }
                      />
                      <button
                        className="btn-add-comment"
                        onClick={() => handleAddComment(post.id)}
                      >
                        <span className="btn-icon">📤</span>
                        Comentar
                      </button>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="comments-list">
                    {post.comentarios && post.comentarios.length > 0 ? (
                      post.comentarios.map((comment) => (
                        <div key={comment.id} className="comment-item">
                          <div className="comment-header">
                            <span className="comment-author">
                              {comment.autorAvatar && (
                                <img
                                  src={comment.autorAvatar}
                                  alt={comment.autorNombre}
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    marginRight: '6px',
                                    objectFit: 'cover',
                                    verticalAlign: 'middle'
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              )}
                              {!comment.autorAvatar && <span className="author-icon">👤</span>}
                              {comment.autorNombre}
                            </span>
                            <span className="comment-time">
                              {formatDate(comment.creadoEn)}
                            </span>
                          </div>
                          <p className="comment-content">{comment.contenido}</p>
                          {(userId === comment.autorId.toString() || userRole === 'ADMIN') && (
                            <button
                              className="btn-delete-comment"
                              onClick={() => handleDeleteComment(post.id, comment.id)}
                            >
                              🗑️ Eliminar
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="no-comments">No hay comentarios aún. ¡Sé el primero!</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de eliminación con motivo */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
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
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '30px',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <h3 style={{
              marginBottom: '20px',
              color: '#dc3545',
              fontSize: '24px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              ⚠️ Eliminar Publicación
            </h3>
            <p style={{
              marginBottom: '20px',
              color: '#495057',
              fontSize: '15px',
              lineHeight: '1.6'
            }}>
              Como administrador, debes proporcionar un motivo para eliminar esta publicación.
              El usuario recibirá una notificación con el motivo.
            </p>
            <textarea
              placeholder="Escribe el motivo de la eliminación..."
              rows={4}
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
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
                backgroundColor: '#ffffff',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPostToDelete(null);
                  setDeleteReason('');
                }}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '2px solid #6c757d',
                  background: '#ffffff',
                  color: '#6c757d',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#6c757d';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#6c757d';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#dc3545',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(220, 53, 69, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#bb2d3b';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(220, 53, 69, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc3545';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(220, 53, 69, 0.3)';
                }}
              >
                Eliminar Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Foro;