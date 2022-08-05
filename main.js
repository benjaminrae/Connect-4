// Variables

let isPlayer1Turn = true;
let isPlayer2Turn = false;
let isVersusCPU = true;
const columnRegExp = /column\d/;

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
            : (currentPlayerEl.innerHTML = "player 2");
    } else if (isPlayer2Turn) {
        isPlayer1Turn = true;
        isPlayer2Turn = false;
        currentPlayerEl.innerHTML = "player 1";
    }
};

const fillFromBottom = (counter) => {
    const columnToFill = counter.classList.value.match(columnRegExp)[0];
    console.log(columnToFill);
    switch (columnToFill) {
        case "column1":
            for (let i = column1Counters.length - 1; i >= 0; i--) {
                if (!column1Counters[i].classList.contains("selected")) {
                    fillCounter(column1Counters[i]);
                    break;
                }
            }
            break;
        case "column2":
            for (let i = column2Counters.length - 1; i >= 0; i--) {
                if (!column2Counters[i].classList.contains("selected")) {
                    fillCounter(column2Counters[i]);
                    break;
                }
            }
            break;
        case "column3":
            for (let i = column3Counters.length - 1; i >= 0; i--) {
                if (!column3Counters[i].classList.contains("selected")) {
                    fillCounter(column3Counters[i]);
                    break;
                }
            }
            break;
        case "column4":
            for (let i = column4Counters.length - 1; i >= 0; i--) {
                if (!column4Counters[i].classList.contains("selected")) {
                    fillCounter(column4Counters[i]);
                    break;
                }
            }
            break;
        case "column5":
            for (let i = column5Counters.length - 1; i >= 0; i--) {
                if (!column5Counters[i].classList.contains("selected")) {
                    fillCounter(column5Counters[i]);
                    break;
                }
            }
            break;
        case "column6":
            for (let i = column6Counters.length - 1; i >= 0; i--) {
                if (!column6Counters[i].classList.contains("selected")) {
                    fillCounter(column6Counters[i]);
                    break;
                }
            }
            break;
        case "column7":
            for (let i = column7Counters.length - 1; i >= 0; i--) {
                if (!column7Counters[i].classList.contains("selected")) {
                    fillCounter(column7Counters[i]);
                    break;
                }
            }
            break;
    }
};

const fillCounter = (counter) => {
    if (isPlayer1Turn) {
        counter.classList.add("player1-selected", "selected");
        togglePlayer();
    } else if (isPlayer2Turn) {
        counter.classList.add("player2-selected", "selected");
        togglePlayer();
    }
};

//Event Listeners
for (let counter of counters) {
    counter.addEventListener("click", () => {
        fillFromBottom(counter);
    });
}

surrenderEl.addEventListener("click", () => {
    surrenderAndRestart();
});
