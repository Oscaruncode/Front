/**
 * Script para generar datos sintéticos de usuarios
 * Genera 100 registros con edad, género, ciudad, correo y candidato preferido
 *
 * USO:
 *   node scripts/generateUsers.js
 *   node scripts/generateUsers.js --count 200  (para generar 200 registros)
 *
 * OUTPUT: data/users.csv
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const COUNT = process.argv.includes('--count')
  ? parseInt(process.argv[process.argv.indexOf('--count') + 1])
  : 100;

// Datos base
const CIUDADES = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Pereira',
  'Santa Marta',
  'Cúcuta',
  'Ibagué',
  'Manizales',
  'Villavicencio',
  'Pasto',
  'Valledupar',
  'Montería',
  'Armenia',
  'Popayán',
  'Sincelejo',
  'Tunja',
  'Neiva'
];

const GENEROS = ['masculino', 'femenino', 'otro', 'prefiero-no-decir'];

// Candidatos con sus pesos de preferencia (basado en el ranking)
const CANDIDATOS = [
  { id: 'abelardo-de-la-espriella', peso: 18 },
  { id: 'ivan-cepeda-castro', peso: 15 },
  { id: 'paloma-valencia-laserna', peso: 12 },
  { id: 'sergio-fajardo-valderrama', peso: 10 },
  { id: 'claudia-lopez', peso: 9 },
  { id: 'miguel-uribe-londono', peso: 8 },
  { id: 'roy-leonardo-barreras-montealegre', peso: 7 },
  { id: 'carlos-eduardo-caicedo-omar', peso: 6 },
  { id: 'gustavo-matamoros-covacho', peso: 5 },
  { id: 'oscar-mauricio-lizcano-arango', peso: 4 },
  { id: 'luis-gilberto-murillo-urrutia', peso: 3 },
  { id: 'raul-santiago-botero-jaramillo', peso: 2 },
  { id: 'sondra-macollins-garvin-pinto', peso: 1 }
];

// Nombres para generar correos
const NOMBRES = [
  'Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Laura', 'Pedro', 'Sofia',
  'Diego', 'Valentina', 'Andrés', 'Camila', 'Miguel', 'Isabella', 'Jorge', 'Natalia',
  'David', 'Paula', 'Daniel', 'Carolina', 'Alejandro', 'Daniela', 'Felipe', 'Gabriela',
  'Ricardo', 'Juliana', 'Oscar', 'Andrea', 'Santiago', 'Mariana', 'Cristian', 'Alejandra',
  'Sebastián', 'Catalina', 'Fernando', 'Paola', 'Gabriel', 'Sara', 'Javier', 'Vanessa',
  'Roberto', 'Diana', 'Mauricio', 'Patricia', 'Raul', 'Claudia', 'Gustavo', 'Monica'
];

const APELLIDOS = [
  'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez',
  'Gómez', 'Ramírez', 'Torres', 'Díaz', 'Moreno', 'Jiménez', 'Álvarez', 'Romero',
  'Vargas', 'Castro', 'Ortiz', 'Silva', 'Reyes', 'Ramos', 'Rojas', 'Herrera',
  'Medina', 'Gutiérrez', 'Vega', 'Guerrero', 'Mendoza', 'Ríos', 'Delgado', 'Suárez'
];

const DOMINIOS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'mail.com'];

// Funciones auxiliares
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(array) {
  return array[random(0, array.length - 1)];
}

function randomWeighted(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.peso, 0);
  let rand = Math.random() * totalWeight;

  for (const item of items) {
    if (rand < item.peso) {
      return item.id;
    }
    rand -= item.peso;
  }

  return items[0].id;
}

function generateEmail(nombre, apellido, index) {
  const nombreLower = nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const apellidoLower = apellido.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const numero = index < 10 ? random(100, 999) : '';
  const dominio = randomItem(DOMINIOS);

  const patterns = [
    `${nombreLower}.${apellidoLower}${numero}@${dominio}`,
    `${nombreLower}${apellidoLower}${numero}@${dominio}`,
    `${nombreLower[0]}${apellidoLower}${numero}@${dominio}`,
    `${nombreLower}_${apellidoLower}@${dominio}`,
    `${apellidoLower}.${nombreLower}@${dominio}`
  ];

  return randomItem(patterns);
}

function generateEdad() {
  // Distribución realista: más personas entre 25-50
  const rand = Math.random();

  if (rand < 0.1) return random(18, 24);      // 10% jóvenes
  if (rand < 0.5) return random(25, 40);      // 40% adultos jóvenes
  if (rand < 0.85) return random(41, 60);     // 35% adultos
  return random(61, 75);                       // 15% adultos mayores
}

function generateUser(index) {
  const nombre = randomItem(NOMBRES);
  const apellido = randomItem(APELLIDOS);

  return {
    edad: generateEdad(),
    genero: randomItem(GENEROS),
    ciudad: randomItem(CIUDADES),
    correo: generateEmail(nombre, apellido, index),
    candidato_preferido: randomWeighted(CANDIDATOS)
  };
}

// Generar usuarios
console.log(`🎲 Generando ${COUNT} registros de usuarios...`);
console.log('');

const users = [];
for (let i = 0; i < COUNT; i++) {
  users.push(generateUser(i));
}

// Crear CSV
const csvHeader = 'edad,genero,ciudad,correo,candidato_preferido\n';
const csvRows = users.map(user =>
  `${user.edad},${user.genero},${user.ciudad},${user.correo},${user.candidato_preferido}`
).join('\n');

const csvContent = csvHeader + csvRows;

// Guardar archivo
const outputDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, 'users.csv');
fs.writeFileSync(outputFile, csvContent, 'utf-8');

console.log('✅ Archivo CSV generado exitosamente!');
console.log('');
console.log(`📁 Ubicación: ${outputFile}`);
console.log(`📊 Total de registros: ${users.length}`);
console.log('');

// Estadísticas
const stats = {
  generos: {},
  ciudades: {},
  candidatos: {},
  edadPromedio: users.reduce((sum, u) => sum + u.edad, 0) / users.length
};

users.forEach(user => {
  stats.generos[user.genero] = (stats.generos[user.genero] || 0) + 1;
  stats.ciudades[user.ciudad] = (stats.ciudades[user.ciudad] || 0) + 1;
  stats.candidatos[user.candidato_preferido] = (stats.candidatos[user.candidato_preferido] || 0) + 1;
});

console.log('📈 Estadísticas:');
console.log('-------------------------------------------');
console.log(`Edad promedio: ${stats.edadPromedio.toFixed(1)} años`);
console.log('');
console.log('Género:');
Object.entries(stats.generos)
  .sort(([, a], [, b]) => b - a)
  .forEach(([genero, count]) => {
    const bar = '█'.repeat(Math.floor(count / 2));
    console.log(`  ${genero.padEnd(20)} ${bar} ${count}`);
  });

console.log('');
console.log('Top 5 Ciudades:');
Object.entries(stats.ciudades)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5)
  .forEach(([ciudad, count]) => {
    const bar = '█'.repeat(Math.floor(count / 2));
    console.log(`  ${ciudad.padEnd(20)} ${bar} ${count}`);
  });

console.log('');
console.log('Top 5 Candidatos:');
Object.entries(stats.candidatos)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5)
  .forEach(([candidato, count]) => {
    const bar = '█'.repeat(Math.floor(count / 2));
    const nombre = candidato.substring(0, 30);
    console.log(`  ${nombre.padEnd(32)} ${bar} ${count}`);
  });

console.log('-------------------------------------------');
console.log('');
console.log('🎉 ¡Listo! Puedes usar este archivo para importar a la base de datos.');
