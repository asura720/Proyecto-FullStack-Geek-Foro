export interface CategoryItem {
  id: string;
  titulo: string;
  categoria: 'videojuegos' | 'peliculas-series' | 'tecnologia';
  imagen: string;
  descripcionCorta: string;
  descripcionDetallada: string;
  detalles: {
    [key: string]: string;
  };
}

export const categoryItems: CategoryItem[] = [
  // Videojuegos
  {
    id: 'vj1',
    titulo: 'God of War Ragnarök',
    categoria: 'videojuegos',
    imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
    descripcionCorta: 'La épica aventura nórdica de Kratos y Atreus continúa.',
    descripcionDetallada: 'God of War Ragnarök es un videojuego de acción y aventura desarrollado por Santa Monica Studio. Kratos y Atreus deben viajar a través de los Nueve Reinos en busca de respuestas mientras las fuerzas asgardianas se preparan para una batalla profetizada que acabará con el mundo.',
    detalles: {
      'Año de salida': '2022',
      'Plataformas': 'PlayStation 4, PlayStation 5, PC',
      'Desarrollador': 'Santa Monica Studio',
      'Editor': 'Sony Interactive Entertainment',
      'Género': 'Acción, Aventura',
      'Modo de juego': 'Un jugador'
    }
  },
  {
    id: 'vj2',
    titulo: 'Elden Ring',
    categoria: 'videojuegos',
    imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png',
    descripcionCorta: 'El RPG de acción de FromSoftware y George R.R. Martin.',
    descripcionDetallada: 'Elden Ring es un juego de rol de acción desarrollado por FromSoftware en colaboración con el escritor George R.R. Martin. Los jugadores exploran un vasto mundo abierto lleno de peligros, misterios y enemigos desafiantes.',
    detalles: {
      'Año de salida': '2022',
      'Plataformas': 'PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, PC',
      'Desarrollador': 'FromSoftware',
      'Editor': 'Bandai Namco Entertainment',
      'Género': 'RPG de Acción, Souls-like',
      'Modo de juego': 'Un jugador, Multijugador'
    }
  },
  {
    id: 'vj3',
    titulo: 'The Legend of Zelda: Tears of the Kingdom',
    categoria: 'videojuegos',
  imagen: '/img/tears-of-the-kingdom.jpg',
    descripcionCorta: 'La secuela de Breath of the Wild expande las aventuras de Link.',
    descripcionDetallada: 'The Legend of Zelda: Tears of the Kingdom es la esperada secuela de Breath of the Wild. Link debe explorar los cielos, la tierra y las profundidades de Hyrule para descubrir el misterio de los cataclismos y salvar el reino una vez más.',
    detalles: {
      'Año de salida': '2023',
      'Plataformas': 'Nintendo Switch',
      'Desarrollador': 'Nintendo EPD',
      'Editor': 'Nintendo',
      'Género': 'Acción, Aventura',
      'Modo de juego': 'Un jugador'
    }
  },
  {
    id: 'vj4',
    titulo: 'Hogwarts Legacy',
    categoria: 'videojuegos',
    imagen: '/img/Hogwarts.jfif',
    descripcionCorta: 'Vive tu propia aventura en el mundo mágico de Harry Potter.',
    descripcionDetallada: 'Hogwarts Legacy es un RPG de acción de mundo abierto ambientado en el universo de Harry Potter. Los jugadores asumen el papel de un estudiante que posee la clave de un antiguo secreto que amenaza con desgarrar el mundo mágico.',
    detalles: {
      'Año de salida': '2023',
      'Plataformas': 'PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, PC, Nintendo Switch',
      'Desarrollador': 'Avalanche Software',
      'Editor': 'Warner Bros. Games',
      'Género': 'RPG de Acción',
      'Modo de juego': 'Un jugador'
    }
  },
  {
    id: 'vj5',
    titulo: 'Resident Evil 4 Remake',
    categoria: 'videojuegos',
    imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202210/0706/EVWyZD63pahuh95eKloFaJuC.png',
    descripcionCorta: 'El clásico del survival horror regresa completamente reinventado.',
    descripcionDetallada: 'Resident Evil 4 Remake es una reimaginación moderna del clásico de 2005. Leon S. Kennedy se embarca en una misión para rescatar a la hija del presidente en una remota aldea europea, donde descubre un horror inimaginable.',
    detalles: {
      'Año de salida': '2023',
      'Plataformas': 'PlayStation 4, PlayStation 5, Xbox Series X/S, PC',
      'Desarrollador': 'Capcom',
      'Editor': 'Capcom',
      'Género': 'Survival Horror',
      'Modo de juego': 'Un jugador'
    }
  },
  {
    id: 'vj6',
    titulo: 'Spider-Man 2',
    categoria: 'videojuegos',
    imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png',
    descripcionCorta: 'Peter Parker y Miles Morales enfrentan amenazas aún mayores.',
    descripcionDetallada: 'Marvel\'s Spider-Man 2 continúa la historia de los dos Spider-Men de Nueva York. Los héroes deben enfrentarse a nuevos villanos icónicos mientras luchan por proteger la ciudad que aman.',
    detalles: {
      'Año de salida': '2023',
      'Plataformas': 'PlayStation 5',
      'Desarrollador': 'Insomniac Games',
      'Editor': 'Sony Interactive Entertainment',
      'Género': 'Acción, Aventura',
      'Modo de juego': 'Un jugador'
    }
  },

  // Películas & Series
  {
    id: 'ps1',
    titulo: 'Oppenheimer',
    categoria: 'peliculas-series',
    imagen: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    descripcionCorta: 'La historia del padre de la bomba atómica.',
    descripcionDetallada: 'Oppenheimer es una película biográfica dirigida por Christopher Nolan que cuenta la historia de J. Robert Oppenheimer, el físico teórico que dirigió el Proyecto Manhattan durante la Segunda Guerra Mundial.',
    detalles: {
      'Año de estreno': '2023',
      'Director': 'Christopher Nolan',
      'Reparto': 'Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.',
      'Género': 'Biografía, Drama, Historia',
      'Duración': '180 minutos',
      'Premios': 'Oscar a Mejor Película 2024'
    }
  },
  {
    id: 'ps2',
    titulo: 'The Last of Us',
    categoria: 'peliculas-series',
    imagen: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
    descripcionCorta: 'Adaptación de la aclamada saga de videojuegos.',
    descripcionDetallada: 'The Last of Us es una serie post-apocalíptica que sigue a Joel y Ellie mientras atraviesan Estados Unidos devastado por una infección fúngica. La serie adapta fielmente el videojuego aclamado de Naughty Dog.',
    detalles: {
      'Año de estreno': '2023',
      'Creador': 'Craig Mazin, Neil Druckmann',
      'Reparto': 'Pedro Pascal, Bella Ramsey',
      'Género': 'Drama, Ciencia Ficción, Terror',
      'Temporadas': '1 (renovada para temporada 2)',
      'Plataforma': 'HBO Max'
    }
  },
  {
    id: 'ps3',
    titulo: 'Barbie',
    categoria: 'peliculas-series',
    imagen: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    descripcionCorta: 'Barbie deja Barbieland para descubrir el mundo real.',
    descripcionDetallada: 'Barbie vive en Barbieland, pero cuando comienza a tener pensamientos sobre la mortalidad, se embarca en un viaje al mundo real para descubrir el verdadero significado de ser humana.',
    detalles: {
      'Año de estreno': '2023',
      'Director': 'Greta Gerwig',
      'Reparto': 'Margot Robbie, Ryan Gosling, America Ferrera',
      'Género': 'Comedia, Fantasía',
      'Duración': '114 minutos',
      'Premios': 'Nominada a múltiples Oscar'
    }
  },
  {
    id: 'ps4',
    titulo: 'Wednesday',
    categoria: 'peliculas-series',
    imagen: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
    descripcionCorta: 'Wednesday Addams en su propia serie de Netflix.',
    descripcionDetallada: 'Wednesday es una serie que sigue a Wednesday Addams en sus años en la Academia Nevermore, donde intenta dominar su habilidad psíquica emergente mientras resuelve un misterio que involucró a sus padres hace 25 años.',
    detalles: {
      'Año de estreno': '2022',
      'Creador': 'Alfred Gough, Miles Millar',
      'Reparto': 'Jenna Ortega, Catherine Zeta-Jones, Luis Guzmán',
      'Género': 'Comedia, Misterio, Sobrenatural',
      'Temporadas': '1 (renovada para temporada 2)',
      'Plataforma': 'Netflix'
    }
  },
  {
    id: 'ps5',
    titulo: 'Dune: Part Two',
    categoria: 'peliculas-series',
    imagen: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    descripcionCorta: 'Paul Atreides une fuerzas con los Fremen.',
    descripcionDetallada: 'Dune: Part Two continúa la historia épica de Paul Atreides mientras se une a Chani y los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia.',
    detalles: {
      'Año de estreno': '2024',
      'Director': 'Denis Villeneuve',
      'Reparto': 'Timothée Chalamet, Zendaya, Austin Butler, Florence Pugh',
      'Género': 'Ciencia Ficción, Aventura',
      'Duración': '166 minutos',
      'Basada en': 'Novela de Frank Herbert'
    }
  },
  {
    id: 'ps6',
    titulo: 'Stranger Things',
    categoria: 'peliculas-series',
    imagen: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    descripcionCorta: 'Misterios sobrenaturales en Hawkins, Indiana.',
    descripcionDetallada: 'Stranger Things es una serie de ciencia ficción y terror que sigue a un grupo de amigos en la década de 1980 mientras descubren fuerzas sobrenaturales y experimentos gubernamentales secretos en su pequeño pueblo.',
    detalles: {
      'Año de estreno': '2016 - presente',
      'Creadores': 'Los Hermanos Duffer',
      'Reparto': 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder',
      'Género': 'Ciencia Ficción, Terror, Drama',
      'Temporadas': '4 (temporada final en producción)',
      'Plataforma': 'Netflix'
    }
  },

  // Tecnología
  {
    id: 'tech1',
    titulo: 'iPhone 15 Pro',
    categoria: 'tecnologia',
    imagen: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702953',
    descripcionCorta: 'El primer iPhone con titanio y puerto USB-C.',
    descripcionDetallada: 'El iPhone 15 Pro marca una nueva era para Apple con su diseño de titanio aeroespacial, el potente chip A17 Pro, y la transición a USB-C. Incluye mejoras significativas en cámara con teleobjetivo mejorado.',
    detalles: {
      'Año de lanzamiento': '2023',
      'Fabricante': 'Apple',
      'Procesador': 'A17 Pro',
      'Pantalla': '6.1 pulgadas Super Retina XDR',
      'Cámara': 'Triple 48MP principal',
      'Características destacadas': 'Titanio, USB-C, Action Button'
    }
  },
  {
    id: 'tech2',
    titulo: 'PlayStation 5 Slim',
    categoria: 'tecnologia',
    imagen: '/img/ps5slim.jpg',
    descripcionCorta: 'La consola de nueva generación ahora más compacta.',
    descripcionDetallada: 'PlayStation 5 Slim ofrece la misma potencia de la PS5 original en un diseño 30% más pequeño. Incluye 1TB de almacenamiento y soporta lectora de discos intercambiable.',
    detalles: {
      'Año de lanzamiento': '2023',
      'Fabricante': 'Sony',
      'Procesador': 'AMD Zen 2',
      'GPU': 'AMD RDNA 2',
      'Almacenamiento': '1TB SSD',
      'Características': 'Ray tracing, 4K 120Hz, Audio 3D'
    }
  },
  {
    id: 'tech3',
    titulo: 'Steam Deck OLED',
    categoria: 'tecnologia',
    imagen: '/img/steam deck.jpg',
    descripcionCorta: 'La consola portátil de PC gaming mejorada.',
    descripcionDetallada: 'Steam Deck OLED mejora la experiencia con una pantalla OLED de 7.4 pulgadas, mayor duración de batería, mejor WiFi y almacenamiento más rápido. Juega tu biblioteca de Steam en cualquier lugar.',
    detalles: {
      'Año de lanzamiento': '2023',
      'Fabricante': 'Valve',
      'Procesador': 'AMD Zen 2',
      'Pantalla': '7.4 pulgadas OLED HDR',
      'Almacenamiento': 'Hasta 1TB NVMe',
      'Características': 'Batería 50% mayor, WiFi 6E'
    }
  },
  {
    id: 'tech4',
    titulo: 'ROG Ally',
    categoria: 'tecnologia',
    imagen: '/img/rog ally.jpg',
    descripcionCorta: 'Consola portátil Windows con potencia extrema.',
    descripcionDetallada: 'ROG Ally de ASUS es una consola portátil Windows con procesador AMD Ryzen Z1 Extreme y pantalla de 120Hz. Ejecuta cualquier juego de PC y servicios de streaming.',
    detalles: {
      'Año de lanzamiento': '2023',
      'Fabricante': 'ASUS',
      'Procesador': 'AMD Ryzen Z1 Extreme',
      'Pantalla': '7 pulgadas 120Hz FHD',
      'Sistema': 'Windows 11',
      'Características': 'Xbox Game Pass, Steam, Epic Games'
    }
  },
  {
    id: 'tech5',
    titulo: 'Meta Quest 3',
    categoria: 'tecnologia',
    imagen: '/img/meta quest 3.jpg',
    descripcionCorta: 'Realidad mixta de nueva generación.',
    descripcionDetallada: 'Meta Quest 3 combina realidad virtual y aumentada con gráficos mejorados, procesador Snapdragon XR2 Gen 2, y controladores sin anillos para una experiencia inmersiva.',
    detalles: {
      'Año de lanzamiento': '2023',
      'Fabricante': 'Meta',
      'Procesador': 'Snapdragon XR2 Gen 2',
      'Resolución': '2064 x 2208 por ojo',
      'Almacenamiento': '128GB / 512GB',
      'Características': 'Realidad mixta, Pass-through color'
    }
  },
  {
    id: 'tech6',
    titulo: 'MacBook Pro M3',
    categoria: 'tecnologia',
    imagen: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200',
    descripcionCorta: 'Rendimiento profesional con el chip M3.',
    descripcionDetallada: 'MacBook Pro con chip M3 ofrece rendimiento increíble para profesionales creativos. Con hasta 22 horas de batería, pantalla Liquid Retina XDR y nuevo acabado negro espacial.',
    detalles: {
      'Año de lanzamiento': '2023',
      'Fabricante': 'Apple',
      'Procesador': 'Apple M3 / M3 Pro / M3 Max',
      'Pantalla': '14" o 16" Liquid Retina XDR',
      'RAM': 'Hasta 128GB',
      'Características': 'Ray tracing por hardware, WiFi 6E'
    }
  }
];
