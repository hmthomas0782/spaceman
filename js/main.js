/// Game words array categories and clues
const words = [
  { word: 'SPACE', category: 'Astronomy', clue: 'The final frontier' },
  { word: 'ASTRONAUT', category: 'Profession', clue: 'Trained for space travel' },
  { word: 'GALAXY', category: 'Astronomy', clue: 'A system of billions of stars' },
  { word: 'HOUSTON', category: 'Place', clue: 'Famous space city' },
  { word: 'NASA', category: 'Organization', clue: 'Space agency in the U.S.' },
  { word: 'METEOR', category: 'Astronomy', clue: 'A shooting star' },
  { word: 'COSMOS', category: 'Astronomy', clue: 'The universe seen as a whole' },
  { word: 'ORBIT', category: 'Astronomy', clue: 'A path around a celestial body' }
];

// Game state variables
let word = '';
let guessedLetters = [];
let remainingGuesses = 6;
let gameStatus = 'waiting'; // waiting, playing, won, lost
let currentClue = '';
let currentCategory = '';

const audioElements = {
  takeoff: new Audio('../Assets/Assets-Music-FX/rocket-launch-sfx-253937.mp3'),
  gameOver: new Audio('../Assets/Assets-Music-FX/astronaut-says-game-over-73039.mp3'),
  winner: new Audio('../Assets/Assets-Music-FX/ufo-take-off-31823.mp3'),
  background: new Audio('../Assets/Assets-Music-FX/retro-gaming-271301.mp3')
};
audioElements.takeoff.preload="auto"
audioElements.gameOver.preload="auto"
audioElements.winner.preload="auto"
audioElements.background.preload="auto"


// DOM Elements
const startButton = document.getElementById('start-game');
const wordDisplay = document.getElementById('word');
const keyboardDiv = document.getElementById('keyboard');
const messageDisplay = document.getElementById('message');
const spacemanDiv = document.getElementById('spaceman');
const clueDisplay = document.getElementById('clue');
const categoryDisplay = document.getElementById('category');
const backgroundmusicaudio=document.getElementById('backgroundMusic')


// Keyboard
function createKeyboard() {
  keyboardDiv.innerHTML = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letters.forEach(letter => {
      const button = document.createElement('button');
      button.className = 'letter-btn';
      button.dataset.letter = letter;
      button.textContent = letter;
      button.addEventListener('click', handleLetterClick);
      keyboardDiv.appendChild(button);
  });
}

// Start Game
function startGame() {
 takeoff.play()
  const randomEntry = words[Math.floor(Math.random() * words.length)];
  word = randomEntry.word;
  currentClue = randomEntry.clue;
  currentCategory = randomEntry.category;
  guessedLetters = [];
  remainingGuesses = 6;
  gameStatus = 'playing';

  updateDisplay();
  createKeyboard();
  startButton.textContent = 'RESTART GAME';
  messageDisplay.textContent = `Remaining Guesses: ${remainingGuesses}`;
  clueDisplay.textContent = `Clue: ${currentClue}`;
  categoryDisplay.textContent = `Category: ${currentCategory}`;
}

// Handle Letter Click
function handleLetterClick(event) {
  if (gameStatus !== 'playing') return;

  const letter = event.target.dataset.letter;
  event.target.disabled = true;

  if (!word.includes(letter)) {
      remainingGuesses--;
      updateSpaceman();
  }

  guessedLetters.push(letter);
  updateDisplay();
  checkGameStatus();
}

// Update Word Display
function updateDisplay() {
  wordDisplay.textContent = word
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
}

// Update Spaceman
function updateSpaceman() {
  const stages = [
      '🧑‍🚀',
      '👨‍🚀',
      '👨‍🚀💫',
      '👨‍🚀💫✨',
      '👨‍🚀💫✨🌠',
      '👨‍🚀💫✨🌠☄️',
      '💥'
  ];
  spacemanDiv.textContent = stages[6 - remainingGuesses];
}

// Check Game Status
function checkGameStatus() {
  const wordArray = word.split('');
  const isWon = wordArray.every(letter => guessedLetters.includes(letter));

  if (isWon) {
      gameStatus = 'won';
      messageDisplay.textContent = 'Houston, We Have Lift OFF!! 🚀';
      audioElements.winner.play()
  } else if (remainingGuesses === 0) {
      gameStatus = 'lost';
      messageDisplay.textContent = `Houston, We Have A Problem! The word was ${word}`;
      audioElements.gameOver.play()
  } else {
      messageDisplay.textContent = `Remaining Guesses: ${remainingGuesses}`;
  }
}

// FX and Music



document.getElementById('toggleMusic').addEventListener('click', () => {
  if (backgroundmusicaudio.paused) {
    backgroundmusicaudio.play();
  } else {
    backgroundmusicaudio.pause();
  }
});

document.getElementById('volumeControl').addEventListener('input', (e) => {
  const volume = e.target.value;
  for (let audio in audioElements) {
      audioElements[audio].volume = volume;
  }
});

document.getElementById('start-game').addEventListener('click', function() {
  const board = document.getElementById('keyboard');

  // Add the shake class
  board.classList.add('board-shake');

  // Remove the shake class 
  setTimeout(() => {
      board.classList.remove('board-shake');
  }, 500); // Match duration of the shake animation
});


// Event Listeners
startButton.addEventListener('click', startGame);
