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
        { vocab: "decorate", meaning: "adorn" },
        { vocab: "industry", meaning: "manufacture" },
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
    ],
    [
        { vocab: "dependent", meaning: "reliant" },
        { vocab: "persuasive", meaning: "convincing" },
        { vocab: "presumption", meaning: "supposition" },
        { vocab: "authentic", meaning: "genuine" },
        { vocab: "coincidence", meaning: "by chance" },
        { vocab: "declare", meaning: "announce" },
        { vocab: "constitute", meaning: "establish" },
        { vocab: "desire", meaning: "wish" },
        { vocab: "private", meaning: "personal" },
        { vocab: "information", meaning: "news" },
        { vocab: "satisfy", meaning: "fulfill" },
        { vocab: "compete", meaning: "contend" },
        { vocab: "compliment", meaning: "praise" },
        { vocab: "reliable", meaning: "trustworthy" },
        { vocab: "variety", meaning: "diversity" },
        { vocab: "equal", meaning: "equivalent" },
        { vocab: "purify", meaning: "cleanse" },
        { vocab: "elaborate", meaning: "giving more detail" },
        { vocab: "grace", meaning: "elegance" },
        { vocab: "decision", meaning: "choice" },
    ],
    [
        { vocab: "ripe", meaning: "mature" },
        { vocab: "assertive", meaning: "confident" },
        { vocab: "alleviate", meaning: "relieve" },
        { vocab: "fleeting", meaning: "brief" },
        { vocab: "confuse", meaning: "perplex" },
        { vocab: "relative", meaning: "comparative" },
        { vocab: "lavish", meaning: "luxurious" },
        { vocab: "migrate", meaning: "relocate" },
        { vocab: "extinct", meaning: "vanished" },
        { vocab: "maintenance", meaning: "preservation" },
        { vocab: "arrange", meaning: "organize" },
        { vocab: "existence", meaning: "presence" },
        { vocab: "adorn", meaning: "decorate" },
        { vocab: "mixture", meaning: "blend" },
        { vocab: "guidance", meaning: "supervision" },
        { vocab: "achieve", meaning: "accomplish" },
        { vocab: "occurence", meaning: "phenomenon" },
        { vocab: "ascend", meaning: "rise" },
        { vocab: "complement", meaning: "supplement" },
        { vocab: "flourish", meaning: "prosper" },
    ],
    [
        { vocab: "bind", meaning: "tie" },
        { vocab: "attain", meaning: "acquire" },
        { vocab: "branch", meaning: "division" },
        { vocab: "coat", meaning: "covering" },
        { vocab: "preceding", meaning: "previous" },
        { vocab: "resemble", meaning: "imitate" },
        { vocab: "represent", meaning: "symbolize" },
        { vocab: "inhibit", meaning: "restrain" },
        { vocab: "fluctuate", meaning: "rise and fall" },
        { vocab: "service", meaning: "assistance" },
        { vocab: "lose", meaning: "defeat" },
        { vocab: "ratify", meaning: "approve" },
        { vocab: "respire", meaning: "breath" },
        { vocab: "estimate", meaning: "calculate" },
        { vocab: "fertilize", meaning: "nourish" },
        { vocab: "incorporate", meaning: "integrate" },
        { vocab: "decay", meaning: "decompose" },
        { vocab: "acquire", meaning: "obtain" },
        { vocab: "conduct", meaning: "organize" },
        { vocab: "drop", meaning: "descend" },
    ]
]


const vocabList = document.getElementById("vocab-list");
const meaningList = document.getElementById("meaning-list");
const wordList = document.getElementById('wordlist');
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

let currentList = []
let currentPage = 0;
const itemsPerPage = 5;
let timer = 90;
let score = 0;
let lives = 5;
let timerInterval;
let gameStarted = false;

function loadPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = currentList.slice(startIndex, endIndex);

    vocabList.innerHTML = "";
    meaningList.innerHTML = "";

    pageData.forEach(item => {
        const vocabItem = document.createElement("div");
        vocabItem.classList.add("card", "unclicked");
        vocabItem.textContent = item.vocab;
        vocabItem.dataset.type = "vocab";
        vocabItem.dataset.match = item.meaning;
        vocabItem.addEventListener("click", flipCard);
        vocabList.appendChild(vocabItem);

        const meaningItem = document.createElement("div");
        meaningItem.classList.add("card", "unclicked");
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

    if (!card.classList.contains("unclicked") || flippedCards.length === 2) return;

    card.classList.remove("unclicked");
    card.classList.add("clicked");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.match === card2.dataset.match) {
        card1.classList.add("match");
        card2.classList.add("match");
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
        card1.classList.add("incorrect");
        card2.classList.add("incorrect");
        setTimeout(() => {
            card1.classList.remove("clicked", "incorrect");
            card2.classList.remove("clicked", "incorrect");
            card1.classList.add("unclicked");
            card2.classList.add("unclicked");
        }, 500);
        setTimeout(() => {
            lives--;
            livesElement.textContent = lives;
            if (lives > 0) {
                alert(`Oops! You have ${lives} more lives.`)
            } else if (lives === 0) {
                alert(`Lives run out! Game over. Your score: ${score}`);
                gameStarted = false;
                resetButton.disabled = false;
                resetGame();
            }
        }, 500);
    }

    flippedCards = [];
}

function isPageComplete() {
    const remainingCards = Array.from(vocabList.children).filter(card => card.classList.contains("unclicked"));
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
    lives = 5;
    timerElement.textContent = formatTime(timer);
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    loadPage(currentPage);
    startTimer();
}

function resetGame() {
    gameStarted = false;
    timer = 90;
    score = 0;
    lives = 5;
    clearInterval(timerInterval);
    startButton.disabled = false;
    resetButton.disabled = true;
    timerElement.textContent = formatTime(timer);
    scoreElement.textContent = 0;
    livesElement.textContent = lives;
    vocabList.innerHTML = "";
    meaningList.innerHTML = "";
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = formatTime(timer);
        if (timer === 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Game over. Your score: ${score}`);
            gameStarted = false;
            resetButton.disabled = false;
            resetGame();
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