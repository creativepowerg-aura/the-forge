const fs = require('fs');

const idsToUpdate = [
  "chest-fly-floor", "chest-fly-bench", "chest-ring-fly",
  "sh-lateral", "sh-frontraise", "sh-reardelt-fly", "sh-band-facepull", "sh-trx-ytw",
  "bi-hammer", "bi-concentration", "bi-band-curl", "bi-band-hammer", "bi-trx-curl",
  "tri-kickback", "tri-ring-ext", "tri-diamond-pushup",
  "back-pull-apart", "back-shrug", "back-banded-pullapart",
  "leg-calf-raise", "leg-banded-lunge",
  "core-hanging-knee", "core-hanging-leg"
];

let exLib = fs.readFileSync('exercise-library.js', 'utf8');
let lines = exLib.split('\n');
for (let i = 0; i < lines.length; i++) {
  for (let id of idsToUpdate) {
    if (lines[i].includes('id:"' + id + '"') || lines[i].includes('id: "' + id + '"')) {
      lines[i] = lines[i].replace('rest:"60s"', 'rest:"45s"').replace('rest: "60s"', 'rest:"45s"');
    }
  }
}
fs.writeFileSync('exercise-library.js', lines.join('\n'));

let appJs = fs.readFileSync('app.js', 'utf8');
let appLines = appJs.split('\n');
for (let i = 0; i < appLines.length; i++) {
  if (appLines[i].includes('id:"chest-pushup-burnout"') || appLines[i].includes('id: "chest-pushup-burnout"')) {
    appLines[i] = appLines[i].replace('rest:"60s"', 'rest:"45s"').replace('rest: "60s"', 'rest:"45s"');
  }
}
fs.writeFileSync('app.js', appLines.join('\n'));

console.log("Updated rest times to 45s");
