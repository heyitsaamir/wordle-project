import React from 'react';
import GuessCells from '../GuessCells/GuessCells';

function GuessResults({ guessList, answer, currentGuess = '', activeIndex = -1 }) {
  return (
    <div className="guess-results">
      {guessList.map((guess, index) => {
        const isActiveRow = index === activeIndex;
        return (
          <GuessCells
            key={index}
            guess={isActiveRow ? currentGuess : guess}
            answer={answer}
            isSubmitted={!isActiveRow}
          />
        );
      })}
    </div>
  );
}

export default GuessResults;
