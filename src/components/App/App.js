import React from 'react';

import Game from '../Game';
import Header from '../Header';
import { getInitialTheme, persistTheme } from '../../utils';

function App() {
  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="wrapper">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

export default App;
