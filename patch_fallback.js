const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// Insert bodyweight fallback logic
const targetBuildPlan = 'updateGearFooter(basePlan);';
const fallbackCode = `// Bodyweight fallback — if a lift day has no exercises after gear filter, inject bodyweight plan
  ORDER.forEach(k => {
    if (basePlan[k].type !== "lift") return;
    const muscles = dayMuscles[k] || [];
    if (basePlan[k].ex.length > 0) return; // has exercises, no fallback needed

    // Build fallback from BODYWEIGHT_PLANS based on scheduled muscles
    const fallback = [];
    muscles.forEach(muscle => {
      const bwExercises = BODYWEIGHT_PLANS[muscle];
      if (bwExercises) fallback.push(...bwExercises);
    });

    if (fallback.length > 0) {
      basePlan[k].ex = fallback;
      basePlan[k].isFallback = true;
    }
  });

  updateGearFooter(basePlan);`;

appJs = appJs.replace(targetBuildPlan, fallbackCode);

// Update renderDay HTML
// The original string might use literal characters or different encodings for bullets.
// We'll use a regex to match the .sub div content flexibly.
appJs = appJs.replace(
  /(<div class="sub">.*?<\/div>)/,
  `$1\n      \${p.isFallback ? \`<div class="fallback-notice">⚡ Bodyweight mode — no gear selected for this day</div>\` : ""}`
);

fs.writeFileSync('app.js', appJs);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
styleCss += `\n
/* Fallback Notice */
.fallback-notice {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  color: #00d4ff;
  background: rgba(0,212,255,.08);
  border: 1px solid rgba(0,212,255,.2);
  border-radius: 8px;
  padding: 6px 10px;
  margin-top: 8px;
  display: inline-block;
}
`;

fs.writeFileSync('style.css', styleCss);
console.log("Fallback logic and styles injected.");
