const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const targetHtml = `  let html = \`<div class="dayhead">
    <div class="meta">
      <h2>\${p.title}</h2>
      <div class="sub">\${p.sub} · \${p.ex.length} exercises · \${total} sets</div>
    </div>
    <div class="ring">\${ringSVG(pct)}<div class="pct">\${pct}%</div></div>
  </div>\`;
  
  let lastGrp = null;`;

const replacementHtml = `  let html = \`<div class="dayhead">
    <div class="meta">
      <h2>\${p.title}</h2>
      <div class="sub">\${p.sub} · \${p.ex.length} exercises · \${total} sets</div>
    </div>
    <div class="ring">\${ringSVG(pct)}<div class="pct">\${pct}%</div></div>
  </div>\`;

  // Warm-up collapsible section
  if (p.warmup) {
    const wu = p.warmup;
    const wuId = "warmup-" + current;
    const isOpen = wu.collapsed === false;
    html += \`
      <div class="warmup-section" id="\${wuId}">
        <div class="warmup-header" onclick="toggleWarmup('\${wuId}')">
          <span class="warmup-label">⚡ WARM-UP</span>
          <span class="warmup-toggle">\${isOpen ? '▲' : '▼'}</span>
        </div>
        <div class="warmup-body" style="display:\${isOpen ? 'block' : 'none'}">
          \${wu.exercises.map(e => \`
            <div class="warmup-card">
              <div class="warmup-name">\${e.name}</div>
              <div class="warmup-scheme">\${e.sets} × \${e.reps}\${e.rest !== '—' ? ' · rest ' + e.rest : ''}</div>
              <div class="warmup-cue">\${e.steps[0]}</div>
            </div>
          \`).join('')}
        </div>
      </div>\`;
  }
  
  let lastGrp = null;`;

code = code.replace(targetHtml, replacementHtml);

code += `

function toggleWarmup(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const body = section.querySelector(".warmup-body");
  const toggle = section.querySelector(".warmup-toggle");
  const isOpen = body.style.display !== "none";
  body.style.display = isOpen ? "none" : "block";
  toggle.textContent = isOpen ? "▼" : "▲";
}
`;

fs.writeFileSync('app.js', code);
console.log("Applied warmup injection");
