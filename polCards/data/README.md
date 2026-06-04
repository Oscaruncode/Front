# Datos de Usuarios - Policards 2

Este directorio contiene datos sintéticos generados para pruebas y desarrollo.

## 📄 Archivo: users.csv

Contiene 100 registros de usuarios ficticios con:
- **edad**: Edad del usuario (18-75 años)
- **genero**: Género (masculino, femenino, otro, prefiero-no-decir)
- **ciudad**: Ciudad de residencia (20 ciudades colombianas)
- **correo**: Email ficticio
- **candidato_preferido**: ID del candidato favorito

## 📊 Estadísticas del Dataset

### Distribución por Edad
- **Edad promedio**: ~45 años
- **Rango**: 18-75 años
- **Distribución**:
  - 10% jóvenes (18-24)
  - 40% adultos jóvenes (25-40)
  - 35% adultos (41-60)
  - 15% adultos mayores (61-75)

### Distribución por Género
Distribución equitativa entre las 4 categorías:
- masculino
- femenino
- otro
- prefiero-no-decir

### Ciudades Incluidas (20 principales)
Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga, Pereira, Santa Marta, Cúcuta, Ibagué, Manizales, Villavicencio, Pasto, Valledupar, Montería, Armenia, Popayán, Sincelejo, Tunja, Neiva

### Preferencias de Candidatos
Las preferencias siguen una distribución basada en el ranking inicial:
1. Abelardo de la Espriella (peso: 18)
2. Iván Cepeda Castro (peso: 15)
3. Paloma Valencia Laserna (peso: 12)
4. Sergio Fajardo (peso: 10)
5. Claudia López (peso: 9)
6. ...y 8 candidatos más

## 🔄 Regenerar Datos

Para generar un nuevo dataset:

```bash
# Generar 100 registros (por defecto)
node scripts/generateUsers.js

# Generar cantidad personalizada
node scripts/generateUsers.js --count 500

# Generar 1000 registros
node scripts/generateUsers.js --count 1000
```

## 📥 Importar a Base de Datos

### Opción 1: Script automatizado (próximamente)
```bash
node scripts/importUsers.js
```

### Opción 2: Manualmente
1. Abre `data/users.csv`
2. Lee cada línea
3. Llama a `POST /api/user/register` por cada usuario

### Opción 3: Usando Python/pandas
```python
import pandas as pd
import requests

df = pd.read_csv('data/users.csv')

for _, row in df.iterrows():
    requests.post('http://localhost:3000/api/user/register', json={
        'edad': int(row['edad']),
        'genero': row['genero'],
        'ciudad': row['ciudad'],
        'correo': row['correo']
    })
```

## ⚠️ Nota Importante

**Estos datos son completamente ficticios** y generados algorítmicamente. No representan personas reales. Los correos electrónicos no son válidos y no deben ser contactados.

## 🎯 Uso Recomendado

- **Desarrollo**: Probar funcionalidades sin datos reales
- **Testing**: Validar integración con base de datos
- **Demos**: Mostrar la aplicación con datos de ejemplo
- **Analytics**: Probar dashboards y estadísticas

## 🔐 Privacidad

Si en algún momento necesitas trabajar con datos reales:
1. Nunca los commits al repositorio
2. Agregar `data/*.csv` al `.gitignore`
3. Usar variables de entorno para credenciales
4. Cumplir con normativas de protección de datos (GDPR, Ley 1581 de Colombia)
