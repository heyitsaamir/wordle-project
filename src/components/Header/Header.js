import React from 'react';

const THEME_ORDER = ['light', 'dark', 'halloween'];
const THEME_ICONS = {
  light: '☀️',
  dark: '🌙',
  halloween: '🎃',
};

function getNextTheme(theme) {
  const index = THEME_ORDER.indexOf(theme);
  return THEME_ORDER[(index + 1) % THEME_ORDER.length];
}

function getInitialTheme() {
  const stored = window.localStorage.getItem('theme');
  if (THEME_ORDER.includes(stored)) {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function Header() {
  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(getNextTheme);
  }

  const next = getNextTheme(theme);

  return (
    <header>
      <div className="side" />
      <h1>Word Game</h1>
      <div className="side">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${next} mode`}
        >
          {THEME_ICONS[next]}
        </button>
      </div>
    </header>
  );
}

export default Header;
