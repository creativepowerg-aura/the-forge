const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

const endOfRenderDay = `  root.querySelectorAll("[data-w]").forEach(inp => inp.onchange = () => {
    const k = inp.dataset.w; 
    state[k] = state[k] || {done: 0, weight: ""}; 
    state[k].weight = inp.value.trim(); 
    saveDay(current, state);
  });
}`;

const endOfRenderDayReplacement = `  root.querySelectorAll("[data-w]").forEach(inp => inp.onchange = () => {
    const k = inp.dataset.w; 
    state[k] = state[k] || {done: 0, weight: ""}; 
    state[k].weight = inp.value.trim(); 
    saveDay(current, state);
  });

  // Calculate pct and render finish section
  const cp = buildPlan()[current];
  if (cp && cp.type === "lift") {
    let t = 0, d = 0;
    (cp.ex || []).forEach(e => {
      if (e.trimmed) return;
      t += e.sets;
      d += Math.min((state[e.id]?.done || 0), e.sets);
    });
    const p = t ? Math.round(d / t * 100) : 0;
    renderFinishBtn(p);
  }
}`;

appJs = appJs.replace(endOfRenderDay, endOfRenderDayReplacement);

const newModuleLevelFunctions = `
function getLogKey(dateStr, dayKey) {
  return \`forge:log:\${dateStr}-\${dayKey}\`;
}

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

function loadLogIndex() {
  try {
    const raw = localStorage.getItem("forge:log:index");
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveLogIndex(index) {
  try { localStorage.setItem("forge:log:index", JSON.stringify(index)); } catch(e) {}
}

function saveSession(dayKey, pct) {
  const today = getTodayString();
  const key = getLogKey(today, dayKey);
  const plan = buildPlan()[dayKey];

  const exercises = (plan.ex || []).map(e => {
    const s = state[e.id] || {};
    const done = Math.min(s.done || 0, e.sets);
    const weight = parseFloat(s.weight) || 0;
    const prKey = \`forge:prs\`;
    let isPR = false;
    try {
      const prs = JSON.parse(localStorage.getItem(prKey) || "{}");
      if (weight > 0 && (!prs[e.id] || weight > prs[e.id])) {
        prs[e.id] = weight;
        localStorage.setItem(prKey, JSON.stringify(prs));
        isPR = true;
      }
    } catch(err) {}
    return { id: e.id, name: e.name, sets: e.sets, done, weight, pr: isPR };
  });

  const session = {
    id: \`\${today}-\${dayKey}\`,
    date: today,
    dayKey,
    muscles: dayMuscles[dayKey] || [],
    completed: pct >= 80,
    pct,
    duration: getTimerMinutes(),
    exercises
  };

  try {
    localStorage.setItem(key, JSON.stringify(session));
    const index = loadLogIndex();
    if (!index.includes(session.id)) {
      index.unshift(session.id);
      saveLogIndex(index);
    }
  } catch(e) {}

  stopTimer();
  return session;
}

function loadTodaySession(dayKey) {
  const today = getTodayString();
  const key = getLogKey(today, dayKey);
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function renderFinishBtn(pct) {
  const existing = document.getElementById("finishSection");
  if (existing) existing.remove();

  const session = loadTodaySession(current);
  const el = document.createElement("div");
  el.id = "finishSection";

  if (session && session.completed) {
    // Already completed — show completion banner
    const prs = session.exercises.filter(e => e.pr);
    el.innerHTML = \`
      <div class="complete-banner">
        <div class="complete-icon">✓</div>
        <div class="complete-meta">
          <div class="complete-title">WORKOUT COMPLETE</div>
          <div class="complete-stats">
            \${session.duration}min · \${session.pct}% · \${session.exercises.reduce((a,e) => a + e.done, 0)} sets
          </div>
          \${prs.length ? \`<div class="complete-prs">🏆 \${prs.length} new PR\${prs.length > 1 ? "s" : ""}: \${prs.map(e => e.name).join(", ")}</div>\` : ""}
        </div>
      </div>\`;
  } else if (pct >= 50) {
    // Show finish button when 50%+ done
    el.innerHTML = \`
      <button class="finish-btn" id="finishBtn">
        \${pct >= 80 ? "✓ FINISH WORKOUT" : \`FINISH EARLY · \${pct}% DONE\`}
      </button>\`;
  } else {
    return; // Don't show anything below 50%
  }

  document.getElementById("day").appendChild(el);

  const btn = document.getElementById("finishBtn");
  if (btn) {
    btn.onclick = () => {
      const currentPct = (() => {
        const p = buildPlan()[current];
        let total = 0, done = 0;
        (p.ex || []).forEach(e => {
          if (e.trimmed) return;
          total += e.sets;
          done += Math.min((state[e.id]?.done || 0), e.sets);
        });
        return total ? Math.round(done / total * 100) : 0;
      })();
      saveSession(current, currentPct);
      renderDay();
    };
  }
}
`;

appJs += newModuleLevelFunctions;
fs.writeFileSync('app.js', appJs);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
styleCss += `
.finish-btn {
  display: block;
  width: 100%;
  margin: 20px 0 8px;
  padding: 16px;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: #000;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: .14em;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: .15s;
}
.finish-btn:active { transform: scale(.98); }

.complete-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, rgba(0,212,255,.1), rgba(0,153,204,.05));
  border: 1px solid rgba(0,212,255,.3);
  border-radius: 16px;
  padding: 18px 20px;
  margin: 20px 0 8px;
}
.complete-icon {
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: #000;
  font-size: 20px;
  font-weight: 900;
  display: grid;
  place-items: center;
}
.complete-title {
  font-family: 'Anton', sans-serif;
  font-size: 16px;
  letter-spacing: .08em;
  color: #fff;
}
.complete-stats {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--dim);
  margin-top: 4px;
  letter-spacing: .06em;
}
.complete-prs {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #00d4ff;
  margin-top: 6px;
  letter-spacing: .04em;
}
`;
fs.writeFileSync('style.css', styleCss);

console.log("Updated finish button logic.");
