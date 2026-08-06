import React from 'react';

function GuessForm({ onSubmit, disableForm = false, guess, setGuess }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
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
