import React, { useState } from 'react';

/**
 * Componente UserRegistration - Modal para recopilar datos del usuario
 * Aparece antes de comenzar la primera partida
 */
const UserRegistration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    edad: '',
    genero: '',
    ciudad: '',
    correo: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar edad
    if (!formData.edad) {
      newErrors.edad = 'La edad es requerida';
    } else {
      const edad = parseInt(formData.edad);
      if (isNaN(edad) || edad < 13 || edad > 120) {
        newErrors.edad = 'Ingresa una edad válida (13-120)';
      }
    }

    // Validar género
    if (!formData.genero) {
      newErrors.genero = 'El género es requerido';
    }

    // Validar ciudad
    if (!formData.ciudad || formData.ciudad.trim().length < 2) {
      newErrors.ciudad = 'La ciudad es requerida';
    }

    // Validar correo
    if (!formData.correo) {
      newErrors.correo = 'El correo es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.correo)) {
        newErrors.correo = 'Ingresa un correo válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Pasar los datos al componente padre
      onComplete(formData);
    }
  };

  return (
    <div className="ranking-overlay user-registration-overlay">
      <div className="ranking-container user-registration-container">
        <header className="ranking-header">
          <h2>Bienvenido a Policards</h2>
        </header>

        <p className="user-registration-intro">
          Antes de comenzar, cuéntanos un poco sobre ti para mejorar tu experiencia de juego.
        </p>

        <form onSubmit={handleSubmit} className="user-registration-form">
          <div className="form-group">
            <label htmlFor="edad">Edad *</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              placeholder="Ej: 25"
              min="13"
              max="120"
              className={errors.edad ? 'input-error' : ''}
            />
            {errors.edad && <span className="error-message">{errors.edad}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="genero">Género *</label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className={errors.genero ? 'input-error' : ''}
            >
              <option value="">Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero-no-decir">Prefiero no decir</option>
            </select>
            {errors.genero && <span className="error-message">{errors.genero}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ciudad">Ciudad *</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Ej: Bogotá"
              className={errors.ciudad ? 'input-error' : ''}
            />
            {errors.ciudad && <span className="error-message">{errors.ciudad}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico *</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className={errors.correo ? 'input-error' : ''}
            />
            {errors.correo && <span className="error-message">{errors.correo}</span>}
          </div>

          <footer className="ranking-footer">
            <button type="submit" className="btn-primary">
              Comenzar a Jugar
            </button>
          </footer>
        </form>

        <p className="user-registration-privacy">
          Tus datos son confidenciales y solo se usan para análisis estadístico.
        </p>
      </div>
    </div>
  );
};

export default UserRegistration;
