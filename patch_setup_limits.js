const fs = require('fs');

// Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// Replace initApp auto-creation
const initAppFind = `  if (profiles.length === 0) {
    // Brand new install — create default profile and go to onboarding
    const profile = createProfile("My Profile", "#00d4ff");
    setActiveProfileId(profile.id);
    initGear();
    renderOnboarding();
  }`;

const initAppReplace = `  if (profiles.length === 0) {
    // Brand new install — create default profile and go to onboarding
    renderProfileSetup();
    return;
  }`;

if (appJs.includes(initAppFind)) {
  appJs = appJs.replace(initAppFind, initAppReplace);
}

// Add renderProfileSetup function
const renderProfileSetupFunc = `
function renderProfileSetup() {
  const overlay = document.getElementById("onboardOverlay");
  const content = document.getElementById("onboardContent");
  if (!overlay || !content) return;

  document.getElementById("appShell").style.display = "none";
  overlay.classList.remove("hidden");

  const colors = ["#00d4ff","#00dc82","#ff5b1e","#ffa12e","#a855f7","#ec4899","#f43f5e","#6366f1"];
  let selectedColor = "#00d4ff";

  content.innerHTML = \`
    <div class="onboard-screen">
      <div class="onboard-hero">
        <div class="onboard-logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2.1" stroke-linecap="round">
            <path d="M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10"/>
          </svg>
        </div>
        <h1 class="onboard-hero-title">THE<br>FORGE</h1>
        <p class="onboard-hero-tag">HOME BUILT · NO EXCUSES</p>
      </div>
      <div class="profile-setup-card">
        <div class="profile-setup-label">WHAT'S YOUR NAME?</div>
        <input id="setupName" class="profile-name-input" placeholder="Enter your name..." maxlength="20" autofocus>
        <div class="profile-setup-label" style="margin-top:16px">PICK YOUR COLOR</div>
        <div class="profile-colors">
          \${colors.map((c,i) => \`<div class="color-dot \${i===0?'selected':''}" data-color="\${c}" style="background:\${c}"></div>\`).join("")}
        </div>
      </div>
      <button class="onboard-cta" id="setupContinue">CONTINUE →</button>
    </div>\`;

  content.querySelectorAll(".color-dot").forEach(dot => {
    dot.onclick = () => {
      content.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
      dot.classList.add("selected");
      selectedColor = dot.dataset.color;
    };
  });

  document.getElementById("setupContinue").onclick = () => {
    const name = document.getElementById("setupName").value.trim();
    if (!name) {
      document.getElementById("setupName").style.borderColor = "#f43f5e";
      return;
    }
    const profile = createProfile(name, selectedColor);
    setActiveProfileId(profile.id);
    activeProfileId = profile.id;
    initGear();
    overlay.classList.add("hidden");
    document.getElementById("appShell").style.display = "";
    renderOnboarding();
    renderProfileAvatar();
  };
}
`;

// Append it just before renderOnboarding
appJs = appJs.replace(/function renderOnboarding\(\) {/, renderProfileSetupFunc + '\nfunction renderOnboarding() {');

// Update renderProfileSheet
// We need to inject the addSection logic before sheet.innerHTML =
const sheetHtmlFind = `  sheet.innerHTML = \`
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
    </div>\`;`;

const sheetHtmlReplace = `  const profileCount = profiles.length;
  const atLimit = profileCount >= 2;

  const addSection = atLimit ? \`
    <div class="profile-limit-card">
      <div class="profile-limit-icon">👫</div>
      <div class="profile-limit-title">BUILT FOR TWO</div>
      <div class="profile-limit-text">The Forge is designed for you and a partner — one subscription, two profiles, full independence. Multi-profile support coming in a future update.</div>
    </div>\` : \`
    <div class="profile-add-wrap">
      <input id="newProfileName" class="profile-name-input" placeholder="Partner's name..." maxlength="20">
      <div class="profile-colors">
        \${["#00d4ff","#00dc82","#ff5b1e","#ffa12e","#a855f7","#ec4899","#f43f5e","#6366f1"].map(c =>
          \`<div class="color-dot" data-color="\${c}" style="background:\${c}"></div>\`
        ).join("")}
      </div>
      <button class="profile-add-btn" id="addProfileBtn">+ ADD PARTNER PROFILE</button>
    </div>\`;

  sheet.innerHTML = \`
    <div class="profile-sheet">
      <div class="grab"></div>
      <div class="profile-sheet-title">PROFILES</div>
      <div class="profile-list">\${profileRows}</div>
      \${addSection}
      <button class="closeb" id="closeProfileSheet">DONE</button>
    </div>\`;`;

if (appJs.includes(sheetHtmlFind)) {
  appJs = appJs.replace(sheetHtmlFind, sheetHtmlReplace);
}

// Make sure the addProfileBtn onclick handler doesn't crash if button doesn't exist
const addBtnHandlerFind = `  document.getElementById("addProfileBtn").onclick = () => {`;
const addBtnHandlerReplace = `  const addBtn = document.getElementById("addProfileBtn");
  if (addBtn) addBtn.onclick = () => {`;
if (appJs.includes(addBtnHandlerFind)) {
  appJs = appJs.replace(addBtnHandlerFind, addBtnHandlerReplace);
}

fs.writeFileSync('app.js', appJs);

// Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');

const profileSetupStyles = `
/* Profile Setup */
.profile-setup-card {
  width: 100%;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: left;
}
.profile-setup-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: .2em;
  color: var(--faint);
  font-weight: 700;
  margin-bottom: 10px;
}
.profile-limit-card {
  background: rgba(0,212,255,.05);
  border: 1px solid rgba(0,212,255,.15);
  border-radius: 14px;
  padding: 18px;
  text-align: center;
  margin-bottom: 12px;
}
.profile-limit-icon { font-size: 28px; margin-bottom: 8px; }
.profile-limit-title {
  font-family: 'Anton', sans-serif;
  font-size: 15px;
  letter-spacing: .1em;
  color: #fff;
  margin-bottom: 8px;
}
.profile-limit-text {
  font-size: 12.5px;
  color: var(--dim);
  line-height: 1.6;
}
`;

styleCss += profileSetupStyles;
fs.writeFileSync('style.css', styleCss);
console.log("Injected profile setup limit restrictions and UI.");
