import React from 'react';

const THEMES = [
  { name: 'light', label: 'light mode', icon: '☀️' },
  { name: 'dark', label: 'dark mode', icon: '🌙' },
  { name: 'sakura', label: 'Sakura theme', icon: '🌸' },
];

function getInitialTheme() {
  const stored = window.localStorage.getItem('theme');
  if (THEMES.some(({ name }) => name === stored)) {
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
    setTheme((currentTheme) => {
      const currentIndex = THEMES.findIndex(
        ({ name }) => name === currentTheme
      );
      return THEMES[(currentIndex + 1) % THEMES.length].name;
    });
  }

  const currentIndex = THEMES.findIndex(({ name }) => name === theme);
  const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];

  return (
    <header>
      <div className="side" />
      <h1>Word Game</h1>
      <div className="side">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextTheme.label}`}
          title={`Switch to ${nextTheme.label}`}
        >
          {nextTheme.icon}
        </button>
      </div>
    </header>
  );
}

export default Header;
