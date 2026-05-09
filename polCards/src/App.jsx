import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import DeckSelector from './components/DeckSelector';
import OpinionBar from './components/OpinionBar';
import EventBanner from './components/EventBanner';
import BattleLog from './components/BattleLog';
import { politicians, shuffleDeck } from './data/candidates';
import narratives from './data/narratives';
import events from './data/events';

const INITIAL_OPINION = 50;

const App = () => {
  const [selectedDeck, setSelectedDeck] = useState('izquierda');
  const [playerHand, setPlayerHand] = useState([]);
  const [playerNarratives, setPlayerNarratives] = useState([]);
  const [cpuHand, setCpuHand] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [playerOpinion, setPlayerOpinion] = useState(INITIAL_OPINION);
  const [cpuOpinion, setCpuOpinion] = useState(INITIAL_OPINION);
  const [battleLog, setBattleLog] = useState([
    { time: 'Turno 1', text: 'Selecciona tu mazo y prepara el duelo.' },
  ]);

  useEffect(() => {
    const playerDeck = shuffleDeck(politicians.filter((card) => card.type === selectedDeck));
    const cpuDeck = shuffleDeck(politicians.filter((card) => card.type !== selectedDeck));
    const narrativeDeck = shuffleDeck(narratives);
    const event = events[Math.floor(Math.random() * events.length)];

    setPlayerHand(playerDeck.slice(0, 4));
    setCpuHand(cpuDeck.slice(0, 4));
    setPlayerNarratives(narrativeDeck.slice(0, 2));
    setCurrentEvent(event);
    setBattleLog((previous) => [
      { time: 'Turno 1', text: `Evento activo: ${event.name}` },
      ...previous,
    ]);
  }, [selectedDeck]);

  return (
    <div className="app-shell">
      <header>
        <h1>Policars 2</h1>
      </header>

      <main>
        <DeckSelector selectedDeck={selectedDeck} onSelectDeck={setSelectedDeck} />
        <EventBanner message={currentEvent ? `${currentEvent.name}: ${currentEvent.description}` : 'Cargando evento...'} />
        <OpinionBar approval={playerOpinion} intensity={(playerOpinion - 50) / 50} />
        <Board
          playerHand={playerHand}
          cpuHand={cpuHand}
          playerNarratives={playerNarratives}
          event={currentEvent}
          selectedDeck={selectedDeck}
        />
        <BattleLog entries={battleLog} />
      </main>
    </div>
  );
};

export default App;
