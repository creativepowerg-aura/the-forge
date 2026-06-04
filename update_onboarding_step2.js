const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const stubRegex = /function renderOnboarding\(\)\s*\{\s*document\.getElementById\("day"\)\.innerHTML = "<p style='color:white'>Onboarding coming soon<\/p>";\s*\}/;

const newFn = `function renderOnboarding() {
  // Hide nav during onboarding
  const nav = document.getElementById("nav");
  const header = document.getElementById("mainHeader");
  if (nav) nav.style.display = "none";

  let onboardStep = 1;

  function renderStep(step) {
    const root = document.getElementById("day");

    if (step === 1) {
      root.innerHTML = \`
        <div class="onboard-wrap">
          <div class="onboard-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2.1" stroke-linecap="round">
              <path d="M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10"/>
            </svg>
          </div>
          <h1 class="onboard-title">THE FORGE</h1>
          <p class="onboard-sub">HOME BUILT · NO EXCUSES</p>
          <p class="onboard-body">A home workout app built around your equipment, your schedule, and your goals. No gym required.</p>
          <div class="onboard-features">
            <div class="onboard-feature"><span>⚡</span><span>Dynamic workouts based on your gear</span></div>
            <div class="onboard-feature"><span>📋</span><span>Full form breakdowns for every exercise</span></div>
            <div class="onboard-feature"><span>📈</span><span>Track PRs, history and weekly progress</span></div>
            <div class="onboard-feature"><span>🗓️</span><span>Customize your weekly split</span></div>
          </div>
          <button class="onboard-btn" id="onboardNext1">GET STARTED →</button>
        </div>\`;
      document.getElementById("onboardNext1").onclick = () => renderStep(2);

    } else if (step === 2) {
      // Gear selection step
      const gearHTML = GEAR_CATALOG.map(g => \`
        <div class="onboard-gear-item \${gearState[g.id] ? 'selected' : ''}" data-id="\${g.id}">
          <span class="onboard-gear-icon">\${g.icon}</span>
          <div class="onboard-gear-info">
            <div class="onboard-gear-name">\${g.name}</div>
            <div class="onboard-gear-desc">\${g.desc}</div>
          </div>
          <div class="onboard-gear-check">\${gearState[g.id] ? '✓' : '+'}</div>
        </div>\`).join("");

      root.innerHTML = \`
        <div class="onboard-wrap">
          <div class="onboard-step-label">STEP 1 OF 2</div>
          <h2 class="onboard-step-title">What equipment do you have?</h2>
          <p class="onboard-step-sub">Select everything available to you. Your workouts will be built around this.</p>
          <div class="onboard-gear-list">\${gearHTML}</div>
          <button class="onboard-btn" id="onboardNext2">NEXT →</button>
        </div>\`;

      root.querySelectorAll(".onboard-gear-item").forEach(item => {
        item.onclick = () => {
          const id = item.dataset.id;
          gearState[id] = !gearState[id];
          item.classList.toggle("selected", gearState[id]);
          item.querySelector(".onboard-gear-check").textContent = gearState[id] ? "✓" : "+";
        };
      });

      document.getElementById("onboardNext2").onclick = () => {
        try { localStorage.setItem("forge:gear", JSON.stringify(gearState)); } catch(e) {}
        renderStep(3);
      };

    } else if (step === 3) {
      // Schedule step - simplified version
      const scheduleHTML = ORDER.slice(0,6).map((k, idx) => {
        const dayLabel = ["MON","TUE","WED","THU","FRI","SAT"][idx];
        const selected = dayMuscles[k] || [];
        return \`
          <div class="onboard-sched-row">
            <div class="onboard-sched-day">\${dayLabel}</div>
            <div class="onboard-sched-muscles">
              \${selected.map(m => \`<span class="onboard-muscle-tag">\${m.toUpperCase()}</span>\`).join("")}
              \${selected.length === 0 ? \`<span class="onboard-muscle-empty">tap to set</span>\` : ""}
            </div>
            <div class="onboard-sched-dropdown-wrap">
              <button class="onboard-sched-btn" data-day="\${k}">▼</button>
              <div class="onboard-sched-dropdown hidden" data-day="\${k}">
                \${MUSCLES.filter(m => m.id !== "rest").map(m => \`
                  <div class="onboard-muscle-opt \${selected.includes(m.id) ? 'checked' : ''}" 
                    data-day="\${k}" data-muscle="\${m.id}">
                    \${selected.includes(m.id) ? '✓' : '+'} \${m.label}
                  </div>\`).join("")}
              </div>
            </div>
          </div>\`;
      }).join("");

      root.innerHTML = \`
        <div class="onboard-wrap">
          <div class="onboard-step-label">STEP 2 OF 2</div>
          <h2 class="onboard-step-title">Set your weekly split</h2>
          <p class="onboard-step-sub">Choose which muscles to train each day. Max 2 per day. You can always change this later.</p>
          <div class="onboard-sched-list">\${scheduleHTML}</div>
          <div id="onboardTip" class="trainer-tip tip-info" style="margin-top:14px">
            <span class="tip-icon">💡</span>
            <span class="tip-text">Classic pairing: CHEST + TRICEPS, BACK + BICEPS, then LEGS and SHOULDERS solo.</span>
          </div>
          <button class="onboard-btn" id="onboardFinish">START TRAINING →</button>
        </div>\`;

      // Dropdown logic
      root.querySelectorAll(".onboard-sched-btn").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          root.querySelectorAll(".onboard-sched-dropdown").forEach(d => {
            if (d.dataset.day !== btn.dataset.day) d.classList.add("hidden");
          });
          root.querySelector(\`.onboard-sched-dropdown[data-day="\${btn.dataset.day}"]\`).classList.toggle("hidden");
        };
      });

      root.querySelectorAll(".onboard-muscle-opt").forEach(opt => {
        opt.onclick = (e) => {
          e.stopPropagation();
          const day = opt.dataset.day;
          const muscle = opt.dataset.muscle;
          const current = dayMuscles[day] || [];
          if (current.includes(muscle)) {
            dayMuscles[day] = current.filter(m => m !== muscle);
          } else {
            if (muscle === "rest" || muscle === "mobility") {
              dayMuscles[day] = [muscle];
            } else {
              const filtered = current.filter(m => m !== "rest" && m !== "mobility");
              if (filtered.length >= 2) return;
              dayMuscles[day] = [...filtered, muscle];
            }
          }
          renderStep(3);
        };
      });

      document.addEventListener("click", () => {
        root.querySelectorAll(".onboard-sched-dropdown").forEach(d => d.classList.add("hidden"));
      }, { once: true });

      document.getElementById("onboardFinish").onclick = () => {
        try { localStorage.setItem("forge:daymuscles", JSON.stringify(dayMuscles)); } catch(e) {}
        completeOnboarding();
        if (nav) nav.style.display = "";
        renderNav();
        selectDay(current);
      };
    }
  }

  renderStep(1);
}`;

appJs = appJs.replace(stubRegex, newFn);
fs.writeFileSync('app.js', appJs);
console.log("Onboarding step 2 injected.");
