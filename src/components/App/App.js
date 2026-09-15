import React from 'react';

import Game from '../Game';
import Header from '../Header';
import { getInitialTheme } from '../../theme';

function App() {
  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="wrapper">
      {theme === 'christmas' ? (
        <div className="christmas-sky" aria-hidden="true">
          <span className="snowflake snowflake-one">❄</span>
          <span className="snowflake snowflake-two">❄</span>
          <span className="snowflake snowflake-three">❄</span>
          <span className="snowflake snowflake-four">❄</span>
          <span className="snowflake snowflake-five">❄</span>
        </div>
      ) : null}

      <Header theme={theme} setTheme={setTheme} />

      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

export default App;
