import { NUM_OF_GUESSES_ALLOWED } from "./constants";
import { checkGuess } from "./game-helpers";

const RESULT_SYMBOLS = {
  correct: "🟩",
  misplaced: "🟨",
  incorrect: "⬛",
};

export function createResultRows(guessList, answer) {
  return guessList.filter(Boolean).map((guess) =>
    checkGuess(guess, answer)
      .map(({ status }) => RESULT_SYMBOLS[status])
      .join("")
  );
}

export function createShareText(guessList, answer, isGameWon) {
  const completedGuesses = guessList.filter(Boolean);
  const result = isGameWon ? "Solved" : "Not solved";
  const rows = createResultRows(completedGuesses, answer);

  return [
    `Word Game - ${result}`,
    `Attempts: ${completedGuesses.length}/${NUM_OF_GUESSES_ALLOWED}`,
    "",
    ...rows,
    "",
    "Can you beat my score?",
  ].join("\n");
}
