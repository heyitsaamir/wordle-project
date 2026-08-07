export const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const THEME_STORAGE_KEY = 'word-game-theme';

export const getInitialTheme = () => {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  const prefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  return prefersDark ? 'dark' : 'light';
};

export const persistTheme = (theme) => {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
