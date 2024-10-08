let timer;
let isRunning = false;
let isSession = true;
let sessionLength = 25;
let breakLength = 5;
let timeLeft = sessionLength * 60;

const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const sessionLengthDisplay = document.getElementById('session-length');
const breakLengthDisplay = document.getElementById('break-length');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isSession = !isSession;
            timeLeft = (isSession ? sessionLength : breakLength) * 60;
            startTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        startStopButton.textContent = 'Start';
    } else {
        startTimer();
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    stopTimer();
    isRunning = false;
    isSession = true;
    sessionLength = 25;
    breakLength = 5;
    timeLeft = sessionLength * 60;
    sessionLengthDisplay.textContent = sessionLength;
    breakLengthDisplay.textContent = breakLength;
    updateTimerDisplay();
    startStopButton.textContent = 'Start';
});

sessionDecrement.addEventListener('click', () => {
    if (sessionLength > 1) {
        sessionLength--;
        sessionLengthDisplay.textContent = sessionLength;
        if (isSession) {
            timeLeft = sessionLength * 60;
            updateTimerDisplay();
        }
    }
});

sessionIncrement.addEventListener('click', () => {
    sessionLength++;
    sessionLengthDisplay.textContent = sessionLength;
    if (isSession) {
        timeLeft = sessionLength * 60;
        updateTimerDisplay();
    }
});

breakDecrement.addEventListener('click', () => {
    if (breakLength > 1) {
        breakLength--;
        breakLengthDisplay.textContent = breakLength;
        if (!isSession) {
            timeLeft = breakLength * 60;
            updateTimerDisplay();
        }
    }
});

breakIncrement.addEventListener('click', () => {
    breakLength++;
    breakLengthDisplay.textContent = breakLength;
    if (!isSession) {
        timeLeft = breakLength * 60;
        updateTimerDisplay();
    }
});

updateTimerDisplay();
