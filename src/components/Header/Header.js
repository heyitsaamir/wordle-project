import React from 'react';

function Header() {
  const [comicSans, setComicSans] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle('comic-sans-mode', comicSans);
  }, [comicSans]);

  return (
    <header>
      <h1>Word Game</h1>
      <button
        className="comic-sans-toggle"
        onClick={() => setComicSans((prev) => !prev)}
      >
        {comicSans ? 'Comic Sans: On' : 'Comic Sans: Off'}
      </button>
    </header>
  );
}

export default Header;
