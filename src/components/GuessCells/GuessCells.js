import React from 'react';
import { range } from '../../utils';
import { checkGuess } from '/src/game-helpers.js'

function GuessCells({guess, answer, isSubmitted = true}) {
  const results = isSubmitted ? checkGuess(guess, answer) : null

  function className(index) {
    if (!results) {
      return guess && guess[index] ? "cell filled" : "cell"
    }

    return `cell ${results[index].status}`
  }

  return (
    <p className="guess">
      {range(5).map((index) => (
        <span key={index} className={className(index)}>
          { guess ? guess[index] : undefined}
        </span>
      ))}
    </p>
  );
}

export default GuessCells;
