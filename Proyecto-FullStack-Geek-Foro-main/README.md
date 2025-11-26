# Proyecto GeekPlay — Frontend (React)

Micro-proyecto para la migración de un sitio estático a React con Vite, Bootstrap y tests con Vitest.

Características implementadas
- React + Vite scaffold
- Migración de HTML a componentes reutilizables
- Mock data module (`src/api/mockData.js`) con operaciones CRUD persistidas en `localStorage`
- Diseño responsivo con Bootstrap y estilos adaptados
- Vistas: Inicio, Categorías (con búsqueda), Foro, Contacto, Registro, Perfil, Admin, Detalle de producto
- Interactividad: formularios, búsqueda/filtrado, panel admin (crear/editar/eliminar)
- Tests: Vitest + React Testing Library (tests para mockData, Home y Admin)

Cómo ejecutar

1. Instala dependencias:

```powershell
cd 'c:\React\GeekPlay Ev1'
npm install
```

2. Levanta el servidor de desarrollo:

```powershell
npm run dev
```

3. Ejecuta tests (watch):

```powershell
npm test
```

Notas
- Hay algunas vulnerabilidades reportadas por `npm audit` en dependencias transitorias; no afectan la funcionalidad del proyecto. Ejecuta `npm audit` si quieres revisar.
- Para producción, considera añadir un manejo de autenticación real y protecciones en el backend.
# Proyecto GeekPlay EV1 🎮📺📱

Proyecto semestral FullStack desarrollado en Duoc UC para la gestión de contenidos geek: cine, videojuegos y tecnología.

## 🧠 Objetivos

- Integrar frontend (HTML/CSS/JS) con backend PL/SQL
- Automatizar procesos como registro, login y gestión de stock
- Justificar decisiones técnicas alineadas con el contexto de negocio
- Documentar entregables según rúbrica académica


