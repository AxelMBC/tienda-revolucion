import type {
  CardStatus,
  Category,
  CategoryMeta,
  Product,
  Size,
  SortKey,
} from "./types";

const CATEGORIES: CategoryMeta[] = [
  {
    slug: "playeras",
    label: "Playeras",
    cover: "/Products/playera-elVitor.png",
    tagline: "Gráficas de autor, algodón con peso.",
  },
  {
    slug: "camisas",
    label: "Camisas",
    cover: "/Products/camisa-morada.png",
    tagline: "Cortes sastreros, telas que respiran.",
  },
  {
    slug: "chaquetas",
    label: "Chaquetas",
    cover: "/Products/hoodie.png",
    tagline: "Capas que cuentan historia.",
  },
  {
    slug: "pantalones",
    label: "Pantalones",
    cover: "/images/categories/pantalones.svg",
    tagline: "Sastrería urbana, presencia diaria.",
  },
  {
    slug: "accesorios",
    label: "Accesorios",
    cover: "/images/categories/accesorios.svg",
    tagline: "Hardware con peso. Detalle con intención.",
  },
];

const DEFAULT_SHIPPING = {
  local: "Nayarit · 24–48 h",
  localNote: "Resto del país: 3–5 días hábiles.",
  pickup: "En la tienda, mismo día",
  pickupNote: "Av. México 234, Centro · Tepic.",
};

