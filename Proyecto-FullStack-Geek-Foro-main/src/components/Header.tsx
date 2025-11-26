import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAdminEmail } from '../utils/validations';

interface User {
  correo: string;
  nombre?: string;
}

export default function Header() {
  const navigate = useNavigate();
  let user: User | null = null;
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('user');
    user = raw ? JSON.parse(raw) : null;
  }
  const isAdmin = user && isAdminEmail(user.correo);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <header className="bg-dark text-light py-3 mb-4">
      <nav className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand fw-bold fs-3" style={{ color: '#fff' }}>
          Geek-Play
        </Link>
        <ul className="nav gap-2 align-items-center">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categorías
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/categorias" className="dropdown-item">Todas</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to="/videojuegos" className="dropdown-item">Videojuegos</Link></li>
              <li><Link to="/peliculas-series" className="dropdown-item">Películas & Series</Link></li>
              <li><Link to="/tecnologia" className="dropdown-item">Tecnología</Link></li>
            </ul>
          </li>
          <li className="nav-item"><Link to="/foro" className="nav-link text-light">Foro</Link></li>
          <li className="nav-item"><Link to="/contacto" className="nav-link text-light">Contacto</Link></li>
          {!user && (
            <>
              <li className="nav-item"><Link to="/registro" className="nav-link text-light">Login/Registro</Link></li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item"><Link to="/perfil" className="nav-link text-light">Perfil</Link></li>
              {isAdmin && <li className="nav-item"><Link to="/admin" className="nav-link text-light">Admin</Link></li>}
              <li className="nav-item"><button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
