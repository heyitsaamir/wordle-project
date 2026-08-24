import React from 'react';

const PIECES_PER_BURST = 10;
const CONFETTI_COLOURS = [
  '#ff1493', // deep pink
  '#ff69b4', // hot pink
  '#ffb6c1', // light pink
  '#f72585', // magenta pink
  '#ff8fab', // pastel pink
];

// Generate randomized styling for each confetti piece once, so the burst
// looks organic (varied angle/distance/colour/timing/rotation) without
// re-randomizing on every render.
function createPieces() {
  return Array.from({ length: PIECES_PER_BURST }, (_, index) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = 20 + Math.random() * 30;
    return {
      id: index,
      backgroundColor: CONFETTI_COLOURS[index % CONFETTI_COLOURS.length],
      tx: `${Math.cos(angle) * distance}px`,
      ty: `${Math.sin(angle) * distance}px`,
      rotation: `${Math.random() * 720 - 360}deg`,
      animationDelay: `${Math.random() * 150}ms`,
    };
  });
}

// Renders a small burst of confetti that explodes outward from wherever it's
// placed (e.g. on top of a letter tile), rather than falling from the top of
// the screen.
function Confetti() {
  const [pieces] = React.useState(createPieces);

  return (
    <span className="confetti-burst" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            backgroundColor: piece.backgroundColor,
            animationDelay: piece.animationDelay,
            '--tx': piece.tx,
            '--ty': piece.ty,
            '--rotation': piece.rotation,
          }}
        />
      ))}
    </span>
  );
}

export default Confetti;
