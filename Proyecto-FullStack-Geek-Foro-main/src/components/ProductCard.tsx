import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  item: {
    id: string;
    title: string;
    description?: string;
  };
}

export default function ProductCard({ item }: ProductCardProps) {
  return (
    <div className="card mb-3">
      <img src="/img/Videojuegos.jfif" className="card-img-top" alt={item.title} />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.description || 'Sin descripción'}</p>
        <Link to={`/product/${item.id}`} className="btn btn-primary">Ver detalle</Link>
      </div>
    </div>
  );
}
