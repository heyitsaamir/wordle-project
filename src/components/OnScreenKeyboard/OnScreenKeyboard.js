import React from 'react';

import { KEYBOARD_ROWS } from '../../constants';

function OnScreenKeyboard({ onKeyPress, onEnter, onBackspace, letterStatuses = {}, disabled = false }) {
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

  function keyClassName(key) {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return 'keyboard-key keyboard-key--wide';
    }

    const status = letterStatuses[key];
    return status ? `keyboard-key ${status}` : 'keyboard-key';
  }

  function keyLabel(key) {
    if (key === 'ENTER') {
      return 'Enter';
    }
    if (key === 'BACKSPACE') {
      return '⌫';
    }
    return key;
  }

  function keyAriaLabel(key) {
    if (key === 'ENTER') {
      return 'Submit guess';
    }
    if (key === 'BACKSPACE') {
      return 'Delete last letter';
    }
    return `Letter ${key}`;
  }

  return (
    <div className="on-screen-keyboard" role="group" aria-label="On-screen keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <button
              key={key}
              type="button"
              className={keyClassName(key)}
              onClick={() => handleClick(key)}
              disabled={disabled}
              aria-label={keyAriaLabel(key)}
            >
              {keyLabel(key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OnScreenKeyboard;
