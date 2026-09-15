import React from 'react';
import { useTheme } from '../../theme-context';

const BANNER_SPARKLE_LAYOUT = [
  { symbol: '✨', left: '6%', top: '15%', delay: '0s' },
  { symbol: '⭐', left: '92%', top: '20%', delay: '0.2s' },
  { symbol: '🌙', left: '14%', top: '78%', delay: '0.4s' },
  { symbol: '✨', left: '88%', top: '75%', delay: '0.6s' },
  { symbol: '⭐', left: '50%', top: '8%', delay: '0.8s' },
];

function ResultsBanner({ isGameWon, answer, guessListIndex, resetGame }) {
  const { theme } = useTheme();
  const isEid = theme === 'eid';
  const isEidCelebration = isEid && isGameWon;
  const bannerColour = isGameWon ? (isEid ? "happy eid banner" : "happy banner") : "sad banner"
  const bannerWinText = (
    <p>
      {isEid && <strong>Eid Mubarak! 🌙✨ </strong>}
      <strong>Congratulations!</strong> Got it in <strong>{guessListIndex} guesses</strong>.
    </p>
  )
  const bannerLostText = <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
  return (
    <div className={bannerColour}>
      {isEidCelebration && (
        <div className="eid-banner-sparkles" aria-hidden="true">
          {BANNER_SPARKLE_LAYOUT.map(({ symbol, left, top, delay }, index) => (
            <span
              key={index}
              className="eid-banner-sparkle"
              style={{ left, top, animationDelay: delay }}
            >
              {symbol}
            </span>
          ))}
        </div>
      )}
      {isGameWon ? bannerWinText : bannerLostText}
      <button onClick={resetGame}>Play again</button>
    </div>
  )
}

export default ResultsBanner;