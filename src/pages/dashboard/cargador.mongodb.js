// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("products");

// Create a new document in the collection.
db.getCollection("products").insertMany([
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 15 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 15 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 15",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 14 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 14 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 14",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 13 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 13 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 13",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 12 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 12",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 11 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 11 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 11",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2630_fsw9wy.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2635_iiybdq.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961347/IMG_2631_lkmu5o.heic",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 9,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Azul",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1712961346/IMG_2636_ae0bga.heic",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
]);
