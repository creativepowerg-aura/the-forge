const fs = require('fs');
const appJsPath = 'app.js';
let lines = fs.readFileSync(appJsPath, 'utf8').split('\n');

const startIndex = 389; // line 390
const endIndex = 473; // line 474

const newBuildPlan = `function buildPlan() {
  const basePlan = JSON.parse(JSON.stringify(PLAN));
  const g = gearState;
  ORDER.forEach((blockKey, idx) => { basePlan[blockKey].day = WEEK_DAYS[idx]; });

  // CHEST + TRICEPS
  if (g["bench"]) {
    basePlan.mon.ex = basePlan.mon.ex.filter(e => !["chest-incline-press","chest-floor-press"].includes(e.id));
    basePlan.mon.ex.unshift(...EXERCISE_LIBRARY.chest.bench.slice(0,3));
  }
  if (g["pushupbar"]) {
    const i = basePlan.mon.ex.findIndex(e => e.id === "chest-pushup-burnout");
    if (i > -1) basePlan.mon.ex.splice(i, 1, ...EXERCISE_LIBRARY.chest.pushupbar);
  }
  if (g["rings"]) { basePlan.mon.ex.push(...EXERCISE_LIBRARY.chest.rings, ...EXERCISE_LIBRARY.triceps.rings); }
  if (g["dipbar"]) {
    ["mon","fri"].forEach(day => {
      const i = basePlan[day].ex.findIndex(e => e.id === "tri-dip-chair");
      if (i > -1) basePlan[day].ex.splice(i, 1, ...EXERCISE_LIBRARY.triceps.dipbar);
    });
  }
  if (g["pushupbar"]) { basePlan.fri.ex.push(EXERCISE_LIBRARY.triceps.pushupbar[0]); }

  // BACK + BICEPS
  if (g["pullup"]) {
    basePlan.tue.ex.unshift(...EXERCISE_LIBRARY.back.pullup.slice(0,3));
    basePlan.tue.ex.push(EXERCISE_LIBRARY.biceps.pullup[0]);
    basePlan.fri.ex.push(EXERCISE_LIBRARY.biceps.pullup[0]);
    basePlan.sat.ex.push(...EXERCISE_LIBRARY.core.pullup);
  }
  if (g["trx"]) {
    basePlan.tue.ex.push(...EXERCISE_LIBRARY.back.trx);
    basePlan.tue.ex.push(EXERCISE_LIBRARY.biceps.trx[0]);
    basePlan.thu.ex.push(EXERCISE_LIBRARY.shoulders.trx[0]);
  }
  if (g["rings"]) { basePlan.tue.ex.push(...EXERCISE_LIBRARY.back.rings); basePlan.sat.ex.push(...EXERCISE_LIBRARY.core.rings); }
  if (g["hband"]) {
    basePlan.tue.ex.push(...EXERCISE_LIBRARY.back.hband, ...EXERCISE_LIBRARY.biceps.hband);
    basePlan.wed.ex.push(...EXERCISE_LIBRARY.legs.hband);
    basePlan.fri.ex.push(...EXERCISE_LIBRARY.biceps.hband);
  }

  // LEGS
  if (g["kb"]) {
    basePlan.wed.ex.unshift(...EXERCISE_LIBRARY.legs.kb);
    basePlan.thu.ex.push(...EXERCISE_LIBRARY.shoulders.kb);
  }
  if (g["plyo"]) {
    const i = basePlan.wed.ex.findIndex(e => e.id === "leg-step-up");
    if (i > -1) basePlan.wed.ex.splice(i, 1, ...EXERCISE_LIBRARY.legs.plyo);
  }
  if (g["medball"]) { basePlan.wed.ex.push(EXERCISE_LIBRARY.legs.medball[0]); }

  // SHOULDERS
  if (g["bench"]) { basePlan.thu.ex.unshift(EXERCISE_LIBRARY.shoulders.bench[0]); }
  if (g["rings"]) { basePlan.thu.ex.push(EXERCISE_LIBRARY.shoulders.rings[0]); }

  // CORE
  if (g["abwheel"]) { basePlan.sat.ex.push(EXERCISE_LIBRARY.core.abwheel[0]); }

  // JUMP ROPE WARMUP
  if (g["rope"]) {
    ORDER.forEach(k => {
      if (basePlan[k].type === "lift") {
        basePlan[k].warmup = { collapsed: true, exercises: EXERCISE_LIBRARY.warmup.rope };
      }
    });
  }

  // SESSION LENGTH LIMITER
  if (sessionLength < 60) {
    const limit = sessionLength === 30 ? 4 : 6;
    const compoundIds = ["chest-incline-press","chest-incline-bench","chest-flat-bench","back-bentover-row","back-pullup","back-singlearm-row","leg-goblet","leg-bulgarian","leg-rdl","leg-kb-swing","sh-ohp","tri-dip-chair","tri-dip-bars","back-chinup","bi-curl"];
    ORDER.forEach(k => {
      if (basePlan[k].type === "lift") {
        const compounds = basePlan[k].ex.filter(e => compoundIds.includes(e.id));
        const isolation = basePlan[k].ex.filter(e => !compoundIds.includes(e.id));
        [...compounds, ...isolation].forEach((e, i) => { e.trimmed = i >= limit; });
        basePlan[k].ex = [...compounds, ...isolation];
      }
    });
  }

  updateGearFooter(basePlan);
  return basePlan;
}`;

lines.splice(startIndex, endIndex - startIndex + 1, newBuildPlan);

fs.writeFileSync(appJsPath, lines.join('\n'));
console.log("Successfully replaced buildPlan");
