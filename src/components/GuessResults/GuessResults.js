import React from 'react';
import GuessCells from '../GuessCells/GuessCells';

function GuessResults({ guessList, answer }) {
  return (
    <div className="guess-results">
      {guessList.map((guess, index) => (
        <GuessCells key={index} guess={guess} answer={answer} />
      ))}
    </div>
  );
}

export default GuessResults;
