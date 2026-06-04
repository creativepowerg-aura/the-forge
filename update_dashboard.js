const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

const dashboardFunctions = `
function getWeekSummary() {
  const today = getTodayString();
  const summary = {
    daysCompleted: 0,
    daysPlanned: 0,
    totalSets: 0,
    totalVolume: 0,
    totalMinutes: 0,
    streak: 0,
    muscleVolume: {},
    sessions: []
  };

  ORDER.forEach(k => {
    if (dayMuscles[k]?.includes("rest")) return;
    summary.daysPlanned++;
    const key = getLogKey(today, k);
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const session = JSON.parse(raw);
      summary.sessions.push(session);
      if (session.completed) summary.daysCompleted++;
      summary.totalMinutes += session.duration || 0;
      session.exercises.forEach(e => {
        summary.totalSets += e.done || 0;
        const vol = (e.done || 0) * (e.weight || 0);
        summary.totalVolume += vol;
        session.muscles.forEach(m => {
          summary.muscleVolume[m] = (summary.muscleVolume[m] || 0) + vol;
        });
      });
    } catch(e) {}
  });

  // Calculate streak from log index
  try {
    const index = loadLogIndex();
    let streak = 0;
    let checkDate = new Date();
    for (let i = 0; i < 30; i++) {
      const dateStr = checkDate.toISOString().split("T")[0];
      const hasSession = index.some(id => {
        const key = \`forge:log:\${id}\`;
        try {
          const raw = localStorage.getItem(key);
          if (!raw) return false;
          const s = JSON.parse(raw);
          return s.date === dateStr && s.completed;
        } catch(e) { return false; }
      });
      if (hasSession) { streak++; }
      else if (i > 0) { break; }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    summary.streak = streak;
  } catch(e) {}

  return summary;
}

function renderDashboard() {
  const root = document.getElementById("day");
  const summary = getWeekSummary();
  const completePct = summary.daysPlanned
    ? Math.round(summary.daysCompleted / summary.daysPlanned * 100)
    : 0;

  const muscleRows = Object.entries(summary.muscleVolume)
    .sort((a,b) => b[1] - a[1])
    .map(([muscle, vol]) => {
      const max = Math.max(...Object.values(summary.muscleVolume));
      const barPct = max ? Math.round(vol / max * 100) : 0;
      return \`
        <div class="dash-muscle-row">
          <div class="dash-muscle-label">\${muscle.toUpperCase()}</div>
          <div class="dash-muscle-bar-wrap">
            <div class="dash-muscle-bar" style="width:\${barPct}%"></div>
          </div>
          <div class="dash-muscle-vol">\${vol > 0 ? vol.toLocaleString() + " lb" : "—"}</div>
        </div>\`;
    }).join("");

  const sessionRows = summary.sessions.map(s => \`
    <div class="dash-session-row">
      <div class="dash-session-left">
        <div class="dash-session-muscles">\${s.muscles.map(m => m.toUpperCase()).join(" + ")}</div>
        <div class="dash-session-meta">\${s.duration}min · \${s.exercises.reduce((a,e) => a + e.done, 0)} sets</div>
      </div>
      <div class="dash-session-pct \${s.completed ? "done" : "partial"}">\${s.pct}%</div>
    </div>\`).join("");

  root.innerHTML = \`
    <div class="dashboard">

      <div class="dash-stats-grid">
        <div class="dash-stat">
          <div class="dash-stat-val">\${summary.daysCompleted}<span class="dash-stat-of">/\${summary.daysPlanned}</span></div>
          <div class="dash-stat-label">DAYS DONE</div>
        </div>
        <div class="dash-stat">
          <div class="dash-stat-val">\${summary.totalSets}</div>
          <div class="dash-stat-label">TOTAL SETS</div>
        </div>
        <div class="dash-stat">
          <div class="dash-stat-val">\${summary.totalMinutes}<span class="dash-stat-of">min</span></div>
          <div class="dash-stat-label">TIME TRAINED</div>
        </div>
        <div class="dash-stat \${summary.streak > 0 ? "streak-active" : ""}">
          <div class="dash-stat-val">\${summary.streak}🔥</div>
          <div class="dash-stat-label">DAY STREAK</div>
        </div>
      </div>

      <div class="dash-week-bar">
        <div class="dash-week-fill" style="width:\${completePct}%"></div>
        <div class="dash-week-label">\${completePct}% OF WEEK COMPLETE</div>
      </div>

      \${summary.totalVolume > 0 ? \`
      <div class="dash-section">
        <div class="dash-section-title">VOLUME BY MUSCLE</div>
        \${muscleRows}
      </div>\` : ""}

      \${summary.sessions.length > 0 ? \`
      <div class="dash-section">
        <div class="dash-section-title">THIS WEEK'S SESSIONS</div>
        \${sessionRows}
      </div>\` : \`
      <div class="dash-empty">
        <div class="dash-empty-icon">⚡</div>
        <div class="dash-empty-text">No sessions logged yet this week.<br>Complete your first workout to see your stats here.</div>
      </div>\`}

    </div>\`;
}

document.getElementById("thisWeekBtn").onclick = () => {
  const isDash = document.getElementById("day").querySelector(".dashboard");
  if (isDash) {
    selectDay(current);
  } else {
    renderDashboard();
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  }
};
`;

