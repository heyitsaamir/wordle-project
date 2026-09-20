import React from "react";
import { createShareText } from "../../share-results";

function ResultsBanner({
  isGameWon,
  answer,
  guessList,
  guessListIndex,
  resetGame,
}) {
  const [shareStatus, setShareStatus] = React.useState("");
  const bannerColour = isGameWon ? "happy banner" : "sad banner";
  const guessLabel = guessListIndex === 1 ? "guess" : "guesses";
  const bannerWinText = (
    <p>
      <strong>Congratulations!</strong> Got it in{" "}
      <strong>
        {guessListIndex} {guessLabel}
      </strong>
      .
    </p>
  );
  const bannerLostText = (
    <p>
      Sorry, the correct answer is <strong>{answer}</strong>.
    </p>
  );
  const shareText = createShareText(guessList, answer, isGameWon);

  async function copyChallenge(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const didCopy = document.execCommand("copy");
    textArea.remove();

    if (!didCopy) {
      throw new Error("Copy command was unavailable");
    }
  }

  async function handleShare() {
    const challengeUrl = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
      title: "Word Game challenge",
      text: shareText,
      url: challengeUrl,
    };

    setShareStatus("");

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

    try {
      await copyChallenge(`${shareText}\n${challengeUrl}`);
      setShareStatus("Result and challenge link copied!");
    } catch (error) {
      setShareStatus(
        "Sharing is unavailable. Select the result above to copy it manually."
      );
    }
  }

  return (
    <div className={bannerColour} role="dialog" aria-labelledby="result-title">
      <div className="result-banner-content">
        <div id="result-title">
          {isGameWon ? bannerWinText : bannerLostText}
        </div>
        <p className="result-prompt">
          Challenge a friend without giving away the answer.
        </p>
        <pre className="share-preview">{shareText}</pre>
        <div className="result-actions">
          <button
            className="result-action primary"
            type="button"
            onClick={handleShare}
          >
            Share challenge
          </button>
          <button
            className="result-action secondary"
            type="button"
            onClick={resetGame}
          >
            Play again
          </button>
        </div>
        <p className="share-status" aria-live="polite">
          {shareStatus}
        </p>
      </div>
    </div>
  );
}

export default ResultsBanner;
