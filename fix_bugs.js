const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Bug 1 - saveSession duration
const durationTarget = "duration: getTimerMinutes(),";
const durationReplacement = "duration: timerSeconds > 0 ? Math.max(1, Math.floor(timerSeconds / 60)) : 0,";
appJs = appJs.replace(durationTarget, durationReplacement);

// Bug 2 - getTodayString
const getTodayStringRegex = /function getTodayString\(\)\s*\{\s*return new Date\(\)\.toISOString\(\)\.split\("T"\)\[0\];\s*\}/;
const getTodayStringReplacement = `function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return \`\${year}-\${month}-\${day}\`;
}`;
appJs = appJs.replace(getTodayStringRegex, getTodayStringReplacement);

// Bug 3 - getDayStatus
const getDayStatusRegex = /function getDayStatus\(dayKey\)\s*\{\s*const today = getTodayString\(\);\s*const key = getLogKey\(today, dayKey\);\s*try\s*\{\s*const raw = localStorage\.getItem\(key\);\s*if \(\!raw\) return "untouched";\s*const session = JSON\.parse\(raw\);\s*if \(session\.completed\) return "complete";\s*if \(session\.pct > 0\) return "inprogress";\s*return "untouched";\s*\}\s*catch\(e\)\s*\{\s*return "untouched";\s*\}\s*\}/;
const getDayStatusReplacement = `function getDayStatus(dayKey) {
  const today = getTodayString();
  const key = \`forge:log:\${today}-\${dayKey}\`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return "untouched";
    const session = JSON.parse(raw);
    if (session.completed) return "complete";
    if (session.pct > 0) return "inprogress";
    return "untouched";
  } catch(e) { return "untouched"; }
}`;
appJs = appJs.replace(getDayStatusRegex, getDayStatusReplacement);

fs.writeFileSync('app.js', appJs);

console.log("Bug fixes applied.");
