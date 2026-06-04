const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// A. Inject isFirstTimeUser and completeOnboarding
const topTarget = `const WEEK_DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];`;
const topReplacement = `const WEEK_DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

function isFirstTimeUser() {
  return !localStorage.getItem("forge:onboarded");
}

function completeOnboarding() {
  localStorage.setItem("forge:onboarded", "true");
}`;
appJs = appJs.replace(topTarget, topReplacement);

// B. Inject stub renderOnboarding()
const stub = `
function renderOnboarding() {
  document.getElementById("day").innerHTML = "<p style='color:white'>Onboarding coming soon</p>";
}
`;
appJs += stub;

// C. Modify bottom init block
const initTarget = `initGear();
renderNav();
selectDay(current);`;
const initReplacement = `initGear();
if (isFirstTimeUser()) {
  renderOnboarding();
} else {
  renderNav();
  selectDay(current);
}`;
appJs = appJs.replace(initTarget, initReplacement);

fs.writeFileSync('app.js', appJs);

console.log("Updated onboarding logic");
