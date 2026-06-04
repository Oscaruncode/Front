/**
 * Script para inicializar la base de datos con ranking de candidatos
 *
 * USO:
 *   node scripts/seed.js
 *   node scripts/seed.js --reset  (para limpiar datos existentes)
 *
 * NOTA: Asegúrate de tener VITE_API_URL configurado en .env
 */

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';
const SECRET = process.env.SEED_SECRET || 'policards-seed-2026';

const reset = process.argv.includes('--reset');

console.log('🌱 Inicializando base de datos de Policards 2...');
console.log(`📡 API URL: ${API_URL}`);
console.log(`🔄 Reset: ${reset ? 'SÍ' : 'NO'}`);
console.log('');

async function seedDatabase() {
  try {
    const response = await fetch(`${API_URL}/api/stats/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: SECRET,
        reset,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    console.log('✅ Base de datos inicializada exitosamente!');
    console.log('');
    console.log('📊 Ranking inicial:');
    console.log('-------------------------------------------');

    data.data.ranking.forEach((item, index) => {
      const bar = '█'.repeat(item.count);
      console.log(`${(index + 1).toString().padStart(2)}. ${item.id.padEnd(35)} ${bar} ${item.count}`);
    });

    console.log('-------------------------------------------');
    console.log(`📈 Total de votos: ${data.data.totalVotes}`);
    console.log(`🎮 Total de partidas: ${data.data.totalMatches}`);
    console.log('');
    console.log('🎉 ¡Listo! Puedes verificar en la app.');

  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:');
    console.error(`   ${error.message}`);
    console.error('');
    console.error('💡 Posibles soluciones:');
    console.error('   - Verifica que el servidor esté corriendo (npm run dev)');
    console.error('   - Verifica que VITE_API_URL esté configurado correctamente');
    console.error('   - Verifica que la clave SEED_SECRET sea correcta');
    process.exit(1);
  }
}

// Ejecutar
seedDatabase();
