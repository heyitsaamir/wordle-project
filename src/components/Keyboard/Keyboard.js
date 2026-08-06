import React from 'react';
import { checkGuess } from '../../game-helpers';

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

// Priority for displaying a letter's best-known status across all guesses.
const STATUS_PRIORITY = { correct: 3, misplaced: 2, incorrect: 1 };

function getLetterStatuses(guessList, answer) {
  const statuses = {};

  guessList.forEach((guess) => {
    if (!guess) {
      return;
    }

    const result = checkGuess(guess, answer);
    result.forEach(({ letter, status }) => {
      const currentPriority = STATUS_PRIORITY[statuses[letter]] || 0;
      if (STATUS_PRIORITY[status] > currentPriority) {
        statuses[letter] = status;
      }
    });
  });

  return statuses;
}

function Keyboard({
  variant = 'classic',
  guess,
  setGuess,
  onEnter,
  guessList,
  answer,
  disableForm = false,
}) {
  const letterStatuses = React.useMemo(
    () => getLetterStatuses(guessList, answer),
    [guessList, answer]
  );

  function handleKeyClick(key) {
    if (disableForm) {
      return;
    }

    if (key === 'ENTER') {
      onEnter();
      return;
    }

    if (key === 'BACKSPACE') {
      setGuess((prev) => prev.slice(0, -1));
      return;
    }

    setGuess((prev) => (prev.length < 5 ? prev + key : prev));
  }

  return (
    <div className={`keyboard keyboard--${variant}`}>
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === 'BACKSPACE';
            const status = letterStatuses[key];
            return (
              <button
                type="button"
                key={key}
                className={`key${isWide ? ' key--wide' : ''}${
                  status ? ` ${status}` : ''
                }`}
                onClick={() => handleKeyClick(key)}
                disabled={disableForm}
                aria-label={key === 'BACKSPACE' ? 'Backspace' : key}
              >
                {key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? 'Enter' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
