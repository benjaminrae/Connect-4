// Variables

let isPlayer1Turn = true;
let isPlayer2Turn = false;
let isVersusCPU = true;

// DOM Elements

const column1Counters = document.getElementsByClassName("column1");
const column2Counters = document.getElementsByClassName("column2");
const column3Counters = document.getElementsByClassName("column3");
const column4Counters = document.getElementsByClassName("column4");
const column5Counters = document.getElementsByClassName("column5");
const column6Counters = document.getElementsByClassName("column6");
const column7Counters = document.getElementsByClassName("column7");
const counters = document.getElementsByClassName("counter");
const surrenderEl = document.getElementsByClassName("controls__surrender")[0];
const currentPlayerEl = document.getElementsByClassName(
    "controls__current-player"
)[0];

const surrenderAndRestart = () => {
    for (let counter of counters) {
        counter.classList.remove(
            "player1-selected",
            "player2-selected",
            "selected"
        );
    }
};

const togglePlayer = () => {
    if (isPlayer1Turn) {
        isPlayer1Turn = false;
        isPlayer2Turn = true;
        isVersusCPU
            ? (currentPlayerEl.innerHTML = "cpu")
            : (currentPlayerEl.innerHTML = "player 1");
    } else if (isPlayer2Turn) {
        isPlayer1Turn = true;
        isPlayer2Turn = false;
        currentPlayerEl.innerHTML = "player 2";
    }
};

//Event Listeners
for (let counter of counters) {
    counter.addEventListener("click", () => {
        if (counter.classList.contains("selected")) {
            alert("That space is already filled");
            return;
        }
        if (isPlayer1Turn) {
            counter.classList.add("player1-selected", "selected");
            togglePlayer();
        } else if (isPlayer2Turn) {
            counter.classList.add("player2-selected", "selected");
            togglePlayer();
        }
    });
}

surrenderEl.addEventListener("click", () => {
    surrenderAndRestart();
});
