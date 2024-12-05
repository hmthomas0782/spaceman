# Spaceman Hangman
### Author: Holland Thomas  

## Overview
**Spaceman Hangman** is an interactive word-guessing game with a space exploration theme. Players must guess letters to reveal a word, aided by categories and clues, while avoiding the dreaded "game over" scenario. With vibrant animations, sound effects, and a neon glow theme, the game combines fun and challenge for players of all ages.

## Screenshots
https://imgur.com/a/cIvhQJ3


## Features
- **Interactive Gameplay**: Guess letters to complete the word.
- **Themes**: Categories and clues to help identify the word.
- **Animations**: Neon glow effects, bouncing title, and spaceman stages.
- **Sound Effects**: Background music, success/failure sounds.
- **Responsive Design**: Optimized for both desktops and mobile devices.

## Folder Structure
- **planning/**: Contains pseudocode and project documentation.
- **css/**: Includes styling for the game.
- **js/**: Contains the game logic in `main.js`.
- **index.html**: The core HTML structure of the game.

## How to Play
1. **Start Game**: Click the "Start Game" button to begin.
2. **Guess the Word**: Click on the on-screen keyboard letters to guess the word.
3. **Hints**: Use the category and clue to help identify the word.
4. **Avoid Running Out of Guesses**: You have a limited number of guesses before the spaceman is fully drawn.

### Game Steps

1. **Initialize Game**
   - Display the title: "Spaceman Hangman."
   - Include a "Start Game" button.
   - Prepare DOM elements for:
     - Word display (underscores for unguessed letters).
     - Keyboard (interactive buttons for A-Z).
     - Message display (game status or errors).
     - Category and clue sections.

2. **Start Game Logic**
   - Generate a random word, category, and clue from the predefined words array.
   - Reset:
     - Guessed letters.
     - Remaining attempts to 6.
     - Game status to "playing."
   - Update the display:
     - Show underscores for the word.
     - Reset the keyboard buttons.

3. **Handle Letter Input**
   - Disable the clicked letter button.
   - If the letter exists in the word:
     - Reveal the letter(s) in the word display.
   - Else:
     - Decrease remaining guesses.
     - Update the spaceman animation (progressively worsening states).

4. **Check Game Status**
   - **Win Condition**: All letters guessed correctly:
     - Display "Houston, We Have Lift Off!"
     - Stop further inputs.
   - **Lose Condition**: Remaining guesses = 0:
     - Display "Houston, We Have a Problem!"
     - Reveal the correct word.
     - Stop further inputs.

5. **Additional Features**
   - Sound effects for:
     - Game start.
     - Winning.
     - Losing.
     - Background music.
   - Volume control slider and toggle button for music.
   - Responsive design and animations (e.g., bouncing title, glowing text).

## Tools & Resources
- **Fonts**: Google Fonts - Honk
- **Background**: Custom retro-style 80s grid background.
- **Sound Effects**: Royalty-free audio files.

## Future Enhancements
- Add difficulty levels.
- Multiplayer support.
- Additional categories and random word generator API integration.

## How to Run the Game Locally
To run the game on your local machine, follow these steps:

### 1. Clone the Repository
Clone this repo to your local machine using the following command:

```bash
git clone https://github.com/hollandthomas/spaceman-hangman.git
