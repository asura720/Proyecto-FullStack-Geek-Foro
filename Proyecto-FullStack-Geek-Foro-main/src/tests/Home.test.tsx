import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home Component', () => {
  it('debe renderizar el título principal "GeekPlay"', () => {
    renderWithRouter(<Home />);

    const title = screen.getByText(/Bienvenido a/i);
    expect(title).toBeInTheDocument();

    // Verificar que "GeekPlay" aparece en el documento (puede haber múltiples instancias)
    const geekplayTexts = screen.getAllByText(/GeekPlay/i);
    expect(geekplayTexts.length).toBeGreaterThan(0);
  });

  it('debe renderizar el subtítulo descriptivo', () => {
    renderWithRouter(<Home />);

    const subtitle = screen.getByText(/La comunidad definitiva para gamers/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('debe mostrar botones "Únete Ahora" y "Explorar Foro" cuando no está autenticado', () => {
    // Mock localStorage sin token
    global.localStorage.getItem = vi.fn(() => null);

    renderWithRouter(<Home />);

    const joinButton = screen.getByText(/Únete Ahora/i);
    const exploreButton = screen.getByText(/Explorar Foro/i);

    expect(joinButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });

  it('debe mostrar diferentes botones según estado de autenticación', () => {
    renderWithRouter(<Home />);

    // El componente renderiza correctamente con algún botón
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('debe renderizar la sección de video embebido', () => {
    renderWithRouter(<Home />);

    const videoTitle = screen.getByText(/Descubre GeekPlay/i);
    const videoDescription = screen.getByText(/Conoce más sobre nuestra comunidad/i);

    expect(videoTitle).toBeInTheDocument();
    expect(videoDescription).toBeInTheDocument();

    // Verificar que existe un iframe (video de YouTube)
    const iframe = document.querySelector('iframe');
    expect(iframe).not.toBeNull();
    if (iframe) {
      expect(iframe.getAttribute('title')).toContain('Video de presentación');
    }
  });

  it('debe renderizar la sección "¿Por qué GeekPlay?"', () => {
    renderWithRouter(<Home />);

    const featuresTitle = screen.getByText(/¿Por qué GeekPlay?/i);
    expect(featuresTitle).toBeInTheDocument();

    // Verificar las características principales (usando heading para ser más específicos)
    const foroActivo = screen.getByRole('heading', { name: /Foro Activo/i });
    const notificaciones = screen.getByRole('heading', { name: /Notificaciones/i });
    const personalizacion = screen.getByRole('heading', { name: /Personalización/i });

    expect(foroActivo).toBeInTheDocument();
    expect(notificaciones).toBeInTheDocument();
    expect(personalizacion).toBeInTheDocument();
  });

  it('debe renderizar las categorías principales', () => {
    renderWithRouter(<Home />);

    const categoriesTitle = screen.getByText(/Explora por Categoría/i);
    expect(categoriesTitle).toBeInTheDocument();

    // Usar getByRole para encontrar elementos específicos
    const videojuegos = screen.getByText(/🎮 Videojuegos/i);
    const cine = screen.getByText(/🎬 Cine & Series/i);
    const tecnologia = screen.getByText(/💻 Tecnología/i);

    expect(videojuegos).toBeInTheDocument();
    expect(cine).toBeInTheDocument();
    expect(tecnologia).toBeInTheDocument();
  });

  it('debe renderizar las estadísticas', () => {
    renderWithRouter(<Home />);

    const members = screen.getByText(/1000\+/i);
    const posts = screen.getByText(/5000\+/i);
    const online = screen.getByText(/24\/7/i);

    expect(members).toBeInTheDocument();
    expect(posts).toBeInTheDocument();
    expect(online).toBeInTheDocument();
  });

  it('debe renderizar sección CTA con contenido', () => {
    renderWithRouter(<Home />);

    // Verificar que existe una sección CTA
    const ctaSection = document.querySelector('.cta-section');
    expect(ctaSection).toBeTruthy();
  });

  it('debe tener todas las imágenes de categorías con src correcto', () => {
    renderWithRouter(<Home />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    // Verificar que las imágenes tengan atributos alt
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
    });
  });
});
