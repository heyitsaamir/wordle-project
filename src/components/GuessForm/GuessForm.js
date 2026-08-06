import React from 'react';

function GuessForm({ addToGuessList, disableForm = false, guess, setGuess }) {
  const [internalGuess, setInternalGuess] = React.useState("")
  const isControlled = guess !== undefined && setGuess !== undefined
  const currentGuess = isControlled ? guess : internalGuess
  const updateGuess = isControlled ? setGuess : setInternalGuess
  const validateLength = /([A-Z]){5}/g

  function handleSubmit(event) {
    event.preventDefault()

    if (!currentGuess.match(validateLength)) {
      return window.alert("Guess must have exactly 5 A-Z characters")
    }

    console.info({ guess: currentGuess });
    addToGuessList(currentGuess)
    updateGuess("")
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        required
        id="guess-input"
        type="text"
        value={currentGuess}
        onChange={event => updateGuess(event.target.value.toUpperCase())}
        maxLength={5}
        minLength={5}
        disabled={disableForm}
      />
    </form>
  );
}

export default GuessForm;
