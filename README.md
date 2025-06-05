Aesthetic Memory Game
---------------------

### ✨ Overview

The **Aesthetic Memory Game** is a responsive, browser-based card-matching game built with **HTML**, **CSS**, **JavaScript**, and **Bootstrap**. Players select a grid size (4×4 or 6×6), flip cards to find matching pairs, and race against the clock and move counter. The entire board dynamically fits the viewport—no scrolling required—delivering a polished, immersive experience whether you’re on desktop or mobile.

### 🎯 Key Features

*   **Grid Size Selection**Choose between a **4×4 (16 cards)** or **6×6 (36 cards)** layout before you start. The grid automatically resizes so all cards remain visible—no awkward scrolling.
    
*   **Dynamic, Responsive Layout**The game board uses a CSS Grid approach. It calculates a square board size (up to 90% of viewport width or 70% of viewport height) and tiles cards evenly, guaranteeing a scroll-free experience across different devices.
    
*   **Timer & Move Counter**
    
    *   **Timer** starts on your first flip and counts up in minutes:seconds.
        
    *   **Move Counter** increments each time you flip a second card.Both stats are displayed in the header so you can track your performance in real time.
        
*   **Dark/Light Theme Toggle**Support for system-level color scheme preference, plus a manual toggle switch. Enjoy soft pastels in light mode or a sleek, muted palette in dark mode.
    
*   **Win Modal & Replay**Once all pairs are matched, a modal dialog appears celebrating your victory and shows your final move count and time. Hit “Play Again” to shuffle and start a new game instantly.
    
*   **Aesthetic Polish**
    
    *   **Emoji-themed cards** (fruit, clouds, unicorns, etc.)
        
    *   **Subtle animations**: card-flip transitions, hover effects on unflipped cards
        
    *   **Soft gradients & pastel backgrounds** for a cozy, professional vibe
        
    *   **Sounds (optional)** can be added easily by hooking into JavaScript events
        

### 🛠 Technologies Used

*   **HTML5** for semantic structure
    
*   **CSS3 & Bootstrap 5** for responsive layout, utility classes, and modern styling
    
*   **Vanilla JavaScript** for game logic, dynamic DOM manipulation, and timer functionality
    
*   **CSS Grid** (via inline JS styling) to force a perfectly square, scroll-free board
    
*   **Local Storage (optional extension)** to save best times or move records
    

### 🚀 How to Play

1.  **Select Grid Size**
    
    *   On page load, choose either **4 × 4 (16 cards)** or **6 × 6 (36 cards)** from the dropdown.
        
    *   Click **Start Game** to begin.
        
2.  **Flip Cards**
    
    *   Click a card to flip it; click a second card to attempt a match.
        
    *   If the two cards match, they stay flipped. If not, they’ll flip back after a brief delay.
        
3.  **Track Your Progress**
    
    *   **Moves**: Each time you flip a second card, your move counter increments by 1.
        
    *   **Timer**: Starts on your first flip; counts up until you match all pairs.
        
4.  **Win & Replay**
    
    *   When all pairs are found, a **“You Won!”** modal appears with your final moves and time.
        
    *   Click **Play Again** in the modal to instantly shuffle a new board with the same grid size.
        

### 🗂 Project Structure

```
memory-game/    
├── index.html          # Main game markup and UI components    
├── style.css           # Custom styling (themes, grid sizing, animations)      
├── script.js           # Game logic, event handlers, timer, grid setup     
```

*   **index.html**
    
    *   Includes the header (title, moves & timer display, restart button, theme toggle).
        
    *   Grid-size selector card (shown on initial load).
        
    *   Status row (instructions & feedback).
        
    *   Hidden game board container (revealed when the game starts).
        
    *   Win modal markup and footer.
        
*   **style.css**
    
    *   Defines light/dark theme variables.
        
    *   Styles for header, status message, modal, and footer.
        
    *   **#game-board** CSS Grid container sizing logic (max 90% viewport width or 70% height).
        
    *   .memory-card classes (flip animation, hover effect, square aspect ratio).
        
*   **script.js**
    
    *   Defines an array of up to 18 unique emojis (supports 36 cards max).
        
    *   **shuffleArray()**: Fisher–Yates algorithm for randomizing the card values.
        
    *   Functions to start/stop/reset the timer, update moves, and reset status messages.
        
    *   **generateShuffledCards()**: Builds a doubled array of emojis based on the current grid size.
        
    *   **renderBoard()**: Calculates board dimensions, sets up the CSS Grid, and injects card elements.
        
    *   **onCardClick()**: Handles flip logic, matching checks, status updates, and end-game detection.
        
    *   **onStartGame()**: Initializes game state, reveals the grid, and triggers board rendering based on dropdown selection.
        
    *   **Theme toggle** support (reads system preference and syncs the switch).
        

### 💡 Customization & Extensions

*   **Add New Card Themes**Simply expand the allEmojis array in script.js (up to 18 unique values for a 6×6 grid). You can also swap in emoji sets (animals, icons) or even small SVGs if you adjust the font size.
    
*   **Sound Effects**Hook into the onCardClick() logic to play a flipping sound or a “match” jingle. Just preload an
    
    element in the HTML and call audioElement.play() on relevant events.
    
*   **Persistent High Scores**Use localStorage to record best times and moves for each grid size. On game end, compare current score to stored best and update if you break your record. Display a “Best Score” somewhere in the header.
    
*   **Additional Difficulty Levels**
    
    *   Add a **2×2** (4 cards) “tutorial mode” for absolute beginners.
        
    *   Add a **8×8** (64 cards) “expert mode” if you really want to go hard (just ensure the board scaling logic still fits within the viewport).
        

### 🤝 Contribution & Feedback

*   Feel free to open an issue or submit a pull request if you:
    
    *   Spot a bug in the matching logic or timer.
        
    *   Have ideas for new features (e.g., themed card packs, audio cues).
        
    *   Want to improve accessibility (keyboard navigation or ARIA labels).
        

All contributions should follow the existing code style (clean, modular JavaScript; minimal but clear CSS; semantic HTML). Pull requests will be reviewed for consistency, performance, and overall UX polish.



> If you like it, give it a ⭐ 🥰
