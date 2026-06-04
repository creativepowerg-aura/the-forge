const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const targetStr = `initGear();
if (isFirstTimeUser()) {
  renderOnboarding();
} else {
  renderNav();
  selectDay(current);
}`;

const replaceStr = `function initApp() {
  // Check for existing profiles
  const profiles = getProfileList();
  const savedActive = getActiveProfileId();

  if (profiles.length === 0) {
    // Brand new install — create default profile and go to onboarding
    const profile = createProfile("My Profile", "#00d4ff");
    setActiveProfileId(profile.id);
    initGear();
    renderOnboarding();
  } else if (savedActive && profiles.includes(savedActive)) {
    // Returning user with a valid active profile
    activeProfileId = savedActive;
    initGear();
    if (isFirstTimeUser()) {
      renderOnboarding();
    } else {
      renderNav();
      selectDay(current);
    }
  } else {
    // Has profiles but no active one — show profile selector
    activeProfileId = profiles[0];
    setActiveProfileId(profiles[0]);
    initGear();
    renderNav();
    selectDay(current);
  }
  if (typeof initRestTimer === 'function') initRestTimer();
  renderProfileAvatar();
}

initApp();

function renderProfileAvatar() {
  // Implemented in next step
}`;

if (appJs.includes(targetStr)) {
  appJs = appJs.replace(targetStr, replaceStr);
  fs.writeFileSync('app.js', appJs);
  console.log("App init sequence updated.");
} else {
  console.error("Target string not found in app.js.");
}
