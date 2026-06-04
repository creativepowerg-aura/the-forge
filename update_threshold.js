const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// Replace both instances of pct >= 80 with pct >= 70
appJs = appJs.replace(/pct >= 80/g, 'pct >= 70');

fs.writeFileSync('app.js', appJs);
console.log("Updated threshold to 70");
