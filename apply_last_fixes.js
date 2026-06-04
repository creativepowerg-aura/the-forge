const fs = require('fs');

// 1. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');

// Replace the old .sheet rules injected from earlier
// Previous injected rules were:
// .sheet {
//   overflow: visible;
// }
// .sheet > * {
//   overflow-y: auto;
//   max-height: 85vh;
// }
const oldSheetRegex = /\.sheet \{\s*overflow: visible;\s*\}\s*\.sheet > \* \{\s*overflow-y: auto;\s*max-height: 85vh;\s*\}/;
styleCss = styleCss.replace(oldSheetRegex, '');

// The original .sheet rule should be replaced entirely with the new one plus the modal specific rules.
// But wait, the original .sheet rule was at around line 794. Let's replace the original .sheet rule.
const origSheetRegex = /\.sheet\s*\{\s*background: var\(--surface\);\s*border: 1px solid var\(--border2\);\s*border-radius: 28px 28px 0 0;\s*width: 100%;\s*max-width: 680px;\s*max-height: 90vh;\s*overflow-y: auto;[\s\S]*?\}/;
// Since the user provided the exact replacement for .sheet, I'll search for it dynamically.
// Or just append it and override!
// Overriding is safest if I can't be sure of the exact regex.
const newSheetRules = `
.sheet {
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: 22px 22px 0 0;
  width: 100%;
  max-width: 680px;
  max-height: 88vh;
  overflow-y: auto;
  padding: 10px 20px 34px;
  animation: up .3s cubic-bezier(.2,.8,.2,1);
}

#scheduleModal .sheet {
  overflow: visible;
}

#scheduleModal .sheet > * {
  overflow-y: auto;
  max-height: 85vh;
}

#formModal .sheet {
  overflow-y: auto;
}
`;
styleCss += newSheetRules;

// Update muscle diagram css
const oldViewsRegex = /\.muscle-diagram-views\s*\{\s*display: flex;\s*gap: 12px;\s*justify-content: center;\s*\}/;
const newViews = `.muscle-diagram-views {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
}`;
styleCss = styleCss.replace(oldViewsRegex, newViews);

const oldSvgRegex = /\.muscle-svg\s*\{\s*width: 100px;\s*height: auto;\s*background: var\(--surface2\);\s*border: 1px solid var\(--border\);\s*border-radius: 12px;\s*padding: 8px;\s*\}/;
const newSvg = `.muscle-svg {
  width: 140px;
  height: auto;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px;
}`;
styleCss = styleCss.replace(oldSvgRegex, newSvg);

fs.writeFileSync('style.css', styleCss);


// 2. Update muscle-diagram.js
let mdJs = fs.readFileSync('muscle-diagram.js', 'utf8');

// Replace opacity
mdJs = mdJs.replace(/return activeRegions\.has\(id\) \? "1" : "0\.6";/g, 'return activeRegions.has(id) ? "1" : "0.85";');
// Try matching single quotes too if needed
mdJs = mdJs.replace(/return activeRegions\.has\(id\) \? '1' : '0\.6';/g, 'return activeRegions.has(id) ? "1" : "0.85";');

// Replace fill
mdJs = mdJs.replace(/const bodyFill = ".*?";/g, 'const bodyFill = "#22222e";');
mdJs = mdJs.replace(/const bodyFill = '.*?';/g, 'const bodyFill = "#22222e";');
mdJs = mdJs.replace(/const bodyStroke = ".*?";/g, 'const bodyStroke = "#35354a";');
mdJs = mdJs.replace(/const bodyStroke = '.*?';/g, 'const bodyStroke = "#35354a";');

fs.writeFileSync('muscle-diagram.js', mdJs);

console.log("Applied layout fixes and muscle diagram scale updates");
