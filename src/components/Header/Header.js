import React from 'react';

function getInitialTheme() {
  const stored = window.localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <header>
      <div className="side header-pumpkin" aria-hidden="true">🎃</div>
      <div className="brand">
        <h1>Haunted Wordle</h1>
        <p>Six guesses before midnight</p>
      </div>
      <div className="side">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {theme === 'dark' ? '🕯️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;
