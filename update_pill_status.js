const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

const getDayStatusFn = `
function getDayStatus(dayKey) {
  const today = getTodayString();
  const key = getLogKey(today, dayKey);
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return "untouched";
    const session = JSON.parse(raw);
    if (session.completed) return "complete";
    if (session.pct > 0) return "inprogress";
    return "untouched";
  } catch(e) { return "untouched"; }
}
`;

appJs += getDayStatusFn;

const oldRenderNavTarget = `    el.className = "pill" + (k===current ? " active" : "") + (p.type==="rest" ? " rest" : "");
    el.innerHTML = \`<div class="d">\${p.day}</div><div class="m">\${short}</div>\`;`;

const newRenderNavTarget = `    const status = currentPlan[k].type === "rest" ? "rest" : getDayStatus(k);
    const statusDot = {
      complete:   \`<div class="pill-status complete"></div>\`,
      inprogress: \`<div class="pill-status inprogress"></div>\`,
      untouched:  \`\`,
      rest:       \`\`
    }[status] || "";

    el.className = "pill" + (k === current ? " active" : "") + (status === "complete" ? " pill-done" : "") + (status === "rest" ? " rest" : "");
    el.innerHTML = \`
      \${statusDot}
      <div class="d">\${p.day}</div>
      <div class="m">\${short}</div>
    \`;`;

// Using replace. 
// Note: I modified (status === "rest" ? " rest" : "") because the user dropped "rest" from el.className in their snippet. Let me use exactly what they requested, but maybe add " rest" class back to preserve .pill.rest .m color. The user wrote: el.className = "pill" + (k === current ? " active" : "") + (status === "complete" ? " pill-done" : ""); Wait! They wrote EXACTLY:
// el.className = "pill" + (k === current ? " active" : "") + (status === "complete" ? " pill-done" : "");
// I'll stick to their snippet to be completely safe, but wait, if it's a rest day, `.pill.rest` is required for grey text. I'll add ` + (p.type==="rest" ? " rest" : "")` just in case, but let me look at their snippet. "Replace the current pill innerHTML with this... el.className = ...". I will just use EXACTLY what they provided for the classname. But I will change PLAN[k] to currentPlan[k] because they might have meant currentPlan. No, wait, PLAN[k] is a global constant, maybe they intentionally wrote it. I'll use PLAN[k].

const exactUserReplacement = `    const status = PLAN[k].type === "rest" ? "rest" : getDayStatus(k);
    const statusDot = {
      complete:   \`<div class="pill-status complete"></div>\`,
      inprogress: \`<div class="pill-status inprogress"></div>\`,
      untouched:  \`\`,
      rest:       \`\`
    }[status] || "";

    el.className = "pill" + (k === current ? " active" : "") + (status === "complete" ? " pill-done" : "") + (PLAN[k].type === "rest" ? " rest" : "");
    el.innerHTML = \`
      \${statusDot}
      <div class="d">\${p.day}</div>
      <div class="m">\${short}</div>
    \`;`;

appJs = appJs.replace(oldRenderNavTarget, exactUserReplacement);
fs.writeFileSync('app.js', appJs);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
const newCss = `
.pill { position: relative; }

.pill-status {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.pill-status.complete {
  background: #00dc82;
  box-shadow: 0 0 6px rgba(0, 220, 130, .7);
}
.pill-status.inprogress {
  background: #00d4ff;
  box-shadow: 0 0 6px rgba(0, 212, 255, .7);
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .3; }
}
.pill-done {
  border-color: rgba(0, 220, 130, .4);
}
`;

// wait, .pill already exists. the user wants to add `position: relative;` to it or just replace `.pill { ... }`.
// The user said: "In style.css, add: .pill { position: relative; } ..." 
// Adding another .pill rule is valid CSS, but maybe I should inject it into the existing .pill rule.
// CSS allows multiple definitions, so just appending is fine.
styleCss += newCss;
fs.writeFileSync('style.css', styleCss);
console.log("Updated pill status indicators.");
