let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let workBtn = document.getElementById("workBtn");
let breakBtn = document.getElementById("breakBtn");
let progressBar = document.getElementById("progress");
let historyList = document.getElementById("historyList");
let headerName = document.getElementById("header");

let duration = 25 * 60;
let timeLeft = duration;
let timer = null;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  const percent = ((duration - timeLeft) / duration);

  // Interpolate color between #fce4ec and #d84343
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function rgbToHex(r, g, b) {
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
  }

  const startColor = hexToRgb("#fce4ec");
  const endColor = hexToRgb("#d84343");

  const r = Math.round(startColor.r + (endColor.r - startColor.r) * percent);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * percent);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * percent);

  const currentColor = rgbToHex(r, g, b);

  progressBar.style.width = `${percent * 100}%`;
  progressBar.style.backgroundColor = currentColor;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      addToHistory(duration === 25 * 60 ? "Radna sesija" : "Pauza");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = duration;
  updateTimerDisplay();
}

function setMode(mode) {
  if (mode === "work") {
    duration = 25 * 60;
    workBtn.classList.add("active");
    breakBtn.classList.remove("active");
  } else {
    duration = 5 * 60;
    breakBtn.classList.add("active");
    workBtn.classList.remove("active");
  }
  resetTimer();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
workBtn.addEventListener("click", () => setMode("work"));
breakBtn.addEventListener("click", () => setMode("break"));

workBtn.addEventListener("click", () => {
  header.textContent = "Vreme za rad";
});

breakBtn.addEventListener("click", () => {
  header.textContent = "Vreme za pauzu";
});

updateTimerDisplay(); // initial render
