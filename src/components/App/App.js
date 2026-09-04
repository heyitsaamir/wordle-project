import Game from '../Game';
import Header from '../Header';

function App() {
  return (
    <div className="wrapper">
      <div className="spooky-sky" aria-hidden="true">
        <span className="moon" />
        <span className="bat bat-one">⌁</span>
        <span className="bat bat-two">⌁</span>
        <span className="bat bat-three">⌁</span>
      </div>
      <Header />

      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

export default App;
