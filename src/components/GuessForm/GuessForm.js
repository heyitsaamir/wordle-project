import React from 'react';

function GuessForm({ addToGuessList, disableForm = false}) {
  const [guess, setGuess] = React.useState("")
  const validateLength = /([A-Z]){5}/g

  function handleSubmit(event) {
    event.preventDefault()

    if (!guess.match(validateLength)) {
      return window.alert("Guess must have exactly 5 A-Z characters")
    }

    console.info({ guess });
    addToGuessList(guess)
    setGuess("")
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        required
        id="guess-input"
        type="text"
        value={guess}
        onChange={event => setGuess(event.target.value.toUpperCase())}
        maxLength={5}
        minLength={5}
        disabled={disableForm}
      />
    </form>
  );
}

export default GuessForm;
