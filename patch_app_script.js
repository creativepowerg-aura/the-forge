const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');
const newAppJs = fs.readFileSync('patch_app.txt', 'utf8');

const renderOnboardingStart = appJs.indexOf('function renderOnboarding() {');
const renderOnboardingEndMatch = appJs.match(/  renderStep\(1\);\n\}/);
if (renderOnboardingStart !== -1 && renderOnboardingEndMatch) {
  const renderOnboardingEnd = renderOnboardingEndMatch.index + renderOnboardingEndMatch[0].length;
  appJs = appJs.slice(0, renderOnboardingStart) + newAppJs + appJs.slice(renderOnboardingEnd);
  fs.writeFileSync('app.js', appJs);
  console.log("Successfully replaced renderOnboarding in app.js");
} else {
  console.log("Still could not find boundaries in app.js");
}
