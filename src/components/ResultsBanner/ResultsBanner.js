import React from "react";

import { checkGuess } from "../../game-helpers";
import { createShareText } from "../../share-results";

function ResultsBanner({ isGameWon, answer, guesses, resetGame }) {
  const [shareStatus, setShareStatus] = React.useState("");
  const resultRows = guesses.map((guess) => checkGuess(guess, answer));
  const attemptLabel = `${guesses.length} ${
    guesses.length === 1 ? "guess" : "guesses"
  }`;

  async function handleShare() {
    setShareStatus("");

    const text = createShareText({ guesses, answer, isGameWon });
    const url = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
      title: "Word Game result",
      text,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareStatus("Result shared!");
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareStatus("Result copied. Send it to a friend!");
    } catch (error) {
      setShareStatus("Sharing is unavailable in this browser.");
    }
  }

  return (
    <div
      className={`${isGameWon ? "happy" : "sad"} banner result-banner`}
      aria-labelledby="result-heading"
    >
      <div>
        <h2 id="result-heading">{isGameWon ? "Nice work!" : "Good try!"}</h2>
        <p>
          {isGameWon ? "Solved in " : "You used all "}
          <strong>{attemptLabel}</strong>.
        </p>
      </div>

      <div className="result-grid" aria-label="Your guess result">
        {resultRows.map((row, rowIndex) => (
          <div
            className="result-row"
            key={rowIndex}
            aria-label={`Guess ${rowIndex + 1}: ${row
              .map(({ status }) => status)
              .join(", ")}`}
          >
            {row.map(({ status }, cellIndex) => (
              <span
                className={`result-cell ${status}`}
                key={cellIndex}
                aria-hidden="true"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="result-actions">
        <button className="share-button" onClick={handleShare}>
          Share result
        </button>
        <button className="play-again-button" onClick={resetGame}>
          Play again
        </button>
      </div>

      <p className="share-feedback" aria-live="polite">
        {shareStatus}
      </p>
    </div>
  );
}

export default ResultsBanner;
