/**
 * Stats Engine - Maneja los cambios dinámicos de estadísticas de candidatos
 * Las stats cambian basándose en las decisiones tomadas durante el juego
 */

/**
 * Calcula los cambios en las estadísticas de un candidato basándose en una decisión
 * @param {Object} candidate - El candidato que tomó la decisión
 * @param {Object} event - El evento/crisis actual
 * @param {Object} choice - La opción seleccionada
 * @param {Object} result - El resultado de la decisión (de battleEngine)
 * @returns {Object} Las nuevas stats del candidato
 */
export function applyDecisionEffects(candidate, event, choice, result) {
  // Clonar las stats actuales para no mutar directamente
  const newStats = { ...candidate.stats };

  // Determinar el tipo de decisión basándose en el score y la opción
  const isSuccessful = result.scoreDelta >= 8;
  const isMixed = result.scoreDelta >= 0 && result.scoreDelta < 8;
  const isFailure = result.scoreDelta < 0;

  // Cambios base por resultado
  if (isSuccessful) {
    // Decisiones exitosas aumentan experiencia y propuestas
    newStats.experiencia = Math.min(10, newStats.experiencia + 0.3);
    newStats.propuestas = Math.min(10, newStats.propuestas + 0.2);
    // Reducir escándalos levemente si la decisión fue muy buena
    if (result.scoreDelta >= 10) {
      newStats.escandalos = Math.max(0, newStats.escandalos - 0.1);
    }
  } else if (isFailure) {
    // Decisiones fallidas reducen propuestas y pueden aumentar escándalos
    newStats.propuestas = Math.max(0, newStats.propuestas - 0.2);
    if (result.scoreDelta <= -5) {
      newStats.escandalos = Math.min(10, newStats.escandalos + 0.3);
    }
    // La experiencia puede crecer levemente incluso con fallos (aprendizaje)
    newStats.experiencia = Math.min(10, newStats.experiencia + 0.1);
  } else if (isMixed) {
    // Resultados mixtos dan experiencia pero no cambian mucho las otras stats
    newStats.experiencia = Math.min(10, newStats.experiencia + 0.15);
  }

  // Modificadores adicionales basados en el tipo de decisión
  const optionLabel = choice.label?.toLowerCase() || '';
  const optionDesc = choice.description?.toLowerCase() || '';
  const combinedText = `${optionLabel} ${optionDesc}`;

  // Decisiones autoritarias/represivas aumentan escándalos
  if (
    combinedText.includes('reprimir') ||
    combinedText.includes('represi') ||
    combinedText.includes('ignorar') ||
    combinedText.includes('negar')
  ) {
    newStats.escandalos = Math.min(10, newStats.escandalos + 0.2);
  }

  // Decisiones transparentes/honestas reducen escándalos
  if (
    combinedText.includes('transparencia') ||
    combinedText.includes('investigaci') ||
    combinedText.includes('di\u00e1logo') ||
    combinedText.includes('dialog')
  ) {
    newStats.escandalos = Math.max(0, newStats.escandalos - 0.15);
    newStats.propuestas = Math.min(10, newStats.propuestas + 0.1);
  }

  // Decisiones de inversión/programas aumentan propuestas
  if (
    combinedText.includes('inversi\u00f3n') ||
    combinedText.includes('programa') ||
    combinedText.includes('crear') ||
    combinedText.includes('expandir')
  ) {
    newStats.propuestas = Math.min(10, newStats.propuestas + 0.2);
  }

  // Redondear a 1 decimal para mantener consistencia
  return {
    propuestas: parseFloat(newStats.propuestas.toFixed(1)),
    experiencia: parseFloat(newStats.experiencia.toFixed(1)),
    escandalos: parseFloat(newStats.escandalos.toFixed(1)),
  };
}

/**
 * Genera un mensaje describiendo cómo cambiaron las stats
 * @param {Object} oldStats - Stats anteriores
 * @param {Object} newStats - Stats nuevas
 * @param {string} candidateName - Nombre del candidato
 * @returns {string} Mensaje descriptivo
 */
export function getStatsChangeMessage(oldStats, newStats, candidateName) {
  const changes = [];

  const propChange = newStats.propuestas - oldStats.propuestas;
  const expChange = newStats.experiencia - oldStats.experiencia;
  const escChange = newStats.escandalos - oldStats.escandalos;

  if (Math.abs(propChange) >= 0.1) {
    changes.push(
      `Propuestas ${propChange > 0 ? '+' : ''}${propChange.toFixed(1)}`
    );
  }
  if (Math.abs(expChange) >= 0.1) {
    changes.push(
      `Experiencia ${expChange > 0 ? '+' : ''}${expChange.toFixed(1)}`
    );
  }
  if (Math.abs(escChange) >= 0.1) {
    changes.push(
      `Escándalos ${escChange > 0 ? '+' : ''}${escChange.toFixed(1)}`
    );
  }

  if (changes.length === 0) {
    return '';
  }

  return `📊 Stats de ${candidateName}: ${changes.join(', ')}`;
}
