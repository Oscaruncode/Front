export const politicians = [
  {
    id: 'ivan-cepeda',
    name: 'Iván Cepeda',
    party: 'Pacto Histórico',
    type: 'izquierda',
    image: '/images/ivan_cepeda.png',
    stats: { oratoria: 78, liderazgo: 82, controversias: 15 },
  },
  {
    id: 'abelardo-espriella',
    name: 'Abelardo de la Espriella',
    party: 'Independiente (Derecha)',
    type: 'derecha',
    image: '/images/abelardo.png',
    stats: { oratoria: 62, liderazgo: 45, controversias: 48 },
  },
  {
    id: 'paloma-valencia',
    name: 'Paloma Valencia',
    party: 'Centro Democrático',
    type: 'derecha',
    image: '/images/paloma_valencia.png',
    stats: { oratoria: 75, liderazgo: 80, controversias: 22 },
  },
  {
    id: 'claudia-lopez',
    name: 'Claudia López',
    party: 'Alianza Verde',
    type: 'centro',
    image: '/images/claudia_lopez.png',
    stats: { oratoria: 82, liderazgo: 88, controversias: 20 },
  },
  {
    id: 'sergio-fajardo',
    name: 'Sergio Fajardo',
    party: 'Dignidad y Compromiso',
    type: 'centro',
    image: '/images/sergio_fajardo.png',
    stats: { oratoria: 85, liderazgo: 92, controversias: 12 },
  },
  {
    id: 'luis-g-murillo',
    name: 'Luis Gilberto Murillo',
    party: 'Colombia Renaciente',
    type: 'centro',
    image: '/images/luis_murillo.png',
    stats: { oratoria: 80, liderazgo: 90, controversias: 8 },
  },
  {
    id: 'miguel-uribe',
    name: 'Miguel Uribe Londoño',
    party: 'Centro Democrático',
    type: 'derecha',
    image: '/images/miguel_uribe.png',
    stats: { oratoria: 74, liderazgo: 70, controversias: 18 },
  },
  {
    id: 'roy-barreras',
    name: 'Roy Barreras',
    party: 'La Fuerza de la Paz',
    type: 'centro',
    image: '/images/roy_barrera.png',
    stats: { oratoria: 88, liderazgo: 95, controversias: 35 },
  },
  {
    id: 'carlos-caicedo',
    name: 'Carlos Caicedo',
    party: 'Fuerza Ciudadana',
    type: 'izquierda',
    image: '/images/carlos_caicedo.png',
    stats: { oratoria: 72, liderazgo: 78, controversias: 25 },
  },
  {
    id: 'clara-lopez',
    name: 'Clara López',
    party: 'Todos Somos Colombia',
    type: 'izquierda',
    image: '/images/clara_lopez.png',
    stats: { oratoria: 84, liderazgo: 94, controversias: 14 },
  },
  {
    id: 'gustavo-matamoros',
    name: 'Gustavo Matamoros',
    party: 'Independiente (Militar r.)',
    type: 'derecha',
    image: '/images/gustavo_matamoros.png',
    stats: { oratoria: 65, liderazgo: 60, controversias: 5 },
  },
  {
    id: 'santiago-botero',
    name: 'Santiago Botero',
    party: 'Independiente',
    type: 'derecha',
    image: '/images/santiago_botero.png',
    stats: { oratoria: 58, liderazgo: 40, controversias: 10 },
  },
  {
    id: 'sondra-mccollins',
    name: 'Sondra Macollins',
    party: 'Independiente',
    type: 'centro',
    image: '/imagenes/sondra_macollins.png',
    stats: { oratoria: 68, liderazgo: 50, controversias: 12 },
  },
];

export function shuffleDeck(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}

export function dealHand(deck, size) {
  return { hand: deck.slice(0, size), remaining: deck.slice(size) };
}
