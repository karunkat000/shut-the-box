// global vars

const startScreen = document.querySelector(".start-screen");
const startBtn = document.querySelector("#start-btn");

const p1NameInput = document.querySelector("#p1-name");
const p2NameInput = document.querySelector("#p2-name");

const gameBoard = document.querySelector(".game-board");
const playerTurn = document.querySelector("#player-turn");
const infoVS = document.querySelector("#info-vs");
const roundNumberText = document.querySelector("#round-number");

const dieOne = document.querySelector("#die1");
const dieTwo = document.querySelector("#die2");

const rollBtn = document.querySelector("#roll-btn");
const individualBtn = document.querySelector("#individual-btn");
const sumBtn = document.querySelector("#sum-btn");
const endTurnBtn = document.querySelector("#end-btn");

const scoreCardBtn = document.querySelector("#score-popup-btn");
const scoreCard = document.querySelector(".score-card");
const scoreCardP1 = document.querySelector("#p1-score-title");
const scoreCardP2 = document.querySelector("#p2-score-title");

const winnerDiv = document.querySelector(".winner");
const winnerText = document.querySelector("#winner-text");
const endScoreText = document.querySelector("#end-scores");
const playAgainBtn = document.querySelector("#play-again-btn");

// game vars

const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let p1Name;
let p2Name;

let roundNumber = 1;
let player = 1;

let p1Points = 0;
let p2Points = 0;

let d1 = 0;
let d2 = 0;

startBtn.addEventListener('click', function() {

    p1Name = p1NameInput.value.trim();
    p2Name = p2NameInput.value.trim();

    if (p1Name && p2Name) {

        p1NameInput.value = "";
        p2NameInput.value = "";

        startScreen.style.display = "none";
        gameBoard.style.display = "flex";

        playerTurn.textContent = `${p1Name}'s turn`;
        infoVS.textContent = `${p1Name} vs ${p2Name}`;
        roundNumberText.textContent = `Round ${roundNumber}`;
        scoreCardP1.textContent = `${p1Name}`;
        scoreCardP2.textContent = `${p2Name}`;

        individualBtn.disabled = true;
        sumBtn.disabled = true;
        endTurnBtn.disabled = true;
        individualBtn.classList.add("disabled");
        sumBtn.classList.add("disabled");
        endTurnBtn.classList.add("disabled");


    } else {

        alert("Please enter both names");

    }

});

scoreCardBtn.addEventListener('mouseover', function() {

    scoreCard.style.display = "block";

});

scoreCardBtn.addEventListener('mouseout', function() {

    scoreCard.style.display = "none";

});

rollBtn.addEventListener('click', function() {


    d1 = Math.floor(Math.random() * 6) + 1;
    d2 = Math.floor(Math.random() * 6) + 1;

    dieOne.className = `bi bi-dice-${d1}`;
    dieTwo.className = `bi bi-dice-${d2}`;

    rollBtn.disabled = true;
    rollBtn.classList.add("disabled");

    checkDice();

    if (individualBtn.disabled !== false && sumBtn.disabled !== false) {

        endTurnBtn.disabled = false;
        endTurnBtn.classList.remove("disabled");

    }

});

endTurnBtn.addEventListener('click', function() {

    let pts = 45 - boxes[0];

    if (player === 1) {

        p1Points += pts;

        const scoreTotal = document.querySelector(`#score-total-p${player}`);

        const row = buildRow(roundNumber, pts);

        document.querySelector("#score-rows").insertAdjacentElement("beforeend", row);

        player++;

        playerTurn.textContent = `${p2Name}'s turn`;

    } else {

        p2Points += pts;

        document.querySelector(`#round${roundNumber} .p2Pts`).textContent = pts;

        roundNumber++;
        player = 1;

        playerTurn.textContent = `${p1Name}'s turn`;

        if (roundNumber > 5) {

            gameOver();

        }

    }


    resetBoard();

    endTurnBtn.disabled = true;
    endTurnBtn.classList.add("disabled");
    rollBtn.disabled = false;
    rollBtn.classList.remove("disabled");

    roundNumberText.textContent = `Round ${roundNumber}`;

});

individualBtn.addEventListener('click', function() {

    shut(d1);
    shut(d2);

    d1 = 0;
    d2 = 0;

    rollBtn.disabled = false;
    rollBtn.classList.remove("disabled");
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    individualBtn.classList.add("disabled");
    sumBtn.classList.add("disabled");

});

sumBtn.addEventListener('click', function() {

    shut(d1 + d2);

    d1 = 0;
    d2 = 0;

    rollBtn.disabled = false;
    rollBtn.classList.remove("disabled");
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    individualBtn.classList.add("disabled");
    sumBtn.classList.add("disabled");


});

playAgainBtn.addEventListener('click', function() {

    scoreCard.style.display = "none";

    scoreCard.style.position = "fixed";
    scoreCard.style.top = "25%";
    scoreCard.style.zIndex = 9999;

    winnerDiv.style.display = "none";

    if (p1Points !== p2Points) {

        roundNumber = 1;
        player = 1;

        p1Name = "";
        p2Name = "";

        p1Points = 0;
        p2Points = 0;

        document.querySelector("#score-rows").innerHTML = "";

        startScreen.style.display = "flex";

    } else {

        gameBoard.style.display ="flex";

    }

});

function checkDice() {

    let sum = d1 + d2;

    if (sum < 10) {

        if (boxes[d1 + d2] !== "X") {

            sumBtn.disabled = false;
            sumBtn.classList.remove("disabled");

        }

    }

    if (boxes[d1] !== "X" && boxes[d2] !== "X" && d1 !== d2) {

        individualBtn.disabled = false;
        individualBtn.classList.remove("disabled");
    }

}

function shut(boxNumber) {

    boxes[boxNumber] = "X";
    boxes[0] += boxNumber;

    const tempBox = document.querySelector(`#num${boxNumber}`);

    tempBox.textContent = "X";
    tempBox.classList.add("shut");

}

function buildRow(roundNum, pts) {

    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.classList.add("score-round");
    th.textContent = `Round ${roundNum}`;

    const td1 = document.createElement("td");
    td1.classList.add("p1Pts");
    td1.classList.add("score-box");
    td1.textContent = `${pts}`;

    const td2 = document.createElement("td");
    td2.classList.add("p2Pts");
    td2.classList.add("score-box");

    tr.id = `round${roundNum}`;
    tr.insertAdjacentElement("beforeend", th);
    tr.insertAdjacentElement("beforeend", td1);
    tr.insertAdjacentElement("beforeend", td2);

    return tr;

}

function resetBoard() {

    boxes.fill(0);
    const boxess = document.querySelectorAll(".num");
    boxess.forEach( (box, index) => {

        box.classList.remove("shut");
        box.textContent = `${index + 1}`;

    });

}

function gameOver() {

    gameBoard.style.display = "none";
    scoreCard.style.display = "block";

    scoreCard.style.position = "static";
    scoreCard.style.top = "10%";
    scoreCard.style.zIndex = 0;

    winnerDiv.style.display = "flex";

    if (p1Points < p2Points) {

        winnerText.innerHTML = `${p1Name} won the game! <i class="bi bi-trophy-fill" style="color: gold;"></i>`;


    } else if (p2Points < p1Points) {

        winnerText.innerHTML = `${p2Name} won the game! <i class="bi bi-trophy-fill" style="color: gold;"></i>`;

    } else {

        winnerText.textContent = "Draw! You need to keep playing!";

    }

    endScoreText.textContent = `${p1Name}: ${p1Points} - ${p2Name} :${p2Points}`;
    playAgainBtn.textContent = "Continue";


}
