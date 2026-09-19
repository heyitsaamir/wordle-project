import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import GuessForm from "../GuessForm";
import GuessResults from "../GuessResults/GuessResults";
import ResultsBanner from "../ResultsBanner";

function createEmptyGuessList() {
  return range(NUM_OF_GUESSES_ALLOWED).map(() => "");
}

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [guessList, setGuessList] = React.useState(createEmptyGuessList);
  const [guessListIndex, setGuessListIndex] = React.useState(0);
  const [isGameWon, setIsGameWon] = React.useState(false);
  const [isGameLost, setIsGameLost] = React.useState(false);
  const [disableForm, setDisableForm] = React.useState(false);

  console.info({ answer });

  function addToGuessList(guess) {
    const newGuessList = [...guessList];
    newGuessList[guessListIndex] = guess;
    setGuessListIndex(guessListIndex + 1);
    setGuessList(newGuessList);

    if (guess === answer) {
      setIsGameWon(true);
      setDisableForm(true);
    } else if (guessListIndex + 1 === NUM_OF_GUESSES_ALLOWED) {
      setIsGameLost(true);
      setDisableForm(true);
    }
  }

  function resetGame() {
    setGuessList(createEmptyGuessList());
    setGuessListIndex(0);
    setIsGameWon(false);
    setIsGameLost(false);
    setDisableForm(false);
    setAnswer(sample(WORDS));
  }

  const completedGuesses = guessList.slice(0, guessListIndex);

  return (
    <>
      {isGameWon || isGameLost ? (
        <ResultsBanner
          isGameWon={isGameWon}
          answer={answer}
          guesses={completedGuesses}
          resetGame={resetGame}
        />
      ) : null}
      <GuessResults guessList={guessList} answer={answer} />
      <GuessForm addToGuessList={addToGuessList} disableForm={disableForm} />
    </>
  );
}

export default Game;
