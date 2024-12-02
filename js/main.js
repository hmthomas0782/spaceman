const categories = ["Movies","Planets"];
const words = {
  Movies: ["ET", "Avatar", "Starwars", "The Matrix", "Star Wars"],
  Planets: ["Saturn", "Mars","Jupiter", "Earth",]
};

let selectedCategory;
let selectedWord;
let lives = 6;
let guessedLetters = [];
let wordDisplay = [];
let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

document.getElementById("play").addEventListener("click", startGame);

function startGame() {
  // Reset the game state
  lives = 6;
  guessedLetters = [];
  wordDisplay = [];
  document.getElementById("lives").textContent = `Lives: ${lives}`;
  document.getElementById("wordDisplay").textContent = "";

  // Choose a random category and word
  selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  selectedWord = words[selectedCategory][Math.floor(Math.random() * words[selectedCategory].length)];

  // Display category
  document.getElementById("categories").textContent = `Category: ${selectedCategory}`;

  // Set up word display
  for (let i = 0; i < selectedWord.length; i++) {
    wordDisplay.push("_");
  }
  updateWordDisplay();

  // Generate letter buttons
  const alphaContainer = document.getElementById("alpha");
  alphaContainer.innerHTML = "";
  alpha.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("letter");
    button.addEventListener("click", () => makeGuess(letter));
    alphaContainer.appendChild(button);
  });

  // Reset canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function makeGuess(letter) {
  if (guessedLetters.includes(letter)) return; // Avoid repeated guesses
  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    // Update the word display
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        wordDisplay[i] = letter;
      }
    }
    updateWordDisplay();
  } else {
    // Incorrect guess: reduce lives and update the canvas
    lives--;
    document.getElementById("lives").textContent = `Lives: ${lives}`;
    drawHangman(lives);
    if (lives === 0) {
      alert("Game Over! The word was: " + selectedWord);
      startGame(); // Restart the game after losing
    }
  }

  // Check if the player has won
  if (!wordDisplay.includes("_")) {
    alert("Congratulations! You guessed the word: " + selectedWord);
    startGame(); // Restart the game after winning
  }
}

function updateWordDisplay() {
  document.getElementById("wordDisplay").textContent = wordDisplay.join(" ");
}
