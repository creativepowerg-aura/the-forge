const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

const oldOverlayRegex = /<div id="restOverlay" class="rest-overlay">[\s\S]*?<\/div>\s*<\/body>/;
const newToast = `<div id="restToast" class="rest-toast">
  <div class="rest-toast-left">
    <svg class="rest-toast-ring" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="3"/>
      <circle id="restRing" cx="18" cy="18" r="14" fill="none" stroke="#00d4ff" stroke-width="3"
        stroke-linecap="round" stroke-dasharray="88" stroke-dashoffset="0"
        style="transform:rotate(-90deg); transform-origin:center; transition: stroke-dashoffset .9s linear, stroke .3s;"/>
    </svg>
    <div class="rest-toast-time">
      <div id="restCountdown" class="rest-toast-countdown">—</div>
      <div id="restLabel" class="rest-toast-label">REST</div>
    </div>
  </div>
  <button class="rest-toast-skip" id="restSkip">SKIP</button>
</div>
</body>`;

indexHtml = indexHtml.replace(oldOverlayRegex, newToast);
fs.writeFileSync('index.html', indexHtml);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');

// Remove old rest CSS
const oldCssRegex = /\.rest-overlay \{[\s\S]*?\.rest-hint \{[\s\S]*?\}/;
styleCss = styleCss.replace(oldCssRegex, '');

const newCss = `
.rest-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  z-index: 200;
  background: var(--surface2);
  border: 1px solid rgba(0, 212, 255, .3);
  border-radius: 16px;
  padding: 12px 16px 12px 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0,0,0,.6), 0 0 0 1px rgba(0,212,255,.1);
  opacity: 0;
  pointer-events: none;
  transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .3s ease;
}
.rest-toast.active {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  pointer-events: all;
}
.rest-toast.rest-flash {
  border-color: rgba(0,220,130,.6);
  box-shadow: 0 8px 32px rgba(0,0,0,.6), 0 0 16px rgba(0,220,130,.3);
  animation: toastFlash .4s ease;
}
@keyframes toastFlash {
  0%, 100% { background: var(--surface2); }
  50% { background: rgba(0,220,130,.1); }
}
.rest-toast-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}
.rest-toast-ring {
  width: 36px;
  height: 36px;
  flex: none;
}
.rest-toast-time {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.rest-toast-countdown {
  font-family: 'Anton', sans-serif;
  font-size: 22px;
  letter-spacing: .04em;
  color: #fff;
  line-height: 1;
}
.rest-toast-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--faint);
  font-weight: 700;
}
.rest-toast-skip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  color: var(--dim);
  background: transparent;
  border: 1px solid var(--border2);
  border-radius: 8px;
  padding: 7px 12px;
  cursor: pointer;
  transition: .15s;
  flex: none;
}
.rest-toast-skip:hover { border-color: #00d4ff; color: #00d4ff; }
`;
styleCss += newCss;
fs.writeFileSync('style.css', styleCss);


// 3. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// replace restTimerDone
const restTimerDoneTarget = `function restTimerDone() {
  updateRestDisplay();
  // Vibrate if supported
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  // Flash the timer
  const overlay = document.getElementById("restOverlay");
  if (overlay) {
    overlay.classList.add("rest-flash");
    setTimeout(() => overlay.classList.remove("rest-flash"), 600);
  }
}`;
const restTimerDoneReplacement = `function restTimerDone() {
  updateRestDisplay();
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  const toast = document.getElementById("restToast");
  if (toast) {
    toast.classList.add("rest-flash");
    setTimeout(() => toast.classList.remove("rest-flash"), 600);
  }
  // Auto dismiss after 2 seconds when done
  setTimeout(() => {
    if (restSeconds <= 0) hideRestTimer();
  }, 2000);
}`;
appJs = appJs.replace(restTimerDoneTarget, restTimerDoneReplacement);

// replace showRestTimer
const showRestTimerTarget = `function showRestTimer() {
  const overlay = document.getElementById("restOverlay");
  if (overlay) overlay.classList.add("active");
}`;
const showRestTimerReplacement = `function showRestTimer() {
  const toast = document.getElementById("restToast");
  if (toast) toast.classList.add("active");
}`;
appJs = appJs.replace(showRestTimerTarget, showRestTimerReplacement);

// replace hideRestTimer
const hideRestTimerTarget = `function hideRestTimer() {
  const overlay = document.getElementById("restOverlay");
  if (overlay) overlay.classList.remove("active");
  restSeconds = 0;
  restTotal = 0;
}`;
const hideRestTimerReplacement = `function hideRestTimer() {
  const toast = document.getElementById("restToast");
  if (toast) toast.classList.remove("active");
  restSeconds = 0;
  restTotal = 0;
}`;
appJs = appJs.replace(hideRestTimerTarget, hideRestTimerReplacement);

// replace initRestTimer
const initRestTimerTarget = `function initRestTimer() {
  const skipBtn = document.getElementById("restSkip");
  const overlay = document.getElementById("restOverlay");
  if (skipBtn) {
    skipBtn.onclick = (e) => {
      e.stopPropagation();
      stopRestTimer();
    };
  }
  if (overlay) {
    overlay.onclick = () => stopRestTimer();
  }
}`;
const initRestTimerReplacement = `function initRestTimer() {
  const skipBtn = document.getElementById("restSkip");
  if (skipBtn) {
    skipBtn.onclick = (e) => {
      e.stopPropagation();
      stopRestTimer();
    };
  }
}`;
appJs = appJs.replace(initRestTimerTarget, initRestTimerReplacement);

fs.writeFileSync('app.js', appJs);
console.log("Updated to toast rest timer");
