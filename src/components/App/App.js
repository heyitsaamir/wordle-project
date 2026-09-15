import Game from '../Game';
import Header from '../Header';
import EidSparkles from '../EidSparkles';
import { ThemeProvider, useTheme } from '../../theme-context';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className="wrapper">
      {theme === 'eid' && <EidSparkles />}
      <Header />

      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
