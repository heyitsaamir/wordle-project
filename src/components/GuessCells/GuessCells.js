import React from 'react';
import { range } from '../../utils';
import { checkGuess } from '/src/game-helpers.js'
import Confetti from '../Confetti';

function GuessCells({guess, answer, celebrate}) {
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
        <span key={index} className={className(index)}>
          { guess ? guess[index] : undefined}
          { celebrate ? <Confetti /> : null}
        </span>
      ))}
    </p>
  );
}

export default GuessCells;
