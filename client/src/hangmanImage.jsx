import React from 'react';
import hangmanImage1 from './assets/hangman_image_1.png';
import hangmanImage2 from './assets/hangman_image_2.png';
import hangmanImage3 from './assets/hangman_image_3.png';
import hangmanImage4 from './assets/hangman_image_4.png';
import hangmanImage5 from './assets/hangman_image_5.png';
import hangmanImage6 from './assets/hangman_image_6.png';
import hangmanImage7 from './assets/hangman_image_7.png';

function HangmanImages({ incorrectGuessesRemaining }) {
  
  const hangmanImages = [
    hangmanImage1,
    hangmanImage2,
    hangmanImage3,
    hangmanImage4,
    hangmanImage5,
    hangmanImage6,
    hangmanImage7
  ];

  
  const imageIndex = hangmanImages.length - incorrectGuessesRemaining - 1;

  // If the number of incorrect guesses remaining exceeds the number of available images, display the final stage
  const imageUrl = imageIndex < hangmanImages.length ? hangmanImages[imageIndex] : hangmanImages[hangmanImages.length - 1];

  return (
    <div className="hangman-images">
      <img src={imageUrl} alt={`Hangman_Image_${imageIndex + 1}`} />
    </div>
  );
}

export default HangmanImages;
