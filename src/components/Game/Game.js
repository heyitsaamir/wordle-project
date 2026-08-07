import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { getLetterStatuses } from '../../game-helpers';

import GuessForm from '../GuessForm'
import GuessResults from '../GuessResults/GuessResults';
import ResultsBanner from '../ResultsBanner';
import Keyboard from '../Keyboard';

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS))
  const [guessList, setGuessList] = React.useState(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
  const [guessListIndex, setGuessListIndex] = React.useState(0)
  const [isGameWon, setIsGameWon] = React.useState(false)
  const [isGameLost, setIsGameLost] = React.useState(false)
  const [disableForm, setDisableForm] = React.useState(false)
  const [guess, setGuess] = React.useState("")

  console.info({ answer });

  const letterStatuses = getLetterStatuses(guessList, answer)

  function addToGuessList(guess) {
    const newGuessList = [...guessList]
    newGuessList[guessListIndex] = guess
    setGuessListIndex(guessListIndex + 1)
    setGuessList(newGuessList)

    if (guess === answer) {
      setIsGameWon(true)
      setDisableForm(true)
    }

    if (!isGameWon && guessListIndex + 1 === NUM_OF_GUESSES_ALLOWED) {
      setIsGameLost(true)
      setDisableForm(true)
    }
  }

  function resetGame() {
    setGuessListIndex(0)
    setGuessList(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
    setIsGameWon(false)
    setIsGameLost(false)
    setDisableForm(false)
    setAnswer(sample(WORDS))
    setGuess("")
  }

  function handleKeyPress(key) {
    if (disableForm) {
      return
    }

    if (key === 'ENTER') {
      if (guess.length !== 5) {
        return window.alert("Guess must have exactly 5 A-Z characters")
      }
      addToGuessList(guess)
      setGuess("")
      return
    }

    if (key === 'DELETE') {
      setGuess(guess.slice(0, -1))
      return
    }

    if (guess.length < 5) {
      setGuess(guess + key)
    }
  }

  return (
    <>
      {isGameWon || isGameLost ? <ResultsBanner isGameWon={isGameWon} answer={answer} guessListIndex={guessListIndex} resetGame={resetGame} /> : null}
      <GuessResults guessList={guessList} answer={answer} />
      <GuessForm addToGuessList={addToGuessList} disableForm={disableForm} guess={guess} setGuess={setGuess} />
      <Keyboard letterStatuses={letterStatuses} onKeyPress={handleKeyPress} disabled={disableForm} />
    </>
  )
}

export default Game;
