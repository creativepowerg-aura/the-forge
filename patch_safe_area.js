const fs = require('fs');
let styleCss = fs.readFileSync('style.css', 'utf8');

const safeAreaOverrides = `
/* Safe Area Insets for iOS PWA */
header {
  padding-top: calc(14px + env(safe-area-inset-top, 0px));
}
body {
  padding-top: env(safe-area-inset-top, 0px);
}
.onboard-overlay {
  padding-top: env(safe-area-inset-top, 0px);
}
.rest-toast {
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
}
`;

styleCss += safeAreaOverrides;
fs.writeFileSync('style.css', styleCss);
console.log('Appended iOS safe area insets to style.css');
