let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let workBtn = document.getElementById("workBtn");
let breakBtn = document.getElementById("breakBtn");
let progressBar = document.getElementById("progress");
let historyList = document.getElementById("historyList");

let duration = 25 * 60;
let timeLeft = duration;
let timer = null;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  const percent = ((duration - timeLeft) / duration) * 100;
  progressBar.style.width = `${percent}%`;
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

function addToHistory(type) {
  const li = document.createElement("li");
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  li.textContent = `${type} završena u ${now}`;
  historyList.appendChild(li);
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
workBtn.addEventListener("click", () => setMode("work"));
breakBtn.addEventListener("click", () => setMode("break"));

updateTimerDisplay(); // initial render
