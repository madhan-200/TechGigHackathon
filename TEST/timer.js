// timer.js
// Countdown Timer Component

let timerDuration = 0; // ms
let timerRemaining = 0; // ms
let timerRunning = false;
let timerInterval = null;

function renderTimerUI() {
  const section = document.getElementById('timer-section');
  section.innerHTML = `
    <h2>Countdown Timer</h2>
    <label for="timer-minutes">Minutes:</label>
    <input type="number" id="timer-minutes" min="0" max="99" value="0">
    <label for="timer-seconds">Seconds:</label>
    <input type="number" id="timer-seconds" min="0" max="59" value="0">
    <button id="start-timer-btn">Start</button>
    <button id="pause-timer-btn">Pause</button>
    <button id="reset-timer-btn">Reset</button>
    <div id="timer-display">00:00</div>
  `;
}

function formatTimer(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:` +
         `${seconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
  document.getElementById('timer-display').textContent = formatTimer(timerRemaining);
}

function startTimer() {
  if (timerRunning || timerRemaining <= 0) return;
  timerRunning = true;
  const endTime = Date.now() + timerRemaining;
  timerInterval = setInterval(() => {
    timerRemaining = endTime - Date.now();
    if (timerRemaining <= 0) {
      timerRemaining = 0;
      updateTimerDisplay();
      clearInterval(timerInterval);
      timerRunning = false;
      alert('⏰ Timer finished!');
    } else {
      updateTimerDisplay();
    }
  }, 100);
}

function pauseTimer() {
  if (!timerRunning) return;
  timerRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  timerRemaining = timerDuration;
  updateTimerDisplay();
}

function setTimerDuration() {
  const min = parseInt(document.getElementById('timer-minutes').value, 10) || 0;
  const sec = parseInt(document.getElementById('timer-seconds').value, 10) || 0;
  timerDuration = (min * 60 + sec) * 1000;
  timerRemaining = timerDuration;
  updateTimerDisplay();
}

function addTimerListeners() {
  document.getElementById('start-timer-btn').onclick = startTimer;
  document.getElementById('pause-timer-btn').onclick = pauseTimer;
  document.getElementById('reset-timer-btn').onclick = resetTimer;
  document.getElementById('timer-minutes').onchange = setTimerDuration;
  document.getElementById('timer-seconds').onchange = setTimerDuration;
}

function initTimer() {
  renderTimerUI();
  setTimerDuration();
  addTimerListeners();
}

function cleanupTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerRunning = false;
}

window.initTimer = initTimer;
window.cleanupTimer = cleanupTimer;