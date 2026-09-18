import React from 'react';

import { createShareText } from '../../share-helpers';

function ResultsBanner({
  isGameWon,
  answer,
  guessList,
  guessListIndex,
  resetGame,
}) {
  const [shareStatus, setShareStatus] = React.useState('');
  const bannerColour = isGameWon ? "happy banner" : "sad banner"
  const bannerWinText = <p><strong>Congratulations!</strong> Got it in <strong>{guessListIndex} guesses</strong>.</p>
  const bannerLostText = <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>

  async function handleShare() {
    const text = createShareText({ guessList, answer, isGameWon });
    const shareData = {
      title: 'Word Game challenge',
      text,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareStatus('Challenge shared!');
        return;
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
      }
    }

    const clipboardText = `${text}\n${window.location.href}`;

    try {
      await navigator.clipboard.writeText(clipboardText);
      setShareStatus('Copied! Send it to a friend.');
    } catch {
      window.prompt('Copy your challenge and send it to a friend:', clipboardText);
      setShareStatus('Challenge ready to copy.');
    }
  }

  return (
    <div className={bannerColour} role="status">
      {isGameWon ? bannerWinText : bannerLostText}
      <p className="challenge-copy">Challenge a friend without spoiling the word.</p>
      <div className="banner-actions">
        <button className="share-button" onClick={handleShare}>
          Share challenge
        </button>
        <button className="play-again-button" onClick={resetGame}>
          Play again
        </button>
      </div>
      <p className="share-status" aria-live="polite">{shareStatus}</p>
    </div>
  )
}

export default ResultsBanner;