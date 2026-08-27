import React from 'react';

import { range, sample } from '../../utils';

const NUM_OF_BALLOONS = 12;
const BALLOON_COLORS = [
  '#e63946',
  '#f4a261',
  '#e9c46a',
  '#2a9d8f',
  '#457b9d',
  '#a663cc',
  '#ff70a6',
];

function Balloons() {
  // Randomize each balloon once per mount so they don't reshuffle on re-render.
  const balloons = React.useMemo(
    () =>
      range(NUM_OF_BALLOONS).map((index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 3.5 + Math.random() * 2,
        color: sample(BALLOON_COLORS),
        scale: 0.8 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="balloons" aria-hidden="true">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="balloon"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
            transform: `scale(${balloon.scale})`,
            '--balloon-color': balloon.color,
          }}
        >
          <div className="balloon-string" />
        </div>
      ))}
    </div>
  );
}

export default Balloons;
