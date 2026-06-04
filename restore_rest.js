const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Ensure MUSCLES has the rest object (it should already be there, but we'll double check)
if (!code.includes('id:"rest",      label:"REST"')) {
    code = code.replace(
        /\];\s*\/\/\s*Maps a day slot/,
        `  { id:"rest",      label:"REST",      planKey:"sun" },\n];\n\n// Maps a day slot`
    );
}

// 2. Update renderSchedule() dropdown filter
code = code.replace(
    /\$\{MUSCLES\.filter\(m => m\.id !== "rest"\)\.map\(m => \{/g,
    '${MUSCLES.map(m => {'
);

// 3. Update buildPlan() muscleToGrp
code = code.replace(
    /mobility:\s*\["RECOVERY","CORE","WARM-UP"\],/g,
    'mobility:  ["RECOVERY","CORE","WARM-UP"],\n      rest:      ["REST"],'
);

// 4. Also inside buildPlan, we have a check: if (basePlan[k].type !== "lift") return;
// Wait! If they select "rest", but the base day was previously a lift day (e.g. mon), 
// how does it become type:"rest"?
// Let's modify buildPlan() to force the day type to "rest" if selected contains "rest".
// And if selected does NOT contain "rest", force the day type to "lift" so the cards render!
code = code.replace(
    /ORDER\.forEach\(k => \{\n\s+if \(basePlan\[k\]\.type !== "lift"\) return;\n\s+const selected = dayMuscles\[k\] \|\| \[\];\n\s+if \(selected\.length === 0\) return;/g,
    `ORDER.forEach(k => {
    const selected = dayMuscles[k] || [];
    if (selected.length === 0) return;
    
    if (selected.includes("rest")) {
      basePlan[k].type = "rest";
      basePlan[k].title = "REST";
      basePlan[k].sub = "";
      return;
    } else {
      basePlan[k].type = "lift";
    }`
);

fs.writeFileSync('app.js', code);
console.log("Restored REST option");
