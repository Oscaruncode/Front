import React from 'react';

const Card = ({
  title,
  strength,
  description,
  name,
  party,
  type,
  image,
  stats,
  rating,
  showStats = true,
  onClick,
  className,
}) => {
  const classes = ['card', className].filter(Boolean).join(' ');

  if (name) {
    return (
      <article className={classes} onClick={onClick}>
        <div className="card-portrait">
          {image ? <img src={image} alt={name} /> : <div className="card-placeholder">No Image</div>}
        </div>
        <header>
          <h3>{name}</h3>
          {showStats && <p className="card-meta">{party} · {type}</p>}
          {!showStats && <p className="card-meta">{party}{/* show vice if available */}{' '}{/* spacer */}{/* eslint-disable-next-line react/destructuring-assignment */}{/* vice passed as prop */}{/* render below */}</p>}
          {!showStats && typeof vice === 'string' && vice && (
            <p className="card-meta" style={{ fontSize: '0.85rem', color: '#444', marginTop: 4 }}>
              Fórmula vicepresidencial: {vice}
            </p>
          )}
          {showStats && typeof vice === 'string' && vice && (
            <p className="card-meta" style={{ fontSize: '0.95rem', color: '#444', marginTop: 6 }}>
              Fórmula vicepresidencial: {vice}
            </p>
          )}
        </header>
        {showStats && (
          <div className="stats">
            <p>Propuestas: {stats.propuestas}</p>
            <p>Experiencia: {stats.experiencia}</p>
            <p>Escándalos: {stats.escandalos}</p>
            {rating !== undefined && <p className="rating">Rating: {rating.toFixed(1)}</p>}
          </div>
        )}
      </article>
    );
  }

  return (
    <article className={classes} onClick={onClick}>
      <header>
        <h3>{title}</h3>
        {strength !== undefined && <span className="strength">Fuerza: {strength}</span>}
      </header>
      <p>{description}</p>
    </article>
  );
};

export default Card;
