const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

const targetStr = "  updateGearFooter(basePlan);\n  return basePlan;\n}";
const replacementStr = `  updateGearFooter(basePlan);

  // Merge exercise updates (why, breath, easier, harder) into every exercise
  ORDER.forEach(k => {
    if (!basePlan[k].ex) return;
    basePlan[k].ex.forEach(e => {
      if (EXERCISE_UPDATES[e.id]) {
        Object.assign(e, EXERCISE_UPDATES[e.id]);
      }
    });
  });

  return basePlan;
}`;
appJs = appJs.replace(targetStr, replacementStr);
fs.writeFileSync('app.js', appJs);

// 2. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const targetScriptStr = '<script src="exercise-library.js"></script>\n  <script src="app.js"></script>';
const replacementScriptStr = `<script src="exercise-library.js"></script>
  <script src="exercise-updates.js"></script>
  <script src="app.js"></script>`;
indexHtml = indexHtml.replace(targetScriptStr, replacementScriptStr);
fs.writeFileSync('index.html', indexHtml);

console.log("Updated app.js and index.html successfully.");
