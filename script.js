const vocabData = [
    [
        { vocab: "height", meaning: "altitude" },
        { vocab: "soft", meaning: "gentle" },
        { vocab: "growth", meaning: "expansion" },
        { vocab: "development", meaning: "advancement" },
        { vocab: "emphasis", meaning: "stress" },
        { vocab: "demand", meaning: "request" },
        { vocab: "value", meaning: "merit" },
        { vocab: "belief", meaning: "conviction" },
        { vocab: "proof", meaning: "evidence" },
        { vocab: "contradiction", meaning: "opposition" },
        { vocab: "invention", meaning: "discovery" },
        { vocab: "length", meaning: "span" },
        { vocab: "completeness", meaning: "thoroughness" },
        { vocab: "interest", meaning: "engagement" },
        { vocab: "measure", meaning: "gauge" },
        { vocab: "decoration", meaning: "adornment" },
        { vocab: "industry", meaning: "commerce" },
        { vocab: "region", meaning: "district" },
        { vocab: "weight", meaning: "mass" },
        { vocab: "construction", meaning: "assembly" },
        { vocab: "prevent", meaning: "impede" },
        { vocab: "performance", meaning: "show" },
        { vocab: "position", meaning: "stance" },
        { vocab: "harm", meaning: "damage" },
        { vocab: "success", meaning: "triumph" },
    ],
    [
        { vocab: "consider", meaning: "contemplate" },
        { vocab: "danger", meaning: "threat" },
        { vocab: "use", meaning: "utilize" },
        { vocab: "base", meaning: "cornerstone" },
        { vocab: "perfect", meaning: "flawless" },
        { vocab: "deep", meaning: "profound" },
        { vocab: "tendency", meaning: "inclination" },
        { vocab: "increase", meaning: "swell" },
        { vocab: "particular", meaning: "distinctive" },
        { vocab: "ability", meaning: "capability" },
        { vocab: "product", meaning: "commodity" },
        { vocab: "movement", meaning: "motion" },
        { vocab: "destruction", meaning: "annihilation" },
        { vocab: "provision", meaning: "supply" },
        { vocab: "preference", meaning: "liking" },
        { vocab: "synthetic", meaning: "fabricated" },
        { vocab: "diffuse", meaning: "disperse" },
        { vocab: "halt", meaning: "cease" },
        { vocab: "evidence", meaning: "proof" },
        { vocab: "abundant", meaning: "plentiful" },
    ]
]


const vocabList = document.getElementById("vocab-list");
const meaningList = document.getElementById("meaning-list");
const wordList = document.getElementById('wordlist');
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

let currentList = []
let currentPage = 0;
const itemsPerPage = 5;
let timer = 90;
let score = 0;
let timerInterval;
let gameStarted = false;

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('vocab-heading').style.display = 'block';
    document.getElementById('meaning-heading').style.display = 'block';
});

document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('vocab-heading').style.display = 'none';
    document.getElementById('meaning-heading').style.display = 'none';
});

function loadPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = currentList.slice(startIndex, endIndex);

    vocabList.innerHTML = "";
    meaningList.innerHTML = "";

    pageData.forEach(item => {
        const vocabItem = document.createElement("div");
        vocabItem.classList.add("card", "hidden");
        vocabItem.textContent = item.vocab;
        vocabItem.dataset.type = "vocab";
        vocabItem.dataset.match = item.meaning;
        vocabItem.addEventListener("click", flipCard);
        vocabList.appendChild(vocabItem);

        const meaningItem = document.createElement("div");
        meaningItem.classList.add("card", "hidden");
        meaningItem.textContent = item.meaning;
        meaningItem.dataset.type = "meaning";
        meaningItem.dataset.match = item.meaning;
        meaningItem.addEventListener("click", flipCard);
        meaningList.appendChild(meaningItem);
    });

    shuffleMeanings();
}

function shuffleMeanings() {
    const cards = Array.from(meaningList.children);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        meaningList.appendChild(cards[j]);
    }
}

let flippedCards = [];

function flipCard(event) {
    if (!gameStarted) return;

    const card = event.target;

    if (!card.classList.contains("hidden") || flippedCards.length === 2) return;

    card.classList.remove("hidden");
    card.style.color = "#000";
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.match === card2.dataset.match) {
        card1.style.backgroundColor = "#d4edda";
        card2.style.backgroundColor = "#d4edda";
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
        score += 10;
        scoreElement.textContent = score;

        if (isPageComplete()) {
            if ((currentPage + 1) * itemsPerPage < currentList.length) {
                currentPage++;
                setTimeout(() => loadPage(currentPage), 1000);
            } else {
                clearInterval(timerInterval);
                alert(`Congratulations! You've completed the game. Your score: ${score}`);
                gameStarted = false;
                resetButton.disabled = false;
            }
        }
    } else {
        setTimeout(() => {
            card1.classList.add("hidden");
            card2.classList.add("hidden");
            card1.style.color = "transparent";
            card2.style.color = "transparent";
        }, 500);
    }

    flippedCards = [];
}

function isPageComplete() {
    const remainingCards = Array.from(vocabList.children).filter(card => card.classList.contains("hidden"));
    return remainingCards.length === 0;
}

function startGame() {
    resetGame();
    const index = parseInt(wordList.value, 10);
    currentList = vocabData[index]
    gameStarted = true;
    resetButton.disabled = false;
    startButton.disabled = true;
    currentPage = 0;
    timer = 90;
    score = 0;
    timerElement.textContent = formatTime(timer);
    scoreElement.textContent = score;
    loadPage(currentPage);
    startTimer();
}

function resetGame() {
    gameStarted = false;
    timer = 90;
    clearInterval(timerInterval);
    startButton.disabled = false;
    resetButton.disabled = true;
    timerElement.textContent = formatTime(timer);
    scoreElement.textContent = 0;
    vocabList.innerHTML = "";
    meaningList.innerHTML = "";
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = formatTime(timer);
        if (timer === 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game over.");
            gameStarted = false;
            resetButton.disabled = false;
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
