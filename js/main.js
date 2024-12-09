// DOM Elements
const startButton = document.getElementById('start-game');
const wordDisplay = document.getElementById('word');
const messageDisplay = document.getElementById('message');
const keyboard = document.getElementById('keyboard');
const categoryDisplay = document.getElementById('category');
const clueDisplay = document.getElementById('clue');
const volumeControl = document.getElementById('volumeControl');
const toggleMusicButton = document.getElementById('toggleMusic');
const backgroundMusic = document.getElementById('backgroundMusic');
const takeoffSound = document.getElementById('takeoffSound');
const gameOverSound = document.getElementById('gameOverSound');
const winnerSound = document.getElementById('winnerSound');
const restartButton = document.getElementById('restart-game'); // Restart button for the game

let selectedWord = '';
let guessedWord = [];
let remainingGuesses = 6;
let category = '';
let clue = '';
let gameRunning = false;

// Game Word Pool
const words = [
    { word: 'HOUSTON', category: 'Astronomy', clue: 'Home of NASA.' },
    { word: 'ASTEROID', category: 'Space Objects', clue: 'A small rocky body orbiting the Sun.' },
    { word: 'ORBIT', category: 'Space Motion', clue: 'The path of an object around a star or planet.' },
    { word: 'GALAXY', category: 'Astronomy', clue: 'A massive system of stars, planets, and dust.' },
    { word: 'COSMOS', category: 'General', clue: 'The universe as a whole.' },
];

// Utility Functions
function generateKeyboard() {
    keyboard.innerHTML = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach((letter) => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-btn');
        button.addEventListener('click', () => handleLetterClick(letter, button));
        keyboard.appendChild(button);
    });
}

function handleLetterClick(letter, button) {
    button.disabled = true;
    if (selectedWord.includes(letter)) {
        updateGuessedWord(letter);
    } else {
        wrongGuess(letter); // Pass letter for wrong guesses
    }
    checkGameStatus();
}

function updateGuessedWord(letter) {
    selectedWord.split('').forEach((char, index) => {
        if (char === letter) {
            guessedWord[index] = letter;
        }
    });
    wordDisplay.textContent = guessedWord.join(' ');
}

function wrongGuess(letter) {
    remainingGuesses -= 1;
    const spaceman = document.getElementById('spaceman');
    const icebox = document.getElementById('spaceman-icebox'); // Show icebox emoji for wrong answers
    spaceman.classList.add('board-shake');
    setTimeout(() => spaceman.classList.remove('board-shake'), 500);
}

function checkGameStatus() {
    if (!guessedWord.includes('_')) {
        messageDisplay.textContent = 'HOUSTON, WE HAVE LIFTOFF!';
        gameRunning = false;
        winnerSound.play();
        disableKeyboard();
    } else if (remainingGuesses <= 0) {
        messageDisplay.textContent = 'HOUSTON, WE HAVE A PROBLEM!';
        wordDisplay.textContent = selectedWord;
        gameRunning = false;
        disableKeyboard();
    }
}

function disableKeyboard() {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach((button) => (button.disabled = true));
}

function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWordObj = words[randomIndex];
    selectedWord = randomWordObj.word;
    category = randomWordObj.category;
    clue = randomWordObj.clue;
    guessedWord = Array(selectedWord.length).fill('_');
    remainingGuesses = 6;
    gameRunning = true;

    wordDisplay.textContent = guessedWord.join(' ');
    messageDisplay.textContent = '';
    categoryDisplay.textContent = `Category: ${category}`;
    clueDisplay.textContent = `Clue: ${clue}`;
    generateKeyboard();

    keyboard.style.display = 'block'; // Show keyboard when game starts
    restartButton.style.display = 'none'; // Hide restart button during game
}

// Restart Game Function
function restartGame() {
    selectedWord = '';
    guessedWord = [];
    remainingGuesses = 6;
    category = '';
    clue = '';
    gameRunning = false;
    wordDisplay.textContent = '';
    messageDisplay.textContent = '';
    categoryDisplay.textContent = '';
    clueDisplay.textContent = '';
    keyboard.style.display = 'none'; // Hide keyboard before game starts
    restartButton.style.display = 'none'; // Hide restart button
    startButton.style.display = 'block'; // Show start button for new game
}

// Sound Controls
volumeControl.addEventListener('input', (e) => {
    const volume = e.target.value;
    [backgroundMusic, takeoffSound, gameOverSound, winnerSound].forEach(
        (audio) => (audio.volume = volume)
    );
});

toggleMusicButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusicButton.textContent = '🔊 Toggle Music';
    } else {
        backgroundMusic.pause();
        toggleMusicButton.textContent = '🔈 Toggle Music';
    }
});

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Initialize
backgroundMusic.volume = 0.5;
startButton.style.display = 'block'; // Start button is shown initially
keyboard.style.display = 'none'; // Keyboard is hidden initially
restartButton.style.display = 'none'; // Restart button is hidden initially
