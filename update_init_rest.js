const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Replace initRestTimer
const initTarget = `function initRestTimer() {
  const skipBtn = document.getElementById("restSkip");
  if (skipBtn) {
    skipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      stopRestTimer();
    });
  }
}`;
const initReplacement = `function initRestTimer() {
  const oldBtn = document.getElementById("restSkip");
  if (oldBtn) {
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
    newBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      stopRestTimer();
    });
  }
}`;
appJs = appJs.replace(initTarget, initReplacement);

// Rearrange calls at the bottom
const callsTarget = `initGear();
initRestTimer();
renderNav();
selectDay(current);`;
const callsReplacement = `initGear();
renderNav();
selectDay(current);
initRestTimer();`;

appJs = appJs.replace(callsTarget, callsReplacement);

fs.writeFileSync('app.js', appJs);

console.log("Updated initRestTimer logic and call order.");
