// main.js
// Orientation-based mode switching

const MODES = {
  'portrait-primary': { id: 'alarm-section', label: 'Alarm Clock', init: 'initAlarm', cleanup: 'cleanupAlarm' },
  'landscape-primary': { id: 'stopwatch-section', label: 'Stopwatch', init: 'initStopwatch', cleanup: 'cleanupStopwatch' },
  'portrait-secondary': { id: 'timer-section', label: 'Countdown Timer', init: 'initTimer', cleanup: 'cleanupTimer' },
  'landscape-secondary': { id: 'weather-section', label: 'Weather', init: 'initWeather', cleanup: 'cleanupWeather' },
};

let currentMode = null;
let currentOrientation = 'portrait-primary';

function getOrientationMode() {
  const orientation = window.screen.orientation || window.orientation;
  console.log('Orientation object:', orientation);
  
  // Check if we're on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  console.log('Is mobile device:', isMobile);
  
  if (orientation && orientation.type) {
    console.log('Using orientation.type:', orientation.type);
    currentOrientation = orientation.type;
    return MODES[orientation.type] || MODES['portrait-primary'];
  }
  
  // Fallback for older browsers and mobile devices
  const angle = (orientation && orientation.angle) || window.orientation || 0;
  console.log('Using angle:', angle);
  
  // For mobile devices, use more specific angle detection
  if (isMobile) {
    switch (angle) {
      case 0:
        console.log('Mobile: Portrait Up (0°) -> Alarm Clock');
        currentOrientation = 'portrait-primary';
        return MODES['portrait-primary'];
      case 90:
        console.log('Mobile: Landscape Right (90°) -> Stopwatch');
        currentOrientation = 'landscape-primary';
        return MODES['landscape-primary'];
      case 180:
        console.log('Mobile: Portrait Down (180°) -> Timer');
        currentOrientation = 'portrait-secondary';
        return MODES['portrait-secondary'];
      case -90:
      case 270:
        console.log('Mobile: Landscape Left (270°) -> Weather');
        currentOrientation = 'landscape-secondary';
        return MODES['landscape-secondary'];
      default:
        console.log('Mobile: Default -> Alarm Clock');
        currentOrientation = 'portrait-primary';
        return MODES['portrait-primary'];
    }
  } else {
    // For desktop/browser simulation
    switch (angle) {
      case 0:
        currentOrientation = 'portrait-primary';
        return MODES['portrait-primary'];
      case 90:
        currentOrientation = 'landscape-primary';
        return MODES['landscape-primary'];
      case 180:
        currentOrientation = 'portrait-secondary';
        return MODES['portrait-secondary'];
      case -90:
      case 270:
        currentOrientation = 'landscape-secondary';
        return MODES['landscape-secondary'];
      default:
        currentOrientation = 'portrait-primary';
        return MODES['portrait-primary'];
    }
  }
}

function cleanupCurrentMode() {
  if (currentMode && currentMode.cleanup && window[currentMode.cleanup]) {
    window[currentMode.cleanup]();
  }
}

function showModeSection(mode) {
  console.log('Switching to mode:', mode.label);
  
  // Cleanup current mode
  cleanupCurrentMode();
  
  // Hide all sections
  document.querySelectorAll('.mode-section').forEach(sec => {
    sec.classList.add('hidden');
  });
  
  // Show target section
  const section = document.getElementById(mode.id);
  if (section) {
    section.classList.remove('hidden');
  }
  
  // Update mode indicator
  document.getElementById('mode-indicator').textContent = mode.label;
  
  // Initialize new mode
  if (mode.init && window[mode.init]) {
    window[mode.init]();
  }
  
  // Update current mode
  currentMode = mode;
}

function handleOrientationChange() {
  const mode = getOrientationMode();
  showModeSection(mode);
}

// Manual mode switching for testing
function switchToMode(modeKey) {
  const mode = MODES[modeKey];
  if (mode) {
    showModeSection(mode);
  }
}

// Add manual testing buttons for mobile
function addMobileTestButtons() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    const testDiv = document.createElement('div');
    testDiv.style.cssText = 'position: fixed; bottom: 80px; left: 10px; z-index: 1000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 10px;';
    testDiv.innerHTML = `
      <div style="color: white; margin-bottom: 8px; font-size: 11px; text-align: center;">Quick Test:</div>
      <button onclick="switchToMode('portrait-primary')" style="margin: 2px; padding: 4px 8px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 5px;">Alarm</button>
      <button onclick="switchToMode('landscape-primary')" style="margin: 2px; padding: 4px 8px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 5px;">Stopwatch</button>
      <button onclick="switchToMode('portrait-secondary')" style="margin: 2px; padding: 4px 8px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 5px;">Timer</button>
      <button onclick="switchToMode('landscape-secondary')" style="margin: 2px; padding: 4px 8px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 5px;">Weather</button>
    `;
    document.body.appendChild(testDiv);
  }
}

// Add manual testing buttons for desktop
function addTestButtons() {
  const testDiv = document.createElement('div');
  testDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 1000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px;';
  testDiv.innerHTML = `
    <div style="color: white; margin-bottom: 10px; font-size: 12px;">Test Modes:</div>
    <button onclick="switchToMode('portrait-primary')" style="margin: 2px; padding: 5px; font-size: 10px;">Alarm</button>
    <button onclick="switchToMode('landscape-primary')" style="margin: 2px; padding: 5px; font-size: 10px;">Stopwatch</button>
    <button onclick="switchToMode('portrait-secondary')" style="margin: 2px; padding: 5px; font-size: 10px;">Timer</button>
    <button onclick="switchToMode('landscape-secondary')" style="margin: 2px; padding: 5px; font-size: 10px;">Weather</button>
  `;
  document.body.appendChild(testDiv);
}

window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('DOMContentLoaded', () => {
  handleOrientationChange();
  // addMobileTestButtons(); // Commented out to remove test buttons
  // addTestButtons(); // Commented out to hide test buttons on desktop
});

// Make switchToMode available globally
window.switchToMode = switchToMode;