appJs += dashboardFunctions;
fs.writeFileSync('app.js', appJs);

// 2. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const oldNavTitle = '<span class="nav-title">THIS WEEK</span>';
const newNavTitle = '<button id="thisWeekBtn" class="thisweek-btn">THIS WEEK</button>';
indexHtml = indexHtml.replace(oldNavTitle, newNavTitle);
fs.writeFileSync('index.html', indexHtml);

// 3. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
const newCss = `
.thisweek-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .22em;
  color: #00d4ff;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 0;
}
.thisweek-btn:active { opacity: .7; }

.dashboard { padding-bottom: 24px; }

.dash-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}
.dash-stat {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  text-align: center;
}
.dash-stat.streak-active {
  border-color: rgba(255,160,46,.4);
  background: rgba(255,160,46,.06);
}
.dash-stat-val {
  font-family: 'Anton', sans-serif;
  font-size: 32px;
  letter-spacing: .02em;
  color: #fff;
  line-height: 1;
}
.dash-stat-of {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--dim);
  font-weight: 700;
}
.dash-stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--faint);
  margin-top: 6px;
}
.dash-week-bar {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  height: 36px;
  overflow: hidden;
  margin-bottom: 14px;
}
.dash-week-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  background: linear-gradient(90deg, #00d4ff, #0099cc);
  transition: width .6s ease;
}
.dash-week-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  color: #fff;
}
.dash-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
}
.dash-section-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: .2em;
  color: var(--faint);
  font-weight: 700;
  margin-bottom: 14px;
}
.dash-muscle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.dash-muscle-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  color: var(--dim);
  width: 80px;
  flex: none;
}
.dash-muscle-bar-wrap {
  flex: 1;
  height: 6px;
  background: var(--surface2);
  border-radius: 3px;
  overflow: hidden;
}
.dash-muscle-bar {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #0099cc);
  border-radius: 3px;
  transition: width .5s ease;
}
.dash-muscle-vol {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  width: 70px;
  text-align: right;
  flex: none;
}
.dash-session-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}
.dash-session-row:last-child { border-bottom: none; }
.dash-session-muscles {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}
.dash-session-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  margin-top: 3px;
}
.dash-session-pct {
  font-family: 'Anton', sans-serif;
  font-size: 20px;
  letter-spacing: .04em;
}
.dash-session-pct.done { color: #00dc82; }
.dash-session-pct.partial { color: #00d4ff; }
.dash-empty {
  text-align: center;
  padding: 32px 20px;
}
.dash-empty-icon { font-size: 32px; margin-bottom: 12px; }
.dash-empty-text {
  font-size: 13.5px;
  color: var(--dim);
  line-height: 1.6;
}
`;
styleCss += newCss;
fs.writeFileSync('style.css', styleCss);

console.log("Dashboard created successfully.");
