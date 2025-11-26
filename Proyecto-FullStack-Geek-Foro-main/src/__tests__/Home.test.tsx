import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

describe('Componente Home', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  it('debe renderizar sin errores', () => {
    renderHome();
    expect(screen.getByRole('main')).toBeDefined();
  });

  it('debe mostrar el título de bienvenida', () => {
    renderHome();
    const heading = screen.getByText(/Bienvenido a Geek-Play/i);
    expect(heading).toBeDefined();
  });

  it('debe mostrar la sección de categorías destacadas', () => {
    renderHome();
    const categorySection = screen.getByText(/Categorías Destacadas/i);
    expect(categorySection).toBeDefined();
  });

  it('debe renderizar el carrusel de imágenes', () => {
    renderHome();
    const carousel = document.querySelector('.carousel');
    expect(carousel).toBeDefined();
  });

  it('debe tener botones de navegación en el carrusel', () => {
    renderHome();
    const prevButton = screen.getByText(/Anterior/i);
    const nextButton = screen.getByText(/Siguiente/i);
    expect(prevButton).toBeDefined();
    expect(nextButton).toBeDefined();
  });

  it('debe mostrar cards de categorías', () => {
    renderHome();
    const videojuegosCards = screen.getAllByText(/Videojuegos/i);
    expect(videojuegosCards.length).toBeGreaterThan(0);
    const peliculasCards = screen.getAllByText(/Cine & Series/i);
    expect(peliculasCards.length).toBeGreaterThan(0);
    const tecnologiaCards = screen.getAllByText(/Tecnología/i);
    expect(tecnologiaCards.length).toBeGreaterThan(0);
  });

  it('debe tener enlaces a las categorías', () => {
    renderHome();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
