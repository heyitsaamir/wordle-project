import React from 'react';

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

function Keyboard({ letterStatuses = {}, onKeyPress, onEnter, onBackspace, disabled = false, variant = 'classic' }) {
  function handleClick(key) {
    if (disabled) {
      return;
    }
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  }

  function statusClass(key) {
    const status = letterStatuses[key];
    return status ? ` ${status}` : '';
  }

  return (
    <div className={`keyboard keyboard--${variant}`}>
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <button
              key={key}
              type="button"
              className={`keyboard-key${key === 'ENTER' || key === 'BACKSPACE' ? ' keyboard-key--wide' : ''}${statusClass(key)}`}
              onClick={() => handleClick(key)}
              disabled={disabled}
              aria-label={key === 'BACKSPACE' ? 'Backspace' : key === 'ENTER' ? 'Enter' : key}
            >
              {key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? 'Enter' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
