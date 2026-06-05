let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

const modes = {
    'pomodoro': 25,
    'short-break': 5,
    'long-break': 15
};

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    const activeMode = document.querySelector('.modes button.active').id;
    timeLeft = modes[activeMode] * 60;
    updateDisplay();
}

function setMode(modeId) {
    document.querySelectorAll('.modes button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(modeId).classList.add('active');
    
    clearInterval(timerId);
    isRunning = false;
    timeLeft = modes[modeId] * 60;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

document.querySelectorAll('.modes button').forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.id));
});

updateDisplay();
