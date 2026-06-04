const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const oldRender = `function renderSchedule() {
  const list = document.getElementById("scheduleList");
  if(!list) return;
  list.innerHTML = "";
  
  ORDER.forEach((k, idx) => {
    const isSun = idx === 6;
    const el = document.createElement("div");
    el.className = "sched-day" + (isSun ? " locked" : "");
    el.draggable = !isSun;
    el.dataset.idx = idx;
    
    el.innerHTML = \`
      <div class="sd-handle">\${isSun ? '🔒' : '☰'}</div>
      <div class="sd-name">\${WEEK_DAYS[idx]}</div>
      <div class="sd-pill \${isSun ? 'locked-pill' : ''}">\${getBlockName(k)} \${isSun ? '' : '<span class="sd-swap" title="Tap to swap">⮀</span>'}</div>
    \`;
    
    if(!isSun) {
      el.ondragstart = (e) => { e.dataTransfer.setData("text/plain", idx); el.classList.add("dragging"); };
      el.ondragend = () => { el.classList.remove("dragging"); };
      el.ondragover = (e) => { e.preventDefault(); };
      el.ondrop = (e) => {
        e.preventDefault();
        const fromIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if(fromIdx === idx || isNaN(fromIdx)) return;
        
        const temp = ORDER[fromIdx];
        ORDER[fromIdx] = ORDER[idx];
        ORDER[idx] = temp;
        
        checkTrainerWarnings();
        renderSchedule();
      };
      
      el.querySelector(".sd-swap").onclick = () => {
        const swapBlock = prompt("Enter day to swap with (1-6):\\n1:MON 2:TUE 3:WED 4:THU 5:FRI 6:SAT");
        const swapIdx = parseInt(swapBlock, 10) - 1;
        if(swapIdx >= 0 && swapIdx <= 5 && swapIdx !== idx) {
          const temp = ORDER[swapIdx];
          ORDER[swapIdx] = ORDER[idx];
          ORDER[idx] = temp;
          checkTrainerWarnings();
          renderSchedule();
        }
      };
    }
    list.appendChild(el);
  });
  checkTrainerWarnings();
}`;

const newRender = `function renderSchedule() {
  const list = document.getElementById("scheduleList");
  if (!list) return;
  list.innerHTML = "";
  draftOrder.forEach((k, idx) => {
    const isSun = idx === 6;
    const el = document.createElement("div");
    el.className = "sched-day" + (isSun ? " locked" : "");
    el.draggable = !isSun;
    el.dataset.idx = idx;
    el.innerHTML = \`
      <div class="sd-handle">\${isSun ? '🔒' : '☰'}</div>
      <div class="sd-name">\${WEEK_DAYS[idx]}</div>
      <div class="sd-pill \${isSun ? 'locked-pill' : ''}">\${getBlockName(k)}\${isSun ? '' : ' <span class="sd-swap" title="Tap to swap">⇄</span>'}</div>
    \`;
    if (!isSun) {
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
        checkTrainerWarnings();
        renderSchedule();
      };
      el.querySelector(".sd-swap").onclick = () => {
        const options = draftOrder
          .map((k2, i) => i !== idx && i !== 6 ? \`\${i+1}: \${getBlockName(k2)}\` : null)
          .filter(Boolean).join("\\n");
        const swapBlock = prompt(\`Swap "\${getBlockName(k)}" with:\\n\${options}\\n\\nEnter number:\`);
        const swapIdx = parseInt(swapBlock, 10) - 1;
        if (swapIdx >= 0 && swapIdx <= 5 && swapIdx !== idx) {
          const temp = draftOrder[swapIdx];
          draftOrder[swapIdx] = draftOrder[idx];
          draftOrder[idx] = temp;
          checkTrainerWarnings();
          renderSchedule();
        }
      };
    }
    list.appendChild(el);
  });
  checkTrainerWarnings();
}`;

code = code.replace(oldRender, newRender);

const oldSbtn = `sbtn.onclick = () => {
    renderSchedule();
    document.getElementById("scheduleModal").classList.add("open");
  };`;
const newSbtn = `sbtn.onclick = () => {
    draftOrder = [...ORDER];
    renderSchedule();
    document.getElementById("scheduleModal").classList.add("open");
  };`;
code = code.replace(oldSbtn, newSbtn);

const oldSreset = `sreset.onclick = () => {
    ORDER = [...DEFAULT_ORDER];
    renderSchedule();
  };`;
const newSreset = `sreset.onclick = () => {
    draftOrder = [...DEFAULT_ORDER];
    renderSchedule();
  };`;
code = code.replace(oldSreset, newSreset); // the user didn't mention this, but logically we need to update reset too

const oldSsave = `ssave.onclick = () => {
    localStorage.setItem("forge:schedule", JSON.stringify(ORDER));
    document.getElementById("scheduleModal").classList.remove("open");
    renderNav();
    // if current day is moved, we should ideally re-select it, but let's just re-select current
    selectDay(current);
  };`;
const newSsave = `ssave.onclick = () => {
    ORDER = [...draftOrder];
    localStorage.setItem("forge:schedule", JSON.stringify(ORDER));
    renderNav();
    selectDay(current);
    document.getElementById("scheduleModal").classList.remove("open");
  };`;
code = code.replace(oldSsave, newSsave);

// Step 5 + 6 handlers
const newHandlers = `
document.getElementById("cancelScheduleBtn").onclick = () => {
  draftOrder = [];
  document.getElementById("scheduleModal").classList.remove("open");
};

document.getElementById("scheduleModal").onclick = (e) => {
  if (e.target.id === "scheduleModal") {
    draftOrder = [];
    document.getElementById("scheduleModal").classList.remove("open");
  }
};
`;

code += newHandlers;

fs.writeFileSync('app.js', code);
console.log("Updated app.js successfully");
