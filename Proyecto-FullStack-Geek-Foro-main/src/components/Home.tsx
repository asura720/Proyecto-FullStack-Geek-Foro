import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/home.css';

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bienvenido a <span className="gradient-text">GeekPlay</span>
          </h1>
          <p className="hero-subtitle">
            La comunidad definitiva para gamers, cinéfilos y tech enthusiasts
          </p>
          <div className="hero-buttons">
            {!isAuthenticated && (
              <>
                <button className="hero-btn primary" onClick={() => navigate('/registro')}>
                  Únete Ahora
                </button>
                <button className="hero-btn secondary" onClick={() => navigate('/foro')}>
                  Explorar Foro
                </button>
              </>
            )}
            {isAuthenticated && (
              <button className="hero-btn primary" onClick={() => navigate('/foro')}>
                Ir al Foro
              </button>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">🎮</div>
          <div className="floating-card card-2">🎬</div>
          <div className="floating-card card-3">💻</div>
          <div className="floating-card card-4">🎯</div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-container">
          <h2 className="section-title">Descubre GeekPlay</h2>
          <p className="video-description">
            Conoce más sobre nuestra comunidad y todo lo que tenemos para ofrecerte
          </p>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video de presentación GeekPlay"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">¿Por qué GeekPlay?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Foro Activo</h3>
            <p>Debate sobre tus juegos, películas y tecnología favorita con una comunidad apasionada</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Notificaciones</h3>
            <p>Mantente al día con respuestas a tus posts y menciones en tiempo real</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Comunidad</h3>
            <p>Conecta con otros geeks que comparten tus mismos intereses</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Personalización</h3>
            <p>Crea tu perfil único y destaca en la comunidad</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Explora por Categoría</h2>
        <div className="categories-grid">
          <div className="category-card" onClick={() => navigate('/foro?category=videojuegos')}>
            <div className="category-overlay"></div>
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
              alt="Videojuegos"
            />
            <div className="category-content">
              <h3>🎮 Videojuegos</h3>
              <p>Noticias, reviews y debates gaming</p>
            </div>
          </div>

          <div className="category-card" onClick={() => navigate('/foro?category=peliculas-series')}>
            <div className="category-overlay"></div>
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop"
              alt="Cine y Series"
            />
            <div className="category-content">
              <h3>🎬 Cine & Series</h3>
              <p>Los mejores estrenos y críticas</p>
            </div>
          </div>

          <div className="category-card" onClick={() => navigate('/foro?category=tecnologia')}>
            <div className="category-overlay"></div>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
              alt="Tecnología"
            />
            <div className="category-content">
              <h3>💻 Tecnología</h3>
              <p>Gadgets, hardware y software</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Miembros Activos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Posts Publicados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Comunidad Online</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="cta-content">
            <h2>¿Listo para unirte?</h2>
            <p>Crea tu cuenta gratis y empieza a compartir tu pasión geek</p>
            <button className="cta-button" onClick={() => navigate('/registro')}>
              Registrarse Ahora
            </button>
          </div>
        </section>
      )}
    </div>
  );
}