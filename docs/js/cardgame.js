/**
 * War Card Game
 * Implementation using linked list for deck management
 */

// Card class
class Card {
    constructor(suit, rank) {
        this.suit = suit;  // hearts, diamonds, clubs, spades
        this.rank = rank;  // 2-14 (11=J, 12=Q, 13=K, 14=A)
    }

    getValue() {
        return this.rank;
    }

    isStrongerThan(other) {
        return this.rank > other.rank;
    }

    isEqual(other) {
        return this.rank === other.rank;
    }

    getRankDisplay() {
        switch (this.rank) {
            case 14: return 'A';
            case 13: return 'K';
            case 12: return 'Q';
            case 11: return 'J';
            default: return this.rank.toString();
        }
    }

    getSuitSymbol() {
        switch (this.suit) {
            case 'hearts': return '♥';
            case 'diamonds': return '♦';
            case 'clubs': return '♣';
            case 'spades': return '♠';
        }
    }

    toString() {
        return `${this.getRankDisplay()}${this.getSuitSymbol()}`;
    }
}

// Node for linked list
class ListNode {
    constructor(card) {
        this.card = card;
        this.next = null;
    }
}

// Linked List based Deck
class Deck {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    numCards() {
        return this.size;
    }

    addLast(card) {
        const node = new ListNode(card);

        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.size++;
    }

    removeFirst() {
        if (this.isEmpty()) return null;

        const card = this.head.card;
        this.head = this.head.next;
        this.size--;

        if (this.isEmpty()) {
            this.tail = null;
        }

        return card;
    }

    // Get card at position (0-indexed)
    getAt(position) {
        if (position < 0 || position >= this.size) return null;

        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }

        return current.card;
    }

    // Remove card at position
    removeAt(position) {
        if (position < 0 || position >= this.size) return null;

        if (position === 0) {
            return this.removeFirst();
        }

        let current = this.head;
        for (let i = 0; i < position - 1; i++) {
            current = current.next;
        }

        const card = current.next.card;
        current.next = current.next.next;

        if (position === this.size - 1) {
            this.tail = current;
        }

        this.size--;
        return card;
    }

    // Insert card at position
    insertAt(position, card) {
        if (position < 0 || position > this.size) return false;

        const node = new ListNode(card);

        if (position === 0) {
            node.next = this.head;
            this.head = node;
            if (this.size === 0) {
                this.tail = node;
            }
        } else if (position === this.size) {
            this.tail.next = node;
            this.tail = node;
        } else {
            let current = this.head;
            for (let i = 0; i < position - 1; i++) {
                current = current.next;
            }
            node.next = current.next;
            current.next = node;
        }

        this.size++;
        return true;
    }

    // Initialize full 52-card deck
    initFullDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

        for (const suit of suits) {
            for (let rank = 2; rank <= 14; rank++) {
                this.addLast(new Card(suit, rank));
            }
        }
    }

    // Shuffle using remove and insert at random positions
    shuffle() {
        for (let i = 0; i < this.size * 3; i++) {
            const fromPos = Math.floor(Math.random() * this.size);
            const toPos = Math.floor(Math.random() * this.size);

            if (fromPos !== toPos) {
                const card = this.removeAt(fromPos);
                this.insertAt(toPos, card);
            }
        }
    }

    // Convert to array for debugging
    toArray() {
        const result = [];
        let current = this.head;

        while (current) {
            result.push(current.card);
            current = current.next;
        }

        return result;
    }
}

// Game class
class WarGame {
    constructor() {
        this.playerDeck = new Deck();
        this.computerDeck = new Deck();
        this.playerScore = 0;
        this.computerScore = 0;
        this.roundsPlayed = 0;
        this.gameOver = false;
        this.history = [];

        this.initGame();
    }

    initGame() {
        // Create and shuffle a full deck
        const fullDeck = new Deck();
        fullDeck.initFullDeck();
        fullDeck.shuffle();

        // Deal cards to each player
        this.playerDeck = new Deck();
        this.computerDeck = new Deck();

        let dealToPlayer = true;
        while (!fullDeck.isEmpty()) {
            const card = fullDeck.removeFirst();
            if (dealToPlayer) {
                this.playerDeck.addLast(card);
            } else {
                this.computerDeck.addLast(card);
            }
            dealToPlayer = !dealToPlayer;
        }

        this.playerScore = 0;
        this.computerScore = 0;
        this.roundsPlayed = 0;
        this.gameOver = false;
        this.history = [];
    }

    playRound() {
        if (this.gameOver) return null;

        if (this.playerDeck.isEmpty() || this.computerDeck.isEmpty()) {
            this.gameOver = true;
            return null;
        }

        const playerCard = this.playerDeck.removeFirst();
        const computerCard = this.computerDeck.removeFirst();

        this.roundsPlayed++;

        let result;
        if (playerCard.isStrongerThan(computerCard)) {
            this.playerScore++;
            result = 'player';
        } else if (computerCard.isStrongerThan(playerCard)) {
            this.computerScore++;
            result = 'computer';
        } else {
            result = 'tie';
        }

        // Add to history
        this.history.unshift({
            round: this.roundsPlayed,
            playerCard: playerCard.toString(),
            computerCard: computerCard.toString(),
            result
        });

        // Check if game is over
        if (this.playerDeck.isEmpty() || this.computerDeck.isEmpty()) {
            this.gameOver = true;
        }

        return {
            playerCard,
            computerCard,
            result,
            playerScore: this.playerScore,
            computerScore: this.computerScore,
            roundsPlayed: this.roundsPlayed,
            playerCardsLeft: this.playerDeck.numCards(),
            computerCardsLeft: this.computerDeck.numCards(),
            gameOver: this.gameOver
        };
    }

