// Variables

let isPlayer1Turn = true;
let isPlayer2Turn = false;
let player1Name = "Player 1";
let player2Name = "Player 2";
let isVersusCPU = true;
const columnRegExp = /column(\d)/;
const rowRegExp = /row(\d)/;
const numberOfRows = 6;
const numberOfColumns = 7;

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
const timeLimitRange = document.getElementById("start-screen__time-limit");
const timeLimitDisplay = document.getElementById("display-time-limit");
// Functions

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
        if (isVersusCPU && isPlayer2Turn) {
            const randomCounterToPlay = randomCounter();
            setTimeout(() => {
                computerTurn(randomCounterToPlay);
            }, 1500);
        }
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
    checkWinConditions(counter);
    togglePlayer();
};

const checkVerticalWin = (counter, playerSelectedCounters) => {
    const columnToCheck = columnRegExp.exec(counter.classList.value)[0];
    const countersInColumn = [];
    for (let playerCounter of playerSelectedCounters) {
        if (playerCounter.classList.contains(columnToCheck))
            countersInColumn.push(playerCounter);
    }
    if (countersInColumn.length >= 4) {
        const rows = [];
        countersInColumn.forEach((counterInColumn) => {
            rows.push(+rowRegExp.exec(counterInColumn.classList.value)[1]);
        });
        if (countConsecutiveNumbers(rows)) {
            alert(`${isPlayer1Turn ? player1Name : player2Name} wins!`);
        }
    }
};

const checkHorizontalWin = (counter, playerSelectedCounters) => {
    const rowToCheck = rowRegExp.exec(counter.classList.value)[0];
    const countersInRow = [];
    for (let playerCounter of playerSelectedCounters) {
        if (playerCounter.classList.contains(rowToCheck))
            countersInRow.push(playerCounter);
    }
    if (countersInRow.length >= 4) {
        const columns = [];
        countersInRow.forEach((counterInRow) => {
            columns.push(+columnRegExp.exec(counterInRow.classList.value)[1]);
        });
        if (countConsecutiveNumbers(columns)) {
            alert(`${isPlayer1Turn ? player1Name : player2Name} wins!`);
        }
    }
};

const countConsecutiveNumbers = (array) => {
    let count = 1;
    for (let i = 0; i < array.length; i++) {
        if (Math.abs(array[i] - array[i + 1]) === 1) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 1;
        }
    }
};

const check45DegreeWin = (counter, playerSelectedCounters) => {
    const counterRow = rowRegExp.exec(counter.classList.value)[1];
    const counterColumn = columnRegExp.exec(counter.classList.value)[1];
    const rowDifference = Math.abs(numberOfRows - +counterRow);
    const columnDifference = Math.abs(1 - +counterColumn);
    const startRow =
        rowDifference > columnDifference
            ? +counterRow + columnDifference
            : +counterRow + rowDifference;
    const startColumn =
        rowDifference > columnDifference
            ? +counterColumn - columnDifference
            : counterColumn - rowDifference;
    if (startRow <= 3 && startColumn <= 3) {
        return;
    } else if (startRow >= 4 && startColumn >= 5) {
        return;
    }
    let count = 0;
    for (let i = 0; i < startRow; i++) {
        for (let playerCounter of playerSelectedCounters) {
            if (
                playerCounter.classList.contains(`row${startRow - i}`) &&
                playerCounter.classList.contains(`column${startColumn + i}`)
            ) {
                count++;
                if (count === 4) {
                    alert(`${isPlayer1Turn ? player1Name : player2Name} wins!`);
                    return true;
                }
            }
        }
    }
};

const check135DegreeWin = (counter, playerSelectedCounters) => {
    const counterRow = rowRegExp.exec(counter.classList.value)[1];
    const counterColumn = columnRegExp.exec(counter.classList.value)[1];
    const rowDifference = Math.abs(numberOfRows - +counterRow);
    const columnDifference = Math.abs(numberOfColumns - +counterColumn);
    const startRow =
        rowDifference > columnDifference
            ? +counterRow + columnDifference
            : +counterRow + rowDifference;
    const startColumn =
        rowDifference > columnDifference
            ? +counterColumn + columnDifference
            : +counterColumn + rowDifference;
    if (startRow >= 4 && startColumn <= 3) {
        return;
    } else if (startRow <= 3 && startColumn >= 5) {
        return;
    }
    let count = 0;
    for (let i = 0; i < startRow; i++) {
        for (let playerCounter of playerSelectedCounters) {
            if (
                playerCounter.classList.contains(`row${startRow - i}`) &&
                playerCounter.classList.contains(`column${startColumn - i}`)
            ) {
                count++;
                if (count === 4) {
                    alert(`${isPlayer1Turn ? player1Name : player2Name} wins!`);
                    return true;
                }
            }
        }
    }
};

const checkWinConditions = (counter) => {
    const playerSelectedCounters = isPlayer1Turn
        ? player1SelectedCounters
        : player2SelectedCounters;
    checkHorizontalWin(counter, playerSelectedCounters);
    checkVerticalWin(counter, playerSelectedCounters);
    check45DegreeWin(counter, playerSelectedCounters);
    check135DegreeWin(counter, playerSelectedCounters);
};

const randomCounter = () => {
    return counters[Math.floor(Math.random() * counters.length)];
};
const computerTurn = () => {
    fillFromBottom(randomCounter());
};

//Event Listeners

for (let counter of counters) {
    counter.addEventListener("click", () => {
        if (isVersusCPU && isPlayer2Turn) {
            return;
        }
        fillFromBottom(counter);
    });
}

surrenderEl.addEventListener("click", () => {
    surrenderAndRestart();
    if (isPlayer2Turn) {
        togglePlayer();
    }
});

timeLimitRange.addEventListener("input", (event) => {
    timeLimitDisplay.innerHTML = `${event.target.value}s`;
});
