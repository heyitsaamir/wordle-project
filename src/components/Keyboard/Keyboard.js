import React from 'react';

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

// A compact on-screen keyboard that types into the guess input.
// It supplements (rather than replaces) typing on a physical keyboard.
function Keyboard({ setGuess, onEnter, disableForm = false }) {
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
    <div className="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === 'BACKSPACE';
            return (
              <button
                type="button"
                key={key}
                className={`key${isWide ? ' key--wide' : ''}`}
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
