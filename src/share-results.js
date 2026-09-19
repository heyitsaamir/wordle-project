import { NUM_OF_GUESSES_ALLOWED } from "./constants";
import { checkGuess } from "./game-helpers";

const STATUS_EMOJI = {
  correct: "🟩",
  misplaced: "🟨",
  incorrect: "⬛",
};

export function createShareText({ guessList, answer }) {
  const completedGuesses = guessList.filter(Boolean);
  const grid = completedGuesses
    .map((guess) =>
      checkGuess(guess, answer)
        .map(({ status }) => STATUS_EMOJI[status])
        .join("")
    )
    .join("\n");

  return [
    `Word Game ${completedGuesses.length}/${NUM_OF_GUESSES_ALLOWED}`,
    "Can you beat my score?",
    "",
    grid,
  ].join("\n");
}
