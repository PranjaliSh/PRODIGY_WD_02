let timer;
let runningTime = 0;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateDisplay, 10);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    runningTime = 0;
    display.innerHTML = formatTime(runningTime);
    lapList.innerHTML = '';
    lapCount = 0;
}

function updateDisplay() {
    runningTime += 10; // Increment by 10ms
    display.innerHTML = formatTime(runningTime);
}

function formatTime(time) {
    const milliseconds = Math.floor(time % 1000 / 10);
    const seconds = Math.floor(time / 1000 % 60);
    const minutes = Math.floor(time / (1000 * 60) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return (
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (milliseconds < 10 ? '0' : '') + milliseconds
    );
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = formatTime(runningTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}