const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const idMap = {
  'Couch-Incline DB Press': 'chest-incline-press',
  'Floor DB Press': 'chest-floor-press',
  'Floor DB Fly': 'chest-floor-fly',
  'Push-Up Burnout': 'chest-pushup-burnout',
  'Chair Tricep Dip': 'tricep-dip-chair',
  'Overhead DB Extension': 'tricep-overhead-ext',
  'Lying DB Skull Crusher': 'tricep-skullcrusher',
  'Bent-Over DB Row': 'back-db-row',
  'Single-Arm DB Row': 'back-single-row',
  'DB Pullover': 'back-db-pullover',
  'Band Pull-Apart': 'back-band-pull',
  'DB Shrugs': 'back-db-shrug',
  'DB Curl': 'bicep-db-curl',
  'Hammer Curl': 'bicep-hammer-curl',
  'Concentration Curl': 'bicep-concentration-curl',
  'Goblet Squat': 'leg-goblet-squat',
  'Bulgarian Split Squat': 'leg-bulgarian-squat',
  'DB Romanian Deadlift': 'leg-db-rdl',
  'Reverse Lunge': 'leg-reverse-lunge',
  'Chair Step-Up': 'leg-chair-stepup',
  'Standing Calf Raise': 'leg-calf-raise',
  'Seated DB Overhead Press': 'shoulder-db-press',
  'Lateral Raise': 'shoulder-lateral-raise',
  'Arnold Press': 'shoulder-arnold-press',
  'Front Raise': 'shoulder-front-raise',
  'Bent-Over Rear Delt Fly': 'shoulder-rear-fly',
  'Band Face Pull': 'shoulder-band-facepull',
  'DB Kickback': 'arm-kickback',
  'Close-Grip Floor Press': 'arm-close-press',
  'Foam Roll — Full Body': 'mob-foam-roll',
  'Band Shoulder Dislocates': 'mob-dislocates',
  'Band-Assisted Stretch Series': 'mob-band-stretch',
  'Easy Cardio (optional)': 'mob-cardio'
};

for (const [name, id] of Object.entries(idMap)) {
  code = code.replace(new RegExp(`{name:"${name}"`, 'g'), `{id:"${id}", name:"${name}"`);
}

code = code.replace(`{name:"Flat DB Bench Press"`, `{id:"chest-flat-press", name:"Flat DB Bench Press"`);
code = code.replace(`{name:"Pull-Up"`, `{id:"pullup-bar", name:"Pull-Up"`);
code = code.replace(`{name:"KB Swing"`, `{id:"leg-kb-swing", name:"KB Swing"`);
code = code.replace(`{name:"Turkish Get-Up"`, `{id:"shoulder-tgu", name:"Turkish Get-Up"`);
code = code.replace(`{name:"TRX Row"`, `{id:"back-trx-row", name:"TRX Row"`);
code = code.replace(`{name:"Ab Wheel Rollout"`, `{id:"mob-ab-wheel", name:"Ab Wheel Rollout"`);
code = code.replace(`basePlan.wed.ex[sidx] = {name:"Box Jump"`, `basePlan.wed.ex[sidx] = {id: basePlan.wed.ex[sidx].id, name:"Box Jump"`);
code = code.replace(`{name:"Medicine Ball Slam"`, `{id:"arm-medball-slam", name:"Medicine Ball Slam"`);
code = code.replace(`{name:"Banded Squat"`, `{id:"leg-banded-squat", name:"Banded Squat"`);
code = code.replace(`{name:"Ring Row"`, `{id:"back-ring-row", name:"Ring Row"`);
code = code.replace(`{name:"Jump Rope Warm-up"`, `{id:"warmup-jump-rope", name:"Jump Rope Warm-up"`);

code = code.replace(
  `  p.ex.forEach((e) => { \n    let k = e.name.toLowerCase().replace(/\\s+/g, '-');\n    total += e.sets; \n    done += Math.min((state[k]?.done || 0), e.sets); \n  });`,
  `  p.ex.forEach((e) => { \n    total += e.sets; \n    done += Math.min((state[e.id]?.done || 0), e.sets); \n  });`
);
code = code.replace(
  `  p.ex.forEach((e) => { \r\n    let k = e.name.toLowerCase().replace(/\\s+/g, '-');\r\n    total += e.sets; \r\n    done += Math.min((state[k]?.done || 0), e.sets); \r\n  });`,
  `  p.ex.forEach((e) => { \r\n    total += e.sets; \r\n    done += Math.min((state[e.id]?.done || 0), e.sets); \r\n  });`
);

code = code.replace(
  `  p.ex.forEach((e, i) => {\n    let k = e.name.toLowerCase().replace(/\\s+/g, '-');\n    if(e.grp !== lastGrp) { `,
  `  p.ex.forEach((e, i) => {\n    if(e.grp !== lastGrp) { `
);
code = code.replace(
  `  p.ex.forEach((e, i) => {\r\n    let k = e.name.toLowerCase().replace(/\\s+/g, '-');\r\n    if(e.grp !== lastGrp) { `,
  `  p.ex.forEach((e, i) => {\r\n    if(e.grp !== lastGrp) { `
);

code = code.replace(
  `const st = state[k] || {done: 0, weight: ""};`,
  `const st = state[e.id] || {done: 0, weight: ""};`
);

code = code.replace(
  `data-key="\${k}"`,
  `data-key="\${e.id}"`
);

code = code.replace(
  `data-w="\${k}"`,
  `data-w="\${e.id}"`
);

fs.writeFileSync('app.js', code);
