import React from 'react';

const THEMES = {
  light: {
    next: 'dark',
    icon: '🌑',
  },
  dark: {
    next: 'moon',
    icon: '🌙',
  },
  moon: {
    next: 'light',
    icon: '☀️',
  },
};

function getInitialTheme() {
  const stored = window.localStorage.getItem('theme');
  if (Object.prototype.hasOwnProperty.call(THEMES, stored)) {
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

  function cycleTheme() {
    setTheme((currentTheme) => THEMES[currentTheme].next);
  }

  const nextTheme = THEMES[theme].next;

  return (
    <header>
      <div className="side" />
      <h1>Word Game</h1>
      <div className="side">
        <button
          className="theme-toggle-btn"
          onClick={cycleTheme}
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Current theme: ${theme}`}
        >
          {THEMES[theme].icon}
        </button>
      </div>
    </header>
  );
}

export default Header;
