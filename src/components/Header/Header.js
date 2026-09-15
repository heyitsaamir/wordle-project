import React from 'react';

import { getNextTheme } from '../../theme';

const THEME_ICON = {
  light: '🌙',
  dark: '🎄',
  christmas: '☀️',
};

const THEME_LABEL = {
  light: 'Switch to dark mode',
  dark: 'Switch to Christmas theme',
  christmas: 'Switch to light mode',
};

function Header({ theme, setTheme }) {
  function toggleTheme() {
    setTheme(getNextTheme(theme));
  }

  return (
    <header>
      <div className="side">
        {theme === 'christmas' ? (
          <span className="header-tree" aria-hidden="true">
            🎄
          </span>
        ) : null}
      </div>
      <h1>Word Game</h1>
      <div className="side">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={THEME_LABEL[theme]}
        >
          {THEME_ICON[theme]}
        </button>
      </div>
    </header>
  );
}

export default Header;
