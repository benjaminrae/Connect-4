// Variables

let isPlayer1Turn = true;
let isPlayer2Turn = false;
let player1Name = "Player 1";
let player2Name = "CPU";
let isVersusCPU = true;
let timeInSeconds = 150;
const columnRegExp = /column(\d)/;
const rowRegExp = /row(\d)/;
const numberOfRows = 6;
const numberOfColumns = 7;
let endTime;
let intervalTimer;
let isPlaying = false;
let isPaused = false;
let counterSound1 = new Audio(
    "/sounds/game_connect_4_playing_disc_place_in_frame_1.mp3"
);
const counterSound2 = new Audio(
    "/sounds/game_connect_4_playing_disc_place_in_frame_2.mp3"
);
let isMuted = false;
let moves = 0;

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
const timerEl = document.getElementsByClassName("controls__timer")[0];
const currentPlayerNameEl = document.getElementById("current-player-name");
const currentPlayerColorEl = document.getElementById("current-player-color");
const timeLimitRange = document.getElementById("start-screen__time-limit");
const startScreenTimeLimitDisplay =
    document.getElementById("display-time-limit");
const startScreenForm = document.getElementById("start-screen__form");
const controlsTimeLeft = document.getElementById("controls__time-left");
const singlePlayerInput = document.getElementById(
    "start-screen__single-player"
);
const multiplayerInput = document.getElementById("start-screen__multiplayer");
const player2NameContainer = document.getElementById(
    "start-screen__player-2-name-container"
);
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const winner = document.getElementById("winner");
const playAgainButton = document.getElementById("play-again");
const pauseScreen = document.getElementById("pause-screen");
const resumeButton = document.getElementById("resume-button");
const endScreenIcon = document.getElementById("end-screen-icon");
const muteButton = document.getElementById("mute");
const navHowItWorks = document.getElementById("help");
const navHighScores = docuement.getElementById("high-scores");

// Classes

class HighScore {
    constructor(winnerName, loserName, moves) {
        this._winnerName = winnerName;
        this._loserName = loserName;
        this._moves = moves;
        this._timeInSeconds = timeInSeconds;
        this._passedAnswers = passedAnswers;
    }
    get winnerName() {
        return this._winnerName;
    }
    get loserName() {
        return this._winnerName;
    }
    get moves() {
        return this._moves;
    }
    get timeInSeconds() {
        return this._timeInSeconds;
    }
}

// Functions

const resetBoard = () => {
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
        currentPlayerNameEl.innerHTML = player2Name;
        currentPlayerColorEl.classList.remove("player1-example");
        currentPlayerColorEl.classList.add("player2-example");

        if (isVersusCPU && isPlayer2Turn) {
            const randomCounterToPlay = randomCounter();
            setTimeout(() => {
                computerTurn(randomCounterToPlay);
            }, 1500);
        }
    } else if (isPlayer2Turn) {
        isPlayer1Turn = true;
        isPlayer2Turn = false;
        currentPlayerNameEl.innerHTML = player1Name;
        currentPlayerColorEl.classList.remove("player2-example");
        currentPlayerColorEl.classList.add("player1-example");
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
        if (!isMuted) counterSound1.play();
        counter.classList.add("player1-selected", "selected");
        moves++;
    } else if (isPlayer2Turn) {
        if (!isMuted) counterSound2.play();
        counter.classList.add("player2-selected", "selected");
    }
    checkWinConditions(counter);
    if (isPlaying) togglePlayer();
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
            // alert(
            //     `${
            //         isPlayer1Turn ? player1Name : player2Name
            //     } wins! Vertical win`
            // );
            return endGame();
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
            // alert(
            //     `${
            //         isPlayer1Turn ? player1Name : player2Name
            //     } wins! Horizontal win`
            // );
            return endGame();
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
    let isMatched = false;
    console.log(playerSelectedCounters);
    for (let i = 0; i < startRow; i++) {
        for (let playerCounter of playerSelectedCounters) {
            if (
                playerCounter.classList.contains(`row${startRow - i}`) &&
                playerCounter.classList.contains(`column${startColumn + i}`)
            ) {
                count++;
                isMatched = true;
                if (count === 4) {
                    // alert(
                    //     `${
                    //         isPlayer1Turn ? player1Name : player2Name
                    //     } wins! 45 degree win`
                    // );
                    return endGame();
                }
            } else {
            }
        }
        if (isMatched) {
            isMatched = false;
            continue;
        }
        count = 0;
    }
};

