# Inicialización de Base de Datos - Policards 2

Este documento describe cómo poblar la base de datos con el ranking inicial de candidatos.

## 📊 Ranking Inicial (Total: 100 votos)

| Posición | Candidato | ID | Votos |
|----------|-----------|-----|-------|
| 1 | Abelardo de la Espriella | `abelardo-de-la-espriella` | 18 |
| 2 | Iván Cepeda Castro | `ivan-cepeda-castro` | 15 |
| 3 | Paloma Valencia Laserna | `paloma-valencia-laserna` | 12 |
| 4 | Sergio Fajardo Valderrama | `sergio-fajardo-valderrama` | 10 |
| 5 | Claudia López | `claudia-lopez` | 9 |
| 6 | Miguel Uribe Londoño | `miguel-uribe-londono` | 8 |
| 7 | Roy Leonardo Barreras | `roy-leonardo-barreras-montealegre` | 7 |
| 8 | Carlos Eduardo Caicedo | `carlos-eduardo-caicedo-omar` | 6 |
| 9 | Gustavo Matamoros Covachó | `gustavo-matamoros-covacho` | 5 |
| 10 | Óscar Mauricio Lizcano | `oscar-mauricio-lizcano-arango` | 4 |
| 11 | Luis Gilberto Murillo | `luis-gilberto-murillo-urrutia` | 3 |
| 12 | Raúl Santiago Botero | `raul-santiago-botero-jaramillo` | 2 |
| 13 | Sondra Macollins Garvín | `sondra-macollins-garvin-pinto` | 1 |

**Total de votos:** 100
**Total de partidas:** 25 (cada partida = 4 votos)

## 🚀 Método 1: Usando cURL (Recomendado)

### Opción A: En desarrollo local

```bash
curl -X POST http://localhost:3000/api/stats/seed \
  -H "Content-Type: application/json" \
  -d '{"secret": "policards-seed-2026"}'
```

### Opción B: En producción (Vercel)

```bash
curl -X POST https://tu-app.vercel.app/api/stats/seed \
  -H "Content-Type: application/json" \
  -d '{"secret": "policards-seed-2026"}'
```

### Resetear y volver a poblar

```bash
curl -X POST https://tu-app.vercel.app/api/stats/seed \
  -H "Content-Type: application/json" \
  -d '{"secret": "policards-seed-2026", "reset": true}'
```

## 🔧 Método 2: Usando Postman o Insomnia

1. **Crear una nueva petición POST**
2. **URL:** `https://tu-app.vercel.app/api/stats/seed`
3. **Headers:**
   ```
   Content-Type: application/json
   ```
4. **Body (raw JSON):**
   ```json
   {
     "secret": "policards-seed-2026",
     "reset": false
   }
   ```
5. **Enviar petición**

## 🌐 Método 3: Usando JavaScript (Navegador)

Abre la consola del navegador en tu app y ejecuta:

```javascript
fetch('/api/stats/seed', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    secret: 'policards-seed-2026',
    reset: false
  })
})
.then(res => res.json())
.then(data => console.log('✅ Base de datos inicializada:', data))
.catch(err => console.error('❌ Error:', err));
```

## 📝 Respuesta Esperada

```json
{
  "success": true,
  "message": "Database seeded successfully",
  "data": {
    "candidates": [
      { "candidateId": "abelardo-de-la-espriella", "count": 18 },
      { "candidateId": "ivan-cepeda-castro", "count": 15 },
      ...
    ],
    "totalVotes": 100,
    "totalMatches": 25,
    "ranking": [
      { "position": 1, "id": "abelardo-de-la-espriella", "count": 18 },
      { "position": 2, "id": "ivan-cepeda-castro", "count": 15 },
      ...
    ]
  }
}
```

## 🔐 Seguridad

### Cambiar la clave secreta en producción

1. **En Vercel Dashboard:**
   - Ve a tu proyecto → Settings → Environment Variables
   - Agrega: `SEED_SECRET` = `tu-clave-super-secreta`
   - Redeploy el proyecto

2. **Usar la nueva clave:**
   ```bash
   curl -X POST https://tu-app.vercel.app/api/stats/seed \
     -H "Content-Type: application/json" \
     -d '{"secret": "tu-clave-super-secreta"}'
   ```

### ⚠️ IMPORTANTE

- **Ejecutar solo una vez** o con `reset: true` para evitar datos duplicados
- **No compartir** la clave secreta públicamente
- **Eliminar o proteger** este endpoint después de usarlo

## 🧪 Verificar que funcionó

Después de ejecutar el seed, verifica el ranking:

```bash
curl https://tu-app.vercel.app/api/stats
```

Deberías ver:

```json
{
  "ranking": [
    { "id": "abelardo-de-la-espriella", "count": 18 },
    { "id": "ivan-cepeda-castro", "count": 15 },
    { "id": "paloma-valencia-laserna", "count": 12 },
    ...
  ],
  "total": 100,
  "totalMatches": 25
}
```

## 🎮 Probar en la App

1. Abre la app en el navegador
2. Click en "Ver Ranking de Candidatos"
3. Cambia a la pestaña "Ranking Global"
4. Deberías ver los candidatos ordenados según el ranking inicial

## 🔄 Resetear la Base de Datos

Si necesitas volver a empezar desde cero:

```bash
curl -X POST https://tu-app.vercel.app/api/stats/seed \
  -H "Content-Type: application/json" \
  -d '{"secret": "policards-seed-2026", "reset": true}'
```

Esto:
1. Elimina todos los contadores existentes
2. Repuebla con los datos iniciales
3. Restablece el ranking a los valores base

## 📦 Archivos Relacionados

- **Endpoint:** `api/stats/seed.js`
- **Datos de candidatos:** `src/data/candidates.js`
- **Servicio de stats:** `src/services/statsService.js`
