import React from 'react';
import '../assets/footer.css';

interface FooterProps {
  isAuthenticated: boolean;
}

export default function Footer({ isAuthenticated }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🎮</span>
            <h3>GeekPlay</h3>
          </div>
          <p className="footer-description">
            La comunidad definitiva para gamers, cinéfilos y tech enthusiasts.
          </p>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/joaq.dz/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link instagram-link" 
              aria-label="Instagram"
              title="Síguenos en Instagram"
            >
              <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm0 2C5.6 4 4 5.6 4 7.8v8.4C4 18.4 5.6 20 7.8 20h8.4c2.2 0 3.8-1.6 3.8-3.8V7.8C20 5.6 18.4 4 16.2 4H7.8zm8.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.3 1a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Navegación</h4>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/foro">Foro</a></li>
            <li><a href="/contacto">Contacto</a></li>
            {!isAuthenticated && <li><a href="/registro">Registrarse</a></li>}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Comunidad</h4>
          <ul className="footer-links">
            <li><a href="/foro">Explorar Foro</a></li>
            <li><a href="/foro?category=videojuegos">Videojuegos</a></li>
            <li><a href="/foro?category=peliculas-series">Cine & Series</a></li>
            <li><a href="/foro?category=tecnologia">Tecnología</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="#terminos">Términos de Uso</a></li>
            <li><a href="#privacidad">Política de Privacidad</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} GeekPlay. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ por la comunidad geek</p>
      </div>

      {/* Modal Términos */}
      <div id="terminos" className="modal">
        <div className="modal-content">
          <a href="#" className="close">&times;</a>
          <h2>Términos de Uso</h2>
          <p>
            Al usar la plataforma GeekPlay, aceptas cumplir con nuestros términos y condiciones. 
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
          </p>
          <h3>Código de Conducta</h3>
          <p>
            Los usuarios deben respetar a otros miembros de la comunidad. No se tolerará el acoso, 
            el discurso de odio o el contenido ofensivo. Las violaciones pueden resultar en la 
            suspensión o eliminación de la cuenta.
          </p>
          <h3>Contenido del Usuario</h3>
          <p>
            Al publicar contenido en GeekPlay, otorgas a la plataforma una licencia para mostrar 
            tu contenido. Eres responsable de todo lo que publiques y debes asegurar que tienes 
            los derechos necesarios.
          </p>
          <h3>Limitación de Responsabilidad</h3>
          <p>
            GeekPlay se proporciona "tal como está". No nos hacemos responsables de daños indirectos 
            o incidentales derivados del uso de la plataforma.
          </p>
        </div>
      </div>

      {/* Modal Privacidad */}
      <div id="privacidad" className="modal">
        <div className="modal-content">
          <a href="#" className="close">&times;</a>
          <h2>Política de Privacidad</h2>
          <h3>Información que Recopilamos</h3>
          <p>
            GeekPlay recopila información que proporcionas directamente, como tu nombre, correo electrónico 
            e información de perfil. También recopilamos datos sobre cómo utilizas la plataforma mediante cookies 
            y tecnologías similares.
          </p>
          <h3>Cómo Usamos tu Información</h3>
          <p>
            Tu información se utiliza para mejorar nuestros servicios, personalizar tu experiencia y comunicarnos contigo. 
            No vendemos tu información personal a terceros sin tu consentimiento.
          </p>
          <h3>Seguridad de Datos</h3>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información. 
            Sin embargo, ningún método de transmisión por Internet es 100% seguro.
          </p>
          <h3>Derechos del Usuario</h3>
          <p>
            Tienes derecho a acceder, modificar o eliminar tu información personal en cualquier momento. 
            Puedes contactarnos para ejercer estos derechos.
          </p>
          <h3>Cambios en esta Política</h3>
          <p>
            Nos reservamos el derecho de actualizar esta política de privacidad. Te notificaremos de cambios significativos.
          </p>
        </div>
      </div>
    </footer>
  );
}
