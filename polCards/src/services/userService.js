/**
 * userService.js
 * Servicio para manejar los datos del usuario
 * Almacena en localStorage y sincroniza con la API
 */

const STORAGE_KEY = 'policards_user_data';

/**
 * Obtiene los datos del usuario desde localStorage
 * @returns {Object|null} Datos del usuario o null si no existen
 */
export const getUserData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('[userService] Error reading user data:', error);
    return null;
  }
};

/**
 * Guarda los datos del usuario en localStorage
 * @param {Object} userData - Datos del usuario (edad, genero, ciudad, correo)
 * @returns {boolean} true si se guardó correctamente
 */
export const saveUserData = (userData) => {
  try {
    const dataToSave = {
      ...userData,
      timestamp: new Date().toISOString(),
      registeredAt: userData.registeredAt || new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    console.log('[userService] User data saved locally:', dataToSave);
    return true;
  } catch (error) {
    console.error('[userService] Error saving user data:', error);
    return false;
  }
};

/**
 * Verifica si el usuario ya se ha registrado
 * @returns {boolean} true si ya existe registro
 */
export const isUserRegistered = () => {
  return getUserData() !== null;
};

/**
 * Sincroniza los datos del usuario con la API
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<boolean>} true si se sincronizó correctamente
 */
export const syncUserData = async (userData) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    console.log('[userService] No API URL configured, skipping sync');
    return false;
  }

  try {
    const response = await fetch(`${apiUrl}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.warn('[userService] API sync failed:', response.statusText);
      return false;
    }

    const result = await response.json();
    console.log('[userService] User data synced successfully:', result);
    return true;
  } catch (error) {
    console.error('[userService] Error syncing user data:', error);
    return false;
  }
};

/**
 * Registra un nuevo usuario (guarda local + sincroniza)
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<boolean>} true si se registró correctamente
 */
export const registerUser = async (userData) => {
  // Guardar localmente primero (garantizado)
  const savedLocally = saveUserData(userData);

  if (!savedLocally) {
    return false;
  }

  // Intentar sincronizar con API (opcional, no bloquea)
  await syncUserData(userData);

  return true;
};

/**
 * Limpia los datos del usuario (para testing/desarrollo)
 * @returns {boolean} true si se limpió correctamente
 */
export const clearUserData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[userService] User data cleared');
    return true;
  } catch (error) {
    console.error('[userService] Error clearing user data:', error);
    return false;
  }
};

/**
 * Actualiza parcialmente los datos del usuario
 * @param {Object} updates - Campos a actualizar
 * @returns {boolean} true si se actualizó correctamente
 */
export const updateUserData = (updates) => {
  const currentData = getUserData();

  if (!currentData) {
    console.warn('[userService] No user data to update');
    return false;
  }

  const updatedData = {
    ...currentData,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  return saveUserData(updatedData);
};
