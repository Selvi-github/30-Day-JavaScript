const grid = document.getElementById('grid');
const movesEl = document.getElementById('moves');
const restartBtn = document.getElementById('restart');

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cardsArray = [...emojis, ...emojis];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matches = 0;

function shuffle() {
    cardsArray.sort(() => Math.random() - 0.5);
}

function createBoard() {
    grid.innerHTML = '';
    shuffle();
    cardsArray.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = emoji;
        
        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = emoji;
        
        const back = document.createElement('div');
        back.classList.add('back');
        
        card.appendChild(front);
        card.appendChild(back);
        card.addEventListener('click', flipCard);
        
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesEl.textContent = moves;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === emojis.length) {
            setTimeout(() => alert(`You won in ${moves} moves!`), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

restartBtn.addEventListener('click', () => {
    moves = 0;
    matches = 0;
    movesEl.textContent = moves;
    resetBoard();
    createBoard();
});

createBoard();
