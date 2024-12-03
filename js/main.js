// Game words array with categories and clues
const words = [
  { word: 'SPACE', category: 'Astronomy', clue: 'The final frontier' },
  { word: 'ASTRONAUT', category: 'Profession', clue: 'Trained for space travel' },
  { word: 'GALAXY', category: 'Astronomy', clue: 'A system of billions of stars' },
  { word: 'HOUSTON', category: 'Place', clue: 'Famous space city' },
  { word: 'NASA', category: 'Organization', clue: 'Space agency in the U.S.' },
  { word: 'METEOR', category: 'Astronomy', clue: 'A shooting star' },
  { word: 'COSMOS', category: 'Astronomy', clue: 'The universe seen as a whole' },
  { word: 'ORBIT', category: 'Astronomy', clue: 'A path around a celestial body' },
];

// Game state variables
let word = '';
let guessedLetters = [];
let remainingGuesses = 6;
let gameStatus = 'waiting'; // waiting, playing, won, lost
let currentClue = '';
let currentCategory = '';

// DOM Elements
const startButton = document.getElementById('start-game');
const wordDisplay = document.getElementById('word');
const keyboardDiv = document.getElementById('keyboard');
const messageDisplay = document.getElementById('message');
const spacemanDiv = document.getElementById('spaceman');
const clueDisplay = document.getElementById('clue');
const categoryDisplay = document.getElementById('category');

// Keyboard
function createKeyboard() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  keyboardDiv.innerHTML = letters
      .map(letter => `<button class="letter-btn" data-letter="${letter}">${letter}</button>`)
      .join('');

  const letterButtons = document.querySelectorAll('.letter-btn');
  letterButtons.forEach(btn => {
      btn.addEventListener('click', handleLetterClick);
      btn.disabled = false; // Reset button state
  });
}

// Start game function
function startGame() {
  const randomEntry = words[Math.floor(Math.random() * words.length)];
  word = randomEntry.word;
  currentClue = randomEntry.clue;
  currentCategory = randomEntry.category;
  guessedLetters = [];
  remainingGuesses = 6;
  gameStatus = 'playing';

  // Reset Game
  updateDisplay();
  createKeyboard();
  startButton.textContent = 'RESTART GAME';
  messageDisplay.textContent = `Remaining Guesses: ${remainingGuesses}`;
  clueDisplay.textContent = `Clue: ${currentClue}`;
  categoryDisplay.textContent = `Category: ${currentCategory}`;
}

// Letter clicks
function handleLetterClick(event) {
  if (gameStatus !== 'playing') return;

  const letter = event.target.dataset.letter;
  event.target.disabled = true; // Disable button after use

  if (!word.includes(letter)) {
      remainingGuesses--;
      updateSpaceman();
  }

  guessedLetters.push(letter);
  updateDisplay();
  checkGameStatus();
}

// Update word display
function updateDisplay() {
  wordDisplay.textContent = word
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
}

// Update spaceman display
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

// Check game status
function checkGameStatus() {
  const wordArray = word.split('');
  const isWon = wordArray.every(letter => guessedLetters.includes(letter));

  if (isWon) {
      gameStatus = 'won';
      messageDisplay.textContent = 'Houston, We Have Lift OFF!! 🚀';
  } else if (remainingGuesses === 0) {
      gameStatus = 'lost';
      messageDisplay.textContent = `Houston, We Have A Problem! The word was ${word}`;
  } else {
      messageDisplay.textContent = `Remaining Guesses: ${remainingGuesses}`;
  }
}

// Event listeners
startButton.addEventListener('click', startGame);

// Initial setup
createKeyboard();
