import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { getKeyStatuses } from '../../game-helpers';

import GuessResults from '../GuessResults/GuessResults';
import ResultsBanner from '../ResultsBanner';
import OnScreenKeyboard from '../OnScreenKeyboard';

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS))
  const [guessList, setGuessList] = React.useState(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
  const [guessListIndex, setGuessListIndex] = React.useState(0)
  const [currentGuess, setCurrentGuess] = React.useState("")
  const [isGameWon, setIsGameWon] = React.useState(false)
  const [isGameLost, setIsGameLost] = React.useState(false)
  const [disableForm, setDisableForm] = React.useState(false)

  console.info({ answer });

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

    if (guess !== answer && guessListIndex + 1 === NUM_OF_GUESSES_ALLOWED) {
      setIsGameLost(true)
      setDisableForm(true)
    }
  }

  function handleKeyPress(letter) {
    if (disableForm) {
      return
    }
    setCurrentGuess((guess) => (guess.length < 5 ? guess + letter : guess))
  }

  function handleBackspace() {
    if (disableForm) {
      return
    }
    setCurrentGuess((guess) => guess.slice(0, -1))
  }

  function handleEnter() {
    if (disableForm) {
      return
    }
    if (currentGuess.length !== 5) {
      return window.alert("Guess must have exactly 5 A-Z characters")
    }
    addToGuessList(currentGuess)
  }

  React.useEffect(() => {
    function handlePhysicalKeydown(event) {
      if (disableForm) {
        return
      }

      if (event.key === 'Enter') {
        handleEnter()
      } else if (event.key === 'Backspace') {
        handleBackspace()
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handlePhysicalKeydown)
    return () => window.removeEventListener('keydown', handlePhysicalKeydown)
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

  const keyStatuses = getKeyStatuses(guessList, answer)

  return (
    <>
      {isGameWon || isGameLost ? <ResultsBanner isGameWon={isGameWon} answer={answer} guessListIndex={guessListIndex} resetGame={resetGame} /> : null}
      <GuessResults guessList={guessList} answer={answer} currentGuess={currentGuess} guessListIndex={guessListIndex} />
      <OnScreenKeyboard
        keyStatuses={keyStatuses}
        onKeyPress={handleKeyPress}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
        disabled={disableForm}
      />
    </>
  )
}

export default Game;
