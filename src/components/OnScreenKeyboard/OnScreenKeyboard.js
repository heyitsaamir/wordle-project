import React from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

function OnScreenKeyboard({ keyStatuses = {}, onKeyPress, onEnter, onBackspace, disabled = false }) {
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

  function classNameFor(key) {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return 'keyboard-key keyboard-key--wide';
    }

    const status = keyStatuses[key];
    return status ? `keyboard-key ${status}` : 'keyboard-key';
  }

  function labelFor(key) {
    if (key === 'ENTER') {
      return 'Enter';
    }
    if (key === 'BACKSPACE') {
      return '⌫';
    }
    return key;
  }

  return (
    <div className="on-screen-keyboard" role="group" aria-label="On-screen keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <button
              key={key}
              type="button"
              className={classNameFor(key)}
              onClick={() => handleClick(key)}
              disabled={disabled}
              aria-label={key === 'BACKSPACE' ? 'Backspace' : undefined}
            >
              {labelFor(key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OnScreenKeyboard;
