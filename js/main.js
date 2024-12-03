// Game words array
const words = ['SPACE', 'ASTRONAUT', 'GALAXY', 'HOUSTON', 'NASA', 'METEOR', 'COSMOS', 'ORBIT'];

// Game state variables
let word = '';
let guessedLetters = [];
let remainingGuesses = 6;
let gameStatus = 'waiting'; // waiting, playing, won, lost

// DOM Elements
const startButton = document.getElementById('start-game');
const wordDisplay = document.getElementById('word');
const keyboardDiv = document.getElementById('keyboard');
const messageDisplay = document.getElementById('message');
const spacemanDiv = document.getElementById('spaceman');

// keyboard
function createKeyboard() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    keyboardDiv.innerHTML = letters
        .map(letter => `<button class="letter-btn" data-letter="${letter}">${letter}</button>`)
        .join('');
}

// Start game function
function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = 6;
    gameStatus = 'playing';
    
    // Reset Game
    updateDisplay();
    createKeyboard();
    startButton.textContent = 'RESTART GAME';
    messageDisplay.textContent = `Remaining Guesses: ${remainingGuesses}`;
    
    // Enable letter buttons//
    const letterButtons = document.querySelectorAll('.letter-btn');
    letterButtons.forEach(btn => {
        btn.disabled = false;
        btn.addEventListener('click', handleLetterClick);
    });
}

//  letter clicks
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

// Update word display
function updateDisplay() {
    wordDisplay.textContent = word
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

// Update spaceman emoji thingy things
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