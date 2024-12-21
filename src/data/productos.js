import { BsDroplet } from 'react-icons/bs'
import { CiSun } from 'react-icons/ci'
import { RiTailwindCssFill } from 'react-icons/ri'
import IconIndustrialUse from '../assets/icons/IconIndustrialUse'
import filtroImgUrl from './images/filtro.jpg'
import contenedorImgUrl from './images/contenedor.jpg'
import poleaImgUrl from './images/polea.jpg'

export const items = [
  {
    id: 'Art.007',
    sku: 'Art. 007',
    title: 'Filtro de carbón',
    highlight: 'Antiolor',
    brand: 'Línea MAER',
    imgUrl: filtroImgUrl,
    category: 'filtros',
    description: [
      'Nuestros filtros antiolor de la Línea MAER están diseñados para purificar el aire en salas de cultivo indoor, eliminando eficazmente los olores indeseados. Utilizamos los mejores insumos del mercado para garantizar la máxima eficiencia y durabilidad.',
      'Espacio sugerido: 3x3x2mt',
      'Reutilizable (Pudiendo adquirir el Recambio en el Kit de Recambio)',
    ],
    sideDescription: {
      variations: {
        options: ['S', 'M', 'L', 'XL', 'XXL',],
        selected: ['XXL']
      },
      details: [
        'Alto 42cm x 6"',
        'Carga 6000gr',
        'Industria Argentina',
      ],
    },
    details: [
      {
        title: 'DISEÑO CON TORNILLOS',
        description: [
          'Nuestros filtros utilizan tornillos en lugar de remaches, lo que permite el reemplazo de componentes y el mantenimiento del filtro en condiciones óptimas.',
        ],
      },
      {
        title: 'CARBON VEGETAL DE COCO',
        description: [
          'Utilizamos carbón vegetal de coco, conocido por ser más duro, con mayor absorción y micro-poros, lo que asegura una excelente capacidad de filtrado.',
        ],
      },
      {
        title: 'DOBLE MALLA DE PAPEL FILTRANTE',
        description: [
          'Compuesta por fibra de celulosa (80% algodón y 20% poliéster), esta malla asegura un 75% de porosidad, permitiendo un flujo de aire continuo y parejo.',
        ],
      },
    ],
    certs: [IconIndustrialUse],
  },
  {
    id: 'Art.010',
    sku: 'Art. 010',
    title: 'Grower 18K',
    highlight: 'STRINGS',
    brand: '',
    imgUrl: poleaImgUrl,
    category: 'otros',
    description: [
      'Nuestras poleas de sujeción están diseña- das para facilitar la instalación y ajuste de todo tipo de artículos que deseen se colga- dos en espacios de cultivo. Soportan hasta 18 kilos de peso y están hechas de un material resistente a altas temperaturas. Poseen un mecanismo de bloqueo seguro, permiten ajustar la altura de las luces de manera fácil y precisa, garantizando una iluminación óptima para las plantas en todas las etapas.',
    ],
    sideDescription: {},
    details: [
      {
        title: 'POLEA CENTRAL',
        description: [
          'Material: PETG (reciclable)',
          'Resistencia a altas temperaturas',
          'Mecanismo de bloqueo seguro: Permite ajustes precisos y fáciles.',
        ],
      },
      {
        title: 'SOGA MULTIFILAMENTOS DE ALTA RESISTENCIA',
        description: [
          'Medida: 1,20mt',
          'Resistencia 18kg',
        ],
      },
      {
        title: 'GANCHOS',
        description: [
          'Material: Metal inoxidable'
        ],
      },
    ],
    certs: [],
  },
  {
    id: 'Art.001-002',
    sku: 'Art. 001 / 002',
    title: 'Contenedor GT5',
    highlight: 'De trasporte',
    brand: '',
    imgUrl: contenedorImgUrl,
    category: 'contenedores',
    description: [
      'El GT5 es un contenedor diseñado específicamente para el transporte de hasta 5gr de material herbario. Este contenedor compacto y práctico ofrece la posibilidad de etiquetar manualmente en su lateral la genética del material y si es indica o sativa, facilitando su identificación. Además, es lavable y cuenta con un precio muy accesible, lo que lo convierte en una opción ideal para quienes necesitan transportar su material de forma segura y discreta.',
      'INDUSTRIA ARGENTINA',
    ],
    sideDescription: {
      icons: [RiTailwindCssFill, BsDroplet, CiSun],
      details: [
        'Protege tus cosechas de la luz, agua y aire',
      ],
    },
    details: [
      {
        title: 'ESPECIFICACIONES',
        description: [
          'Capacidad: 5gr',
          'Material: Plástico',
        ],
      },
      {
        title: 'ETIQUETA PERSONALIZADA',
        description: [
          'Posibilidad de escribir la genética y tipo (indica o sativa). Es lavable para ser fácilmente re-utilizable.',
        ],
      },
    ],
    certs: [],
  },
]