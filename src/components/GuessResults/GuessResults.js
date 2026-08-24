import React from 'react';
import GuessCells from '../GuessCells/GuessCells';

function GuessResults({ guessList, answer, winningGuessIndex }) {
  return (
    <div className="guess-results">
      {guessList.map((guess, index) => (
        <GuessCells
          key={index}
          guess={guess}
          answer={answer}
          celebrate={index === winningGuessIndex}
        />
      ))}
    </div>
  );
}

export default GuessResults;