const check135DegreeWin = (counter, playerSelectedCounters) => {
    const matchedArray = [];
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
    let isMatched = false;
    for (let i = 0; i < startRow; i++) {
        for (let playerCounter of playerSelectedCounters) {
            if (
                playerCounter.classList.contains(`row${startRow - i}`) &&
                playerCounter.classList.contains(`column${startColumn - i}`)
            ) {
                count++;
                isMatched = true;
                matchedArray.push(playerCounter);
                if (count === 4) {
                    // alert(
                    //     `${
                    //         isPlayer1Turn ? player1Name : player2Name
                    //     } wins! 135 degree win`
                    // );
                    return endGame();
                }
            }
        }
        if (isMatched) {
            isMatched = false;
            continue;
        }
        count = 0;
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
    const counter = counters[Math.floor(Math.random() * counters.length)];
    if (
        counter.classList.contains("player1-selected") ||
        counter.classList.contains("player2-selected")
    ) {
        return randomCounter();
    }
    return counter;
};

const computerTurn = () => {
    fillFromBottom(randomCounter());
};

const collectFormData = (event) => {
    if (event.target[0].checked) {
        isVersusCPU = true;
    } else if (event.target[1].checked) {
        isVersusCPU = false;
    }
    player1Name = event.target[2].value;
    if (isVersusCPU) {
        player2Name = "CPU";
    } else {
        player2Name = event.target[3].value
            ? event.target[3].value
            : "Player 2";
    }
    timeInSeconds = event.target[4].value;
};

const updateNamesAndTimer = () => {
    controlsTimeLeft.innerHTML = timeInSeconds;
    currentPlayerNameEl.innerHTML = player1Name;
};

const endGame = () => {
    isPlaying = false;
    if (timeInSeconds) {
        winner.innerHTML = `${isPlayer1Turn ? player1Name : player2Name} wins!`;
    } else {
        endScreenIcon.innerHTML = "⏰";
        winner.innerHTML = "Time's up! Nobody wins!";
    }
    endScreen.classList.remove("hidden");
};

const playAgain = () => {
    endScreen.classList.add("hidden");
    resetBoard();
    if (isPlayer2Turn) togglePlayer();
    startScreen.classList.remove("hidden");
};

const startTimer = () => {
    const startTime = new Date().getTime();
    endTime = startTime + timeInSeconds * 1000;
    isPaused = false;
    intervalTimer = setInterval(updateTimer, 1000, endTime);
    updateTimer(endTime);
};

const updateTimer = (end) => {
    const millisecondsLeft = endTime - Date.now();
    timeInSeconds = Math.round(millisecondsLeft / 1000);
    if (isPaused) clearInterval(intervalTimer);
    if (millisecondsLeft >= 0 && isPlaying) {
        controlsTimeLeft.innerHTML = timeInSeconds;
    } else if (millisecondsLeft >= 0 && !isPlaying) {
        clearInterval(intervalTimer);
    } else {
        controlsTimeLeft.innerHTML = "0";
        clearInterval(intervalTimer);
        endGame();
    }
};

const toggleMute = () => {
    if (isMuted) {
        isMuted = false;
        muteButton.innerHTML = "🔊";
    } else {
        isMuted = true;
        muteButton.innerHTML = "🔈";
    }
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
    isPlaying = false;
    resetBoard();
    if (isPlayer2Turn) {
        togglePlayer();
    }
    startScreen.classList.remove("hidden");
});

timeLimitRange.addEventListener("input", (event) => {
    startScreenTimeLimitDisplay.innerHTML = `${event.target.value}s`;
});

startScreenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    collectFormData(event);
    updateNamesAndTimer();
    moves = 0;
    startScreen.classList.add("hidden");
    isPlaying = true;
    startTimer();
});

multiplayerInput.addEventListener("input", () => {
    player2NameContainer.classList.remove("hidden");
});

singlePlayerInput.addEventListener("input", () => {
    player2NameContainer.classList.add("hidden");
});

playAgainButton.addEventListener("click", () => {
    playAgain();
});

timerEl.addEventListener("click", () => {
    isPaused ? (isPaused = false) : (isPaused = true);
    pauseScreen.classList.remove("hidden");
});

resumeButton.addEventListener("click", (event) => {
    event.preventDefault();
    pauseScreen.classList.add("hidden");
    startTimer();
    console.log("click");
});

muteButton.addEventListener("click", () => {
    toggleMute();
});
