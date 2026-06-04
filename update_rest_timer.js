const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// A. Inject variables
const varTarget = "let timerSeconds = 0;";
const varReplacement = `let timerSeconds = 0;
let restInterval = null;
let restSeconds = 0;
let restTotal = 0;`;
appJs = appJs.replace(varTarget, varReplacement);

// B. Inject module level functions
const moduleLevelFunctions = `
function parseRestSeconds(restStr) {
  if (!restStr || restStr === "—") return 0;
  const match = restStr.match(/(\\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function startRestTimer(seconds) {
  clearInterval(restInterval);
  restSeconds = seconds;
  restTotal = seconds;
  updateRestDisplay();
  showRestTimer();

  restInterval = setInterval(() => {
    restSeconds--;
    updateRestDisplay();
    if (restSeconds <= 0) {
      clearInterval(restInterval);
      restInterval = null;
      restTimerDone();
    }
  }, 1000);
}

function stopRestTimer() {
  clearInterval(restInterval);
  restInterval = null;
  hideRestTimer();
}

function updateRestDisplay() {
  const el = document.getElementById("restCountdown");
  const ring = document.getElementById("restRing");
  const label = document.getElementById("restLabel");
  if (!el) return;

  const m = Math.floor(restSeconds / 60);
  const s = restSeconds % 60;
  el.textContent = restSeconds > 0
    ? \`\${m > 0 ? m + ":" : ""}\${String(s).padStart(2,"0")}\`
    : "GO!";

  if (label) label.textContent = restSeconds > 0 ? "REST" : "NEXT SET";

  // Update ring
  if (ring) {
    const pct = restTotal > 0 ? restSeconds / restTotal : 0;
    const r = 28;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct);
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = offset;
    // Color shifts from cyan to green as rest completes
    ring.style.stroke = restSeconds <= 0 ? "#00dc82" : "#00d4ff";
  }
}

function restTimerDone() {
  updateRestDisplay();
  // Vibrate if supported
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  // Flash the timer
  const overlay = document.getElementById("restOverlay");
  if (overlay) {
    overlay.classList.add("rest-flash");
    setTimeout(() => overlay.classList.remove("rest-flash"), 600);
  }
}

function showRestTimer() {
  const overlay = document.getElementById("restOverlay");
  if (overlay) overlay.classList.add("active");
}

function hideRestTimer() {
  const overlay = document.getElementById("restOverlay");
  if (overlay) overlay.classList.remove("active");
  restSeconds = 0;
  restTotal = 0;
}
`;
appJs += moduleLevelFunctions;

// C. Inject onSet hook
const onSetTarget = `  saveDay(current, state); \n  renderDay();\n}`;
// Let's use a regex to be more robust
const onSetRegex = /(saveDay\(current, state\);\s*)(renderDay\(\);\s*\})/;
const onSetReplacement = `$1
  // Start rest timer when a set is completed (not uncompleted)
  if (state[k].done > 0) {
    const plan = buildPlan()[current];
    const ex = plan?.ex?.find(e => e.id === k);
    if (ex) {
      const secs = parseRestSeconds(ex.rest);
      if (secs > 0) startRestTimer(secs);
    }
  }
  $2`;
appJs = appJs.replace(onSetRegex, onSetReplacement);

fs.writeFileSync('app.js', appJs);

console.log("Updated rest timer logic.");
