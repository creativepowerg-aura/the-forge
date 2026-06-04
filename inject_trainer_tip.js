const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');
const oldWarningRegex = /function checkTrainerWarnings\(\) \{[\s\S]*?\}\n\n\/\/ Schedule Modal Listeners/;
const newWarning = `function checkTrainerWarnings() {
  const box = document.getElementById("trainerTip");
  if (!box) return;

  const schedule = draftOrder.map(k => draftDayMuscles[k] || []);
  const flat = schedule.flat();

  // Count rest days
  const restDays = flat.filter(m => m === "rest").length;
  const mobilityDays = flat.filter(m => m === "mobility").length;
  const trainingDays = draftOrder.filter((k,i) => {
    const ms = draftDayMuscles[k] || [];
    return ms.length > 0 && !ms.includes("rest") && !ms.includes("mobility");
  }).length;

  // Check for back to back same muscle
  let doubleUp = null;
  for (let i = 0; i < draftOrder.length - 1; i++) {
    const today = draftDayMuscles[draftOrder[i]] || [];
    const tomorrow = draftDayMuscles[draftOrder[i+1]] || [];
    const overlap = today.filter(m => tomorrow.includes(m) && m !== "rest" && m !== "mobility");
    if (overlap.length > 0) { doubleUp = overlap[0]; break; }
  }

  // Check for good pairings
  const hasPush = flat.includes("chest") && flat.includes("triceps");
  const hasPull = flat.includes("back") && flat.includes("biceps");
  const hasLegs = flat.includes("legs");
  const hasShoulders = flat.includes("shoulders");

  // Check if arms is solo with no back/bi day
  const hasArmsOnly = flat.includes("arms") && !flat.includes("biceps") && !flat.includes("back");

  // Build tip
  let icon = "💡";
  let tip = "";
  let color = "info";

  if (doubleUp) {
    icon = "⚠️";
    tip = \`\${doubleUp.toUpperCase()} is scheduled on back-to-back days. Muscles need 48hrs to recover — consider spacing them out.\`;
    color = "warn";
  } else if (restDays === 0) {
    icon = "⚠️";
    tip = "No rest days scheduled. At least 1–2 rest or mobility days per week is essential for muscle growth and injury prevention.";
    color = "warn";
  } else if (trainingDays > 5) {
    icon = "⚠️";
    tip = "6–7 training days is a lot. Most people grow faster on 4–5 days with proper recovery. Consider swapping a day to MOBILITY or REST.";
    color = "warn";
  } else if (flat.includes("chest") && !flat.includes("triceps")) {
    icon = "💡";
    tip = "CHEST day without TRICEPS — your triceps assist every press. Consider pairing them together for maximum efficiency.";
    color = "info";
  } else if (flat.includes("back") && !flat.includes("biceps")) {
    icon = "💡";
    tip = "BACK day without BICEPS — your biceps assist every row and pull. They're a natural pair and save you a separate arm day.";
    color = "info";
  } else if (flat.includes("triceps") && !flat.includes("chest")) {
    icon = "💡";
    tip = "TRICEPS without CHEST — consider pairing these on a push day. Chest presses pre-fatigue the triceps perfectly.";
    color = "info";
  } else if (hasArmsOnly) {
    icon = "💡";
    tip = "ARMS day works great as a second hit for biceps and triceps — but make sure they already appear in a BACK+BI or CHEST+TRI day earlier in the week.";
    color = "info";
  } else if (restDays + mobilityDays < 2) {
    icon = "💡";
    tip = "Consider adding a MOBILITY day — 10 minutes of foam rolling and stretching accelerates recovery and keeps joints healthy long term.";
    color = "info";
  } else if (hasPush && hasPull && hasLegs && hasShoulders && restDays >= 1) {
    icon = "✅";
    tip = "Solid week. You've got push, pull, legs and shoulders covered with rest built in — that's a complete, balanced program.";
    color = "good";
  } else if (hasPush && hasPull && hasLegs) {
    icon = "✅";
    tip = "Good foundation — push, pull and legs are the three pillars of a complete program. Add shoulders for a full upper body split.";
    color = "good";
  } else {
    icon = "💡";
    tip = "Classic pairing: CHEST + TRICEPS, BACK + BICEPS, then LEGS and SHOULDERS solo. That covers every muscle group efficiently across the week.";
    color = "info";
  }

  box.className = \`trainer-tip tip-\${color}\`;
  box.innerHTML = \`<span class="tip-icon">\${icon}</span><span class="tip-text">\${tip}</span>\`;
}

// Schedule Modal Listeners`;
appJs = appJs.replace(oldWarningRegex, newWarning);
fs.writeFileSync('app.js', appJs);

// 2. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const oldHtml = '<button class="closeb" id="saveSchedule">SAVE SCHEDULE</button>';
const newHtml = `<div id="trainerTip" class="trainer-tip tip-info">
        <span class="tip-icon">💡</span>
        <span class="tip-text">Classic pairing: CHEST + TRICEPS, BACK + BICEPS, then LEGS and SHOULDERS solo. That covers every muscle group efficiently across the week.</span>
      </div>
      <button class="closeb" id="saveSchedule">SAVE SCHEDULE</button>`;
indexHtml = indexHtml.replace(oldHtml, newHtml);
fs.writeFileSync('index.html', indexHtml);

// 3. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
const newCss = `
.trainer-tip {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  margin-bottom: 14px;
  font-size: 13px;
  line-height: 1.55;
  transition: all .3s ease;
  border: 1px solid transparent;
}
.tip-icon {
  font-size: 16px;
  flex: none;
  margin-top: 1px;
}
.tip-text {
  color: var(--text);
}
.tip-info {
  background: rgba(0, 212, 255, .06);
  border-color: rgba(0, 212, 255, .2);
}
.tip-warn {
  background: rgba(255, 91, 30, .08);
  border-color: rgba(255, 91, 30, .3);
}
.tip-warn .tip-text { color: var(--ember2); }
.tip-good {
  background: rgba(0, 220, 130, .07);
  border-color: rgba(0, 220, 130, .25);
}
.tip-good .tip-text { color: #00dc82; }
`;
styleCss += newCss;
fs.writeFileSync('style.css', styleCss);

console.log("Applied trainer tip updates.");
