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

// Procedurally generated "ghostly moan" so no external audio asset is needed:
// a descending sawtooth tone with a frequency-modulated wobble (vibrato).
function playSpookySound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const duration = 1.3;

    const oscillator = ctx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(196, now);
    oscillator.frequency.exponentialRampToValueAtTime(65, now + duration);

    const vibrato = ctx.createOscillator();
    vibrato.frequency.setValueAtTime(6, now);
    const vibratoDepth = ctx.createGain();
    vibratoDepth.gain.setValueAtTime(18, now);
    vibrato.connect(vibratoDepth);
    vibratoDepth.connect(oscillator.frequency);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.18, now + 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    vibrato.start(now);
    oscillator.stop(now + duration);
    vibrato.stop(now + duration);

    oscillator.onended = () => {
      ctx.close();
    };
  } catch (error) {
    // Sound is a nice-to-have; silently ignore unsupported browsers.
  }
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
    setTheme((prev) => {
      const nextTheme = getNextTheme(prev);
      if (nextTheme === 'halloween') {
        playSpookySound();
      }
      return nextTheme;
    });
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
