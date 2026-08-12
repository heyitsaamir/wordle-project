# Wordle

A React remake of the popular Wordle word-guessing game. Guess the secret 5-letter word within 6 tries — after each guess, tiles reveal whether letters are correct, present, or absent from the answer.

## Features

- Classic Wordle gameplay with 6 guesses per round
- Instant feedback on each letter (correct / present / absent)
- Win/lose banner with the option to reset and play again
- Built with React and a lightweight custom component set

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

This starts a local dev server via [Parcel](https://parceljs.org/) (see `public/index.html`).

### Build for production

```bash
npm run build
```

The production build is output to the `dist` folder.

## Project Structure

```
public/            Static HTML entry point and assets
src/
  components/       React components (Game, GuessForm, GuessResults, GuessCells, Header, ResultsBanner, App)
  constants.js       Game configuration (e.g. number of guesses allowed)
  data.js            Word list used for answers/guesses
  game-helpers.js     Core game logic helpers
  utils.js            Generic utility functions
  index.js            App entry point
docs/               Reference images/gifs for the project
```

## License

See [LICENSE.md](LICENSE.md) for details.
