/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */

export function checkGuess(guess, answer) {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = '✓';

  if (!guess) {
    return null;
  }

  const guessChars = guess.toUpperCase().split('');
  const answerChars = answer.split('');

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: 'correct',
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = 'incorrect';
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = 'misplaced';
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

/**
 * Computes the best-known status for every letter that has been guessed
 * so far, so an on-screen keyboard can be colored accordingly.
 * Priority: correct > misplaced > incorrect.
 */
export function getLetterStatuses(guessList, answer) {
  const priority = { correct: 3, misplaced: 2, incorrect: 1 };
  const statuses = {};

  guessList.forEach((guess) => {
    const result = checkGuess(guess, answer);
    if (!result) {
      return;
    }
    result.forEach(({ letter, status }) => {
      const current = statuses[letter];
      if (!current || priority[status] > priority[current]) {
        statuses[letter] = status;
      }
    });
  });

  return statuses;
}
