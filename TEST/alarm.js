// alarm.js
// Alarm Clock Component

let alarmTime = null;
let alarmActive = false;
let alarmTimeout = null;

function renderAlarmUI() {
  const section = document.getElementById('alarm-section');
  section.innerHTML = `
    <h2>Alarm Clock</h2>
    <label for="alarm-time">Set Alarm Time:</label>
    <input type="time" id="alarm-time">
    <button id="set-alarm-btn">Set Alarm</button>
    <button id="cancel-alarm-btn">Cancel Alarm</button>
    <div id="alarm-status"></div>
  `;
}

function updateAlarmStatus(msg, isActive = false) {
  document.getElementById('alarm-status').textContent = msg;
  alarmActive = isActive;
}

function checkAlarm() {
  if (!alarmActive || !alarmTime) return;
  const now = new Date();
  const [h, m] = alarmTime.split(":");
  if (
    now.getHours() === parseInt(h, 10) &&
    now.getMinutes() === parseInt(m, 10)
  ) {
    ringAlarm();
  } else {
    // Check again in 1 second
    alarmTimeout = setTimeout(checkAlarm, 1000);
  }
}

function ringAlarm() {
  updateAlarmStatus("⏰ Alarm ringing!", false);
  alert("⏰ Alarm ringing!");
  alarmTime = null;
}

function setAlarm() {
  const timeInput = document.getElementById('alarm-time');
  if (!timeInput.value) {
    updateAlarmStatus("Please select a time.");
    return;
  }
  alarmTime = timeInput.value;
  updateAlarmStatus(`Alarm set for ${alarmTime}`, true);
  if (alarmTimeout) clearTimeout(alarmTimeout);
  checkAlarm();
}

function cancelAlarm() {
  if (alarmTimeout) clearTimeout(alarmTimeout);
  alarmTime = null;
  updateAlarmStatus("Alarm cancelled.");
}

function addAlarmListeners() {
  document.getElementById('set-alarm-btn').onclick = setAlarm;
  document.getElementById('cancel-alarm-btn').onclick = cancelAlarm;
}

function initAlarm() {
  renderAlarmUI();
  addAlarmListeners();
  updateAlarmStatus(alarmActive && alarmTime ? `Alarm set for ${alarmTime}` : "No alarm set.");
}

function cleanupAlarm() {
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alarmTimeout = null;
  }
}

window.initAlarm = initAlarm;
window.cleanupAlarm = cleanupAlarm;