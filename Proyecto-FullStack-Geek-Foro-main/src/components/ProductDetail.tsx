import React from 'react';
import { useParams } from 'react-router-dom';
import { getById, MockItem } from '../api/mockData';

export default function ProductDetail() {
  const { id } = useParams<{ id?: string }>();
  const item: MockItem | null = id ? getById(id) : null;

  if (!item) return <main className="container my-4">Item no encontrado</main>;

  return (
    <main className="container my-4">
      <h2>{item.title}</h2>
      <p>{item.description || 'Sin descripción'}</p>
    </main>
  );
}