export const PRODUCTS: Product[] = [
  {
    slug: "playera-boss-heritage",
    name: "Playera Boss Heritage",
    description:
      "Algodón pesado en negro absoluto. Gráfica Boss bordada al frente. Corte recto, cuello reforzado. Una pieza diaria con presencia.",
    price: 890,
    images: ["/Products/playera-boss.png", "/Products/playera-boss1.png"],
    imageLabels: ["Vista frontal", "Espalda", "Detalle", "Caída"],
    category: "playeras",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    stock: 16,
    featured: true,
    material: "Algodón pesado",
    finish: "Negro absoluto · Bordado Boss",
    lede:
      "Negra, densa, sin gráfica gritada. La playera que se pone en silencio y dura una década.",
    status: "Stock estable, todas las tallas",
    edition: "lote de 24 piezas · OI MMXXVI",
    specs: {
      material:
        "Algodón pesado 100% · 240 g/m², peinado en hilo doble",
      corte: "Recto · hombro estructurado, caída plomada",
      hechura: "Confeccionada por Taller Sandoval, Guadalajara, abril 2026",
      color: "Negro absoluto · teñido en pieza",
      cuidado: "Lavar en frío, del revés. Secar a la sombra. No usar secadora.",
      procedencia: "Hilo de Aguascalientes · corte y bordado en Jalisco",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Por qué pedimos una playera más pesada de lo normal.",
      lede:
        "La mayoría de las playeras negras del mercado se decoloran al tercer lavado. Esta no.",
      paragraphs: [
        "Cuando Iván montó la tienda en 2023, lo primero que buscó fue una playera negra que aguantara. Probamos seis talleres antes de quedarnos con Sandoval, en la colonia Mexicaltzingo de Guadalajara. Don Pedro Sandoval lleva treinta y dos años cortando algodón pesado para clientes que no piden lotes grandes.",
        "El algodón viene de un hilador en Aguascalientes que aún teje en máquinas circulares de los años setenta. El resultado es una tela densa pero respirable — 240 gramos por metro, casi el doble que una playera de fast fashion.",
        "El bordado Boss al frente se hace a mano, en una sola pasada. No es estampado: cada pieza tarda once minutos en bordarse. Por eso el lote es de veinticuatro y no de doscientas. Pedimos un lote nuevo cuando se acaba este.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el algodón",
      text: "“Una playera negra debe envejecer como una chamarra de cuero: ganando carácter, no perdiéndolo.”",
      attribution: "— Don Pedro Sandoval, taller de Guadalajara",
    },
  },
  {
    slug: "playera-boss-vintage",
    name: "Playera Boss Vintage",
    description:
      "Edición lavada en algodón orgánico. Bordado vintage al pecho, costuras envejecidas a mano. Lote corto.",
    price: 990,
    images: ["/Products/playera-boss-2.png", "/Products/playera-boss3.png"],
    imageLabels: ["Vista frontal", "Espalda", "Detalle bordado", "Caída"],
    category: "playeras",
    sizes: ["M", "L", "XL"],
    defaultSize: "M",
    stock: 8,
    featured: true,
    material: "Algodón orgánico",
    finish: "Lavado piedra · Bordado vintage",
    lede:
      "Lavada con piedra antes de venderse. El tono ya tiene historia cuando llega al cuerpo.",
    status: "Quedan pocas en M",
    edition: "edición limitada · 18 piezas",
    specs: {
      material: "Algodón orgánico 100% · 220 g/m², certificado GOTS",
      corte: "Caída suelta · cuello redondo con refuerzo de doble pespunte",
      hechura: "Lavada y envejecida a mano en taller de Doña Lupita, León",
      color: "Negro humo · lavado piedra mineral",
      cuidado: "Lavar en frío, del revés. No clorar. Plancha tibia.",
      procedencia: "Algodón certificado de Comarca Lagunera · acabado en León",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "El proceso que le quita un día a la fábrica y se lo regala al cuerpo.",
      lede:
        "Lavado con piedra no es una etiqueta de marketing. Es treinta y seis horas de tambor con piedra volcánica de Michoacán.",
      paragraphs: [
        "Cuando Doña Lupita Romero recibe el lote desde el taller, la tela todavía es negra dura — el tono industrial que sale del teñido. Lo que la convierte en esta playera es lo que pasa después.",
        "Treinta y seis horas dentro de un tambor giratorio con piedra volcánica picada. La piedra abre las fibras del algodón sin quemarlas, suaviza el peso y abre un tono humo que el teñido por sí solo nunca alcanza.",
        "Cada lote sale ligeramente distinto. Eso es parte de lo que estamos comprando. Si dos playeras se ven idénticas, alguien hizo trampa con un químico.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el lavado",
      text: "“La piedra no envejece la tela. Sólo le quita la prisa.”",
      attribution: "— Doña Lupita Romero, lavandería artesanal en León",
    },
  },
  {
    slug: "playera-el-vitor",
    name: "Playera El Vitor",
    description:
      "Gráfica de autor en algodón peinado. Negro profundo, impresión a mano. Colaboración limitada.",
    price: 790,
    images: ["/Products/playera-elVitor.png"],
    imageLabels: ["Vista frontal", "Espalda", "Detalle gráfica", "Caída"],
    category: "playeras",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    stock: 11,
    featured: false,
    material: "Algodón peinado",
    finish: "Negro profundo · Impresión a mano",
    lede:
      "Una gráfica del ilustrador Víctor Cárdenas, impresa a mano una por una. Sin reediciones.",
    status: "Colaboración cerrada, no se repite",
    edition: "colaboración · 40 piezas firmadas",
    specs: {
      material: "Algodón peinado 100% · 200 g/m², hilatura de Querétaro",
      corte: "Regular · caída ligeramente boxy",
      hechura: "Impresión serigráfica manual por El Vitor, Guadalajara",
      color: "Negro profundo · tinta plastisol mate",
      cuidado: "Lavar en frío, del revés. No planchar sobre la gráfica.",
      procedencia: "Tela de Querétaro · estampada y firmada en Guadalajara",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "El día que Víctor Cárdenas pidió que no se reimprimiera.",
      lede:
        "Cuarenta piezas, firmadas, numeradas. Cuando se acaben, se acabaron.",
      paragraphs: [
        "Víctor — El Vitor — es ilustrador de carteles de lucha libre en Guadalajara. Tiene una estética que mezcla tipografía de los setenta con dibujo a tinta china. Le propusimos hacer una playera y aceptó con una condición: cuarenta piezas, sin reedición, firma y número en la etiqueta interior.",
        "La impresión la hace él mismo, en un taller pequeño en la colonia Santa Tere. Tinta plastisol mate, una sola pasada. La firma va al interior, en serigrafía sobre la etiqueta de algodón.",
        "Cuando se acaben las cuarenta no hay segunda parte. Es un objeto, no un producto.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre las ediciones",
      text: "“Reimprimir mata el objeto. Lo convierte en mercancía.”",
      attribution: "— Víctor Cárdenas (El Vitor), ilustrador",
    },
  },
  {
    slug: "playera-off-white-essential",
    name: "Playera Off White Essential",
    description:
      "Blanco hueso, algodón mercerizado. Cuello redondo limpio, cae suelta sin perder forma. La base del uniforme.",
    price: 690,
    images: ["/Products/playera-offWhite.png"],
    imageLabels: ["Vista frontal", "Espalda", "Cuello", "Caída"],
    category: "playeras",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    stock: 20,
    featured: false,
    material: "Algodón mercerizado",
    finish: "Blanco hueso · Cuello redondo",
    lede:
      "Hueso, no blanco óptico. El tono que no compite con la piel ni con el resto de la ropa.",
    status: "Reposición fija, todas las tallas",
    edition: "modelo de catálogo permanente",
    specs: {
      material: "Algodón mercerizado 100% · 180 g/m², hilo egipcio recombinado",
      corte: "Regular · cuello redondo bajo, hombro ligeramente caído",
      hechura: "Confeccionada por Taller Sandoval, Guadalajara",
      color: "Blanco hueso · sin blanqueadores ópticos",
      cuidado: "Lavar en frío con detergente neutro. Plancha media.",
      procedencia: "Hilo de Aguascalientes · corte en Jalisco",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Por qué nunca tenemos blancos ópticos en la tienda.",
      lede:
        "El blanco óptico es un truco químico. La playera te mira más blanca que tu propia piel, y nada más.",
      paragraphs: [
        "Los blancos ópticos llevan abrillantadores que reaccionan con la luz UV. Es la razón por la que una playera blanca de tienda de centro comercial brilla más que cualquier cosa que tengas puesta.",
        "Nosotros pedimos a Sandoval algodón sin esos químicos. El resultado es un blanco hueso — tirando a crudo — que se lleva bien con tonos de piel, con el resto de la ropa, y con un cuarto iluminado por sol.",
        "Es la única playera de la tienda que pedimos en lote grande y reponemos a la primera. Es la base del uniforme.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el blanco",
      text: "“El blanco hueso envejece con dignidad. El blanco óptico se ve sucio a los seis lavados.”",
      attribution: "— Don Pedro Sandoval, taller de Guadalajara",
    },
  },
  {
    slug: "camisa-morada-noche",
    name: "Camisa Morada Noche",
    description:
      "Camisa en morado profundo, tejido satinado con caída pesada. Cuello cubano abierto, botonadura discreta. Pieza de noche con presencia inequívoca.",
    price: 2290,
    images: ["/Products/camisa-morada.png"],
    imageLabels: ["Vista frontal", "Espalda", "Detalle cuello", "Caída"],
    category: "camisas",
    sizes: ["S", "M", "L"],
    defaultSize: "M",
    stock: 5,
    featured: true,
    material: "Seda jacquard",
    finish: "Morado profundo · Jacquard geom.",
    lede:
      "Morada, para la noche larga. Seda jacquard con peso, cuello cubano, ningún botón gritado.",
    status: "Últimas en S y L",
    edition: "edición limitada · 14 piezas",
    specs: {
      material: "Seda 100% · jacquard geométrico, 95 g/m²",
      corte: "Cuello cubano · caída a la cadera, espalda con vista",
      hechura: "Confeccionada por Doña Carmen Téllez, taller de Hidalgo",
      color: "Morado noche · teñido en madeja",
      cuidado: "Lavar a mano en frío. Secar plana. Planchar al revés, vapor.",
      procedencia: "Seda hilada en Real del Monte · costura en Pachuca",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Cómo llegó esta camisa a la pared del fondo.",
      lede:
        "Encontramos a Doña Carmen por accidente, buscando rebozos en Real del Monte. Salimos con una promesa de catorce camisas.",
      paragraphs: [
        "Doña Carmen Téllez teje seda en un taller de cinco telares, en una calle empinada de Real del Monte, Hidalgo. Su familia teje desde los años sesenta. Cuando le pedimos hacer camisas de hombre, dudó dos meses — nunca había cortado para hombre.",
        "El morado lo escogió ella. Lo tiñó en madeja, antes de tejer, con anilina natural sobre baño de ácido cítrico. El jacquard geométrico es una variación de un patrón que su madre dibujó en los setenta para un encargo que nunca se entregó.",
        "Catorce camisas. Una por cada año que llevaba sin cortar para nadie nuevo. Cuando se acaben, no hay forma de pedir más rápido.",
        "Es la pieza más cara del catálogo y la que más nos costó traer.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre la seda",
      text: "“La seda quiere quietud. Hay que cortar despacio o se enoja.”",
      attribution: "— Doña Carmen Téllez, taller de Hidalgo",
    },
  },
  {
    slug: "camisa-lino-obsidiana",
    name: "Camisa Lino Obsidiana",
    description:
      "Lino italiano teñido en negro profundo. Botonadura de hueso pulido y costuras a mano en el cuello. Cae limpia, respira en climas cálidos.",
    price: 1490,
    images: [
      "/images/products/camisa-lino-obsidiana-1.svg",
      "/images/products/camisa-lino-obsidiana-2.svg",
    ],
    imageLabels: ["Vista frontal", "Espalda", "Botón de hueso", "Caída"],
    category: "camisas",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    stock: 12,
    featured: false,
    material: "Lino italiano",
    finish: "Negro tinta · Botón de hueso",
    lede:
      "Lino negro que respira en clima de Tepic. Botones de hueso pulidos uno por uno.",
    status: "Disponible en todas las tallas",
    edition: "lote de 24 piezas · primavera MMXXVI",
    specs: {
      material: "Lino italiano 100% · 160 g/m², tejido fino",
      corte: "Cuello francés · caída recta, puños con botón sencillo",
      hechura: "Cortada y cosida por Maestro Eulalio Pérez, Pachuca",
      color: "Negro tinta · teñido en pieza",
      cuidado: "Lavar a mano en frío. Tender plana. Vapor para arrugado leve.",
      procedencia: "Lino de Biella, Italia · acabado en Hidalgo",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "La camisa para el calor sin aire acondicionado.",
      lede:
        "Tepic veraniega es treinta y seis grados con humedad alta. La mayoría de la ropa negra del mercado es impensable. Esta no.",
      paragraphs: [
        "El lino italiano de Biella se teje fino — 160 gramos por metro — pero conserva la rigidez que da forma al cuello. El secreto está en el tejido cruzado, que abre microporos que ventilan el cuerpo.",
        "Los botones son de hueso de res, pulidos a mano por Don Eulalio Pérez en su taller de Pachuca. Cada botón tarda cuatro minutos. Hay seis botones por camisa. Los puños llevan uno sencillo, sin ornamento.",
        "Es la camisa negra que se puede usar en agosto sin morir. Y la que ningún sastre del centro comercial sabe cómo cortar.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el lino",
      text: "“El lino arrugado no es un defecto. Es el lino diciéndole al algodón que también está vivo.”",
      attribution: "— Maestro Eulalio Pérez, sastre en Pachuca",
    },
  },
  {
    slug: "camisa-oxford-espresso",
    name: "Camisa Oxford Espresso",
    description:
      "Oxford pesado en marrón espresso. Construcción heritage, puños reforzados. Pensada para durar décadas.",
    price: 1290,
    images: [
      "/images/products/camisa-oxford-espresso-1.svg",
      "/images/products/camisa-oxford-espresso-2.svg",
    ],
    imageLabels: ["Vista frontal", "Espalda", "Puño", "Caída"],
    category: "camisas",
    sizes: ["M", "L", "XL"],
    defaultSize: "L",
    stock: 9,
    featured: false,
    material: "Oxford pesado",
    finish: "Marrón espresso · Puños reforzados",
    lede:
      "Marrón espresso, oxford pesado, sin pretensiones. La camisa que envejece bien por insistencia.",
    status: "Stock estable",
    edition: "modelo de catálogo permanente",
    specs: {
      material: "Algodón oxford 100% · 210 g/m², tejido cruzado",
      corte: "Cuello con botón · puños reforzados con triple pespunte",
      hechura: "Confeccionada por Hilados Reyes, León",
      color: "Marrón espresso · teñido en madeja",
      cuidado: "Lavar en frío. Plancha media. Sin secadora.",
      procedencia: "Algodón de la Laguna · acabado en Guanajuato",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Por qué pedimos triple pespunte en cada puño.",
      lede:
        "El puño es lo primero que se desgasta. Y lo más caro de reemplazar.",
      paragraphs: [
        "Una camisa heritage no se mide por la tela. Se mide por las costuras que ves cuando llevas el saco quitado y la manga arremangada. Por eso pedimos a Don Mateo Reyes que cosa los puños con triple pespunte, no doble.",
        "El oxford pesado es una tela tejida en cruzado abierto. Le gusta el detergente neutro y odia la secadora. A cambio dura quince años si se lava con calma.",
        "El marrón espresso lo tiñen en madeja antes de tejer, lo que produce un tono más profundo y menos disparejo que el teñido en pieza terminada.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el oxford",
      text: "“Una camisa oxford bien cosida es la única prenda que no necesita ser nueva para verse limpia.”",
      attribution: "— Don Mateo Reyes, Hilados Reyes en León",
    },
  },
  {
    slug: "pantalon-sastre-noche",
    name: "Pantalón Sastre Noche",
    description:
      "Lana fría con caída arquitectónica. Pinzas profundas, dobladillo limpio. El estándar para ocasiones donde no hay ensayo.",
    price: 2490,
    images: [
      "/images/products/pantalon-sastre-noche-1.svg",
      "/images/products/pantalon-sastre-noche-2.svg",
    ],
    imageLabels: ["Vista frontal", "Espalda", "Pinza", "Caída"],
    category: "pantalones",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    stock: 10,
    featured: false,
    material: "Lana fría",
    finish: "Negro · Pinzas profundas",
    lede:
      "Negro lana fría. Cae como cae un pantalón sastreado, no como cae un pantalón comprado.",
    status: "Disponible en todas las tallas",
    edition: "modelo de catálogo permanente · OI MMXXVI",
    specs: {
      material: "Lana fría 100% · 280 g/m², super 110s italiana",
      corte: "Sastre · pinzas profundas, talle alto, caída recta",
      hechura: "Sastreado por Taller Salazar, Polanco — entrega cuatro semanas",
      color: "Negro carbón · teñido en madeja",
      cuidado: "Limpieza en seco. Cepillar con cepillo de cerdas naturales.",
      procedencia: "Lana de Biella, Italia · sastreo en CDMX",
    },
    shipping: {
      ...DEFAULT_SHIPPING,
      localNote: "Sastreado a pedido: cuatro semanas antes de envío.",
    },
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Por qué tarda cuatro semanas en llegar a tu casa.",
      lede:
        "Este pantalón no está en stock. Se sastrea cuando se compra.",
      paragraphs: [
        "El Taller Salazar es un sastre de tercera generación en Polanco. Don Salvador Salazar, el actual maestro, cose cada pantalón en una semana de trabajo neto. Antes de eso, hay que medir, hay que cortar y hay que ajustar la primera prueba.",
        "Nosotros pedimos un pantalón cuando alguien lo compra. La lana fría italiana viaja desde Biella en lotes de cuatro metros. El sastreo lleva veinte días. El envío a Tepic agrega tres días más.",
        "Lo que recibes es un pantalón hecho para ti. No tu talla genérica — tu medida exacta, sobre el patrón que Salazar tiene de hombres con tu mismo tipo de cadera.",
        "Si necesitas un pantalón para mañana, este no es el pantalón.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el sastreo",
      text: "“Un pantalón sastreado no envejece. Sólo se vuelve más suyo.”",
      attribution: "— Don Salvador Salazar, sastre en Polanco",
    },
  },
  {
    slug: "pantalon-cargo-utility",
    name: "Pantalón Cargo Utility",
    description:
      "Algodón ripstop reforzado, bolsillos de cargo profundos con cierres ocultos. Silueta cónica, pegada a la bota.",
    price: 1790,
    images: [
      "/images/products/pantalon-cargo-utility-1.svg",
      "/images/products/pantalon-cargo-utility-2.svg",
    ],
    imageLabels: ["Vista frontal", "Espalda", "Bolsillo cargo", "Caída"],
    category: "pantalones",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    stock: 14,
    featured: false,
    material: "Algodón ripstop",
    finish: "Verde militar · Bolsillos cargo",
    lede:
      "Cargo verdadero, no estilizado. Ripstop con bolsillos que de hecho cargan cosas.",
    status: "Stock estable",
    edition: "lote de 30 piezas · primavera MMXXVI",
    specs: {
      material: "Algodón ripstop 100% · 260 g/m², trama reforzada en cuadrícula",
      corte: "Cónico · cintura ajustable, bolsillos cargo a media pierna",
      hechura: "Confeccionada por Taller Norte, Monterrey",
      color: "Verde militar oliva · teñido en pieza",
      cuidado: "Lavar en frío. Plancha tibia. Tolera secadora baja.",
      procedencia: "Algodón ripstop tejido en Tlaxcala · costura en NL",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Cargos que cargan, no decoraciones cargo.",
      lede:
        "La mayoría de los cargo de hoy tienen bolsillos de cinco centímetros y un cierre que es de adorno. Estos no.",
      paragraphs: [
        "El bolsillo cargo original — el de los pantalones de paracaidista de los cuarenta — guardaba un mapa enrollado, una linterna y una cantimplora. Hoy un cargo cabe apenas un celular doblado en dos.",
        "Cuando pedimos estos al Taller Norte de Monterrey, especificamos profundidad mínima: veintidós centímetros, suficiente para una libreta tamaño media carta. Los cierres son ocultos, no a la vista, para no romper la línea del muslo.",
        "El ripstop es un tejido militar, con una cuadrícula reforzada cada milímetro. Si se rasga, no se sigue rasgando. Por eso lo eligen los carteros, los electricistas y los albañiles que cargan herramientas.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el ripstop",
      text: "“Un cargo decorativo es como una bota sin suela. Mejor compra un jean.”",
      attribution: "— Pedro Cantú, Taller Norte en Monterrey",
    },
  },
  {
    slug: "pantalon-lino-bone",
    name: "Pantalón Lino Hueso",
    description:
      "Lino crudo en tono hueso. Cordón interior, caída suelta. Veranos largos, ciudades calurosas.",
    price: 1390,
    images: [
      "/images/products/pantalon-lino-bone-1.svg",
      "/images/products/pantalon-lino-bone-2.svg",
    ],
    imageLabels: ["Vista frontal", "Espalda", "Cordón interior", "Caída"],
    category: "pantalones",
    sizes: ["M", "L", "XL"],
    defaultSize: "L",
    stock: 7,
    featured: false,
    material: "Lino crudo",
    finish: "Tono hueso · Cordón interior",
    lede:
      "Lino crudo, sin teñir. El tono que sale del telar. Cordón en lugar de cinturón.",
    status: "Pocas piezas, reponemos en julio",
    edition: "lote de 20 piezas · verano MMXXVI",
    specs: {
      material: "Lino crudo 100% · 200 g/m², tejido medio",
      corte: "Suelto · cordón de algodón interior, caída ancha",
      hechura: "Confeccionada por Doña Carmen Téllez, taller de Hidalgo",
      color: "Hueso natural · sin teñir",
      cuidado: "Lavar a mano en frío. Tender plana. Vapor.",
      procedencia: "Lino de Biella · costura en Real del Monte",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "El pantalón que se pone arrugado y no le importa.",
      lede:
        "El lino sin teñir tiene un tono que ningún teñido logra. Es el color del campo.",
      paragraphs: [
        "Cuando Doña Carmen nos mandó la primera muestra, nos preguntó si lo queríamos teñir. Dijimos que no. El lino crudo tiene un color hueso natural — entre amarillo claro y blanco humo — que es el resultado de la fibra cruda contra el telar.",
        "El cordón interior es de algodón trenzado a mano, en lugar de cinturón. Es más cómodo, más suelto, y elimina la línea visual horizontal que corta el torso.",
        "El lino arrugado no es un defecto. Es la forma natural del lino contra el cuerpo. Si te molesta, este pantalón no es para ti.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el crudo",
      text: "“El lino sin teñir es el lino siendo lino. Lo demás es disfraz.”",
      attribution: "— Doña Carmen Téllez, taller de Hidalgo",
    },
  },
  {
    slug: "hoodie-negro-heritage",
    name: "Hoodie Negro Heritage",
    description:
      "Felpa pesada en negro absoluto, forro interior cepillado. Capucha estructurada con cordón de algodón crudo. La capa diaria para los meses fríos.",
    price: 1690,
    images: ["/Products/hoodie.png"],
    imageLabels: ["Vista frontal", "Espalda", "Capucha", "Caída"],
    category: "chaquetas",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "L",
    stock: 9,
    featured: true,
    material: "Felpa pesada",
    finish: "Negro humo · 480 gsm",
    lede:
      "Felpa pesada de 480 gramos. La sudadera que pesa como una chamarra.",
    status: "Quedan pocas en L y XL",
    edition: "modelo de catálogo · OI MMXXVI",
    specs: {
      material: "Algodón felpa 100% · 480 g/m², cepillada por dentro",
      corte: "Regular · capucha estructurada, bolsillo canguro corrido",
      hechura: "Confeccionada por Maestra Lupita Romero, taller de León",
      color: "Negro humo · teñido en pieza",
      cuidado: "Lavar en frío del revés. Secar plana. No clorar.",
      procedencia: "Hilo de Aguascalientes · costura en León",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Por qué pesa el doble que una sudadera normal.",
      lede:
        "480 gramos por metro cuadrado. La mayoría de las sudaderas de marca son 280, 320 a lo mucho.",
      paragraphs: [
        "El gramaje es la única medida honesta de una sudadera. Dice cuánto algodón tiene por metro cuadrado de tela. Mayor gramaje, más calor, más caída, más duración. Las sudaderas baratas pesan poco porque tienen poco algodón.",
        "Nosotros pedimos 480 gramos — el límite superior de la felpa de algodón. Por encima de ese número, la tela se pone rígida y la sudadera empieza a parecer chamarra.",
        "El cordón de la capucha es algodón crudo trenzado, sin herraje plástico. La punta se reemplaza con un nudo si se desgasta. Pequeño detalle, pero hace la diferencia a los cinco años.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre la felpa",
      text: "“Una sudadera ligera es una camisa con capucha. No me sirve.”",
      attribution: "— Maestra Lupita Romero, taller de León",
    },
  },
  {
    slug: "chaqueta-cuero-corsario",
    name: "Chaqueta Cuero Corsario",
    description:
      "Piel napa curtida vegetal, forro de raso oxblood. Hardware en latón envejecido. Pieza única, número limitado.",
    price: 4990,
    images: [
      "/images/products/chaqueta-cuero-corsario-1.svg",
      "/images/products/chaqueta-cuero-corsario-2.svg",
    ],
    imageLabels: ["Vista frontal", "Espalda", "Forro oxblood", "Hardware"],
    category: "chaquetas",
    sizes: ["S", "M", "L"],
    defaultSize: "M",
    stock: 4,
    featured: false,
    material: "Piel napa",
    finish: "Curtido vegetal · Forro oxblood",
    lede:
      "Piel napa curtida con corteza de mimosa. Forro de raso oxblood. Cuatro piezas en total.",
    status: "Últimas en S, M, L",
    edition: "edición numerada · 4 piezas",
    specs: {
      material: "Piel napa de res · curtido vegetal con mimosa",
      corte: "Tipo motorcycle · solapa cruzada, hombro estructurado",
      hechura: "Cortada por Don Refugio Aldama, talabartería de León",
      color: "Negro humo · forro raso oxblood teñido a mano",
      cuidado: "Limpieza con paño seco. Acondicionador cada seis meses.",
      procedencia: "Piel de Guanajuato · curtido y costura en León",
    },
    shipping: {
      ...DEFAULT_SHIPPING,
      localNote: "Envío con seguro de pieza única: 5–7 días hábiles.",
    },
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Cuatro chaquetas, cuatro hombros distintos.",
      lede:
        "Don Refugio Aldama cose una chaqueta de piel cada seis semanas. Estas cuatro tardaron seis meses.",
      paragraphs: [
        "El curtido vegetal con mimosa es un proceso de tres meses. La piel entra en una mezcla de corteza picada y agua tibia, y sale con un color carbón que el curtido al cromo nunca alcanza.",
        "Don Refugio Aldama tiene un taller en el barrio de San Miguel de León. Lleva cuarenta y dos años cortando piel. Le pedimos cuatro chaquetas — una por cada talla que vendemos — sabiendo que cada una tardaría seis semanas.",
        "El forro es raso de seda teñido en oxblood profundo, cosido a mano contra la piel. La hebilla, el zíper, los broches de presión: todo en latón envejecido, sin cromar.",
        "Es la pieza más cara del catálogo. Y la única que numeramos al interior con el nombre del comprador, si lo permites.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el cuero",
      text: "“Una chaqueta de piel se compra una vez. Si la compras dos veces, la primera no era piel.”",
      attribution: "— Don Refugio Aldama, talabartero en León",
    },
  },
  {
    slug: "chaqueta-bomber-dorado",
    name: "Chaqueta Bomber Dorado",
    description:
      "Nylon italiano con interior acolchado. Cremallera de oro cepillado. Línea de hombro caída, corte oversize medido.",
    price: 2890,
    images: [
      "/images/products/chaqueta-bomber-dorado-1.svg",
      "/images/products/chaqueta-bomber-dorado-2.svg",
    ],
    imageLabels: ["Vista frontal", "Espalda", "Cremallera", "Caída"],
    category: "chaquetas",
    sizes: ["M", "L", "XL"],
    defaultSize: "L",
    stock: 5,
    featured: false,
    material: "Nylon italiano",
    finish: "Dorado cepillado · Interior acolchado",
    lede:
      "Bomber con cremallera de latón dorado cepillado. Nylon italiano, interior acolchado para entretiempo.",
    status: "Pocas piezas, primera quincena",
    edition: "lote corto · 12 piezas",
    specs: {
      material: "Nylon italiano 100% · acabado mate, repelente al agua",
      corte: "Oversize medido · hombro caído, puños y bastilla acanalados",
      hechura: "Confeccionada por Taller Norte, Monterrey",
      color: "Negro humo · cremallera oro cepillado",
      cuidado: "Lavar en frío. No usar secadora. Plancha tibia con paño.",
      procedencia: "Nylon de Como, Italia · acabado en NL",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Cremallera de latón macizo, no cromado dorado.",
      lede:
        "La diferencia se ve a los seis meses. El cromado dorado se descascara. El latón se opaca y se vuelve más suyo.",
      paragraphs: [
        "Encontramos al herrero en Tlalpujahua — un pueblo minero en Michoacán que sabe trabajar latón. Cada cremallera se entrega en piezas, ya cortadas, y se ensambla en el taller de Monterrey antes de la costura final.",
        "El nylon italiano viene de Como, donde una hilatura familiar produce este acabado mate específico desde los años ochenta. Es ligero, repele agua y no brilla bajo luz directa.",
        "El acolchado interior es de pluma sintética, ligero, para entretiempo. Si necesitas una chaqueta para invierno duro, esta no es. Es para el tránsito entre estaciones.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el latón",
      text: "“El cromado es para los que no quieren que la chaqueta envejezca. Yo prefiero envejecer con ella.”",
      attribution: "— Pedro Cantú, Taller Norte en Monterrey",
    },
  },
  {
    slug: "cinturon-piel-hardware",
    name: "Cinturón Piel Hardware",
    description:
      "Piel vacuna en marrón espresso, hebilla de latón cepillado con grabado discreto. Hecho para envejecer con el portador.",
    price: 990,
    images: [
      "/images/products/cinturon-piel-hardware-1.svg",
      "/images/products/cinturon-piel-hardware-2.svg",
    ],
    imageLabels: ["Vista frontal", "Vista posterior", "Hebilla", "Grabado"],
    category: "accesorios",
    sizes: ["M", "L", "XL"],
    defaultSize: "L",
    stock: 18,
    featured: false,
    material: "Piel vacuna",
    finish: "Marrón espresso · Hebilla latón",
    lede:
      "Cinturón macizo, sin doblez interior. Piel curtida vegetal y hebilla de latón sólido.",
    status: "Stock estable, todas las tallas",
    edition: "modelo de catálogo permanente",
    specs: {
      material: "Piel vacuna 100% · 4 mm de espesor, curtida vegetal",
      corte: "Ancho 35 mm · sin pespunte de doblez",
      hechura: "Cortada por Don Refugio Aldama, talabartería de León",
      color: "Marrón espresso · acabado natural cepillado",
      cuidado: "Acondicionar con bálsamo neutro cada año. Sin agua.",
      procedencia: "Piel y latón de Guanajuato · grabado en León",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Por qué no tiene pespunte de doblez.",
      lede:
        "La mayoría de los cinturones del mercado son piel pegada a un refuerzo de cartón. Este es piel sólida.",
      paragraphs: [
        "Un cinturón estándar tiene cuatro milímetros de piel, sí — pero esos cuatro milímetros son una capa fina pegada a un refuerzo interior. Cuando el pegamento cede, el cinturón se ondula. Pasa a los cinco años.",
        "Don Refugio Aldama corta este cinturón de una sola pieza de piel maciza. No hay pegamento, no hay refuerzo interior, no hay pespunte de doblez en el reverso. Sólo piel.",
        "La hebilla es de latón macizo, sin cromar. Tiene un grabado pequeño en el interior — invisible para el resto del mundo, visible para ti.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre la piel",
      text: "“Un cinturón bien hecho no se nota. Un cinturón mal hecho se nota todos los días.”",
      attribution: "— Don Refugio Aldama, talabartero en León",
    },
  },
  {
    slug: "gorra-revolucion",
    name: "Gorra Revolución",
    description:
      "Pana negra, bordado en hilo dorado sobre el frente. Visera curva, ajuste de hebilla metálica. Discreta pero firmada.",
    price: 690,
    images: [
      "/images/products/gorra-revolucion-1.svg",
      "/images/products/gorra-revolucion-2.svg",
    ],
    imageLabels: ["Vista frontal", "Lateral", "Bordado", "Hebilla"],
    category: "accesorios",
    sizes: ["M", "L"],
    defaultSize: "L",
    stock: 22,
    featured: false,
    material: "Pana negra",
    finish: "Bordado hilo dorado · Hebilla metálica",
    lede:
      "Pana negra, no algodón liso. Bordado en hilo dorado, no impresión. La gorra firmada de la casa.",
    status: "Stock estable",
    edition: "modelo de catálogo permanente",
    specs: {
      material: "Pana de algodón 100% · 14 hilos por cm",
      corte: "Visera curva · banda interior de algodón crudo",
      hechura: "Bordada y armada por Bordados Aguilar, Guadalajara",
      color: "Negro humo · bordado oro envejecido",
      cuidado: "Limpiar con paño seco. Cepillar al ras. Sin agua.",
      procedencia: "Pana tejida en Aguascalientes · bordado en Jalisco",
    },
    shipping: DEFAULT_SHIPPING,
    story: {
      eyebrow: "La pieza · Nota del comprador",
      heading: "Lo único firmado que hace la tienda.",
      lede:
        "No tenemos camisetas de logo. No tenemos llaveros. Tenemos una gorra.",
      paragraphs: [
        "Cuando montamos la tienda decidimos no firmar nada con el nombre de la casa, excepto una pieza. La gorra es esa pieza. Bordada — no impresa — para que el tipo dorado no se descascare al primer año.",
        "El bordado lo hace Bordados Aguilar en Guadalajara. Hilo de algodón tinto con tono dorado mate. La aguja entra y sale doce mil veces por gorra. Tarda dieciocho minutos por pieza.",
        "La pana es la elegida porque resiste el cepillado al ras y no se pela. Diez años de uso y sigue viéndose como una gorra, no como un trapo.",
      ],
      author: "Iván Bañuelos — comprador",
    },
    quote: {
      mark: "Sobre el bordado",
      text: "“Una marca impresa se va con el lavado. Una marca bordada se queda hasta que se rompa la tela.”",
      attribution: "— Maestra Carolina Aguilar, Bordados Aguilar",
    },
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getByCategory(cat: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function getCategories(): CategoryMeta[] {
  return CATEGORIES;
}

export function getCategoryMeta(slug: Category): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function filterProducts(opts: {
  category?: Category;
  size?: Size;
  sort?: SortKey;
}): Product[] {
  const filtered = PRODUCTS.filter((p) => {
    if (opts.category && p.category !== opts.category) return false;
    if (opts.size && !p.sizes.includes(opts.size)) return false;
    return true;
  });
  if (opts.sort === "precio") {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  return filtered;
}

export function getCategoryCounts(): Record<Category, number> {
  const counts = {
    camisas: 0,
    playeras: 0,
    pantalones: 0,
    chaquetas: 0,
    accesorios: 0,
  } satisfies Record<Category, number>;
  for (const p of PRODUCTS) counts[p.category] += 1;
  return counts;
}

export function deriveCardStatus(
  stock: number,
  featured: boolean,
): CardStatus | null {
  if (stock === 0) return "agotado";
  if (stock <= 3) return "ultima";
  if (featured && stock >= 8) return "nuevo";
  return null;
}

export const ALL_SIZES: Size[] = ["S", "M", "L", "XL"];

/**
 * Picks 3 related pieces, preferring categories *different* from the current
 * one. Falls back to same-category pieces if needed.
 */
export function getRelatedPieces(slug: string, max = 3): Product[] {
  const current = getBySlug(slug);
  if (!current) return [];
  const others = PRODUCTS.filter((p) => p.slug !== slug);
  const different = others.filter((p) => p.category !== current.category);
  const same = others.filter((p) => p.category === current.category);
  return [...different, ...same].slice(0, max);
}

const CATEGORY_SINGULAR: Record<Category, string> = {
  camisas: "Camisa",
  playeras: "Playera",
  pantalones: "Pantalón",
  chaquetas: "Chaqueta",
  accesorios: "Accesorio",
};

export function categorySingular(c: Category): string {
  return CATEGORY_SINGULAR[c];
}
