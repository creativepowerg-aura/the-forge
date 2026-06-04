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

appJs = appJs.replace(oldShort, newShort);

// Fix 3:
const oldFinishRegex = /\} else if \(pct >= 50\) \{\s*\/\/ Show finish button when 50%\+ done\s*el\.innerHTML = `\s*<button class="finish-btn" id="finishBtn">\s*\$\{pct >= 80 \? "✓ FINISH WORKOUT" : `FINISH EARLY · \$\{pct\}% DONE`\}\s*<\/button>`;/g;

// Wait, the unicode character for checkmark is '✓'. In my previous search it showed ''. It's safer to not rely on the regex if there are encoding issues.
