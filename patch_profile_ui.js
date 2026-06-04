const fs = require('fs');

// 1. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

const targetStub = `function renderProfileAvatar() {
  // Implemented in next step
}`;

const newImpl = `function renderProfileAvatar() {
  const profile = getProfile(activeProfileId);
  if (!profile) return;

  const existing = document.getElementById("profileAvatar");
  if (existing) existing.remove();

  const btn = document.createElement("button");
  btn.id = "profileAvatar";
  btn.className = "profile-avatar";
  btn.style.background = profile.color;
  btn.textContent = profile.name.charAt(0).toUpperCase();
  btn.onclick = () => renderProfileSheet();

  const header = document.querySelector("header .brand");
  if (header) header.parentNode.insertBefore(btn, header.nextSibling);
}

function renderProfileSheet() {
  const existing = document.getElementById("profileSheet");
  if (existing) existing.remove();

  const profiles = getProfileList();
  const sheet = document.createElement("div");
  sheet.id = "profileSheet";
  sheet.className = "profile-sheet-overlay";

  const profileRows = profiles.map(id => {
    const p = getProfile(id);
    if (!p) return "";
    const isActive = id === activeProfileId;
    return \`<div class="profile-row \${isActive ? 'active' : ''}" data-id="\${id}">
      <div class="profile-row-avatar" style="background:\${p.color}">\${p.name.charAt(0).toUpperCase()}</div>
      <div class="profile-row-info">
        <div class="profile-row-name">\${p.name}</div>
        \${isActive ? '<div class="profile-row-active">ACTIVE</div>' : ''}
      </div>
      \${!isActive ? \`<button class="profile-row-delete" data-id="\${id}">✕</button>\` : ''}
    </div>\`;
  }).join("");

  sheet.innerHTML = \`
    <div class="profile-sheet">
      <div class="grab"></div>
      <div class="profile-sheet-title">PROFILES</div>
      <div class="profile-list">\${profileRows}</div>
      <div class="profile-add-wrap">
        <input id="newProfileName" class="profile-name-input" placeholder="New profile name..." maxlength="20">
        <div class="profile-colors">
          \${["#00d4ff","#00dc82","#ff5b1e","#ffa12e","#a855f7","#ec4899","#f43f5e","#6366f1"].map(c =>
            \`<div class="color-dot" data-color="\${c}" style="background:\${c}"></div>\`
          ).join("")}
        </div>
        <button class="profile-add-btn" id="addProfileBtn">+ ADD PROFILE</button>
      </div>
      <button class="closeb" id="closeProfileSheet">DONE</button>
    </div>\`;

  document.body.appendChild(sheet);

  // Switch profile
  sheet.querySelectorAll(".profile-row").forEach(row => {
    row.onclick = (e) => {
      if (e.target.classList.contains("profile-row-delete")) return;
      const id = row.dataset.id;
      if (id === activeProfileId) return;
      setActiveProfileId(id);
      activeProfileId = id;
      initGear();
      renderNav();
      selectDay(current);
      renderProfileAvatar();
      sheet.remove();
    };
  });

  // Delete profile
  sheet.querySelectorAll(".profile-row-delete").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const p = getProfile(id);
      if (confirm(\`Delete profile "\${p?.name}"? All data will be lost.\`)) {
        deleteProfile(id);
        renderProfileSheet();
      }
    };
  });

  // Color selection
  let selectedColor = "#00d4ff";
  sheet.querySelectorAll(".color-dot").forEach(dot => {
    dot.onclick = () => {
      sheet.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
      dot.classList.add("selected");
      selectedColor = dot.dataset.color;
    };
  });
  sheet.querySelector(".color-dot").classList.add("selected");

  // Add profile
  document.getElementById("addProfileBtn").onclick = () => {
    const name = document.getElementById("newProfileName").value.trim();
    if (!name) return;
    const profile = createProfile(name, selectedColor);
    setActiveProfileId(profile.id);
    activeProfileId = profile.id;
    initGear();
    sheet.remove();
    renderOnboarding();
    renderProfileAvatar();
  };

  // Close
  document.getElementById("closeProfileSheet").onclick = () => sheet.remove();
  sheet.onclick = (e) => { if (e.target.id === "profileSheet") sheet.remove(); };
}`;

if (appJs.includes(targetStub)) {
  appJs = appJs.replace(targetStub, newImpl);
  fs.writeFileSync('app.js', appJs);
  console.log("Injected profile UI logic into app.js");
} else {
  console.error("Could not find renderProfileAvatar stub in app.js");
}

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');

const cssAdditions = `
/* Profile UI */
.profile-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,.2);
  color: #000;
  font-family: 'Anton', sans-serif;
  font-size: 15px;
  cursor: pointer;
  display: grid;
  place-items: center;
  flex: none;
  transition: .15s;
  margin-left: 10px;
}
.profile-avatar:hover { transform: scale(1.08); border-color: rgba(255,255,255,.4); }

.profile-sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0,0,0,.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.profile-sheet {
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: 22px 22px 0 0;
  width: 100%;
  max-width: 680px;
  padding: 10px 20px 34px;
  animation: up .3s cubic-bezier(.2,.8,.2,1);
}
.profile-sheet-title {
  font-family: 'Anton', sans-serif;
  font-size: 16px;
  letter-spacing: .1em;
  margin-bottom: 16px;
  text-align: center;
}
.profile-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.profile-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  transition: .15s;
}
.profile-row.active {
  border-color: rgba(0,212,255,.4);
  background: rgba(0,212,255,.06);
}
.profile-row-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: 'Anton', sans-serif;
  font-size: 16px;
  color: #000;
  flex: none;
}
.profile-row-info { flex: 1; }
.profile-row-name { font-size: 14px; font-weight: 700; color: var(--text); }
.profile-row-active {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: .14em;
  color: #00d4ff;
  margin-top: 3px;
}
.profile-row-delete {
  background: transparent;
  border: 1px solid var(--border2);
  border-radius: 6px;
  color: var(--faint);
  padding: 4px 8px;
  cursor: pointer;
  font-size: 11px;
  flex: none;
}
.profile-row-delete:hover { border-color: #f43f5e; color: #f43f5e; }
.profile-add-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
}
.profile-name-input {
  width: 100%;
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: 10px 14px;
  color: var(--text);
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  outline: none;
}
.profile-name-input:focus { border-color: #00d4ff; }
.profile-colors {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.color-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: .15s;
}
.color-dot.selected {
  border-color: #fff;
  transform: scale(1.15);
}
.profile-add-btn {
  width: 100%;
  padding: 11px;
  background: transparent;
  border: 1px dashed var(--border2);
  border-radius: 10px;
  color: var(--dim);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  cursor: pointer;
  transition: .15s;
}
.profile-add-btn:hover { border-color: #00d4ff; color: #00d4ff; }
`;

styleCss += cssAdditions;
fs.writeFileSync('style.css', styleCss);
console.log("Injected profile styles into style.css");
