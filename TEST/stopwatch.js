// stopwatch.js
// Stopwatch Component

let stopwatchRunning = false;
let stopwatchStart = 0;
let stopwatchElapsed = 0;
let stopwatchInterval = null;

function renderStopwatchUI() {
  const section = document.getElementById('stopwatch-section');
  section.innerHTML = `
    <h2>Stopwatch</h2>
    <div id="stopwatch-display">00:00:00.0</div>
    <button id="start-stopwatch-btn">Start</button>
    <button id="pause-stopwatch-btn">Pause</button>
    <button id="reset-stopwatch-btn">Reset</button>
  `;
}

function formatStopwatch(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((ms % 1000) / 100);
  return `${hours.toString().padStart(2, '0')}:` +
         `${minutes.toString().padStart(2, '0')}:` +
         `${seconds.toString().padStart(2, '0')}.` +
         `${tenths}`;
}

function updateStopwatchDisplay() {
  document.getElementById('stopwatch-display').textContent = formatStopwatch(stopwatchElapsed);
}

function startStopwatch() {
  if (stopwatchRunning) return;
  stopwatchRunning = true;
  stopwatchStart = Date.now() - stopwatchElapsed;
  stopwatchInterval = setInterval(() => {
    stopwatchElapsed = Date.now() - stopwatchStart;
    updateStopwatchDisplay();
  }, 100);
}

function pauseStopwatch() {
  if (!stopwatchRunning) return;
  stopwatchRunning = false;
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  stopwatchRunning = false;
  clearInterval(stopwatchInterval);
  stopwatchElapsed = 0;
  updateStopwatchDisplay();
}

function addStopwatchListeners() {
  document.getElementById('start-stopwatch-btn').onclick = startStopwatch;
  document.getElementById('pause-stopwatch-btn').onclick = pauseStopwatch;
  document.getElementById('reset-stopwatch-btn').onclick = resetStopwatch;
}

function initStopwatch() {
  renderStopwatchUI();
  addStopwatchListeners();
  updateStopwatchDisplay();
}

function cleanupStopwatch() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
  stopwatchRunning = false;
}

window.initStopwatch = initStopwatch;
window.cleanupStopwatch = cleanupStopwatch;