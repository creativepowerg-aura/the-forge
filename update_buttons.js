const fs = require('fs');
let styleCss = fs.readFileSync('style.css', 'utf8');

const oldResetBtnRegex = /#resetDefaultBtn \{[\s\S]*?cursor: pointer;\s*margin-bottom: 16px;\s*\}\s*#resetDefaultBtn:active \{ transform: scale\(\.96\); \}/;

const newStyles = `.sched-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .14em;
  color: var(--dim);
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: 9px 14px;
  cursor: pointer;
  transition: .15s;
}
.sched-btn:hover {
  border-color: #00d4ff;
  color: #00d4ff;
}
.sched-btn:active { transform: scale(.96); }
.sched-btn svg { stroke: currentColor; }

#resetDefaultBtn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  color: var(--dim);
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 8px;
  padding: 7px 12px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: .15s;
}
#resetDefaultBtn:hover { border-color: #00d4ff; color: #00d4ff; }
#resetDefaultBtn:active { transform: scale(.96); }`;

if (oldResetBtnRegex.test(styleCss)) {
    styleCss = styleCss.replace(oldResetBtnRegex, newStyles);
} else {
    styleCss += '\n' + newStyles + '\n';
}

fs.writeFileSync('style.css', styleCss);
console.log("Updated styles.");
