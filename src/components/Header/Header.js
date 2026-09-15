import React from 'react';
import { useTheme } from '../../theme-context';

const NEXT_THEME_LABEL = {
  dark: 'dark',
  eid: 'Eid',
  light: 'light',
};

const NEXT_THEME_ICON = {
  dark: '🌙',
  eid: '🌙✨',
  light: '☀️',
};

function nextThemeOf(theme) {
  if (theme === 'light') return 'dark';
  if (theme === 'dark') return 'eid';
  return 'light';
}

function Header() {
  const { theme, cycleTheme } = useTheme();
  const next = nextThemeOf(theme);

  return (
    <header>
      <div className="side" />
      <h1>
        Word Game
        {theme === 'eid' && (
          <span className="eid-title-decoration" aria-hidden="true">
            {' '}
            🌙✨
          </span>
        )}
      </h1>
      <div className="side">
        <button
          className="theme-toggle-btn"
          onClick={cycleTheme}
          aria-label={`Switch to ${NEXT_THEME_LABEL[next]} mode`}
        >
          {NEXT_THEME_ICON[next]}
        </button>
      </div>
    </header>
  );
}

export default Header;
