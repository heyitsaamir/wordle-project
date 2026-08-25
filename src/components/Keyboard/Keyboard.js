import React from 'react';

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
];

function Keyboard({ letterStatuses = {}, onKeyPress, disabled = false }) {
  function handleClick(key) {
    if (disabled) {
      return;
    }
    onKeyPress(key);
  }

  function statusFor(key) {
    return letterStatuses[key];
  }

  return (
    <div className="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === 'DELETE';
            const status = statusFor(key);
            return (
              <button
                key={key}
                type="button"
                className={[
                  'key',
                  isWide ? 'key--wide' : '',
                  status ? `key--${status}` : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleClick(key)}
                disabled={disabled}
                aria-label={key === 'DELETE' ? 'Delete letter' : key === 'ENTER' ? 'Submit guess' : key}
              >
                {key === 'DELETE' ? '⌫' : key === 'ENTER' ? 'Enter' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
