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
  const bannerWinText = (
    <p>
      <strong>Congratulations!</strong> Got it in{" "}
      <strong>
        {guessListIndex} {guessListIndex === 1 ? "guess" : "guesses"}
      </strong>
      .
    </p>
  );
  const bannerLostText = (
    <p>
      Sorry, the correct answer is <strong>{answer}</strong>.
    </p>
  );

  async function copyResult(shareText, shareUrl) {
    const resultWithUrl = `${shareText}\n\n${shareUrl}`;

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(resultWithUrl);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = resultWithUrl;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const didCopy = document.execCommand("copy");
    textArea.remove();

    if (!didCopy) {
      throw new Error("The browser did not copy the result.");
    }
  }

  async function handleShare() {
    const shareText = createShareText({ guessList, answer });
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
      title: "Word Game challenge",
      text: shareText,
      url: shareUrl,
    };

    setShareStatus("");

    if (
      navigator.share &&
      (!navigator.canShare || navigator.canShare(shareData))
    ) {
      try {
        await navigator.share(shareData);
        setShareStatus("Challenge shared!");
      } catch (error) {
        if (error.name !== "AbortError") {
          setShareStatus("Sharing failed. Please try again.");
        }
      }
      return;
    }

    try {
      await copyResult(shareText, shareUrl);
      setShareStatus("Result copied! Send it to a friend.");
    } catch {
      setShareStatus("Copying failed. Please try again.");
    }
  }

  return (
    <div className={bannerColour}>
      {isGameWon ? bannerWinText : bannerLostText}
      <p className="challenge-copy">
        Challenge a friend without revealing the answer.
      </p>
      <div className="result-actions">
        <button className="share-button" onClick={handleShare}>
          Share challenge
        </button>
        <button className="play-again-button" onClick={resetGame}>
          Play again
        </button>
      </div>
      <p className="share-status" role="status" aria-live="polite">
        {shareStatus}
      </p>
    </div>
  );
}

export default ResultsBanner;
