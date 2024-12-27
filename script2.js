// Stopwatch variables
let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let running = false;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

// Start/Stop the stopwatch
function startStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsedTime; // Adjust for pause
    timerInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
    startStopBtn.textContent = 'Pause';
    running = true;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    running = false;
  }
}

// Update the time display
function updateTime() {
  elapsedTime = Date.now() - startTime;
  let totalMilliseconds = elapsedTime;
  
  const hours = Math.floor(totalMilliseconds / 3600000);
  totalMilliseconds %= 3600000;
  
  const minutes = Math.floor(totalMilliseconds / 60000);
  totalMilliseconds %= 60000;
  
  const seconds = Math.floor(totalMilliseconds / 1000);
  
  timeDisplay.textContent = formatTime(hours, minutes, seconds);
}

// Format time in HH:MM:SS format
function formatTime(hours, minutes, seconds) {
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

// Pad time with zero if less than 10
function padZero(num) {
  return num < 10 ? '0' + num : num;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  timeDisplay.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  lapList.innerHTML = ''; // Clear lap times
  lapTimes = [];
}

// Record a lap
function recordLap() {
  if (running) {
    const lapTime = formatTime(
      Math.floor(elapsedTime / 3600000),
      Math.floor((elapsedTime % 3600000) / 60000),
      Math.floor((elapsedTime % 60000) / 1000)
    );
    lapTimes.push(lapTime);
    updateLapList();
  }
}

// Update the lap times display
function updateLapList() {
  lapList.innerHTML = '';
  lapTimes.forEach((lap, index) => {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${index + 1}: ${lap}`;
    lapList.appendChild(lapItem);
  });
}

// Event Listeners
startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
