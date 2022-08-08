// Variables

let isPlayer1Turn = true;
let isPlayer2Turn = false;
let player1Name = "Player 1";
let player2Name = "Player 2";
let isVersusCPU = true;
const columnRegExp = /column(\d)/;
const rowRegExp = /row(\d)/;
// [0] is full match
// [1] is just number

// DOM Elements

const column1Counters = document.getElementsByClassName("column1");
const column2Counters = document.getElementsByClassName("column2");
const column3Counters = document.getElementsByClassName("column3");
const column4Counters = document.getElementsByClassName("column4");
const column5Counters = document.getElementsByClassName("column5");
const column6Counters = document.getElementsByClassName("column6");
const column7Counters = document.getElementsByClassName("column7");
const counters = document.getElementsByClassName("counter");
const player1SelectedCounters =
    document.getElementsByClassName("player1-selected");
const player2SelectedCounters =
    document.getElementsByClassName("player2-selected");
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
    const columnToFill = columnRegExp.exec(counter.classList.value)[1];
    switch (columnToFill) {
        case "1":
            for (let i = column1Counters.length - 1; i >= 0; i--) {
                if (!column1Counters[i].classList.contains("selected")) {
                    fillCounter(column1Counters[i]);
                    break;
                }
            }
            break;
        case "2":
            for (let i = column2Counters.length - 1; i >= 0; i--) {
                if (!column2Counters[i].classList.contains("selected")) {
                    fillCounter(column2Counters[i]);
                    break;
                }
            }
            break;
        case "3":
            for (let i = column3Counters.length - 1; i >= 0; i--) {
                if (!column3Counters[i].classList.contains("selected")) {
                    fillCounter(column3Counters[i]);
                    break;
                }
            }
            break;
        case "4":
            for (let i = column4Counters.length - 1; i >= 0; i--) {
                if (!column4Counters[i].classList.contains("selected")) {
                    fillCounter(column4Counters[i]);
                    break;
                }
            }
            break;
        case "5":
            for (let i = column5Counters.length - 1; i >= 0; i--) {
                if (!column5Counters[i].classList.contains("selected")) {
                    fillCounter(column5Counters[i]);
                    break;
                }
            }
            break;
        case "6":
            for (let i = column6Counters.length - 1; i >= 0; i--) {
                if (!column6Counters[i].classList.contains("selected")) {
                    fillCounter(column6Counters[i]);
                    break;
                }
            }
            break;
        case "7":
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
    } else if (isPlayer2Turn) {
        counter.classList.add("player2-selected", "selected");
    }
    checkVerticalWin(counter);
    checkHorizontalWin(counter);
    togglePlayer();
};

const checkVerticalWin = (counter) => {
    const columnToCheck = columnRegExp.exec(counter.classList.value)[0];
    const playerSelectedCounters = isPlayer1Turn
        ? player1SelectedCounters
        : player2SelectedCounters;

    const countersInColumn = [];
    for (let playerCounter of playerSelectedCounters) {
        if (playerCounter.classList.contains(columnToCheck))
            countersInColumn.push(playerCounter);
    }
    if (countersInColumn.length >= 4) {
        console.log(countersInColumn);
        const rows = [];
        countersInColumn.forEach((counterInColumn) => {
            rows.push(+rowRegExp.exec(counterInColumn.classList.value)[1]);
        });
        console.log(rows);
        if (countConsecutiveNumbers(rows)) {
            alert(`${isPlayer1Turn ? player1Name : player2Name} wins!`);
        }
    }
};

const checkHorizontalWin = (counter) => {
    const rowToCheck = rowRegExp.exec(counter.classList.value)[0];
    const playerSelectedCounters = isPlayer1Turn
        ? player1SelectedCounters
        : player2SelectedCounters;

    const countersInRow = [];
    for (let playerCounter of playerSelectedCounters) {
        if (playerCounter.classList.contains(rowToCheck))
            countersInRow.push(playerCounter);
    }
    if (countersInRow.length >= 4) {
        console.log(countersInRow);
        const columns = [];
        countersInRow.forEach((counterInRow) => {
            columns.push(+columnRegExp.exec(counterInRow.classList.value)[1]);
        });
        console.log(columns);
        if (countConsecutiveNumbers(columns)) {
            alert(`${isPlayer1Turn ? player1Name : player2Name} wins!`);
        }
    }
};

const check45DegreeWin = () => {};
const check135DegreeWin = () => {};

const countConsecutiveNumbers = (array) => {
    let counter = 1;
    for (let i = 0; i < array.length; i++) {
        if (Math.abs(array[i] - array[i + 1]) === 1) {
            counter++;
            if (counter === 4) {
                return true;
            }
        } else {
            counter = 1;
        }
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
    if (isPlayer2Turn) {
        togglePlayer();
    }
});
