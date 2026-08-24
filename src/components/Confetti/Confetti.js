import React from 'react';

import { playWinSound } from '../../sound-helpers';

const NUM_OF_CONFETTI_PIECES = 60;
const CONFETTI_COLOURS = [
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-error)',
  'hsl(210deg 90% 55%)',
  'hsl(280deg 80% 60%)',
];

// Generate randomized styling for each confetti piece once, so the burst
// looks organic (varied position/colour/timing/rotation) without re-randomizing on every render.
function createPieces() {
  return Array.from({ length: NUM_OF_CONFETTI_PIECES }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    backgroundColor: CONFETTI_COLOURS[index % CONFETTI_COLOURS.length],
    animationDelay: `${Math.random() * 400}ms`,
    animationDuration: `${1800 + Math.random() * 1200}ms`,
    rotation: `${360 + Math.random() * 720}deg`,
  }));
}

function Confetti() {
  const [pieces] = React.useState(createPieces);

  React.useEffect(() => {
    playWinSound();
  }, []);

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.backgroundColor,
            animationDelay: piece.animationDelay,
            animationDuration: piece.animationDuration,
            '--rotation': piece.rotation,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
