import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

import GuessForm from '../GuessForm'
import GuessResults from '../GuessResults/GuessResults';
import ResultsBanner from '../ResultsBanner';

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS))
  const [guessList, setGuessList] = React.useState(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
  const [guessListIndex, setGuessListIndex] = React.useState(0)
  const [isGameWon, setIsGameWon] = React.useState(false)
  const [isGameLost, setIsGameLost] = React.useState(false)
  const [disableForm, setDisableForm] = React.useState(false)

  function addToGuessList(guess) {
    const newGuessList = [...guessList]
    newGuessList[guessListIndex] = guess
    const nextGuessListIndex = guessListIndex + 1
    const didWin = guess === answer

    setGuessListIndex(nextGuessListIndex)
    setGuessList(newGuessList)

    if (didWin) {
      setIsGameWon(true)
      setDisableForm(true)
    } else if (nextGuessListIndex === NUM_OF_GUESSES_ALLOWED) {
      setIsGameLost(true)
      setDisableForm(true)
    }
  }

  function resetGame() {
    setGuessList(range(NUM_OF_GUESSES_ALLOWED).map(() => ""))
    setGuessListIndex(0)
    setIsGameWon(false)
    setIsGameLost(false)
    setDisableForm(false)
    setAnswer(sample(WORDS))
  }

  return (
    <>
      {isGameWon || isGameLost ? (
        <ResultsBanner
          isGameWon={isGameWon}
          answer={answer}
          guessList={guessList}
          guessListIndex={guessListIndex}
          resetGame={resetGame}
        />
      ) : null}
      <GuessResults guessList={guessList} answer={answer} />
      <GuessForm addToGuessList={addToGuessList} disableForm={disableForm} />
    </>
  )
}

export default Game;
