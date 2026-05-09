import React from 'react';
import Card from './Card';

const Board = ({ playerHand = [], cpuHand = [], playerNarratives = [], event, selectedDeck }) => {
  return (
    <section className="board">
      <header className="board-header">
        <div>
          <h2>Duelo político</h2>
          <p>Mazo activo: <strong>{selectedDeck}</strong></p>
        </div>
        {event && (
          <div className="event-summary">
            <strong>Evento activo:</strong>
            <p>{event.name}</p>
            <small>{event.description}</small>
          </div>
        )}
      </header>

      <div className="board-grid">
        <section className="hand-panel cpu-hand">
          <h3>Mano CPU</h3>
          <div className="card-row">
            {cpuHand.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </section>

        <section className="hand-panel player-hand">
          <h3>Tu mano</h3>
          <div className="card-row">
            {playerHand.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </section>
      </div>

      <section className="narrative-panel">
        <h3>Narrativas disponibles</h3>
        <div className="card-row">
          {playerNarratives.map((narrative) => (
            <Card key={narrative.id} title={narrative.name} description="Modifica tus cartas con esta narrativa." />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Board;
