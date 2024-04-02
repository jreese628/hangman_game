import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import HangmanImages from './hangmanImage';

function App() {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuessesRemaining, setIncorrectGuessesRemaining] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState('');

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/start_game");
      console.log("response:", response.data);

      const initialWord = response.data.word;
      setWord(initialWord);
      setHint(response.data.hint);
      
      setDisplayWord(initialWord.replace(/\w/g, '_'));
      setCorrectGuesses([]);
      setIncorrectGuessesRemaining(6);
      setGameOver(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleGuess = () => {
    if (!gameOver && guess.length === 1 && guess.match(/[a-zA-Z]/)) {
      const newCorrectGuesses = [...correctGuesses, guess.toLowerCase()];
      setGuess('');
      setCorrectGuesses(newCorrectGuesses);
      updateDisplayWord(newCorrectGuesses);
    }
  };

  const updateDisplayWord = (correctGuesses) => {
    const updatedDisplayWord = word
      .split('')
      .map((letter) => (correctGuesses.includes(letter.toLowerCase()) ? letter : '_'))
      .join('');
    setDisplayWord(updatedDisplayWord);

    if (updatedDisplayWord === word) {
      setGameOver(true);
    } else if (!word.toLowerCase().includes(guess.toLowerCase())) {
      setIncorrectGuessesRemaining((prev) => prev - 1);
      if (incorrectGuessesRemaining === 1) {
        setGameOver(true);
      }
    }
  };

  const handleRestart = () => {
    fetchAPI();
  };

  return (
    <div className="App">
      <h1>Hangman</h1>
      <p>Hint: {hint}</p>
      <p>Word: {displayWord}</p>
      <HangmanImages incorrectGuessesRemaining={incorrectGuessesRemaining} />
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.slice(0, 1))}
        maxLength={1}
      />
      <button onClick={handleGuess}>Guess</button>
      <button onClick={handleRestart}>Play Again</button>
      {gameOver && <p>{displayWord === word ? 'You Win!' : 'Game Over'}</p>}
    </div>
  );
}

export default App;
