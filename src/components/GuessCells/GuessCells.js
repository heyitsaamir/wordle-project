import React from 'react';
import { range } from '../../utils';
import { checkGuess } from '/src/game-helpers.js'

function GuessCells({guess, answer}) {
  const results = checkGuess(guess, answer)

  function className(index) {
    if (!results) {
      return "cell"
    }

    return `cell ${results[index].status}`
  }

  return (
    <p className="guess">
      {range(5).map((index) => (
        <span
          key={index}
          className={`${className(index)}${results ? " revealed" : ""}`}
          style={{ "--reveal-delay": `${index * 120}ms` }}
        >
          { guess ? guess[index] : undefined}
        </span>
      ))}
    </p>
  );
}

export default GuessCells;
