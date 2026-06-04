const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. "forge:schedule" -> pKey("schedule")
appJs = appJs.replace(/"forge:schedule"/g, 'pKey("schedule")');

// 2. "forge:day:" + key -> pKey("day:" + key)
appJs = appJs.replace(/"forge:day:" \+ key/g, 'pKey("day:" + key)');

// 3. "forge:gear" -> pKey("gear")
appJs = appJs.replace(/"forge:gear"/g, 'pKey("gear")');

// 4. "forge:daymuscles" -> pKey("daymuscles")
appJs = appJs.replace(/"forge:daymuscles"/g, 'pKey("daymuscles")');

// 5. "forge:sessionLen" -> pKey("sessionLen")
appJs = appJs.replace(/"forge:sessionLen"/g, 'pKey("sessionLen")');

// 6. "forge:log:index" -> pKey("log:index")
appJs = appJs.replace(/"forge:log:index"/g, 'pKey("log:index")');

// 7. "forge:prs" and \`forge:prs\` -> pKey("prs")
appJs = appJs.replace(/"forge:prs"/g, 'pKey("prs")');
appJs = appJs.replace(/`forge:prs`/g, 'pKey("prs")');

// 8. getLogKey
appJs = appJs.replace(/return `forge:log:\$\{dateStr\}-\$\{dayKey\}`;/g, 'return pKey(`log:\${dateStr}-\${dayKey}`);');

// 9. dynamic \`forge:log:\${...}\`
appJs = appJs.replace(/`forge:log:\$\{today\}-\$\{dayKey\}`/g, 'pKey(`log:\${today}-\${dayKey}`)');
appJs = appJs.replace(/`forge:log:\$\{id\}`/g, 'pKey(`log:\${id}`)');

fs.writeFileSync('app.js', appJs);
console.log("Namespaced localStorage keys");
