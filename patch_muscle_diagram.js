const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Insert the diagram logic before historyHTML
const targetConst = 'const historyHTML = ';
const newConst = `const muscleDiagram = typeof buildMuscleDiagram === "function"
    ? buildMuscleDiagram(e.grp, e.target)
    : "";

  const historyHTML = `;

if (appJs.includes(targetConst)) {
  appJs = appJs.replace(targetConst, newConst);
} else {
  console.log("Could not find targetConst in app.js");
}

// Insert the diagram variable into the template
const targetTemplate = `  \${historyHTML}
  <div class="fchips">`;
const newTemplate = `  \${muscleDiagram}
  \${historyHTML}
  <div class="fchips">`;

if (appJs.includes(targetTemplate)) {
  appJs = appJs.replace(targetTemplate, newTemplate);
} else {
  console.log("Could not find targetTemplate in app.js");
}

fs.writeFileSync('app.js', appJs);

let styleCss = fs.readFileSync('style.css', 'utf8');
styleCss += `\n
/* Muscle Diagram */
.muscle-diagram {
  margin-top: 22px;
}
.muscle-diagram-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: .18em;
  color: var(--faint);
  font-weight: 700;
  margin-bottom: 12px;
}
.muscle-diagram-views {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.muscle-svg {
  width: 100px;
  height: auto;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px;
}
`;
fs.writeFileSync('style.css', styleCss);
console.log("Applied muscle diagram patch");
