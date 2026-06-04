const fs = require('fs');
let styleCss = fs.readFileSync('style.css', 'utf8');

const oldSchedDayRegex = /\.sched-day \{\s*display: flex;\s*align-items: center;\s*justify-content: space-between;\s*gap: 12px;\s*\}/;

const newSchedDayAndRules = `.sched-day {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 10px;
  transition: border-color .2s;
}
.sched-day:hover { border-color: var(--border2); }
.sched-day.locked { opacity: .6; }
.sched-day.dragging { opacity: .4; border-color: #00d4ff; }
.sd-handle {
  color: var(--faint);
  font-size: 16px;
  cursor: grab;
  flex: none;
}
.sd-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .14em;
  color: var(--dim);
  flex: none;
  width: 32px;
}
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
}
#resetDefaultBtn:active { transform: scale(.96); }`;

if (oldSchedDayRegex.test(styleCss)) {
    styleCss = styleCss.replace(oldSchedDayRegex, newSchedDayAndRules);
} else {
    // If somehow it's missing, just append
    styleCss += '\n' + newSchedDayAndRules + '\n';
}

fs.writeFileSync('style.css', styleCss);
console.log("Updated style.css with schedule day styles.");
