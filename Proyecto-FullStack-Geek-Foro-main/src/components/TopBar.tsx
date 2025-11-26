import React, { useState, useEffect } from 'react';
import { getCartTotal } from '../api/cart';

export default function TopBar() {
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setTotal(getCartTotal());
    const onStorage = () => setTotal(getCartTotal());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // simple behavior: emit an event or navigate; currently just logs
    console.log('Buscar:', query);
  };

  return (
    <div className="topbar bg-light py-2 border-bottom">
      <div className="container d-flex align-items-center gap-3">
        <form className="d-flex flex-grow-1" onSubmit={onSearch}>
          <input aria-label="top-search" className="form-control me-2" placeholder="Buscar" value={query} onChange={e => setQuery(e.target.value)} />
          <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>

        <div>
          <button className="btn btn-success">🛒 Carrito ${total}</button>
        </div>
      </div>
    </div>
  );
}