    getWinner() {
        if (!this.gameOver) return null;

        if (this.playerScore > this.computerScore) {
            return 'player';
        } else if (this.computerScore > this.playerScore) {
            return 'computer';
        } else {
            return 'tie';
        }
    }
}

// UI Controller
class GameUI {
    constructor() {
        this.game = new WarGame();
        this.isAnimating = false;

        // DOM elements
        this.playerScoreEl = document.getElementById('player-score');
        this.computerScoreEl = document.getElementById('computer-score');
        this.roundsPlayedEl = document.getElementById('rounds-played');
        this.playerCardsEl = document.getElementById('player-cards');
        this.computerCardsEl = document.getElementById('computer-cards');
        this.gameMessageEl = document.getElementById('game-message');
        this.resultTextEl = document.getElementById('result-text');
        this.playerBattleSlot = document.getElementById('player-battle-slot');
        this.computerBattleSlot = document.getElementById('computer-battle-slot');
        this.playerDeckEl = document.getElementById('player-deck');
        this.computerDeckEl = document.getElementById('computer-deck');
        this.historyLogEl = document.getElementById('history-log');
        this.drawBtn = document.getElementById('draw-btn');

        this.updateUI();
    }

    createCardElement(card, faceUp = true) {
        const cardEl = document.createElement('div');
        cardEl.className = `game-card ${faceUp ? 'face-up' : 'face-down'} ${card.suit}`;

        if (faceUp) {
            cardEl.innerHTML = `
                <span class="rank">${card.getRankDisplay()}</span>
                <span class="suit">${card.getSuitSymbol()}</span>
            `;
        }

        return cardEl;
    }

    updateUI() {
        this.playerScoreEl.textContent = this.game.playerScore;
        this.computerScoreEl.textContent = this.game.computerScore;
        this.roundsPlayedEl.textContent = this.game.roundsPlayed;
        this.playerCardsEl.textContent = this.game.playerDeck.numCards();
        this.computerCardsEl.textContent = this.game.computerDeck.numCards();

        // Update deck visibility
        this.playerDeckEl.style.display = this.game.playerDeck.isEmpty() ? 'none' : 'flex';
        this.computerDeckEl.style.display = this.game.computerDeck.isEmpty() ? 'none' : 'flex';

        // Update button state
        this.drawBtn.disabled = this.game.gameOver || this.isAnimating;
    }

    clearBattleSlots() {
        this.playerBattleSlot.innerHTML = '';
        this.computerBattleSlot.innerHTML = '';
        this.resultTextEl.textContent = '';
        this.resultTextEl.className = 'result-text';
    }

    async playRound() {
        if (this.isAnimating || this.game.gameOver) return;

        this.isAnimating = true;
        this.clearBattleSlots();

        const result = this.game.playRound();

        if (!result) {
            this.isAnimating = false;
            return;
        }

        // Animate cards appearing
        const playerCard = this.createCardElement(result.playerCard);
        const computerCard = this.createCardElement(result.computerCard);

        playerCard.classList.add('card-flip');
        computerCard.classList.add('card-flip');

        this.playerBattleSlot.appendChild(playerCard);
        this.computerBattleSlot.appendChild(computerCard);

        // Wait for animation
        await this.delay(300);

        // Show result
        switch (result.result) {
            case 'player':
                this.resultTextEl.textContent = 'You win this round!';
                this.resultTextEl.className = 'result-text player-win';
                break;
            case 'computer':
                this.resultTextEl.textContent = 'Computer wins!';
                this.resultTextEl.className = 'result-text computer-win';
                break;
            case 'tie':
                this.resultTextEl.textContent = 'Tie!';
                this.resultTextEl.className = 'result-text tie';
                break;
        }

        this.updateHistory();

        // Check for game over
        if (result.gameOver) {
            await this.delay(500);
            this.showGameOver();
        }

        // Re-enable button after animation completes
        this.isAnimating = false;
        this.updateUI();
    }

    updateHistory() {
        const entries = this.game.history.slice(0, 10).map(entry => {
            const resultSymbol = entry.result === 'player' ? '✓' :
                                 entry.result === 'computer' ? '✗' : '=';
            const resultColor = entry.result === 'player' ? 'var(--success)' :
                               entry.result === 'computer' ? 'var(--error)' : 'var(--warning)';

            return `<div class="history-entry">
                <span>R${entry.round}: ${entry.playerCard} vs ${entry.computerCard}</span>
                <span style="color: ${resultColor}">${resultSymbol}</span>
            </div>`;
        }).join('');

        this.historyLogEl.innerHTML = entries || '<div class="history-entry">No rounds played yet</div>';
    }

    showGameOver() {
        const winner = this.game.getWinner();
        let message, className;

        switch (winner) {
            case 'player':
                message = '🎉 You Win the Game!';
                className = 'winner-message player-wins';
                break;
            case 'computer':
                message = '💻 Computer Wins!';
                className = 'winner-message computer-wins';
                break;
            case 'tie':
                message = "🤝 It's a Tie!";
                className = 'winner-message';
                break;
        }

        this.gameMessageEl.innerHTML = `<span class="${className}">${message}</span>`;
        this.resultTextEl.textContent = `Final: ${this.game.playerScore} - ${this.game.computerScore}`;
    }

    newGame() {
        this.game = new WarGame();
        this.clearBattleSlots();
        this.gameMessageEl.textContent = 'Click "Draw Card" to play!';
        this.updateUI();
        this.historyLogEl.innerHTML = '<div class="history-entry">Game ready to start...</div>';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const ui = new GameUI();

    document.getElementById('draw-btn').addEventListener('click', () => {
        ui.playRound();
    });

    document.getElementById('new-game-btn').addEventListener('click', () => {
        ui.newGame();
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            ui.playRound();
        }
    });
});
