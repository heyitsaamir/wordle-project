import React from 'react';

function ResultsBanner({ isGameWon, answer, guessListIndex, resetGame }) {
  const bannerColour = isGameWon ? "happy banner" : "sad banner"
  const bannerWinText = <p><strong>Congratulations!</strong> Got it in <strong>{guessListIndex} guesses</strong>.</p>
  const bannerLostText = <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
  return (
    <div className={bannerColour}>
      {isGameWon ? bannerWinText : bannerLostText}
      <button onClick={resetGame}>Play again</button>
    </div>
  )
}

export default ResultsBanner;