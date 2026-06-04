const fs = require('fs');

let styleCss = fs.readFileSync('style.css', 'utf8');

const patchCss = `

/* Audit Fixes */
.pr-badge {
  position: relative;
  display: inline-flex;
  margin: 10px 0 6px;
  clear: both;
}

.closeb {
  margin-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
}

.gear-inner {
  padding-bottom: 100px;
}

#saveGearBtn {
  position: sticky;
  bottom: 0;
  margin-top: 16px;
  z-index: 10;
}

.sheet {
  overflow: visible;
}
.sheet > * {
  overflow-y: auto;
  max-height: 85vh;
}

.sd-muscle-dropdown {
  z-index: 500;
}
.onboard-sched-dropdown {
  z-index: 500;
}

.onboard-gear-scroll {
  max-height: calc(100vh - 320px);
  min-height: 120px;
}

.rest-toast {
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
}

.hist-top-lifts {
  color: var(--steel);
  font-size: 11px;
}
`;

styleCss += patchCss;

fs.writeFileSync('style.css', styleCss);
console.log("Applied audit fixes to style.css");
