const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Replace onboarding functions
const oldOnboarding = `function isFirstTimeUser() {
  return !localStorage.getItem("forge:onboarded");
}

function completeOnboarding() {
  localStorage.setItem("forge:onboarded", "true");
}`;

const newOnboarding = `function isFirstTimeUser() {
  if (!activeProfileId) return true;
  return !localStorage.getItem(pKey("onboarded"));
}

function completeOnboarding() {
  if (activeProfileId) {
    localStorage.setItem(pKey("onboarded"), "true");
  }
}`;

appJs = appJs.replace(oldOnboarding, newOnboarding);


// Insert Profile System block
const profileBlock = `
// ── PROFILE SYSTEM ────────────────────────────────────────
let activeProfileId = null;

function getProfileList() {
  try {
    const raw = localStorage.getItem("forge:profiles");
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveProfileList(list) {
  try { localStorage.setItem("forge:profiles", JSON.stringify(list)); } catch(e) {}
}

function getActiveProfileId() {
  return localStorage.getItem("forge:activeProfile") || null;
}

function setActiveProfileId(id) {
  activeProfileId = id;
  localStorage.setItem("forge:activeProfile", id);
}

function getProfile(id) {
  try {
    const raw = localStorage.getItem(\`forge:profile:\${id}\`);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function saveProfile(profile) {
  try { localStorage.setItem(\`forge:profile:\${profile.id}\`, JSON.stringify(profile)); } catch(e) {}
}

function createProfile(name, color) {
  const id = "p" + Date.now();
  const profile = { id, name, color, created: new Date().toISOString() };
  saveProfile(profile);
  const list = getProfileList();
  list.push(id);
  saveProfileList(list);
  return profile;
}

function deleteProfile(id) {
  // Remove all profile-scoped keys
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(\`forge:\${id}:\`)) keysToRemove.push(key);
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
  localStorage.removeItem(\`forge:profile:\${id}\`);
  const list = getProfileList().filter(p => p !== id);
  saveProfileList(list);
}

function pKey(key) {
  // Namespace a key under the active profile
  return \`forge:\${activeProfileId}:\${key}\`;
}
`;

appJs = appJs.replace('let state = {};', 'let state = {};\n' + profileBlock);

fs.writeFileSync('app.js', appJs);
console.log("Injected profile system into app.js");
