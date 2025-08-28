let timerInterval;
let totalSeconds = 0;
let scoreA = 0;
let scoreB = 0;

function updateTimerDisplay() {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    document.getElementById('timer-display').textContent = `${mins}:${secs}`;
}

function startTimer() {
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    totalSeconds = minutes * 60 + seconds;

    updateTimerDisplay();

    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateTimerDisplay();
            } else {
                stopTimer();
                playBuzzer();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    totalSeconds = minutes * 60 + seconds;
    updateTimerDisplay();
}

function playBuzzer() {
    const audio = new Audio('sound/buzzer.mp3');
    audio.play();
}
/* function playBuzzer() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
} */

function updateScore(team, change) {
    if (team === 'A') {
        scoreA = Math.max(0, scoreA + change);
        document.getElementById('scoreA').textContent = scoreA;
    } else {
        scoreB = Math.max(0, scoreB + change);
        document.getElementById('scoreB').textContent = scoreB;
    }
}
