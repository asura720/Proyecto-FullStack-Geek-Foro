import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Categorias from '../components/Categorias';

describe('Componente Categorias', () => {
  const renderCategorias = () => {
    return render(
      <BrowserRouter>
        <Categorias />
      </BrowserRouter>
    );
  };

  it('debe renderizar sin errores', () => {
    renderCategorias();
    expect(screen.getByRole('main')).toBeDefined();
  });

  it('debe mostrar el título de Categorías', () => {
    renderCategorias();
    const titles = screen.getAllByText(/Categorías/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  it('debe mostrar items de categorías', () => {
    renderCategorias();
    const cards = document.querySelectorAll('.card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('debe mostrar botones "Ver detalles"', () => {
    renderCategorias();
    const detailButtons = screen.getAllByText(/Ver detalles/i);
    expect(detailButtons.length).toBeGreaterThan(0);
  });

  it('debe renderizar imágenes de items', () => {
    renderCategorias();
    const images = document.querySelectorAll('.card-img-top');
    expect(images.length).toBeGreaterThan(0);
  });

  it('debe mostrar badges de categorías', () => {
    renderCategorias();
    const badges = document.querySelectorAll('.badge');
    expect(badges.length).toBeGreaterThan(0);
  });
});
