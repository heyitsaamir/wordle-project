import React from "react";

import { checkGuess } from "../../game-helpers";
import { createShareText } from "../../share-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function ResultsBanner({
  isGameWon,
  answer,
  guessList,
  guessListIndex,
  resetGame,
}) {
  const [shareStatus, setShareStatus] = React.useState("");
  const completedGuesses = guessList.filter(Boolean);
  const attemptLabel = isGameWon
    ? `${guessListIndex}/${NUM_OF_GUESSES_ALLOWED}`
    : `X/${NUM_OF_GUESSES_ALLOWED}`;

  async function handleShare() {
    const text = createShareText({ guessList, answer, isGameWon });
    const shareData = {
      title: "Word Game challenge",
      text,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareStatus("Challenge shared!");
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
      }
    }

    const clipboardText = `${text}\n${window.location.href}`;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(clipboardText);
        setShareStatus("Copied! Send it to a friend.");
        return;
      } catch (error) {
        console.error("Unable to copy result to the clipboard.", error);
      }
    }

    window.prompt(
      "Copy your challenge and send it to a friend:",
      clipboardText
    );
    setShareStatus("Your challenge is ready to copy.");
  }

  return (
    <div className="result-overlay">
      <section
        className={`result-card ${isGameWon ? "won" : "lost"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
      >
        <div className="result-accent" />
        <div className="result-content">
          <div className="result-icon" aria-hidden="true">
            {isGameWon ? "✓" : "↗"}
          </div>
          <p className="result-eyebrow">Puzzle complete</p>
          <h2 id="result-title">{isGameWon ? "Nice work!" : "Good try!"}</h2>
          <p className="result-summary">
            {isGameWon ? (
              <>
                Solved in{" "}
                <strong>
                  {guessListIndex} of {NUM_OF_GUESSES_ALLOWED} attempts
                </strong>
                .
              </>
            ) : (
              <>
                You used all <strong>{NUM_OF_GUESSES_ALLOWED} attempts</strong>.
              </>
            )}
          </p>

          <div className="share-preview">
            <div className="share-preview-heading">
              <span>Your result</span>
              <strong>{attemptLabel}</strong>
            </div>
            <div
              className="share-grid"
              aria-label={`Spoiler-free result with ${completedGuesses.length} attempts`}
            >
              {completedGuesses.map((guess, rowIndex) => (
                <div className="share-row" key={rowIndex} aria-hidden="true">
                  {checkGuess(guess, answer).map(({ status }, cellIndex) => (
                    <span className={`share-tile ${status}`} key={cellIndex} />
                  ))}
                </div>
              ))}
            </div>
            <p className="spoiler-note">
              <span aria-hidden="true">🔒</span>
              The answer stays hidden
            </p>
          </div>

          <div className="result-actions">
            <button className="share-button" onClick={handleShare}>
              Challenge a friend
            </button>
            <button className="play-again-button" onClick={resetGame}>
              Play again
            </button>
          </div>
          <p className="share-status" role="status" aria-live="polite">
            {shareStatus}
          </p>
        </div>
      </section>
    </div>
  );
}

export default ResultsBanner;
