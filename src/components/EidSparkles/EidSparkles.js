import React from 'react';

const SPARKLE_SYMBOLS = ['✨', '⭐', '🌙'];
const SPARKLE_COUNT = 22;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function buildSparkles(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    symbol: SPARKLE_SYMBOLS[index % SPARKLE_SYMBOLS.length],
    left: `${randomBetween(0, 100)}%`,
    top: `${randomBetween(0, 100)}%`,
    size: `${randomBetween(0.75, 1.85)}rem`,
    delay: `${randomBetween(0, 5)}s`,
    duration: `${randomBetween(3, 7)}s`,
  }));
}

// Ambient, twinkling sparkles that drift across the background while the
// Eid theme is active. Purely decorative, so it's hidden from screen
// readers and never intercepts pointer events.
function EidSparkles() {
  const [sparkles] = React.useState(() => buildSparkles(SPARKLE_COUNT));

  return (
    <div className="eid-sparkles" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="eid-sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            fontSize: sparkle.size,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        >
          {sparkle.symbol}
        </span>
      ))}
    </div>
  );
}

export default EidSparkles;
