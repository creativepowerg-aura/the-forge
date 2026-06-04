const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Replace showRestTimer
const showTarget = `function showRestTimer() {
  const toast = document.getElementById("restToast");
  if (toast) toast.classList.add("active");
}`;
const showReplacement = `function showRestTimer() {
  const toast = document.getElementById("restToast");
  if (toast) toast.classList.add("active");
  
  // Re-attach skip handler every time timer shows
  const skipBtn = document.getElementById("restSkip");
  if (skipBtn) {
    skipBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      stopRestTimer();
    };
  }
}`;
appJs = appJs.replace(showTarget, showReplacement);

// Remove initRestTimer function
const initFnRegex = /function initRestTimer\(\)\s*\{\s*const oldBtn = document\.getElementById\("restSkip"\);\s*if \(oldBtn\)\s*\{\s*const newBtn = oldBtn\.cloneNode\(true\);\s*oldBtn\.parentNode\.replaceChild\(newBtn,\s*oldBtn\);\s*newBtn\.addEventListener\("click",\s*\(e\)\s*=>\s*\{\s*e\.stopPropagation\(\);\s*e\.preventDefault\(\);\s*stopRestTimer\(\);\s*\}\);\s*\}\s*\}/;
appJs = appJs.replace(initFnRegex, '');

// Remove initRestTimer() call at the bottom
const callRegex = /initRestTimer\(\);\n?/;
appJs = appJs.replace(callRegex, '');

fs.writeFileSync('app.js', appJs);

console.log("Updated rest timer event handling.");
