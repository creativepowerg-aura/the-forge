const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const bodyOpen = fs.readFileSync('patch_body_open.txt', 'utf8');
const bodyClose = fs.readFileSync('patch_body_close.txt', 'utf8');

indexHtml = indexHtml.replace('<body>', bodyOpen);

const lastBodyIndex = indexHtml.lastIndexOf('</body>');
if (lastBodyIndex !== -1) {
  indexHtml = indexHtml.slice(0, lastBodyIndex) + bodyClose + '\\n' + indexHtml.slice(lastBodyIndex + 7);
}
fs.writeFileSync('index.html', indexHtml);

// 2. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');
const newAppJs = fs.readFileSync('patch_app.txt', 'utf8');

const renderOnboardingStart = appJs.indexOf('function renderOnboarding() {');
const renderOnboardingEndMatch = appJs.match(/  renderStep\\(1\\);\\n\\}/);
if (renderOnboardingStart !== -1 && renderOnboardingEndMatch) {
  const renderOnboardingEnd = renderOnboardingEndMatch.index + renderOnboardingEndMatch[0].length;
  appJs = appJs.slice(0, renderOnboardingStart) + newAppJs + appJs.slice(renderOnboardingEnd);
  fs.writeFileSync('app.js', appJs);
} else {
  console.log("Could not find boundaries for renderOnboarding in app.js");
}

// 3. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
const newCss = fs.readFileSync('patch_style.txt', 'utf8');

const oldCssRegex = /\\.onboard-wrap \\{[\\s\\S]*?\\.onboard-muscle-opt\\.checked \\{ color: #00d4ff; background: rgba\\(0,212,255,\\.06\\); \\}/;
styleCss = styleCss.replace(oldCssRegex, '');
styleCss += newCss;

fs.writeFileSync('style.css', styleCss);

console.log("Onboarding redesign successfully applied");
