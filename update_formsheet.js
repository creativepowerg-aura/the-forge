const fs = require('fs');

// 1 & 2 & 3 Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// Change 1 & 2: Update openForm
const oldOpenFormRegex = /function openForm\(i\)\{[\s\S]*?document\.getElementById\("formSheet"\)\.innerHTML = `[\s\S]*?`;\n/;
const newOpenForm = `function openForm(i){
  const currentPlan = buildPlan();
  const e = currentPlan[current].ex[i];
  
  const subtitle = e.target.toLowerCase().includes(e.grp.toLowerCase()) || e.grp.toLowerCase().includes(e.target.toLowerCase())
    ? e.grp 
    : \`\${e.grp} · \${e.target}\`;

  document.getElementById("formSheet").innerHTML = \`
  <div class="grab"></div>
  <div class="fhead">
    <h2>\${e.name}</h2>
    <div class="ftarget">\${subtitle}</div>
  </div>
  <div class="fstats">
    <div class="fstat"><div class="k">SETS</div><div class="v">\${e.sets}</div></div>
    <div class="fstat"><div class="k">REPS</div><div class="v">\${e.reps}</div></div>
    <div class="fstat"><div class="k">REST</div><div class="v">\${e.rest}</div></div>
    <div class="fstat"><div class="k">TEMPO</div><div class="v">\${e.tempo}</div></div>
  </div>
  \${e.why ? \`<div class="fwhy"><span class="fwhy-label">WHY THIS MOVE</span><p>\${e.why}</p></div>\` : ""}
  <div class="fsec"><div class="label">HOW TO DO IT</div>
    \${e.steps.map((s,n) => \`<div class="step"><div class="sn">\${n+1}</div><p>\${s}</p></div>\`).join("")}
  </div>
  \${e.breath ? \`<div class="fbreath"><span>🫁</span><p><b>Breathing:</b> \${e.breath}</p></div>\` : ""}
  <div class="fsec"><div class="label">AVOID THIS</div>
    <div class="avoid">
      <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <p>\${e.mistake}</p>
    </div>
  </div>
  \${e.easier || e.harder ? \`
  <div class="fsec"><div class="label">MODIFIERS</div>
    \${e.easier ? \`<div class="modifier easier"><span class="mod-label">EASIER</span><p>\${e.easier}</p></div>\` : ""}
    \${e.harder ? \`<div class="modifier harder"><span class="mod-label">HARDER</span><p>\${e.harder}</p></div>\` : ""}
  </div>\` : ""}
  <div class="fchips">\${e.gear.map(g => \`<span class="chip">\${g}</span>\`).join("")}</div>
  <button class="closeb" id="closeForm">BACK TO WORKOUT</button>
\`;\n`;

appJs = appJs.replace(oldOpenFormRegex, newOpenForm);

// Change 3: Add properties to chest-incline-press, chest-floor-press, tri-dip-chair
const inclineOld = `mistake:"Letting your elbows flare straight out to the sides. Keep them at about 45° to protect the shoulder."},`;
const inclineNew = `mistake:"Letting your elbows flare straight out to the sides. Keep them at about 45° to protect the shoulder.",
     why: "The incline angle targets the upper chest — the hardest part to develop and the one that gives the chest its full, rounded look.",
     breath: "Inhale on the way down, exhale as you press up.",
     easier: "Reduce the angle — sit more upright to shift load away from the shoulder.",
     harder: "Pause 2 seconds at the bottom stretch before pressing."},`;
appJs = appJs.replace(inclineOld, inclineNew);

const floorOld = `mistake:"Bouncing the elbows off the floor. Pause for a beat at the bottom, then press."},`;
const floorNew = `mistake:"Bouncing the elbows off the floor. Pause for a beat at the bottom, then press.",
     why: "The floor limits range and removes shoulder strain, letting you move heavier weight safely — great for raw pressing strength.",
     breath: "Inhale as you lower, exhale on the press.",
     easier: "Use lighter dumbbells and focus on feeling the chest squeeze at the top.",
     harder: "3-second lowering phase on every rep."},`;
appJs = appJs.replace(floorOld, floorNew);

const dipOld = `mistake:"Elbows flaring outward. Keep them tracking straight behind you."},`;
const dipNew = `mistake:"Elbows flaring outward. Keep them tracking straight behind you.",
     why: "Dips are one of the few exercises that load the tricep through its full range of motion — more effective than pushdowns or kickbacks.",
     breath: "Inhale on the way down, exhale as you press up.",
     easier: "Bend your knees and bring feet closer to the chair to reduce load.",
     harder: "Place a dumbbell on your lap or slow the descent to 4 seconds."},`;
// Only replace the first occurrence (mon day), or replace all. 
// tri-dip-chair is also in fri. Let's just replace the string. It's safe to do globally if needed, but let's just do first match.
appJs = appJs.replace(dipOld, dipNew);

fs.writeFileSync('app.js', appJs);

// 4 & 5 Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');

// Replace .closeb entirely
const oldClosebRegex = /\.closeb \{[\s\S]*?cursor: pointer;\n\}/;
const newCloseb = `.closeb {
  display: block;
  width: 100%;
  margin-top: 18px;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: #000;
  font-weight: 800;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 13px;
  letter-spacing: .1em;
  cursor: pointer;
}`;
if (oldClosebRegex.test(styleCss)) {
    styleCss = styleCss.replace(oldClosebRegex, newCloseb);
} else {
    styleCss += '\n' + newCloseb + '\n.closeb:active { transform: scale(.99); }\n';
}

// Ensure closeb:active exists if we just replaced it without it
if (!styleCss.includes('.closeb:active')) {
    styleCss += '\n.closeb:active { transform: scale(.99); }\n';
}

const newStyles = `
.fwhy {
  background: rgba(0, 212, 255, .06);
  border: 1px solid rgba(0, 212, 255, .15);
  border-radius: 14px;
  padding: 14px 15px;
  margin-top: 18px;
}
.fwhy-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  letter-spacing: .18em;
  color: #00d4ff;
  display: block;
  margin-bottom: 7px;
}
.fwhy p {
  font-size: 13.5px;
  color: var(--text);
  line-height: 1.55;
}
.fbreath {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(0, 212, 255, .04);
  border: 1px solid rgba(0, 212, 255, .12);
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 8px;
  font-size: 13px;
  color: var(--dim);
  line-height: 1.5;
}
.fbreath b { color: var(--text); }
.modifier {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  margin-bottom: 8px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text);
}
.mod-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .16em;
  padding: 3px 8px;
  border-radius: 6px;
  flex: none;
  margin-top: 2px;
}
.easier {
  background: rgba(0, 220, 130, .06);
  border: 1px solid rgba(0, 220, 130, .2);
}
.easier .mod-label {
  background: rgba(0, 220, 130, .15);
  color: #00dc82;
}
.harder {
  background: rgba(255, 91, 30, .06);
  border: 1px solid rgba(255, 91, 30, .2);
}
.harder .mod-label {
  background: rgba(255, 91, 30, .15);
  color: #ff5b1e;
}
`;
styleCss += newStyles;

fs.writeFileSync('style.css', styleCss);
console.log("Updated form sheet successfully.");
