const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Fix 2:
const oldShort = 'const short = {mon:"CHEST+TRI",tue:"BACK+BI",wed:"LEGS",thu:"SHOULDER",fri:"ARMS",sat:"MOBILITY",sun:"REST"}[k];';
const newShort = `const short = {
      mon: "CHEST+TRI",
      tue: "BACK+BI",
      wed: "LEGS",
      thu: "SHOULDER",
      fri: "ARMS",
      sat: "MOBILITY",
      sun: "REST"
    }[k] || getBlockName(k).split(" + ").map(m => m.slice(0,4)).join("+");`;

if (appJs.includes(oldShort)) {
  appJs = appJs.replace(oldShort, newShort);
} else {
  console.log("oldShort not found!");
}

// Fix 3:
// Find the exact line: } else if (pct >= 50) {
// Replace with: } else if (pct >= 80) {
appJs = appJs.replace('} else if (pct >= 50) {', '} else if (pct >= 80) {');

// Find the line: ${pct >= 80 ? "✓ FINISH WORKOUT" : `FINISH EARLY · ${pct}% DONE`}
// Or maybe it has different unicode char because of file encoding. Let's find it with regex ignoring the exact checkmark char.
appJs = appJs.replace(/\$\{pct >= 80 \? ".*? FINISH WORKOUT" : `FINISH EARLY · \$\{pct\}% DONE`\}/, 
  '${pct >= 100 ? "✓ WORKOUT COMPLETE" : `✓ FINISH WORKOUT · ${pct}%`}');

fs.writeFileSync('app.js', appJs);
console.log("Applied final fixes to app.js");
