const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Replace GEAR_CATALOG
const newCatalog = `const GEAR_CATALOG = [
  { id:"db",        name:"Adjustable Dumbbells", desc:"15–50 lb per hand. Your main driver.", icon:"🏋️", def:true,  cat:"FREE WEIGHTS" },
  { id:"kb",        name:"Kettlebell",            desc:"Swings, Turkish get-up, presses.",     icon:"🎱", def:false, cat:"FREE WEIGHTS" },
  { id:"chair",     name:"Chairs",                desc:"Dips, rows, step-ups, split squats.",  icon:"🪑", def:true,  cat:"FURNITURE" },
  { id:"couch",     name:"Couch Corner",          desc:"Incline presses & pullovers.",         icon:"🛋️", def:true,  cat:"FURNITURE" },
  { id:"pullup",    name:"Pull-Up Bar",           desc:"Pull-ups, chin-ups, hanging core.",    icon:"🚪", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"dipbar",    name:"Dip Bars",              desc:"Full-depth dips, L-sits.",             icon:"⬆️", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"pushupbar", name:"Push-Up Bars",          desc:"Deeper range, wrist-neutral.",         icon:"🧱", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"rings",     name:"Gymnastic Rings",       desc:"Advanced dips, rows, push-ups.",       icon:"⭕", def:false, cat:"BODYWEIGHT & BARS" },
  { id:"bench",     name:"Weight Bench",          desc:"Flat, incline & decline pressing.",    icon:"🛌", def:false, cat:"MACHINES & BENCHES" },
  { id:"trx",       name:"Suspension Trainer",    desc:"Bodyweight rows, core, face pulls.",   icon:"🪢", def:false, cat:"MACHINES & BENCHES" },
  { id:"band",      name:"Resistance Band",       desc:"Pull-aparts, face pulls, stretching.", icon:"〰️", def:true,  cat:"RESISTANCE" },
  { id:"hband",     name:"Heavy Bands",           desc:"Banded squats, rows, curls.",          icon:"⛓️", def:false, cat:"RESISTANCE" },
  { id:"rope",      name:"Jump Rope",             desc:"Warm-up, conditioning, cardio.",       icon:"➰", def:false, cat:"CARDIO & POWER" },
  { id:"plyo",      name:"Plyo Box",              desc:"Box jumps, step-ups, depth drops.",    icon:"📦", def:false, cat:"CARDIO & POWER" },
  { id:"medball",   name:"Medicine Ball",         desc:"Explosive slams, rotational work.",    icon:"🏐", def:false, cat:"CARDIO & POWER" },
  { id:"roller",    name:"Foam Roller",           desc:"Recovery & soft tissue work.",         icon:"🧻", def:true,  cat:"RECOVERY" },
  { id:"abwheel",   name:"Ab Wheel",              desc:"The most effective core tool.",        icon:"🎡", def:false, cat:"RECOVERY" },
];`;

code = code.replace(/const GEAR_CATALOG = \[[\s\S]*?\];/, newCatalog);

// Replace renderGear
const oldRenderGear = `function renderGear() {
  const c = document.getElementById("gearListContainer");
  if(!c) return;
  c.innerHTML = '<div class="gear-section-title">YOUR CURRENT GEAR</div>' +
    GEAR_CATALOG.filter(g => g.def).map(g => gearHTML(g)).join("") +
    '<div class="gear-section-title">UPGRADE YOUR ARSENAL</div>' +
    GEAR_CATALOG.filter(g => !g.def).map(g => gearHTML(g)).join("");
  
  c.querySelectorAll('.gear-item').forEach(el => {
    el.onclick = () => {
      gearState[el.dataset.id] = !gearState[el.dataset.id];
      localStorage.setItem("forge:gear", JSON.stringify(gearState));
      renderGear();
      renderDay(); // Will re-render plan based on gear later
    };
  });
  
  document.getElementById("saveGearBtn").onclick = () => {
    document.getElementById("gearPanel").classList.remove("open");
  };
}`;

const newRenderGear = `function renderGear() {
  try { const s = localStorage.getItem("forge:gear"); if(s) gearState = Object.assign(gearState, JSON.parse(s)); } catch(e) {}
  const c = document.getElementById("gearListContainer");
  if(!c) return;
  
  const categories = [...new Set(GEAR_CATALOG.map(g => g.cat))];
  c.innerHTML = categories.map(cat => {
    const items = GEAR_CATALOG.filter(g => g.cat === cat);
    return \`<div class="gear-section-title">\${cat}</div>\` + items.map(g => gearHTML(g)).join("");
  }).join("");
  
  c.querySelectorAll('.gear-item').forEach(el => {
    el.onclick = () => {
      gearState[el.dataset.id] = !gearState[el.dataset.id];
      localStorage.setItem("forge:gear", JSON.stringify(gearState));
      renderGear();
      renderDay(); // Will re-render plan based on gear later
    };
  });
  
  document.getElementById("saveGearBtn").onclick = () => {
    document.getElementById("gearPanel").classList.remove("open");
  };
}`;

code = code.replace(oldRenderGear, newRenderGear);

fs.writeFileSync('app.js', code);
console.log("Updated GEAR_CATALOG and renderGear successfully.");
