import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { getLetterStatuses } from '../../game-helpers';

import GuessResults from '../GuessResults/GuessResults';
import ResultsBanner from '../ResultsBanner';
import Keyboard from '../Keyboard';

// Demo-only helper used while comparing on-screen keyboard styles.
// Supports ?kb=classic|compact|hybrid so each option can be screenshotted
// from the same running app. Remove once a design is chosen.
function getVariantFromQuery() {
  if (typeof window === 'undefined') {
    return 'classic';
  }
  const params = new URLSearchParams(window.location.search);
  return params.get('kb') || 'classic';
}

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS))
  const [guessList, setGuessList] = React.useState(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
  const [guessListIndex, setGuessListIndex] = React.useState(0)
  const [currentGuess, setCurrentGuess] = React.useState("")
  const [isGameWon, setIsGameWon] = React.useState(false)
  const [isGameLost, setIsGameLost] = React.useState(false)
  const [disableForm, setDisableForm] = React.useState(false)
  const [variant] = React.useState(getVariantFromQuery)

  console.info({ answer });

  const letterStatuses = getLetterStatuses(guessList.slice(0, guessListIndex), answer)

  function addToGuessList(guess) {
    const newGuessList = [...guessList]
    newGuessList[guessListIndex] = guess
    setGuessListIndex(guessListIndex + 1)
    setGuessList(newGuessList)
    setCurrentGuess("")

    if (guess === answer) {
      setIsGameWon(true)
      setDisableForm(true)
    }

    if (!isGameWon && guessListIndex + 1 === NUM_OF_GUESSES_ALLOWED) {
      setIsGameLost(true)
      setDisableForm(true)
    }
  }

  function submitGuess(guess) {
    if (!guess.match(/^[A-Z]{5}$/)) {
      return window.alert("Guess must have exactly 5 A-Z characters")
    }
    addToGuessList(guess)
  }

  function handleKeyPress(letter) {
    if (disableForm || currentGuess.length >= 5) {
      return;
    }
    setCurrentGuess(currentGuess + letter)
  }

  function handleBackspace() {
    if (disableForm) {
      return;
    }
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  function handleEnter() {
    if (disableForm) {
      return;
    }
    submitGuess(currentGuess)
  }

  // Support a physical keyboard too, for the variants that hide the
  // text input in favor of the on-screen keyboard.
  React.useEffect(() => {
    if (variant === 'hybrid' || disableForm) {
      return;
    }

    function onKeyDown(event) {
      if (event.key === 'Enter') {
        handleEnter();
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  })

  function resetGame() {
    setGuessListIndex(0)
    setGuessList(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
    setCurrentGuess("")
    setIsGameWon(false)
    setIsGameLost(false)
    setDisableForm(false)
    setAnswer(sample(WORDS))
  }

  return (
    <>
      {isGameWon || isGameLost ? <ResultsBanner isGameWon={isGameWon} answer={answer} guessListIndex={guessListIndex} resetGame={resetGame} /> : null}
      <GuessResults guessList={guessList} answer={answer} currentGuess={currentGuess} activeIndex={disableForm ? -1 : guessListIndex} />
      {variant === 'hybrid' ? (
        <form
          className="guess-input-wrapper"
          onSubmit={(event) => {
            event.preventDefault();
            handleEnter();
          }}
        >
          <label htmlFor="guess-input">Enter guess:</label>
          <input
            required
            id="guess-input"
            type="text"
            value={currentGuess}
            onChange={(event) => setCurrentGuess(event.target.value.toUpperCase().slice(0, 5))}
            maxLength={5}
            minLength={5}
            disabled={disableForm}
          />
        </form>
      ) : null}
      <Keyboard
        variant={variant}
        letterStatuses={letterStatuses}
        disabled={disableForm}
        onKeyPress={handleKeyPress}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />
    </>
  )
}

export default Game;
