const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

const renderHistoryFn = `
function renderHistory() {
  const root = document.getElementById("day");
  const index = loadLogIndex();

  if (index.length === 0) {
    root.innerHTML = \`
      <div class="hist-header">
        <button class="hist-back" id="histBack">← BACK</button>
        <h2 class="hist-title">HISTORY</h2>
      </div>
      <div class="dash-empty">
        <div class="dash-empty-icon">📋</div>
        <div class="dash-empty-text">No workout history yet.<br>Complete your first session to start tracking.</div>
      </div>\`;
    document.getElementById("histBack").onclick = () => renderDashboard();
    return;
  }

  // Group sessions by week
  const weeks = {};
  index.forEach(id => {
    try {
      const raw = localStorage.getItem(\`forge:log:\${id}\`);
      if (!raw) return;
      const session = JSON.parse(raw);
      const date = new Date(session.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay() + 1);
      const weekKey = weekStart.toISOString().split("T")[0];
      if (!weeks[weekKey]) weeks[weekKey] = [];
      weeks[weekKey].push(session);
    } catch(e) {}
  });

  const weekHTML = Object.entries(weeks)
    .sort((a,b) => b[0].localeCompare(a[0]))
    .map(([weekKey, sessions]) => {
      const weekDate = new Date(weekKey);
      const weekLabel = weekDate.toLocaleDateString("en-US", { month:"short", day:"numeric" });
      const totalSets = sessions.reduce((a,s) => a + s.exercises.reduce((b,e) => b + e.done, 0), 0);
      const totalMins = sessions.reduce((a,s) => a + (s.duration || 0), 0);
      const completed = sessions.filter(s => s.completed).length;

      const sessionHTML = sessions
        .sort((a,b) => b.date.localeCompare(a.date))
        .map(s => {
          const prs = s.exercises.filter(e => e.pr);
          const topLifts = s.exercises
            .filter(e => e.weight > 0)
            .sort((a,b) => b.weight - a.weight)
            .slice(0,3)
            .map(e => \`\${e.name}: \${e.weight}lb\`)
            .join(" · ");

          return \`
            <div class="hist-session" data-id="\${s.id}">
              <div class="hist-session-top">
                <div class="hist-session-left">
                  <div class="hist-session-muscles">
                    \${s.muscles.map(m => m.toUpperCase()).join(" + ")}
                  </div>
                  <div class="hist-session-date">
                    \${new Date(s.date).toLocaleDateString("en-US", {weekday:"short", month:"short", day:"numeric"})}
                    · \${s.duration}min
                  </div>
                </div>
                <div class="hist-session-right">
                  <div class="hist-pct \${s.completed ? "done" : "partial"}">\${s.pct}%</div>
                  <div class="hist-sets">\${s.exercises.reduce((a,e) => a + e.done, 0)} sets</div>
                </div>
              </div>
              \${topLifts ? \`<div class="hist-top-lifts">\${topLifts}</div>\` : ""}
              \${prs.length ? \`<div class="hist-prs">🏆 PR: \${prs.map(e => e.name).join(", ")}</div>\` : ""}
            </div>\`;
        }).join("");

      return \`
        <div class="hist-week">
          <div class="hist-week-header">
            <div class="hist-week-label">WEEK OF \${weekLabel.toUpperCase()}</div>
            <div class="hist-week-meta">\${completed}/\${sessions.length} days · \${totalSets} sets · \${totalMins}min</div>
          </div>
          \${sessionHTML}
        </div>\`;
    }).join("");

  root.innerHTML = \`
    <div class="hist-header">
      <button class="hist-back" id="histBack">← BACK</button>
      <h2 class="hist-title">HISTORY</h2>
      <div class="hist-count">\${index.length} sessions</div>
    </div>
    \${weekHTML}\`;

  document.getElementById("histBack").onclick = () => renderDashboard();
}
`;

appJs += renderHistoryFn;

const oldSessionsHTML = `      \${summary.sessions.length > 0 ? \`
      <div class="dash-section">
        <div class="dash-section-title">THIS WEEK'S SESSIONS</div>
        \${sessionRows}
      </div>\` : \``;

const newSessionsHTML = `      \${summary.sessions.length > 0 ? \`
      <div class="dash-section">
        <div class="dash-section-title">THIS WEEK'S SESSIONS</div>
        \${sessionRows}
        <button class="hist-view-all" id="viewHistoryBtn">VIEW ALL HISTORY →</button>
      </div>\` : \``;

appJs = appJs.replace(oldSessionsHTML, newSessionsHTML);

// find where renderDashboard sets innerHTML and inject histBtn handler
const dashboardInnerHTMLEnd = `    </div>\`;\n}`;
const dashboardInnerHTMLEndReplacement = `    </div>\`;\n
  const histBtn = document.getElementById("viewHistoryBtn");
  if (histBtn) histBtn.onclick = () => renderHistory();
}`;

appJs = appJs.replace(dashboardInnerHTMLEnd, dashboardInnerHTMLEndReplacement);

fs.writeFileSync('app.js', appJs);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
const newCss = `
.hist-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-top: 4px;
}
.hist-back {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  color: #00d4ff;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex: none;
}
.hist-back:active { opacity: .6; }
.hist-title {
  font-family: 'Anton', sans-serif;
  font-size: 22px;
  letter-spacing: .06em;
  flex: 1;
}
.hist-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  letter-spacing: .1em;
}
.hist-week {
  margin-bottom: 20px;
}
.hist-week-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 4px;
}
.hist-week-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .16em;
  color: #00d4ff;
}
.hist-week-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  letter-spacing: .06em;
}
.hist-session {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: border-color .15s;
}
.hist-session:hover { border-color: var(--border2); }
.hist-session-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.hist-session-muscles {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: .02em;
}
.hist-session-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  margin-top: 4px;
  letter-spacing: .06em;
}
.hist-session-right {
  text-align: right;
  flex: none;
}
.hist-pct {
  font-family: 'Anton', sans-serif;
  font-size: 20px;
  letter-spacing: .04em;
}
.hist-pct.done { color: #00dc82; }
.hist-pct.partial { color: #00d4ff; }
.hist-sets {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--faint);
  margin-top: 2px;
}
.hist-top-lifts {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--dim);
  letter-spacing: .04em;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
  line-height: 1.6;
}
.hist-prs {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #ffa12e;
  margin-top: 6px;
  letter-spacing: .04em;
}
.hist-view-all {
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 12px;
  background: transparent;
  border: 1px solid var(--border2);
  border-radius: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  color: var(--dim);
  cursor: pointer;
  transition: .15s;
}
.hist-view-all:hover {
  border-color: #00d4ff;
  color: #00d4ff;
}
`;
styleCss += newCss;
fs.writeFileSync('style.css', styleCss);

console.log("Updated history view logic.");
