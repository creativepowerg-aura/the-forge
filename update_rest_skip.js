const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Replace initRestTimer
const initTarget = `function initRestTimer() {
  const skipBtn = document.getElementById("restSkip");
  if (skipBtn) {
    skipBtn.onclick = (e) => {
      e.stopPropagation();
      stopRestTimer();
    };
  }
}`;
const initReplacement = `function initRestTimer() {
  const skipBtn = document.getElementById("restSkip");
  if (skipBtn) {
    skipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      stopRestTimer();
    });
  }
}`;
appJs = appJs.replace(initTarget, initReplacement);

// Confirm stopRestTimer has hideRestTimer
// I injected stopRestTimer earlier:
// function stopRestTimer() {
//   clearInterval(restInterval);
//   restInterval = null;
//   hideRestTimer();
// }
// I will just do a blind replace to ensure it is exactly as requested
const stopTarget = /function stopRestTimer\(\)\s*\{\s*clearInterval\(restInterval\);\s*restInterval = null;\s*hideRestTimer\(\);\s*\}/;
const stopReplacement = `function stopRestTimer() {
  clearInterval(restInterval);
  restInterval = null;
  hideRestTimer();
}`;
if (!appJs.match(stopTarget)) {
  // If it somehow doesn't match, maybe it doesn't have hideRestTimer()
  const altStopTarget = /function stopRestTimer\(\)\s*\{\s*clearInterval\(restInterval\);\s*restInterval = null;\s*\}/;
  appJs = appJs.replace(altStopTarget, stopReplacement);
} else {
  // Replace just to be safe
  appJs = appJs.replace(stopTarget, stopReplacement);
}

fs.writeFileSync('app.js', appJs);

console.log("Updated rest skip logic.");
