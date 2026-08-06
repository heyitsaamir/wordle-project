import React from 'react';
import GuessCells from '../GuessCells/GuessCells';

function GuessResults({ guessList, answer, currentGuess = '', guessListIndex }) {
  return (
    <div className="guess-results">
      {guessList.map((guess, index) => {
        const isActive = index === guessListIndex && !guess;
        return (
          <GuessCells
            key={index}
            guess={isActive ? currentGuess : guess}
            answer={answer}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}

export default GuessResults;
