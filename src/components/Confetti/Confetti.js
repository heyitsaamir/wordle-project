import React from "react";

const CONFETTI_COLORS = [
  "#ff4d6d",
  "#ffd60a",
  "#4cc9f0",
  "#b5179e",
  "#80ed99",
  "#ff9f1c",
];

const PARTICLE_COUNT = 48;

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }, (_, index) => {
        const left = (index * 37) % 100;
        const drift = ((index * 29) % 31) - 15;
        const duration = 1800 + ((index * 83) % 900);
        const delay = (index * 47) % 500;
        const spin = 360 + ((index * 71) % 540);

        return (
          <span
            className="confetti-particle"
            key={index}
            style={{
              "--confetti-color":
                CONFETTI_COLORS[index % CONFETTI_COLORS.length],
              "--confetti-delay": `${delay}ms`,
              "--confetti-drift": `${drift}vw`,
              "--confetti-duration": `${duration}ms`,
              "--confetti-left": `${left}%`,
              "--confetti-spin": `${spin}deg`,
            }}
          />
        );
      })}
    </div>
  );
}

export default Confetti;
