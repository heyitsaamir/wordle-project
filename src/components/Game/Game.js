import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

import GuessForm from '../GuessForm'
import GuessResults from '../GuessResults/GuessResults';
import ResultsBanner from '../ResultsBanner';
import OnScreenKeyboard from '../OnScreenKeyboard';

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS))
  const [guessList, setGuessList] = React.useState(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
  const [guessListIndex, setGuessListIndex] = React.useState(0)
  const [guess, setGuess] = React.useState("")
  const [isGameWon, setIsGameWon] = React.useState(false)
  const [isGameLost, setIsGameLost] = React.useState(false)
  const [disableForm, setDisableForm] = React.useState(false)

  console.info({ answer });

  const validateLength = /([A-Z]){5}/g

  function addToGuessList(newGuess) {
    const newGuessList = [...guessList]
    newGuessList[guessListIndex] = newGuess
    setGuessListIndex(guessListIndex + 1)
    setGuessList(newGuessList)

    if (newGuess === answer) {
      setIsGameWon(true)
      setDisableForm(true)
    }

    if (!isGameWon && guessListIndex + 1 === NUM_OF_GUESSES_ALLOWED) {
      setIsGameLost(true)
      setDisableForm(true)
    }
  }

  function submitGuess() {
    if (!guess.match(validateLength)) {
      return window.alert("Guess must have exactly 5 A-Z characters")
    }

    console.info({ guess });
    addToGuessList(guess)
    setGuess("")
  }

  function handleKeyPress(key) {
    if (disableForm) {
      return;
    }

    if (key === 'ENTER') {
      return submitGuess()
    }

    if (key === 'DEL') {
      return setGuess(guess.slice(0, -1))
    }

    if (guess.length < 5) {
      setGuess(guess + key)
    }
  }

  function resetGame() {
    setGuessListIndex(0)
    setGuessList(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
    setGuess("")
    setIsGameWon(false)
    setIsGameLost(false)
    setDisableForm(false)
    setAnswer(sample(WORDS))
  }

  return (
    <>
      {isGameWon || isGameLost ? <ResultsBanner isGameWon={isGameWon} answer={answer} guessListIndex={guessListIndex} resetGame={resetGame} /> : null}
      <GuessResults guessList={guessList} answer={answer} />
      <GuessForm onSubmit={submitGuess} disableForm={disableForm} guess={guess} setGuess={setGuess} />
      <OnScreenKeyboard guessList={guessList} answer={answer} onKeyPress={handleKeyPress} disabled={disableForm} />
    </>
  )
}

export default Game;
