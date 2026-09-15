// Central definition of the available color themes and the logic to
// pick an initial theme and cycle between them. Shared by App (which owns
// the theme state) and Header (which renders the toggle button).

export const THEMES = ['light', 'dark', 'christmas'];

export function getInitialTheme() {
  const stored = window.localStorage.getItem('theme');
  if (THEMES.includes(stored)) {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getNextTheme(theme) {
  const currentIndex = THEMES.indexOf(theme);
  return THEMES[(currentIndex + 1) % THEMES.length];
}
