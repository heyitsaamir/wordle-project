import React from 'react';

import { getLetterStatuses } from '../../game-helpers';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
];

function OnScreenKeyboard({ guessList, answer, onKeyPress, disabled = false }) {
  const letterStatuses = getLetterStatuses(guessList, answer);

  function handleClick(key) {
    if (disabled) {
      return;
    }
    onKeyPress(key);
  }

  return (
    <div className="on-screen-keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === 'DEL';
            const status = letterStatuses[key];
            const className = [
              'key',
              isWide ? 'wide' : '',
              status ? status : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={key}
                type="button"
                className={className}
                disabled={disabled}
                onClick={() => handleClick(key)}
                aria-label={key === 'DEL' ? 'Backspace' : key}
              >
                {key === 'DEL' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default OnScreenKeyboard;
