import React from 'react';

const NUM_OF_BALLOONS = 12;
const BALLOON_COLOURS = [
  '#ff4d6d', // red/pink
  '#ffb703', // orange
  '#ffd60a', // yellow
  '#06d6a0', // green
  '#4cc9f0', // blue
  '#b388eb', // purple
];

// Generate randomized styling for each balloon once, so the celebration
// looks organic (varied position/colour/size/speed/sway) without
// re-randomizing on every render.
function createBalloons() {
  return Array.from({ length: NUM_OF_BALLOONS }, (_, index) => {
    return {
      id: index,
      backgroundColor: BALLOON_COLOURS[index % BALLOON_COLOURS.length],
      left: `${(index / NUM_OF_BALLOONS) * 100 + (Math.random() * 6 - 3)}%`,
      scale: 0.7 + Math.random() * 0.6,
      duration: `${2800 + Math.random() * 1400}ms`,
      delay: `${Math.random() * 600}ms`,
      sway: `${Math.random() * 40 - 20}px`,
    };
  });
}

// Renders a bunch of balloons that float up from the bottom of the screen
// and fade out near the top, celebrating a successful guess.
function Balloons() {
  const [balloons] = React.useState(createBalloons);

  return (
    <div className="balloons" aria-hidden="true">
      {balloons.map((balloon) => (
        <span
          key={balloon.id}
          className="balloon"
          style={{
            left: balloon.left,
            backgroundColor: balloon.backgroundColor,
            color: balloon.backgroundColor,
            animationDuration: balloon.duration,
            animationDelay: balloon.delay,
            '--scale': balloon.scale,
            '--sway': balloon.sway,
          }}
        />
      ))}
    </div>
  );
}

export default Balloons;
