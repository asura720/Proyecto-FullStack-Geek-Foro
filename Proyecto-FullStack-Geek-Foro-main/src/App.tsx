import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Registro from './components/Registro';
import Perfil from './components/Perfil';
import Foro from './components/Foro';
import Contacto from './components/Contacto';
import Notificaciones from './components/Notificaciones';
import Admin from './components/Admin';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay token al cargar la app
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main className="container">
        <Routes>
          {/* Ruta principal */}
          <Route 
            path="/" 
            element={<Home />}
          />

          {/* Rutas públicas */}
          <Route 
            path="/registro" 
            element={
              isAuthenticated ? (
                <Navigate to="/foro" replace />
              ) : (
                <Registro />
              )
            } 
          />

          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas protegidas */}
          <Route 
            path="/perfil" 
            element={
              isAuthenticated ? (
                <Perfil />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />

          <Route 
            path="/foro" 
            element={<Foro />}
          />

          <Route
            path="/notificaciones"
            element={
              isAuthenticated ? (
                <Notificaciones />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <Admin />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;