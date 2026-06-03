// Todos los candidatos comienzan con valores iguales para estadísticas base.
const BASE_STATS = { propuestas: 5, experiencia: 5, escandalos: 5 };
const BASE_RATING = 5.0;

const createCandidate = ({ id, name, vice, party, type, image }) => ({
  id,
  name,
  vice: vice || null,
  party,
  type,
  image,
  stats: { ...BASE_STATS },
  rating: BASE_RATING,
});

export const politicians = [
  createCandidate({
    id: 'ivan-cepeda-castro',
    name: 'Iván Cepeda Castro',
    vice: 'Aída Quilcué Vivas',
    party: 'Pacto Histórico',
    type: 'izquierda',
    image: '/images/ivan_cepeda.png',
  }),
  createCandidate({
    id: 'claudia-lopez',
    name: 'Claudia López',
    vice: 'Leonardo Huerta',
    party: 'Una Nueva Historia con Claudia',
    type: 'centro',
    image: '/images/claudia_lopez.png',
  }),
  createCandidate({
    id: 'raul-santiago-botero-jaramillo',
    name: 'Raúl Santiago Botero Jaramillo',
    vice: 'Carlos Fernando Cuevas Romero',
    party: 'Romper el Sistema',
    type: 'derecha',
    image: '/images/santiago_botero.png',
  }),
  createCandidate({
    id: 'abelardo-de-la-espriella',
    name: 'Abelardo de la Espriella',
    vice: 'José Manuel Restrepo',
    party: 'Defensores de la Patria',
    type: 'derecha',
    image: '/images/abelardo.png',
  }),
  createCandidate({
    id: 'oscar-mauricio-lizcano-arango',
    name: 'Óscar Mauricio Lizcano Arango',
    vice: 'Pedro Luis de la Torre Márquez',
    party: 'Colombia es + ASÍ',
    type: 'centro',
    image: '/images/oscar_lizcano.png',
  }),
  createCandidate({
    id: 'miguel-uribe-londono',
    name: 'Miguel Uribe Londoño',
    vice: 'Luisa Fernanda Villegas Aráque',
    party: 'Partido Demócrata Colombiano',
    type: 'derecha',
    image: '/images/miguel_uribe.png',
  }),
  createCandidate({
    id: 'sondra-macollins-garvin-pinto',
    name: 'Sondra Macollins Garvín Pinto',
    vice: 'Leonardo Karam Helo',
    party: 'Sondra Presidente 2026',
    type: 'centro',
    image: '/images/sandra_macollins.png',
  }),
  createCandidate({
    id: 'roy-leonardo-barreras-montealegre',
    name: 'Roy Leonardo Barreras Montealegre',
    vice: 'Martha Lucía Zamora Ávila',
    party: 'La Fuerza',
    type: 'centro',
    image: '/images/roy_barreras.png',
  }),
  createCandidate({
    id: 'carlos-eduardo-caicedo-omar',
    name: 'Carlos Eduardo Caicedo Omar',
    vice: 'Nelson Javier Alarcón Suárez',
    party: 'Caicedo',
    type: 'izquierda',
    image: '/images/carlos_caicedo.png',
  }),
  createCandidate({
    id: 'gustavo-matamoros-covacho',
    name: 'Gustavo Matamoros Covachó',
    vice: 'Nila María Paz Capaz',
    party: 'Ecologista Colombiano',
    type: 'verde',
    image: '/images/gustavo_matamoros.png',
  }),
  createCandidate({
    id: 'paloma-valencia-laserna',
    name: 'Paloma Valencia Laserna',
    vice: 'Juan Daniel Oviedo Arango',
    party: 'Centro Democrático',
    type: 'derecha',
    image: '/images/paloma_valencia.png',
  }),
  createCandidate({
    id: 'sergio-fajardo-valderrama',
    name: 'Sergio Fajardo Valderrama',
    vice: 'Edna Cristina Bonilla Sebá',
    party: 'Fajardo Presidente',
    type: 'centro',
    image: '/images/sergio_fajardo.png',
  }),
  createCandidate({
    id: 'luis-gilberto-murillo-urrutia',
    name: 'Luis Gilberto Murillo Urrutia',
    vice: 'Luz María Zapata Zapata',
    party: 'Oportunidad es Colombia',
    type: 'centro',
    image: '/images/luis_murillo.png',
  }),
];

export function shuffleDeck(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}

export function dealHand(deck, size) {
  return { hand: deck.slice(0, size), remaining: deck.slice(size) };
}
