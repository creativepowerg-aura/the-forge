const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// A. Inject the module level functions
const moduleLevelFunctions = `
function loadPRs() {
  try {
    const raw = localStorage.getItem("forge:prs");
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function getExerciseHistory(exerciseId) {
  try {
    const index = loadLogIndex();
    const history = [];
    index.forEach(id => {
      const raw = localStorage.getItem(\`forge:log:\${id}\`);
      if (!raw) return;
      const session = JSON.parse(raw);
      const ex = session.exercises?.find(e => e.id === exerciseId);
      if (ex && ex.weight > 0) {
        history.push({
          date: session.date,
          weight: ex.weight,
          sets: ex.done,
          pr: ex.pr
        });
      }
    });
    return history.sort((a,b) => a.date.localeCompare(b.date));
  } catch(e) { return []; }
}

function renderPRBadge(exerciseId) {
  const prs = loadPRs();
  const pr = prs[exerciseId];
  if (!pr) return "";
  return \`<div class="pr-badge">🏆 PR: \${pr} lb</div>\`;
}
`;
appJs += moduleLevelFunctions;

// B. Inject historyHTML and prBadge into openForm
const openFormTarget1 = `const subtitle = e.target.toLowerCase().includes(e.grp.toLowerCase()) || e.grp.toLowerCase().includes(e.target.toLowerCase())
    ? e.grp 
    : \`\${e.grp} · \${e.target}\`;`;

const openFormReplacement1 = `const subtitle = e.target.toLowerCase().includes(e.grp.toLowerCase()) || e.grp.toLowerCase().includes(e.target.toLowerCase())
    ? e.grp 
    : \`\${e.grp} · \${e.target}\`;

  const history = getExerciseHistory(e.id);
  const historyHTML = history.length > 1 ? \`
    <div class="fsec">
      <div class="label">WEIGHT HISTORY</div>
      <div class="history-chart">
        \${history.slice(-8).map((h, i, arr) => {
          const max = Math.max(...arr.map(x => x.weight));
          const heightPct = Math.round((h.weight / max) * 100);
          return \`
            <div class="history-bar-wrap">
              <div class="history-bar-val">\${h.weight}</div>
              <div class="history-bar" style="height:\${heightPct}%" class="\${h.pr ? 'is-pr' : ''}"></div>
              <div class="history-bar-date">\${h.date.slice(5)}</div>
            </div>\`;
        }).join("")}
      </div>
    </div>\` : "";

  const prBadge = renderPRBadge(e.id);`;

appJs = appJs.replace(openFormTarget1, openFormReplacement1);

// C. Inject ${prBadge} after .fhead and ${historyHTML} before .fchips
const openFormTarget2 = `  <div class="fhead">
    <h2>\${e.name}</h2>
    <div class="ftarget">\${subtitle}</div>
  </div>`;
const openFormReplacement2 = `  <div class="fhead">
    <h2>\${e.name}</h2>
    <div class="ftarget">\${subtitle}</div>
  </div>
  \${prBadge}`;
appJs = appJs.replace(openFormTarget2, openFormReplacement2);

const openFormTarget3 = `  <div class="fchips">\${e.gear.map(g => \`<span class="chip">\${g}</span>\`).join("")}</div>`;
const openFormReplacement3 = `  \${historyHTML}
  <div class="fchips">\${e.gear.map(g => \`<span class="chip">\${g}</span>\`).join("")}</div>`;
appJs = appJs.replace(openFormTarget3, openFormReplacement3);

// D. Inject card PR badge in renderDay()
const renderDayTarget = `<div class="cname">\${e.name}</div>`;
const renderDayReplacement = `<div class="cname">\${e.name}</div>
          \${(() => {
            const prs = loadPRs();
            const st = state[e.id] || {};
            const weight = parseFloat(st.weight) || 0;
            const pr = prs[e.id];
            if (pr && weight >= pr) return \`<div class="card-pr-badge">🏆 PR</div>\`;
            if (pr) return \`<div class="card-pr-target">↑ \${pr} lb PR</div>\`;
            return "";
          })()}`;
appJs = appJs.replace(renderDayTarget, renderDayReplacement);

fs.writeFileSync('app.js', appJs);

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
styleCss += `
.pr-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  color: #ffa12e;
  background: rgba(255,161,46,.1);
  border: 1px solid rgba(255,161,46,.3);
  border-radius: 8px;
  padding: 6px 12px;
  margin: 12px 0 4px;
}
.history-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 80px;
  padding: 0 4px;
}
.history-bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
}
.history-bar-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  color: var(--faint);
}
.history-bar {
  width: 100%;
  background: linear-gradient(180deg, #00d4ff, #0099cc);
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  transition: height .4s ease;
}
.history-bar.is-pr {
  background: linear-gradient(180deg, #ffa12e, #d9381e);
}
.history-bar-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7px;
  color: var(--faint);
  letter-spacing: .04em;
}
.card-pr-badge {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .1em;
  color: #ffa12e;
  background: rgba(255,161,46,.12);
  border: 1px solid rgba(255,161,46,.3);
  border-radius: 6px;
  padding: 2px 7px;
  margin-top: 4px;
}
.card-pr-target {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: var(--faint);
  letter-spacing: .08em;
  margin-top: 4px;
}
`;
fs.writeFileSync('style.css', styleCss);

console.log("Updated PR tracking logic.");
