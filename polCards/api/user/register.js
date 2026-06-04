/**
 * Vercel Serverless Function
 * POST /api/user/register - Registra datos del usuario
 *
 * Body esperado:
 * {
 *   "edad": 25,
 *   "genero": "masculino",
 *   "ciudad": "Bogotá",
 *   "correo": "usuario@ejemplo.com"
 * }
 */

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { edad, genero, ciudad, correo } = req.body;

    // Validar campos requeridos
    if (!edad || !genero || !ciudad || !correo) {
      return res.status(400).json({
        error: 'Missing required fields. Expected: edad, genero, ciudad, correo',
      });
    }

    // Validar edad
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum < 13 || edadNum > 120) {
      return res.status(400).json({
        error: 'Invalid edad. Must be a number between 13 and 120',
      });
    }

    // Validar género
    const generosValidos = ['masculino', 'femenino', 'otro', 'prefiero-no-decir'];
    if (!generosValidos.includes(genero)) {
      return res.status(400).json({
        error: 'Invalid genero. Must be one of: ' + generosValidos.join(', '),
      });
    }

    // Validar ciudad (al menos 2 caracteres)
    if (typeof ciudad !== 'string' || ciudad.trim().length < 2) {
      return res.status(400).json({
        error: 'Invalid ciudad. Must be at least 2 characters',
      });
    }

    // Validar correo (regex básico)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({
        error: 'Invalid correo format',
      });
    }

    // Crear objeto de usuario
    const userData = {
      edad: edadNum,
      genero,
      ciudad: ciudad.trim(),
      correo: correo.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
    };

    // Guardar datos del usuario usando el correo como identificador único
    const userKey = `user:${userData.correo}`;
    await kv.set(userKey, userData);

    // Agregar a la lista de usuarios registrados (sorted set por timestamp)
    await kv.zadd('users:registered', {
      score: Date.now(),
      member: userData.correo,
    });

    // Incrementar contador de usuarios por género
    await kv.hincrby('stats:users:genero', genero, 1);

    // Incrementar contador de usuarios por ciudad (normalizado)
    const ciudadNormalizada = ciudad.trim().toLowerCase();
    await kv.hincrby('stats:users:ciudad', ciudadNormalizada, 1);

    // Agregar a estadísticas de edad (agrupado por décadas)
    const decada = Math.floor(edadNum / 10) * 10;
    await kv.hincrby('stats:users:edad', `${decada}-${decada + 9}`, 1);

    return res.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: {
        edad: userData.edad,
        genero: userData.genero,
        ciudad: userData.ciudad,
      },
    });
  } catch (error) {
    console.error('[API /user/register] Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
