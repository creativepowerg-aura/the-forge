const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

const restOverlayHTML = `
<div id="restOverlay" class="rest-overlay">
  <div class="rest-inner">
    <svg class="rest-svg" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="5"/>
      <circle id="restRing" cx="35" cy="35" r="28" fill="none" stroke="#00d4ff" stroke-width="5"
        stroke-linecap="round" stroke-dasharray="176" stroke-dashoffset="0"
        style="transform:rotate(-90deg); transform-origin:center; transition: stroke-dashoffset .9s linear, stroke .3s;"/>
    </svg>
    <div class="rest-center">
      <div id="restCountdown" class="rest-countdown">—</div>
      <div id="restLabel" class="rest-label">REST</div>
    </div>
  </div>
  <button class="rest-skip" id="restSkip">SKIP</button>
  <div class="rest-hint">Tap anywhere to dismiss</div>
</div>
</body>`;

indexHtml = indexHtml.replace('</body>', restOverlayHTML);
fs.writeFileSync('index.html', indexHtml);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
styleCss += `
.rest-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(10, 10, 14, .92);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease;
}
.rest-overlay.active {
  opacity: 1;
  pointer-events: all;
}
.rest-overlay.rest-flash {
  animation: restFlash .3s ease;
}
@keyframes restFlash {
  0%, 100% { background: rgba(10,10,14,.92); }
  50% { background: rgba(0,220,130,.15); }
}
.rest-inner {
  position: relative;
  width: 160px;
  height: 160px;
  display: grid;
  place-items: center;
}
.rest-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.rest-center {
  position: relative;
  text-align: center;
  z-index: 1;
}
.rest-countdown {
  font-family: 'Anton', sans-serif;
  font-size: 52px;
  letter-spacing: .02em;
  color: #fff;
  line-height: 1;
}
.rest-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: .22em;
  color: var(--dim);
  margin-top: 6px;
  font-weight: 700;
}
.rest-skip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .14em;
  color: var(--dim);
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: 10px 24px;
  cursor: pointer;
  transition: .15s;
}
.rest-skip:hover { border-color: #00d4ff; color: #00d4ff; }
.rest-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  letter-spacing: .1em;
}
`;
fs.writeFileSync('style.css', styleCss);

// 3. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');
const initTarget = "initGear();";
const initReplacement = `initGear();
// Rest timer interactions
document.getElementById("restSkip").onclick = (e) => {
  e.stopPropagation();
  stopRestTimer();
};
document.getElementById("restOverlay").onclick = () => {
  stopRestTimer();
};`;
appJs = appJs.replace(initTarget, initReplacement);
fs.writeFileSync('app.js', appJs);

console.log("Injected rest timer UI.");
