/**
 * Vercel Serverless Function
 * POST /api/stats/seed - Inicializa la base de datos con datos de ranking
 *
 * IMPORTANTE: Este endpoint debe usarse solo una vez para poblar datos iniciales
 * Por seguridad, requiere una clave secreta en el body
 *
 * Body esperado:
 * {
 *   "secret": "tu-clave-secreta",
 *   "reset": true  // opcional, para limpiar datos existentes
 * }
 */

import { kv } from '@vercel/kv';

// Ranking inicial de candidatos (total: 100 votos)
const INITIAL_RANKING = {
  'abelardo-de-la-espriella': 18,
  'ivan-cepeda-castro': 15,
  'paloma-valencia-laserna': 12,
  'sergio-fajardo-valderrama': 10,
  'claudia-lopez': 9,
  'miguel-uribe-londono': 8,
  'roy-leonardo-barreras-montealegre': 7,
  'carlos-eduardo-caicedo-omar': 6,
  'gustavo-matamoros-covacho': 5,
  'oscar-mauricio-lizcano-arango': 4,
  'luis-gilberto-murillo-urrutia': 3,
  'raul-santiago-botero-jaramillo': 2,
  'sondra-macollins-garvin-pinto': 1,
};

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { secret, reset = false } = req.body;

    // Validar secreto (en producción, usar variable de entorno)
    const expectedSecret = process.env.SEED_SECRET || 'policards-seed-2026';
    if (secret !== expectedSecret) {
      return res.status(401).json({ error: 'Unauthorized. Invalid secret.' });
    }

    // Si reset es true, limpiar datos existentes primero
    if (reset) {
      console.log('[SEED] Resetting existing data...');
      const candidateKeys = Object.keys(INITIAL_RANKING).map(id => `candidate:${id}`);

      // Eliminar keys de candidatos
      for (const key of candidateKeys) {
        await kv.del(key);
      }

      console.log('[SEED] Existing data cleared');
    }

    // Poblar datos iniciales
    console.log('[SEED] Seeding initial ranking data...');
    const results = [];

    for (const [candidateId, count] of Object.entries(INITIAL_RANKING)) {
      const key = `candidate:${candidateId}`;

      // Establecer el contador directamente
      await kv.set(key, count);

      results.push({ candidateId, count });
      console.log(`[SEED] Set ${key} = ${count}`);
    }

    // Calcular totales
    const totalVotes = Object.values(INITIAL_RANKING).reduce((sum, count) => sum + count, 0);
    const totalMatches = Math.floor(totalVotes / 4); // Cada partida = 4 votos

    // Registrar timestamp de la inicialización
    await kv.zadd('votes:timeline', {
      score: Date.now(),
      member: JSON.stringify({
        event: 'database_seed',
        totalVotes,
        totalMatches,
        timestamp: new Date().toISOString()
      }),
    });

    console.log('[SEED] Database seeded successfully!');

    return res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        candidates: results,
        totalVotes,
        totalMatches,
        ranking: Object.entries(INITIAL_RANKING)
          .sort(([, a], [, b]) => b - a)
          .map(([id, count], index) => ({ position: index + 1, id, count })),
      },
    });
  } catch (error) {
    console.error('[API /stats/seed] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
