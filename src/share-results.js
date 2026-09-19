import { NUM_OF_GUESSES_ALLOWED } from "./constants";
import { checkGuess } from "./game-helpers";

const STATUS_EMOJI = {
  correct: "🟩",
  misplaced: "🟨",
  incorrect: "⬛",
};

export function createShareGrid(guesses, answer) {
  return guesses
    .map((guess) =>
      checkGuess(guess, answer)
        .map(({ status }) => STATUS_EMOJI[status])
        .join("")
    )
    .join("\n");
}

export function createShareText({ guesses, answer, isGameWon }) {
  const score = isGameWon ? guesses.length : "X";
  const grid = createShareGrid(guesses, answer);

  return `Word Game ${score}/${NUM_OF_GUESSES_ALLOWED}\n\n${grid}\n\nCan you beat my result?`;
}
