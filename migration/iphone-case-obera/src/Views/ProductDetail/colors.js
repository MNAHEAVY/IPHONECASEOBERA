const colors = [
  {
    name: "Space Gray",
    class: "bg-gray-800",
    selectedClass: "ring-gray-800",
  },
  {
    name: "Silver",
    class: "bg-gray-100",
    selectedClass: "ring-gray-300",
  },
  {
    name: "Natural Titanium",
    class: "bg-gray-400",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Blue Titanium",
    class: "bg-blue-600",
    selectedClass: "ring-blue-600",
  },
  {
    name: "White Titanium",
    class: "bg-gray-200",
    selectedClass: "ring-gray-200",
  },
  {
    name: "Black Titanium",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
  },
  {
    name: "Deep Purple",
    class: "bg-purple-900",
    selectedClass: "ring-purple-900",
  },
  {
    name: "Gold",
    class: "bg-yellow-500",
    selectedClass: "ring-yellow-500",
  },
  {
    name: "Space Black",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Azul",
    class: "bg-blue-500",
    selectedClass: "ring-blue-500",
  },
  {
    name: "Rosa",
    class: "bg-pink-500",
    selectedClass: "ring-pink-500",
  },
  {
    name: "Amarillo",
    class: "bg-yellow-400",
    selectedClass: "ring-yellow-400",
  },
  {
    name: "Verde",
    class: "bg-green-500",
    selectedClass: "ring-green-500",
  },
  {
    name: "Negro",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Red Product",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Lila",
    class: "bg-purple-500",
    selectedClass: "ring-purple-500",
  },
  {
    name: "Medianoche",
    class: "bg-indigo-900",
    selectedClass: "ring-indigo-900",
  },
  {
    name: "Starlight",
    class: "bg-yellow-100",
    selectedClass: "ring-yellow-100",
  },
  {
    name: "Alpine Green",
    class: "bg-green-700",
    selectedClass: "ring-green-700",
  },
  {
    name: "Sierra Blue",
    class: "bg-blue-300",
    selectedClass: "ring-blue-300",
  },
  {
    name: "Graphite",
    class: "bg-gray-700",
    selectedClass: "ring-gray-700",
  },
  {
    name: "Blanco estelar",
    class: "bg-white",
    selectedClass: "ring-white",
  },
  {
    name: "Purpura",
    class: "bg-purple-700",
    selectedClass: "ring-purple-700",
  },
  {
    name: "Rojo Producto",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Blanco Estelar",
    class: "bg-white",
    selectedClass: "ring-white",
  },
  {
    name: "Producto Rojo",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Pacific Blue",
    class: "bg-blue-700",
    selectedClass: "ring-blue-700",
  },
  {
    name: "Blanco",
    class: "bg-white",
    selectedClass: "ring-white",
  },
  {
    name: "Rojo",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Product Red",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Midnight Green",
    class: "bg-green-900",
    selectedClass: "ring-green-900",
  },
  {
    name: "Dorado",
    class: "bg-yellow-500",
    selectedClass: "ring-yellow-500",
  },
  {
    name: "Coral",
    class: "bg-pink-300",
    selectedClass: "ring-pink-300",
  },
  {
    name: "Rose Gold",
    class: "bg-pink-400",
    selectedClass: "ring-pink-400",
  },
  {
    name: "Black",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Jet Black",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Unico",
    class: "bg-gray-500",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Naranja",
    class: "bg-orange-500",
    selectedClass: "ring-orange-500",
  },
  {
    name: "Blanco con Dorado",
    class: "bg-white",
    selectedClass: "ring-yellow-500",
  },
  {
    name: "Caja Plata Negra Correa Roja",
    class: "bg-black ring-red-600",
    selectedClass: "ring-black ring-red-600",
  },
  {
    name: "Verde Aqua",
    class: "bg-teal-400",
    selectedClass: "ring-teal-400",
  },
  {
    name: "Rosa Perla",
    class: "bg-pink-200",
    selectedClass: "ring-pink-200",
  },
  {
    name: "Pata Cruzada",
    class: "bg-gray-500",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Pata Recta",
    class: "bg-gray-500",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Plata 42 44 45 49mm",
    class: "bg-gray-300",
    selectedClass: "ring-gray-300",
  },
  {
    name: "Negro 38 40mm",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Leather Purple",
    class: "bg-purple-700",
    selectedClass: "ring-purple-700",
  },
  {
    name: "Leather Brown",
    class: "bg-amber-900",
    selectedClass: "ring-brown-500",
  },
  {
    name: "Leather Pink",
    class: "bg-pink-500",
    selectedClass: "ring-pink-500",
  },
  {
    name: "Leather Black",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Amarillo Pastel",
    class: "bg-yellow-200",
    selectedClass: "ring-yellow-200",
  },
  {
    name: "Rosa Palido",
    class: "bg-pink-300",
    selectedClass: "ring-pink-300",
  },
  {
    name: "Fucsia Fuerte",
    class: "bg-pink-600",
    selectedClass: "ring-pink-600",
  },
  {
    name: "Azul Petroleo",
    class: "bg-teal-600",
    selectedClass: "ring-teal-600",
  },
  {
    name: "Azul Oscuro",
    class: "bg-blue-900",
    selectedClass: "ring-blue-900",
  },
  {
    name: "Rojo Brillante",
    class: "bg-red-500",
    selectedClass: "ring-red-500",
  },
  {
    name: "Verde Vivo",
    class: "bg-green-600",
    selectedClass: "ring-green-600",
  },
  {
    name: "Aqua",
    class: "bg-teal-400",
    selectedClass: "ring-teal-400",
  },
  {
    name: "Celeste",
    class: "bg-sky-300",
    selectedClass: "ring-sky-300",
  },
  {
    name: "Grey Green",
    class: "bg-gray-600",
    selectedClass: "ring-gray-600",
  },
  {
    name: "Salmón",
    class: "bg-pink-400",
    selectedClass: "ring-pink-400",
  },
  {
    name: "Vinotinto",
    class: "bg-red-800",
    selectedClass: "ring-red-800",
  },
  {
    name: "Marrón",
    class: "bg-brown-700",
    selectedClass: "ring-brown-700",
  },
  {
    name: "Verde Militar",
    class: "bg-green-700",
    selectedClass: "ring-green-700",
  },
  {
    name: "Gris",
    class: "bg-gray-500",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Marfil",
    class: "bg-yellow-100",
    selectedClass: "ring-yellow-100",
  },
  {
    name: "Light-Blue",
    class: "bg-sky-400",
    selectedClass: "ring-sky-400",
  },
  {
    name: "Rosa Chicle",
    class: "bg-pink-500",
    selectedClass: "ring-pink-500",
  },
  {
    name: "Rosa Suave",
    class: "bg-pink-300",
    selectedClass: "ring-pink-300",
  },
  {
    name: "Celeste Bebe",
    class: "bg-sky-200",
    selectedClass: "ring-sky-200",
  },
  {
    name: "Azul Azure",
    class: "bg-blue-600",
    selectedClass: "ring-blue-600",
  },
  {
    name: "Celeste Caramelo",
    class: "bg-sky-500",
    selectedClass: "ring-sky-500",
  },
  {
    name: "Deep Red Ruby",
    class: "bg-red-700",
    selectedClass: "ring-red-700",
  },
  {
    name: "Verde Aqua Cámara",
    class: "bg-teal-400",
    selectedClass: "ring-teal-400",
  },
  {
    name: "Celeste Bebe Cámara",
    class: "bg-sky-200",
    selectedClass: "ring-sky-200",
  },
  {
    name: "Verde Militar Camara",
    class: "bg-green-700",
    selectedClass: "ring-green-700",
  },
  {
    name: "Lilac Camara",
    class: "bg-purple-300",
    selectedClass: "ring-purple-300",
  },
  {
    name: "Rosa Viejo",
    class: "bg-pink-400",
    selectedClass: "ring-pink-400",
  },
  {
    name: "Naranja Pastel Cámara",
    class: "bg-orange-300",
    selectedClass: "ring-orange-300",
  },
  {
    name: "Naranja Dulce",
    class: "bg-orange-400",
    selectedClass: "ring-orange-400",
  },
  {
    name: "Stone Black",
    class: "bg-gray-800",
    selectedClass: "ring-gray-800",
  },
  {
    name: "Blanco Cámara",
    class: "bg-white",
    selectedClass: "ring-white",
  },
  {
    name: "Verde Ceniza",
    class: "bg-green-600",
    selectedClass: "ring-green-600",
  },
  {
    name: "Amarillo Claro",
    class: "bg-yellow-200",
    selectedClass: "ring-yellow-200",
  },
  {
    name: "Amarillo Pastel Camara",
    class: "bg-yellow-200",
    selectedClass: "ring-yellow-200",
  },
  {
    name: "Petroleo Olio Verde",
    class: "bg-teal-600",
    selectedClass: "ring-teal-600",
  },
  {
    name: "Rosa Fluor",
    class: "bg-pink-600",
    selectedClass: "ring-pink-600",
  },
  {
    name: "Grey",
    class: "bg-gray-500",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Azul Petroleo Black",
    class: "bg-teal-700",
    selectedClass: "ring-teal-700",
  },
  {
    name: "Celeste Dark",
    class: "bg-sky-600",
    selectedClass: "ring-sky-600",
  },
  {
    name: "Celeste Ceniza",
    class: "bg-sky-400",
    selectedClass: "ring-sky-400",
  },
  {
    name: "Tendril",
    class: "bg-green-200",
    selectedClass: "ring-green-200",
  },
  {
    name: "Verde Suave Cámara",
    class: "bg-green-200",
    selectedClass: "ring-green-200",
  },
  {
    name: "Amarillo Cámara",
    class: "bg-yellow-500",
    selectedClass: "ring-yellow-500",
  },
  {
    name: "Naranja Suave Cámara",
    class: "bg-orange-300",
    selectedClass: "ring-orange-300",
  },
  {
    name: "Rojo Cámara",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Durazno",
    class: "bg-orange-300",
    selectedClass: "ring-orange-300",
  },
  {
    name: "Naranja Durazno",
    class: "bg-orange-300",
    selectedClass: "ring-orange-300",
  },
  {
    name: "Crema",
    class: "bg-yellow-100",
    selectedClass: "ring-yellow-100",
  },
  {
    name: "Lila Oscuro",
    class: "bg-purple-800",
    selectedClass: "ring-purple-800",
  },
  {
    name: "Azul Ceniza",
    class: "bg-blue-500",
    selectedClass: "ring-blue-500",
  },
  {
    name: "Coral Fuerte",
    class: "bg-orange-600",
    selectedClass: "ring-orange-600",
  },
  {
    name: "Royal Navy Blue",
    class: "bg-blue-800",
    selectedClass: "ring-blue-800",
  },
  {
    name: "Stone",
    class: "bg-gray-400",
    selectedClass: "ring-gray-400",
  },
  {
    name: "Rosa Viejo Cámara",
    class: "bg-pink-400",
    selectedClass: "ring-pink-400",
  },
  {
    name: "Azul Cámara",
    class: "bg-blue-500",
    selectedClass: "ring-blue-500",
  },
  {
    name: "Verde Claro Cámara",
    class: "bg-green-300",
    selectedClass: "ring-green-300",
  },
  {
    name: "Verde Aqua Claro",
    class: "bg-teal-300",
    selectedClass: "ring-teal-300",
  },
  {
    name: "Aqua Claro",
    class: "bg-teal-200",
    selectedClass: "ring-teal-200",
  },
  {
    name: "Rosa Pastel",
    class: "bg-pink-200",
    selectedClass: "ring-pink-200",
  },
  {
    name: "Gris Claro",
    class: "bg-gray-300",
    selectedClass: "ring-gray-300",
  },
  {
    name: "Verde Primavera",
    class: "bg-green-500",
    selectedClass: "ring-green-500",
  },
  {
    name: "Lila Pastel",
    class: "bg-purple-300",
    selectedClass: "ring-purple-300",
  },
  {
    name: "Cherry Cream",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Amarillo Limon",
    class: "bg-yellow-400",
    selectedClass: "ring-yellow-400",
  },
  {
    name: "Verde Crema",
    class: "bg-green-100",
    selectedClass: "ring-green-100",
  },
  {
    name: "Azul Electrico",
    class: "bg-blue-600",
    selectedClass: "ring-blue-600",
  },
  {
    name: "Green Gray",
    class: "bg-gray-500",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Black Stone Cámara",
    class: "bg-gray-800",
    selectedClass: "ring-gray-800",
  },
  {
    name: "Azul Petroleo Cámara",
    class: "bg-teal-600",
    selectedClass: "ring-teal-600",
  },
  {
    name: "Rosas Cámara",
    class: "bg-pink-300",
    selectedClass: "ring-pink-300",
  },
  {
    name: "Gris a Rojo Rubi",
    class: "bg-red-800",
    selectedClass: "ring-red-800",
  },
  {
    name: "Blanco a Petroleo",
    class: "bg-teal-500",
    selectedClass: "ring-teal-500",
  },
  {
    name: "Celestes",
    class: "bg-sky-300",
    selectedClass: "ring-sky-300",
  },
  {
    name: "Arcoiris Cámara",
    class: "bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400",
    selectedClass: "ring-gradient-to-r from-red-400 via-yellow-400 to-blue-400",
  },
  {
    name: "Oscuros",
    class: "bg-gray-700",
    selectedClass: "ring-gray-700",
  },
  {
    name: "Oscuros Cámara",
    class: "bg-gray-700",
    selectedClass: "ring-gray-700",
  },
  {
    name: "Sand Peach",
    class: "bg-orange-200",
    selectedClass: "ring-orange-200",
  },
  {
    name: "Rosa Crema",
    class: "bg-pink-100",
    selectedClass: "ring-pink-100",
  },
  {
    name: "Gray Lilac",
    class: "bg-purple-400",
    selectedClass: "ring-purple-400",
  },
  {
    name: "Celeste Crema",
    class: "bg-sky-100",
    selectedClass: "ring-sky-100",
  },
  {
    name: "Azul Zafiro",
    class: "bg-blue-700",
    selectedClass: "ring-blue-700",
  },
  {
    name: "Rojo Rubi",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Cereza Real",
    class: "bg-red-800",
    selectedClass: "ring-red-800",
  },
  {
    name: "Verde Tendril",
    class: "bg-green-200",
    selectedClass: "ring-green-200",
  },
  {
    name: "Rosa Fluor Cámara",
    class: "bg-pink-600",
    selectedClass: "ring-pink-600",
  },
  {
    name: "Ceniza",
    class: "bg-gray-400",
    selectedClass: "ring-gray-400",
  },
  {
    name: "Bordo Verde Bordo",
    class: "bg-red-700",
    selectedClass: "ring-red-700",
  },
  {
    name: "Magenta a Bordo",
    class: "bg-gradient-to-r from-magenta-600 to-red-700",
    selectedClass: "ring-gradient-to-r from-magenta-600 to-red-700",
  },
  {
    name: "Blanco a Petroleo Cámara",
    class: "bg-gradient-to-r from-white to-teal-600",
    selectedClass: "ring-gradient-to-r from-white to-teal-600",
  },
  {
    name: "Stone Gray Cámara",
    class: "bg-gray-600",
    selectedClass: "ring-gray-600",
  },
  {
    name: "Blue Ice Cream",
    class: "bg-sky-200",
    selectedClass: "ring-sky-200",
  },
  {
    name: "Celeste Cielo",
    class: "bg-sky-300",
    selectedClass: "ring-sky-300",
  },
  {
    name: "Rosa Cámara",
    class: "bg-pink-300",
    selectedClass: "ring-pink-300",
  },
  {
    name: "Strass Sierra Blue iPhone 13",
    class: "bg-blue-600",
    selectedClass: "ring-blue-600",
  },
  {
    name: "Strass Rosa iPhone 13",
    class: "bg-pink-400",
    selectedClass: "ring-pink-400",
  },
  {
    name: "Strass Azul iPhone 12 Pro Max",
    class: "bg-blue-500",
    selectedClass: "ring-blue-500",
  },
  {
    name: "Strass Rosa iPhone 12 Pro Max",
    class: "bg-pink-500",
    selectedClass: "ring-pink-500",
  },
  {
    name: "Strass Rojo iPhone 12 Pro Max",
    class: "bg-red-600",
    selectedClass: "ring-red-600",
  },
  {
    name: "Strass Plata iPhone 11 Pro - 11 Pro Max - 12 Pro",
    class: "bg-gray-300",
    selectedClass: "ring-gray-300",
  },
  {
    name: "Strass Sierra Blue iPhone 11 Pro - 11 Pro Max - 12 Pro",
    class: "bg-blue-500",
    selectedClass: "ring-blue-500",
  },
  {
    name: "Strass Dorado iPhone 11- 12",
    class: "bg-yellow-400",
    selectedClass: "ring-yellow-400",
  },
  {
    name: "Strass Sierra Blue iPhone 11- 12",
    class: "bg-blue-600",
    selectedClass: "ring-blue-600",
  },
  {
    name: "Strass Rosa Claro iPhone 11- 12",
    class: "bg-pink-300",
    selectedClass: "ring-pink-300",
  },
  {
    name: "Plata",
    class: "bg-gray-300",
    selectedClass: "ring-gray-300",
  },
  {
    name: "Azul Eléctrico",
    class: "bg-blue-700",
    selectedClass: "ring-blue-700",
  },
  {
    name: "Pink Sand",
    class: "bg-pink-200",
    selectedClass: "ring-pink-200",
  },
  {
    name: "Fucsia",
    class: "bg-pink-600",
    selectedClass: "ring-pink-600",
  },
  {
    name: "Arcoiris",
    class: "bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400",
    selectedClass: "ring-gradient-to-r from-red-400 via-yellow-400 to-blue-400",
  },
  {
    name: "Verde Neón",
    class: "bg-green-400",
    selectedClass: "ring-green-400",
  },
  {
    name: "Azules",
    class: "bg-blue-500",
    selectedClass: "ring-blue-500",
  },
  {
    name: "Pink Cream",
    class: "bg-pink-100",
    selectedClass: "ring-pink-100",
  },
  {
    name: "Ruby",
    class: "bg-red-800",
    selectedClass: "ring-red-800",
  },
  {
    name: "Sapphire Cream",
    class: "bg-blue-200",
    selectedClass: "ring-blue-200",
  },
  {
    name: "Sapphire",
    class: "bg-blue-800",
    selectedClass: "ring-blue-800",
  },
  {
    name: "Petroleo",
    class: "bg-teal-600",
    selectedClass: "ring-teal-600",
  },
  {
    name: "Naranja Fuerte",
    class: "bg-orange-600",
    selectedClass: "ring-orange-600",
  },
  {
    name: "Stone Cream",
    class: "bg-gray-100",
    selectedClass: "ring-gray-100",
  },
  {
    name: "Nude",
    class: "bg-neutral-200",
    selectedClass: "ring-neutral-200",
  },
  {
    name: "Dark Cherry Cream",
    class: "bg-red-700",
    selectedClass: "ring-red-700",
  },
  {
    name: "Durazno Cream",
    class: "bg-orange-300",
    selectedClass: "ring-orange-300",
  },
  {
    name: "Dark Orange Cream",
    class: "bg-orange-500",
    selectedClass: "ring-orange-500",
  },
  {
    name: "Midnight Blue",
    class: "bg-blue-900",
    selectedClass: "ring-blue-900",
  },
  {
    name: "Verde Musgo",
    class: "bg-green-600",
    selectedClass: "ring-green-600",
  },
  {
    name: "Verde Aqua Camara",
    class: "bg-teal-400",
    selectedClass: "ring-teal-400",
  },
  {
    name: "Celeste Bebe Camara",
    class: "bg-sky-300",
    selectedClass: "ring-sky-300",
  },
  {
    name: "Naranja Pastel",
    class: "bg-orange-200",
    selectedClass: "ring-orange-200",
  },
  {
    name: "Ultra Violeta",
    class: "bg-purple-800",
    selectedClass: "ring-purple-800",
  },
  {
    name: "Crema del cielo",
    class: "bg-sky-200",
    selectedClass: "ring-sky-200",
  },
  {
    name: "Celeste Nube",
    class: "bg-sky-300",
    selectedClass: "ring-sky-300",
  },
  {
    name: "Uva",
    class: "bg-purple-700",
    selectedClass: "ring-purple-700",
  },
  {
    name: "Vino",
    class: "bg-red-800",
    selectedClass: "ring-red-800",
  },
  {
    name: "Petroleo Claro",
    class: "bg-teal-400",
    selectedClass: "ring-teal-400",
  },
  {
    name: "Petroleo Cámara",
    class: "bg-teal-700",
    selectedClass: "ring-teal-700",
  },
  {
    name: "Negro Cámara",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Naranja Suave",
    class: "bg-orange-200",
    selectedClass: "ring-orange-200",
  },
  {
    name: "Tendril Camara",
    class: "bg-green-400",
    selectedClass: "ring-green-400",
  },
  {
    name: "Celeste Camara",
    class: "bg-sky-300",
    selectedClass: "ring-sky-300",
  },
  {
    name: "Uva Ceniza",
    class: "bg-purple-400",
    selectedClass: "ring-purple-400",
  },
  {
    name: "Fuscia",
    class: "bg-fuchsia-500",
    selectedClass: "ring-fuchsia-500",
  },
  {
    name: "Grey black",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
  },
  {
    name: "Azul Marino",
    class: "bg-blue-800",
    selectedClass: "ring-blue-800",
  },
  {
    name: "Glitter Dorado iPhone 13 Pro - 13 Pro Max",
    class: "bg-yellow-500",
    selectedClass: "ring-yellow-500",
  },
  {
    name: "Glitter Rosa iPhone 13 Pro - 13Pro Max",
    class: "bg-pink-400",
    selectedClass: "ring-pink-400",
  },
  {
    name: "Glitter Rosa iPhone 13 -13 Mini",
    class: "bg-pink-400",
    selectedClass: "ring-pink-400",
  },
  {
    name: "Glitter Sierra Blue iPhone 13 - 13 Mini",
    class: "bg-blue-600",
    selectedClass: "ring-blue-600",
  },
  {
    name: "Glitter Negro iPhone 13 Pro - 13 Pro Max",
    class: "bg-black",
    selectedClass: "ring-black",
  },
  {
    name: "Strass Dorado iPhone 14 -14 Plus",
    class: "bg-yellow-600",
    selectedClass: "ring-yellow-600",
  },
  {
    name: "Strass Celeste iPhone 14 - 14 Plus",
    class: "bg-sky-400",
    selectedClass: "ring-sky-400",
  },
  {
    name: "Azul a Naranja",
    class: "bg-gradient-to-r from-blue-500 to-orange-500",
    selectedClass: "ring-gradient-to-r from-blue-500 to-orange-500",
  },
  {
    name: "Amarillo a Celeste",
    class: "bg-gradient-to-r from-yellow-400 to-sky-300",
    selectedClass: "ring-gradient-to-r from-yellow-400 to-sky-300",
  },
  {
    name: "Bordos",
    class: "bg-red-800",
    selectedClass: "ring-red-800",
  },
  {
    name: "Arcoíris",
    class: "bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400",
    selectedClass: "ring-gradient-to-r from-red-400 via-yellow-400 to-blue-400",
  },
  {
    name: "Magenta a Violeta",
    class: "bg-gradient-to-r from-fuchsia-500 to-purple-700",
    selectedClass: "ring-gradient-to-r from-fuchsia-500 to-purple-700",
  },
  {
    name: "Blue",
    class: "bg-blue-500",
    selectedClass: "ring-blue-500",
  },
  {
    name: "Rose",
    class: "bg-pink-500",
    selectedClass: "ring-pink-500",
  },
  {
    name: "Gray",
    class: "bg-gray-500",
    selectedClass: "ring-gray-500",
  },
  {
    name: "Purple",
    class: "bg-purple-600",
    selectedClass: "ring-purple-600",
  },
  {
    name: "Red",
    class: "bg-red-500",
    selectedClass: "ring-red-500",
  },
  {
    name: "Yellow",
    class: "bg-yellow-400",
    selectedClass: "ring-yellow-400",
  },
  {
    name: "Lilac Cream",
    class: "bg-purple-300",
    selectedClass: "ring-purple-300",
  },
  {
    name: "Verde Citrico",
    class: "bg-lime-400",
    selectedClass: "ring-lime-400",
  },
  {
    name: "Azul Zafiro Cámara",
    class: "bg-blue-800",
    selectedClass: "ring-blue-800",
  },
  {
    name: "Dulces",
    class: "bg-pink-300",
    selectedClass: "ring-pink-300",
  },
  {
    name: "Royal Navy",
    class: "bg-blue-900",
    selectedClass: "ring-blue-900",
  },
  {
    name: "Golden Gate",
    class: "bg-yellow-600",
    selectedClass: "ring-yellow-600",
  },
  {
    name: "Flor Fucsias",
    class: "bg-fuchsia-600",
    selectedClass: "ring-fuchsia-600",
  },
  {
    name: "Yellow Cream",
    class: "bg-yellow-200",
    selectedClass: "ring-yellow-200",
  },
  {
    name: "Aqua Ceniza",
    class: "bg-teal-200",
    selectedClass: "ring-teal-200",
  },
  {
    name: "Menta",
    class: "bg-teal-300",
    selectedClass: "ring-teal-300",
  },
  {
    name: "Peach Cream",
    class: "bg-orange-100",
    selectedClass: "ring-orange-100",
  },
  {
    name: "Verde Claro",
    class: "bg-green-300",
    selectedClass: "ring-green-300",
  },
];
export default colors;
