const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace('<body>', \`<body>
<div id="onboardOverlay" class="onboard-overlay hidden">
  <div id="onboardContent" class="onboard-content"></div>
</div>
<div id="appShell">\`);

// find the last </body> and replace with </div>\n</body>
const lastBodyIndex = indexHtml.lastIndexOf('</body>');
if (lastBodyIndex !== -1) {
  indexHtml = indexHtml.slice(0, lastBodyIndex) + '</div>\n</body>' + indexHtml.slice(lastBodyIndex + 7);
}

fs.writeFileSync('index.html', indexHtml);

// 2. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// We need to replace the entire renderOnboarding function
const renderOnboardingStart = appJs.indexOf('function renderOnboarding() {');
// Find the end of renderOnboarding
// It ends right before "// ----------------------------------------------------" or at the bottom.
// Wait, the previous version ended with "  renderStep(1);\n}"
const renderOnboardingEndMatch = appJs.match(/  renderStep\(1\);\n\}/);
if (renderOnboardingEndMatch) {
  const renderOnboardingEnd = renderOnboardingEndMatch.index + renderOnboardingEndMatch[0].length;
  const newRenderOnboarding = \`function renderOnboarding() {
  const overlay = document.getElementById("onboardOverlay");
  const content = document.getElementById("onboardContent");
  if (!overlay || !content) return;

  // Hide main app
  document.getElementById("appShell").style.display = "none";
  overlay.classList.remove("hidden");

  let step = 1;

  function goToStep(n) {
    content.style.opacity = "0";
    content.style.transform = "translateY(16px)";
    setTimeout(() => {
      step = n;
      renderStep();
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 200);
  }

  function stepDots(current) {
    return \`<div class="onboard-dots">
      \${[1,2,3].map(i => \`<div class="onboard-dot \${i === current ? 'active' : i < current ? 'done' : ''}"></div>\`).join("")}
    </div>\`;
  }

  function renderStep() {
    if (step === 1) {
      content.innerHTML = \`
        <div class="onboard-screen">
          <div class="onboard-glow"></div>
          <div class="onboard-hero">
            <div class="onboard-logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2.1" stroke-linecap="round">
                <path d="M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10"/>
              </svg>
            </div>
            <h1 class="onboard-hero-title">THE<br>FORGE</h1>
            <p class="onboard-hero-tag">HOME BUILT · NO EXCUSES</p>
          </div>
          <div class="onboard-features-list">
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(0,212,255,.12);color:#00d4ff">⚡</div><div><div class="onboard-feat-title">Dynamic workouts</div><div class="onboard-feat-desc">Built around your gear, updated instantly when you add equipment</div></div></div>
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(0,220,130,.1);color:#00dc82">📋</div><div><div class="onboard-feat-title">Full form coaching</div><div class="onboard-feat-desc">Step-by-step cues, breathing, and modifiers for every exercise</div></div></div>
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(255,161,46,.1);color:#ffa12e">🏆</div><div><div class="onboard-feat-title">Progress tracking</div><div class="onboard-feat-desc">PRs, history, weekly dashboard and session logs</div></div></div>
            <div class="onboard-feat"><div class="onboard-feat-icon" style="background:rgba(255,91,30,.1);color:#ff5b1e">🗓️</div><div><div class="onboard-feat-title">Your schedule</div><div class="onboard-feat-desc">Pick your muscles, pair your days, build your perfect split</div></div></div>
          </div>
          <button class="onboard-cta" id="onboardCta1">GET STARTED →</button>
          \${stepDots(1)}
        </div>\`;
      document.getElementById("onboardCta1").onclick = () => goToStep(2);

    } else if (step === 2) {
      const gearHTML = GEAR_CATALOG.map(g => \`
        <div class="onboard-gear-row \${gearState[g.id] ? 'selected' : ''}" data-id="\${g.id}">
          <div class="onboard-gear-row-icon">\${g.icon}</div>
          <div class="onboard-gear-row-info">
            <div class="onboard-gear-row-name">\${g.name}</div>
            <div class="onboard-gear-row-desc">\${g.desc}</div>
          </div>
          <div class="onboard-gear-row-check">\${gearState[g.id] ? '✓' : ''}</div>
        </div>\`).join("");

      content.innerHTML = \`
        <div class="onboard-screen">
          <div class="onboard-screen-header">
            \${stepDots(2)}
            <h2 class="onboard-screen-title">What's in your home gym?</h2>
            <p class="onboard-screen-sub">Select everything you have access to. Your workouts will be built around this — you can update it anytime.</p>
          </div>
          <div class="onboard-gear-scroll">\${gearHTML}</div>
          <button class="onboard-cta" id="onboardCta2">NEXT →</button>
        </div>\`;

      content.querySelectorAll(".onboard-gear-row").forEach(row => {
        row.onclick = () => {
          const id = row.dataset.id;
          gearState[id] = !gearState[id];
          row.classList.toggle("selected", gearState[id]);
          row.querySelector(".onboard-gear-row-check").textContent = gearState[id] ? "✓" : "";
        };
      });

      document.getElementById("onboardCta2").onclick = () => {
        try { localStorage.setItem("forge:gear", JSON.stringify(gearState)); } catch(e) {}
        goToStep(3);
      };

    } else if (step === 3) {
      const scheduleHTML = ORDER.slice(0,6).map((k, idx) => {
        const dayLabel = ["MON","TUE","WED","THU","FRI","SAT"][idx];
        const selected = dayMuscles[k] || [];
        return \`
          <div class="onboard-sched-row">
            <div class="onboard-sched-day">\${dayLabel}</div>
            <div class="onboard-sched-muscles">
              \${selected.map(m => \`<span class="onboard-muscle-tag">\${m.toUpperCase()}</span>\`).join("")}
              \${selected.length === 0 ? \`<span class="onboard-muscle-empty">tap ▼</span>\` : ""}
            </div>
            <div class="onboard-sched-dropdown-wrap">
              <button class="onboard-sched-btn" data-day="\${k}">▼</button>
              <div class="onboard-sched-dropdown hidden" data-day="\${k}">
                \${MUSCLES.filter(m => m.id !== "rest").map(m => \`
                  <div class="onboard-muscle-opt \${selected.includes(m.id) ? 'checked' : ''}"
                    data-day="\${k}" data-muscle="\${m.id}">
                    \${selected.includes(m.id) ? "✓" : "+"} \${m.label}
                  </div>\`).join("")}
              </div>
            </div>
          </div>\`;
      }).join("");

      content.innerHTML = \`
        <div class="onboard-screen">
          <div class="onboard-screen-header">
            \${stepDots(3)}
            <h2 class="onboard-screen-title">Build your weekly split</h2>
            <p class="onboard-screen-sub">Choose which muscles to train each day. Max 2 per day. Classic pairing: Chest+Tri, Back+Bi, Legs, Shoulders.</p>
          </div>
          <div class="onboard-sched-list">\${scheduleHTML}</div>
          <button class="onboard-cta" id="onboardCta3">START TRAINING →</button>
        </div>\`;

      content.querySelectorAll(".onboard-sched-btn").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          content.querySelectorAll(".onboard-sched-dropdown").forEach(d => {
            if (d.dataset.day !== btn.dataset.day) d.classList.add("hidden");
          });
          content.querySelector(\`.onboard-sched-dropdown[data-day="\${btn.dataset.day}"]\`).classList.toggle("hidden");
        };
      });

      content.querySelectorAll(".onboard-muscle-opt").forEach(opt => {
        opt.onclick = (e) => {
          e.stopPropagation();
          const day = opt.dataset.day;
          const muscle = opt.dataset.muscle;
          const cur = dayMuscles[day] || [];
          if (cur.includes(muscle)) {
            dayMuscles[day] = cur.filter(m => m !== muscle);
          } else {
            if (muscle === "mobility") {
              dayMuscles[day] = [muscle];
            } else {
              const filtered = cur.filter(m => m !== "rest" && m !== "mobility");
              if (filtered.length >= 2) return;
              dayMuscles[day] = [...filtered, muscle];
            }
          }
          renderStep();
        };
      });

      document.addEventListener("click", () => {
        content.querySelectorAll(".onboard-sched-dropdown").forEach(d => d.classList.add("hidden"));
      }, { once: true });

      document.getElementById("onboardCta3").onclick = () => {
        try { localStorage.setItem("forge:daymuscles", JSON.stringify(dayMuscles)); } catch(e) {}
        completeOnboarding();
        overlay.classList.add("hidden");
        document.getElementById("appShell").style.display = "";
        renderNav();
        selectDay(current);
      };
    }
  }

  content.style.transition = "opacity .2s ease, transform .2s ease";
  renderStep();
}\`;
  
  appJs = appJs.slice(0, renderOnboardingStart) + newRenderOnboarding + appJs.slice(renderOnboardingEnd);
  fs.writeFileSync('app.js', appJs);
}

// 3. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');

// Remove old onboard css
const oldCssRegex = /\\.onboard-wrap \\{[\\s\\S]*?\\.onboard-muscle-opt\\.checked \\{ color: #00d4ff; background: rgba\\(0,212,255,\\.06\\); \\}/;
styleCss = styleCss.replace(oldCssRegex, '');

// Append new css
const newCss = \`
.onboard-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  background:
    radial-gradient(800px 500px at 50% -100px, rgba(0,212,255,.12), transparent 60%),
    radial-gradient(600px 400px at 100% 100%, rgba(0,153,204,.06), transparent 60%),
    #0c0c0e;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.onboard-overlay.hidden { display: none; }
.onboard-content {
  width: 100%;
  max-width: 540px;
  padding: 0 20px 48px;
}
.onboard-screen { padding-top: 48px; }
.onboard-glow {
  position: fixed;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(0,212,255,.15), transparent 70%);
  pointer-events: none;
  z-index: 0;
}
.onboard-hero {
  text-align: center;
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
}
.onboard-logo-mark {
  width: 72px;
  height: 72px;
  border: 2px solid #00d4ff;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: rgba(0,212,255,.08);
  box-shadow: 0 0 40px rgba(0,212,255,.25), inset 0 1px 0 rgba(255,255,255,.05);
  margin: 0 auto 20px;
}
.onboard-logo-mark svg { width: 32px; height: 32px; }
.onboard-hero-title {
  font-family: 'Anton', sans-serif;
  font-size: 64px;
  letter-spacing: .04em;
  line-height: .9;
  background: linear-gradient(180deg, #ffffff 0%, #7a7a8a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
}
.onboard-hero-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: .3em;
  color: #00d4ff;
  font-weight: 700;
}
.onboard-features-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 32px;
}
.onboard-feat {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 14px;
  padding: 14px 16px;
  text-align: left;
}
.onboard-feat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
  flex: none;
}
.onboard-feat-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 3px;
}
.onboard-feat-desc {
  font-size: 12px;
  color: var(--faint);
  line-height: 1.4;
}
.onboard-cta {
  display: block;
  width: 100%;
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
  margin-top: 8px;
}
.onboard-cta:active { transform: scale(.98); }
.onboard-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin: 20px 0 0;
}
.onboard-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border2);
  transition: .2s;
}
.onboard-dot.active {
  background: #00d4ff;
  width: 20px;
  border-radius: 3px;
}
.onboard-dot.done { background: rgba(0,212,255,.3); }
.onboard-screen-header {
  text-align: center;
  margin-bottom: 20px;
}
.onboard-screen-title {
  font-family: 'Anton', sans-serif;
  font-size: 30px;
  letter-spacing: .03em;
  color: #fff;
  margin: 12px 0 8px;
}
.onboard-screen-sub {
  font-size: 13.5px;
  color: var(--dim);
  line-height: 1.6;
  max-width: 380px;
  margin: 0 auto;
}
.onboard-gear-scroll {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 16px;
  max-height: 420px;
  overflow-y: auto;
}
.onboard-gear-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 11px 14px;
  cursor: pointer;
  transition: .15s;
}
.onboard-gear-row.selected {
  border-color: rgba(0,212,255,.4);
  background: rgba(0,212,255,.06);
}
.onboard-gear-row-icon { font-size: 20px; flex: none; }
.onboard-gear-row-info { flex: 1; }
.onboard-gear-row-name { font-size: 13.5px; font-weight: 700; color: var(--text); }
.onboard-gear-row-desc { font-size: 11.5px; color: var(--faint); margin-top: 2px; }
.onboard-gear-row-check {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #00d4ff;
  flex: none;
  width: 20px;
  text-align: center;
}
\`;
styleCss += newCss;
fs.writeFileSync('style.css', styleCss);
console.log("Applied onboarding redesign");
