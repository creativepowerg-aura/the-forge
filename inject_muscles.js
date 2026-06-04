const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const oldGetBlockName = `function getBlockName(k) {
  return {mon:"CHEST+TRI",tue:"BACK+BI",wed:"LEGS",thu:"SHOULDER",fri:"ARMS",sat:"MOBILITY",sun:"REST"}[k];
}`;

const newGetBlockName = `const MUSCLES = [
  { id:"chest",     label:"CHEST",     planKey:"mon" },
  { id:"triceps",   label:"TRICEPS",   planKey:"mon" },
  { id:"back",      label:"BACK",      planKey:"tue" },
  { id:"biceps",    label:"BICEPS",    planKey:"tue" },
  { id:"legs",      label:"LEGS",      planKey:"wed" },
  { id:"shoulders", label:"SHOULDERS", planKey:"thu" },
  { id:"arms",      label:"ARMS",      planKey:"fri" },
  { id:"mobility",  label:"MOBILITY",  planKey:"sat" },
  { id:"rest",      label:"REST",      planKey:"sun" },
];

// Maps a day slot to an array of 1-2 muscle ids
// Default mirrors the original paired plan
let dayMuscles = {
  mon: ["chest","triceps"],
  tue: ["back","biceps"],
  wed: ["legs"],
  thu: ["shoulders"],
  fri: ["arms"],
  sat: ["mobility"],
  sun: ["rest"]
};

function getBlockName(k) {
  const muscles = dayMuscles[k] || [];
  return muscles.map(id => {
    const m = MUSCLES.find(m => m.id === id);
    return m ? m.label : id.toUpperCase();
  }).join(" + ");
}

function getDayTitle(k) {
  return getBlockName(k);
}`;

code = code.replace(oldGetBlockName, newGetBlockName);


const oldInitGear = `function initGear() {
  GEAR_CATALOG.forEach(g => gearState[g.id] = g.def);
  try {
    const saved = localStorage.getItem("forge:gear");
    if(saved) gearState = Object.assign(gearState, JSON.parse(saved));
  } catch(e) {}
}`;

const newInitGear = `function initGear() {
  GEAR_CATALOG.forEach(g => gearState[g.id] = g.def);
  try {
    const saved = localStorage.getItem("forge:gear");
    if(saved) gearState = Object.assign(gearState, JSON.parse(saved));
  } catch(e) {}
  try {
    const savedMuscles = localStorage.getItem("forge:daymuscles");
    if (savedMuscles) dayMuscles = JSON.parse(savedMuscles);
  } catch(e) {}
}`;

code = code.replace(oldInitGear, newInitGear);

fs.writeFileSync('app.js', code);
console.log("Applied MUSCLES update");
