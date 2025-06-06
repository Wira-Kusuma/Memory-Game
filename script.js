
document.addEventListener('DOMContentLoaded', () => {
    // Full emoji list for up to 18 unique pairs (max 36 cards)
    const allEmojis = [
        '🍓', '🌸', '🐱', '☁️', '🍄', '🦄', '🍩', '🍉',
        '🥑', '🍀', '🐶', '🐰', '🌟', '🍒', '🐼', '🥥',
        '🍋', '🌵'
    ];

    const gameBoard = document.getElementById('game-board');
    const moveCounterEl = document.getElementById('move-counter');
    const timerEl = document.getElementById('timer');
    const statusMessageEl = document.getElementById('status-message');
    const restartBtn = document.getElementById('restart-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const winModalEl = document.getElementById('winModal');
    const finalMovesEl = document.getElementById('final-moves');
    const finalTimeEl = document.getElementById('final-time');
    const playAgainBtn = document.getElementById('play-again-btn');
    const gridSizeSelect = document.getElementById('grid-size-select');
    const startGameBtn = document.getElementById('start-game-btn');
    const statusRow = document.getElementById('status-row');

    let dimension = 4;      // 4×4 by default
    let totalPairs = 8;      // dimension² / 2
    let shuffledCards = [];
    let flippedCards = [];
    let matchedCount = 0;
    let moves = 0;
    let timerInterval = null;
    let totalSeconds = 0;
    let timerStarted = false;
    let winModal = new bootstrap.Modal(winModalEl);

    // Fisher–Yates shuffle
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Start / stop / reset timer
    function startTimer() {
        timerInterval = setInterval(() => {
            totalSeconds++;
            const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
            const s = String(totalSeconds % 60).padStart(2, '0');
            timerEl.textContent = `${m}:${s}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        stopTimer();
        totalSeconds = 0;
        timerStarted = false;
        timerEl.textContent = '00:00';
    }

    function resetStatusMessage() {
        statusMessageEl.textContent = 'Click on two cards to find a matching pair. Good luck!';
        statusMessageEl.classList.remove('text-success', 'text-danger');
        statusMessageEl.classList.add('text-muted');
    }

    function updateMoveCounter() {
        moveCounterEl.textContent = moves;
    }

    // Build & shuffle the cards array for current dimension
    function generateShuffledCards() {
        const neededPairs = (dimension * dimension) / 2;
        const selectedEmojis = allEmojis.slice(0, neededPairs);
        const doubled = [...selectedEmojis, ...selectedEmojis];
        shuffleArray(doubled);
        return doubled;
    }

    // Create a single memory-card element (no wrapper, since we’re using CSS Grid)
    function createCardElement(value) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.cardValue = value;

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'card-front');
        frontFace.textContent = '❔';

        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'card-back');
        backFace.textContent = value;

        card.appendChild(frontFace);
        card.appendChild(backFace);
        card.addEventListener('click', onCardClick);
        return card;
    }

    // Render the grid, then size it so it fits viewport
    function renderBoard() {
        gameBoard.innerHTML = '';
        gameBoard.style.display = 'grid';
        gameBoard.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;

        // Determine maximum board size in pixels:
        // — 90% of viewport width (for narrow screens),
        // — 70% of viewport height (to leave room for header & footer).
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.7;
        const boardSize = Math.min(maxWidth, maxHeight);

        gameBoard.style.width = `${boardSize}px`;
        gameBoard.style.height = `${boardSize}px`;

        // Populate all cards
        shuffledCards.forEach(value => {
            const cardEl = createCardElement(value);
            gameBoard.appendChild(cardEl);
        });
    }

    // Handle a click on any card
    function onCardClick(e) {
        const card = e.currentTarget;
        if (card.classList.contains('flipped') || flippedCards.length === 2) return;

        if (!timerStarted) {
            timerStarted = true;
            startTimer();
            restartBtn.disabled = false;
        }

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            updateMoveCounter();

            const [firstCard, secondCard] = flippedCards;
            const v1 = firstCard.dataset.cardValue;
            const v2 = secondCard.dataset.cardValue;

            if (v1 === v2) {
                matchedCount++;
                statusMessageEl.textContent = 'You found a match!';
                statusMessageEl.classList.replace('text-muted', 'text-success');
                flippedCards = [];

                if (matchedCount === totalPairs) endGame();
            } else {
                statusMessageEl.textContent = 'Not a match. Try again!';
                statusMessageEl.classList.replace('text-muted', 'text-danger');
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    flippedCards = [];
                    resetStatusMessage();
                }, 800);
            }
        }
    }

    function endGame() {
        stopTimer();
        finalMovesEl.textContent = moves;
        finalTimeEl.textContent = timerEl.textContent;
        winModal.show();
    }

    function restartGame() {
        if (winModal._isShown) winModal.hide();
        matchedCount = 0;
        moves = 0;
        updateMoveCounter();
        resetTimer();
        resetStatusMessage();
        shuffledCards = generateShuffledCards();
        renderBoard();
    }

    function initializeThemeToggle() {
        const prefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
            document.body.setAttribute('data-bs-theme', 'dark');
            themeToggle.checked = true;
        } else {
            document.body.setAttribute('data-bs-theme', 'light');
            themeToggle.checked = false;
        }

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.setAttribute('data-bs-theme', 'dark');
            } else {
                document.body.setAttribute('data-bs-theme', 'light');
            }
        });
    }

    // Called when user clicks “Start Game”
    function onStartGame() {
        // expand to more height, to avoid scroll in landing page before play
        document.body.style.height="150vh";

        
        dimension = parseInt(gridSizeSelect.value, 10);
        totalPairs = (dimension * dimension) / 2;

        restartBtn.disabled = false;
        statusRow.style.display = 'block';

        matchedCount = 0;
        moves = 0;
        updateMoveCounter();
        resetTimer();
        resetStatusMessage();

        shuffledCards = generateShuffledCards();
        gameBoard.style.display = 'grid';
        renderBoard();
    }

    // Event listeners
    restartBtn.addEventListener('click', restartGame);
    playAgainBtn.addEventListener('click', () => {
        winModal.hide();
        onStartGame();
    });
    startGameBtn.addEventListener('click', onStartGame);

    // Initial setup
    initializeThemeToggle();
});
