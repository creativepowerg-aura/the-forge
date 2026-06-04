const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const oldRenderRegex = /function renderSchedule\(\) \{[\s\S]*?checkTrainerWarnings\(\);\n\}/;
const newRender = `function renderSchedule() {
  const list = document.getElementById("scheduleList");
  if (!list) return;
  list.innerHTML = "";

  // Work from draftDayMuscles during editing
  WEEK_DAYS.forEach((dayLabel, idx) => {
    const k = draftOrder[idx];
    const selected = draftDayMuscles[k] || [];

    const el = document.createElement("div");
    el.className = "sched-day";
    el.dataset.key = k;

    const selectedHTML = selected.length
      ? selected.map(id => \`<span class="muscle-tag">\${id.toUpperCase()}</span>\`).join("")
      : \`<span class="muscle-tag empty">SELECT</span>\`;

    el.innerHTML = \`
      <div class="sd-left">
        <div class="sd-handle">☰</div>
        <div class="sd-name">\${dayLabel}</div>
      </div>
      <div class="sd-right">
        <div class="sd-selected" data-key="\${k}">\${selectedHTML}</div>
        <div class="sd-dropdown-wrap" data-key="\${k}">
          <button class="sd-open-btn" data-key="\${k}">▼</button>
          <div class="sd-muscle-dropdown hidden" data-key="\${k}">
            \${MUSCLES.filter(m => m.id !== "rest").map(m => {
              const isChecked = selected.includes(m.id);
              const isDisabled = !isChecked && selected.length >= 2;
              return \`<div class="muscle-option \${isChecked ? "checked" : ""} \${isDisabled ? "disabled" : ""}" 
                data-day="\${k}" data-muscle="\${m.id}">
                \${isChecked ? "✓" : "+"} \${m.label}
              </div>\`;
            }).join("")}
          </div>
        </div>
      </div>
    \`;

    // Drag support
    el.draggable = true;
    el.ondragstart = (e) => { e.dataTransfer.setData("text/plain", idx); el.classList.add("dragging"); };
    el.ondragend = () => el.classList.remove("dragging");
    el.ondragover = (e) => e.preventDefault();
    el.ondrop = (e) => {
      e.preventDefault();
      const fromIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
      if (fromIdx === idx || isNaN(fromIdx)) return;
      const temp = draftOrder[fromIdx];
      draftOrder[fromIdx] = draftOrder[idx];
      draftOrder[idx] = temp;
      renderSchedule();
    };

    // Dropdown toggle
    el.querySelector(".sd-open-btn").onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll(".sd-muscle-dropdown").forEach(d => {
        if (d.dataset.key !== k) d.classList.add("hidden");
      });
      el.querySelector(".sd-muscle-dropdown").classList.toggle("hidden");
    };

    // Muscle option select/deselect
    el.querySelectorAll(".muscle-option").forEach(opt => {
      opt.onclick = (e) => {
        e.stopPropagation();
        if (opt.classList.contains("disabled")) return;
        const day = opt.dataset.day;
        const muscle = opt.dataset.muscle;
        let current = draftDayMuscles[day] || [];
        
        // Clear 'rest' if we are adding a real muscle
        if (current.includes("rest")) current = [];

        if (current.includes(muscle)) {
          draftDayMuscles[day] = current.filter(m => m !== muscle);
        } else {
          if (current.length >= 2) return;
          draftDayMuscles[day] = [...current, muscle];
        }
        
        // If we deselected everything, optionally set to rest (or leave empty)
        if (draftDayMuscles[day].length === 0) {
           // We'll leave it empty "SELECT" as requested, so no action needed
        }

        renderSchedule();
      };
    });

    list.appendChild(el);
  });

  // Close dropdowns on outside click
  setTimeout(() => {
    document.addEventListener("click", () => {
      document.querySelectorAll(".sd-muscle-dropdown").forEach(d => d.classList.add("hidden"));
    }, { once: true });
  }, 0);

  checkTrainerWarnings();
}`;

code = code.replace(oldRenderRegex, newRender);

fs.writeFileSync('app.js', code);
console.log("Unlocked Sunday");
