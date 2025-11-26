import React, { useState } from 'react';
import { categoryItems, CategoryItem } from '../data/categoryData';

interface CategoriasProps {
  category?: string;
}

export default function Categorias({ category }: CategoriasProps = {}) {
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);

  // Determinar qué items mostrar según la categoría
  const getItemsToShow = () => {
    if (category) {
      return categoryItems.filter(item => item.categoria === category);
    }
    // Si no hay categoría específica, mostrar todas las categorías pero solo 2 items por categoría
    const videojuegos = categoryItems.filter(item => item.categoria === 'videojuegos').slice(0, 2);
    const peliculas = categoryItems.filter(item => item.categoria === 'peliculas-series').slice(0, 2);
    const tecnologia = categoryItems.filter(item => item.categoria === 'tecnologia').slice(0, 2);
    return [...videojuegos, ...peliculas, ...tecnologia];
  };

  const itemsToShow = getItemsToShow();

  const getCategoryTitle = () => {
    if (!category) return 'Categorías';
    switch (category) {
      case 'videojuegos':
        return 'Videojuegos';
      case 'peliculas-series':
        return 'Películas & Series';
      case 'tecnologia':
        return 'Tecnología';
      default:
        return 'Categorías';
    }
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'videojuegos':
        return 'bg-primary';
      case 'peliculas-series':
        return 'bg-danger';
      case 'tecnologia':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'videojuegos':
        return 'Videojuegos';
      case 'peliculas-series':
        return 'Películas & Series';
      case 'tecnologia':
        return 'Tecnología';
      default:
        return cat;
    }
  };

  return (
    <main className="container my-4">
      <h2 className="text-center mb-4">{getCategoryTitle()}</h2>

      {!category && (
        <p className="text-center text-muted mb-4">
          Explora nuestras tres categorías principales: Videojuegos, Películas & Series y Tecnología
        </p>
      )}

      <div className="row g-4">
        {itemsToShow.map(item => (
          <div className="col-md-4" key={item.id}>
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0 text-light">{item.titulo}</h5>
                  <span className={`badge ${getCategoryBadgeColor(item.categoria)}`}>
                    {getCategoryLabel(item.categoria)}
                  </span>
                </div>
                <p className="card-text text-light" style={{ opacity: 0.9 }}>{item.descripcionCorta}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {selectedItem && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedItem.titulo}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedItem(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedItem.imagen}
                  alt={selectedItem.titulo}
                  className="img-fluid mb-3 rounded"
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                />

                <span className={`badge ${getCategoryBadgeColor(selectedItem.categoria)} mb-3`}>
                  {getCategoryLabel(selectedItem.categoria)}
                </span>

                <h6 className="mt-3">Descripción</h6>
                <p>{selectedItem.descripcionDetallada}</p>

                <h6 className="mt-4">Detalles</h6>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      {Object.entries(selectedItem.detalles).map(([key, value]) => (
                        <tr key={key}>
                          <th style={{ width: '40%' }}>{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedItem(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
