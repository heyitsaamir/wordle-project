import { checkGuess } from './game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from './constants';

const STATUS_SYMBOLS = {
  correct: '🟩',
  misplaced: '🟨',
  incorrect: '⬛',
};

export function createShareText({ guessList, answer, isGameWon }) {
  const completedGuesses = guessList.filter(Boolean);
  const score = isGameWon
    ? `${completedGuesses.length}/${NUM_OF_GUESSES_ALLOWED}`
    : `X/${NUM_OF_GUESSES_ALLOWED}`;
  const grid = completedGuesses
    .map((guess) =>
      checkGuess(guess, answer)
        .map(({ status }) => STATUS_SYMBOLS[status])
        .join('')
    )
    .join('\n');

  return `Word Game ${score}\n\n${grid}\n\nCan you beat my score?`;
}
