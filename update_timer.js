const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// Inject timer variables
const varTarget = "let ORDER = [...DEFAULT_ORDER];";
const varReplacement = `let timerInterval = null;
let timerStart = null;
let timerSeconds = 0;

function startTimer() {
  if (timerInterval) return; // already running
  timerStart = Date.now() - (timerSeconds * 1000);
  timerInterval = setInterval(() => {
    timerSeconds = Math.floor((Date.now() - timerStart) / 1000);
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const el = document.getElementById("sessionTimer");
  if (!el) return;
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  el.textContent = \`\${String(m).padStart(2,"0")}:\${String(s).padStart(2,"0")}\`;
}

function getTimerMinutes() {
  return Math.floor(timerSeconds / 60);
}

let ORDER = [...DEFAULT_ORDER];`;
appJs = appJs.replace(varTarget, varReplacement);

// Inject startTimer() into onSet()
const onSetTarget = "function onSet(e){\n  e.stopPropagation();";
const onSetReplacement = "function onSet(e){\n  startTimer();\n  e.stopPropagation();";
appJs = appJs.replace(onSetTarget, onSetReplacement);

// Inject timer HTML into renderDay()
const renderDayTarget = `<div class="sub">\${p.sub} · \${p.ex.length} exercises · \${total} sets</div>\n    </div>`;
const renderDayReplacement = `<div class="sub">\${p.sub} · \${p.ex.length} exercises · \${total} sets</div>
      \${p.type === "lift" ? \`<div class="timer-row"><span id="sessionTimer" class="timer-display">00:00</span><span class="timer-label">SESSION TIME</span></div>\` : ""}
    </div>`;
// Just in case it has strange spacing/characters (it might be encoded differently, let's use a regex)
const renderDayRegex = /(<div class="sub">.*?<\/div>)\s*(<\/div>\s*<div class="ring">)/;
appJs = appJs.replace(renderDayRegex, `$1\n      \${p.type === "lift" ? \`<div class="timer-row"><span id="sessionTimer" class="timer-display">00:00</span><span class="timer-label">SESSION TIME</span></div>\` : ""}\n    $2`);

// Inject resetTimer() into selectDay()
const selectDayTarget = "state = await loadDay(k); \n  renderNav();";
const selectDayRegex = /(state = await loadDay\(k\);\s*)(renderNav\(\);\s*)/;
appJs = appJs.replace(selectDayRegex, `$1resetTimer();\n  $2`);

fs.writeFileSync('app.js', appJs);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
styleCss += `
.timer-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.timer-display {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  color: #00d4ff;
  letter-spacing: .06em;
  line-height: 1;
}
.timer-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--faint);
  font-weight: 700;
}
`;
fs.writeFileSync('style.css', styleCss);

console.log("Updated timer code successfully.");
